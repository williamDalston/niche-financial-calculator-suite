"use client";

import { useMemo } from "react";
import { useCalculatorState } from "@/hooks/use-calculator-state";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
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

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const COLORS = {
  primary: "#22C55E",
  secondary: "#3B82F6",
  overtime: "#F59E0B",
  bg: "#0B1120",
  surface: "#162032",
  border: "#1E293B",
  textPrimary: "#F1F5F9",
  textMuted: "#94A3B8",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function HourlyToSalaryCalculatorWidget() {
  const [state, setState, getShareUrl] = useCalculatorState({
    defaults: {
      hourlyRate: 25,
      hoursPerWeek: 40,
      weeksPerYear: 52,
      overtimeHours: 0,
      overtimeMultiplier: 1.5,
    },
  });

  const results = useMemo(() => {
    const regularAnnual = state.hourlyRate * state.hoursPerWeek * state.weeksPerYear;
    const overtimeRate = state.hourlyRate * state.overtimeMultiplier;
    const overtimeAnnual = overtimeRate * state.overtimeHours * state.weeksPerYear;
    const totalAnnual = regularAnnual + overtimeAnnual;

    const regularMonthly = regularAnnual / 12;
    const totalMonthly = totalAnnual / 12;

    const regularBiweekly = state.hourlyRate * state.hoursPerWeek * 2;
    const overtimeBiweekly = overtimeRate * state.overtimeHours * 2;
    const totalBiweekly = regularBiweekly + overtimeBiweekly;

    const regularWeekly = state.hourlyRate * state.hoursPerWeek;
    const overtimeWeekly = overtimeRate * state.overtimeHours;
    const totalWeekly = regularWeekly + overtimeWeekly;

    const totalDailyHours = state.hoursPerWeek / 5;
    const overtimeDailyHours = state.overtimeHours / 5;
    const regularDaily = state.hourlyRate * totalDailyHours;
    const overtimeDaily = overtimeRate * overtimeDailyHours;
    const totalDaily = regularDaily + overtimeDaily;

    return {
      regularAnnual,
      overtimeAnnual,
      totalAnnual,
      regularMonthly,
      totalMonthly,
      regularBiweekly,
      totalBiweekly,
      regularWeekly,
      totalWeekly,
      regularDaily,
      totalDaily,
      overtimeRate,
    };
  }, [state.hourlyRate, state.hoursPerWeek, state.weeksPerYear, state.overtimeHours, state.overtimeMultiplier]);

  const payPeriodData = [
    { name: "Annual", regular: Math.round(results.regularAnnual), overtime: Math.round(results.overtimeAnnual) },
    { name: "Monthly", regular: Math.round(results.regularMonthly), overtime: Math.round(results.totalMonthly - results.regularMonthly) },
    { name: "Biweekly", regular: Math.round(results.regularBiweekly), overtime: Math.round(results.totalBiweekly - results.regularBiweekly) },
    { name: "Weekly", regular: Math.round(results.regularWeekly), overtime: Math.round(results.totalWeekly - results.regularWeekly) },
    { name: "Daily", regular: Math.round(results.regularDaily), overtime: Math.round(results.totalDaily - results.regularDaily) },
  ];

  const comparisonData = [
    { name: "Without OT", value: Math.round(results.regularAnnual) },
    { name: "With OT", value: Math.round(results.totalAnnual) },
  ];

  const shareResultsData: Record<string, string> = {
    "Annual Salary": formatCurrency(results.totalAnnual),
    Monthly: formatCurrency(results.totalMonthly),
    Biweekly: formatCurrency(results.totalBiweekly),
    Weekly: formatCurrency(results.totalWeekly),
    Daily: formatCurrency(results.totalDaily),
    ...(state.overtimeHours > 0
      ? { "OT Earnings": formatCurrency(results.overtimeAnnual) }
      : {}),
  };

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#162032] p-6 md:p-8">
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Hourly Rate */}
          <div>
            <CurrencyInput
              label="Hourly Rate"
              value={state.hourlyRate}
              onChange={(v) => setState('hourlyRate', v)}
              min={0}
              step={0.5}
            />
            <CustomSlider
              value={state.hourlyRate}
              onChange={(v) => setState('hourlyRate', v)}
              min={7.25}
              max={150}
              step={0.25}
              formatValue={(v) => `$${v.toFixed(2)}`}
              className="mt-3"
            />
          </div>

          {/* Hours Per Week */}
          <CustomSlider
            label="Hours Per Week"
            value={state.hoursPerWeek}
            onChange={(v) => setState('hoursPerWeek', v)}
            min={1}
            max={80}
            step={1}
            formatValue={(v) => `${v} hrs`}
          />

          {/* Weeks Per Year */}
          <div>
            <label htmlFor="weeks-per-year" className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Weeks Per Year
            </label>
            <input
              id="weeks-per-year"
              type="number"
              value={state.weeksPerYear}
              onChange={(e) => setState('weeksPerYear', Number(e.target.value))}
              className="h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] p-3 text-[#F1F5F9] focus:border-[#3B82F6] focus:outline-none focus:ring-[3px] focus:ring-[#3B82F6]/15"
              min={1}
              max={52}
              step={1}
            />
          </div>

          {/* Overtime Hours */}
          <CustomSlider
            label="Overtime Hours Per Week"
            value={state.overtimeHours}
            onChange={(v) => setState('overtimeHours', v)}
            min={0}
            max={40}
            step={1}
            formatValue={(v) => `${v} hrs`}
          />

          {/* Overtime Rate */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Overtime Rate Multiplier
            </label>
            <div className="flex gap-2" role="radiogroup" aria-label="Overtime Rate Multiplier">
              {[1.5, 2.0].map((mult) => (
                <button
                  key={mult}
                  role="radio"
                  aria-checked={state.overtimeMultiplier === mult}
                  onClick={() => setState('overtimeMultiplier', mult)}
                  className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                    state.overtimeMultiplier === mult
                      ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                      : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
                  }`}
                >
                  {mult}x ({formatCurrencyExact(state.hourlyRate * mult)}/hr)
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* StatCard Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <StatCard
              label="Annual Salary"
              highlight
              value={
                <AnimatedNumber
                  value={results.totalAnnual}
                  format="currency"
                  className="font-mono text-2xl font-bold text-[#22C55E] inline-block"
                />
              }
              subvalue={
                state.overtimeHours > 0
                  ? `${formatCurrency(results.regularAnnual)} base + ${formatCurrency(results.overtimeAnnual)} OT`
                  : undefined
              }
              className="col-span-2 md:col-span-3"
            />
            <StatCard
              label="Monthly"
              value={
                <AnimatedNumber
                  value={results.totalMonthly}
                  format="currency"
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
            />
            <StatCard
              label="Biweekly"
              value={
                <AnimatedNumber
                  value={results.totalBiweekly}
                  format="currency"
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
            />
            <StatCard
              label="Weekly"
              value={
                <AnimatedNumber
                  value={results.totalWeekly}
                  format="currency"
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
            />
            <StatCard
              label="Daily"
              value={
                <AnimatedNumber
                  value={results.totalDaily}
                  format="currency"
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
            />
            {state.overtimeHours > 0 && (
              <StatCard
                label="OT Earnings (Annual)"
                value={
                  <AnimatedNumber
                    value={results.overtimeAnnual}
                    format="currency"
                    className="font-mono text-lg font-bold text-[#F59E0B] inline-block"
                  />
                }
                trend="up"
              />
            )}
          </div>

          {/* Share Results */}
          <ShareResults
            title="Hourly to Salary Calculation Results"
            results={shareResultsData}
            getShareUrl={getShareUrl}
          />

          {/* Bar Chart: Pay by Period */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">Pay by Period</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={payPeriodData}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis
                  dataKey="name"
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`}
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
                <Bar dataKey="regular" name="Regular Pay" stackId="a" fill={COLORS.primary} radius={state.overtimeHours > 0 ? [0, 0, 0, 0] : [4, 4, 0, 0]} />
                {state.overtimeHours > 0 && (
                  <Bar dataKey="overtime" name="Overtime Pay" stackId="a" fill={COLORS.overtime} radius={[4, 4, 0, 0]} />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Comparison: With vs Without Overtime */}
          {state.overtimeHours > 0 && (
            <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
              <p className="mb-3 text-sm font-medium text-[#94A3B8]">Annual: With vs Without Overtime</p>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={comparisonData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis
                    type="number"
                    stroke={COLORS.textMuted}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke={COLORS.textMuted}
                    tick={{ fontSize: 12 }}
                    width={80}
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
                  <Bar dataKey="value" name="Annual Salary" radius={[0, 4, 4, 0]}>
                    <Cell fill={COLORS.secondary} />
                    <Cell fill={COLORS.overtime} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
