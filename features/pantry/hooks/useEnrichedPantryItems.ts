import { useMemo } from "react";
import { usePantryStore } from "@/stores/pantryStore";
import { useTransactionStore } from "@/stores/transactionStore";

/**
 * Computes enriched pantry items with derived days-left info.
 *
 * Logic:
 * - Pulls the last two transactions for each item (most recent refills).
 * - Calculates the average refill interval = days between those two dates.
 * - Calculates days since the last refill.
 * - daysLeft = avgInterval - daysSinceLastRefill (floor at 0).
 * - totalDays = avgInterval.
 * - pct = (daysLeft / totalDays) * 100.
 *
 * Returns the original items augmented with { daysLeft, totalDays, pct }.
 */
export function useEnrichedPantryItems() {
  const items = usePantryStore((s) => s.items);
  const transactions = useTransactionStore((s) => s.transactions);

  return useMemo(() => {
    return items.map((item) => {
      const itemTxs = transactions
        .filter((t) => t.itemId === item.id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      if (itemTxs.length < 2) {
        return { ...item, daysLeft: 30, totalDays: 30, pct: 100 };
      }

      const lastDate = new Date(itemTxs[0].date);
      const prevDate = new Date(itemTxs[1].date);
      const intervalMs = lastDate.getTime() - prevDate.getTime();
      const avgIntervalDays = Math.max(Math.round(intervalMs / (1000 * 60 * 60 * 24)), 1);

      const today = new Date();
      const daysSinceLastRefill = Math.round(
        (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      const daysLeft = Math.max(avgIntervalDays - daysSinceLastRefill, 0);
      const pct = Math.round((daysLeft / avgIntervalDays) * 100);

      return { ...item, daysLeft, totalDays: avgIntervalDays, pct };
    });
  }, [items, transactions]);
}
