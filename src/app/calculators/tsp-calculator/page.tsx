import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const TspCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.TspCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "TSP Calculator — Thrift Savings Plan Growth Projector | CalcEngine",
  description:
    "Project your Thrift Savings Plan balance at retirement. Compare TSP fund returns, see employer match impact, and estimate monthly retirement income from your TSP.",
  openGraph: {
    title: "TSP Calculator — Thrift Savings Plan Growth Projector | CalcEngine",
    description:
      "Project your Thrift Savings Plan balance at retirement. Compare TSP fund returns, see employer match impact, and estimate monthly retirement income from your TSP.",
    url: "https://calcengine.org/calculators/tsp-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "TSP Calculator \u2014 Thrift Savings Plan Growth Projector | CalcEngine",
    description:
      "Project your Thrift Savings Plan balance at retirement. Compare TSP fund returns, see employer match impact, and estimate monthly retirement income from your TSP.",
  },
  alternates: {
    canonical: "/calculators/tsp-calculator",
  },
};

const howItWorks = `
<p>The Thrift Savings Plan (TSP) is the federal government's defined contribution retirement savings plan, similar to a private sector 401(k). This calculator projects your TSP balance at retirement based on your current balance, contributions, employer matching, and expected investment returns, then estimates the monthly income your TSP can provide in retirement.</p>

<h3>How TSP Contributions Work</h3>
<p>Federal employees under FERS receive automatic agency contributions of 1% of basic pay, regardless of whether they contribute anything. In addition, the agency matches employee contributions dollar-for-dollar on the first 3% of pay contributed, and 50 cents on the dollar for the next 2% of pay. This means contributing at least 5% of your salary captures the maximum 5% employer match — effectively doubling your contribution through free money. This calculator accounts for both your contributions and the employer match to project your total balance.</p>

<h3>Understanding TSP Fund Options</h3>
<p>The TSP offers six investment funds, each with different risk/return profiles. The G Fund invests in government securities and has never lost money, but returns are modest (historically around 3%). The F Fund tracks the bond market (approximately 4% average). The C Fund mirrors the S&P 500 (approximately 10% long-term average). The S Fund tracks small and mid-cap stocks (approximately 11% average but with higher volatility). The I Fund provides international stock exposure (approximately 8% average). The Lifecycle (L) Funds automatically adjust their allocation from aggressive to conservative as your target retirement date approaches, with a blended return of approximately 7%.</p>

<h3>Growth Projection Methodology</h3>
<p>The calculator uses compound growth with monthly contributions to project your balance. Each month, your existing balance grows by the monthly return rate, and your contribution plus employer match are added. This compound growth is what makes early and consistent contributions so powerful. The difference between starting at age 25 versus 35, even with the same contribution amount, can be hundreds of thousands of dollars at retirement due to the additional decade of compound growth.</p>

<h3>Estimating Retirement Income</h3>
<p>The calculator uses the 4% rule to estimate sustainable monthly income from your TSP. This guideline, based on historical stock and bond market returns, suggests you can withdraw 4% of your portfolio in the first year of retirement and adjust for inflation each year with a high probability of your money lasting at least 30 years. For a $1 million TSP balance, this translates to $40,000 per year or $3,333 per month. Remember that Traditional TSP withdrawals are taxed as ordinary income, while qualified Roth TSP withdrawals are tax-free.</p>

<h3>Roth vs. Traditional TSP</h3>
<p>Traditional TSP contributions lower your taxable income now, but you pay taxes on withdrawals in retirement. Roth TSP contributions are made with after-tax dollars, but qualified withdrawals (including earnings) are completely tax-free. The right choice depends on your current tax bracket versus your expected bracket in retirement. Many financial planners recommend contributing to both for tax diversification, which gives you more flexibility to manage your tax bill year by year in retirement.</p>
`;

const formula = `TSP Projected Balance:
  For each month until retirement:
    Balance = Previous Balance x (1 + Monthly Return) + Monthly Contribution + Monthly Match

Where:
  Monthly Return = Expected Annual Return / 12
  Monthly Contribution = Pay Period Contribution x 26 / 12
  Monthly Match = Annual Salary x Match % / 12

Monthly Retirement Income (4% Rule):
  Monthly Income = Projected Balance x 0.04 / 12

FERS Employer Match:
  Auto: 1% of basic pay
  Match: 100% on first 3% + 50% on next 2% = 5% max`;

const faqs = [
  {
    question: "How much should I contribute to my TSP?",
    answer:
      "At minimum, contribute 5% of your salary to capture the full employer match — anything less means leaving free money on the table. Ideally, financial advisors recommend saving 15-20% of your income for retirement (including the employer match). In 2025, the maximum employee contribution is $23,500, or $31,000 if you are age 50 or older (with the catch-up provision). Maximize contributions as early as possible to take full advantage of compound growth.",
  },
  {
    question: "Which TSP fund should I invest in?",
    answer:
      "The right fund depends on your age, risk tolerance, and time to retirement. Younger employees with decades until retirement can typically afford more risk in the C and S funds, which have higher long-term returns but more volatility. Employees closer to retirement may prefer the stability of G and F funds. Lifecycle (L) funds are a good default choice as they automatically adjust from aggressive to conservative as your target date approaches. Most financial advisors recommend diversifying across multiple funds rather than going all-in on one.",
  },
  {
    question: "What is the FERS employer match and how does it work?",
    answer:
      "FERS provides three layers of matching. First, agency automatic contributions of 1% of your basic pay are deposited regardless of whether you contribute. Second, the agency matches dollar-for-dollar on the first 3% of pay you contribute. Third, the agency matches 50 cents on the dollar for the next 2% of pay. Contributing 5% of your salary captures the maximum 5% total match. Combined with your 5% contribution, that puts 10% of your salary into TSP each pay period.",
  },
  {
    question: "Should I choose Roth TSP or Traditional TSP?",
    answer:
      "If you expect to be in a higher tax bracket in retirement (or believe tax rates will increase), Roth TSP is advantageous because withdrawals are tax-free. If you are in a high bracket now and expect a lower bracket in retirement, Traditional TSP saves you more by reducing current taxes. Many advisors recommend splitting contributions between both for tax diversification. Note that employer matching contributions always go into the Traditional TSP, regardless of your election.",
  },
  {
    question: "Can I roll over my old 401(k) or IRA into TSP?",
    answer:
      "Yes, TSP accepts rollovers from eligible retirement plans including 401(k)s, 403(b)s, and Traditional IRAs. The TSP's extremely low expense ratios (approximately 0.04%) make it one of the cheapest investment vehicles available, often making it advantageous to consolidate other retirement accounts into TSP. However, note that TSP has fewer investment options than most IRAs, and once funds are in TSP, transferring them out while still employed is limited.",
  },
  {
    question: "What happens to my TSP when I leave federal service?",
    answer:
      "When you separate from federal service, you have several options: leave the money in TSP (it continues to grow), transfer it to an IRA or new employer's plan, or take a distribution (subject to taxes and possible early withdrawal penalty if under 59.5). If your balance is $200 or more, you can leave it in TSP indefinitely. TSP's low expense ratios make it an attractive option even after separation. Required minimum distributions begin at age 73 (under current law).",
  },
];

const relatedCalculators = [
  {
    title: "FERS Retirement Calculator",
    slug: "fers-retirement-calculator",
    description: "Calculate your FERS annuity and total federal retirement income.",
    icon: "🏛️",
  },
  {
    title: "401k Calculator",
    slug: "401k-calculator",
    description: "Project your 401(k) growth and retirement savings.",
    icon: "📈",
  },
  {
    title: "GS Pay Calculator",
    slug: "gs-pay-calculator",
    description: "Look up your GS pay grade with locality adjustments.",
    icon: "💼",
  },
  {
    title: "Retirement Calculator",
    slug: "retirement-calculator",
    description: "Comprehensive retirement planning with multiple income sources.",
    icon: "🏖️",
  },
];

const editorialContent = `
<h2>Maximizing Your Thrift Savings Plan: A Federal Employee's Guide</h2>
<p>The Thrift Savings Plan is one of the best retirement savings vehicles available to anyone, public or private sector. With expense ratios as low as 0.04% — compared to the 0.50-1.00% typical of private sector 401(k) plans — TSP participants keep significantly more of their investment returns over time. Understanding how to maximize this benefit is one of the most impactful financial decisions a federal employee can make.</p>

<h3>The Compound Growth Advantage</h3>
<p>Consider two federal employees, both earning $85,000 and contributing 5% to TSP with the full employer match. Employee A starts at age 25 and Employee B starts at age 35. Assuming a 7% average annual return, at age 62: Employee A's TSP would be worth approximately $1.43 million, while Employee B's would be worth approximately $640,000. That 10-year head start more than doubled the final balance, despite Employee A contributing only $127,500 more in total contributions. The lesson is clear: the earlier you start, the more time compound growth has to multiply your wealth.</p>

<h3>Fund Selection Strategy</h3>
<p>Many federal employees default to the G Fund because it feels safe — and it is, in the sense that it never loses nominal value. However, over a 30-year career, the opportunity cost of holding all your money in the G Fund is enormous. At 3% annually, $500/month for 30 years grows to approximately $291,000. At the C Fund's historical 10%, that same $500/month grows to approximately $1.1 million. The G Fund is appropriate for money you need within the next few years, but younger employees with long time horizons should consider a heavier allocation to the equity funds (C, S, and I).</p>

<h3>The Catch-Up Contribution Strategy</h3>
<p>Starting in 2025, employees age 50 and older can contribute an additional $7,500 per year beyond the standard limit, for a total of $31,000. If you are behind on retirement savings, the catch-up provision is an essential tool. Ten years of maxed-out catch-up contributions at 7% return adds approximately $550,000 to your balance by retirement. Federal employees in their peak earning years should evaluate whether they can take advantage of this provision, especially as children leave the household and mortgages are paid off, freeing up cash for increased savings.</p>
`;

export default function TspCalculatorPage() {
  return (
    <CalculatorLayout
      title="TSP Calculator"
      description="Project your Thrift Savings Plan balance at retirement. Compare TSP fund returns, see employer match impact, and estimate monthly retirement income."
      slug="tsp-calculator"
      category={{ name: "Government Pay", slug: "government-pay" }}
      ctaText="Optimize your TSP allocation with expert guidance"
      ctaHref="https://www.nerdwallet.com/best/investing/financial-advisors-for-federal-employees"
      ctaDescription="Get personalized TSP allocation advice from advisors who understand federal benefits."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <TspCalculatorWidget />
    </CalculatorLayout>
  );
}
