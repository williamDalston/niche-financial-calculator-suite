"use client";

import Link from "next/link";
import { trackRelatedClick } from "@/lib/track-event";

export interface RelatedCalculator {
  title: string;
  slug: string;
  description: string;
  icon: string; // emoji
}

interface RelatedCalculatorsProps {
  calculators: RelatedCalculator[];
  fromSlug?: string;
}

/**
 * Grid of related calculator cards.
 * Responsive: 1 col mobile, 2 cols sm, 3 cols md, 4 cols lg.
 * Each card shows an emoji icon, title, short description, and links to the
 * calculator page.
 */
export function RelatedCalculators({ calculators, fromSlug }: RelatedCalculatorsProps) {
  if (calculators.length === 0) return null;

  return (
    <section className="mt-16" aria-labelledby="related-heading">
      <h2
        id="related-heading"
        className="mb-6 font-display text-2xl font-bold text-text-primary"
      >
        Related Calculators
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calc) => (
          <Link
            key={calc.slug}
            href={`/calculators/${calc.slug}`}
            onClick={() => fromSlug && trackRelatedClick(fromSlug, calc.slug)}
            className="group flex flex-col rounded-lg border border-border bg-bg-surface p-5 transition-all duration-200 hover:border-accent-secondary/40 hover:bg-bg-surface/80 hover:shadow-lg hover:shadow-accent-secondary/5 focus-visible:border-accent-secondary/40 focus-visible:ring-2 focus-visible:ring-accent-secondary/20"
          >
            <span
              className="mb-3 text-3xl"
              role="img"
              aria-hidden="true"
            >
              {calc.icon}
            </span>

            <h3 className="mb-1.5 text-base font-semibold text-text-primary group-hover:text-accent-secondary transition-colors">
              {calc.title}
            </h3>

            <p className="text-sm leading-relaxed text-text-muted">
              {calc.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
