import { defineType } from "sanity";

export const serviceTimeType = defineType({
  name: "serviceTime",
  title: "Service Time",
  type: "object",
  fields: [
    {
      name: "day",
      type: "string",
      title: "Day",
      options: {
        list: [
          { title: "Friday Evening", value: "friday" },
          { title: "Saturday Morning", value: "saturday" },
          { title: "Weekday Morning", value: "weekday-morning" },
          { title: "Weekday Evening", value: "weekday-evening" },
          { title: "Holiday", value: "holiday" },
        ],
      },
    },
    {
      name: "time",
      type: "string",
      title: "Time",
      description: 'e.g., "7:00 PM" or "9:00 AM"',
    },
    {
      name: "service",
      type: "localeString",
      title: "Service Name",
      description: 'e.g., "Kabbalat Shabbat", "Shacharit"',
    },
    {
      name: "notes",
      type: "localeString",
      title: "Notes",
      description: "Any additional information",
    },
  ],
  preview: {
    select: {
      day: "day",
      time: "time",
      service: "service.en",
    },
    prepare({ day, time, service }) {
      return {
        title: `${day}: ${time}`,
        subtitle: service,
      };
    },
  },
});
