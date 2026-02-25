"use client";

import { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  AnimatedNumber,
  CurrencyInput,
  CustomSlider,
  PercentageInput,
  ShareResults,
  StatCard,
} from "@/components/ui";
import { formatCurrencyExact as fmt, formatCurrency as formatCurrencyShort } from "@/lib/formatters";

function calcMonthlyPayment(principal: number, monthlyRate: number, totalMonths: number): number {
  if (monthlyRate === 0) return principal / totalMonths;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function LoanCalculatorWidget() {
  const [loanAmount, setLoanAmount] = useState(25000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [termValue, setTermValue] = useState(60);
  const [termUnit, setTermUnit] = useState<"months" | "years">("months");
  const [extraPayment, setExtraPayment] = useState(0);

  const results = useMemo(() => {
    const totalMonths = termUnit === "years" ? termValue * 12 : termValue;
    const monthlyRate = interestRate / 100 / 12;
    const P = loanAmount;

    if (P <= 0 || totalMonths <= 0) {
      return null;
    }

    const M = calcMonthlyPayment(P, monthlyRate, totalMonths);
    const totalCost = M * totalMonths;
    const totalInterest = totalCost - P;

    // Build amortization schedule (standard)
    const standardSchedule: { month: number; balance: number }[] = [];
    let balance = P;
    for (let m = 0; m <= totalMonths; m++) {
      standardSchedule.push({ month: m, balance: Math.max(0, balance) });
      if (m < totalMonths) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = M - interestPayment;
        balance -= principalPayment;
      }
    }

    // Build amortization schedule (with extra payments)
    const extraSchedule: { month: number; balance: number }[] = [];
    let extraBalance = P;
    let extraTotalInterest = 0;
    let extraMonths = 0;
    for (let m = 0; m <= totalMonths; m++) {
      extraSchedule.push({ month: m, balance: Math.max(0, extraBalance) });
      if (extraBalance <= 0) break;
      if (m < totalMonths) {
        const interestPayment = extraBalance * monthlyRate;
        const principalPayment = M - interestPayment + extraPayment;
        extraTotalInterest += interestPayment;
        extraBalance -= principalPayment;
        extraMonths = m + 1;
        if (extraBalance <= 0) {
          extraSchedule.push({ month: m + 1, balance: 0 });
          break;
        }
      }
    }

    const interestSaved = totalInterest - extraTotalInterest;
    const monthsSaved = totalMonths - extraMonths;

    // Payoff date
    const now = new Date();
    const payoffDate = new Date(now.getFullYear(), now.getMonth() + (extraPayment > 0 ? extraMonths : totalMonths));
    const payoffDateStr = payoffDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

    // Combined balance chart data (sample every N months to keep chart clean)
    const step = totalMonths > 120 ? 6 : totalMonths > 60 ? 3 : 1;
    const balanceData: { month: number; standard: number; withExtra: number }[] = [];
    const maxLen = Math.max(standardSchedule.length, extraSchedule.length);
    for (let i = 0; i < maxLen; i += step) {
      balanceData.push({
        month: i,
        standard: standardSchedule[i] ? Math.round(standardSchedule[i].balance) : 0,
        withExtra: extraSchedule[i] ? Math.round(extraSchedule[i].balance) : 0,
      });
    }
    // Always include last point
    const lastMonth = standardSchedule[standardSchedule.length - 1];
    if (lastMonth && balanceData[balanceData.length - 1]?.month !== lastMonth.month) {
      balanceData.push({
        month: lastMonth.month,
        standard: Math.round(lastMonth.balance),
        withExtra: 0,
      });
    }

    // Pie chart data
    const pieData = [
      { name: "Principal", value: Math.round(P) },
      { name: "Interest", value: Math.round(totalInterest) },
    ];

    return {
      monthlyPayment: M,
      totalInterest,
      totalCost,
      payoffDate: payoffDateStr,
      interestSaved: extraPayment > 0 ? interestSaved : 0,
      monthsSaved: extraPayment > 0 ? monthsSaved : 0,
      pieData,
      balanceData,
    };
  }, [loanAmount, interestRate, termValue, termUnit, extraPayment]);

  const PIE_COLORS = ["#3B82F6", "#22C55E"];

  const shareResultsData: Record<string, string> = results
    ? {
        "Monthly Payment": fmt(results.monthlyPayment),
        "Total Interest": fmt(results.totalInterest),
        "Total Cost": fmt(results.totalCost),
        "Payoff Date": results.payoffDate,
        ...(extraPayment > 0
          ? {
              "Interest Saved": fmt(results.interestSaved),
              "Months Saved": String(results.monthsSaved),
            }
          : {}),
      }
    : {};

  return (
    <div className="bg-[#162032] border border-[#1E293B] rounded-xl p-6 md:p-8">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Loan Amount */}
        <div>
          <CurrencyInput
            label="Loan Amount"
            value={loanAmount}
            onChange={setLoanAmount}
            min={0}
            step={1000}
          />
          <CustomSlider
            value={loanAmount}
            onChange={setLoanAmount}
            min={1000}
            max={500000}
            step={1000}
            formatValue={(v) =>
              v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
            }
            className="mt-3"
          />
        </div>

        {/* Interest Rate */}
        <div>
          <PercentageInput
            label="Annual Interest Rate"
            value={interestRate}
            onChange={setInterestRate}
            min={0}
            max={30}
            step={0.1}
          />
          <CustomSlider
            value={interestRate}
            onChange={setInterestRate}
            min={0}
            max={30}
            step={0.1}
            formatValue={(v) => `${v}%`}
            className="mt-3"
          />
        </div>

        {/* Loan Term */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
            Loan Term
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min={1}
              value={termValue}
              onChange={(e) => setTermValue(Number(e.target.value))}
              className="flex-1 h-12 bg-[#0B1120] border border-[#1E293B] rounded-lg p-3 text-[#F1F5F9] focus:border-[#3B82F6] focus:outline-none focus:ring-[3px] focus:ring-[#3B82F6]/15"
            />
            <select
              value={termUnit}
              onChange={(e) => setTermUnit(e.target.value as "months" | "years")}
              className="h-12 bg-[#0B1120] border border-[#1E293B] rounded-lg p-3 text-[#F1F5F9] focus:border-[#3B82F6] focus:outline-none focus:ring-[3px] focus:ring-[#3B82F6]/15"
            >
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
          <CustomSlider
            value={termValue}
            onChange={setTermValue}
            min={termUnit === "years" ? 1 : 6}
            max={termUnit === "years" ? 30 : 360}
            step={termUnit === "years" ? 1 : 6}
            formatValue={(v) =>
              termUnit === "years" ? `${v} yr${v !== 1 ? "s" : ""}` : `${v} mo`
            }
            className="mt-3"
          />
        </div>

        {/* Extra Monthly Payment */}
        <CurrencyInput
          label="Extra Monthly Payment"
          value={extraPayment}
          onChange={setExtraPayment}
          min={0}
          step={25}
          placeholder="0"
        />
      </div>

      {/* Results */}
      {results && (
        <>
          {/* StatCard Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              label="Monthly Payment"
              highlight
              value={
                <AnimatedNumber
                  value={results.monthlyPayment}
                  format="currency"
                  decimals={2}
                  className="font-mono text-2xl font-bold text-[#22C55E] inline-block"
                />
              }
            />
            <StatCard
              label="Total Interest"
              value={
                <AnimatedNumber
                  value={results.totalInterest}
                  format="currency"
                  decimals={2}
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
            />
            <StatCard
              label="Total Cost"
              value={
                <AnimatedNumber
                  value={results.totalCost}
                  format="currency"
                  decimals={2}
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
            />
            <StatCard
              label="Payoff Date"
              value={results.payoffDate}
            />
          </div>

          {extraPayment > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-8">
              <StatCard
                label="Interest Saved"
                value={
                  <AnimatedNumber
                    value={results.interestSaved}
                    format="currency"
                    decimals={2}
                    className="font-mono text-lg font-bold text-[#22C55E] inline-block"
                  />
                }
                trend="up"
              />
              <StatCard
                label="Months Saved"
                value={
                  <AnimatedNumber
                    value={results.monthsSaved}
                    format="number"
                    decimals={0}
                    className="font-mono text-lg font-bold text-[#22C55E] inline-block"
                  />
                }
                trend="up"
              />
            </div>
          )}

          {/* Share Results */}
          <div className="mb-8">
            <ShareResults
              title="Loan Calculation Results"
              results={shareResultsData}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pie Chart */}
            <div>
              <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">
                Principal vs Interest
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={results.pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    label={(props) => {
                      const { name, percent } = props as { name?: string; percent?: number };
                      return `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`;
                    }}
                  >
                    {results.pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => fmt(value as number)}
                    contentStyle={{
                      backgroundColor: "#0B1120",
                      border: "1px solid #1E293B",
                      borderRadius: "8px",
                      color: "#F1F5F9",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Line Chart */}
            <div>
              <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">
                Balance Over Time
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={results.balanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis
                    dataKey="month"
                    stroke="#94A3B8"
                    tick={{ fill: "#94A3B8", fontSize: 12 }}
                    label={{ value: "Month", position: "insideBottom", offset: -5, fill: "#94A3B8" }}
                  />
                  <YAxis
                    stroke="#94A3B8"
                    tick={{ fill: "#94A3B8", fontSize: 12 }}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(value) => fmt(value as number)}
                    contentStyle={{
                      backgroundColor: "#0B1120",
                      border: "1px solid #1E293B",
                      borderRadius: "8px",
                      color: "#F1F5F9",
                    }}
                    labelFormatter={(label) => `Month ${label}`}
                  />
                  <Legend wrapperStyle={{ color: "#94A3B8" }} />
                  <Line
                    type="monotone"
                    dataKey="standard"
                    stroke="#3B82F6"
                    name="Standard"
                    dot={false}
                    strokeWidth={2}
                  />
                  {extraPayment > 0 && (
                    <Line
                      type="monotone"
                      dataKey="withExtra"
                      stroke="#22C55E"
                      name="With Extra Payments"
                      dot={false}
                      strokeWidth={2}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
