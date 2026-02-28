import type { Metadata } from "next";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";

export const metadata: Metadata = {
  title: "Roth vs Traditional IRA: The Complete 2026 Guide | CalcEngine",
  description:
    "Roth IRA or Traditional IRA? Our 2026 guide breaks down tax treatment, income limits, contribution limits, RMDs, and when each account type makes sense. Free calculators included.",
  openGraph: {
    title: "Roth vs Traditional IRA: The Complete 2026 Guide",
    description:
      "Roth IRA or Traditional IRA? 2026 guide covering tax treatment, income limits, contribution limits, RMDs, and free calculators.",
    url: "https://calcengine.org/compare/roth-vs-traditional-ira",
    type: "article",
  },
  alternates: {
    canonical: "/compare/roth-vs-traditional-ira",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roth vs Traditional IRA: The Complete 2026 Guide | CalcEngine",
    description:
      "Roth IRA or Traditional IRA? Our 2026 guide breaks down tax treatment, income limits, contribution limits, RMDs, and when each account type makes sense. Free calculators included.",
  },
};

/* ─── Table of Contents ─── */

const tocItems = [
  { id: "introduction", label: "Introduction" },
  { id: "how-a-traditional-ira-works", label: "How a Traditional IRA Works" },
  { id: "how-a-roth-ira-works", label: "How a Roth IRA Works" },
  { id: "side-by-side-comparison", label: "Side-by-Side Comparison" },
  { id: "when-to-choose-traditional", label: "When to Choose Traditional" },
  { id: "when-to-choose-roth", label: "When to Choose Roth" },
  { id: "backdoor-roth-strategy", label: "The Backdoor Roth Strategy" },
  { id: "run-the-numbers", label: "Run the Numbers" },
  { id: "faq", label: "FAQ" },
];

/* ─── FAQ Data ─── */

const faqs = [
  {
    question: "Can I contribute to both a Roth IRA and a Traditional IRA?",
    answer:
      "Yes, you can contribute to both a Roth IRA and a Traditional IRA in the same year. However, your total combined contributions across all IRAs cannot exceed the annual limit ($7,000 in 2026, or $8,000 if you are 50 or older). For example, you could put $4,000 in a Roth IRA and $3,000 in a Traditional IRA, but not $7,000 in each.",
  },
  {
    question: "What if I exceed the Roth IRA income limit?",
    answer:
      "If your modified adjusted gross income (MAGI) exceeds the Roth IRA income limits ($165,000 for single filers or $246,000 for married filing jointly in 2026), you cannot contribute directly to a Roth IRA. However, you can use the backdoor Roth strategy: contribute to a non-deductible Traditional IRA and then convert those funds to a Roth IRA. There is no income limit on conversions.",
  },
  {
    question: "Can I convert a Traditional IRA to a Roth IRA?",
    answer:
      "Yes. A Roth conversion allows you to move money from a Traditional IRA to a Roth IRA at any time, regardless of income. You will owe income tax on any pre-tax contributions and earnings converted in the year of the conversion. There is no limit on how much you can convert, but large conversions can push you into a higher tax bracket, so it is important to plan strategically.",
  },
  {
    question: "Which IRA is better for young investors?",
    answer:
      "For most young investors, a Roth IRA is the stronger choice. Younger workers are typically in a lower tax bracket, so paying taxes now is less costly. More importantly, decades of tax-free growth can result in significantly more after-tax wealth at retirement. A Roth IRA also offers more flexibility since you can withdraw your contributions at any time without penalties, which provides a safety net in emergencies.",
  },
  {
    question: "What are the early withdrawal penalties for each IRA type?",
    answer:
      "For Traditional IRAs, withdrawals before age 59 1/2 are generally subject to a 10% early withdrawal penalty plus ordinary income tax on the full amount. For Roth IRAs, you can withdraw your contributions (not earnings) at any time without penalty or taxes. Earnings withdrawn before age 59 1/2 and before the account has been open for five years are subject to the 10% penalty and income tax. Exceptions to the penalty include first-time home purchases (up to $10,000), qualified education expenses, and certain medical costs.",
  },
];

/* ─── JSON-LD Article Schema ─── */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Roth vs Traditional IRA: The Complete 2026 Guide",
  description:
    "Roth IRA or Traditional IRA? Our 2026 guide breaks down tax treatment, income limits, contribution limits, RMDs, and when each account type makes sense.",
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
    "@id": "https://calcengine.org/compare/roth-vs-traditional-ira",
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

export default function RothVsTraditionalIRAGuidePage() {
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
            Roth vs Traditional IRA
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
                Roth vs Traditional IRA:{" "}
                <span className="text-accent-primary">
                  The Complete 2026 Guide
                </span>
              </h1>
              <p className="mt-4 flex items-center gap-3 text-sm text-text-muted">
                <time dateTime="2026-02-24">Updated February 24, 2026</time>
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
                  Both the Roth IRA and the Traditional IRA are individual
                  retirement accounts designed to help you save for the future
                  &mdash; but they take fundamentally different approaches to
                  taxes. The Traditional IRA gives you a tax break today and
                  taxes you later. The Roth IRA taxes you today and lets your
                  money grow and be withdrawn tax-free in retirement.
                </p>
                <p>
                  This single difference &mdash; when you pay taxes &mdash;
                  ripples through every aspect of these accounts: who benefits
                  most, how withdrawals work, what happens to required
                  distributions, and how much wealth you ultimately accumulate.
                  Choosing between them is one of the most impactful retirement
                  planning decisions you will make.
                </p>
                <p>
                  In this guide, we break down exactly how each account works
                  using the latest 2026 numbers, compare them side by side, and
                  help you determine which one &mdash; or which combination
                  &mdash; is right for your situation. Whether you are just
                  starting your career or approaching retirement, understanding
                  this choice can save you tens of thousands of dollars in taxes
                  over your lifetime.
                </p>
              </div>
            </section>

            {/* ── Section 2: How a Traditional IRA Works ── */}
            <section
              id="how-a-traditional-ira-works"
              className="mt-14 scroll-mt-24"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight">
                How a Traditional IRA Works
              </h2>
              <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
                <p>
                  A Traditional IRA follows a{" "}
                  <strong className="text-text-primary">
                    tax-deferred
                  </strong>{" "}
                  model. You contribute pre-tax dollars (or deduct your
                  contributions on your tax return), your investments grow
                  tax-deferred, and you pay ordinary income tax when you withdraw
                  the money in retirement.
                </p>
                <div className="rounded-xl border border-accent-primary/30 bg-accent-primary/5 p-6">
                  <p className="font-display text-base font-semibold text-accent-primary">
                    2026 Traditional IRA Key Numbers
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-text-muted">
                    <li>
                      <strong className="text-text-primary">
                        Contribution limit:
                      </strong>{" "}
                      $7,000 per year ($8,000 if age 50 or older)
                    </li>
                    <li>
                      <strong className="text-text-primary">
                        Tax deduction:
                      </strong>{" "}
                      Full deduction if you (and your spouse) do not have an
                      employer retirement plan. If you do, the deduction phases
                      out based on income.
                    </li>
                    <li>
                      <strong className="text-text-primary">
                        Deduction phaseout (with employer plan):
                      </strong>{" "}
                      $79,000 &ndash; $89,000 MAGI (single); $126,000 &ndash;
                      $146,000 MAGI (married filing jointly)
                    </li>
                    <li>
                      <strong className="text-text-primary">
                        Required Minimum Distributions:
                      </strong>{" "}
                      Must begin at age 73 (under SECURE 2.0 Act)
                    </li>
                    <li>
                      <strong className="text-text-primary">
                        Early withdrawal penalty:
                      </strong>{" "}
                      10% penalty plus income tax on withdrawals before age 59
                      1/2 (with exceptions)
                    </li>
                  </ul>
                </div>
                <p>
                  The biggest advantage of the Traditional IRA is the{" "}
                  <strong className="text-text-primary">
                    immediate tax deduction
                  </strong>
                  . If you contribute $7,000 and you are in the 24% tax bracket,
                  you save $1,680 in taxes this year. That money stays invested
                  and compounds over time. The trade-off is that every dollar you
                  withdraw in retirement will be taxed as ordinary income.
                </p>
                <p>
                  One critical rule: once you turn 73, you{" "}
                  <strong className="text-text-primary">must</strong> begin
                  taking Required Minimum Distributions (RMDs) each year,
                  whether or not you need the money. These distributions are
                  calculated based on your account balance and life expectancy,
                  and they are taxed as ordinary income. Failing to take RMDs
                  results in a steep 25% penalty on the amount not withdrawn.
                </p>
              </div>
            </section>

            {/* ── Section 3: How a Roth IRA Works ── */}
            <section
              id="how-a-roth-ira-works"
              className="mt-14 scroll-mt-24"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight">
                How a Roth IRA Works
              </h2>
              <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
                <p>
                  A Roth IRA flips the tax equation. You contribute{" "}
                  <strong className="text-text-primary">after-tax</strong>{" "}
                  dollars &mdash; there is no deduction in the year you
                  contribute. In return, your investments grow completely
                  tax-free, and qualified withdrawals in retirement are also
                  100% tax-free. You never pay another dime in taxes on that
                  money.
                </p>
                <div className="rounded-xl border border-accent-primary/30 bg-accent-primary/5 p-6">
                  <p className="font-display text-base font-semibold text-accent-primary">
                    2026 Roth IRA Key Numbers
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-text-muted">
                    <li>
                      <strong className="text-text-primary">
                        Contribution limit:
                      </strong>{" "}
                      $7,000 per year ($8,000 if age 50 or older)
                    </li>
                    <li>
                      <strong className="text-text-primary">
                        Income limit (single filers):
                      </strong>{" "}
                      Phaseout begins at $150,000 MAGI, fully phased out at
                      $165,000
                    </li>
                    <li>
                      <strong className="text-text-primary">
                        Income limit (married filing jointly):
                      </strong>{" "}
                      Phaseout begins at $236,000 MAGI, fully phased out at
                      $246,000
                    </li>
                    <li>
                      <strong className="text-text-primary">
                        Required Minimum Distributions:
                      </strong>{" "}
                      None &mdash; Roth IRAs have no RMDs during the
                      owner&apos;s lifetime
                    </li>
                    <li>
                      <strong className="text-text-primary">
                        Contribution withdrawals:
                      </strong>{" "}
                      Can be withdrawn at any time, tax-free and penalty-free
                    </li>
                    <li>
                      <strong className="text-text-primary">
                        Earnings withdrawals:
                      </strong>{" "}
                      Tax-free and penalty-free after age 59 1/2 and the account
                      has been open for at least 5 years
                    </li>
                  </ul>
                </div>
                <p>
                  The Roth IRA has two standout advantages. First,{" "}
                  <strong className="text-text-primary">
                    tax-free growth
                  </strong>{" "}
                  means that if you invest $7,000 per year for 30 years and your
                  portfolio grows to $600,000, you owe zero taxes on the entire
                  balance when you withdraw it. With a Traditional IRA, you would
                  owe income tax on every dollar.
                </p>
                <p>
                  Second,{" "}
                  <strong className="text-text-primary">
                    there are no Required Minimum Distributions
                  </strong>
                  . You can let your Roth IRA grow untouched for your entire
                  life, making it an exceptional tool for estate planning. Your
                  heirs inherit the account and can take distributions tax-free
                  (though non-spouse beneficiaries must empty the account within
                  10 years under current rules).
                </p>
                <p>
                  The main limitation is the{" "}
                  <strong className="text-text-primary">income limit</strong>.
                  High earners above the phaseout thresholds cannot contribute
                  directly to a Roth IRA. However, there is a legal workaround
                  known as the backdoor Roth strategy, which we cover below.
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
                Here is a direct comparison of the two account types across
                every major dimension that matters for your retirement planning.
              </p>
              <div className="mt-8 overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-bg-surface">
                      <th className="px-5 py-4 text-left font-display font-semibold text-text-primary">
                        Feature
                      </th>
                      <th className="px-5 py-4 text-right font-display font-semibold text-accent-secondary">
                        Traditional IRA
                      </th>
                      <th className="px-5 py-4 text-right font-display font-semibold text-accent-primary">
                        Roth IRA
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      {
                        label: "Tax on contributions",
                        traditional: "Deductible (pre-tax)",
                        roth: "Not deductible (after-tax)",
                      },
                      {
                        label: "Tax on growth",
                        traditional: "Tax-deferred",
                        roth: "Tax-free",
                      },
                      {
                        label: "Tax on withdrawals",
                        traditional: "Taxed as ordinary income",
                        roth: "Tax-free (if qualified)",
                      },
                      {
                        label: "2026 contribution limit",
                        traditional: "$7,000 ($8,000 if 50+)",
                        roth: "$7,000 ($8,000 if 50+)",
                      },
                      {
                        label: "Income limits to contribute",
                        traditional: "None (deduction may be limited)",
                        roth: "$150K\u2013$165K single; $236K\u2013$246K married",
                      },
                      {
                        label: "Required Minimum Distributions",
                        traditional: "Yes, starting at age 73",
                        roth: "None during owner\u2019s lifetime",
                      },
                      {
                        label: "Early withdrawal (before 59 1/2)",
                        traditional: "10% penalty + income tax",
                        roth: "Contributions: anytime tax/penalty-free",
                      },
                      {
                        label: "Best for",
                        traditional: "Higher bracket now, lower in retirement",
                        roth: "Lower bracket now, higher in retirement",
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
                          {row.traditional}
                        </td>
                        <td className="px-5 py-3.5 text-right text-text-muted">
                          {row.roth}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-text-muted">
                * Contribution limits and income thresholds are for the 2026 tax
                year. Roth IRA early withdrawal rules differ for contributions
                (always accessible) versus earnings (subject to the 5-year rule
                and age requirements).
              </p>
            </section>

            {/* ── Section 5: When to Choose Traditional ── */}
            <section
              id="when-to-choose-traditional"
              className="mt-14 scroll-mt-24"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight">
                When to Choose a Traditional IRA
              </h2>
              <ul className="mt-6 space-y-5">
                {[
                  {
                    title: "You are in a high tax bracket now and expect to be lower in retirement",
                    text: "This is the classic case for the Traditional IRA. If you earn $180,000 today and are in the 32% bracket, but expect to live on $60,000 in retirement (the 22% bracket), you save significantly by deferring taxes. You deduct contributions at 32% and pay withdrawals at 22%, keeping the 10% difference.",
                  },
                  {
                    title: "You want an immediate tax deduction",
                    text: "If reducing this year's tax bill is a priority, the Traditional IRA delivers immediate relief. This can be especially valuable if you are on the edge of a tax bracket, need to reduce your AGI to qualify for other tax benefits, or simply want to reinvest the tax savings.",
                  },
                  {
                    title: "You are near retirement with limited time for tax-free growth",
                    text: "The Roth IRA's biggest advantage is decades of tax-free compounding. If you are 5 to 10 years from retirement, there is less time for that benefit to accumulate. In this case, the upfront deduction from a Traditional IRA may deliver more total value than a few years of tax-free growth.",
                  },
                  {
                    title: "You live in a high-tax state and plan to retire in a low-tax or no-tax state",
                    text: "If you currently live in California (13.3% top state rate) or New York (10.9%) but plan to retire in Florida, Texas, or another state with no income tax, you can deduct contributions at a high combined rate now and withdraw at a much lower combined rate later.",
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

            {/* ── Section 6: When to Choose Roth ── */}
            <section
              id="when-to-choose-roth"
              className="mt-14 scroll-mt-24"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight">
                When to Choose a Roth IRA
              </h2>
              <ul className="mt-6 space-y-5">
                {[
                  {
                    title: "You are currently in a lower tax bracket",
                    text: "If you are early in your career, between jobs, or earning less than you expect to in the future, paying taxes now at a low rate is a bargain. A 22-year-old in the 12% bracket who contributes to a Roth pays a fraction of the tax they would pay on withdrawals decades later in a potentially higher bracket.",
                  },
                  {
                    title: "You are young with decades of tax-free growth ahead",
                    text: "Time is the Roth IRA's superpower. A $7,000 annual contribution growing at 8% for 35 years becomes roughly $1.2 million — all of it tax-free. In a Traditional IRA, you would owe income tax on every dollar withdrawn, potentially giving up $250,000 or more in taxes at a 22% rate.",
                  },
                  {
                    title: "You want flexibility and no RMDs",
                    text: "The Roth IRA is the most flexible retirement account available. You can withdraw contributions at any time for any reason. There are no required minimum distributions, so you control when and if you take money out. This makes the Roth IRA an excellent \"last resort\" emergency fund and a powerful estate planning tool.",
                  },
                  {
                    title: "You expect higher income or tax rates in retirement",
                    text: "If you believe your income will be higher in retirement (through pensions, Social Security, rental income, or continued work) or that Congress will raise tax rates in the future, locking in today's rates with a Roth makes strategic sense. You are hedging against tax rate uncertainty.",
                  },
                  {
                    title: "You want tax diversification in retirement",
                    text: "Having both pre-tax (Traditional) and after-tax (Roth) accounts gives you flexibility to manage your tax bracket in retirement. In years when you need more income, you can pull from the Roth without increasing your taxable income, keeping you in a lower bracket and reducing taxes on Social Security benefits.",
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

            {/* ── Section 7: The Backdoor Roth Strategy ── */}
            <section
              id="backdoor-roth-strategy"
              className="mt-14 scroll-mt-24"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight">
                The Backdoor Roth Strategy
              </h2>
              <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
                <p>
                  If your income exceeds the Roth IRA contribution limits, you
                  are not out of luck. The{" "}
                  <strong className="text-text-primary">
                    backdoor Roth
                  </strong>{" "}
                  is a legal, IRS-approved strategy that high earners use to get
                  money into a Roth IRA regardless of income. It works in two
                  steps:
                </p>
                <div className="rounded-xl border border-accent-primary/30 bg-accent-primary/5 p-6">
                  <p className="font-display text-base font-semibold text-accent-primary">
                    How the Backdoor Roth Works
                  </p>
                  <ol className="mt-3 space-y-3 text-sm text-text-muted list-decimal list-inside">
                    <li>
                      <strong className="text-text-primary">
                        Contribute to a Traditional IRA.
                      </strong>{" "}
                      Make a non-deductible contribution of up to $7,000 (or
                      $8,000 if 50+). There is no income limit for making
                      non-deductible Traditional IRA contributions.
                    </li>
                    <li>
                      <strong className="text-text-primary">
                        Convert to a Roth IRA.
                      </strong>{" "}
                      Shortly after the contribution settles (often the next
                      day), convert the entire Traditional IRA balance to your
                      Roth IRA. Since the contribution was non-deductible, you
                      owe little to no tax on the conversion.
                    </li>
                  </ol>
                </div>
                <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-6">
                  <p className="font-display text-base font-semibold text-yellow-600 dark:text-yellow-400">
                    Pro-Rata Rule Warning
                  </p>
                  <p className="mt-3 text-sm text-text-muted">
                    If you have any existing pre-tax money in{" "}
                    <strong className="text-text-primary">any</strong>{" "}
                    Traditional IRA (including SEP and SIMPLE IRAs), the IRS
                    applies the pro-rata rule. This means your conversion is
                    taxed proportionally based on the ratio of pre-tax to
                    after-tax money across all your Traditional IRA accounts
                    &mdash; not just the one you are converting from. For
                    example, if you have $93,000 in pre-tax Traditional IRA
                    funds and make a $7,000 non-deductible contribution, only
                    7% of your conversion ($7,000 / $100,000) would be tax-free.
                    The remaining 93% would be taxable.
                  </p>
                  <p className="mt-3 text-sm text-text-muted">
                    <strong className="text-text-primary">The fix:</strong> If
                    you have pre-tax IRA balances, consider rolling them into
                    your employer&apos;s 401(k) plan (if allowed) before
                    executing the backdoor Roth. This removes the pre-tax
                    balance from the pro-rata calculation.
                  </p>
                </div>
                <p>
                  The backdoor Roth has been legal and widely used for over a
                  decade. While Congress has proposed eliminating it in various
                  tax reform bills, it remains available as of 2026. Consult
                  with a tax professional to ensure it is executed correctly for
                  your situation.
                </p>
              </div>
            </section>

            {/* ── Section 8: CTA ── */}
            <section id="run-the-numbers" className="mt-14 scroll-mt-24">
              <div className="rounded-2xl border border-accent-primary/30 bg-accent-primary/5 p-8 sm:p-10 text-center">
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">
                  Run the Numbers for Your Retirement
                </h2>
                <p className="mt-3 mx-auto max-w-lg text-text-muted leading-relaxed">
                  Use our free calculators to project how your IRA contributions
                  will grow over time. See the impact of tax-free compounding,
                  model different contribution amounts, and plan your retirement
                  with confidence.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/calculators/retirement-calculator"
                    className="inline-flex items-center gap-2 rounded-xl bg-accent-primary px-8 py-3.5 text-base font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-primary/90 hover:shadow-lg hover:shadow-accent-primary/20"
                  >
                    Retirement Calculator
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
                    href="/calculators/compound-interest-calculator"
                    className="inline-flex items-center gap-2 rounded-xl border border-accent-primary/50 bg-transparent px-8 py-3.5 text-base font-semibold text-accent-primary transition-all duration-200 hover:bg-accent-primary/10"
                  >
                    Compound Interest Calculator
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

            {/* ── Ad Unit ── */}
            <AdUnit className="mt-12" />

            {/* ── Section 9: FAQ ── */}
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
                  href="/calculators/retirement-calculator"
                  className="rounded-lg border border-border bg-bg-surface px-4 py-2 text-sm text-text-muted transition-colors hover:text-accent-primary hover:border-accent-primary/50"
                >
                  Retirement Calculator
                </Link>
                <Link
                  href="/calculators/compound-interest-calculator"
                  className="rounded-lg border border-border bg-bg-surface px-4 py-2 text-sm text-text-muted transition-colors hover:text-accent-primary hover:border-accent-primary/50"
                >
                  Compound Interest Calculator
                </Link>
                <Link
                  href="/compare/401k-vs-ira"
                  className="rounded-lg border border-border bg-bg-surface px-4 py-2 text-sm text-text-muted transition-colors hover:text-accent-primary hover:border-accent-primary/50"
                >
                  401(k) vs IRA Guide
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
