import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";

const SECONDS_PER_ITEM = 4.5;

export default function FavoritesCarousel({ products }: { products: Product[] }) {
  const withImages = products.filter((p) => p.images[0]);
  // Se duplica la lista: con -50% de traslado, la segunda mitad calza exacto
  // sobre la primera y el loop se ve perfectamente continuo.
  const track = [...withImages, ...withImages];
  const duration = Math.max(withImages.length * SECONDS_PER_ITEM, 14);

  return (
    <div className="relative w-full min-w-0 max-w-full overflow-hidden">
      <div
        className="marquee-track flex gap-5 py-2"
        style={{ animationDuration: `${duration}s` }}
      >
        {track.map((product, i) => (
          <Link
            key={`${product.id}-${i}`}
            href={`/catalogo/${product.slug}`}
            className="group relative h-72 w-60 shrink-0 overflow-hidden rounded-[2rem] border-4 border-white bg-pelumi-blue-light shadow-xl shadow-pelumi-teal/20 transition-transform duration-300 hover:-rotate-1 hover:scale-[1.03] sm:h-96 sm:w-80"
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="320px"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pelumi-ink/70 via-transparent to-transparent" />
            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold text-pelumi-pink shadow-sm">
              ♥ Favorito
            </span>
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="font-heading text-lg text-white drop-shadow-sm">{product.name}</p>
              <p className="font-heading text-pelumi-yellow">
                {formatPrice(product.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Difuminado sutil a los lados para que el loop se sienta continuo */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent sm:w-16" />
    </div>
  );
}
