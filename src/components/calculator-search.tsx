"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface SearchableCalculator {
  name: string;
  href: string;
  category: string;
  icon: string;
}

export function CalculatorSearch({
  calculators,
}: {
  calculators: SearchableCalculator[];
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results =
    query.trim().length > 0
      ? calculators.filter(
          (calc) =>
            calc.name.toLowerCase().includes(query.toLowerCase()) ||
            calc.category.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  const resultsLength = results.length;

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(-1);
  }, [resultsLength]);

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return;
    const items = listRef.current.querySelectorAll("[role='option']");
    items[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen || results.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : results.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (activeIndex >= 0 && results[activeIndex]) {
            router.push(results[activeIndex].href);
            setIsOpen(false);
            setQuery("");
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setActiveIndex(-1);
          break;
      }
    },
    [isOpen, results, activeIndex, router]
  );

  const activeId =
    activeIndex >= 0 && results[activeIndex]
      ? `search-option-${activeIndex}`
      : undefined;

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim().length > 0) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search calculators... (e.g., mortgage, 401k, salary)"
          className="w-full rounded-xl border border-[#1E293B] bg-[#162032] py-4 pl-12 pr-4 text-lg text-[#F1F5F9] placeholder:text-[#94A3B8]/60 focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 focus:outline-none transition-all"
          aria-label="Search calculators"
          aria-expanded={isOpen && results.length > 0}
          aria-haspopup="listbox"
          aria-controls="search-listbox"
          aria-activedescendant={activeId}
          role="combobox"
          aria-autocomplete="list"
        />
      </div>

      {isOpen && query.trim().length > 0 && (
        <div
          ref={listRef}
          id="search-listbox"
          className="absolute top-full left-0 right-0 z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-[#1E293B] bg-[#162032] shadow-2xl shadow-black/40"
          role="listbox"
          aria-label="Search results"
        >
          {results.length > 0 ? (
            results.map((calc, index) => (
              <Link
                key={calc.href}
                href={calc.href}
                id={`search-option-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                className={`flex items-center gap-3 px-4 py-3 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                  index === activeIndex
                    ? "bg-[#22C55E]/15 text-[#F1F5F9]"
                    : "hover:bg-[#22C55E]/10"
                }`}
                onClick={() => {
                  setIsOpen(false);
                  setQuery("");
                }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span className="text-xl flex-shrink-0" aria-hidden="true">
                  {calc.icon}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-[#F1F5F9] truncate">
                    {calc.name}
                  </div>
                  <div className="text-xs text-[#94A3B8] truncate">
                    {calc.category}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="px-4 py-6 text-center text-sm text-[#94A3B8]">
              No calculators found for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
