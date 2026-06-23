"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function ExitIntentModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const firstFocusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY >= 5 || window.innerWidth < 768) return;
      const shown = sessionStorage.getItem("exitModalShown");
      const submitted = sessionStorage.getItem("formSubmitted");
      if (shown || submitted) return;
      sessionStorage.setItem("exitModalShown", "1");
      setOpen(true);
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  useEffect(() => {
    if (!open) return;
    firstFocusRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const validate = () => {
    const errs: typeof errors = {};
    if (name.trim().length < 2) errs.name = "Imię musi mieć min. 2 znaki";
    if (!/^(\+48[\s]?)?(\d{3}[\s-]?\d{3}[\s-]?\d{3})$/.test(phone.trim()))
      errs.phone = "Podaj prawidłowy numer telefonu (9 cyfr)";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch("/api/quick-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          honeypot: "",
        }),
      });
      if (res.ok) {
        sessionStorage.setItem("formSubmitted", "1");
        router.push("/dziekujemy");
      } else if (res.status === 429) {
        setServerError("Wysłałeś już formularz niedawno. Spróbuj za godzinę.");
      } else {
        setServerError("Coś poszło nie tak. Spróbuj ponownie.");
      }
    } catch {
      setServerError("Błąd połączenia. Sprawdź internet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[60]"
        style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-modal-title"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[61] w-full max-w-md mx-4 rounded-2xl p-8"
        style={{
          background: "rgba(6,10,20,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(201,168,76,0.25)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Zamknij"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
          style={{ color: "#475569" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#94A3B8")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#475569")}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <h2
          id="exit-modal-title"
          className="font-heading font-bold text-white mb-2"
          style={{ fontSize: "1.25rem", letterSpacing: "-0.02em" }}
        >
          Poczekaj - masz projekt?
        </h2>
        <p className="text-sm mb-6" style={{ color: "#64748B" }}>
          Zostaw numer, oddzwonię bezpłatnie w 24h.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="modal-name" className="block text-sm font-semibold mb-1.5" style={{ color: "#94A3B8" }}>
              Imię i nazwisko <span aria-hidden="true">*</span>
            </label>
            <input
              id="modal-name"
              ref={firstFocusRef}
              type="text"
              autoComplete="name"
              placeholder="Jan Kowalski"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="dark-input w-full rounded-xl px-4 py-3"
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p role="alert" className="mt-1.5 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="modal-phone" className="block text-sm font-semibold mb-1.5" style={{ color: "#94A3B8" }}>
              Numer telefonu <span aria-hidden="true">*</span>
            </label>
            <input
              id="modal-phone"
              type="tel"
              autoComplete="tel"
              placeholder="123 456 789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="dark-input w-full rounded-xl px-4 py-3"
              aria-invalid={!!errors.phone}
            />
            {errors.phone && (
              <p role="alert" className="mt-1.5 text-sm text-red-400">{errors.phone}</p>
            )}
          </div>

          {serverError && (
            <div
              role="alert"
              className="rounded-xl px-4 py-3 text-sm"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.25)",
                color: "#FCA5A5",
              }}
            >
              {serverError}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-gold w-full px-8 py-4 rounded-xl text-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Wysyłanie..." : "Oddzwoń do mnie →"}
          </button>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="block w-full text-center text-sm transition-colors"
            style={{ color: "#475569" }}
          >
            Nie, dziękuję
          </button>
        </form>
      </div>
    </>
  );
}
