import { APPS } from "@/lib/pricelist";

type MarqueeProps = {
  items: string[];
  reverse?: boolean;
  duration?: string;
};

function Track({ items, reverse, duration = "42s" }: MarqueeProps) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <div
        className="marquee-track flex w-max shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12"
        style={
          {
            "--marquee-duration": duration,
            "--marquee-direction": reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {/* Digandakan supaya loop-nya mulus */}
        {[...items, ...items].map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-8 sm:gap-12">
            <span className="whitespace-nowrap font-display text-2xl font-bold uppercase tracking-tight text-cream/35 sm:text-4xl">
              {item}
            </span>
            <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-acid/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function AppMarquee() {
  const names = APPS.map((app) => app.name);
  const half = Math.ceil(names.length / 2);

  return (
    <section
      aria-label="Aplikasi yang tersedia"
      className="relative border-y border-line bg-surface/40 py-7 sm:py-9"
    >
      <div className="flex flex-col gap-4 sm:gap-6">
        <Track items={names.slice(0, half)} duration="46s" />
        <Track items={names.slice(half)} duration="52s" reverse />
      </div>
    </section>
  );
}
