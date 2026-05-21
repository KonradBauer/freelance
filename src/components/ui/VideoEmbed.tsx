"use client";

import { useState } from "react";
import Image from "next/image";

interface VideoEmbedProps {
  src: string;
  thumbnailSrc: string;
  title: string;
}

function isLocalVideo(src: string) {
  return src.startsWith("/") || src.startsWith("./");
}

export default function VideoEmbed({ src, thumbnailSrc, title }: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isLocalVideo(src)) {
    return (
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
        {/* #t=0.001 forces first-frame thumbnail on Safari */}
        <video
          src={`${src}#t=0.001`}
          controls
          preload="metadata"
          className="absolute inset-0 w-full h-full"
          title={title}
        />
      </div>
    );
  }

  if (isPlaying) {
    return (
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
        <iframe
          src={`${src}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-800 cursor-pointer group">
      <Image
        src={thumbnailSrc}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 800px"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-200" />
      <button
        onClick={() => setIsPlaying(true)}
        aria-label={`Odtwórz: ${title}`}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="flex items-center justify-center w-20 h-20 rounded-full bg-amber-400 group-hover:bg-amber-300 transition-colors duration-200 shadow-xl">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-slate-900 ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </button>
    </div>
  );
}
