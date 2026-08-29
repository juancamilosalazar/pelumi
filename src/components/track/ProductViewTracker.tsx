"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/** Registra la vista de la ficha de un producto. */
export default function ProductViewTracker({ productId }: { productId: string }) {
  useEffect(() => {
    track("product_view", { productId });
  }, [productId]);

  return null;
}
