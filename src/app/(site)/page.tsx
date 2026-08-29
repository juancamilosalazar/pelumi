import Link from "next/link";
import Image from "next/image";
import { getAllProducts, getFeaturedProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ProductRow from "@/components/ProductRow";
import FavoritesCarousel from "@/components/FavoritesCarousel";
import CloudDivider from "@/components/CloudDivider";
import Reveal from "@/components/Reveal";
import {
  Spiral,
  Squiggle,
  Thread,
  Dot,
  Ribbon,
  BearHead,
  HeartDoodle,
  YarnBall,
  Sparkle,
  CloudShape,
} from "@/components/Doodles";
import { BearFaceIcon, ThreadSpoolIcon, SmileChatIcon } from "@/components/EssenceIcons";
import TrackedWhatsAppLink from "@/components/track/TrackedWhatsAppLink";
import { Stagger, StaggerItem, FadeUp } from "@/components/motion";
import { buildWhatsAppLink, buildWholesaleWhatsAppLink } from "@/lib/whatsapp";

export const revalidate = 0;

const TICKER_PHRASES = [
  "Suaves como el algodón",
  "Fabricantes directos",
  "Pedidos por WhatsApp",
  "Hechos para acompañar",
  "Venta al por mayor",
];

export default async function HomePage() {
  const [favorites, all] = await Promise.all([getFeaturedProducts(8), getAllProducts()]);
  const newest = all.slice(0, 10);
  const ticker = [...TICKER_PHRASES, ...TICKER_PHRASES, ...TICKER_PHRASES];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-cloud-soft">
        {/* Amiguitos y confeti flotante de marca */}
        <CloudShape className="absolute -left-6 top-8 opacity-70 animate-float-slow" color="#EAF7F7" size={150} />
        <BearHead className="absolute left-[6%] top-24 opacity-25 -rotate-12 animate-float" color="#80D1D3" size={58} />
        <Spiral className="absolute left-[16%] top-14 animate-float-slow" color="#F9C719" size={44} />
        <Thread className="absolute left-[10%] bottom-20 animate-float" color="#EF2A93" size={56} />
        <HeartDoodle className="absolute right-[14%] top-16 opacity-60 animate-bounce-soft" color="#EF2A93" size={22} />
        <Squiggle className="absolute right-[5%] top-32 animate-float" color="#F03843" size={38} />
        <Sparkle className="absolute left-[44%] top-10 animate-bounce-soft" color="#F9C719" size={20} />
        <Ribbon className="absolute -right-2 bottom-16 rotate-45 opacity-70 animate-float-slow" color="#F9C719" size={70} />

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
          <Stagger className="relative z-10 min-w-0 text-center md:text-left" gap={0.12}>
            <StaggerItem>
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-pelumi-yellow bg-white px-4 py-1.5 text-sm font-bold text-pelumi-ink shadow-sm">
                🧵 Fabricantes directos de peluches
              </span>
            </StaggerItem>
            <StaggerItem>
              <h1 className="font-heading mt-5 text-4xl leading-[1.1] text-pelumi-ink sm:text-6xl">
                Peluches suaves
                <span className="relative mt-1 block text-pelumi-pink">
                  como el algodón
                  <svg
                    className="absolute -bottom-2 left-1/2 w-44 -translate-x-1/2 sm:w-64 md:left-0 md:translate-x-0"
                    viewBox="0 0 200 12" fill="none" aria-hidden="true"
                  >
                    <path d="M3 9C50 3 150 3 197 8" stroke="#F9C719" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-pelumi-ink/70 md:mx-0">
                En Pelumi hacemos compañía en forma de ternura. Arma tu pedido con
                el carrito y recíbelo coordinando directo por WhatsApp, sin vueltas.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
                <Link
                  href="/catalogo"
                  className="rounded-full bg-pelumi-pink px-7 py-3.5 text-center font-heading text-white shadow-lg shadow-pelumi-pink/30 transition-transform hover:scale-105 active:scale-95"
                >
                  Explorar catálogo
                </Link>
                <TrackedWhatsAppLink
                  href={buildWhatsAppLink()}
                  event="whatsapp_general"
                  className="rounded-full border-2 border-pelumi-teal bg-white/70 px-7 py-3.5 text-center font-heading text-pelumi-blue-dark transition-all hover:bg-pelumi-teal hover:text-white"
                >
                  Escríbenos por WhatsApp
                </TrackedWhatsAppLink>
              </div>
            </StaggerItem>
          </Stagger>

          <FadeUp delay={250} className="relative z-10 flex min-w-0 justify-center">
            {favorites.some((p) => p.images[0]) ? (
              <FavoritesCarousel products={favorites} />
            ) : (
              <div className="relative rounded-[2.5rem] bg-white p-8 shadow-xl shadow-pelumi-teal/15 animate-float">
                <Image
                  src="/brand/pelumi-wordmark.png"
                  alt="Pelumi"
                  width={420}
                  height={255}
                  className="h-auto w-64 sm:w-80"
                  priority
                />
              </div>
            )}
          </FadeUp>
        </div>
      </section>

      {/* ── Cinta de frases en movimiento ────────────────────── */}
      <div className="overflow-hidden border-y-2 border-pelumi-cream bg-pelumi-cream-light py-3">
        <div className="ticker-track flex w-max items-center gap-8" style={{ animationDuration: "30s" }}>
          {ticker.map((phrase, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap font-heading text-lg text-pelumi-ink/80">
              {phrase}
              <span className={i % 3 === 0 ? "text-pelumi-pink" : i % 3 === 1 ? "text-pelumi-yellow-dark" : "text-pelumi-blue-dark"} aria-hidden="true">
                ✿
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Recién llegados ──────────────────────────────────── */}
      {newest.length > 0 && (
        <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <YarnBall className="absolute right-[3%] top-8 opacity-50 animate-float-slow" color="#F9C719" size={44} />
          <Sparkle className="absolute left-[2%] top-24 opacity-70 animate-bounce-soft" color="#EF2A93" size={16} />
          <Reveal>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <span className="text-sm font-extrabold uppercase tracking-widest text-pelumi-blue-dark">
                  Lo más nuevo
                </span>
                <h2 className="font-heading mt-1 text-3xl text-pelumi-ink sm:text-4xl">
                  Recién llegados
                </h2>
              </div>
              <Link
                href="/catalogo"
                className="hidden shrink-0 rounded-full border-2 border-pelumi-pink px-5 py-2.5 text-sm font-heading text-pelumi-pink transition-all hover:bg-pelumi-pink hover:text-white sm:block"
              >
                Ver todo →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ProductRow products={newest} />
          </Reveal>
        </section>
      )}

      {/* ── Favoritos ────────────────────────────────────────── */}
      <section className="relative">
        <CloudDivider color="#eaf7f7" />
        <div className="relative bg-pelumi-blue-light">
          <Spiral className="absolute right-[5%] top-14 opacity-60 animate-float" color="#EF2A93" size={44} />
          <Squiggle className="absolute left-[6%] bottom-20 opacity-60 animate-float-slow" color="#F03843" size={36} />
          <BearHead className="absolute left-[3%] top-16 opacity-20 rotate-6 animate-float-slow" color="#2FA6A9" size={64} />
          <HeartDoodle className="absolute right-[10%] bottom-14 opacity-50 animate-bounce-soft" color="#EF2A93" size={20} />

          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <Reveal>
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="text-sm font-extrabold uppercase tracking-widest text-pelumi-pink">
                  Los consentidos
                </span>
                <h2 className="font-heading text-3xl text-pelumi-ink sm:text-4xl">Nuestros favoritos</h2>
                <p className="max-w-lg text-sm text-pelumi-ink/70">
                  Una selección de los peluches que más enamoran, elegida a mano por nuestro equipo.
                </p>
              </div>
            </Reveal>

            {favorites.length > 0 ? (
              <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
                {favorites.map((product, i) => (
                  <Reveal key={product.id} delay={i * 70}>
                    <ProductCard product={product} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="mt-10 rounded-[2rem] border-2 border-dashed border-pelumi-teal/40 bg-white/60 p-10 text-center text-pelumi-ink/60">
                Pronto vas a ver aquí nuestros peluches favoritos. Mientras tanto, explora el
                catálogo completo.
              </div>
            )}

            <div className="mt-12 text-center">
              <Link
                href="/catalogo"
                className="inline-block rounded-full bg-pelumi-pink px-8 py-3.5 font-heading text-white shadow-lg shadow-pelumi-pink/30 transition-transform hover:scale-105"
              >
                Ver todo el catálogo
              </Link>
            </div>
          </div>
        </div>
        <CloudDivider color="#eaf7f7" flip className="bg-white" />
      </section>

      {/* ── Por qué Pelumi ───────────────────────────────────── */}
      <section className="relative mx-auto max-w-6xl overflow-hidden px-4 py-16 sm:px-6">
        <Dot className="absolute right-[12%] top-10 animate-bounce-soft" color="#EF2A93" size={13} />
        <Thread className="absolute left-[3%] bottom-24 opacity-70 animate-float-slow" color="#F9C719" size={58} />
        <Spiral className="absolute right-[4%] bottom-16 opacity-60 animate-float" color="#80D1D3" size={44} />

        <Reveal>
          <div className="text-center">
            <span className="block text-sm font-extrabold uppercase tracking-widest text-pelumi-blue-dark">
              La esencia Pelumi
            </span>
            <h2 className="font-heading relative mt-1 inline-block text-3xl text-pelumi-ink sm:text-4xl">
              Ternura hecha peluche
              {/* la sonrisa del logo como subrayado */}
              <svg
                className="mx-auto mt-1 block w-28 sm:w-36"
                viewBox="0 0 120 26"
                fill="none"
                aria-hidden="true"
              >
                <path d="M8 5 q52 30 104 0" stroke="#F9C719" strokeWidth="7" strokeLinecap="round" />
              </svg>
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-3">
          {[
            {
              icon: <BearFaceIcon />,
              title: "Calidad algodón",
              text: "Materiales suaves y seguros, pensados para abrazar todos los días.",
              tilt: "sm:-rotate-2",
              border: "border-pelumi-teal/50",
              blob: "bg-pelumi-blue-light",
              shadow: "hover:shadow-pelumi-teal/25",
            },
            {
              icon: <ThreadSpoolIcon />,
              title: "Fabricantes directos",
              text: "Cosemos y distribuimos nuestros propios peluches, sin intermediarios.",
              tilt: "sm:rotate-1 sm:translate-y-3",
              border: "border-pelumi-yellow/60",
              blob: "bg-pelumi-yellow-light",
              shadow: "hover:shadow-pelumi-yellow/30",
            },
            {
              icon: <SmileChatIcon />,
              title: "Pedidos por WhatsApp",
              text: "Arma tu carrito y envíanos el pedido completo con un solo clic.",
              tilt: "sm:-rotate-1",
              border: "border-pelumi-pink/40",
              blob: "bg-pelumi-pink-light",
              shadow: "hover:shadow-pelumi-pink/20",
            },
          ].map((card, i) => (
            <Reveal key={card.title} delay={i * 120}>
              <div
                className={`group relative rounded-[2.5rem] border-[3px] border-dashed bg-white px-7 pb-8 pt-14 text-center shadow-lg shadow-pelumi-blue-light/60 transition-all duration-300 hover:-translate-y-2 hover:rotate-0 hover:border-solid hover:shadow-2xl ${card.tilt} ${card.border} ${card.shadow}`}
              >
                {/* icono que se asoma por el borde superior */}
                <div className="absolute -top-11 left-1/2 -translate-x-1/2">
                  <div
                    className={`relative flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full border-[3px] border-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${card.blob} animate-bounce-soft`}
                    style={{ animationDelay: `${i * 0.4}s` }}
                  >
                    {card.icon}
                  </div>
                </div>

                <h3 className="font-heading text-xl text-pelumi-ink">{card.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-pelumi-ink/70">{card.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-14 text-center">
            <Link
              href="/catalogo"
              className="group inline-flex items-center gap-3 rounded-full border-[3px] border-white bg-pelumi-pink px-9 py-4 font-heading text-lg text-white shadow-xl shadow-pelumi-pink/35 outline outline-2 outline-pelumi-pink-light transition-all duration-300 hover:-rotate-1 hover:scale-105 hover:bg-pelumi-pink-dark active:scale-95"
            >
              <span className="text-xl transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-125" aria-hidden="true">
                🧸
              </span>
              Descubre por qué enamoran
              <svg
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"
                className="transition-transform duration-300 group-hover:translate-x-1.5"
                aria-hidden="true"
              >
                <path d="M4 12h15m0 0-6-6m6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── Mayoreo ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-pelumi-teal px-6 py-12 text-center sm:px-12 sm:text-left">
            <Spiral className="absolute right-8 top-6 opacity-50 animate-float" color="#F7E8D4" size={48} />
            <Squiggle className="absolute left-8 bottom-6 opacity-50" color="#EF2A93" size={38} />
            <Dot className="absolute left-[45%] top-8 opacity-60 animate-bounce-soft" color="#F9C719" size={14} />

            <div className="relative flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="max-w-lg">
                <h2 className="font-heading text-3xl text-white sm:text-4xl">
                  ¿Tienes una tienda? Distribuimos al por mayor
                </h2>
                <p className="mt-3 text-white/90">
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
