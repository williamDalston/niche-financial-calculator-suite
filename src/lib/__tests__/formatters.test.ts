import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  formatCurrencyExact,
  formatCompact,
  formatPercent,
  formatPercentRatio,
} from "../formatters";

describe("formatCurrency", () => {
  it("formats whole dollars with commas", () => {
    expect(formatCurrency(1234)).toBe("$1,234");
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("$0");
  });

  it("rounds to nearest dollar", () => {
    expect(formatCurrency(1234.56)).toBe("$1,235");
  });

  it("formats negative values", () => {
    expect(formatCurrency(-500)).toBe("-$500");
  });

  it("formats large values with commas", () => {
    expect(formatCurrency(1000000)).toBe("$1,000,000");
  });
});

describe("formatCurrencyExact", () => {
  it("formats with exactly 2 decimal places", () => {
    expect(formatCurrencyExact(1234.5)).toBe("$1,234.50");
  });

  it("formats whole numbers with .00", () => {
    expect(formatCurrencyExact(100)).toBe("$100.00");
  });

  it("rounds to 2 decimal places", () => {
    expect(formatCurrencyExact(99.999)).toBe("$100.00");
  });
});

describe("formatCompact", () => {
  it("formats millions with M suffix", () => {
    expect(formatCompact(1500000)).toBe("$1.5M");
  });

  it("formats thousands with k suffix", () => {
    expect(formatCompact(45000)).toBe("$45k");
  });

  it("formats small values without suffix", () => {
    expect(formatCompact(500)).toBe("$500");
  });

  it("formats exactly 1 million", () => {
    expect(formatCompact(1000000)).toBe("$1.0M");
  });

  it("formats exactly 1 thousand", () => {
    expect(formatCompact(1000)).toBe("$1k");
  });
});

describe("formatPercent", () => {
  it("formats percentage from 0-100 scale", () => {
    expect(formatPercent(7.5)).toBe("7.5%");
  });

  it("formats zero", () => {
    expect(formatPercent(0)).toBe("0.0%");
  });

  it("formats 100%", () => {
    expect(formatPercent(100)).toBe("100.0%");
  });
});

describe("formatPercentRatio", () => {
  it("converts 0-1 ratio to percentage", () => {
    expect(formatPercentRatio(0.075)).toBe("7.5%");
  });

  it("formats zero ratio", () => {
    expect(formatPercentRatio(0)).toBe("0.0%");
  });

  it("formats 1.0 as 100%", () => {
    expect(formatPercentRatio(1)).toBe("100.0%");
  });
});
