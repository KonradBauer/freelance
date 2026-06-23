---
title: "feat: Lead chatbot z kwalifikacją leadów i email reminders"
type: feat
status: active
date: 2026-06-23
origin: docs/dev-brainstorms/2026-06-23-lead-chatbot-requirements.md
---

# feat: Lead chatbot z kwalifikacją leadów i email reminders

## Przegląd

Chatbot jako lead magnet na studiocodeart.pl. Zbiera dane od odwiedzającego (7 pytań), wysyła email do Konrada z pełnym podsumowaniem, oraz 3 automatyczne reminder maile do klienta przez Resend `scheduledAt`. Bez Make.com, bez scoringu, bez zewnętrznych automation narzędzi. Stack: Typebot (embed) + nowy API route `/api/bot-lead` + Resend (już w projekcie).

## Ujęcie problemu

Formularz i ExitIntentModal zbierają tylko telefon/imię - nie kwalifikują leadu i nie prowadzą follow-upu. Bot zbiera richer dane (cel, budżet, timeline), powiadamia Konrada natychmiast i automatycznie wysyła 3 reminder maile do klienta bez manualnej pracy.

(zob. źródło: `docs/dev-brainstorms/2026-06-23-lead-chatbot-requirements.md`)

## Śledzenie wymagań

Z requirements doc, zakres po uproszczeniu:
- R1-R6: Trigger i koegzystencja z ExitIntentModal
- R7-R16: Konwersacja (7 pytań)
- R26-R29: GDPR (checkbox wymagany, timestamp)
- **Pominięte**: R17-R18 (scoring), R19-R25 (Make.com sequences, Google Sheets)
- **Nowe**: email do Konrada + 3 scheduled reminder maile do klienta przez Resend

## Granice scope'u

- Brak Make.com - całe przetwarzanie w `/api/bot-lead`
- Brak lead scoringu - jeden prosty flow dla wszystkich leadów
- Brak Google Sheets CRM
- Brak tiered email sequences - te same 3 reminder maile niezależnie od odpowiedzi
- Brak AI/LLM - rule-based Typebot flow
- ExitIntentModal pozostaje bez zmian

## Kontekst i research

### Relevantny kod i wzorce

- `src/components/ui/ExitIntentModal.tsx` - **główny wzorzec** trigger logic: `useEffect`, `sessionStorage` flags, event listener cleanup, `window.innerWidth < 768` mobile guard
- `src/app/api/contact/route.ts` - **wzorzec API route**: Resend setup, rate limiting, honeypot, env vars - skopiuj i zaadaptuj
- `src/app/page.tsx` - montowanie globalnych komponentów (za `<ExitIntentModal />`)
- `src/components/ui/StickyHeader.tsx` - scroll event listener pattern

### Wiedza instytucjonalna

- Projekt używa Resend SDK (`resend@^4.5.0`) - już zainstalowany, pattern w `contact/route.ts`
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL` już w `.env.local`
- sessionStorage flags: `exitModalShown`, `formSubmitted` - nowy: `chatbotShown`
- localStorage: `cookie_consent` - nowy: `chatbotVisited` (return visitor detection)

### Referencje zewnętrzne

- `@typebot.io/react` (Bubble komponent) + `@typebot.io/js` (imperative `open()` API) - nie zainstalowane
- Resend `scheduledAt` param: ISO 8601 date string, np. `new Date(Date.now() + 2 * 24*60*60*1000).toISOString()` → email wysłany za 2 dni
- Typebot: blok "HTTP Request" na końcu flow wysyła wszystkie zmienne jako JSON do naszego webhooka

## Kluczowe decyzje techniczne

- **Typebot webhook → `/api/bot-lead`** (nie Make.com): prostszy stack, email content w TypeScript (version controlled), rate limiting przez existing pattern
- **Resend `scheduledAt`** dla reminder maili: 3 emaile wysyłane w jednym wywołaniu API z przyszłą datą - brak cron, brak zewnętrznych schedulerów
- **`@typebot.io/js` `open()`** dla programmatic trigger: Bubble nie ma controlled prop, `open()` to imperative API z osobnego pakietu
- **Return visitor przez localStorage `chatbotVisited`**: cross-session (nie sessionStorage) - przy powrocie bot otwiera się bez czekania na 20s+scroll
- **Brak scoringu**: dane z bota w emailu do Konrada - ocenia manualnie, bez automated tiering
- **CSP**: next.config.ts nie ma Content-Security-Policy - Typebot scripts ładują się bez zmian

## Otwarte pytania

### Rozwiązane podczas planowania

- **Jak scheduled emails bez Make.com?** Resend `scheduledAt` - jeden API call, 3 emaile z datami w przyszłości
- **Jak programmatic trigger Typebot Bubble?** `import { open } from '@typebot.io/js'` wywołane w useEffect
- **Czy Typebot webhook format?** HTTP Request block w edytorze Typebot, zmienne przez `{{NazwaZmiennej}}`, payload flat JSON

### Odroczone do implementacji

- **Resend `scheduledAt` limit**: sprawdzić max okres zaplanowania (known: działa do ~1 miesiąca)
- **Typebot bot ID**: dostępny po założeniu konta i stworzeniu bota (Unit 1)
- **`@typebot.io/js` import w SSR**: sprawdzić czy `import { open }` wymaga dynamic import lub czy wystarczy wywołanie w useEffect

## Implementation Units

---

- [ ] **Unit 1: Typebot Cloud - Konfiguracja konta i bota**

**Cel:** Działający bot flow z 7 pytaniami, checkboxem GDPR i HTTP Request block wysyłającym dane do `/api/bot-lead`.

**Wymagania:** R7-R16, R26-R29

**Zależności:** Unit 2 (API route) + deploy na produkcję. Skonfiguruj Typebot dopiero po deploy - wtedy wpisujesz `https://www.studiocodeart.pl/api/bot-lead` od razu jako finalny URL.

**Pliki:**
- Brak plików w repozytorium - konfiguracja w `cloud.typebot.io`
- Typebot bot ID potrzebny w Unit 3

**Podejście - budowa flow:**

Kolejność setup: Typebot account → New Typebot "Lead Kwalifikacja" → buduj bloki:

1. **Blok 0 (Powitanie):** Text bubble - "Hej! Jestem Konrad 👋 Pomagam firmom zdobywać klientów przez internet. Zanim wyślesz formularz - powiedz mi w 2 minutach czego szukasz, a dopasuję Ci od razu konkretną odpowiedź."

2. **Blok 1 (Q1):** Buttons - "Co Cię tu przyciągnęło?" | [Chcę nową stronę] [Mam stronę ale nie działa] [Chcę sklep online] [Tylko oglądam] → zmienna `purpose`

3. **Gałąź "Tylko oglądam":** Condition na `purpose` = "Tylko oglądam" → skrócone flow: "Rozumiem! Wyślę Ci checklistę 10 rzeczy, które każda strona firmowa musi mieć. Na jaki email?" → zmienna `email` → GDPR block → HTTP Request → koniec

4. **Blok 2 (Q2):** Buttons - "Czy masz teraz stronę?" | [Tak, ale słabo działa] [Nie, zaczynam od zera] [Tak, potrzebuję czegoś dodatkowego] → `hasWebsite`

5. **Blok 3 (Q3):** Buttons - "Jaki to biznes?" | [Prowadzę swój biznes] [Pracuję w firmie (10-50 osób)] [Większa organizacja] → `businessType`

6. **Blok 4 (Q4):** Buttons - "Co ma robić ta strona dla Ciebie?" | [Przyciągać nowych klientów] [Wyglądać bardziej profesjonalnie] [Sprzedawać produkty online] [Coś innego] → `goal`

7. **Blok 5 (Q5):** Buttons - "Żeby nie tracić Twojego czasu - w jakim budżecie myślisz?" | [do 3 000 zł] [3 000-6 000 zł] [6 000-15 000 zł] [15 000+ zł] → `budget`

8. **Blok 6 (Q6):** Buttons - "Kiedy chciałbyś to mieć gotowe?" | [Jak najszybciej (w ciągu miesiąca)] [W ciągu 1-3 miesięcy] [3-6 miesięcy] [Nie wiem jeszcze] → `timeline`

9. **Blok 7 (GDPR + email):**
   - Text: "Super - wyślę Ci kilka przykładów z portfolio dopasowanych do Twojego projektu. Na jaki email?"
   - Input (typ Email) → `email`
   - Checkbox required: "Wyrażam zgodę na kontakt mailowy w celu omówienia projektu. [Polityka prywatności](https://www.studiocodeart.pl/polityka-prywatnosci)"
   - Set Variable: `gdprTimestamp = {{Current date}}`

10. **Blok 8 (Zakończenie):** Text bubble - "Super! Wyślę Ci portfolio za chwilę. Możesz też od razu umówić 30-minutową rozmowę: https://calendly.com/konradbauer94/30min 👇"

11. **Blok 9 (HTTP Request):** POST do `https://www.studiocodeart.pl/api/bot-lead`
    ```json
    {
      "purpose": "{{purpose}}",
      "hasWebsite": "{{hasWebsite}}",
      "businessType": "{{businessType}}",
      "goal": "{{goal}}",
      "budget": "{{budget}}",
      "timeline": "{{timeline}}",
      "email": "{{email}}",
      "gdprTimestamp": "{{gdprTimestamp}}",
      "secret": "BOT_WEBHOOK_SECRET"
    }
    ```
    (secret = shared secret do walidacji w API route, wpisany też w `.env.local`)

**Motyw:** tło `#060A14`, tekst `#F1F5F9`, accent `#C9A84C`

**Scenariusze testowe:**
- [E2E] Pełny flow w Typebot preview → HTTP Request → sprawdź logi
- [E2E] Ścieżka "Tylko oglądam" → skrócone flow działa
- [E2E] Brak GDPR checkboxa → bot blokuje email input

**Weryfikacja:**
- Bot preview działa end-to-end
- HTTP Request wysyła poprawny JSON (widoczny w Typebot → Logs)

---

- [x] **Unit 2: API route `/api/bot-lead`**

**Cel:** Endpoint odbierający webhook z Typebot, walidujący secret, wysyłający email do Konrada + 3 scheduled reminder maile do klienta przez Resend.

**Wymagania:** R19 (immediate email), R20-R21 (follow-upy przez scheduledAt), R28 (unsubscribe)

**Zależności:** Brak (tworzona niezależnie, testowana lokalnie narzędziem Typebot test/curl)

**Pliki:**
- Stwórz: `src/app/api/bot-lead/route.ts`
- Modyfikuj: `.env.local` + `.env.local.example` (dodaj `BOT_WEBHOOK_SECRET`, `RESEND_TO_EMAIL` już jest)

**Podejście:**

Skopiuj strukturę z `src/app/api/contact/route.ts` i zaadaptuj:

```
POST /api/bot-lead
Body: { purpose, hasWebsite, businessType, goal, budget, timeline, email, gdprTimestamp, secret }

1. Sprawdź secret === process.env.BOT_WEBHOOK_SECRET → 401 jeśli nie
2. Waliduj email (basic format check)
3. Rate limit per email (nie per IP - bot może mieć wspólne IP)
4. Wyślij przez Resend:
   a. Email do Konrada (natychmiast):
      from: RESEND_FROM_EMAIL
      to: RESEND_TO_EMAIL
      subject: "Nowy lead z chatbota: [purpose]"
      text: zestawienie wszystkich zmiennych
   b. Email do klienta - potwierdzenie (natychmiast):
      subject: "Odebrałem Twoje zgłoszenie - Konrad"
      text: personalny mail z obietnicą kontaktu + Calendly link
   c. Email do klienta - reminder 1 (scheduledAt: now + 2 dni):
      subject: "Masz jeszcze pytania o projekt?"
   d. Email do klienta - reminder 2 (scheduledAt: now + 7 dni):
      subject: "Ostatnia wiadomość ode mnie"
5. Return { ok: true }
```

**Email do Konrada (treść):**
```
Nowy lead z chatbota

Email: [email]
Cel: [purpose]
Strona: [hasWebsite]
Biznes: [businessType]
Goal: [goal]
Budżet: [budget]
Timeline: [timeline]
GDPR: [gdprTimestamp]

Calendly: https://calendly.com/konradbauer94/30min
```

**Email potwierdzenia do klienta (natychmiast):**
```
Cześć!

Odebrałem Twoje zgłoszenie. Na podstawie tego co powiedziałeś ([goal]) - to brzmi jak projekt w mojej specjalizacji.

Odezwę się w ciągu 24 godzin z kilkoma przykładami z portfolio.

Jeśli chcesz przyspieszyć - możesz od razu umówić 30-minutową rozmowę:
https://calendly.com/konradbauer94/30min

Konrad
studiocodeart.pl | +48 781 573 274
```

**Reminder 1 (scheduledAt: +2 dni):**
```
Cześć,

Wyobrażasz sobie jak Twoja strona powinna wyglądać? (kolory firmy, przykłady stron które lubisz?)

Takie info przyspiesza wycenę 3-krotnie. Odpowiedz mailem lub umów rozmowę:
https://calendly.com/konradbauer94/30min

Konrad
```

**Reminder 2 (scheduledAt: +7 dni):**
```
Cześć,

Ostatnia wiadomość ode mnie - jeśli to nie ten moment, spoko.

Odezwij się gdy będziesz gotowy - moje portfolio: https://www.studiocodeart.pl/#portfolio

Konrad
```

**Wzorce do naśladowania:**
- `src/app/api/contact/route.ts` - pełna struktura do skopiowania i zaadaptowania

**Scenariusze testowe:**
- [Unit] POST z prawidłowym secret + danymi → 200 OK, wszystkie 4 emaile wysłane
- [Unit] POST z błędnym secret → 401
- [Unit] POST z nieprawidłowym emailem → 400
- [Unit] Drugi POST z tym samym emailem w ciągu godziny → 429 (rate limit)
- [Unit] Scheduled emaile mają przyszłą datę w Resend dashboard

**Weryfikacja:**
- `npm run build` bez błędów TypeScript
- `curl -X POST localhost:3000/api/bot-lead -H 'Content-Type: application/json' -d '{...}'` → 200 + emaile w Resend dashboard
- Scheduled emaile widoczne w Resend → Emails z przyszłą datą dostarczenia

---

- [x] **Unit 3: LeadChatbot.tsx - komponent React z trigger logic**

**Cel:** Client component embeddujący Typebot Bubble, auto-otwierający się po 20s+50% scroll na desktop, z manualnym launcher buttonem na mobile.

**Wymagania:** R1-R6

**Zależności:** Unit 1 (typebot bot ID), Unit 2 (API route działa)

**Pliki:**
- Stwórz: `src/components/ui/LeadChatbot.tsx`
- Modyfikuj: `src/app/page.tsx` (mount)
- Modyfikuj: `package.json` (nowe zależności)

**Instalacja:**
```bash
npm install @typebot.io/react @typebot.io/js
```

**Podejście - trigger logic:**

Wzorowany na `ExitIntentModal.tsx` (linie 17-39):

```
"use client"

useRef: hasScrolled50 (boolean), hasWaited20s (boolean)

useEffect na mount:
  1. Sprawdź sessionStorage.chatbotShown → jeśli "1" → return (R3)
  2. Sprawdź sessionStorage.formSubmitted → jeśli "1" → return
  3. Sprawdź window.innerWidth < 768 → return (R6 - mobile no auto-trigger)
  4. Sprawdź localStorage.chatbotVisited:
     - "1" = return visitor (R2) → triggerOpen() natychmiast → return
     - brak → localStorage.chatbotVisited = "1"
  5. Scroll listener:
     const ratio = window.scrollY / (document.body.scrollHeight - window.innerHeight)
     jeśli ratio >= 0.5 → hasScrolled50.current = true → maybeOpen()
  6. setTimeout 20 000ms → hasWaited20s.current = true → maybeOpen()
  
maybeOpen():
  jeśli hasScrolled50.current && hasWaited20s.current:
    triggerOpen()

triggerOpen():
  import('@typebot.io/js').then(({ open }) => open())
  sessionStorage.setItem("chatbotShown", "1")

cleanup: clearTimeout, removeEventListener
```

**Typebot Bubble embed:**
```tsx
import { Bubble } from '@typebot.io/react'

<Bubble
  typebot="WKLEJ_BOT_ID_TUTAJ"
  prefilledVariables={{ isReturnVisitor: isReturnVisitor ? "tak" : "nie" }}
  theme={{
    button: { backgroundColor: "#C9A84C" },
    chatWindow: { backgroundColor: "#060A14" }
  }}
/>
```

**Uwaga wykonawcza:** `@typebot.io/js` `open()` musi być wywołane client-side. Użyj dynamic import `import('@typebot.io/js')` zamiast static import żeby uniknąć SSR issues.

**Wzorce do naśladowania:**
- `src/components/ui/ExitIntentModal.tsx` (trigger + cleanup)
- `src/components/ui/StickyHeader.tsx` (scroll event pattern)
- `src/components/ui/CookieConsent.tsx` (localStorage pattern)

**Scenariusze testowe:**
- [E2E] Desktop: otwórz stronę, poczekaj 20s + przewiń 50% → Typebot Bubble otwiera się automatycznie
- [E2E] Desktop: odśwież (ta sama sesja) → bot NIE otwiera się ponownie
- [E2E] Mobile (< 768px): poczekaj + przewiń → bot NIE otwiera się auto; launcher button widoczny
- [E2E] Mobile: kliknij launcher button → bot otwiera się manualnie
- [E2E] Nowy tab po poprzedniej wizycie → return visitor → bot otwiera się bez czekania
- [E2E] ExitIntentModal pojawił się → chatbot może się nadal otworzyć (różne sessionStorage flagi)
- [E2E] `formSubmitted = "1"` w sessionStorage → chatbot NIE otwiera się automatycznie

**Weryfikacja:**
- `npm run build` bez TypeScript errors
- Launcher button widoczny bottom-right na desktop i mobile
- Auto-trigger działa po 20s + 50% scroll
- Bot flow otwiera się i przechodzi przez pytania

---

- [x] **Unit 4: Montaż w page.tsx**

**Cel:** LeadChatbot widoczny na głównej stronie.

**Wymagania:** R5

**Zależności:** Unit 3

**Pliki:**
- Modyfikuj: `src/app/page.tsx`

**Podejście:**

```tsx
import LeadChatbot from "@/components/ui/LeadChatbot";

// Na końcu JSX, za <ExitIntentModal />:
<ExitIntentModal />
<LeadChatbot />
```

**Weryfikacja:**
- `npm run dev` → obie komponenty widoczne, brak błędów konsoli
- LeadChatbot nie blokuje ExitIntentModal (różne z-index, różne triggery)

---

## Wpływ systemowy

- **sessionStorage**: nowy flag `chatbotShown` (obok `exitModalShown`, `formSubmitted` - brak konfliktów)
- **localStorage**: nowy key `chatbotVisited` (nie koliduje z `cookie_consent`)
- **package.json**: `@typebot.io/react`, `@typebot.io/js` - nowe zależności, sprawdzić bundle size
- **Env vars**: nowy `BOT_WEBHOOK_SECRET` w `.env.local` i docker-compose (runtime secret)
- **API routes**: nowy `/api/bot-lead` - bez wpływu na istniejące `/api/contact` i `/api/health`

## Ryzyki i zależności

- **Resend `scheduledAt` limit**: sprawdzić max scheduled date (zazwyczaj ~1 miesiąc). +7 dni powinno być OK.
- **Typebot free tier 200 chat/mc**: przy ruchu organicznym może być ciasno - Starter plan $39/mc
- **Kolejność Units**: napisz i deploy Units 2-4 PRZED konfiguracją Typebot HTTP Request block w Unit 1 - wtedy masz prawdziwy URL `https://www.studiocodeart.pl/api/bot-lead` od razu.
- **BOT_WEBHOOK_SECRET w docker-compose**: dodać do `environment` bloku jak inne runtime secrets

## Notatki operacyjne

- Przed startem: założyć konto Typebot (`cloud.typebot.io`) jeśli nie istnieje
- `RESEND_API_KEY` już w projekcie - `/api/bot-lead` używa tego samego key
- Calendly link `https://calendly.com/konradbauer94/30min` hardcoded w emailach i bot flow
- Po deploy: zaktualizować URL webhook w Typebot (Blok 9) na `https://www.studiocodeart.pl/api/bot-lead`

## Źródła i referencje

- **Dokument źródłowy:** [docs/dev-brainstorms/2026-06-23-lead-chatbot-requirements.md](../dev-brainstorms/2026-06-23-lead-chatbot-requirements.md)
- Wzorzec trigger: `src/components/ui/ExitIntentModal.tsx`
- Wzorzec API route: `src/app/api/contact/route.ts`
- Typebot React SDK: `https://docs.typebot.io/deploy/web/react`
- Resend scheduledAt: `https://resend.com/docs/api-reference/emails/send-email`
