"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function StickyHeader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          background: "rgba(6,10,20,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-2.5 flex items-center justify-between">
          <Image
            src="/logo.png"
            alt="Studio Code Art"
            width={160}
            height={64}
            className="h-20 w-auto"
          />
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/profile.php?id=61590539004345"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Studio Code Art"
              className="flex items-center justify-center w-9 h-9 rounded-full transition-opacity duration-200 hover:opacity-80"
              style={{ color: "#C9A84C" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/studiocodeart_/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Studio Code Art"
              className="flex items-center justify-center w-9 h-9 rounded-full transition-opacity duration-200 hover:opacity-80"
              style={{ color: "#C9A84C" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? "#formularz"}
              target={process.env.NEXT_PUBLIC_CALENDLY_URL ? "_blank" : undefined}
              rel={process.env.NEXT_PUBLIC_CALENDLY_URL ? "noopener noreferrer" : undefined}
              className="btn-gold text-sm px-5 py-2.5 rounded-xl"
            >
              Umów konsultację →
            </a>
          </div>
        </div>
      </header>

    </>
  );
}
