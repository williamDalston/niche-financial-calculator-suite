"use client";

import { useState, useMemo } from "react";
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
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
  mfj: [
    { min: 0, max: 23200, rate: 0.10 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 },
  ],
  mfs: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 365600, rate: 0.35 },
    { min: 365600, max: Infinity, rate: 0.37 },
  ],
  hoh: [
    { min: 0, max: 16550, rate: 0.10 },
    { min: 16550, max: 63100, rate: 0.12 },
    { min: 63100, max: 100500, rate: 0.22 },
    { min: 100500, max: 191950, rate: 0.24 },
    { min: 191950, max: 243700, rate: 0.32 },
    { min: 243700, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
};

const STANDARD_DEDUCTIONS: Record<FilingStatus, number> = {
  single: 14600,
  mfj: 29200,
  mfs: 14600,
  hoh: 21900,
};


export function FederalTaxCalculatorWidget() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [grossIncome, setGrossIncome] = useState(85000);
  const [iraDeduction, setIraDeduction] = useState(0);
  const [studentLoanInterest, setStudentLoanInterest] = useState(0);
  const [hsaDeduction, setHsaDeduction] = useState(0);
  const [deductionType, setDeductionType] = useState<"standard" | "itemized">("standard");
  const [mortgageInterest, setMortgageInterest] = useState(0);
  const [saltDeduction, setSaltDeduction] = useState(0);
  const [charitableDeduction, setCharitableDeduction] = useState(0);
  const [numDependents, setNumDependents] = useState(0);
  const [childTaxCreditChildren, setChildTaxCreditChildren] = useState(0);

  const results = useMemo(() => {
    const aboveTheLineDeductions = iraDeduction + studentLoanInterest + hsaDeduction;
    const agi = Math.max(grossIncome - aboveTheLineDeductions, 0);

    let deductionAmount: number;
    if (deductionType === "standard") {
      deductionAmount = STANDARD_DEDUCTIONS[filingStatus];
    } else {
      const cappedSalt = Math.min(saltDeduction, 10000);
      deductionAmount = mortgageInterest + cappedSalt + charitableDeduction;
    }

    const taxableIncome = Math.max(agi - deductionAmount, 0);
    const brackets = BRACKETS[filingStatus];

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

    const childTaxCredit = childTaxCreditChildren * 2000;
    const taxAfterCredits = Math.max(totalTax - childTaxCredit, 0);
    const effectiveRate = grossIncome > 0 ? taxAfterCredits / grossIncome : 0;
    const takeHome = grossIncome - taxAfterCredits;

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
    filingStatus,
    grossIncome,
    iraDeduction,
    studentLoanInterest,
    hsaDeduction,
    deductionType,
    mortgageInterest,
    saltDeduction,
    charitableDeduction,
    numDependents,
    childTaxCreditChildren,
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
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Filing Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Filing Status
            </label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
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
              value={grossIncome}
              onChange={setGrossIncome}
              min={0}
              max={1000000}
              step={1000}
            />
            <CustomSlider
              value={grossIncome}
              onChange={setGrossIncome}
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
                value={iraDeduction}
                onChange={setIraDeduction}
                min={0}
                max={7000}
                step={100}
              />
              <CurrencyInput
                label="Student Loan Interest"
                value={studentLoanInterest}
                onChange={setStudentLoanInterest}
                min={0}
                max={2500}
                step={100}
              />
              <CurrencyInput
                label="HSA Contribution"
                value={hsaDeduction}
                onChange={setHsaDeduction}
                min={0}
                max={8300}
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
                  onClick={() => setDeductionType(type)}
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
                value={mortgageInterest}
                onChange={setMortgageInterest}
                min={0}
                step={100}
              />
              <CurrencyInput
                label="State & Local Taxes (SALT, capped at $10,000)"
                value={saltDeduction}
                onChange={setSaltDeduction}
                min={0}
                step={100}
              />
              <CurrencyInput
                label="Charitable Contributions"
                value={charitableDeduction}
                onChange={setCharitableDeduction}
                min={0}
                step={100}
              />
            </div>
          )}

          {/* Dependents */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
                Dependents
              </label>
              <input
                type="number"
                value={numDependents}
                onChange={(e) => setNumDependents(Number(e.target.value))}
                className="h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] p-3 text-[#F1F5F9] focus:border-[#3B82F6] focus:outline-none"
                min={0}
                max={20}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
                Children (Tax Credit)
              </label>
              <input
                type="number"
                value={childTaxCreditChildren}
                onChange={(e) => setChildTaxCreditChildren(Number(e.target.value))}
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
              className="font-mono text-4xl font-bold text-[#22C55E] inline-block transition-transform duration-150"
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
          />

          {/* StatCard Grid */}
          <div className="grid grid-cols-2 gap-3">
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
              subvalue={`${grossIncome > 0 ? Math.round((results.takeHome / grossIncome) * 100) : 0}% of gross income`}
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
          {grossIncome > 0 && (
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
                  <span className="text-[#94A3B8]">Federal Tax ({grossIncome > 0 ? Math.round(results.taxAfterCredits / grossIncome * 100) : 0}%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: COLORS.primary }} />
                  <span className="text-[#94A3B8]">Take-Home ({grossIncome > 0 ? Math.round(results.takeHome / grossIncome * 100) : 0}%)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
