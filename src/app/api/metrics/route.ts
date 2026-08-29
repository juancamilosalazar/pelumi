import { NextRequest, NextResponse } from "next/server";
import { recordEvent, METRIC_EVENT_TYPES, MetricEventType } from "@/lib/metrics";
import { SESSION_COOKIE, isValidSessionToken } from "@/lib/auth";

const MAX_BODY = 2048;

/** Recibe eventos anónimos del sitio (enviados con navigator.sendBeacon). */
export async function POST(request: NextRequest) {
  // La navegación del administrador no cuenta como tráfico real
  const adminToken = request.cookies.get(SESSION_COOKIE)?.value;
  if (isValidSessionToken(adminToken)) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }
  if (!raw || raw.length > MAX_BODY) {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  let body: { type?: string; productId?: string; productIds?: string[]; path?: string };
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const type = body.type as MetricEventType;
  if (!METRIC_EVENT_TYPES.includes(type)) {
    return NextResponse.json({ error: "Evento desconocido" }, { status: 400 });
  }

  try {
    await recordEvent(type, {
      productId: typeof body.productId === "string" ? body.productId : undefined,
      productIds: Array.isArray(body.productIds)
        ? body.productIds.filter((v): v is string => typeof v === "string")
        : undefined,
      path: typeof body.path === "string" ? body.path : undefined,
    });
  } catch {
    // Si el disco es de solo lectura (algunos hostings serverless), las
    // métricas simplemente no se guardan; nunca debe romper la navegación.
    return NextResponse.json({ ok: false, stored: false });
  }

  return NextResponse.json({ ok: true });
}
