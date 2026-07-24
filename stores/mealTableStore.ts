import { create } from "zustand";

export interface MealSlot {
  type: string;
  label: string;
  time: string;
  people: number;
}

interface MealTableState {
  meals: MealSlot[];
  mealItems: Record<string, string[]>;
  updateMeal: (type: string, data: Partial<MealSlot>) => void;
  assignItemToMeal: (mealType: string, itemId: string) => void;
  removeItemFromMeal: (mealType: string, itemId: string) => void;
  removeMeal: (type: string) => void;
}

const defaultMeals: MealSlot[] = [
  { type: "Breakfast", label: "Awara and bread", time: "7:00 AM", people: 4 },
  { type: "Lunch", label: "Yam, egg and toast", time: "1:00 PM", people: 4 },
  { type: "Dinner", label: "Dinner", time: "7:00 PM", people: 4 },
];

const defaultMealItems: Record<string, string[]> = {
  Breakfast: ["rice", "bread"],
  Lunch: ["yam", "egg", "toast"],
  Dinner: ["item5", "item6"],
};

export const useMealTableStore = create<MealTableState>((set) => ({
  meals: defaultMeals,
  mealItems: defaultMealItems,
  updateMeal: (type, data) =>
    set((s) => ({
      meals: s.meals.map((m) => (m.type === type ? { ...m, ...data } : m)),
    })),
  assignItemToMeal: (mealType, itemId) =>
    
    set((s) => ({
      mealItems: {
        ...s.mealItems,
        [mealType]: s.mealItems[mealType]?.includes(itemId)
          ? s.mealItems[mealType]
          : [...(s.mealItems[mealType] ?? []), itemId],
      },
    })),
    
  removeItemFromMeal: (mealType, itemId) =>
    set((s) => ({
      mealItems: {
        ...s.mealItems,
        [mealType]: (s.mealItems[mealType] ?? []).filter((id) => id !== itemId),
      },
    })),
  removeMeal: (type) =>
    set((s) => ({
      meals: s.meals.filter((m) => m.type !== type),
      mealItems: {
        ...s.mealItems,
        [type]: [],
      },
    })),
}));