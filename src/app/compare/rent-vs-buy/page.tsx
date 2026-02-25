import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rent vs Buy: The Complete 2026 Guide | CalcEngine",
  description:
    "Should you rent or buy in 2026? Our comprehensive guide covers the 5% rule, financial comparisons, and when each option makes sense. Use our free calculator to decide.",
  openGraph: {
    title: "Rent vs Buy: The Complete 2026 Guide",
    description:
      "Should you rent or buy in 2026? Comprehensive guide with the 5% rule, financial comparisons, and a free calculator.",
    url: "https://calcengine.io/compare/rent-vs-buy",
    type: "article",
  },
  alternates: {
    canonical: "/compare/rent-vs-buy",
  },
};

/* ─── Table of Contents ─── */

const tocItems = [
  { id: "the-big-question", label: "The Big Question" },
  { id: "when-renting-makes-sense", label: "When Renting Makes Sense" },
  { id: "when-buying-makes-sense", label: "When Buying Makes Sense" },
  { id: "financial-comparison", label: "The Financial Comparison" },
  { id: "the-5-percent-rule", label: "The 5% Rule" },
  { id: "use-our-calculator", label: "Use Our Calculator" },
  { id: "faq", label: "FAQ" },
];

/* ─── FAQ Data ─── */

const faqs = [
  {
    question: "Is it always cheaper to buy than rent?",
    answer:
      "No. In many high-cost markets, renting can be significantly cheaper than buying when you factor in property taxes, maintenance, insurance, and opportunity cost on the down payment. The right choice depends on local market conditions, how long you plan to stay, and your financial situation.",
  },
  {
    question: "How long do I need to stay to make buying worth it?",
    answer:
      "Most financial experts suggest you need to stay in a home for at least 5 to 7 years to break even on buying costs like closing fees, agent commissions, and the early years of a mortgage where most payments go toward interest rather than equity.",
  },
  {
    question: "What is the 5% rule for rent vs buy?",
    answer:
      "The 5% rule says to multiply the value of a home by 5%, then divide by 12 to get a monthly breakeven cost. If you can rent for less than that amount, renting may be the better financial decision. This rough guideline accounts for property taxes, maintenance, and the cost of capital.",
  },
  {
    question: "Should I buy a home if I have student loan debt?",
    answer:
      "It depends on the size of your student loan payments relative to your income, your interest rates, and your savings. Generally, you should have an emergency fund, a stable income, and a debt-to-income ratio below 36% before considering homeownership. Use our calculators to model both scenarios.",
  },
  {
    question: "Does renting mean I am throwing money away?",
    answer:
      "No. Renting provides flexibility, eliminates maintenance costs, and frees up capital that could be invested elsewhere. Homeowners also \"throw away\" money on mortgage interest, property taxes, insurance, and maintenance. The key is comparing the total cost of each option, not just the monthly payment.",
  },
];

/* ─── JSON-LD Article Schema ─── */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Rent vs Buy: The Complete 2026 Guide",
  description:
    "Should you rent or buy in 2026? Our comprehensive guide covers the 5% rule, financial comparisons, and when each option makes sense.",
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
  datePublished: "2026-01-15",
  dateModified: "2026-02-24",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://calcengine.io/compare/rent-vs-buy",
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

export default function RentVsBuyGuidePage() {
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
            Rent vs Buy
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
                Rent vs Buy:{" "}
                <span className="text-accent-primary">
                  The Complete 2026 Guide
                </span>
              </h1>
              <p className="mt-4 flex items-center gap-3 text-sm text-text-muted">
                <time dateTime="2026-02-24">Updated February 24, 2026</time>
                <span aria-hidden="true" className="text-border">
                  &bull;
                </span>
                <span>12 min read</span>
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

            {/* ── Section 1: The Big Question ── */}
            <section id="the-big-question" className="mt-12 scroll-mt-24">
              <h2 className="font-display text-2xl font-bold tracking-tight">
                The Big Question
              </h2>
              <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
                <p>
                  Should you rent or buy a home? It is one of the biggest
                  financial decisions most people will ever face, and the answer
                  is rarely straightforward. The common wisdom that buying is
                  always better than renting is a myth &mdash; the right choice
                  depends on your financial situation, local housing market, how
                  long you plan to stay, and your personal priorities.
                </p>
                <p>
                  In 2026, with mortgage rates stabilizing after years of
                  volatility and home prices varying wildly by market, the
                  rent-vs-buy equation looks different than it did just a few
                  years ago. Some markets heavily favor renting, while others
                  offer compelling opportunities for buyers. The key is running
                  the numbers for your specific situation rather than relying on
                  general rules of thumb.
                </p>
                <p>
                  This guide breaks down the financial and lifestyle factors
                  that matter most, provides a concrete cost comparison, and
                  introduces the popular 5% rule to help you make an informed
                  decision. At the end, you can use our free Rent vs Buy
                  Calculator to model your exact scenario.
                </p>
              </div>
            </section>

            {/* ── Section 2: When Renting Makes Sense ── */}
            <section
              id="when-renting-makes-sense"
              className="mt-14 scroll-mt-24"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight">
                When Renting Makes Sense
              </h2>
              <ul className="mt-6 space-y-5">
                {[
                  {
                    title: "You plan to move within 5 years",
                    text: "Buying comes with substantial transaction costs: closing fees (2-5% of the purchase price), agent commissions (5-6% when selling), and moving expenses. If you are likely to relocate for a job, relationship, or lifestyle change, renting avoids these costs entirely.",
                  },
                  {
                    title: "Your local market has a high price-to-rent ratio",
                    text: "In cities like San Francisco, New York, and Seattle, home prices can be 30-40x annual rent. In these markets, the monthly cost of owning (mortgage, taxes, insurance, maintenance) can be double the cost of renting a comparable home.",
                  },
                  {
                    title: "You do not have a fully-funded emergency fund",
                    text: "Homeownership comes with unexpected expenses: roof repairs, HVAC failures, plumbing emergencies. Without 3-6 months of expenses saved, one surprise repair bill could push you into high-interest debt.",
                  },
                  {
                    title: "You want to invest your down payment elsewhere",
                    text: "A 20% down payment on a $300,000 home is $60,000. Invested in a diversified portfolio returning 7-8% annually, that money could grow to over $120,000 in 10 years. The opportunity cost of tying up capital in a home is real.",
                  },
                  {
                    title: "You value flexibility and low maintenance",
                    text: "Renting means your landlord handles repairs, you can relocate with 30-60 days notice, and you are not responsible for property taxes or homeowner association fees. For people who prioritize freedom and simplicity, renting can be a deliberate lifestyle choice.",
                  },
                  {
                    title: "You are paying down high-interest debt",
                    text: "If you carry credit card debt at 20%+ interest or large student loans, directing extra cash toward debt repayment almost always beats the return you would get from home equity appreciation.",
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

            {/* ── Section 3: When Buying Makes Sense ── */}
            <section
              id="when-buying-makes-sense"
              className="mt-14 scroll-mt-24"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight">
                When Buying Makes Sense
              </h2>
              <ul className="mt-6 space-y-5">
                {[
                  {
                    title: "You plan to stay for 7+ years",
                    text: "The longer you own, the more transaction costs are spread out. After 7 years, most homeowners have built meaningful equity and benefited from appreciation. In markets with moderate growth (3-5% annually), this timeline typically makes buying the clear winner.",
                  },
                  {
                    title: "You want to build long-term wealth",
                    text: "A mortgage is a form of forced savings. Each payment builds equity, and over 30 years, you will own an asset outright. Historically, U.S. home values have appreciated 3-4% annually on average, and your mortgage leverage amplifies those gains.",
                  },
                  {
                    title: "You want stable monthly housing costs",
                    text: "A fixed-rate mortgage locks in your principal and interest payment for 15-30 years. While property taxes and insurance may rise, your core housing cost stays predictable. Renters face annual rent increases that can outpace inflation.",
                  },
                  {
                    title: "You want tax benefits",
                    text: "Homeowners can deduct mortgage interest (up to $750,000 in loan value) and property taxes (up to $10,000 SALT cap) if they itemize. Additionally, you can exclude up to $250,000 ($500,000 for couples) in capital gains when you sell your primary residence.",
                  },
                  {
                    title: "Your rent is close to what a mortgage payment would be",
                    text: "In markets where monthly rent approximates a mortgage payment on a comparable property, buying lets you build equity instead of paying your landlord. Run the numbers with our calculator to see how the total costs compare.",
                  },
                  {
                    title: "You want to customize your living space",
                    text: "Homeownership gives you the freedom to renovate, remodel, and make your space truly yours. Strategic improvements can also increase the value of your investment.",
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

            {/* ── Section 4: The Financial Comparison ── */}
            <section id="financial-comparison" className="mt-14 scroll-mt-24">
              <h2 className="font-display text-2xl font-bold tracking-tight">
                The Financial Comparison
              </h2>
              <p className="mt-4 text-text-muted leading-relaxed">
                Here is a side-by-side breakdown of typical monthly and annual
                costs for renting at $2,000/month versus buying a $300,000 home
                with 20% down and a 6.5% mortgage rate.
              </p>
              <div className="mt-8 overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-bg-surface">
                      <th className="px-5 py-4 text-left font-display font-semibold text-text-primary">
                        Cost Category
                      </th>
                      <th className="px-5 py-4 text-right font-display font-semibold text-accent-secondary">
                        Renting
                      </th>
                      <th className="px-5 py-4 text-right font-display font-semibold text-accent-primary">
                        Buying
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      {
                        label: "Monthly payment",
                        rent: "$2,000",
                        buy: "$1,517",
                      },
                      {
                        label: "Property taxes",
                        rent: "$0",
                        buy: "$313/mo",
                      },
                      {
                        label: "Home insurance",
                        rent: "$15/mo",
                        buy: "$125/mo",
                      },
                      {
                        label: "Maintenance / repairs",
                        rent: "$0",
                        buy: "$250/mo",
                      },
                      { label: "HOA fees", rent: "$0", buy: "$0 - $400/mo" },
                      {
                        label: "Total monthly cost",
                        rent: "$2,015",
                        buy: "$2,205+",
                      },
                      {
                        label: "Annual cost",
                        rent: "$24,180",
                        buy: "$26,460+",
                      },
                      {
                        label: "Equity built (Year 1)",
                        rent: "$0",
                        buy: "$4,740",
                      },
                      {
                        label: "Up-front costs",
                        rent: "$4,000",
                        buy: "$72,000",
                      },
                      {
                        label: "Tax deductions",
                        rent: "None",
                        buy: "$15,400",
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
                          {row.rent}
                        </td>
                        <td className="px-5 py-3.5 text-right text-text-muted">
                          {row.buy}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-text-muted">
                * Assumes a $300,000 home, 20% down payment ($60,000), 6.5%
                30-year fixed mortgage, 1.25% property tax rate, and $3,000/year
                maintenance. Renter&apos;s insurance estimated at $180/year.
                Actual costs vary by location.
              </p>
            </section>

            {/* ── Section 5: The 5% Rule ── */}
            <section id="the-5-percent-rule" className="mt-14 scroll-mt-24">
              <h2 className="font-display text-2xl font-bold tracking-tight">
                The 5% Rule
              </h2>
              <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
                <p>
                  The 5% rule is a quick mental framework popularized by
                  financial educator Ben Felix for deciding whether renting or
                  buying makes more financial sense. It works like this:
                </p>
                <div className="rounded-xl border border-accent-primary/30 bg-accent-primary/5 p-6">
                  <p className="font-display text-base font-semibold text-accent-primary">
                    The Formula
                  </p>
                  <p className="mt-3 font-mono text-lg text-text-primary">
                    (Home Value &times; 5%) &divide; 12 = Monthly Breakeven
                  </p>
                  <p className="mt-3 text-sm text-text-muted">
                    If your rent is <strong className="text-text-primary">below</strong> this number,
                    renting may be the better deal. If your rent is{" "}
                    <strong className="text-text-primary">above</strong> this number, buying could
                    make more sense.
                  </p>
                </div>
                <p>
                  The 5% accounts for three unrecoverable costs of
                  homeownership:
                </p>
                <ul className="ml-4 list-disc space-y-2 marker:text-accent-primary">
                  <li>
                    <strong className="text-text-primary">Property taxes</strong> &mdash;
                    typically around 1% of home value annually
                  </li>
                  <li>
                    <strong className="text-text-primary">Maintenance costs</strong> &mdash;
                    typically 1% of home value annually
                  </li>
                  <li>
                    <strong className="text-text-primary">Cost of capital</strong> &mdash;
                    approximately 3% (the opportunity cost of your down payment
                    plus mortgage interest minus principal repayment)
                  </li>
                </ul>
                <p>
                  <strong className="text-text-primary">Example:</strong> For a
                  $300,000 home: ($300,000 &times; 0.05) &divide; 12 ={" "}
                  <strong className="text-accent-primary">$1,250/month</strong>.
                  If you can rent a comparable home for less than $1,250/month,
                  renting is likely the better financial choice. If comparable
                  rent is above $1,250, buying starts to look more attractive.
                </p>
                <p>
                  Keep in mind that the 5% rule is a rough guideline, not a
                  definitive answer. It does not account for local appreciation
                  rates, tax benefits, personal preferences, or the emotional
                  value of homeownership. Use it as a starting point, then run
                  the full numbers with our calculator.
                </p>
              </div>
            </section>

            {/* ── Section 6: Use Our Calculator CTA ── */}
            <section id="use-our-calculator" className="mt-14 scroll-mt-24">
              <div className="rounded-2xl border border-accent-primary/30 bg-accent-primary/5 p-8 sm:p-10 text-center">
                <div className="flex justify-center">
                  <span className="text-5xl" aria-hidden="true">
                    🔑
                  </span>
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold tracking-tight">
                  Run the Numbers for Your Situation
                </h2>
                <p className="mt-3 mx-auto max-w-lg text-text-muted leading-relaxed">
                  Our free Rent vs Buy Calculator lets you input your exact
                  rent, home price, down payment, interest rate, and local costs
                  to get a personalized comparison with charts and breakdowns.
                </p>
                <Link
                  href="/calculators/rent-vs-buy-calculator"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-accent-primary px-8 py-3.5 text-base font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-primary/90 hover:shadow-lg hover:shadow-accent-primary/20"
                >
                  Open Rent vs Buy Calculator
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
            </section>

            {/* ── Section 7: FAQ ── */}
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
