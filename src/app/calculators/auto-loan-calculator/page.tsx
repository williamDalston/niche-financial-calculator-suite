import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const AutoLoanCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.AutoLoanCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Auto Loan Calculator | CalcEngine",
  description:
    "Calculate your monthly car payment with down payment, trade-in, and sales tax. See total interest, total cost, and an amortization chart for your auto loan.",
  openGraph: {
    title: "Auto Loan Calculator | CalcEngine",
    description:
      "Calculate your monthly car payment with down payment, trade-in, and sales tax. See total interest, total cost, and an amortization chart for your auto loan.",
    url: "https://calcengine.org/calculators/auto-loan-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auto Loan Calculator | CalcEngine",
    description:
      "Calculate your monthly car payment with down payment, trade-in, and sales tax. See total interest, total cost, and an amortization chart for your auto loan.",
  },
  alternates: {
    canonical: "/calculators/auto-loan-calculator",
  },
};

const howItWorks = `
<p>The auto loan calculator helps you estimate your monthly car payment and total loan cost before you set foot in a dealership. It accounts for the unique aspects of vehicle financing that a generic loan calculator misses: down payment, trade-in value, and sales tax — all of which directly affect the amount you actually finance.</p>

<h3>How the Loan Amount Is Calculated</h3>
<p>Unlike a simple loan where you borrow a fixed amount, an auto loan starts with the vehicle price and subtracts your down payment and trade-in value to determine the net amount. Sales tax is then applied to this net amount (in most states, you only pay tax on the difference between the purchase price and your trade-in). The resulting figure is your total financed amount, and this is the principal used for calculating your monthly payment.</p>

<p>For example, if you are buying a $35,000 vehicle with a $5,000 down payment and a $3,000 trade-in in a state with 7% sales tax: the net price is $27,000, sales tax is $1,890, and the total loan amount is $28,890. This is the amount on which your monthly payment and interest charges are calculated.</p>

<h3>Understanding the Monthly Payment</h3>
<p>Once the loan amount is determined, the calculator uses the standard amortization formula to compute your fixed monthly payment based on the interest rate and loan term. Each payment is split between interest on the remaining balance and principal repayment. In the early months, interest accounts for a larger share; as the balance decreases, more of each payment goes toward principal.</p>

<p>The loan term has a dramatic effect on both your monthly payment and total cost. A 60-month (5-year) loan on $28,890 at 6.5% has a monthly payment of $565 and total interest of $5,010. Extending to 72 months drops the payment to $487 but increases total interest to $6,164. An 84-month loan drops it further to $433 but costs $7,396 in interest. You pay $2,386 more in interest for the privilege of a $132 lower monthly payment.</p>

<h3>Reading the Charts</h3>
<p>The pie chart breaks down the total cost of your vehicle into three clear components: the principal (the actual vehicle cost you financed), interest charges over the life of the loan, and sales tax. This visualization helps you see the true cost beyond the sticker price. The line chart shows your remaining loan balance declining over time, giving you a clear picture of your payoff trajectory.</p>

<h3>Tips for Getting the Best Auto Loan</h3>
<p>Always get pre-approved for an auto loan from your bank or credit union before visiting a dealership. This gives you a benchmark rate to compare against dealer financing offers. Dealers often mark up the interest rate from the lender and keep the spread as profit, so having your own financing in hand puts you in a stronger negotiating position.</p>

<p>Aim for the shortest loan term you can comfortably afford. While 72- and 84-month loans are increasingly common, longer terms mean you spend more time "underwater" — owing more on the loan than the car is worth. This creates financial risk if you need to sell or if the car is totaled. A good rule of thumb is to keep your total monthly transportation costs (payment + insurance + fuel + maintenance) below 15-20% of your take-home pay.</p>

<h3>New vs. Used: The Financing Difference</h3>
<p>Interest rates for used cars are typically 1-2% higher than for new cars because used vehicles are considered riskier collateral. However, used cars cost less, so you may still pay less total interest. A $20,000 used car at 7.5% over 48 months costs $3,185 in interest, while a $35,000 new car at 5.5% over 60 months costs $4,904 in interest. Always run the numbers for both scenarios to make an informed decision.</p>
`;

const formula = `Loan Amount = (Vehicle Price - Down Payment - Trade-In) x (1 + Sales Tax Rate)

Monthly Payment (M) = P [ r(1+r)^n ] / [ (1+r)^n - 1 ]

Where:
  P = Loan amount (after down payment, trade-in, and tax)
  r = Monthly interest rate (annual rate / 12)
  n = Loan term in months

Total Interest = (M x n) - P
Total Cost     = M x n`;

const faqs = [
  {
    question: "What is a good interest rate for an auto loan?",
    answer:
      "Auto loan rates vary based on credit score, loan term, and whether the vehicle is new or used. As of 2025, average rates for a new car loan range from about 5% for excellent credit (750+) to 12-14% for poor credit (below 600). Used car rates run about 1-2% higher. Credit union rates are often 0.5-1.5% lower than bank rates. To get the best rate, check your credit score before shopping, get pre-approved from multiple lenders, and aim for the shortest term you can afford.",
  },
  {
    question: "How much should I put down on a car?",
    answer:
      "Financial experts recommend a down payment of at least 20% for a new car and 10% for a used car. A larger down payment reduces your loan amount, lowers your monthly payment, decreases total interest paid, and helps prevent being \"underwater\" (owing more than the car is worth). If you cannot afford 20% down, try to put down at least enough to cover sales tax and fees so your loan does not exceed the vehicle's value from day one.",
  },
  {
    question: "Should I trade in my car or sell it privately?",
    answer:
      "Selling your car privately typically yields 10-20% more than a dealer trade-in because dealers need to resell at a profit. However, a trade-in is more convenient and in most states, you only pay sales tax on the difference between the new car price and your trade-in value, which can save hundreds or thousands in tax. Run the numbers both ways: if the tax savings plus convenience outweigh the higher private sale price, a trade-in may be the better choice.",
  },
  {
    question: "Is a longer loan term a bad idea?",
    answer:
      "Longer loan terms (72-84 months) result in lower monthly payments but have significant drawbacks: more total interest paid, a longer period of being underwater on the loan, and the risk of the car needing expensive repairs before the loan is paid off. A 72-month loan at 6.5% costs about 35% more in total interest than a 48-month loan at the same rate. If you need a longer term to afford the payment, consider a less expensive vehicle instead.",
  },
  {
    question: "Does the dealer's interest rate include a markup?",
    answer:
      "Often, yes. Dealers can legally mark up the interest rate offered by their lending partners and keep the difference as profit. This markup (called the \"dealer reserve\" or \"dealer participation\") is typically 1-2 percentage points. This is why getting pre-approved from your own bank or credit union before visiting the dealer is important — it gives you a baseline rate to compare and negotiate against. Always ask the dealer for their best rate and compare it to your pre-approval.",
  },
  {
    question: "How does sales tax work on a car purchase?",
    answer:
      "Sales tax on vehicle purchases varies by state, ranging from 0% (Oregon, Montana, New Hampshire, Delaware, Alaska) to over 10% in some jurisdictions when state and local taxes are combined. In most states, sales tax is calculated on the net purchase price (after subtracting any trade-in value). Some states charge tax on the full purchase price regardless of trade-in. Sales tax is typically included in the loan amount, which means you pay interest on the tax portion as well — another reason to minimize the financed amount when possible.",
  },
  {
    question: "Can I refinance my auto loan?",
    answer:
      "Yes, refinancing your auto loan can lower your interest rate and monthly payment if your credit score has improved since the original loan, if rates have dropped, or if you originally financed through a high-rate dealer loan. The process is similar to getting a new loan: a lender evaluates your creditworthiness and the vehicle's value, then pays off your existing loan and issues a new one. Refinancing typically makes sense if you can reduce your rate by at least 1-2 percentage points and plan to keep the car for at least another year or two.",
  },
];

const relatedCalculators = [
  {
    title: "Loan Payment Calculator",
    slug: "loan-calculator",
    description: "Calculate payments for any fixed-rate loan amount and term.",
    icon: "💳",
  },
  {
    title: "Mortgage Calculator",
    slug: "mortgage-calculator",
    description: "Calculate monthly mortgage payments and total home loan costs.",
    icon: "🏠",
  },
  {
    title: "Debt Payoff Calculator",
    slug: "debt-payoff-calculator",
    description: "Create a plan to eliminate all your debts using avalanche or snowball strategy.",
    icon: "📉",
  },
  {
    title: "Cost of Living Calculator",
    slug: "cost-of-living-calculator",
    description: "Compare the cost of living between 30 major US cities.",
    icon: "🏙️",
  },
];

const editorialContent = `
<h2>Smart Car Buying: A Financial Guide</h2>
<p>For most Americans, a car is the second-largest purchase they will make after a home. The average new car price in the US is now over $48,000, and even used cars average around $27,000. Understanding the financial mechanics of auto financing can save you thousands of dollars and prevent costly mistakes.</p>

<h3>The 20/4/10 Rule</h3>
<p>A widely recommended guideline for car buying is the 20/4/10 rule: put at least 20% down, finance for no more than 4 years, and keep total monthly transportation costs (payment, insurance, gas, maintenance) below 10% of your gross monthly income. While this rule is conservative, it helps ensure your car purchase fits comfortably within your overall financial picture and prevents you from becoming "car poor" — spending so much on transportation that other financial goals suffer.</p>

<h3>The True Cost of Ownership</h3>
<p>The purchase price and loan payment are just the beginning. The true cost of owning a car includes depreciation (the biggest cost — new cars lose 20-30% of their value in the first year), insurance premiums, fuel costs, routine maintenance, tires, registration and inspection fees, and parking. A car costing $35,000 to purchase may cost $50,000-$60,000 to own over five years when all expenses are included.</p>

<p>Depreciation is particularly important to understand because it is an invisible cost that does not show up on any monthly bill. A new $35,000 car may be worth only $24,500 after one year and $18,000 after three years. This is why many financial advisors recommend buying a 2-3 year old used car that has already absorbed the steepest depreciation while still having most of its useful life ahead.</p>

<h3>Negotiating at the Dealership</h3>
<p>When negotiating your car purchase, always negotiate the purchase price separately from the trade-in value and financing. Dealers often use the "four-square" technique, mixing these elements together to obscure the actual deal. Start by agreeing on the out-the-door price of the vehicle, then separately negotiate your trade-in, and finally compare the dealer's financing to your pre-approved loan. This approach gives you the clearest picture of each component and prevents one element from subsidizing another.</p>

<h3>Electric Vehicles and Financing</h3>
<p>The growing electric vehicle market introduces additional financial considerations. EVs typically have lower fuel and maintenance costs but higher purchase prices. Federal tax credits of up to $7,500 for new EVs (and $4,000 for used) can significantly reduce the effective cost. Some lenders offer special EV financing rates, and many states offer additional incentives. When comparing an EV to a gas vehicle, factor in fuel savings ($1,000-$2,000/year), reduced maintenance costs (no oil changes, fewer brake replacements), and any available tax credits alongside the purchase price difference.</p>
`;

export default function AutoLoanCalculatorPage() {
  return (
    <CalculatorLayout
      title="Auto Loan Calculator"
      description="Calculate your monthly car payment with down payment, trade-in value, and sales tax. See total interest, cost breakdown, and an amortization schedule."
      slug="auto-loan-calculator"
      category={{ name: "Debt & Loans", slug: "debt-and-loans" }}
      ctaText="Compare auto loan rates — check your rate in 2 minutes"
      ctaHref="https://www.bankrate.com/loans/auto-loans/"
      ctaDescription="See personalized auto loan rates from top lenders with no impact to your credit score."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <AutoLoanCalculatorWidget />
    </CalculatorLayout>
  );
}
