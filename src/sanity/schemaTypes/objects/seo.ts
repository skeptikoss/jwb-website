import { defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO Settings",
  type: "object",
  fields: [
    {
      name: "metaTitle",
      type: "localeString",
      title: "Meta Title",
      description: "Overrides default page title for SEO (max 60 chars)",
    },
    {
      name: "metaDescription",
      type: "localeText",
      title: "Meta Description",
      description: "Description for search engines (max 160 chars)",
    },
    {
      name: "ogImage",
      type: "image",
      title: "Open Graph Image",
      description: "Image for social media sharing (1200x630 recommended)",
      options: {
        hotspot: true,
      },
    },
    {
      name: "noIndex",
      type: "boolean",
      title: "Hide from Search Engines",
      description: "Enable to prevent this page from appearing in search results",
      initialValue: false,
    },
  ],
});
