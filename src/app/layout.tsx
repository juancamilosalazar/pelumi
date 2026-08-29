import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import { MotionProvider } from "@/components/motion";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pelumi · Peluches suaves como el algodón",
    template: "%s · Pelumi",
  },
  description:
    "Pelumi, fabricantes directos de peluches. Descubre nuestro catálogo, pide por WhatsApp y conoce nuestros precios al por mayor.",
  keywords: [
    "peluches",
    "peluches al por mayor",
    "fabricante de peluches",
    "Pelumi",
    "Distripeluches",
    "peluches Colombia",
    "peluches El Santuario Antioquia",
  ],
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Pelumi",
    title: "Pelumi · Peluches suaves como el algodón",
    description:
      "Fabricantes directos de peluches. Explora el catálogo completo y pide por WhatsApp.",
    url: siteUrl,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Pelumi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pelumi · Peluches suaves como el algodón",
    description:
      "Fabricantes directos de peluches. Explora el catálogo completo y pide por WhatsApp.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pelumi",
    url: siteUrl,
    logo: `${siteUrl}/brand/pelumi-wordmark.png`,
    sameAs: [`https://instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM ?? "distripeluches"}`],
    address: {
      "@type": "PostalAddress",
      streetAddress: process.env.NEXT_PUBLIC_ADDRESS ?? "",
      addressLocality: "El Santuario",
      addressRegion: "Antioquia",
      addressCountry: "CO",
    },
  };

  return (
    <html lang="es" className={`${baloo.variable} ${nunito.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-pelumi-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
