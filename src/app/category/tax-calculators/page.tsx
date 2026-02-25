import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  getCalculatorsByCategory,
  type CalculatorInfo,
} from "@/data/calculators";

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Tax Calculators | CalcEngine",
  description:
    "Free tax calculators to estimate federal income tax, take-home pay after deductions, and self-employment tax for freelancers and small business owners. File smarter with CalcEngine.",
  alternates: {
    canonical: "/category/tax-calculators",
  },
};

/* ------------------------------------------------------------------ */
/*  Page data                                                         */
/* ------------------------------------------------------------------ */

const CATEGORY_NAME = "Tax Calculators";
const CATEGORY_SLUG = "tax-calculators";

const calculators = getCalculatorsByCategory(CATEGORY_SLUG);

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function TaxCalculatorsPage() {
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
        {CATEGORY_NAME}
      </h1>

      {/* Category description */}
      <div className="mb-10 max-w-3xl text-text-muted leading-relaxed">
        <p className="mb-4">
          Nobody likes tax surprises. Whether you are a salaried employee trying to
          estimate your April liability, a freelancer setting aside quarterly estimated
          payments, or a small business owner planning for self-employment taxes, knowing
          your numbers ahead of time keeps you in control.
        </p>
        <p>
          Use the federal tax estimator to get a ballpark of your income tax based on
          filing status, income, and deductions. The take-home pay calculator goes a step
          further by showing you what actually lands in your bank account after federal and
          state taxes, Social Security, Medicare, and any pre-tax deductions are applied.
          If you work for yourself, the self-employment tax calculator breaks down the
          15.3% SE tax (12.4% Social Security plus 2.9% Medicare) and shows how the
          deductible employer-equivalent portion reduces your adjusted gross income. These
          tools are designed for planning purposes and do not replace professional tax
          advice.
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
                item: "https://calcengine.io/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: CATEGORY_NAME,
                item: `https://calcengine.io/category/${CATEGORY_SLUG}`,
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
            name: "Tax Calculators",
            description:
              "Free tax calculators to estimate federal income tax, take-home pay after deductions, and self-employment tax for freelancers and small business owners. File smarter with CalcEngine.",
            url: "https://calcengine.io/category/tax-calculators",
            numberOfItems: 3,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Federal Tax Estimator", url: "https://calcengine.io/calculators/federal-tax-calculator" },
              { "@type": "ListItem", position: 2, name: "Take-Home Pay Calculator", url: "https://calcengine.io/calculators/take-home-pay-calculator" },
              { "@type": "ListItem", position: 3, name: "Self-Employment Tax Calculator", url: "https://calcengine.io/calculators/self-employment-tax-calculator" },
            ],
          }),
        }}
      />
    </article>
  );
}
