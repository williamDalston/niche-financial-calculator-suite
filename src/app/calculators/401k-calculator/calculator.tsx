"use client";

import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
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

const COLORS = {
  primary: "#22C55E",
  secondary: "#3B82F6",
  tertiary: "#F59E0B",
  bg: "#0B1120",
  surface: "#162032",
  border: "#1E293B",
  textPrimary: "#F1F5F9",
  textMuted: "#94A3B8",
};

export function FourOhOneKCalculatorWidget() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentBalance, setCurrentBalance] = useState(25000);
  const [annualSalary, setAnnualSalary] = useState(75000);
  const [contributionPct, setContributionPct] = useState(10);
  const [employerMatchPct, setEmployerMatchPct] = useState(50);
  const [employerMatchCap, setEmployerMatchCap] = useState(6);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [salaryGrowth, setSalaryGrowth] = useState(3);

  const results = useMemo(() => {
    const yearsToRetirement = Math.max(retirementAge - currentAge, 0);
    const monthlyReturn = annualReturn / 100 / 12;

    let balance = currentBalance;
    let totalEmployeeContribs = 0;
    let totalEmployerContribs = 0;
    let salary = annualSalary;

    const chartData: {
      age: number;
      employeeContributions: number;
      employerContributions: number;
      investmentGrowth: number;
      totalBalance: number;
    }[] = [];

    // Add starting point
    chartData.push({
      age: currentAge,
      employeeContributions: 0,
      employerContributions: 0,
      investmentGrowth: currentBalance,
      totalBalance: currentBalance,
    });

    for (let year = 1; year <= yearsToRetirement; year++) {
      const yearlyEmployeeContrib = salary * (contributionPct / 100);

      // Employer match: match percentage of employee contribution up to cap% of salary
      const maxMatchableContrib = salary * (employerMatchCap / 100);
      const matchableContrib = Math.min(yearlyEmployeeContrib, maxMatchableContrib);
      const yearlyEmployerContrib = matchableContrib * (employerMatchPct / 100);

      // Monthly compounding
      const monthlyEmployeeContrib = yearlyEmployeeContrib / 12;
      const monthlyEmployerContrib = yearlyEmployerContrib / 12;

      for (let month = 0; month < 12; month++) {
        balance = balance * (1 + monthlyReturn) + monthlyEmployeeContrib + monthlyEmployerContrib;
      }

      totalEmployeeContribs += yearlyEmployeeContrib;
      totalEmployerContribs += yearlyEmployerContrib;

      const totalContribs = totalEmployeeContribs + totalEmployerContribs + currentBalance;
      const investmentGrowth = Math.max(balance - totalContribs, 0);

      chartData.push({
        age: currentAge + year,
        employeeContributions: Math.round(totalEmployeeContribs),
        employerContributions: Math.round(totalEmployerContribs),
        investmentGrowth: Math.round(investmentGrowth + currentBalance),
        totalBalance: Math.round(balance),
      });

      // Salary growth for next year
      salary = salary * (1 + salaryGrowth / 100);
    }

    const totalInvestmentGrowth = balance - totalEmployeeContribs - totalEmployerContribs - currentBalance;
    const monthlyRetirementIncome = balance * 0.04 / 12;

    return {
      balanceAtRetirement: balance,
      totalEmployeeContribs,
      totalEmployerContribs,
      totalInvestmentGrowth,
      monthlyRetirementIncome,
      chartData,
      yearsToRetirement,
    };
  }, [
    currentAge,
    retirementAge,
    currentBalance,
    annualSalary,
    contributionPct,
    employerMatchPct,
    employerMatchCap,
    annualReturn,
    salaryGrowth,
  ]);

  const shareResults = {
    "Balance at Retirement": formatCurrency(results.balanceAtRetirement),
    "Monthly Income (4% Rule)": formatCurrencyExact(results.monthlyRetirementIncome),
    "Employee Contributions": formatCurrency(results.totalEmployeeContribs),
    "Employer Match": formatCurrency(results.totalEmployerContribs),
    "Investment Growth": formatCurrency(results.totalInvestmentGrowth),
  };

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#162032] p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Ages */}
          <div className="space-y-4">
            <CustomSlider
              label={`Current Age: ${currentAge}`}
              value={currentAge}
              onChange={(v) => {
                setCurrentAge(v);
                if (v >= retirementAge) setRetirementAge(v + 1);
              }}
              min={18}
              max={80}
              step={1}
              formatValue={(v) => `${v}`}
              showMinMax
            />
            <CustomSlider
              label={`Retirement Age: ${retirementAge}`}
              value={retirementAge}
              onChange={(v) => setRetirementAge(Math.max(v, currentAge + 1))}
              min={currentAge + 1}
              max={80}
              step={1}
              formatValue={(v) => `${v}`}
              showMinMax
            />
          </div>

          {/* Current Balance */}
          <CurrencyInput
            label="Current 401(k) Balance"
            value={currentBalance}
            onChange={setCurrentBalance}
            min={0}
            step={1000}
          />

          {/* Annual Salary */}
          <div>
            <CurrencyInput
              label="Annual Salary"
              value={annualSalary}
              onChange={setAnnualSalary}
              min={0}
              max={500000}
              step={1000}
            />
            <CustomSlider
              value={annualSalary}
              onChange={setAnnualSalary}
              min={20000}
              max={300000}
              step={1000}
              formatValue={(v) => `$${(v / 1000).toFixed(0)}k`}
              showMinMax
              className="mt-2"
            />
          </div>

          {/* Contribution % */}
          <div>
            <div className="flex items-end gap-4">
              <PercentageInput
                label={`Your Contribution (${formatCurrency(annualSalary * contributionPct / 100)}/yr)`}
                value={contributionPct}
                onChange={setContributionPct}
                min={0}
                max={30}
                step={1}
                className="flex-1"
              />
            </div>
            <CustomSlider
              value={contributionPct}
              onChange={setContributionPct}
              min={0}
              max={30}
              step={1}
              formatValue={(v) => `${v}%`}
              showMinMax
              className="mt-2"
            />
          </div>

          {/* Employer Match */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <PercentageInput
                label="Employer Match (%)"
                value={employerMatchPct}
                onChange={setEmployerMatchPct}
                min={0}
                max={100}
                step={5}
              />
              <CustomSlider
                value={employerMatchPct}
                onChange={setEmployerMatchPct}
                min={0}
                max={100}
                step={5}
                formatValue={(v) => `${v}%`}
                showMinMax
                className="mt-2"
              />
            </div>
            <div>
              <PercentageInput
                label="Match Cap (% of salary)"
                value={employerMatchCap}
                onChange={setEmployerMatchCap}
                min={0}
                max={100}
                step={1}
              />
              <CustomSlider
                value={employerMatchCap}
                onChange={setEmployerMatchCap}
                min={0}
                max={100}
                step={1}
                formatValue={(v) => `${v}%`}
                showMinMax
                className="mt-2"
              />
            </div>
          </div>

          {/* Return & Salary Growth */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <PercentageInput
                label="Annual Return (%)"
                value={annualReturn}
                onChange={setAnnualReturn}
                min={0}
                max={15}
                step={0.5}
              />
              <CustomSlider
                value={annualReturn}
                onChange={setAnnualReturn}
                min={0}
                max={15}
                step={0.5}
                formatValue={(v) => `${v}%`}
                showMinMax
                className="mt-2"
              />
            </div>
            <div>
              <PercentageInput
                label="Salary Growth (%)"
                value={salaryGrowth}
                onChange={setSalaryGrowth}
                min={0}
                max={10}
                step={0.5}
              />
              <CustomSlider
                value={salaryGrowth}
                onChange={setSalaryGrowth}
                min={0}
                max={10}
                step={0.5}
                formatValue={(v) => `${v}%`}
                showMinMax
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Primary Result: Balance at Retirement */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-5 text-center">
            <p className="mb-2 text-sm text-[#94A3B8]">Estimated Balance at Retirement (Age {retirementAge})</p>
            <AnimatedNumber
              value={results.balanceAtRetirement}
              format="currency"
              className="font-mono text-4xl font-bold text-[#22C55E] inline-block transition-transform duration-150"
            />
          </div>

          {/* Secondary AnimatedNumber metrics */}
          <div className="flex flex-wrap items-center justify-center gap-6 rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <div className="text-center">
              <p className="text-xs text-[#94A3B8] mb-1">Monthly Income (4% Rule)</p>
              <AnimatedNumber
                value={results.monthlyRetirementIncome}
                format="currency"
                decimals={2}
                className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
              />
            </div>
            <div className="text-center">
              <p className="text-xs text-[#94A3B8] mb-1">Total Contributions</p>
              <AnimatedNumber
                value={results.totalEmployeeContribs + results.totalEmployerContribs}
                format="currency"
                className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
              />
            </div>
            <div className="text-center">
              <p className="text-xs text-[#94A3B8] mb-1">Employer Match</p>
              <AnimatedNumber
                value={results.totalEmployerContribs}
                format="currency"
                className="font-mono text-lg font-bold text-[#F59E0B] inline-block"
              />
            </div>
          </div>

          {/* Share Results */}
          <ShareResults
            title="401(k) Calculator Results"
            results={shareResults}
          />

          {/* StatCard Grid */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="Balance at Retirement"
              value={formatCurrency(results.balanceAtRetirement)}
              highlight
              className="col-span-2"
              subvalue={`In ${results.yearsToRetirement} years`}
            />
            <StatCard
              label="Monthly Income (4% Rule)"
              value={formatCurrencyExact(results.monthlyRetirementIncome)}
              subvalue={`${formatCurrency(results.monthlyRetirementIncome * 12)}/yr`}
            />
            <StatCard
              label="Employee Contributions"
              value={formatCurrency(results.totalEmployeeContribs)}
            />
            <StatCard
              label="Employer Match"
              value={formatCurrency(results.totalEmployerContribs)}
            />
            <StatCard
              label="Investment Growth"
              value={formatCurrency(results.totalInvestmentGrowth)}
              subvalue={`${results.balanceAtRetirement > 0 ? Math.round((results.totalInvestmentGrowth / results.balanceAtRetirement) * 100) : 0}% of total`}
            />
          </div>

          {/* Stacked Area Chart */}
          {results.chartData.length > 1 && (
            <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
              <p className="mb-3 text-sm font-medium text-[#94A3B8]">401(k) Growth Over Time</p>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={results.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis
                    dataKey="age"
                    stroke={COLORS.textMuted}
                    tick={{ fontSize: 12 }}
                    label={{ value: "Age", position: "insideBottom", offset: -5, fill: COLORS.textMuted }}
                  />
                  <YAxis
                    stroke={COLORS.textMuted}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(v) => {
                      if (v >= 1000000) return `$${(v / 1000000).toFixed(1)}M`;
                      return `$${(v / 1000).toFixed(0)}k`;
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: COLORS.surface,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "8px",
                      color: COLORS.textPrimary,
                    }}
                    formatter={(value) => formatCurrency(value as number)}
                    labelFormatter={(label) => `Age ${label}`}
                  />
                  <Legend wrapperStyle={{ color: COLORS.textMuted, fontSize: 12 }} />
                  <Area
                    type="monotone"
                    dataKey="employeeContributions"
                    stackId="1"
                    stroke={COLORS.secondary}
                    fill={COLORS.secondary}
                    fillOpacity={0.6}
                    name="Your Contributions"
                  />
                  <Area
                    type="monotone"
                    dataKey="employerContributions"
                    stackId="1"
                    stroke={COLORS.tertiary}
                    fill={COLORS.tertiary}
                    fillOpacity={0.6}
                    name="Employer Match"
                  />
                  <Area
                    type="monotone"
                    dataKey="investmentGrowth"
                    stackId="1"
                    stroke={COLORS.primary}
                    fill={COLORS.primary}
                    fillOpacity={0.6}
                    name="Investment Growth"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
