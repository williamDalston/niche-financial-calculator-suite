import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const DebtPayoffCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.DebtPayoffCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Debt Payoff Calculator | CalcEngine",
  description:
    "Create a debt payoff plan using the avalanche or snowball method. See your debt-free date, total interest, and how extra payments accelerate your payoff timeline.",
  openGraph: {
    title: "Debt Payoff Calculator | CalcEngine",
    description:
      "Create a debt payoff plan using the avalanche or snowball method. See your debt-free date, total interest, and how extra payments accelerate your payoff timeline.",
    url: "https://calcengine.io/calculators/debt-payoff-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Debt Payoff Calculator | CalcEngine",
    description:
      "Create a debt payoff plan using the avalanche or snowball method. See your debt-free date, total interest, and how extra payments accelerate your payoff timeline.",
  },
  alternates: {
    canonical: "/calculators/debt-payoff-calculator",
  },
};

const howItWorks = `
<p>A debt payoff calculator helps you create a strategic plan to eliminate all your debts by showing the optimal payment order, projected timeline, and total interest under different strategies. Whether you have credit cards, auto loans, student loans, or personal loans, this tool models the two most popular payoff methods and shows you exactly how much time and money you can save.</p>

<h3>How the Simulation Works</h3>
<p>The calculator simulates your debt payoff month by month. Each month, interest accrues on each debt's outstanding balance based on its annual rate. Minimum payments are applied to every debt first. Then, any extra payment amount you specify is directed to a single target debt (determined by your chosen strategy). When a debt is paid off, its freed-up minimum payment rolls into the extra payment pool and is redirected to the next target debt, creating an accelerating "snowball" or "avalanche" of payments.</p>

<h3>Avalanche Method (Mathematically Optimal)</h3>
<p>The avalanche method directs extra payments to the debt with the highest interest rate first. This approach minimizes the total interest you pay because it eliminates the most expensive debt as quickly as possible. Once the highest-rate debt is paid off, you move to the next highest rate, and so on. The avalanche method is mathematically guaranteed to save the most money compared to any other ordering. The trade-off is that if your highest-rate debt also has a large balance, it may take longer to see the psychological win of paying off your first debt entirely.</p>

<h3>Snowball Method (Psychologically Powerful)</h3>
<p>The snowball method, popularized by financial educator Dave Ramsey, directs extra payments to the debt with the lowest balance first, regardless of interest rate. The advantage is quick wins — you eliminate entire debts faster, which provides motivation and a sense of progress. Research from the Harvard Business Review has shown that the psychological momentum of the snowball method actually helps more people stick with their debt payoff plan, even though it costs slightly more in total interest than the avalanche method.</p>

<h3>The Power of Extra Payments</h3>
<p>The single most important factor in paying off debt faster is the amount of extra payment you can make beyond your minimums. Even a modest extra $100-200 per month can cut years off your payoff timeline and save thousands in interest. This calculator lets you experiment with different extra payment amounts to find the sweet spot between aggressive debt reduction and maintaining a comfortable monthly budget. Remember to always maintain a small emergency fund so unexpected expenses do not force you back into debt.</p>

<h3>Understanding the Comparison</h3>
<p>This calculator shows three scenarios side-by-side: minimum payments only, avalanche with extra payments, and snowball with extra payments. The minimum-only scenario is your baseline — it shows how long payoff would take and how much interest you would pay without any extra effort. Comparing this to the avalanche and snowball strategies clearly demonstrates the value of accelerated payoff. The difference between avalanche and snowball is typically small for most debt portfolios, so choose the method that you are most likely to stick with consistently.</p>
`;

const formula = `For each month, for each debt:
  Interest = Remaining Balance x (Annual Rate / 12)
  Balance += Interest
  Balance -= min(Minimum Payment, Balance)

Extra payment applied to target debt:
  Avalanche: Highest interest rate first
  Snowball: Lowest remaining balance first

When a debt is paid off:
  Freed minimum payment is added to extra payment pool
  Extra pool redirected to next target debt

Total Interest = Sum of all monthly interest charges
Payoff Date = Month when all balances reach $0`;

const faqs = [
  {
    question: "Which is better: avalanche or snowball method?",
    answer:
      "The avalanche method saves more money in total interest because it targets the most expensive debt first. The snowball method provides quicker psychological wins by eliminating small debts faster. Research shows the snowball method has higher adherence rates. For most people, the difference in total interest is relatively small (often a few hundred dollars), so choose the method you will actually stick with. If motivation is not an issue, avalanche is mathematically optimal.",
  },
  {
    question: "How much extra should I pay toward my debts?",
    answer:
      "As much as you can comfortably afford while maintaining a $1,000-$2,000 emergency fund and covering essential expenses. Common strategies include: applying the 50/30/20 rule (50% needs, 30% wants, 20% savings/debt), cutting one discretionary expense and redirecting it to debt, or using windfalls (tax refunds, bonuses) as lump-sum payments. Even $50-100 extra per month makes a meaningful difference on most debt loads.",
  },
  {
    question: "Should I stop saving for retirement while paying off debt?",
    answer:
      "Generally, you should still contribute enough to capture any employer 401(k) or TSP match — that match is essentially a 50-100% immediate return, which exceeds even the highest credit card rates. Beyond the match, the answer depends on your debt interest rates. If your debt is above 7-8%, prioritizing debt payoff likely makes more sense. If your debt is below 5%, splitting extra money between debt and retirement is often reasonable.",
  },
  {
    question: "Should I consolidate my debts before using a payoff strategy?",
    answer:
      "Consolidation can make sense if it significantly lowers your overall interest rate. A balance transfer credit card with a 0% intro APR (typically 12-18 months) can save substantial interest if you can pay off the balance before the promotional rate expires. A debt consolidation loan at a lower rate than your average simplifies payments and reduces interest. However, consolidation does not work if it tempts you to rack up new debt on your now-empty credit cards.",
  },
  {
    question: "What debts should I include in my payoff plan?",
    answer:
      "Include all consumer debts: credit cards, personal loans, auto loans, student loans, medical bills, and any other debt with a required monthly payment. Most people exclude their mortgage since it has a much lower interest rate and provides a tax deduction. However, if you are aggressive about becoming completely debt-free, including the mortgage in your long-term plan is a valid approach — just focus on high-rate consumer debt first.",
  },
  {
    question: "How accurate is the payoff timeline?",
    answer:
      "The calculator assumes fixed interest rates and consistent payments. Your actual timeline may differ if: your credit card rates change (variable rates), you take on new debt, your income changes affecting your extra payment ability, or you make lump-sum payments from bonuses or tax refunds. Treat the calculator's output as a plan and benchmark, and update it periodically as your situation changes. Even an approximate plan is far better than making only minimum payments with no strategy.",
  },
];

const relatedCalculators = [
  {
    title: "Loan Calculator",
    slug: "loan-calculator",
    description: "Compute payments for any fixed-rate loan amount and term.",
    icon: "💳",
  },
  {
    title: "Student Loan Calculator",
    slug: "student-loan-calculator",
    description: "Calculate student loan payments and compare repayment plans.",
    icon: "🎓",
  },
  {
    title: "Auto Loan Calculator",
    slug: "auto-loan-calculator",
    description: "Calculate monthly car payments and total loan costs.",
    icon: "🚗",
  },
  {
    title: "Net Worth Calculator",
    slug: "net-worth-calculator",
    description: "Track your total assets minus liabilities over time.",
    icon: "📊",
  },
];

const editorialContent = `
<h2>Breaking Free From Debt: A Practical Guide</h2>
<p>Debt is one of the most significant barriers to financial freedom and wealth building. The average American household carries roughly $8,000-$10,000 in credit card debt alone, paying 20% or more in annual interest. When you include auto loans, student loans, and personal debt, the total often exceeds $50,000. A strategic payoff plan is the difference between decades of debt servitude and financial independence within a few years.</p>

<h3>The Mathematics of Minimum Payments</h3>
<p>Making only minimum payments is one of the most expensive financial mistakes you can make. Credit card companies typically set minimums at 1-3% of the balance or a flat amount. On a $10,000 credit card at 22% interest with a 2% minimum payment, making only minimums would take over 30 years to pay off and cost nearly $20,000 in interest — double the original balance. Adding just $200/month to that same debt cuts the payoff time to about 3 years and total interest to roughly $3,600.</p>

<h3>Building a Debt Payoff Plan That Sticks</h3>
<p>The best debt payoff plan is one you actually follow. Start by listing every debt with its balance, interest rate, and minimum payment. Choose either the avalanche or snowball method based on your personality — if you need motivation, go snowball; if you are driven by math, go avalanche. Set up automatic payments for all minimums to avoid late fees. Then, determine how much extra you can consistently pay and direct it according to your chosen strategy.</p>

<p>Track your progress monthly. Many people find it motivating to visualize their declining balances on a chart or track the total interest saved. Celebrate milestones — paying off an entire debt is a genuine achievement. But resist the temptation to reward yourself by taking on new debt. Each debt you eliminate frees up cash flow that accelerates the payoff of remaining debts, creating a virtuous cycle that makes every subsequent debt easier to pay off than the last.</p>

<h3>After the Debt Is Gone</h3>
<p>Once your debts are paid off, redirect those payments into building wealth: maximize retirement contributions, build a full 3-6 month emergency fund, and begin investing. The same discipline that eliminated your debt will now compound in your favor, accelerating your path to financial independence. Many people find that the monthly cash flow freed up by eliminating debt payments is substantial enough to make a real difference in their investment portfolio within just a few years.</p>
`;

export default function DebtPayoffCalculatorPage() {
  return (
    <CalculatorLayout
      title="Debt Payoff Calculator"
      description="Create a debt payoff plan using the avalanche or snowball method. See your debt-free date, total interest, and how extra payments accelerate your payoff."
      slug="debt-payoff-calculator"
      category={{ name: "Debt & Loans", slug: "debt-and-loans" }}
      ctaText="Consolidate your debt — check your rate without affecting your credit"
      ctaHref="https://www.sofi.com/personal-loans/debt-consolidation/"
      ctaDescription="See if consolidating your debts into one lower-rate loan could save you money."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <DebtPayoffCalculatorWidget />
    </CalculatorLayout>
  );
}
