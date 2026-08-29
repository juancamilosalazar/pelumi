/**
 * Iconos ilustrados a mano en el estilo de la etiqueta Pelumi:
 * trazos gruesos redondeados, colores exactos de marca y guiños al logo
 * (la sonrisa amarilla, el confeti, la felpa crema).
 */

export function BearFaceIcon({ size = 46 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      {/* orejas */}
      <circle cx="15" cy="15" r="9" fill="#F7E8D4" stroke="#4A3A35" strokeWidth="3" />
      <circle cx="49" cy="15" r="9" fill="#F7E8D4" stroke="#4A3A35" strokeWidth="3" />
      <circle cx="15" cy="15" r="3.5" fill="#EF2A93" opacity="0.45" />
      <circle cx="49" cy="15" r="3.5" fill="#EF2A93" opacity="0.45" />
      {/* cabeza */}
      <circle cx="32" cy="36" r="22" fill="#F7E8D4" stroke="#4A3A35" strokeWidth="3" />
      {/* ojos */}
      <circle cx="24" cy="31" r="2.7" fill="#4A3A35" />
      <circle cx="40" cy="31" r="2.7" fill="#4A3A35" />
      {/* mejillas */}
      <circle cx="17.5" cy="38" r="3.6" fill="#EF2A93" opacity="0.3" />
      <circle cx="46.5" cy="38" r="3.6" fill="#EF2A93" opacity="0.3" />
      {/* hocico */}
      <ellipse cx="32" cy="43" rx="8.5" ry="6.5" fill="#FFFFFF" stroke="#4A3A35" strokeWidth="2.5" />
      <circle cx="32" cy="40.5" r="2.2" fill="#4A3A35" />
      <path d="M27.5 46 q4.5 3.4 9 0" stroke="#4A3A35" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function ThreadSpoolIcon({ size = 46 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      {/* aguja */}
      <path d="M44 10 L58 24" stroke="#4A3A35" strokeWidth="3" strokeLinecap="round" />
      <circle cx="56" cy="22" r="2.6" fill="#FFFFFF" stroke="#4A3A35" strokeWidth="1.8" />
      {/* carrete */}
      <rect x="12" y="14" width="28" height="8" rx="4" fill="#F9C719" stroke="#4A3A35" strokeWidth="3" />
      <rect x="12" y="42" width="28" height="8" rx="4" fill="#F9C719" stroke="#4A3A35" strokeWidth="3" />
      <rect x="16" y="22" width="20" height="20" fill="#80D1D3" stroke="#4A3A35" strokeWidth="3" />
      <path d="M17.5 27 h17 M17.5 32 h17 M17.5 37 h17" stroke="#FFFFFF" strokeWidth="2" opacity="0.65" strokeLinecap="round" />
      {/* hilo suelto */}
      <path d="M36 32 C47 30 43 42 51 40 C57 38.5 58 46 52 49" stroke="#EF2A93" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function GiftBoxIcon({ size = 46 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      {/* caja */}
      <rect x="10" y="24" width="44" height="30" rx="4" fill="#F7E8D4" stroke="#4A3A35" strokeWidth="3" />
      <rect x="6" y="14" width="52" height="12" rx="4" fill="#80D1D3" stroke="#4A3A35" strokeWidth="3" />
      {/* cinta */}
      <path d="M32 14v40" stroke="#EF2A93" strokeWidth="5" />
      <path d="M32 14v40" stroke="#4A3A35" strokeWidth="1.2" opacity="0.25" />
      {/* moño */}
      <path
        d="M32 13c-3-6-11-7-11-2 0 3.5 6 4.5 11 2zm0 0c3-6 11-7 11-2 0 3.5-6 4.5-11 2z"
        fill="#EF2A93" stroke="#4A3A35" strokeWidth="2.4" strokeLinejoin="round"
      />
      {/* corazoncito */}
      <path
        d="M43 40c-1.4-1.6-4-.8-4 1.3 0 1.6 1.9 2.9 4 4.4 2.1-1.5 4-2.8 4-4.4 0-2.1-2.6-2.9-4-1.3z"
        fill="#F9C719"
      />
    </svg>
  );
}

export function SmileChatIcon({ size = 46 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      {/* burbuja */}
      <path
        d="M32 9 C17.5 9 8 17.6 8 29 c0 6.7 3.4 12.3 8.9 15.8 L14.5 55 l10.8-5.1 c2.1.5 4.4.7 6.7.7 14.5 0 24-8.6 24-21.6 S46.5 9 32 9z"
        fill="#80D1D3" stroke="#4A3A35" strokeWidth="3" strokeLinejoin="round"
      />
      {/* carita: la sonrisa del logo */}
      <circle cx="25" cy="26" r="2.7" fill="#4A3A35" />
      <circle cx="39" cy="26" r="2.7" fill="#4A3A35" />
      <path d="M21.5 31.5 q10.5 11 21 0" stroke="#F9C719" strokeWidth="4.6" strokeLinecap="round" />
      {/* corazón confeti */}
      <path
        d="M53.5 8.5 c-1.9-2.1-5.3-1-5.3 1.8 0 2.1 2.5 3.8 5.3 5.9 2.8-2.1 5.3-3.8 5.3-5.9 0-2.8-3.4-3.9-5.3-1.8z"
        fill="#EF2A93"
      />
    </svg>
  );
}
