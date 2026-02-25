/* ------------------------------------------------------------------ */
/*  StatCard                                                           */
/*  A polished metric card for displaying key calculator results       */
/* ------------------------------------------------------------------ */

import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: ReactNode;
  subvalue?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  highlight?: boolean;
  className?: string;
}

/* ----- Trend arrows ----- */

function TrendArrow({ direction }: { direction: "up" | "down" }) {
  const isUp = direction === "up";
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={isUp ? "text-[#22C55E]" : "text-[#EF4444]"}
      aria-hidden="true"
    >
      {isUp ? (
        <>
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </>
      ) : (
        <>
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </>
      )}
    </svg>
  );
}

/* ----- Component ----- */

export function StatCard({
  label,
  value,
  subvalue,
  icon,
  trend,
  highlight = false,
  className,
}: StatCardProps) {
  return (
    <div
      className={[
        "rounded-lg border bg-[#0B1120] p-4 transition-colors",
        highlight
          ? "border-l-[3px] border-l-[#22C55E] border-t-[#1E293B] border-r-[#1E293B] border-b-[#1E293B]"
          : "border-[#1E293B]",
        className ?? "",
      ].join(" ")}
    >
      {/* Top row: label + optional icon */}
      <div className="mb-1 flex items-center justify-between">
        <p className="text-xs font-medium text-[#94A3B8]">{label}</p>
        {icon && (
          <span className="text-[#94A3B8]" aria-hidden="true">
            {icon}
          </span>
        )}
      </div>

      {/* Value row */}
      <div className="flex items-center gap-2">
        <p
          className={[
            "font-mono font-bold",
            highlight
              ? "text-2xl text-[#22C55E]"
              : "text-lg text-[#F1F5F9]",
          ].join(" ")}
        >
          {value}
        </p>

        {/* Trend indicator */}
        {trend && trend !== "neutral" && <TrendArrow direction={trend} />}
      </div>

      {/* Optional sub-value */}
      {subvalue && (
        <p className="mt-0.5 text-xs text-[#94A3B8]">{subvalue}</p>
      )}
    </div>
  );
}

export type { StatCardProps };
export default StatCard;
