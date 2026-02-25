"use client";

import { useState, useMemo } from "react";
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

type InputMode = "hourly" | "salary";
type PayPeriod = "weekly" | "biweekly";

export function OvertimeCalculatorWidget() {
  const [inputMode, setInputMode] = useState<InputMode>("hourly");
  const [hourlyRate, setHourlyRate] = useState(25);
  const [annualSalary, setAnnualSalary] = useState(52000);
  const [hoursWorked, setHoursWorked] = useState(50);
  const [otMultiplier, setOtMultiplier] = useState(1.5);
  const [payPeriod, setPayPeriod] = useState<PayPeriod>("weekly");

  const results = useMemo(() => {
    const effectiveHourlyRate =
      inputMode === "hourly" ? hourlyRate : annualSalary / 2080;

    const standardHours = 40;
    const overtimeHours = Math.max(hoursWorked - standardHours, 0);
    const regularHours = Math.min(hoursWorked, standardHours);

    const regularPay = regularHours * effectiveHourlyRate;
    const overtimePay = overtimeHours * effectiveHourlyRate * otMultiplier;
    const totalGrossPay = regularPay + overtimePay;

    const effectiveRate = hoursWorked > 0 ? totalGrossPay / hoursWorked : 0;

    const periodMultiplier = payPeriod === "biweekly" ? 2 : 1;
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
  }, [inputMode, hourlyRate, annualSalary, hoursWorked, otMultiplier, payPeriod]);

  const payBreakdownData = [
    {
      name: payPeriod === "weekly" ? "Weekly Pay" : "Biweekly Pay",
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
      rate: results.effectiveHourlyRate * otMultiplier,
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
    <div className="rounded-xl border border-[#1E293B] bg-[#162032] p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Input Mode */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Enter Pay As
            </label>
            <div className="flex gap-2">
              {(["hourly", "salary"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setInputMode(mode)}
                  className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                    inputMode === mode
                      ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                      : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
                  }`}
                >
                  {mode === "hourly" ? "Hourly Rate" : "Annual Salary"}
                </button>
              ))}
            </div>
          </div>

          {/* Hourly Rate or Salary */}
          {inputMode === "hourly" ? (
            <div>
              <CurrencyInput
                label="Regular Hourly Rate"
                value={hourlyRate}
                onChange={setHourlyRate}
                min={0}
                max={500}
                step={0.5}
              />
              <CustomSlider
                value={hourlyRate}
                onChange={setHourlyRate}
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
                value={annualSalary}
                onChange={setAnnualSalary}
                min={0}
                max={500000}
                step={1000}
              />
              <CustomSlider
                value={annualSalary}
                onChange={setAnnualSalary}
                min={15000}
                max={200000}
                step={1000}
                formatValue={(v) => `$${(v / 1000).toFixed(0)}k`}
                showMinMax
                className="mt-2"
              />
              <p className="mt-1 text-xs text-[#94A3B8]">
                Hourly equivalent: {formatCurrencyExact(annualSalary / 2080)}/hr (based on 2,080 hours/year)
              </p>
            </div>
          )}

          {/* Hours Worked */}
          <CustomSlider
            label={`Hours Worked This Week: ${hoursWorked}`}
            value={hoursWorked}
            onChange={setHoursWorked}
            min={0}
            max={80}
            step={0.5}
            formatValue={(v) => `${v} hrs`}
            showMinMax
          />

          {/* OT Multiplier */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Overtime Rate Multiplier
            </label>
            <div className="flex gap-2">
              {[1.5, 2.0].map((mult) => (
                <button
                  key={mult}
                  onClick={() => setOtMultiplier(mult)}
                  className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                    otMultiplier === mult
                      ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                      : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
                  }`}
                >
                  {mult}x ({formatCurrencyExact(results.effectiveHourlyRate * mult)}/hr)
                </button>
              ))}
            </div>
          </div>

          {/* Pay Period */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Pay Period
            </label>
            <div className="flex gap-2">
              {(["weekly", "biweekly"] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setPayPeriod(period)}
                  className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                    payPeriod === period
                      ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                      : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
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
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-5 text-center">
            <p className="mb-2 text-sm text-[#94A3B8]">Total Gross Pay ({payPeriod === "weekly" ? "Weekly" : "Biweekly"})</p>
            <AnimatedNumber
              value={results.periodTotalPay}
              format="currency"
              decimals={2}
              className="font-mono text-4xl font-bold text-[#22C55E] inline-block transition-transform duration-150"
            />
          </div>

          {/* Secondary AnimatedNumber metrics */}
          <div className="flex flex-wrap items-center justify-center gap-6 rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <div className="text-center">
              <p className="text-xs text-[#94A3B8] mb-1">Overtime Pay</p>
              <AnimatedNumber
                value={results.periodOvertimePay}
                format="currency"
                decimals={2}
                className="font-mono text-lg font-bold text-[#F59E0B] inline-block"
              />
            </div>
            <div className="text-center">
              <p className="text-xs text-[#94A3B8] mb-1">Effective Hourly Rate</p>
              <AnimatedNumber
                value={results.effectiveRate}
                format="currency"
                decimals={2}
                className="font-mono text-lg font-bold text-[#22C55E] inline-block"
              />
            </div>
          </div>

          {/* Share Results */}
          <ShareResults
            title="Overtime Calculator Results"
            results={shareResults}
          />

          {/* StatCard Grid */}
          <div className="grid grid-cols-2 gap-3">
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
              subvalue={results.overtimeHours > 0 ? `${otMultiplier}x rate` : "No overtime"}
            />
            <StatCard
              label="OT Pay"
              value={formatCurrencyExact(results.periodOvertimePay)}
              subvalue={results.overtimeHours > 0 ? `${results.overtimeHours} hrs x ${formatCurrencyExact(results.effectiveHourlyRate * otMultiplier)}` : undefined}
            />
            <StatCard
              label="Effective Hourly Rate"
              value={formatCurrencyExact(results.effectiveRate)}
              className="col-span-2"
              subvalue="Blended rate across all hours worked"
            />
          </div>

          {/* Stacked Bar - Regular vs OT */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">Pay Breakdown</p>
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
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">Rate Comparison</p>
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
