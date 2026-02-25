"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Delay entrance slightly for smoother page load experience
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = useCallback((choice: "accepted" | "rejected") => {
    setDismissed(true);
    // Wait for exit animation before removing from DOM
    setTimeout(() => {
      localStorage.setItem("cookie-consent", choice);
      window.dispatchEvent(new Event("cookie-consent-change"));
      setVisible(false);
    }, 300);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-[60] p-4 sm:p-6 transition-all duration-300 ${
        dismissed ? "translate-y-full opacity-0" : "translate-y-0 opacity-100 animate-slide-up"
      }`}
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-bg-surface/95 backdrop-blur-xl p-5 sm:p-6 shadow-2xl shadow-black/40">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Cookie icon */}
          <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-warning/10">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <circle cx="8" cy="9" r="1" fill="#F59E0B" />
              <circle cx="15" cy="8" r="1" fill="#F59E0B" />
              <circle cx="10" cy="14" r="1" fill="#F59E0B" />
              <circle cx="16" cy="14" r="1" fill="#F59E0B" />
              <circle cx="12" cy="11" r="1" fill="#F59E0B" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary">
              We value your privacy
            </p>
            <p className="mt-1 text-sm text-text-muted leading-relaxed">
              We use cookies for advertising (Google AdSense) to keep CalcEngine free.
              No financial data is ever collected.{" "}
              <Link
                href="/privacy"
                className="text-accent-secondary underline underline-offset-2 hover:text-accent-primary transition-colors"
              >
                Privacy Policy
              </Link>
            </p>
          </div>

          <div className="flex gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => handleConsent("rejected")}
              className="flex-1 sm:flex-initial rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-text-muted transition-all duration-200 hover:text-text-primary hover:border-text-muted hover:bg-bg-primary/50"
            >
              Decline
            </button>
            <button
              onClick={() => handleConsent("accepted")}
              className="flex-1 sm:flex-initial rounded-xl bg-accent-primary px-5 py-2.5 text-sm font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-primary/90 hover:shadow-lg hover:shadow-accent-primary/20"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
