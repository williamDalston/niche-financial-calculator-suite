import Link from "next/link";

const calculatorCategories = [
  { label: "Mortgage & Housing", href: "/category/mortgage-and-housing" },
  { label: "Salary & Career", href: "/category/salary-and-career" },
  { label: "Retirement & Investing", href: "/category/retirement-and-investing" },
  { label: "Tax Calculators", href: "/category/tax-calculators" },
  { label: "Debt & Loans", href: "/category/debt-and-loans" },
  { label: "Government Pay", href: "/category/government-pay" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const resourceLinks = [
  { label: "All Calculators", href: "/calculators" },
  { label: "Guides", href: "/compare" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-bg-surface">
      {/* Subtle top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Footer grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 group">
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
              <span className="font-display text-lg font-bold text-text-primary tracking-tight">
                Calc<span className="text-accent-primary">Engine</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-text-muted leading-relaxed">
              Free, fast, and accurate financial calculators to help you make
              smarter money decisions.
            </p>
          </div>

          {/* Calculator Categories */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-text-primary">
              Calculator Categories
            </h3>
            <ul className="mt-4 space-y-2.5">
              {calculatorCategories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted transition-colors duration-200 hover:text-accent-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-text-primary">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted transition-colors duration-200 hover:text-accent-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-text-primary">
              Resources
            </h3>
            <ul className="mt-4 space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted transition-colors duration-200 hover:text-accent-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-border pt-6">
          <p className="text-center text-sm text-text-muted">
            &copy; {currentYear} CalcEngine. All rights reserved. Not financial
            advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
