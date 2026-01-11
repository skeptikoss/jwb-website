"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { KashrutCertification } from "@/lib/sanity/types";

interface KashrutBadgeProps {
  certification: KashrutCertification;
  className?: string;
}

// Display names for certifications
const certificationLabels: Record<KashrutCertification, string> = {
  OU: "OU",
  OK: "OK",
  "Star-K": "Star-K",
  "Kof-K": "Kof-K",
  "Singapore-Rabbinate": "SG Rabbinate",
  CRC: "CRC",
  Badatz: "Badatz",
  Other: "Kosher",
};

/**
 * Kashrut certification badge component
 * Displays kosher certification with appropriate styling
 */
export function KashrutBadge({ certification, className }: KashrutBadgeProps) {
  const label = certificationLabels[certification] || certification;

  return (
    <Badge
      variant="secondary"
      className={cn(
        "bg-sage/20 text-sage-700 hover:bg-sage/30 font-ui text-xs",
        className
      )}
    >
      {label}
    </Badge>
  );
}
