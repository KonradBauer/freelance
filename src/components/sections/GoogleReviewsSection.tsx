"use client";

import { useEffect, useRef } from "react";

const WIDGET_SRC = "https://cdn.trustindex.io/loader.js?1dd1b977516e124fd756a079016";

export default function GoogleReviewsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Watch body for Trustindex widget injection, then move it into our container
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of Array.from(mutation.addedNodes)) {
          if (
            node instanceof HTMLElement &&
            (node.hasAttribute("data-trustindex-widget") ||
              node.classList.contains("ti-widget"))
          ) {
            container.appendChild(node);
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

        <div ref={containerRef} className="flex justify-center" />
      </div>
    </section>
  );
}
