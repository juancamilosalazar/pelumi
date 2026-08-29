"use client";

import { useMemo, useState } from "react";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { formatPrice } from "@/lib/format";

type SortKey = "newest" | "price-asc" | "price-desc" | "name";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Novedades" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "name", label: "Nombre A–Z" },
];

/** Redondea a un número "bonito" para mostrar en los rangos de precio. */
function niceRound(value: number): number {
  if (value >= 100000) return Math.round(value / 10000) * 10000;
  if (value >= 20000) return Math.round(value / 5000) * 5000;
  return Math.round(value / 1000) * 1000;
}

export default function CatalogExplorer({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [priceRange, setPriceRange] = useState<number>(-1); // -1 = todos

  // Rangos de precio calculados a partir del catálogo real (terciles redondeados)
  const ranges = useMemo(() => {
    const prices = products.map((p) => p.price).sort((a, b) => a - b);
    if (prices.length < 4) return [];
    const p1 = niceRound(prices[Math.floor(prices.length / 3)]);
    const p2 = niceRound(prices[Math.floor((prices.length * 2) / 3)]);
    if (p1 <= 0 || p2 <= p1) return [];
    return [
      { label: `Hasta ${formatPrice(p1)}`, test: (v: number) => v <= p1 },
      { label: `${formatPrice(p1)} – ${formatPrice(p2)}`, test: (v: number) => v > p1 && v <= p2 },
      { label: `Más de ${formatPrice(p2)}`, test: (v: number) => v > p2 },
    ];
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products;

    if (q) {
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    if (priceRange >= 0 && ranges[priceRange]) {
      list = list.filter((p) => ranges[priceRange].test(p.price));
    }

    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name, "es"));
        break;
      case "newest":
      default:
        sorted.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
    return sorted;
  }, [products, query, sort, priceRange, ranges]);

  return (
    <div>
      {/* Barra de herramientas: buscar + ordenar */}
      <div className="mx-auto mb-5 flex max-w-3xl flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-full border-2 border-pelumi-blue-light bg-white px-4 py-2.5 shadow-sm transition-colors focus-within:border-pelumi-teal">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-pelumi-ink/40">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar un peluche..."
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

        <label className="relative flex items-center">
          <span className="sr-only">Ordenar por</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="w-full cursor-pointer appearance-none rounded-full border-2 border-pelumi-blue-light bg-white py-2.5 pl-4 pr-10 text-sm font-bold text-pelumi-ink shadow-sm outline-none transition-colors hover:border-pelumi-teal focus:border-pelumi-teal sm:w-auto"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"
            className="pointer-events-none absolute right-4 text-pelumi-ink/50"
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </label>
      </div>

      {/* Filtros de rango de precio */}
      {ranges.length > 0 && (
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPriceRange(-1)}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
              priceRange === -1
                ? "bg-pelumi-teal text-white shadow-md shadow-pelumi-teal/30"
                : "bg-pelumi-blue-light text-pelumi-ink hover:bg-pelumi-teal/30"
            }`}
          >
            Todos los precios
          </button>
          {ranges.map((r, i) => (
            <button
              key={r.label}
              type="button"
              onClick={() => setPriceRange(priceRange === i ? -1 : i)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                priceRange === i
                  ? "bg-pelumi-teal text-white shadow-md shadow-pelumi-teal/30"
                  : "bg-pelumi-blue-light text-pelumi-ink hover:bg-pelumi-teal/30"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      )}

      {/* Resultado */}
      {filtered.length > 0 ? (
        <>
          <p className="mb-5 text-center text-xs font-semibold text-pelumi-ink/50">
            {filtered.length} {filtered.length === 1 ? "peluche" : "peluches"}
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-[2rem] border-2 border-dashed border-pelumi-blue-light bg-pelumi-blue-light/30 p-12 text-center">
          <span className="text-4xl" aria-hidden="true">🧸</span>
          <p className="mt-3 font-heading text-lg text-pelumi-ink">
            {products.length === 0
              ? "Muy pronto vas a ver aquí todo nuestro catálogo"
              : "No encontramos peluches con esos filtros"}
          </p>
          {products.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setPriceRange(-1);
              }}
              className="mt-4 rounded-full bg-pelumi-pink px-5 py-2.5 text-sm font-heading text-white shadow-md transition-transform hover:scale-105"
            >
              Quitar filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
}
