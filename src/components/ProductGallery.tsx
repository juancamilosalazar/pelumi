"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-3xl bg-pelumi-blue-light text-pelumi-blue-dark/50">
        <PawIcon />
      </div>
    );
  }

  const hasMultiple = images.length > 1;
  const goPrev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setActive((i) => (i + 1) % images.length);

  return (
    <div>
      <div
        className="relative aspect-square overflow-hidden rounded-3xl bg-pelumi-blue-light outline-none"
        tabIndex={hasMultiple ? 0 : undefined}
        onKeyDown={(e) => {
          if (!hasMultiple) return;
          if (e.key === "ArrowLeft") goPrev();
          if (e.key === "ArrowRight") goNext();
        }}
      >
        <Image
          key={images[active]}
          src={images[active]}
          alt={`${name} ${active + 1}`}
          fill
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-cover animate-pop-in"
          priority
        />

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-pelumi-ink shadow-md transition-transform hover:scale-110 active:scale-95"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Imagen siguiente"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-pelumi-ink shadow-md transition-transform hover:scale-110 active:scale-95"
            >
              <ChevronIcon direction="right" />
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-pelumi-ink shadow-sm">
              {active + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="mt-3 flex gap-3 overflow-x-auto scrollbar-none">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                i === active ? "border-pelumi-pink" : "border-transparent"
              }`}
            >
              <Image src={img} alt={`${name} ${i + 1}`} fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path
        d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PawIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="7" cy="8" r="2" />
      <circle cx="12" cy="6" r="2" />
      <circle cx="17" cy="8" r="2" />
      <path d="M12 11c-3.3 0-6 2.2-6 5 0 1.7 1.3 3 3 3 1 0 1.5-.5 3-.5s2 .5 3 .5c1.7 0 3-1.3 3-3 0-2.8-2.7-5-6-5z" />
    </svg>
  );
}
