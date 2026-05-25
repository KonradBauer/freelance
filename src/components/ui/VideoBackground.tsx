"use client";

export default function VideoBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none hidden md:block"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          opacity: 0.08,
        }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
