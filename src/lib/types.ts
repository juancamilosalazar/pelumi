export type StockStatus = "available" | "low" | "out";

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  favorite: boolean;
  /** Referencia interna (ej. P546). Solo visible en el panel admin y en el pedido de WhatsApp. */
  reference: string;
  stock: StockStatus;
  createdAt: string;
  updatedAt: string;
};

export type ProductInput = {
  name: string;
  price: number;
  description: string;
  reference?: string;
};

export const STOCK_LABELS: Record<StockStatus, string> = {
  available: "Disponible",
  low: "Pocas unidades",
  out: "Agotado",
};
