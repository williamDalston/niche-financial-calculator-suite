import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const PensionCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.PensionCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Pension Calculator | CalcEngine",
  description:
    "Calculate your pension benefit based on years of service, salary, and multiplier. See COLA projections, survivor benefit options, and lump sum comparison. Free pension calculator.",
  openGraph: {
    title: "Pension Calculator | CalcEngine",
    description:
      "Calculate your pension benefit based on years of service, salary, and multiplier. See COLA projections, survivor benefit options, and lump sum comparison. Free pension calculator.",
    url: "https://calcengine.io/calculators/pension-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pension Calculator | CalcEngine",
    description:
      "Calculate your pension benefit based on years of service, salary, and multiplier. See COLA projections, survivor benefit options, and lump sum comparison. Free pension calculator.",
  },
  alternates: {
    canonical: "/calculators/pension-calculator",
  },
};

const howItWorks = `
<p>A pension, also known as a defined benefit plan, provides a guaranteed monthly income in retirement based on a formula tied to your salary and years of service. Unlike 401(k) plans where the balance depends on investment performance, a pension promises a specific benefit amount, making it one of the most valuable retirement assets available. This calculator models the most common pension formulas used by federal, state, and local governments, as well as some private-sector plans.</p>

<h3>The Pension Formula</h3>
<p>Most pension plans use a straightforward formula: Final Average Salary multiplied by Years of Service multiplied by a Pension Multiplier (expressed as a percentage per year). For example, if your final average salary is $80,000, you have 25 years of service, and your plan uses a 2% multiplier, your annual pension would be: $80,000 x 25 x 0.02 = $40,000 per year, or $3,333 per month.</p>

<p>The "final average salary" may be calculated differently depending on your plan. Some plans use your single highest year of earnings ("final salary"), while others use the average of your highest 3 consecutive years ("high-3," common in federal employment) or highest 5 years ("high-5"). The high-3 and high-5 methods produce slightly lower benefits since they average in years when your salary was lower than its peak.</p>

<h3>COLA and Inflation Protection</h3>
<p>A cost-of-living adjustment (COLA) increases your pension annually to help keep pace with inflation. Federal pensions (FERS) typically provide a COLA based on the Consumer Price Index, while state and local plans vary widely. A 2% COLA means your pension increases by 2% each year. Over 20 years, this compounds significantly: a $40,000 annual pension with 2% COLA grows to about $59,400 by year 20. Without COLA, that same $40,000 would lose nearly half its purchasing power to inflation over the same period.</p>

<h3>Survivor Benefits</h3>
<p>Most pension plans offer survivor benefit options that provide continuing income to your spouse after your death. Choosing a survivor benefit reduces your monthly pension during your lifetime in exchange for this protection. A 50% survivor benefit might reduce your pension by 10%, while a 100% survivor benefit (where your full pension continues to your spouse) might reduce it by 20%. The right choice depends on your spouse's other income sources, health, and financial needs.</p>

<h3>Lump Sum vs Annuity</h3>
<p>Some pension plans offer a lump sum option as an alternative to the monthly annuity. The lump sum represents the present value of all future pension payments discounted at a specific interest rate. A lower discount rate produces a larger lump sum. The annuity (monthly payments for life) is generally the safer choice and often provides more total income, especially if you live a long time. However, a lump sum offers flexibility, the ability to leave an inheritance, and control over investment decisions.</p>
`;

const formula = `Annual Pension = Final Average Salary x Years of Service x Multiplier

Monthly Pension = Annual Pension / 12

COLA-Adjusted Pension (Year N) = Annual Pension x (1 + COLA Rate)^N

Lump Sum Equivalent = Sum of [Pension(year) / (1 + discount rate)^year] for 30 years

Replacement Rate = Annual Pension / Final Average Salary x 100`;

const faqs = [
  {
    question: "What is a pension multiplier and how does it work?",
    answer:
      "A pension multiplier is a percentage that determines how much pension benefit you earn for each year of service. Common multipliers range from 1% to 2.5% per year. At a 2% multiplier with 30 years of service, you would receive 60% of your final average salary as your pension (30 x 2% = 60%). Some plans have tiered multipliers that increase at certain service milestones, such as 1.5% for the first 20 years and 2% for years 21 and beyond.",
  },
  {
    question: "What is the difference between high-3 and high-5 salary calculations?",
    answer:
      "High-3 averages your three highest consecutive years of salary, while high-5 averages your five highest consecutive years. High-3 is used by the Federal Employees Retirement System (FERS) and generally produces a higher benefit because it includes fewer lower-earning years. High-5 is used by some state and local government plans. The difference typically amounts to 3-6% less benefit under high-5 compared to high-3, depending on how steeply your salary increased near the end of your career.",
  },
  {
    question: "Should I take the lump sum or the monthly annuity?",
    answer:
      "This depends on your health, other income sources, investment discipline, and financial needs. The monthly annuity provides guaranteed income for life (and possibly your spouse's life), eliminating investment risk and longevity risk. The lump sum gives you control and flexibility but requires disciplined investment to last through retirement. If you are in good health and expect to live into your 80s or beyond, the annuity usually provides more total income. If you have health concerns or want to leave an inheritance, the lump sum may be more appropriate.",
  },
  {
    question: "How does a survivor benefit work?",
    answer:
      "A survivor benefit continues a portion of your pension to your spouse (or other eligible beneficiary) after your death. You choose the survivor percentage at retirement: typically 50%, 75%, or 100%. Your monthly pension is permanently reduced during your lifetime to fund this benefit. For example, choosing a 50% survivor benefit might reduce your pension by 10%, but your spouse would receive 50% of your reduced pension for the rest of their life after you pass away.",
  },
  {
    question: "What COLA rate should I assume for projections?",
    answer:
      "For federal FERS pensions, the COLA is based on the CPI-W and has averaged about 2-3% over the last several decades, though FERS pensions under age 62 receive a COLA that is 1% less than the CPI increase. State and local plans vary widely — some provide a fixed 2-3% COLA, some tie it to inflation with a cap, and some provide no COLA at all. Check your specific plan documents. Using 2% is a reasonable baseline for most plans.",
  },
  {
    question: "Can I collect a pension and Social Security at the same time?",
    answer:
      "Yes, but if your pension is from employment where you did not pay Social Security taxes (some state and local government positions), your Social Security benefit may be reduced under the Windfall Elimination Provision (WEP) or Government Pension Offset (GPO). Federal FERS employees pay into both Social Security and their pension, so they receive both without reduction. If you paid Social Security taxes throughout your career and also earned a pension, you can collect the full amounts of both.",
  },
];

const relatedCalculators = [
  {
    title: "FERS Retirement Calculator",
    slug: "fers-retirement-calculator",
    description: "Calculate your federal employee retirement benefits under FERS.",
    icon: "🏛️",
  },
  {
    title: "Retirement Calculator",
    slug: "retirement-calculator",
    description: "Plan how much you need to save for a comfortable retirement.",
    icon: "🏖️",
  },
  {
    title: "Social Security Estimator",
    slug: "social-security-estimator",
    description: "Estimate your Social Security benefits at different claiming ages.",
    icon: "🔒",
  },
  {
    title: "401k Calculator",
    slug: "401k-calculator",
    description: "Estimate how much your 401k will grow by retirement.",
    icon: "📈",
  },
];

const editorialContent = `
<h2>Understanding Your Pension: A Disappearing Benefit</h2>
<p>Defined benefit pensions have become increasingly rare in the private sector. In the 1980s, about 38% of private-sector workers had a pension; today, that number is under 15%. Government employees remain the primary beneficiaries of pension plans, with roughly 86% of state and local government workers having access to a defined benefit plan. If you have a pension, understanding its full value is critical to making smart retirement decisions.</p>

<h3>The True Value of a Pension</h3>
<p>Pensions are often more valuable than people realize. A $40,000 annual pension with a 2% COLA is equivalent to having roughly $800,000-$1,000,000 in a 401k or IRA (using the 4% safe withdrawal rate as a rough equivalence). Unlike investment accounts, a pension provides guaranteed income that you cannot outlive, removing both investment risk and longevity risk. This makes pension income function as a form of insurance, which is why financial planners often value pensions at a premium compared to equivalent investment portfolios.</p>

<h3>Maximizing Your Pension</h3>
<p>Since pension benefits are based on years of service and final average salary, the two most effective strategies are: (1) work long enough to maximize your service credit, and (2) increase your salary in your final working years since the formula uses your highest earnings. Be aware that some plans cap the multiplier benefit — for instance, 80% of final salary maximum regardless of years of service. Also, some plans offer the ability to purchase additional service credits, which can be a powerful way to boost your benefit if you are close to a threshold.</p>

<h3>Pension Decisions at Retirement</h3>
<p>The decisions you make at retirement are irrevocable. Choosing between survivor benefit levels, deciding on a lump sum versus annuity, and selecting your retirement date all permanently affect your income. Take time to model multiple scenarios. Consider consulting a fee-only financial planner who specializes in pension analysis before making these decisions, especially for large pensions worth hundreds of thousands of dollars in present value. The cost of professional advice is trivial compared to the lifetime value of a pension decision.</p>
`;

export default function PensionCalculatorPage() {
  return (
    <CalculatorLayout
      title="Pension Calculator"
      description="Calculate your pension benefit based on years of service, salary, and multiplier. See COLA projections, survivor benefit options, and lump sum comparison."
      slug="pension-calculator"
      category={{ name: "Retirement & Investing", slug: "retirement-and-investing" }}
      ctaText="Maximize your pension — get a free retirement plan review"
      ctaHref="https://www.empower.com"
      ctaDescription="Empower offers free retirement plan analysis and personalized guidance from certified financial planners."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <PensionCalculatorWidget />
    </CalculatorLayout>
  );
}
