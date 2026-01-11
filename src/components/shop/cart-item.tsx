"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { getLocalizedValue, type CartItem as CartItemType, type Locale } from "@/lib/sanity/types";
import { PriceDisplay } from "./price-display";

interface CartItemProps {
  item: CartItemType;
  className?: string;
  compact?: boolean;
}

/**
 * Cart line item component
 * Used in both cart drawer and full cart page
 */
export function CartItem({ item, className, compact = false }: CartItemProps) {
  const locale = useLocale() as Locale;
  const { updateQuantity, removeItem } = useCartStore();

  const { product, quantity } = item;
  const name = getLocalizedValue(product.name, locale) || "Untitled Product";

  // Get the first image
  const image = product.images?.[0];
  const imageUrl = image
    ? urlFor(image)?.width(100).height(100).url()
    : null;

  const lineTotal = product.price * quantity;

  const handleIncrement = () => {
    updateQuantity(product._id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product._id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeItem(product._id);
  };

  if (compact) {
    // Compact version for cart drawer
    return (
      <div
        className={cn(
          "flex items-center gap-3 border-b border-border py-3 last:border-b-0",
          className
        )}
      >
        {/* Image */}
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-cream">
          {imageUrl ? (
            <Image src={imageUrl} alt={name} fill className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-warm-gray">
              No Image
            </div>
          )}
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1">
          <h4 className="truncate font-ui text-sm font-medium text-charcoal">
            {name}
          </h4>
          <div className="mt-1 flex items-center justify-between">
            <span className="font-ui text-xs text-warm-gray">
              Qty: {quantity}
            </span>
            <PriceDisplay price={lineTotal} size="sm" />
          </div>
        </div>

        {/* Remove button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-warm-gray hover:text-terracotta"
          onClick={handleRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  // Full version for cart page
  return (
    <div
      className={cn(
        "flex items-center gap-4 border-b border-border py-4 last:border-b-0",
        className
      )}
    >
      {/* Image */}
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-cream">
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-warm-gray">
            No Image
          </div>
        )}
      </div>

      {/* Details */}
      <div className="min-w-0 flex-1">
        <h4 className="font-heading text-lg font-semibold text-charcoal">
          {name}
        </h4>
        <p className="font-ui text-sm text-warm-gray">
          ${product.price.toFixed(2)} each
        </p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handleDecrement}
          disabled={quantity <= 1}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-8 text-center font-ui text-sm font-medium">
          {quantity}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handleIncrement}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      {/* Line total */}
      <div className="w-24 text-end">
        <PriceDisplay price={lineTotal} />
      </div>

      {/* Remove button */}
      <Button
        variant="ghost"
        size="icon"
        className="text-warm-gray hover:text-terracotta"
        onClick={handleRemove}
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
