import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | CalcEngine",
  description:
    "Get in touch with CalcEngine. Report bugs, suggest features, or ask questions about our free financial calculators.",
  openGraph: {
    title: "Contact Us | CalcEngine",
    description:
      "Get in touch with CalcEngine. Report bugs, suggest features, or ask questions about our free financial calculators.",
    url: "https://calcengine.io/contact",
  },
  alternates: {
    canonical: "/contact",
  },
};

/* --- Contact methods data --- */

const contactMethods = [
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
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    title: "Email",
    description: "Send us a message and we'll get back to you as soon as we can.",
    detail: "contact@calcengine.io",
    href: "mailto:contact@calcengine.io",
    linkLabel: "Send an email",
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
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
    title: "GitHub",
    description: "Report an issue or suggest a feature on our GitHub repository.",
    detail: "github.com/calcengine",
    href: "https://github.com/calcengine",
    linkLabel: "Open GitHub",
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
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    ),
    title: "Twitter / X",
    description: "Follow us for updates, tips, and new calculator announcements.",
    detail: "@calcengine",
    href: "https://x.com/calcengine",
    linkLabel: "Follow on X",
  },
];

/* --- FAQ data --- */

const faqs = [
  {
    question: "Is CalcEngine free?",
    answer:
      "Yes, completely. Every calculator on CalcEngine is free to use with no sign-up, no premium tiers, and no paywalls. We believe financial tools should be accessible to everyone.",
  },
  {
    question: "Where does my data go?",
    answer:
      "Nowhere. All calculations run entirely in your browser. Your financial data never leaves your device and is never sent to our servers or any third party.",
  },
  {
    question: "Can I suggest a new calculator?",
    answer:
      "Absolutely! We love hearing what tools would be most useful to you. Send us an email or open a GitHub issue with your suggestion and we will consider it for a future release.",
  },
  {
    question: "I found a bug. How do I report it?",
    answer:
      "Thank you for helping us improve! The fastest way to report a bug is to open an issue on our GitHub repository with details about what you were doing and what went wrong. You can also email us directly.",
  },
];

/* --- Page Component --- */

export default function ContactPage() {
  return (
    <>
      {/* --- Hero / Intro --- */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.08),transparent)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl animate-fade-in-up">
            Contact <span className="text-accent-primary">Us</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted leading-relaxed animate-fade-in-up animate-fade-in-up-delay-1">
            Have a question, suggestion, or found a bug? We&apos;d love to hear
            from you.
          </p>
        </div>
      </section>

      {/* --- Contact Methods --- */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Get in Touch
          </h2>
          <p className="mt-3 text-text-muted">
            Choose the method that works best for you.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {contactMethods.map((method) => (
            <a
              key={method.title}
              href={method.href}
              target={method.href.startsWith("http") ? "_blank" : undefined}
              rel={
                method.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="group rounded-xl border border-border bg-bg-surface p-8 transition-all duration-200 hover:border-accent-primary/30 hover:shadow-lg hover:shadow-accent-primary/5"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-primary/10">
                {method.icon}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-text-primary">
                {method.title}
              </h3>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">
                {method.description}
              </p>
              <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-primary transition-colors group-hover:text-accent-primary/80">
                {method.linkLabel}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section className="border-t border-border bg-bg-surface/40">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Before You Reach Out
            </h2>
            <p className="mt-3 text-text-muted">
              You might find your answer here.
            </p>
          </div>
          <div className="mt-12 space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-border bg-bg-surface p-6 sm:p-8"
              >
                <h3 className="font-display text-base font-semibold text-text-primary sm:text-lg">
                  {faq.question}
                </h3>
                <p className="mt-3 text-sm text-text-muted leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
