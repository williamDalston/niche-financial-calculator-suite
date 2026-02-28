"use client";

import { useMemo } from "react";
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
import { useCalculatorState } from "@/hooks/use-calculator-state";

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
  const [state, setState, getShareUrl] = useCalculatorState({
    defaults: {
      currentAge: 30,
      retirementAge: 65,
      currentBalance: 25000,
      annualSalary: 75000,
      contributionPct: 10,
      employerMatchPct: 50,
      employerMatchCap: 6,
      annualReturn: 7,
      salaryGrowth: 3,
    },
  });

  const results = useMemo(() => {
    const yearsToRetirement = Math.max(state.retirementAge - state.currentAge, 0);
    const monthlyReturn = state.annualReturn / 100 / 12;

    let balance = state.currentBalance;
    let totalEmployeeContribs = 0;
    let totalEmployerContribs = 0;
    let salary = state.annualSalary;

    const chartData: {
      age: number;
      employeeContributions: number;
      employerContributions: number;
      investmentGrowth: number;
      totalBalance: number;
    }[] = [];

    // Add starting point
    chartData.push({
      age: state.currentAge,
      employeeContributions: 0,
      employerContributions: 0,
      investmentGrowth: state.currentBalance,
      totalBalance: state.currentBalance,
    });

    for (let year = 1; year <= yearsToRetirement; year++) {
      const yearlyEmployeeContrib = salary * (state.contributionPct / 100);

      // Employer match: match percentage of employee contribution up to cap% of salary
      const maxMatchableContrib = salary * (state.employerMatchCap / 100);
      const matchableContrib = Math.min(yearlyEmployeeContrib, maxMatchableContrib);
      const yearlyEmployerContrib = matchableContrib * (state.employerMatchPct / 100);

      // Monthly compounding
      const monthlyEmployeeContrib = yearlyEmployeeContrib / 12;
      const monthlyEmployerContrib = yearlyEmployerContrib / 12;

      for (let month = 0; month < 12; month++) {
        balance = balance * (1 + monthlyReturn) + monthlyEmployeeContrib + monthlyEmployerContrib;
      }

      totalEmployeeContribs += yearlyEmployeeContrib;
      totalEmployerContribs += yearlyEmployerContrib;

      const totalContribs = totalEmployeeContribs + totalEmployerContribs + state.currentBalance;
      const investmentGrowth = Math.max(balance - totalContribs, 0);

      chartData.push({
        age: state.currentAge + year,
        employeeContributions: Math.round(totalEmployeeContribs),
        employerContributions: Math.round(totalEmployerContribs),
        investmentGrowth: Math.round(investmentGrowth + state.currentBalance),
        totalBalance: Math.round(balance),
      });

      // Salary growth for next year
      salary = salary * (1 + state.salaryGrowth / 100);
    }

    const totalInvestmentGrowth = balance - totalEmployeeContribs - totalEmployerContribs - state.currentBalance;
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
    state.currentAge,
    state.retirementAge,
    state.currentBalance,
    state.annualSalary,
    state.contributionPct,
    state.employerMatchPct,
    state.employerMatchCap,
    state.annualReturn,
    state.salaryGrowth,
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
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Ages */}
          <div className="space-y-4">
            <CustomSlider
              label={`Current Age: ${state.currentAge}`}
              value={state.currentAge}
              onChange={(v) => {
                setState('currentAge', v);
                if (v >= state.retirementAge) setState('retirementAge', v + 1);
              }}
              min={18}
              max={80}
              step={1}
              formatValue={(v) => `${v}`}
              showMinMax
            />
            <CustomSlider
              label={`Retirement Age: ${state.retirementAge}`}
              value={state.retirementAge}
              onChange={(v) => setState('retirementAge', Math.max(v, state.currentAge + 1))}
              min={state.currentAge + 1}
              max={80}
              step={1}
              formatValue={(v) => `${v}`}
              showMinMax
            />
          </div>

          {/* Current Balance */}
          <CurrencyInput
            label="Current 401(k) Balance"
            value={state.currentBalance}
            onChange={(v) => setState('currentBalance', v)}
            min={0}
            step={1000}
          />

          {/* Annual Salary */}
          <div>
            <CurrencyInput
              label="Annual Salary"
              value={state.annualSalary}
              onChange={(v) => setState('annualSalary', v)}
              min={0}
              max={500000}
              step={1000}
            />
            <CustomSlider
              value={state.annualSalary}
              onChange={(v) => setState('annualSalary', v)}
              min={20000}
              max={500000}
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
                label={`Your Contribution (${formatCurrency(state.annualSalary * state.contributionPct / 100)}/yr)`}
                value={state.contributionPct}
                onChange={(v) => setState('contributionPct', v)}
                min={0}
                max={30}
                step={1}
                className="flex-1"
              />
            </div>
            <CustomSlider
              value={state.contributionPct}
              onChange={(v) => setState('contributionPct', v)}
              min={0}
              max={30}
              step={1}
              formatValue={(v) => `${v}%`}
              showMinMax
              className="mt-2"
            />
          </div>

          {/* Employer Match */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <PercentageInput
                label="Employer Match (%)"
                value={state.employerMatchPct}
                onChange={(v) => setState('employerMatchPct', v)}
                min={0}
                max={100}
                step={5}
              />
              <CustomSlider
                value={state.employerMatchPct}
                onChange={(v) => setState('employerMatchPct', v)}
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
                value={state.employerMatchCap}
                onChange={(v) => setState('employerMatchCap', v)}
                min={0}
                max={100}
                step={1}
              />
              <CustomSlider
                value={state.employerMatchCap}
                onChange={(v) => setState('employerMatchCap', v)}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <PercentageInput
                label="Annual Return (%)"
                value={state.annualReturn}
                onChange={(v) => setState('annualReturn', v)}
                min={0}
                max={15}
                step={0.5}
              />
              <CustomSlider
                value={state.annualReturn}
                onChange={(v) => setState('annualReturn', v)}
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
                value={state.salaryGrowth}
                onChange={(v) => setState('salaryGrowth', v)}
                min={0}
                max={10}
                step={0.5}
              />
              <CustomSlider
                value={state.salaryGrowth}
                onChange={(v) => setState('salaryGrowth', v)}
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
            <p className="mb-2 text-sm text-[#94A3B8]">Estimated Balance at Retirement (Age {state.retirementAge})</p>
            <AnimatedNumber
              value={results.balanceAtRetirement}
              format="currency"
              className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-[#22C55E] inline-block transition-transform duration-150"
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
            getShareUrl={getShareUrl}
          />

          {/* StatCard Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
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
