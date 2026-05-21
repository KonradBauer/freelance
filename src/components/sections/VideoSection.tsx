import VideoEmbed from "@/components/ui/VideoEmbed";
import { VIDEO_EMBED_SRC, VIDEO_THUMBNAIL_SRC } from "@/lib/constants";

export default function VideoSection() {
  return (
    <section className="bg-slate-50 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {/* TODO: nagłówek sekcji video — np. "Zobacz jak to dziala" */}
            Zobacz jak to dziala
          </h2>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
            {/* TODO: sub-nagłówek video */}
            Krotki film pokazujacy efekty wspolpracy i mozliwosci systemu
          </p>
        </div>

        <VideoEmbed
          src={VIDEO_EMBED_SRC}
          thumbnailSrc={VIDEO_THUMBNAIL_SRC}
          title="TODO: tytuł wideo dla czytników ekranu"
        />
      </div>
    </section>
  );
}
