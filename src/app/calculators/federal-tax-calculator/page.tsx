import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const FederalTaxCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.FederalTaxCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Federal Tax Estimator 2024 | CalcEngine",
  description:
    "Estimate your 2024 federal income tax, effective tax rate, and tax bracket breakdown. Free tax calculator with standard and itemized deductions, child tax credits, and above-the-line deductions.",
  openGraph: {
    title: "Federal Tax Estimator 2024 | CalcEngine",
    description:
      "Estimate your 2024 federal income tax, effective tax rate, and tax bracket breakdown. Free tax calculator with standard and itemized deductions, child tax credits, and above-the-line deductions.",
    url: "https://calcengine.io/calculators/federal-tax-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Federal Tax Estimator 2024 | CalcEngine",
    description:
      "Estimate your 2024 federal income tax, effective tax rate, and tax bracket breakdown. Free tax calculator with standard and itemized deductions, child tax credits, and above-the-line deductions.",
  },
  alternates: {
    canonical: "/calculators/federal-tax-calculator",
  },
};

const howItWorks = `
<p>The Federal Tax Estimator calculates your estimated U.S. federal income tax liability using the official 2024 IRS tax brackets and standard deduction amounts. Whether you are a single filer, married filing jointly, married filing separately, or head of household, this tool provides a detailed breakdown of how much you owe at each bracket level and your overall effective tax rate.</p>

<h3>How Federal Income Tax Is Calculated</h3>
<p>The U.S. federal income tax system is progressive, meaning different portions of your income are taxed at increasing rates. Your first dollars of taxable income are taxed at 10%, then the next portion at 12%, and so on up to 37% for the highest earners. The key term is "taxable income," which is your gross income minus adjustments (above-the-line deductions) and either the standard deduction or your itemized deductions.</p>

<p>Above-the-line deductions reduce your Adjusted Gross Income (AGI) and are available whether or not you itemize. These include traditional IRA contributions, student loan interest (up to $2,500), and Health Savings Account (HSA) contributions. These deductions are especially valuable because they reduce your income before the standard deduction is applied.</p>

<h3>Standard vs. Itemized Deductions</h3>
<p>After calculating your AGI, you subtract either the standard deduction or your itemized deductions, whichever is greater. The 2024 standard deduction is $14,600 for single filers, $29,200 for married filing jointly, and $21,900 for head of household. If your itemized deductions for mortgage interest, state and local taxes (SALT, capped at $10,000), and charitable contributions exceed the standard deduction, itemizing will save you more.</p>

<h3>Tax Credits and Dependents</h3>
<p>Tax credits directly reduce the amount of tax you owe, dollar for dollar. The Child Tax Credit provides up to $2,000 per qualifying child under age 17. Unlike deductions which reduce your taxable income, credits reduce your actual tax bill. This calculator applies the child tax credit after computing your base tax liability to show you the final amount owed.</p>

<h3>Understanding Your Effective Tax Rate</h3>
<p>Your marginal tax rate is the rate on your last dollar of income, which determines the tax bracket you are in. Your effective tax rate, on the other hand, is the actual percentage of your total gross income that goes to federal taxes. Because of the progressive system, your effective rate is always lower than your marginal rate. For example, a single filer earning $85,000 might have a marginal rate of 22% but an effective rate of only about 14%. Understanding both rates helps you make better decisions about retirement contributions, deductions, and tax planning strategies.</p>

<h3>Limitations</h3>
<p>This estimator covers federal income tax only. It does not include FICA taxes (Social Security and Medicare), state income taxes, self-employment tax, capital gains tax, or the Alternative Minimum Tax (AMT). For a comprehensive tax picture, consult a qualified tax professional or use this tool alongside our other calculators.</p>
`;

const formula = `Federal Tax = Sum of (Taxable Income in Each Bracket x Bracket Rate)

2024 Tax Brackets (Single):
  10%: $0 - $11,600
  12%: $11,601 - $47,150
  22%: $47,151 - $100,525
  24%: $100,526 - $191,950
  32%: $191,951 - $243,725
  35%: $243,726 - $609,350
  37%: $609,351+

Taxable Income = Gross Income - Above-the-Line Deductions - Standard/Itemized Deduction
Tax After Credits = Federal Tax - Child Tax Credit ($2,000/child)
Effective Tax Rate = Tax After Credits / Gross Income`;

const faqs = [
  {
    question: "What is the difference between marginal and effective tax rate?",
    answer:
      "Your marginal tax rate is the rate applied to your last dollar of taxable income, determined by which tax bracket it falls into. Your effective tax rate is the average rate you pay across all your income, calculated by dividing your total tax by your gross income. Because the U.S. uses a progressive system, your effective rate is always lower than your marginal rate. For example, a single filer earning $100,000 has a marginal rate of 22% but an effective rate of approximately 15.6%.",
  },
  {
    question: "Should I take the standard deduction or itemize?",
    answer:
      "You should itemize if your total itemized deductions exceed the standard deduction for your filing status ($14,600 single, $29,200 MFJ, $21,900 HoH in 2024). Common itemized deductions include mortgage interest, state and local taxes (SALT, capped at $10,000), and charitable contributions. Since the SALT cap was introduced in 2018, fewer taxpayers benefit from itemizing. About 87% of taxpayers now use the standard deduction.",
  },
  {
    question: "How does the Child Tax Credit work?",
    answer:
      "The Child Tax Credit provides up to $2,000 per qualifying child under age 17. It directly reduces your tax bill dollar-for-dollar, making it more valuable than a deduction. The credit begins to phase out at $200,000 of modified AGI for single filers and $400,000 for married filing jointly. Up to $1,700 of the credit is refundable as the Additional Child Tax Credit, meaning you can receive it even if you owe no tax.",
  },
  {
    question: "What are above-the-line deductions?",
    answer:
      "Above-the-line deductions (also called adjustments to income) reduce your Adjusted Gross Income (AGI) regardless of whether you itemize. Common above-the-line deductions include traditional IRA contributions (up to $7,000 in 2024, $8,000 if age 50+), student loan interest (up to $2,500), HSA contributions ($4,150 individual, $8,300 family in 2024), and educator expenses. These are particularly valuable because they also reduce your AGI, which can qualify you for other tax benefits.",
  },
  {
    question: "How does filing status affect my taxes?",
    answer:
      "Your filing status determines your standard deduction amount and the income thresholds for each tax bracket. Married Filing Jointly generally offers the most favorable brackets and the highest standard deduction ($29,200). Head of Household, available to unmarried taxpayers with dependents, offers better rates than Single status. Married Filing Separately uses the narrowest brackets and is rarely advantageous unless one spouse has significant medical expenses or student loan payments tied to income.",
  },
  {
    question: "Does this calculator include Social Security and Medicare taxes?",
    answer:
      "No, this calculator estimates federal income tax only. Social Security tax (6.2% on earnings up to $168,600 in 2024) and Medicare tax (1.45% on all earnings, plus 0.9% surtax on earnings over $200,000) are calculated separately. Combined, these FICA taxes add roughly 7.65% for most employees. Use our Take-Home Pay Calculator to see your total paycheck after all withholdings including FICA, federal, and state taxes.",
  },
];

const relatedCalculators = [
  {
    title: "Take-Home Pay Calculator",
    slug: "take-home-pay-calculator",
    description: "See your actual paycheck after federal, state, and FICA tax withholdings.",
    icon: "💰",
  },
  {
    title: "Retirement Calculator",
    slug: "retirement-calculator",
    description: "Plan how much you need to save for a comfortable retirement.",
    icon: "🏖️",
  },
  {
    title: "Salary to Hourly",
    slug: "salary-to-hourly",
    description: "Convert your annual salary to an hourly rate and vice versa.",
    icon: "⏰",
  },
  {
    title: "401k Calculator",
    slug: "401k-calculator",
    description: "See how your 401k contributions grow over time with employer matching.",
    icon: "📈",
  },
];

const editorialContent = `
<h2>Federal Tax Planning Strategies for 2024</h2>
<p>Understanding how the federal tax system works is the first step toward effective tax planning. With the right strategies, you can legally minimize your tax burden and keep more of your hard-earned income. Here are some key concepts and strategies to consider.</p>

<h3>Maximize Tax-Advantaged Accounts</h3>
<p>Contributing to tax-advantaged retirement accounts is one of the most powerful ways to reduce your current tax bill. Traditional 401(k) contributions (up to $23,000 in 2024, $30,500 if age 50+) are made pre-tax, directly reducing your taxable income. Traditional IRA contributions (up to $7,000, $8,000 if 50+) may also be deductible depending on your income and whether you have an employer plan. HSA contributions offer a triple tax advantage: deductible contributions, tax-free growth, and tax-free withdrawals for qualified medical expenses.</p>

<h3>Timing Your Income and Deductions</h3>
<p>If you expect to be in a lower tax bracket next year (due to retirement, job change, or other factors), consider deferring income to the following year. Conversely, if you expect to be in a higher bracket, accelerating deductions into the current year can be beneficial. This strategy, known as bunching deductions, can help you exceed the standard deduction threshold in alternating years by timing charitable contributions and other deductible expenses.</p>

<h3>The SALT Cap and Its Impact</h3>
<p>The $10,000 cap on state and local tax (SALT) deductions, introduced by the Tax Cuts and Jobs Act, significantly affects taxpayers in high-tax states like California, New York, and New Jersey. If your state income taxes and property taxes exceed $10,000, you cannot deduct the excess on your federal return. This has pushed many taxpayers who previously itemized toward the standard deduction. Some states have introduced pass-through entity taxes as a workaround for business owners, allowing the business to pay state taxes and deduct them without the SALT cap limitation.</p>

<h3>Plan Ahead for Tax Season</h3>
<p>Effective tax planning is a year-round activity, not just an April event. Review your withholdings periodically using IRS Form W-4, especially after major life events like marriage, having a child, or changing jobs. Consider estimated tax payments if you have significant non-wage income. And always keep records of your deductible expenses throughout the year to ensure you capture every legitimate deduction.</p>
`;

export default function FederalTaxCalculatorPage() {
  return (
    <CalculatorLayout
      title="Federal Tax Estimator"
      description="Estimate your 2024 federal income tax, effective tax rate, and tax bracket breakdown with standard or itemized deductions and child tax credits."
      slug="federal-tax-calculator"
      category={{ name: "Tax Calculators", slug: "tax-calculators" }}
      ctaText="File your taxes online — free for simple returns"
      ctaHref="https://turbotax.intuit.com"
      ctaDescription="TurboTax Free Edition handles simple tax returns with W-2 income and the standard deduction at no cost."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <FederalTaxCalculatorWidget />
    </CalculatorLayout>
  );
}
