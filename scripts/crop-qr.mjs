/**
 * Potong area QR dari kartu QRIS resmi jadi PNG beralfa: modul gelap opaque
 * (warna ink), latar putih transparan — supaya bisa ditaruh di kartu acid.
 *
 * Pola modulnya TIDAK digambar ulang, cuma dipotong dan diwarnai, jadi data
 * QR-nya tetap sama persis dengan aslinya.
 *
 * Pakai:
 *   node scripts/crop-qr.mjs public/brand/qris-byfadayen.png public/brand/qris-code.png
 */
import path from "node:path";
import sharp from "sharp";

const SRC = process.argv[2];
const OUT = process.argv[3];

if (!SRC || !OUT) {
  console.error("Pakai: node scripts/crop-qr.mjs <sumber.png> <hasil.png>");
  process.exit(1);
}

const { data, info } = await sharp(SRC)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

/* Hanya hitung piksel gelap yang NETRAL. Dekorasi merah pada kartu QRIS ikut
   jadi "gelap" kalau diubah ke grayscale, dan itu merusak deteksi. */
const isModule = (x, y) => {
  const i = (y * W + x) * 3;
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const max = Math.max(r, g, b);
  return max < 120 && max - Math.min(r, g, b) < 45;
};

const colCount = new Array(W).fill(0);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) if (isModule(x, y)) colCount[x]++;
}

/* QR adalah objek terlebar yang padat, jadi kiri/kanan diambil dari kolom. */
const colTh = H * 0.06;
let left = colCount.findIndex((n) => n >= colTh);
let right =
  colCount.length - 1 - [...colCount].reverse().findIndex((n) => n >= colTh);

// Ambang baris dihitung relatif terhadap lebar QR, bukan lebar gambar.
const rowTh = (right - left + 1) * 0.18;
const rowsInSpan = [];
for (let y = 0; y < H; y++) {
  let n = 0;
  for (let x = left; x <= right; x++) if (isModule(x, y)) n++;
  rowsInSpan.push(n);
}

// Pita baris padat terpanjang, dengan toleransi jeda (QR punya baris tipis).
const GAP = 40;
const bands = [];
let cur = null;
for (let y = 0; y < H; y++) {
  if (rowsInSpan[y] >= rowTh) {
    if (cur && y - cur.end <= GAP) cur.end = y;
    else {
      if (cur) bands.push(cur);
      cur = { start: y, end: y };
    }
  }
}
if (cur) bands.push(cur);
bands.sort((a, b) => b.end - b.start - (a.end - a.start));
const band = bands[0];

// QR itu persegi — sisinya disamakan supaya tidak ada modul yang terpotong.
const side = Math.max(right - left + 1, band.end - band.start + 1);
const cx = Math.round((left + right) / 2);
const cy = Math.round((band.start + band.end) / 2);
left = Math.max(0, cx - Math.round(side / 2));
const top = Math.max(0, cy - Math.round(side / 2));
const cropW = Math.min(side, W - left);
const cropH = Math.min(side, H - top);

const crop = await sharp(SRC)
  .removeAlpha()
  .grayscale()
  .extract({ left, top, width: cropW, height: cropH })
  .raw()
  .toBuffer();

const rgba = Buffer.alloc(cropW * cropH * 4);
for (let i = 0; i < cropW * cropH; i++) {
  rgba[i * 4 + 0] = 8; // #08080a
  rgba[i * 4 + 1] = 8;
  rgba[i * 4 + 2] = 10;
  rgba[i * 4 + 3] = 255 - crop[i]; // hitam -> pekat, putih -> tembus
}

await sharp(rgba, { raw: { width: cropW, height: cropH, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log(
  `${path.basename(OUT)} — potong ${cropW}x${cropH} dari (${left}, ${top}) di ${W}x${H}`,
);
console.log("Pindai sekali sebelum dipakai, ya.");
