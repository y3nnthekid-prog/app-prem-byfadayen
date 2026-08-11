"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { WA } from "@/lib/store";

/** Tombol chat melayang — muncul setelah user scroll lewat hero. */
export function WaFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={WA.general}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-4 z-40 inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-acid px-4 font-display text-xs font-bold text-black shadow-[0_12px_40px_-12px_rgba(200,255,0,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 sm:bottom-8 sm:right-8 sm:gap-2.5 sm:px-5 sm:text-sm ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <MessageCircle className="size-4.5" aria-hidden />
      Chat Admin
    </a>
  );
}
