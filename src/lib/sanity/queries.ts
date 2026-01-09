/**
 * GROQ queries for Sanity CMS content
 *
 * These queries return raw data - locale selection happens in components
 * using the getLocalizedValue() helper from types.ts
 */

import { client } from "@/sanity/lib/client";
import type {
  Page,
  Synagogue,
  Person,
  EducationProgram,
  SiteSettings,
} from "./types";

// =============================================================================
// Page Queries
// =============================================================================

const pageFields = /* groq */ `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  excerpt,
  mainImage,
  content,
  seo,
  publishedAt
`;

/**
 * Get a single page by slug
 */
export async function getPageBySlug(slug: string): Promise<Page | null> {
  return client.fetch(
    /* groq */ `*[_type == "page" && slug.current == $slug][0]{${pageFields}}`,
    { slug }
  );
}

/**
 * Get all pages (for sitemap, navigation, etc.)
 */
export async function getAllPages(): Promise<Page[]> {
  return client.fetch(
    /* groq */ `*[_type == "page"] | order(publishedAt desc){${pageFields}}`
  );
}

/**
 * Get page slugs for static generation
 */
export async function getPageSlugs(): Promise<string[]> {
  const pages = await client.fetch<{ slug: { current: string } }[]>(
    /* groq */ `*[_type == "page" && defined(slug.current)]{slug}`
  );
  return pages.map((p) => p.slug.current);
}

// =============================================================================
// Synagogue Queries
// =============================================================================

const synagogueFields = /* groq */ `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  name,
  slug,
  meaningOfName,
  yearEstablished,
  mainImage,
  gallery,
  description,
  history,
  address,
  serviceTimes,
  features,
  contactEmail,
  contactPhone,
  seo
`;

/**
 * Get a single synagogue by slug
 */
export async function getSynagogueBySlug(slug: string): Promise<Synagogue | null> {
  return client.fetch(
    /* groq */ `*[_type == "synagogue" && slug.current == $slug][0]{${synagogueFields}}`,
    { slug }
  );
}

/**
 * Get all synagogues
 */
export async function getAllSynagogues(): Promise<Synagogue[]> {
  return client.fetch(
    /* groq */ `*[_type == "synagogue"] | order(yearEstablished asc){${synagogueFields}}`
  );
}

/**
 * Get synagogue slugs for static generation
 */
export async function getSynagogueSlugs(): Promise<string[]> {
  const synagogues = await client.fetch<{ slug: { current: string } }[]>(
    /* groq */ `*[_type == "synagogue" && defined(slug.current)]{slug}`
  );
  return synagogues.map((s) => s.slug.current);
}

// =============================================================================
// Person Queries
// =============================================================================

const personFields = /* groq */ `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  name,
  slug,
  role,
  category,
  photo,
  bio,
  email,
  phone,
  order
`;

/**
 * Get a single person by slug
 */
export async function getPersonBySlug(slug: string): Promise<Person | null> {
  return client.fetch(
    /* groq */ `*[_type == "person" && slug.current == $slug][0]{${personFields}}`,
    { slug }
  );
}

/**
 * Get all people, optionally filtered by category
 */
export async function getAllPeople(category?: Person["category"]): Promise<Person[]> {
  if (category) {
    return client.fetch(
      /* groq */ `*[_type == "person" && category == $category] | order(order asc, name asc){${personFields}}`,
      { category }
    );
  }
  return client.fetch(
    /* groq */ `*[_type == "person"] | order(order asc, name asc){${personFields}}`
  );
}

/**
 * Get person slugs for static generation
 */
export async function getPersonSlugs(): Promise<string[]> {
  const people = await client.fetch<{ slug: { current: string } }[]>(
    /* groq */ `*[_type == "person" && defined(slug.current)]{slug}`
  );
  return people.map((p) => p.slug.current);
}

// =============================================================================
// Education Program Queries
// =============================================================================

const educationProgramFields = /* groq */ `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  name,
  slug,
  type,
  ageRange,
  mainImage,
  description,
  schedule,
  contactName,
  contactEmail,
  contactPhone,
  registrationLink,
  seo
`;

/**
 * Get a single education program by slug
 */
export async function getEducationProgramBySlug(slug: string): Promise<EducationProgram | null> {
  return client.fetch(
    /* groq */ `*[_type == "educationProgram" && slug.current == $slug][0]{${educationProgramFields}}`,
    { slug }
  );
}

/**
 * Get all education programs, optionally filtered by type
 */
export async function getAllEducationPrograms(
  type?: EducationProgram["type"]
): Promise<EducationProgram[]> {
  if (type) {
    return client.fetch(
      /* groq */ `*[_type == "educationProgram" && type == $type] | order(name.en asc){${educationProgramFields}}`,
      { type }
    );
  }
  return client.fetch(
    /* groq */ `*[_type == "educationProgram"] | order(name.en asc){${educationProgramFields}}`
  );
}

/**
 * Get education program slugs for static generation
 */
export async function getEducationProgramSlugs(): Promise<string[]> {
  const programs = await client.fetch<{ slug: { current: string } }[]>(
    /* groq */ `*[_type == "educationProgram" && defined(slug.current)]{slug}`
  );
  return programs.map((p) => p.slug.current);
}

// =============================================================================
// Settings Queries
// =============================================================================

const settingsFields = /* groq */ `
  _id,
  _type,
  siteTitle,
  siteDescription,
  contactInfo,
  socialMedia,
  shabbatTimes,
  footerText,
  defaultOgImage
`;

/**
 * Get site settings (singleton)
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(
    /* groq */ `*[_type == "settings"][0]{${settingsFields}}`
  );
}
