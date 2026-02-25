"use client";

import { useState, useRef, useCallback, useId } from "react";

/* ------------------------------------------------------------------ */
/*  CurrencyInput                                                      */
/*  A formatted currency input with live comma formatting & $ prefix   */
/* ------------------------------------------------------------------ */

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  id?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  className?: string;
}

/**
 * Format a number with commas (no currency symbol -- we render that separately).
 */
function formatWithCommas(value: number): string {
  if (value === 0) return "0";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Strip all non-numeric characters (except minus sign at the start)
 * and parse to a number.
 */
function parseRawInput(raw: string): number {
  const cleaned = raw.replace(/[^0-9.-]/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

export function CurrencyInput({
  value,
  onChange,
  label,
  id,
  min,
  max,
  step,
  placeholder = "0",
  className,
}: CurrencyInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);

  /* While editing, we show the raw text the user typed.
     On blur, we reformat with commas. */
  const [isEditing, setIsEditing] = useState(false);
  const [rawValue, setRawValue] = useState("");

  const displayValue = isEditing ? rawValue : formatWithCommas(value);

  const clamp = useCallback(
    (v: number) => {
      let clamped = v;
      if (min !== undefined) clamped = Math.max(clamped, min);
      if (max !== undefined) clamped = Math.min(clamped, max);
      return clamped;
    },
    [min, max]
  );

  const handleFocus = useCallback(() => {
    setIsEditing(true);
    /* Show raw number (no commas) so user can type freely */
    setRawValue(value === 0 ? "" : String(value));
  }, [value]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    const parsed = clamp(parseRawInput(rawValue));
    onChange(parsed);
  }, [rawValue, clamp, onChange]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      setRawValue(raw);

      /* Also emit live updates while typing */
      const parsed = parseRawInput(raw);
      if (!isNaN(parsed)) {
        onChange(clamp(parsed));
      }
    },
    [clamp, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      /* Allow stepping with arrow keys */
      if (step && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
        e.preventDefault();
        const direction = e.key === "ArrowUp" ? 1 : -1;
        const newValue = clamp(value + direction * step);
        onChange(newValue);
        setRawValue(String(newValue));
      }

      /* Submit on Enter */
      if (e.key === "Enter") {
        inputRef.current?.blur();
      }
    },
    [value, step, clamp, onChange]
  );

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-medium text-[#94A3B8]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {/* Fixed $ prefix */}
        <span
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 select-none text-[#94A3B8] font-medium"
          aria-hidden="true"
        >
          $
        </span>
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          inputMode="numeric"
          value={displayValue}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          aria-label={label ?? "Currency amount"}
          className="h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] pl-7 pr-3 py-3 text-[#F1F5F9] font-body transition-colors focus:border-[#3B82F6] focus:outline-none focus:ring-[3px] focus:ring-[#3B82F6]/15"
        />
      </div>
    </div>
  );
}

export type { CurrencyInputProps };
export default CurrencyInput;
