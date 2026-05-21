"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
    window.dispatchEvent(new Event("cookie_consent_accepted"));
  };

  const handleReject = () => {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Zgoda na pliki cookie"
      className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-700 px-4 py-4 sm:px-6"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-slate-300 flex-1">
          Ta strona używa plików cookie do analizy ruchu (Facebook Pixel). Możesz
          wyrazić zgodę lub odmówić.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleReject}
            className="rounded-lg border border-slate-500 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-slate-300 hover:text-white"
          >
            Odrzuć
          </button>
          <button
            onClick={handleAccept}
            className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-bold text-slate-900 transition-colors hover:bg-amber-300"
          >
            Akceptuj
          </button>
        </div>
      </div>
    </div>
  );
}
