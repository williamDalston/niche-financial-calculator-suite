import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorSearch } from "@/components/calculator-search";
import { calculators, categories } from "@/data/calculators";

export const metadata: Metadata = {
  title: "Free Financial Calculators | CalcEngine",
  description:
    "30 free financial calculators for mortgage, salary, retirement, tax, debt payoff, and investing. Instant results, no signup required. Updated for 2026.",
  openGraph: {
    title: "Free Financial Calculators | CalcEngine",
    description:
      "30 free financial calculators for mortgage, salary, retirement, tax, debt payoff, and investing. Instant results, no signup required. Updated for 2026.",
    url: "https://calcengine.org",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Financial Calculators | CalcEngine",
    description:
      "30 free financial calculators for mortgage, salary, retirement, tax, debt payoff, and investing. Instant results, no signup required. Updated for 2026.",
  },
  alternates: {
    canonical: "/",
  },
};

/* ─── Data ─── */

const categoryList = [
  {
    icon: "🏠",
    name: "Mortgage & Housing",
    count: 4,
    description:
      "Mortgage payments, home affordability, rent vs buy, and auto loans.",
    href: "/category/mortgage-and-housing",
  },
  {
    icon: "💼",
    name: "Salary & Career",
    count: 9,
    description:
      "Salary conversions, take-home pay, overtime, freelance rates, and more.",
    href: "/category/salary-and-career",
  },
  {
    icon: "📈",
    name: "Retirement & Investing",
    count: 8,
    description:
      "Compound interest, 401(k), Social Security, pensions, and net worth.",
    href: "/category/retirement-and-investing",
  },
  {
    icon: "🧾",
    name: "Tax Calculators",
    count: 3,
    description:
      "Federal income tax, self-employment tax, and take-home pay estimators.",
    href: "/category/tax-calculators",
  },
  {
    icon: "💳",
    name: "Debt & Loans",
    count: 4,
    description:
      "Loan payments, auto loans, student loans, and debt payoff strategies.",
    href: "/category/debt-and-loans",
  },
  {
    icon: "🏛️",
    name: "Government Pay",
    count: 4,
    description:
      "GS pay scales, military pay, FERS retirement, and TSP projections.",
    href: "/category/government-pay",
  },
];

const popularSlugs = [
  "mortgage-calculator",
  "salary-to-hourly",
  "take-home-pay-calculator",
  "retirement-calculator",
  "compound-interest-calculator",
  "loan-calculator",
  "auto-loan-calculator",
  "gs-pay-calculator",
  "cost-of-living-calculator",
  "home-affordability-calculator",
];

const popularCalculators = popularSlugs
  .map((slug) => calculators.find((c) => c.slug === slug))
  .filter(Boolean);

/* Build searchable list for the client search component */
const searchableCalcs = calculators.map((c) => ({
  name: c.title,
  href: `/calculators/${c.slug}`,
  category: c.category.name,
  icon: c.icon,
}));

/* Group by category for "All Calculators" section */
function groupByCategory() {
  const grouped: Record<
    string,
    { name: string; href: string; icon: string }[]
  > = {};
  for (const calc of calculators) {
    const catName = calc.category.name;
    if (!grouped[catName]) grouped[catName] = [];
    grouped[catName].push({
      name: calc.title,
      href: `/calculators/${calc.slug}`,
      icon: calc.icon,
    });
  }
  for (const key of Object.keys(grouped)) {
    grouped[key].sort((a, b) => a.name.localeCompare(b.name));
  }
  return grouped;
}

const valueProps = [
  {
    icon: (
      <svg
        className="text-accent-primary"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Instant Results",
    description:
      "Real-time calculations as you type. No waiting, no page reloads.",
  },
  {
    icon: (
      <svg
        className="text-accent-primary"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "100% Free",
    description:
      "No signup, no hidden fees, no premium walls. Every calculator is free forever.",
  },
  {
    icon: (
      <svg
        className="text-accent-primary"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Privacy First",
    description:
      "All calculations run in your browser. We never see your data.",
  },
];

/* ─── JSON-LD ─── */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CalcEngine",
  url: "https://calcengine.org",
  description:
    "Free financial calculators for mortgage, salary, retirement, tax, and investment calculations.",
  publisher: {
    "@type": "Organization",
    name: "CalcEngine",
    url: "https://calcengine.org",
    logo: {
      "@type": "ImageObject",
      url: "https://calcengine.org/favicon.svg",
    },
  },
};

/* ─── Page Component ─── */

export default function HomePage() {
  const grouped = groupByCategory();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ============ 1. HERO ============ */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.08),transparent)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="flex flex-col items-center text-center">
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl lg:text-6xl animate-fade-in-up">
              Free Financial{" "}
              <span className="text-accent-primary">Calculators</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-text-muted sm:text-xl animate-fade-in-up animate-fade-in-up-delay-1">
              Mortgage, salary, retirement, tax, and investment tools &mdash;
              updated for 2026
            </p>
            <div className="mt-10 w-full max-w-2xl animate-fade-in-up animate-fade-in-up-delay-2">
              <CalculatorSearch calculators={searchableCalcs} />
            </div>
            <p className="mt-8 flex flex-wrap items-center justify-center gap-x-2 text-sm font-medium text-text-muted animate-fade-in-up animate-fade-in-up-delay-3">
              <span className="inline-flex items-center gap-1">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-accent-primary"
                  aria-hidden="true"
                />
                30 Free Calculators
              </span>
              <span aria-hidden="true" className="text-text-muted/50">
                &bull;
              </span>
              <span className="inline-flex items-center gap-1">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-accent-secondary"
                  aria-hidden="true"
                />
                Updated for 2026
              </span>
              <span aria-hidden="true" className="text-text-muted/50">
                &bull;
              </span>
              <span className="inline-flex items-center gap-1">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-accent-warning"
                  aria-hidden="true"
                />
                No signup required
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ============ 2. CATEGORY GRID ============ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Calculator Categories
        </h2>
        <p className="mt-2 text-text-muted">
          Browse calculators by topic to find exactly what you need.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoryList.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group rounded-xl border border-border bg-bg-surface p-6 transition-all duration-200 hover:border-accent-primary/50 hover:shadow-lg hover:shadow-accent-primary/5 hover-lift"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl" aria-hidden="true">
                  {cat.icon}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold text-text-primary group-hover:text-accent-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-accent-secondary">
                    {cat.count} calculators
                  </p>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ 3. POPULAR CALCULATORS ============ */}
      <section className="border-t border-border bg-bg-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Most Popular Calculators
          </h2>
          <p className="mt-2 text-text-muted">
            The calculators people search for most, all in one place.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {popularCalculators.map((calc, idx) =>
              calc ? (
                <Link
                  key={calc.slug}
                  href={`/calculators/${calc.slug}`}
                  className="group flex items-start gap-3 rounded-xl border border-border bg-bg-surface p-5 transition-all duration-200 hover:border-accent-primary/50 hover:shadow-lg hover:shadow-accent-primary/5 hover-lift"
                >
                  <span
                    className="mt-0.5 text-2xl flex-shrink-0"
                    aria-hidden="true"
                  >
                    {calc.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent-primary transition-colors truncate">
                        {calc.title}
                      </h3>
                      {idx === 0 && (
                        <span className="flex-shrink-0 rounded-full bg-accent-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-primary">
                          #1
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-text-muted leading-relaxed line-clamp-2">
                      {calc.description}
                    </p>
                  </div>
                </Link>
              ) : null
            )}
          </div>
        </div>
      </section>

      {/* ============ 4. ALL CALCULATORS ============ */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            All 30 Calculators
          </h2>
          <p className="mt-2 text-text-muted">
            Every calculator we offer, organized by category.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(grouped).map(([category, calcs]) => (
              <div key={category}>
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-accent-secondary">
                  {category}
                </h3>
                <ul className="mt-3 space-y-2">
                  {calcs.map((calc) => (
                    <li key={calc.href}>
                      <Link
                        href={calc.href}
                        className="group inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-accent-primary"
                      >
                        <span className="text-base" aria-hidden="true">
                          {calc.icon}
                        </span>
                        <span className="group-hover:underline underline-offset-2">
                          {calc.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. VALUE PROPOSITION ============ */}
      <section className="border-t border-border bg-bg-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {valueProps.map((prop) => (
              <div
                key={prop.title}
                className="flex flex-col items-center rounded-xl border border-border bg-bg-surface p-8 text-center hover-lift"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-primary/10">
                  {prop.icon}
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-text-primary">
                  {prop.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted leading-relaxed">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
