"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track } from "@/lib/track";

/** Registra una vista de página cada vez que cambia la ruta del sitio. */
export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    track("page_view", { path: pathname });
  }, [pathname]);

  return null;
}
