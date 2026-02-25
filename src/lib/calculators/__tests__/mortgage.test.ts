import { describe, it, expect } from "vitest";
import { calculateMortgage } from "../mortgage";

describe("calculateMortgage", () => {
  it("calculates a standard 30yr mortgage at 7% with 20% down on $400K", () => {
    const result = calculateMortgage({
      homePrice: 400000,
      downPayment: 80000,
      loanTermYears: 30,
      interestRate: 7,
    });

    // Loan amount should be $320,000
    expect(result.loanAmount).toBe(320000);

    // Monthly payment ~$2,129 (standard mortgage formula)
    expect(result.monthlyPayment).toBeCloseTo(2129.22, 0);

    // Total cost = monthly * 360
    expect(result.totalCost).toBeCloseTo(result.monthlyPayment * 360, 2);

    // Total interest = total cost - principal
    expect(result.totalInterest).toBeCloseTo(result.totalCost - 320000, 2);

    // Should have 30 yearly entries
    expect(result.amortizationSchedule).toHaveLength(30);

    // Should have 360 monthly entries
    expect(result.amortizationMonthly).toHaveLength(360);

    // Last year's balance should be close to 0
    const lastYear = result.amortizationSchedule[29];
    expect(lastYear.balance).toBeLessThanOrEqual(1);
  });

  it("calculates a 15yr mortgage", () => {
    const result = calculateMortgage({
      homePrice: 300000,
      downPayment: 60000,
      loanTermYears: 15,
      interestRate: 6.5,
    });

    expect(result.loanAmount).toBe(240000);
    // 15yr at 6.5% on $240K -> monthly ~$2,090.66
    expect(result.monthlyPayment).toBeCloseTo(2090.66, 0);
    expect(result.amortizationSchedule).toHaveLength(15);
    expect(result.amortizationMonthly).toHaveLength(180);
  });

  it("returns zeros when interest rate is zero", () => {
    const result = calculateMortgage({
      homePrice: 400000,
      downPayment: 80000,
      loanTermYears: 30,
      interestRate: 0,
    });

    expect(result.monthlyPayment).toBe(0);
    expect(result.totalInterest).toBe(0);
    expect(result.totalCost).toBe(0);
    expect(result.amortizationSchedule).toHaveLength(0);
    expect(result.amortizationMonthly).toHaveLength(0);
  });

  it("returns zeros when loan amount is zero (full cash purchase)", () => {
    const result = calculateMortgage({
      homePrice: 400000,
      downPayment: 400000,
      loanTermYears: 30,
      interestRate: 7,
    });

    expect(result.loanAmount).toBe(0);
    expect(result.monthlyPayment).toBe(0);
    expect(result.totalInterest).toBe(0);
    expect(result.totalCost).toBe(0);
    expect(result.amortizationSchedule).toHaveLength(0);
  });

  it("handles down payment exceeding home price gracefully", () => {
    const result = calculateMortgage({
      homePrice: 200000,
      downPayment: 300000,
      loanTermYears: 30,
      interestRate: 7,
    });

    expect(result.loanAmount).toBe(0);
    expect(result.monthlyPayment).toBe(0);
  });

  it("produces finite values for very large loan amounts", () => {
    const result = calculateMortgage({
      homePrice: 10000000,
      downPayment: 2000000,
      loanTermYears: 30,
      interestRate: 5,
    });

    expect(Number.isFinite(result.monthlyPayment)).toBe(true);
    expect(result.monthlyPayment).toBeGreaterThan(0);
    expect(Number.isFinite(result.totalInterest)).toBe(true);
  });

  it("total interest decreases with higher down payment", () => {
    const low = calculateMortgage({
      homePrice: 400000,
      downPayment: 40000,
      loanTermYears: 30,
      interestRate: 7,
    });

    const high = calculateMortgage({
      homePrice: 400000,
      downPayment: 200000,
      loanTermYears: 30,
      interestRate: 7,
    });

    expect(high.totalInterest).toBeLessThan(low.totalInterest);
  });

  it("amortization schedule balances decrease over time", () => {
    const result = calculateMortgage({
      homePrice: 400000,
      downPayment: 80000,
      loanTermYears: 30,
      interestRate: 7,
    });

    for (let i = 1; i < result.amortizationSchedule.length; i++) {
      expect(result.amortizationSchedule[i].balance).toBeLessThan(
        result.amortizationSchedule[i - 1].balance
      );
    }
  });
});
