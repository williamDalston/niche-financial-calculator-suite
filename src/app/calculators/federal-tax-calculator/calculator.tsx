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
  Legend,
} from "recharts";
import {
  AnimatedNumber,
  CurrencyInput,
  CustomSlider,
  ShareResults,
  StatCard,
} from "@/components/ui";
import { useCalculatorState } from "@/hooks/use-calculator-state";
import { formatCurrency, formatPercentRatio as formatPercent } from "@/lib/formatters";

const COLORS = {
  primary: "#22C55E",
  secondary: "#3B82F6",
  tertiary: "#F59E0B",
  quaternary: "#EF4444",
  purple: "#A855F7",
  pink: "#EC4899",
  cyan: "#06B6D4",
  bg: "#0B1120",
  surface: "#162032",
  border: "#1E293B",
  textPrimary: "#F1F5F9",
  textMuted: "#94A3B8",
};

const BRACKET_COLORS = [
  "#22C55E",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
  "#A855F7",
  "#EC4899",
  "#06B6D4",
];

type FilingStatus = "single" | "mfj" | "mfs" | "hoh";

interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

const BRACKETS: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { min: 0, max: 11925, rate: 0.10 },
    { min: 11925, max: 48475, rate: 0.12 },
    { min: 48475, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250525, rate: 0.32 },
    { min: 250525, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 },
  ],
  mfj: [
    { min: 0, max: 23850, rate: 0.10 },
    { min: 23850, max: 96950, rate: 0.12 },
    { min: 96950, max: 206700, rate: 0.22 },
    { min: 206700, max: 394600, rate: 0.24 },
    { min: 394600, max: 501050, rate: 0.32 },
    { min: 501050, max: 751600, rate: 0.35 },
    { min: 751600, max: Infinity, rate: 0.37 },
  ],
  mfs: [
    { min: 0, max: 11925, rate: 0.10 },
    { min: 11925, max: 48475, rate: 0.12 },
    { min: 48475, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250525, rate: 0.32 },
    { min: 250525, max: 375800, rate: 0.35 },
    { min: 375800, max: Infinity, rate: 0.37 },
  ],
  hoh: [
    { min: 0, max: 17000, rate: 0.10 },
    { min: 17000, max: 64850, rate: 0.12 },
    { min: 64850, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250500, rate: 0.32 },
    { min: 250500, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 },
  ],
};

const STANDARD_DEDUCTIONS: Record<FilingStatus, number> = {
  single: 15000,
  mfj: 30000,
  mfs: 15000,
  hoh: 22500,
};


export function FederalTaxCalculatorWidget() {
  const [state, setState, getShareUrl] = useCalculatorState({
    defaults: {
      filingStatus: "single" as string,
      grossIncome: 85000,
      iraDeduction: 0,
      studentLoanInterest: 0,
      hsaDeduction: 0,
      deductionType: "standard" as string,
      mortgageInterest: 0,
      saltDeduction: 0,
      charitableDeduction: 0,
      numDependents: 0,
      childTaxCreditChildren: 0,
    },
  });

  const filingStatus = state.filingStatus as FilingStatus;
  const deductionType = state.deductionType as "standard" | "itemized";

  const results = useMemo(() => {
    const aboveTheLineDeductions = state.iraDeduction + state.studentLoanInterest + state.hsaDeduction;
    const agi = Math.max(state.grossIncome - aboveTheLineDeductions, 0);

    let deductionAmount: number;
    if (state.deductionType === "standard") {
      deductionAmount = STANDARD_DEDUCTIONS[state.filingStatus as FilingStatus];
    } else {
      const cappedSalt = Math.min(state.saltDeduction, 10000);
      deductionAmount = state.mortgageInterest + cappedSalt + state.charitableDeduction;
    }

    const taxableIncome = Math.max(agi - deductionAmount, 0);
    const brackets = BRACKETS[state.filingStatus as FilingStatus];

    let totalTax = 0;
    let marginalRate = 0;
    const bracketBreakdown: { bracket: string; amount: number; rate: number }[] = [];

    for (const bracket of brackets) {
      if (taxableIncome <= bracket.min) break;
      const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
      const taxInBracket = taxableInBracket * bracket.rate;
      totalTax += taxInBracket;
      marginalRate = bracket.rate;

      if (taxInBracket > 0) {
        bracketBreakdown.push({
          bracket: `${(bracket.rate * 100).toFixed(0)}%`,
          amount: Math.round(taxInBracket),
          rate: bracket.rate,
        });
      }
    }

    const childTaxCredit = state.childTaxCreditChildren * 2000;
    const otherDependentCredit = state.numDependents * 500;
    const taxAfterCredits = Math.max(totalTax - childTaxCredit - otherDependentCredit, 0);
    const effectiveRate = state.grossIncome > 0 ? taxAfterCredits / state.grossIncome : 0;
    const takeHome = state.grossIncome - taxAfterCredits;

    return {
      agi,
      deductionAmount,
      taxableIncome,
      totalTax,
      effectiveRate,
      marginalRate,
      bracketBreakdown,
      childTaxCredit,
      taxAfterCredits,
      takeHome,
    };
  }, [
    state.filingStatus,
    state.grossIncome,
    state.iraDeduction,
    state.studentLoanInterest,
    state.hsaDeduction,
    state.deductionType,
    state.mortgageInterest,
    state.saltDeduction,
    state.charitableDeduction,
    state.numDependents,
    state.childTaxCreditChildren,
  ]);

  const pieData = [
    { name: "Federal Tax", value: Math.round(results.taxAfterCredits) },
    { name: "Take-Home", value: Math.round(results.takeHome) },
  ];

  const PIE_COLORS = [COLORS.quaternary, COLORS.primary];

  const shareResults = {
    "Federal Tax": formatCurrency(results.taxAfterCredits),
    "Effective Rate": formatPercent(results.effectiveRate),
    "Marginal Rate": formatPercent(results.marginalRate),
    "Taxable Income": formatCurrency(results.taxableIncome),
    "Take-Home": formatCurrency(results.takeHome),
  };

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#162032] p-6 md:p-8">
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Filing Status */}
          <div>
            <label htmlFor="ft-filing-status" className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Filing Status
            </label>
            <select
              id="ft-filing-status"
              value={filingStatus}
              onChange={(e) => setState('filingStatus', e.target.value)}
              className="h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] p-3 text-[#F1F5F9] focus:border-[#3B82F6] focus:outline-none"
            >
              <option value="single">Single</option>
              <option value="mfj">Married Filing Jointly</option>
              <option value="mfs">Married Filing Separately</option>
              <option value="hoh">Head of Household</option>
            </select>
          </div>

          {/* Gross Income */}
          <div>
            <CurrencyInput
              label="Gross Income"
              value={state.grossIncome}
              onChange={(v) => setState('grossIncome', v)}
              min={0}
              max={1000000}
              step={1000}
            />
            <CustomSlider
              value={state.grossIncome}
              onChange={(v) => setState('grossIncome', v)}
              min={0}
              max={1000000}
              step={1000}
              formatValue={(v) => `$${(v / 1000).toFixed(0)}k`}
              showMinMax
              className="mt-2"
            />
          </div>

          {/* Above-the-Line Deductions */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Above-the-Line Deductions
            </label>
            <div className="space-y-3">
              <CurrencyInput
                label="IRA Contribution"
                value={state.iraDeduction}
                onChange={(v) => setState('iraDeduction', v)}
                min={0}
                max={7000}
                step={100}
              />
              <CurrencyInput
                label="Student Loan Interest"
                value={state.studentLoanInterest}
                onChange={(v) => setState('studentLoanInterest', v)}
                min={0}
                max={2500}
                step={100}
              />
              <CurrencyInput
                label="HSA Contribution"
                value={state.hsaDeduction}
                onChange={(v) => setState('hsaDeduction', v)}
                min={0}
                max={8550}
                step={100}
              />
            </div>
          </div>

          {/* Deduction Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Deduction Type
            </label>
            <div className="flex gap-2">
              {(["standard", "itemized"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setState('deductionType', type)}
                  className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                    deductionType === type
                      ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                      : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
                  }`}
                >
                  {type === "standard" ? `Standard (${formatCurrency(STANDARD_DEDUCTIONS[filingStatus])})` : "Itemized"}
                </button>
              ))}
            </div>
          </div>

          {/* Itemized Deductions */}
          {deductionType === "itemized" && (
            <div className="space-y-3 rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
              <CurrencyInput
                label="Mortgage Interest"
                value={state.mortgageInterest}
                onChange={(v) => setState('mortgageInterest', v)}
                min={0}
                step={100}
              />
              <CurrencyInput
                label="State & Local Taxes (SALT, capped at $10,000)"
                value={state.saltDeduction}
                onChange={(v) => setState('saltDeduction', v)}
                min={0}
                step={100}
              />
              <CurrencyInput
                label="Charitable Contributions"
                value={state.charitableDeduction}
                onChange={(v) => setState('charitableDeduction', v)}
                min={0}
                step={100}
              />
            </div>
          )}

          {/* Dependents */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label htmlFor="ft-dependents" className="mb-2 block text-sm font-medium text-[#94A3B8]">
                Dependents
              </label>
              <input
                id="ft-dependents"
                type="number"
                value={state.numDependents}
                onChange={(e) => setState('numDependents', Number(e.target.value))}
                className="h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] p-3 text-[#F1F5F9] focus:border-[#3B82F6] focus:outline-none"
                min={0}
                max={20}
              />
            </div>
            <div>
              <label htmlFor="ft-children" className="mb-2 block text-sm font-medium text-[#94A3B8]">
                Children (Tax Credit)
              </label>
              <input
                id="ft-children"
                type="number"
                value={state.childTaxCreditChildren}
                onChange={(e) => setState('childTaxCreditChildren', Number(e.target.value))}
                className="h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] p-3 text-[#F1F5F9] focus:border-[#3B82F6] focus:outline-none"
                min={0}
                max={20}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Primary Result: Tax After Credits */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-5 text-center">
            <p className="mb-2 text-sm text-[#94A3B8]">Federal Tax After Credits</p>
            <AnimatedNumber
              value={results.taxAfterCredits}
              format="currency"
              className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-[#22C55E] inline-block transition-transform duration-150"
            />
          </div>

          {/* AnimatedNumber secondary metrics */}
          <div className="flex flex-wrap items-center justify-center gap-6 rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <div className="text-center">
              <p className="text-xs text-[#94A3B8] mb-1">Effective Rate</p>
              <AnimatedNumber
                value={results.effectiveRate * 100}
                format="percent"
                decimals={1}
                className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
              />
            </div>
            <div className="text-center">
              <p className="text-xs text-[#94A3B8] mb-1">Marginal Rate</p>
              <AnimatedNumber
                value={results.marginalRate * 100}
                format="percent"
                decimals={1}
                className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
              />
            </div>
            <div className="text-center">
              <p className="text-xs text-[#94A3B8] mb-1">Taxable Income</p>
              <AnimatedNumber
                value={results.taxableIncome}
                format="currency"
                className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
              />
            </div>
          </div>

          {/* Share Results */}
          <ShareResults
            title="Federal Tax Calculator Results"
            results={shareResults}
            getShareUrl={getShareUrl}
          />

          {/* StatCard Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <StatCard
              label="Federal Tax"
              value={formatCurrency(results.taxAfterCredits)}
              highlight
            />
            <StatCard
              label="Effective Rate"
              value={formatPercent(results.effectiveRate)}
            />
            <StatCard
              label="Marginal Rate"
              value={formatPercent(results.marginalRate)}
            />
            <StatCard
              label="After-Credit Tax"
              value={formatCurrency(results.taxAfterCredits)}
              subvalue={results.childTaxCredit > 0 ? `Credit: -${formatCurrency(results.childTaxCredit)}` : undefined}
            />
            <StatCard
              label="Take-Home"
              value={formatCurrency(results.takeHome)}
              className="col-span-2"
              subvalue={`${state.grossIncome > 0 ? Math.round((results.takeHome / state.grossIncome) * 100) : 0}% of gross income`}
            />
          </div>

          {/* Tax by Bracket - Stacked Bar */}
          {results.bracketBreakdown.length > 0 && (
            <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
              <p className="mb-3 text-sm font-medium text-[#94A3B8]">Tax by Bracket</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={[{ name: "Tax", ...Object.fromEntries(results.bracketBreakdown.map((b) => [b.bracket, b.amount])) }]}>
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
                    formatter={(value) => formatCurrency(value as number)}
                  />
                  <Legend wrapperStyle={{ color: COLORS.textMuted, fontSize: 12 }} />
                  {results.bracketBreakdown.map((b, i) => (
                    <Bar
                      key={b.bracket}
                      dataKey={b.bracket}
                      stackId="tax"
                      fill={BRACKET_COLORS[i % BRACKET_COLORS.length]}
                      name={`${b.bracket} Bracket`}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Pie Chart - Income Allocation */}
          {state.grossIncome > 0 && (
            <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
              <p className="mb-3 text-sm font-medium text-[#94A3B8]">Income Allocation</p>
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
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
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
              <div className="mt-2 flex justify-center gap-6 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: COLORS.quaternary }} />
                  <span className="text-[#94A3B8]">Federal Tax ({state.grossIncome > 0 ? Math.round(results.taxAfterCredits / state.grossIncome * 100) : 0}%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: COLORS.primary }} />
                  <span className="text-[#94A3B8]">Take-Home ({state.grossIncome > 0 ? Math.round(results.takeHome / state.grossIncome * 100) : 0}%)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
