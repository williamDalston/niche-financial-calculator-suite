import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CalcEngine — Free Financial Calculators",
    short_name: "CalcEngine",
    description:
      "Free, fast, and accurate financial calculators for mortgages, salary, retirement, taxes, debt payoff, and more.",
    start_url: "/",
    display: "standalone",
    theme_color: "#0B1120",
    background_color: "#0B1120",
    orientation: "portrait",
    categories: ["finance", "utilities"],
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    shortcuts: [
      {
        name: "Mortgage Calculator",
        short_name: "Mortgage",
        url: "/calculators/mortgage-calculator",
        description: "Calculate monthly mortgage payments",
      },
      {
        name: "Salary to Hourly",
        short_name: "Salary",
        url: "/calculators/salary-to-hourly",
        description: "Convert salary to hourly rate",
      },
      {
        name: "Retirement Calculator",
        short_name: "Retirement",
        url: "/calculators/retirement-calculator",
        description: "Plan your retirement savings",
      },
      {
        name: "Take-Home Pay",
        short_name: "Pay",
        url: "/calculators/take-home-pay-calculator",
        description: "Calculate your net pay",
      },
    ],
  };
}
