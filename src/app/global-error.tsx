"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#0B1120",
          color: "#F1F5F9",
          fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Animated background gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(34, 197, 94, 0.06), transparent 70%), radial-gradient(ellipse 60% 40% at 20% 80%, rgba(59, 130, 246, 0.04), transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: 480,
            margin: "0 auto",
            textAlign: "center",
            padding: "0 24px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Animated warning icon */}
          <div
            style={{
              width: 80,
              height: 80,
              margin: "0 auto 32px",
              borderRadius: "50%",
              background: "rgba(245, 158, 11, 0.08)",
              border: "1px solid rgba(245, 158, 11, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
          </div>

          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.025em",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Something went wrong
          </h1>

          <p
            style={{
              color: "#94A3B8",
              marginTop: 16,
              lineHeight: 1.7,
              fontSize: 15,
            }}
          >
            An unexpected error occurred. Your financial data is safe — all
            calculations run locally in your browser.
          </p>

          <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center" }}>
            <button
              onClick={reset}
              style={{
                padding: "12px 28px",
                backgroundColor: "#22C55E",
                color: "#0B1120",
                border: "none",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: "0 0 20px rgba(34, 197, 94, 0.2)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(34, 197, 94, 0.3)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(34, 197, 94, 0.2)";
              }}
            >
              Try Again
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Global error boundary must be self-contained without Next.js dependencies */}
            <a
              href="/"
              style={{
                padding: "12px 28px",
                backgroundColor: "transparent",
                color: "#94A3B8",
                border: "1px solid #1E293B",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "#94A3B8";
                e.currentTarget.style.color = "#F1F5F9";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "#1E293B";
                e.currentTarget.style.color = "#94A3B8";
              }}
            >
              Go Home
            </a>
          </div>

          {/* Subtle branding */}
          <p
            style={{
              marginTop: 48,
              fontSize: 12,
              color: "#475569",
              letterSpacing: "0.05em",
            }}
          >
            CALCENGINE.IO
          </p>
        </div>
      </body>
    </html>
  );
}
