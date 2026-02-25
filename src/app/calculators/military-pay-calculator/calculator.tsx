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
  LineChart,
  Line,
} from "recharts";
import militaryPayData from "@/data/military-pay.json";
import {
  AnimatedNumber,
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

const PAY_GRADES = [
  "E-1", "E-2", "E-3", "E-4", "E-5", "E-6", "E-7", "E-8", "E-9",
  "W-1", "W-2", "W-3", "W-4", "W-5",
  "O-1", "O-2", "O-3", "O-4", "O-5", "O-6", "O-7", "O-8", "O-9", "O-10",
];

const BASES = Object.keys(militaryPayData.bah);

const YOS_KEYS = militaryPayData.yearsOfServiceKeys;

function getBasePay(grade: string, years: number): number {
  const gradeData = (militaryPayData.basePay as Record<string, Record<string, number>>)[grade];
  if (!gradeData) return 0;

  // Find the closest YOS key that does not exceed the given years
  let closestKey = "0";
  for (const key of YOS_KEYS) {
    if (key <= years) {
      closestKey = String(key);
    } else {
      break;
    }
  }
  return gradeData[closestKey] || 0;
}

function isEnlisted(grade: string): boolean {
  return grade.startsWith("E-");
}

export function MilitaryPayCalculatorWidget() {
  const [payGrade, setPayGrade] = useState("E-5");
  const [yearsOfService, setYearsOfService] = useState(4);
  const [base, setBase] = useState(BASES[0]);
  const [receiveBas, setReceiveBas] = useState(true);
  const [hasDependents, setHasDependents] = useState(false);

  const results = useMemo(() => {
    const basePay = getBasePay(payGrade, yearsOfService);
    const bahData = (militaryPayData.bah as Record<string, { withDependents: number; withoutDependents: number }>)[base];
    const bah = bahData
      ? hasDependents
        ? bahData.withDependents
        : bahData.withoutDependents
      : 0;
    const bas = receiveBas
      ? isEnlisted(payGrade)
        ? militaryPayData.bas.enlisted
        : militaryPayData.bas.officer
      : 0;

    const totalMonthly = basePay + bah + bas;
    const totalAnnual = totalMonthly * 12;

    // Tax-equivalent salary: BAH and BAS are tax-free
    // Assuming ~22% marginal federal + 5% state = 27% combined marginal rate
    const taxFreeAllowances = (bah + bas) * 12;
    const taxableBasePay = basePay * 12;
    const taxEquivalent = taxableBasePay + taxFreeAllowances / (1 - 0.27);

    return {
      basePay,
      bah,
      bas,
      totalMonthly,
      totalAnnual,
      taxEquivalent: Math.round(taxEquivalent),
    };
  }, [payGrade, yearsOfService, base, receiveBas, hasDependents]);

  const barData = [
    {
      name: "Monthly Pay",
      "Base Pay": results.basePay,
      BAH: results.bah,
      BAS: results.bas,
    },
  ];

  // Pay progression data
  const progressionData = useMemo(() => {
    return YOS_KEYS.map((yos) => {
      const bp = getBasePay(payGrade, yos);
      const bahData = (militaryPayData.bah as Record<string, { withDependents: number; withoutDependents: number }>)[base];
      const bahVal = bahData
        ? hasDependents
          ? bahData.withDependents
          : bahData.withoutDependents
        : 0;
      const basVal = receiveBas
        ? isEnlisted(payGrade)
          ? militaryPayData.bas.enlisted
          : militaryPayData.bas.officer
        : 0;
      return {
        yos,
        "Base Pay": bp,
        "Total Monthly": bp + bahVal + basVal,
      };
    });
  }, [payGrade, base, hasDependents, receiveBas]);

  const shareResults = {
    "Total Monthly": formatCurrencyExact(results.totalMonthly),
    "Base Pay": formatCurrency(results.basePay),
    BAH: formatCurrency(results.bah),
    BAS: formatCurrencyExact(results.bas),
    "Annual Salary": formatCurrency(results.totalAnnual),
    "Tax-Equivalent": formatCurrency(results.taxEquivalent),
  };

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#162032] p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Pay Grade */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Pay Grade
            </label>
            <select
              value={payGrade}
              onChange={(e) => setPayGrade(e.target.value)}
              className="h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] p-3 text-[#F1F5F9] focus:border-[#3B82F6] focus:outline-none"
            >
              <optgroup label="Enlisted">
                {PAY_GRADES.filter((g) => g.startsWith("E-")).map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </optgroup>
              <optgroup label="Warrant Officer">
                {PAY_GRADES.filter((g) => g.startsWith("W-")).map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </optgroup>
              <optgroup label="Officer">
                {PAY_GRADES.filter((g) => g.startsWith("O-")).map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Years of Service */}
          <CustomSlider
            label={`Years of Service: ${yearsOfService}`}
            value={yearsOfService}
            onChange={setYearsOfService}
            min={0}
            max={40}
            step={1}
            formatValue={(v) => `${v} yrs`}
            showMinMax
          />

          {/* BAH Location */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              BAH Location
            </label>
            <select
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className="h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] p-3 text-[#F1F5F9] focus:border-[#3B82F6] focus:outline-none"
            >
              {BASES.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* BAS Toggle */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              BAS Entitlement
            </label>
            <div className="flex gap-2">
              {[true, false].map((val) => (
                <button
                  key={String(val)}
                  onClick={() => setReceiveBas(val)}
                  className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                    receiveBas === val
                      ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                      : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
                  }`}
                >
                  {val ? "Yes" : "No"}
                </button>
              ))}
            </div>
          </div>

          {/* Dependents */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Dependents (for BAH rate)
            </label>
            <div className="flex gap-2">
              {[false, true].map((val) => (
                <button
                  key={String(val)}
                  onClick={() => setHasDependents(val)}
                  className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                    hasDependents === val
                      ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                      : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
                  }`}
                >
                  {val ? "With Dependents" : "Without Dependents"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Primary Result: Total Monthly */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-5 text-center">
            <p className="mb-2 text-sm text-[#94A3B8]">Total Monthly Compensation</p>
            <AnimatedNumber
              value={results.totalMonthly}
              format="currency"
              decimals={2}
              className="font-mono text-4xl font-bold text-[#22C55E] inline-block transition-transform duration-150"
            />
          </div>

          {/* Secondary AnimatedNumber metrics */}
          <div className="flex flex-wrap items-center justify-center gap-6 rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <div className="text-center">
              <p className="text-xs text-[#94A3B8] mb-1">Base Pay</p>
              <AnimatedNumber
                value={results.basePay}
                format="currency"
                className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
              />
            </div>
            <div className="text-center">
              <p className="text-xs text-[#94A3B8] mb-1">BAH</p>
              <AnimatedNumber
                value={results.bah}
                format="currency"
                className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
              />
            </div>
            <div className="text-center">
              <p className="text-xs text-[#94A3B8] mb-1">BAS</p>
              <AnimatedNumber
                value={results.bas}
                format="currency"
                decimals={2}
                className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
              />
            </div>
            <div className="text-center">
              <p className="text-xs text-[#94A3B8] mb-1">Annual</p>
              <AnimatedNumber
                value={results.totalAnnual}
                format="currency"
                className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
              />
            </div>
            <div className="text-center">
              <p className="text-xs text-[#94A3B8] mb-1">Tax-Equivalent</p>
              <AnimatedNumber
                value={results.taxEquivalent}
                format="currency"
                className="font-mono text-lg font-bold text-[#22C55E] inline-block"
              />
            </div>
          </div>

          {/* Share Results */}
          <ShareResults
            title="Military Pay Calculator Results"
            results={shareResults}
          />

          {/* StatCard Grid */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="Total Monthly"
              value={formatCurrencyExact(results.totalMonthly)}
              highlight
            />
            <StatCard
              label="Base Pay"
              value={formatCurrency(results.basePay)}
            />
            <StatCard
              label="BAH"
              value={formatCurrency(results.bah)}
            />
            <StatCard
              label="BAS"
              value={formatCurrencyExact(results.bas)}
            />
            <StatCard
              label="Annual Salary"
              value={formatCurrency(results.totalAnnual)}
            />
            <StatCard
              label="Tax-Equivalent"
              value={formatCurrency(results.taxEquivalent)}
              subvalue="BAH & BAS are tax-free"
            />
          </div>

          {/* Stacked Bar - Pay Components */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">Pay Components</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="name" stroke={COLORS.textMuted} tick={{ fontSize: 12 }} />
                <YAxis
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
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
                <Bar dataKey="Base Pay" stackId="pay" fill={COLORS.primary} />
                <Bar dataKey="BAH" stackId="pay" fill={COLORS.secondary} />
                <Bar dataKey="BAS" stackId="pay" fill={COLORS.tertiary} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart - Pay Progression */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">Pay Progression Over Service</p>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={progressionData}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis
                  dataKey="yos"
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 12 }}
                  label={{ value: "Years of Service", position: "insideBottom", offset: -5, fill: COLORS.textMuted }}
                />
                <YAxis
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
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
                <Line
                  type="monotone"
                  dataKey="Base Pay"
                  stroke={COLORS.primary}
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Total Monthly"
                  stroke={COLORS.secondary}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
