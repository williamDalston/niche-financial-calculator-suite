"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  AnimatedNumber,
  CurrencyInput,
  CustomSlider,
  ShareResults,
  StatCard,
} from "@/components/ui";
import { formatCurrencyExact } from "@/lib/formatters";
import { useCalculatorState } from "@/hooks/use-calculator-state";
import { useChartColors } from "@/hooks/use-chart-colors";

const TIP_PRESETS = [15, 18, 20, 22, 25];

export function TipCalculatorWidget() {
  const COLORS = {
    ...useChartColors(),
    primary: "#22C55E",
    secondary: "#3B82F6",
    warning: "#F59E0B",
  };
  const [state, setState, getShareUrl] = useCalculatorState({
    defaults: {
      billAmount: 85,
      tipPercent: 20,
      numPeople: 1,
      roundUp: 0,
      preTaxMode: 0,
      taxAmount: 0,
    }, slug: "tip-calculator",
  });

  // UI-only state (not persisted in URL)
  const [customTip, setCustomTip] = useState(false);

  const results = useMemo(() => {
    const tipBase = !!state.preTaxMode && state.taxAmount > 0
      ? Math.max(state.billAmount - state.taxAmount, 0)
      : state.billAmount;
    const rawTip = tipBase * (state.tipPercent / 100);

    let totalBill = state.billAmount + rawTip;
    let tipAmount = rawTip;

    if (state.roundUp) {
      totalBill = Math.ceil(totalBill);
      tipAmount = totalBill - state.billAmount;
    }

    const people = Math.max(state.numPeople, 1);
    const perPersonTotal = totalBill / people;
    const perPersonTip = tipAmount / people;

    // Comparison table at different percentages
    const comparisonPercentages = [10, 15, 18, 20, 22, 25, 30];
    const comparison = comparisonPercentages.map((pct) => {
      const tip = tipBase * (pct / 100);
      let total = state.billAmount + tip;
      if (state.roundUp) {
        total = Math.ceil(total);
      }
      return {
        percent: `${pct}%`,
        tip: state.roundUp ? total - state.billAmount : tip,
        total,
        perPerson: total / people,
        isSelected: pct === state.tipPercent,
      };
    });

    return {
      tipAmount,
      totalBill,
      perPersonTip,
      perPersonTotal,
      comparison,
    };
  }, [state.billAmount, state.tipPercent, state.numPeople, state.roundUp, state.preTaxMode, state.taxAmount]);

  const chartData = results.comparison.map((c) => ({
    name: c.percent,
    tip: Math.round(c.tip * 100) / 100,
    isSelected: c.isSelected,
  }));

  const shareResultsData: Record<string, string> = {
    "Tip Amount": formatCurrencyExact(results.tipAmount),
    "Total Bill": formatCurrencyExact(results.totalBill),
    "Tip Percentage": `${state.tipPercent}%`,
    ...(state.numPeople > 1
      ? {
          "Per Person Tip": formatCurrencyExact(results.perPersonTip),
          "Per Person Total": formatCurrencyExact(results.perPersonTotal),
          "Split Between": `${state.numPeople} people`,
        }
      : {}),
  };

  return (
    <div className="rounded-xl border border-border bg-bg-surface p-6 md:p-8">
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          {/* Bill Amount */}
          <CurrencyInput
            label="Bill Amount"
            value={state.billAmount}
            onChange={(v) => setState('billAmount', v)}
            min={0}
            max={10000}
            step={1}
          />

          {/* Tip Percentage */}
          <div>
            <label className="mb-2 block text-sm font-medium text-text-muted">
              Tip Percentage
            </label>
            <div className="flex flex-wrap gap-2">
              {TIP_PRESETS.map((pct) => (
                <button
                  key={pct}
                  onClick={() => {
                    setState('tipPercent', pct);
                    setCustomTip(false);
                  }}
                  className={`rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                    state.tipPercent === pct && !customTip
                      ? "border-accent-primary bg-accent-primary/10 text-accent-primary"
                      : "border-border bg-bg-primary text-text-muted hover:border-accent-secondary/50 hover:text-text-primary"
                  }`}
                >
                  {pct}%
                </button>
              ))}
              <button
                onClick={() => setCustomTip(true)}
                className={`rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                  customTip
                    ? "border-accent-primary bg-accent-primary/10 text-accent-primary"
                    : "border-border bg-bg-primary text-text-muted hover:border-accent-secondary/50 hover:text-text-primary"
                }`}
              >
                Custom
              </button>
            </div>
            {customTip && (
              <CustomSlider
                label="Custom Tip %"
                value={state.tipPercent}
                onChange={(v) => setState('tipPercent', v)}
                min={0}
                max={50}
                step={1}
                formatValue={(v) => `${v}%`}
                className="mt-3"
              />
            )}
          </div>

          {/* Number of People */}
          <div>
            <label className="mb-2 block text-sm font-medium text-text-muted">
              Split Between
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setState('numPeople', Math.max(1, state.numPeople - 1))}
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-bg-primary text-lg text-text-muted transition-colors hover:border-accent-secondary/50 hover:text-text-primary"
              >
                -
              </button>
              <input
                type="number"
                value={state.numPeople}
                onChange={(e) => setState('numPeople', Math.max(1, Number(e.target.value)))}
                className="h-12 w-20 rounded-lg border border-border bg-bg-primary p-3 text-center text-text-primary focus:border-accent-secondary focus:outline-none"
                min={1}
                step={1}
              />
              <button
                onClick={() => setState('numPeople', state.numPeople + 1)}
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-bg-primary text-lg text-text-muted transition-colors hover:border-accent-secondary/50 hover:text-text-primary"
              >
                +
              </button>
              <span className="text-sm text-text-muted">
                {state.numPeople === 1 ? "person" : "people"}
              </span>
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3">
            {/* Round Up */}
            <div className="flex items-center justify-between rounded-lg border border-border bg-bg-primary p-3">
              <span id="round-up-label" className="text-sm text-text-muted">Round up to nearest dollar</span>
              <button
                type="button"
                role="switch"
                aria-checked={!!state.roundUp}
                aria-labelledby="round-up-label"
                onClick={() => setState('roundUp', state.roundUp ? 0 : 1)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  state.roundUp ? "bg-accent-primary" : "bg-border"
                }`}
              >
                <div
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    state.roundUp ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Pre-tax toggle */}
            <div className="flex items-center justify-between rounded-lg border border-border bg-bg-primary p-3">
              <span id="pre-tax-label" className="text-sm text-text-muted">Tip on pre-tax amount</span>
              <button
                type="button"
                role="switch"
                aria-checked={!!state.preTaxMode}
                aria-labelledby="pre-tax-label"
                onClick={() => setState('preTaxMode', state.preTaxMode ? 0 : 1)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  state.preTaxMode ? "bg-accent-primary" : "bg-border"
                }`}
              >
                <div
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    state.preTaxMode ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            {!!state.preTaxMode && (
              <CurrencyInput
                label="Tax Amount on Bill"
                value={state.taxAmount}
                onChange={(v) => setState('taxAmount', v)}
                min={0}
                max={state.billAmount}
                step={0.01}
              />
            )}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Primary Result: Tip Amount */}
          <div className="rounded-lg border border-l-[3px] border-border border-l-accent-primary bg-bg-primary p-5">
            <p className="mb-1 text-sm text-text-muted">Tip Amount</p>
            <AnimatedNumber
              value={results.tipAmount}
              format="currency"
              decimals={2}
              className="font-mono text-2xl sm:text-3xl font-bold text-accent-primary inline-block transition-transform duration-150"
            />
          </div>

          {/* Total Bill */}
          <div className="rounded-lg border border-border bg-bg-primary p-4">
            <p className="mb-1 text-xs text-text-muted">Total Bill</p>
            <AnimatedNumber
              value={results.totalBill}
              format="currency"
              decimals={2}
              className="font-mono text-2xl font-bold text-text-primary inline-block"
            />
          </div>

          {/* Per-Person Amounts (when splitting) */}
          {state.numPeople > 1 && (
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="rounded-lg border border-border bg-bg-primary p-4">
                <p className="mb-1 text-xs text-text-muted">Per Person Total</p>
                <AnimatedNumber
                  value={results.perPersonTotal}
                  format="currency"
                  decimals={2}
                  className="font-mono text-lg font-bold text-text-primary inline-block"
                />
              </div>
              <div className="rounded-lg border border-border bg-bg-primary p-4">
                <p className="mb-1 text-xs text-text-muted">Per Person Tip</p>
                <AnimatedNumber
                  value={results.perPersonTip}
                  format="currency"
                  decimals={2}
                  className="font-mono text-lg font-bold text-text-primary inline-block"
                />
              </div>
            </div>
          )}

          {/* StatCard Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <StatCard
              label="Tip Amount"
              highlight
              value={
                <AnimatedNumber
                  value={results.tipAmount}
                  format="currency"
                  decimals={2}
                  className="font-mono text-2xl font-bold text-accent-primary inline-block"
                />
              }
              className="col-span-2"
            />
            <StatCard
              label="Total Bill"
              value={
                <AnimatedNumber
                  value={results.totalBill}
                  format="currency"
                  decimals={2}
                  className="font-mono text-lg font-bold text-text-primary inline-block"
                />
              }
            />
            <StatCard
              label="Per Person Tip"
              value={
                <AnimatedNumber
                  value={results.perPersonTip}
                  format="currency"
                  decimals={2}
                  className="font-mono text-lg font-bold text-accent-secondary inline-block"
                />
              }
            />
            <StatCard
              label="Per Person Total"
              value={
                <AnimatedNumber
                  value={results.perPersonTotal}
                  format="currency"
                  decimals={2}
                  className="font-mono text-lg font-bold text-text-primary inline-block"
                />
              }
              className="col-span-2"
            />
          </div>

          {/* Share Results */}
          <ShareResults slug="tip-calculator"
            title="Tip Calculation"
            results={shareResultsData}
            getShareUrl={getShareUrl}
          />

          {/* Comparison Chart */}
          <div className="rounded-lg border border-border bg-bg-primary p-4">
            <p className="mb-3 text-sm font-medium text-text-muted">
              Tip Amount by Percentage
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis
                  dataKey="name"
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => `$${v}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: COLORS.surface,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "8px",
                    color: COLORS.textPrimary,
                  }}
                  formatter={(value) => [formatCurrencyExact(value as number), "Tip"]}
                />
                <Bar dataKey="tip" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.isSelected ? COLORS.primary : COLORS.secondary}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-bg-primary">
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-muted">Tip %</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-text-muted">Tip</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-text-muted">Total</th>
                  {state.numPeople > 1 && (
                    <th className="px-4 py-3 text-right text-xs font-medium text-text-muted">Per Person</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {results.comparison.map((row) => (
                  <tr
                    key={row.percent}
                    className={row.isSelected ? "bg-accent-primary/5" : "hover:bg-bg-primary/50"}
                  >
                    <td className={`px-4 py-2 ${row.isSelected ? "font-bold text-accent-primary" : "text-text-primary"}`}>
                      {row.percent}
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-text-primary">
                      {formatCurrencyExact(row.tip)}
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-text-primary">
                      {formatCurrencyExact(row.total)}
                    </td>
                    {state.numPeople > 1 && (
                      <td className="px-4 py-2 text-right font-mono text-text-primary">
                        {formatCurrencyExact(row.perPerson)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
