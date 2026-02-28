import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AdUnit } from "@/components/ad-unit";
import {
  getCalculatorsByCategory,
  type CalculatorInfo,
} from "@/data/calculators";

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Retirement & Investing Calculators | CalcEngine",
  description:
    "Free retirement and investing calculators for compound interest, 401(k) projections, Social Security estimates, pension benefits, net worth tracking, emergency funds, and inflation analysis. Plan your financial future with CalcEngine.",
  openGraph: {
    title: "Retirement & Investing Calculators | CalcEngine",
    description:
      "Free retirement and investing calculators for compound interest, 401(k), Social Security, pensions, and more.",
    url: "https://calcengine.org/category/retirement-and-investing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Retirement & Investing Calculators | CalcEngine",
    description:
      "Free retirement and investing calculators for compound interest, 401(k) projections, Social Security estimates, pension benefits, net worth tracking, emergency funds, and inflation analysis. Plan your financial future with CalcEngine.",
  },
  alternates: {
    canonical: "/category/retirement-and-investing",
  },
};

/* ------------------------------------------------------------------ */
/*  Page data                                                         */
/* ------------------------------------------------------------------ */

const CATEGORY_NAME = "Retirement & Investing";
const CATEGORY_SLUG = "retirement-and-investing";

const calculators = getCalculatorsByCategory(CATEGORY_SLUG);

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function RetirementAndInvestingPage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: CATEGORY_NAME, href: `/category/${CATEGORY_SLUG}` },
        ]}
      />

      {/* H1 */}
      <h1 className="mb-6 font-display text-3xl font-bold text-text-primary sm:text-4xl">
        {CATEGORY_NAME} Calculators
      </h1>

      {/* Category description */}
      <div className="mb-10 max-w-3xl text-text-muted leading-relaxed">
        <p className="mb-4">
          Building long-term wealth requires a clear picture of where you stand today and
          a realistic plan for where you want to be. Our retirement and investing
          calculators help you model different savings scenarios, understand the power of
          compound growth, and stress-test your financial plan against inflation and
          unexpected expenses.
        </p>
        <p>
          Start with the retirement calculator to see if your current savings rate puts
          you on track, then dive into 401(k) projections with employer matching, estimate
          your future Social Security benefits, or evaluate a traditional pension plan. Use
          the compound interest calculator to visualize how time and consistent
          contributions grow your portfolio, the net worth calculator to take stock of your
          full financial picture, the emergency fund tool to make sure you are covered for
          the unexpected, and the inflation calculator to understand how purchasing power
          changes over decades.
        </p>
      </div>

      {/* Calculator grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {calculators.map((calc: CalculatorInfo) => (
          <Link
            key={calc.slug}
            href={`/calculators/${calc.slug}`}
            className="group flex flex-col rounded-lg border border-border bg-bg-surface p-5 transition-all duration-200 hover:border-accent-secondary/40 hover:shadow-lg hover:shadow-accent-secondary/5"
          >
            <span className="mb-3 text-3xl" role="img" aria-hidden="true">
              {calc.icon}
            </span>
            <h2 className="mb-1.5 text-base font-semibold text-text-primary group-hover:text-accent-secondary transition-colors font-display">
              {calc.title}
            </h2>
            <p className="text-sm leading-relaxed text-text-muted">
              {calc.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Ad unit */}
      <AdUnit className="mt-12" />

      {/* JSON-LD BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://calcengine.org/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: CATEGORY_NAME,
                item: `https://calcengine.org/category/${CATEGORY_SLUG}`,
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Retirement & Investing Calculators",
            description:
              "Free retirement and investing calculators for compound interest, 401(k) projections, Social Security estimates, pension benefits, net worth tracking, emergency funds, and inflation analysis. Plan your financial future with CalcEngine.",
            url: "https://calcengine.org/category/retirement-and-investing",
            numberOfItems: 8,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Retirement Calculator", url: "https://calcengine.org/calculators/retirement-calculator" },
              { "@type": "ListItem", position: 2, name: "Compound Interest Calculator", url: "https://calcengine.org/calculators/compound-interest-calculator" },
              { "@type": "ListItem", position: 3, name: "401(k) Calculator", url: "https://calcengine.org/calculators/401k-calculator" },
              { "@type": "ListItem", position: 4, name: "Social Security Estimator", url: "https://calcengine.org/calculators/social-security-estimator" },
              { "@type": "ListItem", position: 5, name: "Pension Calculator", url: "https://calcengine.org/calculators/pension-calculator" },
              { "@type": "ListItem", position: 6, name: "Net Worth Calculator", url: "https://calcengine.org/calculators/net-worth-calculator" },
              { "@type": "ListItem", position: 7, name: "Emergency Fund Calculator", url: "https://calcengine.org/calculators/emergency-fund-calculator" },
              { "@type": "ListItem", position: 8, name: "Inflation Calculator", url: "https://calcengine.org/calculators/inflation-calculator" },
            ],
          }),
        }}
      />
    </article>
  );
}
