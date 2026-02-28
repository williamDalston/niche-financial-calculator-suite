export default function CalculatorLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-4 h-4 w-48 rounded bg-border animate-pulse" />
      <div className="my-4 h-px bg-gradient-to-r from-transparent via-accent-primary/40 to-transparent" />
      <div className="mb-3 h-10 w-3/4 rounded bg-border animate-pulse" />
      <div className="mb-8 h-4 w-32 rounded bg-border animate-pulse" />
      <div className="h-[400px] rounded-xl border border-border bg-bg-surface animate-pulse" />
    </div>
  );
}
