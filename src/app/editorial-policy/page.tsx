import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editorial Policy | CalcEngine",
  description:
    "Learn how CalcEngine builds and maintains its financial calculators, including our methodology, data sources, update schedule, and accuracy standards.",
  openGraph: {
    title: "Editorial Policy | CalcEngine",
    description:
      "Learn how CalcEngine builds and maintains its financial calculators, including our methodology, data sources, update schedule, and accuracy standards.",
    url: "https://calcengine.org/editorial-policy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Editorial Policy | CalcEngine",
    description:
      "Learn how CalcEngine builds and maintains its financial calculators, including our methodology, data sources, update schedule, and accuracy standards.",
  },
  alternates: {
    canonical: "/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
        Editorial Policy
      </h1>
      <p className="mt-4 text-lg text-text-muted">
        How CalcEngine builds, maintains, and updates its financial calculators.
      </p>

      <div className="mt-10 space-y-10 text-text-muted leading-relaxed">
        {/* Mission */}
        <section>
          <h2 className="font-display text-xl font-semibold text-text-primary">
            Our Mission
          </h2>
          <p className="mt-3">
            CalcEngine provides free, accurate financial calculators to help people
            make informed decisions about mortgages, salaries, retirement, taxes,
            and debt. We believe financial literacy tools should be accessible to
            everyone, without paywalls or data collection.
          </p>
        </section>

        {/* Methodology */}
        <section>
          <h2 className="font-display text-xl font-semibold text-text-primary">
            Calculator Methodology
          </h2>
          <div className="mt-3 space-y-3">
            <p>
              Every calculator on CalcEngine is built using industry-standard
              formulas and methodologies. We use the same mathematical approaches
              that banks, financial institutions, and government agencies use:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">Mortgage & Loan Calculators:</strong>{" "}
                Standard amortization formula used by all US lenders
              </li>
              <li>
                <strong className="text-text-primary">Tax Calculators:</strong>{" "}
                IRS tax brackets, standard deductions, and FICA rates for the
                current tax year
              </li>
              <li>
                <strong className="text-text-primary">Retirement Calculators:</strong>{" "}
                Compound interest formulas with contribution limits from IRS
                Publication 590 and the Thrift Savings Plan
              </li>
              <li>
                <strong className="text-text-primary">Government Pay Calculators:</strong>{" "}
                Official GS pay tables from OPM and military pay charts from DFAS
              </li>
              <li>
                <strong className="text-text-primary">Social Security Estimator:</strong>{" "}
                SSA bend point formula and PIA calculation methodology
              </li>
            </ul>
            <p>
              All calculator logic is covered by automated unit tests to ensure
              mathematical accuracy. Our test suite currently includes 89 tests
              across all calculation modules.
            </p>
          </div>
        </section>

        {/* Data Sources */}
        <section>
          <h2 className="font-display text-xl font-semibold text-text-primary">
            Data Sources
          </h2>
          <div className="mt-3 space-y-3">
            <p>
              We source our data from official government publications and
              authoritative financial references:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">Tax Data:</strong>{" "}
                <a
                  href="https://www.irs.gov/pub/irs-drop/rp-24-40.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-secondary hover:text-accent-primary"
                >
                  IRS Revenue Procedure
                </a>{" "}
                (annual inflation adjustments)
              </li>
              <li>
                <strong className="text-text-primary">GS Pay Tables:</strong>{" "}
                <a
                  href="https://www.opm.gov/policy-data-oversight/pay-leave/salaries-wages/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-secondary hover:text-accent-primary"
                >
                  Office of Personnel Management
                </a>
              </li>
              <li>
                <strong className="text-text-primary">Military Pay:</strong>{" "}
                <a
                  href="https://www.dfas.mil/militarymembers/payentitlements/Pay-Tables/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-secondary hover:text-accent-primary"
                >
                  Defense Finance and Accounting Service
                </a>
              </li>
              <li>
                <strong className="text-text-primary">Social Security:</strong>{" "}
                <a
                  href="https://www.ssa.gov/oact/cola/bendpoints.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-secondary hover:text-accent-primary"
                >
                  Social Security Administration
                </a>
              </li>
              <li>
                <strong className="text-text-primary">Retirement Limits:</strong>{" "}
                <a
                  href="https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-secondary hover:text-accent-primary"
                >
                  IRS Retirement Topics
                </a>
              </li>
              <li>
                <strong className="text-text-primary">Inflation Data:</strong>{" "}
                <a
                  href="https://www.bls.gov/cpi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-secondary hover:text-accent-primary"
                >
                  Bureau of Labor Statistics CPI
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* Update Schedule */}
        <section>
          <h2 className="font-display text-xl font-semibold text-text-primary">
            Update Schedule
          </h2>
          <div className="mt-3 space-y-3">
            <p>We update our calculators on a regular schedule:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">Annual (January):</strong>{" "}
                Tax brackets, standard deductions, 401(k)/IRA contribution limits,
                Social Security wage base, FERS/TSP limits, GS pay tables
              </li>
              <li>
                <strong className="text-text-primary">As Published:</strong>{" "}
                Military pay tables (typically January), locality pay adjustments
              </li>
              <li>
                <strong className="text-text-primary">Ongoing:</strong>{" "}
                Bug fixes, accuracy improvements, user-reported issues
              </li>
            </ul>
            <p>
              Each calculator page displays a &ldquo;Last Updated&rdquo; date so you
              know when the data was last verified.
            </p>
          </div>
        </section>

        {/* Limitations */}
        <section>
          <h2 className="font-display text-xl font-semibold text-text-primary">
            Limitations & Assumptions
          </h2>
          <div className="mt-3 space-y-3">
            <p>
              Our calculators are designed to provide useful estimates, but they
              have inherent limitations:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">Simplified Models:</strong>{" "}
                Real-world financial situations often involve factors our
                calculators don&apos;t capture (state-specific rules, individual
                circumstances, edge cases)
              </li>
              <li>
                <strong className="text-text-primary">Constant Assumptions:</strong>{" "}
                Many calculators assume constant rates of return, inflation, or
                contribution levels, which don&apos;t reflect real-world variability
              </li>
              <li>
                <strong className="text-text-primary">Federal Focus:</strong>{" "}
                Tax calculators use federal rates; state tax calculations are
                simplified estimates
              </li>
              <li>
                <strong className="text-text-primary">Point-in-Time Data:</strong>{" "}
                Interest rates, market conditions, and regulations change;
                calculators reflect data as of their last update
              </li>
            </ul>
            <p>
              For major financial decisions, we recommend consulting with a
              qualified financial advisor, tax professional, or attorney who can
              account for your specific situation.
            </p>
          </div>
        </section>

        {/* Affiliate Disclosure */}
        <section>
          <h2 className="font-display text-xl font-semibold text-text-primary">
            Affiliate Disclosure
          </h2>
          <p className="mt-3">
            Some calculator pages include links to third-party financial services
            (marked with &ldquo;sponsored&rdquo; or &ldquo;affiliate&rdquo; labels).
            If you click these links and sign up for a service, we may receive a
            commission at no additional cost to you. These partnerships help
            support CalcEngine and keep our calculators free.
          </p>
          <p className="mt-3">
            Affiliate relationships never influence our calculator results or
            methodology. The math is the math, regardless of any business
            relationships.
          </p>
        </section>

        {/* Reporting Issues */}
        <section>
          <h2 className="font-display text-xl font-semibold text-text-primary">
            Reporting Issues
          </h2>
          <p className="mt-3">
            Found an error, outdated data, or have a suggestion? We want to hear
            from you. Accuracy is our top priority.
          </p>
          <p className="mt-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-accent-secondary hover:text-accent-primary transition-colors"
            >
              Contact us to report an issue
              <svg
                width="16"
                height="16"
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
          </p>
        </section>

        {/* Privacy Note */}
        <section>
          <h2 className="font-display text-xl font-semibold text-text-primary">
            Your Privacy
          </h2>
          <p className="mt-3">
            All calculations run entirely in your browser. We never see, store, or
            transmit your financial data. Your salary, debts, savings, and tax
            information stay on your device.
          </p>
          <p className="mt-3">
            <Link
              href="/privacy"
              className="text-accent-secondary hover:text-accent-primary transition-colors"
            >
              Read our full Privacy Policy
            </Link>
          </p>
        </section>
      </div>

      {/* Last Updated */}
      <p className="mt-12 text-sm text-text-muted">
        Last updated: February 2026
      </p>
    </article>
  );
}
