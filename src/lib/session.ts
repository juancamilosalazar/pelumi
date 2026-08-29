import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, isValidSessionToken } from "./auth";

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return isValidSessionToken(token);
}

/** Usar al inicio de páginas/route handlers de /admin para exigir sesión activa. */
export async function requireAdminPage(): Promise<void> {
  const ok = await isAuthenticated();
  if (!ok) {
    redirect("/admin/login");
  }
}

/** Usar en API routes de administración. Devuelve true si está autorizado. */
export async function requireAdminApi(): Promise<boolean> {
  return isAuthenticated();
}
