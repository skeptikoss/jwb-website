import { defineType, defineField } from "sanity";
import { User } from "lucide-react";

export const personType = defineType({
  name: "person",
  title: "Person",
  type: "document",
  icon: User,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Full Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      type: "localeString",
      title: "Role/Title",
      description: 'e.g., "Chief Rabbi", "Youth Leader"',
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Category",
      options: {
        list: [
          { title: "Clergy", value: "clergy" },
          { title: "Staff", value: "staff" },
          { title: "Board Member", value: "board" },
          { title: "Educator", value: "educator" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      type: "image",
      title: "Photo",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      type: "localeBlockContent",
      title: "Biography",
    }),
    defineField({
      name: "email",
      type: "email",
      title: "Email",
    }),
    defineField({
      name: "phone",
      type: "string",
      title: "Phone",
    }),
    defineField({
      name: "order",
      type: "number",
      title: "Display Order",
      description: "Lower numbers appear first",
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Name",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role.en",
      media: "photo",
    },
  },
});
