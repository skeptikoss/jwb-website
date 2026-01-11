"use client";

import { cn } from "@/lib/utils";
import type { Product } from "@/lib/sanity/types";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: Product[];
  className?: string;
}

/**
 * Responsive product grid component
 * 1 column on mobile, 2 on tablet, 3-4 on desktop
 */
export function ProductGrid({ products, className }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="font-body text-warm-gray">No products found.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
