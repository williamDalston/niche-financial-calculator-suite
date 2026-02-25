/* ------------------------------------------------------------------ */
/*  Shared calculator metadata                                        */
/*  Imported by category hub pages, the homepage, and any component   */
/*  that needs the full list of calculators.                           */
/* ------------------------------------------------------------------ */

export interface CalculatorInfo {
  title: string;
  slug: string;
  description: string;
  icon: string; // emoji
  category: { name: string; slug: string };
  searchVolume?: string; // for reference
}

/* ------------------------------------------------------------------ */
/*  Categories                                                        */
/* ------------------------------------------------------------------ */

export const categories = {
  mortgageAndHousing: {
    name: "Mortgage & Housing",
    slug: "mortgage-and-housing",
  },
  salaryAndCareer: {
    name: "Salary & Career",
    slug: "salary-and-career",
  },
  retirementAndInvesting: {
    name: "Retirement & Investing",
    slug: "retirement-and-investing",
  },
  taxCalculators: {
    name: "Tax Calculators",
    slug: "tax-calculators",
  },
  debtAndLoans: {
    name: "Debt & Loans",
    slug: "debt-and-loans",
  },
  governmentPay: {
    name: "Government Pay",
    slug: "government-pay",
  },
} as const;

/* ------------------------------------------------------------------ */
/*  All 30 calculators                                                */
/* ------------------------------------------------------------------ */

export const calculators: CalculatorInfo[] = [
  /* ---- Mortgage & Housing ---- */
  {
    title: "Mortgage Calculator",
    slug: "mortgage-calculator",
    description:
      "Calculate your monthly mortgage payment, total interest, and amortization schedule for any home loan.",
    icon: "🏡",
    category: categories.mortgageAndHousing,
    searchVolume: "823K",
  },
  {
    title: "Home Affordability Calculator",
    slug: "home-affordability-calculator",
    description:
      "Find out how much house you can afford based on your income, debts, and down payment.",
    icon: "🏠",
    category: categories.mortgageAndHousing,
    searchVolume: "74K",
  },
  {
    title: "Rent vs Buy Calculator",
    slug: "rent-vs-buy-calculator",
    description:
      "Compare the long-term financial impact of renting versus buying a home in your area.",
    icon: "🔑",
    category: categories.mortgageAndHousing,
    searchVolume: "27K",
  },
  {
    title: "Auto Loan Calculator",
    slug: "auto-loan-calculator",
    description:
      "Calculate monthly car payments, total loan costs, and interest for any vehicle financing.",
    icon: "🚗",
    category: categories.debtAndLoans,
    searchVolume: "301K",
  },

  /* ---- Salary & Career ---- */
  {
    title: "Salary to Hourly Converter",
    slug: "salary-to-hourly",
    description:
      "Convert your annual salary to an hourly rate plus daily, weekly, biweekly, and monthly breakdowns.",
    icon: "💵",
    category: categories.salaryAndCareer,
    searchVolume: "165K",
  },
  {
    title: "Hourly to Salary Converter",
    slug: "hourly-to-salary",
    description:
      "Convert your hourly wage to an equivalent annual salary and see all pay period breakdowns.",
    icon: "⏱️",
    category: categories.salaryAndCareer,
    searchVolume: "60K",
  },
  {
    title: "Take-Home Pay Calculator",
    slug: "take-home-pay-calculator",
    description:
      "Estimate your net pay after federal and state taxes, FICA, and deductions are applied.",
    icon: "💰",
    category: categories.salaryAndCareer,
    searchVolume: "90K",
  },
  {
    title: "Overtime Calculator",
    slug: "overtime-calculator",
    description:
      "Calculate overtime pay at 1.5x or 2x rates and see how extra hours affect your paycheck.",
    icon: "⏰",
    category: categories.salaryAndCareer,
    searchVolume: "33K",
  },
  {
    title: "Raise Calculator",
    slug: "raise-calculator",
    description:
      "See how a salary raise or percentage increase affects your annual, monthly, and hourly pay.",
    icon: "📈",
    category: categories.salaryAndCareer,
    searchVolume: "18K",
  },
  {
    title: "Freelance Rate Calculator",
    slug: "freelance-rate-calculator",
    description:
      "Determine the hourly or project rate you need to charge to match a salaried position's total compensation.",
    icon: "💻",
    category: categories.salaryAndCareer,
    searchVolume: "12K",
  },
  {
    title: "Cost of Living Calculator",
    slug: "cost-of-living-calculator",
    description:
      "Compare the cost of living between two cities and see what salary adjustment you would need.",
    icon: "🏙️",
    category: categories.salaryAndCareer,
    searchVolume: "110K",
  },
  {
    title: "Tip Calculator",
    slug: "tip-calculator",
    description:
      "Calculate tips for any bill amount, split between multiple people, with customizable tip percentages.",
    icon: "🧾",
    category: categories.salaryAndCareer,
    searchVolume: "201K",
  },
  {
    title: "Wage Gap Calculator",
    slug: "wage-gap-calculator",
    description:
      "Explore earnings differences across demographics and understand the adjusted and unadjusted wage gap.",
    icon: "⚖️",
    category: categories.salaryAndCareer,
    searchVolume: "8K",
  },

  /* ---- Retirement & Investing ---- */
  {
    title: "Retirement Calculator",
    slug: "retirement-calculator",
    description:
      "Estimate how much you need to save for retirement and whether you are on track to reach your goals.",
    icon: "🏖️",
    category: categories.retirementAndInvesting,
    searchVolume: "246K",
  },
  {
    title: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    description:
      "See how your investments grow over time with the power of compound interest and regular contributions.",
    icon: "📊",
    category: categories.retirementAndInvesting,
    searchVolume: "165K",
  },
  {
    title: "401(k) Calculator",
    slug: "401k-calculator",
    description:
      "Project your 401(k) balance at retirement based on contributions, employer match, and investment growth.",
    icon: "🏦",
    category: categories.retirementAndInvesting,
    searchVolume: "74K",
  },
  {
    title: "Social Security Estimator",
    slug: "social-security-estimator",
    description:
      "Estimate your Social Security benefits based on your earnings history and planned retirement age.",
    icon: "🇺🇸",
    category: categories.retirementAndInvesting,
    searchVolume: "40K",
  },
  {
    title: "Pension Calculator",
    slug: "pension-calculator",
    description:
      "Calculate your expected pension benefit based on years of service, salary, and plan multiplier.",
    icon: "📋",
    category: categories.retirementAndInvesting,
    searchVolume: "22K",
  },
  {
    title: "Net Worth Calculator",
    slug: "net-worth-calculator",
    description:
      "Add up all your assets and liabilities to see your total net worth and track it over time.",
    icon: "💎",
    category: categories.retirementAndInvesting,
    searchVolume: "40K",
  },
  {
    title: "Emergency Fund Calculator",
    slug: "emergency-fund-calculator",
    description:
      "Determine how much you need in your emergency fund based on monthly expenses and risk factors.",
    icon: "🛟",
    category: categories.retirementAndInvesting,
    searchVolume: "14K",
  },
  {
    title: "Inflation Calculator",
    slug: "inflation-calculator",
    description:
      "See how inflation erodes purchasing power over time and what your money will be worth in the future.",
    icon: "📉",
    category: categories.retirementAndInvesting,
    searchVolume: "110K",
  },

  /* ---- Tax Calculators ---- */
  {
    title: "Federal Tax Estimator",
    slug: "federal-tax-calculator",
    description:
      "Estimate your federal income tax liability based on filing status, income, deductions, and credits.",
    icon: "🏛️",
    category: categories.taxCalculators,
    searchVolume: "90K",
  },
  {
    title: "Take-Home Pay Calculator",
    slug: "take-home-pay-calculator",
    description:
      "Estimate your net pay after federal and state taxes, FICA, and deductions are applied.",
    icon: "💰",
    category: categories.taxCalculators,
    searchVolume: "90K",
  },
  {
    title: "Self-Employment Tax Calculator",
    slug: "self-employment-tax-calculator",
    description:
      "Calculate self-employment tax (Social Security + Medicare) on your freelance or business income.",
    icon: "📝",
    category: categories.taxCalculators,
    searchVolume: "27K",
  },

  /* ---- Debt & Loans ---- */
  {
    title: "Loan Payment Calculator",
    slug: "loan-calculator",
    description:
      "Compute monthly payments, total interest, and payoff timeline for any fixed-rate loan.",
    icon: "💳",
    category: categories.debtAndLoans,
    searchVolume: "135K",
  },
  {
    title: "Student Loan Calculator",
    slug: "student-loan-calculator",
    description:
      "Estimate monthly student loan payments and total repayment cost across different repayment plans.",
    icon: "🎓",
    category: categories.debtAndLoans,
    searchVolume: "49K",
  },
  {
    title: "Debt Payoff Calculator",
    slug: "debt-payoff-calculator",
    description:
      "Create a debt payoff plan using the avalanche or snowball method and see your debt-free date.",
    icon: "🎯",
    category: categories.debtAndLoans,
    searchVolume: "22K",
  },

  /* ---- Government Pay ---- */
  {
    title: "GS Pay Calculator",
    slug: "gs-pay-calculator",
    description:
      "Look up federal GS pay with locality adjustments for all grades 1-15 and steps 1-10.",
    icon: "🏛️",
    category: categories.governmentPay,
    searchVolume: "74K",
  },
  {
    title: "Military Pay Calculator",
    slug: "military-pay-calculator",
    description:
      "Calculate military base pay, BAH, BAS, and total compensation for all ranks and years of service.",
    icon: "🎖️",
    category: categories.governmentPay,
    searchVolume: "40K",
  },
  {
    title: "FERS Retirement Calculator",
    slug: "fers-retirement-calculator",
    description:
      "Estimate your Federal Employees Retirement System annuity based on years of service and high-3 salary.",
    icon: "🗓️",
    category: categories.governmentPay,
    searchVolume: "18K",
  },
  {
    title: "TSP Calculator",
    slug: "tsp-calculator",
    description:
      "Project your Thrift Savings Plan balance at retirement with government matching contributions.",
    icon: "📈",
    category: categories.governmentPay,
    searchVolume: "22K",
  },
];

/* ------------------------------------------------------------------ */
/*  Helper: get calculators by category slug                          */
/* ------------------------------------------------------------------ */

export function getCalculatorsByCategory(
  categorySlug: string
): CalculatorInfo[] {
  return calculators.filter((c) => c.category.slug === categorySlug);
}

/* ------------------------------------------------------------------ */
/*  Helper: get unique calculators for a category (+ cross-listings)  */
/*  Some calculators appear in multiple categories (e.g. Auto Loan    */
/*  appears in both Mortgage & Housing and Debt & Loans). This helper */
/*  returns a deduplicated list by slug.                              */
/* ------------------------------------------------------------------ */

export function getCalculatorsForCategoryPage(
  categorySlug: string,
  additionalSlugs: string[] = []
): CalculatorInfo[] {
  const byCat = getCalculatorsByCategory(categorySlug);
  const additional = additionalSlugs
    .map((slug) => calculators.find((c) => c.slug === slug))
    .filter((c): c is CalculatorInfo => c !== undefined);

  const seen = new Set<string>();
  const result: CalculatorInfo[] = [];
  for (const calc of [...byCat, ...additional]) {
    if (!seen.has(calc.slug)) {
      seen.add(calc.slug);
      result.push(calc);
    }
  }
  return result;
}
