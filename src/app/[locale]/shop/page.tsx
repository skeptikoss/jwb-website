import { Metadata } from "next";
import { Suspense } from "react";
import { getLocale, getTranslations } from "next-intl/server";

import { Header, Footer } from "@/components/layout";
import { ProductGrid, ProductFilters, ProductSearch } from "@/components/shop";
import { getAllProducts, getAllCategories } from "@/lib/sanity";

// Revalidate every hour for ISR
export const revalidate = 3600;

/**
 * Generate metadata for the Shop page
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.shop");

  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
    },
  };
}

interface ShopPageProps {
  searchParams: Promise<{ category?: string; search?: string }>;
}

/**
 * Shop listing page
 *
 * Features:
 * - Hero section with navy background
 * - Search bar for product filtering
 * - Category filter pills
 * - Responsive product grid
 */
export default async function ShopPage({ searchParams }: ShopPageProps) {
  await getLocale(); // Required for next-intl
  const t = await getTranslations("pages.shop");
  const params = await searchParams;

  // Fetch categories and products
  const [categories, allProducts] = await Promise.all([
    getAllCategories(),
    getAllProducts(params.category || undefined),
  ]);

  // Client-side search filtering happens in component, but we can do server filtering for category
  let products = allProducts;

  // Filter by search query if present (basic server-side filtering)
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    products = allProducts.filter((product) => {
      const nameEn = product.name.en?.toLowerCase() || "";
      const nameHe = product.name.he?.toLowerCase() || "";
      const sku = product.sku?.toLowerCase() || "";
      return (
        nameEn.includes(searchLower) ||
        nameHe.includes(searchLower) ||
        sku.includes(searchLower)
      );
    });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-navy py-12 text-cream lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 max-w-2xl font-body text-lg text-cream/80">
              {t("subtitle")}
            </p>

            {/* Search Bar */}
            <div className="mt-8 max-w-md">
              <Suspense fallback={null}>
                <ProductSearch />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="bg-cream py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Filters */}
            <div className="mb-8">
              <Suspense fallback={null}>
                <ProductFilters categories={categories} />
              </Suspense>
            </div>

            {/* Results count */}
            <p className="mb-6 font-ui text-sm text-warm-gray">
              {t("showingProducts", { count: products.length })}
            </p>

            {/* Product Grid */}
            <ProductGrid products={products} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
