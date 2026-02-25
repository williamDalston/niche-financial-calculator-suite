"use client";

import { useState, useCallback, useRef, useEffect } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface UseCalculatorStateOptions<T extends Record<string, number | string>> {
  defaults: T;
}

/* ------------------------------------------------------------------ */
/*  Helper: parse a URL param value back to the original type          */
/* ------------------------------------------------------------------ */

function coerce<V extends number | string>(raw: string, fallback: V): V {
  if (typeof fallback === "number") {
    const parsed = Number(raw);
    if (!Number.isFinite(parsed) || Math.abs(parsed) > 1e15) return fallback;
    return parsed as V;
  }
  return raw as V;
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

function useCalculatorState<T extends Record<string, number | string>>(
  options: UseCalculatorStateOptions<T>,
): [T, (key: keyof T, value: T[keyof T]) => void, () => string] {
  const { defaults } = options;

  /* ---- Build initial state from defaults + URL search params ---- */
  const [state, setStateRaw] = useState<T>(() => {
    if (typeof window === "undefined") return defaults;

    const params = new URLSearchParams(window.location.search);
    const merged = { ...defaults };

    for (const key of Object.keys(defaults) as Array<keyof T>) {
      const raw = params.get(key as string);
      if (raw !== null) {
        merged[key] = coerce(raw, defaults[key]) as T[keyof T];
      }
    }

    return merged;
  });

  /* ---- Debounce timer ref ---- */
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---- Flush URL on unmount so the last update always lands ---- */
  const pendingStateRef = useRef<T>(state);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  /* ---- Push state to URL (debounced) ---- */
  const syncUrl = useCallback((nextState: T) => {
    if (typeof window === "undefined") return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams();
      for (const [k, v] of Object.entries(nextState)) {
        params.set(k, String(v));
      }
      const url = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, "", url);
    }, 300);
  }, []);

  /* ---- setState: update React state + schedule URL sync ---- */
  const setState = useCallback(
    (key: keyof T, value: T[keyof T]) => {
      setStateRaw((prev) => {
        const next = { ...prev, [key]: value };
        pendingStateRef.current = next;
        syncUrl(next);
        return next;
      });
    },
    [syncUrl],
  );

  /* ---- getShareUrl: build a full URL with the current state ---- */
  const getShareUrl = useCallback((): string => {
    if (typeof window === "undefined") return "";

    const params = new URLSearchParams();
    const current = pendingStateRef.current;
    for (const [k, v] of Object.entries(current)) {
      params.set(k, String(v));
    }
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  }, []);

  return [state, setState, getShareUrl];
}

export { useCalculatorState };
export default useCalculatorState;
