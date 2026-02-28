import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const MortgageCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.MortgageCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Mortgage Payment Calculator | CalcEngine",
  description:
    "Calculate your monthly mortgage payment, total interest, and amortization schedule. Free mortgage calculator with real-time results for home buyers.",
  openGraph: {
    title: "Mortgage Payment Calculator | CalcEngine",
    description:
      "Calculate your monthly mortgage payment, total interest, and amortization schedule. Free mortgage calculator with real-time results for home buyers.",
    url: "https://calcengine.org/calculators/mortgage-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mortgage Payment Calculator | CalcEngine",
    description:
      "Calculate your monthly mortgage payment, total interest, and amortization schedule. Free mortgage calculator with real-time results for home buyers.",
  },
  alternates: {
    canonical: "/calculators/mortgage-calculator",
  },
};

const howItWorks = `
<p>A mortgage payment calculator helps you estimate your monthly payment when taking out a home loan. It uses the standard amortization formula used by virtually every lender in the United States to compute fixed-rate mortgage payments.</p>

<h3>Understanding the Calculation</h3>
<p>Your monthly mortgage payment is determined by three key factors: the loan amount (home price minus your down payment), the interest rate, and the loan term. The calculator uses the standard annuity formula to compute a fixed monthly payment that, over the life of the loan, will pay off both the principal and all accrued interest.</p>

<p>Each monthly payment is split between principal repayment and interest charges. In the early years of a mortgage, the majority of your payment goes toward interest. As you pay down the principal, a larger share of each payment goes toward reducing the remaining balance. This is called amortization.</p>

<h3>How to Use This Calculator</h3>
<p>Enter your home price, down payment amount (either as a dollar amount or a percentage of the home price), the annual interest rate offered by your lender, and select your desired loan term. The calculator instantly computes your monthly payment, total interest over the life of the loan, and the total cost of the home including interest.</p>

<p>The pie chart breaks down how much of your total payments go toward principal versus interest, giving you a clear picture of the true cost of borrowing. Use this information to compare different loan scenarios, such as putting more money down to reduce total interest, or choosing a 15-year term instead of 30 years to save significantly on interest charges.</p>

<h3>What Is Not Included</h3>
<p>This calculator computes principal and interest (P&I) only. Your actual monthly housing payment may also include property taxes, homeowner's insurance (often bundled into an escrow payment), private mortgage insurance (PMI) if your down payment is less than 20%, and HOA fees if applicable. These additional costs can add several hundred dollars per month to your total housing expense, so be sure to account for them in your budget planning.</p>

<h3>Tips for Getting the Best Rate</h3>
<p>A lower interest rate can save you tens of thousands of dollars over the life of your loan. To secure the best rate: maintain a credit score above 740, save at least 20% for a down payment to avoid PMI, shop multiple lenders and compare Loan Estimates, and consider paying discount points upfront to buy down your rate. Even a 0.25% difference in rate on a $400,000 loan can mean over $20,000 in savings over 30 years.</p>
`;

const formula = `Monthly Payment (M) = P [ r(1+r)^n ] / [ (1+r)^n - 1 ]

Where:
  P = Loan principal (home price - down payment)
  r = Monthly interest rate (annual rate / 12)
  n = Total number of payments (loan term in years x 12)

Total Interest = (M x n) - P
Total Cost = M x n`;

const faqs = [
  {
    question: "How much house can I afford on my salary?",
    answer:
      "A common guideline is that your monthly housing payment (including taxes and insurance) should not exceed 28% of your gross monthly income. For example, if you earn $80,000 per year ($6,667/month), your housing payment should stay below roughly $1,867. However, lenders also look at your total debt-to-income ratio, which should generally be below 36-43%.",
  },
  {
    question: "Should I choose a 15-year or 30-year mortgage?",
    answer:
      "A 15-year mortgage has higher monthly payments but a lower interest rate and dramatically less total interest paid. A 30-year mortgage offers lower monthly payments and more cash flow flexibility. For example, on a $300,000 loan at 7%, a 30-year mortgage costs about $1,996/month with $418,527 total interest, while a 15-year mortgage costs about $2,696/month with only $185,267 total interest — saving over $233,000.",
  },
  {
    question: "What is PMI and when can I remove it?",
    answer:
      "Private Mortgage Insurance (PMI) is required when your down payment is less than 20% of the home's value. PMI typically costs 0.5% to 1% of the loan amount annually. You can request PMI removal once your loan-to-value ratio reaches 80%, and your lender must automatically cancel it at 78% LTV.",
  },
  {
    question: "How does my credit score affect my mortgage rate?",
    answer:
      "Your credit score is one of the biggest factors in determining your mortgage rate. Borrowers with scores above 760 typically qualify for the best rates, while scores below 620 may require FHA or other government-backed loans. A difference of 100 points in credit score can mean a rate difference of 0.5-1.0%, which translates to tens of thousands of dollars over the life of the loan.",
  },
  {
    question: "What are closing costs and how much should I budget?",
    answer:
      "Closing costs are fees charged by lenders, title companies, appraisers, and other parties involved in the home purchase. They typically range from 2% to 5% of the loan amount. On a $400,000 home, expect closing costs between $8,000 and $20,000. Some common closing costs include origination fees, appraisal fees, title insurance, and prepaid taxes and insurance.",
  },
  {
    question: "Is it better to make a larger down payment?",
    answer:
      "A larger down payment reduces your loan amount, which means lower monthly payments and less total interest. Putting down 20% or more also eliminates PMI. However, depleting your savings for a down payment can be risky. Financial advisors generally recommend keeping 3-6 months of living expenses in an emergency fund after closing.",
  },
  {
    question: "What is an amortization schedule?",
    answer:
      "An amortization schedule is a table showing every monthly payment over the life of the loan, broken down into principal and interest components. Early in the loan, most of each payment goes toward interest. Over time, the interest portion decreases and the principal portion increases. This schedule helps you see exactly when you will reach key milestones like 20% equity (for PMI removal) or full payoff.",
  },
];

const relatedCalculators = [
  {
    title: "Home Affordability Calculator",
    slug: "home-affordability-calculator",
    description: "Find out how much house you can afford based on your income and debts.",
    icon: "🏠",
  },
  {
    title: "Auto Loan Calculator",
    slug: "auto-loan-calculator",
    description: "Calculate monthly car payments and total loan costs.",
    icon: "🚗",
  },
  {
    title: "Loan Calculator",
    slug: "loan-calculator",
    description: "Compute payments for any fixed-rate loan amount and term.",
    icon: "💳",
  },
  {
    title: "Rent vs Buy Calculator",
    slug: "rent-vs-buy-calculator",
    description: "Compare the costs of renting versus buying a home.",
    icon: "🏘️",
  },
];

const editorialContent = `
<h2>Understanding Your Mortgage: A Complete Guide</h2>
<p>Buying a home is the largest financial decision most people ever make. Understanding how your mortgage payment is calculated empowers you to shop smarter, negotiate better terms, and potentially save hundreds of thousands of dollars over the life of your loan.</p>

<h3>The True Cost of Homeownership</h3>
<p>When most people think about buying a home, they focus on the purchase price. But the true cost of homeownership extends far beyond the sticker price. On a typical 30-year mortgage, you may pay nearly as much in interest as the original loan amount. For example, a $350,000 loan at 7% interest will cost approximately $488,000 in interest alone over 30 years, bringing the total cost to over $838,000.</p>

<p>Beyond principal and interest, homeowners pay property taxes (typically 1-2% of home value annually), homeowner's insurance ($1,000-$3,000/year), maintenance and repairs (budget 1% of home value annually), and potentially HOA fees ($200-$500/month in many communities).</p>

<h3>Strategies to Pay Off Your Mortgage Faster</h3>
<p>One of the most effective strategies is making one extra payment per year. By paying biweekly instead of monthly (26 half-payments instead of 12 full payments), you effectively make 13 monthly payments per year. On a $300,000 loan at 7%, this can shave nearly 5 years off your mortgage and save over $80,000 in interest.</p>

<p>Another strategy is rounding up your payments. If your monthly payment is $1,996, rounding up to $2,100 each month directs an extra $104 toward principal. Over time, these small additions compound and can save you years of payments.</p>
`;

export default function MortgageCalculatorPage() {
  return (
    <CalculatorLayout
      title="Mortgage Payment Calculator"
      description="Calculate your monthly mortgage payment, total interest paid, and see a breakdown of principal vs. interest over the life of your loan."
      slug="mortgage-calculator"
      category={{ name: "Mortgage & Housing", slug: "mortgage-and-housing" }}
      ctaText="Compare rates from top lenders — check your rate in 2 minutes"
      ctaHref="https://www.lendingtree.com"
      ctaDescription="See personalized rates from multiple lenders with no impact to your credit score."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <MortgageCalculatorWidget />
    </CalculatorLayout>
  );
}
