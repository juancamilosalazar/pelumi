import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import CatalogExplorer from "@/components/CatalogExplorer";
import { Spiral, Squiggle, Dot, BearHead, HeartDoodle, CloudShape, Sparkle } from "@/components/Doodles";

export const metadata: Metadata = {
  title: "Explorar catálogo",
  description:
    "Explora el catálogo completo de peluches Pelumi: filtra por precio, arma tu carrito y haz tu pedido por WhatsApp.",
};

export const revalidate = 0;

export default async function CatalogoPage() {
  const products = await getAllProducts();

  return (
    <div className="relative overflow-hidden">
      <CloudShape className="absolute -right-6 top-8 opacity-60 animate-float-slow" color="#EAF7F7" size={130} />
      <Spiral className="absolute right-[6%] top-28 opacity-60 animate-float" color="#F9C719" size={46} />
      <Squiggle className="absolute left-[4%] top-44 opacity-60 animate-float-slow" color="#EF2A93" size={34} />
      <BearHead className="absolute left-[7%] top-14 opacity-20 -rotate-12 animate-float" color="#80D1D3" size={54} />
      <HeartDoodle className="absolute right-[18%] top-14 opacity-55 animate-bounce-soft" color="#EF2A93" size={18} />
      <Sparkle className="absolute left-[30%] top-10 animate-bounce-soft" color="#F9C719" size={16} />
      <Dot className="absolute left-[16%] top-32 animate-bounce-soft" color="#80D1D3" size={13} />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8 text-center">
          <span className="text-sm font-extrabold uppercase tracking-widest text-pelumi-blue-dark">
            Catálogo completo
          </span>
          <h1 className="font-heading mt-2 text-3xl text-pelumi-ink sm:text-5xl">
            Encuentra tu peluche ideal
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm text-pelumi-ink/70">
            Filtra por precio, busca por nombre y arma tu carrito. Cuando esté listo,
            nos llega el pedido completo por WhatsApp.
          </p>
        </div>

        <CatalogExplorer products={products} />
      </div>
    </div>
  );
}
