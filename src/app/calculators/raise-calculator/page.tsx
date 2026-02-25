import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const RaiseCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.RaiseCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Raise Calculator | CalcEngine",
  description:
    "Calculate the impact of a salary raise on your annual income, per-paycheck increase, and after-tax take-home pay. Free raise and salary increase calculator.",
  openGraph: {
    title: "Raise Calculator | CalcEngine",
    description:
      "Calculate the impact of a salary raise on your annual income, per-paycheck increase, and after-tax take-home pay. Free raise and salary increase calculator.",
    url: "https://calcengine.io/calculators/raise-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raise Calculator | CalcEngine",
    description:
      "Calculate the impact of a salary raise on your annual income, per-paycheck increase, and after-tax take-home pay. Free raise and salary increase calculator.",
  },
  alternates: {
    canonical: "/calculators/raise-calculator",
  },
};

const howItWorks = `
<p>A raise calculator helps you understand the real financial impact of a salary increase by breaking it down into practical terms: annual raise amount, per-paycheck increase, and most importantly, the after-tax value of your raise. This matters because your raise is taxed at your marginal tax rate — not your effective rate — so the take-home increase is always less than the gross raise amount.</p>

<h3>Understanding the Calculation</h3>
<p>The basic math is straightforward. If you enter a raise as a percentage, your new salary is calculated as: New Salary = Current Salary x (1 + Raise Percentage / 100). For example, a 5% raise on a $65,000 salary yields a new salary of $68,250 and a gross raise of $3,250 per year. You can also enter the raise as a new salary amount, and the calculator will work backwards to determine the percentage and annual raise amount.</p>

<p>To compute the per-paycheck increase, the annual raise is divided by the number of pay periods. If you are paid bi-weekly (26 paychecks per year), a $3,250 annual raise translates to approximately $125 more per paycheck before taxes.</p>

<h3>Tax Impact Estimation</h3>
<p>This is where the calculator provides unique value. Your raise is taxed at your marginal federal income tax rate — the rate that applies to the last (highest) dollar you earn. The calculator uses the current federal income tax brackets for your filing status to determine your marginal rate and estimate how much of your raise will go to federal income taxes.</p>

<p>For instance, if your new salary of $68,250 puts you in the 22% marginal bracket as a single filer, approximately $715 of your $3,250 raise goes to additional federal income tax, leaving you with about $2,535 after federal tax — or roughly $97.50 more per bi-weekly paycheck. Note that this estimate does not include state income taxes, Social Security tax (6.2%), or Medicare tax (1.45%), which would further reduce the take-home amount.</p>

<h3>How to Use This Calculator</h3>
<p>Enter your current annual salary, then specify your raise as either a percentage or a new salary amount. Select your pay frequency so the calculator can show you the per-paycheck impact. Choose your filing status for the tax estimate. The results update instantly, showing you both the headline raise figure and the practical after-tax reality.</p>

<h3>Comparing Raise Scenarios</h3>
<p>The bar charts provide visual context for your raise. The salary comparison chart shows your old salary alongside your new salary, making the increase tangible. The breakdown chart splits the raise into the portion you keep after taxes and the estimated tax cost. Use these visuals when negotiating — understanding the after-tax value of different raise percentages helps you set realistic expectations and negotiate from a position of knowledge.</p>

<h3>Beyond the Paycheck</h3>
<p>Remember that a raise has compounding effects over your career. A 5% raise this year means all future raises, bonuses, and percentage-based benefits are calculated from a higher base. Over a 30-year career, the difference between accepting a 3% raise versus negotiating a 5% raise in a single year can compound to tens of thousands of dollars in lifetime earnings. This is why salary negotiation at every opportunity is one of the highest-return financial activities you can undertake.</p>
`;

const formula = `New Salary = Current Salary x (1 + Raise% / 100)

Raise Amount = New Salary - Current Salary

Per Paycheck Increase = Raise Amount / Pay Periods per Year

After-Tax Raise ≈ Raise Amount x (1 - Marginal Tax Rate)`;

const faqs = [
  {
    question: "What is a good raise percentage to ask for?",
    answer:
      "The average annual raise in the US is typically 3-5% for cost-of-living adjustments and merit increases. A raise of 5-10% is generally considered strong for a performance-based increase. Promotions typically come with 10-20% raises. If you are significantly underpaid relative to market rate, asking for 15-25% is reasonable when supported by salary data.",
  },
  {
    question: "How is my raise taxed?",
    answer:
      "Your raise is taxed at your marginal (highest) tax rate, not your average tax rate. For example, if you are in the 22% federal bracket, roughly 22% of your raise goes to federal income tax, plus 7.65% for Social Security and Medicare (FICA), and potentially state income tax. This means you typically keep only 60-75% of a raise as actual take-home pay.",
  },
  {
    question: "When is the best time to negotiate a raise?",
    answer:
      "The best times to negotiate are during annual performance reviews, after successfully completing a major project, when taking on significant new responsibilities, or when you have a competing job offer. Avoid asking during company layoffs, financial downturns, or immediately after a negative performance event. Come prepared with market salary data and a list of your accomplishments.",
  },
  {
    question: "Should I negotiate salary or benefits?",
    answer:
      "It depends on your situation. Additional salary compounds over your career and increases future raises and retirement contributions. However, benefits like extra vacation days, remote work flexibility, a signing bonus, stock options, or increased 401(k) matching can sometimes be easier for employers to grant and may have equal or greater value to you. Consider the total compensation package, not just base salary.",
  },
  {
    question: "How does a raise affect my 401(k) contributions?",
    answer:
      "If you contribute a percentage of your salary to a 401(k), a raise automatically increases your annual contributions. For example, if you contribute 10% and get a $5,000 raise, your annual 401(k) contribution increases by $500 — plus any employer match on that additional amount. This is an often-overlooked benefit of raises that compounds significantly over decades.",
  },
  {
    question: "What if my raise does not keep up with inflation?",
    answer:
      "If your raise percentage is lower than the inflation rate, your purchasing power is actually decreasing — you are effectively taking a pay cut in real terms. For example, if inflation is 4% and you receive a 3% raise, your real wage has decreased by about 1%. Use this calculator alongside an inflation calculator to understand whether your raise truly represents a real increase in your standard of living.",
  },
];

const relatedCalculators = [
  {
    title: "Salary to Hourly Calculator",
    slug: "salary-to-hourly",
    description:
      "Convert your annual salary to an hourly rate to understand your true wage.",
    icon: "💵",
  },
  {
    title: "Take-Home Pay Calculator",
    slug: "take-home-pay-calculator",
    description:
      "Calculate your actual take-home pay after all taxes and deductions.",
    icon: "🏦",
  },
  {
    title: "Overtime Calculator",
    slug: "overtime-calculator",
    description:
      "Estimate your overtime pay based on hourly rate and hours worked.",
    icon: "⏱️",
  },
  {
    title: "Inflation Calculator",
    slug: "inflation-calculator",
    description:
      "See how inflation affects the purchasing power of your raise over time.",
    icon: "📊",
  },
];

const editorialContent = `
<h2>Mastering Salary Negotiation: Getting the Raise You Deserve</h2>
<p>Salary negotiation is consistently cited as one of the most impactful financial skills you can develop. Research from Carnegie Mellon University found that employees who negotiate their starting salary earn an average of $600,000 more over a 30-year career compared to those who accept the first offer. The same principle applies to annual raises — each successful negotiation raises the baseline for all future compensation.</p>

<h3>Preparation Is Everything</h3>
<p>Before any salary conversation, gather market data. Use resources like the Bureau of Labor Statistics Occupational Employment data, Glassdoor salary reports, Levels.fyi (for tech), and professional association surveys to understand the going rate for your role, experience level, and geographic area. Document your accomplishments with specific metrics: revenue generated, costs saved, projects completed, and any responsibilities you have taken on beyond your original job description.</p>

<h3>The Negotiation Conversation</h3>
<p>Frame the conversation around your value to the organization, not your personal financial needs. Lead with your accomplishments, present market data showing where your current salary falls, and propose a specific number or range (anchor high within reason). Practice your talking points beforehand and be prepared for pushback. If the employer cannot meet your salary request, negotiate for other forms of compensation: a signing bonus, additional vacation time, flexible work arrangements, professional development funding, or an accelerated review timeline.</p>

<h3>Compounding Career Earnings</h3>
<p>The most important aspect of a raise is not the immediate paycheck increase — it is the compounding effect over your career. Every future raise, bonus, and percentage-based benefit is calculated from your new, higher base salary. A single additional $3,000 negotiated today, with 3% annual raises, becomes worth over $140,000 in additional lifetime earnings over 30 years. This is why it is worth spending time understanding your raise in detail and negotiating with confidence.</p>
`;

export default function RaiseCalculatorPage() {
  return (
    <CalculatorLayout
      title="Raise Calculator"
      description="Calculate the impact of a salary raise on your annual income, per-paycheck increase, and after-tax take-home pay."
      slug="raise-calculator"
      category={{ name: "Salary & Career", slug: "salary-and-career" }}
      ctaText="Explore higher-paying positions at top companies"
      ctaHref="https://www.indeed.com"
      ctaDescription="Browse thousands of open positions and see what you could be earning at a new company."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <RaiseCalculatorWidget />
    </CalculatorLayout>
  );
}
