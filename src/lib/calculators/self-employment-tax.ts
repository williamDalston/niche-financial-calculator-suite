export type SEFilingStatus = "single" | "married" | "head";

const SS_WAGE_BASE = 168600;
const SE_TAX_RATE_SS = 0.124;
const SE_TAX_RATE_MEDICARE = 0.029;
const ADDITIONAL_MEDICARE_THRESHOLD = 200000;
const ADDITIONAL_MEDICARE_RATE = 0.009;

export interface SelfEmploymentTaxInput {
  netIncome: number;
  filingStatus: SEFilingStatus;
}

export interface SelfEmploymentTaxResult {
  seTax: number;
  socialSecurityTax: number;
  medicareTax: number;
  deductibleHalf: number;
  effectiveRate: number;
}

export function calculateSelfEmploymentTax(input: SelfEmploymentTaxInput): SelfEmploymentTaxResult {
  const { netIncome, filingStatus } = input;

  if (netIncome <= 0) {
    return {
      seTax: 0,
      socialSecurityTax: 0,
      medicareTax: 0,
      deductibleHalf: 0,
      effectiveRate: 0,
    };
  }

  // SE tax is calculated on 92.35% of net SE income
  const seTaxableIncome = netIncome * 0.9235;

  // Social Security portion (12.4% up to wage base)
  const ssTaxable = Math.min(seTaxableIncome, SS_WAGE_BASE);
  const socialSecurityTax = ssTaxable * SE_TAX_RATE_SS;

  // Medicare portion (2.9% on all SE income)
  const medicareTax = seTaxableIncome * SE_TAX_RATE_MEDICARE;

  // Additional Medicare (0.9% over $200k combined income)
  const additionalMedicareBase = Math.max(
    netIncome - ADDITIONAL_MEDICARE_THRESHOLD,
    0
  );
  const additionalMedicare = Math.min(
    additionalMedicareBase,
    seTaxableIncome
  ) * ADDITIONAL_MEDICARE_RATE;

  const seTax = socialSecurityTax + medicareTax + additionalMedicare;

  // Deduction for half of SE tax
  const deductibleHalf = seTax / 2;

  // Effective rate
  const effectiveRate = netIncome > 0 ? (seTax / netIncome) * 100 : 0;

  return {
    seTax,
    socialSecurityTax,
    medicareTax,
    deductibleHalf,
    effectiveRate,
  };
}
