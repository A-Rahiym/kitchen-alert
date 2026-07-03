import type { ComponentType } from "react";
import Gas from "@/assets/icons/items/gas.svg";
import Egg from "@/assets/icons/items/egg.svg";
import Rice from "@/assets/icons/items/rice.svg";
import Flour from "@/assets/icons/items/flour.svg";
import Oil from "@/assets/icons/items/oil.svg";
import Kerosene from "@/assets/icons/items/kerosene.svg";

type IconComponent = ComponentType<{ width?: number; height?: number; color?: string }>;

const iconMap: Record<string, IconComponent> = {
  "Cooking Gas": Gas,
  Eggs: Egg,
  Rice: Rice,
  Flour: Flour,
  "Vegetable Oil": Oil,
  Kerosene: Kerosene,
};

export function getPantryIcon(name: string): IconComponent {
  return iconMap[name] ?? Gas;
}

export function calculatePercentage(daysLeft: number, totalDays: number): number {
  return Math.round((daysLeft / totalDays) * 100);
}

export function getDonutColor(percentage: number): string {
  if (percentage <= 25) return "#D32F2F";
  if (percentage <= 50) return "#F5A623";
  return "#35D987";
}
