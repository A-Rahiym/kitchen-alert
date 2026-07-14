import { useMemo } from "react";

export interface BudgetItem {
  id: string;
  name: string;
  icon: string;
  cost: number;
}

export interface BudgetDistributionItem extends BudgetItem {
  funded: boolean;
}

export function useBudgetDistribution(budgetLimit: number, items: BudgetItem[]) {
  return useMemo(() => {
    let cumulative = 0;
    const distributed: BudgetDistributionItem[] = items.map((item) => {
      const wouldExceed = cumulative + item.cost > budgetLimit;
      const funded = !wouldExceed;
      if (funded) cumulative += item.cost;
      return { ...item, funded };
    });

    const totalSpend = items.reduce((s, i) => s + i.cost, 0);
    const excess = totalSpend > budgetLimit ? totalSpend - budgetLimit : 0;
    const fundedTotal = distributed
      .filter((i) => i.funded)
      .reduce((s, i) => s + i.cost, 0);
    const unfundedTotal = totalSpend - fundedTotal;
    const pctUsed = budgetLimit > 0 ? Math.round((fundedTotal / budgetLimit) * 100) : 0;

    return { items: distributed, totalSpend, excess, fundedTotal, unfundedTotal, pctUsed, budgetLimit };
  }, [budgetLimit, items]);
}
