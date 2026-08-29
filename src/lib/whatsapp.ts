import type { CartItem } from "./cart";
import { formatPrice } from "./format";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
const MESSAGE_TEMPLATE =
  process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ?? "Hola, quiero más información sobre {producto}";

function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppLink(productName?: string): string {
  const message = productName
    ? MESSAGE_TEMPLATE.replace("{producto}", productName)
    : "Hola, quiero más información sobre sus peluches";
  return waLink(message);
}

export function buildWholesaleWhatsAppLink(): string {
  return waLink("Hola, quiero información sobre precios y pedidos al por mayor de Pelumi 🧸");
}

/** Mensaje de pedido con todos los artículos del carrito, cantidades y total. */
export function buildCartWhatsAppLink(items: CartItem[]): string {
  const count = items.reduce((acc, i) => acc + i.qty, 0);
  const total = items.reduce((acc, i) => acc + i.qty * i.price, 0);

  const lines = items.map((i) => {
    const ref = i.reference ? ` (Ref. ${i.reference})` : "";
    return `• ${i.qty} × ${i.name}${ref} — ${formatPrice(i.price * i.qty)}`;
  });

  const message = [
    "¡Hola Pelumi! 🧸 Quiero hacer este pedido:",
    "",
    ...lines,
    "",
    `Total: ${formatPrice(total)} (${count} ${count === 1 ? "peluche" : "peluches"})`,
    "",
    "Quedo atento(a) para confirmar disponibilidad y envío. ¡Gracias!",
  ].join("\n");

  return waLink(message);
}
