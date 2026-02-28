"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
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
import { formatCurrency, formatCurrencyExact } from "@/lib/formatters";
import { useCalculatorState } from "@/hooks/use-calculator-state";

const COLORS = {
  primary: "#22C55E",
  secondary: "#3B82F6",
  warning: "#F59E0B",
  danger: "#EF4444",
  bg: "#0B1120",
  surface: "#162032",
  border: "#1E293B",
  textPrimary: "#F1F5F9",
  textMuted: "#94A3B8",
};

const PAY_FREQUENCIES = [
  { label: "Weekly", value: 52 },
  { label: "Bi-Weekly", value: 26 },
  { label: "Semi-Monthly", value: 24 },
  { label: "Monthly", value: 12 },
];

const FILING_STATUSES = [
  { label: "Single", value: "single" },
  { label: "Married Filing Jointly", value: "married" },
  { label: "Head of Household", value: "head" },
];

// 2025 federal income tax brackets
const TAX_BRACKETS = {
  single: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
  married: [
    { min: 0, max: 23200, rate: 0.10 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 },
  ],
  head: [
    { min: 0, max: 16550, rate: 0.10 },
    { min: 16550, max: 63100, rate: 0.12 },
    { min: 63100, max: 100500, rate: 0.22 },
    { min: 100500, max: 191950, rate: 0.24 },
    { min: 191950, max: 243700, rate: 0.32 },
    { min: 243700, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
};

function getMarginalRate(income: number, status: string): number {
  const brackets = TAX_BRACKETS[status as keyof typeof TAX_BRACKETS] || TAX_BRACKETS.single;
  for (let i = brackets.length - 1; i >= 0; i--) {
    if (income > brackets[i].min) {
      return brackets[i].rate;
    }
  }
  return 0.10;
}

function computeTax(income: number, status: string): number {
  const brackets = TAX_BRACKETS[status as keyof typeof TAX_BRACKETS] || TAX_BRACKETS.single;
  let tax = 0;
  let remaining = income;
  for (const bracket of brackets) {
    const taxable = Math.min(remaining, bracket.max - bracket.min);
    if (taxable <= 0) break;
    tax += taxable * bracket.rate;
    remaining -= taxable;
  }
  return tax;
}

export function RaiseCalculatorWidget() {
  const [state, setState, getShareUrl] = useCalculatorState({
    defaults: {
      currentSalary: 65000,
      raiseMode: "percent" as string,
      raisePercent: 5,
      newSalaryInput: 68250,
      payFrequency: 26,
      filingStatus: "single",
    },
  });

  const results = useMemo(() => {
    let newSalary: number;
    let raiseAmount: number;
    let percentChange: number;

    if (state.raiseMode === "percent") {
      newSalary = state.currentSalary * (1 + state.raisePercent / 100);
      raiseAmount = newSalary - state.currentSalary;
      percentChange = state.raisePercent;
    } else {
      newSalary = state.newSalaryInput;
      raiseAmount = newSalary - state.currentSalary;
      percentChange = state.currentSalary > 0 ? (raiseAmount / state.currentSalary) * 100 : 0;
    }

    const increasePerPaycheck = raiseAmount / state.payFrequency;

    // Tax impact
    const marginalRate = getMarginalRate(newSalary, state.filingStatus);
    const oldTax = computeTax(state.currentSalary, state.filingStatus);
    const newTax = computeTax(newSalary, state.filingStatus);
    const taxOnRaise = newTax - oldTax;
    const afterTaxRaise = raiseAmount - taxOnRaise;
    const afterTaxPerPaycheck = afterTaxRaise / state.payFrequency;

    return {
      newSalary,
      raiseAmount,
      percentChange,
      increasePerPaycheck,
      marginalRate,
      taxOnRaise,
      afterTaxRaise,
      afterTaxPerPaycheck,
      oldTax,
      newTax,
    };
  }, [state.currentSalary, state.raiseMode, state.raisePercent, state.newSalaryInput, state.payFrequency, state.filingStatus]);

  const shareResultsData: Record<string, string> = {
    "New Salary": formatCurrency(results.newSalary),
    "Raise Amount": formatCurrency(results.raiseAmount),
    "Per Paycheck Increase": formatCurrencyExact(results.increasePerPaycheck),
    "After-Tax Raise Value": formatCurrency(results.afterTaxRaise),
    "Marginal Tax Rate": `${(results.marginalRate * 100).toFixed(0)}%`,
    "Raise Percentage": `${results.percentChange.toFixed(1)}%`,
  };

  const selectClass =
    "h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] p-3 text-[#F1F5F9] focus:border-[#3B82F6] focus:outline-none";

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#162032] p-6 md:p-8">
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          {/* Current Salary */}
          <div>
            <CurrencyInput
              label="Current Annual Salary"
              value={state.currentSalary}
              onChange={(v) => setState('currentSalary', v)}
              min={0}
              max={500000}
              step={1000}
            />
            <CustomSlider
              value={state.currentSalary}
              onChange={(v) => setState('currentSalary', v)}
              min={20000}
              max={500000}
              step={1000}
              formatValue={(v) =>
                v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
              }
              className="mt-3"
            />
          </div>

          {/* Raise Mode Toggle */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Enter Raise As
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setState('raiseMode', "percent")}
                className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                  state.raiseMode === "percent"
                    ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                    : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
                }`}
              >
                Percentage
              </button>
              <button
                onClick={() => setState('raiseMode', "newSalary")}
                className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                  state.raiseMode === "newSalary"
                    ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                    : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
                }`}
              >
                New Salary
              </button>
            </div>
          </div>

          {/* Raise Percent or New Salary */}
          {state.raiseMode === "percent" ? (
            <div>
              <PercentageInput
                label="Raise Percentage"
                value={state.raisePercent}
                onChange={(v) => setState('raisePercent', v)}
                min={0}
                max={200}
                step={0.5}
              />
              <CustomSlider
                value={state.raisePercent}
                onChange={(v) => setState('raisePercent', v)}
                min={0}
                max={50}
                step={0.5}
                formatValue={(v) => `${v}%`}
                className="mt-3"
              />
            </div>
          ) : (
            <CurrencyInput
              label="New Annual Salary"
              value={state.newSalaryInput}
              onChange={(v) => setState('newSalaryInput', v)}
              min={0}
              max={1000000}
              step={1000}
            />
          )}

          {/* Pay Frequency */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Pay Frequency
            </label>
            <select
              value={state.payFrequency}
              onChange={(e) => setState('payFrequency', Number(e.target.value))}
              className={selectClass}
            >
              {PAY_FREQUENCIES.map((freq) => (
                <option key={freq.value} value={freq.value}>
                  {freq.label} ({freq.value} paychecks/year)
                </option>
              ))}
            </select>
          </div>

          {/* Filing Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Filing Status (for tax estimate)
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              {FILING_STATUSES.map((status) => (
                <button
                  key={status.value}
                  onClick={() => setState('filingStatus', status.value)}
                  className={`flex-1 rounded-lg border px-3 py-3 text-sm font-medium transition-colors ${
                    state.filingStatus === status.value
                      ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                      : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Primary Result: New Salary */}
          <div className="rounded-lg border border-l-[3px] border-[#1E293B] border-l-[#22C55E] bg-[#0B1120] p-5">
            <p className="mb-1 text-sm text-[#94A3B8]">New Annual Salary</p>
            <AnimatedNumber
              value={results.newSalary}
              format="currency"
              decimals={0}
              className="font-mono text-2xl sm:text-3xl font-bold text-[#22C55E] inline-block transition-transform duration-150"
            />
            <p className="mt-1 text-xs text-[#94A3B8]">
              +{results.percentChange.toFixed(1)}% increase
            </p>
          </div>

          {/* Raise Amount */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-1 text-xs text-[#94A3B8]">Raise Amount (Annual)</p>
            <AnimatedNumber
              value={results.raiseAmount}
              format="currency"
              decimals={0}
              className="font-mono text-2xl font-bold text-[#3B82F6] inline-block"
            />
          </div>

          {/* Per-Paycheck Increase */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-1 text-xs text-[#94A3B8]">Per Paycheck Increase</p>
            <AnimatedNumber
              value={results.increasePerPaycheck}
              format="currency"
              decimals={2}
              className="font-mono text-2xl font-bold text-[#22C55E] inline-block"
            />
          </div>

          {/* StatCard Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <StatCard
              label="New Salary"
              highlight
              value={
                <AnimatedNumber
                  value={results.newSalary}
                  format="compact"
                  decimals={1}
                  className="font-mono text-2xl font-bold text-[#22C55E] inline-block"
                />
              }
              className="col-span-2"
            />
            <StatCard
              label="Raise Amount"
              value={
                <AnimatedNumber
                  value={results.raiseAmount}
                  format="currency"
                  decimals={0}
                  className="font-mono text-lg font-bold text-[#3B82F6] inline-block"
                />
              }
              trend="up"
            />
            <StatCard
              label="Per Paycheck Increase"
              value={
                <AnimatedNumber
                  value={results.increasePerPaycheck}
                  format="currency"
                  decimals={2}
                  className="font-mono text-lg font-bold text-[#22C55E] inline-block"
                />
              }
            />
            <StatCard
              label="After-Tax Raise Value"
              value={
                <AnimatedNumber
                  value={results.afterTaxRaise}
                  format="currency"
                  decimals={0}
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
            />
            <StatCard
              label="Marginal Tax Rate"
              value={`${(results.marginalRate * 100).toFixed(0)}%`}
            />
          </div>

          {/* Share Results */}
          <ShareResults
            title="Raise Calculation"
            results={shareResultsData}
            getShareUrl={getShareUrl}
          />

          {/* After-Tax Results */}
          <div className="rounded-lg border border-[#22C55E]/30 bg-[#22C55E]/5 p-5">
            <p className="mb-1 text-sm text-[#94A3B8]">After-Tax Raise Value</p>
            <div className="flex items-baseline gap-2">
              <AnimatedNumber
                value={results.afterTaxRaise}
                format="currency"
                decimals={0}
                className="font-mono text-2xl font-bold text-[#22C55E] inline-block"
              />
              <span className="text-base font-normal text-[#94A3B8]">/ year</span>
            </div>
            <p className="mt-1 text-sm text-[#94A3B8]">
              {formatCurrencyExact(results.afterTaxPerPaycheck)} per paycheck
            </p>
          </div>

          {/* Salary Comparison Bar Chart */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">
              Old vs New Salary
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={[
                  { name: "Old Salary", value: state.currentSalary },
                  { name: "New Salary", value: results.newSalary },
                ]}
                layout="vertical"
                margin={{ left: 20, right: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} horizontal={false} />
                <XAxis
                  type="number"
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 12 }}
                  width={90}
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
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  <Cell fill={COLORS.secondary} />
                  <Cell fill={COLORS.primary} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pre-Tax vs After-Tax Breakdown */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">
              Raise Breakdown: Pre-Tax vs After-Tax
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={[
                  {
                    name: "Raise",
                    afterTax: results.afterTaxRaise,
                    tax: results.taxOnRaise,
                  },
                ]}
                layout="vertical"
                margin={{ left: 20, right: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} horizontal={false} />
                <XAxis
                  type="number"
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 12 }}
                  width={60}
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
                    name === "afterTax" ? "After-Tax Take Home" : "Estimated Taxes",
                  ]}
                />
                <Legend
                  wrapperStyle={{ color: COLORS.textMuted, fontSize: 12 }}
                  formatter={(value) =>
                    value === "afterTax" ? "After-Tax Take Home" : "Estimated Taxes"
                  }
                />
                <Bar dataKey="afterTax" stackId="a" fill={COLORS.primary} radius={[0, 0, 0, 0]} />
                <Bar dataKey="tax" stackId="a" fill={COLORS.warning} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
