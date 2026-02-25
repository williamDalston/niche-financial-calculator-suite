export interface Debt {
  name: string;
  balance: number;
  rate: number; // e.g. 22.99 for 22.99%
  minPayment: number;
}

export type PayoffMethod = "avalanche" | "snowball";

export interface DebtPayoffInput {
  debts: Debt[];
  extraPayment: number;
  method: PayoffMethod;
}

export interface MonthSnapshot {
  month: number;
  [debtName: string]: number;
}

export interface DebtPayoffResult {
  monthsToPayoff: number;
  totalInterest: number;
  payoffOrder: { name: string; month: number }[];
  monthlySchedule: MonthSnapshot[];
}

export function calculateDebtPayoff(input: DebtPayoffInput): DebtPayoffResult {
  const { debts, extraPayment, method } = input;

  const validDebts = debts.filter((d) => d.balance > 0 && d.minPayment > 0);

  if (validDebts.length === 0 || validDebts.every((d) => d.balance <= 0)) {
    return {
      monthsToPayoff: 0,
      totalInterest: 0,
      payoffOrder: [],
      monthlySchedule: [],
    };
  }

  // Clone debts for simulation
  const simDebts = validDebts.map((d) => ({
    ...d,
    remaining: d.balance,
    paidOff: false,
  }));

  // Sort by strategy
  const sortedIndices = simDebts
    .map((_, i) => i)
    .sort((a, b) => {
      if (method === "avalanche") {
        return simDebts[b].rate - simDebts[a].rate; // Highest rate first
      }
      return simDebts[a].remaining - simDebts[b].remaining; // Lowest balance first
    });

  let totalInterest = 0;
  let month = 0;
  const maxMonths = 600; // 50 years cap
  const monthlySchedule: MonthSnapshot[] = [];
  const payoffOrder: { name: string; month: number }[] = [];

  // Initial snapshot
  const initialSnapshot: MonthSnapshot = { month: 0 };
  simDebts.forEach((d) => {
    initialSnapshot[d.name] = d.remaining;
  });
  monthlySchedule.push(initialSnapshot);

  while (simDebts.some((d) => d.remaining > 0.01) && month < maxMonths) {
    month++;
    let extraAvailable = extraPayment;

    // Apply minimum payments and interest first
    for (const debt of simDebts) {
      if (debt.remaining <= 0.01) continue;
      const monthlyInterest = debt.remaining * (debt.rate / 100 / 12);
      totalInterest += monthlyInterest;
      debt.remaining += monthlyInterest;

      const payment = Math.min(debt.minPayment, debt.remaining);
      debt.remaining -= payment;

      if (debt.remaining <= 0.01) {
        debt.remaining = 0;
        if (!debt.paidOff) {
          debt.paidOff = true;
          payoffOrder.push({ name: debt.name, month });
          // Freed-up minimum payment becomes extra for next cycle
          extraAvailable += debt.minPayment;
        }
      }
    }

    // Apply extra payment to target debt (in strategy order)
    for (const idx of sortedIndices) {
      const debt = simDebts[idx];
      if (debt.remaining <= 0.01) continue;
      const extraApplied = Math.min(extraAvailable, debt.remaining);
      debt.remaining -= extraApplied;
      extraAvailable -= extraApplied;

      if (debt.remaining <= 0.01) {
        debt.remaining = 0;
        if (!debt.paidOff) {
          debt.paidOff = true;
          payoffOrder.push({ name: debt.name, month });
          extraAvailable += debt.minPayment;
        }
      }
      if (extraAvailable <= 0.01) break;
    }

    // Record snapshot (every month for first 12, then every 3rd month)
    if (month <= 12 || month % 3 === 0 || simDebts.every((d) => d.remaining <= 0.01)) {
      const snapshot: MonthSnapshot = { month };
      simDebts.forEach((d) => {
        snapshot[d.name] = Math.round(Math.max(d.remaining, 0));
      });
      monthlySchedule.push(snapshot);
    }
  }

  return {
    monthsToPayoff: month,
    totalInterest,
    payoffOrder,
    monthlySchedule,
  };
}
