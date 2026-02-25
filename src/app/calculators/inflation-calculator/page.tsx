import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const InflationCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.InflationCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Inflation Calculator | CalcEngine",
  description:
    "Calculate the impact of inflation on your money from 1920 to 2024. See how purchasing power changes over time using real CPI data from the Bureau of Labor Statistics.",
  openGraph: {
    title: "Inflation Calculator | CalcEngine",
    description:
      "Calculate the impact of inflation on your money from 1920 to 2024. See how purchasing power changes over time using real CPI data from the Bureau of Labor Statistics.",
    url: "https://calcengine.io/calculators/inflation-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inflation Calculator | CalcEngine",
    description:
      "Calculate the impact of inflation on your money from 1920 to 2024. See how purchasing power changes over time using real CPI data from the Bureau of Labor Statistics.",
  },
  alternates: {
    canonical: "/calculators/inflation-calculator",
  },
};

const howItWorks = `
<p>The inflation calculator uses historical Consumer Price Index (CPI) data from the U.S. Bureau of Labor Statistics to show you exactly how the purchasing power of money has changed over time. You can use it to answer questions like "What would $100 in 1970 be worth today?" or "How much has my salary kept up with inflation?"</p>

<h3>What Is the Consumer Price Index?</h3>
<p>The CPI (specifically the CPI-U, or Consumer Price Index for All Urban Consumers) is the most widely used measure of inflation in the United States. It tracks the average change in prices paid by urban consumers for a market basket of goods and services, including food, housing, apparel, transportation, medical care, recreation, education, and communication. The BLS surveys prices for about 80,000 items in 75 urban areas each month to compute the CPI.</p>

<p>The CPI uses a reference period of 1982-84 = 100. This means a CPI value of 314 (approximately the 2024 value) indicates that prices have roughly tripled since the early 1980s. The percentage change in CPI between any two periods represents the inflation rate for that time span.</p>

<h3>How the Calculation Works</h3>
<p>To calculate the inflation-adjusted value of a dollar amount, the calculator divides the CPI of the end year by the CPI of the start year and multiplies by the original amount. For example, to find what $1,000 in the year 2000 (CPI: 172.2) is equivalent to in 2024 (CPI: 314.2): $1,000 x (314.2 / 172.2) = $1,824.62. This means you would need $1,824.62 in 2024 to have the same purchasing power as $1,000 in 2000.</p>

<p>The cumulative inflation rate is the total percentage increase in prices over the period. The average annual inflation rate is computed using the compound annual growth rate formula, which accounts for the compounding effect of inflation year over year. The buying power change shows how much less your original amount can purchase in today's dollars.</p>

<h3>Custom Inflation Rate</h3>
<p>If you want to project future values or model hypothetical scenarios, toggle on the custom inflation rate option. This uses a constant annual rate you specify instead of historical CPI data. This is useful for financial planning — for example, projecting how much $50,000 in savings will be worth in 20 years assuming 3% annual inflation (answer: the purchasing power drops to about the equivalent of $27,684 in today's dollars).</p>

<h3>Reading the Chart</h3>
<p>The line chart shows how the nominal value of your specified amount changes over the selected period. Starting from your original amount in the start year, the line rises to show how much money you would need in each subsequent year to match the purchasing power of the original amount. A steeper line indicates faster inflation. You can observe periods of high inflation (like the 1970s-early 1980s) as particularly steep sections of the curve.</p>

<h3>Historical Context</h3>
<p>This calculator covers over a century of US price history, including the deflation of the early 1920s and 1930s, the wartime inflation of the 1940s, the relative stability of the 1950s-1960s, the Great Inflation of the 1970s, the long period of moderate inflation from 1983-2020, and the post-pandemic inflation surge of 2021-2023. Understanding these patterns helps put current inflation in historical perspective.</p>
`;

const formula = `Adjusted Amount = Original Amount x (CPI_end / CPI_start)

Cumulative Inflation Rate = ((CPI_end - CPI_start) / CPI_start) x 100

Average Annual Rate = ((CPI_end / CPI_start)^(1/years) - 1) x 100

Buying Power Change = ((Original - Adjusted) / Adjusted) x 100

Where:
  CPI_start = Consumer Price Index for the start year
  CPI_end   = Consumer Price Index for the end year
  years     = Number of years between start and end`;

const faqs = [
  {
    question: "What is inflation and why does it matter?",
    answer:
      "Inflation is the general increase in the price of goods and services over time, which reduces the purchasing power of money. If inflation averages 3% per year, something that costs $100 today will cost $103 next year and $134 in 10 years. Inflation matters because it erodes the value of savings, affects retirement planning, influences interest rates, and determines whether wage increases represent real gains in living standards or merely keep pace with rising prices.",
  },
  {
    question: "What is the average historical inflation rate in the US?",
    answer:
      "The long-term average annual inflation rate in the United States since 1920 has been approximately 3.0-3.2%. However, this average masks significant variation: inflation was negative during the Great Depression (prices fell), peaked at nearly 14% in 1980, and averaged just 1.7% during the 2010s. The Federal Reserve's current target inflation rate is 2% per year, which it considers healthy for economic growth.",
  },
  {
    question: "How does inflation affect my savings?",
    answer:
      "If your savings earn a lower interest rate than the inflation rate, you are losing purchasing power over time — even though the nominal dollar amount in your account grows. For example, if your savings account earns 0.5% APY while inflation runs at 3%, you are effectively losing 2.5% of your purchasing power each year. Over 20 years, $10,000 in savings at 0.5% grows to about $11,049, but you would need $18,061 to have the same purchasing power as the original $10,000. This is why financial advisors recommend investing long-term savings in assets that historically outpace inflation, such as stocks, real estate, or inflation-protected securities (TIPS).",
  },
  {
    question: "What caused the high inflation in 2021-2023?",
    answer:
      "The post-pandemic inflation surge was driven by a combination of factors: massive government stimulus spending, near-zero interest rates, supply chain disruptions caused by COVID-19 lockdowns and shipping bottlenecks, labor shortages driving up wages, and increased energy and food prices partly due to the Russia-Ukraine conflict. CPI inflation peaked at 9.1% in June 2022, the highest since 1981, before gradually declining as the Federal Reserve aggressively raised interest rates.",
  },
  {
    question: "What is the difference between CPI and PCE inflation?",
    answer:
      "The CPI (Consumer Price Index) and PCE (Personal Consumption Expenditures) are both measures of inflation but use different methodologies. The CPI measures out-of-pocket spending by urban consumers, while the PCE covers all consumption including employer-paid health insurance and is weighted differently. The PCE tends to run 0.2-0.5% lower than CPI. The Federal Reserve uses PCE as its preferred inflation measure for policy decisions, while CPI is more commonly used for adjusting Social Security benefits, tax brackets, and TIPS.",
  },
  {
    question: "Can prices actually decrease (deflation)?",
    answer:
      "Yes, deflation — a sustained decrease in the general price level — has occurred in US history, most notably during the Great Depression (1929-1933) when prices fell by about 25%. Brief deflationary episodes also occurred in 2009 during the Great Recession. While lower prices might sound appealing, sustained deflation is generally harmful to the economy because it increases the real value of debt, discourages spending (why buy today if it will be cheaper tomorrow?), and can lead to a downward spiral of reduced production and employment.",
  },
  {
    question: "How can I protect my money from inflation?",
    answer:
      "Several strategies can help protect against inflation: invest in assets with returns that historically exceed inflation (stocks have returned ~10% annually, real estate ~8-10%); consider Treasury Inflation-Protected Securities (TIPS) which adjust with CPI; invest in I-Bonds which offer a fixed rate plus an inflation adjustment; maintain skills and earning power to negotiate salary increases that match or exceed inflation; and avoid holding excessive cash in low-yield savings accounts for long periods.",
  },
];

const relatedCalculators = [
  {
    title: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    description: "See how your investments grow with compound interest over time.",
    icon: "📈",
  },
  {
    title: "Retirement Calculator",
    slug: "retirement-calculator",
    description: "Plan how much you need to save for a comfortable retirement.",
    icon: "🏖️",
  },
  {
    title: "Net Worth Calculator",
    slug: "net-worth-calculator",
    description: "Calculate your total net worth across all assets and liabilities.",
    icon: "💰",
  },
  {
    title: "Cost of Living Calculator",
    slug: "cost-of-living-calculator",
    description: "Compare the cost of living between 30 major US cities.",
    icon: "🏙️",
  },
];

const editorialContent = `
<h2>Inflation and Your Financial Future</h2>
<p>Inflation is often called the "silent tax" because it gradually erodes the purchasing power of your money without any visible transaction. Understanding inflation is not just an academic exercise — it has profound implications for your savings strategy, retirement planning, salary negotiations, and investment decisions.</p>

<h3>The Rule of 72</h3>
<p>A quick way to estimate how long it takes for prices to double is the Rule of 72: divide 72 by the annual inflation rate. At 3% inflation, prices double roughly every 24 years. At 7% inflation (as experienced in the 1970s), prices double in just over 10 years. This means a retiree who stops working at 65 with a fixed income should expect their cost of living to roughly double by age 89 at historical average inflation rates.</p>

<h3>Salary and Inflation</h3>
<p>When your employer gives you a 3% annual raise, you may feel like you are getting ahead — but if inflation is also 3%, your real purchasing power has not changed at all. To actually improve your standard of living, your salary increases need to exceed the inflation rate. This is why understanding the difference between nominal wage growth (the raw percentage increase) and real wage growth (the increase after accounting for inflation) is so important for evaluating your financial progress over time.</p>

<h3>Inflation and Debt</h3>
<p>Interestingly, moderate inflation can actually benefit borrowers with fixed-rate debt. If you have a 30-year fixed-rate mortgage, inflation means you are repaying the loan with dollars that are worth less than when you borrowed them. Your fixed monthly payment becomes easier to afford as your income (presumably) rises with inflation, while the payment stays the same. This is one reason why fixed-rate debt is generally preferred over variable-rate debt in an inflationary environment.</p>

<h3>Planning for the Future</h3>
<p>Financial planners typically assume 2-3% annual inflation when projecting future needs. If you want to retire with the equivalent of $50,000 in today's purchasing power and retirement is 30 years away, you will need about $121,000 in nominal terms at 3% inflation. Use this calculator with the custom rate option to model different inflation scenarios and ensure your savings and investment plan accounts for the inevitable erosion of purchasing power over time.</p>
`;

export default function InflationCalculatorPage() {
  return (
    <CalculatorLayout
      title="Inflation Calculator"
      description="Calculate how inflation has affected the purchasing power of your money from 1920 to 2024 using real CPI data from the Bureau of Labor Statistics."
      slug="inflation-calculator"
      category={{ name: "Retirement & Investing", slug: "retirement-and-investing" }}
      ctaText="Protect your savings from inflation — start investing today"
      ctaHref="https://www.fidelity.com"
      ctaDescription="Open a free investment account and put your money to work against inflation."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <InflationCalculatorWidget />
    </CalculatorLayout>
  );
}
