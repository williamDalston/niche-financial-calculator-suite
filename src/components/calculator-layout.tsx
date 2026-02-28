import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AdUnit } from "@/components/ad-unit";
import { CalculatorErrorBoundary } from "@/components/calculator-error-boundary";
import { CalculatorDisclaimer } from "@/components/calculator-disclaimer";
import { CalculatorViewTracker } from "@/components/calculator-view-tracker";
import { CtaBlock } from "@/components/cta-block";
import { FaqSection } from "@/components/faq-section";
import { RelatedCalculators } from "@/components/related-calculators";

import type { BreadcrumbItem } from "@/components/breadcrumbs";
import type { FaqItem } from "@/components/faq-section";
import type { RelatedCalculator } from "@/components/related-calculators";
import type { CtaBlockProps } from "@/components/cta-block";

/* ------------------------------------------------------------------ */
/*  Public types -- re-exported so calculator pages import from here  */
/* ------------------------------------------------------------------ */

export type { BreadcrumbItem, FaqItem, RelatedCalculator, CtaBlockProps };

export interface CalculatorLayoutProps {
  /** The H1 text shown at the top of the page. */
  title: string;
  /** Meta description for the page (used in JSON-LD). */
  description: string;
  /** URL slug, e.g. "mortgage-calculator". */
  slug: string;
  /** Category for breadcrumbs. */
  category: { name: string; slug: string };
  /** The interactive calculator widget (rendered above the fold). */
  children: React.ReactNode;
  /** CTA button text. */
  ctaText?: string;
  /** CTA destination URL. */
  ctaHref?: string;
  /** CTA supporting description. */
  ctaDescription?: string;
  /** HTML string for the "How This Calculator Works" section (400-600 words). */
  howItWorks: string;
  /** Optional mathematical formula displayed in a styled code block. */
  formula?: string;
  /** 5-7 FAQ items rendered as an accordion with FAQPage schema. */
  faqs: FaqItem[];
  /** 4-6 related calculator cards shown in a responsive grid. */
  relatedCalculators: RelatedCalculator[];
  /** Optional HTML string for the editorial context section (300-500 words). */
  editorialContent?: string;
  /** Date the calculator was last updated (shown below the title). */
  lastUpdated?: string;
  /** Data sources for the disclaimer (optional). */
  sources?: { name: string; url?: string }[];
}

/* ------------------------------------------------------------------ */
/*  JSON-LD schema builders                                           */
/* ------------------------------------------------------------------ */

function buildFaqSchema(faqs: FaqItem[]) {
  return {
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
}

function buildWebAppSchema(title: string, description: string, slug: string) {
  return {
    "@type": "WebApplication",
    name: title,
    description,
    url: `https://calcengine.org/calculators/${slug}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "CalcEngine",
      url: "https://calcengine.org",
    },
  };
}

function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `https://calcengine.org${item.href}`,
    })),
  };
}

function buildArticleSchema(
  title: string,
  description: string,
  slug: string,
  lastUpdated?: string,
) {
  return {
    "@type": "Article",
    headline: title,
    description,
    url: `https://calcengine.org/calculators/${slug}`,
    ...(lastUpdated ? { dateModified: lastUpdated } : {}),
    author: {
      "@type": "Organization",
      name: "CalcEngine",
      url: "https://calcengine.org",
    },
    publisher: {
      "@type": "Organization",
      name: "CalcEngine",
      url: "https://calcengine.org",
      logo: {
        "@type": "ImageObject",
        url: "https://calcengine.org/favicon.svg",
      },
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Prose styling (shared by howItWorks and editorialContent)         */
/* ------------------------------------------------------------------ */

const proseClasses = [
  "text-text-muted leading-relaxed",
  // Headings
  "[&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-text-primary [&_h3]:font-display",
  "[&_h4]:mt-4 [&_h4]:mb-2 [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-text-primary [&_h4]:font-display",
  // Paragraphs
  "[&_p]:mb-4",
  // Lists
  "[&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6",
  "[&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6",
  "[&_li]:mb-1",
  // Inline emphasis
  "[&_strong]:text-text-primary",
  "[&_a]:text-accent-secondary [&_a:hover]:text-accent-primary",
].join(" ");

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

/**
 * Shared page layout for every calculator on CalcEngine.io.
 *
 * This is a **Server Component**. It renders the full page template:
 *
 *   1. Breadcrumbs  (Home > Category > Calculator Name)
 *   2. H1 title
 *   3. Calculator widget  (children -- above the fold)
 *   4. CTA block  (contextual affiliate recommendation)
 *   5. "How This Calculator Works" prose section
 *   6. FAQ accordion  (with FAQPage schema markup)
 *   7. Related calculators grid  (4-6 cards)
 *   8. Editorial context prose section
 *   9. JSON-LD structured data  (FAQPage, WebApplication, BreadcrumbList)
 */
/** Strip dangerous tags from HTML (script, iframe, object, embed, form). */
function sanitizeHtml(html: string): string {
  return html.replace(
    /<\s*\/?\s*(script|iframe|object|embed|form|link|style)\b[^>]*>/gi,
    ""
  );
}

/** Estimate reading time from an HTML string (strip tags, count words). */
function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
}

export function CalculatorLayout({
  title,
  description,
  slug,
  category,
  children,
  ctaText,
  ctaHref,
  ctaDescription,
  howItWorks,
  formula,
  faqs,
  relatedCalculators,
  editorialContent,
  lastUpdated,
  sources,
}: CalculatorLayoutProps) {
  /* ---------- Breadcrumb items ---------- */
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: category.name, href: `/category/${category.slug}` },
    {
      // Strip everything after the em-dash if the title follows the
      // "[Name] -- Free 2026 [Type]" convention.
      label: title.includes("\u2014") ? title.split("\u2014")[0].trim() : title,
      href: `/calculators/${slug}`,
    },
  ];

  const showCta = ctaText && ctaHref;

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* -------- Analytics: track page view -------- */}
      <CalculatorViewTracker slug={slug} category={category.slug} />

      {/* -------- 1. Breadcrumbs -------- */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* -------- Top gradient decoration -------- */}
      <div
        className="my-4 h-px bg-gradient-to-r from-transparent via-accent-primary/40 to-transparent"
        aria-hidden="true"
      />

      {/* -------- 2. H1 Title -------- */}
      <h1 className="mb-3 font-display text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl animate-fade-in-up">
        {title}
      </h1>

      {/* -------- Meta line (reading time + last updated) -------- */}
      <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-text-muted animate-fade-in-up">
        <span className="inline-flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
          {estimateReadingTime(howItWorks + (editorialContent ?? ""))} min read
        </span>
        {lastUpdated && (
          <>
            <span className="text-border" aria-hidden="true">|</span>
            <span>Updated {lastUpdated}</span>
          </>
        )}</div>

      {/* -------- 3. Calculator Widget (above the fold) -------- */}
      <div className="mb-8 animate-fade-in-up animate-fade-in-up-delay-1">
        <CalculatorErrorBoundary>{children}</CalculatorErrorBoundary>
      </div>

      {/* -------- 4. CTA Block -------- */}
      {showCta && (
        <div className="no-print" data-no-print>
          <CtaBlock
            text={ctaText}
            href={ctaHref}
            description={ctaDescription}
            slug={slug}
          />
        </div>
      )}

      {/* -------- 4b. Compact "Explore More" strip -------- */}
      {relatedCalculators.length > 0 && (
        <nav
          className="mt-8 no-print animate-fade-in-up animate-fade-in-up-delay-1"
          aria-label="Explore related calculators"
          data-no-print
        >
          <p className="mb-3 text-sm font-medium text-text-muted">
            Explore more calculators
          </p>
          <div className="flex flex-wrap gap-2">
            {relatedCalculators.slice(0, 3).map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculators/${calc.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-surface px-3.5 py-2.5 text-sm text-text-muted transition-colors hover:border-accent-primary/40 hover:text-accent-primary min-h-[44px]"
              >
                <span aria-hidden="true">{calc.icon}</span>
                {calc.title}
              </Link>
            ))}
          </div>
        </nav>
      )}

      {/* -------- 5. How This Calculator Works -------- */}
      <section className="mt-16 animate-fade-in-up animate-fade-in-up-delay-2" aria-labelledby="how-it-works-heading">
        <h2
          id="how-it-works-heading"
          className="mb-4 font-display text-2xl font-bold text-text-primary"
        >
          How This Calculator Works
        </h2>

        {formula && (
          <div className="mb-6 overflow-x-auto rounded-lg border border-border bg-bg-primary p-4">
            <pre className="font-mono text-sm leading-relaxed text-accent-primary">
              <code>{formula}</code>
            </pre>
          </div>
        )}

        <div
          className={proseClasses}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(howItWorks) }}
        />
      </section>

      {/* -------- 5b. In-article ad unit -------- */}
      <AdUnit className="mt-12" />

      {/* -------- 6. FAQ Section -------- */}
      <div className="animate-fade-in-up animate-fade-in-up-delay-3">
        <FaqSection faqs={faqs} slug={slug} />
      </div>

      {/* -------- 7. Related Calculators -------- */}
      <div className="no-print animate-fade-in-up animate-fade-in-up-delay-4" data-no-print>
        <RelatedCalculators calculators={relatedCalculators} fromSlug={slug} />
      </div>

      {/* -------- 8. Editorial Context -------- */}
      {editorialContent && (
        <section className="mt-16 no-print" aria-labelledby="editorial-heading" data-no-print>
          <h2
            id="editorial-heading"
            className="mb-4 font-display text-2xl font-bold text-text-primary"
          >
            What You Should Know
          </h2>
          <div
            className={proseClasses}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(editorialContent) }}
          />
        </section>
      )}

      {/* -------- 9. Disclaimer (YMYL trust signal) -------- */}
      <CalculatorDisclaimer sources={sources} />

      {/* -------- 10. JSON-LD Structured Data (combined @graph) -------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              buildFaqSchema(faqs),
              buildWebAppSchema(title, description, slug),
              buildBreadcrumbSchema(breadcrumbItems),
              buildArticleSchema(title, description, slug, lastUpdated),
            ],
          }),
        }}
      />
    </article>
  );
}

/* Also provide a default export for flexibility */
export default CalculatorLayout;
