/* Premium loading skeleton with shimmer effect */

export function CalculatorSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading calculator">
      {/* Input fields skeleton */}
      <div className="rounded-xl border border-border bg-bg-surface p-6 space-y-4 animate-scale-in">
        <div className="h-5 w-32 rounded shimmer" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="h-4 w-24 rounded shimmer" />
              <div className="h-10 w-full rounded-lg shimmer" />
            </div>
          ))}
        </div>
      </div>

      {/* Results skeleton */}
      <div className="rounded-xl border border-border bg-bg-surface p-6 space-y-4 animate-scale-in animate-scale-in-delay-1">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-20 rounded shimmer" />
              <div className="h-8 w-28 rounded shimmer" />
            </div>
          ))}
        </div>
      </div>

      {/* Chart skeleton */}
      <div className="rounded-xl border border-border bg-bg-surface p-6 animate-scale-in animate-scale-in-delay-2">
        <div className="h-4 w-36 rounded shimmer mb-4" />
        <div className="h-64 w-full rounded-lg shimmer" />
      </div>

      <span className="sr-only">Loading calculator...</span>
    </div>
  );
}
