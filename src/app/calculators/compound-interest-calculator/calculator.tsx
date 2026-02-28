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
import { formatCurrency, formatCurrencyExact, formatCompact } from "@/lib/formatters";

const COMPOUNDING_OPTIONS: Record<string, { label: string; n: number }> = {
  daily: { label: "Daily (365)", n: 365 },
  monthly: { label: "Monthly (12)", n: 12 },
  quarterly: { label: "Quarterly (4)", n: 4 },
  annually: { label: "Annually (1)", n: 1 },
};

export function CompoundInterestWidget() {
  const [state, setState, getShareUrl] = useCalculatorState({
    defaults: { principal: 10000, monthlyContribution: 200, interestRate: 7, compoundingFrequency: "monthly" as string, timePeriod: 20 },
  });
  const principal = state.principal;
  const monthlyContribution = state.monthlyContribution;
  const annualRate = state.interestRate;
  const compounding = state.compoundingFrequency;
  const years = state.timePeriod;

  const results = useMemo(() => {
    const rate = annualRate / 100;
    const n = COMPOUNDING_OPTIONS[compounding]?.n || 12;

    if (rate <= 0 || years <= 0) {
      const totalContributed = principal + monthlyContribution * 12 * years;
      return {
        finalBalance: totalContributed,
        totalContributions: totalContributed,
        totalInterest: 0,
        effectiveAnnualRate: 0,
        chartData: [],
      };
    }

    // Build year-by-year data
    const chartData: {
      year: number;
      contributions: number;
      interest: number;
      total: number;
    }[] = [];

    // Compute balance using periodic compounding with monthly contributions
    // For each compounding period, we add the contribution adjusted for frequency
    let balance = principal;
    let totalContributed = principal;

    // Contribution per compounding period
    // Monthly contribution needs to be distributed across compounding periods
    const periodsPerYear = n;
    const contributionPerPeriod = (monthlyContribution * 12) / periodsPerYear;
    const ratePerPeriod = rate / periodsPerYear;

    for (let year = 1; year <= years; year++) {
      for (let period = 0; period < periodsPerYear; period++) {
        balance = balance * (1 + ratePerPeriod) + contributionPerPeriod;
      }

      totalContributed += monthlyContribution * 12;
      const interest = Math.max(balance - totalContributed, 0);

      chartData.push({
        year,
        contributions: Math.round(totalContributed),
        interest: Math.round(interest),
        total: Math.round(balance),
      });
    }

    // Effective Annual Rate
    const ear = Math.pow(1 + rate / n, n) - 1;

    const lastEntry = chartData[chartData.length - 1];

    return {
      finalBalance: lastEntry?.total || principal,
      totalContributions: lastEntry?.contributions || principal,
      totalInterest: lastEntry?.interest || 0,
      effectiveAnnualRate: ear * 100,
      chartData,
    };
  }, [principal, monthlyContribution, annualRate, compounding, years]);

  const shareResultsData: Record<string, string> = {
    "Final Balance": formatCurrency(results.finalBalance),
    "Total Contributions": formatCurrency(results.totalContributions),
    "Interest Earned": formatCurrency(results.totalInterest),
    "Effective Annual Rate": `${results.effectiveAnnualRate.toFixed(2)}%`,
    "Time Period": `${years} years`,
  };

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#162032] p-6 md:p-8">
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          {/* Principal */}
          <div>
            <CurrencyInput
              label="Initial Investment (Principal)"
              value={principal}
              onChange={(v) => setState("principal", v)}
              min={0}
              max={500000}
              step={1000}
            />
            <CustomSlider
              value={principal}
              onChange={(v) => setState("principal", v)}
              min={0}
              max={500000}
              step={1000}
              formatValue={(v) =>
                v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
              }
              className="mt-3"
            />
          </div>

          {/* Monthly Contribution */}
          <div>
            <CurrencyInput
              label="Monthly Contribution"
              value={monthlyContribution}
              onChange={(v) => setState("monthlyContribution", v)}
              min={0}
              step={25}
            />
            <CustomSlider
              value={monthlyContribution}
              onChange={(v) => setState("monthlyContribution", v)}
              min={0}
              max={3000}
              step={25}
              formatValue={(v) => `$${v.toLocaleString()}/mo`}
              className="mt-3"
            />
          </div>

          {/* Annual Interest Rate */}
          <div>
            <PercentageInput
              label="Annual Interest Rate"
              value={annualRate}
              onChange={(v) => setState("interestRate", v)}
              min={0}
              max={25}
              step={0.25}
            />
            <CustomSlider
              value={annualRate}
              onChange={(v) => setState("interestRate", v)}
              min={1}
              max={15}
              step={0.25}
              formatValue={(v) => `${v}%`}
              className="mt-3"
            />
          </div>

          {/* Compounding Frequency */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Compounding Frequency
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(COMPOUNDING_OPTIONS).map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => setState("compoundingFrequency", key)}
                  className={`rounded-lg border px-3 py-2.5 text-xs font-medium transition-colors ${
                    compounding === key
                      ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                      : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Time Period */}
          <CustomSlider
            label="Time Period (Years)"
            value={years}
            onChange={(v) => setState("timePeriod", v)}
            min={1}
            max={50}
            step={1}
            formatValue={(v) => `${v} ${v === 1 ? "year" : "years"}`}
          />
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Primary Result */}
          <div className="rounded-lg border border-l-[3px] border-[#1E293B] border-l-[#22C55E] bg-[#0B1120] p-5">
            <p className="mb-1 text-sm text-[#94A3B8]">
              Final Balance After {years} {years === 1 ? "Year" : "Years"}
            </p>
            <AnimatedNumber
              value={results.finalBalance}
              format="currency"
              decimals={0}
              className="font-mono text-2xl sm:text-3xl font-bold text-[#22C55E] inline-block transition-transform duration-150"
            />
          </div>

          {/* Total Interest Earned */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-1 text-xs text-[#94A3B8]">Total Interest Earned</p>
            <AnimatedNumber
              value={results.totalInterest}
              format="currency"
              decimals={0}
              className="font-mono text-2xl font-bold text-[#22C55E] inline-block"
            />
          </div>

          {/* StatCard Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <StatCard
              label="Final Balance"
              highlight
              value={
                <AnimatedNumber
                  value={results.finalBalance}
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
              label="Interest Earned"
              value={
                <AnimatedNumber
                  value={results.totalInterest}
                  format="currency"
                  decimals={0}
                  className="font-mono text-lg font-bold text-[#22C55E] inline-block"
                />
              }
              trend="up"
            />
            <StatCard
              label="Effective Annual Rate"
              value={
                <AnimatedNumber
                  value={results.effectiveAnnualRate}
                  format="percent"
                  decimals={2}
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
            />
            <StatCard
              label="Interest / Contributions"
              value={
                results.totalContributions > 0
                  ? `${((results.totalInterest / results.totalContributions) * 100).toFixed(0)}%`
                  : "N/A"
              }
            />
          </div>

          {/* Share Results */}
          <ShareResults
            title="Compound Interest Calculation"
            results={shareResultsData}
            getShareUrl={getShareUrl}
          />

          {/* Growth Chart */}
          {results.chartData.length > 0 && (
            <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
              <p className="mb-3 text-sm font-medium text-[#94A3B8]">Growth Over Time</p>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={results.chartData}>
                  <defs>
                    <linearGradient id="gradContrib" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="gradInterest" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis
                    dataKey="year"
                    stroke="#94A3B8"
                    tick={{ fontSize: 11 }}
                    label={{
                      value: "Year",
                      position: "insideBottom",
                      offset: -5,
                      fill: "#94A3B8",
                    }}
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
                    labelFormatter={(label) => `Year ${label}`}
                  />
                  <Legend wrapperStyle={{ fontSize: 11, color: "#94A3B8" }} />
                  <Area
                    type="monotone"
                    dataKey="contributions"
                    stackId="1"
                    stroke="#3B82F6"
                    fill="url(#gradContrib)"
                    strokeWidth={2}
                    name="Total Contributions"
                  />
                  <Area
                    type="monotone"
                    dataKey="interest"
                    stackId="1"
                    stroke="#22C55E"
                    fill="url(#gradInterest)"
                    strokeWidth={2}
                    name="Interest Earned"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Year-by-Year Table */}
          {results.chartData.length > 0 && (
            <div>
              <p className="mb-3 text-sm font-medium text-[#94A3B8]">Year-by-Year Breakdown</p>
              <div className="max-h-64 overflow-y-auto rounded-lg border border-[#1E293B]">
                <table className="w-full text-sm">
                  <thead className="sticky top-0">
                    <tr className="border-b border-[#1E293B] bg-[#0B1120]">
                      <th className="px-3 py-2 text-left text-xs font-medium text-[#94A3B8]">Year</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-[#94A3B8]">Contributions</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-[#94A3B8]">Interest</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-[#94A3B8]">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E293B]">
                    {results.chartData.map((row) => (
                      <tr key={row.year} className="hover:bg-[#0B1120]/50">
                        <td className="px-3 py-2 text-[#F1F5F9]">{row.year}</td>
                        <td className="px-3 py-2 text-right font-mono text-[#3B82F6]">
                          {formatCurrency(row.contributions)}
                        </td>
                        <td className="px-3 py-2 text-right font-mono text-[#22C55E]">
                          {formatCurrency(row.interest)}
                        </td>
                        <td className="px-3 py-2 text-right font-mono text-[#F1F5F9]">
                          {formatCurrency(row.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
