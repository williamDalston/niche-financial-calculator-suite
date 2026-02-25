export interface LoanPaymentInput {
  principal: number;
  annualRate: number; // e.g. 5 for 5%
  termMonths: number;
}

export interface LoanPaymentResult {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
}

export function calculateLoanPayment(input: LoanPaymentInput): LoanPaymentResult {
  const { principal, annualRate, termMonths } = input;
  const monthlyRate = annualRate / 100 / 12;

  if (principal <= 0 || termMonths <= 0) {
    return {
      monthlyPayment: 0,
      totalInterest: 0,
      totalCost: 0,
    };
  }

  let monthlyPayment: number;
  if (monthlyRate === 0) {
    monthlyPayment = principal / termMonths;
  } else {
    monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
      (Math.pow(1 + monthlyRate, termMonths) - 1);
  }

  const totalCost = monthlyPayment * termMonths;
  const totalInterest = totalCost - principal;

  return {
    monthlyPayment,
    totalInterest,
    totalCost,
  };
}
