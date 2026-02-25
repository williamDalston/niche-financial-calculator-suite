"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Calculators", href: "/calculators" },
  { label: "Guides", href: "/compare" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-border backdrop-blur-sm transition-all duration-300 ${scrolled ? "bg-bg-surface shadow-lg shadow-black/20" : "bg-bg-surface/95"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Wordmark */}
        <Link href="/" className="flex items-center gap-2 group">
          {/* Icon mark */}
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-primary/10">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="16" height="16" rx="3" stroke="#22C55E" strokeWidth="1.5" />
              <path d="M6 14V8" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M10 14V6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M14 14V10" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          {/* Wordmark */}
          <span className="font-display text-xl font-extrabold text-text-primary tracking-tight">
            Calc<span className="text-accent-primary">Engine</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-accent-primary bg-accent-primary/5"
                  : "text-text-muted hover:text-text-primary hover:bg-bg-primary/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex md:hidden items-center justify-center rounded-md p-2 text-text-muted hover:text-text-primary hover:bg-bg-primary/50 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            /* X icon */
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          ) : (
            /* Hamburger icon */
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="border-t border-border md:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-3 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-accent-primary bg-accent-primary/5"
                    : "text-text-muted hover:text-text-primary hover:bg-bg-primary/50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}

      {/* Subtle gradient line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent"
        aria-hidden="true"
      />
    </header>
  );
}
