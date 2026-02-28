"use client";

import { useState, useMemo } from "react";
import { useCalculatorState } from "@/hooks/use-calculator-state";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  AnimatedNumber,
  CurrencyInput,
  CustomSlider,
  PercentageInput,
  ShareResults,
  StatCard,
} from "@/components/ui";
import { formatCurrency, formatCurrencyExact } from "@/lib/formatters";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const COLORS = {
  pension: "#22C55E",
  cola: "#3B82F6",
  survivor: "#F59E0B",
  lumpSum: "#A855F7",
  bg: "#0B1120",
  surface: "#162032",
  border: "#1E293B",
  textPrimary: "#F1F5F9",
  textMuted: "#94A3B8",
};

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type SalaryBasis = "final" | "high3" | "high5";
type SurvivorOption = "none" | "50" | "75" | "100";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PensionCalculatorWidget() {
  const [state, setState, getShareUrl] = useCalculatorState({
    defaults: {
      currentAge: 45,
      retirementAge: 62,
      yearsOfService: 25,
      finalSalary: 85000,
      salaryBasis: "high3" as string,
      pensionMultiplier: 2,
      colaRate: 2,
      survivorOption: "none" as string,
    },
  });
  const [showLumpSum, setShowLumpSum] = useState(false);

  const results = useMemo(() => {
    // Salary basis adjustment (high-3 and high-5 are typically slightly lower)
    let effectiveSalary = state.finalSalary;
    if (state.salaryBasis === "high3") {
      effectiveSalary = state.finalSalary * 0.97; // Approximate: average of highest 3 years
    } else if (state.salaryBasis === "high5") {
      effectiveSalary = state.finalSalary * 0.94; // Approximate: average of highest 5 years
    }

    // Basic pension calculation
    const annualPension = effectiveSalary * (state.pensionMultiplier / 100) * state.yearsOfService;
    const monthlyPension = annualPension / 12;
    const replacementRate = effectiveSalary > 0 ? (annualPension / effectiveSalary) * 100 : 0;

    // Survivor benefit reduction
    const survivorReductions: Record<SurvivorOption, number> = {
      none: 1.0,
      "50": 0.90,   // ~10% reduction for 50% survivor benefit
      "75": 0.85,   // ~15% reduction
      "100": 0.80,  // ~20% reduction
    };
    const survivorFactor = survivorReductions[state.survivorOption as SurvivorOption];
    const adjustedMonthlyPension = monthlyPension * survivorFactor;
    const adjustedAnnualPension = annualPension * survivorFactor;

    const survivorMonthlyBenefit = state.survivorOption === "none"
      ? 0
      : adjustedMonthlyPension * (parseInt(state.survivorOption) / 100);

    // COLA projections
    const colaProjections: {
      year: number;
      age: number;
      annualIncome: number;
      cumulativeIncome: number;
    }[] = [];
    let cumulativeIncome = 0;
    let currentPension = adjustedAnnualPension;

    for (let year = 0; year < 30; year++) {
      const age = state.retirementAge + year;
      if (year > 0) {
        currentPension *= (1 + state.colaRate / 100);
      }
      cumulativeIncome += currentPension;
      colaProjections.push({
        year: year + 1,
        age,
        annualIncome: Math.round(currentPension),
        cumulativeIncome: Math.round(cumulativeIncome),
      });
    }

    // COLA-adjusted values at specific milestones
    const at5 = colaProjections[4]?.annualIncome ?? 0;
    const at10 = colaProjections[9]?.annualIncome ?? 0;
    const at20 = colaProjections[19]?.annualIncome ?? 0;

    // Lump sum equivalent (present value of 30 years of pension at 5% discount rate)
    const discountRate = 0.05;
    let lumpSum = 0;
    let pensionForLumpSum = adjustedAnnualPension;
    for (let year = 1; year <= 30; year++) {
      if (year > 1) pensionForLumpSum *= (1 + state.colaRate / 100);
      lumpSum += pensionForLumpSum / Math.pow(1 + discountRate, year);
    }

    // Survivor option comparison data
    const survivorComparisonData = [
      { name: "No Survivor", monthly: Math.round(monthlyPension), reduction: 0 },
      { name: "50% Survivor", monthly: Math.round(monthlyPension * 0.90), reduction: 10 },
      { name: "75% Survivor", monthly: Math.round(monthlyPension * 0.85), reduction: 15 },
      { name: "100% Survivor", monthly: Math.round(monthlyPension * 0.80), reduction: 20 },
    ];

    return {
      monthlyPension: adjustedMonthlyPension,
      annualPension: adjustedAnnualPension,
      replacementRate,
      survivorMonthlyBenefit,
      colaProjections,
      at5,
      at10,
      at20,
      lumpSum,
      survivorComparisonData,
    };
  }, [state.finalSalary, state.salaryBasis, state.pensionMultiplier, state.yearsOfService, state.colaRate, state.survivorOption, state.retirementAge]);

  const shareResultsData: Record<string, string> = {
    "Monthly Pension": formatCurrencyExact(results.monthlyPension),
    "Annual Pension": formatCurrency(results.annualPension),
    "Replacement Rate": `${results.replacementRate.toFixed(1)}%`,
    "10yr COLA Value": formatCurrency(results.at10),
    ...(state.survivorOption !== "none"
      ? { "Survivor Benefit": formatCurrencyExact(results.survivorMonthlyBenefit) + "/mo" }
      : {}),
    "Lump Sum Equivalent": formatCurrency(results.lumpSum),
  };

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#162032] p-6 md:p-8">
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Current Age */}
          <CustomSlider
            label="Current Age"
            value={state.currentAge}
            onChange={(v) => setState('currentAge', v)}
            min={18}
            max={80}
            step={1}
            formatValue={(v) => `${v} yrs`}
          />

          {/* Retirement Age */}
          <CustomSlider
            label="Retirement Age"
            value={state.retirementAge}
            onChange={(v) => setState('retirementAge', v)}
            min={50}
            max={70}
            step={1}
            formatValue={(v) => `${v} yrs`}
          />

          {/* Years of Service */}
          <CustomSlider
            label="Years of Service"
            value={state.yearsOfService}
            onChange={(v) => setState('yearsOfService', v)}
            min={0}
            max={40}
            step={1}
            formatValue={(v) => `${v} yr${v !== 1 ? "s" : ""}`}
          />

          {/* Final Salary */}
          <div>
            <CurrencyInput
              label="Final Average Salary"
              value={state.finalSalary}
              onChange={(v) => setState('finalSalary', v)}
              min={0}
              step={1000}
            />
            <CustomSlider
              value={state.finalSalary}
              onChange={(v) => setState('finalSalary', v)}
              min={30000}
              max={250000}
              step={1000}
              formatValue={(v) => `$${(v / 1000).toFixed(0)}k`}
              className="mt-3"
            />
          </div>

          {/* Salary Basis */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">Salary Basis</label>
            <div className="flex gap-2" role="radiogroup" aria-label="Salary Basis">
              {([
                { value: "final", label: "Final Salary" },
                { value: "high3", label: "High-3" },
                { value: "high5", label: "High-5" },
              ] as const).map((option) => (
                <button
                  key={option.value}
                  role="radio"
                  aria-checked={state.salaryBasis === option.value}
                  onClick={() => setState('salaryBasis', option.value)}
                  className={`flex-1 rounded-lg border px-3 py-3 text-sm font-medium transition-colors ${
                    state.salaryBasis === option.value
                      ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                      : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pension Multiplier */}
          <PercentageInput
            label="Pension Multiplier (% per year of service)"
            value={state.pensionMultiplier}
            onChange={(v) => setState('pensionMultiplier', v)}
            min={0.5}
            max={4}
            step={0.1}
          />

          {/* COLA Rate */}
          <PercentageInput
            label="COLA Rate (% annual increase)"
            value={state.colaRate}
            onChange={(v) => setState('colaRate', v)}
            min={0}
            max={5}
            step={0.25}
          />

          {/* Survivor Benefit */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">Survivor Benefit Option</label>
            <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Survivor Benefit Option">
              {([
                { value: "none", label: "None" },
                { value: "50", label: "50%" },
                { value: "75", label: "75%" },
                { value: "100", label: "100%" },
              ] as const).map((option) => (
                <button
                  key={option.value}
                  role="radio"
                  aria-checked={state.survivorOption === option.value}
                  onClick={() => setState('survivorOption', option.value)}
                  className={`rounded-lg border px-3 py-3 text-sm font-medium transition-colors ${
                    state.survivorOption === option.value
                      ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                      : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lump Sum Toggle */}
          <div>
            <button
              onClick={() => setShowLumpSum(!showLumpSum)}
              className="flex items-center gap-2 text-sm font-medium text-[#3B82F6] hover:text-[#22C55E] transition-colors"
            >
              <svg
                className={`h-4 w-4 transition-transform ${showLumpSum ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              {showLumpSum ? "Hide" : "Show"} Lump Sum Comparison
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* StatCard Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <StatCard
              label="Monthly Pension Benefit"
              highlight
              value={
                <AnimatedNumber
                  value={results.monthlyPension}
                  format="currency"
                  decimals={2}
                  className="font-mono text-2xl font-bold text-[#22C55E] inline-block"
                />
              }
              className="col-span-2"
            />
            <StatCard
              label="Annual Pension"
              value={
                <AnimatedNumber
                  value={results.annualPension}
                  format="currency"
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
            />
            <StatCard
              label="Replacement Rate"
              value={
                <AnimatedNumber
                  value={results.replacementRate}
                  format="number"
                  decimals={1}
                  suffix="%"
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
            />
            <StatCard
              label="10yr COLA Value"
              value={
                <AnimatedNumber
                  value={results.at10}
                  format="currency"
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
            />
            {state.survivorOption !== "none" && (
              <StatCard
                label="Survivor Monthly Benefit"
                value={
                  <AnimatedNumber
                    value={results.survivorMonthlyBenefit}
                    format="currency"
                    decimals={2}
                    className="font-mono text-lg font-bold text-[#F59E0B] inline-block"
                  />
                }
              />
            )}
            {showLumpSum && (
              <StatCard
                label="Lump Sum Equivalent"
                value={
                  <AnimatedNumber
                    value={results.lumpSum}
                    format="currency"
                    className="font-mono text-lg font-bold text-[#A855F7] inline-block"
                  />
                }
                subvalue="at 5% discount rate over 30 years"
              />
            )}
          </div>

          {/* Share Results */}
          <ShareResults
            title="Pension Calculation Results"
            results={shareResultsData}
            getShareUrl={getShareUrl}
          />

          {/* COLA Milestones */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">COLA-Adjusted Annual Income</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              <div>
                <p className="text-xs text-[#94A3B8]">Year 5</p>
                <p className="font-mono text-sm font-bold text-[#F1F5F9]">{formatCurrency(results.at5)}</p>
              </div>
              <div>
                <p className="text-xs text-[#94A3B8]">Year 10</p>
                <p className="font-mono text-sm font-bold text-[#F1F5F9]">{formatCurrency(results.at10)}</p>
              </div>
              <div>
                <p className="text-xs text-[#94A3B8]">Year 20</p>
                <p className="font-mono text-sm font-bold text-[#F1F5F9]">{formatCurrency(results.at20)}</p>
              </div>
            </div>
          </div>

          {/* Line Chart: COLA Projections */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">Pension Income Over 30 Years (with COLA)</p>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={results.colaProjections}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis
                  dataKey="year"
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 12 }}
                  label={{ value: "Years in Retirement", position: "insideBottom", offset: -5, fill: COLORS.textMuted }}
                />
                <YAxis
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: COLORS.surface,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "8px",
                    color: COLORS.textPrimary,
                  }}
                  formatter={(value, name) => [
                    formatCurrency(value as number),
                    name === "annualIncome" ? "Annual Income" : "Cumulative Income",
                  ]}
                />
                <Legend wrapperStyle={{ color: COLORS.textMuted, fontSize: 12 }} />
                <Line type="monotone" dataKey="annualIncome" stroke={COLORS.pension} strokeWidth={2} dot={false} name="Annual Income" />
                <Line type="monotone" dataKey="cumulativeIncome" stroke={COLORS.cola} strokeWidth={2} dot={false} name="Cumulative Income" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart: Survivor Options */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">Survivor Benefit Options Comparison</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={results.survivorComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis
                  dataKey="name"
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: COLORS.surface,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "8px",
                    color: COLORS.textPrimary,
                  }}
                  formatter={(value) => formatCurrencyExact(value as number)}
                />
                <Bar dataKey="monthly" name="Monthly Pension" radius={[4, 4, 0, 0]}>
                  {results.survivorComparisonData.map((_, index) => (
                    <Cell
                      key={`surv-${index}`}
                      fill={index === 0 ? COLORS.pension : index === 1 ? COLORS.cola : index === 2 ? COLORS.survivor : COLORS.lumpSum}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
