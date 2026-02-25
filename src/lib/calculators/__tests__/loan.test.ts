import { describe, it, expect } from "vitest";
import { calculateLoanPayment } from "../loan";

describe("calculateLoanPayment", () => {
  it("calculates $25K, 5%, 60 months correctly", () => {
    const result = calculateLoanPayment({
      principal: 25000,
      annualRate: 5,
      termMonths: 60,
    });

    // Standard amortization: $25K at 5% for 60 months -> ~$471.78/mo
    expect(result.monthlyPayment).toBeCloseTo(471.78, 0);

    // Total cost
    expect(result.totalCost).toBeCloseTo(result.monthlyPayment * 60, 2);

    // Total interest = total cost - principal
    expect(result.totalInterest).toBeCloseTo(result.totalCost - 25000, 2);
    expect(result.totalInterest).toBeGreaterThan(0);
  });

  it("handles zero interest rate", () => {
    const result = calculateLoanPayment({
      principal: 25000,
      annualRate: 0,
      termMonths: 60,
    });

    // Zero rate: simple division
    expect(result.monthlyPayment).toBeCloseTo(25000 / 60, 10);
    expect(result.totalCost).toBeCloseTo(25000, 10);
    expect(result.totalInterest).toBeCloseTo(0, 10);
  });

  it("returns zeros for zero principal", () => {
    const result = calculateLoanPayment({
      principal: 0,
      annualRate: 5,
      termMonths: 60,
    });

    expect(result.monthlyPayment).toBe(0);
    expect(result.totalInterest).toBe(0);
    expect(result.totalCost).toBe(0);
  });

  it("returns zeros for zero term", () => {
    const result = calculateLoanPayment({
      principal: 25000,
      annualRate: 5,
      termMonths: 0,
    });

    expect(result.monthlyPayment).toBe(0);
    expect(result.totalInterest).toBe(0);
    expect(result.totalCost).toBe(0);
  });

  it("handles negative principal gracefully", () => {
    const result = calculateLoanPayment({
      principal: -5000,
      annualRate: 5,
      termMonths: 60,
    });

    expect(result.monthlyPayment).toBe(0);
  });

  it("higher rate produces higher total interest", () => {
    const low = calculateLoanPayment({
      principal: 25000,
      annualRate: 3,
      termMonths: 60,
    });

    const high = calculateLoanPayment({
      principal: 25000,
      annualRate: 10,
      termMonths: 60,
    });

    expect(high.totalInterest).toBeGreaterThan(low.totalInterest);
  });

  it("longer term produces higher total interest but lower monthly payment", () => {
    const short = calculateLoanPayment({
      principal: 25000,
      annualRate: 5,
      termMonths: 36,
    });

    const long = calculateLoanPayment({
      principal: 25000,
      annualRate: 5,
      termMonths: 72,
    });

    expect(long.totalInterest).toBeGreaterThan(short.totalInterest);
    expect(long.monthlyPayment).toBeLessThan(short.monthlyPayment);
  });

  it("produces finite values for very large amounts", () => {
    const result = calculateLoanPayment({
      principal: 1000000,
      annualRate: 8,
      termMonths: 360,
    });

    expect(Number.isFinite(result.monthlyPayment)).toBe(true);
    expect(Number.isFinite(result.totalInterest)).toBe(true);
    expect(result.monthlyPayment).toBeGreaterThan(0);
  });
});
