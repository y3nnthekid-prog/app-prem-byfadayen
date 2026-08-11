"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, MessageCircle } from "lucide-react";
import {
  APPS,
  CHEAPEST,
  TOTAL_VARIANTS,
  bestSellers,
  formatPrice,
} from "@/lib/pricelist";
import { WA } from "@/lib/store";

const SPECS = [
  "Open order",
  "Admin fast respon",
  "QRIS · e-wallet · m-banking",
  "Garansi masa aktif",
];

const STATS = [
  { value: String(APPS.length), label: "aplikasi siap kirim" },
  { value: String(TOTAL_VARIANTS), label: "pilihan paket" },
  { value: formatPrice(CHEAPEST), label: "harga termurah" },
];

const TOP = bestSellers().slice(0, 4);

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="top" className="noise relative isolate overflow-hidden pt-20">
      {/* Latar: blob neon + grid halus */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="blob absolute -left-32 -top-32 size-[36rem] rounded-full bg-violet/25 blur-[130px]"
          style={{ "--drift-duration": "26s" } as React.CSSProperties}
        />
        <div
          className="blob absolute -right-40 top-1/4 size-[32rem] rounded-full bg-acid/12 blur-[140px]"
          style={
            { "--drift-duration": "31s", "--drift-delay": "-8s" } as React.CSSProperties
          }
        />
        <div
          className="blob absolute -bottom-48 left-1/4 size-[30rem] rounded-full bg-pink/18 blur-[130px]"
          style={
            { "--drift-duration": "24s", "--drift-delay": "-14s" } as React.CSSProperties
          }
        />
        <div className="grid-lines absolute inset-0" />
      </div>

      {/* Bilah spesifikasi — menggantikan pill mengambang yang biasa */}
      <motion.div {...rise(0)} className="border-y border-line">
        <ul className="mx-auto flex w-full max-w-7xl items-center gap-5 overflow-x-auto px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted [scrollbar-width:none] sm:gap-8 sm:px-8 sm:text-[11px]">
          {SPECS.map((spec, i) => (
            <li key={spec} className="flex shrink-0 items-center gap-2.5">
              {i === 0 ? (
                <span
                  aria-hidden
                  className="pulse-ring size-1.5 shrink-0 rounded-full bg-acid"
                />
              ) : (
                <span aria-hidden className="h-3 w-px shrink-0 bg-line-strong" />
              )}
              {spec}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Bento: kolom kiri judul, kolom kanan papan angka + paket terlaris.
          Celah 1px di atas latar garis bikin kesan panel, bukan kartu terpisah. */}
      <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 sm:py-10">
        <motion.div
          {...rise(0.08)}
          className="grid gap-px overflow-hidden rounded-4xl border border-line bg-line lg:grid-cols-3"
        >
          {/* --- Panel judul --- */}
          <div className="flex flex-col justify-center gap-7 bg-ink p-6 sm:p-10 lg:col-span-2 lg:row-span-2">
            <h1 className="font-display text-[clamp(2.4rem,7.2vw,5.25rem)] font-bold uppercase leading-[0.92] tracking-[-0.03em]">
              <span className="block text-cream">Akun premium</span>
              {/* Slab dibalik jadi cream: baris ini dulu outline dan hilang,
                  sempat violet dan malah keluar dari palet inti */}
              <span className="my-1.5 inline-block bg-cream px-3 pb-1.5 pt-0.5 text-ink sm:my-2 sm:px-4">
                tanpa bikin
              </span>
              <span className="acid-glow block text-acid">dompet nangis.</span>
            </h1>

            <div>
              <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">
                Bayar QRIS, kirim bukti, akun meluncur. Sesederhana itu.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#pricelist"
                  className="group inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full bg-acid px-7 py-4 font-display text-base font-bold text-black transition-transform duration-200 hover:scale-[1.03] active:scale-95"
                >
                  Lihat Pricelist
                  <ArrowDown className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                </a>
                <a
                  href={WA.general}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full border border-line-strong px-7 py-4 font-display text-base font-bold text-cream transition-colors duration-200 hover:border-acid hover:text-acid"
                >
                  <MessageCircle className="size-4" aria-hidden />
                  Tanya Admin
                </a>
              </div>
            </div>
          </div>

          {/* --- Panel angka --- */}
          <dl className="flex flex-col bg-ink">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col-reverse gap-1 border-b border-line px-6 py-5 last:border-b-0 sm:px-8 sm:py-6"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:text-[11px]">
                  {stat.label}
                </dt>
                <dd className="tabular font-display text-3xl font-bold leading-none text-cream sm:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* --- Panel paling dicari --- */}
          <div className="flex flex-col bg-ink px-6 py-5 sm:px-8 sm:py-6">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-acid sm:text-[11px]">
              Paling dicari minggu ini
            </h2>
            <ul className="mt-3 flex flex-col">
              {TOP.map(({ app, variant }) => (
                <li key={`${app.slug}-${variant.label}`}>
                  <a
                    href={WA.order(
                      app.name,
                      variant.label,
                      formatPrice(variant.price),
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 border-b border-line py-3 transition-colors duration-200 last:border-b-0 hover:border-line-strong"
                  >
                    <span
                      aria-hidden
                      className="grid size-8 shrink-0 place-items-center rounded-lg font-display text-[11px] font-bold ring-1 ring-inset ring-white/10"
                      style={{
                        backgroundColor: `${app.accent}1f`,
                        color: app.accent,
                      }}
                    >
                      {app.glyph}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-cream">
                        {app.name}
                      </span>
                      <span className="block truncate text-[11px] text-muted">
                        {variant.label}
                      </span>
                    </span>
                    <span className="tabular shrink-0 font-mono text-sm font-semibold text-cream transition-colors duration-200 group-hover:text-acid">
                      {formatPrice(variant.price)}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 shrink-0 text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-acid"
                    />
                    <span className="sr-only">
                      Pesan {app.name} {variant.label} lewat WhatsApp
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
