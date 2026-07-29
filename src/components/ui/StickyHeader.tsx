"use client";

import { useState } from "react";
import Image from "next/image";
import { useMotionValueEvent, useScroll } from "motion/react";
import { CTA_TEXT } from "@/lib/constants";

export default function StickyHeader() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible(y > 500);
  });

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
              href="tel:+48781573274"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium transition-opacity duration-200 hover:opacity-80"
              style={{ color: "#C9A84C" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              +48 781 573 274
            </a>
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
              {CTA_TEXT}
            </a>
          </div>
        </div>
      </header>

    </>
  );
}
