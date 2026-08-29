import { requireAdminPage } from "@/lib/session";
import { readMetrics } from "@/lib/metrics";
import { getAllProducts } from "@/lib/products";
import KpiCard from "@/components/admin/metrics/KpiCard";
import TrendChart, { TrendPoint } from "@/components/admin/metrics/TrendChart";
import BarList, { BarRow } from "@/components/admin/metrics/BarList";
import SourceDonut from "@/components/admin/metrics/SourceDonut";

export const revalidate = 0;

const PAGE_NAMES: Record<string, string> = {
  "/": "Inicio",
  "/catalogo": "Catálogo",
  "/catalogo/[producto]": "Fichas de producto",
  "/mayoreo": "Mayoreo",
};

/** Serie de los últimos 30 días en hora de Colombia (UTC-5). */
function buildTrendPoints(daily: Record<string, { views: number; whatsapp: number }>): TrendPoint[] {
  const now = Date.now();
  const points: TrendPoint[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now - 5 * 3600_000 - i * 86400_000);
    const key = d.toISOString().slice(0, 10);
    const day = daily[key];
    points.push({
      label: `${d.getUTCDate()}/${d.getUTCMonth() + 1}`,
      views: day?.views ?? 0,
      whatsapp: day?.whatsapp ?? 0,
    });
  }
  return points;
}

export default async function MetricasPage() {
  await requireAdminPage();

  const [metrics, products] = await Promise.all([readMetrics(), getAllProducts()]);
  const productById = new Map(products.map((p) => [p.id, p]));
  const c = metrics.counters;

  const whatsappTotal =
    (c.whatsapp_order ?? 0) +
    (c.whatsapp_product ?? 0) +
    (c.whatsapp_general ?? 0) +
    (c.whatsapp_wholesale ?? 0);

  const points = buildTrendPoints(metrics.daily);

  // Top productos
  const productRows = Object.entries(metrics.products)
    .map(([id, pm]) => ({ id, pm, product: productById.get(id) }))
    .filter((r) => r.product);

  const topClicked: BarRow[] = productRows
    .filter((r) => r.pm.clicks > 0)
    .sort((a, b) => b.pm.clicks - a.pm.clicks)
    .slice(0, 8)
    .map((r) => ({
      key: r.id,
      name: r.product!.name,
      image: r.product!.images[0] ?? "",
      value: r.pm.clicks,
    }));

  const topInteractions: BarRow[] = productRows
    .map((r) => ({
      ...r,
      total: r.pm.clicks + r.pm.views + r.pm.cartAdds + r.pm.whatsapp,
    }))
    .filter((r) => r.total > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, 8)
    .map((r) => ({
      key: r.id,
      name: r.product!.name,
      image: r.product!.images[0] ?? "",
      value: r.total,
      segments: [
        { value: r.pm.clicks, color: "#2FA6A9", label: "Clicks" },
        { value: r.pm.views, color: "#80D1D3", label: "Vistas de ficha" },
        { value: r.pm.cartAdds, color: "#F9C719", label: "Al carrito" },
        { value: r.pm.whatsapp, color: "#EF2A93", label: "WhatsApp" },
      ],
    }));

  const pageRows: BarRow[] = Object.entries(metrics.pages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([path, count]) => ({
      key: path,
      name: PAGE_NAMES[path] ?? path,
      value: count,
    }));

  const hasData = (c.page_view ?? 0) + whatsappTotal + (c.product_click ?? 0) > 0;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl text-pelumi-ink">Métricas de la tienda</h1>
          <p className="text-sm text-pelumi-ink/60">
            Interacciones anónimas de los visitantes. Tu propia navegación como admin no cuenta.
          </p>
        </div>
        {metrics.updatedAt !== new Date(0).toISOString() && (
          <p className="text-xs text-pelumi-ink/45">
            Última actividad: {new Date(metrics.updatedAt).toLocaleString("es-CO", { timeZone: "America/Bogota" })}
          </p>
        )}
      </div>

      {!hasData ? (
        <div className="mt-10 rounded-3xl border-2 border-dashed border-pelumi-blue-light bg-white p-12 text-center">
          <span className="text-4xl" aria-hidden="true">📊</span>
          <p className="mt-3 font-heading text-lg text-pelumi-ink">Aún no hay métricas</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-pelumi-ink/60">
            Cuando los visitantes naveguen el catálogo, hagan click en peluches o envíen
            pedidos por WhatsApp, verás todo aquí en vivo.
          </p>
        </div>
      ) : (
        <>
          {/* KPIs principales */}
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <KpiCard label="Visitas al sitio" value={c.page_view ?? 0} icon="👀" accent="bg-pelumi-blue-light" />
            <KpiCard label="Clicks en peluches" value={c.product_click ?? 0} icon="🧸" accent="bg-pelumi-yellow-light" delay={80} />
            <KpiCard label="Agregados al carrito" value={c.cart_add ?? 0} icon="🛒" accent="bg-pelumi-pink-light" delay={160} />
            <KpiCard label="Clicks a WhatsApp" value={whatsappTotal} icon="💬" accent="bg-pelumi-cream" delay={240} />
          </div>

          {/* KPIs secundarios */}
          <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <KpiCard label="Pedidos enviados (carrito)" value={c.whatsapp_order ?? 0} icon="📦" accent="bg-pelumi-blue-light" hint="Pedidos completos por WhatsApp" />
            <KpiCard label="Vistas de ficha" value={c.product_view ?? 0} icon="🔍" accent="bg-pelumi-yellow-light" delay={80} />
            <KpiCard label="Carrito abierto" value={c.cart_open ?? 0} icon="👝" accent="bg-pelumi-pink-light" delay={160} />
            <KpiCard label="Consultas de mayoreo" value={c.whatsapp_wholesale ?? 0} icon="🏭" accent="bg-pelumi-cream" delay={240} />
          </div>

          {/* Tendencia 30 días */}
          <section className="mt-6 rounded-3xl border border-pelumi-blue-light bg-white p-6">
            <h2 className="font-heading text-lg text-pelumi-ink">Últimos 30 días</h2>
            <p className="mb-4 text-xs text-pelumi-ink/50">Visitas al sitio por día</p>
            <TrendChart points={points} />
          </section>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Top clickeados */}
            <section className="rounded-3xl border border-pelumi-blue-light bg-white p-6">
              <h2 className="font-heading text-lg text-pelumi-ink">Peluches más clickeados</h2>
              <p className="mb-4 text-xs text-pelumi-ink/50">Clicks desde el catálogo e inicio</p>
              <BarList rows={topClicked} unit="clicks" emptyText="Todavía nadie hace click en un peluche." />
            </section>

            {/* Top interacciones */}
            <section className="rounded-3xl border border-pelumi-blue-light bg-white p-6">
              <h2 className="font-heading text-lg text-pelumi-ink">Peluches con más interacciones</h2>
              <p className="mb-4 flex flex-wrap items-center gap-3 text-xs text-pelumi-ink/50">
                <span className="flex items-center gap-1"><i className="h-2.5 w-2.5 rounded-full bg-pelumi-blue-dark" /> Clicks</span>
                <span className="flex items-center gap-1"><i className="h-2.5 w-2.5 rounded-full bg-pelumi-teal" /> Vistas</span>
                <span className="flex items-center gap-1"><i className="h-2.5 w-2.5 rounded-full bg-pelumi-yellow" /> Carrito</span>
                <span className="flex items-center gap-1"><i className="h-2.5 w-2.5 rounded-full bg-pelumi-pink" /> WhatsApp</span>
              </p>
              <BarList rows={topInteractions} emptyText="Aún no hay interacciones con productos." />
            </section>

            {/* WhatsApp por origen */}
            <section className="rounded-3xl border border-pelumi-blue-light bg-white p-6">
              <h2 className="font-heading text-lg text-pelumi-ink">Clicks a WhatsApp por origen</h2>
              <p className="mb-4 text-xs text-pelumi-ink/50">De dónde salen las conversaciones</p>
              <SourceDonut
                centerLabel="clicks"
                segments={[
                  { label: "Pedidos de carrito", value: c.whatsapp_order ?? 0, color: "#2FA6A9" },
                  { label: "Consulta de producto", value: c.whatsapp_product ?? 0, color: "#F9C719" },
                  { label: "Botón general", value: c.whatsapp_general ?? 0, color: "#80D1D3" },
                  { label: "Mayoreo", value: c.whatsapp_wholesale ?? 0, color: "#EF2A93" },
                ]}
              />
            </section>

            {/* Páginas más visitadas */}
            <section className="rounded-3xl border border-pelumi-blue-light bg-white p-6">
              <h2 className="font-heading text-lg text-pelumi-ink">Secciones más visitadas</h2>
              <p className="mb-4 text-xs text-pelumi-ink/50">Vistas por sección del sitio</p>
              <BarList rows={pageRows} unit="vistas" emptyText="Aún no hay visitas registradas." />
            </section>
          </div>
        </>
      )}
    </div>
  );
}
