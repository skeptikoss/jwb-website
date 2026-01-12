import { defineType, defineField } from "sanity";
import { Calendar } from "lucide-react";

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  icon: Calendar,
  fields: [
    defineField({
      name: "name",
      type: "localeString",
      title: "Event Name",
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
      name: "eventType",
      type: "string",
      title: "Event Type",
      options: {
        list: [
          { title: "Community", value: "community" },
          { title: "Youth", value: "youth" },
          { title: "Education", value: "education" },
          { title: "Holiday", value: "holiday" },
          { title: "Shabbat", value: "shabbat" },
          { title: "Sports", value: "sports" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "localeBlockContent",
      title: "Description",
    }),
    defineField({
      name: "date",
      type: "datetime",
      title: "Event Date & Time",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      type: "datetime",
      title: "End Date & Time",
      description: "Optional: For multi-day events or to show duration",
    }),
    defineField({
      name: "isRecurring",
      type: "boolean",
      title: "Recurring Event",
      description: "Check if this event repeats regularly",
      initialValue: false,
    }),
    defineField({
      name: "recurringSchedule",
      type: "localeString",
      title: "Recurring Schedule",
      description: 'e.g., "Every Thursday", "First Sunday of each month"',
      hidden: ({ parent }) => !parent?.isRecurring,
    }),
    defineField({
      name: "location",
      type: "localeString",
      title: "Location",
      description: 'e.g., "Jacob Ballas Centre", "24 Waterloo Street"',
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Price (SGD)",
      description: "Leave empty for free events",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "priceNote",
      type: "localeString",
      title: "Price Note",
      description: 'For variable pricing, e.g., "Kids $15, Adults $25"',
    }),
    defineField({
      name: "mainImage",
      type: "image",
      title: "Event Image",
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
      name: "registrationLink",
      type: "url",
      title: "Registration Link",
      description: "External link for event registration/RSVP",
    }),
    defineField({
      name: "organizer",
      type: "string",
      title: "Organizer",
      description: 'e.g., "JWB Singapore"',
      initialValue: "JWB Singapore",
    }),
    defineField({
      name: "capacity",
      type: "number",
      title: "Capacity",
      description: "Maximum number of attendees (optional)",
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO Settings",
    }),
  ],
  orderings: [
    {
      title: "Event Date (Upcoming First)",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
    {
      title: "Event Date (Recent First)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "name.en",
      date: "date",
      eventType: "eventType",
      media: "mainImage",
    },
    prepare({ title, date, eventType, media }) {
      const typeLabels: Record<string, string> = {
        community: "Community",
        youth: "Youth",
        education: "Education",
        holiday: "Holiday",
        shabbat: "Shabbat",
        sports: "Sports",
      };

      const formattedDate = date
        ? new Date(date).toLocaleDateString("en-SG", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "No date";

      return {
        title: title || "Untitled Event",
        subtitle: `${formattedDate} • ${typeLabels[eventType] || eventType}`,
        media,
      };
    },
  },
});
