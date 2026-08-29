import { requireAdminPage } from "@/lib/session";
import ProductForm from "@/components/admin/ProductForm";

export default async function NuevoProductoPage() {
  await requireAdminPage();

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-heading text-2xl text-pelumi-ink">Nuevo producto</h1>
      <p className="mt-1 text-sm text-pelumi-ink/60">
        Agrega un peluche nuevo al catálogo.
      </p>
      <div className="mt-6 rounded-3xl border border-pelumi-blue-light bg-white p-6">
        <ProductForm />
      </div>
    </div>
  );
}
