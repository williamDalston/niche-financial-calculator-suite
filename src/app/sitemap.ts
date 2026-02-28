import type { MetadataRoute } from "next";

const BASE_URL = "https://calcengine.org";

/* ─── Content dates ─── */

/** Date the site launched / content was last substantively updated. */
const SITE_LAUNCH = "2026-02-24";

const calculatorSlugs = [
  "401k-calculator",
  "auto-loan-calculator",
  "compound-interest-calculator",
  "cost-of-living-calculator",
  "debt-payoff-calculator",
  "emergency-fund-calculator",
  "federal-tax-calculator",
  "fers-retirement-calculator",
  "freelance-rate-calculator",
  "gs-pay-calculator",
  "home-affordability-calculator",
  "hourly-to-salary",
  "inflation-calculator",
  "loan-calculator",
  "military-pay-calculator",
  "mortgage-calculator",
  "net-worth-calculator",
  "overtime-calculator",
  "pension-calculator",
  "raise-calculator",
  "rent-vs-buy-calculator",
  "retirement-calculator",
  "salary-to-hourly",
  "self-employment-tax-calculator",
  "social-security-estimator",
  "student-loan-calculator",
  "take-home-pay-calculator",
  "tip-calculator",
  "tsp-calculator",
  "wage-gap-calculator",
] as const;

const categorySlugs = [
  "debt-and-loans",
  "government-pay",
  "mortgage-and-housing",
  "retirement-and-investing",
  "salary-and-career",
  "tax-calculators",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const homepage: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: SITE_LAUNCH,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  const calculatorPages: MetadataRoute.Sitemap = calculatorSlugs.map(
    (slug) => ({
      url: `${BASE_URL}/calculators/${slug}`,
      lastModified: SITE_LAUNCH,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  const categoryPages: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${BASE_URL}/category/${slug}`,
    lastModified: SITE_LAUNCH,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/about`,
      lastModified: SITE_LAUNCH,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: SITE_LAUNCH,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/compare`,
      lastModified: SITE_LAUNCH,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/compare/rent-vs-buy`,
      lastModified: SITE_LAUNCH,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/compare/401k-vs-ira`,
      lastModified: SITE_LAUNCH,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/compare/roth-vs-traditional-ira`,
      lastModified: SITE_LAUNCH,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/compare/fixed-vs-variable-mortgage`,
      lastModified: SITE_LAUNCH,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/compare/avalanche-vs-snowball`,
      lastModified: SITE_LAUNCH,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/calculators`,
      lastModified: SITE_LAUNCH,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: SITE_LAUNCH,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: SITE_LAUNCH,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/editorial-policy`,
      lastModified: SITE_LAUNCH,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  return [...homepage, ...calculatorPages, ...categoryPages, ...staticPages];
}
