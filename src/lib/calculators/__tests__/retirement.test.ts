import { describe, it, expect } from "vitest";
import { calculateRetirement } from "../retirement";

describe("calculateRetirement", () => {
  it("projects age 30 to 65, $50K saved, $500/mo, 7% return, 3% inflation", () => {
    const result = calculateRetirement({
      currentAge: 30,
      retirementAge: 65,
      currentSavings: 50000,
      monthlyContribution: 500,
      annualReturn: 7,
      inflationRate: 3,
    });

    // 35 years of compound growth should produce a substantial balance
    // ~$1.47M with monthly compounding at 7% over 35 years
    expect(result.projectedBalance).toBeGreaterThan(1400000);
    expect(result.projectedBalance).toBeLessThan(1600000);

    // Total contributions = 50000 + 500*12*35 = 260000
    expect(result.totalContributions).toBe(260000);

    // Growth should be larger than contributions with 7% over 35 years
    expect(result.totalGrowth).toBeGreaterThan(result.totalContributions);

    // Inflation-adjusted balance should be less than nominal
    expect(result.inflationAdjustedBalance).toBeLessThan(result.projectedBalance);
    expect(result.inflationAdjustedBalance).toBeGreaterThan(0);

    // Should have 35 yearly projection entries
    expect(result.yearlyProjection).toHaveLength(35);

    // Last entry age should be 65
    expect(result.yearlyProjection[34].age).toBe(65);
  });

  it("returns current savings when retirement age equals current age", () => {
    const result = calculateRetirement({
      currentAge: 65,
      retirementAge: 65,
      currentSavings: 50000,
      monthlyContribution: 500,
      annualReturn: 7,
      inflationRate: 3,
    });

    expect(result.projectedBalance).toBe(50000);
    expect(result.inflationAdjustedBalance).toBe(50000);
    expect(result.totalContributions).toBe(50000);
    expect(result.totalGrowth).toBe(0);
    expect(result.yearlyProjection).toHaveLength(0);
  });

  it("returns current savings when retirement age is less than current age", () => {
    const result = calculateRetirement({
      currentAge: 70,
      retirementAge: 65,
      currentSavings: 100000,
      monthlyContribution: 500,
      annualReturn: 7,
      inflationRate: 3,
    });

    expect(result.projectedBalance).toBe(100000);
    expect(result.totalGrowth).toBe(0);
    expect(result.yearlyProjection).toHaveLength(0);
  });

  it("handles zero annual return (no growth)", () => {
    const result = calculateRetirement({
      currentAge: 30,
      retirementAge: 65,
      currentSavings: 50000,
      monthlyContribution: 500,
      annualReturn: 0,
      inflationRate: 3,
    });

    // With 0% return, balance is just contributions
    // 50000 + 500*12*35 = 260000
    // But monthly compounding at 0% still adds monthly contributions
    expect(result.totalContributions).toBe(260000);
    // Growth should be ~0 (rounding effects)
    expect(result.totalGrowth).toBeLessThanOrEqual(1);
  });

  it("handles zero inflation rate", () => {
    const result = calculateRetirement({
      currentAge: 30,
      retirementAge: 65,
      currentSavings: 50000,
      monthlyContribution: 500,
      annualReturn: 7,
      inflationRate: 0,
    });

    // With 0% inflation, adjusted balance equals projected balance
    expect(result.inflationAdjustedBalance).toBe(result.projectedBalance);
  });

  it("yearly projection totals increase over time", () => {
    const result = calculateRetirement({
      currentAge: 30,
      retirementAge: 65,
      currentSavings: 50000,
      monthlyContribution: 500,
      annualReturn: 7,
      inflationRate: 3,
    });

    for (let i = 1; i < result.yearlyProjection.length; i++) {
      expect(result.yearlyProjection[i].total).toBeGreaterThan(
        result.yearlyProjection[i - 1].total
      );
    }
  });

  it("handles zero current savings with contributions", () => {
    const result = calculateRetirement({
      currentAge: 25,
      retirementAge: 65,
      currentSavings: 0,
      monthlyContribution: 1000,
      annualReturn: 8,
      inflationRate: 2,
    });

    // totalContributions = 0 + 1000*12*40 = 480000
    expect(result.totalContributions).toBe(480000);
    expect(result.projectedBalance).toBeGreaterThan(480000);
    expect(result.totalGrowth).toBeGreaterThan(0);
  });

  it("produces finite values for extreme inputs", () => {
    const result = calculateRetirement({
      currentAge: 18,
      retirementAge: 80,
      currentSavings: 500000,
      monthlyContribution: 5000,
      annualReturn: 15,
      inflationRate: 10,
    });

    expect(Number.isFinite(result.projectedBalance)).toBe(true);
    expect(Number.isFinite(result.inflationAdjustedBalance)).toBe(true);
    expect(result.projectedBalance).toBeGreaterThan(0);
  });
});
