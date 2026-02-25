export interface SalaryToHourlyInput {
  annualSalary: number;
  hoursPerWeek: number;
  weeksPerYear: number;
}

export interface SalaryToHourlyResult {
  hourly: number;
  daily: number;
  weekly: number;
  biweekly: number;
  monthly: number;
}

export function salaryToHourly(input: SalaryToHourlyInput): SalaryToHourlyResult {
  const { annualSalary, hoursPerWeek, weeksPerYear } = input;
  const totalHours = hoursPerWeek * weeksPerYear;

  if (totalHours <= 0 || annualSalary < 0) {
    return {
      hourly: 0,
      daily: 0,
      weekly: 0,
      biweekly: 0,
      monthly: 0,
    };
  }

  const hourly = annualSalary / totalHours;
  const daily = hourly * (hoursPerWeek / 5); // Assume 5-day work week
  const weekly = annualSalary / weeksPerYear;
  const biweekly = annualSalary / 26;
  const monthly = annualSalary / 12;

  return { hourly, daily, weekly, biweekly, monthly };
}

export interface HourlyToSalaryInput {
  hourlyRate: number;
  hoursPerWeek: number;
  weeksPerYear: number;
}

export interface HourlyToSalaryResult {
  annual: number;
  monthly: number;
  biweekly: number;
  weekly: number;
  daily: number;
}

export function hourlyToSalary(input: HourlyToSalaryInput): HourlyToSalaryResult {
  const { hourlyRate, hoursPerWeek, weeksPerYear } = input;

  if (hoursPerWeek <= 0 || weeksPerYear <= 0 || hourlyRate < 0) {
    return {
      annual: 0,
      monthly: 0,
      biweekly: 0,
      weekly: 0,
      daily: 0,
    };
  }

  const annual = hourlyRate * hoursPerWeek * weeksPerYear;
  const monthly = annual / 12;
  const biweekly = annual / 26;
  const weekly = annual / weeksPerYear;
  const daily = hourlyRate * (hoursPerWeek / 5);

  return { annual, monthly, biweekly, weekly, daily };
}

export interface OvertimeInput {
  regularRate: number;
  regularHours: number;
  overtimeHours: number;
  overtimeMultiplier: number;
}

export interface OvertimeResult {
  regularPay: number;
  overtimePay: number;
  totalPay: number;
}

export function calculateOvertime(input: OvertimeInput): OvertimeResult {
  const { regularRate, regularHours, overtimeHours, overtimeMultiplier } = input;

  if (regularRate < 0 || regularHours < 0 || overtimeHours < 0 || overtimeMultiplier < 0) {
    return { regularPay: 0, overtimePay: 0, totalPay: 0 };
  }

  const regularPay = regularRate * regularHours;
  const overtimePay = regularRate * overtimeMultiplier * overtimeHours;
  const totalPay = regularPay + overtimePay;

  return { regularPay, overtimePay, totalPay };
}
