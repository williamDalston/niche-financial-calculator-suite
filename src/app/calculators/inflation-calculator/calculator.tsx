"use client";

import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import cpiData from "@/data/cpi-data.json";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { CurrencyInput } from "@/components/ui/currency-input";
import { PercentageInput } from "@/components/ui/percentage-input";
import { ShareResults } from "@/components/ui/share-results";
import { StatCard } from "@/components/ui/stat-card";
import { formatCurrencyExact as fmt } from "@/lib/formatters";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const cpiMap = cpiData.data as Record<string, number>;
const years = Object.keys(cpiMap)
  .map(Number)
  .sort((a, b) => a - b);
const minYear = years[0];
const maxYear = years[years.length - 1];

function pct(n: number): string {
  const sign = n >= 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

const IconDollar = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const IconTrendingUp = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
    <polyline points="17,6 23,6 23,12" />
  </svg>
);

const IconPercent = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);

const IconTrendingDown = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23,18 13.5,8.5 8.5,13.5 1,6" />
    <polyline points="17,18 23,18 23,12" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function InflationCalculatorWidget() {
  const [amount, setAmount] = useState(1000);
  const [startYear, setStartYear] = useState(2000);
  const [endYear, setEndYear] = useState(2024);
  const [useCustomRate, setUseCustomRate] = useState(false);
  const [customRate, setCustomRate] = useState(3.0);

  const results = useMemo(() => {
    if (amount <= 0) return null;

    let adjustedAmount: number;
    let cumulativeRate: number;
    let avgAnnualRate: number;
    let chartData: { year: number; value: number }[] = [];

    if (useCustomRate) {
      const yearSpan = Math.abs(endYear - startYear);
      if (yearSpan === 0) {
        return {
          adjustedAmount: amount,
          cumulativeRate: 0,
          avgAnnualRate: customRate,
          buyingPowerChange: 0,
          chartData: [{ year: startYear, value: amount }],
        };
      }
      const rate = customRate / 100;
      adjustedAmount = amount * Math.pow(1 + rate, yearSpan);
      cumulativeRate = ((adjustedAmount - amount) / amount) * 100;
      avgAnnualRate = customRate;

      // Build chart data
      const from = Math.min(startYear, endYear);
      const to = Math.max(startYear, endYear);
      for (let y = from; y <= to; y++) {
        const elapsed = y - from;
        chartData.push({
          year: y,
          value: Math.round(amount * Math.pow(1 + rate, elapsed) * 100) / 100,
        });
      }
    } else {
      const startCpi = cpiMap[String(startYear)];
      const endCpi = cpiMap[String(endYear)];

      if (!startCpi || !endCpi) return null;

      adjustedAmount = amount * (endCpi / startCpi);
      cumulativeRate = ((endCpi - startCpi) / startCpi) * 100;
      const yearSpan = Math.abs(endYear - startYear);
      avgAnnualRate =
        yearSpan > 0
          ? (Math.pow(endCpi / startCpi, 1 / yearSpan) - 1) * 100
          : 0;

      // Build chart data -- value of the original amount in each year's dollars
      const from = Math.min(startYear, endYear);
      const to = Math.max(startYear, endYear);
      const baseCpi = cpiMap[String(from)];
      for (let y = from; y <= to; y++) {
        const yCpi = cpiMap[String(y)];
        if (yCpi && baseCpi) {
          chartData.push({
            year: y,
            value: Math.round((amount * (yCpi / baseCpi)) * 100) / 100,
          });
        }
      }
    }

    const buyingPowerChange = ((amount - adjustedAmount) / adjustedAmount) * 100;

    return {
      adjustedAmount,
      cumulativeRate,
      avgAnnualRate,
      buyingPowerChange,
      chartData,
    };
  }, [amount, startYear, endYear, useCustomRate, customRate]);

  return (
    <div className="bg-[#162032] border border-[#1E293B] rounded-xl p-6 md:p-8">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <CurrencyInput
            label="Amount ($)"
            value={amount}
            onChange={setAmount}
            min={0}
            max={100000000}
            step={100}
          />
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={useCustomRate}
              onChange={(e) => setUseCustomRate(e.target.checked)}
              className="h-5 w-5 rounded border-[#1E293B] bg-[#0B1120] text-[#22C55E] focus:ring-[#3B82F6]"
            />
            <span className="text-sm text-[#94A3B8]">
              Use custom inflation rate instead of CPI data
            </span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
            Start Year
          </label>
          <select
            value={startYear}
            onChange={(e) => setStartYear(Number(e.target.value))}
            className="h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] px-3 py-3 text-[#F1F5F9] font-body transition-colors focus:border-[#3B82F6] focus:outline-none focus:ring-[3px] focus:ring-[#3B82F6]/15"
          >
            {years.map((y) => (
              <option key={`start-${y}`} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
            End Year
          </label>
          <select
            value={endYear}
            onChange={(e) => setEndYear(Number(e.target.value))}
            className="h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] px-3 py-3 text-[#F1F5F9] font-body transition-colors focus:border-[#3B82F6] focus:outline-none focus:ring-[3px] focus:ring-[#3B82F6]/15"
          >
            {years.map((y) => (
              <option key={`end-${y}`} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {useCustomRate && (
          <div>
            <PercentageInput
              label="Annual Inflation Rate"
              value={customRate}
              onChange={setCustomRate}
              min={0}
              max={50}
              step={0.1}
            />
          </div>
        )}
      </div>

      {/* Results */}
      {results && (
        <>
          {/* Hero result */}
          <div className="mb-6 rounded-xl border border-[#1E293B] bg-[#0B1120] p-6 text-center">
            <p className="text-sm font-medium text-[#94A3B8] mb-2">
              {fmt(amount)} in {startYear} is equivalent to
            </p>
            <AnimatedNumber
              value={results.adjustedAmount}
              format="currency"
              decimals={2}
              className="font-mono text-4xl md:text-5xl font-bold text-[#22C55E] inline-block transition-transform duration-150"
            />
            <p className="text-xs text-[#94A3B8] mt-2">in {endYear} dollars</p>
          </div>

          {/* StatCard grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard
              label="Adjusted Amount"
              value={fmt(results.adjustedAmount)}
              icon={IconDollar}
              highlight
              subvalue={`in ${endYear} dollars`}
            />
            <StatCard
              label="Cumulative Inflation"
              value={pct(results.cumulativeRate)}
              icon={IconTrendingUp}
              trend="up"
              subvalue={`${startYear} to ${endYear}`}
            />
            <StatCard
              label="Avg. Annual Rate"
              value={`${results.avgAnnualRate.toFixed(2)}%`}
              icon={IconPercent}
              subvalue="Compounded annually"
            />
            <StatCard
              label="Buying Power Change"
              value={pct(results.buyingPowerChange)}
              icon={IconTrendingDown}
              trend="down"
              subvalue="Decrease in purchasing power"
            />
          </div>

          {/* Share Results */}
          <ShareResults
            title="Inflation Calculator — CalcEngine.io"
            results={{
              "Original Amount": fmt(amount),
              "Start Year": String(startYear),
              "End Year": String(endYear),
              "Adjusted Amount": fmt(results.adjustedAmount),
              "Cumulative Inflation": pct(results.cumulativeRate),
              "Avg. Annual Rate": `${results.avgAnnualRate.toFixed(2)}%`,
              "Buying Power Change": pct(results.buyingPowerChange),
            }}
            className="mb-8"
          />

          {/* Chart */}
          <div>
            <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">
              Value of {fmt(amount)} Over Time
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={results.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis
                  dataKey="year"
                  stroke="#94A3B8"
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                />
                <YAxis
                  stroke="#94A3B8"
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                  tickFormatter={(v) =>
                    v >= 1000
                      ? `$${(v / 1000).toFixed(1)}k`
                      : `$${v.toFixed(0)}`
                  }
                />
                <Tooltip
                  formatter={(value) => [fmt(value as number), "Value"]}
                  labelFormatter={(label) => `Year ${label}`}
                  contentStyle={{
                    backgroundColor: "#0B1120",
                    border: "1px solid #1E293B",
                    borderRadius: "8px",
                    color: "#F1F5F9",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#22C55E"
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
