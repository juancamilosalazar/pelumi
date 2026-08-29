import { promises as fs } from "fs";
import path from "path";

/**
 * Métricas de la plataforma en un archivo plano (sin base de datos).
 * Se registran eventos anónimos: vistas, clicks a productos, carrito y WhatsApp.
 */

const METRICS_FILE = path.join(process.cwd(), "data", "metrics.json");

export type MetricEventType =
  | "page_view"
  | "product_view"
  | "product_click"
  | "cart_add"
  | "cart_open"
  | "whatsapp_order"
  | "whatsapp_product"
  | "whatsapp_general"
  | "whatsapp_wholesale";

export const METRIC_EVENT_TYPES: MetricEventType[] = [
  "page_view",
  "product_view",
  "product_click",
  "cart_add",
  "cart_open",
  "whatsapp_order",
  "whatsapp_product",
  "whatsapp_general",
  "whatsapp_wholesale",
];

export type ProductMetrics = {
  views: number;
  clicks: number;
  cartAdds: number;
  whatsapp: number;
};

export type DailyMetrics = {
  views: number;
  cartAdds: number;
  whatsapp: number;
};

export type MetricsData = {
  counters: Partial<Record<MetricEventType, number>>;
  pages: Record<string, number>;
  products: Record<string, ProductMetrics>;
  daily: Record<string, DailyMetrics>;
  updatedAt: string;
};

const EMPTY: MetricsData = {
  counters: {},
  pages: {},
  products: {},
  daily: {},
  updatedAt: new Date(0).toISOString(),
};

// Cola en memoria para serializar escrituras (mismo patrón que products.ts)
let writeQueue: Promise<unknown> = Promise.resolve();
function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = writeQueue.then(task, task);
  writeQueue = run.catch(() => undefined);
  return run;
}

export async function readMetrics(): Promise<MetricsData> {
  try {
    const raw = await fs.readFile(METRICS_FILE, "utf-8");
    const parsed = JSON.parse(raw) as MetricsData;
    return {
      counters: parsed.counters ?? {},
      pages: parsed.pages ?? {},
      products: parsed.products ?? {},
      daily: parsed.daily ?? {},
      updatedAt: parsed.updatedAt ?? EMPTY.updatedAt,
    };
  } catch {
    return structuredClone(EMPTY);
  }
}

async function writeMetrics(data: MetricsData): Promise<void> {
  await fs.mkdir(path.dirname(METRICS_FILE), { recursive: true });
  await fs.writeFile(METRICS_FILE, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

function emptyProduct(): ProductMetrics {
  return { views: 0, clicks: 0, cartAdds: 0, whatsapp: 0 };
}

function todayKey(): string {
  // Fecha local de Colombia (UTC-5, sin horario de verano)
  const bogota = new Date(Date.now() - 5 * 60 * 60 * 1000);
  return bogota.toISOString().slice(0, 10);
}

/** Normaliza rutas para no acumular una entrada por cada slug de producto. */
function normalizePath(p: string): string {
  if (!p.startsWith("/")) return "/";
  if (p.startsWith("/catalogo/") && p.length > "/catalogo/".length) {
    return "/catalogo/[producto]";
  }
  return p.split("?")[0].slice(0, 100);
}

export async function recordEvent(
  type: MetricEventType,
  payload: { productId?: string; productIds?: string[]; path?: string } = {}
): Promise<void> {
  return enqueue(async () => {
    const data = await readMetrics();
    const day = todayKey();
    const daily = (data.daily[day] ??= { views: 0, cartAdds: 0, whatsapp: 0 });

    data.counters[type] = (data.counters[type] ?? 0) + 1;

    const touch = (id: string | undefined, field: keyof ProductMetrics) => {
      if (!id || typeof id !== "string" || id.length > 64) return;
      const product = (data.products[id] ??= emptyProduct());
      product[field] += 1;
    };

    switch (type) {
      case "page_view":
        if (payload.path) {
          const key = normalizePath(String(payload.path));
          data.pages[key] = (data.pages[key] ?? 0) + 1;
        }
        daily.views += 1;
        break;
      case "product_view":
        touch(payload.productId, "views");
        break;
      case "product_click":
        touch(payload.productId, "clicks");
        break;
      case "cart_add":
        touch(payload.productId, "cartAdds");
        daily.cartAdds += 1;
        break;
      case "whatsapp_product":
        touch(payload.productId, "whatsapp");
        daily.whatsapp += 1;
        break;
      case "whatsapp_order": {
        const ids = Array.isArray(payload.productIds) ? payload.productIds.slice(0, 50) : [];
        for (const id of ids) touch(id, "whatsapp");
        daily.whatsapp += 1;
        break;
      }
      case "whatsapp_general":
      case "whatsapp_wholesale":
        daily.whatsapp += 1;
        break;
      case "cart_open":
        break;
    }

    // Conserva solo los últimos 90 días para que el archivo no crezca sin límite
    const days = Object.keys(data.daily).sort();
    for (const key of days.slice(0, Math.max(0, days.length - 90))) {
      delete data.daily[key];
    }

    data.updatedAt = new Date().toISOString();
    await writeMetrics(data);
  });
}
