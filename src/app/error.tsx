"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_30%,rgba(245,158,11,0.05),transparent)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-lg px-4 py-24 sm:py-32 text-center">
        {/* Animated warning icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-accent-warning/10 border border-accent-warning/20 animate-scale-in">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="animate-float"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
        </div>

        <h1 className="mt-8 font-display text-3xl font-bold tracking-tight text-text-primary animate-fade-in-up">
          Something Went Wrong
        </h1>

        <p className="mt-4 text-text-muted leading-relaxed animate-fade-in-up animate-fade-in-up-delay-1">
          We hit an unexpected error loading this page. No financial data was lost — all
          calculations run locally in your browser.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4 animate-fade-in-up animate-fade-in-up-delay-2">
          <button
            onClick={reset}
            className="rounded-xl bg-accent-primary px-6 py-3 text-sm font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-primary/90 hover:shadow-lg hover:shadow-accent-primary/20 hover:-translate-y-0.5"
          >
            Try Again
          </button>
          <Link
            href="/calculators"
            className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-text-muted transition-all duration-200 hover:text-text-primary hover:border-text-muted hover:-translate-y-0.5"
          >
            All Calculators
          </Link>
        </div>
      </div>
    </div>
  );
}
