"use client";

import { m } from "motion/react";

export type DonutSegment = { label: string; value: number; color: string };

/** Dona de distribución (ej. clicks a WhatsApp por origen) con leyenda. */
export default function SourceDonut({
  segments,
  centerLabel,
}: {
  segments: DonutSegment[];
  centerLabel: string;
}) {
  const total = segments.reduce((acc, s) => acc + s.value, 0);

  if (total === 0) {
    return (
      <p className="py-6 text-center text-sm text-pelumi-ink/50">
        Aún no hay clicks registrados.
      </p>
    );
  }

  // Dona con conic-gradient (liviana y precisa); offsets acumulados sin mutación
  const stops = segments
    .filter((s) => s.value > 0)
    .reduce<{ from: number; to: number; color: string }[]>((arr, s) => {
      const from = arr.length ? arr[arr.length - 1].to : 0;
      return [...arr, { from, to: from + s.value, color: s.color }];
    }, [])
    .map(
      (seg) =>
        `${seg.color} ${((seg.from / total) * 360).toFixed(2)}deg ${((seg.to / total) * 360).toFixed(2)}deg`
    )
    .join(", ");

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
      <m.div
        initial={{ opacity: 0, scale: 0.7, rotate: -40 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative h-40 w-40 shrink-0 rounded-full"
        style={{ background: `conic-gradient(${stops})` }}
        role="img"
        aria-label={segments.map((s) => `${s.label}: ${s.value}`).join(", ")}
      >
        <div className="absolute inset-[22%] flex flex-col items-center justify-center rounded-full bg-white">
          <span className="font-heading text-2xl text-pelumi-ink tabular-nums">{total}</span>
          <span className="text-[10px] font-bold uppercase tracking-wide text-pelumi-ink/50">
            {centerLabel}
          </span>
        </div>
      </m.div>

      <ul className="flex flex-col gap-2">
        {segments.map((s, i) => (
          <m.li
            key={s.label}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
            className="flex items-center gap-2.5 text-sm"
          >
            <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-pelumi-ink/80">{s.label}</span>
            <span className="font-heading text-pelumi-ink tabular-nums">{s.value}</span>
            <span className="text-xs text-pelumi-ink/45">
              ({total > 0 ? Math.round((s.value / total) * 100) : 0}%)
            </span>
          </m.li>
        ))}
      </ul>
    </div>
  );
}
