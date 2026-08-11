/** Konfigurasi toko — ubah di sini kalau ada perubahan kontak / merchant. */

export const STORE = {
  name: "app prem",
  owner: "byfadayen",
  fullName: "app prem byfadayen",
  tagline: "Akun aplikasi premium, harga anak sekolah.",
  /** Nomor admin format internasional tanpa tanda baca (untuk wa.me). */
  adminPhone: "628138840266",
  /** Nomor admin versi tampil. */
  adminPhoneDisplay: "+62 813-8840-266",
  qris: {
    merchant: "BYFADAYEN, HIBURAN",
    nmid: "ID1025448148383",
    terminal: "A01",
    /** QR bertema (latar transparan) yang tampil di kartu acid. */
    code: "/brand/qris-code.png",
    /** QR hitam di atas putih untuk tombol unduh — aman disimpan ke galeri. */
    download: "/brand/qris-code-print.png",
  },
} as const;

/** Bangun link wa.me dengan pesan yang sudah terisi. */
export function waLink(message: string) {
  return `https://wa.me/${STORE.adminPhone}?text=${encodeURIComponent(message)}`;
}

export const WA = {
  general: waLink(
    `Halo kak admin ${STORE.fullName}! Aku mau tanya-tanya soal akun premium dulu ya 🙌`,
  ),
  reseller: waLink(
    `Halo kak admin ${STORE.fullName}! Aku tertarik gabung jadi RESELLER. Boleh minta info harga reseller & cara daftarnya?`,
  ),
  order: (app: string, variant: string, price: string) =>
    waLink(
      `Halo kak admin ${STORE.fullName}! Aku mau order:\n\n` +
        `• Aplikasi : ${app}\n` +
        `• Paket    : ${variant}\n` +
        `• Harga    : ${price}\n\n` +
        `Ini bukti pembayarannya ya kak 🙏`,
    ),
};
