export type FilingStatus = "single" | "mfj" | "mfs" | "hoh";

export interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

export const BRACKETS: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
  mfj: [
    { min: 0, max: 23200, rate: 0.10 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 },
  ],
  mfs: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 365600, rate: 0.35 },
    { min: 365600, max: Infinity, rate: 0.37 },
  ],
  hoh: [
    { min: 0, max: 16550, rate: 0.10 },
    { min: 16550, max: 63100, rate: 0.12 },
    { min: 63100, max: 100500, rate: 0.22 },
    { min: 100500, max: 191950, rate: 0.24 },
    { min: 191950, max: 243700, rate: 0.32 },
    { min: 243700, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
};

export const STANDARD_DEDUCTIONS: Record<FilingStatus, number> = {
  single: 14600,
  mfj: 29200,
  mfs: 14600,
  hoh: 21900,
};

export interface FederalTaxInput {
  income: number;
  filingStatus: FilingStatus;
  deductions?: number; // If provided, overrides standard deduction
}

export interface BracketBreakdown {
  bracket: string;
  amount: number;
  rate: number;
}

export interface FederalTaxResult {
  taxableIncome: number;
  federalTax: number;
  effectiveRate: number;
  marginalRate: number;
  bracketBreakdown: BracketBreakdown[];
}

export function calculateFederalTax(input: FederalTaxInput): FederalTaxResult {
  const { income, filingStatus, deductions } = input;

  const deductionAmount = deductions !== undefined ? deductions : STANDARD_DEDUCTIONS[filingStatus];
  const taxableIncome = Math.max(income - deductionAmount, 0);
  const brackets = BRACKETS[filingStatus];

  let totalTax = 0;
  let marginalRate = 0;
  const bracketBreakdown: BracketBreakdown[] = [];

  for (const bracket of brackets) {
    if (taxableIncome <= bracket.min) break;
    const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
    const taxInBracket = taxableInBracket * bracket.rate;
    totalTax += taxInBracket;
    marginalRate = bracket.rate;

    if (taxInBracket > 0) {
      bracketBreakdown.push({
        bracket: `${(bracket.rate * 100).toFixed(0)}%`,
        amount: Math.round(taxInBracket),
        rate: bracket.rate,
      });
    }
  }

  const effectiveRate = income > 0 ? totalTax / income : 0;

  return {
    taxableIncome,
    federalTax: totalTax,
    effectiveRate,
    marginalRate,
    bracketBreakdown,
  };
}
