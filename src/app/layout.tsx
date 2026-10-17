import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import "./globals.css";

const manrope = localFont({
  src: [
    { path: "../../public/assets/manrope-regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/assets/manrope-bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AlloDriver — À vous la route.",
  description:
    "AlloDriver, la location de véhicules en Côte d’Ivoire. Explorez les catégories, préparez vos dates et contactez l’équipe pour organiser votre location.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "AlloDriver — À vous la route.",
    description:
      "Une nouvelle expérience de location en Côte d’Ivoire. Découvrez la Suzuki Fronx et explorez les autres modèles.",
    locale: "fr_CI",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#fbb03b" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
