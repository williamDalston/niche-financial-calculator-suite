import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const TakeHomePayWidget = dynamic(() => import("./calculator").then((m) => m.TakeHomePayWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Take-Home Pay Calculator | CalcEngine",
  description:
    "Calculate your take-home pay after federal and state taxes, Social Security, Medicare, and deductions. Free paycheck calculator for 2025 tax brackets.",
  openGraph: {
    title: "Take-Home Pay Calculator | CalcEngine",
    description:
      "Calculate your take-home pay after federal and state taxes, Social Security, Medicare, and deductions. Free paycheck calculator for 2025 tax brackets.",
    url: "https://calcengine.org/calculators/take-home-pay-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Take-Home Pay Calculator | CalcEngine",
    description:
      "Calculate your take-home pay after federal and state taxes, Social Security, Medicare, and deductions. Free paycheck calculator for 2025 tax brackets.",
  },
  alternates: {
    canonical: "/calculators/take-home-pay-calculator",
  },
};

const howItWorks = `
<p>The take-home pay calculator estimates your actual paycheck amount after all mandatory deductions and taxes are applied to your gross salary. Understanding the gap between your gross and net income is essential for realistic budgeting and financial planning.</p>

<h3>Federal Income Tax</h3>
<p>The United States uses a progressive tax system with seven tax brackets for 2025. This means different portions of your income are taxed at different rates. For example, a single filer earning $80,000 does not pay 22% on the entire amount. Instead, the first $11,925 is taxed at 10%, the next $36,550 (from $11,926 to $48,475) at 12%, and the remaining $31,525 (from $48,476 to $80,000) at 22%. This results in an effective tax rate of about 15.8%, significantly lower than the marginal rate of 22%.</p>

<h3>FICA Taxes: Social Security and Medicare</h3>
<p>Every employee pays Federal Insurance Contributions Act (FICA) taxes, which fund Social Security and Medicare. Social Security tax is 6.2% of your earnings up to $176,100 (the 2025 wage base limit). Your employer pays an additional 6.2%, for a combined 12.4%. Medicare tax is 1.45% on all earnings, with an additional 0.9% surtax on earnings above $200,000 for single filers. These taxes are not progressive — they apply from the first dollar earned.</p>

<h3>State Income Tax</h3>
<p>State income tax varies widely. Nine states (Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming) have no state income tax on wages. California has the highest top rate at 13.3%, though most earners pay a much lower effective rate. This calculator uses simplified flat rates for the most common states to give you a reasonable estimate. For precise state tax calculations, consult your state's tax authority.</p>

<h3>Pre-Tax Deductions</h3>
<p>Pre-tax deductions like 401(k) contributions and health insurance premiums reduce your taxable income, which in turn reduces the amount of federal and state income tax you owe. For example, if you earn $80,000 and contribute $6,000 to your 401(k), your taxable income for federal and state purposes drops to $74,000. This effectively gives you a tax discount on your retirement savings. However, pre-tax deductions do not reduce FICA taxes — Social Security and Medicare are calculated on your gross pay.</p>

<h3>Understanding Your Results</h3>
<p>The calculator shows your net pay per period (based on your selected pay frequency), along with a detailed breakdown of each deduction. The pie chart visualizes where your gross pay goes, helping you see at a glance how much of your earnings you actually take home versus how much goes to various taxes and deductions. Most Americans take home between 65% and 80% of their gross pay, depending on income level, filing status, and state of residence.</p>
`;

const formula = `Federal Tax = Sum of (taxable income in each bracket x bracket rate)

Social Security = 6.2% x min(Gross Income, $176,100)
Medicare = 1.45% x Gross Income + 0.9% x max(0, Gross Income - $200,000)

Net Pay = Gross Income - Federal Tax - State Tax - Social Security - Medicare - Pre-tax Deductions

Effective Tax Rate = Total Taxes / Gross Income x 100`;

const faqs = [
  {
    question: "What is the difference between gross pay and net pay?",
    answer:
      "Gross pay is your total earnings before any deductions. Net pay (take-home pay) is what you actually receive in your bank account after federal income tax, state income tax, Social Security, Medicare, and any voluntary deductions (like 401k contributions and health insurance premiums) are subtracted.",
  },
  {
    question: "Why is my first paycheck of the year different?",
    answer:
      "Your first paycheck may differ because annual deductions (like health insurance) might be adjusted for the new year, tax brackets reset, and your Social Security and Medicare withholding starts fresh. Also, if you received a raise effective January 1, your withholding calculations will change.",
  },
  {
    question: "How do 401(k) contributions affect my taxes?",
    answer:
      "Traditional 401(k) contributions are deducted from your gross pay before federal and state income taxes are calculated, reducing your taxable income. For example, if you earn $80,000 and contribute $6,000 to your 401(k), you are only taxed on $74,000 of income. However, 401(k) contributions do not reduce Social Security or Medicare taxes.",
  },
  {
    question: "What is the Social Security wage base limit?",
    answer:
      "For 2025, Social Security tax (6.2%) only applies to the first $176,100 of earnings. Income above this threshold is not subject to Social Security tax. This means the maximum Social Security tax you can pay in 2025 is $10,918.20. Medicare tax, however, has no wage base limit — it applies to all earnings.",
  },
  {
    question: "How does filing status affect my take-home pay?",
    answer:
      "Your filing status determines which tax brackets apply to your income. Married Filing Jointly brackets are roughly double the Single brackets, which generally results in lower taxes for married couples. Head of Household falls between Single and Married brackets. Your W-4 filing status should match your expected tax return filing status.",
  },
  {
    question: "Which states have no income tax?",
    answer:
      "Nine states have no state income tax on wages: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. Living in one of these states means more take-home pay, though these states often make up the revenue through higher property taxes, sales taxes, or other fees.",
  },
  {
    question: "How accurate is this calculator?",
    answer:
      "This calculator provides a reasonable estimate using 2025 federal tax brackets and simplified state tax rates. Actual withholding may differ based on your specific W-4 elections, additional income sources, itemized deductions, tax credits, and your state's actual progressive tax brackets. For tax planning purposes, consult a tax professional or use IRS Tax Withholding Estimator.",
  },
];

const relatedCalculators = [
  {
    title: "Federal Tax Calculator",
    slug: "federal-tax-calculator",
    description: "Estimate your federal income tax liability for the current year.",
    icon: "🏛️",
  },
  {
    title: "Salary to Hourly Converter",
    slug: "salary-to-hourly",
    description: "Convert your annual salary to hourly, weekly, and monthly pay.",
    icon: "💰",
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
    description: "Estimate your Social Security benefits at different retirement ages.",
    icon: "🔒",
  },
];

const editorialContent = `
<h2>Maximizing Your Take-Home Pay</h2>
<p>While you cannot avoid taxes entirely, there are legitimate strategies to keep more of your hard-earned money. Understanding these strategies can make a meaningful difference in your annual finances.</p>

<h3>Optimize Your W-4</h3>
<p>Many people either over-withhold or under-withhold federal taxes. If you consistently receive a large tax refund (over $1,000), you are essentially giving the government an interest-free loan. Consider adjusting your W-4 to reduce withholding and increase your per-paycheck take-home pay. The IRS Tax Withholding Estimator can help you fill out your W-4 accurately.</p>

<h3>Maximize Pre-Tax Deductions</h3>
<p>Contributing to a traditional 401(k) or 403(b) reduces your taxable income dollar-for-dollar, up to $23,500 in 2025 ($31,000 if age 50+). If you are in the 22% tax bracket, every $1,000 contributed saves you $220 in federal taxes. Health Savings Accounts (HSAs) offer a triple tax advantage: contributions are tax-deductible, growth is tax-free, and qualified withdrawals are tax-free.</p>

<h3>Consider Your State</h3>
<p>If you work remotely and have flexibility in where you live, state income tax can be a significant factor. Moving from California (top rate 13.3%) to Texas (0%) could save a six-figure earner over $10,000 per year in state taxes alone. However, consider the full picture including cost of living, property taxes, and quality of life.</p>
`;

export default function TakeHomePayPage() {
  return (
    <CalculatorLayout
      title="Take-Home Pay Calculator"
      description="Estimate your actual paycheck after federal and state taxes, Social Security, Medicare, and pre-tax deductions. Uses 2025 tax brackets."
      slug="take-home-pay-calculator"
      category={{ name: "Tax Calculators", slug: "tax-calculators" }}
      ctaText="File your taxes online — free for simple returns"
      ctaHref="https://www.turbotax.com"
      ctaDescription="TurboTax Free Edition handles simple federal and state returns at no cost."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <TakeHomePayWidget />
    </CalculatorLayout>
  );
}
