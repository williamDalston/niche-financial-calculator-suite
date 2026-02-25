import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const RetirementCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.RetirementCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Retirement Savings Calculator | CalcEngine",
  description:
    "Calculate how much you need to save for retirement. See your projected savings growth, total contributions, and inflation-adjusted value over time.",
  openGraph: {
    title: "Retirement Savings Calculator | CalcEngine",
    description:
      "Calculate how much you need to save for retirement. See your projected savings growth, total contributions, and inflation-adjusted value over time.",
    url: "https://calcengine.io/calculators/retirement-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Retirement Savings Calculator | CalcEngine",
    description:
      "Calculate how much you need to save for retirement. See your projected savings growth, total contributions, and inflation-adjusted value over time.",
  },
  alternates: {
    canonical: "/calculators/retirement-calculator",
  },
};

const howItWorks = `
<p>The retirement savings calculator projects how your savings will grow between now and your target retirement age. It factors in your current savings, monthly contributions, expected investment returns, and inflation to give you a realistic picture of your retirement readiness.</p>

<h3>The Power of Compound Growth</h3>
<p>Compound interest is the most powerful force in long-term investing. When your investments earn returns, those returns are reinvested and themselves begin earning returns. Over decades, this compounding effect can turn modest monthly contributions into a substantial nest egg. For example, saving $500/month starting at age 25 with a 7% average return grows to approximately $1.2 million by age 65 — even though you only contributed $240,000 out of pocket.</p>

<h3>How the Calculation Works</h3>
<p>The calculator uses the future value formula for compound interest with regular contributions. It takes your current savings balance and compounds it forward at the expected annual return rate, then adds the accumulated value of your monthly contributions (also compounded over time). The formula accounts for monthly compounding to give you the most accurate projection.</p>

<p>The inflation adjustment is equally important. A million dollars in 30 years will not buy what a million dollars buys today. If inflation averages 3%, $1,000,000 in 30 years has the purchasing power of about $412,000 in today's dollars. The inflation-adjusted value shown in the results gives you a more realistic sense of your future purchasing power.</p>

<h3>Understanding the Growth Chart</h3>
<p>The area chart displays two stacked regions: your total contributions (the money you actually put in) and your investment growth (returns earned on your money). In the early years, contributions make up the majority of your balance. But as compounding takes effect, investment growth begins to dominate. For long time horizons (30+ years), growth often exceeds total contributions by a factor of 2-3x or more.</p>

<h3>Choosing Your Expected Return Rate</h3>
<p>The expected annual return rate depends on your investment allocation. Historically, the S&P 500 has returned approximately 10% annually before inflation (about 7% after inflation). A balanced portfolio of 60% stocks and 40% bonds has historically returned about 8-9% before inflation. Conservative estimates (6-7%) are appropriate if you want a margin of safety or are closer to retirement with a more conservative allocation.</p>

<h3>What This Calculator Does Not Include</h3>
<p>This is a simplified projection tool. It does not account for variable returns (markets do not return a steady rate every year), taxes on investment gains, Required Minimum Distributions (RMDs), Social Security benefits, pension income, or changes in contribution levels over time. For comprehensive retirement planning, consider consulting a fee-only financial planner who can model multiple scenarios and income sources.</p>
`;

const formula = `Future Value = PV(1 + r)^n + PMT x [((1 + r)^n - 1) / r]

Where:
  PV  = Present value (current savings)
  r   = Monthly interest rate (annual rate / 12)
  n   = Total months until retirement ((retirement age - current age) x 12)
  PMT = Monthly contribution

Inflation-Adjusted Value = Future Value / (1 + inflation_rate)^years
Total Contributions = Current Savings + (Monthly Contribution x n)
Total Growth = Future Value - Total Contributions`;

const faqs = [
  {
    question: "How much do I need to retire comfortably?",
    answer:
      "A common guideline is to have 25 times your desired annual retirement spending saved (the '4% rule'). If you want $60,000/year in retirement income, you would need $1.5 million. However, this depends on your lifestyle, location, health care needs, and other income sources like Social Security. Many financial planners suggest aiming for 70-80% of your pre-retirement income.",
  },
  {
    question: "What rate of return should I assume?",
    answer:
      "For a diversified stock portfolio, 7% after inflation (or 10% before inflation) is a commonly used historical average based on long-term S&P 500 returns. For a balanced portfolio (60/40 stocks/bonds), 6% after inflation is reasonable. If you want conservative estimates, use 5-6%. The lower your assumed return, the more you should plan to save.",
  },
  {
    question: "When should I start saving for retirement?",
    answer:
      "As early as possible. Thanks to compound interest, starting at 25 instead of 35 can nearly double your retirement savings even with identical monthly contributions. For example, saving $400/month at 7% from age 25 to 65 yields about $958,000. Starting the same savings at 35 yields only about $453,000 — less than half, despite saving for only 10 fewer years.",
  },
  {
    question: "Should I contribute to a 401(k) or IRA?",
    answer:
      "If your employer offers a 401(k) match, always contribute enough to get the full match — it is free money. Beyond that, a Roth IRA offers tax-free growth and withdrawals in retirement (income limits apply). Traditional 401(k) and IRA contributions reduce your current taxable income. Many people use a combination: contribute to their 401(k) up to the match, max out a Roth IRA, then put additional funds back into the 401(k).",
  },
  {
    question: "What is the 4% rule?",
    answer:
      "The 4% rule suggests you can withdraw 4% of your retirement portfolio in the first year of retirement, then adjust for inflation each year, and your money should last at least 30 years. Based on a $1 million portfolio, you would withdraw $40,000 in year one. While this rule has been debated (some suggest 3.5% is safer), it remains a useful starting point for retirement planning.",
  },
  {
    question: "How does inflation affect my retirement savings?",
    answer:
      "Inflation erodes purchasing power over time. At 3% annual inflation, prices roughly double every 24 years. So $50,000 of annual spending today would require about $100,000 in 24 years to maintain the same lifestyle. This is why the inflation-adjusted value in the calculator is so important — it shows what your future savings will be worth in today's dollars.",
  },
  {
    question: "Can I catch up if I started saving late?",
    answer:
      "Yes, but you will need to save more aggressively. Workers 50 and older can make catch-up contributions to 401(k) plans ($7,500 extra in 2024) and IRAs ($1,000 extra). Consider maximizing these limits, reducing expenses, working a few extra years, and exploring other savings vehicles. Even starting at 45, consistent savings of $1,500/month at 7% can grow to about $730,000 by age 65.",
  },
];

const relatedCalculators = [
  {
    title: "401(k) Calculator",
    slug: "401k-calculator",
    description: "Maximize your 401(k) contributions and employer match.",
    icon: "🏦",
  },
  {
    title: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    description: "See how compound interest grows your investments over time.",
    icon: "📊",
  },
  {
    title: "Social Security Estimator",
    slug: "social-security-estimator",
    description: "Estimate your Social Security benefits at different ages.",
    icon: "🔒",
  },
  {
    title: "FERS Retirement Calculator",
    slug: "fers-retirement-calculator",
    description: "Calculate federal employee retirement benefits under FERS.",
    icon: "🏛️",
  },
];

const editorialContent = `
<h2>Building Your Retirement Plan</h2>
<p>Retirement planning is one of the most important financial exercises you can undertake. The decisions you make today about saving and investing will determine your quality of life for potentially 20-30+ years of retirement.</p>

<h3>The Three-Legged Stool</h3>
<p>Retirement income traditionally came from three sources: Social Security, employer pensions, and personal savings. Today, pensions are rare in the private sector, making personal savings and Social Security the primary sources for most Americans. Social Security replaces roughly 40% of pre-retirement income for average earners, meaning personal savings need to fill the remaining gap.</p>

<h3>Asset Allocation by Age</h3>
<p>A traditional rule of thumb suggests holding your age as a percentage in bonds (a 30-year-old would hold 30% bonds, 70% stocks). Many modern advisors suggest a more aggressive approach, such as "age minus 20" in bonds, especially given longer life expectancies and low bond yields. The key principle is that younger investors can tolerate more risk (and higher expected returns) because they have decades to recover from market downturns.</p>

<p>As you approach retirement, gradually shifting toward more conservative investments protects your nest egg from a major market downturn right when you need the money. This process, called a "glide path," is automatically managed by target-date funds, which are popular 401(k) options.</p>

<h3>Common Retirement Planning Mistakes</h3>
<p>The biggest mistake is not starting early enough. Every year of delay costs you significantly due to lost compounding. Other common errors include: not contributing enough to get the full employer 401(k) match (leaving free money on the table), being too conservative with investments when young, not accounting for healthcare costs in retirement ($315,000 estimated for a 65-year-old couple in 2024), and underestimating how long retirement will last.</p>
`;

export default function RetirementCalculatorPage() {
  return (
    <CalculatorLayout
      title="Retirement Savings Calculator"
      description="Project your retirement savings growth based on your current savings, monthly contributions, and expected returns. See inflation-adjusted values."
      slug="retirement-calculator"
      category={{ name: "Retirement & Investing", slug: "retirement-and-investing" }}
      ctaText="Start investing with as little as $1"
      ctaHref="https://www.wealthfront.com"
      ctaDescription="Automated investing with tax-loss harvesting and financial planning tools."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <RetirementCalculatorWidget />
    </CalculatorLayout>
  );
}
