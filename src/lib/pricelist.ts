/**
 * Sumber tunggal daftar harga. Tambah / ubah produk cukup di file ini —
 * kartu, filter, pencarian, dan statistik di homepage ikut menyesuaikan.
 */

export type CategoryId = "kreatif" | "streaming" | "ai" | "belajar";

export type Category = {
  id: CategoryId;
  label: string;
  /** Warna aksen kategori (dipakai untuk pill filter & tag kartu). */
  accent: string;
};

export type Badge = "TERLARIS" | "HEMAT" | "GARANSI" | "PRIVATE";

export type Variant = {
  label: string;
  price: number;
  badge?: Badge;
};

export type App = {
  slug: string;
  name: string;
  category: CategoryId;
  /** Satu kalimat pendek buat jualan. */
  blurb: string;
  /** Warna brand, dipakai untuk glow + tile inisial. */
  accent: string;
  /** 1–2 huruf untuk tile. */
  glyph: string;
  variants: Variant[];
};

export const CATEGORIES: Category[] = [
  { id: "kreatif", label: "Desain & Editing", accent: "#c8ff00" },
  { id: "streaming", label: "Streaming & Hiburan", accent: "#ff3d9a" },
  { id: "ai", label: "AI & Kerja", accent: "#7c5cff" },
  { id: "belajar", label: "Belajar & Baca", accent: "#00e0c6" },
];

export const APPS: App[] = [
  {
    slug: "canva",
    name: "Canva",
    category: "kreatif",
    blurb: "Desain apa pun tanpa mikir, template-nya jutaan.",
    accent: "#00c4cc",
    glyph: "Cv",
    variants: [
      { label: "Pro Sebulan", price: 10000, badge: "TERLARIS" },
      { label: "Education Garansi Setahun", price: 20000, badge: "GARANSI" },
      { label: "Pro Setahun", price: 35000, badge: "HEMAT" },
    ],
  },
  {
    slug: "capcut",
    name: "CapCut",
    category: "kreatif",
    blurb: "Edit video ala FYP, semua efek pro kebuka.",
    accent: "#ff3b5c",
    glyph: "Cc",
    variants: [
      { label: "Pro 7 Hari", price: 15000 },
      { label: "Pro 30 Hari", price: 40000, badge: "TERLARIS" },
    ],
  },
  {
    slug: "wink",
    name: "Wink",
    category: "kreatif",
    blurb: "Perbaiki video buram jadi jernih dalam sekali tap.",
    accent: "#7c5cff",
    glyph: "Wk",
    variants: [{ label: "Private 7 Hari", price: 15000, badge: "PRIVATE" }],
  },
  {
    slug: "picsart",
    name: "Picsart",
    category: "kreatif",
    blurb: "Editor foto serba bisa plus tools AI-nya.",
    accent: "#c209c1",
    glyph: "Ps",
    variants: [{ label: "7 Days", price: 15000 }],
  },
  {
    slug: "meitu",
    name: "Meitu",
    category: "kreatif",
    blurb: "Retouch selfie sampai bikin foto ala studio.",
    accent: "#ff6b9d",
    glyph: "Mt",
    variants: [{ label: "VIP+ Private 1 Bulan", price: 37000, badge: "PRIVATE" }],
  },
  {
    slug: "alight-motion",
    name: "Alight Motion",
    category: "kreatif",
    blurb: "Motion graphic & AMV tanpa watermark, setahun penuh.",
    accent: "#ff6b35",
    glyph: "Am",
    variants: [{ label: "1 Tahun", price: 20000, badge: "HEMAT" }],
  },

  {
    slug: "spotify",
    name: "Spotify",
    category: "streaming",
    blurb: "Musik tanpa iklan, bisa offline, kualitas tinggi.",
    accent: "#1db954",
    glyph: "Sp",
    variants: [{ label: "Famplan", price: 25000, badge: "TERLARIS" }],
  },
  {
    slug: "youtube",
    name: "YouTube",
    category: "streaming",
    blurb: "No iklan, background play, YouTube Music ikut.",
    accent: "#ff0033",
    glyph: "Yt",
    variants: [{ label: "1 Bulan Indplan (Gsuit)", price: 22500, badge: "TERLARIS" }],
  },
  {
    slug: "prime-video",
    name: "Prime Video",
    category: "streaming",
    blurb: "Film & series Amazon Originals kualitas 4K.",
    accent: "#00a8e1",
    glyph: "Pv",
    variants: [{ label: "Private 1 Bulan", price: 20000, badge: "PRIVATE" }],
  },
  {
    slug: "hbo-max",
    name: "HBO Max",
    category: "streaming",
    blurb: "Rumahnya HBO Originals, DC, dan Warner Bros.",
    accent: "#7b2bff",
    glyph: "Hb",
    variants: [
      { label: "Standar 1 Bulan Private", price: 25050, badge: "PRIVATE" },
      { label: "Ultimate / Premium 1 Bulan Private", price: 45050 },
      { label: "Ultimate Share", price: 20050, badge: "HEMAT" },
    ],
  },
  {
    slug: "vidio",
    name: "Vidio",
    category: "streaming",
    blurb: "Liga Inggris, Champions, sinetron, semua ada.",
    accent: "#0093dd",
    glyph: "Vd",
    variants: [
      { label: "Platinum TV 1 Tahun Private", price: 20000, badge: "HEMAT" },
      { label: "Platinum Mobile 1 Bulan", price: 35000 },
    ],
  },
  {
    slug: "viu",
    name: "Viu",
    category: "streaming",
    blurb: "Drakor tayang cepat, subtitle Indonesia rapi.",
    accent: "#ffd400",
    glyph: "Vu",
    variants: [
      { label: "Biasa 1 Bulan", price: 12000 },
      { label: "Biasa 3 Bulan", price: 15000 },
      { label: "Biasa 6 Bulan", price: 18000 },
      { label: "Biasa 12 Bulan", price: 22000, badge: "HEMAT" },
    ],
  },
  {
    slug: "loklok",
    name: "Loklok",
    category: "streaming",
    blurb: "Drama Asia lengkap, bisa lanjut nonton di TV.",
    accent: "#ff7a00",
    glyph: "Lk",
    variants: [
      { label: "Sharing Basic (Tanpa TV) 30 Hari", price: 25000 },
      { label: "Sharing Standar Anlim (Bisa TV) 30 Hari", price: 28000 },
    ],
  },
  {
    slug: "bstation",
    name: "Bstation",
    category: "streaming",
    blurb: "Anime musim baru, simulcast tanpa iklan.",
    accent: "#fb7299",
    glyph: "Bs",
    variants: [
      { label: "Share 1 Bulan", price: 15000 },
      { label: "Share 3 Bulan", price: 18000 },
      { label: "Share 1 Tahun", price: 25000, badge: "HEMAT" },
      { label: "Private 1 Bulan", price: 38000, badge: "PRIVATE" },
    ],
  },
  {
    slug: "vision-plus",
    name: "Vision+",
    category: "streaming",
    blurb: "TV lokal, film, plus channel beIN Sports.",
    accent: "#e4002b",
    glyph: "V+",
    variants: [{ label: "Premium + Bein 1 Bulan", price: 28000 }],
  },
  {
    slug: "youku",
    name: "Youku",
    category: "streaming",
    blurb: "Drama & variety show China terbaru.",
    accent: "#00b4e5",
    glyph: "Yk",
    variants: [{ label: "Sharing 1 Bulan", price: 14000 }],
  },
  {
    slug: "iqiyi",
    name: "iQIYI",
    category: "streaming",
    blurb: "C-drama dan anime, rilis barengan Tiongkok.",
    accent: "#00be06",
    glyph: "iQ",
    variants: [{ label: "Standar 1 Bulan", price: 30050 }],
  },

  {
    slug: "chatgpt",
    name: "ChatGPT",
    category: "ai",
    blurb: "Model terbaru, respons cepat, tanpa antre.",
    accent: "#10a37f",
    glyph: "Gp",
    variants: [{ label: "Plus 1 Bulan (VCC)", price: 60000 }],
  },
  {
    slug: "gemini",
    name: "Gemini",
    category: "ai",
    blurb: "AI Google plus penyimpanan gede, setahun.",
    accent: "#4e8cff",
    glyph: "Gm",
    variants: [{ label: "1 Tahun", price: 50000, badge: "HEMAT" }],
  },
  {
    slug: "zoom",
    name: "Zoom",
    category: "ai",
    blurb: "Meeting tanpa putus di menit ke-40.",
    accent: "#2d8cff",
    glyph: "Zm",
    variants: [{ label: "Premium 14 Hari", price: 20000 }],
  },

  {
    slug: "duolingo",
    name: "Duolingo",
    category: "belajar",
    blurb: "Super: tanpa iklan, nyawa tak terbatas.",
    accent: "#58cc02",
    glyph: "Dl",
    variants: [{ label: "Super Private 1 Bulan", price: 12500, badge: "PRIVATE" }],
  },
  {
    slug: "scribd",
    name: "Scribd",
    category: "belajar",
    blurb: "Jutaan ebook, audiobook, dan dokumen riset.",
    accent: "#00a5b5",
    glyph: "Sc",
    variants: [{ label: "1 Bulan Private", price: 17000, badge: "PRIVATE" }],
  },
];

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function formatPrice(value: number) {
  // Hasil "Rp10.000" → beri spasi biar lebih enak dibaca.
  return rupiah.format(value).replace(/^Rp\s?/, "Rp ");
}

export function lowestPrice(app: App) {
  return Math.min(...app.variants.map((v) => v.price));
}

/** Paket ber-badge TERLARIS, dipakai di papan "paling dicari" pada hero. */
export function bestSellers() {
  return APPS.flatMap((app) =>
    app.variants
      .filter((variant) => variant.badge === "TERLARIS")
      .map((variant) => ({ app, variant })),
  );
}

export const TOTAL_VARIANTS = APPS.reduce((n, app) => n + app.variants.length, 0);

export const CHEAPEST = Math.min(...APPS.map(lowestPrice));
