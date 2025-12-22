export const SITE = {
  name: "Rebranding",
  slogan: "Modern black/white + red UI",
  locale: "el_GR",
  twitter: "@your_handle",
  creator: "Your Company",
};

export function siteUrl(path: string = ""): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const defaultOpenGraph = {
  type: "website",
  locale: SITE.locale,
  url: siteUrl(),
  siteName: SITE.name,
  images: [
    {
      url: siteUrl("/og-default.png"),
      width: 1200,
      height: 630,
      alt: `${SITE.name} — ${SITE.slogan}`,
    },
  ],
};

export function canonicalOf(pathname?: string) {
  return siteUrl(pathname || "/");
}

export function titleTemplate(title?: string) {
  return title ? `${title} | ${SITE.name}` : SITE.name;
}

export const defaultKeywords = [
  "rebranding",
  "branding",
  "design",
  "seo",
  "web",
  "athens",
  "greece",
];