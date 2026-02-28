"use client";

import { useMemo } from "react";
import { useCalculatorState } from "@/hooks/use-calculator-state";
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
  const [state, setState, getShareUrl] = useCalculatorState({
    defaults: {
      currentCityIndex: defaultCurrentCityIndex,
      targetCityIndex: defaultTargetCityIndex,
      salary: 75000,
    },
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
    <div className="bg-[#162032] border border-[#1E293B] rounded-xl p-6 md:p-8">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
            Current City
          </label>
          <select
            value={state.currentCityIndex}
            onChange={(e) => setState('currentCityIndex', Number(e.target.value))}
            className="h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] px-3 py-3 text-[#F1F5F9] font-body transition-colors focus:border-[#3B82F6] focus:outline-none focus:ring-[3px] focus:ring-[#3B82F6]/15"
          >
            {cities.map((city, i) => (
              <option key={`current-${city.name}`} value={i}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
            Target City
          </label>
          <select
            value={state.targetCityIndex}
            onChange={(e) => setState('targetCityIndex', Number(e.target.value))}
            className="h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] px-3 py-3 text-[#F1F5F9] font-body transition-colors focus:border-[#3B82F6] focus:outline-none focus:ring-[3px] focus:ring-[#3B82F6]/15"
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
          <div className="mb-6 rounded-xl border border-[#1E293B] bg-[#0B1120] p-6 text-center">
            <p className="text-sm font-medium text-[#94A3B8] mb-2">
              Equivalent Salary in {results.targetCity}
            </p>
            <AnimatedNumber
              value={results.equivalentSalary}
              format="currency"
              decimals={0}
              className="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#22C55E] inline-block transition-transform duration-150"
            />
            <p className="text-xs text-[#94A3B8] mt-2">
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
          <ShareResults
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
            <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">
              Category Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1E293B]">
                    <th className="text-left py-2 px-3 text-[#94A3B8] font-medium">
                      Category
                    </th>
                    <th className="text-right py-2 px-3 text-[#94A3B8] font-medium">
                      {results.currentCity}
                    </th>
                    <th className="text-right py-2 px-3 text-[#94A3B8] font-medium">
                      {results.targetCity}
                    </th>
                    <th className="text-right py-2 px-3 text-[#94A3B8] font-medium">
                      Difference
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.categoryBreakdown.map((cat) => (
                    <tr
                      key={cat.category}
                      className="border-b border-[#1E293B]/50"
                    >
                      <td className="py-2 px-3 text-[#F1F5F9]">
                        {cat.category}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-[#F1F5F9]">
                        {cat.currentIndex}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-[#F1F5F9]">
                        {cat.targetIndex}
                      </td>
                      <td
                        className={`py-2 px-3 text-right font-mono font-medium ${
                          cat.difference > 0
                            ? "text-[#EF4444]"
                            : cat.difference < 0
                            ? "text-[#22C55E]"
                            : "text-[#94A3B8]"
                        }`}
                      >
                        {pct(cat.difference)}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-[#1E293B]">
                    <td className="py-2 px-3 text-[#F1F5F9] font-semibold">
                      Overall
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-semibold text-[#F1F5F9]">
                      {results.currentOverall}
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-semibold text-[#F1F5F9]">
                      {results.targetOverall}
                    </td>
                    <td
                      className={`py-2 px-3 text-right font-mono font-bold ${
                        results.percentDifference > 0
                          ? "text-[#EF4444]"
                          : results.percentDifference < 0
                          ? "text-[#22C55E]"
                          : "text-[#94A3B8]"
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
            <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">
              Category Comparison
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={results.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis
                  dataKey="category"
                  stroke="#94A3B8"
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                />
                <YAxis
                  stroke="#94A3B8"
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                  label={{
                    value: "Index (100 = avg)",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#94A3B8",
                    style: { fontSize: 11 },
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0B1120",
                    border: "1px solid #1E293B",
                    borderRadius: "8px",
                    color: "#F1F5F9",
                  }}
                />
                <Legend wrapperStyle={{ color: "#94A3B8" }} />
                <Bar
                  dataKey={results.currentCity}
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey={results.targetCity}
                  fill="#22C55E"
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
