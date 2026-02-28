import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "CalcEngine — Free Financial Calculators";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
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

        {/* Logo text */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              fontSize: "80px",
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-2px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Calc
          </span>
          <span
            style={{
              fontSize: "80px",
              fontWeight: 700,
              color: "#22C55E",
              letterSpacing: "-2px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Engine
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "32px",
            fontWeight: 400,
            color: "#94A3B8",
            marginBottom: "48px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Free Financial Calculators
        </div>

        {/* Green accent line */}
        <div
          style={{
            width: "120px",
            height: "4px",
            backgroundColor: "#22C55E",
            borderRadius: "2px",
            display: "flex",
          }}
        />

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
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
