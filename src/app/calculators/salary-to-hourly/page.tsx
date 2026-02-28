import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const SalaryToHourlyWidget = dynamic(() => import("./calculator").then((m) => m.SalaryToHourlyWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Salary to Hourly Converter | CalcEngine",
  description:
    "Convert your annual salary to an hourly rate, daily, weekly, biweekly, and monthly pay. Free salary converter with real-time results.",
  openGraph: {
    title: "Salary to Hourly Converter | CalcEngine",
    description:
      "Convert your annual salary to an hourly rate, daily, weekly, biweekly, and monthly pay. Free salary converter with real-time results.",
    url: "https://calcengine.org/calculators/salary-to-hourly",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salary to Hourly Converter | CalcEngine",
    description:
      "Convert your annual salary to an hourly rate, daily, weekly, biweekly, and monthly pay. Free salary converter with real-time results.",
  },
  alternates: {
    canonical: "/calculators/salary-to-hourly",
  },
};

const howItWorks = `
<p>The salary to hourly converter breaks down your annual compensation into different pay period amounts, making it easy to understand what your salary translates to on an hourly, daily, weekly, biweekly, and monthly basis.</p>

<h3>The Basic Conversion</h3>
<p>The fundamental calculation divides your annual salary by the total number of working hours in a year. For a standard full-time position, this is typically 40 hours per week multiplied by 52 weeks per year, giving you 2,080 working hours. If you earn $60,000 per year, your hourly rate would be $60,000 / 2,080 = $28.85 per hour.</p>

<h3>Understanding Different Pay Periods</h3>
<p>Employers pay on various schedules, and understanding each helps you budget effectively. Weekly pay divides your annual salary by 52 weeks. Biweekly pay (every two weeks) divides by 26 pay periods — this is the most common pay schedule in the US. Semi-monthly pay (twice per month) divides by 24 pay periods. Monthly pay divides by 12 months.</p>

<p>Note that biweekly and semi-monthly are not the same: biweekly results in 26 paychecks per year (and two months with three paychecks), while semi-monthly results in exactly 24 paychecks per year. This distinction matters for budgeting.</p>

<h3>Customizing Your Calculation</h3>
<p>Not everyone works a standard 40-hour week or 52 weeks per year. If you work part-time (say 30 hours per week), adjust the hours accordingly. If you have unpaid time off, reduce the weeks per year. For example, a teacher who works 40 weeks per year at 40 hours per week has only 1,600 working hours — making their effective hourly rate higher than someone working year-round at the same salary.</p>

<h3>Why This Matters</h3>
<p>Understanding your true hourly rate helps you make informed decisions about job offers, overtime opportunities, and freelance work. When comparing a salaried position at $65,000/year with a contract role paying $35/hour, you need to factor in that the salaried position includes benefits (health insurance, retirement contributions, paid time off) worth roughly 20-30% of salary. The contract role at $35/hour ($72,800/year) might seem higher, but after accounting for self-employment taxes, benefits costs, and unpaid time off, the effective compensation could be similar or even lower.</p>

<p>This calculator also helps freelancers and consultants set their rates. If you want to match a $80,000 salary with benefits, you might need to charge $50-60/hour as a contractor to account for self-employment taxes (15.3%), health insurance ($400-$800/month), and no paid time off.</p>
`;

const formula = `Hourly Rate = Annual Salary / (Hours per Week x Weeks per Year)

Daily Rate = Hourly Rate x Hours per Day
Weekly Rate = Annual Salary / Weeks per Year
Biweekly Rate = Annual Salary / 26
Monthly Rate = Annual Salary / 12`;

const faqs = [
  {
    question: "How many work hours are in a year?",
    answer:
      "A standard full-time work year has 2,080 hours (40 hours/week x 52 weeks). However, accounting for federal holidays (typically 11 days), the actual number of working hours is closer to 1,992. If you also subtract two weeks of paid vacation, you get about 1,920 actual working hours.",
  },
  {
    question: "How do I compare a salary offer to an hourly rate offer?",
    answer:
      "To compare fairly, convert both to the same basis. Convert the salary to an hourly rate using this calculator, then add the value of benefits (typically 20-30% of salary for full-time positions). For hourly/contract roles, remember to subtract self-employment taxes (15.3%), health insurance costs, retirement savings, and unpaid time off to get a comparable figure.",
  },
  {
    question: "Does this calculator account for taxes?",
    answer:
      "No, this calculator shows gross (pre-tax) amounts. Your take-home pay will be lower after federal income tax, state income tax, Social Security (6.2%), and Medicare (1.45%) are deducted. Use our Take-Home Pay Calculator for after-tax estimates.",
  },
  {
    question: "What is a good hourly rate?",
    answer:
      "This depends heavily on location, industry, and experience level. The federal minimum wage is $7.25/hour, but many states and cities have higher minimums. The median hourly wage in the US is approximately $23/hour. Skilled professionals in tech, finance, and healthcare often earn $40-$100+/hour.",
  },
  {
    question: "How do I calculate my rate if I work overtime?",
    answer:
      "Under the Fair Labor Standards Act (FLSA), non-exempt employees must be paid 1.5x their regular rate for hours worked beyond 40 per week. If your regular rate is $25/hour, overtime hours pay $37.50/hour. Note that salaried employees classified as exempt are generally not entitled to overtime pay.",
  },
  {
    question: "What is the difference between biweekly and semi-monthly pay?",
    answer:
      "Biweekly pay occurs every two weeks (26 paychecks per year), while semi-monthly pay occurs twice per month on set dates, like the 1st and 15th (24 paychecks per year). Biweekly paychecks are slightly smaller but you get two extra paychecks per year. The annual total is the same.",
  },
  {
    question: "Should I negotiate salary or hourly rate?",
    answer:
      "If you are a full-time employee, negotiate in annual salary terms as this is the standard. For contract or freelance work, negotiate an hourly or project rate. Always factor in the total compensation package including benefits, bonuses, equity, retirement matching, and paid time off — not just the base number.",
  },
];

const relatedCalculators = [
  {
    title: "Hourly to Salary Calculator",
    slug: "hourly-to-salary",
    description: "Convert your hourly wage to annual, monthly, and weekly earnings.",
    icon: "⏰",
  },
  {
    title: "Take-Home Pay Calculator",
    slug: "take-home-pay-calculator",
    description: "See your actual paycheck after all taxes and deductions.",
    icon: "💵",
  },
  {
    title: "Overtime Calculator",
    slug: "overtime-calculator",
    description: "Calculate your overtime pay at 1.5x and 2x rates.",
    icon: "⏱️",
  },
  {
    title: "Raise Calculator",
    slug: "raise-calculator",
    description: "See how a pay raise affects your hourly and annual earnings.",
    icon: "📈",
  },
];

const editorialContent = `
<h2>Making Sense of Your Salary</h2>
<p>Whether you are evaluating a new job offer, negotiating a raise, or considering freelance work, understanding the relationship between annual salary and hourly pay is essential for making informed career decisions.</p>

<h3>The Hidden Value of Benefits</h3>
<p>When comparing job offers, the salary number is just the starting point. Full-time positions typically include benefits worth 20-30% of your base salary. Health insurance alone can be worth $6,000-$20,000 annually for family coverage. Add in retirement matching (3-6% of salary), paid time off (worth roughly 4-8% of salary), and other perks like life insurance, disability coverage, and professional development budgets.</p>

<p>For example, a position offering $75,000 with full benefits might be worth $95,000-$97,500 in total compensation. A contractor earning $45/hour ($93,600/year) with no benefits would need to pay for health insurance, self-employment taxes, and save for their own retirement — potentially netting less than the salaried employee.</p>

<h3>Cost of Living Adjustments</h3>
<p>A $70,000 salary in Austin, Texas has very different purchasing power than $70,000 in San Francisco or New York City. The cost of living can vary by 50% or more between major metro areas. When evaluating job offers in different cities, consider using a cost of living calculator alongside this salary converter to understand your real purchasing power.</p>
`;

export default function SalaryToHourlyPage() {
  return (
    <CalculatorLayout
      title="Salary to Hourly Converter"
      description="Convert your annual salary to an hourly rate and see your earnings broken down by pay period — daily, weekly, biweekly, and monthly."
      slug="salary-to-hourly"
      category={{ name: "Salary & Career", slug: "salary-and-career" }}
      ctaText="Find jobs matching your target salary"
      ctaHref="https://www.indeed.com"
      ctaDescription="Browse thousands of job listings filtered by salary range in your area."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <SalaryToHourlyWidget />
    </CalculatorLayout>
  );
}
