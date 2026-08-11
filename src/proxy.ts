import { NextResponse, type NextRequest } from "next/server";

/**
 * Content-Security-Policy berbasis nonce.
 *
 * Setiap permintaan mendapat nonce acak sekali-pakai. Skrip inline hanya
 * dijalankan browser bila membawa nonce yang sama — jadi payload XSS yang
 * disuntikkan penyerang (yang tidak mungkin menebak nonce) langsung diblokir.
 * Next.js membaca header CSP di sini lalu otomatis menempelkan nonce ke skrip
 * kerangkanya sendiri (React/hidrasi).
 *
 * Catatan: nonce menuntut render dinamis per-permintaan, jadi halaman tidak
 * lagi murni statis. Isi situs ini tidak berubah per pengunjung, jadi hasilnya
 * tetap dilayani cepat dari edge Vercel — yang hilang cuma status "prerendered".
 */
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";

  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    // Situs ini tidak memuat gambar dari domain lain, jadi tak perlu buka https:
    // seperti di lulushes — cukup berkas sendiri plus data: URI.
    "img-src 'self' data:",
    "font-src 'self' data:",
    // Gaya inline dipakai untuk warna aksen tiap aplikasi, durasi blob, dan
    // jeda animasi kartu; risiko XSS lewat style jauh lebih kecil dari script.
    "style-src 'self' 'unsafe-inline'",
    // Kunci utama. 'self' menutupi skrip Next; nonce menutupi skrip inline yang
    // sah. 'unsafe-eval' hanya di dev karena React memakainya untuk pesan galat.
    `script-src 'self' 'nonce-${nonce}'${isDev ? " 'unsafe-eval'" : ""}`,
    // ws:/http: hanya di dev untuk hot-reload; di produksi cukup same-origin.
    `connect-src 'self'${isDev ? " ws: http:" : ""}`,
    // upgrade-insecure-requests memaksa https — jangan di dev (localhost http).
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    /*
     * Jalankan pada rute HTML saja. Yang dilewati:
     * - api, _next/static, _next/image, favicon.ico
     * - berkas statis di /public (logo, QR) — CSP tidak berlaku untuk gambar,
     *   dan tanpa pengecualian ini tiap aset memicu satu pemanggilan edge.
     * Prefetch dari <Link> juga dilewati agar tidak render dinamis sia-sia.
     */
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|txt|xml|webmanifest)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
