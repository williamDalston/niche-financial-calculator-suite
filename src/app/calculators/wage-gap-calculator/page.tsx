import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const WageGapCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.WageGapCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Wage Gap Calculator | CalcEngine",
  description:
    "Analyze the gender wage gap for your occupation, experience level, and location. See median salary comparisons, adjusted gap data, and the lifetime cost of pay inequity.",
  openGraph: {
    title: "Wage Gap Calculator | CalcEngine",
    description:
      "Analyze the gender wage gap for your occupation, experience level, and location. See median salary comparisons, adjusted gap data, and the lifetime cost of pay inequity.",
    url: "https://calcengine.io/calculators/wage-gap-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wage Gap Calculator | CalcEngine",
    description:
      "Analyze the gender wage gap for your occupation, experience level, and location. See median salary comparisons, adjusted gap data, and the lifetime cost of pay inequity.",
  },
  alternates: {
    canonical: "/calculators/wage-gap-calculator",
  },
};

const howItWorks = `
<p>The wage gap calculator uses Bureau of Labor Statistics data to estimate the gender pay gap for your specific occupation, experience level, education, and geographic region. Rather than relying on the single headline statistic (women earn 83 cents for every dollar men earn), this tool provides a more nuanced, adjusted view of the pay gap that accounts for the factors that influence compensation.</p>

<h3>Understanding the Data</h3>
<p>The foundation of this calculator is median salary data for 20 major occupation categories, broken down by gender. These figures come from the BLS Current Population Survey annual averages, which represent the most comprehensive national data on earnings by gender and occupation. The medians — not averages — are used because medians are less skewed by extremely high or low earners and better represent the typical worker's experience.</p>

<h3>How the Adjusted Calculation Works</h3>
<p>The calculator starts with the gender-specific median salary for your selected occupation. It then applies three adjustment factors to better match your individual circumstances. First, an education multiplier adjusts the median based on your highest level of education — workers with advanced degrees earn significantly more than those with only a high school diploma, regardless of gender. Second, an experience multiplier accounts for years in the workforce — entry-level workers earn less than senior professionals. Third, a state/regional adjustment accounts for cost-of-living differences between high-cost states like California and New York versus lower-cost states like Mississippi and Arkansas.</p>

<p>The resulting estimated medians provide a more personalized comparison than the raw national statistics. They estimate what the typical man and woman in your specific situation would earn.</p>

<h3>Adjusted vs. Unadjusted Gap</h3>
<p>The unadjusted wage gap (approximately 17%) compares overall median earnings for all women versus all men across all occupations. This headline number is influenced by many factors: occupational segregation (women are overrepresented in lower-paying fields), differences in hours worked, career interruptions for caregiving, and discrimination. The adjusted gap — typically 5-8% — attempts to compare men and women in similar roles with similar qualifications. Both perspectives are valuable: the unadjusted gap reflects systemic inequities in career access and advancement, while the adjusted gap isolates the direct pay difference for comparable work.</p>

<h3>Lifetime Cost Calculation</h3>
<p>Even a seemingly small annual gap compounds dramatically over a career. The calculator projects the cumulative cost of the gap over 10, 20, and 30 years, applying a 3% annual growth rate to account for raises and career progression. A $5,000 annual gap, compounded at 3% over 30 years, results in over $237,000 in lost earnings — and that does not account for the reduced retirement savings, Social Security benefits, and investment returns that result from lower lifetime earnings.</p>

<h3>How to Use This Tool</h3>
<p>Enter your annual salary, gender, occupation, years of experience, education level, and state. The calculator shows the estimated median for your demographic group, the corresponding median for the other gender, the dollar and percentage gap, where your salary falls relative to the median, and the projected career cost. Use the comparison bar chart to visualize the median difference and the line chart to see how the earnings gap widens over a career due to compounding.</p>
`;

const faqs = [
  {
    question: "What is the current gender wage gap in the United States?",
    answer:
      "As of 2024, women earn approximately 83.2 cents for every dollar men earn when comparing median annual earnings for full-time, year-round workers. This translates to an annual gap of about $10,000 in median earnings. The gap is wider for women of color: Black women earn about 70 cents, and Latina women earn about 65 cents for every dollar earned by white, non-Hispanic men.",
  },
  {
    question: "What causes the wage gap?",
    answer:
      "The wage gap is caused by a combination of factors: occupational segregation (women are concentrated in lower-paying fields), differences in work hours (women are more likely to work part-time), career interruptions for caregiving, underrepresentation in senior leadership, unconscious bias in hiring and promotion, and direct pay discrimination. Studies consistently find that even after controlling for occupation, experience, education, and hours, a gap of approximately 5-8% remains unexplained, suggesting discrimination plays a role.",
  },
  {
    question: "What is the difference between the adjusted and unadjusted wage gap?",
    answer:
      "The unadjusted (raw) gap compares overall median earnings for all men and women regardless of occupation, hours, or experience — currently about 17%. The adjusted (controlled) gap compares men and women in similar roles with similar qualifications and tenure — typically 5-8%. The unadjusted gap captures systemic inequities like occupational segregation and barriers to advancement, while the adjusted gap isolates potential direct discrimination in pay for the same work.",
  },
  {
    question: "How can I negotiate to close the pay gap at my workplace?",
    answer:
      "Start by researching market rates for your role using BLS data, Glassdoor, PayScale, and professional association surveys. Document your accomplishments with quantifiable metrics. Initiate the salary conversation during performance reviews or after a significant achievement. Practice your negotiation pitch and be specific about the number you are requesting. If your employer cannot match your salary target, negotiate for total compensation: bonuses, equity, additional PTO, professional development funding, or an accelerated review timeline.",
  },
  {
    question: "Is the wage gap getting better or worse?",
    answer:
      "The wage gap has narrowed significantly since the 1960s (when women earned about 59 cents per dollar) but progress has stalled since 2005. At the current rate of change, researchers estimate the gap will not close until approximately 2059. Progress has been uneven: the gap is narrower for younger women (under 30) and wider for women over 45, suggesting that motherhood penalties and mid-career barriers play significant roles in widening the gap over time.",
  },
  {
    question: "How does the wage gap affect retirement savings?",
    answer:
      "The wage gap has a devastating compounding effect on retirement. Women earn less, so they contribute less to 401(k)s and IRAs. Lower lifetime earnings also mean lower Social Security benefits (which are based on your highest 35 years of earnings). The National Institute on Retirement Security estimates that women have only 70% of the retirement savings that men have. A woman who earns $10,000 less per year than a male peer and invests 10% of salary over 30 years at 7% returns would have approximately $250,000 less in retirement savings.",
  },
];

const relatedCalculators = [
  {
    title: "Salary to Hourly Calculator",
    slug: "salary-to-hourly",
    description:
      "Convert your annual salary to an hourly rate to compare compensation accurately.",
    icon: "💵",
  },
  {
    title: "Raise Calculator",
    slug: "raise-calculator",
    description:
      "Calculate the impact of a salary raise on your annual and per-paycheck income.",
    icon: "📈",
  },
  {
    title: "Net Worth Calculator",
    slug: "net-worth-calculator",
    description:
      "Track your total assets minus liabilities to measure financial progress.",
    icon: "💰",
  },
  {
    title: "Cost of Living Calculator",
    slug: "cost-of-living-calculator",
    description:
      "Compare the cost of living between cities when evaluating salary offers.",
    icon: "🏙️",
  },
];

const editorialContent = `
<h2>Understanding Pay Equity: Context and Action</h2>
<p>The gender wage gap is one of the most discussed and debated economic statistics in the United States. Understanding its nuances — what it measures, what it does not, and what you can do about it — is essential for anyone who wants to ensure they are being paid fairly for their work.</p>

<h3>The Motherhood Penalty</h3>
<p>Research consistently identifies the "motherhood penalty" as one of the largest contributors to the wage gap. A landmark study by sociologist Michelle Budig found that women's earnings decrease by approximately 4% per child, while men's earnings actually increase by about 6% when they become fathers (the "fatherhood bonus"). This penalty manifests through career interruptions for childcare, reduced work hours, employer assumptions about commitment and availability, and fewer opportunities for high-visibility assignments and promotions. Countries with robust parental leave and childcare policies — like Sweden and Norway — have significantly smaller wage gaps.</p>

<h3>Occupational Segregation</h3>
<p>About half of the raw wage gap is attributable to occupational segregation — the fact that women are overrepresented in lower-paying fields (education, social work, healthcare support) and underrepresented in higher-paying ones (engineering, computer science, finance). However, this is not simply a matter of personal choice. Research shows that when women enter a field in large numbers, pay in that field tends to decline over time, suggesting that the work itself is valued less when it is perceived as "women's work." Conversely, fields that have historically been female-dominated (like computer programming in its early decades) saw pay increases as they became male-dominated.</p>

<h3>What You Can Do</h3>
<p>On an individual level, salary transparency is your most powerful tool. Research market rates exhaustively before any salary negotiation. Share salary information with trusted colleagues — pay secrecy disproportionately benefits employers and disadvantages women and minorities. If you discover a significant disparity, document it and raise the issue with HR or management. At the organizational level, advocate for pay audits, transparent salary bands, standardized promotion criteria, and blind resume reviews. These structural changes have been shown to be far more effective at closing gaps than individual negotiation alone.</p>
`;

export default function WageGapCalculatorPage() {
  return (
    <CalculatorLayout
      title="Wage Gap Calculator"
      description="Analyze the gender wage gap for your occupation, experience level, and location. See median salary comparisons, adjusted gap data, and the lifetime cost of pay inequity."
      slug="wage-gap-calculator"
      category={{ name: "Salary & Career", slug: "salary-and-career" }}
      ctaText="Negotiate your worth — free salary comparison tools"
      ctaHref="https://www.payscale.com/research/US/Country=United_States/Salary"
      ctaDescription="Get a free personalized salary report based on your title, skills, experience, and location."
      howItWorks={howItWorks}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <WageGapCalculatorWidget />
    </CalculatorLayout>
  );
}
