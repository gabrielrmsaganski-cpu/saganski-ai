import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://saganski.ai";
const description =
  "Sistemas sob medida com inteligência artificial para empresas que querem ganhar tempo, escalar operações e eliminar trabalho manual.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SAGANSKI AI — Sistemas inteligentes sob medida",
    template: "%s • SAGANSKI AI",
  },
  description,
  keywords: [
    "sistemas sob medida",
    "automação empresarial",
    "IA aplicada",
    "CRM personalizado",
    "agentes de IA",
    "automação de documentos",
    "RPA",
    "dashboards executivos",
    "WhatsApp inteligente",
  ],
  authors: [{ name: "SAGANSKI AI" }],
  creator: "SAGANSKI AI",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "SAGANSKI AI",
    title: "SAGANSKI AI — Sistemas inteligentes sob medida",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "SAGANSKI AI — Sistemas inteligentes sob medida",
    description,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#050913",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
