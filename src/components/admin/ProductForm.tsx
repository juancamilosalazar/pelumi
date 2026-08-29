"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Product } from "@/lib/types";

export default function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const isEdit = Boolean(product);

  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [reference, setReference] = useState(product?.reference ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [existingImages, setExistingImages] = useState(product?.images ?? []);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleFiles(fileList: FileList | null) {
    if (!fileList) return;
    setNewFiles((prev) => [...prev, ...Array.from(fileList)]);
  }

  function removeNewFile(index: number) {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function markImageForRemoval(path: string) {
    setExistingImages((prev) => prev.filter((p) => p !== path));
    setRemovedImages((prev) => [...prev, path]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("El nombre es obligatorio");
      return;
    }
    const priceNumber = Number(price);
    if (!Number.isFinite(priceNumber) || priceNumber < 0) {
      setError("Ingresa un precio válido");
      return;
    }

    const form = new FormData();
    form.set("name", name);
    form.set("price", price);
    form.set("reference", reference);
    form.set("description", description);
    newFiles.forEach((file) => form.append("images", file));
    removedImages.forEach((path) => form.append("removeImages", path));

    setSubmitting(true);
    try {
      const res = await fetch(
        isEdit ? `/api/admin/products/${product!.id}` : "/api/admin/products",
        { method: isEdit ? "PATCH" : "POST", body: form }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Ocurrió un error, intenta de nuevo");
        setSubmitting(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("No se pudo conectar con el servidor");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && (
        <p className="rounded-xl bg-pelumi-pink-light px-4 py-2.5 text-sm text-pelumi-pink-dark">
          {error}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-pelumi-ink">
          Nombre del peluche
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Ej: Oso Cariñoso Grande"
            className="rounded-xl border border-pelumi-blue-light px-4 py-2.5 font-normal outline-none focus:border-pelumi-blue"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-pelumi-ink">
          Precio (COP)
          <input
            type="number"
            min={0}
            step={100}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Ej: 45000"
            className="rounded-xl border border-pelumi-blue-light px-4 py-2.5 font-normal outline-none focus:border-pelumi-blue"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-semibold text-pelumi-ink">
        Referencia interna
        <input
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          placeholder="Ej: P546"
          className="rounded-xl border border-pelumi-blue-light px-4 py-2.5 font-normal outline-none focus:border-pelumi-blue sm:max-w-xs"
        />
        <span className="text-xs font-normal text-pelumi-ink/50">
          No se muestra en el catálogo público; llega junto al pedido de WhatsApp para
          identificar el producto.
        </span>
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-semibold text-pelumi-ink">
        Descripción
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          placeholder="Tamaño, material, para qué ocasión es ideal..."
          className="rounded-xl border border-pelumi-blue-light px-4 py-2.5 font-normal outline-none focus:border-pelumi-blue"
        />
      </label>

      <div>
        <p className="text-sm font-semibold text-pelumi-ink">Imágenes</p>

        {existingImages.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {existingImages.map((img) => (
              <div key={img} className="relative h-24 w-24 overflow-hidden rounded-xl border border-pelumi-blue-light">
                <Image src={img} alt="" fill sizes="96px" className="object-cover" />
                <button
                  type="button"
                  onClick={() => markImageForRemoval(img)}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-red-500 shadow"
                  aria-label="Quitar imagen"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {newFiles.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {newFiles.map((file, i) => (
              <div key={i} className="relative h-24 w-24 overflow-hidden rounded-xl border border-pelumi-yellow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={URL.createObjectURL(file)} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeNewFile(i)}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-red-500 shadow"
                  aria-label="Quitar imagen"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <label className="mt-3 flex w-fit cursor-pointer items-center gap-2 rounded-xl border-2 border-dashed border-pelumi-blue-light px-4 py-3 text-sm font-semibold text-pelumi-blue-dark hover:bg-pelumi-blue-light/30">
          + Agregar imágenes
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
        <p className="mt-1 text-xs text-pelumi-ink/50">JPG, PNG o WEBP, hasta 5MB cada una.</p>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-pelumi-pink px-6 py-3 font-heading text-white shadow-md shadow-pelumi-pink/30 transition-transform hover:scale-105 disabled:opacity-60"
        >
          {submitting ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear producto"}
        </button>
      </div>
    </form>
  );
}
