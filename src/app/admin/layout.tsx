import Link from "next/link";
import Image from "next/image";
import { isAuthenticated } from "@/lib/session";
import AdminNav from "@/components/admin/AdminNav";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAuthenticated();

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-pelumi-blue-light/30">
      <header className="border-b border-pelumi-blue-light bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href={authed ? "/admin" : "/admin/login"} className="flex items-center gap-2">
            <Image src="/brand/pelumi-wordmark.png" alt="Pelumi" width={120} height={75} className="h-9 w-auto" />
            <span className="font-heading text-sm text-pelumi-ink/60">Panel admin</span>
          </Link>
          <div className="flex items-center gap-3">
            {authed && <AdminNav />}
            <Link href="/" className="text-sm font-semibold text-pelumi-blue-dark hover:underline">
              Ver sitio
            </Link>
            {authed && (
              <form action="/api/admin/logout" method="post">
                <button
                  type="submit"
                  className="rounded-full border border-pelumi-ink/15 px-4 py-1.5 text-sm font-semibold text-pelumi-ink/70 hover:bg-pelumi-ink/5"
                >
                  Cerrar sesión
                </button>
              </form>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
