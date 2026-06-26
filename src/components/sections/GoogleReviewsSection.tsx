"use client";

import { useEffect, useRef, useState } from "react";

const WIDGET_SRC = "https://cdn.trustindex.io/loader.js?1dd1b977516e124fd756a079016";

function ReviewsSkeleton() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.05)" }}>
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="w-4 h-4 rounded-full" style={{ background: "rgba(251,191,36,0.3)" }} />
            ))}
          </div>
          <div className="space-y-2 mb-6">
            <div className="h-3 rounded" style={{ background: "rgba(255,255,255,0.1)", width: "100%" }} />
            <div className="h-3 rounded" style={{ background: "rgba(255,255,255,0.1)", width: "85%" }} />
            <div className="h-3 rounded" style={{ background: "rgba(255,255,255,0.1)", width: "70%" }} />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
            <div className="space-y-1">
              <div className="h-3 w-24 rounded" style={{ background: "rgba(255,255,255,0.1)" }} />
              <div className="h-2 w-16 rounded" style={{ background: "rgba(255,255,255,0.07)" }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GoogleReviewsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of Array.from(mutation.addedNodes)) {
          if (
            node instanceof HTMLElement &&
            (node.hasAttribute("data-trustindex-widget") ||
              node.classList.contains("ti-widget"))
          ) {
            container.appendChild(node);
            setIsLoaded(true);
            observer.disconnect();
            return;
          }
        }
      }
    });

    observer.observe(document.body, { childList: true });

    if (!document.querySelector(`script[src="${WIDGET_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = WIDGET_SRC;
      script.async = true;
      document.body.appendChild(script);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="opinie" className="py-24" style={{ background: "#060A14" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="divider-gold mb-16" />
          <span className="section-label">Opinie</span>
          <h2
            className="font-heading font-bold text-white mb-4 leading-tight"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw + 0.5rem, 2.75rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Co mówią klienci
          </h2>
        </div>

        {!isLoaded && <ReviewsSkeleton />}
        <div ref={containerRef} className="flex justify-center" />
      </div>
    </section>
  );
}
