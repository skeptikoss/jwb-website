"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";

interface CheckoutFormProps {
  className?: string;
}

/**
 * Mock checkout form component
 *
 * This is a demonstration form that looks like a real Stripe checkout
 * but does not process actual payments. For portfolio purposes.
 */
export function CheckoutForm({ className }: CheckoutFormProps) {
  const t = useTranslations("pages.shop.checkout");
  const router = useRouter();
  const { clearCart } = useCartStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Clear cart and redirect to success page
    clearCart();
    router.push("/shop/checkout/success");
  };

  const isFormValid =
    formData.email &&
    formData.firstName &&
    formData.lastName &&
    formData.address &&
    formData.city &&
    formData.postalCode;

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="font-heading text-lg font-semibold text-charcoal">
          {t("contactInfo")}
        </h3>

        <div className="space-y-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="font-ui"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{t("phone")} ({t("optional")})</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+65 9123 4567"
            className="font-ui"
          />
        </div>
      </div>

      <Separator />

      {/* Shipping Address */}
      <div className="space-y-4">
        <h3 className="font-heading text-lg font-semibold text-charcoal">
          {t("shippingAddress")}
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">{t("firstName")}</Label>
            <Input
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="font-ui"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">{t("lastName")}</Label>
            <Input
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="font-ui"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">{t("address")}</Label>
          <Input
            id="address"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Orchard Road #12-34"
            className="font-ui"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="city">{t("city")}</Label>
            <Input
              id="city"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              placeholder="Singapore"
              className="font-ui"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="postalCode">{t("postalCode")}</Label>
            <Input
              id="postalCode"
              name="postalCode"
              required
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="123456"
              className="font-ui"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Payment Section (Mock) */}
      <div className="space-y-4">
        <h3 className="font-heading text-lg font-semibold text-charcoal">
          {t("payment")}
        </h3>

        <div className="rounded-lg border border-border bg-cream/50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/10">
              <CreditCard className="h-5 w-5 text-navy" />
            </div>
            <div>
              <p className="font-ui text-sm font-medium text-charcoal">
                {t("paymentComingSoon")}
              </p>
              <p className="font-ui text-xs text-warm-gray">
                {t("paymentDescription")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className="w-full bg-navy py-6 text-cream hover:bg-navy/90"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream border-t-transparent" />
            {t("processing")}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            {t("completeOrder")}
          </span>
        )}
      </Button>

      <p className="text-center font-ui text-xs text-warm-gray">
        {t("secureCheckout")}
      </p>
    </form>
  );
}
