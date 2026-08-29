import { notFound } from "next/navigation";
import { requireAdminPage } from "@/lib/session";
import { getProductById } from "@/lib/products";
import ProductForm from "@/components/admin/ProductForm";

type Params = { params: Promise<{ id: string }> };

export default async function EditarProductoPage({ params }: Params) {
  await requireAdminPage();
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-heading text-2xl text-pelumi-ink">Editar producto</h1>
      <p className="mt-1 text-sm text-pelumi-ink/60">{product.name}</p>
      <div className="mt-6 rounded-3xl border border-pelumi-blue-light bg-white p-6">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
