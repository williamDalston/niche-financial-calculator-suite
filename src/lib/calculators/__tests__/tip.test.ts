import { describe, it, expect } from "vitest";
import { calculateTip } from "../tip";

describe("calculateTip", () => {
  it("calculates $85 bill, 20% tip correctly", () => {
    const result = calculateTip({
      billAmount: 85,
      tipPercentage: 20,
      numberOfPeople: 1,
    });

    // Tip = 85 * 0.20 = 17
    expect(result.tipAmount).toBeCloseTo(17, 2);

    // Total = 85 + 17 = 102
    expect(result.totalBill).toBeCloseTo(102, 2);

    // Per person (1 person) = same as total
    expect(result.perPersonTip).toBeCloseTo(17, 2);
    expect(result.perPersonTotal).toBeCloseTo(102, 2);
  });

  it("splits between 4 people correctly", () => {
    const result = calculateTip({
      billAmount: 85,
      tipPercentage: 20,
      numberOfPeople: 4,
    });

    // Tip = 17, Total = 102
    expect(result.tipAmount).toBeCloseTo(17, 2);
    expect(result.totalBill).toBeCloseTo(102, 2);

    // Per person tip: 17 / 4 = 4.25
    expect(result.perPersonTip).toBeCloseTo(4.25, 2);

    // Per person total: 102 / 4 = 25.50
    expect(result.perPersonTotal).toBeCloseTo(25.50, 2);
  });

  it("handles zero bill amount", () => {
    const result = calculateTip({
      billAmount: 0,
      tipPercentage: 20,
      numberOfPeople: 1,
    });

    expect(result.tipAmount).toBe(0);
    expect(result.totalBill).toBe(0);
    expect(result.perPersonTip).toBe(0);
    expect(result.perPersonTotal).toBe(0);
  });

  it("handles zero tip percentage", () => {
    const result = calculateTip({
      billAmount: 50,
      tipPercentage: 0,
      numberOfPeople: 1,
    });

    expect(result.tipAmount).toBe(0);
    expect(result.totalBill).toBe(50);
    expect(result.perPersonTotal).toBe(50);
  });

  it("handles zero or negative number of people (defaults to 1)", () => {
    const result = calculateTip({
      billAmount: 100,
      tipPercentage: 18,
      numberOfPeople: 0,
    });

    // Math.max(0, 1) = 1, so treated as 1 person
    expect(result.perPersonTotal).toBeCloseTo(118, 2);
    expect(result.perPersonTip).toBeCloseTo(18, 2);
  });

  it("calculates 15% tip correctly", () => {
    const result = calculateTip({
      billAmount: 100,
      tipPercentage: 15,
      numberOfPeople: 2,
    });

    expect(result.tipAmount).toBeCloseTo(15, 2);
    expect(result.totalBill).toBeCloseTo(115, 2);
    expect(result.perPersonTip).toBeCloseTo(7.50, 2);
    expect(result.perPersonTotal).toBeCloseTo(57.50, 2);
  });

  it("handles very large bill", () => {
    const result = calculateTip({
      billAmount: 10000,
      tipPercentage: 25,
      numberOfPeople: 10,
    });

    expect(result.tipAmount).toBe(2500);
    expect(result.totalBill).toBe(12500);
    expect(result.perPersonTip).toBe(250);
    expect(result.perPersonTotal).toBe(1250);
  });

  it("handles 100% tip", () => {
    const result = calculateTip({
      billAmount: 50,
      tipPercentage: 100,
      numberOfPeople: 1,
    });

    expect(result.tipAmount).toBe(50);
    expect(result.totalBill).toBe(100);
  });

  it("produces finite values with any valid inputs", () => {
    const result = calculateTip({
      billAmount: 123.45,
      tipPercentage: 18.5,
      numberOfPeople: 3,
    });

    expect(Number.isFinite(result.tipAmount)).toBe(true);
    expect(Number.isFinite(result.totalBill)).toBe(true);
    expect(Number.isFinite(result.perPersonTip)).toBe(true);
    expect(Number.isFinite(result.perPersonTotal)).toBe(true);
  });
});
