"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

export function AdSenseScript() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    function checkConsent() {
      setAllowed(localStorage.getItem("cookie-consent") === "accepted");
    }
    checkConsent();
    window.addEventListener("cookie-consent-change", checkConsent);
    return () => window.removeEventListener("cookie-consent-change", checkConsent);
  }, []);

  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  if (!allowed || !publisherId || publisherId.includes("XXXXXXXXX")) return null;

  return (
    <Script
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
