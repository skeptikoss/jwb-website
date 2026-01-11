import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

import { Header, Footer } from "@/components/layout";
import { PortableTextRenderer } from "@/components/sanity";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

import { AddToCartButton, PriceDisplay, KashrutBadge } from "@/components/shop";
import {
  getProductBySlug,
  getProductSlugs,
  getLocalizedValue,
  type Locale,
} from "@/lib/sanity";
import { urlFor } from "@/sanity/lib/image";

// Revalidate every hour for ISR
export const revalidate = 3600;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all product pages
 */
export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Generate metadata for product page
 */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const title = product.name.en || "Product";
  const description = product.seo?.metaDescription?.en || "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.images?.[0]
        ? [urlFor(product.images[0])?.width(1200).height(630).url() || ""]
        : [],
    },
  };
}

/**
 * Product detail page
 *
 * Features:
 * - Large product image
 * - Price display
 * - Kashrut badge
 * - Add to cart with quantity selector
 * - Rich text description
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.shop.product");

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const name = getLocalizedValue(product.name, locale) || "Product";
  const hasDescription = product.description?.en || product.description?.he;
  const categoryName = product.category
    ? getLocalizedValue(product.category.name, locale)
    : null;

  // Get the first image
  const mainImage = product.images?.[0];
  const imageUrl = mainImage
    ? urlFor(mainImage)?.width(800).height(800).url()
    : null;
  const imageAlt = mainImage?.alt
    ? getLocalizedValue(mainImage.alt, locale) || name
    : name;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Back link */}
          <Button
            asChild
            variant="ghost"
            className="mb-6 text-charcoal hover:text-navy"
          >
            <Link href="/shop">
              <ArrowLeft className="me-2 h-4 w-4" />
              {t("backToShop")}
            </Link>
          </Button>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-white shadow-sm">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-warm-gray">
                  No Image Available
                </div>
              )}

              {/* Out of stock overlay */}
              {product.inStock === false && (
                <div className="absolute inset-0 flex items-center justify-center bg-charcoal/50">
                  <span className="rounded-lg bg-white px-6 py-3 font-heading text-lg font-semibold text-charcoal">
                    {t("outOfStock")}
                  </span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              {/* Category */}
              {categoryName && (
                <Link
                  href={`/shop?category=${product.category?.slug.current}`}
                  className="font-ui text-sm text-warm-gray hover:text-navy"
                >
                  {categoryName}
                </Link>
              )}

              {/* Name */}
              <h1 className="mt-2 font-heading text-3xl font-bold text-charcoal lg:text-4xl">
                {name}
              </h1>

              {/* Kashrut Badge */}
              {product.kashrut && (
                <div className="mt-4">
                  <KashrutBadge certification={product.kashrut} />
                </div>
              )}

              {/* Price */}
              <div className="mt-6">
                <PriceDisplay price={product.price} size="lg" />
              </div>

              {/* Stock Status */}
              <p
                className={`mt-2 font-ui text-sm ${
                  product.inStock === false ? "text-terracotta" : "text-sage"
                }`}
              >
                {product.inStock === false ? t("outOfStock") : t("inStock")}
              </p>

              {/* Add to Cart */}
              <div className="mt-8">
                <AddToCartButton product={product} size="lg" showQuantity />
              </div>

              {/* SKU */}
              {product.sku && (
                <p className="mt-6 font-ui text-xs text-warm-gray">
                  {t("sku")}: {product.sku}
                </p>
              )}

              {/* Description */}
              {hasDescription && (
                <div className="mt-8 border-t border-border pt-8">
                  <h2 className="mb-4 font-heading text-xl font-semibold text-charcoal">
                    {t("description")}
                  </h2>
                  <div className="prose prose-sm max-w-none text-charcoal">
                    <PortableTextRenderer content={product.description} locale={locale} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
