import { useMemo } from "react";
import { useTransactionStore } from "@/stores/transactionStore";

export function useMonthlySpend(itemId?: string) {
  const transactions = useTransactionStore((s) => s.transactions);

  return useMemo(() => {
    const now = new Date();
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    const filtered = itemId
      ? transactions.filter((t) => t.date.startsWith(month) && t.itemId === itemId)
      : transactions.filter((t) => t.date.startsWith(month));

    return filtered.reduce((sum, t) => sum + t.amount, 0);
  }, [transactions, itemId]);
}
