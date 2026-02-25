import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const FourOhOneKCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.FourOhOneKCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "401(k) Calculator | CalcEngine",
  description:
    "Calculate your 401(k) balance at retirement with employer matching, investment growth, and salary increases. Free 401k calculator with projected monthly retirement income.",
  openGraph: {
    title: "401(k) Calculator | CalcEngine",
    description:
      "Calculate your 401(k) balance at retirement with employer matching, investment growth, and salary increases. Free 401k calculator with projected monthly retirement income.",
    url: "https://calcengine.io/calculators/401k-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "401(k) Calculator | CalcEngine",
    description:
      "Calculate your 401(k) balance at retirement with employer matching, investment growth, and salary increases. Free 401k calculator with projected monthly retirement income.",
  },
  alternates: {
    canonical: "/calculators/401k-calculator",
  },
};

const howItWorks = `
<p>The 401(k) Calculator projects the growth of your employer-sponsored retirement account from today until your target retirement age. It accounts for your personal contributions, employer matching contributions, investment returns with monthly compounding, and annual salary growth to provide a realistic estimate of your retirement nest egg.</p>

<h3>How 401(k) Growth Is Calculated</h3>
<p>Your 401(k) balance grows through three distinct sources: your contributions, your employer's matching contributions, and investment returns on the accumulated balance. Each month, this calculator adds your monthly contribution (annual salary times contribution percentage, divided by 12) and your employer's matching contribution, then applies the monthly investment return to the entire balance. This monthly compounding approach closely mirrors how actual 401(k) accounts grow.</p>

<h3>Understanding Employer Matching</h3>
<p>Most employers offer a matching contribution as an incentive for employees to save for retirement. The match is typically expressed as a percentage of your contribution up to a cap. For example, "50% match up to 6% of salary" means the employer contributes 50 cents for every dollar you contribute, but only on the first 6% of your salary that you put in. If you earn $75,000 and contribute 10% ($7,500/year), the employer matches 50% of the first 6% ($4,500 matchable), contributing $2,250/year. Contributing at least enough to capture the full employer match is universally recommended because it is essentially free money.</p>

<h3>The Power of Compound Growth</h3>
<p>Compound returns are the most significant driver of long-term 401(k) growth. In the early years, contributions make up most of your balance. But over decades, investment returns on your accumulated balance far exceed total contributions. For example, with a $75,000 salary, 10% contribution, 50% employer match (6% cap), and 7% annual returns, a 30-year-old would have approximately $1.8 million by age 65, even though total contributions would only be about $450,000. The remaining $1.35 million comes entirely from compound growth.</p>

<h3>The 4% Rule for Retirement Income</h3>
<p>The calculator estimates monthly retirement income using the 4% rule, a widely cited retirement guideline. The rule suggests withdrawing 4% of your portfolio in the first year of retirement and adjusting for inflation each year thereafter. This strategy has historically sustained portfolios for 30 or more years. A $1 million 401(k) balance would generate approximately $40,000 per year, or $3,333 per month, under this rule. However, some financial planners now suggest a lower rate of 3.5% or a dynamic withdrawal strategy for greater safety.</p>

<h3>Salary Growth Assumptions</h3>
<p>This calculator accounts for annual salary growth, which means your dollar contributions increase each year even if your contribution percentage stays the same. The default 3% salary growth rate approximates the historical average for U.S. workers. In practice, salary growth varies significantly by career stage, with faster growth in early career years and slower growth later. You can adjust this rate to match your personal situation.</p>

<h3>Important Limitations</h3>
<p>This calculator assumes consistent contributions and returns over the entire projection period. In reality, investment returns fluctuate year to year, and there may be periods where you change jobs, adjust contributions, or take hardship withdrawals. The calculator does not enforce annual IRS contribution limits ($23,000 in 2024, $30,500 for age 50+), which may cap your actual contributions. It also does not account for taxes on withdrawals in retirement or the impact of inflation on purchasing power. For comprehensive retirement planning, consider consulting with a certified financial planner.</p>
`;

const formula = `Monthly Growth:
  Balance(n+1) = Balance(n) x (1 + r/12) + Employee Monthly Contribution + Employer Monthly Contribution

Where:
  r = Annual rate of return
  Employee Monthly Contribution = (Annual Salary x Contribution %) / 12
  Employer Monthly Contribution = min(Employee Contribution, Salary x Match Cap %) x Employer Match %

Annual Salary Growth: Salary(year+1) = Salary(year) x (1 + Growth Rate)
Monthly Retirement Income = Balance at Retirement x 0.04 / 12 (4% Rule)`;

const faqs = [
  {
    question: "How much should I contribute to my 401(k)?",
    answer:
      "At minimum, contribute enough to capture your full employer match, as this is essentially a 50-100% instant return on your money. Beyond the match, financial advisors generally recommend saving 10-15% of your gross income for retirement, including the employer match. If you started saving later in your career, you may need to save more. The 2024 IRS contribution limit is $23,000, or $30,500 if you are age 50 or older (catch-up contributions).",
  },
  {
    question: "What is an employer match and how does it work?",
    answer:
      "An employer match is a contribution your employer makes to your 401(k) based on how much you contribute. Common match formulas include: 100% match up to 3% of salary, 50% match up to 6% of salary, or dollar-for-dollar up to 4%. For example, with a 50% match up to 6% on a $75,000 salary, if you contribute 6% ($4,500), your employer adds $2,250. If you contribute only 3%, your employer adds $1,125, meaning you leave $1,125 of free money on the table.",
  },
  {
    question: "What is the difference between traditional and Roth 401(k)?",
    answer:
      "Traditional 401(k) contributions are made pre-tax, reducing your current taxable income, but withdrawals in retirement are taxed as ordinary income. Roth 401(k) contributions are made with after-tax dollars (no current tax break), but qualified withdrawals in retirement are completely tax-free. Choose traditional if you expect to be in a lower tax bracket in retirement; choose Roth if you expect to be in the same or higher bracket. Many advisors recommend a mix of both for tax diversification.",
  },
  {
    question: "Can I withdraw money from my 401(k) before retirement?",
    answer:
      "You can, but early withdrawals (before age 59 1/2) typically incur a 10% penalty plus ordinary income taxes. Some exceptions include: hardship withdrawals for immediate financial needs, the Rule of 55 (penalty-free withdrawals after separating from the employer at age 55+), and substantially equal periodic payments (72(t) distributions). Many plans also offer 401(k) loans, allowing you to borrow up to 50% of your balance (max $50,000) and repay with interest to yourself, though this carries risks if you leave your employer.",
  },
  {
    question: "What happens to my 401(k) when I change jobs?",
    answer:
      "When you leave an employer, you have several options: leave the money in your old employer's plan (if allowed), roll it over to your new employer's 401(k), roll it into an Individual Retirement Account (IRA), or cash it out (not recommended due to taxes and penalties). Rolling over to an IRA often provides the most investment options and lowest fees. Be sure to do a direct rollover (trustee-to-trustee transfer) to avoid mandatory 20% tax withholding.",
  },
  {
    question: "What rate of return should I expect from my 401(k)?",
    answer:
      "Historical average returns for a diversified stock portfolio have been roughly 7-10% per year before inflation (about 5-7% after inflation). Your actual return depends on your asset allocation. A typical target-date fund might return 7-8% annually during the accumulation phase. Conservative bond-heavy allocations may return 4-5%, while aggressive all-stock portfolios may return 9-10% over long periods. Use 7% as a reasonable middle-ground estimate for planning purposes, which accounts for a mix of stocks and bonds.",
  },
];

const relatedCalculators = [
  {
    title: "Retirement Calculator",
    slug: "retirement-calculator",
    description: "Plan your overall retirement needs beyond just your 401(k).",
    icon: "🏖️",
  },
  {
    title: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    description: "See how any investment grows with compound interest over time.",
    icon: "📈",
  },
  {
    title: "Social Security Estimator",
    slug: "social-security-estimator",
    description: "Estimate your Social Security benefits at different claiming ages.",
    icon: "🏛️",
  },
  {
    title: "Federal Tax Estimator",
    slug: "federal-tax-calculator",
    description: "See how 401(k) contributions reduce your federal tax bill.",
    icon: "💰",
  },
];

const editorialContent = `
<h2>Building Wealth with Your 401(k): Strategies for Every Stage</h2>
<p>Your 401(k) is likely the single most powerful wealth-building tool available to you. With tax-deferred growth, employer matching contributions, and compound interest working over decades, even modest contributions can grow into a substantial retirement fund. Here is how to make the most of it at every career stage.</p>

<h3>In Your 20s and 30s: Start Early, Start Aggressive</h3>
<p>Time is your greatest asset when it comes to investing. A 25-year-old who contributes $500/month with a 7% return will have approximately $1.4 million by age 65. Waiting until age 35 to start the same contributions yields only about $610,000, less than half the amount, despite only a 10-year difference. In your early career, financial advisors generally recommend a more aggressive allocation (80-90% stocks) since you have decades to recover from market downturns. At minimum, always contribute enough to capture your full employer match from day one.</p>

<h3>In Your 40s and 50s: Maximize and Catch Up</h3>
<p>Your peak earning years are the time to maximize contributions. If you are behind on retirement savings, the IRS allows catch-up contributions of an additional $7,500 per year starting at age 50 (for a total of $30,500 in 2024). This is also the time to reassess your asset allocation, gradually shifting toward a more balanced mix of stocks and bonds. Consider increasing your contribution percentage by 1% each year or directing all raises toward your 401(k) until you reach the maximum.</p>

<h3>Common 401(k) Mistakes to Avoid</h3>
<p>The most costly mistake is not participating at all, or not contributing enough to capture the full employer match. Other common errors include: cashing out when changing jobs (triggering taxes and penalties that can consume 30-40% of the balance), keeping too much in your company's stock (lack of diversification), choosing overly conservative investments too early (missing decades of growth), and taking 401(k) loans that reduce your invested balance during critical growth years. Automating your contributions and periodically rebalancing your portfolio can help you avoid emotional investing decisions.</p>

<h3>Beyond the 401(k)</h3>
<p>While the 401(k) is excellent, a comprehensive retirement plan may also include an IRA (traditional or Roth), a Health Savings Account (HSA, which offers triple tax advantages), taxable brokerage accounts, Social Security benefits, and potentially a pension or other defined benefit plan. Diversifying across these accounts provides flexibility in retirement to manage your tax liability and adapt to changing circumstances. A fee-only fiduciary financial advisor can help you develop a holistic retirement strategy tailored to your specific goals.</p>
`;

export default function FourOhOneKCalculatorPage() {
  return (
    <CalculatorLayout
      title="401(k) Calculator"
      description="Calculate your 401(k) balance at retirement with employer matching, investment growth, and salary increases. See projected monthly retirement income using the 4% rule."
      slug="401k-calculator"
      category={{ name: "Retirement & Investing", slug: "retirement-and-investing" }}
      ctaText="Start investing with as little as $1"
      ctaHref="https://www.wealthfront.com"
      ctaDescription="Wealthfront offers automated investing, tax-loss harvesting, and financial planning with low fees."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <FourOhOneKCalculatorWidget />
    </CalculatorLayout>
  );
}
