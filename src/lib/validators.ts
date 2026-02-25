/**
 * General-purpose validation utilities for calculator inputs.
 *
 * These helpers prevent NaN / Infinity / absurdly-large values from
 * propagating through calculator logic and into the UI.
 */

/**
 * Clamp a numeric value to a safe range.
 * Returns fallback if value is NaN, Infinity, or outside bounds.
 */
export function safeNumber(
  value: unknown,
  min: number,
  max: number,
  fallback: number
): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(Math.max(n, min), max);
}

/**
 * Validate that a value is one of the allowed string options.
 * Returns fallback if not found.
 */
export function safeEnum<T extends string>(
  value: unknown,
  allowed: readonly T[],
  fallback: T
): T {
  return allowed.includes(value as T) ? (value as T) : fallback;
}

/**
 * Safe division that returns 0 instead of Infinity or NaN.
 */
export function safeDivide(
  numerator: number,
  denominator: number,
  fallback: number = 0
): number {
  if (denominator === 0 || !Number.isFinite(numerator) || !Number.isFinite(denominator)) {
    return fallback;
  }
  const result = numerator / denominator;
  return Number.isFinite(result) ? result : fallback;
}

/**
 * Clamp a calculation result to prevent display of absurdly large numbers.
 * Used after compound interest / exponential growth calculations.
 */
export function clampResult(value: number, max: number = 1e15): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.abs(value), max) * Math.sign(value);
}
