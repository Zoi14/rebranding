import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "ui-sans-serif", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      colors: {
        // Premium Electric Blue (2026 Light Mode)
        brand: {
          300: "#60A5FA", // light blue
          400: "#3B82F6", // blue
          500: "#2563EB", // electric blue (primary)
          600: "#1D4ED8", // deep blue
          700: "#1E40AF", // navy blue
        },
        // Clean backgrounds
        bg: {
          DEFAULT: "#FFFFFF",
          subtle: "#FAFAF9",
        },
        // Typography colors
        text: {
          DEFAULT: "#0F172A", // deep charcoal
          muted: "rgba(15,23,42,.65)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
