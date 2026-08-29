"use client";

import { m } from "motion/react";

/**
 * Transición de entrada al navegar entre páginas del sitio:
 * el contenido nuevo aparece subiendo con un desvanecido suave.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
