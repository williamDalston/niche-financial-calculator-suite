import Link from "next/link";

export interface CtaBlockProps {
  text: string;         // Button / link label
  href: string;         // Destination URL
  description?: string; // Supporting copy shown above the link
}

/**
 * Contextual call-to-action block styled as a helpful recommendation card.
 *
 * Positioned directly below the calculator results panel. Uses a green left
 * accent border to draw the eye without feeling like a banner ad.
 */
export function CtaBlock({ text, href, description }: CtaBlockProps) {
  return (
    <aside
      className="mt-8 rounded-lg border border-[#1E293B] border-l-4 border-l-[#22C55E] bg-[#162032] p-5"
      aria-label="Recommendation"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          {description && (
            <p className="mb-1 text-sm leading-relaxed text-[#94A3B8]">
              {description}
            </p>
          )}
        </div>

        <Link
          href={href}
          className="inline-flex shrink-0 items-center justify-center rounded-md bg-[#22C55E] px-5 py-2.5 text-sm font-semibold text-[#0B1120] transition-colors hover:bg-[#22C55E]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#162032]"
        >
          {text}
        </Link>
      </div>
    </aside>
  );
}
