"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { AddToCartMini } from "@/components/cart/AddToCartButton";
import { track } from "@/lib/track";

export default function ProductCard({ product }: { product: Product }) {
  const cover = product.images[0];
  const hover = product.images[1];
  const trackClick = () => track("product_click", { productId: product.id });

  return (
    <div className="group relative flex flex-col">
      <Link
        href={`/catalogo/${product.slug}`}
        onClick={trackClick}
        className="relative block aspect-square overflow-hidden rounded-[1.75rem] bg-pelumi-blue-light shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:shadow-pelumi-blue/20"
      >
        {cover ? (
          <>
            <Image
              src={cover}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className={`object-cover transition-all duration-500 ${
                hover ? "group-hover:opacity-0" : "group-hover:scale-[1.08]"
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

        {product.favorite && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold text-pelumi-pink shadow-sm">
            ♥ Favorito
          </span>
        )}

        {product.stock === "low" && (
          <span className="absolute right-3 top-3 rounded-full bg-pelumi-yellow px-3 py-1 text-xs font-extrabold text-pelumi-ink shadow-sm">
            ¡Pocas unidades!
          </span>
        )}
        {product.stock === "out" && (
          <>
            <div className="absolute inset-0 bg-white/55" />
            <span className="absolute right-3 top-3 rounded-full bg-pelumi-ink/85 px-3 py-1 text-xs font-extrabold text-white shadow-sm">
              Agotado
            </span>
          </>
        )}
      </Link>

      <div className="mt-3 flex flex-col items-center gap-1.5 text-center">
        <Link href={`/catalogo/${product.slug}`} onClick={trackClick}>
          <h3 className="line-clamp-1 font-heading text-base text-pelumi-ink transition-colors group-hover:text-pelumi-pink sm:text-lg">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2.5">
          <span className="font-heading text-base text-pelumi-blue-dark">
            {formatPrice(product.price)}
          </span>
          <AddToCartMini product={product} />
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
