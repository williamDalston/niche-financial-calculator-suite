import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AdUnit } from "@/components/ad-unit";
import {
  getCalculatorsForCategoryPage,
  type CalculatorInfo,
} from "@/data/calculators";

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Mortgage & Housing Calculators | CalcEngine",
  description:
    "Free mortgage and housing calculators to help you estimate monthly payments, determine home affordability, compare renting vs buying, and plan auto financing. Make smarter real estate decisions with CalcEngine.",
  openGraph: {
    title: "Mortgage & Housing Calculators | CalcEngine",
    description:
      "Free mortgage and housing calculators for monthly payments, home affordability, rent vs buy, and auto loans.",
    url: "https://calcengine.org/category/mortgage-and-housing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mortgage & Housing Calculators | CalcEngine",
    description:
      "Free mortgage and housing calculators to help you estimate monthly payments, determine home affordability, compare renting vs buying, and plan auto financing. Make smarter real estate decisions with CalcEngine.",
  },
  alternates: {
    canonical: "/category/mortgage-and-housing",
  },
};

/* ------------------------------------------------------------------ */
/*  Page data                                                         */
/* ------------------------------------------------------------------ */

const CATEGORY_NAME = "Mortgage & Housing";
const CATEGORY_SLUG = "mortgage-and-housing";

/**
 * Auto Loan is primarily in Debt & Loans but cross-listed here because
 * vehicle financing is a common part of household budget planning.
 */
const calculators = getCalculatorsForCategoryPage(CATEGORY_SLUG, [
  "auto-loan-calculator",
]);

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function MortgageAndHousingPage() {
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
          Whether you are a first-time home buyer estimating mortgage payments, a
          homeowner exploring refinancing options, or a renter weighing the long-term
          cost of buying versus renting, these calculators give you the clarity you need
          to make confident real estate decisions.
        </p>
        <p>
          Use our mortgage calculator to see exactly how much you will pay each month,
          the home affordability calculator to find out what price range fits your budget,
          or the rent vs buy tool to compare the total cost of ownership against renting
          over time. We have also included the auto loan calculator here because vehicle
          financing is a key part of household budget planning for most homeowners.
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
            name: "Mortgage & Housing Calculators",
            description:
              "Free mortgage and housing calculators to help you estimate monthly payments, determine home affordability, compare renting vs buying, and plan auto financing. Make smarter real estate decisions with CalcEngine.",
            url: "https://calcengine.org/category/mortgage-and-housing",
            numberOfItems: 4,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Mortgage Calculator", url: "https://calcengine.org/calculators/mortgage-calculator" },
              { "@type": "ListItem", position: 2, name: "Home Affordability Calculator", url: "https://calcengine.org/calculators/home-affordability-calculator" },
              { "@type": "ListItem", position: 3, name: "Rent vs Buy Calculator", url: "https://calcengine.org/calculators/rent-vs-buy-calculator" },
              { "@type": "ListItem", position: 4, name: "Auto Loan Calculator", url: "https://calcengine.org/calculators/auto-loan-calculator" },
            ],
          }),
        }}
      />
    </article>
  );
}
