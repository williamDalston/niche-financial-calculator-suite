import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | CalcEngine",
  description:
    "CalcEngine terms of service. Read our terms and conditions for using our free financial calculators.",
  openGraph: {
    title: "Terms of Service | CalcEngine",
    description:
      "CalcEngine terms of service. Read our terms and conditions for using our free financial calculators.",
    url: "https://calcengine.org/terms",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | CalcEngine",
    description:
      "CalcEngine terms of service. Read our terms and conditions for using our free financial calculators.",
  },
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      {/* Header */}
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-text-muted">
          Last updated: February 24, 2026
        </p>
      </header>

      {/* Key highlight */}
      <div className="mt-8 rounded-xl border border-accent-primary/30 bg-accent-primary/5 p-6">
        <p className="text-sm font-semibold text-accent-primary">
          The short version
        </p>
        <p className="mt-2 text-text-muted leading-relaxed">
          CalcEngine provides free financial calculators for educational and
          informational purposes only. By using our site, you agree to these
          terms. Our calculators are tools to help you estimate and plan — they
          are not financial, tax, or legal advice.
        </p>
      </div>

      {/* Terms Sections */}
      <div className="mt-12 space-y-12">
        {/* 1. Acceptance of Terms */}
        <section>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            1. Acceptance of Terms
          </h2>
          <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
            <p>
              By accessing or using CalcEngine (&ldquo;the Service&rdquo;), you
              agree to be bound by these Terms of Service. If you do not agree
              to these terms, please do not use the Service.
            </p>
            <p>
              We reserve the right to update or modify these terms at any time
              without prior notice. Your continued use of the Service after any
              changes constitutes acceptance of the new terms.
            </p>
          </div>
        </section>

        {/* 2. Description of Service */}
        <section>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            2. Description of Service
          </h2>
          <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
            <p>
              CalcEngine provides free, browser-based financial calculators
              including but not limited to:
            </p>
            <ul className="ml-4 list-disc space-y-2 marker:text-accent-primary">
              <li>Mortgage and home affordability calculators</li>
              <li>Retirement and investment calculators</li>
              <li>Salary and income calculators</li>
              <li>Tax estimation calculators</li>
              <li>Debt payoff and loan calculators</li>
              <li>Government pay calculators (GS, military, TSP, FERS)</li>
            </ul>
            <p>
              All calculations are performed entirely within your web browser.
              We do not store, transmit, or have access to any financial data
              you enter into our calculators.
            </p>
          </div>
        </section>

        {/* 3. Disclaimer */}
        <section>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            3. Disclaimer — Not Financial Advice
          </h2>
          <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
              <p className="text-sm font-semibold text-amber-500">
                Important Notice
              </p>
              <p className="mt-2 text-sm leading-relaxed">
                The calculators and information provided on CalcEngine are for
                educational and informational purposes only. They do not
                constitute financial, tax, legal, or investment advice.
              </p>
            </div>
            <p>
              Results from our calculators are estimates based on the
              information you provide and general assumptions. Actual results
              may vary significantly based on individual circumstances,
              including but not limited to:
            </p>
            <ul className="ml-4 list-disc space-y-2 marker:text-accent-secondary">
              <li>Changes in tax laws and regulations</li>
              <li>Market conditions and interest rate fluctuations</li>
              <li>Individual tax situations and deductions</li>
              <li>Employer-specific policies and benefits</li>
              <li>State and local regulations</li>
            </ul>
            <p>
              Always consult with qualified financial advisors, tax
              professionals, or legal counsel before making important financial
              decisions.
            </p>
          </div>
        </section>

        {/* 4. Accuracy of Information */}
        <section>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            4. Accuracy of Information
          </h2>
          <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
            <p>
              While we strive to provide accurate and up-to-date calculators,
              CalcEngine makes no warranties or representations regarding the
              accuracy, completeness, or reliability of any calculations or
              information provided.
            </p>
            <p>
              Tax brackets, pay scales, interest rates, and other data used in
              our calculators are updated periodically but may not reflect the
              most current information. Users are responsible for verifying
              results with authoritative sources.
            </p>
          </div>
        </section>

        {/* 5. Limitation of Liability */}
        <section>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            5. Limitation of Liability
          </h2>
          <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
            <p>
              To the fullest extent permitted by applicable law, CalcEngine and
              its operators shall not be liable for any direct, indirect,
              incidental, special, consequential, or punitive damages arising
              from:
            </p>
            <ul className="ml-4 list-disc space-y-2 marker:text-accent-primary">
              <li>Your use of or inability to use the Service</li>
              <li>
                Any errors, inaccuracies, or omissions in calculator results
              </li>
              <li>
                Financial decisions made based on information from the Service
              </li>
              <li>
                Unauthorized access to or alteration of your data or
                transmissions
              </li>
              <li>Any third-party content or conduct on the Service</li>
            </ul>
            <p>
              This limitation applies regardless of the legal theory under which
              damages are sought.
            </p>
          </div>
        </section>

        {/* 6. Intellectual Property */}
        <section>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            6. Intellectual Property
          </h2>
          <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
            <p>
              All content on CalcEngine, including but not limited to text,
              graphics, logos, icons, images, audio clips, digital downloads,
              and software, is the property of CalcEngine or its content
              suppliers and is protected by international copyright laws.
            </p>
            <p>
              You may use the calculators for personal, non-commercial purposes.
              You may not reproduce, distribute, modify, create derivative works
              of, publicly display, or exploit any content from the Service
              without prior written permission.
            </p>
          </div>
        </section>

        {/* 7. User Conduct */}
        <section>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            7. User Conduct
          </h2>
          <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
            <p>When using CalcEngine, you agree not to:</p>
            <ul className="ml-4 list-disc space-y-2 marker:text-accent-primary">
              <li>
                Use the Service for any unlawful purpose or in violation of any
                applicable laws
              </li>
              <li>
                Attempt to gain unauthorized access to any portion of the
                Service
              </li>
              <li>
                Interfere with or disrupt the Service or servers connected to
                the Service
              </li>
              <li>
                Use automated systems, bots, or scrapers to access the Service
              </li>
              <li>
                Remove, alter, or obscure any copyright or proprietary notices
              </li>
            </ul>
          </div>
        </section>

        {/* 8. Third-Party Links and Services */}
        <section>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            8. Third-Party Links and Services
          </h2>
          <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
            <p>
              CalcEngine may contain links to third-party websites or services
              that are not owned or controlled by us. We have no control over,
              and assume no responsibility for, the content, privacy policies,
              or practices of any third-party websites or services.
            </p>
            <p>
              We use third-party services including Google Analytics for usage
              analytics and Google AdSense for advertising. These services are
              governed by their respective terms of service and privacy
              policies.
            </p>
          </div>
        </section>

        {/* 9. Indemnification */}
        <section>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            9. Indemnification
          </h2>
          <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
            <p>
              You agree to indemnify, defend, and hold harmless CalcEngine and
              its operators, affiliates, officers, directors, employees, and
              agents from and against any claims, liabilities, damages, losses,
              and expenses arising out of or in any way connected with your
              access to or use of the Service or your violation of these Terms.
            </p>
          </div>
        </section>

        {/* 10. Governing Law */}
        <section>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            10. Governing Law
          </h2>
          <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the United States, without regard to its conflict of
              law provisions. Any disputes arising under these Terms shall be
              subject to the exclusive jurisdiction of the courts located in the
              United States.
            </p>
          </div>
        </section>

        {/* 11. Severability */}
        <section>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            11. Severability
          </h2>
          <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
            <p>
              If any provision of these Terms is found to be unenforceable or
              invalid, that provision shall be limited or eliminated to the
              minimum extent necessary so that these Terms shall otherwise
              remain in full force and effect.
            </p>
          </div>
        </section>

        {/* 12. Contact Information */}
        <section>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            12. Contact Information
          </h2>
          <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
            <p>
              If you have any questions about these Terms of Service, please
              contact us at:
            </p>
            <div className="rounded-xl border border-border bg-bg-surface p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span className="text-sm text-text-primary">
                    hello@calcengine.org
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Back to home */}
      <div className="mt-16 border-t border-border pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-accent-primary"
        >
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
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back to CalcEngine
        </Link>
      </div>
    </div>
  );
}
