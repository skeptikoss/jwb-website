import { defineType, defineField } from "sanity";
import { Tags } from "lucide-react";

/**
 * Product Category Schema
 *
 * Flat category structure for the kosher shop.
 * Categories are bilingual (English/Hebrew) and ordered manually.
 *
 * Categories:
 * - Dairy & Chilled, Frozen Food, Canned & Preserved
 * - Condiments & Spices, Snacks & Confectionery, Cookies & Biscuits
 * - Bread & Bakery, Wine & Beverages, Grains & Pasta, Judaica
 */
export const productCategoryType = defineType({
  name: "productCategory",
  title: "Product Category",
  type: "document",
  icon: Tags,
  fields: [
    defineField({
      name: "name",
      type: "localeString",
      title: "Category Name",
      description: "The display name for this category",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      description: "URL-friendly identifier (auto-generated from English name)",
      options: {
        source: "name.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "localeText",
      title: "Description",
      description: "Brief description of what products are in this category",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Category Image",
      description: "Representative image for the category",
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
      name: "order",
      type: "number",
      title: "Display Order",
      description: "Lower numbers appear first",
      initialValue: 0,
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Name (A-Z)",
      name: "nameAsc",
      by: [{ field: "name.en", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name.en",
      hebrewName: "name.he",
      order: "order",
      media: "image",
    },
    prepare({ title, hebrewName, order, media }) {
      return {
        title: title || "Untitled Category",
        subtitle: hebrewName ? `${hebrewName} (Order: ${order ?? 0})` : `Order: ${order ?? 0}`,
        media,
      };
    },
  },
});
