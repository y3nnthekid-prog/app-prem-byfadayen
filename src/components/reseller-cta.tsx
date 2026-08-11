import { ArrowUpRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { STORE, WA } from "@/lib/store";

const PERKS = [
  "Harga khusus reseller",
  "Tanpa minimal order",
  "Pricelist siap sebar",
];

export function ResellerCta() {
  return (
    <section
      id="reseller"
      className="scroll-mt-28 border-t border-line px-5 py-14 sm:px-8 sm:py-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-4xl border border-line bg-surface px-6 py-8 sm:px-9 sm:py-9">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-24 -z-10 size-72 rounded-full bg-acid/12 blur-[90px]"
            />

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div className="min-w-0">
                <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-acid sm:text-[11px]">
                  <Sparkles className="size-3.5" aria-hidden />
                  Buka slot reseller
                </span>

                <h2 className="mt-2.5 font-display text-2xl font-bold uppercase leading-tight tracking-[-0.02em] sm:text-3xl">
                  Jualan bareng, <span className="text-acid">untung bareng.</span>
                </h2>

                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {PERKS.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-center gap-2 text-sm text-muted"
                    >
                      <span
                        aria-hidden
                        className="size-1.5 shrink-0 rounded-full bg-acid"
                      />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="shrink-0">
                <a
                  href={WA.reseller}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-acid px-6 py-3.5 font-display text-sm font-bold text-black transition-transform duration-200 hover:scale-[1.03] active:scale-95 sm:text-base"
                >
                  Info Reseller
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <p className="mt-2.5 font-mono text-[11px] text-muted lg:text-right">
                  {STORE.adminPhoneDisplay}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
