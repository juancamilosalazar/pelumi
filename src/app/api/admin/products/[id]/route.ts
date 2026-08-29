import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/session";
import { deleteProduct, removeProductImage, updateProduct } from "@/lib/products";
import { StockStatus } from "@/lib/types";

const STOCK_VALUES: StockStatus[] = ["available", "low", "out"];

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { id } = await params;
  const form = await request.formData();

  const name = form.has("name") ? String(form.get("name")).trim() : undefined;
  const description = form.has("description")
    ? String(form.get("description")).trim()
    : undefined;
  const priceRaw = form.has("price") ? String(form.get("price")) : undefined;
  const favoriteRaw = form.has("favorite") ? String(form.get("favorite")) : undefined;
  const reference = form.has("reference") ? String(form.get("reference")).trim() : undefined;
  const stockRaw = form.has("stock") ? String(form.get("stock")) : undefined;
  const newImages = form.getAll("images").filter((v): v is File => v instanceof File);
  const removeImages = form.getAll("removeImages").map((v) => String(v));

  let price: number | undefined;
  if (priceRaw !== undefined) {
    price = Number(priceRaw);
    if (!Number.isFinite(price) || price < 0) {
      return NextResponse.json({ error: "El precio no es válido" }, { status: 400 });
    }
  }

  let stock: StockStatus | undefined;
  if (stockRaw !== undefined) {
    if (!STOCK_VALUES.includes(stockRaw as StockStatus)) {
      return NextResponse.json({ error: "Estado de stock no válido" }, { status: 400 });
    }
    stock = stockRaw as StockStatus;
  }

  try {
    for (const imagePath of removeImages) {
      await removeProductImage(id, imagePath);
    }

    const product = await updateProduct(
      id,
      {
        ...(name !== undefined ? { name } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(price !== undefined ? { price } : {}),
        ...(reference !== undefined ? { reference } : {}),
        ...(stock !== undefined ? { stock } : {}),
        ...(favoriteRaw !== undefined ? { favorite: favoriteRaw === "true" } : {}),
      },
      newImages
    );

    if (!product) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch (err) {
    const message = err instanceof Error ? err.message : "No se pudo actualizar el producto";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { id } = await params;
  await deleteProduct(id);
  return NextResponse.json({ ok: true });
}
