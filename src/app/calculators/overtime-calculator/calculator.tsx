"use client";

import { useMemo } from "react";
import { useCalculatorState } from "@/hooks/use-calculator-state";
import {
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";
import {
  AnimatedNumber,
  CurrencyInput,
  CustomSlider,
  ShareResults,
  StatCard,
} from "@/components/ui";
import { formatCurrency, formatCurrencyExact } from "@/lib/formatters";
import { useChartColors } from "@/hooks/use-chart-colors";

type InputMode = "hourly" | "salary";
type PayPeriod = "weekly" | "biweekly";

export function OvertimeCalculatorWidget() {
  const COLORS = {
    ...useChartColors(),
    primary: "#22C55E",
    secondary: "#3B82F6",
    tertiary: "#F59E0B",
  };
  const [state, setState, getShareUrl] = useCalculatorState({
    defaults: {
      inputMode: "hourly" as string,
      hourlyRate: 25,
      annualSalary: 52000,
      hoursWorked: 50,
      otMultiplier: 1.5,
      payPeriod: "weekly" as string,
    }, slug: "overtime-calculator",
  });

  const results = useMemo(() => {
    const effectiveHourlyRate =
      state.inputMode === "hourly" ? state.hourlyRate : state.annualSalary / 2080;

    const standardHours = 40;
    const overtimeHours = Math.max(state.hoursWorked - standardHours, 0);
    const regularHours = Math.min(state.hoursWorked, standardHours);

    const regularPay = regularHours * effectiveHourlyRate;
    const overtimePay = overtimeHours * effectiveHourlyRate * state.otMultiplier;
    const totalGrossPay = regularPay + overtimePay;

    const effectiveRate = state.hoursWorked > 0 ? totalGrossPay / state.hoursWorked : 0;

    const periodMultiplier = state.payPeriod === "biweekly" ? 2 : 1;
    const periodRegularPay = regularPay * periodMultiplier;
    const periodOvertimePay = overtimePay * periodMultiplier;
    const periodTotalPay = totalGrossPay * periodMultiplier;

    return {
      effectiveHourlyRate,
      regularHours,
      overtimeHours,
      regularPay,
      overtimePay,
      totalGrossPay,
      effectiveRate,
      periodRegularPay,
      periodOvertimePay,
      periodTotalPay,
      periodMultiplier,
    };
  }, [state.inputMode, state.hourlyRate, state.annualSalary, state.hoursWorked, state.otMultiplier, state.payPeriod]);

  const payBreakdownData = [
    {
      name: state.payPeriod === "weekly" ? "Weekly Pay" : "Biweekly Pay",
      "Regular Pay": Math.round(results.periodRegularPay),
      "Overtime Pay": Math.round(results.periodOvertimePay),
    },
  ];

  const rateComparisonData = [
    {
      name: "Regular Rate",
      rate: results.effectiveHourlyRate,
    },
    {
      name: "OT Rate",
      rate: results.effectiveHourlyRate * state.otMultiplier,
    },
    {
      name: "Effective Rate",
      rate: results.effectiveRate,
    },
  ];

  const RATE_COLORS = [COLORS.secondary, COLORS.tertiary, COLORS.primary];

  const shareResults = {
    "Total Gross Pay": formatCurrencyExact(results.periodTotalPay),
    "Regular Pay": formatCurrencyExact(results.periodRegularPay),
    "Overtime Pay": formatCurrencyExact(results.periodOvertimePay),
    "OT Hours": String(results.overtimeHours),
    "Effective Hourly Rate": formatCurrencyExact(results.effectiveRate),
  };

  return (
    <div className="rounded-xl border border-border bg-bg-surface p-6 md:p-8">
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Input Mode */}
          <div>
            <label className="mb-2 block text-sm font-medium text-text-muted">
              Enter Pay As
            </label>
            <div className="flex gap-2">
              {(["hourly", "salary"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setState('inputMode', mode)}
                  className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                    state.inputMode === mode
                      ? "border-accent-primary bg-accent-primary/10 text-accent-primary"
                      : "border-border bg-bg-primary text-text-muted hover:border-accent-secondary/50 hover:text-text-primary"
                  }`}
                >
                  {mode === "hourly" ? "Hourly Rate" : "Annual Salary"}
                </button>
              ))}
            </div>
          </div>

          {/* Hourly Rate or Salary */}
          {state.inputMode === "hourly" ? (
            <div>
              <CurrencyInput
                label="Regular Hourly Rate"
                value={state.hourlyRate}
                onChange={(v) => setState('hourlyRate', v)}
                min={0}
                max={500}
                step={0.5}
              />
              <CustomSlider
                value={state.hourlyRate}
                onChange={(v) => setState('hourlyRate', v)}
                min={7.25}
                max={100}
                step={0.25}
                formatValue={(v) => `$${v.toFixed(2)}`}
                showMinMax
                className="mt-2"
              />
            </div>
          ) : (
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
                min={15000}
                max={200000}
                step={1000}
                formatValue={(v) => `$${(v / 1000).toFixed(0)}k`}
                showMinMax
                className="mt-2"
              />
              <p className="mt-1 text-xs text-text-muted">
                Hourly equivalent: {formatCurrencyExact(state.annualSalary / 2080)}/hr (based on 2,080 hours/year)
              </p>
            </div>
          )}

          {/* Hours Worked */}
          <CustomSlider
            label={`Hours Worked This Week: ${state.hoursWorked}`}
            value={state.hoursWorked}
            onChange={(v) => setState('hoursWorked', v)}
            min={0}
            max={80}
            step={0.5}
            formatValue={(v) => `${v} hrs`}
            showMinMax
          />

          {/* OT Multiplier */}
          <div>
            <label className="mb-2 block text-sm font-medium text-text-muted">
              Overtime Rate Multiplier
            </label>
            <div className="flex gap-2">
              {[1.5, 2.0].map((mult) => (
                <button
                  key={mult}
                  onClick={() => setState('otMultiplier', mult)}
                  className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                    state.otMultiplier === mult
                      ? "border-accent-primary bg-accent-primary/10 text-accent-primary"
                      : "border-border bg-bg-primary text-text-muted hover:border-accent-secondary/50 hover:text-text-primary"
                  }`}
                >
                  {mult}x ({formatCurrencyExact(results.effectiveHourlyRate * mult)}/hr)
                </button>
              ))}
            </div>
          </div>

          {/* Pay Period */}
          <div>
            <label className="mb-2 block text-sm font-medium text-text-muted">
              Pay Period
            </label>
            <div className="flex gap-2">
              {(["weekly", "biweekly"] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setState('payPeriod', period)}
                  className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                    state.payPeriod === period
                      ? "border-accent-primary bg-accent-primary/10 text-accent-primary"
                      : "border-border bg-bg-primary text-text-muted hover:border-accent-secondary/50 hover:text-text-primary"
                  }`}
                >
                  {period === "weekly" ? "Weekly" : "Biweekly"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Primary Result: Total Gross Pay */}
          <div className="rounded-lg border border-border bg-bg-primary p-5 text-center">
            <p className="mb-2 text-sm text-text-muted">Total Gross Pay ({state.payPeriod === "weekly" ? "Weekly" : "Biweekly"})</p>
            <AnimatedNumber
              value={results.periodTotalPay}
              format="currency"
              decimals={2}
              className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-accent-primary inline-block transition-transform duration-150"
            />
          </div>

          {/* Secondary AnimatedNumber metrics */}
          <div className="flex flex-wrap items-center justify-center gap-6 rounded-lg border border-border bg-bg-primary p-4">
            <div className="text-center">
              <p className="text-xs text-text-muted mb-1">Overtime Pay</p>
              <AnimatedNumber
                value={results.periodOvertimePay}
                format="currency"
                decimals={2}
                className="font-mono text-lg font-bold text-accent-warning inline-block"
              />
            </div>
            <div className="text-center">
              <p className="text-xs text-text-muted mb-1">Effective Hourly Rate</p>
              <AnimatedNumber
                value={results.effectiveRate}
                format="currency"
                decimals={2}
                className="font-mono text-lg font-bold text-accent-primary inline-block"
              />
            </div>
          </div>

          {/* Share Results */}
          <ShareResults slug="overtime-calculator"
            title="Overtime Calculator Results"
            results={shareResults}
            getShareUrl={getShareUrl}
          />

          {/* StatCard Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <StatCard
              label="Total Gross"
              value={formatCurrencyExact(results.periodTotalPay)}
              highlight
            />
            <StatCard
              label="Regular Pay"
              value={formatCurrencyExact(results.periodRegularPay)}
              subvalue={`${results.regularHours} hrs x ${formatCurrencyExact(results.effectiveHourlyRate)}`}
            />
            <StatCard
              label="OT Hours"
              value={String(results.overtimeHours)}
              subvalue={results.overtimeHours > 0 ? `${state.otMultiplier}x rate` : "No overtime"}
            />
            <StatCard
              label="OT Pay"
              value={formatCurrencyExact(results.periodOvertimePay)}
              subvalue={results.overtimeHours > 0 ? `${results.overtimeHours} hrs x ${formatCurrencyExact(results.effectiveHourlyRate * state.otMultiplier)}` : undefined}
            />
            <StatCard
              label="Effective Hourly Rate"
              value={formatCurrencyExact(results.effectiveRate)}
              className="col-span-2"
              subvalue="Blended rate across all hours worked"
            />
          </div>

          {/* Stacked Bar - Regular vs OT */}
          <div className="rounded-lg border border-border bg-bg-primary p-4">
            <p className="mb-3 text-sm font-medium text-text-muted">Pay Breakdown</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={payBreakdownData}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="name" stroke={COLORS.textMuted} tick={{ fontSize: 12 }} />
                <YAxis
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => `$${v.toLocaleString()}`}
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
                <Bar dataKey="Regular Pay" stackId="pay" fill={COLORS.secondary} />
                <Bar dataKey="Overtime Pay" stackId="pay" fill={COLORS.tertiary} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Rate Comparison */}
          <div className="rounded-lg border border-border bg-bg-primary p-4">
            <p className="mb-3 text-sm font-medium text-text-muted">Rate Comparison</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={rateComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="name" stroke={COLORS.textMuted} tick={{ fontSize: 12 }} />
                <YAxis
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => `$${v.toFixed(0)}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: COLORS.surface,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "8px",
                    color: COLORS.textPrimary,
                  }}
                  formatter={(value) => formatCurrencyExact(value as number)}
                />
                <Bar dataKey="rate" name="Hourly Rate">
                  {rateComparisonData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={RATE_COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
