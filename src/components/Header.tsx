"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Explorar catálogo" },
  { href: "/mayoreo", label: "Mayoreo" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-pelumi-blue-light bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
            <Image
              src="/brand/pelumi-wordmark.png"
              alt="Pelumi"
              width={160}
              height={97}
              className="h-12 w-auto sm:h-14"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                    active
                      ? "bg-pelumi-pink text-white shadow-md shadow-pelumi-pink/25"
                      : "text-pelumi-ink hover:bg-pelumi-blue-light hover:text-pelumi-blue-dark"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCart}
              className="relative flex h-11 w-11 items-center justify-center rounded-full bg-pelumi-yellow text-pelumi-ink shadow-md shadow-pelumi-yellow/30 transition-transform hover:scale-110 active:scale-95"
              aria-label={`Abrir carrito (${count} artículos)`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M6 8h12l1.2 12.2a1 1 0 0 1-1 1.1H5.8a1 1 0 0 1-1-1.1L6 8z" strokeLinejoin="round" />
                <path d="M9 10V6a3 3 0 0 1 6 0v4" strokeLinecap="round" />
              </svg>
              {count > 0 && (
                // key={count}: remonta el badge en cada cambio y re-dispara la animación
                <span
                  key={count}
                  className="absolute -right-1 -top-1 flex h-5 min-w-5 animate-pop-in items-center justify-center rounded-full bg-pelumi-pink px-1 text-[11px] font-extrabold text-white shadow-sm"
                >
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-pelumi-blue-light text-pelumi-ink transition-colors hover:bg-pelumi-blue-light md:hidden"
              aria-label="Abrir menú"
              aria-expanded={open}
            >
              {open ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {open && (
          <nav className="flex flex-col gap-1 border-t border-pelumi-blue-light bg-white px-4 pb-4 pt-2 md:hidden">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-bold ${
                    active ? "bg-pelumi-pink text-white" : "text-pelumi-ink hover:bg-pelumi-blue-light"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
