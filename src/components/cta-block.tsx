"use client";

import { trackCtaClick } from "@/lib/track-event";

export interface CtaBlockProps {
  text: string;         // Button / link label
  href: string;         // Destination URL
  description?: string; // Supporting copy shown above the link
  slug?: string;        // Calculator slug for analytics
}

/**
 * Contextual call-to-action block styled as a helpful recommendation card.
 *
 * Positioned directly below the calculator results panel. Uses a green left
 * accent border to draw the eye without feeling like a banner ad.
 *
 * External links open in a new tab so users stay on CalcEngine, with
 * rel="noopener noreferrer sponsored" for SEO compliance.
 */
export function CtaBlock({ text, href, description, slug }: CtaBlockProps) {
  const isExternal = href.startsWith("http");

  return (
    <aside
      className="mt-8 rounded-lg border border-border border-l-4 border-l-accent-primary bg-bg-surface p-4 sm:p-5"
      aria-label="Recommendation"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          {description && (
            <p className="mb-1 text-sm leading-relaxed text-text-muted">
              {description}
            </p>
          )}
        </div>

        <a
          href={href}
          {...(isExternal && {
            target: "_blank",
            rel: "noopener noreferrer sponsored",
          })}
          onClick={() => slug && trackCtaClick(slug, href)}
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md bg-accent-primary px-5 py-2.5 text-sm font-semibold text-bg-primary transition-colors hover:bg-accent-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-surface"
        >
          {text}
          {isExternal && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          )}
        </a>
      </div>
    </aside>
  );
}
