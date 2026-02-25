import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorSearch } from "@/components/calculator-search";
import { calculators } from "@/data/calculators";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you are looking for does not exist. Browse our 30 free financial calculators for mortgage, salary, retirement, tax, and more.",
};

/* Popular calculators to suggest on the 404 page */
const suggestedSlugs = [
  "mortgage-calculator",
  "salary-to-hourly",
  "take-home-pay-calculator",
  "retirement-calculator",
  "compound-interest-calculator",
  "loan-calculator",
];

const suggestedCalculators = suggestedSlugs
  .map((slug) => calculators.find((c) => c.slug === slug))
  .filter(Boolean);

/* Build searchable list for the search component */
const searchableCalcs = calculators.map((c) => ({
  name: c.title,
  href: `/calculators/${c.slug}`,
  category: c.category.name,
  icon: c.icon,
}));

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      {/* Background radial gradient */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_20%,rgba(34,197,94,0.06),transparent)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        {/* Centered content */}
        <div className="flex flex-col items-center text-center">
          {/* Large 404 */}
          <h1
            className="text-gradient-green text-[8rem] font-display font-bold leading-none tracking-tighter sm:text-[10rem] lg:text-[12rem] animate-fade-in-up"
            aria-label="404 error"
          >
            404
          </h1>

          {/* Message */}
          <p className="mt-4 font-display text-2xl font-bold text-text-primary sm:text-3xl animate-fade-in-up animate-fade-in-up-delay-1">
            This calculator doesn&rsquo;t exist yet
          </p>
          <p className="mt-3 text-lg text-text-muted animate-fade-in-up animate-fade-in-up-delay-2">
            But we have 30 others you might find useful
          </p>

          {/* Search bar */}
          <div className="mt-10 w-full max-w-2xl animate-fade-in-up animate-fade-in-up-delay-3">
            <CalculatorSearch calculators={searchableCalcs} />
          </div>

          {/* Suggested calculators */}
          <div className="mt-14 w-full animate-fade-in-up animate-fade-in-up-delay-4">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-accent-secondary">
              Popular Calculators
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {suggestedCalculators.map(
                (calc) =>
                  calc && (
                    <Link
                      key={calc.slug}
                      href={`/calculators/${calc.slug}`}
                      className="group flex items-center gap-3 rounded-xl border border-border bg-bg-surface p-4 transition-all duration-200 hover:border-accent-primary/50 hover:shadow-lg hover:shadow-accent-primary/5"
                    >
                      <span
                        className="text-2xl flex-shrink-0"
                        aria-hidden="true"
                      >
                        {calc.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-text-primary group-hover:text-accent-primary transition-colors truncate">
                          {calc.title}
                        </p>
                        <p className="mt-0.5 text-xs text-text-muted truncate">
                          {calc.category.name}
                        </p>
                      </div>
                    </Link>
                  )
              )}
            </div>
          </div>

          {/* Back to Home button */}
          <Link
            href="/"
            className="mt-12 inline-flex items-center gap-2 rounded-xl bg-accent-primary px-6 py-3 text-sm font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-primary/90 hover:shadow-lg hover:shadow-accent-primary/20"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
