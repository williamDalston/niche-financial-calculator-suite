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
import { AnimatedNumber } from "@/components/ui/animated-number";
import { CurrencyInput } from "@/components/ui/currency-input";
import { PercentageInput } from "@/components/ui/percentage-input";
import { CustomSlider } from "@/components/ui/custom-slider";
import { ShareResults } from "@/components/ui/share-results";
import { StatCard } from "@/components/ui/stat-card";
import { formatCurrencyExact as fmt, formatCurrency as fmtShort } from "@/lib/formatters";

function calcMonthlyPayment(principal: number, monthlyRate: number, totalMonths: number): number {
  if (monthlyRate === 0) return principal / totalMonths;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);
}

const termOptions = [24, 36, 48, 60, 72, 84];

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

const IconDollar = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const IconCalendar = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconTrendingUp = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
    <polyline points="17,6 23,6 23,12" />
  </svg>
);

const IconPercent = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);

const IconCar = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M5 17H3v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0H9" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function AutoLoanCalculatorWidget() {
  const [vehiclePrice, setVehiclePrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(5000);
  const [tradeInValue, setTradeInValue] = useState(0);
  const [salesTaxRate, setSalesTaxRate] = useState(7.0);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(60);

  const results = useMemo(() => {
    const netPrice = vehiclePrice - downPayment - tradeInValue;
    if (netPrice <= 0 || loanTerm <= 0) return null;

    const salesTax = netPrice * (salesTaxRate / 100);
    const loanAmount = netPrice + salesTax;
    const monthlyRate = interestRate / 100 / 12;

    const M = calcMonthlyPayment(loanAmount, monthlyRate, loanTerm);
    const totalCost = M * loanTerm;
    const totalInterest = totalCost - loanAmount;

    // Amortization schedule
    const schedule: { month: number; balance: number }[] = [];
    let balance = loanAmount;
    const step = loanTerm > 60 ? 3 : loanTerm > 36 ? 2 : 1;

    for (let m = 0; m <= loanTerm; m++) {
      if (m % step === 0 || m === loanTerm) {
        schedule.push({ month: m, balance: Math.max(0, Math.round(balance)) });
      }
      if (m < loanTerm) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = M - interestPayment;
        balance -= principalPayment;
      }
    }

    // Pie chart data: principal, interest, tax
    const pieData = [
      { name: "Principal", value: Math.round(netPrice) },
      { name: "Interest", value: Math.round(totalInterest) },
      { name: "Sales Tax", value: Math.round(salesTax) },
    ];

    return {
      loanAmount,
      salesTax,
      monthlyPayment: M,
      totalInterest,
      totalCost,
      pieData,
      schedule,
    };
  }, [vehiclePrice, downPayment, tradeInValue, salesTaxRate, interestRate, loanTerm]);

  const PIE_COLORS = ["#3B82F6", "#22C55E", "#F59E0B"];

  return (
    <div className="bg-[#162032] border border-[#1E293B] rounded-xl p-6 md:p-8">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <CurrencyInput
          label="Vehicle Price"
          value={vehiclePrice}
          onChange={setVehiclePrice}
          min={0}
          max={500000}
          step={500}
        />

        <CurrencyInput
          label="Down Payment"
          value={downPayment}
          onChange={setDownPayment}
          min={0}
          max={vehiclePrice}
          step={500}
        />

        <CurrencyInput
          label="Trade-In Value"
          value={tradeInValue}
          onChange={setTradeInValue}
          min={0}
          max={vehiclePrice}
          step={500}
        />

        <PercentageInput
          label="Sales Tax Rate"
          value={salesTaxRate}
          onChange={setSalesTaxRate}
          min={0}
          max={20}
          step={0.1}
        />

        <div>
          <PercentageInput
            label="Interest Rate (APR)"
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
            max={20}
            step={0.1}
            formatValue={(v) => `${v.toFixed(1)}%`}
            showMinMax
            className="mt-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
            Loan Term
          </label>
          <div className="flex gap-1 rounded-lg bg-[#0B1120] p-1 border border-[#1E293B]">
            {termOptions.map((t) => (
              <button
                key={t}
                onClick={() => setLoanTerm(t)}
                className={`flex-1 rounded-md px-2 py-2.5 text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/50 ${
                  loanTerm === t
                    ? "bg-[#162032] text-[#22C55E] shadow-sm"
                    : "text-[#94A3B8] hover:text-[#F1F5F9]"
                }`}
              >
                {t}mo
              </button>
            ))}
          </div>
          <p className="mt-1.5 text-xs text-[#94A3B8] text-center">
            {loanTerm} months ({(loanTerm / 12).toFixed(loanTerm % 12 === 0 ? 0 : 1)} years)
          </p>
        </div>
      </div>

      {/* Results */}
      {results && (
        <>
          {/* Hero result */}
          <div className="mb-6 rounded-xl border border-[#1E293B] bg-[#0B1120] p-6 text-center">
            <p className="text-sm font-medium text-[#94A3B8] mb-2">Monthly Payment</p>
            <AnimatedNumber
              value={results.monthlyPayment}
              format="currency"
              decimals={2}
              className="font-mono text-4xl md:text-5xl font-bold text-[#22C55E] inline-block transition-transform duration-150"
            />
            <p className="text-xs text-[#94A3B8] mt-2">
              for {loanTerm} months at {interestRate}% APR
            </p>
          </div>

          {/* StatCard grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <StatCard
              label="Monthly Payment"
              value={fmt(results.monthlyPayment)}
              icon={IconCalendar}
              highlight
              subvalue={`${loanTerm} monthly payments`}
            />
            <StatCard
              label="Loan Amount"
              value={fmtShort(Math.round(results.loanAmount))}
              icon={IconCar}
              subvalue="Principal + sales tax"
            />
            <StatCard
              label="Total Interest"
              value={fmtShort(Math.round(results.totalInterest))}
              icon={IconTrendingUp}
              subvalue={`at ${interestRate}% APR`}
            />
            <StatCard
              label="Total Cost"
              value={fmtShort(Math.round(results.totalCost))}
              icon={IconDollar}
              subvalue="Total of all payments"
            />
            <StatCard
              label="Sales Tax"
              value={fmtShort(Math.round(results.salesTax))}
              icon={IconPercent}
              subvalue={`${salesTaxRate}% tax rate`}
            />
          </div>

          {/* Share Results */}
          <ShareResults
            title="Auto Loan Calculator — CalcEngine.io"
            results={{
              "Vehicle Price": fmtShort(vehiclePrice),
              "Down Payment": fmtShort(downPayment),
              "Loan Amount": fmt(results.loanAmount),
              "Monthly Payment": fmt(results.monthlyPayment),
              "Total Interest": fmt(results.totalInterest),
              "Total Cost": fmt(results.totalCost),
              "Sales Tax": fmt(results.salesTax),
              "Loan Term": `${loanTerm} months`,
              "Interest Rate": `${interestRate}%`,
            }}
            className="mb-8"
          />

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pie Chart */}
            <div>
              <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">
                Cost Breakdown
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
                Loan Balance Over Time
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={results.schedule}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis
                    dataKey="month"
                    stroke="#94A3B8"
                    tick={{ fill: "#94A3B8", fontSize: 12 }}
                    label={{
                      value: "Month",
                      position: "insideBottom",
                      offset: -5,
                      fill: "#94A3B8",
                    }}
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
                    dataKey="balance"
                    stroke="#22C55E"
                    name="Remaining Balance"
                    dot={false}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
