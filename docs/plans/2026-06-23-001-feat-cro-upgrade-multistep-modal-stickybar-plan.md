---
title: "feat: CRO Upgrade — Multi-step formularz + Exit-intent modal + Sticky bar"
type: feat
status: active
date: 2026-06-23
origin: docs/dev-brainstorms/2026-06-23-cro-upgrade-requirements.md
---

# feat: CRO Upgrade — Multi-step formularz + Exit-intent modal + Sticky bar

## Przegląd

Trzy skoordynowane zmiany konwersji: (1) refactor formularza kontaktowego na 3-krokowy wizard (+743% CVR dane Venture Harbour), (2) modal exit-intent desktop-only wychwytujący porzucających stronę, (3) sticky bar na dole z CTA linkującym do formularza. Plus content change: zdanie gwarancji satysfakcji przy formularzu.

## Ujęcie problemu

Obecny single-step formularz z 5 polami naraz tworzy wysokie friction na wejściu. Strona nie ma mechanizmu odzyskiwania odwiedzających opuszczających stronę. Brak persistent CTA utrudnia konwersję na długiej one-page. (zob. źródło: docs/dev-brainstorms/2026-06-23-cro-upgrade-requirements.md)

## Śledzenie wymagań

- R1. Formularz 3 kroki + progress bar
- R2. Krok 1: wybór projektType (5 opcji jako karty/radio)
- R3. Krok 2: budget + industry (selects)
- R4. Krok 3: name + phone (dane kontaktowe)
- R5. Przycisk Wstecz w krokach 2 i 3, bez utraty danych
- R6. Walidacja per-krok (trigger tylko aktywnych pól)
- R7. projectDescription usunięte z UI (zostawione opcjonalne w schema)
- R8. Redirect /dziekujemy po submit (bez zmian)
- R9. Schemat Zod + `projectType` enum
- R10. API /api/contact + nowe pole, zaktualizowany email
- R11–R19. Modal exit-intent (mouseleave top, desktop only, sessionStorage, 2 pola, ESC, focus trap, animacja)
- R20–R23. Sticky bar (fixed bottom, IntersectionObserver, padding-bottom)
- R24. Gwarancja satysfakcji — 1 zdanie przy formularzu

## Granice scope'u

- Brak live chat widget
- Brak lead magnet / PDF
- Brak A/B testing infrastruktury
- Testimoniale z foto/nazwiskiem — poza scope'em (content, nie kod)
- Sticky bar znika tylko przy formularzu (`#formularz`), nie przy innych CTA
- `projectDescription` pozostaje w schema jako optional (backward-compat) — usunięte tylko z UI

## Kontekst i research

### Relevantny kod i wzorce

- `src/components/ui/ContactForm.tsx` — plik do pełnego refactoru; używa react-hook-form + zod, `useRouter` do redirect
- `src/lib/schemas.ts` — `contactSchema`, `INDUSTRIES` (zawiera "Inna branża"), `BUDGETS` (4 opcje)
- `src/app/api/contact/route.ts` — waliduje przez `contactSchema.safeParse()`, in-memory rate limit 5/hr/IP, Resend email
- `src/components/ui/StickyHeader.tsx` — `"use client"`, scroll-based visibility, **scroll-to-top button na `fixed bottom-6 right-6 z-50`** — wymaga repositioningu gdy StickyBar widoczny
- `src/components/ui/CookieConsent.tsx` — `fixed bottom-0 left-0 right-0 z-50` — koliduje z StickyBar; przyjęta strategia: StickyBar na `z-[45]`, CookieConsent przykrywa go tymczasowo
- `src/components/sections/ContactFormSection.tsx` — section `id="formularz"`, glass card wrapper, target dla IntersectionObserver
- `src/app/page.tsx` — montuje wszystkie sekcje + StickyHeader; tu montujemy ExitIntentModal i StickyBar
- `src/app/layout.tsx` — montuje CookieConsent, FBPixel, GA globalnie

### Design language

- Kolor gold: `#C9A84C`, dark bg: `#060A14`
- Glass card: `background: rgba(255,255,255,0.025)`, `backdropFilter: blur(16px)`, `border: 1px solid rgba(201,168,76,0.14)`
- Przycisk primary: klasa `btn-gold`, `rounded-xl`, padding `px-8 py-4`
- Inputs: klasa `dark-input`, `rounded-xl px-4 py-3`
- Font heading: klasa `font-heading font-bold`

### Z-index strategia

```
z-[60]  ExitIntentModal (nad wszystkim)
z-50    StickyHeader (top), CookieConsent (bottom), scroll-to-top button
z-[45]  StickyBar (bottom — pod CookieConsent, widoczny gdy consent zamknięty)
```

## Kluczowe decyzje techniczne

- **projectType jako nowy wymagany field w schema**: modalExitIntent wysyła `projectType: "Nie wiem jeszcze"` jako default; main form wymaga wyboru w kroku 1
- **budget default w modalu**: `BUDGETS[0]` ("do 1500 zł") — najprostsza opcja bez zmiany enum, lead i tak identyfikowalny przez projectType
- **projectDescription**: usunięte z UI, zachowane jako `optional()` w schema — zero breaking change dla istniejących danych
- **IntersectionObserver threshold**: `0.1` (10%) — sticky bar znika gdy pierwsze 10% sekcji formularz wchodzi w viewport; wystarczająco wcześnie żeby nie zasłaniać formularza
- **Scroll-to-top repositioning**: gdy StickyBar widoczny, przycisk musi być wyżej. Implementacja: `StickyBar` dodaje CSS class `sticky-bar-visible` na `document.body`; `StickyHeader` czyta tę klasę do `bottom` positioning (`bottom-[72px]` zamiast `bottom-6`)
- **ExitIntentModal** montowany w `page.tsx` (nie w layout) — tylko na głównej stronie
- **StickyBar** montowany w `page.tsx` — tylko na głównej stronie
- **Multi-step walidacja**: `react-hook-form` `trigger(['field1', 'field2'])` przed przejściem do następnego kroku; wszystkie pola zarejestrowane od startu (wartości persystują między krokami)
- **GDPR w modalu**: checkbox zgody przed submitem (`"Wyrażam zgodę na kontakt telefoniczny"`) — required true
- **Honeypot w modalu**: to samo hidden input jak w głównym formularzu

## Otwarte pytania

### Rozwiązane podczas planowania

- **projectDescription usunąć czy zostawić?** → Zostawić jako `optional()` w schema, usunąć z UI. Zero breaking change.
- **Budget default dla modalu?** → Wysyłać `BUDGETS[0]` ("do 1500 zł"). Lead identyfikowalny przez projectType. Żadna zmiana schema.
- **IntersectionObserver threshold?** → `0.1` (10%). Bar znika gdy formularz zaczyna wchodzić w viewport.

### Odroczone do implementacji

- **Scroll-to-top repositioning**: CSS class `sticky-bar-visible` na body vs. shared React context — implementor wybiera prostsze w kontekście komponentu
- **Animacja multi-step (progress bar style)**: dots vs. licznik "Krok X z 3" — implementor wybiera pasujący do design system styl
- **StickyBar high: exact pixel**: zależy od final treści; `pb-[56px]` na `<main>` gdy bar visible (dostosować po implementacji)

## Implementation Units

---

- [x] **Unit 1: Schema + API — dodaj projectType, zaktualizuj email**

**Cel:** Rozszerzyć schemat Zod o `projectType`, zaktualizować API route żeby przyjmowało i używało nowego pola w emailu.

**Wymagania:** R9, R10

**Zależności:** Brak (fundament dla pozostałych unitów)

**Pliki:**
- Modyfikuj: `src/lib/schemas.ts`
- Modyfikuj: `src/app/api/contact/route.ts`

**Podejście:**

W `schemas.ts`:
```
export const PROJECT_TYPES = [
  "Strona wizytówkowa",
  "Sklep internetowy",
  "Platforma & aplikacja",
  "Modernizacja istniejącej strony",
  "Nie wiem jeszcze",
] as const;
```
Dodać `projectType: z.enum(PROJECT_TYPES, { errorMap: ... })` jako wymagane pole w `contactSchema`. `projectDescription` pozostaje `optional()` bez zmian.

W `route.ts`:
- Destructure `projectType` z `result.data`
- Dodać do email body: `Typ projektu: ${projectType}` jako pierwszą linię
- Zaktualizować subject emaila: `Nowy lead: ${name} — ${projectType}` (bardziej informacyjny)

**Scenariusze testowe:**
- [Unit] POST z valid `projectType` → 200 OK
- [Unit] POST bez `projectType` → 400 Invalid data
- [Unit] POST z `projectType` spoza enum → 400
- [Unit] Modal default: POST z `projectType: "Nie wiem jeszcze"` + `budget: "do 1500 zł"` → 200 OK
- [Unit] Honeypot filled → 400 (niezalterowane)

**Weryfikacja:**
- `contactSchema.safeParse({ ...validData, projectType: "Sklep internetowy" })` → success
- `contactSchema.safeParse({ ...validData })` bez projectType → failure z czytelnym error

---

- [x] **Unit 2: Multi-step ContactForm refactor**

**Cel:** Przepisać `ContactForm.tsx` na 3-krokowy wizard z progress barem, walidacją per-krok i przyciskiem Wstecz. Usunąć pole `projectDescription` z UI.

**Wymagania:** R1, R2, R3, R4, R5, R6, R7, R8

**Zależności:** Unit 1 (potrzebuje `PROJECT_TYPES` i zaktualizowanego schema)

**Pliki:**
- Modyfikuj: `src/components/ui/ContactForm.tsx`

**Podejście:**

Stan lokalny: `const [step, setStep] = useState<1 | 2 | 3>(1)`

Wszystkie pola zarejestrowane przez `useForm` od startu. Nawigacja forward używa `await trigger(['field1'])` — jeśli validacja OK, `setStep(s => s + 1)`. Back po prostu `setStep(s => s - 1)`.

**Krok 1 — Typ projektu:**
- Heading: "Czego potrzebujesz?"
- 5 kart/radio (PROJECT_TYPES) jako clickable divs z gold border gdy selected
- Rejestracja: `{...register("projectType")}` lub `setValue("projectType", type)` + Controller
- Walidacja: `trigger(["projectType"])` przed przejściem
- Przycisk: "Dalej →" (disabled gdy nic nie zaznaczone)

**Krok 2 — Projekt:**
- Heading: "Opowiedz o projekcie"
- Select `industry` (z INDUSTRIES)
- Select `budget` (z BUDGETS)
- Przyciski: "← Wstecz" + "Dalej →"
- Walidacja: `trigger(["industry", "budget"])`

**Krok 3 — Dane kontaktowe:**
- Heading: "Jak się z Tobą skontaktować?"
- Input `name` + Input `phone`
- Honeypot hidden input (bez zmian)
- Przyciski: "← Wstecz" + submit `"Chcę więcej klientów →"`
- Walidacja: przez handleSubmit (zod waliduje wszystko)

**Progress bar:**
- 3 punkty (dots) lub "Krok X z 3" nad formularzem
- Kolor gold dla ukończonych/aktywnych kroków
- Pasuje do design systemu (klasa `font-heading`, gold `#C9A84C`)

**Karty projectType (krok 1):**
```
background: step selected → rgba(201,168,76,0.12), border: rgba(201,168,76,0.5)
background: nie selected → rgba(255,255,255,0.025), border: rgba(201,168,76,0.14)
cursor: pointer, rounded-xl, px-4 py-3
```

**Wzorce do naśladowania:**
- `inputClass`, `labelClass`, `errorClass` — zachować bez zmian
- `btn-gold` class dla primary buttons
- Istniejące `style={{ color: "#94A3B8" }}` na labelach
- `aria-invalid`, `aria-describedby`, `role="alert"` — zachować na wszystkich polach

**Scenariusze testowe:**
- [E2E] Otwórz `/`, przewiń do formularza, sprawdź że widoczne karty kroku 1 (screenshot)
- [E2E] Kliknij "Dalej" bez wyboru — sprawdź error walidacji, formularz nie przechodzi
- [E2E] Wybierz "Strona wizytówkowa", kliknij Dalej → pojawia się krok 2 z industry/budget
- [E2E] W kroku 2 kliknij Wstecz → wróć do kroku 1, wybór zachowany
- [E2E] Wypełnij krok 2, przejdź do kroku 3, wypełnij name + phone, submit → redirect /dziekujemy

**Weryfikacja:**
- Wszystkie 3 kroki renderują poprawnie bez JS errors
- Walidacja blokuje przejście do następnego kroku
- Dane z poprzednich kroków persystują przy Wstecz/Dalej
- Submit trafia do `/api/contact` z wszystkimi wymaganymi polami (w tym `projectType`)
- Redirect na `/dziekujemy` po sukcesie

---

- [x] **Unit 3: ExitIntentModal — exit-intent kontakt desktop**

**Cel:** Nowy client component wychwytujący exit-intent na desktopie. Uproszczony formularz 2 pola (imię + telefon) + GDPR checkbox. Raz per sesja.

**Wymagania:** R11, R12, R13, R14, R15, R16, R17, R18, R19

**Zależności:** Unit 1 (schema musi przyjmować projectType; modal wysyła defaulty)

**Pliki:**
- Stwórz: `src/components/ui/ExitIntentModal.tsx`
- Modyfikuj: `src/app/page.tsx` (dodaj `<ExitIntentModal />` na końcu JSX, przed `</>`)`

**Podejście:**

`ExitIntentModal.tsx` — `"use client"`:

```
Stan lokalny:
- open: boolean (false)
- name, phone: string (controlled inputs)
- gdprConsent: boolean
- isSubmitting: boolean
- serverError: string | null
```

**Exit-intent detection** (`useEffect`):
```javascript
const handleMouseLeave = (e: MouseEvent) => {
  if (e.clientY < 5 && window.innerWidth >= 768) {
    const shown = sessionStorage.getItem("exitModalShown");
    const submitted = sessionStorage.getItem("formSubmitted");
    if (!shown && !submitted) {
      setOpen(true);
      sessionStorage.setItem("exitModalShown", "1");
    }
  }
};
document.addEventListener("mouseleave", handleMouseLeave);
return () => document.removeEventListener("mouseleave", handleMouseLeave);
```

**ESC + focus trap:**
- `useEffect` na `keydown` → ESC → `setOpen(false)`
- Focus trap: `useRef` na modal div, `onKeyDown Tab` cycling między interaktywnymi elementami

**Submit:**
```javascript
fetch("/api/contact", {
  method: "POST",
  body: JSON.stringify({
    name,
    phone,
    projectType: "Nie wiem jeszcze",
    industry: "Inna branża",       // z INDUSTRIES — valid enum
    budget: "do 1500 zł",          // BUDGETS[0] — valid enum
    honeypot: "",
  })
})
```
Po sukcesie: `sessionStorage.setItem("formSubmitted", "1")` + `router.push("/dziekujemy")`

**Animacja:**
- `open` → modal div z `opacity-0 scale-95` → `opacity-100 scale-100`, `transition-all duration-200`
- Overlay: `fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]`
- Modal box: `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[61]`
- Glass card style: `background: rgba(6,10,20,0.92)`, `border: 1px solid rgba(201,168,76,0.25)`, `backdropFilter: blur(20px)`, `rounded-2xl`, `p-8`, `max-w-md w-full mx-4`

**Treść modala:**
```
[X button — prawy górny róg, aria-label="Zamknij"]
"Poczekaj — masz projekt?"          (font-heading, text-white, text-xl)
"Zostaw numer, oddzwonię bezpłatnie w 24h."   (text-slate-400, text-sm, mb-6)

Input: Imię i nazwisko*
Input: Numer telefonu*
Checkbox: "Wyrażam zgodę na kontakt telefoniczny w celu omówienia projektu."

[Oddzwoń do mnie →]   (btn-gold, w-full)
[link: "Nie, dziękuję"]  (text-slate-600, text-sm, text-center, cursor-pointer)
```

**Wzorce do naśladowania:**
- `inputClass`, `labelClass`, `errorClass` z ContactForm.tsx
- Animacja/overlay podobna do CookieConsent (visible/hidden pattern)
- `useRouter` + `router.push("/dziekujemy")` jak w ContactForm

**Scenariusze testowe:**
- [E2E] Desktop: przesuń kursor poza górną krawędź → modal się pojawia
- [E2E] Modal nie pojawia się drugi raz w tej samej sesji (sessionStorage check)
- [E2E] Modal nie pojawia się po wypełnieniu głównego formularza (formSubmitted flag)
- [E2E] Mobile (< 768px): modal nigdy się nie pojawia
- [E2E] ESC zamyka modal
- [E2E] Submit z imię + telefon + zgoda GDPR → redirect /dziekujemy
- [E2E] Submit bez zgody GDPR → walidacja blokuje
- [E2E] Kliknij "Nie, dziękuję" → modal zamknięty

**Weryfikacja:**
- Modal nie powoduje layout shift na mobile
- Focus trap działa: Tab cycling między polami i przyciskami
- `sessionStorage.exitModalShown` ustawiony po pierwszym otwarciu
- POST trafia z prawidłowymi wartościami default (sprawdź Network tab w devtools)

---

- [x] **Unit 4: StickyBar — persistent CTA + scroll-to-top repositioning**

**Cel:** Nowy component persistent CTA na dole viewport. Znika gdy formularz widoczny (IntersectionObserver). Repozycjonuje scroll-to-top button gdy widoczny.

**Wymagania:** R20, R21, R22, R23

**Zależności:** Brak (niezależny od innych unitów)

**Pliki:**
- Stwórz: `src/components/ui/StickyBar.tsx`
- Modyfikuj: `src/app/page.tsx` (dodaj `<StickyBar />`)
- Modyfikuj: `src/components/ui/StickyHeader.tsx` (repositioning scroll-to-top button)

**Podejście:**

`StickyBar.tsx` — `"use client"`:

**Visibility logic:**
```javascript
const [visible, setVisible] = useState(false);

useEffect(() => {
  const target = document.getElementById("formularz");
  if (!target) return;

  const observer = new IntersectionObserver(
    ([entry]) => setVisible(!entry.isIntersecting),
    { threshold: 0.1 }
  );
  observer.observe(target);
  return () => observer.disconnect();
}, []);
```

**Body class dla scroll-to-top repositioning:**
```javascript
useEffect(() => {
  if (visible) document.body.classList.add("sticky-bar-visible");
  else document.body.classList.remove("sticky-bar-visible");
  return () => document.body.classList.remove("sticky-bar-visible");
}, [visible]);
```

**Padding-bottom na body:** Dodać do `globals.css` lub inline:
```css
body.sticky-bar-visible {
  padding-bottom: 56px;
}
```

**JSX:**
```jsx
if (!visible) return null;

<div
  className="fixed bottom-0 left-0 right-0 z-[45]"
  style={{
    background: "rgba(6,10,20,0.92)",
    backdropFilter: "blur(12px)",
    borderTop: "1px solid rgba(201,168,76,0.2)",
  }}
>
  <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
    <p className="text-sm font-medium" style={{ color: "#94A3B8" }}>
      Chcesz stronę, która sprzedaje?
    </p>
    <a
      href="#formularz"
      className="btn-gold text-sm px-5 py-2.5 rounded-xl shrink-0"
    >
      Bezpłatna wycena →
    </a>
  </div>
</div>
```

**Scroll-to-top button repositioning w StickyHeader.tsx:**

Zmienić `className` scroll-to-top button z `bottom-6` na dynamiczne:
```javascript
// Dodać stan do StickyHeader:
const [stickyBarVisible, setStickyBarVisible] = useState(false);

useEffect(() => {
  const observer = new MutationObserver(() => {
    setStickyBarVisible(document.body.classList.contains("sticky-bar-visible"));
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}, []);

// Na przycisku:
className={`fixed ${stickyBarVisible ? "bottom-20" : "bottom-6"} right-6 z-50 ...`}
```

Alternatywa (prostsza): w `globals.css` dodać:
```css
body.sticky-bar-visible .scroll-to-top-btn {
  bottom: 5rem; /* 80px */
}
```
I dodać klasę `scroll-to-top-btn` do przycisku w StickyHeader. **Preferowana** — bez dodatkowego JS.

**Wzorce do naśladowania:**
- `StickyHeader.tsx` — scroll-based visibility pattern z `useEffect`
- `CookieConsent.tsx` — `fixed bottom-0 left-0 right-0`, conditional render
- `btn-gold` class, gold border style

**Scenariusze testowe:**
- [E2E] Na górze strony: sticky bar widoczny
- [E2E] Przewiń do sekcji `#formularz` → sticky bar znika
- [E2E] Przewiń z powrotem w górę → sticky bar wraca
- [E2E] Kliknij "Bezpłatna wycena →" → smooth scroll do formularza
- [E2E] Sprawdź na mobile → sticky bar widoczny i nie nakłada się na formularz
- [E2E] Gdy CookieConsent widoczny + StickyBar: CookieConsent przykrywa bar (z-index OK)
- [E2E] Scroll-to-top button nie nakłada się na sticky bar (screenshot)

**Weryfikacja:**
- `padding-bottom` na body aktywny gdy bar visible, usunięty gdy bar ukryty
- IntersectionObserver disconnect w cleanup (memory leak prevention)
- Z-index: bar pod CookieConsent (`z-[45]` < `z-50`)
- Scroll-to-top button nie chowa się pod bar

---

- [x] **Unit 5: Gwarancja satysfakcji — content change**

**Cel:** Dodać jedno zdanie gwarancji satysfakcji w pobliżu formularza kontaktowego. Data: +26% CVR.

**Wymagania:** R24

**Zależności:** Brak

**Pliki:**
- Modyfikuj: `src/components/sections/ContactFormSection.tsx`

**Podejście:**

Dodać pod istniejącym paragrafem opisu (`"Wypełnij formularz..."`) nowe zdanie z ikoną checkmark w stylu gold:

```jsx
<p className="text-slate-500 text-lg">
  Wypełnij formularz. Skontaktuję się w ciągu 24 godzin i omówimy
  Twój projekt bez zobowiązań.
</p>
<p className="text-sm mt-3 flex items-center justify-center gap-2" style={{ color: "#C9A84C" }}>
  <span>✓</span>
  Pracuję do momentu, gdy jesteś w pełni zadowolony — bez dodatkowych kosztów.
</p>
```

Alternatywnie: umieścić pod przyciskiem submit w ContactForm.tsx (jeszcze bliżej punktu konwersji). Implementor wybiera lepszą pozycję wizualnie.

**Scenariusze testowe:**
- [E2E] Zdanie gwarancji widoczne w sekcji kontaktowej (screenshot)
- [E2E] Kolor gold `#C9A84C`, czytelne na ciemnym tle

**Weryfikacja:**
- Zdanie renderuje bez przepełnienia na mobile
- Nie narusza istniejącego layoutu sekcji

---

## Wpływ systemowy

- **API breaking change**: `projectType` wymagane w `contactSchema` → wszelkie testy integracyjne lub manualne POST bez tego pola zwrócą 400. Implementacja Units musi zacząć od Unit 1.
- **sessionStorage flags**: `exitModalShown` i `formSubmitted` — w dziekujemy stronie lub po redirect, flag `formSubmitted` musi być ustawiony zanim redirect nastąpi. Ustawiać go **przed** `router.push()`.
- **CookieConsent + StickyBar**: oba na `bottom-0`. CookieConsent jest w `layout.tsx` (globalny), StickyBar w `page.tsx`. Przy pierwszej wizycie oba aktywne — CookieConsent (`z-50`) przykrywa StickyBar (`z-[45]`), co jest akceptowalne UX.
- **Scroll-to-top button**: currently `fixed bottom-6 right-6 z-50` w StickyHeader. Musi być repositioned gdy StickyBar aktywny. CSS class approach preferowana (mniej JS, zero flicker).
- **FB Pixel Lead event**: modal wysyła do `/dziekujemy` gdzie `ThankYouPixelEvent` odpala `Lead` event — bez zmian.
- **Rate limit**: 5 req/hr/IP — dotyczy obu formularzy. Modal i main form współdzielą limit. Nie ma potrzeby zmiany.

## Ryzyka i zależności

- **Unit 1 jest prerequisitem** dla Unit 2 i Unit 3 — zmiana schema musi wejść przed refaktorem formularza
- **MutationObserver w StickyHeader** (dla `sticky-bar-visible` class): mała dodatkowa złożoność; CSS approach eliminuje ją całkowicie — preferować CSS
- **focus trap implementacja**: biblioteki (focus-trap-react) lub ręcznie. Ręczna implementacja dla 2-3 focusable elements jest prosta: Tab → next, Shift+Tab → prev, wrap around. Nie wymaga zewnętrznej lib.
- **react-hook-form trigger na krok 1**: `projectType` rejestrowane przez `Controller` lub `setValue` (bo radio/karty nie są native input) — musi być prawidłowo zintegrowane z RHF żeby `trigger` działało
- **Animacja modala**: `if (!open) return null` eliminuje z DOM. Lepsze UX: zachować w DOM z opacity/pointer-events toggle żeby animacja wyjścia działała. Implementor decyduje czy animacja wyjścia jest potrzebna.

## Źródła i referencje

- **Dokument źródłowy:** [docs/dev-brainstorms/2026-06-23-cro-upgrade-requirements.md](../dev-brainstorms/2026-06-23-cro-upgrade-requirements.md)
- Powiązany kod: `src/components/ui/ContactForm.tsx`, `src/lib/schemas.ts`, `src/app/api/contact/route.ts`
- Research: Venture Harbour multi-step form (+743% CVR), Wisepops popup data (1B+ displays), Popupsmart B2B benchmark (2% B2B popup CVR)
