---
title: "feat: Freelance Landing Page — Lead Generation via FB Ads"
type: feat
status: completed
date: 2026-05-21
origin: docs/dev-brainstorms/2026-05-21-freelance-landing-page-requirements.md
---

# feat: Freelance Landing Page — Lead Generation via FB Ads

## Przegląd

Zbuduj Next.js 15 (App Router, SSG) landing page dla freelancera web dev. Jedna long-scroll strona z narracją transformacyjną (ból → agitacja → rozwiązanie), formularzem kwalifikującym i FB Pixelem. Optymalna pod zimny ruch Facebook Ads, mobile-first, Core Web Vitals LCP < 2.5s.

## Ujęcie problemu

Właściciele małych firm tracą klientów przez brak profesjonalnej obecności online. Strona musi mówić językiem ich bólu — nie "tworzę strony", ale "twoi klienci Cię nie znajdują" — i prowadzić za rękę do formularza kontaktowego. Ruch wyłącznie z FB Ads, więc kluczowe: szybkość na mobile, jeden CTA, zero rozproszeń.

(zob. źródło: `docs/dev-brainstorms/2026-05-21-freelance-landing-page-requirements.md`)

## Śledzenie wymagań

- R1. Jedna long-scroll strona, brak nawigacji do podstron
- R2. Hero: pain headline, sub-headline, jeden CTA scrollujący do formularza
- R3. Sekcja agitacji: 3 konkretne konsekwencje braku strony
- R4. Sekcja transformacji: stan "po" — klient widzi rozwiązanie
- R5. "Jak działam": 3 kroki (kontakt → wycena → realizacja)
- R6. Portfolio: ≥3 realizacje z miniaturą, branżą, jednozdaniowym efektem
- R7. Sekcja video: osadzony film, lazy-load
- R8. Formularz: imię, telefon, branża (select), budżet (select) + POST → email
- R9. `/dziekujemy` — osobny URL po submissio (nie modal)
- R10. FB Pixel: PageView na wejściu, Lead na `/dziekujemy`, po consent
- R11. Mobile-first od 390px
- R12. LCP < 2.5s (SSG, next/image, video facade)

## Granice scope'u

- Brak bloga, podstron branżowych, sklepu, panelu klienta
- Brak live chatu, chatbota, wielojęzyczności
- Brak sekcji cennika
- Copywriting (treści) dostarcza właściciel — implementacja używa placeholderów z `TODO:` comments
- Brak animowanego before/after w portfolio (v1)

## Kontekst i research

### Relevantny kod i wzorce

- `.claude/skills/tailwind-react-guidelines/resources/forms.md` — React Hook Form + Zod, validacja, accessibility
- `.claude/skills/tailwind-react-guidelines/resources/component-patterns.md` — struktura komponentów, responsive
- `.claude/skills/tailwind-react-guidelines/resources/performance.md` — lazy load, next/image, bundle
- `.claude/skills/ux-ui-guidelines/resources/design-system.md` — tokeny kolorów i typografii

### Wiedza instytucjonalna

- `docs/solutions/` — nie istnieje (greenfield). Wzorce z tego projektu staną się bazą.

### Referencje zewnętrzne

- Next.js 15 App Router — SSG, Metadata API, Route Handlers
- Resend Node.js SDK — transakcyjne emaile z API Route
- FB Pixel — `fbq('init')`, `fbq('track', 'PageView')`, `fbq('track', 'Lead')`
- ePrivacy Directive + GDPR (PL) — consent wymagany przed non-essential cookies

## Kluczowe decyzje techniczne

- **Next.js 15 App Router + SSG**: `export const dynamic = 'force-static'` na wszystkich trasach poza `/api`. Optymalny czas odpowiedzi na Vercel, zero serwerowego renderowania dla statycznej treści.
- **Form backend: API Route + Resend**: brak zależności od zewnętrznego SaaS form provider. Free tier Resend = 3000 maili/mies., wystarczający dla lead gen.
- **FB Pixel: lazy-load po consent**: GDPR wymaga zgody przed non-essential cookies w EU/PL. Consent przechowywany w `localStorage`. Pixel wstrzykiwany przez `next/script` strategy `afterInteractive` tylko gdy `cookie_consent === 'accepted'`.
- **URL-based conversion fallback**: `/dziekujemy` jako konwersja URL w FB Ads Manager — działa nawet bez Pixela (ad blockers, odmowa consent).
- **Video facade (click-to-play)**: thumbnail + overlay button zamiast `<iframe>` w DOM. Iframe ładowany tylko po kliknięciu. Zapobiega penalizacji LCP przez ciężki embed.
- **Rate limiting: honeypot + in-memory IP map**: wystarczający dla niskiego ruchu landing page. Ograniczenie: mapa resetuje się przy Vercel cold start. Ścieżka upgrade: Vercel KV gdy ruch wzrośnie.
- **React Hook Form + Zod**: zgodne z `.claude/skills/tailwind-react-guidelines/resources/forms.md`. Walidacja po obu stronach (client + server).
- **Portfolio: `next/image` screenshoty**: client dostarcza screenshoty. Brak before/after na v1.

## Otwarte pytania

### Rozwiązane podczas planowania

- **Form backend**: API Route + Resend (zob. decyzje techniczne)
- **GDPR/FB Pixel**: consent banner + lazy-load (zob. decyzje techniczne)
- **Portfolio format**: statyczne screenshoty przez next/image (zob. decyzje techniczne)

### Odroczone do implementacji

- **Dokładne copy i nagłówki**: klient dostarcza treść przed finalną wersją. Implementacja z placeholderami `TODO:`.
- **URL wideo**: klient dostarcza link YouTube/Vimeo. VideoEmbed przyjmuje `src` prop z `constants.ts`.
- **Screenshoty portfolio**: klient dostarcza pliki do `public/portfolio/`. Komponenty z placeholder images na start.
- **Paleta kolorów / identyfikacja wizualna**: klient decyduje. Implementacja z Tailwind CSS variables (łatwa podmiana).
- **Resend API key + FB Pixel ID**: klient konfiguruje przez Vercel env vars przed produkcją.
- **Konkretne branże w select**: lista branż do ustalenia podczas implementacji na podstawie doświadczenia klienta.

## Implementation Units

---

- [x] **Unit 1: Scaffolding projektu Next.js 15**

**Cel:** Działający projekt Next.js z pełną konfiguracją — TypeScript strict, Tailwind v4, wszystkie zależności.

**Wymagania:** R11, R12 (fundament pod mobile-first i performance)

**Zależności:** Brak

**Pliki:**
- Stwórz: `package.json`
- Stwórz: `tsconfig.json`
- Stwórz: `next.config.ts`
- Stwórz: `src/app/globals.css`
- Stwórz: `src/app/layout.tsx` (stub)
- Stwórz: `src/app/page.tsx` (stub)
- Stwórz: `.env.local.example`
- Stwórz: `.gitignore`

**Podejście:**
- `create-next-app@latest` z flagami: TypeScript, Tailwind CSS, App Router, `src/` directory, bez `app/` na root
- Zainstaluj: `react-hook-form`, `@hookform/resolvers`, `zod`, `resend`
- `tsconfig.json`: `"strict": true`, `"baseUrl": "src"`, path aliases `@/*`
- `next.config.ts`: brak dodatkowych konfiguracji na v1 poza typami
- `.env.local.example`: `RESEND_API_KEY=`, `RESEND_TO_EMAIL=`, `NEXT_PUBLIC_FB_PIXEL_ID=`
- Brak `eslint` / `prettier` konfiguracji jeśli nie ma w repo (nie dodawaj tooling ponad wymagania)

**Wzorce do naśladowania:**
- `.claude/skills/tailwind-react-guidelines/resources/typescript-standards.md`

**Scenariusze testowe:**
- [Unit] `npm run build` — zero błędów TypeScript, zero błędów buildu
- [Unit] `npm run dev` — strona dostępna na localhost:3000

**Weryfikacja:** `npm run build` i `npm run dev` przechodzą bez błędów.

---

- [x] **Unit 2: Root layout, metadata i fonty**

**Cel:** Globalny layout z metadanymi SEO/OG (FB Ads link preview), fontami, bez nawigacji.

**Wymagania:** R1 (brak nav), R12 (zero CLS z fontami)

**Zależności:** Unit 1

**Pliki:**
- Modyfikuj: `src/app/layout.tsx`
- Stwórz: `src/lib/metadata.ts`

**Podejście:**
- Next.js `Metadata` API: `title`, `description`, `openGraph` (title, description, image, type)
- OG image: statyczny plik `public/og-image.jpg` (1200×630px) — placeholder na start
- Fonty: `next/font/google` — jeden font dla nagłówków, jeden dla body (zero layout shift)
- Brak `<header>`, `<nav>`, żadnych menu w layout
- `<main>` jako wrapper
- Viewport meta: `width=device-width, initial-scale=1`

**Scenariusze testowe:**
- [E2E] DevTools → Elements: brak `<nav>` w DOM
- [E2E] DevTools → Network → sprawdź `<meta property="og:title">` i `<meta property="og:image">` w source

**Weryfikacja:** OG tags obecne w `<head>`, brak `<nav>` w DOM.

---

- [x] **Unit 3: Sekcje hero, agitacja, transformacja**

**Cel:** Emocjonalna narracja sprzedażowa — ból → konsekwencje → rozwiązanie.

**Wymagania:** R2, R3, R4, R11

**Zależności:** Unit 2

**Pliki:**
- Stwórz: `src/components/sections/HeroSection.tsx`
- Stwórz: `src/components/sections/AgitationSection.tsx`
- Stwórz: `src/components/sections/TransformationSection.tsx`
- Modyfikuj: `src/app/page.tsx` (złóż sekcje)

**Podejście:**
- `HeroSection`: `min-h-screen` na mobile, pain headline (placeholder `TODO: ból klienta`), sub-headline, jeden `<button>` z `onClick={() => document.getElementById('formularz')?.scrollIntoView({behavior: 'smooth'})}`. Server Component (brak stanu) — scroll button = Client Component `<ScrollCTAButton>`.
- `AgitationSection`: 3 karty z ikoną SVG + tytuł bólu + opis konsekwencji (placeholder)
- `TransformationSection`: opis stanu "po", wizualna separacja (ciemne tło lub kolor akcentu)
- Layout: mobile = 1 kolumna, desktop = wariant (grid 3 col dla agitation cards)
- Placeholder copy z `{/* TODO: właściciel dostarcza treść */}` komentarzami

**Wzorce do naśladowania:**
- `.claude/skills/tailwind-react-guidelines/resources/component-patterns.md`

**Scenariusze testowe:**
- [E2E] Mobile 390px: hero w całości widoczny, CTA button widoczny bez scrollowania
- [E2E] Kliknij CTA → strona scrolluje do sekcji `#formularz`
- [Unit] `HeroSection` renderuje bez błędów TypeScript

**Weryfikacja:** CTA scroll działa na mobile i desktop. Zero błędów TS.

---

- [x] **Unit 4: Sekcje proces, portfolio i video**

**Cel:** Budowanie zaufania — przewidywalny proces, realizacje, dowód społeczny (wideo).

**Wymagania:** R5, R6, R7, R11, R12

**Zależności:** Unit 3

**Pliki:**
- Stwórz: `src/components/sections/ProcessSection.tsx`
- Stwórz: `src/components/sections/PortfolioSection.tsx`
- Stwórz: `src/components/sections/VideoSection.tsx`
- Stwórz: `src/components/ui/VideoEmbed.tsx` (Client Component)
- Stwórz: `src/lib/constants.ts`
- Stwórz: `public/portfolio/` (placeholder obrazy — 3 pliki)

**Podejście:**
- `constants.ts`: typowane tablice `PROCESS_STEPS: ProcessStep[]` i `PORTFOLIO_ITEMS: PortfolioItem[]`. Dane treściowe tu, nie w komponentach.
- `ProcessSection`: 3 kroki z numerem, ikoną, tytułem, opisem. Mobile: vertical stepper. Desktop: 3 kolumny.
- `PortfolioSection`: 3 karty. Każda: `next/image` (obiekt fit, placeholder blur), badge z branżą, jednozdaniowy efekt.
- `VideoEmbed` (Client Component): przyjmuje `src: string`. Renderuje thumbnail `next/image` z przyciskiem play overlay. `useState(false)` dla `isPlaying`. Gdy `isPlaying = true`: podmień `<img>` na `<iframe>` z autoplay param.
- Video facade zapobiega LCP penalty — iframe nie blokuje initial render.

**Wzorce do naśladowania:**
- `.claude/skills/tailwind-react-guidelines/resources/performance.md` — next/image, lazy load

**Scenariusze testowe:**
- [Unit] `VideoEmbed` — przed kliknięciem: brak `<iframe>` w DOM
- [Unit] `VideoEmbed` — po kliknięciu: `<iframe>` w DOM z `autoplay` w src
- [E2E] Portfolio grid: mobile = 1 kolumna, desktop ≥ 768px = 3 kolumny
- [E2E] Kliknij play → video się ładuje i odtwarza

**Weryfikacja:** Video facade działa. Portfolio responsywne. Zero layout shift przy image load.

---

- [ ] **Unit 5: Formularz kontaktowy + API Route**

**Cel:** Kwalifikujący formularz leadów z walidacją client+server i powiadomieniem email.

**Wymagania:** R8, R9, R11

**Zależności:** Unit 4

**Pliki:**
- Stwórz: `src/components/sections/ContactFormSection.tsx`
- Stwórz: `src/components/ui/ContactForm.tsx` (Client Component)
- Stwórz: `src/lib/schemas.ts` (Zod schema)
- Stwórz: `src/app/api/contact/route.ts`
- Stwórz: `src/app/dziekujemy/page.tsx`

**Podejście:**

*`schemas.ts`*: jeden `contactSchema` z polami `name` (string min 2), `phone` (string regex PL), `industry` (enum), `budget` (enum), `honeypot` (string optional — musi być puste).

*`ContactForm.tsx`*: React Hook Form + `zodResolver`. 4 widoczne pola + ukryty `<input name="honeypot" tabIndex={-1} aria-hidden="true">`. Submit: `fetch('/api/contact', {method: 'POST', body: JSON.stringify(data)})`. 200 → `router.push('/dziekujemy')`. Błąd → inline error message.

*`route.ts`*: 
- Parsuj body przez `contactSchema.safeParse()`
- Sprawdź honeypot = `""` → jeśli wypełniony: `return 400`
- Prosta rate limiting: `Map<string, number>` w module scope (IP → timestamp ostatniego requesta). Max 5 req/IP/godz. → `return 429`
- `resend.emails.send()` do `RESEND_TO_EMAIL` z danymi leada
- `return Response.json({ok: true})`

*`/dziekujemy`*: statyczna strona z potwierdzeniem, info "oddzwonimy w ciągu 24h", link powrotu na stronę główną.

**Wzorce do naśladowania:**
- `.claude/skills/tailwind-react-guidelines/resources/forms.md`

**Scenariusze testowe:**
- [Unit] `contactSchema` — odrzuca brakujące wymagane pola
- [Unit] `contactSchema` — odrzuca nieprawidłowy numer telefonu
- [Unit] API Route — wypełniony honeypot zwraca 400
- [Unit] API Route — rate limit zwraca 429 po 5 requestach
- [Unit] API Route — poprawny payload wywołuje `resend.emails.send()` i zwraca 200
- [E2E] Submit formularza z poprawnymi danymi → redirect na `/dziekujemy`
- [E2E] Submit z pustymi polami → walidacja inline widoczna pod każdym polem
- [E2E] Mobile 390px: formularz 100% szerokości, native select behavior

**Weryfikacja:** Email dociera do skrzynki. `/dziekujemy` się ładuje. Walidacja blokuje puste pole.

---

- [x] **Unit 6: FB Pixel + Cookie Consent**

**Cel:** GDPR-compliant tracking — Pixel fires tylko po zgodzie użytkownika.

**Wymagania:** R10

**Zależności:** Unit 5

**Pliki:**
- Stwórz: `src/components/ui/CookieConsent.tsx` (Client Component)
- Stwórz: `src/components/ui/FBPixel.tsx` (Client Component)
- Modyfikuj: `src/app/layout.tsx` (dodaj oba komponenty)
- Modyfikuj: `src/app/dziekujemy/page.tsx` (dodaj Lead event)

**Podejście:**

*`CookieConsent.tsx`*: Fixed bottom bar, inicjalnie widoczny (sprawdza `localStorage.getItem('cookie_consent')`). Dwa buttony: "Akceptuj" ustawia `'accepted'`, "Odrzuć" ustawia `'rejected'`. Po zapisie: ukryj banner. Nie blokuje scrollowania.

*`FBPixel.tsx`*: `useEffect` na mount — sprawdza `localStorage.getItem('cookie_consent')`. Jeśli `'accepted'`: dynamicznie dodaj `<script>` z kodem FB Pixel (ID z `process.env.NEXT_PUBLIC_FB_PIXEL_ID`) + `fbq('track', 'PageView')`. Jeśli inne / brak: nic.

*`dziekujemy/page.tsx`*: Client Component. `useEffect` sprawdza consent, jeśli accepted: `fbq?.('track', 'Lead')`.

*W `layout.tsx`*: `<CookieConsent />` i `<FBPixel />` jako children poza `<main>`.

> **Uwaga:** `FBPixel` inicjalizuje się raz przy mount. Jeśli użytkownik zmieni consent po załadowaniu strony, pixel nie załaduje się do odświeżenia — akceptowalne zachowanie dla v1.

**Scenariusze testowe:**
- [Unit] `FBPixel` — `localStorage.cookie_consent = 'rejected'`: brak script w DOM
- [Unit] `FBPixel` — `localStorage.cookie_consent = 'accepted'`: script z `connect.facebook.net` w DOM
- [E2E] Wejście na stronę → cookie banner widoczny na dole
- [E2E] Kliknij "Odrzuć" → banner znika, DevTools Network: brak requestów do `connect.facebook.net`
- [E2E] Kliknij "Akceptuj" → banner znika, DevTools Network: request do `connect.facebook.net` widoczny

**Weryfikacja:** Pixel nie ładuje się bez akceptacji. Pixel fires `Lead` na `/dziekujemy` po akceptacji.

---

## Wpływ systemowy

- **Brak istniejącego kodu** — zero ryzyka regresji, czyste pole.
- **Vercel serverless `/api/contact`**: in-memory rate limiting resetuje się przy cold start. Akceptowalne dla niskiego ruchu. Ścieżka upgrade: Vercel KV dla persisted rate limiting.
- **FB Pixel + GDPR**: błędna implementacja (pixel bez zgody) = ryzyko prawne. Unit 6 jest krytyczną ścieżką przed uruchomieniem kampanii FB Ads.
- **OG image** (`public/og-image.jpg`): bezpośrednio wpływa na CTR reklam FB Ads — niski nakład, wysoki wpływ.

## Ryzyka i zależności

| Ryzyko | Mitygacja |
|--------|-----------|
| Klient nie dostarcza copy przed implementacją | Placeholder `TODO:` comments, implementacja nie blokuje — content swap po dostarczeniu |
| Resend API key / FB Pixel ID brak w env | `.env.local.example` jako dokumentacja wymaganych kluczy |
| Video URL nieznany | `VideoEmbed` przyjmuje `src` z `constants.ts` — podmiana bez zmian komponentu |
| Portfolio screenshoty niedostępne | `next/image` z placeholder (`/portfolio/placeholder.jpg`) do momentu dostarczenia |
| In-memory rate limit nie działa przy rozproszonym ruchu | Świadoma decyzja v1 — upgrade do Vercel KV gdy problem wystąpi |

## Metryki sukcesu

- Conversion rate ≥ 3% z zimnego ruchu FB Ads
- LCP < 2.5s na mobile 4G (Lighthouse Mobile)
- Formularz dostarcza ≥ 1 kwalifikowany lead/tydzień przy aktywnej kampanii

## Dokumentacja / Notatki operacyjne

- Przed uruchomieniem: skonfiguruj env vars w Vercel Dashboard (`RESEND_API_KEY`, `RESEND_TO_EMAIL`, `NEXT_PUBLIC_FB_PIXEL_ID`)
- FB Ads Manager: skonfiguruj konwersję URL-based na `/dziekujemy` jako backup tracking
- Po uruchomieniu: monitoruj Resend dashboard dla bounce rate emaili powiadomień

## Źródła i referencje

- **Dokument źródłowy:** [`docs/dev-brainstorms/2026-05-21-freelance-landing-page-requirements.md`](../dev-brainstorms/2026-05-21-freelance-landing-page-requirements.md)
- Forms pattern: `.claude/skills/tailwind-react-guidelines/resources/forms.md`
- Component patterns: `.claude/skills/tailwind-react-guidelines/resources/component-patterns.md`
- Performance: `.claude/skills/tailwind-react-guidelines/resources/performance.md`
