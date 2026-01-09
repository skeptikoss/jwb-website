import { defineType, defineField } from "sanity";
import { Settings } from "lucide-react";

export const settingsType = defineType({
  name: "settings",
  title: "Site Settings",
  type: "document",
  icon: Settings,
  fields: [
    defineField({
      name: "siteTitle",
      type: "localeString",
      title: "Site Title",
    }),
    defineField({
      name: "siteDescription",
      type: "localeText",
      title: "Site Description",
    }),
    defineField({
      name: "contactInfo",
      type: "object",
      title: "Contact Information",
      fields: [
        { name: "email", type: "email", title: "General Email" },
        { name: "phone", type: "string", title: "Phone" },
        { name: "address", type: "address", title: "Main Office Address" },
      ],
    }),
    defineField({
      name: "socialMedia",
      type: "object",
      title: "Social Media",
      fields: [
        { name: "facebook", type: "url", title: "Facebook" },
        { name: "instagram", type: "url", title: "Instagram" },
        { name: "youtube", type: "url", title: "YouTube" },
        { name: "whatsapp", type: "string", title: "WhatsApp Number" },
      ],
    }),
    defineField({
      name: "shabbatTimes",
      type: "object",
      title: "Current Shabbat Times",
      description: "Update weekly or integrate with API",
      fields: [
        { name: "candleLighting", type: "string", title: "Candle Lighting" },
        { name: "havdalah", type: "string", title: "Havdalah" },
        { name: "parasha", type: "localeString", title: "Weekly Parasha" },
      ],
    }),
    defineField({
      name: "footerText",
      type: "localeText",
      title: "Footer Description",
    }),
    defineField({
      name: "defaultOgImage",
      type: "image",
      title: "Default Social Image",
      description: "Default image for social media sharing",
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
