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
        sans: ["var(--font-sans)", "Inter", "system-ui", "ui-sans-serif", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      colors: {
        // Background colors - Clean professional whites
        bg: {
          DEFAULT: "#FFFFFF",
          warm: "#F8FAFC",
          elevated: "#FFFFFF",
          dark: "#0F172A",
        },
        // Accent — Royal Sapphire Blue (2026 trend)
        accent: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8",
          light: "#60A5FA",
          muted: "rgba(37, 99, 235, 0.65)",
          subtle: "rgba(37, 99, 235, 0.08)",
          border: "rgba(37, 99, 235, 0.25)",
        },
        // Secondary accent — Sky Blue
        "accent-secondary": {
          DEFAULT: "#0EA5E9",
          subtle: "rgba(14, 165, 233, 0.08)",
        },
        // Surface colors for cards/backgrounds
        surface: {
          DEFAULT: "rgba(15, 23, 42, 0.02)",
          hover: "rgba(15, 23, 42, 0.04)",
          strong: "rgba(15, 23, 42, 0.05)",
          glass: "rgba(255, 255, 255, 0.85)",
        },
        // Border colors
        border: {
          DEFAULT: "rgba(15, 23, 42, 0.08)",
          subtle: "rgba(15, 23, 42, 0.04)",
          focus: "rgba(37, 99, 235, 0.4)",
        },
        // Text colors - Professional navy
        text: {
          DEFAULT: "#0F172A",
          muted: "rgba(15, 23, 42, 0.75)",
          subtle: "rgba(15, 23, 42, 0.55)",
          dim: "rgba(15, 23, 42, 0.38)",
        },
      },
      spacing: {
        // Touch targets
        "touch-min": "2.75rem",
        "touch-comfortable": "3rem",
      },
      borderRadius: {
        sm: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.5" }],
        base: ["1rem", { lineHeight: "1.5" }],
        lg: ["1.125rem", { lineHeight: "1.65" }],
        xl: ["1.25rem", { lineHeight: "1.3" }],
        "2xl": ["1.5rem", { lineHeight: "1.3" }],
        "3xl": ["1.875rem", { lineHeight: "1.15" }],
        "4xl": ["2.25rem", { lineHeight: "1.15" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
      },
      boxShadow: {
        xs: "0 1px 2px rgba(15, 23, 42, 0.03)",
        sm: "0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.03)",
        md: "0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -1px rgba(15, 23, 42, 0.03)",
        lg: "0 10px 15px -3px rgba(15, 23, 42, 0.05), 0 4px 6px -2px rgba(15, 23, 42, 0.03)",
        xl: "0 20px 25px -5px rgba(15, 23, 42, 0.06), 0 10px 10px -5px rgba(15, 23, 42, 0.02)",
        "2xl": "0 25px 50px -12px rgba(15, 23, 42, 0.12)",
        glow: "0 0 40px rgba(37, 99, 235, 0.20)",
        "glow-blue": "0 0 30px rgba(37, 99, 235, 0.25)",
        inner: "inset 0 2px 4px 0 rgba(15, 23, 42, 0.03)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 0.61, 0.36, 1)",
        "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "250ms",
        slow: "400ms",
        slower: "600ms",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "float": "float 6s ease-in-out infinite alternate",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "marquee": "marquee-scroll 30s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-20px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "marquee-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
    },
  },
  plugins: [],
};

export default config;
