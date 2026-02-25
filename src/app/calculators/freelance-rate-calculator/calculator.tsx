"use client";

import { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
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
import { formatCurrency, formatCurrencyExact } from "@/lib/formatters";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const COLORS = {
  takeHome: "#22C55E",
  taxes: "#EF4444",
  expenses: "#F59E0B",
  savings: "#3B82F6",
  margin: "#A855F7",
  bg: "#0B1120",
  surface: "#162032",
  border: "#1E293B",
  textPrimary: "#F1F5F9",
  textMuted: "#94A3B8",
};

const PIE_COLORS = [COLORS.takeHome, COLORS.taxes, COLORS.expenses, COLORS.savings];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function FreelanceRateCalculatorWidget() {
  const [targetIncome, setTargetIncome] = useState(80000);
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState(30);
  const [weeksWorked, setWeeksWorked] = useState(48);
  const [selfEmploymentTaxRate, setSelfEmploymentTaxRate] = useState(15.3);
  const [businessExpensesMonthly, setBusinessExpensesMonthly] = useState(500);
  const [healthInsuranceMonthly, setHealthInsuranceMonthly] = useState(450);
  const [retirementSavingsMonthly, setRetirementSavingsMonthly] = useState(500);
  const [profitMargin, setProfitMargin] = useState(20);
  const [vacationWeeks, setVacationWeeks] = useState(4);

  const results = useMemo(() => {
    const actualWeeksWorked = Math.max(weeksWorked - vacationWeeks, 1);
    const totalBillableHours = billableHoursPerWeek * actualWeeksWorked;

    // Annual costs
    const annualBusinessExpenses = businessExpensesMonthly * 12;
    const annualHealthInsurance = healthInsuranceMonthly * 12;
    const annualRetirementSavings = retirementSavingsMonthly * 12;
    const totalAnnualCosts = annualBusinessExpenses + annualHealthInsurance + annualRetirementSavings;

    // Tax estimate on target income + costs (self-employment tax)
    const grossNeeded = targetIncome + totalAnnualCosts;
    const selfEmploymentTax = grossNeeded * (selfEmploymentTaxRate / 100);
    const totalRequired = grossNeeded + selfEmploymentTax;

    // Minimum hourly rate (no profit margin)
    const minimumHourlyRate = totalBillableHours > 0 ? totalRequired / totalBillableHours : 0;

    // Recommended hourly rate (with profit margin)
    const recommendedHourlyRate = minimumHourlyRate * (1 + profitMargin / 100);

    // Effective annual earnings at recommended rate
    const effectiveAnnualEarnings = recommendedHourlyRate * totalBillableHours;

    // Daily and weekly rates
    const dailyRate = recommendedHourlyRate * (billableHoursPerWeek / 5);
    const weeklyRate = recommendedHourlyRate * billableHoursPerWeek;

    // Project rate suggestions
    const projectRates = [
      { name: "Half-Day (4 hrs)", rate: Math.round(recommendedHourlyRate * 4) },
      { name: "Full Day (8 hrs)", rate: Math.round(recommendedHourlyRate * 8) },
      { name: "1-Week Sprint", rate: Math.round(weeklyRate) },
      { name: "2-Week Sprint", rate: Math.round(weeklyRate * 2) },
      { name: "Monthly Retainer", rate: Math.round(weeklyRate * 4) },
      { name: "3-Month Project", rate: Math.round(weeklyRate * 12) },
    ];

    // Income allocation breakdown
    const actualProfitMarginAmount = effectiveAnnualEarnings - totalRequired;
    const incomeAllocation = [
      { name: "Take-Home Pay", value: Math.round(targetIncome) },
      { name: "Self-Employment Tax", value: Math.round(selfEmploymentTax) },
      { name: "Business Expenses", value: Math.round(totalAnnualCosts) },
      { name: "Profit Margin", value: Math.max(0, Math.round(actualProfitMarginAmount)) },
    ];

    return {
      minimumHourlyRate,
      recommendedHourlyRate,
      effectiveAnnualEarnings,
      totalAnnualCosts,
      selfEmploymentTax,
      dailyRate,
      weeklyRate,
      totalBillableHours,
      projectRates,
      incomeAllocation,
      totalRequired,
    };
  }, [
    targetIncome, billableHoursPerWeek, weeksWorked,
    selfEmploymentTaxRate, businessExpensesMonthly,
    healthInsuranceMonthly, retirementSavingsMonthly,
    profitMargin, vacationWeeks,
  ]);

  const shareResultsData: Record<string, string> = {
    "Recommended Rate": formatCurrencyExact(results.recommendedHourlyRate) + "/hr",
    "Minimum Rate": formatCurrencyExact(results.minimumHourlyRate) + "/hr",
    "Daily Rate": formatCurrency(results.dailyRate),
    "Annual Earnings": formatCurrency(results.effectiveAnnualEarnings),
    "Tax Burden": formatCurrency(results.selfEmploymentTax),
    "Business Costs": formatCurrency(results.totalAnnualCosts),
  };

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#162032] p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Target Annual Income */}
          <div>
            <CurrencyInput
              label="Target Annual Income (take-home)"
              value={targetIncome}
              onChange={setTargetIncome}
              min={0}
              step={5000}
            />
            <CustomSlider
              value={targetIncome}
              onChange={setTargetIncome}
              min={20000}
              max={500000}
              step={5000}
              formatValue={(v) =>
                v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
              }
              className="mt-3"
            />
          </div>

          {/* Billable Hours Per Week */}
          <CustomSlider
            label="Billable Hours Per Week"
            value={billableHoursPerWeek}
            onChange={setBillableHoursPerWeek}
            min={5}
            max={60}
            step={1}
            formatValue={(v) => `${v} hrs`}
          />

          {/* Weeks Worked Per Year */}
          <CustomSlider
            label="Weeks Worked Per Year"
            value={weeksWorked}
            onChange={setWeeksWorked}
            min={20}
            max={52}
            step={1}
            formatValue={(v) => `${v} wk${v !== 1 ? "s" : ""}`}
          />

          {/* Vacation Weeks */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Vacation Weeks (unpaid)
            </label>
            <input
              type="number"
              value={vacationWeeks}
              onChange={(e) => setVacationWeeks(Number(e.target.value))}
              className="h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] p-3 text-[#F1F5F9] focus:border-[#3B82F6] focus:outline-none focus:ring-[3px] focus:ring-[#3B82F6]/15"
              min={0}
              max={12}
              step={1}
            />
          </div>

          {/* Self-Employment Tax */}
          <PercentageInput
            label="Self-Employment Tax Rate"
            value={selfEmploymentTaxRate}
            onChange={setSelfEmploymentTaxRate}
            min={0}
            max={30}
            step={0.1}
          />

          {/* Business Expenses */}
          <CurrencyInput
            label="Monthly Business Expenses"
            value={businessExpensesMonthly}
            onChange={setBusinessExpensesMonthly}
            min={0}
            step={50}
          />

          {/* Health Insurance */}
          <CurrencyInput
            label="Monthly Health Insurance"
            value={healthInsuranceMonthly}
            onChange={setHealthInsuranceMonthly}
            min={0}
            step={50}
          />

          {/* Retirement Savings */}
          <CurrencyInput
            label="Monthly Retirement Savings"
            value={retirementSavingsMonthly}
            onChange={setRetirementSavingsMonthly}
            min={0}
            step={50}
          />

          {/* Profit Margin */}
          <PercentageInput
            label="Desired Profit Margin"
            value={profitMargin}
            onChange={setProfitMargin}
            min={0}
            max={100}
            step={5}
          />
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* StatCard Grid */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              label="Recommended Hourly Rate"
              highlight
              value={
                <AnimatedNumber
                  value={results.recommendedHourlyRate}
                  format="currency"
                  decimals={2}
                  className="font-mono text-2xl font-bold text-[#22C55E] inline-block"
                />
              }
              subvalue={`Minimum: ${formatCurrencyExact(results.minimumHourlyRate)}/hr (no margin)`}
              className="col-span-2"
            />
            <StatCard
              label="Minimum Rate"
              value={
                <AnimatedNumber
                  value={results.minimumHourlyRate}
                  format="currency"
                  decimals={2}
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
              subvalue="/hr (no profit margin)"
            />
            <StatCard
              label="Daily Rate"
              value={
                <AnimatedNumber
                  value={results.dailyRate}
                  format="currency"
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
            />
            <StatCard
              label="Annual Earnings"
              value={
                <AnimatedNumber
                  value={results.effectiveAnnualEarnings}
                  format="currency"
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
            />
            <StatCard
              label="Tax Burden"
              value={
                <AnimatedNumber
                  value={results.selfEmploymentTax}
                  format="currency"
                  className="font-mono text-lg font-bold text-[#EF4444] inline-block"
                />
              }
            />
            <StatCard
              label="Business Costs"
              value={
                <AnimatedNumber
                  value={results.totalAnnualCosts}
                  format="currency"
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
              className="col-span-2"
            />
          </div>

          {/* Share Results */}
          <ShareResults
            title="Freelance Rate Calculation Results"
            results={shareResultsData}
          />

          {/* Pie Chart: Income Allocation */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">Income Allocation</p>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={results.incomeAllocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {results.incomeAllocation.map((_, index) => (
                    <Cell key={`alloc-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
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
                <Legend
                  wrapperStyle={{ color: COLORS.textMuted, fontSize: 11 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart: Project Rate Suggestions */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">Project Rate Suggestions</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={results.projectRates} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis
                  type="number"
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 11 }}
                  width={120}
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
                <Bar dataKey="rate" name="Suggested Rate" fill={COLORS.takeHome} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
