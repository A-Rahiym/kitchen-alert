import { useMemo } from "react";
import { useTransactionStore } from "@/stores/transactionStore";

/**
 * Returns the total spend across all transactions (all-time/yearly).
 *
 * Logic:
 * - Simply sums every transaction's amount.
 * - Used for the "This year" and "Total Spend" header displays.
 */
export function useYearlyTotal() {
  const transactions = useTransactionStore((s) => s.transactions);

  return useMemo(() => transactions.reduce((s, t) => s + t.amount, 0), [transactions]);
}
