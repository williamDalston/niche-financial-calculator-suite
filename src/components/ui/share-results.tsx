"use client";

import { useState, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  ShareResults                                                       */
/*  A compact share/copy/print bar for calculator result output        */
/* ------------------------------------------------------------------ */

interface ShareResultsProps {
  title: string;
  results: Record<string, string>;
  className?: string;
  /** Optional callback that returns a shareable URL with calculator state encoded as query params. */
  getShareUrl?: () => string;
}

/* ----- Icons (inline SVG, 16x16) ----- */

function ClipboardIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="2" width="6" height="4" rx="1" />
      <path d="M9 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function PrinterIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  );
}

/* ----- Helper: build a formatted plain-text summary ----- */

function buildTextSummary(
  title: string,
  results: Record<string, string>,
  url?: string,
): string {
  const lines = [`${title}`, ""];
  for (const [key, val] of Object.entries(results)) {
    lines.push(`${key}: ${val}`);
  }
  lines.push("", `Calculated at ${url ?? window.location.href}`);
  return lines.join("\n");
}

/* ----- Component ----- */

export function ShareResults({
  title,
  results,
  className,
  getShareUrl,
}: ShareResultsProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const [shareState, setShareState] = useState<"idle" | "shared">("idle");

  /* --- Copy Results --- */
  const handleCopy = useCallback(async () => {
    const url = getShareUrl ? getShareUrl() : undefined;
    const text = buildTextSummary(title, results, url);
    try {
      await navigator.clipboard.writeText(text);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      /* Fallback for non-secure contexts */
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2000);
    }
  }, [title, results, getShareUrl]);

  /* --- Share Link --- */
  const handleShare = useCallback(async () => {
    const url = getShareUrl ? getShareUrl() : window.location.href;
    const shareData = {
      title,
      text: buildTextSummary(title, results, url),
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareState("shared");
        setTimeout(() => setShareState("idle"), 2000);
      } catch {
        /* User cancelled -- silently ignore */
      }
    } else {
      /* Fallback: copy URL */
      try {
        await navigator.clipboard.writeText(url);
        setShareState("shared");
        setTimeout(() => setShareState("idle"), 2000);
      } catch {
        /* Ignore clipboard errors */
      }
    }
  }, [title, results, getShareUrl]);

  /* --- Print --- */
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  /* Shared button classes */
  const btnClass =
    "flex items-center gap-2 rounded-lg border border-border bg-border px-3.5 py-2 text-xs font-medium text-text-muted transition-colors hover:bg-accent-primary/10 hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary/50";

  return (
    <div
      className={`flex flex-wrap items-center gap-2 rounded-lg border border-border bg-bg-surface p-3 ${className ?? ""}`}
      role="toolbar"
      aria-label="Share calculator results"
    >
      {/* Copy Results */}
      <button
        type="button"
        onClick={handleCopy}
        className={btnClass}
        aria-label={
          copyState === "copied" ? "Results copied" : "Copy results to clipboard"
        }
      >
        {copyState === "copied" ? <CheckIcon /> : <ClipboardIcon />}
        <span>{copyState === "copied" ? "Copied!" : "Copy Results"}</span>
      </button>

      {/* Share Link */}
      <button
        type="button"
        onClick={handleShare}
        className={btnClass}
        aria-label={
          shareState === "shared"
            ? "Link shared"
            : "Share calculator link"
        }
      >
        {shareState === "shared" ? <CheckIcon /> : <ShareIcon />}
        <span>
          {shareState === "shared" ? "Shared!" : "Share Link"}
        </span>
      </button>

      {/* Print */}
      <button
        type="button"
        onClick={handlePrint}
        className={btnClass}
        aria-label="Print results"
      >
        <PrinterIcon />
        <span>Print</span>
      </button>
    </div>
  );
}

export type { ShareResultsProps };
export default ShareResults;
