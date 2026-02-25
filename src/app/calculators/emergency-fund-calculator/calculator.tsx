"use client";

import { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  AnimatedNumber,
  CurrencyInput,
  ShareResults,
  StatCard,
} from "@/components/ui";
import { formatCurrency } from "@/lib/formatters";

const COLORS = {
  primary: "#22C55E",
  secondary: "#3B82F6",
  warning: "#F59E0B",
  danger: "#EF4444",
  purple: "#A855F7",
  cyan: "#06B6D4",
  bg: "#0B1120",
  surface: "#162032",
  border: "#1E293B",
  textPrimary: "#F1F5F9",
  textMuted: "#94A3B8",
};

const EXPENSE_COLORS = [
  COLORS.primary,
  COLORS.secondary,
  COLORS.warning,
  COLORS.danger,
  COLORS.purple,
  COLORS.cyan,
];

const RISK_OPTIONS = [
  { label: "Conservative (6 months)", value: 6, key: "conservative" },
  { label: "Moderate (4 months)", value: 4, key: "moderate" },
  { label: "Aggressive (3 months)", value: 3, key: "aggressive" },
];

export function EmergencyFundCalculatorWidget() {
  const [housing, setHousing] = useState(1500);
  const [food, setFood] = useState(600);
  const [transportation, setTransportation] = useState(400);
  const [insurance, setInsurance] = useState(300);
  const [utilities, setUtilities] = useState(250);
  const [debtPayments, setDebtPayments] = useState(200);
  const [currentSavings, setCurrentSavings] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [riskTolerance, setRiskTolerance] = useState(6);

  const results = useMemo(() => {
    const totalMonthlyExpenses =
      housing + food + transportation + insurance + utilities + debtPayments;
    const targetAmount = totalMonthlyExpenses * riskTolerance;
    const amountNeeded = Math.max(targetAmount - currentSavings, 0);
    const progressPercent =
      targetAmount > 0
        ? Math.min((currentSavings / targetAmount) * 100, 100)
        : 0;
    const monthsToFunded =
      monthlyContribution > 0 && amountNeeded > 0
        ? Math.ceil(amountNeeded / monthlyContribution)
        : amountNeeded <= 0
        ? 0
        : Infinity;

    // Savings growth projection
    const projectionData: { month: number; savings: number; target: number }[] =
      [];
    const projectionMonths =
      monthsToFunded === Infinity
        ? 24
        : Math.max(monthsToFunded + 3, 12);
    for (let m = 0; m <= Math.min(projectionMonths, 60); m++) {
      projectionData.push({
        month: m,
        savings: Math.min(currentSavings + monthlyContribution * m, targetAmount),
        target: targetAmount,
      });
    }

    return {
      totalMonthlyExpenses,
      targetAmount,
      amountNeeded,
      progressPercent,
      monthsToFunded,
      projectionData,
    };
  }, [
    housing,
    food,
    transportation,
    insurance,
    utilities,
    debtPayments,
    currentSavings,
    monthlyContribution,
    riskTolerance,
  ]);

  const expenseBreakdown = [
    { name: "Housing", value: housing },
    { name: "Food", value: food },
    { name: "Transportation", value: transportation },
    { name: "Insurance", value: insurance },
    { name: "Utilities", value: utilities },
    { name: "Debt Payments", value: debtPayments },
  ].filter((e) => e.value > 0);

  const shareResultsData: Record<string, string> = {
    "Target Amount": formatCurrency(results.targetAmount),
    "Current Savings": formatCurrency(currentSavings),
    "Progress": `${results.progressPercent.toFixed(1)}%`,
    "Amount Needed": formatCurrency(results.amountNeeded),
    "Months to Goal": results.monthsToFunded === Infinity
      ? "N/A"
      : results.monthsToFunded === 0
      ? "Fully funded"
      : `${results.monthsToFunded} months`,
    "Monthly Expenses": formatCurrency(results.totalMonthlyExpenses),
  };

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#162032] p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#94A3B8]">
            Monthly Essential Expenses
          </h3>

          <CurrencyInput
            label="Housing (Rent/Mortgage)"
            value={housing}
            onChange={setHousing}
            min={0}
            max={10000}
            step={50}
          />

          <CurrencyInput
            label="Food / Groceries"
            value={food}
            onChange={setFood}
            min={0}
            max={5000}
            step={25}
          />

          <CurrencyInput
            label="Transportation"
            value={transportation}
            onChange={setTransportation}
            min={0}
            max={5000}
            step={25}
          />

          <CurrencyInput
            label="Insurance (Health, Life, etc.)"
            value={insurance}
            onChange={setInsurance}
            min={0}
            max={5000}
            step={25}
          />

          <CurrencyInput
            label="Utilities (Electric, Water, Internet)"
            value={utilities}
            onChange={setUtilities}
            min={0}
            max={3000}
            step={25}
          />

          <CurrencyInput
            label="Minimum Debt Payments"
            value={debtPayments}
            onChange={setDebtPayments}
            min={0}
            max={10000}
            step={25}
          />

          <hr className="border-[#1E293B]" />

          <CurrencyInput
            label="Current Emergency Savings"
            value={currentSavings}
            onChange={setCurrentSavings}
            min={0}
            max={500000}
            step={100}
          />

          <CurrencyInput
            label="Monthly Savings Contribution"
            value={monthlyContribution}
            onChange={setMonthlyContribution}
            min={0}
            max={20000}
            step={50}
          />

          {/* Risk Tolerance */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Risk Tolerance
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              {RISK_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setRiskTolerance(opt.value)}
                  className={`flex-1 rounded-lg border px-3 py-3 text-sm font-medium transition-colors ${
                    riskTolerance === opt.value
                      ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                      : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Primary Result: Target Amount */}
          <div className="rounded-lg border border-l-[3px] border-[#1E293B] border-l-[#22C55E] bg-[#0B1120] p-5">
            <p className="mb-1 text-sm text-[#94A3B8]">Target Emergency Fund</p>
            <AnimatedNumber
              value={results.targetAmount}
              format="currency"
              decimals={0}
              className="font-mono text-3xl font-bold text-[#22C55E] inline-block transition-transform duration-150"
            />
            <p className="mt-1 text-xs text-[#94A3B8]">
              {riskTolerance} months of essential expenses
            </p>
          </div>

          {/* Progress Bar */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-5">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm text-[#94A3B8]">Progress</p>
              <AnimatedNumber
                value={results.progressPercent}
                format="percent"
                decimals={1}
                className="font-mono text-sm font-bold text-[#F1F5F9] inline-block"
              />
            </div>
            <div className="h-4 w-full overflow-hidden rounded-full bg-[#1E293B]">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${results.progressPercent}%`,
                  backgroundColor:
                    results.progressPercent >= 100
                      ? COLORS.primary
                      : results.progressPercent >= 50
                      ? COLORS.warning
                      : COLORS.danger,
                }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-[#94A3B8]">
              <span>{formatCurrency(currentSavings)} saved</span>
              <span>{formatCurrency(results.targetAmount)} target</span>
            </div>
          </div>

          {/* Months to Funded */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-1 text-xs text-[#94A3B8]">Months to Fully Funded</p>
            {results.monthsToFunded === Infinity ? (
              <p className="font-mono text-2xl font-bold text-[#F59E0B]">
                N/A (no monthly contribution)
              </p>
            ) : results.monthsToFunded === 0 ? (
              <p className="font-mono text-2xl font-bold text-[#22C55E]">
                Fully funded!
              </p>
            ) : (
              <AnimatedNumber
                value={results.monthsToFunded}
                format="number"
                decimals={0}
                suffix=" months"
                className="font-mono text-2xl font-bold text-[#3B82F6] inline-block"
              />
            )}
          </div>

          {/* Amount Still Needed */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-1 text-xs text-[#94A3B8]">Amount Still Needed</p>
            <AnimatedNumber
              value={results.amountNeeded}
              format="currency"
              decimals={0}
              className="font-mono text-2xl font-bold text-[#F59E0B] inline-block"
            />
          </div>

          {/* StatCard Grid */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="Target Amount"
              highlight
              value={
                <AnimatedNumber
                  value={results.targetAmount}
                  format="compact"
                  decimals={1}
                  className="font-mono text-2xl font-bold text-[#22C55E] inline-block"
                />
              }
              className="col-span-2"
            />
            <StatCard
              label="Current Progress"
              value={
                <AnimatedNumber
                  value={results.progressPercent}
                  format="percent"
                  decimals={1}
                  className="font-mono text-lg font-bold text-[#3B82F6] inline-block"
                />
              }
              trend={results.progressPercent >= 100 ? "up" : "neutral"}
            />
            <StatCard
              label="Months to Goal"
              value={
                results.monthsToFunded === Infinity
                  ? "N/A"
                  : results.monthsToFunded === 0
                  ? "Done!"
                  : `${results.monthsToFunded}`
              }
            />
            <StatCard
              label="Monthly Expenses"
              value={
                <AnimatedNumber
                  value={results.totalMonthlyExpenses}
                  format="currency"
                  decimals={0}
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
            />
            <StatCard
              label="Amount Needed"
              value={
                <AnimatedNumber
                  value={results.amountNeeded}
                  format="currency"
                  decimals={0}
                  className="font-mono text-lg font-bold text-[#F59E0B] inline-block"
                />
              }
              trend={results.amountNeeded > 0 ? "down" : "up"}
            />
          </div>

          {/* Share Results */}
          <ShareResults
            title="Emergency Fund Calculation"
            results={shareResultsData}
          />

          {/* Expense Breakdown Pie Chart */}
          {expenseBreakdown.length > 0 && (
            <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
              <p className="mb-3 text-sm font-medium text-[#94A3B8]">
                Monthly Expense Breakdown
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={expenseBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {expenseBreakdown.map((_, idx) => (
                      <Cell
                        key={idx}
                        fill={EXPENSE_COLORS[idx % EXPENSE_COLORS.length]}
                      />
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
              <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs">
                {expenseBreakdown.map((item, idx) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-sm"
                      style={{
                        backgroundColor:
                          EXPENSE_COLORS[idx % EXPENSE_COLORS.length],
                      }}
                    />
                    <span className="text-[#94A3B8]">
                      {item.name} ({formatCurrency(item.value)})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Savings Growth Chart */}
      {results.projectionData.length > 1 && (
        <div className="mt-8 rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
          <p className="mb-3 text-sm font-medium text-[#94A3B8]">
            Savings Growth Projection
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={results.projectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis
                dataKey="month"
                stroke={COLORS.textMuted}
                tick={{ fontSize: 12 }}
                label={{
                  value: "Months",
                  position: "insideBottom",
                  offset: -5,
                  fill: COLORS.textMuted,
                }}
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
                  name === "savings" ? "Your Savings" : "Target",
                ]}
              />
              <Line
                type="monotone"
                dataKey="savings"
                stroke={COLORS.primary}
                strokeWidth={2}
                dot={false}
                name="Your Savings"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke={COLORS.danger}
                strokeWidth={2}
                strokeDasharray="8 4"
                dot={false}
                name="Target"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
