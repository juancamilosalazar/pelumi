/** Iconos de la franja de confianza: trazo redondeado, en los colores de marca. */

type IconProps = { className?: string; size?: number };

export function HeartIcon({ className, size = 30 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 32 30" fill="none" aria-hidden="true">
      <path
        d="M16 27C9 21.5 3 16.8 3 10.6 3 6.4 6.3 3 10.4 3 12.7 3 14.8 4.1 16 5.9 17.2 4.1 19.3 3 21.6 3 25.7 3 29 6.4 29 10.6c0 6.2-6 10.9-13 16.4z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ShieldIcon({ className, size = 30 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 3l11 4v9c0 7-4.6 11.6-11 13.5C9.6 27.6 5 23 5 16V7l11-4z"
        fill="currentColor"
      />
      <path d="M11 16.2l3.4 3.4L21.5 12" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChatIcon({ className, size = 30 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 4C9.4 4 4 8.7 4 14.5c0 3.3 1.7 6.2 4.4 8.1L7 29l6-3.1c1 .2 2 .3 3 .3 6.6 0 12-4.7 12-10.6S22.6 4 16 4z"
        fill="currentColor"
      />
      <path
        d="M19.6 19.2c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.5.1l-.7.8c-.1.1-.2.2-.4.1-1.1-.4-2.1-1.2-2.8-2.2-.1-.2 0-.3.1-.4l.5-.6c.1-.1.1-.2 0-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.5.2-.6.3-.7.7-.8 1.7-.4 2.6.9 1.9 2.4 3.4 4.4 4.2.9.4 1.9.5 2.8.2.5-.2.9-.6 1.1-1.1.1-.3.1-.6 0-.7l-.3-.2z"
        fill="#fff"
      />
    </svg>
  );
}

export function TruckIcon({ className, size = 30 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 36 32" fill="none" aria-hidden="true">
      <rect x="2" y="8" width="18" height="14" rx="2.5" fill="currentColor" />
      <path d="M20 12h6.2c.6 0 1.1.3 1.4.8l3.2 5c.1.2.2.5.2.7V21c0 .8-.7 1.5-1.5 1.5H20V12z" fill="currentColor" />
      <circle cx="10" cy="24.5" r="3.4" fill="currentColor" stroke="#fff" strokeWidth="2" />
      <circle cx="26" cy="24.5" r="3.4" fill="currentColor" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

export function CartIcon({ className, size = 18 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <circle cx="9.5" cy="20" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="18" cy="20" r="1.6" fill="currentColor" stroke="none" />
      <path d="M2.5 3h2.6l2.4 11.4a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L21 7H6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WhatsAppGlyph({ className, size = 18 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.462 3.478 1.34 4.985L2 22l5.117-1.334a9.96 9.96 0 0 0 4.887 1.28h.004c5.514 0 9.997-4.483 9.997-9.997 0-2.67-1.04-5.18-2.929-7.07a9.93 9.93 0 0 0-7.072-2.876zm0 18.174a8.15 8.15 0 0 1-4.152-1.137l-.298-.177-3.037.792.811-2.96-.194-.304a8.15 8.15 0 0 1-1.252-4.391c0-4.507 3.667-8.174 8.178-8.174a8.12 8.12 0 0 1 5.783 2.398 8.12 8.12 0 0 1 2.393 5.782c-.001 4.507-3.668 8.171-8.232 8.171z" />
    </svg>
  );
}

/** Cabecita de oso en contorno, para la franja del eslogan. */
export function BearOutline({ className, size = 46 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="14" cy="15" r="8.5" stroke="currentColor" strokeWidth="3" />
      <circle cx="50" cy="15" r="8.5" stroke="currentColor" strokeWidth="3" />
      <circle cx="32" cy="37" r="21" stroke="currentColor" strokeWidth="3" />
      <circle cx="24.5" cy="33" r="2.4" fill="currentColor" />
      <circle cx="39.5" cy="33" r="2.4" fill="currentColor" />
      <ellipse cx="32" cy="43" rx="7.5" ry="5.5" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="32" cy="41" r="1.9" fill="currentColor" />
    </svg>
  );
}
