import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "YaComanda — Pedidos por WhatsApp con IA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          position: "relative",
        }}
      >
        {/* Green glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(22, 163, 74, 0.15)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(245, 158, 11, 0.1)",
            filter: "blur(80px)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 20,
            backgroundColor: "#16a34a",
            fontSize: 40,
            fontWeight: 800,
            color: "#fff",
            marginBottom: 32,
          }}
        >
          YC
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Pedidos por WhatsApp,
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            background: "linear-gradient(90deg, #4ade80, #16a34a)",
            backgroundClip: "text",
            color: "transparent",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          directo a cocina
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: "#94a3b8",
            marginTop: 24,
            textAlign: "center",
          }}
        >
          Sin comisiones. Sin Glovo. IA que entiende y cobra.
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            gap: 32,
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 18, color: "#64748b" }}>yacomanda.com</div>
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              backgroundColor: "#16a34a",
            }}
          />
          <div style={{ fontSize: 18, color: "#64748b" }}>
            Desde 29€/mes
          </div>
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              backgroundColor: "#16a34a",
            }}
          />
          <div style={{ fontSize: 18, color: "#64748b" }}>
            Prueba gratis 30 días
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
