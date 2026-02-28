"use client";

import { useMemo } from "react";
import { useCalculatorState } from "@/hooks/use-calculator-state";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
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
import { formatCurrencyExact, formatPercent } from "@/lib/formatters";

/* ------------------------------------------------------------------ */
/*  2025 Federal Tax Brackets                                          */
/* ------------------------------------------------------------------ */

interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

const SINGLE_BRACKETS: TaxBracket[] = [
  { min: 0, max: 11925, rate: 0.10 },
  { min: 11925, max: 48475, rate: 0.12 },
  { min: 48475, max: 103350, rate: 0.22 },
  { min: 103350, max: 197300, rate: 0.24 },
  { min: 197300, max: 250525, rate: 0.32 },
  { min: 250525, max: 626350, rate: 0.35 },
  { min: 626350, max: Infinity, rate: 0.37 },
];

const MARRIED_BRACKETS: TaxBracket[] = SINGLE_BRACKETS.map((b) => ({
  min: b.min * 2,
  max: b.max === Infinity ? Infinity : b.max * 2,
  rate: b.rate,
}));

const HOH_BRACKETS: TaxBracket[] = [
  { min: 0, max: 17000, rate: 0.10 },
  { min: 17000, max: 64850, rate: 0.12 },
  { min: 64850, max: 103350, rate: 0.22 },
  { min: 103350, max: 197300, rate: 0.24 },
  { min: 197300, max: 250500, rate: 0.32 },
  { min: 250500, max: 626350, rate: 0.35 },
  { min: 626350, max: Infinity, rate: 0.37 },
];

const STANDARD_DEDUCTIONS: Record<string, number> = {
  single: 15000,
  married: 30000,
  hoh: 22500,
};

function calculateFederalTax(taxableIncome: number, brackets: TaxBracket[]): number {
  let tax = 0;
  let remaining = Math.max(taxableIncome, 0);

  for (const bracket of brackets) {
    const taxableInBracket = Math.min(remaining, bracket.max - bracket.min);
    if (taxableInBracket <= 0) break;
    tax += taxableInBracket * bracket.rate;
    remaining -= taxableInBracket;
  }

  return tax;
}

/* ------------------------------------------------------------------ */
/*  State Tax Rates (simplified flat rates)                            */
/* ------------------------------------------------------------------ */

const STATE_TAX_RATES: Record<string, { name: string; rate: number }> = {
  AL: { name: "Alabama", rate: 0.05 },
  AK: { name: "Alaska", rate: 0 },
  AZ: { name: "Arizona", rate: 0.025 },
  CA: { name: "California", rate: 0.093 },
  CO: { name: "Colorado", rate: 0.044 },
  CT: { name: "Connecticut", rate: 0.05 },
  FL: { name: "Florida", rate: 0 },
  GA: { name: "Georgia", rate: 0.055 },
  HI: { name: "Hawaii", rate: 0.0725 },
  ID: { name: "Idaho", rate: 0.058 },
  IL: { name: "Illinois", rate: 0.0495 },
  IN: { name: "Indiana", rate: 0.0305 },
  MA: { name: "Massachusetts", rate: 0.05 },
  MD: { name: "Maryland", rate: 0.0575 },
  MI: { name: "Michigan", rate: 0.0425 },
  MN: { name: "Minnesota", rate: 0.0785 },
  NJ: { name: "New Jersey", rate: 0.0637 },
  NV: { name: "Nevada", rate: 0 },
  NH: { name: "New Hampshire", rate: 0 },
  NY: { name: "New York", rate: 0.0685 },
  NC: { name: "North Carolina", rate: 0.0475 },
  OH: { name: "Ohio", rate: 0.035 },
  OR: { name: "Oregon", rate: 0.09 },
  PA: { name: "Pennsylvania", rate: 0.0307 },
  SD: { name: "South Dakota", rate: 0 },
  TN: { name: "Tennessee", rate: 0 },
  TX: { name: "Texas", rate: 0 },
  UT: { name: "Utah", rate: 0.0465 },
  VA: { name: "Virginia", rate: 0.0575 },
  WA: { name: "Washington", rate: 0 },
  WI: { name: "Wisconsin", rate: 0.0653 },
  WY: { name: "Wyoming", rate: 0 },
};

const PAY_FREQUENCIES: Record<string, { label: string; periods: number }> = {
  weekly: { label: "Weekly (52)", periods: 52 },
  biweekly: { label: "Biweekly (26)", periods: 26 },
  semimonthly: { label: "Semi-Monthly (24)", periods: 24 },
  monthly: { label: "Monthly (12)", periods: 12 },
};

const COLORS = {
  takeHome: "#22C55E",
  federal: "#3B82F6",
  state: "#8B5CF6",
  socialSecurity: "#F59E0B",
  medicare: "#EF4444",
  deductions: "#06B6D4",
};

export function TakeHomePayWidget() {
  const [state, setState, getShareUrl] = useCalculatorState({
    defaults: { grossSalary: 75000, filingStatus: "single" as string, state: "CA" as string, payFrequency: "biweekly" as string, retirement401k: 0, healthInsurance: 0 },
  });
  const grossSalary = state.grossSalary;
  const filingStatus = state.filingStatus;
  const stateCode = state.state;
  const payFrequency = state.payFrequency;
  const contribution401kPercent = state.retirement401k;
  const healthInsurance = state.healthInsurance;

  const contribution401k = useMemo(
    () => Math.round(grossSalary * (contribution401kPercent / 100)),
    [grossSalary, contribution401kPercent]
  );

  const results = useMemo(() => {
    // Pre-tax deductions reduce taxable income (but not FICA)
    const preTaxDeductions = contribution401k + healthInsurance;
    const taxableIncome = Math.max(grossSalary - preTaxDeductions, 0);

    // Standard deduction
    const standardDeduction = STANDARD_DEDUCTIONS[filingStatus] || 15000;
    const federalTaxableIncome = Math.max(taxableIncome - standardDeduction, 0);

    // Federal tax brackets
    let brackets: TaxBracket[];
    switch (filingStatus) {
      case "married":
        brackets = MARRIED_BRACKETS;
        break;
      case "hoh":
        brackets = HOH_BRACKETS;
        break;
      default:
        brackets = SINGLE_BRACKETS;
    }

    const federalTax = calculateFederalTax(federalTaxableIncome, brackets);

    // State tax (simplified flat rate on taxable income)
    const stateRate = STATE_TAX_RATES[stateCode]?.rate || 0;
    const stateTax = taxableIncome * stateRate;

    // Social Security: 6.2% up to $176,100 (on gross, not reduced by pre-tax deductions)
    const ssWageBase = 176100;
    const socialSecurity = Math.min(grossSalary, ssWageBase) * 0.062;

    // Medicare: 1.45% on all income + 0.9% additional on income over $200k
    const medicareBase = grossSalary * 0.0145;
    const medicareAdditional = Math.max(grossSalary - 200000, 0) * 0.009;
    const medicare = medicareBase + medicareAdditional;

    const totalTaxes = federalTax + stateTax + socialSecurity + medicare;
    const totalDeductions = totalTaxes + preTaxDeductions;
    const annualNetPay = grossSalary - totalDeductions;

    const periods = PAY_FREQUENCIES[payFrequency]?.periods || 26;
    const netPayPerPeriod = annualNetPay / periods;

    const effectiveTaxRate = grossSalary > 0 ? (totalTaxes / grossSalary) * 100 : 0;
    const marginalRate = brackets.find(
      (b) => federalTaxableIncome >= b.min && federalTaxableIncome < b.max
    )?.rate || 0;

    return {
      federalTax,
      stateTax,
      socialSecurity,
      medicare,
      totalTaxes,
      preTaxDeductions,
      annualNetPay,
      netPayPerPeriod,
      effectiveTaxRate,
      marginalRate: marginalRate * 100,
    };
  }, [grossSalary, filingStatus, stateCode, payFrequency, contribution401k, healthInsurance]);

  const pieData = [
    { name: "Take-Home Pay", value: Math.max(results.annualNetPay, 0), color: COLORS.takeHome },
    { name: "Federal Tax", value: results.federalTax, color: COLORS.federal },
    { name: "State Tax", value: results.stateTax, color: COLORS.state },
    { name: "Social Security", value: results.socialSecurity, color: COLORS.socialSecurity },
    { name: "Medicare", value: results.medicare, color: COLORS.medicare },
    ...(results.preTaxDeductions > 0
      ? [{ name: "Pre-tax Deductions", value: results.preTaxDeductions, color: COLORS.deductions }]
      : []),
  ].filter((d) => d.value > 0);

  const sortedStates = Object.entries(STATE_TAX_RATES).sort((a, b) =>
    a[1].name.localeCompare(b[1].name)
  );

  const shareResultsData: Record<string, string> = {
    "Net Pay (Annual)": formatCurrencyExact(results.annualNetPay),
    "Federal Tax": formatCurrencyExact(results.federalTax),
    "State Tax": formatCurrencyExact(results.stateTax),
    "Social Security": formatCurrencyExact(results.socialSecurity),
    "Medicare": formatCurrencyExact(results.medicare),
    "Effective Tax Rate": formatPercent(results.effectiveTaxRate),
  };

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#162032] p-6 md:p-8">
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          {/* Gross Annual Salary */}
          <div>
            <CurrencyInput
              label="Gross Annual Salary"
              value={grossSalary}
              onChange={(v) => setState("grossSalary", v)}
              min={0}
              max={500000}
              step={1000}
            />
            <CustomSlider
              value={grossSalary}
              onChange={(v) => setState("grossSalary", v)}
              min={0}
              max={500000}
              step={1000}
              formatValue={(v) =>
                v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
              }
              className="mt-3"
            />
          </div>

          {/* Filing Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Filing Status
            </label>
            <div className="flex gap-2">
              {[
                { value: "single", label: "Single" },
                { value: "married", label: "Married" },
                { value: "hoh", label: "Head of Household" },
              ].map((s) => (
                <button
                  key={s.value}
                  onClick={() => setState("filingStatus", s.value)}
                  className={`flex-1 rounded-lg border px-3 py-2.5 text-xs font-medium transition-colors ${
                    filingStatus === s.value
                      ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                      : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* State */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              State
            </label>
            <select
              value={stateCode}
              onChange={(e) => setState("state", e.target.value)}
              className="h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] p-3 text-[#F1F5F9] focus:border-[#3B82F6] focus:outline-none focus:ring-[3px] focus:ring-[#3B82F6]/15"
            >
              {sortedStates.map(([code, { name, rate }]) => (
                <option key={code} value={code}>
                  {name} ({(rate * 100).toFixed(1)}%)
                </option>
              ))}
            </select>
          </div>

          {/* Pay Frequency */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Pay Frequency
            </label>
            <select
              value={payFrequency}
              onChange={(e) => setState("payFrequency", e.target.value)}
              className="h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] p-3 text-[#F1F5F9] focus:border-[#3B82F6] focus:outline-none focus:ring-[3px] focus:ring-[#3B82F6]/15"
            >
              {Object.entries(PAY_FREQUENCIES).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Pre-tax Deductions */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4 space-y-4">
            <p className="text-sm font-medium text-[#F1F5F9]">Pre-tax Deductions</p>
            <PercentageInput
              label="401(k) Contribution"
              value={contribution401kPercent}
              onChange={(v) => setState("retirement401k", v)}
              min={0}
              max={100}
              step={0.5}
            />
            {contribution401kPercent > 0 && (
              <p className="text-xs text-[#94A3B8] -mt-2">
                = {formatCurrencyExact(contribution401k)}/year
              </p>
            )}
            <CurrencyInput
              label="Health Insurance Premiums (Annual)"
              value={healthInsurance}
              onChange={(v) => setState("healthInsurance", v)}
              min={0}
              step={500}
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Net Pay Per Period - Primary */}
          <div className="rounded-lg border border-l-[3px] border-[#1E293B] border-l-[#22C55E] bg-[#0B1120] p-5">
            <p className="mb-1 text-sm text-[#94A3B8]">
              Net Pay Per {PAY_FREQUENCIES[payFrequency]?.label.split(" ")[0]} Paycheck
            </p>
            <AnimatedNumber
              value={results.netPayPerPeriod}
              format="currency"
              decimals={2}
              className="font-mono text-2xl sm:text-3xl font-bold text-[#22C55E] inline-block transition-transform duration-150"
            />
            <p className="mt-1 text-xs text-[#94A3B8]">
              Annual take-home:{" "}
              <AnimatedNumber
                value={results.annualNetPay}
                format="currency"
                decimals={0}
                className="font-mono text-xs font-semibold text-[#94A3B8] inline-block"
              />
            </p>
          </div>

          {/* StatCard Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <StatCard
              label="Net Pay (Annual)"
              highlight
              value={
                <AnimatedNumber
                  value={results.annualNetPay}
                  format="currency"
                  decimals={0}
                  className="font-mono text-2xl font-bold text-[#22C55E] inline-block"
                />
              }
              className="col-span-2"
            />
            <StatCard
              label="Federal Tax"
              value={
                <AnimatedNumber
                  value={results.federalTax}
                  format="currency"
                  decimals={0}
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
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
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
            />
            <StatCard
              label="Social Security"
              value={
                <AnimatedNumber
                  value={results.socialSecurity}
                  format="currency"
                  decimals={0}
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
            />
            <StatCard
              label="Medicare"
              value={
                <AnimatedNumber
                  value={results.medicare}
                  format="currency"
                  decimals={0}
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
            />
          </div>

          {/* Tax Breakdown with color indicators */}
          <div className="space-y-2">
            {[
              { label: "Federal Income Tax", value: results.federalTax, color: COLORS.federal },
              { label: `State Income Tax (${STATE_TAX_RATES[stateCode]?.name})`, value: results.stateTax, color: COLORS.state },
              { label: "Social Security (6.2%)", value: results.socialSecurity, color: COLORS.socialSecurity },
              { label: "Medicare (1.45%)", value: results.medicare, color: COLORS.medicare },
              ...(results.preTaxDeductions > 0
                ? [{ label: "Pre-tax Deductions", value: results.preTaxDeductions, color: COLORS.deductions }]
                : []),
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-lg border border-[#1E293B] bg-[#0B1120] px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-[#94A3B8]">{item.label}</span>
                </div>
                <AnimatedNumber
                  value={item.value}
                  format="currency"
                  decimals={2}
                  className="font-mono text-sm font-medium text-[#F1F5F9] inline-block"
                />
              </div>
            ))}
          </div>

          {/* Summary Row */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <StatCard
              label="Effective Tax Rate"
              value={
                <AnimatedNumber
                  value={results.effectiveTaxRate}
                  format="percent"
                  decimals={1}
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
            />
            <StatCard
              label="Marginal Tax Rate"
              value={
                <AnimatedNumber
                  value={results.marginalRate}
                  format="percent"
                  decimals={1}
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
            />
          </div>

          {/* Share Results */}
          <ShareResults
            title="Take-Home Pay Calculation"
            results={shareResultsData}
            getShareUrl={getShareUrl}
          />

          {/* Pie Chart */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">Where Your Money Goes</p>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#162032",
                    border: "1px solid #1E293B",
                    borderRadius: "8px",
                    color: "#F1F5F9",
                  }}
                  formatter={(value) => formatCurrencyExact(value as number)}
                />
                <Legend
                  wrapperStyle={{ fontSize: 11, color: "#94A3B8" }}
                  formatter={(value) => <span style={{ color: "#94A3B8" }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
