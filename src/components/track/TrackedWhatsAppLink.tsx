"use client";

import { track } from "@/lib/track";
import type { MetricEventType } from "@/lib/metrics";

type Props = {
  href: string;
  event: Extract<MetricEventType, "whatsapp_general" | "whatsapp_wholesale" | "whatsapp_product">;
  productId?: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
};

/** Enlace a WhatsApp que registra el click en las métricas antes de abrir el chat. */
export default function TrackedWhatsAppLink({
  href,
  event,
  productId,
  className,
  children,
  ariaLabel,
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      onClick={() => track(event, productId ? { productId } : {})}
    >
      {children}
    </a>
  );
}
