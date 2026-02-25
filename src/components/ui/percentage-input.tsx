"use client";

import { useState, useRef, useCallback, useId } from "react";

/* ------------------------------------------------------------------ */
/*  PercentageInput                                                    */
/*  An input tailored for percentage values with a fixed % suffix      */
/* ------------------------------------------------------------------ */

interface PercentageInputProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  id?: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export function PercentageInput({
  value,
  onChange,
  label,
  id,
  min,
  max,
  step = 0.1,
  className,
}: PercentageInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);

  /*
   * While the input is focused, we display exactly what the user typed.
   * On blur we validate, clamp, and reformat.
   */
  const [isEditing, setIsEditing] = useState(false);
  const [rawValue, setRawValue] = useState("");

  const displayValue = isEditing ? rawValue : String(value);

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
    setRawValue(value === 0 ? "" : String(value));
  }, [value]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    const parsed = parseFloat(rawValue);
    if (isNaN(parsed)) {
      onChange(min ?? 0);
    } else {
      onChange(clamp(parsed));
    }
  }, [rawValue, clamp, onChange, min]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      /* Allow only numbers, decimal points, and optional leading minus */
      if (raw !== "" && !/^-?\d*\.?\d*$/.test(raw)) return;
      setRawValue(raw);

      const parsed = parseFloat(raw);
      if (!isNaN(parsed)) {
        onChange(clamp(parsed));
      }
    },
    [clamp, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        const direction = e.key === "ArrowUp" ? 1 : -1;
        const newValue = clamp(
          Math.round((value + direction * step) * 1000) / 1000
        );
        onChange(newValue);
        setRawValue(String(newValue));
      }
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
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          aria-label={label ?? "Percentage value"}
          className="h-12 w-full rounded-lg border border-[#1E293B] bg-[#0B1120] pl-3 pr-8 py-3 text-[#F1F5F9] font-body transition-colors focus:border-[#3B82F6] focus:outline-none focus:ring-[3px] focus:ring-[#3B82F6]/15"
        />
        {/* Fixed % suffix */}
        <span
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 select-none text-[#94A3B8] font-medium"
          aria-hidden="true"
        >
          %
        </span>
      </div>
    </div>
  );
}

export type { PercentageInputProps };
export default PercentageInput;
