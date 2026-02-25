import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const CompoundInterestWidget = dynamic(() => import("./calculator").then((m) => m.CompoundInterestWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Compound Interest Calculator | CalcEngine",
  description:
    "Calculate compound interest with regular contributions. See how your money grows with daily, monthly, quarterly, or annual compounding over time.",
  openGraph: {
    title: "Compound Interest Calculator | CalcEngine",
    description:
      "Calculate compound interest with regular contributions. See how your money grows with daily, monthly, quarterly, or annual compounding over time.",
    url: "https://calcengine.io/calculators/compound-interest-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compound Interest Calculator | CalcEngine",
    description:
      "Calculate compound interest with regular contributions. See how your money grows with daily, monthly, quarterly, or annual compounding over time.",
  },
  alternates: {
    canonical: "/calculators/compound-interest-calculator",
  },
};

const howItWorks = `
<p>The compound interest calculator shows how an initial investment grows over time when interest is reinvested and compounds on itself. Add regular monthly contributions to see the powerful combined effect of consistent saving and compound growth.</p>

<h3>What Is Compound Interest?</h3>
<p>Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest (which is calculated only on the principal), compound interest causes your money to grow exponentially over time. Albert Einstein reportedly called compound interest the "eighth wonder of the world" — and while the attribution is debated, the math is undeniable.</p>

<p>Here is a simple example: invest $10,000 at 5% simple interest and after 30 years you have $25,000 ($10,000 principal + $15,000 interest). With compound interest at the same rate compounded annually, you have $43,219 — nearly twice as much, because each year's interest earns interest in subsequent years.</p>

<h3>How Compounding Frequency Matters</h3>
<p>The frequency of compounding affects your returns, though the differences narrow at lower interest rates. Daily compounding earns slightly more than monthly, which earns more than quarterly, which earns more than annually. The effective annual rate (EAR) captures this difference. For example, a 6% nominal rate compounded monthly yields an EAR of 6.168%, while the same rate compounded daily yields 6.183%. The difference is small but grows with larger balances and higher rates.</p>

<h3>The Role of Regular Contributions</h3>
<p>While the initial principal and interest rate get the most attention, regular monthly contributions are often the most impactful factor in building wealth. This is because each contribution begins its own compounding journey. A $200 monthly contribution at 7% annual return adds over $263,000 after 30 years — on top of just $72,000 in total contributions. The earlier and more consistently you contribute, the more compounding works in your favor.</p>

<h3>Understanding the Growth Chart</h3>
<p>The stacked area chart shows two components of your balance over time: total contributions (principal + all monthly deposits) and interest earned. In the early years, the contributions dominate. But watch how the interest portion accelerates and eventually surpasses contributions for long time horizons. This crossover point is where compound growth truly shines.</p>

<h3>Real-World Applications</h3>
<p>Compound interest applies to savings accounts, certificates of deposit (CDs), bonds, stock market returns, and retirement accounts. It also works against you with credit card debt and loans — which is why paying off high-interest debt should be a priority. A credit card balance compounding at 20% APR grows much faster than a savings account at 4% APY. Understanding compound interest helps you make smarter decisions on both sides of the equation.</p>

<h3>Limitations of This Calculator</h3>
<p>This calculator assumes a constant interest rate and regular contributions, which is useful for planning but does not reflect real-world variability. Stock market returns fluctuate year to year, and inflation erodes purchasing power. For retirement planning specifically, use our Retirement Calculator which includes inflation adjustment. Taxes on investment gains are also not included here — returns in tax-advantaged accounts (401k, IRA) grow tax-deferred, while taxable accounts may owe capital gains tax annually.</p>
`;

const formula = `A = P(1 + r/n)^(nt) + PMT x [((1 + r/n)^(nt) - 1) / (r/n)]

Where:
  A   = Final amount
  P   = Principal (initial investment)
  r   = Annual interest rate (decimal)
  n   = Compounding frequency per year
  t   = Time in years
  PMT = Monthly contribution (adjusted for compounding frequency)

Effective Annual Rate (EAR) = (1 + r/n)^n - 1
Total Contributions = P + (PMT x 12 x t)
Total Interest = A - Total Contributions`;

const faqs = [
  {
    question: "What is the difference between simple and compound interest?",
    answer:
      "Simple interest is calculated only on the original principal. Compound interest is calculated on the principal plus all previously accumulated interest. Over time, compound interest grows exponentially while simple interest grows linearly. For example, $10,000 at 8% for 20 years: simple interest yields $26,000, while compound interest yields $46,610.",
  },
  {
    question: "How often should interest compound for the best returns?",
    answer:
      "More frequent compounding yields slightly higher returns. Daily compounding is better than monthly, which is better than annually. However, the differences are relatively small. A $10,000 investment at 6% for 10 years yields $17,908 with annual compounding versus $18,194 with daily compounding — a difference of $286. The impact grows with higher rates and longer time periods.",
  },
  {
    question: "What is the Rule of 72?",
    answer:
      "The Rule of 72 is a quick way to estimate how long it takes to double your money. Divide 72 by the annual interest rate to get the approximate number of years. At 6% interest, your money doubles in about 12 years (72/6 = 12). At 8%, it doubles in about 9 years. At 10%, about 7.2 years. This rule is most accurate for rates between 4% and 12%.",
  },
  {
    question: "Does the stock market use compound interest?",
    answer:
      "The stock market does not pay interest in the traditional sense, but returns do compound. When you reinvest dividends and your stock holdings appreciate, those gains produce further gains. The S&P 500 has historically returned about 10% annually with dividends reinvested. Without reinvesting dividends, the return drops to about 6-7% — illustrating the power of compounding.",
  },
  {
    question: "What is the effective annual rate (EAR)?",
    answer:
      "The effective annual rate accounts for the impact of compounding frequency on the stated (nominal) interest rate. A savings account advertising 5% APY compounded daily has a nominal rate slightly below 5%. The EAR lets you compare accounts with different compounding frequencies on an apples-to-apples basis. Banks are required to disclose APY, which is the same as EAR.",
  },
  {
    question: "How does compound interest work with debt?",
    answer:
      "Compound interest works against you when you have debt. Credit cards typically compound daily at rates of 15-25% APR. A $5,000 balance at 20% APR with minimum payments can take over 20 years to pay off and cost over $8,000 in interest. This is why financial advisors recommend paying off high-interest debt before focusing on investing — the guaranteed 'return' from eliminating 20% interest debt exceeds most investment returns.",
  },
  {
    question: "What is a realistic rate of return to use?",
    answer:
      "For a diversified stock portfolio, 7-10% annually before inflation is historically reasonable. High-yield savings accounts currently offer 4-5% APY. CDs offer 4-5% for fixed terms. Bonds typically return 3-5%. For planning purposes, many advisors recommend using conservative estimates (6-7% for stocks, 3-4% for bonds) to build in a margin of safety.",
  },
];

const relatedCalculators = [
  {
    title: "Retirement Calculator",
    slug: "retirement-calculator",
    description: "Project your retirement savings with inflation adjustment.",
    icon: "🏖️",
  },
  {
    title: "401(k) Calculator",
    slug: "401k-calculator",
    description: "Optimize your 401(k) contributions and employer matching.",
    icon: "🏦",
  },
  {
    title: "Emergency Fund Calculator",
    slug: "emergency-fund-calculator",
    description: "Calculate how much you need in your emergency fund.",
    icon: "🛟",
  },
  {
    title: "Inflation Calculator",
    slug: "inflation-calculator",
    description: "See how inflation affects your money's purchasing power.",
    icon: "📉",
  },
];

const editorialContent = `
<h2>Harnessing the Power of Compound Interest</h2>
<p>Compound interest is the single most important concept in personal finance. Whether you are saving for retirement, building an emergency fund, or investing for a long-term goal, understanding how compounding works gives you a massive advantage.</p>

<h3>Time Is Your Greatest Asset</h3>
<p>The most critical variable in the compound interest formula is time. Consider two investors: Alice starts investing $300/month at age 22 and stops at age 32 (10 years, $36,000 total). Bob starts at age 32 and invests $300/month until age 62 (30 years, $108,000 total). Assuming 8% annual returns, Alice ends up with approximately $537,000 at age 62, while Bob has approximately $447,000. Alice invested a third of the money but ended up with more — because her money had an extra 10 years to compound.</p>

<h3>The Three Levers of Growth</h3>
<p>You can accelerate compound growth by pulling three levers: increase your contributions, increase your rate of return, or increase your time horizon. Of these, time is the most powerful due to the exponential nature of compounding. But for those with shorter horizons, increasing contributions has the most immediate and predictable impact, since investment returns are never guaranteed.</p>

<h3>Compound Interest in Everyday Decisions</h3>
<p>Understanding compound interest changes how you think about spending. That $5 daily coffee habit costs $1,825 per year. Invested at 8% annually for 30 years, that same money would grow to approximately $223,000. This is not an argument against buying coffee — it is an illustration of the opportunity cost of any spending decision when viewed through the lens of compounding. Small, consistent investments matter enormously over long periods.</p>
`;

export default function CompoundInterestCalculatorPage() {
  return (
    <CalculatorLayout
      title="Compound Interest Calculator"
      description="Calculate how your money grows with compound interest. See the impact of regular contributions and different compounding frequencies over time."
      slug="compound-interest-calculator"
      category={{ name: "Retirement & Investing", slug: "retirement-and-investing" }}
      ctaText="See today's best savings rates from Bankrate"
      ctaHref="https://www.bankrate.com/banking/savings/best-high-yield-interests-savings-accounts/"
      ctaDescription="Compare high-yield savings accounts offering 4-5% APY from top online banks."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <CompoundInterestWidget />
    </CalculatorLayout>
  );
}
