import { create } from "zustand";

export interface Transaction {
  id: string;
  itemId: string;
  date: string;
  amount: number;
  category: string;
}

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (t: Transaction) => void;
  removeTransaction: (id: string) => void;
  removeTransactionsByItemId: (itemId: string) => void;
}

const now = new Date();
const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

const mockTransactions: Transaction[] = [
  { id: "t1", itemId: "p1", date: `${currentMonth}-01`, amount: 20000, category: "cooking-gas" },
  { id: "t2", itemId: "p1", date: "2026-05-10", amount: 18500, category: "cooking-gas" },
  { id: "t3", itemId: "p2", date: `${currentMonth}-03`, amount: 4500, category: "eggs" },
  { id: "t4", itemId: "p2", date: "2026-05-20", amount: 4200, category: "eggs" },
  { id: "t5", itemId: "p3", date: `${currentMonth}-05`, amount: 85000, category: "rice" },
  { id: "t6", itemId: "p3", date: "2026-04-15", amount: 82000, category: "rice" },
  { id: "t7", itemId: "p4", date: `${currentMonth}-02`, amount: 32000, category: "flour" },
  { id: "t8", itemId: "p4", date: "2026-05-25", amount: 30000, category: "flour" },
  { id: "t9", itemId: "p5", date: `${currentMonth}-08`, amount: 15000, category: "vegetable-oil" },
  { id: "t10", itemId: "p6", date: `${currentMonth}-10`, amount: 6000, category: "kerosene" },
  { id: "t11", itemId: "p6", date: "2026-05-28", amount: 5500, category: "kerosene" },
  { id: "t12", itemId: "p6", date: "2026-05-28", amount: 5500, category: "kerosene" },
];


export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: mockTransactions,
  addTransaction: (t) => set((s) => ({ transactions: [...s.transactions, t] })),
  removeTransaction: (id) => set((s) => ({ transactions: s.transactions.filter((t) => t.id !== id) })),
  removeTransactionsByItemId: (itemId) => set((s) => ({
    transactions: s.transactions.filter((t) => t.itemId !== itemId),
  })),
}));