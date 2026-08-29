/**
 * Confeti decorativo tomado del lenguaje visual de la etiqueta Pelumi:
 * espirales, zigzags, hilos y puntos en los colores exactos de marca.
 * Todos aceptan className para posicionarlos y animarlos desde fuera.
 */

type DoodleProps = {
  className?: string;
  color?: string;
  size?: number;
};

export function Spiral({ className, color = "#F9C719", size = 48 }: DoodleProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 30c2-8 10-9 12-4s-4 9-8 6 0-12 7-13 13 4 12 11-7 10-11 9"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Squiggle({ className, color = "#F03843", size = 40 }: DoodleProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 0.6}
      viewBox="0 0 40 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 20 10 8l7 9 7-13 7 10"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Thread({ className, color = "#EF2A93", size = 52 }: DoodleProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 0.55}
      viewBox="0 0 52 28"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 22c6-2 7-9 3-9s-3 8 3 7 8-9 4-10-4 9 3 8 9-8 5-9-5 8 2 8 8-6 8-6"
        stroke={color}
        strokeWidth="3.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Dot({ className, color = "#F9C719", size = 14 }: DoodleProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="4.5" stroke={color} strokeWidth="4" />
    </svg>
  );
}

export function Ribbon({ className, color = "#F9C719", size = 60 }: DoodleProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 50C14 30 30 14 52 10"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Cabecita de oso en contorno, para fondos (usar con opacidad baja). */
export function BearHead({ className, color = "#80D1D3", size = 64 }: DoodleProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="8" stroke={color} strokeWidth="3.5" />
      <circle cx="50" cy="14" r="8" stroke={color} strokeWidth="3.5" />
      <circle cx="32" cy="36" r="21" stroke={color} strokeWidth="3.5" />
      <circle cx="24.5" cy="32" r="2.2" fill={color} />
      <circle cx="39.5" cy="32" r="2.2" fill={color} />
      <ellipse cx="32" cy="42" rx="7.5" ry="5.5" stroke={color} strokeWidth="2.6" />
      <circle cx="32" cy="40" r="1.8" fill={color} />
    </svg>
  );
}

/** Corazón relleno suave, para fondos. */
export function HeartDoodle({ className, color = "#EF2A93", size = 30 }: DoodleProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 32 30" fill="none" aria-hidden="true">
      <path
        d="M16 27C9 21.5 3 16.8 3 10.6 3 6.4 6.3 3 10.4 3 12.7 3 14.8 4.1 16 5.9 17.2 4.1 19.3 3 21.6 3 25.7 3 29 6.4 29 10.6c0 6.2-6 10.9-13 16.4z"
        fill={color}
      />
    </svg>
  );
}

/** Ovillo de lana con hebra suelta. */
export function YarnBall({ className, color = "#F9C719", size = 48 }: DoodleProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 52 48" fill="none" aria-hidden="true">
      <circle cx="22" cy="24" r="17" stroke={color} strokeWidth="3.4" />
      <path d="M8 17c8 4 20 4 28 0M8 31c8-4 20-4 28 0M22 7c-5 10-5 24 0 34" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M39 24c6 1 8 6 11 5" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

/** Globito de fiesta con cuerda. */
export function Balloon({ className, color = "#EF2A93", size = 40 }: DoodleProps) {
  return (
    <svg className={className} width={size} height={size * 1.5} viewBox="0 0 40 60" fill="none" aria-hidden="true">
      <ellipse cx="20" cy="17" rx="13" ry="15" fill={color} opacity="0.85" />
      <path d="M20 32l-3 4h6l-3-4z" fill={color} />
      <path d="M20 36c-4 8 4 12 0 20" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <ellipse cx="15.5" cy="12" rx="3.4" ry="4.5" fill="#FFFFFF" opacity="0.35" />
    </svg>
  );
}

/** Estrellita de cuatro puntas, brillo tierno. */
export function Sparkle({ className, color = "#F9C719", size = 22 }: DoodleProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2c1 5 2.5 6.8 8 8-5.5 1.2-7 3-8 8-1-5-2.5-6.8-8-8 5.5-1.2 7-3 8-8z" fill={color} />
    </svg>
  );
}

export function CloudShape({ className, color = "#EAF7F7", size = 120 }: DoodleProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 0.62}
      viewBox="0 0 120 74"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M28 70C14 70 4 60 4 47c0-11 8-20 19-22C26 12 37 4 50 4c14 0 25 9 28 21 12-1 22 8 22 20 0 14-11 25-25 25H28z"
        fill={color}
      />
    </svg>
  );
}
