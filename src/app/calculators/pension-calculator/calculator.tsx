"use client";

import { useState, useMemo } from "react";
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
  const [currentAge, setCurrentAge] = useState(45);
  const [retirementAge, setRetirementAge] = useState(62);
  const [yearsOfService, setYearsOfService] = useState(25);
  const [finalSalary, setFinalSalary] = useState(85000);
  const [salaryBasis, setSalaryBasis] = useState<SalaryBasis>("high3");
  const [pensionMultiplier, setPensionMultiplier] = useState(2);
  const [colaRate, setColaRate] = useState(2);
  const [survivorOption, setSurvivorOption] = useState<SurvivorOption>("none");
  const [showLumpSum, setShowLumpSum] = useState(false);

  const results = useMemo(() => {
    // Salary basis adjustment (high-3 and high-5 are typically slightly lower)
    let effectiveSalary = finalSalary;
    if (salaryBasis === "high3") {
      effectiveSalary = finalSalary * 0.97; // Approximate: average of highest 3 years
    } else if (salaryBasis === "high5") {
      effectiveSalary = finalSalary * 0.94; // Approximate: average of highest 5 years
    }

    // Basic pension calculation
    const annualPension = effectiveSalary * (pensionMultiplier / 100) * yearsOfService;
    const monthlyPension = annualPension / 12;
    const replacementRate = effectiveSalary > 0 ? (annualPension / effectiveSalary) * 100 : 0;

    // Survivor benefit reduction
    const survivorReductions: Record<SurvivorOption, number> = {
      none: 1.0,
      "50": 0.90,   // ~10% reduction for 50% survivor benefit
      "75": 0.85,   // ~15% reduction
      "100": 0.80,  // ~20% reduction
    };
    const survivorFactor = survivorReductions[survivorOption];
    const adjustedMonthlyPension = monthlyPension * survivorFactor;
    const adjustedAnnualPension = annualPension * survivorFactor;

    const survivorMonthlyBenefit = survivorOption === "none"
      ? 0
      : adjustedMonthlyPension * (parseInt(survivorOption) / 100);

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
      const age = retirementAge + year;
      if (year > 0) {
        currentPension *= (1 + colaRate / 100);
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
      if (year > 1) pensionForLumpSum *= (1 + colaRate / 100);
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
  }, [finalSalary, salaryBasis, pensionMultiplier, yearsOfService, colaRate, survivorOption, retirementAge]);

  const shareResultsData: Record<string, string> = {
    "Monthly Pension": formatCurrencyExact(results.monthlyPension),
    "Annual Pension": formatCurrency(results.annualPension),
    "Replacement Rate": `${results.replacementRate.toFixed(1)}%`,
    "10yr COLA Value": formatCurrency(results.at10),
    ...(survivorOption !== "none"
      ? { "Survivor Benefit": formatCurrencyExact(results.survivorMonthlyBenefit) + "/mo" }
      : {}),
    "Lump Sum Equivalent": formatCurrency(results.lumpSum),
  };

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#162032] p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Current Age */}
          <CustomSlider
            label="Current Age"
            value={currentAge}
            onChange={setCurrentAge}
            min={18}
            max={80}
            step={1}
            formatValue={(v) => `${v} yrs`}
          />

          {/* Retirement Age */}
          <CustomSlider
            label="Retirement Age"
            value={retirementAge}
            onChange={setRetirementAge}
            min={50}
            max={70}
            step={1}
            formatValue={(v) => `${v} yrs`}
          />

          {/* Years of Service */}
          <CustomSlider
            label="Years of Service"
            value={yearsOfService}
            onChange={setYearsOfService}
            min={0}
            max={40}
            step={1}
            formatValue={(v) => `${v} yr${v !== 1 ? "s" : ""}`}
          />

          {/* Final Salary */}
          <div>
            <CurrencyInput
              label="Final Average Salary"
              value={finalSalary}
              onChange={setFinalSalary}
              min={0}
              step={1000}
            />
            <CustomSlider
              value={finalSalary}
              onChange={setFinalSalary}
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
            <div className="flex gap-2">
              {([
                { value: "final", label: "Final Salary" },
                { value: "high3", label: "High-3" },
                { value: "high5", label: "High-5" },
              ] as const).map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSalaryBasis(option.value)}
                  className={`flex-1 rounded-lg border px-3 py-3 text-sm font-medium transition-colors ${
                    salaryBasis === option.value
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
            value={pensionMultiplier}
            onChange={setPensionMultiplier}
            min={0.5}
            max={4}
            step={0.1}
          />

          {/* COLA Rate */}
          <PercentageInput
            label="COLA Rate (% annual increase)"
            value={colaRate}
            onChange={setColaRate}
            min={0}
            max={5}
            step={0.25}
          />

          {/* Survivor Benefit */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">Survivor Benefit Option</label>
            <div className="grid grid-cols-2 gap-2">
              {([
                { value: "none", label: "None" },
                { value: "50", label: "50%" },
                { value: "75", label: "75%" },
                { value: "100", label: "100%" },
              ] as const).map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSurvivorOption(option.value)}
                  className={`rounded-lg border px-3 py-3 text-sm font-medium transition-colors ${
                    survivorOption === option.value
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
          <div className="grid grid-cols-2 gap-4">
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
            {survivorOption !== "none" && (
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
          />

          {/* COLA Milestones */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">COLA-Adjusted Annual Income</p>
            <div className="grid grid-cols-3 gap-3">
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
