# app prem byfadayen

Website pricelist akun aplikasi premium. Satu halaman, dark neon, dioptimalkan buat dibuka dari
HP dan dishare lewat WhatsApp/Instagram bio.

## Jalanin lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Yang paling sering diubah

| Mau ubah apa | File |
| --- | --- |
| Harga, paket, aplikasi baru, badge | `src/lib/pricelist.ts` |
| Nomor admin, nama toko, data QRIS | `src/lib/store.ts` |
| Teks tombol/pesan WhatsApp otomatis | `src/lib/store.ts` (objek `WA`) |
| Warna & font | `src/app/globals.css` (blok `@theme`) |
| Gambar QRIS & logo | `public/brand/` |

### Kalau QRIS-nya ganti

Sumber aslinya disimpan di luar `public/` supaya tidak ikut ter-deploy:

- `assets/qris-byfadayen-original.png` — kartu QRIS **resmi** yang utuh,
  apa adanya. Ini cuma bahan mentah, tidak disajikan ke pengunjung.
- `public/brand/qris-code.png` — **hasil potong**: cuma kode QR-nya, latar
  transparan, dipakai di kartu acid pada halaman.
- `public/brand/qris-code-print.png` — QR hitam di atas putih. Ini yang
  terunduh waktu pengunjung menekan "Simpan QRIS" (versi transparan bisa jadi
  hitam-di-atas-hitam kalau disimpan ke galeri).

Kalau kamu dapat QRIS baru, timpa berkas di `assets/` lalu buat ulang
potongannya:

```bash
node scripts/crop-qr.mjs assets/qris-byfadayen-original.png public/brand/qris-code.png
```

Skrip ini **tidak menggambar ulang** pola QR-nya — cuma memotong dan mengganti
warna, jadi data di dalamnya tetap sama persis. Setelah itu buka halaman dan
coba pindai sekali sebelum dipakai.

### Nambah aplikasi baru

Tambahkan satu objek di array `APPS` (`src/lib/pricelist.ts`):

```ts
{
  slug: "netflix",
  name: "Netflix",
  category: "streaming",          // kreatif | streaming | ai | belajar
  blurb: "Satu kalimat jualan.",
  accent: "#e50914",              // warna brand, dipakai buat glow kartu
  glyph: "Nf",                    // 1-2 huruf di tile
  variants: [
    { label: "Private 1 Bulan", price: 45000, badge: "TERLARIS" },
  ],
},
```

Jumlah aplikasi, jumlah paket, dan harga termurah di hero **ikut ngitung sendiri** —
nggak perlu diedit manual.

Badge yang tersedia: `TERLARIS`, `HEMAT`, `GARANSI`, `PRIVATE` (opsional, boleh dikosongin).

### Ganti nomor admin

Di `src/lib/store.ts`:

```ts
adminPhone: "628138840266",        // format internasional, tanpa + dan tanpa spasi
adminPhoneDisplay: "+62 813-8840-266",
```

Semua tombol order, tombol reseller, dan FAB otomatis ikut.

## Memeriksa sebelum push

```bash
npm run lint
npm run build
```

`npm run build` sekaligus memeriksa tipe. Jangan pakai `npx tsc --noEmit`
sendirian di checkout yang bersih — tipe global seperti `LayoutProps` baru
dihasilkan Next saat build (lewat `next-env.d.ts` yang di-gitignore), jadi tsc
akan gagal padahal kodenya benar.

## Keamanan

| Lapisan | Di mana |
| --- | --- |
| CSP berbasis nonce | `src/proxy.ts` |
| HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy | `next.config.ts` |
| npm audit, CodeQL, Gitleaks, dependency-review | `.github/workflows/security.yml` |
| ZAP Baseline mingguan ke situs live | `.github/workflows/zap.yml` |
| Pemutakhiran dependensi otomatis | `.github/dependabot.yml` |

Di sisi GitHub juga aktif: secret scanning + push protection, Dependabot
alerts + automated security fixes, dan ruleset "Lindungi main" yang memblokir
force-push dan penghapusan cabang.

### Kenapa halaman utama dinamis

`src/app/page.tsx` memanggil `await connection()`. Ini **bukan** hiasan.

Nonce hanya bisa disuntikkan Next saat render per-permintaan. Tanpa
`connection()` halaman di-prerender saat build, HTML-nya lahir tanpa atribut
`nonce`, lalu CSP memblokir skrip bootstrap Next dan hidrasi gagal dengan
React error #412 — situs tampil tapi mati total, tanpa pesan galat yang jelas.

Jadi kalau kamu menghapus baris itu, atau memindahkan `page.tsx` ke rute yang
statis, **uji dulu dengan `npm run build && npm start`** lalu buka konsol
browser. Cek cepatnya: setiap `<script>` inline di HTML harus punya `nonce=`
yang sama dengan nonce di header `Content-Security-Policy`.

Biaya render dinamis di sini kecil — tidak ada pengambilan data sama sekali,
dan hasilnya tetap dilayani cepat dari edge Vercel.

## Deploy

Repo sudah tersambung ke Vercel, jadi **push ke `main` otomatis deploy ke
produksi**. Nggak ada env var yang wajib diisi.

Kalau perlu rilis manual dari folder ini:

```bash
npx vercel deploy --prod --yes
```

Kalau pakai domain sendiri (atau hosting selain Vercel), set `NEXT_PUBLIC_SITE_URL`
biar preview link (OG image) nunjuk ke domain yang benar. Lihat `.env.example`.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS 4 · Motion · lucide-react
