"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import gsPayData from "@/data/gs-pay-tables.json";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { ShareResults } from "@/components/ui/share-results";
import { StatCard } from "@/components/ui/stat-card";
import { useCalculatorState } from "@/hooks/use-calculator-state";
import { formatCurrencyExact as fmt, formatCurrency as fmtShort } from "@/lib/formatters";

/* ------------------------------------------------------------------ */
/*  Types & helpers                                                    */
/* ------------------------------------------------------------------ */

type GradeKey = keyof typeof gsPayData.basePayTable;

const grades: GradeKey[] = [
  "GS-1", "GS-2", "GS-3", "GS-4", "GS-5", "GS-6", "GS-7", "GS-8",
  "GS-9", "GS-10", "GS-11", "GS-12", "GS-13", "GS-14", "GS-15",
];

const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

const IconDollar = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const IconClock = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconCalendar = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconMapPin = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconTrendingUp = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
    <polyline points="17,6 23,6 23,12" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function GsPayCalculatorWidget() {
  const [state, setState, getShareUrl] = useCalculatorState({
    defaults: {
      grade: "GS-12" as string,
      step: 1,
      localityIndex: 0,
    },
  });

  const grade = state.grade as GradeKey;
  const step = state.step;

  const results = useMemo(() => {
    const basePay = gsPayData.basePayTable[grade][step - 1];
    const locality = gsPayData.localityAreas[state.localityIndex];
    const localityRate = locality.rate / 100;
    const localityAdjustment = basePay * localityRate;
    const totalAnnualPay = basePay + localityAdjustment;
    const biweeklyPay = totalAnnualPay / 26;
    const monthlyPay = totalAnnualPay / 12;
    const hourlyRate = totalAnnualPay / 2087; // OPM uses 2087 hours/year

    // Step comparison chart: all 10 steps for the selected grade with locality
    const stepChartData = steps.map((s) => {
      const base = gsPayData.basePayTable[grade][s - 1];
      const total = base * (1 + localityRate);
      return {
        step: `Step ${s}`,
        basePay: Math.round(base),
        localityPay: Math.round(base * localityRate),
        totalPay: Math.round(total),
      };
    });

    // Base vs locality breakdown chart
    const breakdownData = [
      { name: "Base Pay", value: Math.round(basePay) },
      { name: "Locality Adj.", value: Math.round(localityAdjustment) },
    ];

    return {
      basePay,
      localityAdjustment,
      totalAnnualPay,
      biweeklyPay,
      monthlyPay,
      hourlyRate,
      localityName: locality.name,
      localityRate: locality.rate,
      stepChartData,
      breakdownData,
    };
  }, [grade, step, state.localityIndex]);

  return (
    <div className="bg-[#162032] border border-[#1E293B] rounded-xl p-6 md:p-8">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div>
          <label htmlFor="gs-grade" className="mb-2 block text-sm font-medium text-[#94A3B8]">
            GS Grade
          </label>
          <select
            id="gs-grade"
            value={grade}
            onChange={(e) => setState('grade', e.target.value)}
            className="h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] px-3 py-3 text-[#F1F5F9] font-body transition-colors focus:border-[#3B82F6] focus:outline-none focus:ring-[3px] focus:ring-[#3B82F6]/15"
          >
            {grades.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="gs-step" className="mb-2 block text-sm font-medium text-[#94A3B8]">
            Step
          </label>
          <select
            id="gs-step"
            value={step}
            onChange={(e) => setState('step', Number(e.target.value))}
            className="h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] px-3 py-3 text-[#F1F5F9] font-body transition-colors focus:border-[#3B82F6] focus:outline-none focus:ring-[3px] focus:ring-[#3B82F6]/15"
          >
            {steps.map((s) => (
              <option key={s} value={s}>
                Step {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="gs-locality" className="mb-2 block text-sm font-medium text-[#94A3B8]">
            Locality Pay Area
          </label>
          <select
            id="gs-locality"
            value={state.localityIndex}
            onChange={(e) => setState('localityIndex', Number(e.target.value))}
            className="h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] px-3 py-3 text-[#F1F5F9] font-body transition-colors focus:border-[#3B82F6] focus:outline-none focus:ring-[3px] focus:ring-[#3B82F6]/15"
          >
            {gsPayData.localityAreas.map((area, i) => (
              <option key={area.code} value={i}>
                {area.name} (+{area.rate}%)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero result */}
      <div className="mb-6 rounded-xl border border-[#1E293B] bg-[#0B1120] p-6 text-center">
        <p className="text-sm font-medium text-[#94A3B8] mb-2">Total Annual Pay</p>
        <AnimatedNumber
          value={results.totalAnnualPay}
          format="currency"
          decimals={0}
          className="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#22C55E] inline-block transition-transform duration-150"
        />
        <p className="text-xs text-[#94A3B8] mt-2">
          {grade} Step {step} &mdash; {results.localityName}
        </p>
      </div>

      {/* StatCard grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <StatCard
          label="Total Annual Pay"
          value={fmt(results.totalAnnualPay)}
          icon={IconTrendingUp}
          highlight
        />
        <StatCard
          label="Base Pay"
          value={fmt(results.basePay)}
          icon={IconDollar}
          subvalue="Annual base before locality"
        />
        <StatCard
          label={`Locality Adj. (${results.localityRate}%)`}
          value={`+${fmt(results.localityAdjustment)}`}
          icon={IconMapPin}
          subvalue={results.localityName}
        />
        <StatCard
          label="Biweekly Pay"
          value={fmt(results.biweeklyPay)}
          icon={IconCalendar}
          subvalue="26 pay periods/year"
        />
        <StatCard
          label="Hourly Rate"
          value={fmt(results.hourlyRate)}
          icon={IconClock}
          subvalue="Based on 2,087 hrs/year"
        />
        <StatCard
          label="Monthly Pay"
          value={fmt(results.monthlyPay)}
          icon={IconCalendar}
          subvalue="12 months/year"
        />
      </div>

      {/* Share Results */}
      <ShareResults
        title="GS Pay Calculator — CalcEngine.io"
        results={{
          Grade: grade,
          Step: `Step ${step}`,
          Locality: results.localityName,
          "Base Pay": fmt(results.basePay),
          "Total Annual Pay": fmt(results.totalAnnualPay),
          "Biweekly Pay": fmt(results.biweeklyPay),
          "Hourly Rate": fmt(results.hourlyRate),
        }}
        getShareUrl={getShareUrl}
        className="mb-8"
      />

      {/* Charts */}
      <div className="grid grid-cols-1 gap-8">
        {/* Step comparison bar chart */}
        <div>
          <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">
            All Steps for {grade} ({results.localityName})
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={results.stepChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis
                dataKey="step"
                stroke="#94A3B8"
                tick={{ fill: "#94A3B8", fontSize: 12 }}
              />
              <YAxis
                stroke="#94A3B8"
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value, name) => [
                  fmtShort(value as number),
                  name === "basePay"
                    ? "Base Pay"
                    : name === "localityPay"
                    ? "Locality Pay"
                    : "Total Pay",
                ]}
                contentStyle={{
                  backgroundColor: "#0B1120",
                  border: "1px solid #1E293B",
                  borderRadius: "8px",
                  color: "#F1F5F9",
                }}
              />
              <Legend
                wrapperStyle={{ color: "#94A3B8" }}
                formatter={(value) =>
                  value === "basePay"
                    ? "Base Pay"
                    : value === "localityPay"
                    ? "Locality Adjustment"
                    : value
                }
              />
              <Bar
                dataKey="basePay"
                stackId="pay"
                fill="#3B82F6"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="localityPay"
                stackId="pay"
                fill="#22C55E"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
