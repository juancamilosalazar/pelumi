"use client";

import { m } from "motion/react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { track } from "@/lib/track";

export default function WhatsAppFloatingButton() {
  return (
    <m.a
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      onClick={() => track("whatsapp_general")}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg shadow-black/10"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.462 3.478 1.34 4.985L2 22l5.117-1.334a9.96 9.96 0 0 0 4.887 1.28h.004c5.514 0 9.997-4.483 9.997-9.997 0-2.67-1.04-5.18-2.929-7.07a9.93 9.93 0 0 0-7.072-2.876zm0 18.174a8.15 8.15 0 0 1-4.152-1.137l-.298-.177-3.037.792.811-2.96-.194-.304a8.15 8.15 0 0 1-1.252-4.391c0-4.507 3.667-8.174 8.178-8.174a8.12 8.12 0 0 1 5.783 2.398 8.12 8.12 0 0 1 2.393 5.782c-.001 4.507-3.668 8.171-8.232 8.171z" />
      </svg>
      <span className="hidden text-sm font-semibold sm:inline">Pedir por WhatsApp</span>
    </m.a>
  );
}
