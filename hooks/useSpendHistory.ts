import { useMemo } from "react";
import { useTransactionStore } from "@/stores/transactionStore";

const MONTH_LABELS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

export function useSpendHistory(itemId?: string) {
  const transactions = useTransactionStore((s) => s.transactions);

  return useMemo(() => {
    const filtered = itemId
      ? transactions.filter((t) => t.itemId === itemId)
      : transactions;

    const byMonth = Array.from({ length: 12 }, (_, i) => {
      const m = String(i + 1).padStart(2, "0");
      const total = filtered
        .filter((t) => t.date.endsWith(`-${m}`))
        .reduce((sum, t) => sum + t.amount, 0);
      return { label: MONTH_LABELS[i], value: total };
    });

    const maxVal = Math.max(...byMonth.map((b) => b.value), 1);
    return byMonth.map((b) => ({
      label: b.label,
      value: Math.round((b.value / maxVal) * 100),
    }));
  }, [transactions, itemId]);
}
