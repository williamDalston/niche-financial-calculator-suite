import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | CalcEngine",
  description:
    "CalcEngine privacy policy. Learn how we handle your data — all calculations run client-side in your browser. We never see your financial information.",
  openGraph: {
    title: "Privacy Policy | CalcEngine",
    description:
      "CalcEngine privacy policy. All calculations run client-side. We never see your financial data.",
    url: "https://calcengine.io/privacy",
  },
  alternates: {
    canonical: "/privacy",
  },
};

/* ─── Page Component ─── */

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      {/* Header */}
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Privacy Policy
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
          All financial calculations on CalcEngine run entirely in your browser.
          We never see, collect, store, or transmit your financial inputs. Your
          salary, mortgage details, savings, debts, and tax information stay on
          your device.
        </p>
      </div>

      {/* ─── Privacy Sections ─── */}
      <div className="mt-12 space-y-12">
        {/* 1. Information We Collect */}
        <section>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            1. Information We Collect
          </h2>
          <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
            <p>
              CalcEngine is designed with privacy at its core. Here is a
              breakdown of what we do and do not collect:
            </p>
            <h3 className="font-display text-base font-semibold text-text-primary">
              Information we do NOT collect
            </h3>
            <ul className="ml-4 list-disc space-y-2 marker:text-accent-primary">
              <li>
                Financial data you enter into our calculators (salary, debts,
                savings, mortgage amounts, tax details, etc.)
              </li>
              <li>
                Calculator results or outputs
              </li>
              <li>
                Personal identification information (name, address, Social
                Security number)
              </li>
              <li>
                Bank account or credit card information
              </li>
            </ul>
            <p>
              All calculations are performed client-side using JavaScript in
              your web browser. No financial data is ever sent to our servers.
            </p>
            <h3 className="font-display text-base font-semibold text-text-primary">
              Information we may collect automatically
            </h3>
            <ul className="ml-4 list-disc space-y-2 marker:text-accent-secondary">
              <li>
                <strong className="text-text-primary">Usage data:</strong>{" "}
                Pages visited, time spent on pages, clicks, and navigation
                paths through standard web analytics
              </li>
              <li>
                <strong className="text-text-primary">Device data:</strong>{" "}
                Browser type, operating system, screen resolution, and device
                type
              </li>
              <li>
                <strong className="text-text-primary">
                  Approximate location:
                </strong>{" "}
                Country and region level only, derived from IP address, which
                is not stored
              </li>
              <li>
                <strong className="text-text-primary">
                  Referral source:
                </strong>{" "}
                How you arrived at our site (search engine, direct link, etc.)
              </li>
            </ul>
          </div>
        </section>

        {/* 2. How We Use Information */}
        <section>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            2. How We Use Information
          </h2>
          <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
            <p>
              The limited information we collect is used exclusively to:
            </p>
            <ul className="ml-4 list-disc space-y-2 marker:text-accent-primary">
              <li>
                Understand which calculators are most popular so we can
                prioritize improvements
              </li>
              <li>
                Identify and fix technical issues and bugs
              </li>
              <li>
                Analyze traffic patterns to improve site performance and user
                experience
              </li>
              <li>
                Serve relevant advertising through Google AdSense to keep the
                site free
              </li>
            </ul>
            <p>
              We do not sell, rent, or trade any user information to third
              parties for marketing purposes.
            </p>
          </div>
        </section>

        {/* 3. Cookies and Tracking */}
        <section>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            3. Cookies and Tracking
          </h2>
          <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
            <p>
              CalcEngine and our third-party partners may use cookies and
              similar tracking technologies. Here is what you should know:
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-bg-surface">
                    <th className="px-5 py-3 text-left font-display font-semibold text-text-primary">
                      Cookie Type
                    </th>
                    <th className="px-5 py-3 text-left font-display font-semibold text-text-primary">
                      Purpose
                    </th>
                    <th className="px-5 py-3 text-left font-display font-semibold text-text-primary">
                      Provider
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-5 py-3 text-text-primary font-medium">
                      Analytics
                    </td>
                    <td className="px-5 py-3 text-text-muted">
                      Measure page views, sessions, and user engagement
                    </td>
                    <td className="px-5 py-3 text-text-muted">
                      Google Analytics
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3 text-text-primary font-medium">
                      Advertising
                    </td>
                    <td className="px-5 py-3 text-text-muted">
                      Serve and personalize ads to keep the site free
                    </td>
                    <td className="px-5 py-3 text-text-muted">
                      Google AdSense
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3 text-text-primary font-medium">
                      Functional
                    </td>
                    <td className="px-5 py-3 text-text-muted">
                      Remember user preferences (e.g., theme settings)
                    </td>
                    <td className="px-5 py-3 text-text-muted">CalcEngine</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              You can control cookies through your browser settings. Most
              browsers allow you to block or delete cookies. Note that
              disabling cookies may affect site functionality.
            </p>
          </div>
        </section>

        {/* 4. Third-Party Services */}
        <section>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            4. Third-Party Services
          </h2>
          <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
            <p>
              We use the following third-party services that may collect data
              as described in their respective privacy policies:
            </p>
            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-bg-surface p-5">
                <h3 className="font-display text-base font-semibold text-text-primary">
                  Google Analytics
                </h3>
                <p className="mt-2 text-sm text-text-muted leading-relaxed">
                  We use Google Analytics to understand how visitors interact
                  with our site. This service collects anonymized usage data
                  including pages visited, session duration, and traffic
                  sources. Google Analytics may set cookies on your browser.
                  For more information, see{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-secondary hover:text-accent-primary transition-colors underline underline-offset-2"
                  >
                    Google&apos;s Privacy Policy
                  </a>
                  .
                </p>
              </div>
              <div className="rounded-xl border border-border bg-bg-surface p-5">
                <h3 className="font-display text-base font-semibold text-text-primary">
                  Google AdSense
                </h3>
                <p className="mt-2 text-sm text-text-muted leading-relaxed">
                  We display advertisements through Google AdSense to support
                  the free operation of CalcEngine. AdSense may use cookies
                  and web beacons to serve ads based on your prior visits to
                  this or other websites. You can opt out of personalized
                  advertising by visiting{" "}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-secondary hover:text-accent-primary transition-colors underline underline-offset-2"
                  >
                    Google Ads Settings
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Your Rights */}
        <section>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            5. Your Rights
          </h2>
          <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
            <p>
              Depending on your jurisdiction, you may have the following rights
              regarding your personal data:
            </p>
            <ul className="ml-4 list-disc space-y-2 marker:text-accent-primary">
              <li>
                <strong className="text-text-primary">Right to access:</strong>{" "}
                Request a copy of any personal data we hold about you
              </li>
              <li>
                <strong className="text-text-primary">Right to deletion:</strong>{" "}
                Request that we delete any personal data we hold about you
              </li>
              <li>
                <strong className="text-text-primary">Right to opt out:</strong>{" "}
                Opt out of data collection for advertising purposes using your
                browser settings or the links provided above
              </li>
              <li>
                <strong className="text-text-primary">
                  Right to correction:
                </strong>{" "}
                Request correction of any inaccurate personal data
              </li>
              <li>
                <strong className="text-text-primary">
                  Right to portability:
                </strong>{" "}
                Request your data in a machine-readable format
              </li>
            </ul>
            <p>
              Since CalcEngine does not collect financial data or require user
              accounts, most of these rights are automatically fulfilled by our
              privacy-first design. If you have specific requests, please
              contact us using the information below.
            </p>
          </div>
        </section>

        {/* 6. Data Security */}
        <section>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            6. Data Security
          </h2>
          <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
            <p>
              CalcEngine is served over HTTPS to ensure all data transmitted
              between your browser and our servers is encrypted. Since all
              calculator computations happen locally in your browser, your
              financial data is never exposed to network transmission.
            </p>
            <p>
              We regularly review and update our infrastructure and
              dependencies to address security vulnerabilities.
            </p>
          </div>
        </section>

        {/* 7. Children's Privacy */}
        <section>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            7. Children&apos;s Privacy
          </h2>
          <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
            <p>
              CalcEngine is not directed at children under the age of 13. We
              do not knowingly collect personal information from children. If
              you believe a child has provided us with personal information,
              please contact us so we can take appropriate action.
            </p>
          </div>
        </section>

        {/* 8. Changes to This Policy */}
        <section>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            8. Changes to This Policy
          </h2>
          <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
            <p>
              We may update this privacy policy from time to time to reflect
              changes in our practices or applicable laws. When we make
              changes, we will update the &ldquo;Last updated&rdquo; date at
              the top of this page. We encourage you to review this page
              periodically.
            </p>
          </div>
        </section>

        {/* 9. Contact Us */}
        <section>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            9. Contact Us
          </h2>
          <div className="mt-4 space-y-4 text-text-muted leading-relaxed">
            <p>
              If you have questions about this privacy policy or our data
              practices, you can reach us at:
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
                    info@alstonanalytics.com
                  </span>
                </div>
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
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="text-sm text-text-primary">
                    CalcEngine, Internet-based service
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
