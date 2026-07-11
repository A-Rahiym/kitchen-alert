import { create } from "zustand";

export interface Budget {
  id: string;
  name: string;
  limit: number;
  period: "monthly" | "yearly";
}

interface BudgetState {
  budgets: Budget[];
  updateBudget: (id: string, data: Partial<Budget>) => void;
}

const mockBudgets: Budget[] = [
  { id: "b1", name: "Kitchen", limit: 250000, period: "monthly" },
  { id: "b2", name: "Cooking Gas", limit: 40000, period: "monthly" },
  { id: "b3", name: "Rice", limit: 100000, period: "monthly" },
];

export const useBudgetStore = create<BudgetState>((set) => ({
  budgets: mockBudgets,
  updateBudget: (id, data) =>
    set((s) => ({
      budgets: s.budgets.map((b) => (b.id === id ? { ...b, ...data } : b)),
    })),
}));
