"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle, Loader2, User, Mail, Phone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface EventRsvpFormProps {
  eventSlug: string;
  eventName: string;
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  attendees: number;
}

interface FormErrors {
  name?: string;
  email?: string;
  attendees?: string;
}

/**
 * RSVP form for event registration
 *
 * This is a demo form that simulates RSVP submission without
 * actually sending data to a backend. For portfolio purposes.
 */
export function EventRsvpForm({
  eventSlug,
  eventName,
  className,
}: EventRsvpFormProps) {
  const t = useTranslations("pages.events.rsvp");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    attendees: 1,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = t("validation.nameRequired");
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = t("validation.emailRequired");
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t("validation.emailInvalid");
    }

    // Validate attendees
    if (formData.attendees < 1) {
      newErrors.attendees = t("validation.attendeesMin");
    } else if (formData.attendees > 20) {
      newErrors.attendees = t("validation.attendeesMax");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? 1 : parseInt(value, 10)) : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay (demo only)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Log for demo purposes
    console.log("RSVP submitted:", {
      eventSlug,
      eventName,
      ...formData,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      attendees: 1,
    });
    setErrors({});
    setIsSubmitted(false);
  };

  // Success state
  if (isSubmitted) {
    return (
      <div className={cn("space-y-4 text-center", className)}>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#4a7c59]/10">
          <CheckCircle className="h-6 w-6 text-[#4a7c59]" />
        </div>
        <div className="space-y-2">
          <h4 className="font-heading text-lg font-semibold text-charcoal">
            {t("success.title")}
          </h4>
          <p className="font-body text-sm text-warm-gray">
            {t("success.message")}
          </p>
          <p className="font-ui text-xs text-warm-gray italic">
            {t("success.demo")}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          className="w-full border-navy text-navy hover:bg-navy hover:text-cream"
        >
          {t("submitAnother")}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      {/* Name field */}
      <div className="space-y-2">
        <Label htmlFor="rsvp-name" className="font-ui text-sm text-charcoal">
          <span className="flex items-center gap-2">
            <User className="h-4 w-4 text-gold" />
            {t("fields.name")}
          </span>
        </Label>
        <Input
          id="rsvp-name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className={cn(
            "font-ui",
            errors.name && "border-[#b94a48] focus-visible:ring-[#b94a48]/50"
          )}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "rsvp-name-error" : undefined}
        />
        {errors.name && (
          <p
            id="rsvp-name-error"
            className="font-ui text-xs text-[#b94a48]"
          >
            {errors.name}
          </p>
        )}
      </div>

      {/* Email field */}
      <div className="space-y-2">
        <Label htmlFor="rsvp-email" className="font-ui text-sm text-charcoal">
          <span className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gold" />
            {t("fields.email")}
          </span>
        </Label>
        <Input
          id="rsvp-email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={cn(
            "font-ui",
            errors.email && "border-[#b94a48] focus-visible:ring-[#b94a48]/50"
          )}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "rsvp-email-error" : undefined}
        />
        {errors.email && (
          <p
            id="rsvp-email-error"
            className="font-ui text-xs text-[#b94a48]"
          >
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone field (optional) */}
      <div className="space-y-2">
        <Label htmlFor="rsvp-phone" className="font-ui text-sm text-charcoal">
          <span className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gold" />
            {t("fields.phone")}
          </span>
        </Label>
        <Input
          id="rsvp-phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+65 9123 4567"
          className="font-ui"
        />
      </div>

      {/* Attendees field */}
      <div className="space-y-2">
        <Label
          htmlFor="rsvp-attendees"
          className="font-ui text-sm text-charcoal"
        >
          <span className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gold" />
            {t("fields.attendees")}
          </span>
        </Label>
        <Input
          id="rsvp-attendees"
          name="attendees"
          type="number"
          min={1}
          max={20}
          required
          value={formData.attendees}
          onChange={handleChange}
          className={cn(
            "font-ui",
            errors.attendees &&
              "border-[#b94a48] focus-visible:ring-[#b94a48]/50"
          )}
          aria-invalid={!!errors.attendees}
          aria-describedby={
            errors.attendees ? "rsvp-attendees-error" : undefined
          }
        />
        {errors.attendees && (
          <p
            id="rsvp-attendees-error"
            className="font-ui text-xs text-[#b94a48]"
          >
            {errors.attendees}
          </p>
        )}
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gold text-charcoal hover:bg-gold/90"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("submitting")}
          </span>
        ) : (
          t("submit")
        )}
      </Button>
    </form>
  );
}
