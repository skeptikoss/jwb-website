"use client";

import { useTranslations } from "next-intl";
import { Truck } from "lucide-react";
import { useCartStore, FREE_SHIPPING_THRESHOLD, SHIPPING_RATE } from "@/store/cart-store";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface CartSummaryProps {
  className?: string;
}

/**
 * Cart summary component showing subtotal, shipping, and total
 *
 * Shipping policy:
 * - Flat rate: $8 SGD for orders under $80
 * - Free shipping: Orders $80+ SGD
 */
export function CartSummary({ className }: CartSummaryProps) {
  const t = useTranslations("pages.shop.cart");
  const { getSubtotal, getShipping, getTotal, items } = useCartStore();

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const total = getTotal();

  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;
  const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-cream/50 p-6",
        className
      )}
    >
      {/* Free shipping progress */}
      {!qualifiesForFreeShipping && subtotal > 0 && (
        <div className="mb-4 rounded-md bg-sky/10 p-3">
          <div className="flex items-center gap-2 text-sm text-sky">
            <Truck className="h-4 w-4" />
            <span>
              Add ${amountToFreeShipping.toFixed(2)} more for free shipping!
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-sky/20">
            <div
              className="h-full bg-sky transition-all duration-300"
              style={{
                width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Summary lines */}
      <div className="space-y-3">
        <div className="flex items-center justify-between font-ui text-sm">
          <span className="text-charcoal">{t("subtotal")}</span>
          <span className="font-medium text-charcoal">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between font-ui text-sm">
          <span className="text-charcoal">{t("shipping")}</span>
          {shipping === 0 ? (
            <span className="font-medium text-sage">{t("freeShipping")}</span>
          ) : (
            <span className="font-medium text-charcoal">
              ${shipping.toFixed(2)}
            </span>
          )}
        </div>

        {/* Shipping note */}
        <p className="font-ui text-xs text-warm-gray">
          {t("shippingNote", { threshold: FREE_SHIPPING_THRESHOLD, rate: SHIPPING_RATE })}
        </p>

        <Separator />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="font-heading text-lg font-semibold text-charcoal">
            {t("total")}
          </span>
          <span className="font-heading text-xl font-bold text-navy">
            ${total.toFixed(2)} SGD
          </span>
        </div>
      </div>
    </div>
  );
}
