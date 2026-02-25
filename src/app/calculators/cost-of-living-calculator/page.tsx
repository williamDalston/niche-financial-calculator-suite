import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const CostOfLivingCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.CostOfLivingCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Cost of Living Comparison Calculator | CalcEngine",
  description:
    "Compare the cost of living between 30 major US cities. Find out what salary you need to maintain your standard of living when relocating.",
  openGraph: {
    title: "Cost of Living Comparison Calculator | CalcEngine",
    description:
      "Compare the cost of living between 30 major US cities. Find out what salary you need to maintain your standard of living when relocating.",
    url: "https://calcengine.io/calculators/cost-of-living-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cost of Living Comparison Calculator | CalcEngine",
    description:
      "Compare the cost of living between 30 major US cities. Find out what salary you need to maintain your standard of living when relocating.",
  },
  alternates: {
    canonical: "/calculators/cost-of-living-calculator",
  },
};

const howItWorks = `
<p>The cost of living comparison calculator helps you understand how far your salary will stretch in a different city. Whether you are considering a job offer in a new metro area, planning a relocation, or simply curious about relative living costs across the United States, this tool translates abstract index numbers into a concrete dollar amount you can use to make informed decisions.</p>

<h3>How Cost of Living Indices Work</h3>
<p>Cost of living is measured using a composite index where 100 represents the national average. A city with an index of 150 is 50% more expensive than average, while a city at 80 is 20% cheaper. The indices in this calculator are derived from data across five major spending categories: housing, grocery, transportation, healthcare, and utilities. Housing typically has the largest impact on overall cost of living because it represents the single biggest expense for most households.</p>

<p>Each category is weighted according to its share of typical household spending. Housing costs, including rent and home prices, dominate the calculation because they vary the most between cities. A city like San Francisco (housing index 290) costs nearly three times the national average for housing alone, which is the primary driver of its high overall index despite relatively normal costs in other categories.</p>

<h3>The Equivalent Salary Calculation</h3>
<p>The core calculation is straightforward: your equivalent salary in the target city equals your current salary multiplied by the ratio of the target city's overall cost of living index to your current city's index. For example, if you earn $75,000 in Chicago (index 116) and are considering a move to San Francisco (index 179), you would need approximately $75,000 x (179/116) = $115,733 to maintain the same standard of living.</p>

<p>This does not mean you cannot live on less — it means that to have the same purchasing power for housing, food, transportation, healthcare, and utilities, you would need that equivalent salary. Many people successfully relocate to higher-cost areas on lower salaries by making lifestyle adjustments such as choosing a smaller apartment, using public transit, or living in a more affordable neighborhood.</p>

<h3>Understanding the Category Breakdown</h3>
<p>The category-by-category comparison is just as important as the overall number. You might find that a city has a high overall cost of living driven primarily by housing, while grocery, transportation, and healthcare costs are actually reasonable. This breakdown helps you identify which specific expenses will change the most and plan your budget accordingly.</p>

<p>For example, moving from Houston (overall 101) to Seattle (overall 149) represents a 48% overall increase, but the breakdown reveals that housing costs roughly double (96 to 210) while utilities actually decrease (108 to 88). This kind of detail helps you budget more accurately than a single overall number.</p>

<h3>Limitations to Keep in Mind</h3>
<p>Cost of living indices are averages for entire metropolitan areas and do not capture neighborhood-level variation. Living in downtown Manhattan versus the outer boroughs of New York can mean dramatically different housing costs while technically being in the same metro area. Additionally, these indices do not account for state income taxes (which vary from 0% in Texas and Florida to over 13% in California), property taxes, or differences in lifestyle expectations between cities.</p>
`;

const formula = `Equivalent Salary = Current Salary x (Target City Index / Current City Index)

Salary Difference = Equivalent Salary - Current Salary
Percent Difference = ((Target Index - Current Index) / Current Index) x 100

Index baseline: 100 = US national average`;

const faqs = [
  {
    question: "What does a cost of living index of 100 mean?",
    answer:
      "An index value of 100 represents the national average cost of living in the United States. A value above 100 means the city is more expensive than average (e.g., 150 = 50% above average), while below 100 means it is cheaper (e.g., 85 = 15% below average). Each subcategory (housing, grocery, etc.) uses the same 100 = average baseline, so you can directly compare individual categories across cities.",
  },
  {
    question: "Why is housing the biggest factor in cost of living differences?",
    answer:
      "Housing is the single largest household expense, typically accounting for 30-40% of a family's budget. It is also the category with the widest variation between cities. While groceries might vary by 10-20% between the cheapest and most expensive cities, housing costs can vary by 300% or more. A median home in San Francisco costs over $1.3 million, while the same in Indianapolis might cost $250,000. This enormous spread makes housing the dominant driver of cost of living differences.",
  },
  {
    question: "Does this calculator account for state income taxes?",
    answer:
      "No, this calculator focuses on the cost of goods and services, not taxes. State income tax rates vary dramatically — from 0% in states like Texas, Florida, Washington, and Tennessee to over 13% at the top bracket in California. When comparing job offers between states, you should also use a take-home pay calculator to see how state taxes affect your actual paycheck. The combination of cost of living and tax impact gives you the full picture.",
  },
  {
    question: "How accurate are cost of living comparisons?",
    answer:
      "Cost of living indices provide a reasonable approximation for comparing metro areas, but they are averages that do not capture individual circumstances. Your personal cost of living depends on your housing choices, commuting habits, healthcare needs, and lifestyle preferences. Someone who rents a modest apartment, walks to work, and cooks at home will experience a very different cost of living than someone with a large mortgage, two car payments, and frequent dining out — even in the same city.",
  },
  {
    question: "Should I negotiate a higher salary when moving to a more expensive city?",
    answer:
      "Absolutely. When considering a job offer in a city with a higher cost of living, use this calculator to determine what salary you need to maintain your current standard of living. Present this data during salary negotiations. Many employers, especially large companies, have established geographic pay differentials and expect candidates to negotiate based on local cost of living. However, keep in mind that some cost increases (like housing) may be partially offset by other factors, such as better public transit reducing car expenses.",
  },
  {
    question: "What is the cheapest major city to live in the US?",
    answer:
      "Among major US metro areas, cities in the Midwest and South tend to have the lowest cost of living. Indianapolis, San Antonio, Kansas City, Detroit, and Columbus consistently rank among the most affordable large cities, with overall indices well below the national average. These cities offer substantially cheaper housing costs while maintaining competitive job markets in industries like healthcare, technology, and finance.",
  },
  {
    question: "How often do cost of living indices change?",
    answer:
      "Cost of living indices are updated regularly based on price surveys, with most major data sources publishing quarterly or annual updates. However, the relative rankings between cities tend to remain fairly stable over time — San Francisco and New York have consistently been among the most expensive US cities for decades. Significant changes can occur during housing booms or busts, or when a city experiences rapid growth (as Austin and Denver have in recent years).",
  },
];

const relatedCalculators = [
  {
    title: "Salary to Hourly Converter",
    slug: "salary-to-hourly",
    description: "Convert your annual salary to hourly, weekly, and monthly rates.",
    icon: "⏰",
  },
  {
    title: "Take-Home Pay Calculator",
    slug: "take-home-pay-calculator",
    description: "See your actual paycheck after federal and state taxes.",
    icon: "💵",
  },
  {
    title: "Rent vs Buy Calculator",
    slug: "rent-vs-buy-calculator",
    description: "Determine whether renting or buying is better in your city.",
    icon: "🏠",
  },
  {
    title: "Inflation Calculator",
    slug: "inflation-calculator",
    description: "See how inflation has affected the buying power of your money.",
    icon: "📈",
  },
];

const editorialContent = `
<h2>Making Sense of Cost of Living Data</h2>
<p>Relocating to a new city is one of the most significant financial decisions you can make. Beyond the headline salary number, understanding how far your money will actually go in a new location is critical for maintaining your quality of life and meeting your financial goals.</p>

<h3>The Remote Work Factor</h3>
<p>The rise of remote work has fundamentally changed the cost of living equation. Previously, you had to live where the jobs were — often in expensive coastal cities. Now, many workers can earn a big-city salary while living in a lower-cost area. However, some employers are adjusting pay based on employee location, which makes understanding cost of living differentials even more important. If your employer offers geographic pay adjustments, use this calculator to evaluate whether a lower salary in a cheaper area still comes out ahead.</p>

<h3>Beyond the Numbers: Quality of Life</h3>
<p>Cost of living is only one dimension of the relocation equation. Climate, proximity to family, cultural amenities, outdoor recreation, school quality, crime rates, commute times, and career growth opportunities all factor into the decision. A city with a lower cost of living index might not have the industries, networking opportunities, or lifestyle you need to thrive professionally and personally.</p>

<p>Similarly, a city with a high cost of living often offers advantages that justify the premium: broader career opportunities, higher earning potential over time, diverse cultural experiences, and access to world-class healthcare and education. The key is finding the balance between financial sustainability and the lifestyle that makes you happy.</p>

<h3>Planning Your Relocation Budget</h3>
<p>When planning a move, go beyond the equivalent salary calculation. Research actual rental prices in the neighborhoods you are considering, check local utility rates, and price out your typical grocery basket at stores in the area. Factor in moving costs (typically $2,000-$10,000 depending on distance), potential changes to your commuting costs, and any state tax differences. Building a detailed budget based on real local prices will give you a much more accurate picture than index numbers alone.</p>
`;

export default function CostOfLivingCalculatorPage() {
  return (
    <CalculatorLayout
      title="Cost of Living Comparison Calculator"
      description="Compare the cost of living between 30 major US cities and find out what salary you need to maintain your standard of living when relocating."
      slug="cost-of-living-calculator"
      category={{ name: "Salary & Career", slug: "salary-and-career" }}
      ctaText="Find jobs in your target city"
      ctaHref="https://www.indeed.com"
      ctaDescription="Browse thousands of job listings by city and salary range."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <CostOfLivingCalculatorWidget />
    </CalculatorLayout>
  );
}
