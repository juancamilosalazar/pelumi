"use client";

import { m } from "motion/react";

export type TrendPoint = { label: string; views: number; whatsapp: number };

const W = 640;
const H = 200;
const PAD_X = 8;
const PAD_TOP = 14;
const PAD_BOTTOM = 26;

/** Área de visitas de los últimos 30 días + mini barras de clicks a WhatsApp. */
export default function TrendChart({ points }: { points: TrendPoint[] }) {
  if (points.length === 0) return null;

  const maxViews = Math.max(1, ...points.map((p) => p.views));
  const maxWa = Math.max(1, ...points.map((p) => p.whatsapp));
  const innerW = W - PAD_X * 2;
  const innerH = H - PAD_TOP - PAD_BOTTOM;
  const stepX = innerW / Math.max(1, points.length - 1);

  const x = (i: number) => PAD_X + i * stepX;
  const y = (v: number) => PAD_TOP + innerH - (v / maxViews) * innerH;

  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p.views).toFixed(1)}`).join(" ");
  const area = `${line} L${x(points.length - 1).toFixed(1)},${PAD_TOP + innerH} L${x(0).toFixed(1)},${PAD_TOP + innerH} Z`;

  return (
    <div>
      <div className="overflow-x-auto">
        <m.svg
          viewBox={`0 0 ${W} ${H}`}
          className="min-w-[480px] w-full"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          role="img"
          aria-label="Visitas por día de los últimos 30 días"
        >
          {/* líneas guía */}
          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1={PAD_X}
              x2={W - PAD_X}
              y1={PAD_TOP + innerH * f}
              y2={PAD_TOP + innerH * f}
              stroke="#EAF7F7"
              strokeWidth="1.5"
            />
          ))}

          {/* área + línea de visitas */}
          <path d={area} fill="#80D1D3" opacity="0.18" />
          <path d={line} fill="none" stroke="#2FA6A9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* puntos con tooltip nativo */}
          {points.map((p, i) => (
            <circle key={i} cx={x(i)} cy={y(p.views)} r="7" fill="transparent">
              <title>{`${p.label}: ${p.views} visitas · ${p.whatsapp} WhatsApp`}</title>
            </circle>
          ))}
          {points.map(
            (p, i) =>
              p.views > 0 && (
                <circle key={`d${i}`} cx={x(i)} cy={y(p.views)} r="2.4" fill="#2FA6A9" pointerEvents="none" />
              )
          )}

          {/* etiquetas de fecha */}
          {points.map((p, i) =>
            i % 5 === 0 || i === points.length - 1 ? (
              <text
                key={`t${i}`}
                x={x(i)}
                y={H - 8}
                textAnchor="middle"
                fontSize="10"
                fill="#4A3A35"
                opacity="0.45"
              >
                {p.label}
              </text>
            ) : null
          )}
        </m.svg>
      </div>

      {/* mini barras de WhatsApp por día */}
      <div className="mt-3">
        <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-pelumi-ink/50">
          Clicks a WhatsApp por día
        </p>
        <div className="flex h-10 items-end gap-[3px]">
          {points.map((p, i) => (
            <m.div
              key={i}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.015, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: `${Math.max(8, (p.whatsapp / maxWa) * 100)}%`, originY: 1 }}
              className={`flex-1 rounded-t-sm ${p.whatsapp > 0 ? "bg-pelumi-pink" : "bg-pelumi-blue-light"}`}
              title={`${p.label}: ${p.whatsapp} clicks a WhatsApp`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
