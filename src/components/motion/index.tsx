"use client";

import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";

/**
 * Animaciones de la página con `motion` (Framer Motion) en modo lazy:
 * solo se carga el subconjunto de features de DOM (~18 kB), manteniendo
 * la página liviana. `reducedMotion="user"` respeta la preferencia de
 * accesibilidad "reducir movimiento" del sistema operativo.
 */

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** Aparece subiendo suavemente cuando entra en pantalla. */
export function FadeUp({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.65, delay: delay / 1000, ease: EASE }}
      className={className}
    >
      {children}
    </m.div>
  );
}

/** Entra con un pequeño rebote elástico (para botones y elementos clave). */
export function PopIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay: delay / 1000 }}
      className={className}
    >
      {children}
    </m.div>
  );
}

/** Contenedor que revela a sus hijos en cascada. */
export function Stagger({
  children,
  className,
  gap = 0.09,
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <m.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap } },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <m.div
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export { m };
