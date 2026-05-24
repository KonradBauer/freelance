import { ImageResponse } from "next/og";

export const alt ="Studio Code Art - Strony internetowe dla małych firm";
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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Amber glow blob */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Top label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "3px",
              background: "#fbbf24",
              borderRadius: "2px",
            }}
          />
          <span
            style={{
              color: "#fbbf24",
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            Strony internetowe dla firm
          </span>
          <div
            style={{
              width: "32px",
              height: "3px",
              background: "#fbbf24",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Main headline */}
        <div
          style={{
            color: "#ffffff",
            fontSize: "64px",
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: "900px",
            marginBottom: "28px",
          }}
        >
          Twoi klienci szukają Cię{" "}
          <span style={{ color: "#fbbf24" }}>w internecie.</span>
        </div>

        {/* Subheadline */}
        <div
          style={{
            color: "#94a3b8",
            fontSize: "26px",
            textAlign: "center",
            maxWidth: "700px",
            marginBottom: "52px",
            lineHeight: 1.5,
          }}
        >
          Profesjonalna strona gotowa w 14 dni. Bezpłatna wycena.
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            padding: "16px 36px",
            background: "rgba(251,191,36,0.1)",
            border: "1px solid rgba(251,191,36,0.3)",
            borderRadius: "16px",
          }}
        >
          <span style={{ color: "#fbbf24", fontSize: "22px", fontWeight: 700 }}>
            Studio Code Art
          </span>
          <div style={{ width: "1px", height: "24px", background: "rgba(251,191,36,0.4)" }} />
          <span style={{ color: "#cbd5e1", fontSize: "20px" }}>
            studiocodeart.pl
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
