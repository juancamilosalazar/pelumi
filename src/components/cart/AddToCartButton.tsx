"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart";
import { track } from "@/lib/track";
import { CartIcon } from "@/components/TrustIcons";

/** Lógica compartida por las variantes de "agregar al carrito". */
function useAddToCart(product: Product) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const add = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    track("cart_add", { productId: product.id });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return { add, added };
}

/** Botón a lo ancho de la tarjeta (secciones de catálogo y novedades). */
export function AddToCartWide({ product }: { product: Product }) {
  const { add, added } = useAddToCart(product);

  if (product.stock === "out") {
    return (
      <span className="flex w-full items-center justify-center rounded-full bg-pelumi-ink/10 py-2.5 text-xs font-bold text-pelumi-ink/45">
        Agotado
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={add}
      className={`flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-[13px] font-bold text-white shadow-sm transition-all active:scale-95 ${
        added ? "bg-pelumi-blue-dark" : "bg-pelumi-pink hover:bg-pelumi-pink-dark"
      }`}
      aria-label={`Agregar ${product.name} al carrito`}
    >
      {added ? (
        <>
          <CheckIcon /> Listo
        </>
      ) : (
        <>
          <CartIcon size={15} /> Agregar
        </>
      )}
    </button>
  );
}

/** Pastilla suave, para los favoritos circulares. */
export function AddToCartPill({ product }: { product: Product }) {
  const { add, added } = useAddToCart(product);

  if (product.stock === "out") {
    return (
      <span className="inline-flex items-center rounded-full bg-pelumi-ink/10 px-4 py-1.5 text-xs font-bold text-pelumi-ink/45">
        Agotado
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={add}
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all hover:scale-105 active:scale-95 ${
        added
          ? "bg-pelumi-blue-dark text-white"
          : "bg-pelumi-pink-light text-pelumi-pink hover:bg-pelumi-pink hover:text-white"
      }`}
      aria-label={`Agregar ${product.name} al carrito`}
    >
      {added ? (
        <>
          <CheckIcon /> Listo
        </>
      ) : (
        <>
          <CartIcon size={13} /> Agregar
        </>
      )}
    </button>
  );
}

/** Selector de cantidad + agregar, para la página de detalle. */
export function AddToCartDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQtyLocal] = useState(1);

  if (product.stock === "out") {
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-pelumi-ink/5 px-5 py-4">
        <span className="text-2xl" aria-hidden="true">😢</span>
        <div>
          <p className="font-heading text-pelumi-ink">Agotado por ahora</p>
          <p className="text-sm text-pelumi-ink/60">
            Pregúntanos por WhatsApp cuándo vuelve a estar disponible.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-full border-2 border-pelumi-blue-light bg-white">
        <button
          type="button"
          onClick={() => setQtyLocal((q) => Math.max(1, q - 1))}
          className="flex h-12 w-11 items-center justify-center rounded-l-full text-lg font-bold text-pelumi-ink/60 transition-colors hover:bg-pelumi-blue-light hover:text-pelumi-ink"
          aria-label="Disminuir cantidad"
        >
          −
        </button>
        <span className="w-10 text-center font-heading text-lg text-pelumi-ink" aria-live="polite">
          {qty}
        </span>
        <button
          type="button"
          onClick={() => setQtyLocal((q) => Math.min(99, q + 1))}
          className="flex h-12 w-11 items-center justify-center rounded-r-full text-lg font-bold text-pelumi-ink/60 transition-colors hover:bg-pelumi-blue-light hover:text-pelumi-ink"
          aria-label="Aumentar cantidad"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={() => {
          addItem(product, qty, { open: true });
          track("cart_add", { productId: product.id });
          setQtyLocal(1);
        }}
        className="flex items-center gap-2 rounded-full bg-pelumi-pink px-7 py-3.5 font-heading text-white shadow-lg shadow-pelumi-pink/30 transition-transform hover:scale-105 active:scale-95"
      >
        <BagIcon size={18} />
        Agregar al carrito
      </button>
    </div>
  );
}

function BagIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M6 8h12l1.2 12.2a1 1 0 0 1-1 1.1H5.8a1 1 0 0 1-1-1.1L6 8z" strokeLinejoin="round" />
      <path d="M9 10V6a3 3 0 0 1 6 0v4" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <path d="M4 12.5 9.5 18 20 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
