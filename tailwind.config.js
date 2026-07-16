/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}"
  ],


  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter"],
      },
      colors: {
        primary: "#FF7616",
        "primary-light": "#FED1AF",
        secondary: "#4CAF50",
        "secondary-light": "#81C784",
        tertiary: "#0D1F2D",
        "tertiary-alrt": "#143046",
        "tertiary-light": "#2A6593",
        accent: "#D32F2F",
        background: "#FFF8F0",
        border: "#E5E1DA",
        surface: "#FFFFFF",
        "surface-alt": "#FFF0E0",
        heading: "#0D1F2D",
        body: "#0D1F2D",
        muted: "#666666",
      
        inverse: "#FFFFFF",
        stroke: "#E5E7EB",
        "stroke-light": "#F3F4F6",
        "tab-active": "#E8630A",
        "tab-inactive": "#9CA3AF",
        "status-danger": "#EF4444",
        "status-expiring": "#F5A623",
        "status-fresh": "#4CAF50",
      },
    },
  },
  plugins: [],
};
