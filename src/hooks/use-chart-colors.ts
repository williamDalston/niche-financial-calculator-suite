"use client";

import { useEffect, useState } from "react";

const lightColors = {
  bg: "#FFFFFF",
  surface: "#F8FAFC",
  border: "#E2E8F0",
  textPrimary: "#1E293B",
  textMuted: "#64748B",
  green: "#16A34A",
  blue: "#2563EB",
  amber: "#D97706",
  greenLight: "#DCFCE7",
  blueLight: "#DBEAFE",
  amberLight: "#FEF3C7",
};

const darkColors = {
  bg: "#0B1120",
  surface: "#162032",
  border: "#1E293B",
  textPrimary: "#F1F5F9",
  textMuted: "#94A3B8",
  green: "#22C55E",
  blue: "#3B82F6",
  amber: "#F59E0B",
  greenLight: "#22C55E20",
  blueLight: "#3B82F620",
  amberLight: "#F59E0B20",
};

export type ChartColors = typeof lightColors;

function getColors(): ChartColors {
  if (typeof document === "undefined") return darkColors;
  return document.documentElement.classList.contains("dark")
    ? darkColors
    : lightColors;
}

export function useChartColors(): ChartColors {
  const [colors, setColors] = useState<ChartColors>(getColors);

  useEffect(() => {
    setColors(getColors());

    const observer = new MutationObserver(() => {
      setColors(getColors());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return colors;
}
