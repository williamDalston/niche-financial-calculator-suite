import { describe, it, expect } from "vitest";
import { calculateFederalTax, BRACKETS, STANDARD_DEDUCTIONS } from "../federal-tax";

describe("calculateFederalTax", () => {
  it("calculates tax for $75K single filer with standard deduction", () => {
    const result = calculateFederalTax({
      income: 75000,
      filingStatus: "single",
    });

    // Standard deduction for single: $14,600
    // Taxable income: 75000 - 14600 = 60400
    expect(result.taxableIncome).toBe(60400);

    // Tax calculation by bracket:
    // 10%: 11600 * 0.10 = 1160
    // 12%: (47150 - 11600) * 0.12 = 35550 * 0.12 = 4266
    // 22%: (60400 - 47150) * 0.22 = 13250 * 0.22 = 2915
    // Total = 1160 + 4266 + 2915 = 8341
    expect(result.federalTax).toBeCloseTo(8341, 0);

    // Marginal rate should be 22%
    expect(result.marginalRate).toBe(0.22);

    // Effective rate = 8341 / 75000 ~ 11.12%
    expect(result.effectiveRate).toBeCloseTo(8341 / 75000, 4);

    // Should have 3 bracket entries
    expect(result.bracketBreakdown).toHaveLength(3);
  });

  it("calculates tax for $0 income", () => {
    const result = calculateFederalTax({
      income: 0,
      filingStatus: "single",
    });

    expect(result.taxableIncome).toBe(0);
    expect(result.federalTax).toBe(0);
    expect(result.effectiveRate).toBe(0);
    expect(result.marginalRate).toBe(0);
    expect(result.bracketBreakdown).toHaveLength(0);
  });

  it("calculates tax for very high income (single, $1M)", () => {
    const result = calculateFederalTax({
      income: 1000000,
      filingStatus: "single",
    });

    // Taxable: 1000000 - 14600 = 985400
    expect(result.taxableIncome).toBe(985400);

    // Should hit the 37% bracket
    expect(result.marginalRate).toBe(0.37);

    // Should have all 7 bracket entries
    expect(result.bracketBreakdown).toHaveLength(7);

    // Federal tax should be substantial
    expect(result.federalTax).toBeGreaterThan(200000);
  });

  it("handles income below standard deduction (no tax)", () => {
    const result = calculateFederalTax({
      income: 10000,
      filingStatus: "single",
    });

    // $10,000 - $14,600 = negative, so $0 taxable
    expect(result.taxableIncome).toBe(0);
    expect(result.federalTax).toBe(0);
    expect(result.effectiveRate).toBe(0);
  });

  it("calculates married filing jointly correctly", () => {
    const result = calculateFederalTax({
      income: 150000,
      filingStatus: "mfj",
    });

    // MFJ standard deduction: $29,200
    // Taxable: 150000 - 29200 = 120800
    expect(result.taxableIncome).toBe(120800);

    // Tax:
    // 10%: 23200 * 0.10 = 2320
    // 12%: (94300 - 23200) * 0.12 = 71100 * 0.12 = 8532
    // 22%: (120800 - 94300) * 0.22 = 26500 * 0.22 = 5830
    // Total = 2320 + 8532 + 5830 = 16682
    expect(result.federalTax).toBeCloseTo(16682, 0);
    expect(result.marginalRate).toBe(0.22);
  });

  it("calculates head of household correctly", () => {
    const result = calculateFederalTax({
      income: 85000,
      filingStatus: "hoh",
    });

    // HOH standard deduction: $21,900
    // Taxable: 85000 - 21900 = 63100
    expect(result.taxableIncome).toBe(63100);

    // Tax:
    // 10%: 16550 * 0.10 = 1655
    // 12%: (63100 - 16550) * 0.12 = 46550 * 0.12 = 5586
    // Total = 1655 + 5586 = 7241
    expect(result.federalTax).toBeCloseTo(7241, 0);
    expect(result.marginalRate).toBe(0.12);
  });

  it("calculates married filing separately correctly", () => {
    const result = calculateFederalTax({
      income: 75000,
      filingStatus: "mfs",
    });

    // MFS standard deduction: $14,600
    // Taxable: 75000 - 14600 = 60400
    expect(result.taxableIncome).toBe(60400);
    // Same brackets as single for first brackets
    expect(result.federalTax).toBeGreaterThan(0);
  });

  it("supports custom deductions override", () => {
    const withStandard = calculateFederalTax({
      income: 100000,
      filingStatus: "single",
    });

    const withCustom = calculateFederalTax({
      income: 100000,
      filingStatus: "single",
      deductions: 30000,
    });

    // Custom deduction is higher, so lower tax
    expect(withCustom.federalTax).toBeLessThan(withStandard.federalTax);
    expect(withCustom.taxableIncome).toBe(70000);
  });

  it("deductions exceeding income result in zero taxable income", () => {
    const result = calculateFederalTax({
      income: 10000,
      filingStatus: "single",
      deductions: 50000,
    });

    expect(result.taxableIncome).toBe(0);
    expect(result.federalTax).toBe(0);
  });

  it("bracket constants match expected 2024 values", () => {
    // Verify the single brackets are correct
    expect(BRACKETS.single[0]).toEqual({ min: 0, max: 11600, rate: 0.10 });
    expect(BRACKETS.single[6]).toEqual({ min: 609350, max: Infinity, rate: 0.37 });

    // Verify standard deductions
    expect(STANDARD_DEDUCTIONS.single).toBe(14600);
    expect(STANDARD_DEDUCTIONS.mfj).toBe(29200);
    expect(STANDARD_DEDUCTIONS.mfs).toBe(14600);
    expect(STANDARD_DEDUCTIONS.hoh).toBe(21900);
  });
});
