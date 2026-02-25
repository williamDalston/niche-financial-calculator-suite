import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const OvertimeCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.OvertimeCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Overtime Calculator | CalcEngine",
  description:
    "Calculate your overtime pay, total gross earnings, and effective hourly rate. Free overtime calculator supporting 1.5x and 2x rates with weekly and biweekly pay periods.",
  openGraph: {
    title: "Overtime Calculator | CalcEngine",
    description:
      "Calculate your overtime pay, total gross earnings, and effective hourly rate. Free overtime calculator supporting 1.5x and 2x rates with weekly and biweekly pay periods.",
    url: "https://calcengine.io/calculators/overtime-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Overtime Calculator | CalcEngine",
    description:
      "Calculate your overtime pay, total gross earnings, and effective hourly rate. Free overtime calculator supporting 1.5x and 2x rates with weekly and biweekly pay periods.",
  },
  alternates: {
    canonical: "/calculators/overtime-calculator",
  },
};

const howItWorks = `
<p>The Overtime Calculator helps hourly and salaried workers determine how much extra they earn when working beyond the standard 40-hour workweek. Under the Fair Labor Standards Act (FLSA), most employees are entitled to overtime pay at a rate of at least 1.5 times their regular hourly rate for all hours worked over 40 in a workweek. This calculator provides a clear breakdown of regular pay, overtime pay, and your effective hourly rate.</p>

<h3>How Overtime Pay Is Calculated</h3>
<p>The fundamental overtime formula is straightforward: for each hour worked beyond 40 in a workweek, you earn your regular hourly rate multiplied by the overtime multiplier (typically 1.5x, commonly called "time and a half"). For example, if your regular rate is $25/hour and you work 50 hours, your first 40 hours are paid at $25/hour ($1,000), and the remaining 10 hours are paid at $37.50/hour ($375), for a total of $1,375.</p>

<p>If you are a salaried employee, the calculator first converts your annual salary to an hourly rate by dividing by 2,080 (40 hours per week times 52 weeks). This hourly equivalent is then used to calculate your overtime pay. Note that not all salaried employees are eligible for overtime; see the FAQ section for details on FLSA exemptions.</p>

<h3>Understanding the Effective Hourly Rate</h3>
<p>Your effective hourly rate is the total gross pay divided by the total hours worked. When you work overtime, your effective rate rises above your base rate because the overtime premium boosts your average earnings per hour. For example, working 50 hours at $25/hour with 1.5x overtime yields an effective rate of $27.50/hour, a 10% increase over your base rate. The more overtime hours you work, the higher your effective rate climbs, approaching the overtime rate as a limit.</p>

<h3>Weekly vs. Biweekly Pay Periods</h3>
<p>The calculator supports both weekly and biweekly pay periods. When biweekly is selected, the results assume the same hours pattern repeats in both weeks of the pay period. Note that under FLSA, overtime is calculated on a workweek basis, not a pay period basis. This means if you work 50 hours one week and 30 hours the next, you earn overtime for the first week even though your biweekly total is 80 hours (the same as two standard weeks).</p>

<h3>Double Time</h3>
<p>Some employers and certain state laws (notably California) require double-time pay (2x the regular rate) for hours worked beyond a certain threshold, such as more than 12 hours in a single day or more than 8 hours on the seventh consecutive workday. This calculator allows you to toggle between 1.5x and 2x overtime rates to see how double time affects your earnings.</p>

<h3>What This Calculator Does Not Include</h3>
<p>This calculator computes gross pay before taxes. Your actual take-home pay will be reduced by federal income tax, state income tax (if applicable), Social Security tax (6.2%), and Medicare tax (1.45%). Additional overtime income may push you into a higher tax bracket for the pay period, resulting in higher withholding. Use our Take-Home Pay Calculator for a more complete picture of your net earnings after all deductions.</p>
`;

const formula = `Regular Pay = min(Hours Worked, 40) x Regular Hourly Rate
Overtime Hours = max(Hours Worked - 40, 0)
Overtime Pay = Overtime Hours x Regular Hourly Rate x OT Multiplier
Total Gross Pay = Regular Pay + Overtime Pay
Effective Hourly Rate = Total Gross Pay / Hours Worked

For salaried workers:
  Regular Hourly Rate = Annual Salary / 2,080`;

const faqs = [
  {
    question: "Who is eligible for overtime pay?",
    answer:
      "Under the Fair Labor Standards Act (FLSA), most hourly employees are entitled to overtime pay at 1.5x their regular rate for hours worked over 40 per week. However, certain employees are exempt from overtime requirements, including executive, administrative, and professional employees who earn at least $684 per week ($35,568 annually) on a salary basis. As of 2024, the DOL has proposed raising this threshold to $1,128 per week ($58,656 annually). Other exempt categories include outside sales employees, computer professionals earning at least $27.63/hour, and certain seasonal workers.",
  },
  {
    question: "How is overtime calculated for salaried employees?",
    answer:
      "For non-exempt salaried employees, the regular hourly rate is calculated by dividing the annual salary by 2,080 (52 weeks x 40 hours). Overtime is then paid at 1.5x this hourly rate for all hours worked over 40 in a workweek. For example, a non-exempt employee earning $52,000/year has a regular rate of $25/hour and would earn $37.50/hour for overtime. Employers cannot avoid paying overtime simply by classifying workers as salaried; the duties test, not salary alone, determines exemption status.",
  },
  {
    question: "Does overtime apply per day or per week?",
    answer:
      "Under federal law (FLSA), overtime is calculated on a workweek basis only. There is no federal requirement for daily overtime. However, some states have additional overtime rules. California requires overtime (1.5x) for hours worked over 8 in a day and double time (2x) for hours over 12 in a day. Colorado requires overtime for hours over 12 per day or 40 per week. Alaska requires overtime for hours over 8 per day and 40 per week. Always check your state's specific overtime laws.",
  },
  {
    question: "Can my employer refuse to pay overtime?",
    answer:
      "If you are a non-exempt employee under the FLSA, your employer is legally required to pay overtime for hours worked over 40 per week, even if the overtime was not pre-authorized. While employers can discipline employees for working unauthorized overtime, they cannot refuse to pay for it. If your employer is not paying required overtime, you can file a complaint with the Department of Labor's Wage and Hour Division. Claims can be filed for up to 2 years of back pay (3 years for willful violations).",
  },
  {
    question: "Is overtime taxed at a higher rate?",
    answer:
      "Overtime earnings are not taxed at a special higher rate. However, they are added to your regular income and taxed at your marginal tax rate. Because overtime increases your total earnings for the pay period, your employer may withhold taxes at a higher rate on the paycheck, making it appear as if overtime is taxed more. In reality, the extra withholding is an estimate, and your actual tax rate is determined when you file your annual return. You may receive a refund if too much was withheld.",
  },
  {
    question: "What is the difference between time-and-a-half and double time?",
    answer:
      "Time-and-a-half (1.5x) is the minimum overtime rate required by the FLSA for hours over 40 per week. If your regular rate is $20/hour, time-and-a-half pays $30/hour. Double time (2x) pays twice the regular rate, so $40/hour in this example. Double time is not required by federal law but is mandated in some states (like California for hours over 12 in a day) and may be part of union contracts or company policies for holidays, weekends, or excessive hours.",
  },
];

const relatedCalculators = [
  {
    title: "Salary to Hourly",
    slug: "salary-to-hourly",
    description: "Convert your annual salary to an hourly equivalent rate.",
    icon: "⏰",
  },
  {
    title: "Take-Home Pay Calculator",
    slug: "take-home-pay-calculator",
    description: "See your actual paycheck after taxes and deductions.",
    icon: "💰",
  },
  {
    title: "Federal Tax Estimator",
    slug: "federal-tax-calculator",
    description: "Calculate your federal income tax and effective tax rate.",
    icon: "🏛️",
  },
  {
    title: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    description: "See how your savings grow with compound interest over time.",
    icon: "📈",
  },
];

const editorialContent = `
<h2>Making the Most of Your Overtime Earnings</h2>
<p>Overtime can significantly boost your income, but it is important to understand both the financial benefits and the practical considerations that come with working extra hours. A strategic approach to overtime can accelerate your financial goals while avoiding burnout.</p>

<h3>The Financial Impact of Consistent Overtime</h3>
<p>Working just 5 hours of overtime per week at a $25/hour rate with 1.5x overtime generates an additional $9,750 per year in gross income. That is the equivalent of a 19% raise over your base salary of $52,000. For workers with specific financial goals such as paying off debt, building an emergency fund, or saving for a down payment, strategic use of overtime can dramatically accelerate your timeline. However, remember that overtime income is subject to income taxes, so your net increase will be less than the gross amount.</p>

<h3>Tax Implications of Overtime</h3>
<p>While overtime is not taxed at a special rate, the additional income can have tax consequences. If your regular income puts you near a tax bracket boundary, overtime earnings may push some of your income into the next bracket. For most workers, this means the overtime is taxed at their marginal rate of 22% or 24% federally, plus state taxes. Despite this, overtime is always financially worthwhile. Even at a 30% combined tax rate, each $37.50 overtime hour (at $25 base with 1.5x) nets you approximately $26.25 after taxes.</p>

<h3>Strategies for Overtime Earners</h3>
<p>If you regularly earn overtime, consider adjusting your W-4 withholding to avoid a large tax bill or refund at year-end. Direct your overtime earnings to specific financial goals rather than absorbing them into your regular spending. Many financial advisors recommend the "pay yourself first" approach: automatically transfer overtime earnings to a savings or investment account before you have a chance to spend them. Consider maximizing your 401(k) contributions with overtime income to reduce your taxable income while building retirement wealth.</p>

<h3>Know Your Rights</h3>
<p>Understanding your overtime rights is crucial. The FLSA requires overtime pay for non-exempt employees, and many states have additional protections. If you believe your employer is misclassifying you as exempt to avoid paying overtime, consult with an employment attorney. Common misclassification issues include calling workers "managers" without giving them actual supervisory duties, paying a salary to hourly workers to avoid overtime tracking, or using independent contractor status for workers who should be classified as employees.</p>
`;

export default function OvertimeCalculatorPage() {
  return (
    <CalculatorLayout
      title="Overtime Calculator"
      description="Calculate your overtime pay, total gross earnings, and effective hourly rate with 1.5x or 2x overtime rates."
      slug="overtime-calculator"
      category={{ name: "Salary & Career", slug: "salary-and-career" }}
      ctaText="Track your overtime and manage payroll effortlessly"
      ctaHref="https://www.adp.com"
      ctaDescription="ADP helps businesses manage payroll, overtime tracking, and tax compliance all in one platform."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <OvertimeCalculatorWidget />
    </CalculatorLayout>
  );
}
