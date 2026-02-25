import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const FreelanceRateCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.FreelanceRateCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Freelance Rate Calculator | CalcEngine",
  description:
    "Calculate your ideal freelance hourly rate based on your target income, expenses, taxes, and desired profit margin. Free rate calculator with project-based pricing suggestions.",
  openGraph: {
    title: "Freelance Rate Calculator | CalcEngine",
    description:
      "Calculate your ideal freelance hourly rate based on your target income, expenses, taxes, and desired profit margin. Free rate calculator with project-based pricing suggestions.",
    url: "https://calcengine.io/calculators/freelance-rate-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance Rate Calculator | CalcEngine",
    description:
      "Calculate your ideal freelance hourly rate based on your target income, expenses, taxes, and desired profit margin. Free rate calculator with project-based pricing suggestions.",
  },
  alternates: {
    canonical: "/calculators/freelance-rate-calculator",
  },
};

const howItWorks = `
<p>Setting the right freelance rate is one of the most critical decisions for any independent professional. Charge too little and you will struggle to cover your expenses and build savings. Charge too much without justification and you will lose clients to competitors. This calculator works backward from your desired take-home income, factoring in all the hidden costs of self-employment that salaried workers never have to think about, to arrive at the minimum and recommended hourly rates you should charge.</p>

<h3>Why Freelancers Must Charge More Than Employees</h3>
<p>When you are an employee, your employer pays half of your Social Security and Medicare taxes (7.65%), provides health insurance, contributes to your retirement plan, pays for your workspace, software, and equipment, and covers you during paid vacation, sick days, and holidays. As a freelancer, you pay for all of this yourself. The self-employment tax alone (15.3% covering both the employer and employee portions of Social Security and Medicare) represents a significant cost that must be built into your rate. When you add health insurance, retirement savings, business expenses, and unpaid time off, a freelancer typically needs to charge 40-60% more per hour than the equivalent employee hourly rate.</p>

<h3>How the Calculator Works</h3>
<p>The calculator starts with your target annual take-home income and adds your total annual business costs (business expenses, health insurance, and retirement savings, each multiplied by 12). It then adds self-employment taxes on the gross amount. This gives you the total revenue you need to generate. Dividing that by your total billable hours per year (billable hours per week times weeks worked minus vacation weeks) produces your minimum hourly rate. Applying your desired profit margin on top produces the recommended rate, which provides a buffer for unbillable work, client acquisition time, and income variability.</p>

<h3>Understanding Billable Hours</h3>
<p>A crucial concept for freelancers is the difference between working hours and billable hours. Most freelancers can only bill 60-75% of their working time. The rest goes to administrative tasks, marketing, invoicing, client communication, professional development, and finding new clients. If you work 40 hours per week, 25-30 billable hours is realistic. Overestimating your billable hours is the most common mistake new freelancers make, leading to rates that are too low to sustain their business.</p>

<h3>Using Project-Based Pricing</h3>
<p>While hourly rates are useful as a baseline, many experienced freelancers transition to project-based or value-based pricing. The project rate suggestions in this calculator provide a starting point by multiplying your hourly rate by the estimated hours for common project lengths. In practice, you should quote projects based on the value delivered to the client rather than just hours worked. A one-page landing page that generates $50,000 in revenue for a client is worth more than the 10 hours it took to build, regardless of your hourly rate.</p>
`;

const formula = `Total Revenue Needed = Target Income + Annual Costs + Self-Employment Tax

Minimum Hourly Rate = Total Revenue Needed / Total Billable Hours

Recommended Rate = Minimum Rate x (1 + Profit Margin %)

Total Billable Hours = Billable Hours/Week x (Weeks Worked - Vacation Weeks)

Annual Costs = (Business Expenses + Health Insurance + Retirement) x 12

Self-Employment Tax = (Target Income + Annual Costs) x SE Tax Rate`;

const faqs = [
  {
    question: "How do I determine my billable hours per week?",
    answer:
      "Track your time for 2-4 weeks to see how many hours you actually spend on client work versus admin, marketing, and other non-billable tasks. Most freelancers find they can bill 25-30 hours per week even when working 40+ hours. New freelancers should start conservatively at 20-25 billable hours since they spend more time on client acquisition. As you build a stable client base, billable hours may increase to 30-35 per week.",
  },
  {
    question: "What is the self-employment tax and how is it calculated?",
    answer:
      "Self-employment tax covers Social Security (12.4%) and Medicare (2.9%) taxes, totaling 15.3% on the first $168,600 of net self-employment income (2024 threshold). As an employee, your employer pays half and you pay half. As a freelancer, you pay both halves. However, you can deduct the employer-equivalent portion (7.65%) from your adjusted gross income when filing taxes. You also pay regular federal and state income taxes on top of self-employment tax.",
  },
  {
    question: "Should I charge hourly or per project?",
    answer:
      "Both have advantages. Hourly pricing is simpler and protects you when project scope changes, but it punishes efficiency — the faster you work, the less you earn. Project-based pricing rewards expertise and efficiency, and clients prefer it because they know the total cost upfront. Many freelancers use hourly rates for ongoing work and retainers, and project rates for defined deliverables. Use your hourly rate as a baseline to estimate project costs, then adjust based on the value you are delivering.",
  },
  {
    question: "How much should I budget for business expenses?",
    answer:
      "Common freelance expenses include: software subscriptions ($100-$500/month), coworking space or home office costs ($0-$500/month), internet and phone ($100-$200/month), accounting and legal services ($100-$300/month), marketing and website hosting ($50-$200/month), and professional development ($50-$200/month). Total monthly expenses of $400-$1,500 are typical for most freelancers, depending on your field and whether you need specialized software or equipment.",
  },
  {
    question: "How do I handle vacations and sick days as a freelancer?",
    answer:
      "Unlike employees, freelancers have no paid time off. You must build vacation and sick time into your rate. The calculator accounts for vacation weeks by reducing your billable weeks, which increases your hourly rate to compensate. Plan for at least 2-4 weeks of vacation and 1-2 weeks of potential sick time annually. Some freelancers set aside a 'PTO fund' by saving 5-10% of each invoice specifically for time when they are not earning.",
  },
  {
    question: "When should I raise my rates?",
    answer:
      "Consider raising rates when: (1) you are consistently booked at capacity with no availability for new clients, (2) your skills and portfolio have improved significantly, (3) your expenses have increased (especially health insurance and taxes), (4) you have not raised rates in over a year, or (5) clients are accepting your proposals too quickly (suggesting you are underpriced). A common approach is to raise rates 5-15% annually, applying new rates to new clients first and then existing clients at contract renewal.",
  },
];

const relatedCalculators = [
  {
    title: "Salary to Hourly Calculator",
    slug: "salary-to-hourly",
    description: "Convert an annual salary to see the equivalent hourly rate.",
    icon: "💵",
  },
  {
    title: "Federal Tax Calculator",
    slug: "federal-tax-calculator",
    description: "Estimate your federal income tax as a self-employed professional.",
    icon: "🏛️",
  },
  {
    title: "Net Worth Calculator",
    slug: "net-worth-calculator",
    description: "Track your total financial picture as your freelance business grows.",
    icon: "📊",
  },
  {
    title: "Overtime Calculator",
    slug: "overtime-calculator",
    description: "Compare freelance earnings to overtime pay in traditional employment.",
    icon: "⏰",
  },
];

const editorialContent = `
<h2>The Freelance Economy: Pricing Yourself for Success</h2>
<p>The freelance workforce has exploded in recent years, with over 64 million Americans doing some form of freelance work. Yet many freelancers struggle financially because they price their services like employees rather than business owners. Understanding the true cost of independence is the foundation of building a sustainable freelance career.</p>

<h3>The Hidden Cost of Independence</h3>
<p>When you compare a $50/hour freelance rate to a $50/hour employee wage, they are not equivalent. The employee's total compensation includes employer-paid taxes ($3.83/hour), health insurance ($3-$6/hour), retirement contributions ($1.50-$3/hour), paid time off ($3.85/hour for 4 weeks), and other benefits. This means a $50/hour employee costs their employer $62-$67/hour in total compensation. A freelancer charging $50/hour and covering these costs themselves effectively earns $33-$38/hour in equivalent employee pay. This is why the general rule of thumb is that freelance rates should be at least 50% higher than the equivalent employee rate.</p>

<h3>Value-Based Pricing: The Advanced Approach</h3>
<p>Once you have established a baseline hourly rate, consider moving toward value-based pricing for project work. If a client's project will generate $100,000 in revenue, pricing it at $10,000 (10% of value created) is justifiable even if it only takes you 40 hours — that is $250/hour, but the client still gets a 10x return. Value-based pricing requires understanding your client's business, quantifying the impact of your work, and communicating that value effectively. It rewards expertise and results rather than time spent.</p>

<h3>Building Financial Stability</h3>
<p>Income variability is the biggest challenge for freelancers. Build stability by maintaining an emergency fund of 6-12 months of expenses (more than the 3-6 months recommended for employees), diversifying your client base so no single client represents more than 30-40% of your income, and creating recurring revenue through retainer agreements. Many successful freelancers also maintain a mix of project work and retainers — retainers provide baseline income predictability while projects offer higher per-hour earnings.</p>
`;

export default function FreelanceRateCalculatorPage() {
  return (
    <CalculatorLayout
      title="Freelance Rate Calculator"
      description="Calculate your ideal freelance hourly rate based on your target income, expenses, taxes, and desired profit margin. See project-based pricing suggestions."
      slug="freelance-rate-calculator"
      category={{ name: "Salary & Career", slug: "salary-and-career" }}
      ctaText="Find freelance clients on Upwork — sign up free"
      ctaHref="https://www.upwork.com"
      ctaDescription="Join millions of freelancers on the world's largest freelance marketplace and find high-quality clients."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <FreelanceRateCalculatorWidget />
    </CalculatorLayout>
  );
}
