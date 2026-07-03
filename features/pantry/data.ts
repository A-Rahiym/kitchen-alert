export interface PantryItemData {
  id: number;
  name: string;
  daysLeft: number;
  totalDays: number;
}

export const pantries: PantryItemData[] = [
  { id: 1, name: "Cooking Gas", daysLeft: 21, totalDays: 30 },
  { id: 2, name: "Eggs", daysLeft: 14, totalDays: 21 },
  { id: 3, name: "Rice", daysLeft: 3, totalDays: 60 },
  { id: 4, name: "Flour", daysLeft: 25, totalDays: 45 },
  { id: 5, name: "Vegetable Oil", daysLeft: 40, totalDays: 60 },
  { id: 6, name: "Kerosene", daysLeft: 2, totalDays: 14 },
];
