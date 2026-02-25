import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const LoanCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.LoanCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Loan Payment Calculator | CalcEngine",
  description:
    "Calculate your monthly loan payment, total interest, total cost, and payoff date. See how extra payments can save you money. Free loan amortization calculator.",
  openGraph: {
    title: "Loan Payment Calculator | CalcEngine",
    description:
      "Calculate your monthly loan payment, total interest, total cost, and payoff date. See how extra payments can save you money. Free loan amortization calculator.",
    url: "https://calcengine.io/calculators/loan-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loan Payment Calculator | CalcEngine",
    description:
      "Calculate your monthly loan payment, total interest, total cost, and payoff date. See how extra payments can save you money. Free loan amortization calculator.",
  },
  alternates: {
    canonical: "/calculators/loan-calculator",
  },
};

const howItWorks = `
<p>A loan payment calculator helps you determine exactly how much you will pay each month on any fixed-rate installment loan — whether it is a personal loan, student loan, auto loan, or any other borrowing arrangement with a set interest rate and repayment period. It uses the standard amortization formula that banks and lenders rely on to compute your fixed monthly payment.</p>

<h3>Understanding the Amortization Formula</h3>
<p>Your monthly payment is determined by three core variables: the loan principal (the amount you borrow), the annual interest rate (converted to a monthly rate by dividing by 12), and the total number of monthly payments (the loan term). The formula calculates a fixed monthly payment that, when applied consistently over the life of the loan, will fully repay both the principal and all accumulated interest by the final payment.</p>

<p>Each monthly payment is split into two parts: an interest charge on the remaining balance and a principal repayment. In the early months of your loan, the majority of your payment goes toward interest because the outstanding balance is still high. As you pay down the principal, the interest portion shrinks and more of each payment reduces the balance. This gradual shift is the essence of amortization.</p>

<h3>How Extra Payments Work</h3>
<p>One of the most powerful features of this calculator is the ability to model extra monthly payments. When you pay more than the required minimum, the additional amount goes directly toward reducing your principal balance. This creates a compounding benefit: a lower balance means less interest accrues each month, which means an even larger share of your next payment goes toward principal.</p>

<p>Even modest extra payments can have dramatic effects. For example, adding just $100 per month to a $25,000 loan at 6.5% over 60 months can save you over $800 in interest and pay off the loan 8 months early. The savings increase substantially with larger loan amounts and higher interest rates.</p>

<h3>Reading the Charts</h3>
<p>The pie chart gives you an at-a-glance breakdown of how much of your total cost goes toward the original loan amount versus interest charges. The line chart shows your remaining balance over time, making it easy to visualize how quickly your debt decreases. When you add extra payments, a second line appears showing the accelerated payoff trajectory compared to the standard schedule.</p>

<h3>Tips for Borrowers</h3>
<p>Always compare loan offers from multiple lenders, as even a small difference in interest rate can translate to significant savings. Pay attention to the Annual Percentage Rate (APR), which includes fees and provides a more accurate picture of total borrowing cost. If your credit score has improved since you originally took out a loan, consider refinancing at a lower rate. And whenever your budget allows, direct extra money toward your highest-interest debt first — a strategy known as the avalanche method.</p>
`;

const formula = `Monthly Payment (M) = P [ r(1+r)^n ] / [ (1+r)^n - 1 ]

Where:
  P = Loan principal (amount borrowed)
  r = Monthly interest rate (annual rate / 12)
  n = Total number of payments (loan term in months)

Total Interest = (M x n) - P
Total Cost     = M x n`;

const faqs = [
  {
    question: "What is the difference between interest rate and APR?",
    answer:
      "The interest rate is the cost of borrowing the principal loan amount, expressed as a percentage. The Annual Percentage Rate (APR) includes the interest rate plus any additional fees and costs associated with the loan, such as origination fees, closing costs, and discount points. The APR gives you a more complete picture of the total cost of borrowing and is the best number to use when comparing loan offers from different lenders.",
  },
  {
    question: "How does my credit score affect my loan rate?",
    answer:
      "Your credit score is one of the primary factors lenders use to determine your interest rate. Borrowers with excellent credit (typically 740+) qualify for the lowest rates, while those with fair or poor credit (below 670) will be offered higher rates to compensate for the increased risk. A difference of even 2-3 percentage points in interest rate can cost thousands of dollars over the life of a loan. Before applying for a loan, check your credit report for errors and take steps to improve your score if possible.",
  },
  {
    question: "Should I choose a shorter or longer loan term?",
    answer:
      "A shorter loan term means higher monthly payments but significantly less total interest paid. A longer term lowers your monthly payment but increases the total cost of the loan. For example, a $20,000 loan at 7% costs $396/month over 60 months ($3,761 total interest) versus $310/month over 84 months ($6,025 total interest). Choose the shortest term you can comfortably afford to minimize total interest.",
  },
  {
    question: "What happens if I make extra payments on my loan?",
    answer:
      "Extra payments go directly toward reducing your principal balance. This means less interest accrues each subsequent month, which accelerates your payoff timeline. Most lenders allow extra payments without penalty, but always confirm there are no prepayment penalties in your loan agreement. Use the extra payment field in this calculator to see exactly how much time and money you can save.",
  },
  {
    question: "What is a loan amortization schedule?",
    answer:
      "An amortization schedule is a detailed table showing every payment over the life of the loan, broken down into principal and interest components. It shows how each payment is allocated and how the remaining balance decreases over time. Early payments are interest-heavy, while later payments are mostly principal. Understanding your amortization schedule helps you see the true cost of borrowing and plan extra payments strategically.",
  },
  {
    question: "Can I pay off my loan early without penalty?",
    answer:
      "Many loans, especially personal loans and auto loans, allow early payoff without penalty. However, some loans include prepayment penalties that charge you a fee for paying off the loan before the scheduled end date. Always read your loan agreement carefully and ask your lender about prepayment terms before signing. Federal student loans have no prepayment penalties by law.",
  },
  {
    question: "How do I decide between a fixed-rate and variable-rate loan?",
    answer:
      "A fixed-rate loan locks in your interest rate for the entire term, providing predictable monthly payments. A variable-rate loan may start with a lower rate but can increase over time based on market conditions. Fixed-rate loans are generally better for long-term borrowing when you want payment stability. Variable-rate loans may be suitable for short-term borrowing when you plan to pay off the loan quickly before rates potentially increase.",
  },
];

const relatedCalculators = [
  {
    title: "Mortgage Calculator",
    slug: "mortgage-calculator",
    description: "Calculate monthly mortgage payments and total home loan costs.",
    icon: "🏠",
  },
  {
    title: "Auto Loan Calculator",
    slug: "auto-loan-calculator",
    description: "Figure out your monthly car payment with trade-in and tax.",
    icon: "🚗",
  },
  {
    title: "Student Loan Calculator",
    slug: "student-loan-calculator",
    description: "Plan your student loan repayment and compare strategies.",
    icon: "🎓",
  },
  {
    title: "Debt Payoff Calculator",
    slug: "debt-payoff-calculator",
    description: "Create a plan to pay off multiple debts faster.",
    icon: "💳",
  },
];

const editorialContent = `
<h2>A Borrower's Guide to Loan Payments</h2>
<p>Taking on debt is one of the most consequential financial decisions you can make. Whether you are financing a major purchase, consolidating existing debt, or covering an unexpected expense, understanding how loan payments work empowers you to borrow wisely and pay off debt efficiently.</p>

<h3>The True Cost of Borrowing</h3>
<p>Many borrowers focus on the monthly payment amount without considering the total cost of the loan. On a $30,000 personal loan at 8% interest over 5 years, your monthly payment is a manageable $608 — but you will pay $6,497 in total interest, bringing the true cost to $36,497. Over 7 years, the monthly payment drops to $468, but total interest rises to $9,295. The monthly savings of $140 costs you nearly $3,000 more over the life of the loan.</p>

<h3>The Power of Extra Payments</h3>
<p>Making extra payments is the single most effective strategy for reducing the cost of your loan. Because extra payments go directly to principal, they reduce the balance that accrues interest. On a $25,000 loan at 6.5% over 60 months, adding just $50 per month saves approximately $400 in interest and pays off the loan 5 months early. Double that extra payment to $100 and you save over $800 and finish nearly 9 months ahead of schedule.</p>

<p>Consider directing windfalls — tax refunds, bonuses, or gifts — toward your highest-interest debt. A single $1,000 lump-sum payment early in the loan term can save significantly more than the same payment made years later, because you benefit from reduced interest accrual for a longer period.</p>

<h3>Comparing Loan Offers</h3>
<p>When shopping for a loan, look beyond the monthly payment. Compare the APR (which includes fees), the total cost of the loan, and any prepayment penalties. Some lenders offer lower rates but charge high origination fees (1-6% of the loan amount), which can negate the rate savings. Use this calculator to model different scenarios: a loan with a 6% rate and 3% origination fee may actually cost more than a loan with a 6.5% rate and no fees.</p>
`;

export default function LoanCalculatorPage() {
  return (
    <CalculatorLayout
      title="Loan Payment Calculator"
      description="Calculate your monthly loan payment, total interest, total cost, and see how extra payments can accelerate your payoff and save you money."
      slug="loan-calculator"
      category={{ name: "Debt & Loans", slug: "debt-and-loans" }}
      ctaText="Check your rate without affecting your credit score"
      ctaHref="https://www.sofi.com/personal-loans/"
      ctaDescription="See personalized loan rates in 2 minutes with no impact to your credit score."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <LoanCalculatorWidget />
    </CalculatorLayout>
  );
}
