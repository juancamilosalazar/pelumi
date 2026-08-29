import Image from "next/image";
import Link from "next/link";
import CloudDivider from "@/components/CloudDivider";
import { Spiral, Thread, Dot } from "@/components/Doodles";

const instagram = process.env.NEXT_PUBLIC_INSTAGRAM ?? "distripeluches";
const address = process.env.NEXT_PUBLIC_ADDRESS ?? "";
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export default function Footer() {
  return (
    <footer className="mt-24">
      <CloudDivider color="#80d1d3" />
      <div className="relative overflow-hidden bg-pelumi-teal">
        <Spiral className="absolute left-[6%] top-10 opacity-40 animate-float-slow" color="#F9C719" size={54} />
        <Thread className="absolute right-[8%] top-16 opacity-40 animate-float" color="#EF2A93" size={64} />
        <Dot className="absolute left-[30%] bottom-10 opacity-30" color="#F7E8D4" size={16} />
        <Spiral className="absolute right-[28%] bottom-8 opacity-30 animate-float" color="#F7E8D4" size={40} />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-10 pt-6 sm:px-6 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Image
              src="/brand/pelumi-wordmark.png"
              alt="Pelumi"
              width={190}
              height={115}
              className="h-16 w-auto drop-shadow-sm"
            />
            <p className="mt-4 text-sm leading-relaxed text-white/95">
              Peluches suaves como el algodón, hechos para acompañar. Fabricantes
              directos y distribuidores al por mayor en Colombia.
            </p>
            <div className="mt-4 flex gap-2">
              <a
                href={`https://instagram.com/${instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Pelumi"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:scale-110 hover:bg-white hover:text-pelumi-pink"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1.3" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp de Pelumi"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:scale-110 hover:bg-white hover:text-[#25D366]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.462 3.478 1.34 4.985L2 22l5.117-1.334a9.96 9.96 0 0 0 4.887 1.28h.004c5.514 0 9.997-4.483 9.997-9.997 0-2.67-1.04-5.18-2.929-7.07a9.93 9.93 0 0 0-7.072-2.876zm0 18.174a8.15 8.15 0 0 1-4.152-1.137l-.298-.177-3.037.792.811-2.96-.194-.304a8.15 8.15 0 0 1-1.252-4.391c0-4.507 3.667-8.174 8.178-8.174a8.12 8.12 0 0 1 5.783 2.398 8.12 8.12 0 0 1 2.393 5.782c-.001 4.507-3.668 8.171-8.232 8.171z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <p className="font-heading text-white">Explora</p>
              <ul className="mt-3 space-y-2.5 text-white/85">
                <li><Link href="/" className="transition-colors hover:text-pelumi-yellow">Inicio</Link></li>
                <li><Link href="/catalogo" className="transition-colors hover:text-pelumi-yellow">Catálogo</Link></li>
                <li><Link href="/mayoreo" className="transition-colors hover:text-pelumi-yellow">Mayoreo</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-heading text-white">Contacto</p>
              <ul className="mt-3 space-y-2.5 text-white/85">
                {whatsappNumber && (
                  <li>
                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-pelumi-yellow"
                    >
                      WhatsApp
                    </a>
                  </li>
                )}
                <li>
                  <a
                    href={`https://instagram.com/${instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-pelumi-yellow"
                  >
                    @{instagram}
                  </a>
                </li>
                {address && <li className="text-white/70">{address}</li>}
                <li className="flex items-start gap-1.5 text-white/85">
                  <span aria-hidden="true">🕗</span>
                  <span>
                    Horario de atención
                    <span className="block text-white/70">8:00 a.m. – 6:00 p.m.</span>
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-heading text-white">Empresa</p>
              <ul className="mt-3 space-y-2.5 text-white/85">
                <li>
                  <Link href="/mayoreo" className="transition-colors hover:text-pelumi-yellow">
                    Distribución mayorista
                  </Link>
                </li>
                <li>
                  <Link href="/admin/login" className="text-white/50 transition-colors hover:text-white/80">
                    Administración
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/20 py-4 text-center text-xs text-white/75">
          © {new Date().getFullYear()} Pelumi® · Importado y distribuido por Distripeluches
        </div>
      </div>
    </footer>
  );
}
