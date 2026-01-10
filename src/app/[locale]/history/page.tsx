import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { Header, Footer } from "@/components/layout";
import { PortableTextRenderer, SanityImage } from "@/components/sanity";
import { getPageBySlug, type Locale, getLocalizedValue } from "@/lib/sanity";

/**
 * Generate metadata for the History page
 */
export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const page = await getPageBySlug("history");
  const t = await getTranslations("pages.history");

  if (!page) {
    return { title: t("title") };
  }

  const title = getLocalizedValue(page.title, locale) || t("title");
  const description =
    getLocalizedValue(page.excerpt, locale) ||
    getLocalizedValue(page.seo?.metaDescription, locale);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

/**
 * History page - Our Community's Story
 *
 * This is a template pattern for generic content pages that fetch from Sanity.
 * The same pattern can be used for About, Contact, Travel, etc.
 */
export default async function HistoryPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.history");

  // Fetch page content from Sanity
  const page = await getPageBySlug("history");

  // If no content exists in Sanity, show a placeholder
  if (!page) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero Section - Static fallback */}
          <section className="bg-navy py-16 text-cream">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="font-heading text-4xl font-bold sm:text-5xl">
                {t("title")}
              </h1>
              <p className="mt-4 max-w-2xl font-body text-lg text-cream/80">
                {t("subtitle")}
              </p>
            </div>
          </section>

          {/* Placeholder Content */}
          <section className="bg-cream py-16">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <div className="rounded-lg border border-warm-gray/30 bg-white p-8 text-center shadow-sm">
                <p className="font-body text-warm-gray">
                  {t("noContent")}
                </p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Get localized content
  const title = getLocalizedValue(page.title, locale) || t("title");
  const excerpt = getLocalizedValue(page.excerpt, locale);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-navy py-16 text-cream lg:py-24">
          {/* Optional: Hero image as background */}
          {page.mainImage && (
            <div className="absolute inset-0 opacity-20">
              <SanityImage
                image={page.mainImage}
                locale={locale}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              {title}
            </h1>
            {excerpt && (
              <p className="mt-4 max-w-2xl font-body text-lg text-cream/80">
                {excerpt}
              </p>
            )}
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-cream py-12 lg:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            {/* Main Image (if not used in hero) */}
            {page.mainImage && (
              <figure className="mb-10 overflow-hidden rounded-lg shadow-md">
                <SanityImage
                  image={page.mainImage}
                  locale={locale}
                  width={800}
                  height={450}
                  className="h-auto w-full"
                />
                {page.mainImage.alt && (
                  <figcaption className="bg-white px-4 py-2 text-center font-ui text-sm text-warm-gray">
                    {getLocalizedValue(page.mainImage.alt, locale)}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Portable Text Content */}
            <article className="prose-jwb">
              <PortableTextRenderer content={page.content} locale={locale} />
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
