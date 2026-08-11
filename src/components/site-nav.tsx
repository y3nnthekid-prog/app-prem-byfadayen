"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { STORE, WA } from "@/lib/store";

const LINKS = [
  { href: "#pricelist", label: "Pricelist" },
  { href: "#cara-order", label: "Cara Order" },
  { href: "#pembayaran", label: "Pembayaran" },
  { href: "#reseller", label: "Reseller" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 12);
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Kunci scroll body saat menu mobile kebuka.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-line py-2.5"
          : "border-b border-transparent py-4"
      }`}
    >
      {/* Indikator progres baca — dekoratif, jadi disembunyikan dari screen reader */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-acid via-cyan to-violet transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />

      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        <a
          href="#top"
          className="-my-1 flex min-h-11 items-center gap-2.5 py-1"
          aria-label={`${STORE.fullName} — ke atas`}
        >
          <Image
            src="/brand/logo-icon-white.png"
            alt=""
            width={96}
            height={166}
            priority
            className="h-8 w-auto sm:h-9"
          />
          <span className="font-display text-sm font-bold leading-none tracking-tight">
            app prem
            <span className="block font-sans text-[11px] font-medium text-muted">
              {STORE.owner}
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:bg-white/5 hover:text-cream"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={WA.general}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden cursor-pointer items-center gap-2 rounded-full bg-acid px-4 py-2.5 font-display text-sm font-bold text-black transition-transform duration-200 hover:scale-[1.03] active:scale-95 sm:inline-flex"
          >
            <MessageCircle className="size-4" aria-hidden />
            Chat Admin
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-line text-cream transition-colors duration-200 hover:bg-white/5 md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="menu-mobile"
          className="mt-2.5 border-t border-line bg-ink px-5 pb-6 pt-4 shadow-2xl md:hidden"
        >
          <div className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3.5 font-display text-lg font-bold text-cream transition-colors duration-200 hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href={WA.general}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-acid px-4 py-3.5 font-display text-base font-bold text-black"
          >
            <MessageCircle className="size-4" aria-hidden />
            Chat Admin
          </a>
        </div>
      )}
    </header>
  );
}
