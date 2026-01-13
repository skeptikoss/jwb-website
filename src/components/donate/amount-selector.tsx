"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Preset donation amounts (multiples of 18 - chai)
const PRESET_AMOUNTS = [18, 36, 72, 180, 360];

interface AmountSelectorProps {
  selectedAmount: number | null;
  customAmount: string;
  onSelectAmount: (amount: number | null) => void;
  onCustomAmountChange: (value: string) => void;
  error?: string;
}

/**
 * Donation amount selector with preset buttons and custom input
 *
 * Features chai (חי = 18) symbolism for Jewish giving tradition.
 */
export function AmountSelector({
  selectedAmount,
  customAmount,
  onSelectAmount,
  onCustomAmountChange,
  error,
}: AmountSelectorProps) {
  const t = useTranslations("pages.donate");

  const isCustomSelected = selectedAmount === null && customAmount !== "";
  const isPresetSelected = (amount: number) =>
    selectedAmount === amount && customAmount === "";

  const handlePresetClick = (amount: number) => {
    onSelectAmount(amount);
    onCustomAmountChange("");
  };

  const handleCustomFocus = () => {
    onSelectAmount(null);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      onCustomAmountChange(value);
      onSelectAmount(null);
    }
  };

  // Get chai label based on amount
  const getChaiLabel = (amount: number) => {
    if (amount === 18) return t("chai");
    if (amount === 36) return t("doubleChai");
    return null;
  };

  return (
    <div className="space-y-4">
      <Label className="font-ui text-sm font-medium text-charcoal">
        {t("amountLabel")}
      </Label>

      {/* Preset amount grid */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {PRESET_AMOUNTS.map((amount) => {
          const chaiLabel = getChaiLabel(amount);
          const isSelected = isPresetSelected(amount);

          return (
            <button
              key={amount}
              type="button"
              onClick={() => handlePresetClick(amount)}
              className={cn(
                "relative flex flex-col items-center justify-center rounded-lg border-2 px-4 py-3 font-ui transition-all",
                isSelected
                  ? "border-gold bg-gold/10 text-charcoal"
                  : "border-warm-gray/30 bg-white text-charcoal hover:border-gold/50"
              )}
            >
              <span className="text-lg font-semibold">${amount}</span>
              {chaiLabel && (
                <span className="text-xs text-warm-gray">{chaiLabel}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Custom amount input */}
      <div className="space-y-2">
        <Label
          htmlFor="custom-amount"
          className="font-ui text-sm text-charcoal"
        >
          {t("customAmount")}
        </Label>
        <div className="relative">
          <span className="absolute start-3 top-1/2 -translate-y-1/2 font-ui text-warm-gray">
            $
          </span>
          <Input
            id="custom-amount"
            type="text"
            inputMode="decimal"
            value={customAmount}
            onChange={handleCustomChange}
            onFocus={handleCustomFocus}
            placeholder={t("customPlaceholder")}
            className={cn(
              "ps-7 font-ui",
              isCustomSelected && "border-gold ring-1 ring-gold",
              error && "border-[#b94a48]"
            )}
            aria-invalid={!!error}
            aria-describedby={error ? "amount-error" : undefined}
          />
        </div>
        {error && (
          <p id="amount-error" className="font-ui text-xs text-[#b94a48]">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
