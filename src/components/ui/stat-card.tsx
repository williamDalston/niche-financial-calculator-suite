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
    <>
      <span className="sr-only">{isUp ? "Trending up" : "Trending down"}</span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isUp ? "text-accent-primary" : "text-[#EF4444]"}
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
    </>
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
        "rounded-lg border bg-bg-primary p-4 transition-colors",
        highlight
          ? "border-l-[3px] border-l-accent-primary border-t-border border-r-border border-b-border"
          : "border-border",
        className ?? "",
      ].join(" ")}
    >
      {/* Top row: label + optional icon */}
      <div className="mb-1 flex items-center justify-between gap-1">
        <p className="text-xs font-medium text-text-muted truncate">{label}</p>
        {icon && (
          <span className="text-text-muted" aria-hidden="true">
            {icon}
          </span>
        )}
      </div>

      {/* Value row */}
      <div className="flex items-center gap-2 min-w-0">
        <p
          className={[
            "font-mono font-bold truncate",
            highlight
              ? "text-xl sm:text-2xl text-accent-primary"
              : "text-base sm:text-lg text-text-primary",
          ].join(" ")}
        >
          {value}
        </p>

        {/* Trend indicator */}
        {trend && trend !== "neutral" && <TrendArrow direction={trend} />}
      </div>

      {/* Optional sub-value */}
      {subvalue && (
        <p className="mt-0.5 text-xs text-text-muted">{subvalue}</p>
      )}
    </div>
  );
}

export type { StatCardProps };
export default StatCard;
