/**
 * Shared formatting helpers used across calculator widgets.
 *
 * formatCurrency      – whole-dollar display            →  $1,234
 * formatCurrencyExact – dollar-and-cents display        →  $1,234.56
 * formatCompact       – abbreviated large amounts       →  $1.2M / $45k
 * formatPercent       – percentage from a 0–100 value   →  7.5%
 * formatPercentRatio  – percentage from a 0–1 ratio     →  7.5%  (input 0.075)
 */

/** Format as USD with **no** decimal places: $1,234 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/** Format as USD with exactly **2** decimal places: $1,234.56 */
export function formatCurrencyExact(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Compact currency display for large values.
 *   >=1 000 000  →  $1.2M
 *   >=1 000      →  $45k
 *   otherwise    →  $123
 */
export function formatCompact(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}k`;
  return `$${value.toFixed(0)}`;
}

/**
 * Display a percentage where the input is already in 0–100 scale.
 *   formatPercent(7.5)  →  "7.5%"
 */
export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

/**
 * Display a percentage where the input is a 0–1 decimal ratio.
 *   formatPercentRatio(0.075)  →  "7.5%"
 */
export function formatPercentRatio(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}
