export const colors = {
  primary: "#E8630A",
  primaryLight: "#F5A623",
  secondary: "#4CAF50",
  secondaryLight: "#81C784",
  accent: "#D32F2F",

  background: "#FFF8F0",
  surface: "#FFFFFF",
  surfaceAlt: "#FFF0E0",

  heading: "#0D1F2D",
  body: "#0D1F2D",
  muted: "#9CA3AF",
  inverse: "#FFFFFF",

  stroke: "#E5E7EB",
  strokeLight: "#F3F4F6",

  tabActive: "#E8630A",
  tabInactive: "#9CA3AF",

  statusExpired: "#D32F2F",
  statusExpiring: "#F5A623",
  statusFresh: "#4CAF50",
} as const;

export type ColorKey = keyof typeof colors;
