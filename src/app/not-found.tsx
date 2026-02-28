import Link from "next/link";
import { calculators, categories } from "@/data/calculators";

const popularSlugs = [
  "mortgage-calculator",
  "salary-to-hourly",
  "take-home-pay-calculator",
  "retirement-calculator",
  "compound-interest-calculator",
  "loan-calculator",
];

const popularCalculators = popularSlugs
  .map((slug) => calculators.find((c) => c.slug === slug))
  .filter(Boolean);

const categoryList = Object.values(categories);

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent-primary">
          404 Error
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-lg text-text-muted">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-lg font-semibold text-text-primary">
          Popular Calculators
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popularCalculators.map(
            (calc) =>
              calc && (
                <Link
                  key={calc.slug}
                  href={`/calculators/${calc.slug}`}
                  className="flex items-center gap-3 rounded-lg border border-border bg-bg-surface p-4 transition-colors hover:border-accent-primary/40 hover:bg-bg-surface/80"
                >
                  <span className="text-2xl" aria-hidden="true">
                    {calc.icon}
                  </span>
                  <span className="text-sm font-medium text-text-primary">
                    {calc.title}
                  </span>
                </Link>
              )
          )}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-lg font-semibold text-text-primary">
          Browse by Category
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {categoryList.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="rounded-full border border-border bg-bg-surface px-4 py-2 text-sm text-text-muted transition-colors hover:border-accent-secondary/40 hover:text-accent-secondary"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-accent-primary px-6 py-3 text-sm font-semibold text-bg-primary transition-all hover:bg-accent-primary/90"
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
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Go to Homepage
        </Link>
        <Link
          href="/calculators"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-bg-surface px-6 py-3 text-sm font-semibold text-text-primary transition-all hover:border-accent-primary/40"
        >
          View All Calculators
        </Link>
      </div>

      <p className="mt-12 text-center text-sm text-text-muted">
        Think this is a mistake?{" "}
        <Link
          href="/contact"
          className="text-accent-secondary hover:text-accent-primary transition-colors"
        >
          Let us know
        </Link>
      </p>
    </div>
  );
}
