"use client";

import { useEffect, useRef } from "react";
import { trackCalculatorView } from "@/lib/track-event";

/**
 * Tracks calculator page views on mount.
 * Renders nothing — purely for analytics.
 */
export function CalculatorViewTracker({
  slug,
  category,
}: {
  slug: string;
  category: string;
}) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackCalculatorView(slug, category);
  }, [slug, category]);

  return null;
}
