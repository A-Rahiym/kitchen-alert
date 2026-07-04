import type { ComponentType } from "react";
import BudgetSvg from "@/assets/icons/settings/budget.svg";
import PricesSvg from "@/assets/icons/settings/prices.svg";
import NotificationSvg from "@/assets/icons/settings/notification.svg";
import LowStockSvg from "@/assets/icons/settings/low_stock_alert.svg";
import LoginsSvg from "@/assets/icons/settings/logins.svg";
import HelpSvg from "@/assets/icons/settings/help.svg";
import ExportSvg from "@/assets/icons/settings/export.svg";

type IconComponent = ComponentType<{ width?: number; height?: number; color?: string }>;

const iconMap: Record<string, IconComponent> = {
  budget: BudgetSvg,
  prices: PricesSvg,
  notification: NotificationSvg,
  low_stock_alert: LowStockSvg,
  logins: LoginsSvg,
  help: HelpSvg,
  export: ExportSvg,
};

export function getSettingIcon(name: string): IconComponent {
  return iconMap[name] ?? HelpSvg;
}
