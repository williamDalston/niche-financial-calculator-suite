"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { useCalculatorState } from "@/hooks/use-calculator-state";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { CurrencyInput } from "@/components/ui/currency-input";
import { formatCurrency, formatCurrencyExact } from "@/lib/formatters";

/* ------------------------------------------------------------------ */
/*  Design tokens                                                      */
/* ------------------------------------------------------------------ */

const COLORS = {
  principal: "#3B82F6",
  interest: "#22C55E",
  warning: "#F59E0B",
  bg: "#0B1120",
  surface: "#162032",
  border: "#1E293B",
  textPrimary: "#F1F5F9",
  textMuted: "#94A3B8",
};

const LOAN_TERMS = [15, 20, 30] as const;

/* ------------------------------------------------------------------ */
/*  Custom Slider component (inline)                                   */
/* ------------------------------------------------------------------ */

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  formatLabel?: (v: number) => string;
  showTooltip?: boolean;
  tooltipContent?: string;
}

function Slider({
  min,
  max,
  step,
  value,
  onChange,
  formatLabel,
  showTooltip = false,
  tooltipContent,
}: SliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative mt-3 mb-1 group">
      {/* Tooltip above thumb */}
      {showTooltip && isDragging && tooltipContent && (
        <div
          className="absolute -top-9 z-10 rounded-md bg-[#162032] border border-[#1E293B] px-2 py-1 text-xs font-mono text-[#F1F5F9] whitespace-nowrap pointer-events-none transition-opacity duration-150"
          style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
        >
          {tooltipContent}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderTop: "4px solid #1E293B",
            }}
          />
        </div>
      )}

      {/* Track */}
      <div className="relative h-2 rounded-full bg-[#1E293B]">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#22C55E] to-[#4ADE80] transition-all duration-75"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Native range input (invisible, on top for accessibility) */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onBlur={() => setIsDragging(false)}
        className="absolute inset-0 h-2 w-full cursor-pointer opacity-0"
        style={{ marginTop: 0 }}
        aria-label="slider"
      />

      {/* Custom thumb */}
      <div
        className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-[#22C55E] bg-[#0B1120] shadow-lg shadow-[#22C55E]/20 transition-transform duration-100 pointer-events-none"
        style={{
          left: `${pct}%`,
          transform: `translate(-50%, -50%) scale(${isDragging ? 1.2 : 1})`,
        }}
      />

      {/* Min/Max labels */}
      {formatLabel && (
        <div className="flex justify-between mt-2 text-xs text-[#94A3B8]">
          <span>{formatLabel(min)}</span>
          <span>{formatLabel(max)}</span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat Card component (inline)                                       */
/* ------------------------------------------------------------------ */

interface StatCardProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  subtext?: string;
  colorClass?: string;
  className?: string;
}

function StatCard({
  label,
  icon,
  children,
  subtext,
  colorClass = "text-[#F1F5F9]",
  className = "",
}: StatCardProps) {
  return (
    <div
      className={`rounded-xl border border-[#1E293B] bg-[#0B1120] p-4 hover-lift ${className}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[#94A3B8]">{icon}</span>
        <p className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider">
          {label}
        </p>
      </div>
      <div className={`font-mono text-lg font-bold ${colorClass}`}>
        {children}
      </div>
      {subtext && (
        <p className="mt-1 text-xs text-[#94A3B8]">{subtext}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section Header                                                     */
/* ------------------------------------------------------------------ */

function SectionHeader({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-[#3B82F6]">{icon}</span>
      <h3 className="font-display text-sm font-semibold text-[#94A3B8] uppercase tracking-wider">
        {label}
      </h3>
      <div className="flex-1 h-px bg-[#1E293B]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Chart Tab component                                                */
/* ------------------------------------------------------------------ */

type ChartTab = "pie" | "amortization" | "table";

function ChartTabs({
  active,
  onChange,
}: {
  active: ChartTab;
  onChange: (tab: ChartTab) => void;
}) {
  const tabs: { key: ChartTab; label: string; icon: React.ReactNode }[] = [
    {
      key: "pie",
      label: "Breakdown",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
          <path d="M22 12A10 10 0 0 0 12 2v10z" />
        </svg>
      ),
    },
    {
      key: "amortization",
      label: "Over Time",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
        </svg>
      ),
    },
    {
      key: "table",
      label: "Schedule",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
          <line x1="9" y1="3" x2="9" y2="21" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex gap-1 rounded-lg bg-[#0B1120] p-1 border border-[#1E293B]">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex items-center gap-1.5 flex-1 justify-center rounded-md px-3 py-2 text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/50 ${
            active === tab.key
              ? "bg-[#162032] text-[#22C55E] shadow-sm"
              : "text-[#94A3B8] hover:text-[#F1F5F9]"
          }`}
        >
          {tab.icon}
          <span className="hidden sm:inline">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Share / Copy / Print bar                                           */
/* ------------------------------------------------------------------ */

function ShareBar({ resultText, getShareUrl }: { resultText: string; getShareUrl?: () => string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Fallback for older browsers */
      const ta = document.createElement("textarea");
      ta.value = resultText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [resultText]);

  const handleShare = useCallback(async () => {
    const url = getShareUrl ? getShareUrl() : window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mortgage Calculation — CalcEngine.io",
          text: resultText,
          url,
        });
      } catch {
        /* User cancelled or share failed silently */
      }
    } else {
      handleCopy();
    }
  }, [resultText, handleCopy, getShareUrl]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const btnClass =
    "flex items-center gap-1.5 rounded-lg border border-[#1E293B] bg-[#0B1120] px-3 py-2 text-xs font-medium text-[#94A3B8] transition-all duration-200 hover:border-[#3B82F6]/50 hover:text-[#F1F5F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/50";

  return (
    <div className="flex flex-wrap gap-2 no-print" data-no-print>
      <button onClick={handleCopy} className={btnClass}>
        {copied ? (
          <svg className="w-3.5 h-3.5 text-[#22C55E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20,6 9,17 4,12" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
        {copied ? "Copied!" : "Copy Results"}
      </button>

      <button onClick={handleShare} className={btnClass}>
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        Share
      </button>

      <button onClick={handlePrint} className={btnClass}>
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6,9 6,2 18,2 18,9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
        Print
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons (inline SVGs for stat cards)                                 */
/* ------------------------------------------------------------------ */

const IconHome = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </svg>
);

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

const IconCalendar = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconInfo = (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const IconWarning = (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Custom Recharts Tooltip                                            */
/* ------------------------------------------------------------------ */

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string | number;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-[#1E293B] bg-[#162032] px-3 py-2 shadow-xl">
      {label !== undefined && (
        <p className="text-xs text-[#94A3B8] mb-1 font-medium">
          {typeof label === "number" ? `Year ${label}` : label}
        </p>
      )}
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-[#94A3B8]">{entry.name}:</span>
          <span className="font-mono font-medium text-[#F1F5F9]">
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

function PieTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-[#1E293B] bg-[#162032] px-3 py-2 shadow-xl">
      <div className="flex items-center gap-2 text-xs">
        <span className="text-[#94A3B8]">{item.name}:</span>
        <span className="font-mono font-medium text-[#F1F5F9]">
          {formatCurrency(item.value)}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Calculator Widget                                             */
/* ------------------------------------------------------------------ */

export function MortgageCalculatorWidget() {
  /* ---------- State ---------- */
  const [state, setCalcState, getShareUrl] = useCalculatorState({
    defaults: { homePrice: 400000, downPaymentPercent: 20, interestRate: 6.5, loanTerm: 30 },
  });
  const { homePrice, downPaymentPercent, interestRate, loanTerm } = state;

  const [downPaymentDollars, setDownPaymentDollars] = useState(
    () => state.homePrice * (state.downPaymentPercent / 100)
  );
  const [downPaymentMode, setDownPaymentMode] = useState<"percent" | "dollars">(
    "percent"
  );
  const [activeChart, setActiveChart] = useState<ChartTab>("pie");
  const [showAllRows, setShowAllRows] = useState(false);
  const [annualIncome, setAnnualIncome] = useState<number | null>(null);
  const [showIncomeField, setShowIncomeField] = useState(false);

  const tableRef = useRef<HTMLDivElement>(null);

  /* ---------- Derived values ---------- */
  const downPayment =
    downPaymentMode === "percent"
      ? homePrice * (downPaymentPercent / 100)
      : downPaymentDollars;

  const effectiveDownPaymentPct =
    homePrice > 0 ? (downPayment / homePrice) * 100 : 0;

  /* ---------- Calculations ---------- */
  const results = useMemo(() => {
    const principal = Math.max(homePrice - downPayment, 0);
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    if (principal <= 0 || interestRate <= 0) {
      return {
        monthlyPayment: 0,
        totalInterest: 0,
        totalCost: 0,
        principal,
        amortizationYearly: [] as {
          year: number;
          principalPaid: number;
          interestPaid: number;
          balance: number;
          totalPrincipal: number;
          totalInterest: number;
        }[],
        amortizationMonthly: [] as {
          month: number;
          payment: number;
          principalPaid: number;
          interestPaid: number;
          balance: number;
        }[],
      };
    }

    const factor = Math.pow(1 + monthlyRate, numPayments);
    const monthlyPayment =
      principal * ((monthlyRate * factor) / (factor - 1));
    const totalCost = monthlyPayment * numPayments;
    const totalInterest = totalCost - principal;

    /* Monthly amortization schedule */
    const amortizationMonthly: {
      month: number;
      payment: number;
      principalPaid: number;
      interestPaid: number;
      balance: number;
    }[] = [];

    /* Yearly summary for chart */
    const amortizationYearly: {
      year: number;
      principalPaid: number;
      interestPaid: number;
      balance: number;
      totalPrincipal: number;
      totalInterest: number;
    }[] = [];

    let balance = principal;
    let cumulativePrincipal = 0;
    let cumulativeInterest = 0;

    for (let m = 1; m <= numPayments; m++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance = Math.max(balance - principalPayment, 0);

      cumulativePrincipal += principalPayment;
      cumulativeInterest += interestPayment;

      amortizationMonthly.push({
        month: m,
        payment: Math.round(monthlyPayment * 100) / 100,
        principalPaid: Math.round(principalPayment * 100) / 100,
        interestPaid: Math.round(interestPayment * 100) / 100,
        balance: Math.round(balance * 100) / 100,
      });

      /* Yearly snapshot at end of each year */
      if (m % 12 === 0) {
        const year = m / 12;
        const yearStart = (year - 1) * 12;
        let yearPrincipal = 0;
        let yearInterest = 0;
        for (let i = yearStart; i < m; i++) {
          yearPrincipal += amortizationMonthly[i].principalPaid;
          yearInterest += amortizationMonthly[i].interestPaid;
        }
        amortizationYearly.push({
          year,
          principalPaid: Math.round(yearPrincipal),
          interestPaid: Math.round(yearInterest),
          balance: Math.round(balance),
          totalPrincipal: Math.round(cumulativePrincipal),
          totalInterest: Math.round(cumulativeInterest),
        });
      }
    }

    return {
      monthlyPayment,
      totalInterest,
      totalCost,
      principal,
      amortizationYearly,
      amortizationMonthly,
    };
  }, [homePrice, downPayment, interestRate, loanTerm]);

  /* ---------- Payoff date ---------- */
  const payoffDate = useMemo(() => {
    const now = new Date();
    const months = loanTerm * 12;
    const payoff = new Date(now.getFullYear(), now.getMonth() + months, 1);
    return payoff.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }, [loanTerm]);

  /* ---------- Pie data ---------- */
  const pieData = [
    { name: "Principal", value: Math.round(results.principal) },
    { name: "Total Interest", value: Math.round(results.totalInterest) },
  ];

  /* ---------- Smart feedback ---------- */
  const showPmiWarning = effectiveDownPaymentPct < 20 && effectiveDownPaymentPct > 0;
  const showHighRateWarning = interestRate > 8;
  const showLowRateWarning = interestRate < 3 && interestRate > 0;
  const monthlyIncomeRatio =
    annualIncome && annualIncome > 0
      ? (results.monthlyPayment / (annualIncome / 12)) * 100
      : null;

  /* ---------- Share text ---------- */
  const shareText = useMemo(
    () =>
      [
        `Mortgage Calculation — CalcEngine.io`,
        ``,
        `Home Price: ${formatCurrency(homePrice)}`,
        `Down Payment: ${formatCurrency(downPayment)} (${effectiveDownPaymentPct.toFixed(1)}%)`,
        `Loan Amount: ${formatCurrency(results.principal)}`,
        `Interest Rate: ${interestRate}%`,
        `Loan Term: ${loanTerm} years`,
        ``,
        `Monthly Payment: ${formatCurrencyExact(results.monthlyPayment)}`,
        `Total Interest: ${formatCurrency(results.totalInterest)}`,
        `Total Cost: ${formatCurrency(results.totalCost)}`,
        `Payoff Date: ${payoffDate}`,
      ].join("\n"),
    [
      homePrice,
      downPayment,
      effectiveDownPaymentPct,
      results,
      interestRate,
      loanTerm,
      payoffDate,
    ]
  );

  /* ---------- Event handlers ---------- */
  const handleHomePriceChange = useCallback(
    (val: number) => {
      setCalcState("homePrice", val);
      if (downPaymentMode === "percent") {
        setDownPaymentDollars(
          Math.round((val * downPaymentPercent) / 100)
        );
      }
    },
    [downPaymentMode, downPaymentPercent, setCalcState]
  );

  const handleDownPaymentPercentChange = useCallback(
    (val: number) => {
      setCalcState("downPaymentPercent", val);
      setDownPaymentDollars(Math.round((homePrice * val) / 100));
      setDownPaymentMode("percent");
    },
    [homePrice, setCalcState]
  );

  const handleDownPaymentDollarsChange = useCallback(
    (val: number) => {
      setDownPaymentDollars(val);
      setCalcState("downPaymentPercent",
        homePrice > 0
          ? Math.round((val / homePrice) * 10000) / 100
          : 0
      );
      setDownPaymentMode("dollars");
    },
    [homePrice, setCalcState]
  );

  /* ---------- Table rows ---------- */
  const visibleMonths = showAllRows
    ? results.amortizationMonthly
    : results.amortizationMonthly.slice(0, 12);

  const totalSchedulePrincipal = results.amortizationMonthly.reduce(
    (s, r) => s + r.principalPaid,
    0
  );
  const totalScheduleInterest = results.amortizationMonthly.reduce(
    (s, r) => s + r.interestPaid,
    0
  );

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  return (
    <div className="rounded-2xl border border-[#1E293B] bg-[#162032] p-4 sm:p-6 md:p-8">
      {/* ============================================================ */}
      {/*  TWO-COLUMN LAYOUT: Inputs (left) + Results (right)          */}
      {/* ============================================================ */}
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        {/* ---------------------------------------------------------- */}
        {/*  LEFT: INPUTS                                               */}
        {/* ---------------------------------------------------------- */}
        <div className="space-y-8">
          {/* -- Loan Details Group -- */}
          <div>
            <SectionHeader
              icon={IconHome}
              label="Loan Details"
            />

            <div className="space-y-6">
              {/* Home Price */}
              <div>
                <CurrencyInput
                  label="Home Price"
                  value={homePrice}
                  onChange={handleHomePriceChange}
                  min={0}
                  max={10000000}
                  step={5000}
                />
                <Slider
                  min={50000}
                  max={2000000}
                  step={5000}
                  value={Math.min(Math.max(homePrice, 50000), 2000000)}
                  onChange={handleHomePriceChange}
                  formatLabel={(v) =>
                    v >= 1000000
                      ? `$${(v / 1000000).toFixed(1)}M`
                      : `$${(v / 1000).toFixed(0)}k`
                  }
                />
              </div>

              {/* Down Payment */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
                  Down Payment
                </label>
                <div className="flex gap-2">
                  <CurrencyInput
                    value={downPaymentDollars}
                    onChange={handleDownPaymentDollarsChange}
                    min={0}
                    max={homePrice}
                    step={1000}
                    className="flex-1"
                  />
                  <div className="w-24">
                    <div className="relative">
                      <input
                        type="number"
                        value={downPaymentPercent}
                        onChange={(e) =>
                          handleDownPaymentPercentChange(
                            Number(e.target.value)
                          )
                        }
                        className="h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] pl-3 pr-8 py-3 text-[#F1F5F9] font-body transition-colors focus:border-[#3B82F6] focus:outline-none focus:ring-[3px] focus:ring-[#3B82F6]/15"
                        min={0}
                        max={100}
                        step={0.5}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none">
                        %
                      </span>
                    </div>
                  </div>
                </div>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={Math.min(
                    Math.max(effectiveDownPaymentPct, 0),
                    100
                  )}
                  onChange={handleDownPaymentPercentChange}
                  formatLabel={(v) => `${v}%`}
                  showTooltip
                  tooltipContent={`${effectiveDownPaymentPct.toFixed(
                    1
                  )}% = ${formatCurrency(downPayment)}`}
                />

                {/* PMI Warning */}
                {showPmiWarning && (
                  <div className="mt-2 flex items-start gap-2 rounded-lg border border-[#F59E0B]/20 bg-[#F59E0B]/5 px-3 py-2 animate-fade-in-up">
                    <span className="mt-0.5 text-[#F59E0B] shrink-0">
                      {IconWarning}
                    </span>
                    <p className="text-xs text-[#F59E0B]/90">
                      PMI may be required for down payments below 20%.
                      This adds approximately 0.5-1% of the loan amount
                      annually to your payment.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* -- Payment Details Group -- */}
          <div>
            <SectionHeader
              icon={IconDollar}
              label="Payment Details"
            />

            <div className="space-y-6">
              {/* Interest Rate */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
                  Interest Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) =>
                      setCalcState("interestRate", Number(e.target.value))
                    }
                    className="h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] pl-3 pr-8 py-3 text-[#F1F5F9] font-body transition-colors focus:border-[#3B82F6] focus:outline-none focus:ring-[3px] focus:ring-[#3B82F6]/15"
                    min={0}
                    max={15}
                    step={0.125}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none">
                    %
                  </span>
                </div>
                <Slider
                  min={0}
                  max={15}
                  step={0.125}
                  value={Math.min(Math.max(interestRate, 0), 15)}
                  onChange={(v) => setCalcState("interestRate", v)}
                  formatLabel={(v) => `${v}%`}
                />

                {/* Rate warnings */}
                {showHighRateWarning && (
                  <div className="mt-2 flex items-start gap-2 rounded-lg border border-[#3B82F6]/20 bg-[#3B82F6]/5 px-3 py-2 animate-fade-in-up">
                    <span className="mt-0.5 text-[#3B82F6] shrink-0">
                      {IconInfo}
                    </span>
                    <p className="text-xs text-[#3B82F6]/90">
                      This rate is above historical averages. Consider
                      shopping multiple lenders or improving your credit
                      score to qualify for better rates.
                    </p>
                  </div>
                )}
                {showLowRateWarning && (
                  <div className="mt-2 flex items-start gap-2 rounded-lg border border-[#3B82F6]/20 bg-[#3B82F6]/5 px-3 py-2 animate-fade-in-up">
                    <span className="mt-0.5 text-[#3B82F6] shrink-0">
                      {IconInfo}
                    </span>
                    <p className="text-xs text-[#3B82F6]/90">
                      This rate is below current market averages.
                      Verify this rate is available from your lender.
                    </p>
                  </div>
                )}
              </div>

              {/* Loan Term */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
                  Loan Term
                </label>
                <div className="flex gap-2">
                  {LOAN_TERMS.map((term) => (
                    <button
                      key={term}
                      onClick={() => setCalcState("loanTerm", term)}
                      className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/50 ${
                        loanTerm === term
                          ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E] shadow-[0_0_12px_rgba(34,197,94,0.15)]"
                          : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
                      }`}
                    >
                      {term} yr
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional: Income field */}
              <div>
                {!showIncomeField ? (
                  <button
                    onClick={() => setShowIncomeField(true)}
                    className="text-xs text-[#3B82F6] hover:text-[#22C55E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/50 rounded"
                  >
                    + Add annual income to see payment-to-income ratio
                  </button>
                ) : (
                  <div className="animate-fade-in-up">
                    <CurrencyInput
                      label="Annual Gross Income (optional)"
                      value={annualIncome ?? 0}
                      onChange={(v) =>
                        setAnnualIncome(v > 0 ? v : null)
                      }
                      min={0}
                      max={10000000}
                      step={5000}
                    />
                    {monthlyIncomeRatio !== null && (
                      <p
                        className={`mt-2 text-xs ${
                          monthlyIncomeRatio > 28
                            ? "text-[#F59E0B]"
                            : "text-[#22C55E]"
                        }`}
                      >
                        Monthly payment is{" "}
                        <span className="font-mono font-medium">
                          {monthlyIncomeRatio.toFixed(1)}%
                        </span>{" "}
                        of your gross monthly income.
                        {monthlyIncomeRatio > 28
                          ? " Most lenders recommend keeping this below 28%."
                          : " This is within the recommended 28% guideline."}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/*  RIGHT: RESULTS DASHBOARD                                   */}
        {/* ---------------------------------------------------------- */}
        <div className="space-y-6">
          {/* -- Primary Result: Monthly Payment -- */}
          <div className="rounded-xl border border-[#1E293B] bg-[#0B1120] p-6 text-center">
            <p className="mb-2 text-sm font-medium text-[#94A3B8] uppercase tracking-wider">
              Monthly Payment
            </p>
            <AnimatedNumber
              value={results.monthlyPayment}
              format="currency"
              decimals={2}
              duration={500}
              className="font-mono text-4xl sm:text-5xl font-bold text-[#22C55E] result-glow inline-block transition-transform duration-150"
            />
            <p className="mt-2 text-xs text-[#94A3B8]">
              Principal & Interest only
            </p>
          </div>

          {/* -- 2x2 Stat Cards Grid -- */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="Loan Amount"
              icon={IconHome}
              colorClass="text-[#3B82F6]"
            >
              <AnimatedNumber
                value={results.principal}
                format="currency"
                duration={500}
                className="font-mono text-lg font-bold text-[#3B82F6] inline-block transition-transform duration-150"
              />
            </StatCard>

            <StatCard
              label="Total Interest"
              icon={IconTrendingUp}
              colorClass="text-[#F59E0B]"
              subtext={
                results.principal > 0
                  ? `${Math.round(
                      (results.totalInterest / results.principal) * 100
                    )}% of principal`
                  : undefined
              }
            >
              <AnimatedNumber
                value={results.totalInterest}
                format="currency"
                duration={500}
                className="font-mono text-lg font-bold text-[#F59E0B] inline-block transition-transform duration-150"
              />
            </StatCard>

            <StatCard
              label="Total Cost"
              icon={IconDollar}
              colorClass="text-[#F1F5F9]"
            >
              <AnimatedNumber
                value={results.totalCost}
                format="currency"
                duration={500}
                className="font-mono text-lg font-bold text-[#F1F5F9] inline-block transition-transform duration-150"
              />
            </StatCard>

            <StatCard
              label="Payoff Date"
              icon={IconCalendar}
              colorClass="text-[#F1F5F9]"
              subtext={`${loanTerm} year term`}
            >
              <span className="font-mono text-lg font-bold text-[#F1F5F9]">
                {payoffDate}
              </span>
            </StatCard>
          </div>

          {/* -- Share Bar -- */}
          <ShareBar resultText={shareText} getShareUrl={getShareUrl} />

          {/* -- Chart Tabs -- */}
          {results.principal > 0 && (
            <div className="space-y-4">
              <ChartTabs active={activeChart} onChange={setActiveChart} />

              {/* Pie Chart */}
              {activeChart === "pie" && (
                <div className="rounded-xl border border-[#1E293B] bg-[#0B1120] p-5 animate-fade-in-up">
                  <p className="mb-4 text-sm font-medium text-[#94A3B8]">
                    Principal vs Interest
                  </p>
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={95}
                        paddingAngle={3}
                        dataKey="value"
                        stroke="none"
                        animationBegin={0}
                        animationDuration={800}
                        animationEasing="ease-out"
                      >
                        <Cell fill={COLORS.principal} />
                        <Cell fill={COLORS.interest} />
                      </Pie>
                      <Tooltip
                        content={<PieTooltip />}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Legend */}
                  <div className="mt-3 flex justify-center gap-6 text-xs">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-sm"
                        style={{
                          backgroundColor: COLORS.principal,
                        }}
                      />
                      <span className="text-[#94A3B8]">
                        Principal (
                        {results.totalCost > 0
                          ? Math.round(
                              (results.principal / results.totalCost) *
                                100
                            )
                          : 0}
                        %)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-sm"
                        style={{
                          backgroundColor: COLORS.interest,
                        }}
                      />
                      <span className="text-[#94A3B8]">
                        Interest (
                        {results.totalCost > 0
                          ? Math.round(
                              (results.totalInterest /
                                results.totalCost) *
                                100
                            )
                          : 0}
                        %)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Amortization Area Chart */}
              {activeChart === "amortization" && (
                <div className="rounded-xl border border-[#1E293B] bg-[#0B1120] p-5 animate-fade-in-up">
                  <p className="mb-4 text-sm font-medium text-[#94A3B8]">
                    Balance Over Time
                  </p>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={results.amortizationYearly}>
                      <defs>
                        <linearGradient
                          id="gradBalance"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={COLORS.principal}
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor={COLORS.principal}
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="gradPrincipal"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={COLORS.interest}
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor={COLORS.interest}
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="gradInterest"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={COLORS.warning}
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor={COLORS.warning}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={COLORS.border}
                        vertical={false}
                      />
                      <XAxis
                        dataKey="year"
                        stroke={COLORS.textMuted}
                        tick={{ fontSize: 11 }}
                        axisLine={{ stroke: COLORS.border }}
                        tickLine={false}
                      />
                      <YAxis
                        stroke={COLORS.textMuted}
                        tick={{ fontSize: 11 }}
                        tickFormatter={(v) =>
                          v >= 1000000
                            ? `$${(v / 1000000).toFixed(1)}M`
                            : `$${(v / 1000).toFixed(0)}k`
                        }
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        content={<CustomTooltip />}
                      />
                      <Legend
                        wrapperStyle={{
                          color: COLORS.textMuted,
                          fontSize: 11,
                          paddingTop: 8,
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="balance"
                        stroke={COLORS.principal}
                        strokeWidth={2}
                        fill="url(#gradBalance)"
                        name="Remaining Balance"
                        animationDuration={1000}
                        animationEasing="ease-out"
                      />
                      <Area
                        type="monotone"
                        dataKey="totalPrincipal"
                        stroke={COLORS.interest}
                        strokeWidth={2}
                        fill="url(#gradPrincipal)"
                        name="Cumulative Principal"
                        animationDuration={1000}
                        animationEasing="ease-out"
                      />
                      <Area
                        type="monotone"
                        dataKey="totalInterest"
                        stroke="#F59E0B"
                        strokeWidth={2}
                        fill="url(#gradInterest)"
                        name="Cumulative Interest"
                        animationDuration={1000}
                        animationEasing="ease-out"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Amortization Table */}
              {activeChart === "table" && (
                <div
                  className="animate-fade-in-up"
                  ref={tableRef}
                >
                  <div className="rounded-xl border border-[#1E293B] overflow-hidden">
                    <div className="max-h-[480px] overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="sticky top-0 z-10">
                          <tr className="border-b border-[#1E293B] bg-[#0B1120]">
                            <th className="px-3 py-3 text-left text-xs font-medium text-[#94A3B8] uppercase tracking-wider">
                              Month
                            </th>
                            <th className="px-3 py-3 text-right text-xs font-medium text-[#94A3B8] uppercase tracking-wider">
                              Payment
                            </th>
                            <th className="px-3 py-3 text-right text-xs font-medium text-[#94A3B8] uppercase tracking-wider">
                              Principal
                            </th>
                            <th className="px-3 py-3 text-right text-xs font-medium text-[#94A3B8] uppercase tracking-wider">
                              Interest
                            </th>
                            <th className="px-3 py-3 text-right text-xs font-medium text-[#94A3B8] uppercase tracking-wider">
                              Balance
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1E293B]/50">
                          {visibleMonths.map((row, i) => (
                            <tr
                              key={row.month}
                              className={`transition-colors duration-100 hover:bg-[#1E293B]/30 ${
                                i % 2 === 0
                                  ? "bg-[#162032]"
                                  : "bg-[#0B1120]/30"
                              }`}
                            >
                              <td className="px-3 py-2 text-[#F1F5F9] font-medium">
                                {row.month}
                              </td>
                              <td className="px-3 py-2 text-right font-mono text-[#F1F5F9]">
                                {formatCurrencyExact(row.payment)}
                              </td>
                              <td className="px-3 py-2 text-right font-mono text-[#3B82F6]">
                                {formatCurrencyExact(
                                  row.principalPaid
                                )}
                              </td>
                              <td className="px-3 py-2 text-right font-mono text-[#F59E0B]">
                                {formatCurrencyExact(
                                  row.interestPaid
                                )}
                              </td>
                              <td className="px-3 py-2 text-right font-mono text-[#F1F5F9]">
                                {formatCurrency(
                                  Math.round(row.balance)
                                )}
                              </td>
                            </tr>
                          ))}

                          {/* Totals row */}
                          {showAllRows && (
                            <tr className="border-t-2 border-[#22C55E]/30 bg-[#22C55E]/5">
                              <td className="px-3 py-3 text-[#22C55E] font-bold">
                                Total
                              </td>
                              <td className="px-3 py-3 text-right font-mono font-bold text-[#22C55E]">
                                {formatCurrency(
                                  Math.round(results.totalCost)
                                )}
                              </td>
                              <td className="px-3 py-3 text-right font-mono font-bold text-[#3B82F6]">
                                {formatCurrency(
                                  Math.round(
                                    totalSchedulePrincipal
                                  )
                                )}
                              </td>
                              <td className="px-3 py-3 text-right font-mono font-bold text-[#F59E0B]">
                                {formatCurrency(
                                  Math.round(
                                    totalScheduleInterest
                                  )
                                )}
                              </td>
                              <td className="px-3 py-3 text-right font-mono font-bold text-[#22C55E]">
                                $0
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Show All / Collapse toggle */}
                    {results.amortizationMonthly.length > 12 && (
                      <button
                        onClick={() => setShowAllRows(!showAllRows)}
                        className="w-full border-t border-[#1E293B] bg-[#0B1120] px-4 py-3 text-xs font-medium text-[#3B82F6] hover:text-[#22C55E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/50"
                      >
                        {showAllRows
                          ? `Collapse to first 12 months`
                          : `Show all ${results.amortizationMonthly.length} months`}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
