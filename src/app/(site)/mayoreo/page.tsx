import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import CloudDivider from "@/components/CloudDivider";
import {
  Spiral,
  Squiggle,
  Thread,
  Dot,
  BearHead,
  HeartDoodle,
  YarnBall,
  Sparkle,
  CloudShape,
} from "@/components/Doodles";
import {
  BearFaceIcon,
  ThreadSpoolIcon,
  GiftBoxIcon,
  SmileChatIcon,
} from "@/components/EssenceIcons";
import { buildWholesaleWhatsAppLink } from "@/lib/whatsapp";
import TrackedWhatsAppLink from "@/components/track/TrackedWhatsAppLink";

export const metadata: Metadata = {
  title: "Venta al por mayor",
  description:
    "Pelumi es fabricante directo y distribuidor de peluches al por mayor. Contáctanos por WhatsApp para conocer precios y condiciones para tiendas y distribuidores.",
};

const REASONS = [
  {
    icon: <ThreadSpoolIcon />,
    title: "Fabricantes directos",
    text: "Cosemos nuestros propios peluches, así que ofrecemos mejores precios sin intermediarios.",
    tilt: "sm:-rotate-2",
    border: "border-pelumi-teal/50",
    blob: "bg-pelumi-blue-light",
    shadow: "hover:shadow-pelumi-teal/25",
  },
  {
    icon: <GiftBoxIcon />,
    title: "Distribución al por mayor",
    text: "Trabajamos con tiendas, papelerías, misceláneas y distribuidores en todo el país.",
    tilt: "sm:rotate-1",
    border: "border-pelumi-yellow/60",
    blob: "bg-pelumi-yellow-light",
    shadow: "hover:shadow-pelumi-yellow/30",
  },
  {
    icon: <BearFaceIcon />,
    title: "Catálogo variado",
    text: "Amplia variedad de peluches para todos los gustos y tamaños, ideales para reventa.",
    tilt: "sm:rotate-2",
    border: "border-pelumi-pink/40",
    blob: "bg-pelumi-pink-light",
    shadow: "hover:shadow-pelumi-pink/20",
  },
  {
    icon: <SmileChatIcon />,
    title: "Atención cercana",
    text: "Te acompañamos por WhatsApp para resolver dudas, precios y tiempos de entrega.",
    tilt: "sm:-rotate-1",
    border: "border-pelumi-teal/50",
    blob: "bg-pelumi-cream",
    shadow: "hover:shadow-pelumi-teal/25",
  },
];

const STEPS = [
  {
    n: 1,
    title: "Escríbenos",
    text: "Cuéntanos qué tipo de peluches y cantidades te interesan.",
    color: "bg-pelumi-pink",
    tilt: "sm:-rotate-1",
  },
  {
    n: 2,
    title: "Cotizamos",
    text: "Te enviamos precios al por mayor y referencias disponibles.",
    color: "bg-pelumi-yellow text-pelumi-ink",
    tilt: "sm:rotate-1 sm:translate-y-2",
  },
  {
    n: 3,
    title: "Coordinamos",
    text: "Confirmamos el pedido, forma de envío y de pago.",
    color: "bg-pelumi-teal",
    tilt: "sm:-rotate-1",
  },
];

export default function MayoreoPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Amiguitos flotantes de fondo */}
      <CloudShape className="absolute -left-8 top-10 opacity-70 animate-float-slow" color="#EAF7F7" size={150} />
      <CloudShape className="absolute right-[2%] top-64 opacity-60 animate-float" color="#FEF6DC" size={110} />
      <BearHead className="absolute left-[5%] top-40 opacity-20 -rotate-12 animate-float" color="#80D1D3" size={60} />
      <Spiral className="absolute right-[7%] top-24 opacity-70 animate-float" color="#F9C719" size={48} />
      <Thread className="absolute right-[12%] top-[30rem] opacity-50 animate-float-slow" color="#EF2A93" size={58} />
      <HeartDoodle className="absolute left-[12%] top-16 opacity-60 animate-bounce-soft" color="#EF2A93" size={20} />
      <YarnBall className="absolute left-[3%] top-[34rem] opacity-50 animate-float-slow" color="#F9C719" size={46} />
      <Sparkle className="absolute right-[28%] top-12 animate-bounce-soft" color="#80D1D3" size={18} />

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-pelumi-yellow bg-white px-4 py-1.5 text-sm font-bold text-pelumi-ink shadow-sm">
              🧸 Para tiendas y distribuidores
            </span>
            <h1 className="font-heading relative mt-5 inline-block w-full text-4xl text-pelumi-ink sm:text-6xl">
              Venta al por mayor
              {/* la sonrisa del logo como subrayado */}
              <svg
                className="mx-auto mt-1 block w-32 sm:w-44"
                viewBox="0 0 120 26"
                fill="none"
                aria-hidden="true"
              >
                <path d="M8 5 q52 30 104 0" stroke="#F9C719" strokeWidth="7" strokeLinecap="round" />
              </svg>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-pelumi-ink/70">
              Somos <strong className="text-pelumi-ink">fabricantes directos</strong> y{" "}
              <strong className="text-pelumi-ink">distribuidores al por mayor</strong> de
              peluches. Si tienes una tienda o quieres distribuir nuestros productos,
              escríbenos por WhatsApp y te contamos precios, referencias disponibles y
              condiciones de pedido.
            </p>
            <TrackedWhatsAppLink
              href={buildWholesaleWhatsAppLink()}
              event="whatsapp_wholesale"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border-[3px] border-white bg-[#25D366] px-9 py-4 font-heading text-lg text-white shadow-xl shadow-[#25D366]/35 outline outline-2 outline-[#25D366]/25 transition-all duration-300 hover:-rotate-1 hover:scale-105 active:scale-95"
            >
              <span className="text-xl transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-125" aria-hidden="true">
                💬
              </span>
              Hablemos de mayoreo
              <svg
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"
                className="transition-transform duration-300 group-hover:translate-x-1.5"
                aria-hidden="true"
              >
                <path d="M4 12h15m0 0-6-6m6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </TrackedWhatsAppLink>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-x-6 gap-y-14 sm:grid-cols-2">
          {REASONS.map((card, i) => (
            <Reveal key={card.title} delay={i * 100}>
              <div
                className={`group relative h-full rounded-[2.5rem] border-[3px] border-dashed bg-white px-7 pb-8 pt-14 text-center shadow-lg shadow-pelumi-blue-light/60 transition-all duration-300 hover:-translate-y-2 hover:rotate-0 hover:border-solid hover:shadow-2xl ${card.tilt} ${card.border} ${card.shadow}`}
              >
                <div className="absolute -top-11 left-1/2 -translate-x-1/2">
                  <div
                    className={`flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full border-[3px] border-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${card.blob} animate-bounce-soft`}
                    style={{ animationDelay: `${i * 0.35}s` }}
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
      </div>

      <div className="relative mt-8">
        <CloudDivider color="#eaf7f7" />
        <div className="relative bg-pelumi-blue-light pb-20">
          <Squiggle className="absolute right-[8%] top-12 opacity-60 animate-float" color="#F03843" size={34} />
          <BearHead className="absolute right-[3%] bottom-16 opacity-20 rotate-12 animate-float-slow" color="#2FA6A9" size={56} />
          <Dot className="absolute left-[8%] top-20 animate-bounce-soft" color="#EF2A93" size={13} />
          <Sparkle className="absolute left-[20%] bottom-10 opacity-70 animate-bounce-soft" color="#F9C719" size={18} />

          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <Reveal>
              <div className="pt-6 text-center">
                <h2 className="font-heading relative inline-block text-3xl text-pelumi-ink sm:text-4xl">
                  ¿Cómo funciona?
                  <svg
                    className="mx-auto mt-1 block w-24 sm:w-28"
                    viewBox="0 0 120 26"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M8 5 q52 30 104 0" stroke="#F9C719" strokeWidth="7" strokeLinecap="round" />
                  </svg>
                </h2>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-8 text-left sm:grid-cols-3">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 120}>
                  <div
                    className={`group relative h-full rounded-[2rem] bg-white p-7 pt-9 shadow-md transition-all duration-300 hover:-translate-y-2 hover:rotate-0 hover:shadow-xl ${s.tilt}`}
                  >
                    <span
                      className={`absolute -top-5 left-6 flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-white font-heading text-lg text-white shadow-md transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110 ${s.color}`}
                    >
                      {s.n}
                    </span>
                    <h3 className="font-heading text-lg text-pelumi-ink">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-pelumi-ink/70">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <p className="mt-12 text-center text-sm text-pelumi-ink/60">
                🕗 Te atendemos de 8:00 a.m. a 6:00 p.m.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
