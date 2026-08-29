import { NextResponse } from "next/server";

/**
 * Redirección con `Location` relativa (permitida por HTTP/1.1, RFC 7231 §7.1.2).
 *
 * No se usa `NextResponse.redirect(new URL(path, request.url))` porque, detrás
 * de un proxy inverso (Render, Nginx, Cloudflare…), `request.url` contiene la
 * dirección **interna** del servidor —por ejemplo `http://localhost:10000`—
 * y el navegador terminaría redirigido ahí en vez de al dominio público.
 *
 * Una ruta relativa la resuelve el navegador contra el origen que está
 * visitando, así que funciona igual en local y en cualquier hosting.
 */
export function redirectTo(path: string, init?: { status?: number }): NextResponse {
  return new NextResponse(null, {
    status: init?.status ?? 303,
    headers: { Location: path },
  });
}
