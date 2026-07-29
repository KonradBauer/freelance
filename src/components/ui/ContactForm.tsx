"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { CTA_TEXT } from "@/lib/constants";
import {
  contactSchema,
  type ContactFormData,
  INDUSTRIES,
  BUDGETS,
  PROJECT_TYPES,
} from "@/lib/schemas";

const inputClass = "dark-input w-full rounded-xl px-4 py-3";
const labelClass = "block text-sm font-semibold mb-1.5";
const errorClass = "mt-1.5 text-sm text-red-400";

const STEP_LABELS = ["Typ projektu", "Szczegóły", "Kontakt"] as const;

export default function ContactForm() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
  });

  const selectedProjectType = watch("projectType");

  const goNext = async () => {
    const fields: (keyof ContactFormData)[] =
      step === 1 ? ["projectType"] : ["industry", "budget"];
    const valid = await trigger(fields);
    if (valid) setStep((s) => (s + 1) as 1 | 2 | 3);
  };

  const goBack = () => setStep((s) => (s - 1) as 1 | 2 | 3);

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        sessionStorage.setItem("formSubmitted", "1");
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

      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-6">
        {STEP_LABELS.map((label, idx) => {
          const stepNum = idx + 1;
          const isCompleted = step > stepNum;
          const isActive = step === stepNum;
          return (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-1.5 shrink-0">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200"
                  style={
                    isCompleted
                      ? { background: "linear-gradient(135deg, #C9A84C, #F0D060)", color: "#060A14" }
                      : isActive
                      ? { background: "rgba(201,168,76,0.15)", border: "1px solid #C9A84C", color: "#C9A84C" }
                      : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#475569" }
                  }
                >
                  {isCompleted ? "✓" : stepNum}
                </div>
                <span
                  className="text-xs font-medium hidden sm:block"
                  style={{ color: isActive ? "#C9A84C" : isCompleted ? "#94A3B8" : "#475569" }}
                >
                  {label}
                </span>
              </div>
              {idx < STEP_LABELS.length - 1 && (
                <div
                  className="flex-1 h-px"
                  style={{
                    background: isCompleted
                      ? "linear-gradient(90deg, rgba(201,168,76,0.6), rgba(201,168,76,0.2))"
                      : "rgba(255,255,255,0.06)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Krok 1: Typ projektu */}
      {step === 1 && (
        <div className="space-y-4">
          <p className="text-sm font-semibold" style={{ color: "#94A3B8" }}>
            Czego potrzebujesz?
          </p>
          <div className="grid grid-cols-1 gap-2">
            {PROJECT_TYPES.map((type) => {
              const isSelected = selectedProjectType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setValue("projectType", type, { shouldValidate: true })}
                  className="w-full text-left px-4 py-3 rounded-xl transition-all duration-150 text-sm font-medium"
                  style={
                    isSelected
                      ? {
                          background: "rgba(201,168,76,0.12)",
                          border: "1px solid rgba(201,168,76,0.5)",
                          color: "#F0D060",
                        }
                      : {
                          background: "rgba(255,255,255,0.025)",
                          border: "1px solid rgba(201,168,76,0.14)",
                          color: "#94A3B8",
                        }
                  }
                >
                  {isSelected ? "✓ " : ""}{type}
                </button>
              );
            })}
          </div>
          {/* Hidden input for RHF registration */}
          <input type="hidden" {...register("projectType")} />
          {errors.projectType && (
            <p role="alert" className={errorClass}>
              {errors.projectType.message}
            </p>
          )}
          <button
            type="button"
            onClick={goNext}
            className="btn-gold w-full px-8 py-4 rounded-xl text-lg"
          >
            Dalej →
          </button>
        </div>
      )}

      {/* Krok 2: Branża + Budżet */}
      {step === 2 && (
        <div className="space-y-5">
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
              <option value="" disabled>Wybierz branżę...</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
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
              <option value="" disabled>Wybierz budżet...</option>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            {errors.budget && (
              <p id="budget-error" role="alert" className={errorClass}>
                {errors.budget.message}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={goBack}
              className="flex-1 px-6 py-4 rounded-xl text-sm font-semibold transition-colors"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#64748B",
              }}
            >
              ← Wstecz
            </button>
            <button
              type="button"
              onClick={goNext}
              className="btn-gold flex-[2] px-8 py-4 rounded-xl text-lg"
            >
              Dalej →
            </button>
          </div>
        </div>
      )}

      {/* Krok 3: Dane kontaktowe */}
      {step === 3 && (
        <div className="space-y-5">
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
            <label htmlFor="clientEmail" className={labelClass} style={{ color: "#94A3B8" }}>
              Adres email{" "}
              <span style={{ color: "#475569", fontWeight: 400 }}>(opcjonalnie)</span>
            </label>
            <input
              id="clientEmail"
              type="email"
              autoComplete="email"
              placeholder="jan@firma.pl"
              className={inputClass}
              aria-invalid={!!errors.clientEmail}
              aria-describedby={errors.clientEmail ? "clientEmail-error" : undefined}
              {...register("clientEmail")}
            />
            {errors.clientEmail && (
              <p id="clientEmail-error" role="alert" className={errorClass}>
                {errors.clientEmail.message}
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

          <div className="flex gap-3">
            <button
              type="button"
              onClick={goBack}
              className="flex-1 px-6 py-4 rounded-xl text-sm font-semibold transition-colors"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#64748B",
              }}
            >
              ← Wstecz
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold flex-[2] px-8 py-4 rounded-xl text-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Wysyłanie..." : CTA_TEXT}
            </button>
          </div>

          <p className="text-center text-sm" style={{ color: "#475569" }}>
            Odpiszę w ciągu 24 godzin. Bez zobowiązań.
          </p>
        </div>
      )}
    </form>
  );
}
