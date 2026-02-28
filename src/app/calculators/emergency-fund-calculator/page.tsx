import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const EmergencyFundCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.EmergencyFundCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Emergency Fund Calculator | CalcEngine",
  description:
    "Calculate how much you need in your emergency fund based on your monthly expenses and risk tolerance. Track your progress and see how long it will take to reach your goal.",
  openGraph: {
    title: "Emergency Fund Calculator | CalcEngine",
    description:
      "Calculate how much you need in your emergency fund based on your monthly expenses and risk tolerance. Track your progress and see how long it will take to reach your goal.",
    url: "https://calcengine.org/calculators/emergency-fund-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emergency Fund Calculator | CalcEngine",
    description:
      "Calculate how much you need in your emergency fund based on your monthly expenses and risk tolerance. Track your progress and see how long it will take to reach your goal.",
  },
  alternates: {
    canonical: "/calculators/emergency-fund-calculator",
  },
};

const howItWorks = `
<p>An emergency fund is a dedicated savings reserve designed to cover unexpected expenses or income disruptions — things like job loss, medical emergencies, major car repairs, or home maintenance issues. This calculator helps you determine exactly how much you need, how close you are to your goal, and how long it will take to get there based on your current savings rate.</p>

<h3>How the Target Is Calculated</h3>
<p>The foundation of any emergency fund calculation is your total monthly essential expenses. These are the costs you absolutely must pay regardless of your employment status: housing (rent or mortgage), food, transportation, insurance premiums, utilities, and minimum debt payments. By summing these non-negotiable expenses, you get your baseline monthly survival cost.</p>

<p>Your target emergency fund is then determined by multiplying this monthly expense total by the number of months of coverage you want. Financial experts recommend different coverage levels based on your personal risk profile. A conservative approach calls for six months of expenses, which is ideal for single-income households, freelancers, or those in volatile industries. A moderate approach targets four months, suitable for dual-income households with stable employment. An aggressive approach covers three months, appropriate for those with very secure jobs, multiple income streams, or strong family safety nets.</p>

<h3>Tracking Your Progress</h3>
<p>The calculator compares your current emergency savings to your target and expresses the result as a percentage. If you have $10,000 saved and your target is $20,000, you are 50% of the way there. The progress bar gives you a quick visual indicator using color coding: red when below 50%, yellow between 50% and 100%, and green when fully funded.</p>

<h3>Time to Fully Funded</h3>
<p>By entering your monthly savings contribution, the calculator projects how many months it will take to reach your target. This is a straightforward division: the remaining amount needed divided by your monthly contribution. The savings growth chart visualizes this trajectory, showing your projected savings balance each month until you reach your target.</p>

<h3>Expense Breakdown</h3>
<p>The pie chart displays how your monthly essential expenses are distributed across categories. This breakdown can help you identify areas where you might be able to reduce spending, which has a dual benefit: it lowers your emergency fund target (since the target is based on expenses) and it potentially frees up more money to contribute toward your fund each month.</p>

<h3>Tips for Building Your Fund</h3>
<p>Start by opening a separate high-yield savings account specifically for your emergency fund. Keeping it separate from your checking account reduces the temptation to dip into it for non-emergencies. Automate your contributions by setting up a recurring transfer on each payday. Even small, consistent contributions add up — saving $200 per month builds to $2,400 in a year and $12,000 in five years, not including interest earned.</p>
`;

const faqs = [
  {
    question: "How much should I have in my emergency fund?",
    answer:
      "Most financial advisors recommend saving three to six months of essential living expenses. The exact amount depends on your situation: single-income households, self-employed individuals, and those with variable income should aim for six months or more, while dual-income households with stable jobs may be comfortable with three to four months.",
  },
  {
    question: "Where should I keep my emergency fund?",
    answer:
      "Keep your emergency fund in a high-yield savings account (HYSA) at an FDIC-insured bank. These accounts currently offer 4-5% APY, are easily accessible, and carry no risk of loss. Avoid investing your emergency fund in stocks, bonds, or CDs with early withdrawal penalties — the whole point is instant access when you need it.",
  },
  {
    question: "Should I pay off debt or build an emergency fund first?",
    answer:
      "Most experts recommend building a starter emergency fund of $1,000-$2,000 first, then aggressively paying down high-interest debt, and finally building your full emergency fund. Without any emergency savings, an unexpected expense could force you into more debt and undo your progress.",
  },
  {
    question: "What qualifies as an emergency expense?",
    answer:
      "True emergencies include job loss, medical emergencies, urgent car repairs needed for your commute, essential home repairs (like a broken furnace in winter), and unexpected travel for family emergencies. Regular maintenance, vacations, holiday gifts, and planned purchases are not emergencies — those should be covered by separate sinking funds.",
  },
  {
    question: "How often should I recalculate my emergency fund target?",
    answer:
      "Review your emergency fund target at least once a year, or whenever you experience a significant life change such as a move, job change, marriage, divorce, having children, or paying off a major debt. Your essential expenses may shift considerably with these changes, and your target should reflect your current lifestyle.",
  },
  {
    question: "Can my emergency fund be too large?",
    answer:
      "Yes. While having extra savings is never bad per se, holding too much cash in a savings account means missing out on higher investment returns. Once you have six months of expenses saved, additional money may be better deployed in a taxable brokerage account, retirement accounts, or paying down mortgage principal. Some people maintain a slightly larger fund (9-12 months) during periods of economic uncertainty or career transition, which is reasonable.",
  },
];

const relatedCalculators = [
  {
    title: "Net Worth Calculator",
    slug: "net-worth-calculator",
    description:
      "Calculate your total net worth by adding up all assets and subtracting liabilities.",
    icon: "💰",
  },
  {
    title: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    description:
      "See how your emergency fund or investments grow over time with compound interest.",
    icon: "📈",
  },
  {
    title: "Debt Payoff Calculator",
    slug: "debt-payoff-calculator",
    description:
      "Create a plan to pay off your debts using avalanche or snowball methods.",
    icon: "💳",
  },
  {
    title: "Cost of Living Calculator",
    slug: "cost-of-living-calculator",
    description:
      "Compare cost of living between different cities and states.",
    icon: "🏙️",
  },
];

const editorialContent = `
<h2>Why an Emergency Fund Is Your Financial Foundation</h2>
<p>Before investing, before aggressive debt repayment, before any financial goal — an emergency fund should be your first priority. It is the foundation upon which all other financial planning rests. Without one, a single unexpected event can derail years of financial progress.</p>

<h3>The Real Cost of Not Having an Emergency Fund</h3>
<p>According to the Federal Reserve, nearly 40% of Americans could not cover an unexpected $400 expense without borrowing money or selling something. When emergencies strike and no savings are available, people turn to credit cards (averaging 22-28% APR), personal loans, 401(k) loans (with penalties and lost growth), or payday loans (with effective APRs exceeding 400%). A $2,000 car repair financed on a credit card at 25% APR and paid at the minimum payment can cost over $3,200 and take nearly five years to repay.</p>

<h3>The Psychological Benefits</h3>
<p>Beyond the financial math, having a fully funded emergency fund provides immeasurable peace of mind. Studies show that financial stress is the leading cause of anxiety among American adults, and it negatively impacts work performance, relationships, and physical health. Knowing you have months of expenses saved creates a psychological safety net that reduces stress, improves decision-making, and even gives you leverage in career negotiations — you can afford to walk away from a bad job when you have savings to fall back on.</p>

<h3>Building Your Fund on Any Income</h3>
<p>Even on a tight budget, building an emergency fund is achievable. Start small: save $25 per week and you will have $1,300 in a year. Direct windfalls — tax refunds, bonuses, gift money, side hustle income — straight into your emergency fund. Automate the process by setting up a transfer on every payday. Consider temporarily reducing discretionary spending until you reach at least one month of expenses, then gradually build from there. The key is consistency, not amount.</p>
`;

export default function EmergencyFundCalculatorPage() {
  return (
    <CalculatorLayout
      title="Emergency Fund Calculator"
      description="Calculate how much you need in your emergency fund based on your monthly expenses and risk tolerance. Track your progress and see how long it will take to reach your goal."
      slug="emergency-fund-calculator"
      category={{ name: "Retirement & Investing", slug: "retirement-and-investing" }}
      ctaText="Earn more on your emergency fund — see today's best savings rates"
      ctaHref="https://www.nerdwallet.com/best/banking/high-yield-online-savings-accounts"
      ctaDescription="Compare high-yield savings accounts earning 4-5% APY to make your emergency fund work harder."
      howItWorks={howItWorks}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <EmergencyFundCalculatorWidget />
    </CalculatorLayout>
  );
}
