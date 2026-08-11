import Image from "next/image";
import { CheckCircle2, Download, MessageCircle, ShieldAlert } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { STORE, WA } from "@/lib/store";

const WALLETS = [
  "GoPay",
  "OVO",
  "DANA",
  "ShopeePay",
  "LinkAja",
  "BCA Mobile",
  "BRImo",
  "Livin' Mandiri",
  "SeaBank",
  "Jago",
];

export function Payment() {
  return (
    <section
      id="pembayaran"
      className="scroll-mt-28 border-t border-line px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
          {/* QRIS */}
          <Reveal>
            <figure className="relative mx-auto w-full max-w-sm">
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-[3rem] bg-acid/12 blur-3xl"
              />

              {/* Kartu bayar versi tema: modul QR-nya dipotong langsung dari
                  QRIS resmi, cuma latarnya yang diganti acid. */}
              <div className="rounded-4xl bg-acid p-5 shadow-[0_30px_80px_-40px_rgba(200,255,0,0.8)] sm:p-6">
                <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
                  <span>QRIS</span>
                  <span className="opacity-60">{STORE.qris.terminal}</span>
                </div>

                <Image
                  src={STORE.qris.code}
                  alt={`Kode QRIS ${STORE.qris.merchant}, NMID ${STORE.qris.nmid}`}
                  width={600}
                  height={600}
                  // Disajikan apa adanya: optimizer Next pakai kompresi lossy,
                  // dan artefaknya bisa bikin QR susah dipindai. File-nya cuma 3 KB.
                  unoptimized
                  className="mt-4 h-auto w-full"
                />

                <p className="mt-4 border-t border-ink/15 pt-3 font-display text-sm font-bold uppercase tracking-tight text-ink">
                  {STORE.owner}
                </p>
              </div>

              <figcaption className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                {STORE.qris.merchant} · NMID {STORE.qris.nmid}
              </figcaption>
            </figure>
          </Reveal>

          {/* Penjelasan */}
          <Reveal delay={0.08}>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-acid">
              Pembayaran
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,6vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em]">
              Satu QRIS,
              <br />
              <span className="outline-type">semua aplikasi.</span>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
              Scan kode di samping pakai aplikasi apa pun yang berlogo QRIS.
              Nominalnya kamu isi sendiri sesuai harga paket yang dipilih.
            </p>

            <ul className="mt-7 flex flex-col gap-3">
              {[
                "Semua e-wallet & m-banking bisa, tanpa biaya admin dari kami.",
                `Pastikan nama merchant tertulis ${STORE.qris.merchant} sebelum bayar.`,
                "Simpan bukti transfernya — itu yang dikirim ke admin.",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm text-cream/85">
                  <CheckCircle2
                    className="mt-0.5 size-4.5 shrink-0 text-acid"
                    aria-hidden
                  />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-1.5">
              {WALLETS.map((wallet) => (
                <span
                  key={wallet}
                  className="rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-muted"
                >
                  {wallet}
                </span>
              ))}
              <span className="rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-muted">
                +semua bank
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={WA.general}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full bg-acid px-6 py-3.5 font-display text-sm font-bold text-black transition-transform duration-200 hover:scale-[1.03] active:scale-95"
              >
                <MessageCircle className="size-4" aria-hidden />
                Kirim Bukti ke Admin
              </a>
              <a
                href={STORE.qris.download}
                download="qris-byfadayen.png"
                className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full border border-line-strong px-6 py-3.5 font-display text-sm font-bold text-cream transition-colors duration-200 hover:border-acid hover:text-acid"
              >
                <Download className="size-4" aria-hidden />
                Simpan QRIS
              </a>
            </div>

            <p className="mt-6 flex gap-2.5 rounded-2xl border border-pink/25 bg-pink/[0.07] px-4 py-3 text-xs leading-relaxed text-cream/80">
              <ShieldAlert className="mt-0.5 size-4 shrink-0 text-pink" aria-hidden />
              <span>
                Transaksi hanya lewat nomor admin resmi{" "}
                <strong className="font-semibold text-cream">
                  {STORE.adminPhoneDisplay}
                </strong>
                . Hati-hati akun yang mengatasnamakan {STORE.owner}.
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
