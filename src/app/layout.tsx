import type { Metadata } from "next";
import "./globals.css";
import { sans, display } from "./fonts";
import Nav from "../components/Nav";
import ScrollReveal from "../components/ScrollReveal";
import { SITE, defaultOpenGraph, siteUrl } from "./lib/seo";
import { OrganizationJsonLd, WebSiteJsonLd } from "./lib/jsonld";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: SITE.name, template: "%s | " + SITE.name },
  description: SITE.slogan,
  applicationName: SITE.name,
  creator: SITE.creator,
  keywords: ["rebranding", "branding", "seo", "web", "design"],
  openGraph: defaultOpenGraph,
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
    creator: SITE.twitter,
    title: SITE.name,
    description: SITE.slogan,
    images: ["/og-default.png"],
  },
  alternates: { canonical: siteUrl() },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable} font-sans`}>
        <ScrollReveal />
        <Nav />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <main>{children}</main>
      </body>
    </html>
  );
}
