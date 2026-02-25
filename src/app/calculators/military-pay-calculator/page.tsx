import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const MilitaryPayCalculatorWidget = dynamic(() => import("./calculator").then((m) => m.MilitaryPayCalculatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Military Pay Calculator 2024 | CalcEngine",
  description:
    "Calculate your 2024 military pay including base pay, BAH, BAS, and total compensation. See pay progression by years of service and tax-equivalent civilian salary.",
  openGraph: {
    title: "Military Pay Calculator 2024 | CalcEngine",
    description:
      "Calculate your 2024 military pay including base pay, BAH, BAS, and total compensation. See pay progression by years of service and tax-equivalent civilian salary.",
    url: "https://calcengine.io/calculators/military-pay-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Military Pay Calculator 2024 | CalcEngine",
    description:
      "Calculate your 2024 military pay including base pay, BAH, BAS, and total compensation. See pay progression by years of service and tax-equivalent civilian salary.",
  },
  alternates: {
    canonical: "/calculators/military-pay-calculator",
  },
};

const howItWorks = `
<p>The Military Pay Calculator estimates your total military compensation based on the 2024 Department of Defense pay tables. Military compensation includes several components beyond base pay, making it significantly more valuable than the base pay figure alone. This calculator helps service members, recruits, and military families understand the full picture of military earnings.</p>

<h3>Components of Military Pay</h3>
<p>Military compensation consists of three primary components: base pay, Basic Allowance for Housing (BAH), and Basic Allowance for Subsistence (BAS). Base pay is determined by your pay grade (rank) and years of service, and it is subject to federal and state income taxes. BAH and BAS, on the other hand, are tax-free allowances, making them particularly valuable from a total compensation perspective.</p>

<h3>Understanding Base Pay</h3>
<p>Base pay increases with both rank and years of service, following the pay tables published annually by the Defense Finance and Accounting Service (DFAS). Enlisted members start at E-1 and can advance through E-9 (Sergeant Major/Master Chief). Warrant officers range from W-1 to W-5, and commissioned officers from O-1 to O-10. Pay increases are steepest in the early years of service, with most grades reaching their maximum base pay between 18 and 26 years of service.</p>

<h3>BAH: Basic Allowance for Housing</h3>
<p>BAH is designed to offset the cost of housing in the civilian market when government quarters are not provided. The rate varies significantly by duty station location and whether the member has dependents. For example, BAH at Joint Base Pearl Harbor-Hickam, HI, is substantially higher than at Fort Moore, GA, reflecting the difference in local housing costs. BAH rates are recalculated annually based on rental surveys in each military housing area.</p>

<h3>BAS: Basic Allowance for Subsistence</h3>
<p>BAS is intended to offset the cost of meals. In 2024, the enlisted BAS rate is $452.56 per month and the officer rate is $311.68 per month. Officers receive a lower rate because BAS was historically designed to subsidize only the member's meals, while enlisted members historically ate in dining facilities. Most service members who live off-base receive BAS unless they are required to eat in a government dining facility.</p>

<h3>Tax-Equivalent Salary</h3>
<p>Because BAH and BAS are not subject to federal or state income tax, the true value of military compensation is higher than the gross dollar amount suggests. This calculator estimates the tax-equivalent civilian salary by grossing up the tax-free allowances at an assumed 27% combined marginal tax rate. For example, $1,500 in tax-free BAH is equivalent to approximately $2,055 in pre-tax civilian income. This makes military compensation significantly more competitive than base pay alone would suggest, especially in high-cost duty stations.</p>

<h3>Other Benefits Not Shown</h3>
<p>This calculator covers the three primary pay components. Additional military benefits not reflected here include Tricare health insurance (worth $6,000-$24,000 per year in civilian premiums), Thrift Savings Plan matching (up to 5% of base pay), tuition assistance, the GI Bill, special and incentive pays (flight pay, hazardous duty, combat zone tax exclusion), and military retirement benefits. These additional benefits can add tens of thousands of dollars to the total compensation package.</p>
`;

const formula = `Total Monthly Pay = Base Pay + BAH + BAS

Base Pay = Determined by pay grade and years of service (DoD pay tables)
BAH = Based on duty station and dependent status (tax-free)
BAS = $452.56/month (enlisted) or $311.68/month (officer) (tax-free)

Annual Compensation = Total Monthly Pay x 12
Tax-Equivalent Salary = (Base Pay x 12) + ((BAH + BAS) x 12) / (1 - Marginal Tax Rate)`;

const faqs = [
  {
    question: "How is military base pay determined?",
    answer:
      "Military base pay is determined by two factors: your pay grade (rank) and your years of service. The Defense Finance and Accounting Service (DFAS) publishes updated pay tables each year, typically with a cost-of-living increase. As you gain rank through promotions and accumulate years of service, your base pay increases. Each pay grade has a maximum base pay that is reached at a specific years-of-service milestone, typically between 18 and 26 years.",
  },
  {
    question: "Is BAH taxable?",
    answer:
      "No, Basic Allowance for Housing (BAH) is not subject to federal or state income tax. This makes BAH significantly more valuable than an equivalent amount of taxable income. For example, if you receive $2,000/month in BAH and you are in a 27% combined tax bracket, the tax-equivalent value is approximately $2,740/month. This tax advantage is one of the reasons military compensation is often more competitive than base pay figures alone suggest.",
  },
  {
    question: "How is BAH calculated for my location?",
    answer:
      "BAH rates are calculated annually using rental surveys in each Military Housing Area (MHA). The Department of Defense collects data on local rental costs for various dwelling types appropriate to each pay grade. BAH is designed to cover the median rental cost plus average utilities for your rank and location. Rates differ based on whether you have dependents, with the 'with dependents' rate typically 15-25% higher. BAH rates are protected from year-over-year decreases for individual members through rate protection.",
  },
  {
    question: "What is the difference between enlisted and officer pay?",
    answer:
      "Officers generally earn higher base pay than enlisted members at every experience level. An O-1 (Second Lieutenant/Ensign) with no experience earns approximately $3,826/month, while an E-1 (Private/Seaman Recruit) earns $1,917/month. However, officers typically require a four-year college degree and enter through Officer Candidate School, a service academy, or ROTC. Warrant officers fall between enlisted and commissioned officers, requiring specialized technical expertise.",
  },
  {
    question: "Do military members pay Social Security and Medicare taxes?",
    answer:
      "Yes, military members pay Social Security tax (6.2%) and Medicare tax (1.45%) on their base pay, just like civilian employees. However, these taxes only apply to base pay, not to BAH or BAS. Military service also counts toward Social Security benefits upon retirement. Additionally, military members serving in designated combat zones may be exempt from federal income tax on their earnings during that period.",
  },
  {
    question: "How does the military Thrift Savings Plan (TSP) work?",
    answer:
      "The TSP is the military equivalent of a 401(k). Under the Blended Retirement System (BRS), the government automatically contributes 1% of base pay and matches up to an additional 4% for a total of 5% matching. Service members can contribute up to $23,000 per year (2024 limit, $30,500 if age 50+) to traditional or Roth TSP accounts. The TSP offers six investment funds with extremely low expense ratios, making it one of the best retirement savings vehicles available.",
  },
];

const relatedCalculators = [
  {
    title: "GS Pay Calculator",
    slug: "gs-pay-calculator",
    description: "Calculate federal civilian GS pay with locality adjustments.",
    icon: "🏛️",
  },
  {
    title: "Salary to Hourly",
    slug: "salary-to-hourly",
    description: "Convert annual salary to hourly rate and compare compensation.",
    icon: "⏰",
  },
  {
    title: "Take-Home Pay Calculator",
    slug: "take-home-pay-calculator",
    description: "See your actual paycheck after all tax withholdings.",
    icon: "💰",
  },
  {
    title: "Retirement Calculator",
    slug: "retirement-calculator",
    description: "Plan your retirement savings and estimate your nest egg.",
    icon: "🏖️",
  },
];

const editorialContent = `
<h2>Understanding Military Compensation: More Than Just Base Pay</h2>
<p>When evaluating military careers against civilian opportunities, it is critical to consider the full compensation package rather than base pay alone. Military compensation is often significantly underestimated because the most valuable components, particularly tax-free allowances and benefits, are not reflected in the base pay figure.</p>

<h3>The Hidden Value of Tax-Free Allowances</h3>
<p>A service member stationed at Joint Base Pearl Harbor-Hickam receiving $3,060/month in BAH with dependents is earning the equivalent of approximately $4,192/month in civilian pre-tax income (assuming a 27% marginal tax rate). Over a year, that is more than $13,500 in additional implicit value from the tax-free status alone. When you add BAS and consider that Tricare health insurance would cost a civilian family $15,000-$24,000 per year in premiums, the total compensation gap narrows significantly or even reverses in many cases.</p>

<h3>Career Progression and Pay Growth</h3>
<p>Military pay growth is predictable and transparent. Every service member knows exactly what they will earn at each rank and year of service, which provides financial planning certainty that few civilian careers can match. The most significant pay increases come from promotions and from crossing key years-of-service thresholds. For example, an E-5 who promotes to E-6 at 8 years of service would see their base pay increase from $3,654 to $3,956, a jump of over $300 per month.</p>

<h3>Retirement and Long-Term Benefits</h3>
<p>Under the Blended Retirement System (BRS), military members who serve at least 20 years receive a pension equal to 2% x years of service x average of highest 36 months of base pay. A 20-year retiree receives 40% of their high-3 average base pay for life, with cost-of-living adjustments. Combined with TSP matching and potential continuation pay at the 12-year mark, the BRS provides a comprehensive retirement package that is rare in the private sector. Even service members who separate before 20 years benefit from the TSP matching contributions, which vest after two years of service.</p>
`;

export default function MilitaryPayCalculatorPage() {
  return (
    <CalculatorLayout
      title="Military Pay Calculator"
      description="Calculate your 2024 military pay including base pay, BAH, BAS, and total compensation. See pay progression by years of service and tax-equivalent civilian salary."
      slug="military-pay-calculator"
      category={{ name: "Government Pay", slug: "government-pay" }}
      ctaText="Browse military-friendly banking & financial services"
      ctaHref="https://www.usaa.com"
      ctaDescription="USAA offers banking, insurance, and investment products exclusively for military members and their families."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <MilitaryPayCalculatorWidget />
    </CalculatorLayout>
  );
}
