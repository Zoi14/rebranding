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
        // 2026 Premium Palette: Deep blacks + Electric accent
        premium: {
          black: "#050505",      // Deep true black
          darker: "#0a0a0a",     // Slightly lighter black for surfaces
          dark: "#121212",       // Dark surface
          slate: "#1a1a1a",      // Elevated surface
        },
        electric: {
          50: "#fff7ed",         // Lightest tint
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#ff6f1a",        // Main electric orange
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",        // Deepest
        },
        glass: {
          white: "rgba(255, 255, 255, 0.03)",
          border: "rgba(255, 255, 255, 0.08)",
          "border-strong": "rgba(255, 255, 255, 0.12)",
        },
      },
      backdropBlur: {
        glass: "12px",
        "glass-md": "16px",
        "glass-lg": "24px",
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        normal: "0",
        wide: "0.02em",
        wider: "0.04em",
        widest: "0.1em",
        mega: "0.18em",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-lg": "0 18px 55px rgba(0, 0, 0, 0.55)",
        glow: "0 0 20px rgba(255, 111, 26, 0.15)",
        "glow-strong": "0 0 40px rgba(255, 111, 26, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
