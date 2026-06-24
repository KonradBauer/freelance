"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#F0D060";
const BG = "#060A14";
const BORDER = "rgba(201,168,76,0.2)";
const PHONE_RE = /^(\+48[\s]?)?(\d{3}[\s-]?\d{3}[\s-]?\d{3})$/;

type LeadData = { projectType: string; industry: string; budget: string; name: string; phone: string };
type Msg = { from: "bot" | "user"; text: string };
type Choice = { label: string; next: string; value: string; field?: keyof LeadData };
type Step =
  | { kind: "options"; text: string; choices: Choice[] }
  | { kind: "input"; text: string; field: keyof LeadData; next: string; placeholder: string; validate?: (v: string) => string | null };

const FLOW: Record<string, Step> = {
  start: {
    kind: "options",
    text: "Cześć! Tu Konrad 👋 Mogę pomóc wybrać rozwiązanie dla Twojej firmy. Co Cię interesuje?",
    choices: [
      { label: "💰 Ile kosztuje strona?", next: "faq_cost", value: "" },
      { label: "⏱ Jak długo trwa realizacja?", next: "faq_time", value: "" },
      { label: "🚀 Chcę stronę / wycenę", next: "lead_type", value: "" },
    ],
  },
  faq_cost: {
    kind: "options",
    text: "Strona wizytówkowa od 1500 zł, sklep od 3000 zł, platforma wyceniana indywidualnie. Dokładna wycena jest bezpłatna, przygotowuję ją po krótkiej rozmowie.",
    choices: [
      { label: "Chcę bezpłatną wycenę →", next: "lead_type", value: "" },
      { label: "← Wróć", next: "start", value: "" },
    ],
  },
  faq_time: {
    kind: "options",
    text: "Projekt i akceptacja: 5–10 dni roboczych. Wdrożenie na domenę: 1–2 dni. Łącznie ok. 2 tygodnie od pierwszego kontaktu.",
    choices: [
      { label: "Chcę zacząć →", next: "lead_type", value: "" },
      { label: "← Wróć", next: "start", value: "" },
    ],
  },
  lead_type: {
    kind: "options",
    text: "Czego potrzebujesz?",
    choices: [
      { label: "Strona wizytówkowa", next: "lead_industry", value: "Strona wizytówkowa", field: "projectType" },
      { label: "Sklep internetowy", next: "lead_industry", value: "Sklep internetowy", field: "projectType" },
      { label: "Platforma & aplikacja", next: "lead_industry", value: "Platforma & aplikacja", field: "projectType" },
      { label: "Modernizacja strony", next: "lead_industry", value: "Modernizacja istniejącej strony", field: "projectType" },
      { label: "Nie wiem jeszcze", next: "lead_industry", value: "Nie wiem jeszcze", field: "projectType" },
    ],
  },
  lead_industry: {
    kind: "options",
    text: "W jakiej branży działasz?",
    choices: [
      { label: "Restauracja / gastronomia", next: "lead_budget", value: "Restauracja / gastronomia", field: "industry" },
      { label: "Budownictwo / remonty", next: "lead_budget", value: "Budownictwo / remonty", field: "industry" },
      { label: "Uroda / kosmetyka", next: "lead_budget", value: "Uroda / kosmetyka", field: "industry" },
      { label: "Ślub / event", next: "lead_budget", value: "Ślub / event", field: "industry" },
      { label: "Meble / wnętrza", next: "lead_budget", value: "Meble / wnętrza", field: "industry" },
      { label: "Zdrowie / medycyna", next: "lead_budget", value: "Zdrowie / medycyna", field: "industry" },
      { label: "Usługi lokalne", next: "lead_budget", value: "Usługi lokalne", field: "industry" },
      { label: "Inna branża", next: "lead_budget", value: "Inna branża", field: "industry" },
    ],
  },
  lead_budget: {
    kind: "options",
    text: "Jaki masz orientacyjny budżet?",
    choices: [
      { label: "do 1500 zł", next: "lead_name", value: "do 1500 zł", field: "budget" },
      { label: "1500–3000 zł", next: "lead_name", value: "1500-3000 zł", field: "budget" },
      { label: "3000–6000 zł", next: "lead_name", value: "3000-6000 zł", field: "budget" },
      { label: "6000+ zł", next: "lead_name", value: "6000+ zł", field: "budget" },
    ],
  },
  lead_name: {
    kind: "input",
    text: "Jak mam się do Ciebie zwracać?",
    field: "name",
    next: "lead_phone",
    placeholder: "Twoje imię...",
    validate: (v) => (v.trim().length < 2 ? "Podaj przynajmniej 2 znaki" : null),
  },
  lead_phone: {
    kind: "input",
    text: "Podaj numer telefonu, oddzwonię w ciągu 24h 🔔",
    field: "phone",
    next: "done",
    placeholder: "123 456 789",
    validate: (v) => (PHONE_RE.test(v.trim()) ? null : "Podaj prawidłowy numer (9 cyfr)"),
  },
};

export default function LeadChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ from: "bot", text: (FLOW.start as Extract<Step, { kind: "options" }>).text }]);
  const [currentStep, setCurrentStep] = useState("start");
  const [leadData, setLeadData] = useState<Partial<LeadData>>({});
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const hasScrolled50 = useRef(false);
  const hasWaited20s = useRef(false);
  const triggered = useRef(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  useEffect(() => {
    if (sessionStorage.getItem("chatbotShown") === "1" || sessionStorage.getItem("formSubmitted") === "1") return;
    if (window.innerWidth < 768) return;

    const isReturnVisitor = localStorage.getItem("chatbotVisited") === "1";
    localStorage.setItem("chatbotVisited", "1");

    function triggerOpen() {
      if (triggered.current) return;
      triggered.current = true;
      setIsOpen(true);
      sessionStorage.setItem("chatbotShown", "1");
    }

    if (isReturnVisitor) { triggerOpen(); return; }

    const timer = setTimeout(() => {
      hasWaited20s.current = true;
      if (hasScrolled50.current) triggerOpen();
    }, 20000);

    function handleScroll() {
      if (hasScrolled50.current) return;
      const total = document.body.scrollHeight - window.innerHeight;
      if (total > 0 && window.scrollY / total >= 0.5) {
        hasScrolled50.current = true;
        if (hasWaited20s.current) triggerOpen();
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener("scroll", handleScroll); };
  }, []);

  function addBotMsg(text: string) {
    setMessages((prev) => [...prev, { from: "bot", text }]);
  }

  function handleChoice(choice: Choice) {
    setMessages((prev) => [...prev, { from: "user", text: choice.label }]);

    const newData = choice.field ? { ...leadData, [choice.field]: choice.value } : leadData;
    if (choice.field) setLeadData(newData);

    const next = FLOW[choice.next];
    if (next) setTimeout(() => { addBotMsg(next.text); setCurrentStep(choice.next); }, 300);
  }

  async function handleInputSubmit(e: FormEvent) {
    e.preventDefault();
    const step = FLOW[currentStep] as Extract<Step, { kind: "input" }>;
    const value = inputValue.trim();
    if (!value) return;

    const err = step.validate?.(value) ?? null;
    if (err) { setInputError(err); return; }

    setMessages((prev) => [...prev, { from: "user", text: value }]);
    setInputValue("");
    setInputError("");

    const newData = { ...leadData, [step.field]: value } as LeadData;
    setLeadData(newData);

    if (step.next === "done") {
      setIsSubmitting(true);
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...newData, honeypot: "" }),
        });
        setTimeout(() => {
          addBotMsg(res.ok
            ? "Gotowe! ✅ Odezwę się w ciągu 24 godzin. Do zobaczenia!"
            : "Coś poszło nie tak. Zadzwoń bezpośrednio lub wyślij formularz na stronie."
          );
          if (res.ok) { setIsDone(true); setCurrentStep("done"); sessionStorage.setItem("formSubmitted", "1"); }
        }, 400);
      } catch {
        setTimeout(() => addBotMsg("Błąd połączenia. Spróbuj przez formularz kontaktowy na stronie."), 400);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      const next = FLOW[step.next];
      if (next) setTimeout(() => { addBotMsg(next.text); setCurrentStep(step.next); }, 300);
    }
  }

  const step = FLOW[currentStep];

  return (
    <>
      {isOpen && (
        <div style={{ position: "fixed", bottom: "88px", right: "24px", width: "340px", maxHeight: "500px", background: BG, border: `1px solid ${BORDER}`, borderRadius: "16px", display: "flex", flexDirection: "column", zIndex: 9999, boxShadow: "0 8px 40px rgba(0,0,0,0.7)" }}>
          {/* Header */}
          <div style={{ padding: "14px 16px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src="/avatar.png" alt="Konrad" width={64} height={64} style={{ borderRadius: "50%", flexShrink: 0, objectFit: "cover" }} />
              <div>
                <div style={{ color: "#E2E8F0", fontSize: "13px", fontWeight: 600, lineHeight: 1.2 }}>Konrad</div>
                <div style={{ color: "#64748B", fontSize: "11px" }}>Studio Code Art</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "#64748B", cursor: "pointer", fontSize: "20px", lineHeight: 1, padding: "4px 6px" }}>×</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "82%", padding: "8px 12px", borderRadius: msg.from === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px", background: msg.from === "user" ? "rgba(201,168,76,0.12)" : "rgba(255,255,255,0.05)", border: `1px solid ${msg.from === "user" ? "rgba(201,168,76,0.25)" : "rgba(255,255,255,0.07)"}`, color: msg.from === "user" ? GOLD_LIGHT : "#CBD5E1", fontSize: "13px", lineHeight: 1.5 }}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          {!isDone && step && (
            <div style={{ padding: "12px 16px", borderTop: `1px solid ${BORDER}`, flexShrink: 0 }}>
              {step.kind === "input" ? (
                <form onSubmit={handleInputSubmit} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <input
                      autoFocus
                      type={step.field === "phone" ? "tel" : "text"}
                      value={inputValue}
                      onChange={(e) => { setInputValue(e.target.value); setInputError(""); }}
                      placeholder={step.placeholder}
                      disabled={isSubmitting}
                      style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: `1px solid ${inputError ? "rgba(239,68,68,0.5)" : BORDER}`, borderRadius: "10px", padding: "8px 12px", color: "#E2E8F0", fontSize: "13px", outline: "none" }}
                    />
                    <button type="submit" disabled={isSubmitting || !inputValue.trim()} style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`, border: "none", borderRadius: "10px", padding: "8px 14px", color: BG, fontWeight: 700, fontSize: "15px", cursor: "pointer", opacity: isSubmitting || !inputValue.trim() ? 0.45 : 1 }}>→</button>
                  </div>
                  {inputError && <span style={{ color: "#FCA5A5", fontSize: "11px" }}>{inputError}</span>}
                </form>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {step.choices.map((choice) => (
                    <button
                      key={choice.label}
                      onClick={() => handleChoice(choice)}
                      style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, borderRadius: "10px", padding: "7px 12px", color: "#94A3B8", fontSize: "12px", cursor: "pointer", textAlign: "left" }}
                      onMouseEnter={(e) => { (e.currentTarget).style.borderColor = GOLD; (e.currentTarget).style.color = GOLD_LIGHT; }}
                      onMouseLeave={(e) => { (e.currentTarget).style.borderColor = BORDER; (e.currentTarget).style.color = "#94A3B8"; }}
                    >
                      {choice.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Bubble */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Zamknij czat" : "Otwórz czat"}
        style={{ position: "fixed", bottom: "24px", right: "24px", width: "56px", height: "56px", borderRadius: "50%", background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`, border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(201,168,76,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000, fontSize: isOpen ? "22px" : "24px", transition: "transform 0.15s", color: BG, fontWeight: 700 }}
      >
        {isOpen ? "×" : "💬"}
      </button>
    </>
  );
}
