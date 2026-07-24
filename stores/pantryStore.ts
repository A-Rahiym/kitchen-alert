import { create } from "zustand";

export type ConsumptionUnit = "teaspoon" | "tablespoon" | "cup" | "piece" | "ml" | "minute";

export interface PantryItem {
  id: string;
  name: string;
  itemSize: string;
  thresholdDays: number;
  icon: string;
  frequency: number;
  people: number;
  unit: string;
  consumptionUnit: ConsumptionUnit;
  conversionRate: number;
}

interface PantryState {
  items: PantryItem[];
  addItem: (item: PantryItem) => void;
  updateItem: (id: string, data: Partial<PantryItem>) => void;
  removeItem: (id: string) => void;
}

const mockItems: PantryItem[] = [
  { id: "p1", name: "Cooking Gas", itemSize: "12.5kg", thresholdDays: 7, icon: "gas", frequency: 3, people: 4, unit: "KG", consumptionUnit: "minute", conversionRate: 120 },
  { id: "p2", name: "Eggs", itemSize: "30pk", thresholdDays: 3, icon: "egg", frequency: 2, people: 3, unit: "PACK", consumptionUnit: "piece", conversionRate: 30 },
  { id: "p3", name: "Rice", itemSize: "50kg", thresholdDays: 14, icon: "rice", frequency: 3, people: 4, unit: "KG", consumptionUnit: "cup", conversionRate: 5 },
  { id: "p4", name: "Flour", itemSize: "25kg", thresholdDays: 10, icon: "flour", frequency: 2, people: 4, unit: "KG", consumptionUnit: "cup", conversionRate: 8 },
  { id: "p5", name: "Vegetable Oil", itemSize: "5L", thresholdDays: 14, icon: "oil", frequency: 3, people: 4, unit: "L", consumptionUnit: "ml", conversionRate: 1000 },
  { id: "p6", name: "Kerosene", itemSize: "4L", thresholdDays: 5, icon: "kerosene", frequency: 2, people: 3, unit: "L", consumptionUnit: "minute", conversionRate: 180 },
];

export const usePantryStore = create<PantryState>((set) => ({
  items: mockItems,
  addItem: (item) => set((s) => ({ items: [...s.items, item] })),
  updateItem: (id, data) =>
    set((s) => ({
      items: s.items.map((i) => (i.id === id ? { ...i, ...data } : i)),
    })),
  removeItem: (id) =>
    set((s) => ({
      items: s.items.filter((i) => i.id !== id),
    })),
}));

