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
  LineChart,
  Line,
  Legend,
  Cell,
} from "recharts";
import wageGapData from "@/data/wage-gap-data.json";
import {
  AnimatedNumber,
  CurrencyInput,
  CustomSlider,
  ShareResults,
  StatCard,
} from "@/components/ui";
import { formatCurrency } from "@/lib/formatters";

const COLORS = {
  primary: "#22C55E",
  secondary: "#3B82F6",
  warning: "#F59E0B",
  danger: "#EF4444",
  purple: "#A855F7",
  bg: "#0B1120",
  surface: "#162032",
  border: "#1E293B",
  textPrimary: "#F1F5F9",
  textMuted: "#94A3B8",
};

const GENDERS = [
  { label: "Woman", value: "women" },
  { label: "Man", value: "men" },
];

const EDUCATION_LEVELS = [
  { label: "High School Diploma", value: "high_school" },
  { label: "Some College", value: "some_college" },
  { label: "Associate's Degree", value: "associates" },
  { label: "Bachelor's Degree", value: "bachelors" },
  { label: "Master's Degree", value: "masters" },
  { label: "Professional Degree (JD, MD)", value: "professional" },
  { label: "Doctorate (PhD)", value: "doctorate" },
];

const EXPERIENCE_RANGES = [
  { label: "0-2 years", value: "0-2" },
  { label: "3-5 years", value: "3-5" },
  { label: "6-10 years", value: "6-10" },
  { label: "11-15 years", value: "11-15" },
  { label: "16-20 years", value: "16-20" },
  { label: "21-30 years", value: "21-30" },
  { label: "30+ years", value: "30+" },
];

const STATES = [
  { label: "National Average", value: "National" },
  { label: "Alabama", value: "AL" }, { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" }, { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" }, { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" }, { label: "Delaware", value: "DE" },
  { label: "District of Columbia", value: "DC" }, { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" }, { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" }, { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" }, { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" }, { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" }, { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" }, { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" }, { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" }, { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" }, { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" }, { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" }, { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" }, { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" }, { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" }, { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" }, { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" }, { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" }, { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" }, { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" }, { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" }, { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
];

export function WageGapCalculatorWidget() {
  const [state, setState, getShareUrl] = useCalculatorState({
    defaults: {
      salary: 55000,
      gender: "women",
      occupation: 0,
      experience: "6-10",
      education: "bachelors",
      stateRegion: "National",
    },
  });

  const results = useMemo(() => {
    const occ = wageGapData.occupations[state.occupation];
    const edMult =
      wageGapData.education_multipliers[
        state.education as keyof typeof wageGapData.education_multipliers
      ] || 1;
    const expMult =
      wageGapData.experience_multipliers[
        state.experience as keyof typeof wageGapData.experience_multipliers
      ] || 1;
    const stateAdj =
      wageGapData.state_adjustments[
        state.stateRegion as keyof typeof wageGapData.state_adjustments
      ] || 1;

    // Compute adjusted medians for this occupation/education/experience/state
    const baseMen = occ.men * edMult * expMult * stateAdj;
    const baseWomen = occ.women * edMult * expMult * stateAdj;

    const yourMedian = state.gender === "women" ? baseWomen : baseMen;
    const otherMedian = state.gender === "women" ? baseMen : baseWomen;

    // Gap calculation
    const gapAmount = state.gender === "women" ? baseMen - baseWomen : baseWomen - baseMen;
    const gapPercent =
      otherMedian > 0
        ? ((otherMedian - yourMedian) / otherMedian) * 100
        : 0;

    // Unadjusted gap (overall)
    const unadjustedGapCents = wageGapData.overall.gap_cents;
    const unadjustedGapPercent = (1 - unadjustedGapCents) * 100;

    // Career cost over 10/20/30 years with 3% annual growth
    const annualGrowth = 0.03;
    const careerCost = [10, 20, 30].map((years) => {
      let totalGap = 0;
      for (let y = 0; y < years; y++) {
        totalGap += Math.abs(gapAmount) * Math.pow(1 + annualGrowth, y);
      }
      return { years, cost: Math.round(totalGap) };
    });

    // Career earnings comparison (line chart)
    const careerData: {
      year: number;
      yourEarnings: number;
      medianEarnings: number;
    }[] = [];
    let yourCumulative = 0;
    let otherCumulative = 0;
    for (let y = 0; y <= 30; y++) {
      if (y > 0) {
        yourCumulative += yourMedian * Math.pow(1 + annualGrowth, y - 1);
        otherCumulative += otherMedian * Math.pow(1 + annualGrowth, y - 1);
      }
      careerData.push({
        year: y,
        yourEarnings: Math.round(yourCumulative),
        medianEarnings: Math.round(otherCumulative),
      });
    }

    return {
      yourMedian: Math.round(yourMedian),
      otherMedian: Math.round(otherMedian),
      gapAmount: Math.round(Math.abs(gapAmount)),
      gapPercent: Math.abs(gapPercent),
      isUnderpaid: state.gender === "women" ? baseWomen < baseMen : baseMen < baseWomen,
      unadjustedGapPercent,
      careerCost,
      careerData,
      occupationName: occ.category,
    };
  }, [state.salary, state.gender, state.occupation, state.experience, state.education, state.stateRegion]);

  const barData = [
    {
      name: "Women",
      salary: state.gender === "women" ? results.yourMedian : results.otherMedian,
    },
    {
      name: "Men",
      salary: state.gender === "men" ? results.yourMedian : results.otherMedian,
    },
  ];

  const shareResultsData: Record<string, string> = {
    "Your Salary": formatCurrency(state.salary),
    "Your Median": formatCurrency(results.yourMedian),
    "Other Gender Median": formatCurrency(results.otherMedian),
    "Gap Percentage": `${results.gapPercent.toFixed(1)}%`,
    "Gap Amount": formatCurrency(results.gapAmount),
    "Career Cost (10yr)": formatCurrency(results.careerCost[0]?.cost || 0),
    "Career Cost (30yr)": formatCurrency(results.careerCost[2]?.cost || 0),
  };

  const selectClass =
    "h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] p-3 text-[#F1F5F9] focus:border-[#3B82F6] focus:outline-none";

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#162032] p-6 md:p-8">
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          {/* Salary */}
          <div>
            <CurrencyInput
              label="Your Annual Salary"
              value={state.salary}
              onChange={(v) => setState('salary', v)}
              min={0}
              max={500000}
              step={1000}
            />
            <CustomSlider
              value={state.salary}
              onChange={(v) => setState('salary', v)}
              min={20000}
              max={500000}
              step={1000}
              formatValue={(v) =>
                v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
              }
              className="mt-3"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Your Gender
            </label>
            <div className="flex gap-2" role="radiogroup" aria-label="Your Gender">
              {GENDERS.map((g) => (
                <button
                  key={g.value}
                  role="radio"
                  aria-checked={state.gender === g.value}
                  onClick={() => setState('gender', g.value)}
                  className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                    state.gender === g.value
                      ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                      : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Occupation */}
          <div>
            <label htmlFor="wg-occupation" className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Occupation / Industry
            </label>
            <select
              id="wg-occupation"
              value={state.occupation}
              onChange={(e) => setState('occupation', Number(e.target.value))}
              className={selectClass}
            >
              {wageGapData.occupations.map((occ, idx) => (
                <option key={idx} value={idx}>
                  {occ.category}
                </option>
              ))}
            </select>
          </div>

          {/* Experience */}
          <div>
            <label htmlFor="wg-experience" className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Years of Experience
            </label>
            <select
              id="wg-experience"
              value={state.experience}
              onChange={(e) => setState('experience', e.target.value)}
              className={selectClass}
            >
              {EXPERIENCE_RANGES.map((exp) => (
                <option key={exp.value} value={exp.value}>
                  {exp.label}
                </option>
              ))}
            </select>
          </div>

          {/* Education */}
          <div>
            <label htmlFor="wg-education" className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Education Level
            </label>
            <select
              id="wg-education"
              value={state.education}
              onChange={(e) => setState('education', e.target.value)}
              className={selectClass}
            >
              {EDUCATION_LEVELS.map((ed) => (
                <option key={ed.value} value={ed.value}>
                  {ed.label}
                </option>
              ))}
            </select>
          </div>

          {/* State / Region */}
          <div>
            <label htmlFor="wg-state" className="mb-2 block text-sm font-medium text-[#94A3B8]">
              State / Region
            </label>
            <select
              id="wg-state"
              value={state.stateRegion}
              onChange={(e) => setState('stateRegion', e.target.value)}
              className={selectClass}
            >
              {STATES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Primary Result: Gap Amount */}
          <div className="rounded-lg border border-l-[3px] border-[#1E293B] border-l-[#F59E0B] bg-[#0B1120] p-5">
            <p className="mb-1 text-sm text-[#94A3B8]">
              Estimated Median for Your Demographic
            </p>
            <AnimatedNumber
              value={results.yourMedian}
              format="currency"
              decimals={0}
              className="font-mono text-2xl sm:text-3xl font-bold text-[#22C55E] inline-block transition-transform duration-150"
            />
            <p className="mt-1 text-xs text-[#94A3B8]">
              {results.occupationName} &middot;{" "}
              {state.gender === "women" ? "Women" : "Men"}
            </p>
          </div>

          {/* Gap Amount */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-1 text-xs text-[#94A3B8]">Annual Gap Amount</p>
            <AnimatedNumber
              value={results.gapAmount}
              format="currency"
              decimals={0}
              className="font-mono text-2xl font-bold text-[#F59E0B] inline-block"
            />
          </div>

          {/* Career Cost */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-1 text-xs text-[#94A3B8]">Career Cost (30yr)</p>
            <AnimatedNumber
              value={results.careerCost[2]?.cost || 0}
              format="currency"
              decimals={0}
              className="font-mono text-2xl font-bold text-[#EF4444] inline-block"
            />
          </div>

          {/* StatCard Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <StatCard
              label="Your Salary"
              highlight
              value={
                <AnimatedNumber
                  value={state.salary}
                  format="compact"
                  decimals={1}
                  className="font-mono text-2xl font-bold text-[#22C55E] inline-block"
                />
              }
              className="col-span-2"
            />
            <StatCard
              label="Median for You"
              value={
                <AnimatedNumber
                  value={results.yourMedian}
                  format="currency"
                  decimals={0}
                  className="font-mono text-lg font-bold text-[#3B82F6] inline-block"
                />
              }
            />
            <StatCard
              label="Other Gender Median"
              value={
                <AnimatedNumber
                  value={results.otherMedian}
                  format="currency"
                  decimals={0}
                  className="font-mono text-lg font-bold text-[#A855F7] inline-block"
                />
              }
            />
            <StatCard
              label="Gap %"
              value={
                <AnimatedNumber
                  value={results.gapPercent}
                  format="percent"
                  decimals={1}
                  className="font-mono text-lg font-bold text-[#F59E0B] inline-block"
                />
              }
            />
            <StatCard
              label="Career Cost (10yr)"
              value={
                <AnimatedNumber
                  value={results.careerCost[0]?.cost || 0}
                  format="compact"
                  decimals={1}
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
            />
            <StatCard
              label="Career Cost (30yr)"
              value={
                <AnimatedNumber
                  value={results.careerCost[2]?.cost || 0}
                  format="compact"
                  decimals={1}
                  className="font-mono text-lg font-bold text-[#EF4444] inline-block"
                />
              }
              trend="down"
              className="col-span-2"
            />
          </div>

          {/* Share Results */}
          <ShareResults
            title="Wage Gap Analysis"
            results={shareResultsData}
            getShareUrl={getShareUrl}
          />

          {/* Adjusted vs Unadjusted Context */}
          <div className="rounded-lg border border-[#3B82F6]/30 bg-[#3B82F6]/5 p-4">
            <p className="mb-2 text-sm font-medium text-[#3B82F6]">
              Adjusted vs. Unadjusted Gap
            </p>
            <p className="text-sm text-[#94A3B8]">
              The <strong className="text-[#F1F5F9]">unadjusted</strong> (raw) national wage
              gap is approximately{" "}
              <strong className="text-[#F1F5F9]">
                {results.unadjustedGapPercent.toFixed(1)}%
              </strong>{" "}
              — women earn about 83 cents for every dollar men earn across all
              occupations. The <strong className="text-[#F1F5F9]">adjusted</strong> gap shown
              above accounts for your specific occupation, education,
              experience, and location, which typically narrows the gap but does
              not eliminate it entirely.
            </p>
          </div>

          {/* Career Cost Breakdown */}
          <div className="rounded-lg border border-[#EF4444]/30 bg-[#EF4444]/5 p-4">
            <p className="mb-3 text-sm font-medium text-[#EF4444]">
              Lifetime Cost of the Gap (with 3% annual growth)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              {results.careerCost.map((item) => (
                <div key={item.years} className="text-center">
                  <p className="text-xs text-[#94A3B8]">{item.years} Years</p>
                  <p className="font-mono text-base font-bold text-[#F1F5F9]">
                    {formatCurrency(item.cost)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart - Median Comparison */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">
              Median Salary Comparison
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={barData}
                layout="vertical"
                margin={{ left: 10, right: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={COLORS.border}
                  horizontal={false}
                />
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
                  width={70}
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
                <Bar dataKey="salary" radius={[0, 4, 4, 0]}>
                  <Cell fill={COLORS.purple} />
                  <Cell fill={COLORS.secondary} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Career Earnings Gap Over Time */}
      <div className="mt-8 rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
        <p className="mb-3 text-sm font-medium text-[#94A3B8]">
          Cumulative Career Earnings Gap Over Time
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={results.careerData}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis
              dataKey="year"
              stroke={COLORS.textMuted}
              tick={{ fontSize: 12 }}
              label={{
                value: "Years",
                position: "insideBottom",
                offset: -5,
                fill: COLORS.textMuted,
              }}
            />
            <YAxis
              stroke={COLORS.textMuted}
              tick={{ fontSize: 12 }}
              tickFormatter={(v) =>
                v >= 1000000
                  ? `$${(v / 1000000).toFixed(1)}M`
                  : `$${(v / 1000).toFixed(0)}k`
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                borderRadius: "8px",
                color: COLORS.textPrimary,
              }}
              formatter={(value, name) => [
                formatCurrency(value as number),
                name === "yourEarnings"
                  ? `${state.gender === "women" ? "Women" : "Men"}'s Earnings`
                  : `${state.gender === "women" ? "Men" : "Women"}'s Earnings`,
              ]}
            />
            <Legend
              wrapperStyle={{ color: COLORS.textMuted, fontSize: 12 }}
              formatter={(value) =>
                value === "yourEarnings"
                  ? `${state.gender === "women" ? "Women" : "Men"}'s Cumulative Earnings`
                  : `${state.gender === "women" ? "Men" : "Women"}'s Cumulative Earnings`
              }
            />
            <Line
              type="monotone"
              dataKey="yourEarnings"
              stroke={COLORS.purple}
              strokeWidth={2}
              dot={false}
              name="yourEarnings"
            />
            <Line
              type="monotone"
              dataKey="medianEarnings"
              stroke={COLORS.secondary}
              strokeWidth={2}
              dot={false}
              name="medianEarnings"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
