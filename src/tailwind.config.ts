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
        // Light Mode theme colors
        background: "#ffffff",
        foreground: "#0f172a",

        // Orange accent (matching globals.css)
        brand: {
          300: "#ffb38a",
          400: "#ff8a4a",
          500: "#ff6a1a", // main orange
          600: "#e45510",
          700: "#b6400c",
        },
      },
    },
  },
  plugins: [],
};

export default config;
