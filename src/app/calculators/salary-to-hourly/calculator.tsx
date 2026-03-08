"use client";

import { useMemo } from "react";
import { useCalculatorState } from "@/hooks/use-calculator-state";
import { useChartColors } from "@/hooks/use-chart-colors";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
import { formatCurrencyExact as formatCurrency } from "@/lib/formatters";

export function SalaryToHourlyWidget() {
  const COLORS = useChartColors();
  const [state, setState, getShareUrl] = useCalculatorState({
    defaults: { annualSalary: 65000, hoursPerWeek: 40, weeksPerYear: 52 }, slug: "salary-to-hourly",
  });
  const { annualSalary, hoursPerWeek, weeksPerYear } = state;

  const results = useMemo(() => {
    const totalHours = hoursPerWeek * weeksPerYear;
    if (totalHours <= 0 || annualSalary < 0) {
      return {
        hourly: 0,
        daily: 0,
        weekly: 0,
        biweekly: 0,
        semiMonthly: 0,
        monthly: 0,
      };
    }

    const hourly = annualSalary / totalHours;
    const daily = hourly * (hoursPerWeek / 5); // Assume 5-day work week
    const weekly = annualSalary / weeksPerYear;
    const biweekly = annualSalary / 26;
    const semiMonthly = annualSalary / 24;
    const monthly = annualSalary / 12;

    return { hourly, daily, weekly, biweekly, semiMonthly, monthly };
  }, [annualSalary, hoursPerWeek, weeksPerYear]);

  const chartData = [
    { name: "Hourly", value: results.hourly, color: "#22C55E" },
    { name: "Daily", value: results.daily, color: "#3B82F6" },
    { name: "Weekly", value: results.weekly, color: "#8B5CF6" },
    { name: "Biweekly", value: results.biweekly, color: "#F59E0B" },
    { name: "Monthly", value: results.monthly, color: "#F97316" },
  ];

  const shareResults: Record<string, string> = {
    "Annual Salary": formatCurrency(annualSalary),
    "Hourly Rate": formatCurrency(results.hourly),
    "Daily Pay": formatCurrency(results.daily),
    "Weekly Pay": formatCurrency(results.weekly),
    "Biweekly Pay": formatCurrency(results.biweekly),
    "Monthly Pay": formatCurrency(results.monthly),
  };

  return (
    <div className="rounded-xl border border-border bg-bg-surface p-6 md:p-8">
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Annual Salary */}
          <div>
            <CurrencyInput
              label="Annual Salary"
              value={annualSalary}
              onChange={(v) => setState("annualSalary", v)}
              min={0}
              max={500000}
              step={1000}
            />
            <CustomSlider
              value={annualSalary}
              onChange={(v) => setState("annualSalary", v)}
              min={20000}
              max={500000}
              step={1000}
              formatValue={(v) =>
                v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
              }
              className="mt-3"
            />
          </div>

          {/* Hours Per Week */}
          <div>
            <CustomSlider
              label="Hours Per Week"
              value={hoursPerWeek}
              onChange={(v) => setState("hoursPerWeek", v)}
              min={1}
              max={80}
              step={1}
              formatValue={(v) => `${v} hrs`}
            />
          </div>

          {/* Weeks Per Year */}
          <div>
            <label className="mb-2 block text-sm font-medium text-text-muted">
              Weeks Per Year
            </label>
            <input
              type="number"
              value={weeksPerYear}
              onChange={(e) => setState("weeksPerYear", Number(e.target.value))}
              className="h-12 w-full rounded-lg border border-border bg-bg-primary p-3 text-text-primary focus:border-accent-secondary focus:outline-none focus:ring-[3px] focus:ring-accent-secondary/15"
              min={1}
              max={52}
              step={1}
            />
            <div className="mt-2 flex gap-2">
              {[48, 50, 52].map((w) => (
                <button
                  key={w}
                  onClick={() => setState("weeksPerYear", w)}
                  className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                    weeksPerYear === w
                      ? "border-accent-primary bg-accent-primary/10 text-accent-primary"
                      : "border-border text-text-muted hover:border-accent-secondary/50"
                  }`}
                >
                  {w} weeks
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Primary Result */}
          <div className="rounded-lg border border-l-[3px] border-border border-l-accent-primary bg-bg-primary p-5">
            <p className="mb-1 text-sm text-text-muted">Hourly Rate</p>
            <AnimatedNumber
              value={results.hourly}
              format="currency"
              decimals={2}
              className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-accent-primary inline-block transition-transform duration-150"
            />
          </div>

          {/* Pay Period StatCard Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <StatCard
              label="Daily"
              value={
                <AnimatedNumber
                  value={results.daily}
                  format="currency"
                  decimals={2}
                  className="font-mono text-lg font-bold text-text-primary inline-block"
                />
              }
            />
            <StatCard
              label="Weekly"
              value={
                <AnimatedNumber
                  value={results.weekly}
                  format="currency"
                  decimals={2}
                  className="font-mono text-lg font-bold text-text-primary inline-block"
                />
              }
            />
            <StatCard
              label="Biweekly"
              value={
                <AnimatedNumber
                  value={results.biweekly}
                  format="currency"
                  decimals={2}
                  className="font-mono text-lg font-bold text-text-primary inline-block"
                />
              }
            />
            <StatCard
              label="Semi-Monthly"
              value={
                <AnimatedNumber
                  value={results.semiMonthly}
                  format="currency"
                  decimals={2}
                  className="font-mono text-lg font-bold text-text-primary inline-block"
                />
              }
            />
            <StatCard
              label="Monthly"
              highlight
              value={
                <AnimatedNumber
                  value={results.monthly}
                  format="currency"
                  decimals={2}
                  className="font-mono text-2xl font-bold text-accent-primary inline-block"
                />
              }
              className="col-span-2"
            />
          </div>

          {/* Share Results */}
          <ShareResults slug="salary-to-hourly"
            title="Salary to Hourly Conversion"
            results={shareResults}
            getShareUrl={getShareUrl}
          />

          {/* Bar Chart */}
          <div className="rounded-lg border border-border bg-bg-primary p-4">
            <p className="mb-3 text-sm font-medium text-text-muted">Pay Period Comparison</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis
                  dataKey="name"
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) =>
                    v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v.toFixed(0)}`
                  }
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: COLORS.surface,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "8px",
                    color: COLORS.textPrimary,
                  }}
                  formatter={(value) => [formatCurrency(value as number), "Amount"]}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Reference Table */}
      <div className="mt-8">
        <p className="mb-3 text-sm font-medium text-text-muted">Quick Reference</p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-primary">
                <th className="px-4 py-3 text-left text-xs font-medium text-text-muted">Period</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-text-muted">Gross Pay</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-text-muted">Periods/Year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-bg-primary/50">
                <td className="px-4 py-2 text-text-primary">Hourly</td>
                <td className="px-4 py-2 text-right font-mono text-accent-primary">{formatCurrency(results.hourly)}</td>
                <td className="px-4 py-2 text-right text-text-muted">{(hoursPerWeek * weeksPerYear).toLocaleString()}</td>
              </tr>
              <tr className="hover:bg-bg-primary/50">
                <td className="px-4 py-2 text-text-primary">Daily</td>
                <td className="px-4 py-2 text-right font-mono text-accent-primary">{formatCurrency(results.daily)}</td>
                <td className="px-4 py-2 text-right text-text-muted">{(weeksPerYear * 5)}</td>
              </tr>
              <tr className="hover:bg-bg-primary/50">
                <td className="px-4 py-2 text-text-primary">Weekly</td>
                <td className="px-4 py-2 text-right font-mono text-accent-primary">{formatCurrency(results.weekly)}</td>
                <td className="px-4 py-2 text-right text-text-muted">{weeksPerYear}</td>
              </tr>
              <tr className="hover:bg-bg-primary/50">
                <td className="px-4 py-2 text-text-primary">Biweekly</td>
                <td className="px-4 py-2 text-right font-mono text-accent-primary">{formatCurrency(results.biweekly)}</td>
                <td className="px-4 py-2 text-right text-text-muted">26</td>
              </tr>
              <tr className="hover:bg-bg-primary/50">
                <td className="px-4 py-2 text-text-primary">Semi-Monthly</td>
                <td className="px-4 py-2 text-right font-mono text-accent-primary">{formatCurrency(results.semiMonthly)}</td>
                <td className="px-4 py-2 text-right text-text-muted">24</td>
              </tr>
              <tr className="hover:bg-bg-primary/50">
                <td className="px-4 py-2 text-text-primary">Monthly</td>
                <td className="px-4 py-2 text-right font-mono text-accent-primary">{formatCurrency(results.monthly)}</td>
                <td className="px-4 py-2 text-right text-text-muted">12</td>
              </tr>
              <tr className="border-t-2 border-border bg-bg-primary/50">
                <td className="px-4 py-2 font-medium text-text-primary">Annual</td>
                <td className="px-4 py-2 text-right font-mono font-bold text-accent-primary">{formatCurrency(annualSalary)}</td>
                <td className="px-4 py-2 text-right text-text-muted">1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
