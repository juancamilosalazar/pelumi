import { NextRequest } from "next/server";
import { createSessionToken, verifyCredentials, SESSION_COOKIE, SESSION_COOKIE_MAX_AGE } from "@/lib/auth";
import { redirectTo } from "@/lib/redirect";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const username = String(form.get("username") ?? "");
  const password = String(form.get("password") ?? "");

  // Sin credenciales configuradas, cualquier intento fallaría como si la clave
  // estuviera mal; se distingue el caso para no perder tiempo depurando.
  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.SESSION_SECRET) {
    return redirectTo("/admin/login?error=config");
  }

  if (!verifyCredentials(username, password)) {
    return redirectTo("/admin/login?error=1");
  }

  const response = redirectTo("/admin");
  response.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_COOKIE_MAX_AGE,
  });
  return response;
}
