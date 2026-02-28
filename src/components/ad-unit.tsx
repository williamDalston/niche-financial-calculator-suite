"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Responsive AdSense in-article ad unit.
 *
 * Renders the standard `<ins class="adsbygoogle">` element that the AdSense
 * script (loaded in layout.tsx) picks up and fills with an ad. This component
 * is fully consent-gated — it renders nothing if:
 *   1. The user has not accepted cookies, or
 *   2. The NEXT_PUBLIC_ADSENSE_PUBLISHER_ID env var is missing/placeholder.
 *
 * CLS Prevention: The container has a min-height to reserve space before the
 * ad loads, preventing layout shift. The ad slot uses contain-intrinsic-size
 * for better CLS scores.
 *
 * Usage: <AdUnit className="my-8" />
 */
export function AdUnit({ className = "" }: { className?: string }) {
  const [allowed, setAllowed] = useState(false);
  const pushed = useRef(false);
  const loaded = useRef(false);
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    function checkConsent() {
      setAllowed(localStorage.getItem("cookie-consent") === "accepted");
    }
    checkConsent();
    window.addEventListener("cookie-consent-change", checkConsent);
    return () => window.removeEventListener("cookie-consent-change", checkConsent);
  }, []);

  /* Push the ad once the <ins> is mounted and consent is given */
  useEffect(() => {
    if (!allowed || pushed.current || !insRef.current) return;

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      pushed.current = true;
      loaded.current = true;
    } catch {
      // AdSense not loaded yet — that's fine, it will fill on script init
    }
  }, [allowed]);

  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  if (!allowed || !publisherId || publisherId.includes("XXXXXXXXX")) {
    return null;
  }

  return (
    <div
      className={`no-print ${className}`}
      data-no-print
      aria-hidden="true"
      style={{
        minHeight: "250px",
        contain: "layout",
      }}
    >
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{
          display: "block",
          minHeight: "90px",
          containIntrinsicSize: "auto 250px",
          contentVisibility: "auto",
        }}
        data-ad-client={publisherId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
