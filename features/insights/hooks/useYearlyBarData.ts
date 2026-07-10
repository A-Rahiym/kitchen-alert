import { useMemo } from "react";
import { useTransactionStore } from "@/stores/transactionStore";

const MONTH_LABELS_SHORT = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

/**
 * Returns 12-month bar chart data aggregated from all transactions.
 *
 * Logic:
 * - Groups all transactions by month using the last two characters of the date string (MM).
 * - Sums the amount for each month.
 * - Returns { value, label } for each month Jan-Dec.
 * - Labels use single-letter abbreviations (J, F, M, ...).
 */
export function useYearlyBarData() {
  const transactions = useTransactionStore((s) => s.transactions);

  return useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const m = String(i + 1).padStart(2, "0");
      const total = transactions
        .filter((t) => t.date.endsWith(`-${m}`))
        .reduce((sum, t) => sum + t.amount, 0);
      return { value: total, label: MONTH_LABELS_SHORT[i] };
    });
  }, [transactions]);
}
