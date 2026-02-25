export interface RetirementInput {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  annualReturn: number; // e.g. 7 for 7%
  inflationRate: number; // e.g. 3 for 3%
}

export interface YearlyProjectionEntry {
  age: number;
  year: number;
  contributions: number;
  growth: number;
  total: number;
  inflationAdjusted: number;
}

export interface RetirementResult {
  projectedBalance: number;
  inflationAdjustedBalance: number;
  totalContributions: number;
  totalGrowth: number;
  yearlyProjection: YearlyProjectionEntry[];
}

export function calculateRetirement(input: RetirementInput): RetirementResult {
  const { currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn, inflationRate } = input;
  const yearsToRetirement = Math.max(retirementAge - currentAge, 0);
  const monthlyRate = annualReturn / 100 / 12;

  if (yearsToRetirement <= 0) {
    return {
      projectedBalance: currentSavings,
      inflationAdjustedBalance: currentSavings,
      totalContributions: currentSavings,
      totalGrowth: 0,
      yearlyProjection: [],
    };
  }

  const yearlyProjection: YearlyProjectionEntry[] = [];

  let balance = currentSavings;
  let totalContributed = currentSavings;

  for (let year = 1; year <= yearsToRetirement; year++) {
    // Compound monthly for the year
    for (let month = 0; month < 12; month++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
    }

    totalContributed += monthlyContribution * 12;
    const growth = balance - totalContributed;
    const inflationFactor = Math.pow(1 + inflationRate / 100, year);
    const inflationAdjusted = balance / inflationFactor;

    yearlyProjection.push({
      age: currentAge + year,
      year,
      contributions: Math.round(totalContributed),
      growth: Math.round(Math.max(growth, 0)),
      total: Math.round(balance),
      inflationAdjusted: Math.round(inflationAdjusted),
    });
  }

  const lastEntry = yearlyProjection[yearlyProjection.length - 1];
  const projectedBalance = lastEntry?.total || currentSavings;
  const totalContributionsFinal = lastEntry?.contributions || currentSavings;
  const totalGrowth = lastEntry?.growth || 0;
  const inflationAdjustedBalance = lastEntry?.inflationAdjusted || currentSavings;

  return {
    projectedBalance,
    inflationAdjustedBalance,
    totalContributions: totalContributionsFinal,
    totalGrowth,
    yearlyProjection,
  };
}
