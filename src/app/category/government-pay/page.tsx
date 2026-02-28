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
  title: "Government Pay Calculators | CalcEngine",
  description:
    "Free government pay calculators for GS federal employees, military service members, FERS retirement annuities, and TSP projections. Understand your total federal compensation with CalcEngine.",
  openGraph: {
    title: "Government Pay Calculators | CalcEngine",
    description:
      "Free government pay calculators for GS pay, military pay, FERS retirement, and TSP projections.",
    url: "https://calcengine.org/category/government-pay",
  },
  twitter: {
    card: "summary_large_image",
    title: "Government Pay Calculators | CalcEngine",
    description:
      "Free government pay calculators for GS federal employees, military service members, FERS retirement annuities, and TSP projections. Understand your total federal compensation with CalcEngine.",
  },
  alternates: {
    canonical: "/category/government-pay",
  },
};

/* ------------------------------------------------------------------ */
/*  Page data                                                         */
/* ------------------------------------------------------------------ */

const CATEGORY_NAME = "Government Pay";
const CATEGORY_SLUG = "government-pay";

const calculators = getCalculatorsByCategory(CATEGORY_SLUG);

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function GovernmentPayPage() {
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
          Federal civilian and military compensation systems are uniquely structured --
          with grade-and-step pay tables, locality adjustments, special pay, allowances,
          and retirement benefits that differ significantly from private-sector packages.
          Our government pay calculators are built to handle these nuances so you can
          understand exactly what you earn today and what you can expect in retirement.
        </p>
        <p>
          The GS pay calculator looks up your base pay and applies the correct locality
          adjustment for your duty station across all 15 grades and 10 steps. The military
          pay calculator covers base pay, Basic Allowance for Housing (BAH), Basic
          Allowance for Subsistence (BAS), and total compensation for every rank and years
          of service. The FERS retirement calculator estimates your Federal Employees
          Retirement System annuity based on your high-3 salary and years of creditable
          service. And the TSP calculator projects your Thrift Savings Plan balance at
          retirement, accounting for your contributions, the agency automatic 1%, and
          matching contributions up to 5%.
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
            name: "Government Pay Calculators",
            description:
              "Free government pay calculators for GS federal employees, military service members, FERS retirement annuities, and TSP projections. Understand your total federal compensation with CalcEngine.",
            url: "https://calcengine.org/category/government-pay",
            numberOfItems: 4,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "GS Pay Calculator", url: "https://calcengine.org/calculators/gs-pay-calculator" },
              { "@type": "ListItem", position: 2, name: "Military Pay Calculator", url: "https://calcengine.org/calculators/military-pay-calculator" },
              { "@type": "ListItem", position: 3, name: "FERS Retirement Calculator", url: "https://calcengine.org/calculators/fers-retirement-calculator" },
              { "@type": "ListItem", position: 4, name: "TSP Calculator", url: "https://calcengine.org/calculators/tsp-calculator" },
            ],
          }),
        }}
      />
    </article>
  );
}
