export interface TipInput {
  billAmount: number;
  tipPercentage: number; // e.g. 20 for 20%
  numberOfPeople: number;
}

export interface TipResult {
  tipAmount: number;
  totalBill: number;
  perPersonTip: number;
  perPersonTotal: number;
}

export function calculateTip(input: TipInput): TipResult {
  const { billAmount, tipPercentage, numberOfPeople } = input;

  const rawTip = billAmount * (tipPercentage / 100);
  const totalBill = billAmount + rawTip;
  const tipAmount = rawTip;

  const people = Math.max(numberOfPeople, 1);
  const perPersonTotal = totalBill / people;
  const perPersonTip = tipAmount / people;

  return {
    tipAmount,
    totalBill,
    perPersonTip,
    perPersonTotal,
  };
}
