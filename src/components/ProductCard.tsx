"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { AddToCartWide } from "@/components/cart/AddToCartButton";
import { track } from "@/lib/track";

/**
 * Tarjeta de producto: foto arriba, nombre, precio y botón de agregar a lo ancho.
 * `badge` muestra la etiqueta blanca de la esquina (ej. "Nuevo").
 */
export default function ProductCard({
  product,
  badge,
}: {
  product: Product;
  badge?: string;
}) {
  const cover = product.images[0];
  const hover = product.images[1];
  const trackClick = () => track("product_click", { productId: product.id });

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-pelumi-cream bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-pelumi-teal/15">
      <Link
        href={`/catalogo/${product.slug}`}
        onClick={trackClick}
        className="relative block aspect-square overflow-hidden bg-pelumi-blue-light"
      >
        {cover ? (
          <>
            <Image
              src={cover}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className={`object-cover transition-all duration-500 ${
                hover ? "group-hover:opacity-0" : "group-hover:scale-[1.07]"
              }`}
            />
            {hover && (
              <Image
                src={hover}
                alt={`${product.name} (segunda vista)`}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover opacity-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-pelumi-blue-dark/40">
            <PawIcon />
          </div>
        )}

        {badge && product.stock !== "out" && (
          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[11px] font-extrabold text-pelumi-ink shadow-sm">
            {badge}
          </span>
        )}

        {product.stock === "low" && (
          <span className="absolute right-3 top-3 rounded-full bg-pelumi-yellow px-3 py-1 text-[11px] font-extrabold text-pelumi-ink shadow-sm">
            ¡Pocas unidades!
          </span>
        )}
        {product.stock === "out" && (
          <>
            <div className="absolute inset-0 bg-white/55" />
            <span className="absolute left-3 top-3 rounded-full bg-pelumi-ink/85 px-3 py-1 text-[11px] font-extrabold text-white shadow-sm">
              Agotado
            </span>
          </>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/catalogo/${product.slug}`} onClick={trackClick}>
          <h3 className="line-clamp-1 font-heading text-[15px] text-pelumi-ink transition-colors group-hover:text-pelumi-pink">
            {product.name}
          </h3>
        </Link>
        <p className="mt-0.5 font-heading text-[15px] text-pelumi-pink">
          {formatPrice(product.price)}
        </p>
        <div className="mt-3">
          <AddToCartWide product={product} />
        </div>
      </div>
    </div>
  );
}

function PawIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="7" cy="8" r="2" />
      <circle cx="12" cy="6" r="2" />
      <circle cx="17" cy="8" r="2" />
      <path d="M12 11c-3.3 0-6 2.2-6 5 0 1.7 1.3 3 3 3 1 0 1.5-.5 3-.5s2 .5 3 .5c1.7 0 3-1.3 3-3 0-2.8-2.7-5-6-5z" />
    </svg>
  );
}
