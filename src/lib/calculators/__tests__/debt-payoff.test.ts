import { describe, it, expect } from "vitest";
import { calculateDebtPayoff } from "../debt-payoff";

describe("calculateDebtPayoff", () => {
  const threeDebts = [
    { name: "Credit Card", balance: 8500, rate: 22.99, minPayment: 250 },
    { name: "Car Loan", balance: 15000, rate: 6.5, minPayment: 350 },
    { name: "Student Loan", balance: 28000, rate: 5.5, minPayment: 300 },
  ];

  it("avalanche method produces less or equal total interest than snowball", () => {
    const avalanche = calculateDebtPayoff({
      debts: threeDebts,
      extraPayment: 200,
      method: "avalanche",
    });

    const snowball = calculateDebtPayoff({
      debts: threeDebts,
      extraPayment: 200,
      method: "snowball",
    });

    // Avalanche should pay less (or equal) interest since it targets high rate first
    expect(avalanche.totalInterest).toBeLessThanOrEqual(snowball.totalInterest);
  });

  it("avalanche pays off highest-rate debt first", () => {
    const result = calculateDebtPayoff({
      debts: threeDebts,
      extraPayment: 200,
      method: "avalanche",
    });

    // Credit card (22.99%) should be first in payoff order
    expect(result.payoffOrder[0].name).toBe("Credit Card");
    expect(result.monthsToPayoff).toBeGreaterThan(0);
    expect(result.totalInterest).toBeGreaterThan(0);
  });

  it("snowball pays off lowest-balance debt first", () => {
    const result = calculateDebtPayoff({
      debts: threeDebts,
      extraPayment: 200,
      method: "snowball",
    });

    // Credit card ($8500) is the lowest balance, should be first
    expect(result.payoffOrder[0].name).toBe("Credit Card");
  });

  it("handles a single debt", () => {
    const result = calculateDebtPayoff({
      debts: [{ name: "Solo Debt", balance: 5000, rate: 10, minPayment: 200 }],
      extraPayment: 100,
      method: "avalanche",
    });

    expect(result.monthsToPayoff).toBeGreaterThan(0);
    expect(result.totalInterest).toBeGreaterThan(0);
    expect(result.payoffOrder).toHaveLength(1);
    expect(result.payoffOrder[0].name).toBe("Solo Debt");
  });

  it("handles zero extra payment", () => {
    const result = calculateDebtPayoff({
      debts: threeDebts,
      extraPayment: 0,
      method: "avalanche",
    });

    // Should still pay off eventually with minimum payments
    expect(result.monthsToPayoff).toBeGreaterThan(0);
    expect(result.totalInterest).toBeGreaterThan(0);

    // Total interest with no extra payment should be higher
    const withExtra = calculateDebtPayoff({
      debts: threeDebts,
      extraPayment: 200,
      method: "avalanche",
    });
    expect(result.totalInterest).toBeGreaterThan(withExtra.totalInterest);
  });

  it("returns empty results for no debts", () => {
    const result = calculateDebtPayoff({
      debts: [],
      extraPayment: 200,
      method: "avalanche",
    });

    expect(result.monthsToPayoff).toBe(0);
    expect(result.totalInterest).toBe(0);
    expect(result.payoffOrder).toHaveLength(0);
    expect(result.monthlySchedule).toHaveLength(0);
  });

  it("returns empty results for zero-balance debts", () => {
    const result = calculateDebtPayoff({
      debts: [{ name: "Zero", balance: 0, rate: 10, minPayment: 200 }],
      extraPayment: 200,
      method: "avalanche",
    });

    expect(result.monthsToPayoff).toBe(0);
    expect(result.totalInterest).toBe(0);
  });

  it("monthly schedule starts with initial balances", () => {
    const result = calculateDebtPayoff({
      debts: threeDebts,
      extraPayment: 200,
      method: "avalanche",
    });

    // First snapshot should be month 0 with original balances
    const initial = result.monthlySchedule[0];
    expect(initial.month).toBe(0);
    expect(initial["Credit Card"]).toBe(8500);
    expect(initial["Car Loan"]).toBe(15000);
    expect(initial["Student Loan"]).toBe(28000);
  });

  it("more extra payment leads to faster payoff", () => {
    const low = calculateDebtPayoff({
      debts: threeDebts,
      extraPayment: 100,
      method: "avalanche",
    });

    const high = calculateDebtPayoff({
      debts: threeDebts,
      extraPayment: 500,
      method: "avalanche",
    });

    expect(high.monthsToPayoff).toBeLessThan(low.monthsToPayoff);
    expect(high.totalInterest).toBeLessThan(low.totalInterest);
  });

  it("caps at 600 months (50 years) to prevent infinite loops", () => {
    // Very low min payment, high balance, high rate
    const result = calculateDebtPayoff({
      debts: [{ name: "Huge Debt", balance: 1000000, rate: 25, minPayment: 1 }],
      extraPayment: 0,
      method: "avalanche",
    });

    expect(result.monthsToPayoff).toBeLessThanOrEqual(600);
  });
});
