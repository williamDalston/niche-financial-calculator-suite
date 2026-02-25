import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";
import { AdSenseScript } from "@/components/adsense-script";
import { Analytics } from "@/components/analytics";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://calcengine.io"),
  title: {
    default: "CalcEngine | Free Financial Calculators",
    template: "%s | CalcEngine",
  },
  description:
    "Free, fast, and accurate financial calculators for mortgages, salary, retirement, taxes, debt payoff, and more. Make smarter money decisions with CalcEngine.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://calcengine.io",
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
    },
  },
  other: {
    "theme-color": "#0B1120",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/icon.svg",
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
      </head>
      <body className="min-h-screen bg-bg-primary text-text-primary font-body antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-accent-primary focus:px-4 focus:py-2 focus:text-bg-primary focus:font-semibold focus:outline-none">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="min-h-[calc(100vh-160px)]">{children}</main>
        <Footer />
        <CookieConsent />
        <AdSenseScript />
        <Analytics />
      </body>
    </html>
  );
}
