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
  quaternary: "#EF4444",
  bg: "#0B1120",
  surface: "#162032",
  border: "#1E293B",
  textPrimary: "#F1F5F9",
  textMuted: "#94A3B8",
};

type InputMode = "aime" | "income";

// 2024 bend points
const BEND_POINT_1 = 1174;
const BEND_POINT_2 = 7078;

function calculatePIA(aime: number): number {
  let pia = 0;
  if (aime <= BEND_POINT_1) {
    pia = aime * 0.9;
  } else if (aime <= BEND_POINT_2) {
    pia = BEND_POINT_1 * 0.9 + (aime - BEND_POINT_1) * 0.32;
  } else {
    pia = BEND_POINT_1 * 0.9 + (BEND_POINT_2 - BEND_POINT_1) * 0.32 + (aime - BEND_POINT_2) * 0.15;
  }
  return pia;
}

function getFRA(birthYear: number): number {
  if (birthYear <= 1937) return 65;
  if (birthYear === 1938) return 65 + 2 / 12;
  if (birthYear === 1939) return 65 + 4 / 12;
  if (birthYear === 1940) return 65 + 6 / 12;
  if (birthYear === 1941) return 65 + 8 / 12;
  if (birthYear === 1942) return 65 + 10 / 12;
  if (birthYear >= 1943 && birthYear <= 1954) return 66;
  if (birthYear === 1955) return 66 + 2 / 12;
  if (birthYear === 1956) return 66 + 4 / 12;
  if (birthYear === 1957) return 66 + 6 / 12;
  if (birthYear === 1958) return 66 + 8 / 12;
  if (birthYear === 1959) return 66 + 10 / 12;
  return 67; // 1960+
}

function getEarlyReductionFactor(claimAge: number, fra: number): number {
  if (claimAge >= fra) return 1;
  const monthsEarly = Math.round((fra - claimAge) * 12);
  let reduction = 0;
  // First 36 months: 5/9 of 1% per month (6.67% per year)
  const firstMonths = Math.min(monthsEarly, 36);
  reduction += firstMonths * (5 / 900);
  // Additional months beyond 36: 5/12 of 1% per month (5% per year)
  if (monthsEarly > 36) {
    reduction += (monthsEarly - 36) * (5 / 1200);
  }
  return 1 - reduction;
}

function getDelayedCreditFactor(claimAge: number, fra: number): number {
  if (claimAge <= fra) return 1;
  const monthsLate = Math.round((claimAge - fra) * 12);
  // 8% per year = 2/3 of 1% per month
  return 1 + monthsLate * (2 / 300);
}

function getBenefitAtAge(pia: number, claimAge: number, fra: number): number {
  if (claimAge < fra) {
    return pia * getEarlyReductionFactor(claimAge, fra);
  } else if (claimAge > fra) {
    return pia * getDelayedCreditFactor(claimAge, fra);
  }
  return pia;
}

export function SocialSecurityEstimatorWidget() {
  const [currentAge, setCurrentAge] = useState(40);
  const [birthYear, setBirthYear] = useState(1985);
  const [inputMode, setInputMode] = useState<InputMode>("income");
  const [aime, setAime] = useState(5000);
  const [annualIncome, setAnnualIncome] = useState(75000);
  const [plannedRetirementAge, setPlannedRetirementAge] = useState(67);
  const [yearsWorked, setYearsWorked] = useState(20);

  const results = useMemo(() => {
    const fra = getFRA(birthYear);
    const fraDisplay = Math.floor(fra) + (fra % 1 > 0 ? ` and ${Math.round((fra % 1) * 12)} months` : "");

    // Calculate AIME from income (simplified)
    let effectiveAime: number;
    if (inputMode === "aime") {
      effectiveAime = aime;
    } else {
      // Simplified: AIME = average of highest 35 years of indexed earnings / 12
      // For simplicity, use current annual income scaled by years worked vs 35
      const effectiveYears = Math.min(yearsWorked, 35);
      const totalIndexedEarnings = annualIncome * effectiveYears;
      effectiveAime = totalIndexedEarnings / (35 * 12);
    }

    const pia = calculatePIA(effectiveAime);

    // Benefits at different ages
    const benefitAt62 = getBenefitAtAge(pia, 62, fra);
    const benefitAtFRA = pia; // By definition, benefit at FRA = PIA
    const benefitAt70 = getBenefitAtAge(pia, 70, fra);
    const benefitAtPlanned = getBenefitAtAge(pia, plannedRetirementAge, fra);

    // Cumulative benefits comparison (from claim age to age 90)
    const maxAge = 90;
    const cumulativeData: {
      age: number;
      "Claim at 62": number;
      "Claim at FRA": number;
      "Claim at 70": number;
    }[] = [];

    let cum62 = 0;
    let cumFRA = 0;
    let cum70 = 0;

    for (let age = 62; age <= maxAge; age++) {
      if (age >= 62) cum62 += benefitAt62 * 12;
      if (age >= Math.ceil(fra)) cumFRA += benefitAtFRA * 12;
      if (age >= 70) cum70 += benefitAt70 * 12;

      cumulativeData.push({
        age,
        "Claim at 62": Math.round(cum62),
        "Claim at FRA": Math.round(cumFRA),
        "Claim at 70": Math.round(cum70),
      });
    }

    // Find crossover points
    const crossover62vsFRA = cumulativeData.find(
      (d, i) => i > 0 && d["Claim at FRA"] >= d["Claim at 62"] && cumulativeData[i - 1]["Claim at FRA"] < cumulativeData[i - 1]["Claim at 62"]
    )?.age;

    const crossover62vs70 = cumulativeData.find(
      (d, i) => i > 0 && d["Claim at 70"] >= d["Claim at 62"] && cumulativeData[i - 1]["Claim at 70"] < cumulativeData[i - 1]["Claim at 62"]
    )?.age;

    return {
      fra,
      fraDisplay,
      effectiveAime: Math.round(effectiveAime),
      pia: Math.round(pia * 100) / 100,
      benefitAt62,
      benefitAtFRA,
      benefitAt70,
      benefitAtPlanned,
      cumulativeData,
      crossover62vsFRA,
      crossover62vs70,
    };
  }, [currentAge, birthYear, inputMode, aime, annualIncome, plannedRetirementAge, yearsWorked]);

  const comparisonBarData = [
    { name: "Age 62", benefit: Math.round(results.benefitAt62), label: "Early" },
    { name: `FRA (${Math.floor(results.fra)})`, benefit: Math.round(results.benefitAtFRA), label: "Full" },
    { name: "Age 70", benefit: Math.round(results.benefitAt70), label: "Delayed" },
  ];

  const BAR_COLORS = [COLORS.tertiary, COLORS.secondary, COLORS.primary];

  const shareResults = {
    "Monthly Benefit": formatCurrencyExact(results.benefitAtPlanned),
    "Annual Benefit": formatCurrency(results.benefitAtPlanned * 12),
    PIA: formatCurrencyExact(results.pia),
    FRA: String(results.fraDisplay),
    "Benefit at 62": formatCurrency(results.benefitAt62),
    "Benefit at 70": formatCurrency(results.benefitAt70),
  };

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#162032] p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Current Age */}
          <CustomSlider
            label={`Current Age: ${currentAge}`}
            value={currentAge}
            onChange={setCurrentAge}
            min={18}
            max={80}
            step={1}
            formatValue={(v) => `${v}`}
            showMinMax
          />

          {/* Birth Year */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Birth Year
            </label>
            <input
              type="number"
              value={birthYear}
              onChange={(e) => setBirthYear(Number(e.target.value))}
              className="h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] p-3 text-[#F1F5F9] focus:border-[#3B82F6] focus:outline-none"
              min={1940}
              max={2005}
            />
          </div>

          {/* Input Mode */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Earnings Input Method
            </label>
            <div className="flex gap-2">
              {(["income", "aime"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setInputMode(mode)}
                  className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                    inputMode === mode
                      ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                      : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
                  }`}
                >
                  {mode === "income" ? "Annual Income" : "AIME (Advanced)"}
                </button>
              ))}
            </div>
          </div>

          {/* Income or AIME */}
          {inputMode === "income" ? (
            <>
              <div>
                <CurrencyInput
                  label="Current Annual Income"
                  value={annualIncome}
                  onChange={setAnnualIncome}
                  min={0}
                  max={250000}
                  step={1000}
                />
                <CustomSlider
                  value={annualIncome}
                  onChange={setAnnualIncome}
                  min={0}
                  max={200000}
                  step={1000}
                  formatValue={(v) => `$${(v / 1000).toFixed(0)}k`}
                  showMinMax
                  className="mt-2"
                />
              </div>
              <CustomSlider
                label={`Years of Work History: ${yearsWorked}`}
                value={yearsWorked}
                onChange={setYearsWorked}
                min={0}
                max={45}
                step={1}
                formatValue={(v) => `${v} yrs`}
                showMinMax
              />
            </>
          ) : (
            <div>
              <CurrencyInput
                label="Average Indexed Monthly Earnings (AIME)"
                value={aime}
                onChange={setAime}
                min={0}
                max={15000}
                step={100}
              />
              <CustomSlider
                value={aime}
                onChange={setAime}
                min={0}
                max={12000}
                step={50}
                formatValue={(v) => formatCurrency(v)}
                showMinMax
                className="mt-2"
              />
            </div>
          )}

          {/* Planned Claiming Age */}
          <CustomSlider
            label={`Planned Claiming Age: ${plannedRetirementAge}`}
            value={plannedRetirementAge}
            onChange={setPlannedRetirementAge}
            min={62}
            max={70}
            step={1}
            formatValue={(v) => {
              if (v === 62) return "62 (Early)";
              if (v === 70) return "70 (Max)";
              return `${v}`;
            }}
            showMinMax
          />
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Primary Result: Monthly Benefit at Planned Age */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-5 text-center">
            <p className="mb-2 text-sm text-[#94A3B8]">
              Estimated Monthly Benefit at Age {plannedRetirementAge}
            </p>
            <AnimatedNumber
              value={results.benefitAtPlanned}
              format="currency"
              decimals={2}
              className="font-mono text-4xl font-bold text-[#22C55E] inline-block transition-transform duration-150"
            />
          </div>

          {/* Secondary AnimatedNumber metrics */}
          <div className="flex flex-wrap items-center justify-center gap-6 rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <div className="text-center">
              <p className="text-xs text-[#94A3B8] mb-1">Annual Benefit</p>
              <AnimatedNumber
                value={results.benefitAtPlanned * 12}
                format="currency"
                className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
              />
            </div>
            <div className="text-center">
              <p className="text-xs text-[#94A3B8] mb-1">PIA</p>
              <AnimatedNumber
                value={results.pia}
                format="currency"
                decimals={2}
                className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
              />
            </div>
          </div>

          {/* Share Results */}
          <ShareResults
            title="Social Security Estimator Results"
            results={shareResults}
          />

          {/* StatCard Grid */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="Monthly Benefit"
              value={formatCurrencyExact(results.benefitAtPlanned)}
              highlight
              subvalue={`At age ${plannedRetirementAge}`}
            />
            <StatCard
              label="Annual Benefit"
              value={formatCurrency(results.benefitAtPlanned * 12)}
            />
            <StatCard
              label="PIA"
              value={formatCurrencyExact(results.pia)}
              subvalue="Primary Insurance Amount"
            />
            <StatCard
              label="FRA"
              value={String(results.fraDisplay)}
              subvalue="Full Retirement Age"
            />
            <StatCard
              label="Benefit at 62"
              value={formatCurrency(results.benefitAt62)}
              subvalue="Early claiming"
            />
            <StatCard
              label="Benefit at 70"
              value={formatCurrency(results.benefitAt70)}
              subvalue="Maximum delayed credits"
            />
          </div>

          {/* Bar Chart - Monthly Benefit Comparison */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">Monthly Benefit by Claiming Age</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={comparisonBarData}>
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
                <Bar dataKey="benefit" name="Monthly Benefit">
                  {comparisonBarData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={BAR_COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart - Cumulative Benefits */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">Cumulative Lifetime Benefits</p>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={results.cumulativeData}>
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
                <Line type="monotone" dataKey="Claim at 62" stroke={COLORS.tertiary} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Claim at FRA" stroke={COLORS.secondary} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Claim at 70" stroke={COLORS.primary} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            {(results.crossover62vsFRA || results.crossover62vs70) && (
              <div className="mt-2 space-y-1 text-xs text-[#94A3B8]">
                {results.crossover62vsFRA && (
                  <p>FRA claiming overtakes age 62 claiming at age {results.crossover62vsFRA}</p>
                )}
                {results.crossover62vs70 && (
                  <p>Age 70 claiming overtakes age 62 claiming at age {results.crossover62vs70}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
