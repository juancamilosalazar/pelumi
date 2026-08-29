import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, verifyCredentials, SESSION_COOKIE, SESSION_COOKIE_MAX_AGE } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const username = String(form.get("username") ?? "");
  const password = String(form.get("password") ?? "");

  // Sin credenciales configuradas, cualquier intento fallaría como si la clave
  // estuviera mal; se distingue el caso para no perder tiempo depurando.
  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.SESSION_SECRET) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("error", "config");
    return NextResponse.redirect(url, { status: 303 });
  }

  if (!verifyCredentials(username, password)) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("error", "1");
    return NextResponse.redirect(url, { status: 303 });
  }

  const response = NextResponse.redirect(new URL("/admin", request.url), { status: 303 });
  response.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_COOKIE_MAX_AGE,
  });
  return response;
}
