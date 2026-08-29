import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { AddToCartDetail } from "@/components/cart/AddToCartButton";
import { Spiral, Dot } from "@/components/Doodles";
import TrackedWhatsAppLink from "@/components/track/TrackedWhatsAppLink";
import ProductViewTracker from "@/components/track/ProductViewTracker";

export const revalidate = 0;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const description =
    product.description.length > 155
      ? `${product.description.slice(0, 152)}...`
      : product.description || `Descubre ${product.name}, disponible en Pelumi.`;

  return {
    title: product.name,
    description,
    openGraph: {
      title: `${product.name} · Pelumi`,
      description,
      images: product.images[0] ? [{ url: product.images[0] }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const all = await getAllProducts();
  const related = all.filter((p) => p.id !== product.id).slice(0, 4);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((img) => `${siteUrl}${img}`),
    brand: { "@type": "Brand", name: "Pelumi" },
    offers: {
      "@type": "Offer",
      priceCurrency: "COP",
      price: product.price,
      availability:
        product.stock === "out"
          ? "https://schema.org/OutOfStock"
          : product.stock === "low"
            ? "https://schema.org/LimitedAvailability"
            : "https://schema.org/InStock",
      url: `${siteUrl}/catalogo/${product.slug}`,
    },
  };

  return (
    <div className="relative mx-auto max-w-6xl overflow-hidden px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductViewTracker productId={product.id} />

      <Spiral className="absolute right-[3%] top-10 opacity-50 animate-float" color="#F9C719" size={42} />
      <Dot className="absolute left-[45%] top-8 animate-bounce-soft" color="#EF2A93" size={12} />

      <nav className="relative text-sm font-semibold text-pelumi-ink/60" aria-label="Miga de pan">
        <Link href="/" className="transition-colors hover:text-pelumi-pink">Inicio</Link>
        <span className="mx-2" aria-hidden="true">·</span>
        <Link href="/catalogo" className="transition-colors hover:text-pelumi-pink">Catálogo</Link>
        <span className="mx-2" aria-hidden="true">·</span>
        <span className="text-pelumi-ink">{product.name}</span>
      </nav>

      <div className="relative mt-6 grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <div className="flex flex-wrap items-center gap-2">
            {product.favorite && (
              <span className="inline-flex items-center gap-1 rounded-full bg-pelumi-pink-light px-3.5 py-1.5 text-xs font-extrabold text-pelumi-pink-dark">
                ♥ Favorito de la casa
              </span>
            )}
            {product.stock === "low" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-pelumi-yellow px-3.5 py-1.5 text-xs font-extrabold text-pelumi-ink">
                ⚡ ¡Pocas unidades!
              </span>
            )}
            {product.stock === "out" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-pelumi-ink/85 px-3.5 py-1.5 text-xs font-extrabold text-white">
                Agotado
              </span>
            )}
          </div>
          <h1 className="font-heading mt-3 text-3xl text-pelumi-ink sm:text-5xl">
            {product.name}
          </h1>
          <p className="font-heading mt-4 text-3xl text-pelumi-pink">
            {formatPrice(product.price)}
          </p>
          <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-pelumi-ink/80">
            {product.description || "Pronto agregaremos más detalles de este peluche."}
          </p>

          <div className="mt-8 space-y-4">
            <AddToCartDetail product={product} />

            <TrackedWhatsAppLink
              href={buildWhatsAppLink(product.name)}
              event="whatsapp_product"
              productId={product.id}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#25D366] px-6 py-3 text-sm font-heading text-[#1da851] transition-all hover:bg-[#25D366] hover:text-white"
            >
              O pregunta solo por este peluche
            </TrackedWhatsAppLink>
          </div>

          <div className="mt-8 flex flex-col gap-2.5 rounded-[1.5rem] bg-pelumi-cream-light p-5 text-sm text-pelumi-ink/75">
            <p className="flex items-center gap-2.5">
              <span aria-hidden="true">🛒</span> Agrega varios peluches y envía todo el pedido junto.
            </p>
            <p className="flex items-center gap-2.5">
              <span aria-hidden="true">💬</span> Confirmamos disponibilidad, envío y pago por WhatsApp.
            </p>
            <p className="flex items-center gap-2.5">
              <span aria-hidden="true">🚚</span> Coordinamos entrega a todo el país.
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="relative mt-20">
          <Reveal>
            <h2 className="font-heading text-2xl text-pelumi-ink sm:text-3xl">
              También te puede gustar
            </h2>
          </Reveal>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
