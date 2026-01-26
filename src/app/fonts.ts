// FILE: src/app/fonts.ts
import { Noto_Sans, Playfair_Display } from "next/font/google";

/* Body font with full Greek support */
export const sans = Noto_Sans({
  subsets: ["latin", "greek"],
  variable: "--font-sans",
  display: "swap",
});

/* Display font — Luxury serif for headings (latin only). Greek will fallback to --font-sans */
export const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});