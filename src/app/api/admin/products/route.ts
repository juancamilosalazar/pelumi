import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/session";
import { createProduct, getAllProducts } from "@/lib/products";

export async function GET() {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const products = await getAllProducts();
  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const form = await request.formData();
  const name = String(form.get("name") ?? "").trim();
  const priceRaw = String(form.get("price") ?? "");
  const description = String(form.get("description") ?? "").trim();
  const reference = String(form.get("reference") ?? "").trim();
  const images = form.getAll("images").filter((v): v is File => v instanceof File);

  const price = Number(priceRaw);
  if (!name) {
    return NextResponse.json({ error: "El nombre es obligatorio" }, { status: 400 });
  }
  if (!Number.isFinite(price) || price < 0) {
    return NextResponse.json({ error: "El precio no es válido" }, { status: 400 });
  }

  try {
    const product = await createProduct({ name, price, description, reference }, images);
    return NextResponse.json({ product }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "No se pudo crear el producto";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
