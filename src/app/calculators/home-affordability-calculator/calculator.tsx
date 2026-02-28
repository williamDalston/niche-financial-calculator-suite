"use client";

import { useMemo } from "react";
import { useCalculatorState } from "@/hooks/use-calculator-state";
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
import { AnimatedNumber } from "@/components/ui/animated-number";
import { CurrencyInput } from "@/components/ui/currency-input";
import { CustomSlider } from "@/components/ui/custom-slider";
import { PercentageInput } from "@/components/ui/percentage-input";
import { ShareResults } from "@/components/ui/share-results";
import { StatCard } from "@/components/ui/stat-card";
import { formatCurrency, formatCurrencyExact } from "@/lib/formatters";

const COLORS = {
  principal: "#3B82F6",
  interest: "#22C55E",
  tax: "#F59E0B",
  insurance: "#EF4444",
  pmi: "#A855F7",
  hoa: "#EC4899",
  bg: "#0B1120",
  surface: "#162032",
  border: "#1E293B",
  textPrimary: "#F1F5F9",
  textMuted: "#94A3B8",
};

const PIE_COLORS = ["#3B82F6", "#22C55E", "#F59E0B", "#EF4444", "#A855F7", "#EC4899"];

export function HomeAffordabilityCalculatorWidget() {
  const [state, setState, getShareUrl] = useCalculatorState({
    defaults: {
      annualIncome: 85000,
      carPayment: 350,
      studentLoanPayment: 200,
      creditCardPayment: 100,
      otherDebt: 0,
      downPaymentAmount: 60000,
      interestRate: 6.5,
      loanTerm: 30,
      propertyTaxRate: 1.2,
      homeInsurance: 1800,
      pmiRate: 0.5,
      hoaMonthly: 0,
      maxDTI: 36,
    },
  });

  const results = useMemo(() => {
    const monthlyIncome = state.annualIncome / 12;
    const totalMonthlyDebts = state.carPayment + state.studentLoanPayment + state.creditCardPayment + state.otherDebt;
    const maxTotalMonthlyPayment = monthlyIncome * (state.maxDTI / 100);
    const maxHousingPayment = maxTotalMonthlyPayment - totalMonthlyDebts;

    if (maxHousingPayment <= 0) {
      return {
        maxHomePrice: 0,
        maxMonthlyPayment: 0,
        principalAndInterest: 0,
        monthlyTax: 0,
        monthlyInsurance: 0,
        monthlyPMI: 0,
        monthlyHOA: state.hoaMonthly,
        downPaymentNeeded: 0,
        loanAmount: 0,
      };
    }

    const monthlyRate = state.interestRate / 100 / 12;
    const numPayments = state.loanTerm * 12;
    const factor = Math.pow(1 + monthlyRate, numPayments);
    const amortizationFactor = monthlyRate > 0 ? (monthlyRate * factor) / (factor - 1) : 1 / numPayments;

    const monthlyInsurance = state.homeInsurance / 12;
    const availableForVariables = maxHousingPayment - monthlyInsurance - state.hoaMonthly;

    if (availableForVariables <= 0) {
      return {
        maxHomePrice: 0,
        maxMonthlyPayment: 0,
        principalAndInterest: 0,
        monthlyTax: 0,
        monthlyInsurance,
        monthlyPMI: 0,
        monthlyHOA: state.hoaMonthly,
        downPaymentNeeded: 0,
        loanAmount: 0,
      };
    }

    const monthlyTaxFactor = state.propertyTaxRate / 100 / 12;
    const monthlyPMIFactor = state.pmiRate / 100 / 12;

    const coeffH_withPMI = amortizationFactor + monthlyTaxFactor + monthlyPMIFactor;
    const coeffD_withPMI = amortizationFactor + monthlyPMIFactor;
    const maxHomePriceWithPMI = (availableForVariables + state.downPaymentAmount * coeffD_withPMI) / coeffH_withPMI;

    const coeffH_noPMI = amortizationFactor + monthlyTaxFactor;
    const coeffD_noPMI = amortizationFactor;
    const maxHomePriceNoPMI = (availableForVariables + state.downPaymentAmount * coeffD_noPMI) / coeffH_noPMI;

    let maxHomePrice: number;
    let hasPMI: boolean;

    if (state.downPaymentAmount >= maxHomePriceNoPMI * 0.2) {
      maxHomePrice = maxHomePriceNoPMI;
      hasPMI = false;
    } else if (state.downPaymentAmount >= maxHomePriceWithPMI * 0.2) {
      maxHomePrice = state.downPaymentAmount / 0.2;
      hasPMI = false;
    } else {
      maxHomePrice = maxHomePriceWithPMI;
      hasPMI = true;
    }

    maxHomePrice = Math.max(maxHomePrice, 0);
    const loanAmount = Math.max(maxHomePrice - state.downPaymentAmount, 0);
    const principalAndInterest = loanAmount * amortizationFactor;
    const monthlyTax = maxHomePrice * monthlyTaxFactor;
    const monthlyPMI = hasPMI ? loanAmount * monthlyPMIFactor : 0;
    const totalMonthlyPayment = principalAndInterest + monthlyTax + monthlyInsurance + monthlyPMI + state.hoaMonthly;

    return {
      maxHomePrice: Math.round(maxHomePrice),
      maxMonthlyPayment: totalMonthlyPayment,
      principalAndInterest,
      monthlyTax,
      monthlyInsurance,
      monthlyPMI,
      monthlyHOA: state.hoaMonthly,
      downPaymentNeeded: state.downPaymentAmount,
      loanAmount: Math.round(loanAmount),
    };
  }, [
    state.annualIncome, state.carPayment, state.studentLoanPayment, state.creditCardPayment, state.otherDebt,
    state.downPaymentAmount, state.interestRate, state.loanTerm, state.propertyTaxRate, state.homeInsurance,
    state.pmiRate, state.hoaMonthly, state.maxDTI,
  ]);

  const pieData = [
    { name: "Principal & Interest", value: Math.round(results.principalAndInterest) },
    { name: "Property Tax", value: Math.round(results.monthlyTax) },
    { name: "Insurance", value: Math.round(results.monthlyInsurance) },
    ...(results.monthlyPMI > 0 ? [{ name: "PMI", value: Math.round(results.monthlyPMI) }] : []),
    ...(results.monthlyHOA > 0 ? [{ name: "HOA", value: Math.round(results.monthlyHOA) }] : []),
  ].filter((d) => d.value > 0);

  const incomeScenarios = useMemo(() => {
    const scenarios = [0.75, 1.0, 1.25, 1.5].map((mult) => {
      const income = Math.round(state.annualIncome * mult);
      const monthlyIncome = income / 12;
      const totalDebts = state.carPayment + state.studentLoanPayment + state.creditCardPayment + state.otherDebt;
      const maxPayment = monthlyIncome * (state.maxDTI / 100) - totalDebts;

      const monthlyRate = state.interestRate / 100 / 12;
      const numPayments = state.loanTerm * 12;
      const factor = Math.pow(1 + monthlyRate, numPayments);
      const amortFactor = monthlyRate > 0 ? (monthlyRate * factor) / (factor - 1) : 1 / numPayments;

      const monthlyTaxFactor = state.propertyTaxRate / 100 / 12;
      const monthlyIns = state.homeInsurance / 12;
      const available = maxPayment - monthlyIns - state.hoaMonthly;
      const coeffH = amortFactor + monthlyTaxFactor;
      const coeffD = amortFactor;
      const price = available > 0 ? Math.round((available + state.downPaymentAmount * coeffD) / coeffH) : 0;

      return {
        income: `$${(income / 1000).toFixed(0)}k`,
        maxPrice: Math.max(price, 0),
      };
    });
    return scenarios;
  }, [state.annualIncome, state.carPayment, state.studentLoanPayment, state.creditCardPayment, state.otherDebt, state.downPaymentAmount, state.interestRate, state.loanTerm, state.propertyTaxRate, state.homeInsurance, state.hoaMonthly, state.maxDTI]);

  const shareResults = {
    "Max Home Price": formatCurrency(results.maxHomePrice),
    "Max Monthly Payment": formatCurrencyExact(results.maxMonthlyPayment),
    "Principal & Interest": formatCurrencyExact(results.principalAndInterest),
    "Property Tax": formatCurrencyExact(results.monthlyTax),
    "Insurance": formatCurrencyExact(results.monthlyInsurance),
    "PMI": formatCurrencyExact(results.monthlyPMI),
  };

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#162032] p-6 md:p-8">
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Annual Gross Income */}
          <CurrencyInput
            label="Annual Gross Income"
            value={state.annualIncome}
            onChange={(v) => setState('annualIncome', v)}
            min={0}
            step={1000}
          />
          <CustomSlider
            value={state.annualIncome}
            onChange={(v) => setState('annualIncome', v)}
            min={20000}
            max={500000}
            step={5000}
            formatValue={(v) => `$${(v / 1000).toFixed(0)}k`}
          />

          {/* Monthly Debts */}
          <div>
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">Monthly Debts</p>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <CurrencyInput
                label="Car Payment"
                value={state.carPayment}
                onChange={(v) => setState('carPayment', v)}
                min={0}
                step={25}
              />
              <CurrencyInput
                label="Student Loan"
                value={state.studentLoanPayment}
                onChange={(v) => setState('studentLoanPayment', v)}
                min={0}
                step={25}
              />
              <CurrencyInput
                label="Credit Card"
                value={state.creditCardPayment}
                onChange={(v) => setState('creditCardPayment', v)}
                min={0}
                step={25}
              />
              <CurrencyInput
                label="Other Debts"
                value={state.otherDebt}
                onChange={(v) => setState('otherDebt', v)}
                min={0}
                step={25}
              />
            </div>
          </div>

          {/* Down Payment */}
          <CurrencyInput
            label="Down Payment Amount"
            value={state.downPaymentAmount}
            onChange={(v) => setState('downPaymentAmount', v)}
            min={0}
            step={1000}
          />
          <CustomSlider
            value={state.downPaymentAmount}
            onChange={(v) => setState('downPaymentAmount', v)}
            min={0}
            max={200000}
            step={5000}
            formatValue={(v) => `$${(v / 1000).toFixed(0)}k`}
          />

          {/* Interest Rate & Loan Term */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <PercentageInput
              label="Interest Rate"
              value={state.interestRate}
              onChange={(v) => setState('interestRate', v)}
              min={0}
              max={15}
              step={0.125}
            />
            <div>
              <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
                Loan Term (years)
              </label>
              <select
                value={state.loanTerm}
                onChange={(e) => setState('loanTerm', Number(e.target.value))}
                className="h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] p-3 text-[#F1F5F9] focus:border-[#3B82F6] focus:outline-none"
              >
                <option value={15}>15 years</option>
                <option value={20}>20 years</option>
                <option value={30}>30 years</option>
              </select>
            </div>
          </div>

          {/* Property Tax, Insurance, PMI, HOA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <PercentageInput
              label="Property Tax Rate"
              value={state.propertyTaxRate}
              onChange={(v) => setState('propertyTaxRate', v)}
              min={0}
              max={5}
              step={0.1}
            />
            <CurrencyInput
              label="Insurance ($/year)"
              value={state.homeInsurance}
              onChange={(v) => setState('homeInsurance', v)}
              min={0}
              step={100}
            />
            <PercentageInput
              label="PMI Rate"
              value={state.pmiRate}
              onChange={(v) => setState('pmiRate', v)}
              min={0}
              max={3}
              step={0.1}
            />
            <CurrencyInput
              label="HOA ($/month)"
              value={state.hoaMonthly}
              onChange={(v) => setState('hoaMonthly', v)}
              min={0}
              step={25}
            />
          </div>

          {/* Max DTI */}
          <PercentageInput
            label="Max Debt-to-Income Ratio"
            value={state.maxDTI}
            onChange={(v) => setState('maxDTI', v)}
            min={20}
            max={50}
            step={1}
          />
          <CustomSlider
            value={state.maxDTI}
            onChange={(v) => setState('maxDTI', v)}
            min={20}
            max={50}
            step={1}
            formatValue={(v) => `${v}%`}
          />
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Primary Result: Max Home Price */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-5 text-center">
            <p className="mb-2 text-sm text-[#94A3B8]">Maximum Home Price</p>
            <AnimatedNumber value={results.maxHomePrice} format="currency" />
          </div>

          {/* Secondary: Max Monthly Payment */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4 text-center">
            <p className="mb-1 text-sm text-[#94A3B8]">Max Monthly Payment</p>
            <AnimatedNumber
              value={results.maxMonthlyPayment}
              format="currency"
              decimals={2}
              className="font-mono text-2xl font-bold text-[#F1F5F9] inline-block transition-transform duration-150"
            />
          </div>

          {/* StatCard Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <StatCard
              label="Max Home Price"
              value={<AnimatedNumber value={results.maxHomePrice} format="currency" className="font-mono text-2xl font-bold text-[#22C55E] inline-block" />}
              highlight
            />
            <StatCard
              label="Max Monthly Payment"
              value={<AnimatedNumber value={results.maxMonthlyPayment} format="currency" decimals={2} className="font-mono text-lg font-bold text-[#F1F5F9] inline-block" />}
            />
            <StatCard
              label="P&I"
              value={<AnimatedNumber value={results.principalAndInterest} format="currency" decimals={2} className="font-mono text-lg font-bold text-[#F1F5F9] inline-block" />}
            />
            <StatCard
              label="Property Tax"
              value={<AnimatedNumber value={results.monthlyTax} format="currency" decimals={2} className="font-mono text-lg font-bold text-[#F1F5F9] inline-block" />}
            />
            <StatCard
              label="Insurance"
              value={<AnimatedNumber value={results.monthlyInsurance} format="currency" decimals={2} className="font-mono text-lg font-bold text-[#F1F5F9] inline-block" />}
            />
            <StatCard
              label="PMI"
              value={<AnimatedNumber value={results.monthlyPMI} format="currency" decimals={2} className="font-mono text-lg font-bold text-[#F1F5F9] inline-block" />}
            />
          </div>

          {/* Share Results */}
          <ShareResults title="Home Affordability Calculator Results" results={shareResults} getShareUrl={getShareUrl} />

          {/* Monthly Payment Breakdown */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">Monthly Payment Breakdown</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Principal & Interest</span>
                <span className="font-mono text-[#3B82F6]">{formatCurrencyExact(results.principalAndInterest)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Property Tax</span>
                <span className="font-mono text-[#F59E0B]">{formatCurrencyExact(results.monthlyTax)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Insurance</span>
                <span className="font-mono text-[#EF4444]">{formatCurrencyExact(results.monthlyInsurance)}</span>
              </div>
              {results.monthlyPMI > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#94A3B8]">PMI</span>
                  <span className="font-mono text-[#A855F7]">{formatCurrencyExact(results.monthlyPMI)}</span>
                </div>
              )}
              {results.monthlyHOA > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#94A3B8]">HOA</span>
                  <span className="font-mono text-[#EC4899]">{formatCurrencyExact(results.monthlyHOA)}</span>
                </div>
              )}
              <div className="border-t border-[#1E293B] pt-2 flex justify-between text-sm font-semibold">
                <span className="text-[#F1F5F9]">Total</span>
                <span className="font-mono text-[#22C55E]">{formatCurrencyExact(results.maxMonthlyPayment)}</span>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          {results.maxHomePrice > 0 && pieData.length > 0 && (
            <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
              <p className="mb-3 text-sm font-medium text-[#94A3B8]">Payment Breakdown</p>
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
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
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
              <div className="mt-2 flex flex-wrap justify-center gap-4 text-xs">
                {pieData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-sm"
                      style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                    />
                    <span className="text-[#94A3B8]">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Income Scenarios Bar Chart */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">Home Price by Income Level</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={incomeScenarios}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="income" stroke={COLORS.textMuted} tick={{ fontSize: 12 }} />
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
                  formatter={(value) => [formatCurrency(value as number), "Max Home Price"]}
                />
                <Bar dataKey="maxPrice" fill="#22C55E" radius={[4, 4, 0, 0]} name="Max Home Price" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
