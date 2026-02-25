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
  title: "Debt & Loan Calculators | CalcEngine",
  description:
    "Free debt and loan calculators for auto loans, student loans, personal loans, and debt payoff strategies. Understand your borrowing costs and create a plan to become debt-free with CalcEngine.",
  alternates: {
    canonical: "/category/debt-and-loans",
  },
};

/* ------------------------------------------------------------------ */
/*  Page data                                                         */
/* ------------------------------------------------------------------ */

const CATEGORY_NAME = "Debt & Loans";
const CATEGORY_SLUG = "debt-and-loans";

const calculators = getCalculatorsByCategory(CATEGORY_SLUG);

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function DebtAndLoansPage() {
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
          Understanding the true cost of borrowing is the first step toward taking
          control of your finances. A loan is more than just a monthly payment -- it is
          years of interest charges that can add up to thousands of dollars. Our debt and
          loan calculators help you see the full picture before you sign, and create a
          concrete plan to pay off what you already owe.
        </p>
        <p>
          Use the loan payment calculator to model any fixed-rate loan scenario, from
          personal loans to home equity lines. The auto loan calculator shows monthly
          payments and total cost for vehicle financing at different terms and rates. The
          student loan calculator helps graduates compare repayment plans -- standard,
          graduated, income-driven -- and see how extra payments shorten the timeline.
          Finally, the debt payoff calculator lets you enter all your debts and compare
          the avalanche method (highest interest first) against the snowball method
          (smallest balance first) to find the strategy that gets you debt-free fastest.
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
            name: "Debt & Loans Calculators",
            description:
              "Free debt and loan calculators for auto loans, student loans, personal loans, and debt payoff strategies. Understand your borrowing costs and create a plan to become debt-free with CalcEngine.",
            url: "https://calcengine.io/category/debt-and-loans",
            numberOfItems: 4,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Auto Loan Calculator", url: "https://calcengine.io/calculators/auto-loan-calculator" },
              { "@type": "ListItem", position: 2, name: "Loan Payment Calculator", url: "https://calcengine.io/calculators/loan-calculator" },
              { "@type": "ListItem", position: 3, name: "Student Loan Calculator", url: "https://calcengine.io/calculators/student-loan-calculator" },
              { "@type": "ListItem", position: 4, name: "Debt Payoff Calculator", url: "https://calcengine.io/calculators/debt-payoff-calculator" },
            ],
          }),
        }}
      />
    </article>
  );
}
