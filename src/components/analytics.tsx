"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

export function Analytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    function checkConsent() {
      setAllowed(localStorage.getItem("cookie-consent") === "accepted");
    }
    checkConsent();
    window.addEventListener("cookie-consent-change", checkConsent);
    return () => window.removeEventListener("cookie-consent-change", checkConsent);
  }, []);

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!allowed || !gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
