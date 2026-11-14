import type { CSSProperties } from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientProvider } from "@/src/context/ClientContext";
import { CartProvider } from "@/src/context/CartContext";
import { BusinessProvider } from "@/src/context/BusinessContext";
import { getBusinessSettings } from "@/src/services/businessService";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Colors the browser toolbar / status bar (Safari, Chrome on phones).
export async function generateViewport(): Promise<Viewport> {
  const { backgroundColor } = await getBusinessSettings();
  return { themeColor: backgroundColor || "#2E7D32" };
}

const DEFAULT_TITLE = "Fresco para Mayoristas";
const DEFAULT_DESCRIPTION =
  "Fresco, distribuidor hortifrutícola para la gastronomía de Punta del Este: frutas, verduras y hojas verdes frescas para restaurantes, hoteles y comercios. Catálogo mayorista y entregas diarias.";

// Absolute base for the social-share image and canonical URLs (Vercel sets the production host).
const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  const { businessName } = await getBusinessSettings();
  const name = businessName || DEFAULT_TITLE;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: name, template: "%s | Fresco" },
    description: DEFAULT_DESCRIPTION,
    applicationName: "Fresco",
    keywords: [
      "Fresco",
      "frutas y verduras",
      "distribuidor hortifrutícola",
      "mayorista",
      "Punta del Este",
      "Maldonado",
      "gastronomía",
      "restaurantes",
      "hoteles",
    ],
    authors: [{ name: "Fresco" }],
    creator: "Fresco",
    publisher: "Fresco",
    category: "food",
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: "Fresco",
      title: name,
      description: DEFAULT_DESCRIPTION,
      locale: "es_UY",
      url: "/",
      images: [{ url: "/icon-512.png", width: 512, height: 512, alt: "Fresco" }],
    },
    twitter: {
      card: "summary",
      title: name,
      description: DEFAULT_DESCRIPTION,
      images: ["/icon-512.png"],
    },
    appleWebApp: { capable: true, title: "Fresco", statusBarStyle: "default" },
    formatDetection: { telephone: false },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const business = await getBusinessSettings();
  return (
    <html
      lang="es-UY"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={{ "--brand-bg": business.backgroundColor || "#2E7D32" } as CSSProperties}
    >
      <body className="min-h-full flex flex-col">
        <BusinessProvider initial={business}>
          <ClientProvider>
            <CartProvider>{children}</CartProvider>
          </ClientProvider>
        </BusinessProvider>
      </body>
    </html>
  );
}
