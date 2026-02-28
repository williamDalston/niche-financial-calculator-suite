import type { Metadata } from "next";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";

export const metadata: Metadata = {
  title: "401(k) vs IRA: The Complete 2026 Guide | CalcEngine",
  description:
    "401(k) or IRA — which retirement account is right for you? Our comprehensive 2026 guide compares contribution limits, tax benefits, employer matches, and the optimal savings strategy.",
  openGraph: {
    title: "401(k) vs IRA: The Complete 2026 Guide",
    description:
      "401(k) or IRA — which retirement account is right for you? Compare contribution limits, tax benefits, and find the optimal retirement savings strategy.",
    url: "https://calcengine.org/compare/401k-vs-ira",
    type: "article",
  },
  alternates: {
    canonical: "/compare/401k-vs-ira",
  },
  twitter: {
    card: "summary_large_image",
    title: "401(k) vs IRA: The Complete 2026 Guide | CalcEngine",
    description:
      "401(k) or IRA — which retirement account is right for you? Our comprehensive 2026 guide compares contribution limits, tax benefits, employer matches, and the optimal savings strategy.",
  },
};

/* ─── Table of Contents ─── */

const tocItems = [
  { id: "introduction", label: "Introduction" },
  { id: "how-a-401k-works", label: "How a 401(k) Works" },
  { id: "how-an-ira-works", label: "How an IRA Works" },
  { id: "side-by-side-comparison", label: "Side-by-Side Comparison" },
  { id: "when-to-choose-a-401k", label: "When to Choose a 401(k)" },
  { id: "when-to-choose-an-ira", label: "When to Choose an IRA" },
  { id: "the-optimal-strategy", label: "The Optimal Strategy" },
  { id: "run-the-numbers", label: "Run the Numbers" },
  { id: "faq", label: "FAQ" },
];

/* ─── FAQ Data ─── */

const faqs = [
  {
    question: "Can I have both a 401(k) and an IRA?",
    answer:
      "Yes. There is no rule preventing you from contributing to both a 401(k) and an IRA in the same year. In fact, most financial advisors recommend doing exactly that. The only caveat is that your ability to deduct Traditional IRA contributions may be limited if you or your spouse are covered by a workplace plan and your income exceeds certain thresholds. Roth IRA contributions are also subject to income limits, but you can still contribute to a non-deductible Traditional IRA and convert it (a backdoor Roth).",
  },
  {
    question: "Which has better tax benefits — a 401(k) or an IRA?",
    answer:
      "It depends on your situation. A Traditional 401(k) offers the same tax-deferred growth as a Traditional IRA, but with much higher contribution limits ($23,500 vs $7,000 in 2026). This means more of your income can grow tax-free. However, an IRA — especially a Roth IRA — offers tax-free withdrawals in retirement, which can be more valuable if you expect to be in a higher tax bracket later. The best approach for most people is to use both accounts strategically.",
  },
  {
    question: "What if my employer doesn't match 401(k) contributions?",
    answer:
      "Without an employer match, the primary advantage of a 401(k) over an IRA is the higher contribution limit. If your employer offers no match and the plan has high fees or limited investment options, it may make sense to prioritize maxing out your IRA first for its wider investment choices and potentially lower costs, then contribute to the 401(k) for additional tax-advantaged savings beyond the IRA limit.",
  },
  {
    question: "Should I choose Roth or Traditional for my retirement accounts?",
    answer:
      "Choose Roth if you expect your tax rate in retirement to be higher than it is today — common for younger workers early in their careers or those who expect significant income growth. Choose Traditional if you are in a high tax bracket now and expect to be in a lower one in retirement. Many advisors recommend a mix of both (tax diversification) so you have flexibility in retirement to withdraw from whichever account minimizes your tax bill each year.",
  },
  {
    question: "What happens to my 401(k) when I change jobs?",
    answer:
      "You have four options: leave the money in your former employer's plan (if allowed), roll it over to your new employer's 401(k), roll it over into an IRA (the most popular choice for its flexibility and investment options), or cash it out (generally a bad idea because you will owe income taxes plus a 10% early withdrawal penalty if you are under 59 1/2). A direct rollover to an IRA avoids taxes and penalties and gives you full control over your investments.",
  },
];

/* ─── JSON-LD Article Schema ─── */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "401(k) vs IRA: The Complete 2026 Guide",
  description:
    "401(k) or IRA — which retirement account is right for you? Our comprehensive 2026 guide compares contribution limits, tax benefits, employer matches, and the optimal savings strategy.",
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
    "@id": "https://calcengine.org/compare/401k-vs-ira",
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

export default function FourOhOneKVsIraGuidePage() {
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
            401(k) vs IRA
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
                401(k) vs IRA:{" "}
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
                  A 401(k) and an IRA are the two most popular tax-advantaged
                  retirement accounts in the United States, and understanding how
                  they differ is one of the most impactful financial decisions
                  you can make. Both let your investments grow without being
                  taxed each year, but they serve different purposes, have
                  different rules, and offer different advantages depending on
                  your employment situation, income level, and retirement goals.
                </p>
                <p>
                  The 401(k) is an employer-sponsored plan that comes with high
                  contribution limits and the potential for free money through
                  employer matching. The IRA (Individual Retirement Account) is a
                  personal account you open on your own that offers wider
                  investment flexibility and more control. Most people benefit
                  from using both &mdash; but the order in which you fund them
                  and the type you choose (Traditional vs Roth) can mean tens of
                  thousands of dollars in difference over a career.
                </p>
                <p>
                  This guide breaks down how each account works, compares them
                  side by side with the latest 2026 numbers, and walks you
                  through the optimal strategy for maximizing your retirement
                  savings.
                </p>
              </div>
            </section>

            {/* ── Section 2: How a 401(k) Works ── */}
            <section id="how-a-401k-works" className="mt-14 scroll-mt-24">
              <h2 className="font-display text-2xl font-bold tracking-tight">
                How a 401(k) Works
              </h2>
              <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
                <p>
                  A 401(k) is a retirement savings plan sponsored by your
                  employer. Contributions are deducted directly from your
                  paycheck before you ever see the money, making it one of the
                  easiest and most automated ways to save for retirement. The
                  plan is named after section 401(k) of the Internal Revenue
                  Code that established it in 1978.
                </p>
              </div>
              <ul className="mt-6 space-y-5">
                {[
                  {
                    title: "Employer-sponsored with payroll deductions",
                    text: "Your employer sets up the plan and you elect a percentage of your salary to contribute each pay period. The money comes out of your paycheck automatically, which makes consistent saving effortless. You choose from a menu of investment options selected by your employer's plan administrator.",
                  },
                  {
                    title: "Employer match — free money",
                    text: "Many employers match a portion of your contributions, typically 50% to 100% of the first 3-6% of your salary. For example, if you earn $80,000 and your employer matches 100% of the first 4%, that is $3,200 per year in free money. Not capturing the full match is leaving guaranteed returns on the table.",
                  },
                  {
                    title: "2026 contribution limits: $23,500 ($31,000 if 50+)",
                    text: "In 2026, you can contribute up to $23,500 of your own money to a 401(k). If you are 50 or older, you can make an additional $7,500 in catch-up contributions, bringing your total to $31,000. Employer matching contributions do not count toward your personal limit — the combined employee plus employer limit is $70,000 in 2026.",
                  },
                  {
                    title: "Traditional vs Roth 401(k)",
                    text: "Most modern 401(k) plans offer both a Traditional and a Roth option. Traditional contributions are made pre-tax, reducing your taxable income now but requiring you to pay income tax on withdrawals in retirement. Roth contributions are made after-tax, meaning no upfront tax break, but all qualified withdrawals in retirement are completely tax-free.",
                  },
                  {
                    title: "Limited investment options",
                    text: "Unlike an IRA, where you can invest in virtually anything, a 401(k) limits you to a curated menu of funds chosen by the plan administrator — typically 15 to 30 mutual funds and target-date funds. The quality and cost of these options varies widely between employers. Some plans offer low-cost index funds, while others are loaded with expensive actively managed funds.",
                  },
                  {
                    title: "Loan and hardship withdrawal provisions",
                    text: "Many 401(k) plans allow you to borrow from your balance — typically up to 50% or $50,000, whichever is less. You repay the loan with interest to yourself, but if you leave your job, the outstanding balance may become due immediately. Hardship withdrawals are also available in some plans but come with income taxes and a 10% penalty if you are under 59 1/2.",
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

            {/* ── Section 3: How an IRA Works ── */}
            <section id="how-an-ira-works" className="mt-14 scroll-mt-24">
              <h2 className="font-display text-2xl font-bold tracking-tight">
                How an IRA Works
              </h2>
              <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
                <p>
                  An IRA (Individual Retirement Account) is a personal retirement
                  account that you open and manage yourself through a brokerage,
                  bank, or financial institution. Anyone with earned income can
                  contribute to an IRA, regardless of whether they have access to
                  an employer-sponsored plan.
                </p>
              </div>
              <ul className="mt-6 space-y-5">
                {[
                  {
                    title: "Open to anyone with earned income",
                    text: "Unlike a 401(k), you do not need an employer to open an IRA. Whether you are a W-2 employee, a freelancer, a gig worker, or self-employed, you can contribute as long as you have earned income (or your spouse does, in the case of a spousal IRA). This makes it the universal retirement savings tool.",
                  },
                  {
                    title: "2026 contribution limits: $7,000 ($8,000 if 50+)",
                    text: "The IRA contribution limit for 2026 is $7,000, with an additional $1,000 catch-up contribution allowed for those 50 and older. This is significantly lower than the 401(k) limit, which is why many people use both accounts. The limit is shared between Traditional and Roth IRAs — you can split your $7,000 between them but cannot exceed the total.",
                  },
                  {
                    title: "Wider investment choices",
                    text: "An IRA gives you access to virtually the entire investment universe: individual stocks, bonds, ETFs, mutual funds, REITs, CDs, and even alternative investments depending on the custodian. This flexibility allows you to build a highly customized, low-cost portfolio tailored to your specific goals and risk tolerance.",
                  },
                  {
                    title: "Traditional vs Roth IRA",
                    text: "A Traditional IRA offers tax-deductible contributions (subject to income limits if you are covered by a workplace plan) and tax-deferred growth, with taxes owed on withdrawals in retirement. A Roth IRA offers no upfront deduction, but all qualified withdrawals — including gains — are completely tax-free. Roth IRAs also have no required minimum distributions during your lifetime.",
                  },
                  {
                    title: "Income limits for Roth IRA contributions",
                    text: "In 2026, you can contribute the full amount to a Roth IRA if your modified adjusted gross income (MAGI) is below $150,000 (single) or $236,000 (married filing jointly). Contributions phase out above those thresholds. High-income earners can use the backdoor Roth IRA strategy: contribute to a non-deductible Traditional IRA and immediately convert it to a Roth.",
                  },
                  {
                    title: "More control and portability",
                    text: "Your IRA belongs entirely to you and stays with you regardless of job changes. You choose the brokerage, the investments, and when to make contributions. There is no employer involvement, no plan administrator, and no waiting for vesting schedules. This level of control makes the IRA an essential complement to any employer-sponsored plan.",
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

            {/* ── Section 4: Side-by-Side Comparison ── */}
            <section
              id="side-by-side-comparison"
              className="mt-14 scroll-mt-24"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Side-by-Side Comparison
              </h2>
              <p className="mt-4 text-text-muted leading-relaxed">
                Here is how a 401(k) and an IRA stack up across the most
                important features for 2026.
              </p>
              <div className="mt-8 overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-bg-surface">
                      <th className="px-5 py-4 text-left font-display font-semibold text-text-primary">
                        Feature
                      </th>
                      <th className="px-5 py-4 text-right font-display font-semibold text-accent-secondary">
                        401(k)
                      </th>
                      <th className="px-5 py-4 text-right font-display font-semibold text-accent-primary">
                        IRA
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      {
                        label: "2026 contribution limit",
                        col1: "$23,500",
                        col2: "$7,000",
                      },
                      {
                        label: "Catch-up (age 50+)",
                        col1: "+$7,500 ($31,000)",
                        col2: "+$1,000 ($8,000)",
                      },
                      {
                        label: "Tax treatment",
                        col1: "Traditional or Roth",
                        col2: "Traditional or Roth",
                      },
                      {
                        label: "Employer match",
                        col1: "Yes (if offered)",
                        col2: "No",
                      },
                      {
                        label: "Investment options",
                        col1: "Limited plan menu",
                        col2: "Virtually unlimited",
                      },
                      {
                        label: "Required minimum distributions",
                        col1: "Age 73 (both types)",
                        col2: "Age 73 (Traditional); None (Roth)",
                      },
                      {
                        label: "Income limits to contribute",
                        col1: "None",
                        col2: "Roth: $150K/$236K MAGI",
                      },
                      {
                        label: "Loan provisions",
                        col1: "Yes (most plans)",
                        col2: "No",
                      },
                      {
                        label: "Early withdrawal penalty",
                        col1: "10% before age 59 1/2",
                        col2: "10% before age 59 1/2",
                      },
                      {
                        label: "Who opens the account",
                        col1: "Employer",
                        col2: "You (individual)",
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
                          {row.col1}
                        </td>
                        <td className="px-5 py-3.5 text-right text-text-muted">
                          {row.col2}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-text-muted">
                * Contribution limits and income thresholds reflect 2026 IRS
                guidelines. Roth IRA income limits shown are for single filers
                and married filing jointly, respectively. Roth 401(k)
                contributions have no income limits but follow the same
                contribution caps as Traditional 401(k).
              </p>
            </section>

            {/* ── Section 5: When to Choose a 401(k) ── */}
            <section id="when-to-choose-a-401k" className="mt-14 scroll-mt-24">
              <h2 className="font-display text-2xl font-bold tracking-tight">
                When to Choose a 401(k)
              </h2>
              <ul className="mt-6 space-y-5">
                {[
                  {
                    title: "Your employer offers a match",
                    text: "An employer match is an instant, guaranteed return on your money — typically 50% to 100% on the first 3-6% of your salary. Even if your plan has mediocre investment options, the match alone makes contributing to your 401(k) a no-brainer. Always contribute at least enough to capture the full match before putting money anywhere else.",
                  },
                  {
                    title: "You want higher contribution limits",
                    text: "At $23,500 per year ($31,000 if 50+), the 401(k) allows you to shelter over three times more income from taxes than an IRA. If you are a high earner or an aggressive saver trying to maximize tax-advantaged space, the 401(k) is essential. For someone in the 32% bracket, maxing out a Traditional 401(k) saves $7,520 in federal taxes annually.",
                  },
                  {
                    title: "You prefer the simplicity of payroll deductions",
                    text: "Automatic payroll deductions remove the willpower component from saving. The money is contributed before it hits your bank account, making it far less likely you will spend it. Studies consistently show that people who save through automatic payroll deductions accumulate significantly more than those who rely on manual contributions.",
                  },
                  {
                    title: "You are a high earner without an IRA deduction",
                    text: "If your income is too high to deduct Traditional IRA contributions and too high for direct Roth IRA contributions, the 401(k) becomes your primary tax-advantaged vehicle. Traditional 401(k) contributions have no income limit for deductibility, and Roth 401(k) contributions have no income limit either — unlike the Roth IRA.",
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

            {/* ── Section 6: When to Choose an IRA ── */}
            <section
              id="when-to-choose-an-ira"
              className="mt-14 scroll-mt-24"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight">
                When to Choose an IRA
              </h2>
              <ul className="mt-6 space-y-5">
                {[
                  {
                    title: "You want more investment flexibility",
                    text: "An IRA lets you invest in individual stocks, bonds, ETFs, index funds, REITs, and more — far beyond the limited menu in most 401(k) plans. If your 401(k) only offers expensive actively managed funds, you can build a far cheaper, more diversified portfolio in an IRA. The fee savings alone can add up to tens of thousands of dollars over a career.",
                  },
                  {
                    title: "Your employer does not offer a retirement plan",
                    text: "If you are self-employed, a freelancer, or your employer simply does not offer a 401(k), an IRA is your primary tax-advantaged retirement account. A Traditional IRA gives you a tax deduction on contributions (fully deductible since you are not covered by a workplace plan), while a Roth IRA gives you tax-free growth and withdrawals.",
                  },
                  {
                    title: "You want a Roth option without income limit workarounds",
                    text: "If your income is below the Roth IRA thresholds ($150,000 single / $236,000 married filing jointly in 2026), contributing directly to a Roth IRA is straightforward and gives you tax-free withdrawals in retirement plus no required minimum distributions. If your 401(k) does not offer a Roth option, the Roth IRA is your path to tax-free retirement income.",
                  },
                  {
                    title: "You want more control over your account",
                    text: "With an IRA, you choose the brokerage, the specific investments, and the timing of your contributions. There is no employer intermediary, no plan administrator fees, and no risk of your plan changing when your company gets acquired or switches providers. Your IRA is fully portable and stays with you for life.",
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

            {/* ── Section 7: The Optimal Strategy ── */}
            <section id="the-optimal-strategy" className="mt-14 scroll-mt-24">
              <h2 className="font-display text-2xl font-bold tracking-tight">
                The Optimal Strategy: Use Both
              </h2>
              <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
                <p>
                  The 401(k)-vs-IRA question is not really an either/or decision.
                  The most effective retirement savings strategy uses both
                  accounts in a specific order to maximize tax benefits,
                  employer contributions, and investment flexibility. Here is the
                  three-step approach recommended by most financial planners:
                </p>
              </div>
              <div className="mt-8 space-y-6">
                <div className="rounded-xl border border-accent-primary/30 bg-accent-primary/5 p-6">
                  <p className="font-display text-base font-semibold text-accent-primary">
                    Step 1: Max your 401(k) employer match
                  </p>
                  <p className="mt-3 text-sm text-text-muted leading-relaxed">
                    Contribute enough to your 401(k) to capture the full
                    employer match. If your employer matches 100% of the first
                    4% of your salary, contribute at least 4%. This is an
                    instant 100% return on your money &mdash; no investment in
                    the world beats that. On an $80,000 salary with a 4% match,
                    this means contributing $3,200 and receiving $3,200 from
                    your employer.
                  </p>
                </div>
                <div className="rounded-xl border border-accent-primary/30 bg-accent-primary/5 p-6">
                  <p className="font-display text-base font-semibold text-accent-primary">
                    Step 2: Max out your IRA
                  </p>
                  <p className="mt-3 text-sm text-text-muted leading-relaxed">
                    After capturing the full match, direct your next dollars to
                    an IRA &mdash; typically a Roth IRA if you qualify, for
                    tax-free growth and withdrawals. Contribute the full $7,000
                    ($8,000 if 50+). The IRA gives you access to better, cheaper
                    investment options than most 401(k) plans, so this is where
                    you want to maximize after the free match money is secured.
                  </p>
                </div>
                <div className="rounded-xl border border-accent-primary/30 bg-accent-primary/5 p-6">
                  <p className="font-display text-base font-semibold text-accent-primary">
                    Step 3: Go back and max out the 401(k)
                  </p>
                  <p className="mt-3 text-sm text-text-muted leading-relaxed">
                    If you still have money available for retirement savings
                    after maxing your IRA, increase your 401(k) contributions
                    toward the $23,500 annual limit. Even if the investment
                    options are not ideal, the tax-deferred (or tax-free, if
                    Roth) growth on an additional $16,500+ per year is
                    extremely valuable. Over 30 years at a 7% average return,
                    that extra $16,500 annually grows to over $1.5 million.
                  </p>
                </div>
              </div>
              <div className="mt-8 rounded-xl border border-border bg-bg-surface p-6">
                <p className="font-display text-base font-semibold text-text-primary">
                  What this looks like in 2026
                </p>
                <p className="mt-3 text-sm text-text-muted leading-relaxed">
                  If you are under 50 and follow all three steps, you can
                  contribute up to{" "}
                  <strong className="text-text-primary">$30,500</strong> per
                  year in tax-advantaged retirement accounts ($23,500 in a
                  401(k) + $7,000 in an IRA) &mdash; plus whatever your employer
                  matches. If you are 50 or older, that ceiling rises to{" "}
                  <strong className="text-text-primary">$39,000</strong>{" "}
                  ($31,000 + $8,000). Maximizing these limits year after year is
                  one of the most reliable paths to a comfortable retirement.
                </p>
              </div>
            </section>

            {/* ── Section 8: CTA ── */}
            <section id="run-the-numbers" className="mt-14 scroll-mt-24">
              <div className="rounded-2xl border border-accent-primary/30 bg-accent-primary/5 p-8 sm:p-10 text-center">
                <div className="flex justify-center">
                  <span className="text-5xl" aria-hidden="true">
                    📊
                  </span>
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold tracking-tight">
                  Run the Numbers for Your Retirement
                </h2>
                <p className="mt-3 mx-auto max-w-lg text-text-muted leading-relaxed">
                  Use our free calculators to see how your 401(k) contributions
                  grow over time, model different contribution rates and employer
                  matches, and build a comprehensive retirement plan tailored to
                  your goals.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/calculators/401k-calculator"
                    className="inline-flex items-center gap-2 rounded-xl bg-accent-primary px-8 py-3.5 text-base font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-primary/90 hover:shadow-lg hover:shadow-accent-primary/20"
                  >
                    401(k) Calculator
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
                    href="/calculators/retirement-calculator"
                    className="inline-flex items-center gap-2 rounded-xl border border-accent-primary px-8 py-3.5 text-base font-semibold text-accent-primary transition-all duration-200 hover:bg-accent-primary/10"
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
                  href="/calculators/401k-calculator"
                  className="rounded-lg border border-border bg-bg-surface px-4 py-2 text-sm text-text-muted transition-colors hover:text-accent-primary hover:border-accent-primary/50"
                >
                  401(k) Calculator
                </Link>
                <Link
                  href="/calculators/retirement-calculator"
                  className="rounded-lg border border-border bg-bg-surface px-4 py-2 text-sm text-text-muted transition-colors hover:text-accent-primary hover:border-accent-primary/50"
                >
                  Retirement Calculator
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
