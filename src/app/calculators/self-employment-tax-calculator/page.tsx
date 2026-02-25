import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const SelfEmploymentTaxCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.SelfEmploymentTaxCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Self-Employment Tax Calculator | CalcEngine",
  description:
    "Calculate your self-employment tax, federal income tax, and estimated quarterly payments. Free SE tax calculator for freelancers, contractors, and small business owners.",
  openGraph: {
    title: "Self-Employment Tax Calculator | CalcEngine",
    description:
      "Calculate your self-employment tax, federal income tax, and estimated quarterly payments. Free SE tax calculator for freelancers, contractors, and small business owners.",
    url: "https://calcengine.io/calculators/self-employment-tax-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Self-Employment Tax Calculator | CalcEngine",
    description:
      "Calculate your self-employment tax, federal income tax, and estimated quarterly payments. Free SE tax calculator for freelancers, contractors, and small business owners.",
  },
  alternates: {
    canonical: "/calculators/self-employment-tax-calculator",
  },
};

const howItWorks = `
<p>If you are a freelancer, independent contractor, sole proprietor, or gig worker, you are responsible for paying self-employment (SE) tax in addition to regular income tax. This calculator computes your total tax obligation, including SE tax, federal income tax, state income tax, and the quarterly estimated payments you need to make to avoid IRS penalties.</p>

<h3>What Is Self-Employment Tax?</h3>
<p>Self-employment tax is the self-employed person's equivalent of the FICA payroll taxes that W-2 employees and their employers split. When you work for an employer, you pay 7.65% (6.2% Social Security + 1.45% Medicare) and your employer pays the matching 7.65%. When you are self-employed, you pay both halves — a total of 15.3% — because you are both the employee and the employer. This is assessed on top of your regular federal and state income taxes.</p>

<h3>How SE Tax Is Calculated</h3>
<p>The calculation begins with your gross self-employment income minus business expenses, giving you your net self-employment income. The IRS then applies SE tax to 92.35% of your net SE income (this 7.65% reduction mirrors the employer-side deduction that W-2 employees get). The Social Security portion (12.4%) applies only up to the annual wage base of $168,600 in 2024, and if you also have W-2 wages, those count toward the cap first. The Medicare portion (2.9%) applies to all SE income with no cap. If your total income exceeds $200,000 ($250,000 for married filing jointly), an additional 0.9% Medicare surtax applies to the excess.</p>

<h3>The SE Tax Deduction</h3>
<p>One important benefit: you can deduct half of your self-employment tax when calculating your adjusted gross income (AGI) for federal income tax purposes. This deduction reduces your taxable income, which in turn reduces your income tax. The calculator applies this deduction automatically when computing your federal income tax liability.</p>

<h3>Federal Income Tax</h3>
<p>After accounting for the SE tax deduction and the standard deduction for your filing status, the remaining taxable income is run through the federal tax brackets. The calculator uses the progressive bracket system, where different portions of your income are taxed at increasing rates from 10% to 37%.</p>

<h3>State Income Tax</h3>
<p>The calculator provides a simplified state tax estimate based on your selected state's effective income tax rate. States like Texas, Florida, and Washington have no income tax, while states like California and New York have rates exceeding 9%. This is an approximation — actual state tax liability depends on state-specific deductions, credits, and bracket structures.</p>

<h3>Estimated Quarterly Payments</h3>
<p>Unlike W-2 employees who have taxes withheld from each paycheck, self-employed individuals must make estimated tax payments quarterly. The IRS requires these payments on April 15, June 15, September 15, and January 15 of the following year. The calculator divides your total estimated tax liability (minus any payments already made) by four to show you the recommended quarterly payment amount. Failing to make adequate quarterly payments can result in underpayment penalties.</p>
`;

const formula = `Net SE Income = Gross Income - Business Expenses

SE Tax Base = Net SE Income x 92.35%

Social Security Tax = min(SE Tax Base, $168,600 - W2 Wages) x 12.4%
Medicare Tax = SE Tax Base x 2.9%
Additional Medicare = max(Total Income - $200k, 0) x 0.9%

Total SE Tax = Social Security + Medicare + Additional Medicare

SE Deduction = Total SE Tax / 2
Taxable Income = Net SE Income + Other Income - SE Deduction - Standard Deduction
Federal Tax = Progressive bracket calculation on Taxable Income`;

const faqs = [
  {
    question: "Who has to pay self-employment tax?",
    answer:
      "You must pay self-employment tax if your net self-employment earnings are $400 or more per year. This includes freelancers, independent contractors, sole proprietors, single-member LLC owners, partners in a partnership, and gig economy workers (Uber, DoorDash, Etsy sellers, etc.). Even if you also have a W-2 job, your side business income is subject to SE tax.",
  },
  {
    question: "How do I make quarterly estimated tax payments?",
    answer:
      "You can make quarterly payments using IRS Form 1040-ES. The easiest method is to pay online at IRS.gov/payments using Direct Pay or the Electronic Federal Tax Payment System (EFTPS). Payments are due April 15, June 15, September 15, and January 15. If any due date falls on a weekend or holiday, the deadline moves to the next business day.",
  },
  {
    question: "What happens if I do not make quarterly payments?",
    answer:
      "The IRS charges an underpayment penalty if you owe more than $1,000 when you file your annual return and you have not paid at least 90% of the current year's tax liability or 100% of the prior year's tax (110% if your AGI exceeds $150,000). The penalty is calculated as interest on the underpayment for each quarter, currently around 8% annually.",
  },
  {
    question: "What business expenses can I deduct?",
    answer:
      "Common deductible business expenses include home office costs (dedicated workspace), business equipment and supplies, professional development and education, software and subscriptions, marketing and advertising, business travel and meals (50% for meals), vehicle expenses for business use, health insurance premiums (for the self-employed), and professional services like accounting and legal fees.",
  },
  {
    question: "Can I reduce my self-employment tax?",
    answer:
      "Key strategies include: maximizing legitimate business deductions to lower net SE income, contributing to a SEP-IRA or Solo 401(k) to reduce taxable income, electing S-Corp status to pay yourself a reasonable salary (subject to FICA) while taking remaining profits as distributions (not subject to SE tax), and using the qualified business income (QBI) deduction if eligible for up to 20% off qualifying business income.",
  },
  {
    question: "How is self-employment tax different from income tax?",
    answer:
      "Self-employment tax (15.3%) funds Social Security and Medicare — it is separate from and in addition to federal income tax. Think of it as the payroll taxes you would normally split with an employer. You pay SE tax on your net business earnings, while income tax is calculated on your adjusted gross income after deductions. Both are owed by self-employed individuals, which is why the total tax burden on self-employment income is often 25-40%.",
  },
];

const relatedCalculators = [
  {
    title: "Federal Tax Calculator",
    slug: "federal-tax-calculator",
    description:
      "Calculate your federal income tax liability with detailed bracket breakdowns.",
    icon: "🏛️",
  },
  {
    title: "Freelance Rate Calculator",
    slug: "freelance-rate-calculator",
    description:
      "Determine the hourly rate you need to charge to cover expenses and taxes.",
    icon: "💻",
  },
  {
    title: "Take-Home Pay Calculator",
    slug: "take-home-pay-calculator",
    description:
      "Calculate your actual take-home pay after taxes and deductions.",
    icon: "🏦",
  },
  {
    title: "401(k) Calculator",
    slug: "401k-calculator",
    description:
      "Optimize your 401(k) contributions and employer matching.",
    icon: "🏦",
  },
];

const editorialContent = `
<h2>The Complete Guide to Self-Employment Taxes</h2>
<p>Self-employment taxes are often the biggest financial shock for new freelancers and independent contractors. When you transition from W-2 employment to self-employment, your tax burden typically increases by 7.65% immediately — the employer half of FICA that your company used to pay. Combined with the loss of employer-subsidized benefits, the true cost of self-employment is often 20-30% higher than most people expect.</p>

<h3>Planning for Tax Season</h3>
<p>The most common mistake self-employed individuals make is failing to set aside money for taxes throughout the year. A good rule of thumb is to immediately transfer 25-30% of every payment you receive into a separate tax savings account. This percentage covers SE tax, federal income tax, and state income tax for most people. If you are in a high-tax state like California or New York, you may need to set aside 35% or more.</p>

<h3>The S-Corp Election</h3>
<p>One of the most discussed tax strategies for self-employed individuals earning over $50,000-$60,000 in net profit is electing S-Corporation status. As an S-Corp, you pay yourself a reasonable salary (subject to payroll taxes) and take remaining profits as distributions (not subject to SE tax). For example, if your business nets $150,000 and your reasonable salary is $80,000, you save SE tax on the $70,000 in distributions — potentially $10,000 or more per year. However, S-Corp status adds administrative complexity and costs (payroll processing, additional tax filings), so it is not beneficial for everyone.</p>

<h3>Retirement Savings Advantages</h3>
<p>Self-employed individuals actually have access to more generous retirement account options than most W-2 employees. A Solo 401(k) allows contributions of up to $23,000 as an employee (2024 limit) plus up to 25% of net self-employment earnings as an employer contribution, for a combined maximum of $69,000 per year. A SEP-IRA allows contributions of up to 25% of net self-employment earnings. These contributions reduce your taxable income, providing immediate tax savings while building long-term retirement wealth.</p>
`;

export default function SelfEmploymentTaxCalculatorPage() {
  return (
    <CalculatorLayout
      title="Self-Employment Tax Calculator"
      description="Calculate your self-employment tax, federal income tax, and estimated quarterly payments. Free SE tax calculator for freelancers, contractors, and small business owners."
      slug="self-employment-tax-calculator"
      category={{ name: "Tax Calculators", slug: "tax-calculators" }}
      ctaText="File your self-employment taxes with TurboTax Self-Employed"
      ctaHref="https://turbotax.intuit.com/personal-taxes/self-employed/"
      ctaDescription="TurboTax Self-Employed finds every deduction and handles Schedule SE, Schedule C, and quarterly estimates."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <SelfEmploymentTaxCalculatorWidget />
    </CalculatorLayout>
  );
}
