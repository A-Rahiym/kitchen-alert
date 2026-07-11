import { useMemo } from "react";
import { useBudgetStore } from "@/stores/budgetStore";
import { useMonthlySpend } from "./useMonthlySpend";

export function useBudgetRemaining(budgetId: string) {
  const budget = useBudgetStore((s) => s.budgets.find((b) => b.id === budgetId));
  const totalSpend = useMonthlySpend();

  return useMemo(() => {
    if (!budget) return { limit: 0, spent: 0, remaining: 0 };
    return {
      limit: budget.limit,
      spent: totalSpend,
      remaining: budget.limit - totalSpend,
    };
  }, [budget, totalSpend]);
}
