import VideoEmbed from "@/components/ui/VideoEmbed";
import { VIDEO_EMBED_SRC, VIDEO_THUMBNAIL_SRC } from "@/lib/constants";

export default function VideoSection() {
  return (
    <section className="py-24 px-6" style={{ background: "#060A14" }}>
      <div className="max-w-3xl mx-auto">
        <div className="divider-gold mb-16" />

        <div className="text-center mb-12">
          <span className="section-label">Demo</span>
          <h2
            className="font-heading font-bold text-white mb-5 leading-tight"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw + 0.5rem, 2.75rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Zobacz jak to działa
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Krótki film pokazujący efekty współpracy i możliwości systemu
          </p>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(201,168,76,0.14)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          <VideoEmbed
            src={VIDEO_EMBED_SRC}
            thumbnailSrc={VIDEO_THUMBNAIL_SRC}
            title="Przykładowa realizacja strony internetowej"
          />
        </div>
      </div>
    </section>
  );
}
