"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { CurrencyInput } from "@/components/ui/currency-input";
import { CustomSlider } from "@/components/ui/custom-slider";
import { PercentageInput } from "@/components/ui/percentage-input";
import { ShareResults } from "@/components/ui/share-results";
import { StatCard } from "@/components/ui/stat-card";
import { useCalculatorState } from "@/hooks/use-calculator-state";
import { formatCurrency, formatCurrencyExact } from "@/lib/formatters";

const COLORS = {
  annuity: "#3B82F6",
  supplement: "#22C55E",
  tsp: "#F59E0B",
  socialSecurity: "#A855F7",
  bg: "#0B1120",
  surface: "#162032",
  border: "#1E293B",
  textPrimary: "#F1F5F9",
  textMuted: "#94A3B8",
};

export function FersRetirementCalculatorWidget() {
  const [state, setState, getShareUrl] = useCalculatorState({
    defaults: {
      currentAge: 45,
      retirementAge: 62,
      yearsOfService: 20,
      high3Salary: 95000,
      tspBalance: 150000,
      tspMonthlyContribution: 800,
      expectedTspReturn: 7,
      fersSupplementEligible: "true" as string,
      socialSecurityEstimate: 2200,
    },
  });

  const fersSupplementEligible = state.fersSupplementEligible === "true";

  const results = useMemo(() => {
    const yearsToRetirement = Math.max(state.retirementAge - state.currentAge, 0);
    const totalYearsOfService = state.yearsOfService + yearsToRetirement;

    // FERS Basic Annuity calculation
    const multiplier = state.retirementAge >= 62 && totalYearsOfService >= 20 ? 0.011 : 0.01;
    const annualAnnuity = multiplier * totalYearsOfService * state.high3Salary;
    const monthlyAnnuity = annualAnnuity / 12;

    // FERS Supplement
    const monthlySupplementEstimate = fersSupplementEligible && state.retirementAge < 62
      ? (totalYearsOfService / 40) * state.socialSecurityEstimate
      : 0;

    // TSP projected balance at retirement
    const monthlyReturn = state.expectedTspReturn / 100 / 12;
    const months = yearsToRetirement * 12;
    let projectedTsp = state.tspBalance;
    const tspGrowthData: { year: number; balance: number }[] = [
      { year: state.currentAge, balance: Math.round(state.tspBalance) },
    ];

    for (let y = 1; y <= yearsToRetirement; y++) {
      for (let m = 0; m < 12; m++) {
        projectedTsp = projectedTsp * (1 + monthlyReturn) + state.tspMonthlyContribution;
      }
      tspGrowthData.push({
        year: state.currentAge + y,
        balance: Math.round(projectedTsp),
      });
    }

    // Monthly TSP income using 4% rule
    const monthlyTspIncome = (projectedTsp * 0.04) / 12;

    // Social Security
    const monthlySocialSecurity = state.retirementAge >= 62 ? state.socialSecurityEstimate : 0;

    // Total monthly retirement income
    const totalMonthlyIncome = monthlyAnnuity + monthlySupplementEstimate + monthlyTspIncome + monthlySocialSecurity;

    // Annual totals
    const totalAnnualIncome = totalMonthlyIncome * 12;

    // Replacement rate
    const replacementRate = state.high3Salary > 0 ? (totalAnnualIncome / state.high3Salary) * 100 : 0;

    // Total employee contributions to TSP
    const totalContributions = state.tspBalance + (state.tspMonthlyContribution * months);
    const investmentGrowth = projectedTsp - totalContributions;

    // Income sources for stacked bar
    const incomeSources = [
      {
        source: "At Retirement",
        annuity: Math.round(monthlyAnnuity),
        supplement: Math.round(monthlySupplementEstimate),
        tsp: Math.round(monthlyTspIncome),
        socialSecurity: Math.round(monthlySocialSecurity),
      },
    ];

    return {
      monthlyAnnuity,
      annualAnnuity,
      multiplier,
      totalYearsOfService,
      monthlySupplementEstimate,
      projectedTsp,
      monthlyTspIncome,
      monthlySocialSecurity,
      totalMonthlyIncome,
      totalAnnualIncome,
      replacementRate,
      tspGrowthData,
      incomeSources,
      totalContributions,
      investmentGrowth,
    };
  }, [
    state.currentAge, state.retirementAge, state.yearsOfService, state.high3Salary, state.tspBalance,
    state.tspMonthlyContribution, state.expectedTspReturn, fersSupplementEligible, state.socialSecurityEstimate,
  ]);

  // Build stacked bar data for income sources
  const incomeBarData = [
    {
      name: "Monthly Income",
      "FERS Annuity": Math.round(results.monthlyAnnuity),
      "FERS Supplement": Math.round(results.monthlySupplementEstimate),
      "TSP (4% Rule)": Math.round(results.monthlyTspIncome),
      "Social Security": Math.round(results.monthlySocialSecurity),
    },
  ];

  const shareResultsData = {
    "Total Monthly Income": formatCurrencyExact(results.totalMonthlyIncome),
    "FERS Annuity": formatCurrencyExact(results.monthlyAnnuity),
    "FERS Supplement": results.monthlySupplementEstimate > 0 ? formatCurrencyExact(results.monthlySupplementEstimate) : "N/A",
    "TSP Income": formatCurrencyExact(results.monthlyTspIncome),
    "Social Security": results.monthlySocialSecurity > 0 ? formatCurrencyExact(results.monthlySocialSecurity) : "At age 62",
    "Replacement Rate": `${results.replacementRate.toFixed(1)}%`,
  };

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#162032] p-6 md:p-8">
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Ages */}
          <CustomSlider
            label="Current Age"
            value={state.currentAge}
            onChange={(v) => setState('currentAge', v)}
            min={18}
            max={80}
            step={1}
            formatValue={(v) => `${v} years`}
          />

          <CustomSlider
            label="Planned Retirement Age"
            value={state.retirementAge}
            onChange={(v) => setState('retirementAge', v)}
            min={50}
            max={80}
            step={1}
            formatValue={(v) => `${v} years`}
          />

          {/* Years of Service */}
          <CustomSlider
            label="Current Years of Federal Service"
            value={state.yearsOfService}
            onChange={(v) => setState('yearsOfService', v)}
            min={0}
            max={40}
            step={1}
            formatValue={(v) => `${v} yr${v !== 1 ? "s" : ""}`}
          />

          {/* High-3 Average Salary */}
          <CurrencyInput
            label="High-3 Average Salary"
            value={state.high3Salary}
            onChange={(v) => setState('high3Salary', v)}
            min={0}
            step={1000}
          />
          <CustomSlider
            value={state.high3Salary}
            onChange={(v) => setState('high3Salary', v)}
            min={30000}
            max={200000}
            step={1000}
            formatValue={(v) => `$${(v / 1000).toFixed(0)}k`}
          />

          {/* TSP Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <CurrencyInput
              label="Current TSP Balance"
              value={state.tspBalance}
              onChange={(v) => setState('tspBalance', v)}
              min={0}
              step={5000}
            />
            <CurrencyInput
              label="TSP Monthly Contribution"
              value={state.tspMonthlyContribution}
              onChange={(v) => setState('tspMonthlyContribution', v)}
              min={0}
              step={50}
            />
          </div>

          {/* Expected Return */}
          <PercentageInput
            label="Expected TSP Return"
            value={state.expectedTspReturn}
            onChange={(v) => setState('expectedTspReturn', v)}
            min={0}
            max={15}
            step={0.5}
          />

          {/* FERS Supplement Eligible */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              FERS Supplement Eligible
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setState('fersSupplementEligible', "true")}
                className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                  fersSupplementEligible
                    ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                    : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setState('fersSupplementEligible', "false")}
                className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                  !fersSupplementEligible
                    ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                    : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* Social Security Estimate */}
          <CurrencyInput
            label="Estimated Social Security ($/month at 62)"
            value={state.socialSecurityEstimate}
            onChange={(v) => setState('socialSecurityEstimate', v)}
            min={0}
            step={50}
          />
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Primary Result: Total Monthly Income */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-5 text-center">
            <p className="mb-2 text-sm text-[#94A3B8]">Total Monthly Retirement Income</p>
            <AnimatedNumber value={results.totalMonthlyIncome} format="currency" decimals={2} />
            <p className="mt-1 text-xs text-[#94A3B8]">
              {results.replacementRate.toFixed(1)}% replacement rate
            </p>
          </div>

          {/* StatCard Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <StatCard
              label="Total Monthly Income"
              value={<AnimatedNumber value={results.totalMonthlyIncome} format="currency" decimals={2} className="font-mono text-2xl font-bold text-[#22C55E] inline-block" />}
              highlight
            />
            <StatCard
              label="FERS Annuity"
              value={<AnimatedNumber value={results.monthlyAnnuity} format="currency" decimals={2} className="font-mono text-lg font-bold text-[#F1F5F9] inline-block" />}
              subvalue={`${(results.multiplier * 100).toFixed(1)}% x ${results.totalYearsOfService} yrs`}
            />
            <StatCard
              label="FERS Supplement"
              value={
                results.monthlySupplementEstimate > 0
                  ? <AnimatedNumber value={results.monthlySupplementEstimate} format="currency" decimals={2} className="font-mono text-lg font-bold text-[#F1F5F9] inline-block" />
                  : "N/A"
              }
              subvalue={results.monthlySupplementEstimate > 0 ? "Until age 62" : undefined}
            />
            <StatCard
              label="TSP Income"
              value={<AnimatedNumber value={results.monthlyTspIncome} format="currency" decimals={2} className="font-mono text-lg font-bold text-[#F1F5F9] inline-block" />}
              subvalue={`From ${formatCurrency(results.projectedTsp)}`}
            />
            <StatCard
              label="Social Security"
              value={
                results.monthlySocialSecurity > 0
                  ? <AnimatedNumber value={results.monthlySocialSecurity} format="currency" decimals={2} className="font-mono text-lg font-bold text-[#F1F5F9] inline-block" />
                  : "At age 62"
              }
            />
            <StatCard
              label="Replacement Rate"
              value={<AnimatedNumber value={results.replacementRate} format="percent" decimals={1} className="font-mono text-lg font-bold text-[#F1F5F9] inline-block" />}
            />
          </div>

          {/* Share Results */}
          <ShareResults title="FERS Retirement Calculator Results" results={shareResultsData} getShareUrl={getShareUrl} />

          {/* Annual Summary */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">Annual Summary</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">FERS Annuity</span>
                <span className="font-mono text-[#3B82F6]">{formatCurrency(results.annualAnnuity)}/yr</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">FERS Supplement</span>
                <span className="font-mono text-[#22C55E]">{formatCurrency(results.monthlySupplementEstimate * 12)}/yr</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">TSP Withdrawal</span>
                <span className="font-mono text-[#F59E0B]">{formatCurrency(results.monthlyTspIncome * 12)}/yr</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Social Security</span>
                <span className="font-mono text-[#A855F7]">{formatCurrency(results.monthlySocialSecurity * 12)}/yr</span>
              </div>
              <div className="border-t border-[#1E293B] pt-2 flex justify-between text-sm font-semibold">
                <span className="text-[#F1F5F9]">Total Annual Income</span>
                <span className="font-mono text-[#22C55E]">{formatCurrency(results.totalAnnualIncome)}/yr</span>
              </div>
            </div>
          </div>

          {/* Stacked Bar Chart */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">Retirement Income Sources</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={incomeBarData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis
                  type="number"
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <YAxis type="category" dataKey="name" stroke={COLORS.textMuted} tick={{ fontSize: 12 }} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: COLORS.surface,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "8px",
                    color: COLORS.textPrimary,
                  }}
                  formatter={(value) => formatCurrency(value as number)}
                />
                <Legend wrapperStyle={{ color: COLORS.textMuted, fontSize: 12 }} />
                <Bar dataKey="FERS Annuity" stackId="a" fill={COLORS.annuity} />
                <Bar dataKey="FERS Supplement" stackId="a" fill={COLORS.supplement} />
                <Bar dataKey="TSP (4% Rule)" stackId="a" fill={COLORS.tsp} />
                <Bar dataKey="Social Security" stackId="a" fill={COLORS.socialSecurity} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* TSP Growth Line Chart */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">TSP Balance Growth</p>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={results.tspGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis
                  dataKey="year"
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 12 }}
                  label={{ value: "Age", position: "insideBottom", offset: -5, fill: COLORS.textMuted }}
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
                  formatter={(value) => [formatCurrency(value as number), "TSP Balance"]}
                />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke={COLORS.tsp}
                  strokeWidth={2}
                  dot={false}
                  name="TSP Balance"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
