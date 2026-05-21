"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function ThankYouPixelEvent() {
  useEffect(() => {
    if (localStorage.getItem("cookie_consent") === "accepted") {
      window.fbq?.("track", "Lead");
    }
  }, []);

  return null;
}
