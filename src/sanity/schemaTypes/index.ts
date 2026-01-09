import { type SchemaTypeDefinition } from "sanity";

// Locale types (base types for bilingual content)
import { localeString, localeText, localeBlockContent } from "./locale";

// Object types (reusable components)
import { addressType } from "./objects/address";
import { serviceTimeType } from "./objects/serviceTime";
import { seoType } from "./objects/seo";

// Document types
import { pageType } from "./documents/page";
import { synagogueType } from "./documents/synagogue";
import { personType } from "./documents/person";
import { educationProgramType } from "./documents/educationProgram";

// Singleton types
import { settingsType } from "./singletons/settings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Locale types (must be first as other types depend on them)
    localeString,
    localeText,
    localeBlockContent,

    // Object types
    addressType,
    serviceTimeType,
    seoType,

    // Document types
    pageType,
    synagogueType,
    personType,
    educationProgramType,

    // Singletons
    settingsType,
  ],
};
