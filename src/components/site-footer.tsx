import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { APPS, TOTAL_VARIANTS } from "@/lib/pricelist";
import { STORE, WA } from "@/lib/store";

const LINKS = [
  { href: "#pricelist", label: "Pricelist" },
  { href: "#cara-order", label: "Cara Order" },
  { href: "#pembayaran", label: "Pembayaran" },
  { href: "#reseller", label: "Info Reseller" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line px-5 pb-32 pt-16 sm:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Image
              src="/brand/logo-lockup-white.png"
              alt={STORE.fullName}
              width={500}
              height={321}
              className="h-24 w-auto"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {APPS.length} aplikasi premium, {TOTAL_VARIANTS} pilihan paket,
              satu admin yang bisa kamu chat kapan aja.
            </p>
          </div>

          <nav aria-label="Navigasi footer">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Menu
            </h2>
            <ul className="mt-2 flex flex-col">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-cream/85 transition-colors duration-200 hover:text-acid"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Admin
            </h2>
            <div className="mt-4 flex flex-col items-start gap-2.5">
              <a
                href={WA.general}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-2xl border border-line bg-surface px-4 py-3 transition-colors duration-200 hover:border-acid"
              >
                <MessageCircle
                  className="size-4 shrink-0 text-acid"
                  aria-hidden
                />
                <span className="text-sm font-semibold text-cream">
                  Order & tanya-tanya
                </span>
              </a>
              <a
                href={WA.reseller}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-2xl border border-line bg-surface px-4 py-3 transition-colors duration-200 hover:border-acid"
              >
                <Phone className="size-4 shrink-0 text-acid" aria-hidden />
                <span className="text-sm font-semibold text-cream">
                  Info jadi reseller
                </span>
              </a>
            </div>
            <p className="tabular mt-3 font-mono text-sm text-muted">
              {STORE.adminPhoneDisplay}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {STORE.fullName}. Semua harga bisa
            berubah sewaktu-waktu.
          </p>
          <p className="text-xs text-muted/70">
            Nama dan logo aplikasi adalah merek dagang pemiliknya masing-masing.
          </p>
        </div>
      </div>
    </footer>
  );
}
