import type { Metadata } from "next";

const SITE_NAME = "CalcEngine";
const SITE_URL = "https://calcengine.org";

/**
 * Build a complete Metadata object with OpenGraph, Twitter, and canonical URL.
 *
 * Using this helper guarantees that every page gets the full set of metadata
 * fields — no more one-off pages missing Twitter cards or OG tags.
 *
 * Usage:
 *   export const metadata = buildMetadata({
 *     title: "Mortgage Calculator | CalcEngine",
 *     description: "Calculate your monthly mortgage payment...",
 *     path: "/calculators/mortgage-calculator",
 *   });
 */
export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: path,
    },
  };
}
