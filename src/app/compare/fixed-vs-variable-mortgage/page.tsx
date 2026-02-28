import type { Metadata } from "next";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";

export const metadata: Metadata = {
  title:
    "Fixed vs Variable Rate Mortgage: Which Is Right for You in 2026? | CalcEngine",
  description:
    "Compare fixed-rate and adjustable-rate mortgages (ARMs) side by side. Learn how each works, when to choose one over the other, and see real-world cost scenarios for a $400,000 loan.",
  openGraph: {
    title: "Fixed vs Variable Rate Mortgage: Which Is Right for You in 2026?",
    description:
      "Compare fixed-rate and adjustable-rate mortgages side by side. Real-world cost scenarios, rate cap explanations, and a free calculator.",
    url: "https://calcengine.org/compare/fixed-vs-variable-mortgage",
    type: "article",
  },
  alternates: {
    canonical: "/compare/fixed-vs-variable-mortgage",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Fixed vs Variable Rate Mortgage: Which Is Right for You in 2026? | CalcEngine",
    description:
      "Compare fixed-rate and adjustable-rate mortgages (ARMs) side by side. Learn how each works, when to choose one over the other, and see real-world cost scenarios for a $400,000 loan.",
  },
};

/* --- Table of Contents --- */

const tocItems = [
  { id: "introduction", label: "Introduction" },
  { id: "how-fixed-rate-mortgages-work", label: "How Fixed-Rate Mortgages Work" },
  { id: "how-arms-work", label: "How ARMs Work" },
  { id: "side-by-side-comparison", label: "Side-by-Side Comparison" },
  { id: "when-to-choose-fixed", label: "When to Choose Fixed Rate" },
  { id: "when-to-choose-arm", label: "When to Choose ARM" },
  { id: "real-world-scenarios", label: "The Math: Real-World Scenarios" },
  { id: "use-our-calculators", label: "Use Our Calculators" },
  { id: "faq", label: "FAQ" },
];

/* --- FAQ Data --- */

const faqs = [
  {
    question: "Can I refinance from an ARM to a fixed-rate mortgage?",
    answer:
      "Yes. Refinancing from an ARM to a fixed-rate mortgage is one of the most common refinance transactions. Many borrowers take an ARM for the lower initial rate and then refinance into a fixed-rate loan before the first adjustment. Keep in mind that refinancing involves closing costs (typically 2-5% of the loan balance), so you need to make sure the savings from the new rate justify those costs. Your ability to refinance also depends on your credit score, home equity, and market conditions at the time.",
  },
  {
    question: "What index do most ARMs use?",
    answer:
      "Most adjustable-rate mortgages in the United States are now tied to the Secured Overnight Financing Rate (SOFR), which replaced the London Interbank Offered Rate (LIBOR) after its phase-out in 2023. SOFR is based on actual overnight lending transactions in the U.S. Treasury repurchase market, making it a more transparent and reliable benchmark. Your ARM rate is calculated as the index value (SOFR) plus a fixed margin (typically 2-3 percentage points) set by your lender at origination.",
  },
  {
    question: "Is a 7/1 ARM safer than a 5/1 ARM?",
    answer:
      "A 7/1 ARM provides a longer initial fixed-rate period (7 years vs. 5 years), which gives you more time before your rate adjusts. This makes it somewhat less risky because you have a larger window of predictable payments and more time to sell, refinance, or prepare for rate changes. However, 7/1 ARMs typically carry a slightly higher initial rate than 5/1 ARMs to compensate for the longer fixed period. If you are confident you will sell or refinance within 5 years, a 5/1 ARM may still be the better value.",
  },
  {
    question: "What happens when my ARM adjusts?",
    answer:
      "When your ARM reaches its first adjustment date, your lender recalculates your interest rate using the current value of the underlying index (usually SOFR) plus your fixed margin. The new rate is subject to your loan's cap structure: the initial adjustment cap limits how much the rate can change at the first adjustment, the periodic cap limits each subsequent annual change, and the lifetime cap sets an absolute ceiling. Your monthly payment is then recalculated based on the new rate and the remaining loan balance and term. Your lender is required to notify you at least 60 days before any rate change takes effect.",
  },
  {
    question: "Are ARM rates lower in 2026?",
    answer:
      "As of early 2026, ARM initial rates are generally 0.5 to 1.0 percentage points lower than comparable 30-year fixed rates. The exact spread depends on the ARM term (5/1, 7/1, or 10/1), your credit profile, and the lender. Whether ARM rates represent a good deal depends on where you think rates are headed. If you believe rates will hold steady or decline over the next several years, an ARM can save you a significant amount of money. If you think rates will rise substantially, a fixed-rate mortgage locks in certainty.",
  },
];

/* --- JSON-LD Article Schema --- */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Fixed vs Variable Rate Mortgage: Which Is Right for You in 2026?",
  description:
    "Compare fixed-rate and adjustable-rate mortgages (ARMs) side by side. Learn how each works, when to choose one over the other, and see real-world cost scenarios.",
  author: {
    "@type": "Organization",
    name: "CalcEngine",
    url: "https://calcengine.org",
  },
  publisher: {
    "@type": "Organization",
    name: "CalcEngine",
    url: "https://calcengine.org",
  },
  datePublished: "2026-02-24",
  dateModified: "2026-02-24",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://calcengine.org/compare/fixed-vs-variable-mortgage",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

/* --- Page Component --- */

export default function FixedVsVariableMortgagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* --- Breadcrumbs --- */}
      <nav
        className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center gap-2 text-sm text-text-muted">
          <li>
            <Link
              href="/"
              className="transition-colors hover:text-accent-primary"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </li>
          <li>
            <Link
              href="/compare"
              className="transition-colors hover:text-accent-primary"
            >
              Guides
            </Link>
          </li>
          <li aria-hidden="true">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </li>
          <li className="text-text-primary font-medium" aria-current="page">
            Fixed vs Variable Rate Mortgages
          </li>
        </ol>
      </nav>

      {/* --- Main Layout --- */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-12">
          {/* --- Sidebar / Table of Contents (sticky on desktop) --- */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <h2 className="font-display text-xs font-semibold uppercase tracking-wider text-accent-secondary">
                On this page
              </h2>
              <nav className="mt-4" aria-label="Table of contents">
                <ul className="space-y-2.5 border-l border-border pl-4">
                  {tocItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block text-sm text-text-muted transition-colors hover:text-accent-primary"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* --- Article Content --- */}
          <article className="max-w-3xl">
            {/* Title */}
            <header>
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Fixed vs Variable Rate Mortgage:{" "}
                <span className="text-accent-primary">
                  Which Is Right for You?
                </span>
              </h1>
              <p className="mt-4 flex items-center gap-3 text-sm text-text-muted">
                <time dateTime="2026-02-24">February 24, 2026</time>
                <span aria-hidden="true" className="text-border">
                  &bull;
                </span>
                <span>14 min read</span>
              </p>
            </header>

            {/* Mobile TOC */}
            <div className="mt-8 rounded-xl border border-border bg-bg-surface p-5 lg:hidden">
              <h2 className="font-display text-xs font-semibold uppercase tracking-wider text-accent-secondary">
                On this page
              </h2>
              <nav className="mt-3" aria-label="Table of contents">
                <ul className="space-y-2">
                  {tocItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block text-sm text-text-muted transition-colors hover:text-accent-primary"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* -- Section 1: Introduction -- */}
            <section id="introduction" className="mt-12 scroll-mt-24">
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Introduction
              </h2>
              <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
                <p>
                  The mortgage rate type you choose &mdash; fixed or adjustable
                  &mdash; affects your monthly payment, your risk exposure, and
                  the total cost of your loan over its entire life. It is one of
                  the most consequential decisions you will make during the
                  home-buying process, yet many borrowers spend far more time
                  shopping for a house than they do evaluating their financing
                  options.
                </p>
                <p>
                  A fixed-rate mortgage offers certainty: your interest rate and
                  monthly payment never change. An adjustable-rate mortgage (ARM)
                  offers a lower starting rate in exchange for the possibility
                  that your rate &mdash; and your payment &mdash; could rise in
                  the future. Neither option is inherently better. The right
                  choice depends on how long you plan to keep the loan, your
                  tolerance for risk, and where you believe interest rates are
                  headed.
                </p>
                <p>
                  This guide explains exactly how each mortgage type works,
                  compares them side by side, walks through real-world cost
                  scenarios on a $400,000 loan, and helps you determine which
                  option fits your situation. At the end, you can use our free
                  calculators to model your specific numbers.
                </p>
              </div>
            </section>

            {/* -- Section 2: How Fixed-Rate Mortgages Work -- */}
            <section
              id="how-fixed-rate-mortgages-work"
              className="mt-14 scroll-mt-24"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight">
                How Fixed-Rate Mortgages Work
              </h2>
              <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
                <p>
                  A fixed-rate mortgage locks in your interest rate for the
                  entire term of the loan. Whether rates in the broader economy
                  rise to 10% or fall to 3%, your rate stays exactly the same.
                  Your monthly principal and interest payment is calculated once
                  at closing and never changes.
                </p>
                <p>
                  The most common fixed-rate terms are{" "}
                  <strong className="text-text-primary">30 years</strong> and{" "}
                  <strong className="text-text-primary">15 years</strong>. A
                  30-year term spreads payments over a longer period, resulting
                  in lower monthly payments but significantly more total interest
                  paid. A 15-year term comes with higher monthly payments but
                  builds equity faster and costs far less in total interest.
                </p>
              </div>
              <ul className="mt-6 space-y-5">
                {[
                  {
                    title: "Rate is locked for the entire term",
                    text: "Whether you choose a 15-year or 30-year term, the interest rate you agree to at closing is the rate you pay on every single payment. There are no surprises, no adjustments, and no uncertainty.",
                  },
                  {
                    title: "Predictable monthly payments",
                    text: "Your principal and interest payment remains constant for the life of the loan. While property taxes and homeowners insurance may change, the largest component of your housing payment stays the same, making budgeting straightforward.",
                  },
                  {
                    title: "Typically a higher starting rate than ARMs",
                    text: "Because the lender bears the risk of future rate increases, fixed-rate mortgages usually carry a higher initial rate than adjustable-rate mortgages. This premium is the price you pay for certainty.",
                  },
                  {
                    title: "Simple to understand",
                    text: "Fixed-rate mortgages have no caps, margins, indexes, or adjustment schedules to worry about. What you see at closing is what you get for the next 15 or 30 years.",
                  },
                ].map((item) => (
                  <li
                    key={item.title}
                    className="rounded-xl border border-border bg-bg-surface p-5"
                  >
                    <h3 className="font-display text-base font-semibold text-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-muted leading-relaxed">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {/* -- Section 3: How ARMs Work -- */}
            <section id="how-arms-work" className="mt-14 scroll-mt-24">
              <h2 className="font-display text-2xl font-bold tracking-tight">
                How Adjustable-Rate Mortgages (ARMs) Work
              </h2>
              <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
                <p>
                  An adjustable-rate mortgage starts with a fixed interest rate
                  for an initial period, then adjusts periodically based on
                  market conditions. The name of the ARM tells you its structure:
                  a{" "}
                  <strong className="text-text-primary">5/1 ARM</strong> has a
                  fixed rate for 5 years, then adjusts once per year. A{" "}
                  <strong className="text-text-primary">7/1 ARM</strong> is
                  fixed for 7 years, and a{" "}
                  <strong className="text-text-primary">10/1 ARM</strong> is
                  fixed for 10.
                </p>
                <p>
                  After the initial fixed period, your rate is recalculated
                  annually using a simple formula:
                </p>
                <div className="rounded-xl border border-accent-primary/30 bg-accent-primary/5 p-6">
                  <p className="font-display text-base font-semibold text-accent-primary">
                    ARM Rate Formula
                  </p>
                  <p className="mt-3 font-mono text-lg text-text-primary">
                    New Rate = Index (SOFR) + Margin
                  </p>
                  <p className="mt-3 text-sm text-text-muted">
                    The <strong className="text-text-primary">index</strong> is
                    a benchmark rate (most commonly SOFR) that fluctuates with
                    the market. The{" "}
                    <strong className="text-text-primary">margin</strong> is a
                    fixed percentage (typically 2&ndash;3%) set by your lender at
                    origination and does not change.
                  </p>
                </div>
                <p>
                  To protect borrowers from extreme rate swings, ARMs include{" "}
                  <strong className="text-text-primary">rate caps</strong> that
                  limit how much the rate can change:
                </p>
                <ul className="ml-4 list-disc space-y-2 marker:text-accent-primary">
                  <li>
                    <strong className="text-text-primary">
                      Initial adjustment cap
                    </strong>{" "}
                    &mdash; limits the rate change at the first adjustment (e.g.,
                    2% or 5%)
                  </li>
                  <li>
                    <strong className="text-text-primary">
                      Periodic adjustment cap
                    </strong>{" "}
                    &mdash; limits each subsequent annual adjustment (typically
                    2%)
                  </li>
                  <li>
                    <strong className="text-text-primary">
                      Lifetime cap
                    </strong>{" "}
                    &mdash; sets the absolute maximum rate over the life of the
                    loan (typically 5% above the initial rate)
                  </li>
                </ul>
                <p>
                  These caps are expressed as a three-number structure. A{" "}
                  <strong className="text-text-primary">2/2/5 cap</strong> means
                  the rate can increase by up to 2% at the first adjustment, up
                  to 2% at each subsequent adjustment, and up to 5% over the
                  life of the loan. A{" "}
                  <strong className="text-text-primary">5/2/5 cap</strong>{" "}
                  allows a larger initial adjustment of up to 5%, which is
                  common on 7/1 and 10/1 ARMs with longer fixed periods.
                </p>
                <p>
                  For example, if you start a 5/1 ARM at 5.5% with a 2/2/5 cap
                  structure, your rate can never exceed 10.5% (5.5% + 5%
                  lifetime cap), and it cannot jump by more than 2% at any
                  single adjustment.
                </p>
              </div>
            </section>

            {/* -- Section 4: Side-by-Side Comparison -- */}
            <section
              id="side-by-side-comparison"
              className="mt-14 scroll-mt-24"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Side-by-Side Comparison
              </h2>
              <p className="mt-4 text-text-muted leading-relaxed">
                Here is how fixed-rate mortgages and adjustable-rate mortgages
                compare across the factors that matter most to borrowers.
              </p>
              <div className="mt-8 overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-bg-surface">
                      <th className="px-5 py-4 text-left font-display font-semibold text-text-primary">
                        Factor
                      </th>
                      <th className="px-5 py-4 text-right font-display font-semibold text-accent-secondary">
                        Fixed Rate
                      </th>
                      <th className="px-5 py-4 text-right font-display font-semibold text-accent-primary">
                        ARM (5/1)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      {
                        label: "Initial rate",
                        fixed: "Higher (e.g., 6.5%)",
                        arm: "Lower (e.g., 5.5%)",
                      },
                      {
                        label: "Rate stability",
                        fixed: "Locked for full term",
                        arm: "Fixed 5 yrs, then annual",
                      },
                      {
                        label: "Payment predictability",
                        fixed: "Fully predictable",
                        arm: "Predictable initially, then variable",
                      },
                      {
                        label: "Best when rates are...",
                        fixed: "Low or rising",
                        arm: "High or falling",
                      },
                      {
                        label: "Risk level",
                        fixed: "Low",
                        arm: "Moderate to high",
                      },
                      {
                        label: "Total interest if rates rise",
                        fixed: "Unaffected",
                        arm: "Increases significantly",
                      },
                      {
                        label: "Total interest if rates stay flat",
                        fixed: "Higher than ARM",
                        arm: "Lower than fixed",
                      },
                      {
                        label: "Total interest if rates fall",
                        fixed: "Higher (unless refinanced)",
                        arm: "Decreases automatically",
                      },
                      {
                        label: "Refinance pressure",
                        fixed: "None",
                        arm: "High near first adjustment",
                      },
                    ].map((row) => (
                      <tr
                        key={row.label}
                        className="transition-colors hover:bg-bg-surface/60"
                      >
                        <td className="px-5 py-3.5 text-text-primary font-medium">
                          {row.label}
                        </td>
                        <td className="px-5 py-3.5 text-right text-text-muted">
                          {row.fixed}
                        </td>
                        <td className="px-5 py-3.5 text-right text-text-muted">
                          {row.arm}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-text-muted">
                * Comparison assumes a 30-year fixed at 6.5% vs. a 5/1 ARM
                starting at 5.5% with a 2/2/5 cap structure. Actual rates and
                terms vary by lender, credit profile, and market conditions.
              </p>
            </section>

            {/* -- Section 5: When to Choose Fixed Rate -- */}
            <section
              id="when-to-choose-fixed"
              className="mt-14 scroll-mt-24"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight">
                When to Choose a Fixed-Rate Mortgage
              </h2>
              <ul className="mt-6 space-y-5">
                {[
                  {
                    title: "You plan to stay in the home for 10+ years",
                    text: "The longer you hold a mortgage, the more you benefit from rate certainty. Over a 10-, 20-, or 30-year horizon, an ARM has plenty of time to adjust upward, potentially costing you far more than a fixed rate would have. If this is your forever home (or close to it), fixed is the safer bet.",
                  },
                  {
                    title: "You value payment stability above all else",
                    text: "If knowing your exact housing payment every month for the next 30 years gives you peace of mind, a fixed-rate mortgage delivers that. There is no need to watch interest rate markets, worry about adjustment dates, or plan a refinance strategy.",
                  },
                  {
                    title: "Interest rates are historically low",
                    text: "When rates are at or near historic lows, locking in a fixed rate lets you benefit from those low rates for decades. If rates rise later, you are protected. If they fall further, you can always refinance.",
                  },
                  {
                    title: "You are risk averse",
                    text: "If uncertainty about future payments would cause you stress or if your budget has little room for a payment increase, a fixed-rate mortgage eliminates that risk entirely. You will never face a payment shock.",
                  },
                  {
                    title: "Budgeting is a top priority",
                    text: "For households on a strict budget or with a fixed income (such as retirees), the predictability of a fixed-rate mortgage makes long-term financial planning significantly easier. You can plan years ahead knowing your principal and interest payment will not change.",
                  },
                ].map((item) => (
                  <li
                    key={item.title}
                    className="rounded-xl border border-border bg-bg-surface p-5"
                  >
                    <h3 className="font-display text-base font-semibold text-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-muted leading-relaxed">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {/* -- Section 6: When to Choose ARM -- */}
            <section id="when-to-choose-arm" className="mt-14 scroll-mt-24">
              <h2 className="font-display text-2xl font-bold tracking-tight">
                When to Choose an Adjustable-Rate Mortgage
              </h2>
              <ul className="mt-6 space-y-5">
                {[
                  {
                    title: "You plan to sell or refinance within 5-7 years",
                    text: "If you know you will move for a job, upsize for a growing family, or refinance before the fixed period ends, an ARM lets you capture the lower initial rate without ever experiencing an adjustment. This is the single most common reason borrowers choose ARMs.",
                  },
                  {
                    title: "You expect interest rates to fall",
                    text: "If current rates are elevated and you believe they will decline over the next several years, an ARM positions you to benefit automatically. As the underlying index drops, your rate adjusts downward without requiring a refinance.",
                  },
                  {
                    title: "You want lower initial monthly payments",
                    text: "The rate discount on an ARM (often 0.5-1.0% lower than fixed) translates to real savings. On a $400,000 loan, a 1% rate difference means roughly $260 less per month. If cash flow is tight in the early years of homeownership, an ARM provides breathing room.",
                  },
                  {
                    title: "You are confident in income growth",
                    text: "If your career trajectory strongly suggests higher earnings in the years ahead (for example, a medical resident, early-career attorney, or someone in a rapidly growing field), the risk of a future rate increase is offset by your growing ability to absorb it.",
                  },
                  {
                    title: "You are comfortable with calculated risk",
                    text: "ARMs are not reckless gambles. With rate caps limiting worst-case scenarios and the ability to refinance, informed borrowers can use ARMs strategically. If you understand the mechanics and have a plan for each scenario, an ARM can save you tens of thousands of dollars.",
                  },
                ].map((item) => (
                  <li
                    key={item.title}
                    className="rounded-xl border border-border bg-bg-surface p-5"
                  >
                    <h3 className="font-display text-base font-semibold text-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-muted leading-relaxed">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {/* -- Section 7: Real-World Scenarios -- */}
            <section
              id="real-world-scenarios"
              className="mt-14 scroll-mt-24"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight">
                The Math: Real-World Scenarios
              </h2>
              <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
                <p>
                  To make this concrete, let us compare a{" "}
                  <strong className="text-text-primary">$400,000 loan</strong>{" "}
                  over 30 years with two options: a{" "}
                  <strong className="text-accent-secondary">
                    6.5% fixed-rate mortgage
                  </strong>{" "}
                  and a{" "}
                  <strong className="text-accent-primary">
                    5.5% 5/1 ARM
                  </strong>{" "}
                  with a 2/2/5 cap structure and a 2.75% margin. We will model
                  three rate scenarios after the ARM&apos;s initial 5-year fixed
                  period.
                </p>
              </div>

              <div className="mt-8 space-y-6">
                {/* Scenario 1: Rates Rise */}
                <div className="rounded-xl border border-border bg-bg-surface p-6">
                  <h3 className="font-display text-base font-semibold text-text-primary">
                    Scenario 1: Rates Rise 2% After Year 5
                  </h3>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed">
                    The ARM adjusts from 5.5% up to 7.5% at year 6 (hitting the
                    2% initial cap), then holds steady as market rates plateau.
                  </p>
                  <div className="mt-4 overflow-x-auto rounded-lg border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-bg-surface">
                          <th className="px-4 py-3 text-left font-display font-semibold text-text-primary">
                            Metric
                          </th>
                          <th className="px-4 py-3 text-right font-display font-semibold text-accent-secondary">
                            Fixed 6.5%
                          </th>
                          <th className="px-4 py-3 text-right font-display font-semibold text-accent-primary">
                            5/1 ARM
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {[
                          {
                            label: "Monthly payment (Yrs 1-5)",
                            fixed: "$2,528",
                            arm: "$2,271",
                          },
                          {
                            label: "Monthly payment (Yrs 6-30)",
                            fixed: "$2,528",
                            arm: "$2,724",
                          },
                          {
                            label: "Total interest paid",
                            fixed: "$510,177",
                            arm: "$541,980",
                          },
                          {
                            label: "5-year savings with ARM",
                            fixed: "-",
                            arm: "$15,420",
                          },
                          {
                            label: "30-year difference",
                            fixed: "-",
                            arm: "ARM costs $31,803 more",
                          },
                        ].map((row) => (
                          <tr
                            key={row.label}
                            className="transition-colors hover:bg-bg-surface/60"
                          >
                            <td className="px-4 py-3 text-text-primary font-medium">
                              {row.label}
                            </td>
                            <td className="px-4 py-3 text-right text-text-muted">
                              {row.fixed}
                            </td>
                            <td className="px-4 py-3 text-right text-text-muted">
                              {row.arm}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-xs text-text-muted">
                    In a rising-rate environment, the fixed-rate mortgage saves
                    you roughly $31,800 over 30 years. However, if you sell or
                    refinance before year 6, the ARM saves you over $15,000.
                  </p>
                </div>

                {/* Scenario 2: Rates Stay Flat */}
                <div className="rounded-xl border border-border bg-bg-surface p-6">
                  <h3 className="font-display text-base font-semibold text-text-primary">
                    Scenario 2: Rates Stay Flat
                  </h3>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed">
                    The ARM adjusts based on the index but the index remains
                    stable. The ARM rate stays near 5.5% throughout.
                  </p>
                  <div className="mt-4 overflow-x-auto rounded-lg border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-bg-surface">
                          <th className="px-4 py-3 text-left font-display font-semibold text-text-primary">
                            Metric
                          </th>
                          <th className="px-4 py-3 text-right font-display font-semibold text-accent-secondary">
                            Fixed 6.5%
                          </th>
                          <th className="px-4 py-3 text-right font-display font-semibold text-accent-primary">
                            5/1 ARM
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {[
                          {
                            label: "Monthly payment (all years)",
                            fixed: "$2,528",
                            arm: "$2,271",
                          },
                          {
                            label: "Total interest paid",
                            fixed: "$510,177",
                            arm: "$417,506",
                          },
                          {
                            label: "30-year savings with ARM",
                            fixed: "-",
                            arm: "$92,671",
                          },
                        ].map((row) => (
                          <tr
                            key={row.label}
                            className="transition-colors hover:bg-bg-surface/60"
                          >
                            <td className="px-4 py-3 text-text-primary font-medium">
                              {row.label}
                            </td>
                            <td className="px-4 py-3 text-right text-text-muted">
                              {row.fixed}
                            </td>
                            <td className="px-4 py-3 text-right text-text-muted">
                              {row.arm}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-xs text-text-muted">
                    If rates hold steady, the ARM saves you nearly $93,000 over
                    30 years &mdash; a massive difference driven entirely by the
                    1% rate gap.
                  </p>
                </div>

                {/* Scenario 3: Rates Drop */}
                <div className="rounded-xl border border-border bg-bg-surface p-6">
                  <h3 className="font-display text-base font-semibold text-text-primary">
                    Scenario 3: Rates Drop 1% After Year 5
                  </h3>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed">
                    The index falls, and the ARM adjusts down to approximately
                    4.5% at year 6.
                  </p>
                  <div className="mt-4 overflow-x-auto rounded-lg border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-bg-surface">
                          <th className="px-4 py-3 text-left font-display font-semibold text-text-primary">
                            Metric
                          </th>
                          <th className="px-4 py-3 text-right font-display font-semibold text-accent-secondary">
                            Fixed 6.5%
                          </th>
                          <th className="px-4 py-3 text-right font-display font-semibold text-accent-primary">
                            5/1 ARM
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {[
                          {
                            label: "Monthly payment (Yrs 1-5)",
                            fixed: "$2,528",
                            arm: "$2,271",
                          },
                          {
                            label: "Monthly payment (Yrs 6-30)",
                            fixed: "$2,528",
                            arm: "$1,965",
                          },
                          {
                            label: "Total interest paid",
                            fixed: "$510,177",
                            arm: "$348,240",
                          },
                          {
                            label: "30-year savings with ARM",
                            fixed: "-",
                            arm: "$161,937",
                          },
                        ].map((row) => (
                          <tr
                            key={row.label}
                            className="transition-colors hover:bg-bg-surface/60"
                          >
                            <td className="px-4 py-3 text-text-primary font-medium">
                              {row.label}
                            </td>
                            <td className="px-4 py-3 text-right text-text-muted">
                              {row.fixed}
                            </td>
                            <td className="px-4 py-3 text-right text-text-muted">
                              {row.arm}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-xs text-text-muted">
                    In a falling-rate scenario, the ARM saves you over $161,000
                    over the life of the loan. The ARM borrower benefits
                    automatically, while the fixed-rate borrower would need to
                    refinance (and pay closing costs) to capture lower rates.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-accent-primary/30 bg-accent-primary/5 p-6">
                <p className="font-display text-base font-semibold text-accent-primary">
                  Key Takeaway
                </p>
                <p className="mt-3 text-sm text-text-muted leading-relaxed">
                  The ARM wins in two out of three scenarios and loses in one.
                  But the scenario where the ARM loses (rising rates) is the one
                  where borrowers feel the most pain, because it combines higher
                  payments with the stress of uncertainty. Your decision should
                  be based not just on which scenario you think is most likely,
                  but on which downside scenario you can tolerate.
                </p>
              </div>
            </section>

            {/* -- Section 8: CTA -- */}
            <section id="use-our-calculators" className="mt-14 scroll-mt-24">
              <div className="rounded-2xl border border-accent-primary/30 bg-accent-primary/5 p-8 sm:p-10 text-center">
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">
                  Model Your Own Mortgage Scenarios
                </h2>
                <p className="mt-3 mx-auto max-w-lg text-text-muted leading-relaxed">
                  Use our free calculators to compare fixed and adjustable-rate
                  options with your exact loan amount, rates, and timeline. See
                  monthly payments, total interest, and amortization schedules
                  side by side.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/calculators/mortgage-calculator"
                    className="inline-flex items-center gap-2 rounded-xl bg-accent-primary px-8 py-3.5 text-base font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-primary/90 hover:shadow-lg hover:shadow-accent-primary/20"
                  >
                    Mortgage Calculator
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href="/calculators/home-affordability-calculator"
                    className="inline-flex items-center gap-2 rounded-xl border border-accent-primary text-accent-primary px-8 py-3.5 text-base font-semibold transition-all duration-200 hover:bg-accent-primary/10"
                  >
                    Home Affordability Calculator
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </section>

            {/* -- Ad Unit -- */}
            <AdUnit className="mt-12" />

            {/* -- Section 9: FAQ -- */}
            <section id="faq" className="mt-14 scroll-mt-24">
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="mt-6 space-y-4">
                {faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="rounded-xl border border-border bg-bg-surface p-6"
                  >
                    <h3 className="font-display text-base font-semibold text-text-primary">
                      {faq.question}
                    </h3>
                    <p className="mt-3 text-sm text-text-muted leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* -- Related Guides -- */}
            <div className="mt-16 border-t border-border pt-10">
              <p className="font-display text-xs font-semibold uppercase tracking-wider text-accent-secondary">
                Related Guides
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/calculators/mortgage-calculator"
                  className="rounded-lg border border-border bg-bg-surface px-4 py-2 text-sm text-text-muted transition-colors hover:text-accent-primary hover:border-accent-primary/50"
                >
                  Mortgage Calculator
                </Link>
                <Link
                  href="/calculators/home-affordability-calculator"
                  className="rounded-lg border border-border bg-bg-surface px-4 py-2 text-sm text-text-muted transition-colors hover:text-accent-primary hover:border-accent-primary/50"
                >
                  Home Affordability Calculator
                </Link>
                <Link
                  href="/compare/rent-vs-buy"
                  className="rounded-lg border border-border bg-bg-surface px-4 py-2 text-sm text-text-muted transition-colors hover:text-accent-primary hover:border-accent-primary/50"
                >
                  Rent vs Buy Guide
                </Link>
                <Link
                  href="/compare"
                  className="rounded-lg border border-border bg-bg-surface px-4 py-2 text-sm text-text-muted transition-colors hover:text-accent-primary hover:border-accent-primary/50"
                >
                  All Guides
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
