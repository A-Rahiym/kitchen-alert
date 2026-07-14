export const colors = {
  primary: "#E8630A",
  primaryLight: "#F5A623",
  secondary: "#4CAF50",
  secondaryLight: "#81C784",
  tertiary: "#0D1F2D",
  tertiaryalt: "#143046",
  tertiaryLight: "#2A6593",
  accent: "#D32F2F",

  background: "#FFF8F0",
  surface: "#FFFFFF",
  surfaceAlt: "#FFF0E0",

  heading: "#0D1F2D",
  body: "#0D1F2D",
  muted: "#9CA3AF",
  inverse: "#FFFFFF",

  border: '#E5E1DA',

  stroke: "#E5E7EB",
  strokeLight: "#F3F4F6",

  tabActive: "#E8630A",
  tabInactive: "#9CA3AF",

  statusExpired: "#D32F2F",
  statusExpiring: "#F5A623",
  statusFresh: "#35D987",
} as const;
export type ColorKey = keyof typeof colors;