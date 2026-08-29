"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Product, StockStatus, STOCK_LABELS } from "@/lib/types";
import { formatPrice } from "@/lib/format";

const STOCK_STYLES: Record<StockStatus, { active: string; idle: string }> = {
  available: {
    active: "bg-pelumi-blue-dark text-white",
    idle: "text-pelumi-ink/50 hover:bg-pelumi-blue-light",
  },
  low: {
    active: "bg-pelumi-yellow text-pelumi-ink",
    idle: "text-pelumi-ink/50 hover:bg-pelumi-yellow-light",
  },
  out: {
    active: "bg-pelumi-ink/80 text-white",
    idle: "text-pelumi-ink/50 hover:bg-pelumi-ink/10",
  },
};

export default function ProductAdminList({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.reference.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [products, query]);

  async function patchProduct(product: Product, fields: Record<string, string>) {
    setBusyId(product.id);
    const form = new FormData();
    Object.entries(fields).forEach(([k, v]) => form.set(k, v));
    const res = await fetch(`/api/admin/products/${product.id}`, { method: "PATCH", body: form });
    if (res.ok) {
      const { product: updated } = await res.json();
      setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    }
    setBusyId(null);
  }

  async function handleDelete(product: Product) {
    if (!confirm(`¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`)) return;
    setBusyId(product.id);
    const res = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    }
    setBusyId(null);
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl text-pelumi-ink">Catálogo</h1>
          <p className="text-sm text-pelumi-ink/60">
            {filtered.length === products.length
              ? `${products.length} peluches registrados`
              : `${filtered.length} de ${products.length} peluches`}
          </p>
        </div>
        <Link
          href="/admin/nuevo"
          className="shrink-0 rounded-full bg-pelumi-pink px-5 py-2.5 text-center text-sm font-heading text-white shadow-md shadow-pelumi-pink/30 transition-transform hover:scale-105"
        >
          + Nuevo producto
        </Link>
      </div>

      {/* Buscador */}
      <div className="mt-5 flex items-center gap-2 rounded-full border-2 border-pelumi-blue-light bg-white px-4 py-2.5 shadow-sm transition-colors focus-within:border-pelumi-teal sm:max-w-md">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-pelumi-ink/40">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre o referencia..."
          className="w-full bg-transparent text-sm text-pelumi-ink outline-none placeholder:text-pelumi-ink/40"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="shrink-0 text-pelumi-ink/40 hover:text-pelumi-ink"
            aria-label="Limpiar búsqueda"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <div className="mt-10 rounded-3xl border-2 border-dashed border-pelumi-blue-light bg-white p-10 text-center text-pelumi-ink/60">
          Todavía no hay productos. Crea el primero con &quot;Nuevo producto&quot;.
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-10 rounded-3xl border-2 border-dashed border-pelumi-blue-light bg-white p-10 text-center text-pelumi-ink/60">
          No hay resultados para &quot;{query}&quot;.
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="flex flex-col gap-4 rounded-2xl border border-pelumi-blue-light bg-white p-4 lg:flex-row lg:items-center"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-pelumi-blue-light">
                {product.images[0] && (
                  <Image src={product.images[0]} alt={product.name} fill sizes="80px" className="object-cover" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-heading text-pelumi-ink">{product.name}</p>
                  {product.reference && (
                    <span className="rounded-full bg-pelumi-blue-light px-2.5 py-0.5 text-xs font-bold text-pelumi-blue-dark">
                      Ref. {product.reference}
                    </span>
                  )}
                </div>
                <p className="text-sm text-pelumi-ink/60">{formatPrice(product.price)}</p>

                {/* Selector de disponibilidad */}
                <div className="mt-2 inline-flex rounded-full border border-pelumi-blue-light p-0.5">
                  {(Object.keys(STOCK_LABELS) as StockStatus[]).map((status) => (
                    <button
                      key={status}
                      type="button"
                      disabled={busyId === product.id}
                      onClick={() => {
                        if (product.stock !== status) patchProduct(product, { stock: status });
                      }}
                      className={`rounded-full px-3 py-1 text-xs font-bold transition-colors disabled:opacity-50 ${
                        product.stock === status
                          ? STOCK_STYLES[status].active
                          : STOCK_STYLES[status].idle
                      }`}
                    >
                      {STOCK_LABELS[status]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={busyId === product.id}
                  onClick={() => patchProduct(product, { favorite: String(!product.favorite) })}
                  className={`rounded-full border px-3 py-2 text-sm font-semibold transition-colors disabled:opacity-50 ${
                    product.favorite
                      ? "border-pelumi-pink bg-pelumi-pink-light text-pelumi-pink-dark"
                      : "border-pelumi-ink/15 text-pelumi-ink/60 hover:border-pelumi-pink"
                  }`}
                  title="Mostrar en Inicio como favorito"
                >
                  {product.favorite ? "♥ Favorito" : "♡ Marcar favorito"}
                </button>
                <Link
                  href={`/admin/${product.id}/editar`}
                  className="rounded-full border border-pelumi-ink/15 px-3 py-2 text-sm font-semibold text-pelumi-ink/70 hover:bg-pelumi-ink/5"
                >
                  Editar
                </Link>
                <button
                  type="button"
                  disabled={busyId === product.id}
                  onClick={() => handleDelete(product)}
                  className="rounded-full border border-red-200 px-3 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 disabled:opacity-50"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
