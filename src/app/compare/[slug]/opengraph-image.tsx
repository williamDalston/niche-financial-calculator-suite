import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "CalcEngine Comparison Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const guideNames: Record<string, string> = {
  "rent-vs-buy": "Rent vs Buy",
  "401k-vs-ira": "401(k) vs IRA",
  "roth-vs-traditional-ira": "Roth vs Traditional IRA",
  "fixed-vs-variable-mortgage": "Fixed vs Variable Mortgage",
  "avalanche-vs-snowball": "Avalanche vs Snowball",
};

function slugToGuide(slug: string): string {
  if (guideNames[slug]) {
    return guideNames[slug];
  }
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guideName = slugToGuide(slug);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#0B1120",
          padding: "60px 80px",
        }}
      >
        {/* Green accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            backgroundColor: "#22C55E",
            display: "flex",
          }}
        />

        {/* CalcEngine branding */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginBottom: "auto",
          }}
        >
          <span
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-1px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Calc
          </span>
          <span
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#22C55E",
              letterSpacing: "-1px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Engine
          </span>
        </div>

        {/* Guide title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "auto",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.1,
              letterSpacing: "-2px",
              maxWidth: "900px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {guideName}
          </div>

          {/* Green accent line */}
          <div
            style={{
              width: "80px",
              height: "4px",
              backgroundColor: "#22C55E",
              borderRadius: "2px",
              marginTop: "24px",
              display: "flex",
            }}
          />

          {/* Subtitle */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: 400,
              color: "#94A3B8",
              marginTop: "20px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Complete 2026 Guide
          </div>
        </div>

        {/* URL at bottom */}
        <div
          style={{
            fontSize: "22px",
            fontWeight: 500,
            color: "#475569",
            fontFamily: "Inter, sans-serif",
          }}
        >
          calcengine.org
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
