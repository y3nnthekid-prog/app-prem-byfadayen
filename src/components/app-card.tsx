import { ArrowUpRight } from "lucide-react";
import {
  CATEGORIES,
  formatPrice,
  lowestPrice,
  type App,
  type Badge,
} from "@/lib/pricelist";
import { WA } from "@/lib/store";

const BADGE_STYLE: Record<Badge, string> = {
  TERLARIS: "bg-acid text-black",
  HEMAT: "bg-cyan text-black",
  GARANSI: "bg-violet text-white",
  PRIVATE: "border border-line-strong bg-white/5 text-muted",
};

export function AppCard({ app, index }: { app: App; index: number }) {
  const category = CATEGORIES.find((c) => c.id === app.category);

  return (
    <article
      className="card-in accent-card group mb-5 break-inside-avoid rounded-4xl border border-line bg-surface p-5 sm:p-6"
      style={
        {
          animationDelay: `${Math.min(index, 14) * 45}ms`,
          "--card-accent": app.accent,
        } as React.CSSProperties
      }
    >
      <div className="flex items-start gap-3.5">
        <span
          aria-hidden
          className="grid size-12 shrink-0 place-items-center rounded-2xl font-display text-lg font-bold ring-1 ring-inset ring-white/10 transition-transform duration-300 group-hover:scale-105 sm:size-14 sm:text-xl"
          style={{
            backgroundColor: `${app.accent}1f`,
            color: app.accent,
          }}
        >
          {app.glyph}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl font-bold leading-tight tracking-tight text-cream sm:text-2xl">
            {app.name}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.1em] text-muted">
            <span
              aria-hidden
              className="size-1.5 rounded-full"
              style={{ backgroundColor: category?.accent }}
            />
            {category?.label}
          </p>
        </div>

        <p className="shrink-0 text-right">
          <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
            mulai
          </span>
          <span className="tabular block font-display text-base font-bold text-cream sm:text-lg">
            {formatPrice(lowestPrice(app))}
          </span>
        </p>
      </div>

      <p className="mt-3.5 text-sm leading-relaxed text-muted">{app.blurb}</p>

      <ul className="mt-4 flex flex-col gap-2">
        {app.variants.map((variant) => (
          <li key={variant.label}>
            <a
              href={WA.order(app.name, variant.label, formatPrice(variant.price))}
              target="_blank"
              rel="noopener noreferrer"
              className="group/v flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-line/70 bg-surface-2 px-4 py-3 transition-colors duration-200 hover:border-line-strong hover:bg-white/[0.05]"
            >
              <span className="min-w-0">
                <span className="block text-sm leading-snug text-cream">
                  {variant.label}
                </span>
                {variant.badge && (
                  <span
                    className={`mt-1.5 inline-block rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] ${BADGE_STYLE[variant.badge]}`}
                  >
                    {variant.badge}
                  </span>
                )}
              </span>

              <span className="flex shrink-0 items-center gap-2.5">
                <span className="tabular font-mono text-sm font-semibold text-cream transition-colors duration-200 group-hover/v:text-acid">
                  {formatPrice(variant.price)}
                </span>
                <span
                  aria-hidden
                  className="grid size-8 place-items-center rounded-full border border-line text-muted transition-all duration-200 group-hover/v:border-acid group-hover/v:bg-acid group-hover/v:text-black"
                >
                  <ArrowUpRight className="size-4" />
                </span>
              </span>
              <span className="sr-only">
                Pesan {app.name} {variant.label} lewat WhatsApp
              </span>
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}
