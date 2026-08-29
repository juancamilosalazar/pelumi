"use client";

import { useRef } from "react";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

/** Fila horizontal de productos con scroll suave y flechas, al estilo de las tiendas de peluches premium. */
export default function ProductRow({ products }: { products: Product[] }) {
  const scroller = useRef<HTMLDivElement>(null);

  function scrollBy(direction: 1 | -1) {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div className="group/row relative">
      <div
        ref={scroller}
        className="snap-row scrollbar-none flex gap-5 overflow-x-auto pb-2"
      >
        {products.map((product) => (
          <div key={product.id} className="w-56 shrink-0 sm:w-64">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollBy(-1)}
        className="absolute -left-3 top-[38%] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-pelumi-ink shadow-lg transition-all hover:scale-110 hover:text-pelumi-pink sm:flex"
        aria-label="Ver anteriores"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => scrollBy(1)}
        className="absolute -right-3 top-[38%] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-pelumi-ink shadow-lg transition-all hover:scale-110 hover:text-pelumi-pink sm:flex"
        aria-label="Ver siguientes"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
