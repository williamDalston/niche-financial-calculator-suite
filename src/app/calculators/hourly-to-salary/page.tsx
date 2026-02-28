import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const HourlyToSalaryCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.HourlyToSalaryCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Hourly to Annual Salary Calculator | CalcEngine",
  description:
    "Convert your hourly wage to an annual salary. See monthly, biweekly, weekly, and daily pay breakdowns with and without overtime. Free salary conversion calculator.",
  openGraph: {
    title: "Hourly to Annual Salary Calculator | CalcEngine",
    description:
      "Convert your hourly wage to an annual salary. See monthly, biweekly, weekly, and daily pay breakdowns with and without overtime. Free salary conversion calculator.",
    url: "https://calcengine.org/calculators/hourly-to-salary",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hourly to Annual Salary Calculator | CalcEngine",
    description:
      "Convert your hourly wage to an annual salary. See monthly, biweekly, weekly, and daily pay breakdowns with and without overtime. Free salary conversion calculator.",
  },
  alternates: {
    canonical: "/calculators/hourly-to-salary",
  },
};

const howItWorks = `
<p>Converting an hourly wage to an annual salary is essential for comparing job offers, budgeting, and understanding your true earning power. This calculator goes beyond simple multiplication by accounting for variable work schedules, overtime compensation, and different pay period breakdowns that reflect how you actually receive your paycheck.</p>

<h3>The Core Calculation</h3>
<p>The base annual salary is calculated by multiplying your hourly rate by the number of hours you work per week, then multiplying by the number of weeks you work per year. The standard assumption is 40 hours per week for 52 weeks, which gives you the figure most employers use as a "full-time equivalent" salary. However, if you take unpaid vacation or work a non-standard schedule, adjusting these numbers gives you a more accurate picture.</p>

<p>Overtime pay is calculated separately. Under the Fair Labor Standards Act (FLSA), most non-exempt employees are entitled to 1.5 times their regular rate for hours worked beyond 40 in a workweek. Some employers or union contracts offer double-time (2x) for holidays or excessive hours. The calculator lets you select your overtime multiplier and see exactly how overtime affects your total compensation across all pay periods.</p>

<h3>Understanding Pay Periods</h3>
<p>Employers pay on different schedules, and it helps to understand the math behind each one. Monthly pay divides your annual salary by 12. Biweekly pay (every two weeks) means you receive 26 paychecks per year — not 24. This is why biweekly pay is slightly different from "twice a month." Weekly pay divides by 52, and daily pay assumes a standard 5-day workweek. Knowing your pay per period helps with budgeting since your bills are often due monthly while you may be paid biweekly.</p>

<h3>Why Weeks Per Year Matters</h3>
<p>If you receive paid vacation and holidays, your weeks per year should stay at 52 since you are being compensated for those weeks. If your vacation is unpaid, reduce the weeks accordingly. For example, someone who takes two weeks of unpaid vacation would enter 50 weeks. Similarly, contract workers who are not guaranteed year-round work should estimate their actual weeks of employment for a realistic annual figure.</p>

<h3>Comparing Hourly to Salary Offers</h3>
<p>When comparing an hourly position to a salaried one, remember that salaried positions typically include benefits such as health insurance, retirement contributions, and paid time off. The value of these benefits often adds 20-30% to the base salary. A $25/hour job without benefits is not equivalent to a $52,000 salaried position with a full benefits package. Factor in the dollar value of benefits to make a fair comparison between the two types of compensation.</p>
`;

const formula = `Annual Salary = (Hourly Rate x Hours/Week x Weeks/Year)
              + (Hourly Rate x OT Multiplier x OT Hours/Week x Weeks/Year)

Monthly Pay = Annual Salary / 12
Biweekly Pay = Annual Salary / 26
Weekly Pay = Annual Salary / 52
Daily Pay = Weekly Pay / 5`;

const faqs = [
  {
    question: "How do I convert hourly pay to annual salary?",
    answer:
      "Multiply your hourly rate by the number of hours you work per week, then multiply by 52 (the number of weeks in a year). For a standard full-time schedule: $25/hour x 40 hours x 52 weeks = $52,000 per year. If you work fewer than 52 weeks (unpaid time off), reduce accordingly. For example, $25/hour x 40 hours x 50 weeks = $50,000.",
  },
  {
    question: "Does the calculator account for taxes?",
    answer:
      "No, all figures shown are gross pay (before taxes). Your actual take-home pay will be lower after federal income tax, state income tax (if applicable), Social Security tax (6.2%), and Medicare tax (1.45%) are withheld. For an estimate of your after-tax pay, use our Take-Home Pay Calculator.",
  },
  {
    question: "What is the overtime rate and who qualifies?",
    answer:
      "Under the FLSA, non-exempt employees must receive overtime pay of at least 1.5 times their regular rate for hours worked over 40 in a workweek. Some states, like California, also require overtime for hours over 8 in a single day. Salaried employees earning above a certain threshold ($58,656/year as of 2025) are generally exempt from overtime. Some industries and union contracts provide double-time (2x) for holidays or hours over a certain threshold.",
  },
  {
    question: "Should I use 52 or 50 weeks for my calculation?",
    answer:
      "Use 52 weeks if you receive paid vacation and holidays, since you are paid for those weeks. Use 50 weeks (or fewer) if you have unpaid time off. Most full-time salaried equivalents assume 52 weeks. If you want to find your actual earnings, count only the weeks you are actually working and getting paid. For example, teachers who work 40 weeks per year should use 40.",
  },
  {
    question: "How does biweekly pay differ from semi-monthly pay?",
    answer:
      "Biweekly pay means you are paid every two weeks, resulting in 26 paychecks per year. Semi-monthly pay means you are paid twice a month (typically the 1st and 15th), resulting in 24 paychecks per year. This means biweekly paychecks are slightly smaller than semi-monthly ones, but you receive two extra paychecks per year. Over the year, your total pay is the same.",
  },
  {
    question: "What is the minimum wage equivalent annual salary?",
    answer:
      "At the federal minimum wage of $7.25/hour, a full-time worker (40 hours, 52 weeks) earns $15,080 per year. Many states and cities have higher minimum wages. For example, at $15/hour: $31,200/year. At $20/hour: $41,600/year. These figures are before taxes and do not include overtime. The federal minimum wage has not increased since 2009, but many employers offer above-minimum starting wages due to market competition.",
  },
];

const relatedCalculators = [
  {
    title: "Salary to Hourly Calculator",
    slug: "salary-to-hourly",
    description: "Convert an annual salary to an hourly wage and see pay breakdowns.",
    icon: "💵",
  },
  {
    title: "Overtime Calculator",
    slug: "overtime-calculator",
    description: "Calculate your overtime pay and see how extra hours add up.",
    icon: "⏰",
  },
  {
    title: "Take-Home Pay Calculator",
    slug: "take-home-pay-calculator",
    description: "See your actual paycheck after federal and state taxes.",
    icon: "🏧",
  },
  {
    title: "Federal Tax Calculator",
    slug: "federal-tax-calculator",
    description: "Estimate your federal income tax liability for the current year.",
    icon: "🏛️",
  },
];

const editorialContent = `
<h2>Understanding Your Hourly Wage in Annual Terms</h2>
<p>Whether you are negotiating a new job, switching from hourly to salaried work, or simply trying to budget, understanding your hourly wage as an annual salary is one of the most practical financial calculations you can make. It transforms an abstract number into something you can compare against salary benchmarks, mortgage qualification requirements, and tax brackets.</p>

<h3>The Real Value of Overtime</h3>
<p>Overtime can dramatically increase your annual earnings. A worker making $20/hour with 10 hours of weekly overtime at 1.5x earns $56,800 annually — compared to $41,600 without overtime. That is a 36% increase. However, relying on overtime income has risks: it can be reduced or eliminated at the employer's discretion, and it is taxed at your marginal rate, which may be higher than you expect. Financial advisors recommend budgeting based on your base pay and treating overtime as a bonus for savings and debt payoff.</p>

<h3>Hourly vs Salary: What Employers Know</h3>
<p>Employers often frame hourly roles as less desirable than salaried positions, but this is not always the case. Hourly workers benefit from overtime protections, clear boundaries between work and personal time, and predictable compensation for every hour worked. Salaried employees may work 50-60 hours per week with no additional pay, effectively reducing their hourly rate below what they would earn in an equivalent hourly position. Before accepting a salary offer, calculate the effective hourly rate: divide the annual salary by the number of hours you actually expect to work.</p>

<h3>Using This Data for Budgeting</h3>
<p>The 50/30/20 budgeting rule suggests allocating 50% of after-tax income to needs (housing, food, transportation), 30% to wants (entertainment, dining out), and 20% to savings and debt repayment. To apply this rule, start with your annual salary, estimate your after-tax income (roughly 70-80% of gross for most workers), and divide by 12 for your monthly budget framework. Knowing your income in different pay periods helps align your budget with your actual paycheck schedule.</p>
`;

export default function HourlyToSalaryCalculatorPage() {
  return (
    <CalculatorLayout
      title="Hourly to Annual Salary Calculator"
      description="Convert your hourly wage to an annual salary. See monthly, biweekly, weekly, and daily pay breakdowns with and without overtime."
      slug="hourly-to-salary"
      category={{ name: "Salary & Career", slug: "salary-and-career" }}
      ctaText="Find higher-paying jobs matching your skills"
      ctaHref="https://www.indeed.com"
      ctaDescription="Search millions of jobs and find the right fit for your skills and salary expectations."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <HourlyToSalaryCalculatorWidget />
    </CalculatorLayout>
  );
}
