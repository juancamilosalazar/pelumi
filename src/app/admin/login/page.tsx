import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/session";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAuthenticated()) {
    redirect("/admin");
  }
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-sm">
      <div className="rounded-3xl border border-pelumi-blue-light bg-white p-8 shadow-sm">
        <h1 className="font-heading text-2xl text-pelumi-ink">Iniciar sesión</h1>
        <p className="mt-1 text-sm text-pelumi-ink/60">
          Acceso solo para administración del catálogo.
        </p>

        {error && (
          <p className="mt-4 rounded-xl bg-pelumi-pink-light px-4 py-2 text-sm text-pelumi-pink-dark">
            Usuario o contraseña incorrectos.
          </p>
        )}

        <form action="/api/admin/login" method="post" className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-pelumi-ink">
            Usuario
            <input
              type="text"
              name="username"
              required
              autoComplete="username"
              className="rounded-xl border border-pelumi-blue-light px-4 py-2.5 font-normal outline-none focus:border-pelumi-blue"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-pelumi-ink">
            Contraseña
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="rounded-xl border border-pelumi-blue-light px-4 py-2.5 font-normal outline-none focus:border-pelumi-blue"
            />
          </label>
          <button
            type="submit"
            className="mt-2 rounded-full bg-pelumi-pink px-4 py-3 font-heading text-white shadow-md shadow-pelumi-pink/30 transition-transform hover:scale-105 active:scale-95"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
