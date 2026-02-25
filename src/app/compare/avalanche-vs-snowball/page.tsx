import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Avalanche vs Snowball Method: Which Debt Payoff Strategy Is Best? | CalcEngine",
  description:
    "Compare the debt avalanche and debt snowball methods side by side. Learn which payoff strategy saves the most money, which keeps you motivated, and how to choose the right one for your situation.",
  openGraph: {
    title: "Avalanche vs Snowball Method: Which Debt Payoff Strategy Is Best?",
    description:
      "Compare the debt avalanche and debt snowball methods side by side. Learn which saves the most money and which keeps you motivated.",
    url: "https://calcengine.io/compare/avalanche-vs-snowball",
    type: "article",
  },
  alternates: {
    canonical: "/compare/avalanche-vs-snowball",
  },
};

/* ─── Table of Contents ─── */

const tocItems = [
  { id: "introduction", label: "Introduction" },
  { id: "avalanche-method-explained", label: "The Avalanche Method" },
  { id: "snowball-method-explained", label: "The Snowball Method" },
  { id: "side-by-side-comparison", label: "Side-by-Side Comparison" },
  { id: "real-world-example", label: "Real-World Example" },
  { id: "when-to-choose-avalanche", label: "When to Choose Avalanche" },
  { id: "when-to-choose-snowball", label: "When to Choose Snowball" },
  { id: "hybrid-approach", label: "The Hybrid Approach" },
  { id: "try-our-calculators", label: "Try Our Calculators" },
  { id: "faq", label: "FAQ" },
];

/* ─── FAQ Data ─── */

const faqs = [
  {
    question: "How much more does the snowball method cost in interest?",
    answer:
      "It depends on the size of your debts and the spread between your interest rates. In most cases, the snowball method costs between 2% and 10% more in total interest compared to the avalanche method. If your interest rates are clustered close together (for example, all between 5% and 8%), the difference may be negligible. But if you have a mix of low-rate student loans and high-rate credit cards, the avalanche method could save you hundreds or even thousands of dollars over the life of your payoff plan.",
  },
  {
    question: "Which method pays off debt faster?",
    answer:
      "Both methods can result in similar total payoff timelines because the difference is not how much you pay each month, but where you direct the extra payment. The avalanche method eliminates the most expensive debt first, so it reduces total interest and can sometimes shave a few months off the payoff timeline. However, the difference in total time is usually smaller than people expect. The real distinction is in the order individual debts are eliminated, not necessarily the final payoff date.",
  },
  {
    question: "Can I switch methods mid-payoff?",
    answer:
      "Absolutely. There is no penalty for switching strategies. Many people start with the snowball method to build momentum, then switch to the avalanche method once they have the confidence and discipline to stay the course. The most important thing is that you keep making consistent extra payments toward your debt. Switching methods mid-plan is far better than abandoning your payoff plan altogether.",
  },
  {
    question: "What about debt consolidation instead?",
    answer:
      "Debt consolidation rolls multiple debts into a single loan, ideally at a lower interest rate. It can simplify your payments and reduce interest, but it does not reduce the principal you owe. Consolidation works best when you qualify for a significantly lower rate and you have the discipline not to rack up new debt on the accounts you just paid off. You can use consolidation alongside either the avalanche or snowball approach if you have remaining debts after consolidating.",
  },
  {
    question: "Should I build savings or pay off debt first?",
    answer:
      "Most financial experts recommend building a small emergency fund of $1,000 to $2,000 before aggressively paying off debt. This buffer prevents you from going deeper into debt when unexpected expenses arise. After that, focus on paying off high-interest debt (anything above 7-8%) before prioritizing additional savings. Once your high-interest debt is gone, you can split extra money between building a full 3-6 month emergency fund and paying down remaining low-interest debt.",
  },
];

/* ─── JSON-LD Article Schema ─── */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Avalanche vs Snowball Method: Which Debt Payoff Strategy Is Best?",
  description:
    "Compare the debt avalanche and debt snowball methods side by side. Learn which payoff strategy saves the most money, which keeps you motivated, and how to choose the right one for your situation.",
  author: {
    "@type": "Organization",
    name: "CalcEngine",
    url: "https://calcengine.io",
  },
  publisher: {
    "@type": "Organization",
    name: "CalcEngine",
    url: "https://calcengine.io",
  },
  datePublished: "2026-02-24",
  dateModified: "2026-02-24",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://calcengine.io/compare/avalanche-vs-snowball",
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

/* ─── Page Component ─── */

export default function AvalancheVsSnowballGuidePage() {
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

      {/* ─── Breadcrumbs ─── */}
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
            Avalanche vs Snowball Method
          </li>
        </ol>
      </nav>

      {/* ─── Main Layout ─── */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-12">
          {/* ─── Sidebar / Table of Contents (sticky on desktop) ─── */}
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

          {/* ─── Article Content ─── */}
          <article className="max-w-3xl">
            {/* Title */}
            <header>
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Avalanche vs Snowball:{" "}
                <span className="text-accent-primary">
                  Which Debt Payoff Strategy Is Best?
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

            {/* ── Section 1: Introduction ── */}
            <section id="introduction" className="mt-12 scroll-mt-24">
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Introduction
              </h2>
              <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
                <p>
                  When you owe money on multiple debts &mdash; credit cards,
                  student loans, car payments, personal loans &mdash; making the
                  minimum payment on each one barely moves the needle. The real
                  progress happens when you direct extra money toward one debt at
                  a time while keeping the others current. But which debt should
                  you target first?
                </p>
                <p>
                  The two most popular answers to that question are the{" "}
                  <strong className="text-text-primary">
                    debt avalanche method
                  </strong>{" "}
                  and the{" "}
                  <strong className="text-text-primary">
                    debt snowball method
                  </strong>
                  . Both strategies use the same core principle &mdash;
                  concentrate extra payments on a single debt until it is gone,
                  then roll that payment into the next &mdash; but they differ in
                  how they choose the target. Each approach has distinct
                  advantages, and the best choice depends on your financial
                  profile, personality, and motivation style.
                </p>
                <p>
                  This guide explains exactly how each method works, compares
                  them head to head with a real-world example, and helps you
                  decide which strategy &mdash; or which combination of both
                  &mdash; will get you debt-free the fastest.
                </p>
              </div>
            </section>

            {/* ── Section 2: The Avalanche Method Explained ── */}
            <section
              id="avalanche-method-explained"
              className="mt-14 scroll-mt-24"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight">
                The Avalanche Method Explained
              </h2>
              <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
                <p>
                  The debt avalanche method targets the debt with the{" "}
                  <strong className="text-text-primary">
                    highest interest rate
                  </strong>{" "}
                  first, regardless of balance. You make minimum payments on
                  every debt, then funnel all remaining extra money toward the
                  highest-rate account. Once that debt is eliminated, you move to
                  the debt with the next-highest rate, carrying forward all the
                  money you were paying on the first.
                </p>
                <div className="rounded-xl border border-accent-primary/30 bg-accent-primary/5 p-6">
                  <p className="font-display text-base font-semibold text-accent-primary">
                    How It Works
                  </p>
                  <ol className="mt-3 ml-4 list-decimal space-y-2 text-sm text-text-muted">
                    <li>
                      List all debts from{" "}
                      <strong className="text-text-primary">
                        highest interest rate to lowest
                      </strong>
                      .
                    </li>
                    <li>Make minimum payments on every debt.</li>
                    <li>
                      Put all extra money toward the debt with the highest rate.
                    </li>
                    <li>
                      When that debt is paid off, roll its payment into the
                      next-highest-rate debt.
                    </li>
                    <li>Repeat until all debts are eliminated.</li>
                  </ol>
                </div>
                <p>
                  The avalanche method is{" "}
                  <strong className="text-text-primary">
                    mathematically optimal
                  </strong>
                  . By eliminating the most expensive debt first, you minimize
                  the total interest you pay over the life of your payoff plan.
                  For people with a wide spread between their highest and lowest
                  interest rates &mdash; say a 24% credit card alongside a 5%
                  student loan &mdash; the savings can be substantial.
                </p>
                <p>
                  The potential downside is psychological. If your highest-rate
                  debt also happens to have a large balance, it could take months
                  or even years before you see that first account hit zero. For
                  some people, this long wait erodes motivation and makes it
                  harder to stick with the plan.
                </p>
              </div>
            </section>

            {/* ── Section 3: The Snowball Method Explained ── */}
            <section
              id="snowball-method-explained"
              className="mt-14 scroll-mt-24"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight">
                The Snowball Method Explained
              </h2>
              <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
                <p>
                  The debt snowball method, popularized by personal finance
                  author Dave Ramsey, targets the debt with the{" "}
                  <strong className="text-text-primary">
                    smallest balance
                  </strong>{" "}
                  first, regardless of interest rate. You make minimum payments
                  on all debts, then throw every extra dollar at the smallest
                  balance. Once that debt is gone, you roll its payment into the
                  next-smallest debt, creating a snowball effect as your payment
                  amount grows with each account you eliminate.
                </p>
                <div className="rounded-xl border border-accent-secondary/30 bg-accent-secondary/5 p-6">
                  <p className="font-display text-base font-semibold text-accent-secondary">
                    How It Works
                  </p>
                  <ol className="mt-3 ml-4 list-decimal space-y-2 text-sm text-text-muted">
                    <li>
                      List all debts from{" "}
                      <strong className="text-text-primary">
                        smallest balance to largest
                      </strong>
                      .
                    </li>
                    <li>Make minimum payments on every debt.</li>
                    <li>
                      Put all extra money toward the debt with the smallest
                      balance.
                    </li>
                    <li>
                      When that debt is paid off, roll its payment into the
                      next-smallest debt.
                    </li>
                    <li>Repeat until all debts are eliminated.</li>
                  </ol>
                </div>
                <p>
                  The snowball method is{" "}
                  <strong className="text-text-primary">
                    psychologically powerful
                  </strong>
                  . Research from the Harvard Business Review and the Kellogg
                  School of Management has found that people who pay off small
                  debts first are more likely to eliminate all their debt because
                  the quick wins sustain motivation. Each zeroed-out account
                  creates a sense of progress that fuels continued effort.
                </p>
                <p>
                  The trade-off is cost. By ignoring interest rates, you may
                  leave expensive debt accruing interest longer than necessary.
                  This means you will typically pay more in total interest
                  compared to the avalanche method &mdash; though the difference
                  is often smaller than people assume, especially when interest
                  rates are clustered together.
                </p>
              </div>
            </section>

            {/* ── Section 4: Side-by-Side Comparison ── */}
            <section
              id="side-by-side-comparison"
              className="mt-14 scroll-mt-24"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Side-by-Side Comparison
              </h2>
              <p className="mt-4 text-text-muted leading-relaxed">
                Here is a direct comparison of the two strategies across the
                factors that matter most when choosing a debt payoff method.
              </p>
              <div className="mt-8 overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-bg-surface">
                      <th className="px-5 py-4 text-left font-display font-semibold text-text-primary">
                        Factor
                      </th>
                      <th className="px-5 py-4 text-right font-display font-semibold text-accent-primary">
                        Avalanche
                      </th>
                      <th className="px-5 py-4 text-right font-display font-semibold text-accent-secondary">
                        Snowball
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      {
                        label: "Ordering criteria",
                        avalanche: "Highest interest rate first",
                        snowball: "Smallest balance first",
                      },
                      {
                        label: "Total interest paid",
                        avalanche: "Lowest possible",
                        snowball: "Slightly higher",
                      },
                      {
                        label: "Overall payoff speed",
                        avalanche: "Slightly faster",
                        snowball: "Slightly slower",
                      },
                      {
                        label: "Psychological benefit",
                        avalanche: "Lower (delayed wins)",
                        snowball: "Higher (quick wins)",
                      },
                      {
                        label: "Best personality fit",
                        avalanche: "Disciplined, analytical",
                        snowball: "Motivated by progress",
                      },
                      {
                        label: "Total cost",
                        avalanche: "Lowest",
                        snowball: "Marginally higher",
                      },
                      {
                        label: 'First "win" timing',
                        avalanche: "Depends on top-rate balance",
                        snowball: "As fast as possible",
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
                          {row.avalanche}
                        </td>
                        <td className="px-5 py-3.5 text-right text-text-muted">
                          {row.snowball}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-text-muted">
                * The differences in total interest and payoff speed depend
                heavily on the specific balances and rates in your debt profile.
                When rates are similar, the methods produce nearly identical
                results.
              </p>
            </section>

            {/* ── Section 5: Real-World Example ── */}
            <section id="real-world-example" className="mt-14 scroll-mt-24">
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Real-World Example
              </h2>
              <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
                <p>
                  Let&apos;s walk through a concrete scenario. Suppose you have
                  four debts and can put an extra $300/month toward debt payoff
                  beyond your minimum payments:
                </p>
              </div>

              {/* Debt table */}
              <div className="mt-6 overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-bg-surface">
                      <th className="px-5 py-4 text-left font-display font-semibold text-text-primary">
                        Debt
                      </th>
                      <th className="px-5 py-4 text-right font-display font-semibold text-text-primary">
                        Balance
                      </th>
                      <th className="px-5 py-4 text-right font-display font-semibold text-text-primary">
                        APR
                      </th>
                      <th className="px-5 py-4 text-right font-display font-semibold text-text-primary">
                        Min. Payment
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      {
                        name: "Credit Card",
                        balance: "$500",
                        apr: "24%",
                        min: "$25",
                      },
                      {
                        name: "Personal Loan",
                        balance: "$3,000",
                        apr: "12%",
                        min: "$100",
                      },
                      {
                        name: "Car Loan",
                        balance: "$8,000",
                        apr: "6%",
                        min: "$200",
                      },
                      {
                        name: "Student Loan",
                        balance: "$25,000",
                        apr: "5%",
                        min: "$280",
                      },
                    ].map((row) => (
                      <tr
                        key={row.name}
                        className="transition-colors hover:bg-bg-surface/60"
                      >
                        <td className="px-5 py-3.5 text-text-primary font-medium">
                          {row.name}
                        </td>
                        <td className="px-5 py-3.5 text-right text-text-muted">
                          {row.balance}
                        </td>
                        <td className="px-5 py-3.5 text-right text-text-muted">
                          {row.apr}
                        </td>
                        <td className="px-5 py-3.5 text-right text-text-muted">
                          {row.min}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {/* Avalanche order */}
                <div className="rounded-xl border border-accent-primary/30 bg-accent-primary/5 p-6">
                  <p className="font-display text-base font-semibold text-accent-primary">
                    Avalanche Order
                  </p>
                  <p className="mt-1 text-xs text-text-muted">
                    Highest interest rate first
                  </p>
                  <ol className="mt-4 ml-4 list-decimal space-y-1.5 text-sm text-text-muted">
                    <li>
                      <strong className="text-text-primary">
                        Credit Card
                      </strong>{" "}
                      &mdash; 24% APR, $500
                    </li>
                    <li>
                      <strong className="text-text-primary">
                        Personal Loan
                      </strong>{" "}
                      &mdash; 12% APR, $3,000
                    </li>
                    <li>
                      <strong className="text-text-primary">Car Loan</strong>{" "}
                      &mdash; 6% APR, $8,000
                    </li>
                    <li>
                      <strong className="text-text-primary">
                        Student Loan
                      </strong>{" "}
                      &mdash; 5% APR, $25,000
                    </li>
                  </ol>
                  <div className="mt-5 rounded-lg bg-accent-primary/10 px-4 py-3">
                    <p className="text-sm font-medium text-accent-primary">
                      Total interest paid: ~$3,820
                    </p>
                    <p className="mt-1 text-xs text-text-muted">
                      First debt eliminated in ~2 months
                    </p>
                  </div>
                </div>

                {/* Snowball order */}
                <div className="rounded-xl border border-accent-secondary/30 bg-accent-secondary/5 p-6">
                  <p className="font-display text-base font-semibold text-accent-secondary">
                    Snowball Order
                  </p>
                  <p className="mt-1 text-xs text-text-muted">
                    Smallest balance first
                  </p>
                  <ol className="mt-4 ml-4 list-decimal space-y-1.5 text-sm text-text-muted">
                    <li>
                      <strong className="text-text-primary">
                        Credit Card
                      </strong>{" "}
                      &mdash; $500, 24% APR
                    </li>
                    <li>
                      <strong className="text-text-primary">
                        Personal Loan
                      </strong>{" "}
                      &mdash; $3,000, 12% APR
                    </li>
                    <li>
                      <strong className="text-text-primary">Car Loan</strong>{" "}
                      &mdash; $8,000, 6% APR
                    </li>
                    <li>
                      <strong className="text-text-primary">
                        Student Loan
                      </strong>{" "}
                      &mdash; $25,000, 5% APR
                    </li>
                  </ol>
                  <div className="mt-5 rounded-lg bg-accent-secondary/10 px-4 py-3">
                    <p className="text-sm font-medium text-accent-secondary">
                      Total interest paid: ~$3,990
                    </p>
                    <p className="mt-1 text-xs text-text-muted">
                      First debt eliminated in ~2 months
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-text-muted leading-relaxed">
                <p>
                  In this example, both methods happen to pay off the credit
                  card first because it has both the smallest balance and the
                  highest rate. The methods diverge on the second target: the
                  avalanche method tackles the personal loan next (12% rate),
                  while the snowball method does the same here since the personal
                  loan is also the next-smallest balance.
                </p>
                <p>
                  The real divergence would appear if the balances and rates were
                  ordered differently. For instance, if the student loan carried
                  the highest rate, the avalanche method would target that
                  $25,000 balance first, meaning you would not see a debt
                  eliminated for over two years. The snowball method would still
                  start with the $500 credit card, giving you a win within
                  months.
                </p>
                <p>
                  The total interest difference in this scenario is roughly{" "}
                  <strong className="text-text-primary">$170</strong> &mdash;
                  meaningful but not dramatic. In debt profiles with wider rate
                  spreads or larger balances, the gap can stretch into the
                  thousands.
                </p>
              </div>
            </section>

            {/* ── Section 6: When to Choose Avalanche ── */}
            <section
              id="when-to-choose-avalanche"
              className="mt-14 scroll-mt-24"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight">
                When to Choose the Avalanche Method
              </h2>
              <ul className="mt-6 space-y-5">
                {[
                  {
                    title: "You are disciplined with money",
                    text: "If you already track your spending, follow a budget, and do not need external motivation to stay on track, the avalanche method rewards your discipline with the lowest possible interest cost. You are the type of person who can grind away at a large balance for months without losing momentum.",
                  },
                  {
                    title: "You are motivated by math, not milestones",
                    text: "If knowing you are saving the maximum amount of money keeps you going more than crossing debts off a list, the avalanche method aligns with your mindset. You find satisfaction in watching total interest shrink, even if individual accounts stick around longer.",
                  },
                  {
                    title: "There is a large gap between your interest rates",
                    text: "When you have a 24% credit card alongside a 5% student loan, the avalanche method shines. The wider the spread between your highest and lowest rates, the more money the avalanche approach saves you. If rates are clustered close together, the advantage diminishes.",
                  },
                  {
                    title: "You already have debt payoff momentum",
                    text: "If you have already paid off a debt or two and have proven you can stick with a plan, you do not need the motivational boost of quick wins. You can afford to optimize for cost and let the math guide your strategy.",
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

            {/* ── Section 7: When to Choose Snowball ── */}
            <section
              id="when-to-choose-snowball"
              className="mt-14 scroll-mt-24"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight">
                When to Choose the Snowball Method
              </h2>
              <ul className="mt-6 space-y-5">
                {[
                  {
                    title: "You need early wins to stay motivated",
                    text: "If you are the kind of person who thrives on visible progress, the snowball method delivers. Eliminating a small debt in the first month or two creates a genuine sense of accomplishment that keeps you engaged with the plan. Behavioral research consistently shows that perceived progress is one of the strongest predictors of follow-through.",
                  },
                  {
                    title: "Your interest rates are similar",
                    text: "When your debts all carry rates within a few percentage points of each other (for example, everything between 5% and 8%), the avalanche method barely saves you anything over the snowball method. In this situation, you might as well take the psychological benefits of quick wins since the interest cost is nearly identical either way.",
                  },
                  {
                    title:
                      "You have a history of giving up on payoff plans",
                    text: "If you have tried to pay off debt before and abandoned the plan halfway through, the snowball method addresses the root cause. The problem was never the math, it was the motivation. Quick wins create a positive feedback loop that makes it harder to quit. The best debt payoff strategy is the one you actually complete.",
                  },
                  {
                    title: "You have an emotional relationship with debt",
                    text: "If your debt causes you stress, anxiety, or shame, reducing the number of accounts you owe on can provide real psychological relief. Going from six debts to four feels like progress in a way that reducing a single large balance by 15% does not. The snowball method shrinks your debt count as quickly as possible.",
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

            {/* ── Section 8: The Hybrid Approach ── */}
            <section id="hybrid-approach" className="mt-14 scroll-mt-24">
              <h2 className="font-display text-2xl font-bold tracking-tight">
                The Hybrid Approach
              </h2>
              <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
                <p>
                  You do not have to commit entirely to one method. Many
                  financial advisors recommend a hybrid approach that captures
                  the best of both worlds: use the snowball method for a quick
                  motivational win, then switch to the avalanche method to
                  minimize cost on the remaining debts.
                </p>
                <div className="rounded-xl border border-accent-primary/30 bg-accent-primary/5 p-6">
                  <p className="font-display text-base font-semibold text-accent-primary">
                    The Hybrid Strategy
                  </p>
                  <ol className="mt-3 ml-4 list-decimal space-y-2 text-sm text-text-muted">
                    <li>
                      <strong className="text-text-primary">
                        Start with your smallest debt
                      </strong>{" "}
                      to get a fast win and build confidence (snowball).
                    </li>
                    <li>
                      <strong className="text-text-primary">
                        Switch to highest-rate ordering
                      </strong>{" "}
                      for all remaining debts (avalanche).
                    </li>
                    <li>
                      Enjoy the motivation of an early payoff{" "}
                      <em>and</em> the interest savings of rate-based
                      prioritization.
                    </li>
                  </ol>
                </div>
                <p>
                  Using the example above, you would pay off the $500 credit
                  card first (which happens to be both the smallest balance and
                  the highest rate), then switch to ordering by rate for the
                  remaining three debts. In scenarios where the smallest balance
                  and highest rate are different accounts, the hybrid approach
                  sacrifices a small amount of interest savings in exchange for
                  an early motivational boost.
                </p>
                <p>
                  The hybrid approach is especially effective if you have one
                  very small debt (under $1,000) that can be wiped out in a
                  month or two. The cost of delaying your highest-rate debt by
                  that short a period is minimal, and the psychological payoff
                  of immediately reducing your number of debts can be
                  significant.
                </p>
                <p>
                  Ultimately, the most important factor is not which method you
                  choose &mdash; it is that you pick a strategy and stick with
                  it. Any systematic extra payment approach will get you
                  debt-free years faster than making minimums across the board.
                </p>
              </div>
            </section>

            {/* ── Section 9: CTA ── */}
            <section id="try-our-calculators" className="mt-14 scroll-mt-24">
              <div className="rounded-2xl border border-accent-primary/30 bg-accent-primary/5 p-8 sm:p-10 text-center">
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">
                  See Which Strategy Saves You the Most
                </h2>
                <p className="mt-3 mx-auto max-w-lg text-text-muted leading-relaxed">
                  Enter your actual debts, balances, rates, and extra payment
                  amount into our free calculators to see a personalized payoff
                  timeline for both methods &mdash; complete with total interest
                  and monthly breakdowns.
                </p>
                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/calculators/debt-payoff-calculator"
                    className="inline-flex items-center gap-2 rounded-xl bg-accent-primary px-8 py-3.5 text-base font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-primary/90 hover:shadow-lg hover:shadow-accent-primary/20"
                  >
                    Debt Payoff Calculator
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
                    href="/calculators/loan-calculator"
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-bg-surface px-8 py-3.5 text-base font-semibold text-text-primary transition-all duration-200 hover:border-accent-primary/50 hover:text-accent-primary"
                  >
                    Loan Calculator
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

            {/* ── Section 10: FAQ ── */}
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

            {/* ── Related Guides ── */}
            <div className="mt-16 border-t border-border pt-10">
              <p className="font-display text-xs font-semibold uppercase tracking-wider text-accent-secondary">
                Related Guides
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/calculators/debt-payoff-calculator"
                  className="rounded-lg border border-border bg-bg-surface px-4 py-2 text-sm text-text-muted transition-colors hover:text-accent-primary hover:border-accent-primary/50"
                >
                  Debt Payoff Calculator
                </Link>
                <Link
                  href="/calculators/loan-calculator"
                  className="rounded-lg border border-border bg-bg-surface px-4 py-2 text-sm text-text-muted transition-colors hover:text-accent-primary hover:border-accent-primary/50"
                >
                  Loan Calculator
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
