import { describe, it, expect } from "vitest";
import { calculateCompoundInterest } from "../compound-interest";

describe("calculateCompoundInterest", () => {
  it("calculates $10K principal, $200/mo, 8%, 30yr monthly compounding", () => {
    const result = calculateCompoundInterest({
      principal: 10000,
      monthlyContribution: 200,
      annualRate: 8,
      years: 30,
      compoundingFrequency: "monthly",
    });

    // With $10K initial, $200/mo at 8% compounded monthly for 30 years
    // future value ~$407K (compound growth with regular contributions)
    expect(result.futureValue).toBeGreaterThan(400000);
    expect(result.futureValue).toBeLessThan(420000);

    // Total contributions = 10000 + 200*12*30 = 82000
    expect(result.totalContributions).toBe(82000);

    // Interest should be much larger than contributions over 30 years
    expect(result.totalInterest).toBeGreaterThan(result.totalContributions);

    // Should have 30 yearly breakdown entries
    expect(result.yearlyBreakdown).toHaveLength(30);
  });

  it("returns just contributions when rate is zero", () => {
    const result = calculateCompoundInterest({
      principal: 10000,
      monthlyContribution: 200,
      annualRate: 0,
      years: 10,
      compoundingFrequency: "monthly",
    });

    // 10000 + 200*12*10 = 34000
    expect(result.futureValue).toBe(34000);
    expect(result.totalContributions).toBe(34000);
    expect(result.totalInterest).toBe(0);
    expect(result.yearlyBreakdown).toHaveLength(0);
  });

  it("returns just principal when years is zero", () => {
    const result = calculateCompoundInterest({
      principal: 5000,
      monthlyContribution: 100,
      annualRate: 5,
      years: 0,
      compoundingFrequency: "monthly",
    });

    expect(result.futureValue).toBe(5000);
    expect(result.totalContributions).toBe(5000);
    expect(result.totalInterest).toBe(0);
  });

  it("handles zero principal with monthly contributions", () => {
    const result = calculateCompoundInterest({
      principal: 0,
      monthlyContribution: 500,
      annualRate: 10,
      years: 20,
      compoundingFrequency: "monthly",
    });

    // Total contributions = 500*12*20 = 120000
    expect(result.totalContributions).toBe(120000);
    expect(result.futureValue).toBeGreaterThan(120000);
    expect(result.totalInterest).toBeGreaterThan(0);
  });

  it("handles daily compounding frequency", () => {
    const result = calculateCompoundInterest({
      principal: 10000,
      monthlyContribution: 0,
      annualRate: 5,
      years: 1,
      compoundingFrequency: "daily",
    });

    // With daily compounding, $10K at 5% for 1 year ~$10,512.67
    expect(result.futureValue).toBeGreaterThan(10500);
    expect(result.futureValue).toBeLessThan(10520);
  });

  it("handles quarterly compounding frequency", () => {
    const result = calculateCompoundInterest({
      principal: 10000,
      monthlyContribution: 0,
      annualRate: 5,
      years: 1,
      compoundingFrequency: "quarterly",
    });

    // Quarterly compounding on $10K at 5% for 1 year ~$10,509
    expect(result.futureValue).toBeGreaterThan(10500);
    expect(result.futureValue).toBeLessThan(10520);
  });

  it("handles annual compounding frequency", () => {
    const result = calculateCompoundInterest({
      principal: 10000,
      monthlyContribution: 0,
      annualRate: 5,
      years: 1,
      compoundingFrequency: "annually",
    });

    // Annual: 10000 * 1.05 = 10500
    expect(result.futureValue).toBe(10500);
  });

  it("yearly breakdown totals increase each year", () => {
    const result = calculateCompoundInterest({
      principal: 10000,
      monthlyContribution: 200,
      annualRate: 8,
      years: 10,
      compoundingFrequency: "monthly",
    });

    for (let i = 1; i < result.yearlyBreakdown.length; i++) {
      expect(result.yearlyBreakdown[i].total).toBeGreaterThan(
        result.yearlyBreakdown[i - 1].total
      );
    }
  });

  it("produces finite values for very large inputs", () => {
    const result = calculateCompoundInterest({
      principal: 500000,
      monthlyContribution: 3000,
      annualRate: 15,
      years: 50,
      compoundingFrequency: "monthly",
    });

    expect(Number.isFinite(result.futureValue)).toBe(true);
    expect(result.futureValue).toBeGreaterThan(0);
  });

  it("defaults to monthly (12) for unknown compounding frequency", () => {
    const result = calculateCompoundInterest({
      principal: 10000,
      monthlyContribution: 0,
      annualRate: 5,
      years: 1,
      compoundingFrequency: "unknown_value",
    });

    // Should fallback to monthly compounding (n=12)
    const monthlyResult = calculateCompoundInterest({
      principal: 10000,
      monthlyContribution: 0,
      annualRate: 5,
      years: 1,
      compoundingFrequency: "monthly",
    });

    expect(result.futureValue).toBe(monthlyResult.futureValue);
  });
});
