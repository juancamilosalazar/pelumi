"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, m } from "motion/react";

/** Tarjeta de indicador con número que cuenta hacia arriba al entrar en pantalla. */
export default function KpiCard({
  label,
  value,
  icon,
  accent = "bg-pelumi-blue-light",
  delay = 0,
  hint,
}: {
  label: string;
  value: number;
  icon: string;
  accent?: string;
  delay?: number;
  hint?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.1,
      delay: delay / 1000,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, delay]);

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ type: "spring", stiffness: 240, damping: 22, delay: delay / 1000 }}
      className="rounded-3xl border border-pelumi-blue-light bg-white p-5"
    >
      <div className="flex items-center gap-3">
        <span className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xl ${accent}`} aria-hidden="true">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs font-bold uppercase tracking-wide text-pelumi-ink/50">
            {label}
          </p>
          <p className="font-heading text-3xl leading-tight text-pelumi-ink tabular-nums">
            {display.toLocaleString("es-CO")}
          </p>
        </div>
      </div>
      {hint && <p className="mt-2 text-xs text-pelumi-ink/50">{hint}</p>}
    </m.div>
  );
}
