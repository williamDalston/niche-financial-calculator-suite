import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const GsPayCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.GsPayCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "GS Pay Calculator (2024 Pay Tables) | CalcEngine",
  description:
    "Calculate your federal GS pay with locality adjustments. See base pay, locality pay, biweekly, monthly, and hourly rates for all GS grades 1-15 and steps 1-10.",
  openGraph: {
    title: "GS Pay Calculator (2024 Pay Tables) | CalcEngine",
    description:
      "Calculate your federal GS pay with locality adjustments. See base pay, locality pay, biweekly, monthly, and hourly rates for all GS grades 1-15 and steps 1-10.",
    url: "https://calcengine.io/calculators/gs-pay-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "GS Pay Calculator (2024 Pay Tables) | CalcEngine",
    description:
      "Calculate your federal GS pay with locality adjustments. See base pay, locality pay, biweekly, monthly, and hourly rates for all GS grades 1-15 and steps 1-10.",
  },
  alternates: {
    canonical: "/calculators/gs-pay-calculator",
  },
};

const howItWorks = `
<p>The General Schedule (GS) pay system covers the majority of white-collar federal civilian employees in the United States. This calculator uses the official 2024 GS base pay table published by the U.S. Office of Personnel Management (OPM) to compute your total compensation, including locality pay adjustments for the top 20 metropolitan areas.</p>

<h3>Understanding the GS Pay Structure</h3>
<p>The GS pay scale is organized into 15 grades (GS-1 through GS-15), each with 10 within-grade steps. Your grade is determined by the complexity, responsibility, and qualifications required for your position. Your step reflects your tenure and performance within that grade. New employees typically start at Step 1, with step increases occurring on a set schedule: Steps 1-3 increase annually, Steps 4-6 increase every two years, and Steps 7-9 increase every three years.</p>

<p>The base pay table sets the nationwide floor for each grade and step combination. However, because the cost of living varies dramatically across the country, the federal government applies locality pay adjustments to ensure competitive compensation in higher-cost areas.</p>

<h3>How Locality Pay Works</h3>
<p>Locality pay is an additional percentage applied on top of your base pay, determined by your duty station's geographic area. The Federal Salary Council annually recommends locality pay rates based on Bureau of Labor Statistics survey data comparing federal and private-sector pay in each area. For 2024, locality rates range from 17.06% for the "Rest of US" (areas not covered by a specific locality) up to 46.91% in the San Francisco Bay Area.</p>

<p>Your total annual pay is calculated as: <strong>Base Pay x (1 + Locality Rate)</strong>. For example, a GS-12, Step 1 employee in Washington, DC earns a base pay of $74,441 plus a 33.94% locality adjustment of $25,263, for a total of $99,704 per year.</p>

<h3>Understanding Pay Periods</h3>
<p>Federal employees are paid biweekly (every two weeks), resulting in 26 pay periods per year. The biweekly gross pay is your annual salary divided by 26. The hourly rate is computed using OPM's standard 2,087 work hours per year (the average number of work hours in a year accounting for leap years over a 28-year cycle). Monthly pay is simply the annual salary divided by 12.</p>

<h3>Using This Calculator</h3>
<p>Select your GS grade, step, and locality pay area from the dropdowns. The calculator instantly shows your base pay, locality adjustment, total annual pay, and all derived pay period amounts. The bar chart visualizes all 10 steps for your selected grade, stacked to show the base pay and locality adjustment portions, so you can see how your pay will grow as you advance through the steps.</p>

<h3>Beyond Basic Pay</h3>
<p>Keep in mind that your total federal compensation includes more than just your GS salary. Federal employees receive generous benefits including the Federal Employees Health Benefits (FEHB) program, Federal Employees Retirement System (FERS) pension, Thrift Savings Plan (TSP) with up to 5% agency matching, life insurance (FEGLI), paid holidays (11 per year), and accrued annual and sick leave. These benefits are estimated to add 30-40% to the value of your base compensation package.</p>
`;

const formula = `Total Annual Pay = Base Pay x (1 + Locality Rate)

Biweekly Pay = Total Annual Pay / 26
Monthly Pay  = Total Annual Pay / 12
Hourly Rate  = Total Annual Pay / 2,087

Where:
  Base Pay     = GS base pay table value for selected grade and step
  Locality Rate = Percentage adjustment for duty station area
  2,087        = OPM standard work hours per year`;

const faqs = [
  {
    question: "How is my GS grade determined?",
    answer:
      "Your GS grade is determined by the position you hold, not by your personal qualifications alone. Each federal job is classified at a specific grade level based on the duties, responsibilities, and qualification requirements. Entry-level positions with a bachelor's degree typically start at GS-5 or GS-7, while positions requiring a master's degree or specialized experience may start at GS-9 or GS-11. Mid-career professional and supervisory positions are commonly GS-12 through GS-14, while senior technical and managerial positions are at GS-15.",
  },
  {
    question: "How do within-grade step increases work?",
    answer:
      "Within-grade step increases (WGIs) are periodic pay increases within your grade based on acceptable performance and time in step. The waiting periods are: Steps 1 to 2, 2 to 3, and 3 to 4 require 1 year each (52 weeks). Steps 4 to 5, 5 to 6, and 6 to 7 require 2 years each (104 weeks). Steps 7 to 8, 8 to 9, and 9 to 10 require 3 years each (156 weeks). It takes a total of 18 years to go from Step 1 to Step 10.",
  },
  {
    question: "What is the difference between a GS and a GG position?",
    answer:
      "GG positions use the same pay table as GS positions but are under a different pay authority, typically within the Department of Defense or intelligence agencies. The pay rates are identical, but GG employees may have different rules regarding pay setting, promotions, and locality pay. For practical purposes, a GG-12 earns the same as a GS-12 at the same step and locality.",
  },
  {
    question: "How does a promotion affect my pay?",
    answer:
      "When you are promoted to a higher grade, your pay is set using the two-step promotion rule. First, your current rate of basic pay is increased by two within-grade step amounts for your current grade. Then, you are placed at the lowest step in the new grade that equals or exceeds that amount. This ensures you receive at least a two-step equivalent increase with every promotion.",
  },
  {
    question: "What if my duty station is not in a specific locality area?",
    answer:
      "If your duty station is not within one of the designated locality pay areas, you fall under the 'Rest of United States' (RUS) locality pay rate. For 2024, this rate is 17.06%. The RUS rate applies to federal employees in smaller cities, rural areas, and any location not covered by a specific locality designation.",
  },
  {
    question: "Are federal employees eligible for overtime pay?",
    answer:
      "GS employees at GS-10 and below are generally eligible for overtime pay at 1.5 times their hourly rate. Employees at GS-11 and above may be classified as exempt from overtime under the Fair Labor Standards Act, but may still receive overtime under Title 5 provisions at a rate of 1.5 times their hourly rate or the GS-10, Step 1 hourly rate, whichever is greater. Specific eligibility depends on the nature of your duties and your agency's policies.",
  },
  {
    question: "How often are GS pay tables updated?",
    answer:
      "GS base pay tables are typically updated annually in January based on the Employment Cost Index (ECI) as mandated by the Federal Employees Pay Comparability Act. Locality pay rates are also adjusted annually based on recommendations from the Federal Salary Council. The President may propose alternative pay adjustments in the annual budget. Historically, annual adjustments have ranged from 0% (pay freezes during budget constraints) to 4-5% in periods of high inflation.",
  },
];

const relatedCalculators = [
  {
    title: "Military Pay Calculator",
    slug: "military-pay-calculator",
    description: "Calculate military base pay, BAH, and BAS allowances.",
    icon: "🎖️",
  },
  {
    title: "FERS Retirement Calculator",
    slug: "fers-retirement-calculator",
    description: "Estimate your federal pension under the FERS system.",
    icon: "🏛️",
  },
  {
    title: "TSP Calculator",
    slug: "tsp-calculator",
    description: "Project your Thrift Savings Plan balance at retirement.",
    icon: "📊",
  },
  {
    title: "Salary to Hourly Converter",
    slug: "salary-to-hourly",
    description: "Convert any annual salary to hourly, weekly, and biweekly rates.",
    icon: "⏰",
  },
];

const editorialContent = `
<h2>Understanding Federal GS Pay</h2>
<p>The General Schedule is the largest federal pay system, covering approximately 1.5 million employees across dozens of agencies. If you are considering a career in federal service, are a current federal employee evaluating your compensation, or are a human resources professional setting pay rates, understanding how the GS system works is essential.</p>

<h3>GS Pay Competitiveness</h3>
<p>Federal pay is often compared to private-sector compensation, and the picture is nuanced. According to the Federal Salary Council, federal employees earn an average of 22-27% less than their private-sector counterparts based on the Bureau of Labor Statistics pay surveys. However, when total compensation is considered — including the FERS pension, TSP matching, generous health benefits, job security, and paid leave — the gap narrows considerably. For many positions, especially at GS-12 and below, total federal compensation is competitive with or exceeds comparable private-sector packages.</p>

<h3>Career Progression Strategies</h3>
<p>The fastest way to increase your GS pay is through grade promotions, not step increases. Many career tracks have "ladder" positions (such as GS-5/7/9/11 or GS-9/11/12) where promotions occur annually with satisfactory performance. Once you reach the full performance level of your position, further advancement typically requires competing for higher-graded positions or moving into supervisory roles.</p>

<p>Geographic mobility can also significantly affect your compensation. A GS-13, Step 5 employee earns approximately $117,000 in the "Rest of US" locality area, but the same position in San Francisco pays over $147,000. If cost of living in the higher-locality area is manageable, the increased pay can substantially boost your savings and retirement contributions.</p>
`;

export default function GsPayCalculatorPage() {
  return (
    <CalculatorLayout
      title="GS Pay Calculator"
      description="Calculate your federal GS pay with locality adjustments for 2024. See base pay, locality pay, biweekly, monthly, and hourly rates for all grades and steps."
      slug="gs-pay-calculator"
      category={{ name: "Government Pay", slug: "government-pay" }}
      ctaText="Browse open GS positions near you"
      ctaHref="https://www.usajobs.gov"
      ctaDescription="Search thousands of federal job openings by location, grade, and agency on USAJobs."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <GsPayCalculatorWidget />
    </CalculatorLayout>
  );
}
