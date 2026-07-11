export interface CategoryGroup {
  id: string;
  name: string;
  icon: string;
  itemCount: number;
}

export interface PopularItem {
  id: string;
  name: string;
  icon: string;
  category: string;
}

export interface MonthlySpend {
  month: string;
  spend: number;
}

export interface PantryItemData {
  id: number;
  name: string;
  daysLeft: number;
  totalDays: number;
  itemSize: string;
  price: number;
  history: MonthlySpend[];
}

export const categoryGroups: CategoryGroup[] = [
  { id: "cylinder", name: "Cylinder", icon: "gas", itemCount: 3 },
  { id: "sack", name: "Sack", icon: "rice", itemCount: 3 },
  { id: "bag", name: "Bag", icon: "milk", itemCount: 3 },
];

export const popularItems: PopularItem[] = [
  { id: "pop-gas", name: "Cooking Gas", icon: "gas", category: "cylinder" },
  { id: "pop-oil", name: "Cooking Oil", icon: "oil", category: "cylinder" },
  { id: "pop-eggs", name: "Eggs", icon: "egg", category: "bag" },
  { id: "pop-rice", name: "Rice", icon: "rice", category: "sack" },
  { id: "pop-kerosene", name: "Kerosene", icon: "kerosene", category: "cylinder" },
  { id: "pop-flour", name: "Flour", icon: "flour", category: "sack" },
  { id: "pop-sugar", name: "Sugar", icon: "sugar", category: "bag" },
  { id: "pop-milk", name: "Milk", icon: "milk", category: "bag" },
  { id: "pop-butter", name: "Butter", icon: "butter", category: "bag" },
];

export const pantries: PantryItemData[] = [
  {
    id: 1, name: "Cooking Gas", daysLeft: 21, totalDays: 30,
    itemSize: "12.5kg", price: 20000,
    history: [
      { month: "J", spend: 45 }, { month: "F", spend: 60 },
      { month: "M", spend: 70 }, { month: "A", spend: 52 },
      { month: "M", spend: 70 }, { month: "J", spend: 85 },
      { month: "J", spend: 0 }, { month: "A", spend: 0 },
      { month: "S", spend: 0 }, { month: "O", spend: 0 },
      { month: "N", spend: 0 }, { month: "D", spend: 0 },
    ],
  },
  {
    id: 2, name: "Eggs", daysLeft: 14, totalDays: 21,
    itemSize: "30pk", price: 4500,
    history: [
      { month: "J", spend: 30 }, { month: "F", spend: 45 },
      { month: "M", spend: 55 }, { month: "A", spend: 40 },
      { month: "M", spend: 60 }, { month: "J", spend: 50 },
      { month: "J", spend: 35 }, { month: "A", spend: 48 },
      { month: "S", spend: 52 }, { month: "O", spend: 0 },
      { month: "N", spend: 0 }, { month: "D", spend: 0 },
    ],
  },
  {
    id: 3, name: "Rice", daysLeft: 3, totalDays: 60,
    itemSize: "50kg", price: 85000,
    history: [
      { month: "J", spend: 80 }, { month: "F", spend: 65 },
      { month: "M", spend: 90 }, { month: "A", spend: 70 },
      { month: "M", spend: 75 }, { month: "J", spend: 95 },
      { month: "J", spend: 0 }, { month: "A", spend: 0 },
      { month: "S", spend: 0 }, { month: "O", spend: 0 },
      { month: "N", spend: 0 }, { month: "D", spend: 0 },
    ],
  },
  {
    id: 4, name: "Flour", daysLeft: 25, totalDays: 45,
    itemSize: "25kg", price: 32000,
    history: [
      { month: "J", spend: 40 }, { month: "F", spend: 55 },
      { month: "M", spend: 35 }, { month: "A", spend: 60 },
      { month: "M", spend: 45 }, { month: "J", spend: 50 },
      { month: "J", spend: 0 }, { month: "A", spend: 0 },
      { month: "S", spend: 0 }, { month: "O", spend: 0 },
      { month: "N", spend: 0 }, { month: "D", spend: 0 },
    ],
  },
  {
    id: 5, name: "Vegetable Oil", daysLeft: 40, totalDays: 60,
    itemSize: "5L", price: 15000,
    history: [
      { month: "J", spend: 50 }, { month: "F", spend: 45 },
      { month: "M", spend: 60 }, { month: "A", spend: 55 },
      { month: "M", spend: 40 }, { month: "J", spend: 65 },
      { month: "J", spend: 30 }, { month: "A", spend: 35 },
      { month: "S", spend: 0 }, { month: "O", spend: 0 },
      { month: "N", spend: 0 }, { month: "D", spend: 0 },
    ],
  },
  {
    id: 6, name: "Kerosene", daysLeft: 2, totalDays: 14,
    itemSize: "4L", price: 6000,
    history: [
      { month: "J", spend: 25 }, { month: "F", spend: 30 },
      { month: "M", spend: 35 }, { month: "A", spend: 20 },
      { month: "M", spend: 40 }, { month: "J", spend: 30 },
      { month: "J", spend: 0 }, { month: "A", spend: 0 },
      { month: "S", spend: 0 }, { month: "O", spend: 0 },
      { month: "N", spend: 0 }, { month: "D", spend: 0 },
    ],
  },
];