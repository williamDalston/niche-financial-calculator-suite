"use client";

import { useState, useCallback } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs: FaqItem[];
}

/**
 * Accordion-style FAQ section.
 *
 * Client component because it needs local state for expand/collapse behavior.
 * The matching FAQPage JSON-LD schema is emitted by CalculatorLayout so
 * structured data stays in one central place.
 */
export function FaqSection({ faqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  if (faqs.length === 0) return null;

  return (
    <section className="mt-16" aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="mb-6 text-2xl font-semibold text-[#F1F5F9]"
      >
        Frequently Asked Questions
      </h2>

      <div className="divide-y divide-[#1E293B] rounded-lg border border-[#1E293B] bg-[#162032]">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;
          const triggerId = `faq-trigger-${index}`;

          return (
            <div
              key={index}
              className={`border-l-2 transition-all duration-300 ${
                isOpen
                  ? "border-l-[#22C55E] bg-[#0B1120]/30"
                  : "border-l-transparent"
              }`}
            >
              <h3>
                <button
                  id={triggerId}
                  type="button"
                  className="flex w-full items-center justify-between px-5 py-4 text-left text-[#F1F5F9] transition-colors hover:bg-[#0B1120]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-inset"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                >
                  <span className="pr-4 font-medium">{faq.question}</span>

                  <svg
                    className={`h-5 w-5 shrink-0 text-[#94A3B8] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className="grid transition-all duration-300 ease-in-out"
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-4 pt-0 text-[#94A3B8] leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
