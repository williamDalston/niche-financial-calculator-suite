import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CalculatorLayout from "@/components/calculator-layout";
import { CalculatorSkeleton } from "@/components/calculator-skeleton";

const SocialSecurityEstimatorWidget = dynamic(() => import("./calculator").then((m) => m.SocialSecurityEstimatorWidget), {
  loading: () => <CalculatorSkeleton />,
});

export const metadata: Metadata = {
  title: "Social Security Estimator | CalcEngine",
  description:
    "Estimate your Social Security retirement benefits at ages 62, full retirement age, and 70. Compare cumulative lifetime benefits with crossover analysis.",
  openGraph: {
    title: "Social Security Estimator | CalcEngine",
    description:
      "Estimate your Social Security retirement benefits at ages 62, full retirement age, and 70. Compare cumulative lifetime benefits with crossover analysis.",
    url: "https://calcengine.org/calculators/social-security-estimator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Security Estimator | CalcEngine",
    description:
      "Estimate your Social Security retirement benefits at ages 62, full retirement age, and 70. Compare cumulative lifetime benefits with crossover analysis.",
  },
  alternates: {
    canonical: "/calculators/social-security-estimator",
  },
};

const howItWorks = `
<p>The Social Security Estimator calculates your projected monthly retirement benefit based on the Social Security Administration's benefit formula, including the 2025 bend points for computing your Primary Insurance Amount (PIA). It compares benefits at different claiming ages from 62 to 70, showing you how the timing of your claim affects both monthly income and total lifetime benefits.</p>

<h3>How Social Security Benefits Are Calculated</h3>
<p>The Social Security Administration calculates your benefit in three steps. First, it indexes your annual earnings for wage inflation and selects the highest 35 years. Second, it divides the total of those 35 years by 420 (35 years times 12 months) to determine your Average Indexed Monthly Earnings (AIME). Third, it applies a progressive formula with "bend points" to compute your Primary Insurance Amount (PIA), which is your monthly benefit at your Full Retirement Age.</p>

<h3>The PIA Formula and Bend Points</h3>
<p>The 2025 PIA formula uses two bend points to create a progressive benefit structure. You receive 90% of your first $1,174 in AIME, plus 32% of AIME between $1,174 and $7,078, plus 15% of AIME above $7,078. This progressive structure means that lower-income workers replace a larger percentage of their pre-retirement income through Social Security. For example, a worker with a $3,000 AIME receives a PIA of approximately $1,641 (55% replacement rate), while a worker with a $10,000 AIME receives a PIA of approximately $3,378 (34% replacement rate).</p>

<h3>Full Retirement Age (FRA)</h3>
<p>Your Full Retirement Age depends on your birth year. For anyone born in 1960 or later, the FRA is 67. For those born between 1943 and 1954, it is 66. Birth years 1955-1959 have FRAs between 66 and 67, increasing by two months for each year. Your FRA is significant because it is the age at which you receive your full PIA with no reduction or increase. Claiming before FRA permanently reduces your benefit; claiming after FRA permanently increases it.</p>

<h3>Early Claiming Reductions</h3>
<p>You can claim Social Security as early as age 62, but your benefit is permanently reduced for each month you claim before your FRA. The reduction is approximately 6.67% per year for the first three years before FRA (5/9 of 1% per month) and 5% per year for each additional year (5/12 of 1% per month). For someone with an FRA of 67, claiming at 62 results in a 30% permanent reduction. This means if your PIA is $2,000, claiming at 62 would give you approximately $1,400 per month.</p>

<h3>Delayed Retirement Credits</h3>
<p>For each month you delay claiming beyond your FRA (up to age 70), your benefit increases by approximately 8% per year (2/3 of 1% per month). Delaying from FRA of 67 to age 70 increases your benefit by 24%. Using the same $2,000 PIA example, waiting until 70 would give you $2,480 per month. There is no additional benefit to delaying past age 70.</p>

<h3>Cumulative Lifetime Benefits and Crossover Points</h3>
<p>While delaying produces a higher monthly benefit, you also receive fewer years of payments. The cumulative benefits chart shows the total amount received over your lifetime for each claiming age. The "crossover point" is the age at which the higher monthly benefit from delaying makes up for the years of missed payments. Typically, claiming at FRA overtakes claiming at 62 around age 78-80, and claiming at 70 overtakes 62 around age 82-84. If you expect to live well beyond these crossover ages, delaying is generally more advantageous.</p>

<h3>Simplified Income Mode</h3>
<p>This calculator offers two input modes. The AIME mode lets you enter your exact Average Indexed Monthly Earnings if you know it from your Social Security statement. The simplified income mode estimates your AIME based on your current annual income and years of work history, assuming consistent earnings. For a more precise estimate, create an account at ssa.gov to see your actual earnings record and personalized benefit estimate.</p>
`;

const formula = `PIA (Primary Insurance Amount) using 2025 bend points:
  PIA = 90% x min(AIME, $1,174)
      + 32% x max(0, min(AIME, $7,078) - $1,174)
      + 15% x max(0, AIME - $7,078)

Early Claiming Reduction (before FRA):
  First 36 months early: 5/9 of 1% per month (~6.67%/year)
  Additional months early: 5/12 of 1% per month (~5%/year)

Delayed Retirement Credits (after FRA, up to age 70):
  8% per year (2/3 of 1% per month)

Full Retirement Age (FRA):
  Birth year 1960+: Age 67
  Birth year 1943-1954: Age 66
  Birth year 1955-1959: Age 66 + 2 months per year after 1954`;

const faqs = [
  {
    question: "When should I start collecting Social Security?",
    answer:
      "The optimal claiming age depends on your health, financial needs, and life expectancy. If you are in good health and can afford to wait, delaying until 70 maximizes your monthly benefit (24% more than at FRA for those born 1960+). If you need the income or have health concerns that suggest a shorter life expectancy, claiming earlier may make sense. The breakeven point between claiming at 62 vs. 70 is typically around age 82-84. On average, total lifetime benefits are roughly equal regardless of when you claim, by design. Married couples should also consider spousal benefit strategies.",
  },
  {
    question: "What is my Full Retirement Age (FRA)?",
    answer:
      "Your FRA depends on your birth year. For anyone born in 1960 or later, FRA is 67. For those born from 1943 to 1954, FRA is 66. For birth years 1955-1959, FRA increases by two months per year: 1955 is 66 and 2 months, 1956 is 66 and 4 months, and so on. Your FRA is the age at which you receive your full Primary Insurance Amount (PIA) with no reduction for early claiming and no delayed retirement credits.",
  },
  {
    question: "How much is my benefit reduced if I claim early?",
    answer:
      "If you claim at 62 with an FRA of 67, your benefit is permanently reduced by 30%. The reduction breaks down as follows: 6.67% per year for the first three years before FRA (20% total), plus 5% per year for the remaining two years (10% total), equaling 30%. For an FRA of 66, claiming at 62 results in a 25% reduction. These reductions are permanent; your benefit does not increase to the full amount when you reach FRA.",
  },
  {
    question: "How are Social Security benefits taxed?",
    answer:
      "Social Security benefits may be taxable depending on your combined income (AGI + nontaxable interest + 50% of SS benefits). For single filers, if combined income exceeds $25,000, up to 50% of benefits are taxable; above $34,000, up to 85% are taxable. For married filing jointly, the thresholds are $32,000 and $44,000 respectively. These thresholds have not been adjusted for inflation since 1993, meaning an increasing number of retirees pay taxes on their benefits each year.",
  },
  {
    question: "Can I work while receiving Social Security?",
    answer:
      "Yes, but if you claim before your FRA, the earnings test may temporarily reduce your benefits. In 2025, if you earn more than $22,320 while collecting before FRA, $1 in benefits is withheld for every $2 earned above the limit. In the year you reach FRA, the threshold rises to $59,520 with a $1 reduction per $3 over the limit. After reaching FRA, there is no earnings test, and any previously withheld benefits are recalculated to give you credit for the months benefits were reduced.",
  },
  {
    question: "What is the maximum Social Security benefit?",
    answer:
      "The maximum monthly Social Security benefit in 2025 depends on when you claim: approximately $2,710 at age 62, $3,822 at FRA (67), and $4,873 at age 70. To receive the maximum, you must have earned at or above the Social Security taxable earnings cap ($168,600 in 2025) for at least 35 years. Most workers receive significantly less than the maximum. The average monthly benefit in 2025 is approximately $1,976 for retired workers.",
  },
];

const relatedCalculators = [
  {
    title: "Retirement Calculator",
    slug: "retirement-calculator",
    description: "Plan your overall retirement savings needs and income sources.",
    icon: "🏖️",
  },
  {
    title: "401(k) Calculator",
    slug: "401k-calculator",
    description: "See how your 401(k) grows with employer matching and compound interest.",
    icon: "📈",
  },
  {
    title: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    description: "Calculate the growth of any investment with compound interest.",
    icon: "💹",
  },
  {
    title: "Federal Tax Estimator",
    slug: "federal-tax-calculator",
    description: "Estimate your federal income tax including retirement income.",
    icon: "🏛️",
  },
];

const editorialContent = `
<h2>Social Security: Planning for Your Retirement Income</h2>
<p>Social Security is the foundation of retirement income for most Americans, providing roughly 40% of pre-retirement income for average earners. Understanding how the system works and making informed claiming decisions can mean a difference of hundreds of thousands of dollars in lifetime benefits.</p>

<h3>The Claiming Decision Is One of the Most Important Financial Decisions You Will Make</h3>
<p>For the average retiree, the difference between claiming at 62 and 70 is approximately 76% more monthly income. On a $2,000 PIA, that is the difference between $1,400/month and $2,480/month, or $12,960 more per year for the rest of your life. Over a 20-year retirement starting at 70, the delayed claim generates approximately $259,000 more in total benefits than claiming at 62 would have provided. Of course, the early claimer collects benefits for 8 additional years, which is why the crossover analysis is crucial for making an informed decision.</p>

<h3>Spousal and Survivor Benefits</h3>
<p>Married couples have additional considerations. A spouse can claim up to 50% of the higher-earning spouse's PIA at FRA (reduced if claimed early). Survivor benefits allow a widow or widower to receive up to 100% of the deceased spouse's benefit. These spousal strategies can significantly affect the optimal claiming decision. In many cases, the higher earner should delay to 70 to maximize the survivor benefit that will protect the lower-earning spouse for the rest of their life.</p>

<h3>Social Security's Financial Future</h3>
<p>The Social Security trust fund is projected to be depleted around 2033, after which payroll tax revenue would cover approximately 77% of scheduled benefits. This does not mean Social Security will disappear; ongoing payroll taxes will continue to fund the majority of benefits. Congress has several options to address the shortfall, including raising the payroll tax cap, adjusting benefits for higher earners, gradually increasing the retirement age, or some combination. Most financial planners advise clients to plan conservatively by assuming benefits may be somewhat reduced, while still incorporating Social Security into their retirement income plan.</p>

<h3>Maximizing Your Social Security Record</h3>
<p>Since benefits are based on your highest 35 years of earnings, working additional years if some early career years had low or zero earnings can increase your AIME and PIA. Each additional year of higher earnings replaces a lower year in the 35-year calculation. Also ensure your earnings record at ssa.gov is accurate, as errors can reduce your benefits. Create a mySocialSecurity account to review your statement, verify your earnings history, and see your personalized benefit estimates at various claiming ages.</p>
`;

export default function SocialSecurityEstimatorPage() {
  return (
    <CalculatorLayout
      title="Social Security Estimator"
      description="Estimate your Social Security retirement benefits at ages 62, full retirement age, and 70. Compare cumulative lifetime benefits with crossover analysis."
      slug="social-security-estimator"
      category={{ name: "Retirement & Investing", slug: "retirement-and-investing" }}
      ctaText="Plan your retirement with a free financial advisor consultation"
      ctaHref="https://www.smartasset.com/financial-advisor"
      ctaDescription="SmartAsset matches you with vetted fiduciary financial advisors in your area for a free initial consultation."
      howItWorks={howItWorks}
      formula={formula}
      faqs={faqs}
      relatedCalculators={relatedCalculators}
      editorialContent={editorialContent}
      lastUpdated="February 2026"
    >
      <SocialSecurityEstimatorWidget />
    </CalculatorLayout>
  );
}
