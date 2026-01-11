"use client";

import { useState } from "react";
import { ShoppingCart, Plus, Minus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/lib/sanity/types";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  size?: "sm" | "md" | "lg";
  showQuantity?: boolean;
}

/**
 * Add to cart button with optional quantity selector
 * Shows feedback when item is added
 */
export function AddToCartButton({
  product,
  className,
  size = "md",
  showQuantity = false,
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!product.inStock) return;

    addItem(product, quantity);
    setShowSuccess(true);
    setQuantity(1);

    // Reset success state after 2 seconds
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const sizeClasses = {
    sm: "h-8 text-xs px-3",
    md: "h-10 text-sm px-4",
    lg: "h-12 text-base px-6",
  };

  const isOutOfStock = product.inStock === false;

  if (isOutOfStock) {
    return (
      <Button
        disabled
        variant="outline"
        className={cn(
          "cursor-not-allowed border-warm-gray text-warm-gray",
          sizeClasses[size],
          className
        )}
      >
        Out of Stock
      </Button>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showQuantity && (
        <div className="flex items-center rounded-md border border-border">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center font-ui text-sm">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      )}

      <Button
        onClick={handleAddToCart}
        className={cn(
          "bg-navy text-cream hover:bg-navy/90",
          sizeClasses[size],
          showSuccess && "bg-sage hover:bg-sage/90"
        )}
      >
        {showSuccess ? (
          <>
            <Check className="me-2 h-4 w-4" />
            Added
          </>
        ) : (
          <>
            <ShoppingCart className="me-2 h-4 w-4" />
            Add to Cart
          </>
        )}
      </Button>
    </div>
  );
}
