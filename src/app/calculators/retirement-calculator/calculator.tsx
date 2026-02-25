"use client";

import { useMemo } from "react";
import { useCalculatorState } from "@/hooks/use-calculator-state";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  AnimatedNumber,
  CurrencyInput,
  CustomSlider,
  PercentageInput,
  ShareResults,
  StatCard,
} from "@/components/ui";
import { formatCurrency, formatCompact } from "@/lib/formatters";

export function RetirementCalculatorWidget() {
  const [state, setState, getShareUrl] = useCalculatorState({
    defaults: { currentAge: 30, retirementAge: 65, currentSavings: 50000, monthlyContribution: 500, annualReturn: 7, inflationRate: 3 },
  });
  const { currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn, inflationRate } = state;

  const results = useMemo(() => {
    const yearsToRetirement = Math.max(retirementAge - currentAge, 0);
    const monthlyRate = annualReturn / 100 / 12;
    const totalMonths = yearsToRetirement * 12;

    if (yearsToRetirement <= 0) {
      return {
        totalAtRetirement: currentSavings,
        totalContributions: currentSavings,
        totalGrowth: 0,
        inflationAdjusted: currentSavings,
        chartData: [],
      };
    }

    // Build year-by-year data
    const chartData: {
      age: number;
      year: number;
      contributions: number;
      growth: number;
      total: number;
      inflationAdjusted: number;
    }[] = [];

    let balance = currentSavings;
    let totalContributed = currentSavings;

    for (let year = 1; year <= yearsToRetirement; year++) {
      // Compound monthly for the year
      for (let month = 0; month < 12; month++) {
        balance = balance * (1 + monthlyRate) + monthlyContribution;
      }

      totalContributed += monthlyContribution * 12;
      const growth = balance - totalContributed;
      const inflationFactor = Math.pow(1 + inflationRate / 100, year);
      const inflationAdjusted = balance / inflationFactor;

      chartData.push({
        age: currentAge + year,
        year,
        contributions: Math.round(totalContributed),
        growth: Math.round(Math.max(growth, 0)),
        total: Math.round(balance),
        inflationAdjusted: Math.round(inflationAdjusted),
      });
    }

    const lastEntry = chartData[chartData.length - 1];
    const totalAtRetirement = lastEntry?.total || currentSavings;
    const totalContributionsFinal = lastEntry?.contributions || currentSavings;
    const totalGrowth = lastEntry?.growth || 0;
    const inflationAdjusted = lastEntry?.inflationAdjusted || currentSavings;

    return {
      totalAtRetirement,
      totalContributions: totalContributionsFinal,
      totalGrowth,
      inflationAdjusted,
      chartData,
    };
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn, inflationRate]);

  const yearsToRetirement = Math.max(retirementAge - currentAge, 0);

  const shareResultsData: Record<string, string> = {
    "Projected Savings": formatCurrency(results.totalAtRetirement),
    "Inflation-Adjusted": formatCurrency(results.inflationAdjusted),
    "Total Contributions": formatCurrency(results.totalContributions),
    "Investment Growth": formatCurrency(results.totalGrowth),
    "Years to Retire": String(yearsToRetirement),
  };

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#162032] p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          {/* Current Age */}
          <CustomSlider
            label="Current Age"
            value={currentAge}
            onChange={(v) => setState("currentAge", v)}
            min={18}
            max={80}
            step={1}
            formatValue={(v) => `${v} years`}
          />

          {/* Retirement Age */}
          <CustomSlider
            label="Retirement Age"
            value={retirementAge}
            onChange={(v) => setState("retirementAge", v)}
            min={Math.max(currentAge + 1, 19)}
            max={80}
            step={1}
            formatValue={(v) => `${v} years`}
          />

          {/* Current Savings */}
          <CurrencyInput
            label="Current Savings"
            value={currentSavings}
            onChange={(v) => setState("currentSavings", v)}
            min={0}
            step={1000}
          />

          {/* Monthly Contribution */}
          <div>
            <CurrencyInput
              label="Monthly Contribution"
              value={monthlyContribution}
              onChange={(v) => setState("monthlyContribution", v)}
              min={0}
              step={50}
            />
            <CustomSlider
              value={monthlyContribution}
              onChange={(v) => setState("monthlyContribution", v)}
              min={0}
              max={5000}
              step={50}
              formatValue={(v) => `$${v.toLocaleString()}/mo`}
              className="mt-3"
            />
          </div>

          {/* Expected Annual Return */}
          <div>
            <PercentageInput
              label="Expected Annual Return"
              value={annualReturn}
              onChange={(v) => setState("annualReturn", v)}
              min={0}
              max={15}
              step={0.5}
            />
            <CustomSlider
              value={annualReturn}
              onChange={(v) => setState("annualReturn", v)}
              min={0}
              max={15}
              step={0.5}
              formatValue={(v) => `${v}%`}
              className="mt-3"
            />
          </div>

          {/* Inflation Rate */}
          <CustomSlider
            label="Expected Inflation (%)"
            value={inflationRate}
            onChange={(v) => setState("inflationRate", v)}
            min={0}
            max={10}
            step={0.5}
            formatValue={(v) => `${v}%`}
          />
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Primary Result */}
          <div className="rounded-lg border border-l-[3px] border-[#1E293B] border-l-[#22C55E] bg-[#0B1120] p-5">
            <p className="mb-1 text-sm text-[#94A3B8]">
              Projected Savings at Age {retirementAge}
            </p>
            <AnimatedNumber
              value={results.totalAtRetirement}
              format="currency"
              decimals={0}
              className="font-mono text-4xl font-bold text-[#22C55E] inline-block transition-transform duration-150"
            />
            <div className="mt-2">
              <p className="text-xs text-[#94A3B8]">
                In today&apos;s dollars:{" "}
                <AnimatedNumber
                  value={results.inflationAdjusted}
                  format="currency"
                  decimals={0}
                  className="font-mono text-sm font-semibold text-[#94A3B8] inline-block"
                />
              </p>
            </div>
          </div>

          {/* StatCard Grid */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="Total at Retirement"
              highlight
              value={
                <AnimatedNumber
                  value={results.totalAtRetirement}
                  format="compact"
                  decimals={1}
                  className="font-mono text-2xl font-bold text-[#22C55E] inline-block"
                />
              }
              className="col-span-2"
            />
            <StatCard
              label="Total Contributions"
              value={
                <AnimatedNumber
                  value={results.totalContributions}
                  format="currency"
                  decimals={0}
                  className="font-mono text-lg font-bold text-[#3B82F6] inline-block"
                />
              }
            />
            <StatCard
              label="Investment Growth"
              value={
                <AnimatedNumber
                  value={results.totalGrowth}
                  format="currency"
                  decimals={0}
                  className="font-mono text-lg font-bold text-[#22C55E] inline-block"
                />
              }
              trend="up"
            />
            <StatCard
              label="Years to Retire"
              value={
                <AnimatedNumber
                  value={yearsToRetirement}
                  format="number"
                  decimals={0}
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
            />
            <StatCard
              label="Growth Multiple"
              value={
                results.totalContributions > 0
                  ? `${(results.totalAtRetirement / results.totalContributions).toFixed(1)}x`
                  : "N/A"
              }
            />
          </div>

          {/* Share Results */}
          <ShareResults
            title="Retirement Savings Projection"
            results={shareResultsData}
            getShareUrl={getShareUrl}
          />

          {/* Growth Chart */}
          {results.chartData.length > 0 && (
            <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
              <p className="mb-3 text-sm font-medium text-[#94A3B8]">Savings Growth Over Time</p>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={results.chartData}>
                  <defs>
                    <linearGradient id="gradContributions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="gradGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis
                    dataKey="age"
                    stroke="#94A3B8"
                    tick={{ fontSize: 11 }}
                    label={{ value: "Age", position: "insideBottom", offset: -5, fill: "#94A3B8" }}
                  />
                  <YAxis
                    stroke="#94A3B8"
                    tick={{ fontSize: 11 }}
                    tickFormatter={formatCompact}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#162032",
                      border: "1px solid #1E293B",
                      borderRadius: "8px",
                      color: "#F1F5F9",
                    }}
                    formatter={(value, name) => [
                      formatCurrency(value as number),
                      name,
                    ]}
                    labelFormatter={(label) => `Age ${label}`}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: 11, color: "#94A3B8" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="contributions"
                    stackId="1"
                    stroke="#3B82F6"
                    fill="url(#gradContributions)"
                    strokeWidth={2}
                    name="Total Contributions"
                  />
                  <Area
                    type="monotone"
                    dataKey="growth"
                    stackId="1"
                    stroke="#22C55E"
                    fill="url(#gradGrowth)"
                    strokeWidth={2}
                    name="Investment Growth"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Milestones */}
          {results.chartData.length > 0 && (
            <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
              <p className="mb-3 text-sm font-medium text-[#94A3B8]">Key Milestones</p>
              <div className="space-y-2">
                {[100000, 250000, 500000, 1000000, 2000000].map((milestone) => {
                  const entry = results.chartData.find((d) => d.total >= milestone);
                  if (!entry) return null;
                  return (
                    <div
                      key={milestone}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-[#94A3B8]">{formatCurrency(milestone)}</span>
                      <span className="font-mono text-[#F1F5F9]">
                        Age {entry.age} ({entry.year} years)
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
