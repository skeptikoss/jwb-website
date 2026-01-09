import { defineType } from "sanity";

export const addressType = defineType({
  name: "address",
  title: "Address",
  type: "object",
  fields: [
    {
      name: "street",
      type: "string",
      title: "Street Address",
    },
    {
      name: "city",
      type: "string",
      title: "City",
      initialValue: "Singapore",
    },
    {
      name: "postalCode",
      type: "string",
      title: "Postal Code",
    },
    {
      name: "country",
      type: "string",
      title: "Country",
      initialValue: "Singapore",
    },
    {
      name: "coordinates",
      type: "geopoint",
      title: "Location Coordinates",
      description: "For map display",
    },
  ],
});
