import { defineType, defineField } from "sanity";
import { ShoppingBag } from "lucide-react";

/**
 * Product Schema
 *
 * Kosher grocery products for the JWB Singapore shop.
 * Supports bilingual content, kashrut certifications, and inventory status.
 *
 * Price is stored as a number in SGD (e.g., 11.70 for $11.70 SGD).
 * Inventory is a simple in/out of stock boolean (no quantity tracking).
 */

// Kashrut certification options
const kashrutCertifications = [
  { title: "OU (Orthodox Union)", value: "OU" },
  { title: "OK Kosher", value: "OK" },
  { title: "Star-K", value: "Star-K" },
  { title: "Kof-K", value: "Kof-K" },
  { title: "Singapore Rabbinate", value: "Singapore-Rabbinate" },
  { title: "CRC (Chicago Rabbinical Council)", value: "CRC" },
  { title: "Badatz", value: "Badatz" },
  { title: "Other", value: "Other" },
];

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: ShoppingBag,
  groups: [
    { name: "details", title: "Details", default: true },
    { name: "media", title: "Media" },
    { name: "inventory", title: "Inventory" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // Details group
    defineField({
      name: "name",
      type: "localeString",
      title: "Product Name",
      group: "details",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      description: "URL-friendly identifier",
      group: "details",
      options: {
        source: "name.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "localeBlockContent",
      title: "Description",
      description: "Product details and information",
      group: "details",
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Price (SGD)",
      description: "Price in Singapore Dollars (e.g., 11.70)",
      group: "details",
      validation: (Rule) => Rule.required().positive().precision(2),
    }),
    defineField({
      name: "category",
      type: "reference",
      title: "Category",
      to: [{ type: "productCategory" }],
      group: "details",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "kashrut",
      type: "string",
      title: "Kashrut Certification",
      description: "Kosher certification authority",
      group: "details",
      options: {
        list: kashrutCertifications,
        layout: "dropdown",
      },
    }),

    // Media group
    defineField({
      name: "images",
      type: "array",
      title: "Product Images",
      description: "First image is used as the main product image",
      group: "media",
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
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).error("At least one product image is required"),
    }),

    // Inventory group
    defineField({
      name: "sku",
      type: "string",
      title: "SKU",
      description: "Stock Keeping Unit (product code)",
      group: "inventory",
    }),
    defineField({
      name: "inStock",
      type: "boolean",
      title: "In Stock",
      description: "Is this product currently available?",
      group: "inventory",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured Product",
      description: "Show this product in featured sections",
      group: "inventory",
      initialValue: false,
    }),

    // SEO group
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO Settings",
      group: "seo",
    }),
  ],
  orderings: [
    {
      title: "Name (A-Z)",
      name: "nameAsc",
      by: [{ field: "name.en", direction: "asc" }],
    },
    {
      title: "Price (Low to High)",
      name: "priceAsc",
      by: [{ field: "price", direction: "asc" }],
    },
    {
      title: "Price (High to Low)",
      name: "priceDesc",
      by: [{ field: "price", direction: "desc" }],
    },
    {
      title: "Recently Created",
      name: "createdDesc",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "name.en",
      price: "price",
      inStock: "inStock",
      media: "images.0",
      category: "category.name.en",
    },
    prepare({ title, price, inStock, media, category }) {
      const stockStatus = inStock === false ? " [OUT OF STOCK]" : "";
      const priceDisplay = typeof price === "number" ? `$${price.toFixed(2)} SGD` : "";

      return {
        title: `${title || "Untitled Product"}${stockStatus}`,
        subtitle: [priceDisplay, category].filter(Boolean).join(" • "),
        media,
      };
    },
  },
});
