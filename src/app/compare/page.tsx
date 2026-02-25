import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Financial Guides & Comparisons | CalcEngine",
  description:
    "In-depth financial comparison guides: rent vs buy, 401(k) vs IRA, Roth vs Traditional, and more. Make confident money decisions with CalcEngine.",
  openGraph: {
    title: "Financial Guides & Comparisons",
    description:
      "In-depth financial comparison guides to help you make confident money decisions.",
    url: "https://calcengine.io/compare",
  },
  alternates: {
    canonical: "/compare",
  },
};

/* ─── Guide Cards Data ─── */

interface GuideCard {
  title: string;
  description: string;
  href: string;
  icon: string;
  status: "live" | "coming-soon";
}

const guides: GuideCard[] = [
  {
    title: "Rent vs Buy Guide",
    description:
      "Should you rent or buy in 2026? Our complete guide covers the 5% rule, financial comparisons, and when each option makes sense for your situation.",
    href: "/compare/rent-vs-buy",
    icon: "🏠",
    status: "live",
  },
  {
    title: "401(k) vs IRA",
    description:
      "Compare contribution limits, tax advantages, employer matching, and withdrawal rules for 401(k) plans and IRAs to optimize your retirement savings.",
    href: "/compare/401k-vs-ira",
    icon: "🏦",
    status: "live",
  },
  {
    title: "Roth vs Traditional IRA",
    description:
      "Understand the key differences between Roth and Traditional IRAs: tax treatment, income limits, required minimum distributions, and which fits your tax strategy.",
    href: "/compare/roth-vs-traditional-ira",
    icon: "📊",
    status: "live",
  },
  {
    title: "Fixed vs Variable Rate Mortgages",
    description:
      "Explore the pros and cons of fixed and variable rate mortgages including rate caps, payment stability, and when an ARM might save you money.",
    href: "/compare/fixed-vs-variable-mortgage",
    icon: "🏡",
    status: "live",
  },
  {
    title: "Avalanche vs Snowball Method",
    description:
      "Two popular strategies for paying off debt. Compare the math-optimal avalanche method with the motivation-driven snowball method to find your best approach.",
    href: "/compare/avalanche-vs-snowball",
    icon: "🎯",
    status: "live",
  },
];

/* ─── Page Component ─── */

export default function CompareIndexPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.08),transparent)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-text-muted">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-accent-primary"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </li>
              <li className="text-text-primary font-medium" aria-current="page">
                Guides
              </li>
            </ol>
          </nav>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl animate-fade-in-up">
            Financial Guides &{" "}
            <span className="text-accent-secondary">Comparisons</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-text-muted animate-fade-in-up animate-fade-in-up-delay-1">
            In-depth guides to help you understand the most important financial
            decisions. Each guide includes data-driven comparisons, actionable
            rules of thumb, and links to our free calculators.
          </p>
        </div>
      </section>

      {/* ─── Guide Cards Grid ─── */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <div
              key={guide.title}
              className={`group relative rounded-xl border bg-bg-surface p-6 transition-all duration-200 ${
                guide.status === "live"
                  ? "border-border hover:border-accent-primary/50 hover:shadow-lg hover:shadow-accent-primary/5"
                  : "border-border/60"
              }`}
            >
              {/* Coming Soon Badge */}
              {guide.status === "coming-soon" && (
                <span className="absolute top-4 right-4 rounded-full bg-accent-warning/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-warning">
                  Coming Soon
                </span>
              )}

              <span className="text-3xl" aria-hidden="true">
                {guide.icon}
              </span>

              <h2 className="mt-4 font-display text-lg font-semibold text-text-primary">
                {guide.title}
              </h2>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">
                {guide.description}
              </p>

              {guide.status === "live" ? (
                <Link
                  href={guide.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-primary transition-colors hover:text-accent-primary/80"
                >
                  Read Guide
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <p className="mt-5 text-sm font-medium text-text-muted/50">
                  Guide in progress
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-t border-border bg-bg-surface/40">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Want to run the numbers yourself?
          </h2>
          <p className="mt-3 text-text-muted">
            Our 30 free calculators cover mortgages, salary, retirement, taxes,
            debt, and more.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-accent-primary px-6 py-3 text-sm font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-primary/90 hover:shadow-lg hover:shadow-accent-primary/20"
          >
            Browse All Calculators
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
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
