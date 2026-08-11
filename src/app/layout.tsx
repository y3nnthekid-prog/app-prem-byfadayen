import type { Metadata, Viewport } from "next";
import {
  JetBrains_Mono,
  Plus_Jakarta_Sans,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import { STORE } from "@/lib/store";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

/**
 * Dipakai buat resolve URL absolut di OG image.
 * Di Vercel otomatis kebaca; lokal/hosting lain set NEXT_PUBLIC_SITE_URL.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${STORE.fullName} — Pricelist Akun Premium Termurah`,
    template: `%s · ${STORE.fullName}`,
  },
  description:
    "Daftar harga akun aplikasi premium: Canva, CapCut, Spotify, HBO Max, ChatGPT, Viu, dan 16 lainnya. Mulai Rp 10.000, bayar QRIS, proses cepat, ada garansi.",
  keywords: [
    "jual akun premium",
    "pricelist aplikasi premium",
    "canva pro murah",
    "capcut pro",
    "spotify famplan",
    "byfadayen",
  ],
  applicationName: STORE.fullName,
  openGraph: {
    title: `${STORE.fullName} — Pricelist Akun Premium`,
    description:
      "22 aplikasi premium, 35 paket, mulai Rp 10.000. Bayar QRIS, akun langsung meluncur.",
    type: "website",
    locale: "id_ID",
    siteName: STORE.fullName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${STORE.fullName} — Pricelist Akun Premium`,
    description: "22 aplikasi premium, 35 paket, mulai Rp 10.000.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${jakarta.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
