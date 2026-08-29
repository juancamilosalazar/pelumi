"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/admin", label: "🧸 Catálogo" },
  { href: "/admin/metricas", label: "📊 Métricas" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 rounded-full border border-pelumi-blue-light bg-white p-1">
      {TABS.map((tab) => {
        const active =
          tab.href === "/admin"
            ? pathname === "/admin" || pathname.startsWith("/admin/nuevo") || pathname.includes("/editar")
            : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
              active
                ? "bg-pelumi-pink text-white shadow-sm"
                : "text-pelumi-ink/60 hover:bg-pelumi-blue-light hover:text-pelumi-ink"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
