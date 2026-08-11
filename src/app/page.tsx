import { connection } from "next/server";
import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { AppMarquee } from "@/components/marquee";
import { Pricelist } from "@/components/pricelist";
import { HowToOrder } from "@/components/how-to-order";
import { Payment } from "@/components/payment";
import { WhyUs } from "@/components/why-us";
import { ResellerCta } from "@/components/reseller-cta";
import { SiteFooter } from "@/components/site-footer";
import { WaFab } from "@/components/wa-fab";

export default async function Home() {
  /*
   * CSP kita berbasis nonce, dan nonce cuma bisa disuntikkan saat render
   * per-permintaan. Tanpa baris ini halaman di-prerender saat build — HTML-nya
   * lahir tanpa nonce, lalu CSP memblokir skrip bootstrap Next dan hidrasi
   * gagal (React #412). `connection()` menahan render sampai ada permintaan
   * masuk, sehingga Next bisa menempelkan nonce ke skripnya sendiri.
   */
  await connection();

  return (
    <>
      <a
        href="#pricelist"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[60] focus:rounded-full focus:bg-acid focus:px-5 focus:py-3 focus:font-display focus:font-bold focus:text-black"
      >
        Langsung ke pricelist
      </a>

      <SiteNav />

      <main className="flex-1">
        <Hero />
        <AppMarquee />
        <Pricelist />
        <HowToOrder />
        <Payment />
        <WhyUs />
        <ResellerCta />
      </main>

      <SiteFooter />
      <WaFab />
    </>
  );
}
