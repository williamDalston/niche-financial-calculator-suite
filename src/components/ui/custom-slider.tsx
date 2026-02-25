"use client";

import { useState, useRef, useCallback, useId, useMemo } from "react";

/* ------------------------------------------------------------------ */
/*  CustomSlider                                                       */
/*  A premium range slider with filled track, glow thumb & tooltip     */
/* ------------------------------------------------------------------ */

interface CustomSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  label?: string;
  formatValue?: (value: number) => string;
  showTooltip?: boolean;
  showMinMax?: boolean;
  className?: string;
}

export function CustomSlider({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  formatValue,
  showTooltip = true,
  showMinMax = true,
  className,
}: CustomSliderProps) {
  const generatedId = useId();
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  /* Percentage of the filled portion (0-100) */
  const percent = useMemo(() => {
    if (max === min) return 0;
    return ((value - min) / (max - min)) * 100;
  }, [value, min, max]);

  const formatted = formatValue ? formatValue(value) : String(value);
  const showFloatingTooltip = showTooltip && (isDragging || isHovering);

  /* Compute value from a pointer event on the track */
  const computeValue = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return value;
      const rect = trackRef.current.getBoundingClientRect();
      const rawPercent = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width)
      );
      const rawValue = min + rawPercent * (max - min);
      /* Snap to step */
      const stepped = Math.round(rawValue / step) * step;
      /* Clamp */
      return Math.max(min, Math.min(max, stepped));
    },
    [min, max, step, value]
  );

  /* Pointer event handlers for the custom track overlay */
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      onChange(computeValue(e.clientX));
    },
    [computeValue, onChange]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      onChange(computeValue(e.clientX));
    },
    [isDragging, computeValue, onChange]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  /* Native range input change (keyboard + assistive tech fallback) */
  const handleNativeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value));
    },
    [onChange]
  );

  return (
    <div className={className}>
      {/* Label */}
      {label && (
        <label
          htmlFor={generatedId}
          className="mb-2 block text-sm font-medium text-[#94A3B8]"
        >
          {label}
        </label>
      )}

      {/* Slider container */}
      <div
        className="relative select-none"
        style={{ paddingTop: showTooltip ? 28 : 0 }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Floating tooltip */}
        {showFloatingTooltip && (
          <div
            className="pointer-events-none absolute -top-0.5 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#22C55E] px-2.5 py-1 text-xs font-semibold text-[#0B1120] shadow-lg"
            style={{ left: `${percent}%` }}
            role="tooltip"
          >
            {formatted}
            {/* Arrow */}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#22C55E]" />
          </div>
        )}

        {/* Custom visual track (interactive overlay) */}
        <div
          ref={trackRef}
          className="relative h-6 cursor-pointer touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          role="presentation"
        >
          {/* Track background */}
          <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#1E293B]" />

          {/* Filled portion */}
          <div
            className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#22C55E] transition-[width] duration-75"
            style={{ width: `${percent}%` }}
          />

          {/* Thumb */}
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-[transform,box-shadow] duration-150"
            style={{ left: `${percent}%` }}
          >
            <div
              className={[
                "h-5 w-5 rounded-full border-2 border-white bg-[#22C55E]",
                "shadow-[0_0_6px_rgba(34,197,94,0.4)]",
                "transition-[transform,box-shadow] duration-150",
                isHovering || isDragging
                  ? "scale-110 shadow-[0_0_12px_rgba(34,197,94,0.6)]"
                  : "",
              ].join(" ")}
            />
          </div>
        </div>

        {/* Hidden native range for keyboard accessibility */}
        <input
          id={generatedId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleNativeChange}
          onFocus={() => setIsHovering(true)}
          onBlur={() => setIsHovering(false)}
          className="pointer-events-none absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label={label ?? "Slider"}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={formatted}
        />
      </div>

      {/* Min / Max labels */}
      {showMinMax && (
        <div className="mt-1.5 flex justify-between text-xs text-[#94A3B8]">
          <span>{formatValue ? formatValue(min) : String(min)}</span>
          <span>{formatValue ? formatValue(max) : String(max)}</span>
        </div>
      )}
    </div>
  );
}

export type { CustomSliderProps };
export default CustomSlider;
