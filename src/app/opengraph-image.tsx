import { ImageResponse } from "next/og";
import { APPS, CHEAPEST, TOTAL_VARIANTS, formatPrice } from "@/lib/pricelist";
import { STORE } from "@/lib/store";

export const alt = `${STORE.fullName} — pricelist akun aplikasi premium`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STATS = [
  { value: String(APPS.length), label: "aplikasi" },
  { value: String(TOTAL_VARIANTS), label: "paket" },
  { value: formatPrice(CHEAPEST), label: "termurah" },
];

const LINES = [
  { text: "AKUN PREMIUM", color: "#f5f5f7", slab: false },
  { text: "TANPA BIKIN", color: "#08080a", slab: true },
  { text: "DOMPET NANGIS.", color: "#c8ff00", slab: false },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080a",
          // satori nggak punya blur, jadi glow-nya pakai radial gradient
          backgroundImage:
            "radial-gradient(circle at 88% 8%, rgba(200,255,0,0.22), rgba(8,8,10,0) 42%), radial-gradient(circle at 4% 96%, rgba(124,92,255,0.38), rgba(8,8,10,0) 48%)",
          padding: 68,
          color: "#f5f5f7",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#c8ff00",
            }}
          />
          <div style={{ fontSize: 25, letterSpacing: 5, color: "#a2a2ae" }}>
            {STORE.fullName.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {LINES.map((line) => (
            <div
              key={line.text}
              style={{
                fontSize: 88,
                fontWeight: 800,
                lineHeight: 1.04,
                letterSpacing: -3,
                color: line.color,
                // alignSelf bikin slab-nya selebar teks tanpa div pembungkus,
                // dan padding ditulis longhand — satori rewel sama shorthand
                ...(line.slab
                  ? {
                      background: "#f5f5f7",
                      alignSelf: "flex-start",
                      paddingTop: 2,
                      paddingBottom: 12,
                      paddingLeft: 18,
                      paddingRight: 18,
                    }
                  : {}),
              }}
            >
              {line.text}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 60 }}>
          {STATS.map((stat) => (
            <div
              key={stat.label}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div style={{ fontSize: 50, fontWeight: 700 }}>{stat.value}</div>
              <div style={{ fontSize: 25, color: "#a2a2ae" }}>{stat.label}</div>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              background: "#c8ff00",
              color: "#08080a",
              fontSize: 29,
              fontWeight: 700,
              padding: "18px 34px",
              borderRadius: 999,
            }}
          >
            {STORE.adminPhoneDisplay}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
