// FILE: src/app/fonts.ts
import { Noto_Sans, Space_Grotesk } from "next/font/google";

/* Body font with full Greek support */
export const sans = Noto_Sans({
  subsets: ["latin", "greek"],
  variable: "--font-sans",
  display: "swap",
});

/* Display font (latin only). Greek will fallback to --font-sans */
export const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});