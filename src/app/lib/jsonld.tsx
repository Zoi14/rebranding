import { SITE, siteUrl } from "./seo";

type JsonLdProps<T extends object> = { data: T };
const safe = (s: string) =>
  s.replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");

function JsonLd<T extends object>({ data }: JsonLdProps<T>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safe(JSON.stringify(data)) }}
    />
  );
}

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: siteUrl(),
    logo: siteUrl("/favicon.ico"),
  };
  return <JsonLd data={data} />;
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: siteUrl(),
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl()}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  return <JsonLd data={data} />;
}