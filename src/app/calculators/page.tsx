import type { Metadata } from "next";
import { CalculatorSearch } from "@/components/calculator-search";
import { CalculatorFilter } from "@/components/calculator-filter";
import { calculators } from "@/data/calculators";

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "All Calculators | CalcEngine",
  description:
    "Browse all 30 free financial calculators: mortgage, salary, retirement, tax, debt, and government pay tools. Filter by category, search by name.",
  alternates: {
    canonical: "/calculators",
  },
};

/* ------------------------------------------------------------------ */
/*  Build searchable list for the client search component              */
/* ------------------------------------------------------------------ */

const searchableCalcs = calculators.map((c) => ({
  name: c.title,
  href: `/calculators/${c.slug}`,
  category: c.category.name,
  icon: c.icon,
}));

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function AllCalculatorsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      {/* ---- Header ---- */}
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        All Calculators
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-[#94A3B8]">
        Browse and search all 30 free financial calculators. Filter by category
        or search by name.
      </p>

      {/* ---- Search bar ---- */}
      <div className="mt-8 w-full max-w-2xl">
        <CalculatorSearch calculators={searchableCalcs} />
      </div>

      {/* ---- Filter tabs + grid (client component) ---- */}
      <div className="mt-10">
        <CalculatorFilter />
      </div>
    </section>
  );
}
