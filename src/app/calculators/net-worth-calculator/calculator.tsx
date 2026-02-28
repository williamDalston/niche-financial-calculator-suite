"use client";

import { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  AnimatedNumber,
  CurrencyInput,
  ShareResults,
  StatCard,
} from "@/components/ui";
import { formatCurrency } from "@/lib/formatters";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const COLORS = {
  assets: "#22C55E",
  liabilities: "#EF4444",
  bg: "#0B1120",
  surface: "#162032",
  border: "#1E293B",
  textPrimary: "#F1F5F9",
  textMuted: "#94A3B8",
};

const ASSET_COLORS = ["#22C55E", "#3B82F6", "#A855F7", "#F59E0B", "#EC4899", "#06B6D4"];
const LIABILITY_COLORS = ["#EF4444", "#F97316", "#E879F7", "#FB923C", "#F472B6"];

/* ------------------------------------------------------------------ */
/*  Types & Helpers                                                    */
/* ------------------------------------------------------------------ */

interface LineItem {
  id: string;
  label: string;
  value: number;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/* ------------------------------------------------------------------ */
/*  Default data                                                       */
/* ------------------------------------------------------------------ */

const defaultAssets: LineItem[] = [
  { id: generateId(), label: "Cash & Savings", value: 15000 },
  { id: generateId(), label: "Retirement Accounts (401k, IRA)", value: 85000 },
  { id: generateId(), label: "Investment Accounts", value: 30000 },
  { id: generateId(), label: "Real Estate (Home Value)", value: 350000 },
  { id: generateId(), label: "Vehicles", value: 25000 },
  { id: generateId(), label: "Other Assets", value: 5000 },
];

const defaultLiabilities: LineItem[] = [
  { id: generateId(), label: "Mortgage Balance", value: 280000 },
  { id: generateId(), label: "Student Loans", value: 35000 },
  { id: generateId(), label: "Auto Loans", value: 18000 },
  { id: generateId(), label: "Credit Card Debt", value: 4500 },
  { id: generateId(), label: "Other Debts", value: 0 },
];

/* ------------------------------------------------------------------ */
/*  LineItemEditor                                                     */
/* ------------------------------------------------------------------ */

function LineItemEditor({
  items,
  onUpdate,
  onAdd,
  onRemove,
  addLabel,
}: {
  items: LineItem[];
  onUpdate: (id: string, field: "label" | "value", val: string | number) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  addLabel: string;
}) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <input
            type="text"
            value={item.label}
            onChange={(e) => onUpdate(item.id, "label", e.target.value)}
            className="h-12 flex-1 rounded-lg border border-[#1E293B] bg-[#0B1120] p-3 text-sm text-[#F1F5F9] focus:border-[#3B82F6] focus:outline-none focus:ring-[3px] focus:ring-[#3B82F6]/15"
            placeholder="Label"
          />
          <CurrencyInput
            value={item.value}
            onChange={(val) => onUpdate(item.id, "value", val)}
            min={0}
            step={1000}
            className="w-full sm:w-36"
          />
          <button
            onClick={() => onRemove(item.id)}
            className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#1E293B] bg-[#0B1120] text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors shrink-0"
            title="Remove item"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
      <button
        onClick={onAdd}
        className="flex items-center gap-2 text-sm font-medium text-[#3B82F6] hover:text-[#22C55E] transition-colors"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        {addLabel}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function NetWorthCalculatorWidget() {
  const [assets, setAssets] = useState<LineItem[]>(defaultAssets);
  const [liabilities, setLiabilities] = useState<LineItem[]>(defaultLiabilities);

  const updateItem = (
    list: LineItem[],
    setList: React.Dispatch<React.SetStateAction<LineItem[]>>,
    id: string,
    field: "label" | "value",
    val: string | number
  ) => {
    setList(list.map((item) => (item.id === id ? { ...item, [field]: val } : item)));
  };

  const addItem = (setList: React.Dispatch<React.SetStateAction<LineItem[]>>, defaultLabel: string) => {
    setList((prev) => [...prev, { id: generateId(), label: defaultLabel, value: 0 }]);
  };

  const removeItem = (list: LineItem[], setList: React.Dispatch<React.SetStateAction<LineItem[]>>, id: string) => {
    if (list.length > 1) {
      setList(list.filter((item) => item.id !== id));
    }
  };

  const results = useMemo(() => {
    const totalAssets = assets.reduce((sum, a) => sum + (a.value || 0), 0);
    const totalLiabilities = liabilities.reduce((sum, l) => sum + (l.value || 0), 0);
    const netWorth = totalAssets - totalLiabilities;
    const debtToAssetRatio = totalAssets > 0 ? totalLiabilities / totalAssets : 0;

    const assetAllocation = assets
      .filter((a) => a.value > 0)
      .map((a) => ({
        name: a.label,
        value: a.value,
        percentage: totalAssets > 0 ? ((a.value / totalAssets) * 100).toFixed(1) : "0",
      }));

    const liabilityBreakdown = liabilities
      .filter((l) => l.value > 0)
      .map((l) => ({
        name: l.label,
        value: l.value,
        percentage: totalLiabilities > 0 ? ((l.value / totalLiabilities) * 100).toFixed(1) : "0",
      }));

    return {
      totalAssets,
      totalLiabilities,
      netWorth,
      debtToAssetRatio,
      assetAllocation,
      liabilityBreakdown,
    };
  }, [assets, liabilities]);

  const barData = [
    { name: "Assets", value: results.totalAssets },
    { name: "Liabilities", value: results.totalLiabilities },
  ];

  const shareResultsData: Record<string, string> = {
    "Net Worth": formatCurrency(results.netWorth),
    "Total Assets": formatCurrency(results.totalAssets),
    "Total Liabilities": formatCurrency(results.totalLiabilities),
    "Debt-to-Asset Ratio": `${(results.debtToAssetRatio * 100).toFixed(1)}%`,
  };

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#162032] p-6 md:p-8">
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Assets */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-[#22C55E]">Assets</h3>
            <LineItemEditor
              items={assets}
              onUpdate={(id, field, val) => updateItem(assets, setAssets, id, field, val)}
              onAdd={() => addItem(setAssets, "New Asset")}
              onRemove={(id) => removeItem(assets, setAssets, id)}
              addLabel="Add Asset"
            />
          </div>

          {/* Liabilities */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-[#EF4444]">Liabilities</h3>
            <LineItemEditor
              items={liabilities}
              onUpdate={(id, field, val) => updateItem(liabilities, setLiabilities, id, field, val)}
              onAdd={() => addItem(setLiabilities, "New Debt")}
              onRemove={(id) => removeItem(liabilities, setLiabilities, id)}
              addLabel="Add Liability"
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* StatCard Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <StatCard
              label="Net Worth"
              highlight
              value={
                <AnimatedNumber
                  value={results.netWorth}
                  format="currency"
                  className={`font-mono text-2xl font-bold inline-block ${results.netWorth >= 0 ? "text-[#22C55E]" : "text-[#EF4444]"}`}
                />
              }
              className="col-span-2"
            />
            <StatCard
              label="Total Assets"
              value={
                <AnimatedNumber
                  value={results.totalAssets}
                  format="currency"
                  className="font-mono text-lg font-bold text-[#22C55E] inline-block"
                />
              }
            />
            <StatCard
              label="Total Liabilities"
              value={
                <AnimatedNumber
                  value={results.totalLiabilities}
                  format="currency"
                  className="font-mono text-lg font-bold text-[#EF4444] inline-block"
                />
              }
            />
            <StatCard
              label="Debt-to-Asset Ratio"
              value={
                <AnimatedNumber
                  value={results.debtToAssetRatio * 100}
                  format="number"
                  decimals={1}
                  suffix="%"
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
              className="col-span-2"
            />
          </div>

          {/* Share Results */}
          <ShareResults
            title="Net Worth Calculation Results"
            results={shareResultsData}
          />

          {/* Stacked Bar: Assets vs Liabilities */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">Assets vs Liabilities</p>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={barData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis
                  type="number"
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke={COLORS.textMuted}
                  tick={{ fontSize: 12 }}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: COLORS.surface,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "8px",
                    color: COLORS.textPrimary,
                  }}
                  formatter={(value) => formatCurrency(value as number)}
                />
                <Bar dataKey="value" name="Amount" radius={[0, 4, 4, 0]}>
                  <Cell fill={COLORS.assets} />
                  <Cell fill={COLORS.liabilities} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart: Asset Allocation */}
          {results.assetAllocation.length > 0 && (
            <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
              <p className="mb-3 text-sm font-medium text-[#94A3B8]">Asset Allocation</p>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={results.assetAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {results.assetAllocation.map((_, index) => (
                      <Cell key={`asset-${index}`} fill={ASSET_COLORS[index % ASSET_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: COLORS.surface,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "8px",
                      color: COLORS.textPrimary,
                    }}
                    formatter={(value) => formatCurrency(value as number)}
                  />
                  <Legend
                    wrapperStyle={{ color: COLORS.textMuted, fontSize: 11 }}
                    formatter={(value) => {
                      const item = results.assetAllocation.find((a) => a.name === value);
                      return `${value} (${item?.percentage ?? 0}%)`;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
