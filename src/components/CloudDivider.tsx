/**
 * Borde de sección en forma de nubes esponjosas, como el troquel de la etiqueta.
 * `color` es el color de la sección que "asoma" con las nubes.
 * `flip` lo voltea para usarlo como borde superior o inferior.
 */
export default function CloudDivider({
  color = "#eaf7f7",
  flip = false,
  className = "",
}: {
  color?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none w-full overflow-hidden leading-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className={`block h-[46px] w-full sm:h-[70px] ${flip ? "rotate-180" : ""}`}
      >
        <path
          fill={color}
          d="M0,90 L0,55 C40,20 100,18 140,45 C170,10 240,5 285,35 C320,8 390,10 425,42 C460,15 530,12 570,45 C605,18 675,15 715,48 C750,20 820,18 860,50 C895,22 965,18 1005,50 C1040,20 1110,18 1150,48 C1185,22 1255,18 1295,50 C1330,25 1400,25 1440,55 L1440,90 Z"
        />
      </svg>
    </div>
  );
}
