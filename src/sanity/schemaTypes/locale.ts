import { defineType } from "sanity";

/**
 * Locale types for bilingual content (English + Hebrew)
 * These are used as field types throughout the schema
 */

export const localeString = defineType({
  name: "localeString",
  title: "Localized String",
  type: "object",
  fields: [
    {
      name: "en",
      type: "string",
      title: "English",
    },
    {
      name: "he",
      type: "string",
      title: "Hebrew (עברית)",
    },
  ],
});

export const localeText = defineType({
  name: "localeText",
  title: "Localized Text",
  type: "object",
  fields: [
    {
      name: "en",
      type: "text",
      title: "English",
      rows: 4,
    },
    {
      name: "he",
      type: "text",
      title: "Hebrew (עברית)",
      rows: 4,
    },
  ],
});

export const localeBlockContent = defineType({
  name: "localeBlockContent",
  title: "Localized Block Content",
  type: "object",
  fields: [
    {
      name: "en",
      type: "array",
      title: "English",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
    },
    {
      name: "he",
      type: "array",
      title: "Hebrew (עברית)",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
    },
  ],
});
