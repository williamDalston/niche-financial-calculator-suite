"use client";

import { useMemo } from "react";
import { useCalculatorState } from "@/hooks/use-calculator-state";
import { useChartColors } from "@/hooks/use-chart-colors";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import colData from "@/data/cost-of-living.json";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { CurrencyInput } from "@/components/ui/currency-input";
import { CustomSlider } from "@/components/ui/custom-slider";
import { ShareResults } from "@/components/ui/share-results";
import { StatCard } from "@/components/ui/stat-card";
import { formatCurrency as fmt } from "@/lib/formatters";

function pct(n: number): string {
  const sign = n >= 0 ? "+" : "";
  return `${sign}${n.toFixed(1)}%`;
}

const cities = colData.cities;
const categoryLabels: { key: string; label: string }[] = [
  { key: "housing", label: "Housing" },
  { key: "grocery", label: "Grocery" },
  { key: "transportation", label: "Transportation" },
  { key: "healthcare", label: "Healthcare" },
  { key: "utilities", label: "Utilities" },
];

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

const IconDollar = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const IconTrendingUp = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
    <polyline points="17,6 23,6 23,12" />
  </svg>
);

const IconPercent = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const defaultCurrentCityIndex = cities.findIndex((c) => c.name.includes("Chicago")) ?? 0;
const defaultTargetCityIndex = cities.findIndex((c) => c.name.includes("New York")) ?? 1;

export function CostOfLivingCalculatorWidget() {
  const COLORS = useChartColors();
  const [state, setState, getShareUrl] = useCalculatorState({
    defaults: {
      currentCityIndex: defaultCurrentCityIndex,
      targetCityIndex: defaultTargetCityIndex,
      salary: 75000,
    }, slug: "cost-of-living-calculator",
  });

  const results = useMemo(() => {
    const current = cities[state.currentCityIndex];
    const target = cities[state.targetCityIndex];

    if (!current || !target || state.salary <= 0) return null;

    const equivalentSalary = state.salary * (target.overall / current.overall);
    const difference = equivalentSalary - state.salary;
    const percentDifference = ((target.overall - current.overall) / current.overall) * 100;

    // Category breakdown
    const categoryBreakdown = categoryLabels.map(({ key, label }) => {
      const currentVal = current[key as keyof typeof current] as number;
      const targetVal = target[key as keyof typeof target] as number;
      const diff = ((targetVal - currentVal) / currentVal) * 100;
      return {
        category: label,
        currentIndex: currentVal,
        targetIndex: targetVal,
        difference: diff,
      };
    });

    // Chart data for grouped bar
    const chartData = categoryLabels.map(({ key, label }) => ({
      category: label,
      [current.name]: current[key as keyof typeof current] as number,
      [target.name]: target[key as keyof typeof target] as number,
    }));

    return {
      currentCity: current.name,
      targetCity: target.name,
      currentOverall: current.overall,
      targetOverall: target.overall,
      equivalentSalary,
      difference,
      percentDifference,
      categoryBreakdown,
      chartData,
    };
  }, [state.currentCityIndex, state.targetCityIndex, state.salary]);

  return (
    <div className="bg-bg-surface border border-border rounded-xl p-6 md:p-8">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div>
          <label className="mb-2 block text-sm font-medium text-text-muted">
            Current City
          </label>
          <select
            value={state.currentCityIndex}
            onChange={(e) => setState('currentCityIndex', Number(e.target.value))}
            className="h-12 w-full rounded-lg border border-border bg-bg-primary px-3 py-3 text-text-primary font-body transition-colors focus:border-accent-secondary focus:outline-none focus:ring-[3px] focus:ring-accent-secondary/15"
          >
            {cities.map((city, i) => (
              <option key={`current-${city.name}`} value={i}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-text-muted">
            Target City
          </label>
          <select
            value={state.targetCityIndex}
            onChange={(e) => setState('targetCityIndex', Number(e.target.value))}
            className="h-12 w-full rounded-lg border border-border bg-bg-primary px-3 py-3 text-text-primary font-body transition-colors focus:border-accent-secondary focus:outline-none focus:ring-[3px] focus:ring-accent-secondary/15"
          >
            {cities.map((city, i) => (
              <option key={`target-${city.name}`} value={i}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <CurrencyInput
            label="Current Annual Salary"
            value={state.salary}
            onChange={(v) => setState('salary', v)}
            min={0}
            max={10000000}
            step={1000}
          />
        </div>
      </div>

      {/* Salary slider */}
      <div className="mb-8">
        <CustomSlider
          label="Adjust Salary"
          value={state.salary}
          onChange={(v) => setState('salary', v)}
          min={20000}
          max={500000}
          step={1000}
          formatValue={(v) => fmt(v)}
        />
      </div>

      {/* Results */}
      {results && (
        <>
          {/* Hero result */}
          <div className="mb-6 rounded-xl border border-border bg-bg-primary p-6 text-center">
            <p className="text-sm font-medium text-text-muted mb-2">
              Equivalent Salary in {results.targetCity}
            </p>
            <AnimatedNumber
              value={results.equivalentSalary}
              format="currency"
              decimals={0}
              className="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-accent-primary inline-block transition-transform duration-150"
            />
            <p className="text-xs text-text-muted mt-2">
              to maintain the same standard of living
            </p>
          </div>

          {/* StatCard grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatCard
              label={`Equivalent Salary in ${results.targetCity}`}
              value={fmt(results.equivalentSalary)}
              icon={IconDollar}
              highlight
            />
            <StatCard
              label="Salary Difference"
              value={`${results.difference >= 0 ? "+" : ""}${fmt(results.difference)}`}
              icon={IconTrendingUp}
              trend={results.difference >= 0 ? "up" : "down"}
              subvalue={results.difference >= 0 ? "You would need more" : "You would need less"}
            />
            <StatCard
              label="Cost of Living Difference"
              value={pct(results.percentDifference)}
              icon={IconPercent}
              trend={results.percentDifference >= 0 ? "up" : "down"}
              subvalue={`${results.targetCity} vs ${results.currentCity}`}
            />
          </div>

          {/* Share Results */}
          <ShareResults slug="cost-of-living-calculator"
            title="Cost of Living Calculator — CalcEngine.io"
            results={{
              "Current City": results.currentCity,
              "Target City": results.targetCity,
              "Current Salary": fmt(state.salary),
              "Equivalent Salary": fmt(results.equivalentSalary),
              Difference: `${results.difference >= 0 ? "+" : ""}${fmt(results.difference)}`,
              "COL Difference": pct(results.percentDifference),
            }}
            getShareUrl={getShareUrl}
            className="mb-8"
          />

          {/* Category breakdown */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Category Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-text-muted font-medium">
                      Category
                    </th>
                    <th className="text-right py-2 px-3 text-text-muted font-medium">
                      {results.currentCity}
                    </th>
                    <th className="text-right py-2 px-3 text-text-muted font-medium">
                      {results.targetCity}
                    </th>
                    <th className="text-right py-2 px-3 text-text-muted font-medium">
                      Difference
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.categoryBreakdown.map((cat) => (
                    <tr
                      key={cat.category}
                      className="border-b border-border/50"
                    >
                      <td className="py-2 px-3 text-text-primary">
                        {cat.category}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-text-primary">
                        {cat.currentIndex}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-text-primary">
                        {cat.targetIndex}
                      </td>
                      <td
                        className={`py-2 px-3 text-right font-mono font-medium ${
                          cat.difference > 0
                            ? "text-accent-danger"
                            : cat.difference < 0
                            ? "text-accent-primary"
                            : "text-text-muted"
                        }`}
                      >
                        {pct(cat.difference)}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-border">
                    <td className="py-2 px-3 text-text-primary font-semibold">
                      Overall
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-semibold text-text-primary">
                      {results.currentOverall}
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-semibold text-text-primary">
                      {results.targetOverall}
                    </td>
                    <td
                      className={`py-2 px-3 text-right font-mono font-bold ${
                        results.percentDifference > 0
                          ? "text-accent-danger"
                          : results.percentDifference < 0
                          ? "text-accent-primary"
                          : "text-text-muted"
                      }`}
                    >
                      {pct(results.percentDifference)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Chart */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Category Comparison
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={results.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis
                  dataKey="category"
                  stroke={COLORS.textMuted}
                  tick={{ fill: COLORS.textMuted, fontSize: 12 }}
                />
                <YAxis
                  stroke={COLORS.textMuted}
                  tick={{ fill: COLORS.textMuted, fontSize: 12 }}
                  label={{
                    value: "Index (100 = avg)",
                    angle: -90,
                    position: "insideLeft",
                    fill: COLORS.textMuted,
                    style: { fontSize: 11 },
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: COLORS.surface,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "8px",
                    color: COLORS.textPrimary,
                  }}
                />
                <Legend wrapperStyle={{ color: COLORS.textMuted }} />
                <Bar
                  dataKey={results.currentCity}
                  fill={COLORS.blue}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey={results.targetCity}
                  fill={COLORS.green}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
