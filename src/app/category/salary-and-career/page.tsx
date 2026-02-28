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
  title: "Salary & Career Calculators | CalcEngine",
  description:
    "Free salary and career calculators for converting wages, estimating take-home pay, planning raises, setting freelance rates, comparing cost of living, and more. Make smarter compensation decisions with CalcEngine.",
  openGraph: {
    title: "Salary & Career Calculators | CalcEngine",
    description:
      "Free salary and career calculators for wage conversions, take-home pay, raises, freelance rates, and cost of living.",
    url: "https://calcengine.org/category/salary-and-career",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salary & Career Calculators | CalcEngine",
    description:
      "Free salary and career calculators for converting wages, estimating take-home pay, planning raises, setting freelance rates, comparing cost of living, and more. Make smarter compensation decisions with CalcEngine.",
  },
  alternates: {
    canonical: "/category/salary-and-career",
  },
};

/* ------------------------------------------------------------------ */
/*  Page data                                                         */
/* ------------------------------------------------------------------ */

const CATEGORY_NAME = "Salary & Career";
const CATEGORY_SLUG = "salary-and-career";

const calculators = getCalculatorsByCategory(CATEGORY_SLUG);

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function SalaryAndCareerPage() {
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
          Your paycheck is more than just a number. Understanding how your compensation
          breaks down across pay periods, taxes, and benefits helps you negotiate better
          offers, set competitive freelance rates, and plan your household budget with
          confidence.
        </p>
        <p>
          Our salary and career tools cover every angle of compensation planning. Convert
          between hourly and annual pay, estimate your take-home pay after taxes and
          deductions, calculate overtime earnings, model the impact of a raise, figure out
          what to charge as a freelancer, compare cost of living between cities, split tips
          accurately, and explore how demographic factors influence wages. Whether you are
          evaluating a new job offer or optimizing your current income, these calculators
          put the numbers in perspective.
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
            name: "Salary & Career Calculators",
            description:
              "Free salary and career calculators for converting wages, estimating take-home pay, planning raises, setting freelance rates, comparing cost of living, and more. Make smarter compensation decisions with CalcEngine.",
            url: "https://calcengine.org/category/salary-and-career",
            numberOfItems: 9,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Salary to Hourly Converter", url: "https://calcengine.org/calculators/salary-to-hourly" },
              { "@type": "ListItem", position: 2, name: "Hourly to Salary Converter", url: "https://calcengine.org/calculators/hourly-to-salary" },
              { "@type": "ListItem", position: 3, name: "Take-Home Pay Calculator", url: "https://calcengine.org/calculators/take-home-pay-calculator" },
              { "@type": "ListItem", position: 4, name: "Overtime Calculator", url: "https://calcengine.org/calculators/overtime-calculator" },
              { "@type": "ListItem", position: 5, name: "Raise Calculator", url: "https://calcengine.org/calculators/raise-calculator" },
              { "@type": "ListItem", position: 6, name: "Freelance Rate Calculator", url: "https://calcengine.org/calculators/freelance-rate-calculator" },
              { "@type": "ListItem", position: 7, name: "Cost of Living Calculator", url: "https://calcengine.org/calculators/cost-of-living-calculator" },
              { "@type": "ListItem", position: 8, name: "Tip Calculator", url: "https://calcengine.org/calculators/tip-calculator" },
              { "@type": "ListItem", position: 9, name: "Wage Gap Calculator", url: "https://calcengine.org/calculators/wage-gap-calculator" },
            ],
          }),
        }}
      />
    </article>
  );
}
