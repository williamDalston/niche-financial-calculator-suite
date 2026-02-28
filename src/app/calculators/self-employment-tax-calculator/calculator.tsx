"use client";

import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  AnimatedNumber,
  CurrencyInput,
  CustomSlider,
  ShareResults,
  StatCard,
} from "@/components/ui";
import { formatCurrency } from "@/lib/formatters";
import { useCalculatorState } from "@/hooks/use-calculator-state";

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

// Simplified state tax rates (effective rates)
const STATE_TAX_RATES: Record<string, number> = {
  AL: 0.04, AK: 0, AZ: 0.025, AR: 0.044, CA: 0.093,
  CO: 0.044, CT: 0.05, DE: 0.055, FL: 0, GA: 0.0549,
  HI: 0.065, ID: 0.058, IL: 0.0495, IN: 0.0315, IA: 0.044,
  KS: 0.046, KY: 0.04, LA: 0.0425, ME: 0.055, MD: 0.05,
  MA: 0.05, MI: 0.0425, MN: 0.068, MS: 0.05, MO: 0.048,
  MT: 0.059, NE: 0.056, NV: 0, NH: 0, NJ: 0.055,
  NM: 0.049, NY: 0.065, NC: 0.045, ND: 0.019, OH: 0.035,
  OK: 0.0425, OR: 0.08, PA: 0.0307, RI: 0.0475, SC: 0.05,
  SD: 0, TN: 0, TX: 0, UT: 0.0465, VT: 0.06,
  VA: 0.0475, WA: 0, WV: 0.05, WI: 0.053, WY: 0,
  DC: 0.065,
};

const STATES = [
  { label: "Alabama", value: "AL" }, { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" }, { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" }, { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" }, { label: "Delaware", value: "DE" },
  { label: "District of Columbia", value: "DC" }, { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" }, { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" }, { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" }, { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" }, { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" }, { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" }, { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" }, { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" }, { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" }, { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" }, { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" }, { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" }, { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" }, { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" }, { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" }, { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" }, { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" }, { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" }, { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" }, { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" }, { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
];

const SS_WAGE_BASE = 168600;
const SE_TAX_RATE_SS = 0.124;
const SE_TAX_RATE_MEDICARE = 0.029;
const ADDITIONAL_MEDICARE_THRESHOLD = 200000;
const ADDITIONAL_MEDICARE_RATE = 0.009;

function computeFederalTax(taxableIncome: number, status: string): number {
  const brackets = TAX_BRACKETS[status as keyof typeof TAX_BRACKETS] || TAX_BRACKETS.single;
  let tax = 0;
  let remaining = Math.max(taxableIncome, 0);
  for (const bracket of brackets) {
    const taxable = Math.min(remaining, bracket.max - bracket.min);
    if (taxable <= 0) break;
    tax += taxable * bracket.rate;
    remaining -= taxable;
  }
  return tax;
}

export function SelfEmploymentTaxCalculatorWidget() {
  const [calcState, setCalcState, getShareUrl] = useCalculatorState({
    defaults: {
      grossIncome: 120000,
      businessExpenses: 20000,
      filingStatus: "single",
      otherIncome: 0,
      quarterlyPaid: 0,
      usState: "CA",
    },
  });

  const results = useMemo(() => {
    // Net self-employment income
    const netSEIncome = Math.max(calcState.grossIncome - calcState.businessExpenses, 0);

    // SE tax is calculated on 92.35% of net SE income
    const seTaxableIncome = netSEIncome * 0.9235;

    // Social Security portion (12.4% up to wage base, considering W-2 wages)
    const ssWagesAlreadyCovered = Math.min(calcState.otherIncome, SS_WAGE_BASE);
    const ssRemainingBase = Math.max(SS_WAGE_BASE - ssWagesAlreadyCovered, 0);
    const ssTaxable = Math.min(seTaxableIncome, ssRemainingBase);
    const ssTax = ssTaxable * SE_TAX_RATE_SS;

    // Medicare portion (2.9% on all SE income)
    const medicareTax = seTaxableIncome * SE_TAX_RATE_MEDICARE;

    // Additional Medicare (0.9% over $200k combined income)
    const totalIncome = netSEIncome + calcState.otherIncome;
    const additionalMedicareBase = Math.max(
      totalIncome - ADDITIONAL_MEDICARE_THRESHOLD,
      0
    );
    const additionalMedicare = Math.min(
      additionalMedicareBase,
      seTaxableIncome
    ) * ADDITIONAL_MEDICARE_RATE;

    const totalSETax = ssTax + medicareTax + additionalMedicare;

    // Deduction for half of SE tax (for income tax purposes)
    const seDeduction = totalSETax / 2;

    // Federal income tax
    const standardDeduction =
      calcState.filingStatus === "married" ? 29200 : calcState.filingStatus === "head" ? 21900 : 14600;
    const taxableIncome = Math.max(
      netSEIncome + calcState.otherIncome - seDeduction - standardDeduction,
      0
    );
    const federalTax = computeFederalTax(taxableIncome, calcState.filingStatus);

    // State tax (simplified)
    const stateRate = STATE_TAX_RATES[calcState.usState] || 0;
    const stateTax = Math.max(netSEIncome + calcState.otherIncome - standardDeduction, 0) * stateRate;

    // Total tax liability
    const totalTax = totalSETax + federalTax + stateTax;

    // Effective rate
    const totalGross = netSEIncome + calcState.otherIncome;
    const effectiveRate = totalGross > 0 ? (totalTax / totalGross) * 100 : 0;

    // Take-home
    const takeHome = totalGross - totalTax;

    // Quarterly estimated payment
    const remainingTax = Math.max(totalTax - calcState.quarterlyPaid, 0);
    const quartersRemaining = 4;
    const quarterlyPayment = remainingTax / quartersRemaining;

    return {
      netSEIncome,
      ssTax,
      medicareTax,
      additionalMedicare,
      totalSETax,
      seDeduction,
      federalTax,
      stateTax,
      totalTax,
      effectiveRate,
      takeHome,
      quarterlyPayment,
      remainingTax,
    };
  }, [calcState.grossIncome, calcState.businessExpenses, calcState.filingStatus, calcState.otherIncome, calcState.quarterlyPaid, calcState.usState]);

  const pieData = [
    { name: "Take-Home", value: Math.max(Math.round(results.takeHome), 0) },
    { name: "SE Tax", value: Math.round(results.totalSETax) },
    { name: "Federal Tax", value: Math.round(results.federalTax) },
    { name: "State Tax", value: Math.round(results.stateTax) },
  ].filter((d) => d.value > 0);

  const PIE_COLORS = [COLORS.primary, COLORS.warning, COLORS.secondary, COLORS.purple];

  const quarterlyData = [
    { name: "Q1 (Apr 15)", amount: Math.round(results.quarterlyPayment) },
    { name: "Q2 (Jun 15)", amount: Math.round(results.quarterlyPayment) },
    { name: "Q3 (Sep 15)", amount: Math.round(results.quarterlyPayment) },
    { name: "Q4 (Jan 15)", amount: Math.round(results.quarterlyPayment) },
  ];

  const shareResultsData: Record<string, string> = {
    "Total Tax Liability": formatCurrency(results.totalTax),
    "Self-Employment Tax": formatCurrency(results.totalSETax),
    "Federal Income Tax": formatCurrency(results.federalTax),
    "State Tax": formatCurrency(results.stateTax),
    "Effective Rate": `${results.effectiveRate.toFixed(1)}%`,
    "Quarterly Payment": formatCurrency(results.quarterlyPayment),
  };

  const selectClass =
    "h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] p-3 text-[#F1F5F9] focus:border-[#3B82F6] focus:outline-none";

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#162032] p-6 md:p-8">
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          {/* Gross Income */}
          <div>
            <CurrencyInput
              label="Gross Self-Employment Income"
              value={calcState.grossIncome}
              onChange={(v) => setCalcState('grossIncome', v)}
              min={0}
              max={500000}
              step={1000}
            />
            <CustomSlider
              value={calcState.grossIncome}
              onChange={(v) => setCalcState('grossIncome', v)}
              min={0}
              max={500000}
              step={1000}
              formatValue={(v) =>
                v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
              }
              className="mt-3"
            />
          </div>

          {/* Business Expenses */}
          <CurrencyInput
            label="Business Expenses / Deductions"
            value={calcState.businessExpenses}
            onChange={(v) => setCalcState('businessExpenses', v)}
            min={0}
            max={500000}
            step={500}
          />

          {/* Filing Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Filing Status
            </label>
            <div className="flex flex-col gap-2 sm:flex-row" role="radiogroup" aria-label="Filing Status">
              {FILING_STATUSES.map((status) => (
                <button
                  key={status.value}
                  role="radio"
                  aria-checked={calcState.filingStatus === status.value}
                  onClick={() => setCalcState('filingStatus', status.value)}
                  className={`flex-1 rounded-lg border px-3 py-3 text-sm font-medium transition-colors ${
                    calcState.filingStatus === status.value
                      ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                      : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          {/* Other Income (W-2 Wages) */}
          <CurrencyInput
            label="Other Income (W-2 Wages)"
            value={calcState.otherIncome}
            onChange={(v) => setCalcState('otherIncome', v)}
            min={0}
            max={500000}
            step={1000}
          />

          {/* Quarterly Payments Made */}
          <CurrencyInput
            label="Estimated Quarterly Payments Already Made"
            value={calcState.quarterlyPaid}
            onChange={(v) => setCalcState('quarterlyPaid', v)}
            min={0}
            max={200000}
            step={100}
          />

          {/* State */}
          <div>
            <label htmlFor="se-state" className="mb-2 block text-sm font-medium text-[#94A3B8]">
              State
            </label>
            <select
              id="se-state"
              value={calcState.usState}
              onChange={(e) => setCalcState('usState', e.target.value)}
              className={selectClass}
            >
              {STATES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Primary Result: Total Tax Liability */}
          <div className="rounded-lg border border-l-[3px] border-[#1E293B] border-l-[#EF4444] bg-[#0B1120] p-5">
            <p className="mb-1 text-sm text-[#94A3B8]">Total Tax Liability</p>
            <AnimatedNumber
              value={results.totalTax}
              format="currency"
              decimals={0}
              className="font-mono text-2xl sm:text-3xl font-bold text-[#EF4444] inline-block transition-transform duration-150"
            />
            <p className="mt-1 text-xs text-[#94A3B8]">
              Effective tax rate: {results.effectiveRate.toFixed(1)}%
            </p>
          </div>

          {/* SE Tax */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-1 text-xs text-[#94A3B8]">Self-Employment Tax</p>
            <AnimatedNumber
              value={results.totalSETax}
              format="currency"
              decimals={0}
              className="font-mono text-2xl font-bold text-[#F59E0B] inline-block"
            />
          </div>

          {/* Federal Tax */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-1 text-xs text-[#94A3B8]">Federal Income Tax</p>
            <AnimatedNumber
              value={results.federalTax}
              format="currency"
              decimals={0}
              className="font-mono text-2xl font-bold text-[#3B82F6] inline-block"
            />
          </div>

          {/* Quarterly Payment */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-1 text-xs text-[#94A3B8]">Estimated Quarterly Payment</p>
            <AnimatedNumber
              value={results.quarterlyPayment}
              format="currency"
              decimals={0}
              className="font-mono text-2xl font-bold text-[#22C55E] inline-block"
            />
          </div>

          {/* StatCard Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <StatCard
              label="Total Tax"
              highlight
              value={
                <AnimatedNumber
                  value={results.totalTax}
                  format="compact"
                  decimals={1}
                  className="font-mono text-2xl font-bold text-[#22C55E] inline-block"
                />
              }
              className="col-span-2"
            />
            <StatCard
              label="SE Tax"
              value={
                <AnimatedNumber
                  value={results.totalSETax}
                  format="currency"
                  decimals={0}
                  className="font-mono text-lg font-bold text-[#F59E0B] inline-block"
                />
              }
            />
            <StatCard
              label="Federal Income Tax"
              value={
                <AnimatedNumber
                  value={results.federalTax}
                  format="currency"
                  decimals={0}
                  className="font-mono text-lg font-bold text-[#3B82F6] inline-block"
                />
              }
            />
            <StatCard
              label="State Tax"
              value={
                <AnimatedNumber
                  value={results.stateTax}
                  format="currency"
                  decimals={0}
                  className="font-mono text-lg font-bold text-[#A855F7] inline-block"
                />
              }
            />
            <StatCard
              label="Effective Rate"
              value={
                <AnimatedNumber
                  value={results.effectiveRate}
                  format="percent"
                  decimals={1}
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
            />
            <StatCard
              label="Quarterly Payment"
              value={
                <AnimatedNumber
                  value={results.quarterlyPayment}
                  format="currency"
                  decimals={0}
                  className="font-mono text-lg font-bold text-[#22C55E] inline-block"
                />
              }
              className="col-span-2"
            />
          </div>

          {/* Share Results */}
          <ShareResults
            title="Self-Employment Tax Calculation"
            results={shareResultsData}
            getShareUrl={getShareUrl}
          />

          {/* SE Tax Details */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">
              Self-Employment Tax Breakdown
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Social Security (12.4%)</span>
                <span className="font-mono text-[#F1F5F9]">{formatCurrency(results.ssTax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Medicare (2.9%)</span>
                <span className="font-mono text-[#F1F5F9]">{formatCurrency(results.medicareTax)}</span>
              </div>
              {results.additionalMedicare > 0 && (
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Additional Medicare (0.9%)</span>
                  <span className="font-mono text-[#F1F5F9]">{formatCurrency(results.additionalMedicare)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-[#1E293B] pt-2 font-medium">
                <span className="text-[#94A3B8]">Total SE Tax</span>
                <span className="font-mono text-[#F59E0B]">{formatCurrency(results.totalSETax)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#94A3B8]">SE Tax Deduction (50%)</span>
                <span className="font-mono text-[#22C55E]">-{formatCurrency(results.seDeduction)}</span>
              </div>
            </div>
          </div>

          {/* Income Allocation Pie Chart */}
          {results.netSEIncome + calcState.otherIncome > 0 && (
            <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
              <p className="mb-3 text-sm font-medium text-[#94A3B8]">
                Income Allocation
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((_, idx) => (
                      <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
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
                {pieData.map((item, idx) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-sm"
                      style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
                    />
                    <span className="text-[#94A3B8]">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quarterly Payment Schedule */}
      <div className="mt-8 rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
        <p className="mb-3 text-sm font-medium text-[#94A3B8]">
          Quarterly Estimated Payment Schedule
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={quarterlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis
              dataKey="name"
              stroke={COLORS.textMuted}
              tick={{ fontSize: 11 }}
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
            <Bar dataKey="amount" fill={COLORS.primary} radius={[4, 4, 0, 0]} name="Payment" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
