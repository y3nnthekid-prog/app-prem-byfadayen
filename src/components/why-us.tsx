import { HeartHandshake, PiggyBank, ShieldCheck, Timer } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { CHEAPEST, formatPrice } from "@/lib/pricelist";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Garansi beneran",
    body: "Akun bermasalah di masa aktif? Diganti. Bukan cuma janji manis di caption.",
    accent: "text-acid",
  },
  {
    icon: Timer,
    title: "Prosesnya ngebut",
    body: "Bukti bayar masuk, akun disiapin. Rata-rata di bawah 10 menit di jam aktif.",
    accent: "text-cyan",
  },
  {
    icon: PiggyBank,
    title: "Harga paling waras",
    body: `Mulai ${formatPrice(CHEAPEST)}. Nggak perlu patungan sama lima orang dulu.`,
    accent: "text-violet",
  },
  {
    icon: HeartHandshake,
    title: "Adminnya manusia",
    body: "Dibales orang beneran, bukan bot. Bebas tanya-tanya dulu sebelum beli.",
    accent: "text-pink",
  },
];

export function WhyUs() {
  return (
    <section className="border-t border-line px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-acid">
            Kenapa di sini
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(2rem,6vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em]">
            Bukan toko sebelah yang{" "}
            <span className="outline-type">hilang habis transfer.</span>
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason, i) => (
            <Reveal
              key={reason.title}
              as="li"
              delay={i * 0.07}
              className="rounded-4xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-line-strong"
            >
              <reason.icon className={`size-7 ${reason.accent}`} aria-hidden />
              <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-cream">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {reason.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
