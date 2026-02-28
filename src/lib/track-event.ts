/**
 * Lightweight analytics event tracking for CalcEngine.
 *
 * Sends events to both Google Analytics (via gtag) and Vercel Analytics
 * (via the standard web-vitals/custom event pattern).
 *
 * Safe to call server-side — it no-ops when `window` is unavailable.
 */

type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    va?: (event: string, props?: EventParams) => void;
  }
}

export function trackEvent(name: string, params?: EventParams) {
  if (typeof window === "undefined") return;

  // Google Analytics 4
  window.gtag?.("event", name, params);

  // Vercel Analytics custom events
  window.va?.(name, params);
}

/* ─── Pre-defined calculator events ─── */

export function trackCalculatorView(slug: string, category: string) {
  trackEvent("calculator_view", { calculator: slug, category });
}

export function trackCalculation(slug: string) {
  trackEvent("calculate", { calculator: slug });
}

export function trackCalculatorReset(slug: string) {
  trackEvent("calculator_reset", { calculator: slug });
}

export function trackRelatedClick(from: string, to: string) {
  trackEvent("related_calculator_click", { from_calculator: from, to_calculator: to });
}

export function trackFaqExpand(slug: string, question: string) {
  trackEvent("faq_expand", { calculator: slug, question });
}

export function trackCtaClick(slug: string, href: string) {
  trackEvent("cta_click", { calculator: slug, destination: href });
}

export function trackShare(slug: string, method: string) {
  trackEvent("share_calculator", { calculator: slug, method });
}
