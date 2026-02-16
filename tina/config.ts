import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "md",
        fields: [
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Sections (Blocks)",
            templates: [
              {
                name: "hero",
                label: "Hero Section",
                fields: [
                  { type: "string", name: "heroBadge", label: "Badge Text" },
                  { type: "string", name: "heroTitlePre", label: "Title Part 1 (White)" },
                  { type: "string", name: "heroTitleHighlight", label: "Title Part 2 (Gradient)" },
                  { type: "string", name: "heroTitlePost", label: "Title Part 3 (White)" },
                  { type: "string", name: "heroSubtitle", label: "Subtitle", ui: { component: "textarea" } },
                  { type: "string", name: "heroCtaPrimary", label: "Primary Button Text" },
                  { type: "string", name: "heroCtaSecondary", label: "Secondary Button Text" },
                ],
              },
              {
                name: "marquee",
                label: "Marquee (Scrolling Text)",
                fields: [
                   { type: "boolean", name: "visible", label: "Show Marquee?" }
                ],
              },
              {
                name: "about",
                label: "About Section",
                fields: [
                  { type: "string", name: "aboutHeadingPre", label: "Heading Part 1" },
                  { type: "string", name: "aboutHeadingHighlight", label: "Heading Highlight (Blue)" },
                  { type: "string", name: "aboutHeadingPost", label: "Heading Part 3" },
                  { type: "rich-text", name: "aboutBody", label: "Body Text" },
                  { type: "string", list: true, name: "aboutTags", label: "Tags (Pills)" },
                  {
                    type: "object",
                    list: true,
                    name: "stats",
                    label: "Stats (Bento Grid)",
                    fields: [
                      { type: "string", name: "value", label: "Number Value" },
                      { type: "string", name: "suffix", label: "Suffix (e.g. + or %)" },
                      { type: "string", name: "label", label: "Label" },
                      { type: "boolean", name: "isAnimated", label: "Animate Number?" },
                      { type: "boolean", name: "isHighlighted", label: "Blue Background?" },
                    ]
                  }
                ],
              },
              {
                name: "services",
                label: "Services Grid",
                fields: [
                    { type: "string", name: "title", label: "Section Title (Optional)" }
                ],
              },
              {
                name: "cta",
                label: "Call to Action (Footer)",
                fields: [
                    { type: "string", name: "ctaHeading", label: "Heading" },
                    { type: "string", name: "ctaButtonLabel", label: "Button Label" }
                ],
              }
            ],
          },
        ],
      },
    ],
  },
});