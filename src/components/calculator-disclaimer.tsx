import Link from "next/link";

/**
 * YMYL trust signal disclaimer for calculator pages.
 * Displays educational disclaimer, data sources, and links to editorial policy.
 */
export function CalculatorDisclaimer({
  sources,
}: {
  sources?: { name: string; url?: string }[];
}) {
  return (
    <aside
      className="mt-12 rounded-lg border border-border/60 bg-bg-surface/50 p-5 text-sm text-text-muted"
      aria-label="Calculator disclaimer and sources"
    >
      <div className="flex items-start gap-3">
        <svg
          className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-warning"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <div className="space-y-3">
          <p>
            <strong className="text-text-primary">Educational purposes only.</strong>{" "}
            This calculator provides estimates for informational purposes and should
            not be considered financial, tax, or legal advice. Results may differ
            from actual outcomes due to individual circumstances, rounding, or
            factors not captured by this tool. Consult a qualified professional
            before making financial decisions.
          </p>

          {sources && sources.length > 0 && (
            <p>
              <strong className="text-text-primary">Data sources:</strong>{" "}
              {sources.map((source, i) => (
                <span key={source.name}>
                  {source.url ? (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-secondary hover:text-accent-primary transition-colors"
                    >
                      {source.name}
                    </a>
                  ) : (
                    source.name
                  )}
                  {i < sources.length - 1 && ", "}
                </span>
              ))}
              .
            </p>
          )}

          <p className="text-xs">
            <Link
              href="/editorial-policy"
              className="text-accent-secondary hover:text-accent-primary transition-colors"
            >
              How we build our calculators
            </Link>
            {" · "}
            <a
              href="mailto:info@alstonanalytics.com?subject=CalcEngine%20Issue%20Report"
              className="text-accent-secondary hover:text-accent-primary transition-colors"
            >
              Report an issue
            </a>
          </p>
        </div>
      </div>
    </aside>
  );
}
