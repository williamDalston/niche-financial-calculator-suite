import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About CalcEngine | Free Financial Calculators",
  description:
    "Learn about CalcEngine — the fastest, most accurate free financial calculators on the web. All calculations run client-side for complete privacy.",
  openGraph: {
    title: "About CalcEngine | Free Financial Calculators",
    description:
      "Learn about CalcEngine — the fastest, most accurate free financial calculators on the web.",
    url: "https://calcengine.org/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About CalcEngine | Free Financial Calculators",
    description:
      "Learn about CalcEngine — the fastest, most accurate free financial calculators on the web. All calculations run client-side for complete privacy.",
  },
  alternates: {
    canonical: "/about",
  },
};

/* ─── Feature cards data ─── */

const features = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#22C55E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: "Accurate Formulas",
    description:
      "We use the same formulas financial institutions use. Every calculator is built from industry-standard equations, reviewed for precision, and tested against real-world scenarios to ensure you get results you can trust.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#22C55E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Real-Time Results",
    description:
      "Every calculation updates instantly as you type. No submit buttons, no page reloads, no waiting. Adjust any input and see your results change in real time so you can explore different scenarios effortlessly.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#22C55E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Privacy First",
    description:
      "All math runs in your browser. We never see your financial data. Your salary, debts, savings, and tax information stay on your device and are never transmitted to our servers or any third party.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#22C55E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Always Free",
    description:
      "No paywalls, no signup, no premium tiers. Every single calculator on CalcEngine is completely free to use, today and always. We believe financial tools should be accessible to everyone.",
  },
];

/* ─── Page Component ─── */

export default function AboutPage() {
  return (
    <>
      {/* ─── Hero / Intro ─── */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.08),transparent)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl animate-fade-in-up">
            About <span className="text-accent-primary">CalcEngine</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted leading-relaxed animate-fade-in-up animate-fade-in-up-delay-1">
            We build the fastest, most accurate financial calculators on the
            web.
          </p>
        </div>
      </section>

      {/* ─── Mission Statement ─── */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="rounded-2xl border border-border bg-bg-surface p-8 sm:p-10 lg:p-12">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Our Mission
          </h2>
          <div className="mt-6 space-y-4 text-text-muted leading-relaxed">
            <p>
              CalcEngine exists to make financial decision-making easier for
              everyone. We believe that access to accurate, easy-to-use
              financial tools should not be locked behind paywalls or require
              you to hand over personal information.
            </p>
            <p>
              Every calculation on CalcEngine runs entirely client-side in your
              browser. Your financial data &mdash; your salary, savings, debts,
              and tax details &mdash; never leaves your device. There are no
              servers processing your numbers and no databases storing your
              inputs.
            </p>
            <p>
              CalcEngine is completely free to use. There are no premium tiers,
              no sign-up requirements, and no paywalls. All 30 of our
              calculators are available to everyone, all the time.
            </p>
            <p>
              We update our tools annually to reflect the latest tax brackets,
              contribution limits, interest rate environments, and regulatory
              changes so you always have the most current information at your
              fingertips.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Why CalcEngine? Feature Cards ─── */}
      <section className="border-t border-border bg-bg-surface/40">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Why CalcEngine?
            </h2>
            <p className="mt-3 text-text-muted">
              Four principles that guide everything we build.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-bg-surface p-8 transition-all duration-200 hover:border-accent-primary/30 hover:shadow-lg hover:shadow-accent-primary/5"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-primary/10">
                  {feature.icon}
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-text-primary">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm text-text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Our Calculators ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Our Calculators
          </h2>
          <div className="mt-6 space-y-4 text-text-muted leading-relaxed">
            <p>
              CalcEngine offers 30 free financial calculators spanning
              mortgages, salary conversions, retirement planning, tax
              estimation, debt payoff, and government pay. Whether you are
              buying your first home, negotiating a raise, planning for
              retirement, or paying down student loans, we have a tool to help
              you make smarter decisions.
            </p>
            <p>
              Every calculator features real-time results, clear breakdowns,
              and visual charts so you can understand your finances at a
              glance.
            </p>
          </div>
          <Link
            href="/calculators"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-accent-primary px-6 py-3 text-sm font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-primary/90 hover:shadow-lg hover:shadow-accent-primary/20"
          >
            Browse All Calculators
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
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section className="border-t border-border bg-bg-surface/40">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Contact Us
          </h2>
          <p className="mt-4 text-text-muted leading-relaxed">
            Have a question, found a bug, or want to suggest a new calculator?
            We would love to hear from you.
          </p>
          <div className="mt-8 rounded-xl border border-border bg-bg-surface p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-secondary/10">
                  <svg
                    width="20"
                    height="20"
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
                </div>
                <div>
                  <p className="text-xs font-medium text-text-muted uppercase tracking-wider">
                    Email
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-text-primary">
                    hello@calcengine.org
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-secondary/10">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-text-muted uppercase tracking-wider">
                    GitHub
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-text-primary">
                    github.com/calcengine
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
