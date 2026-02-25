"use client";

import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { CurrencyInput } from "@/components/ui/currency-input";
import { CustomSlider } from "@/components/ui/custom-slider";
import { PercentageInput } from "@/components/ui/percentage-input";
import { ShareResults } from "@/components/ui/share-results";
import { StatCard } from "@/components/ui/stat-card";
import { formatCurrency, formatCurrencyExact } from "@/lib/formatters";

const COLORS = {
  contributions: "#3B82F6",
  match: "#22C55E",
  growth: "#F59E0B",
  bg: "#0B1120",
  surface: "#162032",
  border: "#1E293B",
  textPrimary: "#F1F5F9",
  textMuted: "#94A3B8",
};

const FUND_COLORS: Record<string, string> = {
  G: "#94A3B8",
  F: "#3B82F6",
  C: "#22C55E",
  S: "#F59E0B",
  I: "#A855F7",
  L: "#EC4899",
};

interface FundOption {
  name: string;
  label: string;
  returnRate: number;
  description: string;
}

const TSP_FUNDS: FundOption[] = [
  { name: "G", label: "G Fund (Gov Securities)", returnRate: 3, description: "Government securities" },
  { name: "F", label: "F Fund (Fixed Income)", returnRate: 4, description: "Bond index" },
  { name: "C", label: "C Fund (Common Stock)", returnRate: 10, description: "S&P 500 index" },
  { name: "S", label: "S Fund (Small Cap)", returnRate: 11, description: "Small/mid cap index" },
  { name: "I", label: "I Fund (International)", returnRate: 8, description: "International index" },
  { name: "L", label: "Lifecycle Fund", returnRate: 7, description: "Target date blend" },
];

type ContributionType = "traditional" | "roth" | "mixed";

export function TspCalculatorWidget() {
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(62);
  const [currentBalance, setCurrentBalance] = useState(50000);
  const [payPeriodContribution, setPayPeriodContribution] = useState(750);
  const [annualSalary, setAnnualSalary] = useState(85000);
  const [selectedFund, setSelectedFund] = useState("C");
  const [contributionType, setContributionType] = useState<ContributionType>("traditional");
  const [employerMatchPct, setEmployerMatchPct] = useState(5);

  const expectedReturn = TSP_FUNDS.find((f) => f.name === selectedFund)?.returnRate ?? 7;

  const results = useMemo(() => {
    const yearsToRetirement = Math.max(retirementAge - currentAge, 0);
    const monthlyReturn = expectedReturn / 100 / 12;
    const payPeriodsPerYear = 26; // Biweekly
    const annualContribution = payPeriodContribution * payPeriodsPerYear;
    const monthlyContribution = annualContribution / 12;

    const annualMatch = annualSalary * (employerMatchPct / 100);
    const monthlyMatch = annualMatch / 12;

    let balance = currentBalance;
    let totalEmployeeContributions = currentBalance;
    let totalEmployerMatch = 0;

    const growthData: {
      age: number;
      balance: number;
      contributions: number;
      match: number;
      growth: number;
    }[] = [
      {
        age: currentAge,
        balance: Math.round(currentBalance),
        contributions: Math.round(currentBalance),
        match: 0,
        growth: 0,
      },
    ];

    for (let y = 1; y <= yearsToRetirement; y++) {
      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + monthlyReturn) + monthlyContribution + monthlyMatch;
      }
      totalEmployeeContributions += annualContribution;
      totalEmployerMatch += annualMatch;

      const investmentGrowth = balance - totalEmployeeContributions - totalEmployerMatch;

      growthData.push({
        age: currentAge + y,
        balance: Math.round(balance),
        contributions: Math.round(totalEmployeeContributions),
        match: Math.round(totalEmployerMatch),
        growth: Math.round(Math.max(investmentGrowth, 0)),
      });
    }

    const projectedBalance = balance;
    const investmentGrowth = projectedBalance - totalEmployeeContributions - totalEmployerMatch;

    // Monthly income using 4% rule
    const annualWithdrawal = projectedBalance * 0.04;
    const monthlyIncome = annualWithdrawal / 12;

    // Tax considerations
    const traditionalTaxNote = contributionType === "traditional"
      ? "Withdrawals taxed as ordinary income"
      : contributionType === "roth"
      ? "Qualified withdrawals are tax-free"
      : "Traditional portion taxed; Roth portion tax-free";

    // Pie chart data for fund allocation visual
    const allocationData = [
      { name: TSP_FUNDS.find((f) => f.name === selectedFund)?.label ?? selectedFund, value: 100 },
    ];

    return {
      projectedBalance,
      totalEmployeeContributions,
      totalEmployerMatch,
      investmentGrowth,
      monthlyIncome,
      annualWithdrawal,
      traditionalTaxNote,
      growthData,
      allocationData,
      annualContribution,
      annualMatch,
    };
  }, [currentAge, retirementAge, currentBalance, payPeriodContribution, annualSalary, expectedReturn, employerMatchPct, contributionType, selectedFund]);

  // Pie data for balance composition
  const compositionData = [
    { name: "Your Contributions", value: Math.round(results.totalEmployeeContributions) },
    { name: "Employer Match", value: Math.round(results.totalEmployerMatch) },
    { name: "Investment Growth", value: Math.round(Math.max(results.investmentGrowth, 0)) },
  ].filter((d) => d.value > 0);

  const COMPOSITION_COLORS = [COLORS.contributions, COLORS.match, COLORS.growth];

  const shareResultsData = {
    "Projected Balance": formatCurrency(results.projectedBalance),
    "Monthly Income (4% Rule)": formatCurrencyExact(results.monthlyIncome),
    "Employee Contributions": formatCurrency(results.totalEmployeeContributions),
    "Employer Match": formatCurrency(results.totalEmployerMatch),
    "Investment Growth": formatCurrency(Math.max(results.investmentGrowth, 0)),
  };

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#162032] p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Ages */}
          <CustomSlider
            label="Current Age"
            value={currentAge}
            onChange={setCurrentAge}
            min={18}
            max={80}
            step={1}
            formatValue={(v) => `${v} years`}
          />

          <CustomSlider
            label="Retirement Age"
            value={retirementAge}
            onChange={setRetirementAge}
            min={50}
            max={80}
            step={1}
            formatValue={(v) => `${v} years`}
          />

          {/* Current TSP Balance */}
          <CurrencyInput
            label="Current TSP Balance"
            value={currentBalance}
            onChange={setCurrentBalance}
            min={0}
            step={5000}
          />
          <CustomSlider
            value={currentBalance}
            onChange={setCurrentBalance}
            min={0}
            max={1000000}
            step={5000}
            formatValue={(v) => `$${(v / 1000).toFixed(0)}k`}
          />

          {/* Pay Period Contribution */}
          <CurrencyInput
            label="Pay Period Contribution"
            value={payPeriodContribution}
            onChange={setPayPeriodContribution}
            min={0}
            step={50}
          />
          <p className="text-xs text-[#94A3B8]">
            {formatCurrency(payPeriodContribution * 26)}/year (26 pay periods)
          </p>

          {/* Annual Salary */}
          <CurrencyInput
            label="Annual Salary"
            value={annualSalary}
            onChange={setAnnualSalary}
            min={0}
            step={1000}
          />

          {/* Employer Match */}
          <PercentageInput
            label="Employer Match (% of salary)"
            value={employerMatchPct}
            onChange={setEmployerMatchPct}
            min={0}
            max={10}
            step={0.5}
          />
          <p className="text-xs text-[#94A3B8]">
            FERS auto 1% + up to 4% match = 5% max. Match = {formatCurrency(annualSalary * employerMatchPct / 100)}/year
          </p>

          {/* Fund Selection */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Investment Fund
            </label>
            <div className="grid grid-cols-3 gap-2">
              {TSP_FUNDS.map((fund) => (
                <button
                  key={fund.name}
                  onClick={() => setSelectedFund(fund.name)}
                  className={`rounded-lg border px-3 py-3 text-xs font-medium transition-colors ${
                    selectedFund === fund.name
                      ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                      : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
                  }`}
                >
                  <span className="block text-sm font-bold">{fund.name}</span>
                  <span className="block">{fund.returnRate}% avg</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contribution Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Contribution Type
            </label>
            <div className="flex gap-2">
              {(["traditional", "roth", "mixed"] as ContributionType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setContributionType(type)}
                  className={`flex-1 rounded-lg border px-3 py-3 text-sm font-medium capitalize transition-colors ${
                    contributionType === type
                      ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                      : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Primary Result: Projected Balance */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-5 text-center">
            <p className="mb-2 text-sm text-[#94A3B8]">Projected Balance at Retirement</p>
            <AnimatedNumber value={results.projectedBalance} format="currency" />
          </div>

          {/* StatCard Grid */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="Projected Balance"
              value={<AnimatedNumber value={results.projectedBalance} format="currency" className="font-mono text-2xl font-bold text-[#22C55E] inline-block" />}
              highlight
            />
            <StatCard
              label="Monthly Income (4% Rule)"
              value={<AnimatedNumber value={results.monthlyIncome} format="currency" decimals={2} className="font-mono text-lg font-bold text-[#F1F5F9] inline-block" />}
            />
            <StatCard
              label="Employee Contributions"
              value={<AnimatedNumber value={results.totalEmployeeContributions} format="currency" className="font-mono text-lg font-bold text-[#F1F5F9] inline-block" />}
            />
            <StatCard
              label="Employer Match"
              value={<AnimatedNumber value={results.totalEmployerMatch} format="currency" className="font-mono text-lg font-bold text-[#F1F5F9] inline-block" />}
            />
            <StatCard
              label="Investment Growth"
              value={<AnimatedNumber value={Math.max(results.investmentGrowth, 0)} format="currency" className="font-mono text-lg font-bold text-[#F1F5F9] inline-block" />}
              trend="up"
            />
          </div>

          {/* Share Results */}
          <ShareResults title="TSP Calculator Results" results={shareResultsData} />

          {/* Tax Note */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="text-sm text-[#94A3B8]">
              <span className="font-medium text-[#F1F5F9]">Tax Note:</span> {results.traditionalTaxNote}
            </p>
          </div>

          {/* Growth Area Chart */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">TSP Growth Over Time</p>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={results.growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis
                  dataKey="age"
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
                  formatter={(value) => formatCurrency(value as number)}
                />
                <Legend wrapperStyle={{ color: COLORS.textMuted, fontSize: 12 }} />
                <Area
                  type="monotone"
                  dataKey="contributions"
                  stackId="1"
                  stroke={COLORS.contributions}
                  fill={COLORS.contributions}
                  fillOpacity={0.6}
                  name="Your Contributions"
                />
                <Area
                  type="monotone"
                  dataKey="match"
                  stackId="1"
                  stroke={COLORS.match}
                  fill={COLORS.match}
                  fillOpacity={0.6}
                  name="Employer Match"
                />
                <Area
                  type="monotone"
                  dataKey="growth"
                  stackId="1"
                  stroke={COLORS.growth}
                  fill={COLORS.growth}
                  fillOpacity={0.6}
                  name="Investment Growth"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Balance Composition Pie Chart */}
          {compositionData.length > 0 && (
            <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
              <p className="mb-3 text-sm font-medium text-[#94A3B8]">Balance Composition</p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={compositionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {compositionData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COMPOSITION_COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: COLORS.surface,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "8px",
                      color: COLORS.textPrimary,
                    }}
                    formatter={(value) => formatCurrency(value as number)}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 flex flex-wrap justify-center gap-4 text-xs">
                {compositionData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-sm"
                      style={{ backgroundColor: COMPOSITION_COLORS[index] }}
                    />
                    <span className="text-[#94A3B8]">
                      {entry.name} ({results.projectedBalance > 0 ? Math.round((entry.value / results.projectedBalance) * 100) : 0}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
