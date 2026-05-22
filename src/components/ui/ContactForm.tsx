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
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 aria-[invalid=true]:border-red-400";

const selectClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 aria-[invalid=true]:border-red-400";

const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5";

const errorClass = "mt-1.5 text-sm text-red-500";

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
      {/* Honeypot - ukryte przed użytkownikiem, wypełniane przez boty */}
      <input
        type="text"
        {...register("honeypot")}
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
        autoComplete="off"
      />

      <div>
        <label htmlFor="name" className={labelClass}>
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
        <label htmlFor="phone" className={labelClass}>
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
        <label htmlFor="industry" className={labelClass}>
          Branża <span aria-hidden="true">*</span>
        </label>
        <select
          id="industry"
          className={selectClass}
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
        <label htmlFor="budget" className={labelClass}>
          Orientacyjny budżet <span aria-hidden="true">*</span>
        </label>
        <select
          id="budget"
          className={selectClass}
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
        <div role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-amber-400 px-8 py-4 font-bold text-lg text-slate-900 transition-colors duration-200 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Wysyłanie..." : "Chcę więcej klientów →"}
      </button>

      <p className="text-center text-sm text-slate-500">
        Odpiszę w ciągu 24 godzin. Bez zobowiązań.
      </p>
    </form>
  );
}
