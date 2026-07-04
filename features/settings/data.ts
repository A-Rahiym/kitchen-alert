export interface SettingItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  hasToggle?: boolean;
}

export const settingsItems: SettingItem[] = [
  { id: "budget", title: "Monthly Budget", subtitle: "Set your spending limits", icon: "budget" },
  { id: "prices", title: "Prices", subtitle: "Manage pricing and rates", icon: "prices" },
  { id: "notifications", title: "Notifications", subtitle: "Manage your alerts", icon: "notification" },
  { id: "low_stock", title: "Low stock alert", subtitle: "Set inventory thresholds", icon: "low_stock_alert", hasToggle: true },
  { id: "logins", title: "Logins", subtitle: "Manage account security", icon: "logins" },
  { id: "help", title: "Help", subtitle: "Get support and FAQs", icon: "help" },
  { id: "export", title: "Export data", subtitle: "Export your account data", icon: "export" },
];
