import Link from "next/link";
import Image from "next/image";
import { getAllProducts, getFeaturedProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import FavoriteCircleCard from "@/components/FavoriteCircleCard";
import Reveal from "@/components/Reveal";
import { Sparkle, HeartDoodle } from "@/components/Doodles";
import {
  HeartIcon,
  ShieldIcon,
  ChatIcon,
  TruckIcon,
  CartIcon,
  WhatsAppGlyph,
  BearOutline,
} from "@/components/TrustIcons";
import TrackedWhatsAppLink from "@/components/track/TrackedWhatsAppLink";
import { Stagger, StaggerItem, FadeUp } from "@/components/motion";
import { buildWhatsAppLink, buildWholesaleWhatsAppLink } from "@/lib/whatsapp";

export const revalidate = 0;

const TRUST = [
  {
    icon: <HeartIcon size={26} />,
    color: "text-pelumi-pink",
    title: "Súper suaves",
    text: "Materiales de alta calidad",
  },
  {
    icon: <ShieldIcon size={26} />,
    color: "text-pelumi-teal",
    title: "Compra segura",
    text: "Tu información está protegida",
  },
  {
    icon: <ChatIcon size={26} />,
    color: "text-pelumi-yellow",
    title: "Atención directa",
    text: "Hablamos contigo por WhatsApp",
  },
  {
    icon: <TruckIcon size={28} />,
    color: "text-pelumi-teal",
    title: "Envíos rápidos",
    text: "Recibe tu peluche sin demoras",
  },
];

export default async function HomePage() {
  const [favorites, all] = await Promise.all([getFeaturedProducts(4), getAllProducts()]);
  const newest = all.slice(0, 4);

  // Imagen fija del héroe: el primer favorito con foto (o el primer producto).
  const heroProduct =
    favorites.find((p) => p.images[0]) ?? all.find((p) => p.images[0]);

  return (
    <>
      {/* ── Héroe ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-pelumi-cream-light">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.05fr_1fr] md:py-16">
          {/* Texto */}
          <Stagger className="relative z-10 min-w-0 text-center md:text-left" gap={0.11}>
            <StaggerItem>
              <h1 className="font-heading text-[2.1rem] leading-[1.12] sm:text-5xl">
                <span className="text-pelumi-blue-dark">Hechos para</span>{" "}
                <span className="text-pelumi-pink">abrazar tus mejores momentos</span>
              </h1>
              {/* Subrayado amarillo del logo */}
              <svg
                className="mx-auto mt-2 block w-40 md:mx-0 sm:w-52"
                viewBox="0 0 200 14"
                fill="none"
                aria-hidden="true"
              >
                <path d="M4 10C55 3 145 3 196 8" stroke="#F9C719" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-6 font-heading text-lg text-pelumi-blue-dark">
                Fabricantes directos de peluches
              </p>
              <p className="mx-auto mt-1.5 max-w-md text-[15px] leading-relaxed text-pelumi-ink/70 md:mx-0">
                Arma tu pedido con el carrito y recíbelo por WhatsApp, sin vueltas.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
                <Link
                  href="/catalogo"
                  className="flex items-center justify-center gap-2.5 rounded-full bg-pelumi-pink px-7 py-3.5 font-heading text-white shadow-lg shadow-pelumi-pink/30 transition-transform hover:scale-105 active:scale-95"
                >
                  <CartIcon size={17} />
                  Explorar catálogo
                </Link>
                <TrackedWhatsAppLink
                  href={buildWhatsAppLink()}
                  event="whatsapp_general"
                  className="flex items-center justify-center gap-2.5 rounded-full border-2 border-pelumi-teal bg-white px-7 py-3.5 font-heading text-pelumi-blue-dark transition-all hover:bg-pelumi-teal hover:text-white"
                >
                  <WhatsAppGlyph size={17} />
                  Escríbenos por WhatsApp
                </TrackedWhatsAppLink>
              </div>
            </StaggerItem>
          </Stagger>

          {/* Imagen fija sobre mancha azul */}
          <FadeUp delay={220} className="relative z-10 flex min-w-0 justify-center">
            <div className="relative w-full max-w-sm">
              {/* Mancha orgánica: se asoma arriba y a la izquierda del peluche */}
              <div
                className="absolute left-0 top-[2%] h-[88%] w-[88%] bg-pelumi-teal/45 animate-float-slow"
                style={{ borderRadius: "58% 42% 47% 53% / 48% 52% 48% 52%" }}
                aria-hidden="true"
              />
              {/* Detalles decorativos */}
              <HeartDoodle
                className="absolute -left-1 top-4 z-20 animate-bounce-soft sm:left-2"
                color="#EF2A93"
                size={26}
              />
              <Sparkle
                className="absolute right-10 top-1 z-20 animate-bounce-soft"
                color="#F9C719"
                size={26}
              />
              <svg
                className="absolute -right-1 top-16 z-20 animate-float"
                width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true"
              >
                <path d="M6 12c4 2 7 2 11 0M4 20c4 2 7 2 11 0" stroke="#2FA6A9" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <svg
                className="absolute -left-2 bottom-10 z-20 animate-float-slow"
                width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true"
              >
                <path d="M5 8c3 3 3 6 0 9M12 6c3 3 3 6 0 9" stroke="#2FA6A9" strokeWidth="3" strokeLinecap="round" />
              </svg>

              {/* Foto del peluche */}
              {heroProduct?.images[0] ? (
                <Link
                  href={`/catalogo/${heroProduct.slug}`}
                  className="group relative z-10 block"
                  aria-label={heroProduct.name}
                >
                  <div
                    className="relative ml-auto mt-[10%] aspect-square w-[80%] overflow-hidden border-[6px] border-white bg-white shadow-xl shadow-pelumi-teal/25 transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ borderRadius: "52% 48% 46% 54% / 50% 46% 54% 50%" }}
                  >
                    <Image
                      src={heroProduct.images[0]}
                      alt={heroProduct.name}
                      fill
                      sizes="(min-width: 768px) 384px, 90vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                </Link>
              ) : (
                <div className="relative z-10 flex justify-center py-10">
                  <Image
                    src="/brand/pelumi-wordmark.png"
                    alt="Pelumi"
                    width={420}
                    height={255}
                    className="h-auto w-64"
                    priority
                  />
                </div>
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Recién llegados ──────────────────────────────────── */}
      {newest.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <Reveal>
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-pelumi-pink">
                  <Sparkle color="#EF2A93" size={16} />
                  Lo más nuevo
                </p>
                <h2 className="font-heading mt-1 text-3xl text-pelumi-ink sm:text-[2.1rem]">
                  Recién llegados
                </h2>
              </div>
              <Link
                href="/catalogo"
                className="flex shrink-0 items-center gap-1.5 rounded-full bg-pelumi-yellow-light px-5 py-2.5 text-sm font-bold text-pelumi-ink transition-all hover:bg-pelumi-yellow"
              >
                Ver todos
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {newest.map((product, i) => (
              <Reveal key={product.id} delay={i * 80}>
                <ProductCard product={product} badge="Nuevo" />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── Franja de confianza ──────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="grid grid-cols-2 gap-y-7 rounded-[2rem] bg-pelumi-cream-light px-6 py-8 sm:px-8 lg:grid-cols-4">
            {TRUST.map((item, i) => (
              <div
                key={item.title}
                className={`flex flex-col items-center px-2 text-center lg:px-4 ${
                  i > 0 ? "lg:border-l lg:border-pelumi-cream" : ""
                } ${i === 1 || i === 3 ? "border-l border-pelumi-cream lg:border-l" : ""}`}
              >
                <span className={item.color}>{item.icon}</span>
                <p className="font-heading mt-2 text-sm text-pelumi-ink">{item.title}</p>
                <p className="mt-0.5 text-xs leading-snug text-pelumi-ink/60">{item.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Nuestros favoritos ───────────────────────────────── */}
      {favorites.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <div className="relative flex flex-col items-center text-center">
              {/* Adornos laterales del título */}
              <HeartDoodle
                className="absolute left-[8%] top-1 hidden animate-bounce-soft sm:block lg:left-[20%]"
                color="#EF2A93"
                size={22}
              />
              <svg
                className="absolute right-[8%] top-2 hidden animate-float sm:block lg:right-[20%]"
                width="34" height="30" viewBox="0 0 34 30" fill="none" aria-hidden="true"
              >
                <path d="M4 8c4 3 8 3 12 0M4 18c4 3 8 3 12 0" stroke="#2FA6A9" strokeWidth="3" strokeLinecap="round" />
              </svg>

              <p className="text-xs font-extrabold uppercase tracking-widest text-pelumi-blue-dark">
                Los consentidos
              </p>
              <h2 className="font-heading mt-1 text-3xl text-pelumi-ink sm:text-[2.1rem]">
                Nuestros favoritos
              </h2>
              <svg className="mt-1.5 w-36 sm:w-44" viewBox="0 0 200 14" fill="none" aria-hidden="true">
                <path d="M4 10C55 3 145 3 196 8" stroke="#F9C719" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 lg:grid-cols-4">
            {favorites.map((product, i) => (
              <Reveal key={product.id} delay={i * 90}>
                <FavoriteCircleCard product={product} index={i} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── Eslogan ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-pelumi-blue-light py-7">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-4 px-4 sm:px-6">
          <BearOutline className="hidden shrink-0 text-pelumi-teal sm:block" size={44} />
          <p className="text-center font-heading text-lg text-pelumi-ink sm:text-2xl">
            Más que peluches, <span className="text-pelumi-pink">creamos compañía</span>
          </p>
          <Sparkle className="hidden shrink-0 animate-bounce-soft sm:block" color="#F9C719" size={26} />
        </div>
      </section>

      {/* ── Mayoreo ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-pelumi-teal px-6 py-11 text-center sm:px-12 sm:text-left">
            <Sparkle className="absolute right-10 top-7 animate-bounce-soft" color="#F7E8D4" size={28} />
            <HeartDoodle className="absolute left-8 bottom-7 opacity-60 animate-float" color="#F7E8D4" size={24} />

            <div className="relative flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="max-w-lg">
                <h2 className="font-heading text-2xl text-white sm:text-3xl">
                  ¿Tienes una tienda? Distribuimos al por mayor
                </h2>
                <p className="mt-2.5 text-white/90">
                  Somos fabricantes directos: mejores precios, catálogo variado y
                  acompañamiento cercano para tiendas y distribuidores.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3">
                <Link
                  href="/mayoreo"
                  className="rounded-full bg-white px-7 py-3.5 text-center font-heading text-pelumi-blue-dark shadow-lg transition-transform hover:scale-105"
                >
                  Conocer el mayoreo
                </Link>
                <TrackedWhatsAppLink
                  href={buildWholesaleWhatsAppLink()}
                  event="whatsapp_wholesale"
                  className="rounded-full bg-pelumi-yellow px-7 py-3.5 text-center font-heading text-pelumi-ink shadow-lg transition-transform hover:scale-105"
                >
                  Hablar por WhatsApp
                </TrackedWhatsAppLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
