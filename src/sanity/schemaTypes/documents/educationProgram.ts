import { defineType, defineField } from "sanity";
import { GraduationCap } from "lucide-react";

export const educationProgramType = defineType({
  name: "educationProgram",
  title: "Education Program",
  type: "document",
  icon: GraduationCap,
  fields: [
    defineField({
      name: "name",
      type: "localeString",
      title: "Program Name",
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
      name: "type",
      type: "string",
      title: "Program Type",
      options: {
        list: [
          { title: "Preschool", value: "preschool" },
          { title: "Sunday School", value: "sunday-school" },
          { title: "Day School", value: "day-school" },
          { title: "Adult Education", value: "adult" },
          { title: "Youth Program", value: "youth" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "ageRange",
      type: "localeString",
      title: "Age Range",
      description: 'e.g., "18 months - 6 years"',
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
      name: "description",
      type: "localeBlockContent",
      title: "Description",
    }),
    defineField({
      name: "schedule",
      type: "localeText",
      title: "Schedule",
      description: "Days and times the program runs",
    }),
    defineField({
      name: "contactName",
      type: "string",
      title: "Contact Person",
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
      name: "registrationLink",
      type: "url",
      title: "Registration Link",
      description: "External link for registration/application",
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
      subtitle: "type",
      media: "mainImage",
    },
    prepare({ title, subtitle, media }) {
      const typeLabels: Record<string, string> = {
        preschool: "Preschool",
        "sunday-school": "Sunday School",
        "day-school": "Day School",
        adult: "Adult Education",
        youth: "Youth Program",
      };
      return {
        title: title || "Untitled",
        subtitle: subtitle ? typeLabels[subtitle] : "",
        media,
      };
    },
  },
});
