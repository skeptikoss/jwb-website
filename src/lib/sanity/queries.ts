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
  ProductCategory,
  Product,
  Event,
  EventType,
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
// Product Category Queries
// =============================================================================

const productCategoryFields = /* groq */ `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  name,
  slug,
  description,
  image,
  order
`;

/**
 * Get all product categories, ordered by display order
 */
export async function getAllCategories(): Promise<ProductCategory[]> {
  return client.fetch(
    /* groq */ `*[_type == "productCategory"] | order(order asc){${productCategoryFields}}`
  );
}

/**
 * Get a single category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<ProductCategory | null> {
  return client.fetch(
    /* groq */ `*[_type == "productCategory" && slug.current == $slug][0]{${productCategoryFields}}`,
    { slug }
  );
}

// =============================================================================
// Product Queries
// =============================================================================

const productFields = /* groq */ `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  name,
  slug,
  description,
  price,
  category->{
    _id,
    name,
    slug
  },
  kashrut,
  images,
  sku,
  inStock,
  featured,
  seo
`;

/**
 * Get all products, optionally filtered by category slug
 */
export async function getAllProducts(categorySlug?: string): Promise<Product[]> {
  if (categorySlug) {
    return client.fetch(
      /* groq */ `*[_type == "product" && category->slug.current == $categorySlug] | order(name.en asc){${productFields}}`,
      { categorySlug }
    );
  }
  return client.fetch(
    /* groq */ `*[_type == "product"] | order(name.en asc){${productFields}}`
  );
}

/**
 * Get featured products
 */
export async function getFeaturedProducts(limit: number = 8): Promise<Product[]> {
  return client.fetch(
    /* groq */ `*[_type == "product" && featured == true] | order(name.en asc)[0...$limit]{${productFields}}`,
    { limit }
  );
}

/**
 * Get a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  return client.fetch(
    /* groq */ `*[_type == "product" && slug.current == $slug][0]{${productFields}}`,
    { slug }
  );
}

/**
 * Get product slugs for static generation
 */
export async function getProductSlugs(): Promise<string[]> {
  const products = await client.fetch<{ slug: { current: string } }[]>(
    /* groq */ `*[_type == "product" && defined(slug.current)]{slug}`
  );
  return products.map((p) => p.slug.current);
}

/**
 * Search products by name (for search functionality)
 * Searches in both English and Hebrew names
 */
export async function searchProducts(query: string): Promise<Product[]> {
  if (!query || query.length < 2) return [];

  return client.fetch(
    /* groq */ `*[_type == "product" && (
      name.en match $searchQuery ||
      name.he match $searchQuery ||
      sku match $searchQuery
    )] | order(name.en asc){${productFields}}`,
    { searchQuery: `*${query}*` }
  );
}

// =============================================================================
// Event Queries
// =============================================================================

const eventFields = /* groq */ `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  name,
  slug,
  eventType,
  description,
  date,
  endDate,
  isRecurring,
  recurringSchedule,
  location,
  price,
  priceNote,
  mainImage,
  registrationLink,
  organizer,
  capacity,
  seo
`;

/**
 * Get all upcoming events, optionally filtered by type
 * Returns events where date >= now, ordered by date ascending
 */
export async function getAllEvents(eventType?: EventType): Promise<Event[]> {
  const now = new Date().toISOString();

  if (eventType) {
    return client.fetch(
      /* groq */ `*[_type == "event" && eventType == $eventType && date >= $now] | order(date asc){${eventFields}}`,
      { eventType, now }
    );
  }
  return client.fetch(
    /* groq */ `*[_type == "event" && date >= $now] | order(date asc){${eventFields}}`,
    { now }
  );
}

/**
 * Get all events (including past) for admin/archive purposes
 */
export async function getAllEventsIncludingPast(eventType?: EventType): Promise<Event[]> {
  if (eventType) {
    return client.fetch(
      /* groq */ `*[_type == "event" && eventType == $eventType] | order(date desc){${eventFields}}`,
      { eventType }
    );
  }
  return client.fetch(
    /* groq */ `*[_type == "event"] | order(date desc){${eventFields}}`
  );
}

/**
 * Get a single event by slug
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  return client.fetch(
    /* groq */ `*[_type == "event" && slug.current == $slug][0]{${eventFields}}`,
    { slug }
  );
}

/**
 * Get event slugs for static generation
 */
export async function getEventSlugs(): Promise<string[]> {
  const events = await client.fetch<{ slug: { current: string } }[]>(
    /* groq */ `*[_type == "event" && defined(slug.current)]{slug}`
  );
  return events.map((e) => e.slug.current);
}

/**
 * Get featured/upcoming events (limited, for homepage)
 */
export async function getUpcomingEvents(limit: number = 4): Promise<Event[]> {
  const now = new Date().toISOString();
  return client.fetch(
    /* groq */ `*[_type == "event" && date >= $now] | order(date asc)[0...$limit]{${eventFields}}`,
    { now, limit }
  );
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
