"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, m } from "motion/react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { buildCartWhatsAppLink } from "@/lib/whatsapp";
import { track } from "@/lib/track";

export default function CartDrawer() {
  const { items, count, total, isOpen, closeCart, removeItem, setQty, clear } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    track("cart_open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div key="cart-root" className="contents">
      {/* Fondo oscurecido */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={closeCart}
        className="fixed inset-0 z-[60] bg-pelumi-ink/40 backdrop-blur-[2px]"
        aria-hidden="true"
      />

      {/* Panel */}
      <m.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        <header className="flex items-center justify-between border-b border-pelumi-blue-light px-5 py-4">
          <h2 className="font-heading text-xl text-pelumi-ink">
            Tu carrito{" "}
            {count > 0 && (
              <span className="ml-1 rounded-full bg-pelumi-pink-light px-2.5 py-0.5 text-sm text-pelumi-pink-dark">
                {count}
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="flex h-10 w-10 items-center justify-center rounded-full text-pelumi-ink/60 transition-colors hover:bg-pelumi-blue-light hover:text-pelumi-ink"
            aria-label="Cerrar carrito"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="text-5xl" aria-hidden="true">🧸</span>
            <p className="font-heading text-lg text-pelumi-ink">Tu carrito está vacío</p>
            <p className="text-sm text-pelumi-ink/60">
              Explora el catálogo y agrega los peluches que te enamoren.
            </p>
            <Link
              href="/catalogo"
              onClick={closeCart}
              className="mt-2 rounded-full bg-pelumi-pink px-6 py-3 font-heading text-white shadow-md shadow-pelumi-pink/30 transition-transform hover:scale-105"
            >
              Explorar catálogo
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-pelumi-blue-light overflow-y-auto px-5">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 py-4">
                  <Link
                    href={`/catalogo/${item.slug}`}
                    onClick={closeCart}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-pelumi-blue-light"
                  >
                    {item.image && (
                      <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                    )}
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/catalogo/${item.slug}`}
                        onClick={closeCart}
                        className="line-clamp-2 font-heading text-sm text-pelumi-ink hover:text-pelumi-pink"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="shrink-0 rounded-full p-1 text-pelumi-ink/40 transition-colors hover:bg-pelumi-pink-light hover:text-pelumi-pink"
                        aria-label={`Quitar ${item.name}`}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 7h14M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m3 0-1 13a1 1 0 0 1-1 .9H8a1 1 0 0 1-1-.9L6 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-pelumi-blue-light">
                        <button
                          type="button"
                          onClick={() => setQty(item.id, item.qty - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-l-full text-pelumi-ink/60 hover:bg-pelumi-blue-light"
                          aria-label="Disminuir cantidad"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-sm font-bold text-pelumi-ink">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(item.id, item.qty + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-r-full text-pelumi-ink/60 hover:bg-pelumi-blue-light"
                          aria-label="Aumentar cantidad"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-heading text-sm text-pelumi-pink-dark">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-pelumi-blue-light bg-pelumi-cream-light px-5 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-pelumi-ink/70">
                  Total ({count} {count === 1 ? "peluche" : "peluches"})
                </span>
                <span className="font-heading text-2xl text-pelumi-ink">{formatPrice(total)}</span>
              </div>

              <a
                href={buildCartWhatsAppLink(items)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track("whatsapp_order", { productIds: items.map((i) => i.id) })
                }
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 font-heading text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-[1.02] active:scale-95"
              >
                <WhatsAppIcon />
                Hacer pedido por WhatsApp
              </a>

              <div className="mt-3 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={clear}
                  className="text-pelumi-ink/50 underline-offset-2 hover:text-pelumi-red hover:underline"
                >
                  Vaciar carrito
                </button>
                <span className="text-pelumi-ink/50">
                  Confirmamos disponibilidad y envío por chat
                </span>
              </div>
            </footer>
          </>
        )}
      </m.aside>
        </m.div>
      )}
    </AnimatePresence>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.462 3.478 1.34 4.985L2 22l5.117-1.334a9.96 9.96 0 0 0 4.887 1.28h.004c5.514 0 9.997-4.483 9.997-9.997 0-2.67-1.04-5.18-2.929-7.07a9.93 9.93 0 0 0-7.072-2.876z" fillRule="evenodd" clipRule="evenodd" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
