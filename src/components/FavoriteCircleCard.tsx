"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { AddToCartPill } from "@/components/cart/AddToCartButton";
import { track } from "@/lib/track";
import { HeartIcon } from "@/components/TrustIcons";

/** Anillos de color que se van alternando entre tarjetas. */
const RINGS = [
  "border-pelumi-teal",
  "border-pelumi-yellow",
  "border-pelumi-pink",
  "border-pelumi-blue-dark",
];

/** Favorito en formato circular, como en el diseño de la marca. */
export default function FavoriteCircleCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const cover = product.images[0];
  const ring = RINGS[index % RINGS.length];
  const trackClick = () => track("product_click", { productId: product.id });

  return (
    <div className="group flex flex-col items-center text-center">
      <Link
        href={`/catalogo/${product.slug}`}
        onClick={trackClick}
        className="relative block"
        aria-label={product.name}
      >
        <div
          className={`relative aspect-square w-32 overflow-hidden rounded-full border-4 bg-pelumi-blue-light shadow-md transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:scale-105 sm:w-40 ${ring}`}
        >
          {cover && (
            <Image
              src={cover}
              alt={product.name}
              fill
              sizes="160px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          )}
          {product.stock === "out" && <div className="absolute inset-0 bg-white/60" />}
        </div>

        {/* Corazón de favorito */}
        <span className="absolute -right-1 top-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-pelumi-pink-light text-pelumi-pink shadow-sm transition-transform duration-300 group-hover:scale-110 sm:right-1 sm:top-2">
          <HeartIcon size={15} />
        </span>

        {product.stock === "out" && (
          <span className="absolute inset-x-0 bottom-3 mx-auto w-fit rounded-full bg-pelumi-ink/85 px-2.5 py-0.5 text-[10px] font-extrabold text-white">
            Agotado
          </span>
        )}
      </Link>

      <Link href={`/catalogo/${product.slug}`} onClick={trackClick} className="mt-3">
        <h3 className="line-clamp-1 font-heading text-[15px] text-pelumi-ink transition-colors group-hover:text-pelumi-pink">
          {product.name}
        </h3>
      </Link>
      <p className="mt-0.5 font-heading text-[15px] text-pelumi-pink">
        {formatPrice(product.price)}
      </p>
      <div className="mt-2.5">
        <AddToCartPill product={product} />
      </div>
    </div>
  );
}
