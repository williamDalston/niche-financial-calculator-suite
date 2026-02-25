import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const TipCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.TipCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Tip Calculator | CalcEngine",
  description:
    "Calculate the tip amount, total bill, and per-person split for any restaurant or service bill. Quick, simple, and free tip calculator.",
  openGraph: {
    title: "Tip Calculator | CalcEngine",
    description:
      "Calculate the tip amount, total bill, and per-person split for any restaurant or service bill. Quick, simple, and free tip calculator.",
    url: "https://calcengine.io/calculators/tip-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tip Calculator | CalcEngine",
    description:
      "Calculate the tip amount, total bill, and per-person split for any restaurant or service bill. Quick, simple, and free tip calculator.",
  },
  alternates: {
    canonical: "/calculators/tip-calculator",
  },
};

const howItWorks = `
<p>A tip calculator quickly determines how much to tip on a restaurant bill or service charge, splits the total among multiple people, and compares tip amounts across different percentages. It eliminates the mental math at the end of a meal so you can focus on enjoying the experience rather than fumbling with numbers.</p>

<h3>How the Calculation Works</h3>
<p>The core calculation is simple: Tip Amount = Bill Amount multiplied by Tip Percentage divided by 100. If your bill is $85 and you want to leave a 20% tip, the tip is $85 times 0.20 equals $17.00, for a total bill of $102.00. When splitting among multiple people, both the tip and total are divided equally by the number of people.</p>

<h3>Preset and Custom Tip Percentages</h3>
<p>The calculator offers one-tap preset buttons for the most common tip percentages: 15%, 18%, 20%, 22%, and 25%. If you prefer a different amount, the custom option lets you enter any percentage. The bar chart and comparison table instantly show how different tip percentages affect the total, helping you make a quick, informed decision.</p>

<h3>Round Up Feature</h3>
<p>The round-up toggle automatically rounds your total bill up to the nearest whole dollar. This is a popular convenience feature — it makes the final number cleaner and usually adds only a few cents to your tip. For example, if the total with tip comes to $102.47, rounding up makes it $103.00, increasing the tip by $0.53.</p>

<h3>Pre-Tax Tipping</h3>
<p>There is an ongoing debate about whether you should tip on the pre-tax or post-tax amount. Technically, tipping on the pre-tax amount is correct since the tax goes to the government, not the server. However, many people tip on the total for simplicity. If you prefer to tip on the pre-tax amount, enable the pre-tax toggle and enter the tax amount shown on your bill. The calculator will compute the tip based on the bill minus tax, then add it to the full bill for the total.</p>

<h3>Splitting the Bill</h3>
<p>When dining with a group, the calculator evenly divides the total bill (food plus tip) among all diners. Simply adjust the number of people using the plus and minus buttons or type in the number directly. The per-person total and per-person tip are displayed separately, so everyone knows exactly what they owe.</p>

<h3>The Comparison Table</h3>
<p>The comparison table at the bottom shows tip amounts, totals, and per-person costs at seven common tip percentages (10% through 30%). Your selected percentage is highlighted in green for easy reference. This table is especially useful when you are unsure what percentage to leave — you can quickly see the dollar difference between, say, an 18% and 22% tip and decide what feels right for the level of service you received.</p>
`;

const faqs = [
  {
    question: "How much should I tip at a restaurant?",
    answer:
      "In the United States, 15-20% is considered standard for sit-down restaurant service. 15% is acceptable for average service, 18-20% for good service, and 22-25% or more for exceptional service. For counter service or takeout, tipping is optional but 10-15% is common if you choose to tip. At a bar, $1-2 per drink or 15-20% of the tab is customary.",
  },
  {
    question: "Should I tip on the pre-tax or post-tax amount?",
    answer:
      "Etiquette experts say it is technically correct to tip on the pre-tax amount since the tax is paid to the government. However, most people tip on the post-tax total for simplicity, and the difference is usually small. On a $100 bill with 8% tax, the difference between tipping 20% on $100 versus $108 is only $1.60.",
  },
  {
    question: "How much should I tip for delivery?",
    answer:
      "For food delivery, 15-20% of the order total is standard, with a minimum of $3-5 for small orders. If the weather is bad, the distance is long, or the order is large/heavy, consider tipping on the higher end. For grocery delivery, 10-20% is typical, with a $5 minimum. Always tip in the app or in cash — delivery drivers rely heavily on tips.",
  },
  {
    question: "Is it rude not to tip?",
    answer:
      "In the United States, not tipping at a sit-down restaurant is considered very rude and disrespectful. Servers in most states earn a reduced minimum wage ($2.13/hour federally) with the expectation that tips will bring their earnings up to a livable level. Not tipping effectively means the server worked your table for almost nothing. If service was truly terrible, speak with a manager rather than withholding the tip entirely.",
  },
  {
    question: "How do I split the bill fairly when people ordered different amounts?",
    answer:
      "The simplest approach is to have each person calculate their own items plus a proportional share of the tip. However, this can get complicated. Many groups simply split evenly, which tends to average out over time. If one person ordered significantly more (like an expensive bottle of wine), they should offer to pay their fair share. Some restaurants will split checks by seat if asked.",
  },
];

const relatedCalculators = [
  {
    title: "Salary to Hourly Calculator",
    slug: "salary-to-hourly",
    description:
      "Convert annual salary to hourly rate to understand your wage.",
    icon: "💵",
  },
  {
    title: "Hourly to Annual Calculator",
    slug: "hourly-to-salary",
    description:
      "Convert hourly pay to annual salary with this simple calculator.",
    icon: "📅",
  },
  {
    title: "Cost of Living Calculator",
    slug: "cost-of-living-calculator",
    description:
      "Compare the cost of living between different cities and states.",
    icon: "🏙️",
  },
];

const editorialContent = `
<h2>The Complete Guide to Tipping in America</h2>
<p>Tipping culture in the United States is unlike most other countries. While tipping is optional in much of Europe and Asia, it is an essential part of the compensation system for service workers in America. Understanding tipping norms helps you navigate social situations with confidence and ensures the people serving you are fairly compensated.</p>

<h3>Standard Tipping Percentages by Service</h3>
<p>For sit-down restaurants, 15-20% is the baseline, with 20% increasingly becoming the new standard in many areas. For hair salons and barbershops, 15-20% of the service cost is typical. Taxi and rideshare drivers generally receive 15-20%. Hotel housekeeping should receive $2-5 per night, left daily rather than at checkout. Valets typically receive $2-5 when your car is returned. Movers usually receive $20-50 per mover for a full-day move. For a coffee shop tip jar, $0.50-$1 per drink is generous but not expected.</p>

<h3>When Tipping Is Not Expected</h3>
<p>You are not expected to tip at fast-food restaurants, retail stores, gas stations, or doctor's offices. Despite the proliferation of tip screens on point-of-sale terminals at these locations, there is no social obligation to tip for counter service where no table service is provided. Similarly, you do not need to tip the owner of a business (such as a salon owner who cuts your hair), though this tradition has relaxed in recent years and many owners now accept tips.</p>

<h3>The Math Behind Tipping</h3>
<p>If you prefer to calculate tips mentally, here is a quick trick: to find 20%, simply move the decimal point one place to the left and double the result. For an $85 bill: $8.50 doubled is $17.00 — a perfect 20% tip. For 15%, find 10% (move the decimal) and add half of that amount. These mental shortcuts make tipping easy even without a calculator, though having one handy certainly takes the guesswork out of splitting among a group.</p>
`;

export default function TipCalculatorPage() {
  return (
    <CalculatorLayout
      title="Tip Calculator"
      description="Calculate the tip amount, total bill, and per-person split for any restaurant or service bill. Quick, simple, and free tip calculator."
      slug="tip-calculator"
      category={{ name: "Salary & Career", slug: "salary-and-career" }}
      howItWorks={howItWorks}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <TipCalculatorWidget />
    </CalculatorLayout>
  );
}
