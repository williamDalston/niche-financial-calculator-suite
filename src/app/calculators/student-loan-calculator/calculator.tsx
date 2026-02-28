"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
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
import { formatCurrency, formatCurrencyExact } from "@/lib/formatters";
import { useCalculatorState } from "@/hooks/use-calculator-state";

const COLORS = {
  standard: "#3B82F6",
  graduated: "#22C55E",
  extended: "#F59E0B",
  incomeDriven: "#A855F7",
  extra: "#EC4899",
  bg: "#0B1120",
  surface: "#162032",
  border: "#1E293B",
  textPrimary: "#F1F5F9",
  textMuted: "#94A3B8",
};

type RepaymentPlan = "standard" | "graduated" | "extended" | "income-driven";

const PLAN_LABELS: Record<RepaymentPlan, string> = {
  standard: "Standard (10 yr)",
  graduated: "Graduated (10 yr)",
  extended: "Extended (25 yr)",
  "income-driven": "Income-Driven (20 yr)",
};

const PLAN_COLORS: Record<RepaymentPlan, string> = {
  standard: COLORS.standard,
  graduated: COLORS.graduated,
  extended: COLORS.extended,
  "income-driven": COLORS.incomeDriven,
};

function calcStandardPayment(balance: number, annualRate: number, termYears: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const n = termYears * 12;
  if (monthlyRate === 0) return balance / n;
  const factor = Math.pow(1 + monthlyRate, n);
  return balance * (monthlyRate * factor) / (factor - 1);
}

interface AmortRow {
  month: number;
  year: number;
  balance: number;
  payment: number;
  principal: number;
  interest: number;
  totalPaid: number;
  totalInterest: number;
}

function buildAmortization(
  balance: number,
  annualRate: number,
  monthlyPayment: number,
  extraPayment: number,
  maxMonths: number = 360
): AmortRow[] {
  const monthlyRate = annualRate / 100 / 12;
  let remaining = balance;
  let totalPaid = 0;
  let totalInterest = 0;
  const rows: AmortRow[] = [];

  for (let m = 1; m <= maxMonths && remaining > 0.01; m++) {
    const interestCharge = remaining * monthlyRate;
    const payment = Math.min(monthlyPayment + extraPayment, remaining + interestCharge);
    const principalPaid = payment - interestCharge;
    remaining = Math.max(remaining - principalPaid, 0);
    totalPaid += payment;
    totalInterest += interestCharge;

    rows.push({
      month: m,
      year: Math.ceil(m / 12),
      balance: remaining,
      payment,
      principal: principalPaid,
      interest: interestCharge,
      totalPaid,
      totalInterest,
    });
  }

  return rows;
}

function buildGraduatedAmortization(
  balance: number,
  annualRate: number,
  termYears: number
): AmortRow[] {
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = termYears * 12;
  const standardPayment = calcStandardPayment(balance, annualRate, termYears);
  let remaining = balance;
  let totalPaid = 0;
  let totalInterest = 0;
  const rows: AmortRow[] = [];
  const periods = Math.ceil(termYears / 2);

  for (let m = 1; m <= totalMonths && remaining > 0.01; m++) {
    const period = Math.floor((m - 1) / 24);
    const scale = 0.6 + (0.8 * period) / Math.max(periods - 1, 1);
    const scheduledPayment = standardPayment * scale;
    const interestCharge = remaining * monthlyRate;
    const payment = Math.min(Math.max(scheduledPayment, interestCharge), remaining + interestCharge);
    const principalPaid = payment - interestCharge;
    remaining = Math.max(remaining - principalPaid, 0);
    totalPaid += payment;
    totalInterest += interestCharge;

    rows.push({
      month: m,
      year: Math.ceil(m / 12),
      balance: remaining,
      payment,
      principal: principalPaid,
      interest: interestCharge,
      totalPaid,
      totalInterest,
    });
  }

  return rows;
}

export function StudentLoanCalculatorWidget() {
  const [state, setState, getShareUrl] = useCalculatorState({
    defaults: {
      loanBalance: 35000,
      interestRate: 5.5,
      loanTermYears: 10,
      extraPayment: 0,
      repaymentPlan: "standard" as string,
    },
  });

  const results = useMemo(() => {
    if (state.loanBalance <= 0 || state.interestRate < 0) {
      return {
        monthlyPayment: 0,
        totalInterest: 0,
        totalCost: 0,
        payoffMonths: 0,
        interestSaved: 0,
        amortization: [] as AmortRow[],
        planComparisons: [],
        balanceOverTime: [],
      };
    }

    let monthlyPayment: number;
    let termYears = state.loanTermYears;

    switch (state.repaymentPlan) {
      case "standard":
        monthlyPayment = calcStandardPayment(state.loanBalance, state.interestRate, state.loanTermYears);
        break;
      case "graduated":
        monthlyPayment = calcStandardPayment(state.loanBalance, state.interestRate, state.loanTermYears) * 0.6;
        termYears = state.loanTermYears;
        break;
      case "extended":
        termYears = 25;
        monthlyPayment = calcStandardPayment(state.loanBalance, state.interestRate, 25);
        break;
      case "income-driven":
        termYears = 20;
        monthlyPayment = calcStandardPayment(state.loanBalance, state.interestRate, 20);
        break;
      default:
        monthlyPayment = calcStandardPayment(state.loanBalance, state.interestRate, state.loanTermYears);
    }

    let amortization: AmortRow[];
    if (state.repaymentPlan === "graduated") {
      amortization = buildGraduatedAmortization(state.loanBalance, state.interestRate, termYears);
    } else {
      amortization = buildAmortization(state.loanBalance, state.interestRate, monthlyPayment, state.extraPayment, termYears * 12);
    }

    const lastRow = amortization[amortization.length - 1];
    const totalInterest = lastRow?.totalInterest ?? 0;
    const totalCost = lastRow?.totalPaid ?? 0;
    const payoffMonths = amortization.length;

    const baselineAmort = buildAmortization(state.loanBalance, state.interestRate, monthlyPayment, 0, termYears * 12);
    const baselineInterest = baselineAmort[baselineAmort.length - 1]?.totalInterest ?? 0;
    const interestSaved = state.extraPayment > 0 ? baselineInterest - totalInterest : 0;

    const plans: RepaymentPlan[] = ["standard", "graduated", "extended", "income-driven"];
    const planComparisons = plans.map((plan) => {
      let pmt: number;
      let amort: AmortRow[];
      switch (plan) {
        case "standard":
          pmt = calcStandardPayment(state.loanBalance, state.interestRate, 10);
          amort = buildAmortization(state.loanBalance, state.interestRate, pmt, 0, 120);
          break;
        case "graduated":
          amort = buildGraduatedAmortization(state.loanBalance, state.interestRate, 10);
          pmt = amort[0]?.payment ?? 0;
          break;
        case "extended":
          pmt = calcStandardPayment(state.loanBalance, state.interestRate, 25);
          amort = buildAmortization(state.loanBalance, state.interestRate, pmt, 0, 300);
          break;
        case "income-driven":
          pmt = calcStandardPayment(state.loanBalance, state.interestRate, 20);
          amort = buildAmortization(state.loanBalance, state.interestRate, pmt, 0, 240);
          break;
        default:
          pmt = 0;
          amort = [];
      }
      const last = amort[amort.length - 1];
      return {
        plan: PLAN_LABELS[plan],
        startingPayment: pmt,
        totalInterest: last?.totalInterest ?? 0,
        totalCost: last?.totalPaid ?? 0,
        months: amort.length,
      };
    });

    const maxYears = 25;
    const balanceOverTime: Record<string, number | string>[] = [];
    const planAmorts: Record<string, AmortRow[]> = {};

    plans.forEach((plan) => {
      let pmt: number;
      switch (plan) {
        case "standard":
          pmt = calcStandardPayment(state.loanBalance, state.interestRate, 10);
          planAmorts[plan] = buildAmortization(state.loanBalance, state.interestRate, pmt, 0, 120);
          break;
        case "graduated":
          planAmorts[plan] = buildGraduatedAmortization(state.loanBalance, state.interestRate, 10);
          break;
        case "extended":
          pmt = calcStandardPayment(state.loanBalance, state.interestRate, 25);
          planAmorts[plan] = buildAmortization(state.loanBalance, state.interestRate, pmt, 0, 300);
          break;
        case "income-driven":
          pmt = calcStandardPayment(state.loanBalance, state.interestRate, 20);
          planAmorts[plan] = buildAmortization(state.loanBalance, state.interestRate, pmt, 0, 240);
          break;
      }
    });

    for (let y = 0; y <= maxYears; y++) {
      const row: Record<string, number | string> = { year: y };
      plans.forEach((plan) => {
        const amort = planAmorts[plan];
        if (y === 0) {
          row[plan] = state.loanBalance;
        } else {
          const monthIndex = y * 12 - 1;
          if (monthIndex < amort.length) {
            row[plan] = Math.round(amort[monthIndex].balance);
          } else {
            row[plan] = 0;
          }
        }
      });
      balanceOverTime.push(row);
    }

    return {
      monthlyPayment: state.repaymentPlan === "graduated" ? amortization[0]?.payment ?? 0 : monthlyPayment,
      totalInterest,
      totalCost,
      payoffMonths,
      interestSaved,
      amortization,
      planComparisons,
      balanceOverTime,
    };
  }, [state.loanBalance, state.interestRate, state.loanTermYears, state.extraPayment, state.repaymentPlan]);

  const payoffDate = useMemo(() => {
    const now = new Date();
    const date = new Date(now.getFullYear(), now.getMonth() + results.payoffMonths);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }, [results.payoffMonths]);

  const shareResultsData = {
    "Monthly Payment": formatCurrencyExact(results.monthlyPayment),
    "Total Interest": formatCurrency(results.totalInterest),
    "Total Cost": formatCurrency(results.totalCost),
    "Payoff Date": payoffDate,
    "Interest Saved": results.interestSaved > 0 ? formatCurrency(results.interestSaved) : "--",
  };

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#162032] p-6 md:p-8">
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Loan Balance */}
          <CurrencyInput
            label="Total Loan Balance"
            value={state.loanBalance}
            onChange={(v) => setState('loanBalance', v)}
            min={0}
            step={1000}
          />
          <CustomSlider
            value={state.loanBalance}
            onChange={(v) => setState('loanBalance', v)}
            min={1000}
            max={300000}
            step={1000}
            formatValue={(v) => `$${(v / 1000).toFixed(0)}k`}
          />

          {/* Interest Rate */}
          <PercentageInput
            label="Interest Rate"
            value={state.interestRate}
            onChange={(v) => setState('interestRate', v)}
            min={0}
            max={15}
            step={0.1}
          />

          {/* Loan Term */}
          <CustomSlider
            label="Loan Term (years)"
            value={state.loanTermYears}
            onChange={(v) => setState('loanTermYears', v)}
            min={1}
            max={30}
            step={1}
            formatValue={(v) => `${v} yr${v !== 1 ? "s" : ""}`}
          />

          {/* Extra Monthly Payment */}
          <CurrencyInput
            label="Extra Monthly Payment"
            value={state.extraPayment}
            onChange={(v) => setState('extraPayment', v)}
            min={0}
            step={25}
          />
          <CustomSlider
            value={state.extraPayment}
            onChange={(v) => setState('extraPayment', v)}
            min={0}
            max={1000}
            step={25}
            formatValue={(v) => `$${v}`}
          />

          {/* Repayment Plan */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Repayment Plan
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(PLAN_LABELS) as RepaymentPlan[]).map((plan) => (
                <button
                  key={plan}
                  onClick={() => setState('repaymentPlan', plan)}
                  className={`rounded-lg border px-3 py-3 text-sm font-medium transition-colors ${
                    state.repaymentPlan === plan
                      ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                      : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
                  }`}
                >
                  {PLAN_LABELS[plan]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Primary Result: Monthly Payment */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-5 text-center">
            <p className="mb-2 text-sm text-[#94A3B8]">Monthly Payment</p>
            <AnimatedNumber value={results.monthlyPayment} format="currency" decimals={2} />
            {state.extraPayment > 0 && (
              <span className="ml-2 text-base text-[#94A3B8]">
                + {formatCurrency(state.extraPayment)} extra
              </span>
            )}
          </div>

          {/* StatCard Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <StatCard
              label="Monthly Payment"
              value={<AnimatedNumber value={results.monthlyPayment} format="currency" decimals={2} className="font-mono text-2xl font-bold text-[#22C55E] inline-block" />}
              highlight
            />
            <StatCard
              label="Total Interest"
              value={<AnimatedNumber value={results.totalInterest} format="currency" className="font-mono text-lg font-bold text-[#F1F5F9] inline-block" />}
            />
            <StatCard
              label="Total Cost"
              value={<AnimatedNumber value={results.totalCost} format="currency" className="font-mono text-lg font-bold text-[#F1F5F9] inline-block" />}
            />
            <StatCard
              label="Payoff Date"
              value={payoffDate}
            />
            <StatCard
              label="Interest Saved"
              value={
                results.interestSaved > 0
                  ? <AnimatedNumber value={results.interestSaved} format="currency" className="font-mono text-lg font-bold text-[#22C55E] inline-block" />
                  : "--"
              }
              trend={results.interestSaved > 0 ? "up" : "neutral"}
            />
          </div>

          {/* Share Results */}
          <ShareResults title="Student Loan Calculator Results" results={shareResultsData} getShareUrl={getShareUrl} />

          {/* Balance Over Time Chart */}
          {results.balanceOverTime.length > 0 && (
            <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
              <p className="mb-3 text-sm font-medium text-[#94A3B8]">Balance Over Time by Plan</p>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={results.balanceOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis
                    dataKey="year"
                    stroke={COLORS.textMuted}
                    tick={{ fontSize: 12 }}
                    label={{ value: "Year", position: "insideBottom", offset: -5, fill: COLORS.textMuted }}
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
                    formatter={(value, name) => [formatCurrency(value as number), PLAN_LABELS[name as RepaymentPlan] ?? name]}
                  />
                  <Legend
                    wrapperStyle={{ color: COLORS.textMuted, fontSize: 12 }}
                    formatter={(value) => PLAN_LABELS[value as RepaymentPlan] ?? value}
                  />
                  {(Object.keys(PLAN_COLORS) as RepaymentPlan[]).map((plan) => (
                    <Line
                      key={plan}
                      type="monotone"
                      dataKey={plan}
                      stroke={PLAN_COLORS[plan]}
                      strokeWidth={state.repaymentPlan === plan ? 3 : 1.5}
                      dot={false}
                      opacity={state.repaymentPlan === plan ? 1 : 0.4}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Plan Comparison Table */}
          <div className="overflow-x-auto rounded-lg border border-[#1E293B]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1E293B] bg-[#0B1120]">
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#94A3B8]">Plan</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[#94A3B8]">Payment</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[#94A3B8]">Total Interest</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[#94A3B8]">Total Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]">
                {results.planComparisons.map((row) => (
                  <tr key={row.plan} className="hover:bg-[#0B1120]/50">
                    <td className="px-4 py-2 text-[#F1F5F9]">{row.plan}</td>
                    <td className="px-4 py-2 text-right font-mono text-[#3B82F6]">
                      {formatCurrencyExact(row.startingPayment)}
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-[#F59E0B]">
                      {formatCurrency(row.totalInterest)}
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-[#F1F5F9]">
                      {formatCurrency(row.totalCost)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
