import { requireAdminPage } from "@/lib/session";
import { getAllProducts } from "@/lib/products";
import ProductAdminList from "@/components/admin/ProductAdminList";

export default async function AdminDashboardPage() {
  await requireAdminPage();
  const products = await getAllProducts();

  return <ProductAdminList initialProducts={products} />;
}
