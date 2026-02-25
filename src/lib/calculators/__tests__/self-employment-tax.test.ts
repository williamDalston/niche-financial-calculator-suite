import { describe, it, expect } from "vitest";
import { calculateSelfEmploymentTax } from "../self-employment-tax";

describe("calculateSelfEmploymentTax", () => {
  it("calculates SE tax for $100K net income, single filer", () => {
    const result = calculateSelfEmploymentTax({
      netIncome: 100000,
      filingStatus: "single",
    });

    // SE taxable income = 100000 * 0.9235 = 92350
    const seTaxableIncome = 100000 * 0.9235;

    // SS tax = min(92350, 168600) * 0.124 = 92350 * 0.124 = 11451.40
    expect(result.socialSecurityTax).toBeCloseTo(seTaxableIncome * 0.124, 2);

    // Medicare tax = 92350 * 0.029 = 2678.15
    expect(result.medicareTax).toBeCloseTo(seTaxableIncome * 0.029, 2);

    // No additional Medicare (under $200K)
    // Total SE tax = 11451.40 + 2678.15 = 14129.55
    expect(result.seTax).toBeCloseTo(
      seTaxableIncome * 0.124 + seTaxableIncome * 0.029,
      2
    );

    // Deductible half
    expect(result.deductibleHalf).toBeCloseTo(result.seTax / 2, 2);

    // Effective rate
    expect(result.effectiveRate).toBeCloseTo((result.seTax / 100000) * 100, 2);
  });

  it("handles zero income", () => {
    const result = calculateSelfEmploymentTax({
      netIncome: 0,
      filingStatus: "single",
    });

    expect(result.seTax).toBe(0);
    expect(result.socialSecurityTax).toBe(0);
    expect(result.medicareTax).toBe(0);
    expect(result.deductibleHalf).toBe(0);
    expect(result.effectiveRate).toBe(0);
  });

  it("handles negative income", () => {
    const result = calculateSelfEmploymentTax({
      netIncome: -5000,
      filingStatus: "single",
    });

    expect(result.seTax).toBe(0);
    expect(result.socialSecurityTax).toBe(0);
    expect(result.medicareTax).toBe(0);
    expect(result.deductibleHalf).toBe(0);
    expect(result.effectiveRate).toBe(0);
  });

  it("caps social security at wage base ($168,600)", () => {
    const result = calculateSelfEmploymentTax({
      netIncome: 250000,
      filingStatus: "single",
    });

    const seTaxableIncome = 250000 * 0.9235; // 230875
    // SS taxable = min(230875, 168600) = 168600
    const expectedSSTax = 168600 * 0.124;
    expect(result.socialSecurityTax).toBeCloseTo(expectedSSTax, 2);

    // Medicare should be on full SE taxable income
    expect(result.medicareTax).toBeCloseTo(seTaxableIncome * 0.029, 2);
  });

  it("applies additional Medicare tax above $200K threshold", () => {
    const result = calculateSelfEmploymentTax({
      netIncome: 300000,
      filingStatus: "single",
    });

    const seTaxableIncome = 300000 * 0.9235;
    const additionalMedicareBase = Math.max(300000 - 200000, 0);
    const additionalMedicare = Math.min(additionalMedicareBase, seTaxableIncome) * 0.009;

    // Total SE tax should include additional Medicare
    const expectedSSTax = Math.min(seTaxableIncome, 168600) * 0.124;
    const expectedMedicare = seTaxableIncome * 0.029;
    const expectedTotal = expectedSSTax + expectedMedicare + additionalMedicare;

    expect(result.seTax).toBeCloseTo(expectedTotal, 2);
  });

  it("verifies the 92.35% factor is applied", () => {
    const result = calculateSelfEmploymentTax({
      netIncome: 50000,
      filingStatus: "single",
    });

    // SE taxable income should be 50000 * 0.9235 = 46175
    const seTaxableIncome = 50000 * 0.9235;
    const expectedSSTax = seTaxableIncome * 0.124;
    const expectedMedicare = seTaxableIncome * 0.029;

    expect(result.socialSecurityTax).toBeCloseTo(expectedSSTax, 2);
    expect(result.medicareTax).toBeCloseTo(expectedMedicare, 2);
    expect(result.seTax).toBeCloseTo(expectedSSTax + expectedMedicare, 2);
  });

  it("deductible half is exactly 50% of SE tax", () => {
    const result = calculateSelfEmploymentTax({
      netIncome: 80000,
      filingStatus: "single",
    });

    expect(result.deductibleHalf).toBeCloseTo(result.seTax / 2, 10);
  });

  it("effective rate is reasonable for typical income", () => {
    const result = calculateSelfEmploymentTax({
      netIncome: 100000,
      filingStatus: "single",
    });

    // SE tax rate on net income should be about 14.13% (92.35% * 15.3%)
    expect(result.effectiveRate).toBeGreaterThan(13);
    expect(result.effectiveRate).toBeLessThan(16);
  });

  it("handles very high income", () => {
    const result = calculateSelfEmploymentTax({
      netIncome: 1000000,
      filingStatus: "married",
    });

    expect(Number.isFinite(result.seTax)).toBe(true);
    expect(result.seTax).toBeGreaterThan(0);
    expect(result.deductibleHalf).toBeGreaterThan(0);
    expect(Number.isFinite(result.effectiveRate)).toBe(true);
  });

  it("filing status does not affect SE tax calculation (only income tax)", () => {
    const single = calculateSelfEmploymentTax({
      netIncome: 100000,
      filingStatus: "single",
    });

    const married = calculateSelfEmploymentTax({
      netIncome: 100000,
      filingStatus: "married",
    });

    // SE tax should be the same regardless of filing status
    // (Filing status affects income tax, not SE tax itself)
    expect(single.seTax).toBeCloseTo(married.seTax, 2);
  });
});
