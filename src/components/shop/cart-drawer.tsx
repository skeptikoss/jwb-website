"use client";

import { useTranslations } from "next-intl";
import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { CartItem } from "./cart-item";
import { CheckoutButton } from "./checkout-button";

interface CartDrawerProps {
  children?: React.ReactNode;
}

/**
 * Cart drawer component (slide-out from right)
 * Shows cart items, summary, and checkout button
 */
export function CartDrawer({ children }: CartDrawerProps) {
  const t = useTranslations("pages.shop.cart");
  const { items, getItemCount, getSubtotal, getShipping, getTotal, clearCart } =
    useCartStore();

  const itemCount = getItemCount();
  const subtotal = getSubtotal();
  const shipping = getShipping();
  const total = getTotal();

  // Default trigger if none provided
  const trigger = children || (
    <Button
      variant="ghost"
      size="icon"
      className="relative text-charcoal hover:text-navy"
      aria-label="Shopping cart"
    >
      <ShoppingCart className="h-5 w-5" />
      <Badge
        variant="default"
        className="absolute -end-1 -top-1 h-5 w-5 rounded-full bg-gold p-0 text-xs text-charcoal"
      >
        {itemCount}
      </Badge>
    </Button>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col sm:w-[400px]">
        <SheetHeader className="space-y-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-heading text-xl">
              {t("title")} ({itemCount})
            </SheetTitle>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          // Empty cart
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="h-16 w-16 text-warm-gray" />
            <p className="font-body text-charcoal">{t("empty")}</p>
            <SheetClose asChild>
              <Button variant="outline">{t("continueShopping")}</Button>
            </SheetClose>
          </div>
        ) : (
          <>
            {/* Cart items */}
            <div className="flex-1 overflow-y-auto py-4">
              {items.map((item) => (
                <CartItem key={item.product._id} item={item} compact />
              ))}
            </div>

            {/* Summary and checkout */}
            <div className="border-t border-border pt-4">
              {/* Summary */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between font-ui text-sm">
                  <span className="text-charcoal">{t("subtotal")}</span>
                  <span className="font-medium text-charcoal">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between font-ui text-sm">
                  <span className="text-charcoal">{t("shipping")}</span>
                  {shipping === 0 ? (
                    <span className="font-medium text-sage">
                      {t("freeShipping")}
                    </span>
                  ) : (
                    <span className="font-medium text-charcoal">
                      ${shipping.toFixed(2)}
                    </span>
                  )}
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-heading text-lg font-semibold text-charcoal">
                    {t("total")}
                  </span>
                  <span className="font-heading text-xl font-bold text-navy">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <SheetClose asChild>
                  <CheckoutButton className="w-full" />
                </SheetClose>
                <div className="flex gap-2">
                  <SheetClose asChild>
                    <Button variant="outline" className="flex-1">
                      {t("continueShopping")}
                    </Button>
                  </SheetClose>
                  <Button
                    variant="ghost"
                    className="text-warm-gray hover:text-terracotta"
                    onClick={clearCart}
                  >
                    {t("clearCart")}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
