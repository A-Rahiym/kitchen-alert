import { useMemo } from "react";
import { useTransactionStore } from "@/stores/transactionStore";
import { usePantryStore } from "@/stores/pantryStore";

export function useItemDaysLeft(itemId: string) {
  const transactions = useTransactionStore((s) => s.transactions);
  const item = usePantryStore((s) => s.items.find((i) => i.id === itemId));

  return useMemo(() => {
    if (!item) return { daysLeft: 0, totalDays: 30, pct: 0 };

    const itemTxs = transactions
      .filter((t) => t.itemId === itemId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (itemTxs.length < 2) return { daysLeft: 30, totalDays: 30, pct: 100 };

    const lastDate = new Date(itemTxs[0].date);
    const prevDate = new Date(itemTxs[1].date);
    const intervalMs = lastDate.getTime() - prevDate.getTime();
    const avgIntervalDays = Math.max(Math.round(intervalMs / (1000 * 60 * 60 * 24)), 1);

    const today = new Date();
    const daysSinceLastRefill = Math.round((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysLeft = Math.max(avgIntervalDays - daysSinceLastRefill, 0);
    const pct = Math.round((daysLeft / avgIntervalDays) * 100);

    return { daysLeft, totalDays: avgIntervalDays, pct };
  }, [transactions, item, itemId]);
}
