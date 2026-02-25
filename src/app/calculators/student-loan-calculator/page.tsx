import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const StudentLoanCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.StudentLoanCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Student Loan Calculator | CalcEngine",
  description:
    "Calculate your student loan monthly payment, total interest, and payoff timeline. Compare repayment plans and see how extra payments can save you thousands.",
  openGraph: {
    title: "Student Loan Calculator | CalcEngine",
    description:
      "Calculate your student loan monthly payment, total interest, and payoff timeline. Compare repayment plans and see how extra payments can save you thousands.",
    url: "https://calcengine.io/calculators/student-loan-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Loan Calculator | CalcEngine",
    description:
      "Calculate your student loan monthly payment, total interest, and payoff timeline. Compare repayment plans and see how extra payments can save you thousands.",
  },
  alternates: {
    canonical: "/calculators/student-loan-calculator",
  },
};

const howItWorks = `
<p>A student loan calculator helps you understand the true cost of your education debt and explore strategies to pay it off faster. Whether you have federal or private student loans, this tool uses the standard amortization formula to calculate your monthly payment, total interest, and payoff date under different repayment scenarios.</p>

<h3>The Standard Amortization Formula</h3>
<p>Student loans with fixed interest rates use the same amortization formula as mortgages and auto loans. Each month, your payment is split between interest charges on the outstanding balance and principal reduction. Early in repayment, the majority of your payment covers interest. Over time, as the principal decreases, more of each payment goes toward reducing the balance. This calculator computes the exact payment needed to fully amortize the loan over your chosen term.</p>

<h3>Comparing Repayment Plans</h3>
<p>Federal student loans offer several repayment plan options, and the choice you make can mean the difference of thousands of dollars in total interest. The Standard plan spreads payments evenly over 10 years and results in the least total interest. The Graduated plan starts with lower payments that increase every two years, also over a 10-year term, but costs more in total interest because you carry a higher balance longer. The Extended plan stretches payments over 25 years, dramatically lowering your monthly payment but significantly increasing total interest. Income-Driven plans (IBR, PAYE, REPAYE/SAVE) cap payments at a percentage of discretionary income over 20-25 years, with the possibility of forgiveness for any remaining balance.</p>

<h3>The Power of Extra Payments</h3>
<p>Making extra payments beyond the minimum is one of the most effective strategies for paying off student loans faster. Even an additional $50 or $100 per month can shave years off your repayment timeline and save thousands in interest. When you make extra payments, specify that the additional amount should be applied to the principal (not future payments) to maximize the benefit. This calculator shows you exactly how much time and money you save with any extra payment amount.</p>

<h3>When to Consider Refinancing</h3>
<p>If you have strong credit and stable income, refinancing your student loans with a private lender could lower your interest rate and reduce total interest. However, refinancing federal loans means losing access to income-driven repayment plans, Public Service Loan Forgiveness (PSLF), and forbearance options. Weigh these trade-offs carefully before refinancing, especially if you work in public service or expect income volatility.</p>
`;

const formula = `Monthly Payment (M) = P [ r(1+r)^n ] / [ (1+r)^n - 1 ]

Where:
  P = Loan principal (total balance)
  r = Monthly interest rate (annual rate / 12)
  n = Total number of payments (term in years x 12)

Total Interest = (M x n) - P
Total Cost = M x n
Payoff with Extra Payments: Reduced n where M + Extra covers accelerated principal`;

const faqs = [
  {
    question: "Which student loan repayment plan should I choose?",
    answer:
      "If you can afford it, the Standard 10-year plan costs the least in total interest. If your payments are too high relative to your income, an Income-Driven plan caps payments at 10-20% of discretionary income. The Graduated plan works well if you expect your income to rise significantly. The Extended plan is best if you need the lowest possible monthly payment, but you will pay substantially more in total interest over 25 years.",
  },
  {
    question: "How much can I save by making extra payments?",
    answer:
      "The savings depend on your balance, rate, and extra amount. For example, on a $35,000 loan at 5.5% over 10 years (standard payment ~$380/month), adding $100/month would save approximately $3,400 in interest and pay off the loan 2.5 years early. Even $50/month extra saves roughly $1,800 and cuts about 1.5 years from the term.",
  },
  {
    question: "What is the difference between subsidized and unsubsidized loans?",
    answer:
      "Subsidized loans are available to undergraduate students with financial need. The government pays the interest while you are in school, during grace periods, and during deferment. Unsubsidized loans accrue interest from the day of disbursement. If you do not pay the interest while in school, it capitalizes (adds to the principal) when repayment begins, increasing your total balance and cost.",
  },
  {
    question: "Should I refinance my student loans?",
    answer:
      "Refinancing can save money if you qualify for a lower interest rate. Private loan refinancing makes sense if your credit has improved since taking out the loan. However, refinancing federal loans into a private loan means losing access to income-driven repayment plans, PSLF eligibility, and federal forbearance/deferment protections. Only refinance federal loans if you are certain you will not need these benefits.",
  },
  {
    question: "What is Public Service Loan Forgiveness (PSLF)?",
    answer:
      "PSLF forgives the remaining balance on Direct Loans after 120 qualifying payments (10 years) while working full-time for a qualifying employer (government, non-profit). You must be on an income-driven repayment plan for payments to count. The forgiven amount is tax-free. If you qualify, it may make sense to minimize your payments rather than pay extra, since the remaining balance will be forgiven.",
  },
  {
    question: "How does student loan interest work?",
    answer:
      "Student loan interest accrues daily based on your outstanding principal balance. The daily interest charge is your balance multiplied by your interest rate divided by 365.25. Each monthly payment first covers the accrued interest, then the remainder reduces your principal. This is why extra payments are so powerful early in repayment — they reduce the principal that interest is calculated on, creating a compounding effect over time.",
  },
];

const relatedCalculators = [
  {
    title: "Loan Calculator",
    slug: "loan-calculator",
    description: "Compute payments for any fixed-rate loan amount and term.",
    icon: "💳",
  },
  {
    title: "Debt Payoff Calculator",
    slug: "debt-payoff-calculator",
    description: "Create a plan to eliminate all your debts using avalanche or snowball strategy.",
    icon: "📉",
  },
  {
    title: "Take-Home Pay Calculator",
    slug: "take-home-pay-calculator",
    description: "See your actual paycheck after taxes and deductions.",
    icon: "💰",
  },
  {
    title: "Mortgage Calculator",
    slug: "mortgage-calculator",
    description: "Calculate monthly mortgage payments and total home loan costs.",
    icon: "🏠",
  },
];

const editorialContent = `
<h2>Managing Student Loan Debt Effectively</h2>
<p>Student loan debt has become one of the defining financial challenges of our time. With the average graduate carrying roughly $30,000-$40,000 in student debt, understanding your repayment options and developing a strategy can save you years of payments and thousands of dollars in interest.</p>

<h3>The Real Impact of Interest Rates</h3>
<p>Interest rates on student loans vary widely. Federal undergraduate loan rates for the 2024-2025 academic year are around 6.53%, while graduate loans and PLUS loans carry higher rates. Private loan rates range from about 4% to 16% depending on creditworthiness. On a $35,000 loan, the difference between a 5% and 7% rate over 10 years is approximately $4,000 in additional interest. Over 25 years on an extended plan, that difference grows to over $15,000.</p>

<h3>Strategies That Actually Work</h3>
<p>The most effective debt reduction strategies combine behavioral changes with mathematical optimization. The avalanche method (paying extra toward the highest-rate loan first) minimizes total interest. The snowball method (paying off the smallest balance first) provides psychological wins that keep you motivated. Both are far better than making only minimum payments.</p>

<p>Other proven strategies include: applying tax refunds and bonuses as lump-sum payments, setting up autopay for a 0.25% rate reduction offered by most servicers, and using employer student loan repayment benefits if available. Some employers now offer up to $5,250 per year in tax-free student loan repayment assistance.</p>

<h3>Planning for the Future</h3>
<p>While focusing on student debt, do not neglect retirement savings entirely. If your employer offers a 401(k) match, contributing enough to capture the full match provides an immediate 50-100% return that outpaces most student loan interest rates. Balance debt payoff with building a small emergency fund of at least $1,000-$2,000 to prevent new debt from accumulating when unexpected expenses arise.</p>
`;

export default function StudentLoanCalculatorPage() {
  return (
    <CalculatorLayout
      title="Student Loan Calculator"
      description="Calculate your student loan monthly payment, total interest, and payoff timeline. Compare repayment plans and see how extra payments can save you thousands."
      slug="student-loan-calculator"
      category={{ name: "Debt & Loans", slug: "debt-and-loans" }}
      ctaText="Check your student loan refinancing rate without affecting your credit"
      ctaHref="https://www.credible.com/student-loans"
      ctaDescription="Compare refinancing rates from multiple lenders in minutes with no hard credit pull."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <StudentLoanCalculatorWidget />
    </CalculatorLayout>
  );
}
