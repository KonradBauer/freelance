import Script from "next/script";

export default function GoogleReviewsSection() {
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
        <Script
          src="https://cdn.trustindex.io/loader.js?1dd1b977516e124fd756a079016"
          strategy="lazyOnload"
        />
      </div>
    </section>
  );
}
