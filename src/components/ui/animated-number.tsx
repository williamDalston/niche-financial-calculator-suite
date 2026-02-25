"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  AnimatedNumber                                                     */
/*  Smoothly animates between numeric values with easing & formatting  */
/* ------------------------------------------------------------------ */

interface AnimatedNumberProps {
  value: number;
  format?: "currency" | "percent" | "number" | "compact";
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

/* Ease-out cubic: fast start, natural deceleration */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/* Format a number according to the requested style */
function formatValue(
  value: number,
  format: AnimatedNumberProps["format"] = "number",
  decimals?: number
): string {
  switch (format) {
    case "currency":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: decimals ?? 0,
        maximumFractionDigits: decimals ?? 0,
      }).format(value);

    case "percent":
      return new Intl.NumberFormat("en-US", {
        style: "percent",
        minimumFractionDigits: decimals ?? 1,
        maximumFractionDigits: decimals ?? 1,
      }).format(value / 100);

    case "compact":
      return new Intl.NumberFormat("en-US", {
        notation: "compact",
        compactDisplay: "short",
        minimumFractionDigits: decimals ?? 0,
        maximumFractionDigits: decimals ?? 1,
      }).format(value);

    case "number":
    default:
      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimals ?? 0,
        maximumFractionDigits: decimals ?? 0,
      }).format(value);
  }
}

export function AnimatedNumber({
  value,
  format = "number",
  prefix = "",
  suffix = "",
  duration = 600,
  decimals,
  className,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);

  /* Refs to persist across renders without triggering re-renders */
  const currentValueRef = useRef(0);
  const previousValueRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const isFirstRender = useRef(true);

  const animate = useCallback(
    (from: number, to: number) => {
      /* Cancel any running animation */
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      /* Trigger scale pulse */
      setIsPulsing(true);

      const startTime = performance.now();

      function tick(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        const current = from + (to - from) * eased;

        currentValueRef.current = current;
        setDisplayValue(current);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(tick);
        } else {
          /* Ensure we land exactly on the target value */
          currentValueRef.current = to;
          setDisplayValue(to);
          animationFrameRef.current = null;

          /* Remove pulse after animation completes */
          setTimeout(() => setIsPulsing(false), 150);
        }
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    },
    [duration]
  );

  useEffect(() => {
    if (isFirstRender.current) {
      /* On mount: animate from 0 to value */
      isFirstRender.current = false;
      previousValueRef.current = 0;
      animate(0, value);
    } else {
      /* On value change: animate from old value to new value */
      const from = currentValueRef.current;
      previousValueRef.current = from;
      animate(from, value);
    }

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [value, animate]);

  const formattedValue = formatValue(displayValue, format, decimals);

  return (
    <span
      className={
        className ??
        "font-mono text-3xl font-bold text-[#22C55E] inline-block transition-transform duration-150"
      }
      style={{
        transform: isPulsing ? "scale(1.02)" : "scale(1)",
        transition: "transform 150ms ease-out",
      }}
      aria-live="polite"
      aria-atomic="true"
      role="status"
    >
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}

export type { AnimatedNumberProps };
export default AnimatedNumber;
