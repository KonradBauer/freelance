"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  contactSchema,
  type ContactFormData,
  INDUSTRIES,
  BUDGETS,
} from "@/lib/schemas";

const inputClass =
  "dark-input w-full rounded-xl px-4 py-3";

const labelClass = "block text-sm font-semibold mb-1.5";
const errorClass = "mt-1.5 text-sm text-red-400";

export default function ContactForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push("/dziekujemy");
      } else if (res.status === 429) {
        setServerError(
          "Wysłałeś już formularz niedawno. Spróbuj za godzinę lub zadzwoń bezpośrednio."
        );
      } else {
        setServerError(
          "Coś poszło nie tak. Spróbuj ponownie lub skontaktuj się bezpośrednio."
        );
      }
    } catch {
      setServerError("Błąd połączenia. Sprawdź internet i spróbuj ponownie.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot */}
      <input
        type="text"
        {...register("honeypot")}
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
        autoComplete="off"
      />

      <div>
        <label htmlFor="name" className={labelClass} style={{ color: "#94A3B8" }}>
          Imię i nazwisko <span aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Jan Kowalski"
          className={inputClass}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name")}
        />
        {errors.name && (
          <p id="name-error" role="alert" className={errorClass}>
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className={labelClass} style={{ color: "#94A3B8" }}>
          Numer telefonu <span aria-hidden="true">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          placeholder="123 456 789"
          className={inputClass}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          {...register("phone")}
        />
        {errors.phone && (
          <p id="phone-error" role="alert" className={errorClass}>
            {errors.phone.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="industry" className={labelClass} style={{ color: "#94A3B8" }}>
          Branża <span aria-hidden="true">*</span>
        </label>
        <select
          id="industry"
          className={inputClass}
          aria-invalid={!!errors.industry}
          aria-describedby={errors.industry ? "industry-error" : undefined}
          defaultValue=""
          {...register("industry")}
        >
          <option value="" disabled>
            Wybierz branżę...
          </option>
          {INDUSTRIES.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
        {errors.industry && (
          <p id="industry-error" role="alert" className={errorClass}>
            {errors.industry.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="budget" className={labelClass} style={{ color: "#94A3B8" }}>
          Orientacyjny budżet <span aria-hidden="true">*</span>
        </label>
        <select
          id="budget"
          className={inputClass}
          aria-invalid={!!errors.budget}
          aria-describedby={errors.budget ? "budget-error" : undefined}
          defaultValue=""
          {...register("budget")}
        >
          <option value="" disabled>
            Wybierz budżet...
          </option>
          {BUDGETS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        {errors.budget && (
          <p id="budget-error" role="alert" className={errorClass}>
            {errors.budget.message}
          </p>
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
        {isSubmitting ? "Wysyłanie..." : "Chcę więcej klientów →"}
      </button>

      <p className="text-center text-sm" style={{ color: "#475569" }}>
        Odpiszę w ciągu 24 godzin. Bez zobowiązań.
      </p>
    </form>
  );
}
