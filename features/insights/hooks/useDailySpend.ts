import { useMemo } from "react";
import { useTransactionStore } from "@/stores/transactionStore";

/**
 * Returns daily spend data for the current month, suitable for a line chart.
 *
 * Logic:
 * - Determines the number of days in the current month.
 * - For each day, sums all transaction amounts on that day.
 * - Returns { value, label } pairs where value = total spend for that day
 *   and label = the day number as a string.
 */

export function useDailySpend() {
  const transactions = useTransactionStore((s) => s.transactions);

  return useMemo(() => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;

    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = String(i + 1).padStart(2, "0");
      const total = transactions
        .filter((t) => t.date.startsWith(prefix) && t.date.endsWith(day))
        .reduce((sum, t) => sum + t.amount, 0);
      return { value: total, label: String(i + 1) };
    });
  }, [transactions]);
}
