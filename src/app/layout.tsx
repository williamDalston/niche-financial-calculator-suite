import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";
import { AdSenseScript } from "@/components/adsense-script";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://calcengine.org"),
  title: {
    default: "CalcEngine | Free Financial Calculators",
    template: "%s | CalcEngine",
  },
  description:
    "Free, fast, and accurate financial calculators for mortgages, salary, retirement, taxes, debt payoff, and more. Make smarter money decisions with CalcEngine.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://calcengine.org",
    siteName: "CalcEngine",
    title: "CalcEngine | Free Financial Calculators",
    description:
      "Free, fast, and accurate financial calculators for mortgages, salary, retirement, taxes, debt payoff, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CalcEngine | Free Financial Calculators",
    description:
      "Free, fast, and accurate financial calculators for mortgages, salary, retirement, taxes, debt payoff, and more.",
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || process.env.NEXT_PUBLIC_BING_VERIFICATION
    ? {
        verification: {
          ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
            ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION }
            : {}),
          ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
            ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } }
            : {}),
        },
      }
    : {}),
  other: {
    "theme-color": "#0B1120",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CalcEngine",
  url: "https://calcengine.org",
  logo: "https://calcengine.org/favicon.svg",
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@calcengine.org",
    contactType: "customer support",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XRRR3GVE2V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XRRR3GVE2V');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-bg-primary text-text-primary font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-accent-primary focus:px-4 focus:py-2 focus:text-bg-primary focus:font-semibold focus:outline-none">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="min-h-[calc(100vh-160px)]">{children}</main>
        <Footer />
        <CookieConsent />
        <AdSenseScript />
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
