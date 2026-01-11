"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import { getLocalizedValue, type Product, type Locale } from "@/lib/sanity/types";
import { PriceDisplay } from "./price-display";
import { KashrutBadge } from "./kashrut-badge";
import { AddToCartButton } from "./add-to-cart-button";

interface ProductCardProps {
  product: Product;
  className?: string;
}

/**
 * Product card component for the shop grid
 *
 * Design: Clean e-commerce style with minimal border, subtle shadow
 * NOT the gold-border style used elsewhere in the site
 */
export function ProductCard({ product, className }: ProductCardProps) {
  const locale = useLocale() as Locale;
  const name = getLocalizedValue(product.name, locale) || "Untitled Product";

  // Get the first image
  const image = product.images?.[0];
  const imageUrl = image
    ? urlFor(image)?.width(400).height(400).url()
    : null;
  const imageAlt = image?.alt
    ? getLocalizedValue(image.alt, locale) || name
    : name;

  const isOutOfStock = product.inStock === false;

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg border border-border/60 bg-white shadow-sm transition-shadow hover:shadow-md",
        isOutOfStock && "opacity-75",
        className
      )}
    >
      {/* Product Image */}
      <Link
        href={`/shop/${product.slug.current}`}
        className="relative aspect-square overflow-hidden bg-cream"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-warm-gray">
            No Image
          </div>
        )}

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal/50">
            <span className="rounded bg-white px-3 py-1 font-ui text-sm font-medium text-charcoal">
              Out of Stock
            </span>
          </div>
        )}

        {/* Kashrut badge */}
        {product.kashrut && (
          <div className="absolute end-2 top-2">
            <KashrutBadge certification={product.kashrut} />
          </div>
        )}
      </Link>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category */}
        {product.category && (
          <span className="mb-1 font-ui text-xs text-warm-gray">
            {getLocalizedValue(product.category.name, locale)}
          </span>
        )}

        {/* Product Name */}
        <Link href={`/shop/${product.slug.current}`}>
          <h3 className="mb-2 line-clamp-2 font-heading text-base font-semibold text-charcoal transition-colors hover:text-navy">
            {name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-auto">
          <PriceDisplay price={product.price} className="mb-3" />

          {/* Add to Cart */}
          <AddToCartButton product={product} size="sm" className="w-full" />
        </div>
      </div>
    </article>
  );
}
