"use client";

import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  showCurrency?: boolean;
}

/**
 * Price display component for the JWB Singapore shop
 * Formats prices in SGD with proper currency display
 */
export function PriceDisplay({
  price,
  className,
  size = "md",
  showCurrency = true,
}: PriceDisplayProps) {
  const formattedPrice = price.toFixed(2);

  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  return (
    <span
      className={cn(
        "font-ui font-semibold text-charcoal",
        sizeClasses[size],
        className
      )}
    >
      {showCurrency && <span className="text-warm-gray">$</span>}
      {formattedPrice}
      {showCurrency && <span className="ms-0.5 text-xs text-warm-gray">SGD</span>}
    </span>
  );
}
