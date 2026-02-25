import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const HomeAffordabilityCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.HomeAffordabilityCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Home Affordability Calculator | CalcEngine",
  description:
    "Find out how much house you can afford based on your income, debts, down payment, and interest rate. Free home affordability calculator with real-time results.",
  openGraph: {
    title: "Home Affordability Calculator | CalcEngine",
    description:
      "Find out how much house you can afford based on your income, debts, down payment, and interest rate. Free home affordability calculator with real-time results.",
    url: "https://calcengine.io/calculators/home-affordability-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Affordability Calculator | CalcEngine",
    description:
      "Find out how much house you can afford based on your income, debts, down payment, and interest rate. Free home affordability calculator with real-time results.",
  },
  alternates: {
    canonical: "/calculators/home-affordability-calculator",
  },
};

const howItWorks = `
<p>A home affordability calculator helps you determine the maximum home price you can comfortably purchase based on your financial situation. Lenders use your debt-to-income (DTI) ratio as the primary measure of what you can afford, and this calculator mirrors that same approach to give you a realistic picture of your buying power.</p>

<h3>How the Calculation Works</h3>
<p>The calculator starts with your gross monthly income and applies your chosen maximum debt-to-income ratio (typically 36% for conventional loans, though some lenders allow up to 43% or even 50% for FHA and VA loans). This gives your maximum total monthly debt payment. After subtracting your existing monthly debts (car payment, student loans, credit cards, and other obligations), the remaining amount is available for housing costs.</p>

<p>Your total housing payment includes principal and interest on the mortgage, property taxes, homeowner's insurance, private mortgage insurance (PMI) if your down payment is less than 20%, and any HOA fees. The calculator works backward from your maximum housing payment to determine the highest home price you can afford by accounting for each of these costs as a function of the home price or loan amount.</p>

<h3>Understanding Debt-to-Income Ratios</h3>
<p>Lenders typically use two DTI ratios. The front-end ratio (or housing ratio) looks at housing costs alone and should generally stay below 28%. The back-end ratio (used by this calculator) considers all debts and is usually capped at 36% for the best rates, though many programs allow higher ratios. A lower DTI ratio not only increases your chances of loan approval but may also qualify you for better interest rates.</p>

<h3>The Role of Down Payment</h3>
<p>Your down payment directly affects how much home you can afford. A larger down payment means a smaller loan, which reduces your monthly payment and may eliminate PMI. If your down payment is less than 20% of the home price, lenders typically require PMI, which adds 0.3% to 1.5% of the loan amount per year to your monthly costs. This calculator automatically factors PMI in when applicable.</p>

<h3>Beyond the Numbers</h3>
<p>While this calculator shows you the maximum price a lender might approve, financial experts recommend keeping your total housing costs (including taxes, insurance, and maintenance) to no more than 25-30% of your take-home pay. Remember to budget for closing costs (2-5% of the home price), moving expenses, furniture, and an emergency fund of at least 3-6 months of expenses. Buying less house than you can qualify for gives you more financial flexibility and a greater cushion for unexpected expenses.</p>
`;

const formula = `Maximum Monthly Housing Payment = (Gross Monthly Income x Max DTI%) - Existing Monthly Debts

Maximum Home Price is derived from:
  Housing Payment = P&I + Property Tax + Insurance + PMI + HOA

Where P&I = Loan Amount x [ r(1+r)^n ] / [ (1+r)^n - 1 ]
  Loan Amount = Home Price - Down Payment
  Property Tax = Home Price x Tax Rate / 12
  PMI = Loan Amount x PMI Rate / 12 (if down payment < 20%)`;

const faqs = [
  {
    question: "What debt-to-income ratio do lenders actually use?",
    answer:
      "Most conventional lenders cap your total DTI at 36% to 43%. FHA loans allow up to 43% (sometimes 50% with compensating factors). VA loans have no official DTI cap but most lenders prefer 41% or less. For the best interest rates and terms, aim for a back-end DTI below 36%. The front-end ratio (housing costs only) should ideally stay below 28%.",
  },
  {
    question: "How much should I put down on a house?",
    answer:
      "Putting 20% down eliminates PMI and gives you instant equity, but it is not always necessary. FHA loans require as little as 3.5% down, and some conventional programs allow 3%. VA and USDA loans offer 0% down options. However, a smaller down payment means higher monthly payments, more total interest, and the added cost of PMI. Balance your down payment against maintaining a healthy emergency fund.",
  },
  {
    question: "Does this calculator include all my housing costs?",
    answer:
      "This calculator includes principal, interest, property taxes, homeowner's insurance, PMI (if applicable), and HOA fees. However, actual homeownership costs also include maintenance and repairs (budget 1-2% of home value annually), utilities, and potential special assessments. These additional costs are not included in the calculation but should be part of your overall budget.",
  },
  {
    question: "Why does the calculator show a lower amount than I expected?",
    answer:
      "Several factors can reduce your affordability: existing debts consume part of your DTI allowance, property taxes and insurance are higher in some areas, PMI adds cost if your down payment is below 20%, and the interest rate significantly impacts purchasing power. Try adjusting your DTI ratio to 43% to see what FHA guidelines allow, or see how paying off a debt would increase your buying power.",
  },
  {
    question: "How does the interest rate affect how much house I can afford?",
    answer:
      "Interest rates have a dramatic impact on affordability. For example, at 6% interest a household earning $85,000/year might afford a $380,000 home. At 7%, that same household might only afford $340,000 — a difference of $40,000 in purchasing power. Each 1% increase in rate reduces your buying power by roughly 10%. This is why locking in a lower rate or buying when rates are favorable can make a significant difference.",
  },
  {
    question: "Should I buy the most expensive house I qualify for?",
    answer:
      "Financial advisors generally recommend buying less house than the maximum you qualify for. Just because a lender approves you for a certain amount does not mean it is comfortable. Aim to keep total housing costs below 25-30% of your take-home pay to leave room for savings, retirement contributions, entertainment, and unexpected expenses. Being house-poor — spending too much on housing at the expense of everything else — is one of the most common financial mistakes.",
  },
];

const relatedCalculators = [
  {
    title: "Mortgage Calculator",
    slug: "mortgage-calculator",
    description: "Calculate your monthly mortgage payment, total interest, and amortization schedule.",
    icon: "🏦",
  },
  {
    title: "Rent vs Buy Calculator",
    slug: "rent-vs-buy-calculator",
    description: "Compare the true cost of renting versus buying a home.",
    icon: "🔑",
  },
  {
    title: "Cost of Living Calculator",
    slug: "cost-of-living-calculator",
    description: "Compare cost of living between different cities and states.",
    icon: "🏙️",
  },
  {
    title: "Loan Calculator",
    slug: "loan-calculator",
    description: "Compute payments for any fixed-rate loan amount and term.",
    icon: "💳",
  },
];

const editorialContent = `
<h2>Making Smart Home Buying Decisions</h2>
<p>Purchasing a home is the largest financial commitment most people make in their lifetime. Understanding exactly how much home you can afford before you start shopping prevents the heartbreak of falling in love with a property that is beyond your budget — and protects you from the long-term consequences of overextending your finances.</p>

<h3>The True Cost of Stretching Your Budget</h3>
<p>When housing costs consume too large a share of your income, the effects ripple through every aspect of your financial life. You may struggle to save for retirement, build an emergency fund, or handle unexpected expenses like car repairs or medical bills. Studies show that households spending more than 30% of gross income on housing are considered "cost-burdened" by the Department of Housing and Urban Development, and those spending more than 50% are "severely cost-burdened."</p>

<p>For example, on a $85,000 salary, a 36% DTI ratio allows roughly $2,550 per month for all debt payments. After subtracting $650 in existing debts, you have about $1,900 available for housing. But stretching to a 43% DTI would give you roughly $2,395 for housing — a difference that could mean $80,000 or more in home price. The question is whether that larger home is worth the tighter monthly budget.</p>

<h3>Strategies to Increase Your Buying Power</h3>
<p>If the calculator shows a lower number than you hoped for, there are concrete steps you can take. Paying off a car loan or credit card balance directly increases your available housing payment. Improving your credit score by even 40-60 points can lower your interest rate by 0.25-0.5%, which translates to thousands more in purchasing power. Saving a larger down payment reduces PMI costs and lowers the loan amount, letting you afford a higher-priced home within the same monthly budget.</p>

<p>Consider your timeline as well. If you plan to buy in 12-18 months, you may have time to pay down debts, build savings, and improve your credit. Use this calculator to model different scenarios and set specific financial goals that will put your target home within reach.</p>
`;

export default function HomeAffordabilityCalculatorPage() {
  return (
    <CalculatorLayout
      title="Home Affordability Calculator"
      description="Find out how much house you can afford based on your income, debts, down payment, and interest rate."
      slug="home-affordability-calculator"
      category={{ name: "Mortgage & Housing", slug: "mortgage-and-housing" }}
      ctaText="Get pre-approved and find out exactly how much home you can afford"
      ctaHref="https://www.lendingtree.com"
      ctaDescription="Compare pre-approval offers from multiple lenders with no impact to your credit score."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <HomeAffordabilityCalculatorWidget />
    </CalculatorLayout>
  );
}
