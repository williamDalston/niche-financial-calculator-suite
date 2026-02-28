"use client";

import { useState } from "react";
import Link from "next/link";
import { calculators, categories } from "@/data/calculators";
import type { CalculatorInfo } from "@/data/calculators";

/* ------------------------------------------------------------------ */
/*  Build category list for filter pills                               */
/* ------------------------------------------------------------------ */

const ALL_LABEL = "All";

const categoryList = [
  { label: ALL_LABEL, slug: "all" },
  ...Object.values(categories).map((c) => ({
    label: c.name,
    slug: c.slug,
  })),
];

/* ------------------------------------------------------------------ */
/*  Deduplicate calculators (some appear in multiple categories)        */
/* ------------------------------------------------------------------ */

function deduplicateCalculators(calcs: CalculatorInfo[]): CalculatorInfo[] {
  const seen = new Set<string>();
  const result: CalculatorInfo[] = [];
  for (const calc of calcs) {
    if (!seen.has(calc.slug)) {
      seen.add(calc.slug);
      result.push(calc);
    }
  }
  return result;
}

const allCalculators = deduplicateCalculators(calculators);

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function CalculatorFilter() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? allCalculators
      : allCalculators.filter((c) => c.category.slug === activeCategory);

  return (
    <>
      {/* ---- Filter pills (horizontally scrollable) ---- */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {categoryList.map((cat) => {
          const isActive = activeCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setActiveCategory(cat.slug)}
              className={`flex-shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-accent-primary/10 border-accent-primary text-accent-primary"
                  : "bg-transparent border-border text-text-muted hover:border-text-muted/50 hover:text-text-primary"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* ---- Calculator card grid ---- */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((calc) => (
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
              <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent-primary transition-colors truncate">
                {calc.title}
              </h3>
              <p className="mt-0.5 text-xs font-medium text-accent-secondary">
                {calc.category.name}
              </p>
              <p className="mt-1 text-xs text-text-muted leading-relaxed line-clamp-2">
                {calc.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* ---- Empty state ---- */}
      {filtered.length === 0 && (
        <div className="mt-12 text-center text-sm text-text-muted">
          No calculators found in this category.
        </div>
      )}
    </>
  );
}
