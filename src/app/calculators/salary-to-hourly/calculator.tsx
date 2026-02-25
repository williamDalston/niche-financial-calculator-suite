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
  const [state, setState, getShareUrl] = useCalculatorState({
    defaults: { annualSalary: 65000, hoursPerWeek: 40, weeksPerYear: 52 },
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
    { name: "Monthly", value: results.monthly, color: "#EF4444" },
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
    <div className="rounded-xl border border-[#1E293B] bg-[#162032] p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-2">
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
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Weeks Per Year
            </label>
            <input
              type="number"
              value={weeksPerYear}
              onChange={(e) => setState("weeksPerYear", Number(e.target.value))}
              className="h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] p-3 text-[#F1F5F9] focus:border-[#3B82F6] focus:outline-none focus:ring-[3px] focus:ring-[#3B82F6]/15"
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
                      ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                      : "border-[#1E293B] text-[#94A3B8] hover:border-[#3B82F6]/50"
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
          <div className="rounded-lg border border-l-[3px] border-[#1E293B] border-l-[#22C55E] bg-[#0B1120] p-5">
            <p className="mb-1 text-sm text-[#94A3B8]">Hourly Rate</p>
            <AnimatedNumber
              value={results.hourly}
              format="currency"
              decimals={2}
              className="font-mono text-4xl font-bold text-[#22C55E] inline-block transition-transform duration-150"
            />
          </div>

          {/* Pay Period StatCard Grid */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="Daily"
              value={
                <AnimatedNumber
                  value={results.daily}
                  format="currency"
                  decimals={2}
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
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
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
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
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
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
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
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
                  className="font-mono text-2xl font-bold text-[#22C55E] inline-block"
                />
              }
              className="col-span-2"
            />
          </div>

          {/* Share Results */}
          <ShareResults
            title="Salary to Hourly Conversion"
            results={shareResults}
            getShareUrl={getShareUrl}
          />

          {/* Bar Chart */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">Pay Period Comparison</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis
                  dataKey="name"
                  stroke="#94A3B8"
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  stroke="#94A3B8"
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) =>
                    v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v.toFixed(0)}`
                  }
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#162032",
                    border: "1px solid #1E293B",
                    borderRadius: "8px",
                    color: "#F1F5F9",
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
        <p className="mb-3 text-sm font-medium text-[#94A3B8]">Quick Reference</p>
        <div className="overflow-x-auto rounded-lg border border-[#1E293B]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1E293B] bg-[#0B1120]">
                <th className="px-4 py-3 text-left text-xs font-medium text-[#94A3B8]">Period</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[#94A3B8]">Gross Pay</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[#94A3B8]">Periods/Year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]">
              <tr className="hover:bg-[#0B1120]/50">
                <td className="px-4 py-2 text-[#F1F5F9]">Hourly</td>
                <td className="px-4 py-2 text-right font-mono text-[#22C55E]">{formatCurrency(results.hourly)}</td>
                <td className="px-4 py-2 text-right text-[#94A3B8]">{(hoursPerWeek * weeksPerYear).toLocaleString()}</td>
              </tr>
              <tr className="hover:bg-[#0B1120]/50">
                <td className="px-4 py-2 text-[#F1F5F9]">Daily</td>
                <td className="px-4 py-2 text-right font-mono text-[#22C55E]">{formatCurrency(results.daily)}</td>
                <td className="px-4 py-2 text-right text-[#94A3B8]">{(weeksPerYear * 5)}</td>
              </tr>
              <tr className="hover:bg-[#0B1120]/50">
                <td className="px-4 py-2 text-[#F1F5F9]">Weekly</td>
                <td className="px-4 py-2 text-right font-mono text-[#22C55E]">{formatCurrency(results.weekly)}</td>
                <td className="px-4 py-2 text-right text-[#94A3B8]">{weeksPerYear}</td>
              </tr>
              <tr className="hover:bg-[#0B1120]/50">
                <td className="px-4 py-2 text-[#F1F5F9]">Biweekly</td>
                <td className="px-4 py-2 text-right font-mono text-[#22C55E]">{formatCurrency(results.biweekly)}</td>
                <td className="px-4 py-2 text-right text-[#94A3B8]">26</td>
              </tr>
              <tr className="hover:bg-[#0B1120]/50">
                <td className="px-4 py-2 text-[#F1F5F9]">Semi-Monthly</td>
                <td className="px-4 py-2 text-right font-mono text-[#22C55E]">{formatCurrency(results.semiMonthly)}</td>
                <td className="px-4 py-2 text-right text-[#94A3B8]">24</td>
              </tr>
              <tr className="hover:bg-[#0B1120]/50">
                <td className="px-4 py-2 text-[#F1F5F9]">Monthly</td>
                <td className="px-4 py-2 text-right font-mono text-[#22C55E]">{formatCurrency(results.monthly)}</td>
                <td className="px-4 py-2 text-right text-[#94A3B8]">12</td>
              </tr>
              <tr className="border-t-2 border-[#1E293B] bg-[#0B1120]/50">
                <td className="px-4 py-2 font-medium text-[#F1F5F9]">Annual</td>
                <td className="px-4 py-2 text-right font-mono font-bold text-[#22C55E]">{formatCurrency(annualSalary)}</td>
                <td className="px-4 py-2 text-right text-[#94A3B8]">1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
