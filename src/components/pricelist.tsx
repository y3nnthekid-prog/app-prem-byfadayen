"use client";

import { useMemo, useState } from "react";
import { Search, SearchX, SlidersHorizontal, X } from "lucide-react";
import {
  APPS,
  CATEGORIES,
  lowestPrice,
  type CategoryId,
} from "@/lib/pricelist";
import { AppCard } from "@/components/app-card";

type Sort = "populer" | "termurah" | "termahal";
type Filter = CategoryId | "semua";

const SORTS: { id: Sort; label: string }[] = [
  { id: "populer", label: "Populer" },
  { id: "termurah", label: "Termurah" },
  { id: "termahal", label: "Termahal" },
];

export function Pricelist() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("semua");
  const [sort, setSort] = useState<Sort>("populer");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    const matched = APPS.filter((app) => {
      if (filter !== "semua" && app.category !== filter) return false;
      if (!q) return true;

      const haystack = [
        app.name,
        app.blurb,
        CATEGORIES.find((c) => c.id === app.category)?.label ?? "",
        ...app.variants.map((v) => v.label),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });

    if (sort === "populer") return matched;

    return [...matched].sort((a, b) =>
      sort === "termurah"
        ? lowestPrice(a) - lowestPrice(b)
        : lowestPrice(b) - lowestPrice(a),
    );
  }, [query, filter, sort]);

  const variantCount = results.reduce((n, app) => n + app.variants.length, 0);
  const isFiltered = query.trim() !== "" || filter !== "semua";

  return (
    <section id="pricelist" className="scroll-mt-28 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-acid">
              Daftar harga
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,6vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em]">
              Pilih paketmu,
              <br />
              <span className="outline-type">langsung gas.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Tap paket yang kamu mau — WhatsApp bakal kebuka lengkap sama detail
            pesanannya. Nggak perlu ngetik ulang.
          </p>
        </div>

        {/* Kontrol: cari, kategori, urutan */}
        <div className="mt-10 flex flex-col gap-4">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-muted"
              aria-hidden
            />
            <label htmlFor="cari-app" className="sr-only">
              Cari aplikasi atau paket
            </label>
            <input
              id="cari-app"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari Canva, Spotify, drakor, 1 tahun…"
              className="h-14 w-full rounded-full border border-line bg-surface pl-13 pr-13 text-base text-cream placeholder:text-muted/70 transition-colors duration-200 focus:border-acid focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Hapus pencarian"
                className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-muted transition-colors duration-200 hover:bg-white/5 hover:text-cream"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div
              role="group"
              aria-label="Filter kategori"
              className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
            >
              <FilterPill
                active={filter === "semua"}
                onClick={() => setFilter("semua")}
                label="Semua"
                count={APPS.length}
              />
              {CATEGORIES.map((category) => (
                <FilterPill
                  key={category.id}
                  active={filter === category.id}
                  onClick={() => setFilter(category.id)}
                  label={category.label}
                  dot={category.accent}
                  count={APPS.filter((a) => a.category === category.id).length}
                />
              ))}
            </div>

            <div className="flex items-center gap-2.5">
              <SlidersHorizontal
                className="size-4 shrink-0 text-muted"
                aria-hidden
              />
              <div
                role="group"
                aria-label="Urutkan"
                className="flex rounded-full border border-line bg-surface p-1"
              >
                {SORTS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSort(option.id)}
                    aria-pressed={sort === option.id}
                    className={`inline-flex min-h-10 cursor-pointer items-center rounded-full px-3.5 py-2 text-xs font-semibold transition-colors duration-200 sm:text-sm ${
                      sort === option.id
                        ? "bg-cream text-black"
                        : "text-muted hover:text-cream"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p
          aria-live="polite"
          className="mt-6 font-mono text-xs uppercase tracking-[0.1em] text-muted"
        >
          {results.length} aplikasi · {variantCount} paket
          {isFiltered && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("semua");
              }}
              className="ml-3 cursor-pointer text-acid underline underline-offset-4 hover:text-cream"
            >
              reset
            </button>
          )}
        </p>

        {results.length > 0 ? (
          <div
            // key: paksa animasi masuk diputar ulang tiap filter berubah
            key={`${filter}-${sort}-${query}`}
            className="mt-6 gap-5 sm:columns-2 xl:columns-3"
          >
            {results.map((app, i) => (
              <AppCard key={app.slug} app={app} index={i} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-4xl border border-dashed border-line-strong px-6 py-16 text-center">
            <SearchX className="mx-auto size-9 text-muted" aria-hidden />
            <p className="mt-4 font-display text-2xl font-bold text-cream">
              Nggak ketemu nih
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
              Coba kata kunci lain, atau chat admin — siapa tahu stoknya ada tapi
              belum masuk daftar.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("semua");
              }}
              className="mt-6 cursor-pointer rounded-full bg-acid px-6 py-3 font-display text-sm font-bold text-black transition-transform duration-200 hover:scale-[1.03] active:scale-95"
            >
              Tampilkan semua
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function FilterPill({
  active,
  onClick,
  label,
  count,
  dot,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  dot?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ${
        active
          ? "border-acid bg-acid text-black"
          : "border-line bg-surface text-muted hover:border-line-strong hover:text-cream"
      }`}
    >
      {dot && (
        <span
          aria-hidden
          className="size-2 rounded-full"
          style={{ backgroundColor: active ? "#08080a" : dot }}
        />
      )}
      {label}
      <span
        className={`tabular font-mono text-[11px] ${active ? "text-black/60" : "text-muted/70"}`}
      >
        {count}
      </span>
    </button>
  );
}
