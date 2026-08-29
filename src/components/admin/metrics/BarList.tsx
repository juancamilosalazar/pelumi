"use client";

import Image from "next/image";
import { m } from "motion/react";

export type BarRow = {
  key: string;
  name: string;
  image?: string;
  value: number;
  /** Segmentos opcionales para barra apilada (deben sumar `value`). */
  segments?: { value: number; color: string; label: string }[];
};

/** Lista de barras horizontales animadas, con miniatura opcional del producto. */
export default function BarList({
  rows,
  unit = "",
  emptyText = "Aún no hay datos.",
}: {
  rows: BarRow[];
  unit?: string;
  emptyText?: string;
}) {
  if (rows.length === 0) {
    return <p className="py-6 text-center text-sm text-pelumi-ink/50">{emptyText}</p>;
  }

  const max = Math.max(1, ...rows.map((r) => r.value));

  return (
    <ul className="flex flex-col gap-3">
      {rows.map((row, i) => (
        <m.li
          key={row.key}
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3"
        >
          {row.image !== undefined && (
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-pelumi-blue-light">
              {row.image && (
                <Image src={row.image} alt="" fill sizes="40px" className="object-cover" />
              )}
            </span>
          )}

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <span className="truncate text-sm font-bold text-pelumi-ink">{row.name}</span>
              <span className="shrink-0 font-heading text-sm text-pelumi-ink tabular-nums">
                {row.value.toLocaleString("es-CO")}
                {unit && <span className="ml-1 text-xs font-sans text-pelumi-ink/50">{unit}</span>}
              </span>
            </div>
            <div className="flex h-3 overflow-hidden rounded-full bg-pelumi-blue-light/60">
              {(row.segments ?? [{ value: row.value, color: "#2FA6A9", label: "" }]).map(
                (seg, j) =>
                  seg.value > 0 && (
                    <m.div
                      key={j}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        width: `${(seg.value / max) * 100}%`,
                        backgroundColor: seg.color,
                        originX: 0,
                      }}
                      title={seg.label ? `${seg.label}: ${seg.value}` : undefined}
                    />
                  )
              )}
            </div>
          </div>
        </m.li>
      ))}
    </ul>
  );
}
