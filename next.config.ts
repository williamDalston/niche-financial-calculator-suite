import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://adservice.google.com https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https: blob:",
      "font-src 'self'",
      "connect-src 'self' https://pagead2.googlesyndication.com https://www.google-analytics.com https://adservice.google.com https://vitals.vercel-insights.com https://va.vercel-scripts.com",
      "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  trailingSlash: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // Common calculator misspellings and alternates
      { source: "/calculator", destination: "/calculators", permanent: true },
      { source: "/calc", destination: "/calculators", permanent: true },
      { source: "/tools", destination: "/calculators", permanent: true },
      // Mortgage variations
      { source: "/mortgage", destination: "/calculators/mortgage-calculator", permanent: true },
      { source: "/calculators/mortgage", destination: "/calculators/mortgage-calculator", permanent: true },
      // 401k variations
      { source: "/401k", destination: "/calculators/401k-calculator", permanent: true },
      { source: "/calculators/401k", destination: "/calculators/401k-calculator", permanent: true },
      // Retirement variations
      { source: "/retirement", destination: "/calculators/retirement-calculator", permanent: true },
      // Tax variations
      { source: "/tax", destination: "/calculators/federal-tax-calculator", permanent: true },
      { source: "/taxes", destination: "/category/tax-calculators", permanent: true },
      // Salary variations
      { source: "/salary", destination: "/calculators/salary-to-hourly", permanent: true },
    ];
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
