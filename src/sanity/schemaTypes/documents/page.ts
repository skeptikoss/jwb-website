import { defineType, defineField } from "sanity";
import { FileText } from "lucide-react";

export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: FileText,
  fields: [
    defineField({
      name: "title",
      type: "localeString",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      description: "URL path for this page",
      options: {
        source: "title.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "localeText",
      title: "Excerpt",
      description: "Short description for listings and previews",
    }),
    defineField({
      name: "mainImage",
      type: "image",
      title: "Main Image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "localeString",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "content",
      type: "localeBlockContent",
      title: "Content",
    }),
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO Settings",
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published At",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "slug.current",
      media: "mainImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Untitled",
        subtitle: `/${subtitle || ""}`,
        media,
      };
    },
  },
});
