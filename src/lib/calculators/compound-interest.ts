export interface CompoundInterestInput {
  principal: number;
  monthlyContribution: number;
  annualRate: number; // e.g. 8 for 8%
  years: number;
  compoundingFrequency: string; // "daily" | "monthly" | "quarterly" | "annually"
}

export interface YearlyBreakdownEntry {
  year: number;
  contributions: number;
  interest: number;
  total: number;
}

export interface CompoundInterestResult {
  futureValue: number;
  totalContributions: number;
  totalInterest: number;
  yearlyBreakdown: YearlyBreakdownEntry[];
}

const COMPOUNDING_OPTIONS: Record<string, number> = {
  daily: 365,
  monthly: 12,
  quarterly: 4,
  annually: 1,
};

export function calculateCompoundInterest(input: CompoundInterestInput): CompoundInterestResult {
  const { principal, monthlyContribution, annualRate, years, compoundingFrequency } = input;
  const rate = annualRate / 100;
  const n = COMPOUNDING_OPTIONS[compoundingFrequency] || 12;

  if (rate <= 0 || years <= 0) {
    const totalContributed = principal + monthlyContribution * 12 * years;
    return {
      futureValue: totalContributed,
      totalContributions: totalContributed,
      totalInterest: 0,
      yearlyBreakdown: [],
    };
  }

  const yearlyBreakdown: YearlyBreakdownEntry[] = [];

  let balance = principal;
  let totalContributed = principal;

  const periodsPerYear = n;
  const contributionPerPeriod = (monthlyContribution * 12) / periodsPerYear;
  const ratePerPeriod = rate / periodsPerYear;

  for (let year = 1; year <= years; year++) {
    for (let period = 0; period < periodsPerYear; period++) {
      balance = balance * (1 + ratePerPeriod) + contributionPerPeriod;
    }

    totalContributed += monthlyContribution * 12;
    const interest = Math.max(balance - totalContributed, 0);

    yearlyBreakdown.push({
      year,
      contributions: Math.round(totalContributed),
      interest: Math.round(interest),
      total: Math.round(balance),
    });
  }

  const lastEntry = yearlyBreakdown[yearlyBreakdown.length - 1];

  return {
    futureValue: lastEntry?.total || principal,
    totalContributions: lastEntry?.contributions || principal,
    totalInterest: lastEntry?.interest || 0,
    yearlyBreakdown,
  };
}
