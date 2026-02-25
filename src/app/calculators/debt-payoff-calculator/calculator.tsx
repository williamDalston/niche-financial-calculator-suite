"use client";

import { useState, useMemo, useCallback } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { CurrencyInput } from "@/components/ui/currency-input";
import { CustomSlider } from "@/components/ui/custom-slider";
import { PercentageInput } from "@/components/ui/percentage-input";
import { ShareResults } from "@/components/ui/share-results";
import { StatCard } from "@/components/ui/stat-card";
import { formatCurrency } from "@/lib/formatters";

const COLORS = {
  bg: "#0B1120",
  surface: "#162032",
  border: "#1E293B",
  textPrimary: "#F1F5F9",
  textMuted: "#94A3B8",
};

const DEBT_COLORS = [
  "#3B82F6",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#A855F7",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
  "#F97316",
  "#6366F1",
];

type Strategy = "avalanche" | "snowball";

interface Debt {
  id: string;
  name: string;
  balance: number;
  rate: number;
  minPayment: number;
}

interface MonthSnapshot {
  month: number;
  [debtName: string]: number;
}

interface StrategyResult {
  totalInterest: number;
  totalMonths: number;
  payoffDate: string;
  monthlySnapshots: MonthSnapshot[];
  debtPayoffOrder: { name: string; month: number }[];
}

function simulatePayoff(debts: Debt[], extraPayment: number, strategy: Strategy): StrategyResult {
  if (debts.length === 0 || debts.every((d) => d.balance <= 0)) {
    return { totalInterest: 0, totalMonths: 0, payoffDate: "", monthlySnapshots: [], debtPayoffOrder: [] };
  }

  // Clone debts for simulation
  const simDebts = debts.map((d) => ({
    ...d,
    remaining: d.balance,
    paidOff: false,
  }));

  // Sort by strategy
  const sortedIndices = simDebts
    .map((_, i) => i)
    .sort((a, b) => {
      if (strategy === "avalanche") {
        return simDebts[b].rate - simDebts[a].rate; // Highest rate first
      }
      return simDebts[a].remaining - simDebts[b].remaining; // Lowest balance first
    });

  let totalInterest = 0;
  let month = 0;
  const maxMonths = 600; // 50 years cap
  const monthlySnapshots: MonthSnapshot[] = [];
  const debtPayoffOrder: { name: string; month: number }[] = [];

  // Initial snapshot
  const initialSnapshot: MonthSnapshot = { month: 0 };
  simDebts.forEach((d) => {
    initialSnapshot[d.name] = d.remaining;
  });
  monthlySnapshots.push(initialSnapshot);

  while (simDebts.some((d) => d.remaining > 0.01) && month < maxMonths) {
    month++;
    let extraAvailable = extraPayment;

    // Apply minimum payments and interest first
    for (const debt of simDebts) {
      if (debt.remaining <= 0.01) continue;
      const monthlyInterest = debt.remaining * (debt.rate / 100 / 12);
      totalInterest += monthlyInterest;
      debt.remaining += monthlyInterest;

      const payment = Math.min(debt.minPayment, debt.remaining);
      debt.remaining -= payment;

      if (debt.remaining <= 0.01) {
        debt.remaining = 0;
        if (!debt.paidOff) {
          debt.paidOff = true;
          debtPayoffOrder.push({ name: debt.name, month });
          // Freed-up minimum payment becomes extra for next cycle
          extraAvailable += debt.minPayment;
        }
      }
    }

    // Apply extra payment to target debt (in strategy order)
    for (const idx of sortedIndices) {
      const debt = simDebts[idx];
      if (debt.remaining <= 0.01) continue;
      const extraApplied = Math.min(extraAvailable, debt.remaining);
      debt.remaining -= extraApplied;
      extraAvailable -= extraApplied;

      if (debt.remaining <= 0.01) {
        debt.remaining = 0;
        if (!debt.paidOff) {
          debt.paidOff = true;
          debtPayoffOrder.push({ name: debt.name, month });
          extraAvailable += debt.minPayment;
        }
      }
      if (extraAvailable <= 0.01) break;
    }

    // Record snapshot (every month for first 12, then every 3rd month)
    if (month <= 12 || month % 3 === 0 || simDebts.every((d) => d.remaining <= 0.01)) {
      const snapshot: MonthSnapshot = { month };
      simDebts.forEach((d) => {
        snapshot[d.name] = Math.round(Math.max(d.remaining, 0));
      });
      monthlySnapshots.push(snapshot);
    }
  }

  const now = new Date();
  const payoffDateObj = new Date(now.getFullYear(), now.getMonth() + month);
  const payoffDate = payoffDateObj.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return {
    totalInterest,
    totalMonths: month,
    payoffDate,
    monthlySnapshots,
    debtPayoffOrder,
  };
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

const DEFAULT_DEBTS: Debt[] = [
  { id: generateId(), name: "Credit Card", balance: 8500, rate: 22.99, minPayment: 250 },
  { id: generateId(), name: "Car Loan", balance: 15000, rate: 6.5, minPayment: 350 },
  { id: generateId(), name: "Student Loan", balance: 28000, rate: 5.5, minPayment: 300 },
];

export function DebtPayoffCalculatorWidget() {
  const [debts, setDebts] = useState<Debt[]>(DEFAULT_DEBTS);
  const [extraPayment, setExtraPayment] = useState(200);
  const [strategy, setStrategy] = useState<Strategy>("avalanche");

  const addDebt = useCallback(() => {
    setDebts((prev) => [
      ...prev,
      { id: generateId(), name: `Debt ${prev.length + 1}`, balance: 5000, rate: 10, minPayment: 100 },
    ]);
  }, []);

  const removeDebt = useCallback((id: string) => {
    setDebts((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const updateDebt = useCallback((id: string, field: keyof Debt, value: string | number) => {
    setDebts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  }, []);

  const results = useMemo(() => {
    const validDebts = debts.filter((d) => d.balance > 0 && d.minPayment > 0);
    if (validDebts.length === 0) {
      return {
        avalanche: { totalInterest: 0, totalMonths: 0, payoffDate: "", monthlySnapshots: [], debtPayoffOrder: [] },
        snowball: { totalInterest: 0, totalMonths: 0, payoffDate: "", monthlySnapshots: [], debtPayoffOrder: [] },
        minimumOnly: { totalInterest: 0, totalMonths: 0, payoffDate: "", monthlySnapshots: [], debtPayoffOrder: [] },
        selected: { totalInterest: 0, totalMonths: 0, payoffDate: "", monthlySnapshots: [], debtPayoffOrder: [] },
        totalBalance: 0,
        totalMinPayments: 0,
        savingsVsMinimum: 0,
      };
    }

    const avalanche = simulatePayoff(validDebts, extraPayment, "avalanche");
    const snowball = simulatePayoff(validDebts, extraPayment, "snowball");
    const minimumOnly = simulatePayoff(validDebts, 0, "avalanche"); // No extra = same either way

    const selected = strategy === "avalanche" ? avalanche : snowball;
    const totalBalance = validDebts.reduce((sum, d) => sum + d.balance, 0);
    const totalMinPayments = validDebts.reduce((sum, d) => sum + d.minPayment, 0);
    const savingsVsMinimum = minimumOnly.totalInterest - selected.totalInterest;

    return {
      avalanche,
      snowball,
      minimumOnly,
      selected,
      totalBalance,
      totalMinPayments,
      savingsVsMinimum,
    };
  }, [debts, extraPayment, strategy]);

  // Bar comparison data
  const comparisonData = [
    {
      name: "Minimum Only",
      interest: Math.round(results.minimumOnly.totalInterest),
      months: results.minimumOnly.totalMonths,
    },
    {
      name: "Avalanche",
      interest: Math.round(results.avalanche.totalInterest),
      months: results.avalanche.totalMonths,
    },
    {
      name: "Snowball",
      interest: Math.round(results.snowball.totalInterest),
      months: results.snowball.totalMonths,
    },
  ];

  const monthsSaved = results.minimumOnly.totalMonths - results.selected.totalMonths;

  const shareResultsData = {
    "Total Debt": formatCurrency(results.totalBalance),
    "Debt-Free Date": results.selected.payoffDate || "--",
    "Total Interest": formatCurrency(results.selected.totalInterest),
    "Money Saved vs Minimum": results.savingsVsMinimum > 0 ? formatCurrency(results.savingsVsMinimum) : "--",
    "Months Saved": monthsSaved > 0 ? `${monthsSaved} months` : "--",
  };

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#162032] p-6 md:p-8">
      {/* Debt Inputs */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#F1F5F9]">Your Debts</h3>
          <button
            onClick={addDebt}
            className="rounded-lg border border-[#22C55E] bg-[#22C55E]/10 px-4 py-2 text-sm font-medium text-[#22C55E] hover:bg-[#22C55E]/20 transition-colors"
          >
            + Add Debt
          </button>
        </div>

        {debts.map((debt) => (
          <div
            key={debt.id}
            className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={debt.name}
                onChange={(e) => updateDebt(debt.id, "name", e.target.value)}
                className="h-10 w-full max-w-xs rounded-lg border border-[#1E293B] bg-[#162032] px-3 text-sm text-[#F1F5F9] focus:border-[#3B82F6] focus:outline-none"
              />
              {debts.length > 1 && (
                <button
                  onClick={() => removeDebt(debt.id)}
                  className="ml-3 rounded p-1 text-[#94A3B8] hover:text-[#EF4444] transition-colors"
                  title="Remove debt"
                >
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <CurrencyInput
                label="Balance"
                value={debt.balance}
                onChange={(v) => updateDebt(debt.id, "balance", v)}
                min={0}
                step={100}
              />
              <PercentageInput
                label="Interest Rate"
                value={debt.rate}
                onChange={(v) => updateDebt(debt.id, "rate", v)}
                min={0}
                max={40}
                step={0.1}
              />
              <CurrencyInput
                label="Min Payment"
                value={debt.minPayment}
                onChange={(v) => updateDebt(debt.id, "minPayment", v)}
                min={0}
                step={25}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Settings */}
        <div className="space-y-6">
          {/* Extra Monthly Payment */}
          <CurrencyInput
            label="Extra Monthly Payment"
            value={extraPayment}
            onChange={setExtraPayment}
            min={0}
            step={25}
          />
          <CustomSlider
            value={extraPayment}
            onChange={setExtraPayment}
            min={0}
            max={2000}
            step={25}
            formatValue={(v) => `$${v.toLocaleString()}`}
          />

          {/* Strategy */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Payoff Strategy
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setStrategy("avalanche")}
                className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                  strategy === "avalanche"
                    ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                    : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
                }`}
              >
                Avalanche
                <span className="block text-xs font-normal opacity-75">Highest rate first</span>
              </button>
              <button
                onClick={() => setStrategy("snowball")}
                className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                  strategy === "snowball"
                    ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                    : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
                }`}
              >
                Snowball
                <span className="block text-xs font-normal opacity-75">Lowest balance first</span>
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">Debt Summary</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Total Balance</span>
                <span className="font-mono text-[#F1F5F9]">{formatCurrency(results.totalBalance)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Total Min Payments</span>
                <span className="font-mono text-[#F1F5F9]">{formatCurrency(results.totalMinPayments)}/mo</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Extra Payment</span>
                <span className="font-mono text-[#22C55E]">+{formatCurrency(extraPayment)}/mo</span>
              </div>
              <div className="border-t border-[#1E293B] pt-2 flex justify-between text-sm font-semibold">
                <span className="text-[#F1F5F9]">Total Monthly Payment</span>
                <span className="font-mono text-[#22C55E]">{formatCurrency(results.totalMinPayments + extraPayment)}/mo</span>
              </div>
            </div>
          </div>

          {/* Payoff Order */}
          {results.selected.debtPayoffOrder.length > 0 && (
            <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
              <p className="mb-3 text-sm font-medium text-[#94A3B8]">Payoff Order ({strategy === "avalanche" ? "Avalanche" : "Snowball"})</p>
              <div className="space-y-2">
                {results.selected.debtPayoffOrder.map((item, idx) => (
                  <div key={item.name} className="flex items-center gap-3 text-sm">
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-[#0B1120]"
                      style={{ backgroundColor: DEBT_COLORS[idx % DEBT_COLORS.length] }}
                    >
                      {idx + 1}
                    </span>
                    <span className="flex-1 text-[#F1F5F9]">{item.name}</span>
                    <span className="font-mono text-xs text-[#94A3B8]">
                      Month {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Primary Result: Total Debt */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-5 text-center">
            <p className="mb-2 text-sm text-[#94A3B8]">Total Debt</p>
            <AnimatedNumber value={results.totalBalance} format="currency" />
          </div>

          {/* StatCard Grid */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="Debt-Free Date"
              value={results.selected.payoffDate || "--"}
              subvalue={
                results.selected.totalMonths > 0
                  ? `${Math.floor(results.selected.totalMonths / 12)} years, ${results.selected.totalMonths % 12} months`
                  : undefined
              }
              highlight
            />
            <StatCard
              label="Total Interest"
              value={<AnimatedNumber value={results.selected.totalInterest} format="currency" className="font-mono text-lg font-bold text-[#F1F5F9] inline-block" />}
            />
            <StatCard
              label="Money Saved vs Min"
              value={
                results.savingsVsMinimum > 0
                  ? <AnimatedNumber value={results.savingsVsMinimum} format="currency" className="font-mono text-lg font-bold text-[#22C55E] inline-block" />
                  : "--"
              }
              trend={results.savingsVsMinimum > 0 ? "up" : "neutral"}
            />
            <StatCard
              label="Months Saved"
              value={monthsSaved > 0 ? `${monthsSaved} months` : "--"}
              trend={monthsSaved > 0 ? "up" : "neutral"}
            />
          </div>

          {/* Strategy comparison note */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#94A3B8]">
                {strategy === "avalanche" ? "Snowball" : "Avalanche"} would save
              </span>
              <span className="font-mono font-bold text-[#F1F5F9]">
                {formatCurrency(
                  Math.abs(results.avalanche.totalInterest - results.snowball.totalInterest)
                )}
              </span>
            </div>
            <p className="mt-1 text-xs text-[#94A3B8]">
              {results.avalanche.totalInterest < results.snowball.totalInterest ? "Avalanche wins on interest" : results.snowball.totalInterest < results.avalanche.totalInterest ? "Snowball wins on interest" : "Same total cost"}
            </p>
          </div>

          {/* Share Results */}
          <ShareResults title="Debt Payoff Calculator Results" results={shareResultsData} />

          {/* Stacked Area Chart - Balance Decline */}
          {results.selected.monthlySnapshots.length > 1 && (
            <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
              <p className="mb-3 text-sm font-medium text-[#94A3B8]">Debt Balances Over Time</p>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={results.selected.monthlySnapshots}>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis
                    dataKey="month"
                    stroke={COLORS.textMuted}
                    tick={{ fontSize: 12 }}
                    label={{ value: "Month", position: "insideBottom", offset: -5, fill: COLORS.textMuted }}
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
                    formatter={(value, name) => [formatCurrency(value as number), name]}
                  />
                  <Legend wrapperStyle={{ color: COLORS.textMuted, fontSize: 12 }} />
                  {debts
                    .filter((d) => d.balance > 0)
                    .map((debt, idx) => (
                      <Area
                        key={debt.id}
                        type="monotone"
                        dataKey={debt.name}
                        stackId="1"
                        stroke={DEBT_COLORS[idx % DEBT_COLORS.length]}
                        fill={DEBT_COLORS[idx % DEBT_COLORS.length]}
                        fillOpacity={0.6}
                      />
                    ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Comparison Bar Chart */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">Strategy Comparison: Total Interest</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="name" stroke={COLORS.textMuted} tick={{ fontSize: 12 }} />
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
                  formatter={(value, name) => {
                    if (name === "interest") return [formatCurrency(value as number), "Total Interest"];
                    return [value, name];
                  }}
                />
                <Bar dataKey="interest" fill="#22C55E" radius={[4, 4, 0, 0]} name="interest" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
