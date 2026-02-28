import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | CalcEngine",
  description:
    "Get in touch with CalcEngine. Report bugs, suggest features, or ask questions about our free financial calculators.",
  openGraph: {
    title: "Contact Us | CalcEngine",
    description:
      "Get in touch with CalcEngine. Report bugs, suggest features, or ask questions about our free financial calculators.",
    url: "https://calcengine.org/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | CalcEngine",
    description:
      "Get in touch with CalcEngine. Report bugs, suggest features, or ask questions about our free financial calculators.",
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
    detail: "hello@calcengine.org",
    href: "mailto:hello@calcengine.org",
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
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </svg>
    ),
    title: "Feature Requests",
    description: "Have an idea for a new calculator or improvement? We'd love to hear it.",
    detail: "hello@calcengine.org",
    href: "mailto:hello@calcengine.org?subject=CalcEngine%20Feature%20Request",
    linkLabel: "Suggest a feature",
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
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    ),
    title: "Bug Reports",
    description: "Found something that doesn't look right? Let us know so we can fix it.",
    detail: "hello@calcengine.org",
    href: "mailto:hello@calcengine.org?subject=CalcEngine%20Bug%20Report",
    linkLabel: "Report a bug",
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

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* --- Hero / Intro --- */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.08),transparent)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl animate-fade-in-up">
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
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
