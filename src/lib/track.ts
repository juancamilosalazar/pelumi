"use client";

import type { MetricEventType } from "./metrics";

type TrackPayload = {
  productId?: string;
  productIds?: string[];
  path?: string;
};

/**
 * Envía un evento anónimo de métricas. Usa sendBeacon para no bloquear
 * la navegación (importante en clicks que abren WhatsApp o cambian de página).
 * El servidor descarta los eventos si quien navega es el administrador.
 */
export function track(type: MetricEventType, payload: TrackPayload = {}): void {
  try {
    const body = JSON.stringify({ type, ...payload });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/metrics", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/metrics", { method: "POST", body, keepalive: true }).catch(() => undefined);
    }
  } catch {
    // Las métricas nunca deben romper la experiencia del usuario
  }
}
