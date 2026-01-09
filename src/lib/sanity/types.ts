/**
 * TypeScript types for Sanity CMS content
 * These mirror the schema definitions in src/sanity/schemaTypes/
 */

import type { PortableTextBlock } from "@portabletext/types";

// =============================================================================
// Locale Types (field-level localization)
// =============================================================================

export type Locale = "en" | "he";

export interface LocaleString {
  en?: string;
  he?: string;
}

export interface LocaleText {
  en?: string;
  he?: string;
}

export interface LocaleBlockContent {
  en?: PortableTextBlock[];
  he?: PortableTextBlock[];
}

// =============================================================================
// Common Objects
// =============================================================================

export interface SanitySlug {
  current: string;
  _type: "slug";
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  alt?: LocaleString;
  caption?: LocaleString;
}

export interface Address {
  _type: "address";
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  coordinates?: {
    lat: number;
    lng: number;
    alt?: number;
  };
}

export interface ServiceTime {
  _key: string;
  _type: "serviceTime";
  day?: "friday" | "saturday" | "weekday-morning" | "weekday-evening" | "holiday";
  time?: string;
  service?: LocaleString;
  notes?: LocaleString;
}

export interface SEO {
  _type: "seo";
  metaTitle?: LocaleString;
  metaDescription?: LocaleText;
  ogImage?: SanityImage;
}

// =============================================================================
// Document Types
// =============================================================================

export interface BaseSanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

/**
 * Generic page document (History, About, Contact, Travel, etc.)
 */
export interface Page extends BaseSanityDocument {
  _type: "page";
  title: LocaleString;
  slug: SanitySlug;
  excerpt?: LocaleText;
  mainImage?: SanityImage;
  content?: LocaleBlockContent;
  seo?: SEO;
  publishedAt?: string;
}

/**
 * Synagogue document (Maghain Aboth, Chesed El)
 */
export interface Synagogue extends BaseSanityDocument {
  _type: "synagogue";
  name: LocaleString;
  slug: SanitySlug;
  meaningOfName?: LocaleString;
  yearEstablished?: number;
  mainImage?: SanityImage;
  gallery?: SanityImage[];
  description?: LocaleText;
  history?: LocaleBlockContent;
  address?: Address;
  serviceTimes?: ServiceTime[];
  features?: LocaleString[];
  contactEmail?: string;
  contactPhone?: string;
  seo?: SEO;
}

/**
 * Person document (Rabbi, Staff, Board members)
 */
export interface Person extends BaseSanityDocument {
  _type: "person";
  name: string;
  slug: SanitySlug;
  role?: LocaleString;
  category: "clergy" | "staff" | "board" | "educator";
  photo?: SanityImage;
  bio?: LocaleBlockContent;
  email?: string;
  phone?: string;
  order?: number;
}

/**
 * Education program document
 */
export interface EducationProgram extends BaseSanityDocument {
  _type: "educationProgram";
  name: LocaleString;
  slug: SanitySlug;
  type?: "preschool" | "sunday-school" | "day-school" | "adult" | "youth";
  ageRange?: LocaleString;
  mainImage?: SanityImage;
  description?: LocaleBlockContent;
  schedule?: LocaleText;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  registrationLink?: string;
  seo?: SEO;
}

/**
 * Site settings singleton
 */
export interface SiteSettings extends BaseSanityDocument {
  _type: "settings";
  siteTitle?: LocaleString;
  siteDescription?: LocaleText;
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: Address;
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
  };
  shabbatTimes?: {
    candleLighting?: string;
    havdalah?: string;
    parasha?: LocaleString;
  };
  footerText?: LocaleText;
  defaultOgImage?: SanityImage;
}

// =============================================================================
// Helper Types
// =============================================================================

/**
 * Get localized value with fallback to English
 */
export function getLocalizedValue<T extends LocaleString | LocaleText | LocaleBlockContent>(
  field: T | undefined,
  locale: Locale
): T extends LocaleBlockContent ? PortableTextBlock[] | undefined : string | undefined {
  if (!field) return undefined;
  // Try requested locale first, fall back to English
  return (field[locale] ?? field.en) as any;
}

/**
 * Type guard to check if value exists for locale
 */
export function hasLocalizedValue(
  field: LocaleString | LocaleText | undefined,
  locale: Locale
): boolean {
  return !!(field?.[locale] || field?.en);
}
