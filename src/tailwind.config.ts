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
        // Muted premium wine / oxblood (calmer than vivid red)
        brand: {
          300: "#f3a6ac", // blush
          400: "#e77780", // dusty rose
          500: "#c83d49", // wine red (primary)
          600: "#a72d37", // oxblood
          700: "#7f2028", // deep oxblood
        },
      },
    },
  },
  plugins: [],
};

export default config;
