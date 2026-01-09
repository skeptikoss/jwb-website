import { defineType, defineField } from "sanity";
import { Building2 } from "lucide-react";

export const synagogueType = defineType({
  name: "synagogue",
  title: "Synagogue",
  type: "document",
  icon: Building2,
  fields: [
    defineField({
      name: "name",
      type: "localeString",
      title: "Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "name.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "meaningOfName",
      type: "localeString",
      title: "Meaning of Name",
      description: 'e.g., "Shield of our Fathers"',
    }),
    defineField({
      name: "yearEstablished",
      type: "number",
      title: "Year Established",
      validation: (Rule) => Rule.min(1800).max(2100),
    }),
    defineField({
      name: "mainImage",
      type: "image",
      title: "Main Image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "localeString",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "gallery",
      type: "array",
      title: "Photo Gallery",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "localeString",
              title: "Alternative Text",
            },
            {
              name: "caption",
              type: "localeString",
              title: "Caption",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "description",
      type: "localeText",
      title: "Short Description",
    }),
    defineField({
      name: "history",
      type: "localeBlockContent",
      title: "History & Details",
    }),
    defineField({
      name: "address",
      type: "address",
      title: "Address",
    }),
    defineField({
      name: "serviceTimes",
      type: "array",
      title: "Service Times",
      of: [{ type: "serviceTime" }],
    }),
    defineField({
      name: "features",
      type: "array",
      title: "Features",
      of: [{ type: "localeString" }],
      description: 'e.g., "Air conditioned", "Wheelchair accessible"',
    }),
    defineField({
      name: "contactEmail",
      type: "email",
      title: "Contact Email",
    }),
    defineField({
      name: "contactPhone",
      type: "string",
      title: "Contact Phone",
    }),
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO Settings",
    }),
  ],
  preview: {
    select: {
      title: "name.en",
      year: "yearEstablished",
      media: "mainImage",
    },
    prepare({ title, year, media }) {
      return {
        title: title || "Untitled",
        subtitle: year ? `Est. ${year}` : "",
        media,
      };
    },
  },
});
