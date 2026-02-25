export interface MortgageInput {
  homePrice: number;
  downPayment: number;
  loanTermYears: number;
  interestRate: number; // e.g. 7 for 7%
}

export interface AmortizationYearlyEntry {
  year: number;
  principalPaid: number;
  interestPaid: number;
  balance: number;
  totalPrincipal: number;
  totalInterest: number;
}

export interface AmortizationMonthlyEntry {
  month: number;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  balance: number;
}

export interface MortgageResult {
  monthlyPayment: number;
  loanAmount: number;
  totalInterest: number;
  totalCost: number;
  amortizationSchedule: AmortizationYearlyEntry[];
  amortizationMonthly: AmortizationMonthlyEntry[];
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const { homePrice, downPayment, loanTermYears, interestRate } = input;
  const principal = Math.max(homePrice - downPayment, 0);
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTermYears * 12;

  if (principal <= 0 || interestRate <= 0) {
    return {
      monthlyPayment: 0,
      loanAmount: principal,
      totalInterest: 0,
      totalCost: 0,
      amortizationSchedule: [],
      amortizationMonthly: [],
    };
  }

  const factor = Math.pow(1 + monthlyRate, numPayments);
  const monthlyPayment = principal * ((monthlyRate * factor) / (factor - 1));
  const totalCost = monthlyPayment * numPayments;
  const totalInterest = totalCost - principal;

  const amortizationMonthly: AmortizationMonthlyEntry[] = [];
  const amortizationSchedule: AmortizationYearlyEntry[] = [];

  let balance = principal;
  let cumulativePrincipal = 0;
  let cumulativeInterest = 0;

  for (let m = 1; m <= numPayments; m++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance = Math.max(balance - principalPayment, 0);

    cumulativePrincipal += principalPayment;
    cumulativeInterest += interestPayment;

    amortizationMonthly.push({
      month: m,
      payment: Math.round(monthlyPayment * 100) / 100,
      principalPaid: Math.round(principalPayment * 100) / 100,
      interestPaid: Math.round(interestPayment * 100) / 100,
      balance: Math.round(balance * 100) / 100,
    });

    if (m % 12 === 0) {
      const year = m / 12;
      const yearStart = (year - 1) * 12;
      let yearPrincipal = 0;
      let yearInterest = 0;
      for (let i = yearStart; i < m; i++) {
        yearPrincipal += amortizationMonthly[i].principalPaid;
        yearInterest += amortizationMonthly[i].interestPaid;
      }
      amortizationSchedule.push({
        year,
        principalPaid: Math.round(yearPrincipal),
        interestPaid: Math.round(yearInterest),
        balance: Math.round(balance),
        totalPrincipal: Math.round(cumulativePrincipal),
        totalInterest: Math.round(cumulativeInterest),
      });
    }
  }

  return {
    monthlyPayment,
    loanAmount: principal,
    totalInterest,
    totalCost,
    amortizationSchedule,
    amortizationMonthly,
  };
}
