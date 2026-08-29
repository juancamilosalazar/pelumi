"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Product } from "./types";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image?: string;
  /** Referencia interna del producto: viaja en el pedido de WhatsApp, no se muestra en la UI. */
  reference?: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, qty?: number, options?: { open?: boolean }) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "pelumi-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  // `hydrated` como estado (no ref): garantiza que el efecto de guardado no
  // escriba nada hasta el render POSTERIOR a la carga, lo que evita que el
  // doble montaje de React StrictMode pise el carrito guardado con [].
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Hidratación única desde localStorage (sistema externo): el setState
    // síncrono es intencional y ocurre una sola vez al montar.
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setItems(parsed.filter((i) => i && i.id && i.qty > 0));
        }
      }
    } catch {
      // carrito corrupto: se arranca vacío
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // sin espacio o modo privado: el carrito vive solo en memoria
    }
  }, [items, hydrated]);

  const addItem = useCallback(
    (product: Product, qty = 1, options?: { open?: boolean }) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.id === product.id ? { ...i, qty: Math.min(i.qty + qty, 99) } : i
          );
        }
        return [
          ...prev,
          {
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.images[0],
            reference: product.reference || undefined,
            qty: Math.min(qty, 99),
          },
        ];
      });
      if (options?.open) setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty: Math.min(qty, 99) } : i))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((acc, i) => acc + i.qty, 0);
    const total = items.reduce((acc, i) => acc + i.qty * i.price, 0);
    return { items, count, total, isOpen, openCart, closeCart, addItem, removeItem, setQty, clear };
  }, [items, isOpen, openCart, closeCart, addItem, removeItem, setQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de <CartProvider>");
  }
  return ctx;
}
