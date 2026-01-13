"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Loader2, Lock, Heart, Building2, GraduationCap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { AmountSelector } from "./amount-selector";
import { cn } from "@/lib/utils";
import type { DonationFrequency } from "@/lib/stripe/types";

interface DonationFormProps {
  className?: string;
}

/**
 * Donation form with amount selection, frequency toggle, and Stripe checkout
 *
 * Supports one-time and monthly recurring donations.
 * Redirects to Stripe Checkout for secure payment processing.
 */
export function DonationForm({ className }: DonationFormProps) {
  const t = useTranslations("pages.donate");
  const locale = useLocale();

  const [selectedAmount, setSelectedAmount] = useState<number | null>(36);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<DonationFrequency>("once");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [amountError, setAmountError] = useState<string | null>(null);

  // Get the final donation amount
  const getFinalAmount = (): number | null => {
    if (selectedAmount !== null) return selectedAmount;
    if (customAmount !== "") {
      const parsed = parseFloat(customAmount);
      return isNaN(parsed) ? null : parsed;
    }
    return null;
  };

  // Validate the donation amount
  const validateAmount = (): boolean => {
    const amount = getFinalAmount();

    if (amount === null || amount === 0) {
      setAmountError(t("validation.required"));
      return false;
    }
    if (amount < 1) {
      setAmountError(t("validation.minimum"));
      return false;
    }
    if (amount > 100000) {
      setAmountError(t("validation.maximum"));
      return false;
    }

    setAmountError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateAmount()) {
      return;
    }

    const amount = getFinalAmount();
    if (!amount) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/donate/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          frequency,
          locale,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create checkout session");
      }

      const { url } = await response.json();

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err) {
      console.error("Donation error:", err);
      setError(
        err instanceof Error && err.message.includes("network")
          ? t("error.network")
          : t("error.generic")
      );
      setIsSubmitting(false);
    }
  };

  const impactItems = [
    { icon: Building2, key: "synagogues" },
    { icon: Users, key: "programs" },
    { icon: GraduationCap, key: "education" },
    { icon: Heart, key: "welfare" },
  ];

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-8", className)}>
      {/* Amount Selection */}
      <AmountSelector
        selectedAmount={selectedAmount}
        customAmount={customAmount}
        onSelectAmount={setSelectedAmount}
        onCustomAmountChange={setCustomAmount}
        error={amountError || undefined}
      />

      {/* Frequency Selection */}
      <div className="space-y-3">
        <Label className="font-ui text-sm font-medium text-charcoal">
          {t("frequencyLabel")}
        </Label>
        <RadioGroup
          value={frequency}
          onValueChange={(value) => setFrequency(value as DonationFrequency)}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="once" id="once" />
            <Label htmlFor="once" className="cursor-pointer font-ui">
              {t("oneTime")}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="monthly" id="monthly" />
            <Label htmlFor="monthly" className="cursor-pointer font-ui">
              {t("monthly")}
            </Label>
          </div>
        </RadioGroup>
        {frequency === "monthly" && (
          <p className="font-ui text-xs text-warm-gray">{t("monthlyNote")}</p>
        )}
      </div>

      {/* Impact Section */}
      <Card className="border-t-[3px] border-t-gold bg-cream/50">
        <CardContent className="pt-4">
          <h3 className="font-heading text-lg font-semibold text-navy">
            {t("impact.title")}
          </h3>
          <ul className="mt-3 space-y-2">
            {impactItems.map(({ icon: Icon, key }) => (
              <li
                key={key}
                className="flex items-center gap-2 font-body text-sm text-charcoal"
              >
                <Icon className="h-4 w-4 text-gold" />
                {t(`impact.${key}`)}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <div className="rounded-lg border border-[#b94a48]/30 bg-[#b94a48]/10 p-3">
          <p className="font-ui text-sm text-[#b94a48]">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="space-y-3">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-navy py-6 text-lg text-cream hover:bg-navy/90"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              {t("processing")}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              {t("submit")}
            </span>
          )}
        </Button>

        {/* Security & Tax Note */}
        <div className="space-y-1 text-center">
          <p className="flex items-center justify-center gap-1 font-ui text-xs text-warm-gray">
            <Lock className="h-3 w-3" />
            {t("securePayment")}
          </p>
          <p className="font-ui text-xs text-warm-gray">{t("taxNote")}</p>
        </div>
      </div>
    </form>
  );
}
