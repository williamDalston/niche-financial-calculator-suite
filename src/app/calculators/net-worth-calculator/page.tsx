import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const NetWorthCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.NetWorthCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Net Worth Calculator | CalcEngine",
  description:
    "Calculate your net worth by adding up all your assets and subtracting your liabilities. See your asset allocation, debt-to-asset ratio, and financial snapshot.",
  openGraph: {
    title: "Net Worth Calculator | CalcEngine",
    description:
      "Calculate your net worth by adding up all your assets and subtracting your liabilities. See your asset allocation, debt-to-asset ratio, and financial snapshot.",
    url: "https://calcengine.io/calculators/net-worth-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Net Worth Calculator | CalcEngine",
    description:
      "Calculate your net worth by adding up all your assets and subtracting your liabilities. See your asset allocation, debt-to-asset ratio, and financial snapshot.",
  },
  alternates: {
    canonical: "/calculators/net-worth-calculator",
  },
};

const howItWorks = `
<p>Your net worth is the single most important number in personal finance. It represents your total financial position at a given point in time: everything you own minus everything you owe. Tracking your net worth over time is the most reliable way to measure whether you are building wealth or falling behind, regardless of your income level.</p>

<h3>The Net Worth Formula</h3>
<p>The calculation is straightforward: add up the current market value of all your assets (cash, investments, retirement accounts, real estate, vehicles, and other valuable property), then subtract all your outstanding liabilities (mortgages, student loans, auto loans, credit card balances, and any other debts). The result is your net worth. A positive net worth means you own more than you owe. A negative net worth means your debts exceed your assets — a situation that is common for recent graduates with student loan debt.</p>

<h3>How to Use This Calculator</h3>
<p>Enter each asset and liability with its current value. Use today's market values rather than original purchase prices. For real estate, use a recent appraisal or an online estimate from services like Zillow. For investment and retirement accounts, use the current balance shown in your brokerage or plan statements. For vehicles, use the current Kelley Blue Book or Edmunds value. You can add or remove line items to match your specific financial situation using the add and remove buttons.</p>

<h3>Understanding Your Results</h3>
<p>Beyond the net worth number itself, pay attention to your asset allocation and debt-to-asset ratio. A healthy asset allocation diversifies across cash reserves, retirement accounts, and investments rather than concentrating everything in a single asset like your home. The debt-to-asset ratio measures what percentage of your assets is offset by debt. A ratio below 50% is generally considered healthy, while a ratio above 80% signals financial vulnerability.</p>

<h3>Benchmarks and Context</h3>
<p>According to Federal Reserve data, the median net worth for American households is approximately $192,900, but this varies dramatically by age. Households headed by someone under 35 have a median net worth of about $39,000, while those aged 55-64 have a median around $364,000. Rather than comparing yourself to national averages, focus on growing your own net worth consistently over time. Aim to increase it by 10-25% per year through a combination of debt repayment, regular saving, and investment growth.</p>
`;

const formula = `Net Worth = Total Assets - Total Liabilities

Debt-to-Asset Ratio = Total Liabilities / Total Assets

Asset Allocation % = Individual Asset Value / Total Assets x 100`;

const faqs = [
  {
    question: "What is a good net worth for my age?",
    answer:
      "A common benchmark is that by age 30 you should have a net worth equal to your annual salary, by 40 it should be 2x your salary, and by 50 it should be 4x. By retirement at 65, aim for 10-12x your annual salary. However, these are rough guidelines. According to the Federal Reserve's Survey of Consumer Finances, the median net worth is about $39,000 for those under 35, $135,000 for ages 35-44, $247,000 for ages 45-54, and $364,000 for ages 55-64.",
  },
  {
    question: "Should I include my home in my net worth calculation?",
    answer:
      "Yes, your home's current market value is an asset and your mortgage balance is a liability. Including both gives an accurate net worth. However, some financial planners also calculate 'investable net worth' which excludes your primary residence and mortgage. This figure better represents the liquid wealth you can use for retirement or other goals, since selling your home means you still need somewhere to live.",
  },
  {
    question: "How often should I calculate my net worth?",
    answer:
      "Most financial advisors recommend calculating your net worth quarterly or at minimum twice a year. Monthly tracking can be helpful if you are aggressively paying down debt or building savings. Avoid checking daily, as short-term market fluctuations will cause your investment-heavy net worth to swing and may cause unnecessary anxiety. Consistency in tracking frequency matters more than the specific interval.",
  },
  {
    question: "What is a debt-to-asset ratio and what is considered healthy?",
    answer:
      "Your debt-to-asset ratio is your total liabilities divided by total assets, expressed as a percentage. A ratio below 50% means you own more than half of your assets outright. Below 30% is considered very healthy. Above 80% suggests you are highly leveraged and financially vulnerable to income disruptions. Young homeowners often have high ratios due to their mortgage, but this should decrease steadily over time.",
  },
  {
    question: "Why is my net worth negative?",
    answer:
      "A negative net worth means your debts exceed your assets. This is common for recent college graduates with student loans, people who recently purchased a home with a small down payment, or those carrying significant credit card debt. The key is to make it less negative over time by paying down debt and building savings. Most people transition to positive net worth within 5-10 years of starting their career if they manage debt responsibly.",
  },
  {
    question: "How can I increase my net worth faster?",
    answer:
      "The most effective strategies are: (1) Pay off high-interest debt aggressively, especially credit cards. (2) Maximize employer 401k matching — it is an instant 50-100% return. (3) Increase your savings rate by even 1-2% of income each year. (4) Invest consistently in low-cost index funds rather than holding excess cash. (5) Avoid lifestyle inflation when you get raises. A 25-year-old who saves $500/month in index funds at a 7% return will accumulate over $1.2 million by age 65.",
  },
];

const relatedCalculators = [
  {
    title: "Retirement Calculator",
    slug: "retirement-calculator",
    description: "Plan how much you need to save for a comfortable retirement.",
    icon: "🏖️",
  },
  {
    title: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    description: "See how your investments grow over time with compound interest.",
    icon: "📈",
  },
  {
    title: "Debt Payoff Calculator",
    slug: "debt-payoff-calculator",
    description: "Create a plan to pay off your debts with snowball or avalanche methods.",
    icon: "💳",
  },
  {
    title: "401k Calculator",
    slug: "401k-calculator",
    description: "Estimate how much your 401k will grow by retirement.",
    icon: "🏦",
  },
];

const editorialContent = `
<h2>Your Net Worth: The Score That Matters Most</h2>
<p>Income gets all the attention, but net worth tells the real story of financial health. Plenty of high earners have low or negative net worth due to lifestyle inflation and debt, while many modest earners quietly build substantial wealth through disciplined saving and investing. Tracking your net worth regularly is the most powerful habit you can adopt to stay on track toward financial independence.</p>

<h3>The Balance Sheet Mindset</h3>
<p>Think of your personal finances like a business balance sheet. Every financial decision either increases your assets, decreases your liabilities, or both. When you make a mortgage payment, you are simultaneously decreasing an asset (cash) and decreasing a liability (loan balance) — with the principal portion moving your net worth upward. When you buy a depreciating asset like a car with debt, you may be increasing both your assets and liabilities, but the asset will lose value faster than the debt decreases.</p>

<h3>The Power of Asset Allocation</h3>
<p>How your assets are distributed matters almost as much as the total. Financial planners recommend keeping 3-6 months of expenses in cash as an emergency fund, maximizing tax-advantaged retirement accounts, and investing additional savings in a diversified portfolio. Americans with the highest net worth typically have less than 20% of their wealth in their primary residence, with the majority in investment and retirement accounts that compound over time.</p>

<h3>Common Net Worth Mistakes</h3>
<p>The biggest mistake people make is over-valuing depreciating assets like cars, furniture, and electronics, or counting possessions that have little resale value. Another common error is ignoring retirement accounts because "that money is locked away." Your 401k and IRA balances are absolutely part of your net worth and often represent the largest component of wealth for middle-class families. Finally, failing to account for all debts — including money owed to family members or buy-now-pay-later balances — gives a falsely optimistic picture.</p>
`;

export default function NetWorthCalculatorPage() {
  return (
    <CalculatorLayout
      title="Net Worth Calculator"
      description="Calculate your net worth by adding up all your assets and subtracting your liabilities. See your asset allocation, debt-to-asset ratio, and full financial snapshot."
      slug="net-worth-calculator"
      category={{ name: "Retirement & Investing", slug: "retirement-and-investing" }}
      ctaText="Start building wealth — invest with as little as $1"
      ctaHref="https://www.wealthfront.com"
      ctaDescription="Wealthfront offers automated investing, high-yield savings, and financial planning tools to grow your net worth."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <NetWorthCalculatorWidget />
    </CalculatorLayout>
  );
}
