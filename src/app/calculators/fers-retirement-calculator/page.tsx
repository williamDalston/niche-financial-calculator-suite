import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const FersRetirementCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.FersRetirementCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "FERS Retirement Calculator | CalcEngine",
  description:
    "Calculate your Federal Employees Retirement System (FERS) annuity, TSP projections, and total retirement income. Plan your federal retirement with confidence.",
  openGraph: {
    title: "FERS Retirement Calculator | CalcEngine",
    description:
      "Calculate your Federal Employees Retirement System (FERS) annuity, TSP projections, and total retirement income. Plan your federal retirement with confidence.",
    url: "https://calcengine.io/calculators/fers-retirement-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "FERS Retirement Calculator | CalcEngine",
    description:
      "Calculate your Federal Employees Retirement System (FERS) annuity, TSP projections, and total retirement income. Plan your federal retirement with confidence.",
  },
  alternates: {
    canonical: "/calculators/fers-retirement-calculator",
  },
};

const howItWorks = `
<p>The Federal Employees Retirement System (FERS) provides retirement benefits through three components: the FERS Basic Annuity, the Thrift Savings Plan (TSP), and Social Security. This calculator combines all three to give you a comprehensive picture of your projected federal retirement income.</p>

<h3>FERS Basic Annuity Calculation</h3>
<p>The FERS Basic Annuity is a defined benefit pension based on your years of creditable service and your "high-3" average salary — the highest average basic pay earned during any three consecutive years of service (usually your last three years). The formula is straightforward: multiply 1% by your years of service by your high-3 salary. If you retire at age 62 or later with at least 20 years of service, the multiplier increases to 1.1%, providing a meaningful boost to your annuity.</p>

<p>For example, a federal employee retiring at age 62 with 30 years of service and a high-3 salary of $95,000 would receive: 1.1% x 30 x $95,000 = $31,350 per year, or about $2,613 per month. This annuity is adjusted annually for cost-of-living increases (COLA), though FERS COLAs are slightly less generous than those for CSRS retirees.</p>

<h3>The FERS Supplement</h3>
<p>The FERS Supplement is an additional benefit paid to eligible retirees who retire before age 62 on an immediate, unreduced annuity. It approximates the Social Security benefit you earned during your federal career and bridges the gap until you become eligible for Social Security at age 62. The supplement is calculated as your estimated Social Security benefit multiplied by the ratio of your years of FERS service to 40 years. The supplement is not adjusted for inflation and ends when you reach age 62, at which point Social Security benefits may begin.</p>

<h3>TSP Projections</h3>
<p>The Thrift Savings Plan is the federal equivalent of a 401(k). This calculator projects your TSP balance at retirement based on your current balance, monthly contributions, and expected rate of return. It then estimates a sustainable monthly income using the 4% rule — a widely used guideline suggesting you can withdraw 4% of your portfolio annually (adjusted for inflation) with a high probability of your money lasting 30 years.</p>

<h3>Putting It All Together</h3>
<p>Your total retirement income is the sum of your FERS annuity, FERS supplement (if applicable), TSP withdrawals, and Social Security benefits. The replacement rate — the percentage of your pre-retirement income that these sources replace — is a key metric. Financial planners generally recommend a replacement rate of 70-80% to maintain your standard of living in retirement. If your projected replacement rate falls short, consider increasing TSP contributions, delaying retirement to increase your annuity, or exploring other savings strategies.</p>
`;

const formula = `FERS Basic Annuity:
  If age < 62 or years of service < 20:
    Annual Annuity = 1.0% x Years of Service x High-3 Average Salary
  If age >= 62 and years of service >= 20:
    Annual Annuity = 1.1% x Years of Service x High-3 Average Salary

FERS Supplement (until age 62):
  Monthly Supplement = (Years of FERS Service / 40) x Social Security Estimate

TSP Monthly Income (4% Rule):
  Monthly Income = (Projected TSP Balance x 0.04) / 12`;

const faqs = [
  {
    question: "When can I retire under FERS?",
    answer:
      "FERS has three main retirement eligibility categories. Immediate unreduced retirement requires reaching your Minimum Retirement Age (MRA, between 55 and 57 depending on birth year) with 30 years of service, age 60 with 20 years of service, or age 62 with 5 years of service. Early retirement (MRA + 10 years) is available but with a reduced annuity (5% reduction per year under age 62). Deferred retirement is available at age 62 if you have at least 5 years of service and left federal employment before meeting other eligibility requirements.",
  },
  {
    question: "What is the high-3 average salary?",
    answer:
      "The high-3 is the highest average basic pay you earned during any three consecutive years of federal service. For most employees, this is the last three years before retirement, when pay is typically highest. It includes basic pay, locality pay, and certain special rate supplements, but excludes overtime, bonuses, cash awards, and allowances. If you have had periods of part-time service, the high-3 is prorated accordingly.",
  },
  {
    question: "How does the 1.1% multiplier work?",
    answer:
      "If you retire at age 62 or later with at least 20 years of creditable service, FERS uses a 1.1% multiplier instead of 1.0%. This 10% boost applies to ALL your years of service, not just those after age 62. For someone with 30 years of service and a $95,000 high-3, the difference is $2,850 per year ($95,000 x 30 x 0.1%). Over a 25-year retirement, that is an additional $71,250.",
  },
  {
    question: "What is the FERS supplement and who qualifies?",
    answer:
      "The FERS supplement provides additional income from your retirement date until age 62, bridging the gap before Social Security eligibility. You must retire on an immediate, unreduced annuity to receive it — meaning MRA with 30 years, or age 60 with 20 years. It is not available if you retire early with a reduced annuity (MRA + 10). The supplement is subject to the Social Security earnings test if you work in retirement, and it ends at age 62.",
  },
  {
    question: "How reliable is the 4% rule for TSP withdrawals?",
    answer:
      "The 4% rule is based on historical research (the Trinity Study) showing that withdrawing 4% of your portfolio in the first year of retirement, then adjusting for inflation annually, gives roughly a 95% probability of your money lasting 30 years. However, it assumes a diversified stock/bond portfolio and was developed for a 30-year retirement. If you retire early or expect a longer retirement, you may want to use a more conservative 3-3.5% withdrawal rate. Conversely, flexible withdrawal strategies that adjust with market conditions can support higher initial rates.",
  },
  {
    question: "Should I contribute to Roth TSP or Traditional TSP?",
    answer:
      "Traditional TSP contributions reduce your current taxable income, and you pay taxes on withdrawals in retirement. Roth TSP contributions are made after tax, but qualified withdrawals are completely tax-free. Roth TSP tends to benefit those who expect to be in a higher tax bracket in retirement (or believe tax rates will increase). Traditional TSP benefits those in a high bracket now who expect to be in a lower bracket in retirement. Many financial planners recommend having both for tax diversification — giving you flexibility to manage your tax bracket year by year in retirement.",
  },
];

const relatedCalculators = [
  {
    title: "GS Pay Calculator",
    slug: "gs-pay-calculator",
    description: "Look up your GS pay grade with locality adjustments.",
    icon: "🏛️",
  },
  {
    title: "TSP Calculator",
    slug: "tsp-calculator",
    description: "Project your Thrift Savings Plan growth and retirement income.",
    icon: "📊",
  },
  {
    title: "Military Pay Calculator",
    slug: "military-pay-calculator",
    description: "Calculate military compensation including BAH, BAS, and special pay.",
    icon: "🎖️",
  },
  {
    title: "Social Security Estimator",
    slug: "social-security-estimator",
    description: "Estimate your Social Security benefits at different claiming ages.",
    icon: "🏦",
  },
];

const editorialContent = `
<h2>Planning Your Federal Retirement: A Strategic Approach</h2>
<p>Federal employees have one of the most comprehensive retirement benefit packages in the country, but maximizing those benefits requires strategic planning that ideally begins years before your target retirement date. The interplay between FERS, TSP, and Social Security creates both opportunities and complexities that deserve careful consideration.</p>

<h3>The Power of the 1.1% Multiplier</h3>
<p>One of the most significant decisions federal employees face is whether to work until age 62. The 1.1% multiplier available to those who retire at 62 or later with 20+ years of service provides a permanent 10% boost to your annuity. For a career employee with 30 years and a $100,000 high-3, this means an extra $3,000 per year for the rest of your life — potentially $75,000 or more over a 25-year retirement. However, this must be weighed against the value of retiring earlier and having more years of personal freedom.</p>

<h3>Maximizing Your TSP</h3>
<p>The TSP is often the largest controllable factor in your retirement planning. In 2025, the maximum employee contribution is $23,500 per year ($31,000 if age 50 or older). Combined with the 5% FERS employer match, you could be putting away over $36,500 per year. The earlier you maximize contributions, the more time compound growth has to work. A federal employee who contributes the maximum from age 30 to 62 at a 7% return would accumulate over $2.5 million — providing roughly $8,300 per month using the 4% rule.</p>

<h3>Tax Planning in Retirement</h3>
<p>Federal retirees face a unique tax planning opportunity. Your FERS annuity is fully taxable, Traditional TSP withdrawals are fully taxable, and Social Security may be partially taxable. But Roth TSP withdrawals are tax-free. By having both Traditional and Roth TSP balances, you can strategically draw from each account to manage your annual tax bracket, potentially saving thousands in taxes over your retirement. Consider converting some Traditional TSP to Roth during lower-income years to reduce future required minimum distributions and create more tax-free income flexibility.</p>
`;

export default function FersRetirementCalculatorPage() {
  return (
    <CalculatorLayout
      title="FERS Retirement Calculator"
      description="Calculate your Federal Employees Retirement System (FERS) annuity, TSP projections, and total retirement income."
      slug="fers-retirement-calculator"
      category={{ name: "Government Pay", slug: "government-pay" }}
      ctaText="Maximize your federal retirement — speak with a financial advisor"
      ctaHref="https://www.nerdwallet.com/best/investing/financial-advisors-for-federal-employees"
      ctaDescription="Connect with advisors who specialize in federal employee retirement planning."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <FersRetirementCalculatorWidget />
    </CalculatorLayout>
  );
}
