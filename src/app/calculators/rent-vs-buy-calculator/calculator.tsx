"use client";

import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  AnimatedNumber,
  CurrencyInput,
  CustomSlider,
  PercentageInput,
  ShareResults,
  StatCard,
} from "@/components/ui";
import { formatCurrency } from "@/lib/formatters";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const COLORS = {
  renting: "#3B82F6",
  buying: "#22C55E",
  equity: "#F59E0B",
  investment: "#A855F7",
  bg: "#0B1120",
  surface: "#162032",
  border: "#1E293B",
  textPrimary: "#F1F5F9",
  textMuted: "#94A3B8",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function RentVsBuyCalculatorWidget() {
  const [monthlyRent, setMonthlyRent] = useState(2000);
  const [annualRentIncrease, setAnnualRentIncrease] = useState(3);
  const [homePrice, setHomePrice] = useState(400000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [mortgageRate, setMortgageRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2);
  const [homeInsurance, setHomeInsurance] = useState(1500);
  const [maintenancePercent, setMaintenancePercent] = useState(1);
  const [hoaMonthly, setHoaMonthly] = useState(0);
  const [homeAppreciationRate, setHomeAppreciationRate] = useState(3.5);
  const [investmentReturnRate, setInvestmentReturnRate] = useState(7);
  const [timeHorizon, setTimeHorizon] = useState(10);

  const results = useMemo(() => {
    const downPayment = homePrice * (downPaymentPercent / 100);
    const loanAmount = homePrice - downPayment;
    const monthlyRate = mortgageRate / 100 / 12;
    const numPayments = loanTerm * 12;

    // Calculate monthly mortgage payment
    let monthlyMortgage = 0;
    if (loanAmount > 0 && mortgageRate > 0) {
      const factor = Math.pow(1 + monthlyRate, numPayments);
      monthlyMortgage = loanAmount * (monthlyRate * factor) / (factor - 1);
    }

    const yearlyData: {
      year: number;
      rentCumulative: number;
      buyCumulative: number;
      homeEquity: number;
      renterPortfolio: number;
    }[] = [];

    let rentCumulative = 0;
    let buyCumulative = downPayment; // Buyer spent down payment upfront
    let currentRent = monthlyRent;
    let currentHomeValue = homePrice;
    let loanBalance = loanAmount;
    let renterPortfolio = downPayment; // Renter invests what would have been the down payment
    const monthlyInvestmentReturn = investmentReturnRate / 100 / 12;

    let breakevenYear = -1;

    for (let year = 1; year <= timeHorizon; year++) {
      let yearlyRentCost = 0;
      let yearlyBuyCost = 0;

      for (let month = 0; month < 12; month++) {
        // Renter costs
        yearlyRentCost += currentRent;

        // Buyer costs
        const interestPayment = loanBalance * monthlyRate;
        const principalPayment = monthlyMortgage - interestPayment;
        loanBalance = Math.max(loanBalance - principalPayment, 0);

        const monthlyPropertyTax = (currentHomeValue * (propertyTaxRate / 100)) / 12;
        const monthlyInsurance = homeInsurance / 12;
        const monthlyMaintenance = (currentHomeValue * (maintenancePercent / 100)) / 12;
        yearlyBuyCost += monthlyMortgage + monthlyPropertyTax + monthlyInsurance + monthlyMaintenance + hoaMonthly;

        // Renter invests the difference
        const buyerMonthlyTotal = monthlyMortgage + monthlyPropertyTax + monthlyInsurance + monthlyMaintenance + hoaMonthly;
        const monthlySavings = buyerMonthlyTotal - currentRent;
        if (monthlySavings > 0) {
          renterPortfolio += monthlySavings;
        }
        renterPortfolio *= (1 + monthlyInvestmentReturn);
      }

      // Apply annual rent increase for next year
      currentRent *= (1 + annualRentIncrease / 100);

      // Apply home appreciation
      currentHomeValue *= (1 + homeAppreciationRate / 100);

      rentCumulative += yearlyRentCost;
      buyCumulative += yearlyBuyCost;

      const homeEquity = currentHomeValue - loanBalance;

      yearlyData.push({
        year,
        rentCumulative: Math.round(rentCumulative),
        buyCumulative: Math.round(buyCumulative),
        homeEquity: Math.round(homeEquity),
        renterPortfolio: Math.round(renterPortfolio),
      });

      // Check breakeven: buyer's net wealth > renter's net wealth
      const buyerNetWealth = homeEquity - buyCumulative;
      const renterNetWealth = renterPortfolio - rentCumulative;
      if (breakevenYear === -1 && buyerNetWealth > renterNetWealth) {
        breakevenYear = year;
      }
    }

    const finalYear = yearlyData[yearlyData.length - 1];
    const totalRentCost = finalYear?.rentCumulative ?? 0;
    const totalBuyCost = finalYear?.buyCumulative ?? 0;
    const homeEquityBuilt = finalYear?.homeEquity ?? 0;
    const renterFinalPortfolio = finalYear?.renterPortfolio ?? 0;

    // Net wealth comparison
    const buyerNetWealth = homeEquityBuilt - totalBuyCost;
    const renterNetWealth = renterFinalPortfolio - totalRentCost;
    const netDifference = buyerNetWealth - renterNetWealth;

    return {
      totalRentCost,
      totalBuyCost,
      netDifference,
      homeEquityBuilt,
      renterFinalPortfolio,
      breakevenYear,
      yearlyData,
      buyerNetWealth,
      renterNetWealth,
    };
  }, [
    monthlyRent, annualRentIncrease, homePrice, downPaymentPercent,
    mortgageRate, loanTerm, propertyTaxRate, homeInsurance,
    maintenancePercent, hoaMonthly, homeAppreciationRate,
    investmentReturnRate, timeHorizon,
  ]);

  const wealthComparisonData = [
    { name: "Buyer", wealth: results.buyerNetWealth },
    { name: "Renter", wealth: results.renterNetWealth },
  ];

  const verdict = results.netDifference > 0 ? "Buying" : "Renting";

  const shareResultsData: Record<string, string> = {
    Verdict: `${verdict} wins by ${formatCurrency(Math.abs(results.netDifference))}`,
    "Rent Total": formatCurrency(results.totalRentCost),
    "Buy Total": formatCurrency(results.totalBuyCost),
    "Equity Built": formatCurrency(results.homeEquityBuilt),
    "Renter's Portfolio": formatCurrency(results.renterFinalPortfolio),
    "Breakeven Year": results.breakevenYear > 0 ? `Year ${results.breakevenYear}` : "N/A",
  };

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#162032] p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-[#F1F5F9]">Renting Details</h3>

          {/* Monthly Rent */}
          <div>
            <CurrencyInput
              label="Monthly Rent"
              value={monthlyRent}
              onChange={setMonthlyRent}
              min={0}
              step={50}
            />
            <CustomSlider
              value={monthlyRent}
              onChange={setMonthlyRent}
              min={500}
              max={5000}
              step={50}
              formatValue={(v) => `$${v.toLocaleString()}`}
              className="mt-3"
            />
          </div>

          {/* Annual Rent Increase */}
          <PercentageInput
            label="Annual Rent Increase"
            value={annualRentIncrease}
            onChange={setAnnualRentIncrease}
            min={0}
            max={10}
            step={0.5}
          />

          {/* Investment Return Rate */}
          <PercentageInput
            label="Investment Return Rate (renter's savings)"
            value={investmentReturnRate}
            onChange={setInvestmentReturnRate}
            min={0}
            max={15}
            step={0.5}
          />

          <h3 className="text-lg font-semibold text-[#F1F5F9] pt-2">Buying Details</h3>

          {/* Home Price */}
          <div>
            <CurrencyInput
              label="Home Purchase Price"
              value={homePrice}
              onChange={setHomePrice}
              min={0}
              step={5000}
            />
            <CustomSlider
              value={homePrice}
              onChange={setHomePrice}
              min={50000}
              max={2000000}
              step={5000}
              formatValue={(v) =>
                v >= 1000000
                  ? `$${(v / 1000000).toFixed(1)}M`
                  : `$${(v / 1000).toFixed(0)}k`
              }
              className="mt-3"
            />
          </div>

          {/* Down Payment */}
          <PercentageInput
            label="Down Payment"
            value={downPaymentPercent}
            onChange={setDownPaymentPercent}
            min={0}
            max={100}
            step={1}
          />

          {/* Mortgage Rate */}
          <PercentageInput
            label="Mortgage Rate"
            value={mortgageRate}
            onChange={setMortgageRate}
            min={0}
            max={15}
            step={0.125}
          />

          {/* Loan Term */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#94A3B8]">
              Loan Term (years)
            </label>
            <div className="flex gap-2">
              {[15, 20, 30].map((term) => (
                <button
                  key={term}
                  onClick={() => setLoanTerm(term)}
                  className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                    loanTerm === term
                      ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                      : "border-[#1E293B] bg-[#0B1120] text-[#94A3B8] hover:border-[#3B82F6]/50 hover:text-[#F1F5F9]"
                  }`}
                >
                  {term} yr
                </button>
              ))}
            </div>
          </div>

          {/* Property Tax Rate */}
          <PercentageInput
            label="Property Tax Rate (% of home value)"
            value={propertyTaxRate}
            onChange={setPropertyTaxRate}
            min={0}
            max={5}
            step={0.1}
          />

          {/* Home Insurance */}
          <CurrencyInput
            label="Annual Home Insurance"
            value={homeInsurance}
            onChange={setHomeInsurance}
            min={0}
            step={100}
          />

          {/* Maintenance */}
          <PercentageInput
            label="Annual Maintenance (% of home value)"
            value={maintenancePercent}
            onChange={setMaintenancePercent}
            min={0}
            max={5}
            step={0.25}
          />

          {/* HOA */}
          <CurrencyInput
            label="Monthly HOA"
            value={hoaMonthly}
            onChange={setHoaMonthly}
            min={0}
            step={25}
            placeholder="0"
          />

          {/* Home Appreciation */}
          <PercentageInput
            label="Expected Home Appreciation Rate"
            value={homeAppreciationRate}
            onChange={setHomeAppreciationRate}
            min={0}
            max={10}
            step={0.5}
          />

          {/* Time Horizon */}
          <div>
            <CustomSlider
              label="Time Horizon (years)"
              value={timeHorizon}
              onChange={setTimeHorizon}
              min={1}
              max={30}
              step={1}
              formatValue={(v) => `${v} yr${v !== 1 ? "s" : ""}`}
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* StatCard Grid */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              label={`Over ${timeHorizon} Years, ${verdict} Wins By`}
              highlight
              value={
                <AnimatedNumber
                  value={Math.abs(results.netDifference)}
                  format="currency"
                  className="font-mono text-2xl font-bold text-[#22C55E] inline-block"
                />
              }
              subvalue="in net wealth advantage"
              className="col-span-2"
            />
            <StatCard
              label="Total Cost of Renting"
              value={
                <AnimatedNumber
                  value={results.totalRentCost}
                  format="currency"
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
            />
            <StatCard
              label="Total Cost of Buying"
              value={
                <AnimatedNumber
                  value={results.totalBuyCost}
                  format="currency"
                  className="font-mono text-lg font-bold text-[#F1F5F9] inline-block"
                />
              }
            />
            <StatCard
              label="Home Equity Built"
              value={
                <AnimatedNumber
                  value={results.homeEquityBuilt}
                  format="currency"
                  className="font-mono text-lg font-bold text-[#F59E0B] inline-block"
                />
              }
            />
            <StatCard
              label="Renter's Portfolio"
              value={
                <AnimatedNumber
                  value={results.renterFinalPortfolio}
                  format="currency"
                  className="font-mono text-lg font-bold text-[#A855F7] inline-block"
                />
              }
            />
            <StatCard
              label="Breakeven Year"
              value={results.breakevenYear > 0 ? `Year ${results.breakevenYear}` : "N/A (renting stays cheaper)"}
              className="col-span-2"
            />
          </div>

          {/* Share Results */}
          <ShareResults
            title="Rent vs Buy Calculation Results"
            results={shareResultsData}
          />

          {/* Line Chart: Cumulative Cost Over Time */}
          {results.yearlyData.length > 0 && (
            <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
              <p className="mb-3 text-sm font-medium text-[#94A3B8]">Cumulative Cost Over Time</p>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={results.yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis
                    dataKey="year"
                    stroke={COLORS.textMuted}
                    tick={{ fontSize: 12 }}
                    label={{ value: "Year", position: "insideBottom", offset: -5, fill: COLORS.textMuted }}
                  />
                  <YAxis
                    stroke={COLORS.textMuted}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
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
                  <Legend wrapperStyle={{ color: COLORS.textMuted, fontSize: 12 }} />
                  <Line type="monotone" dataKey="rentCumulative" stroke={COLORS.renting} strokeWidth={2} dot={false} name="Rent Cumulative Cost" />
                  <Line type="monotone" dataKey="buyCumulative" stroke={COLORS.buying} strokeWidth={2} dot={false} name="Buy Cumulative Cost" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Bar Chart: Wealth Comparison */}
          <div className="rounded-lg border border-[#1E293B] bg-[#0B1120] p-4">
            <p className="mb-3 text-sm font-medium text-[#94A3B8]">Net Wealth Comparison at Year {timeHorizon}</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={wealthComparisonData} layout="vertical">
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
                  width={60}
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
                <Bar dataKey="wealth" name="Net Wealth" radius={[0, 4, 4, 0]}>
                  <Cell fill={COLORS.buying} />
                  <Cell fill={COLORS.renting} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
