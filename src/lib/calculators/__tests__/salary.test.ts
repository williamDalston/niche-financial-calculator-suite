import { describe, it, expect } from "vitest";
import { salaryToHourly, hourlyToSalary, calculateOvertime } from "../salary";

describe("salaryToHourly", () => {
  it("converts $100K/yr at 40hr/wk, 52 wk/yr to ~$48.08/hr", () => {
    const result = salaryToHourly({
      annualSalary: 100000,
      hoursPerWeek: 40,
      weeksPerYear: 52,
    });

    // 100000 / (40 * 52) = 100000 / 2080 = 48.0769...
    expect(result.hourly).toBeCloseTo(48.08, 1);

    // Daily = hourly * (40/5) = 48.08 * 8 = 384.62
    expect(result.daily).toBeCloseTo(384.62, 0);

    // Weekly = 100000 / 52 = 1923.08
    expect(result.weekly).toBeCloseTo(1923.08, 0);

    // Biweekly = 100000 / 26 = 3846.15
    expect(result.biweekly).toBeCloseTo(3846.15, 0);

    // Monthly = 100000 / 12 = 8333.33
    expect(result.monthly).toBeCloseTo(8333.33, 0);
  });

  it("returns zeros when hours per week is zero", () => {
    const result = salaryToHourly({
      annualSalary: 100000,
      hoursPerWeek: 0,
      weeksPerYear: 52,
    });

    expect(result.hourly).toBe(0);
    expect(result.daily).toBe(0);
    expect(result.weekly).toBe(0);
    expect(result.biweekly).toBe(0);
    expect(result.monthly).toBe(0);
  });

  it("returns zeros when weeks per year is zero", () => {
    const result = salaryToHourly({
      annualSalary: 100000,
      hoursPerWeek: 40,
      weeksPerYear: 0,
    });

    expect(result.hourly).toBe(0);
    expect(result.daily).toBe(0);
  });

  it("returns zeros for negative salary", () => {
    const result = salaryToHourly({
      annualSalary: -50000,
      hoursPerWeek: 40,
      weeksPerYear: 52,
    });

    expect(result.hourly).toBe(0);
  });

  it("handles zero salary", () => {
    const result = salaryToHourly({
      annualSalary: 0,
      hoursPerWeek: 40,
      weeksPerYear: 52,
    });

    expect(result.hourly).toBe(0);
    expect(result.daily).toBe(0);
    expect(result.monthly).toBe(0);
  });

  it("handles part-time schedule (20 hrs/wk)", () => {
    const result = salaryToHourly({
      annualSalary: 50000,
      hoursPerWeek: 20,
      weeksPerYear: 52,
    });

    // 50000 / (20 * 52) = 50000 / 1040 = 48.08
    expect(result.hourly).toBeCloseTo(48.08, 1);
  });

  it("handles fewer weeks per year (e.g., 48 with vacation)", () => {
    const result = salaryToHourly({
      annualSalary: 100000,
      hoursPerWeek: 40,
      weeksPerYear: 48,
    });

    // 100000 / (40 * 48) = 100000 / 1920 = 52.08
    expect(result.hourly).toBeCloseTo(52.08, 1);
  });
});

describe("hourlyToSalary", () => {
  it("converts $48.08/hr at 40hr/wk, 52wk/yr to ~$100K", () => {
    const result = hourlyToSalary({
      hourlyRate: 48.08,
      hoursPerWeek: 40,
      weeksPerYear: 52,
    });

    expect(result.annual).toBeCloseTo(100006.4, 0);
    expect(result.monthly).toBeCloseTo(100006.4 / 12, 0);
    expect(result.weekly).toBeCloseTo(100006.4 / 52, 0);
    expect(result.biweekly).toBeCloseTo(100006.4 / 26, 0);
  });

  it("returns zeros for zero hourly rate", () => {
    const result = hourlyToSalary({
      hourlyRate: 0,
      hoursPerWeek: 40,
      weeksPerYear: 52,
    });

    expect(result.annual).toBe(0);
    expect(result.monthly).toBe(0);
  });

  it("returns zeros for zero hours per week", () => {
    const result = hourlyToSalary({
      hourlyRate: 25,
      hoursPerWeek: 0,
      weeksPerYear: 52,
    });

    expect(result.annual).toBe(0);
  });

  it("returns zeros for negative hourly rate", () => {
    const result = hourlyToSalary({
      hourlyRate: -10,
      hoursPerWeek: 40,
      weeksPerYear: 52,
    });

    expect(result.annual).toBe(0);
  });
});

describe("calculateOvertime", () => {
  it("calculates 1.5x overtime correctly", () => {
    const result = calculateOvertime({
      regularRate: 25,
      regularHours: 40,
      overtimeHours: 10,
      overtimeMultiplier: 1.5,
    });

    // Regular: 25 * 40 = 1000
    expect(result.regularPay).toBe(1000);

    // Overtime: 25 * 1.5 * 10 = 375
    expect(result.overtimePay).toBe(375);

    // Total: 1375
    expect(result.totalPay).toBe(1375);
  });

  it("handles zero overtime hours", () => {
    const result = calculateOvertime({
      regularRate: 30,
      regularHours: 40,
      overtimeHours: 0,
      overtimeMultiplier: 1.5,
    });

    expect(result.regularPay).toBe(1200);
    expect(result.overtimePay).toBe(0);
    expect(result.totalPay).toBe(1200);
  });

  it("handles double-time (2x) overtime", () => {
    const result = calculateOvertime({
      regularRate: 20,
      regularHours: 40,
      overtimeHours: 8,
      overtimeMultiplier: 2,
    });

    expect(result.overtimePay).toBe(320); // 20 * 2 * 8
    expect(result.totalPay).toBe(1120); // 800 + 320
  });

  it("returns zeros for negative rate", () => {
    const result = calculateOvertime({
      regularRate: -10,
      regularHours: 40,
      overtimeHours: 10,
      overtimeMultiplier: 1.5,
    });

    expect(result.regularPay).toBe(0);
    expect(result.overtimePay).toBe(0);
    expect(result.totalPay).toBe(0);
  });

  it("returns zeros for negative hours", () => {
    const result = calculateOvertime({
      regularRate: 25,
      regularHours: -5,
      overtimeHours: 10,
      overtimeMultiplier: 1.5,
    });

    expect(result.totalPay).toBe(0);
  });
});
