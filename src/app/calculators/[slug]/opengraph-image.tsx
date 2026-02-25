import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "CalcEngine Calculator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const calculatorTitles: Record<string, string> = {
  "401k-calculator": "401(k) Calculator",
  "auto-loan-calculator": "Auto Loan Calculator",
  "compound-interest-calculator": "Compound Interest Calculator",
  "cost-of-living-calculator": "Cost of Living Calculator",
  "debt-payoff-calculator": "Debt Payoff Calculator",
  "emergency-fund-calculator": "Emergency Fund Calculator",
  "federal-tax-calculator": "Federal Tax Calculator",
  "fers-retirement-calculator": "FERS Retirement Calculator",
  "freelance-rate-calculator": "Freelance Rate Calculator",
  "gs-pay-calculator": "GS Pay Calculator",
  "home-affordability-calculator": "Home Affordability Calculator",
  "hourly-to-salary": "Hourly to Salary Calculator",
  "inflation-calculator": "Inflation Calculator",
  "loan-calculator": "Loan Calculator",
  "military-pay-calculator": "Military Pay Calculator",
  "mortgage-calculator": "Mortgage Calculator",
  "net-worth-calculator": "Net Worth Calculator",
  "overtime-calculator": "Overtime Calculator",
  "pension-calculator": "Pension Calculator",
  "raise-calculator": "Raise Calculator",
  "rent-vs-buy-calculator": "Rent vs Buy Calculator",
  "retirement-calculator": "Retirement Calculator",
  "salary-to-hourly": "Salary to Hourly Calculator",
  "self-employment-tax-calculator": "Self-Employment Tax Calculator",
  "social-security-estimator": "Social Security Estimator",
  "student-loan-calculator": "Student Loan Calculator",
  "take-home-pay-calculator": "Take-Home Pay Calculator",
  "tip-calculator": "Tip Calculator",
  "tsp-calculator": "TSP Calculator",
  "wage-gap-calculator": "Wage Gap Calculator",
};

function slugToTitle(slug: string): string {
  if (calculatorTitles[slug]) {
    return calculatorTitles[slug];
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
  const title = slugToTitle(slug);

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

        {/* Calculator title */}
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
            {title}
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
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "24px",
            fontWeight: 400,
            color: "#94A3B8",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Free Online Calculator &bull; CalcEngine.io
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
