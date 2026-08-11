import { MousePointerClick, QrCode, Send } from "lucide-react";
import { Reveal } from "@/components/reveal";

const STEPS = [
  {
    icon: MousePointerClick,
    title: "Pilih paketnya",
    body: "Scroll pricelist, tap tombol di paket yang kamu mau. WhatsApp langsung kebuka lengkap sama nama aplikasi, paket, dan harganya.",
  },
  {
    icon: QrCode,
    title: "Bayar pakai QRIS",
    body: "Scan QRIS byfadayen pakai e-wallet atau m-banking apa pun. Nominalnya sesuai harga paket, nggak ada biaya tambahan.",
  },
  {
    icon: Send,
    title: "Kirim bukti bayar",
    body: "Kirim screenshot bukti transfer ke admin. Akun dikirim beserta cara pakainya — tinggal login, beres.",
  },
];

export function HowToOrder() {
  return (
    <section
      id="cara-order"
      className="scroll-mt-28 border-t border-line px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-acid">
            Cara order
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(2rem,6vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em]">
            Tiga langkah, <span className="text-acid">lima menit.</span>
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal
              key={step.title}
              as="li"
              delay={i * 0.08}
              className="group relative overflow-hidden rounded-4xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-line-strong sm:p-8"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-3 -top-6 font-display text-[7rem] font-bold leading-none text-white/[0.045] transition-colors duration-300 group-hover:text-acid/10"
              >
                {i + 1}
              </span>

              <span className="grid size-12 place-items-center rounded-2xl bg-acid/12 text-acid ring-1 ring-inset ring-acid/20">
                <step.icon className="size-5.5" aria-hidden />
              </span>

              <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-cream">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
