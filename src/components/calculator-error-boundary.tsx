"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class CalculatorErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-xl border border-accent-warning/30 bg-accent-warning/5 p-4 sm:p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-warning/10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
          </div>
          <p className="mt-4 font-display text-lg font-semibold text-accent-warning">
            Calculator temporarily unavailable
          </p>
          <p className="mt-2 text-sm text-text-muted">
            Try refreshing the page. If the problem persists, try a different browser.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-accent-warning px-5 py-2.5 text-sm font-semibold text-bg-primary transition-colors hover:bg-accent-warning/90"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
