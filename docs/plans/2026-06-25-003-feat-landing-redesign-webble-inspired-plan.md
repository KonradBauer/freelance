---
title: "feat: Redesign Landing Page — webble-inspired layout + Pakiety + Google Reviews + Lead Magnet"
type: feat
status: active
date: 2026-06-25
origin: docs/dev-brainstorms/2026-06-25-landing-redesign-requirements.md
---

# feat: Redesign Landing Page — webble-inspired layout + Pakiety + Google Reviews + Lead Magnet

## Przegląd

Kompleksowy redesign landingu studiocodeart.pl: nowa kolejność sekcji wzorowana na webble.com.pl, portfolio slider z nawigacją prev/next, sekcja pakietów cenowych, sekcja Google Reviews zasilana Places API (New), sekcja lead magnetu (Calendly), aktualizacja CTA w Hero. Wszystko w istniejącym stosie (Next.js, Tailwind, framer-motion) — zero nowych npm packages.

## Ujęcie problemu

Landing nie prowadzi użytkownika przez lejek: brak cen → użytkownik nie wie czy go stać; portfolio bez nazw projektów → brak poczucia realizmu; brak proof (Google reviews) → niska wiarygodność; brak wyraźnego next step → niski CTR na konsultację. (zob. źródło: `docs/dev-brainstorms/2026-06-25-landing-redesign-requirements.md`)

## Śledzenie wymagań

- R1. Nowa kolejność sekcji: Hero → Pain points → Value prop → Process → Portfolio (slider) → Pakiety → Google Reviews → Lead Magnet → FAQ → Contact
- R2. Portfolio slider z prev/next, widoczna nazwa klienta na każdej karcie
- R3. Sekcja PricingSection — 3 karty (Basic od 1 500 zł, Premium od 3 000 zł highlighted, Custom wycena)
- R4. Google Reviews sekcja + server route z Places API (New), cache 1h
- R5. LeadMagnetSection — Calendly CTA, opis co dostaniesz
- R6. Hero primary CTA → Calendly link (`NEXT_PUBLIC_CALENDLY_URL`)
- R7. Spójność wizualna z istniejącym design systemem

## Granice scope'u

- Brak nowych npm packages
- Brak osobnej strony /oferta
- Calendly tylko jako href link (nie embed/widget SDK)
- Teksty adaptowane z istniejącego content, nie pisane od nowa
- TestimonialsSection pozostaje zakomentowana
- Nie budujemy panelu admina do zarządzania reviews
- StatsSection i VideoSection usuwane z głównego flow (stats już są w Hero, video nie jest w nowej strukturze)
- PortfolioCTASection usuwana (zastąpiona przez PricingSection)

## Kontekst i research

### Relevantny kod i wzorce

- `src/components/sections/ProcessSection.tsx` — wzorzec section: `divider-gold`, `section-label`, `h2 font-heading font-bold text-white`, 3-col grid z TiltCard → naśladować dla PricingSection
- `src/components/sections/AgitationSection.tsx` — wzorzec glass card z TiltCard
- `src/components/ui/TiltCard.tsx` — 3D hover, `depth` prop, używać dla kart cenowych
- `src/components/sections/HeroSection.tsx` — stagger + fade framer-motion variants, `useReducedMotion()` — naśladować dla nowych sekcji
- `src/app/api/contact/route.ts` — wzorzec API route: env var sprawdzenie, try/catch, JSON response
- `src/lib/constants.ts` — `PortfolioItem` type (brak `name` — trzeba dodać), `PORTFOLIO_ITEMS` (11 items)
- `src/components/ui/StickyHeader.tsx` — CTA `#formularz` → zmienić na Calendly link
- CSS classes: `.glass-card`, `.section-label`, `.btn-gold`, `.divider-gold`, `.gold-text`, `.dark-input`
- Kolory: bg `#060A14`, gold `#C9A84C`, glass `rgba(255,255,255,0.028)`, border `rgba(201,168,76,0.14)`

### Wiedza instytucjonalna

- Brak relevantnych docs/solutions/ dla tego zadania

### Referencje zewnętrzne

- Google Places API (New): `GET https://places.googleapis.com/v1/places/{placeId}`
  - Header: `X-Goog-Api-Key: KEY`, `X-Goog-FieldMask: reviews,rating,displayName`
  - Review fields: `authorAttribution.displayName`, `authorAttribution.photoUri`, `rating`, `text.text`, `relativePublishTimeDescription`, `publishTime`
  - SKU "Place Details Enterprise + Atmosphere" — pokryte przez $200/mies. free credit
  - ToS: **wymagane widoczne logo Google** przy wyświetlaniu reviews — [Policies](https://developers.google.com/maps/documentation/places/web-service/policies)
- [Place Details (New) docs](https://developers.google.com/maps/documentation/places/web-service/place-details)

## Kluczowe decyzje techniczne

- **Portfolio slider: wszystkie 11 projektów**: Slider z nawigacją pozwala scrollować — wyświetlamy pełne portfolio, nie skrót.
- **Premium card highlighted (środkowa)**: Standard "most popular" pattern, najwyższa wartość dla freelancera.
- **Google Reviews: server route GET `/api/reviews`**: Client component wywołuje endpoint, nie Places API bezpośrednio — klucz API pozostaje po stronie serwera. `next: { revalidate: 3600 }` na fetch wewnątrz route handler.
- **Portfolio slider: 1 karta mobile, 3 karty desktop**: Identyczne z webble. `useState(activeIndex)` + klawiaturowalny prev/next. Nie framer-motion dla nawigacji (zbędna złożoność) — `transition-transform` CSS.
- **StatsSection + VideoSection + PortfolioCTASection**: Usunąć z `page.tsx`. Stats w Hero zostają. Video nie jest w nowej strukturze. PortfolioCTA zastąpiona przez Pricing.
- **`name` field w PortfolioItem**: Dodać do type + wszystkich 11 wpisów. `imageAlt` ma nazwy ale w niestrukturalnym formacie — lepiej explicite pole.
- **LeadMagnet między Pricing a Google Reviews**: Logika lejka: widzisz cenę → chcesz konsultację → widzisz opinie jako dowód społeczny.

## Otwarte pytania

### Rozwiązane podczas planowania

- *Ile projektów w suwaku?* → Wszystkie 11 (slider + nawigacja)
- *Premium highlighted czy Basic?* → Premium środkowy i highlighted
- *Google Places API format?* → GET z FieldMask header, response: `reviews[]` array
- *Kolejność Lead Magnet vs Reviews?* → Pricing → Lead Magnet → Reviews → FAQ

### Odroczone do implementacji

- *Czy `next: { revalidate: 3600 }` działa dla Route Handlers w Next.js App Router?* — Tak dla `fetch()` wewnątrz route handler. Alternatywnie: `unstable_cache` z `next/cache`. Implementator sprawdzi który pattern lepiej pasuje do wersji Next.js w projekcie.
- *Graceful fallback gdy API Reviews zwróci błąd / brak reviews?* — Sekcja powinna się ukrywać lub pokazywać placeholder. Implementator decyduje podczas kodowania.
- *Animacja kart pricing przy scroll (IntersectionObserver / framer-motion)?* — Opcjonalne, implementator oceni czy pasuje do istniejącego rytmu animacji.

---

## Implementation Units

- [x] **Unit 1: Dodaj `name` do PortfolioItem + uzupełnij wszystkie wpisy**

**Cel:** Każdy projekt portfolio ma czytelną nazwę klienta/projektu widoczną na karcie.

**Wymagania:** R2

**Zależności:** Brak

**Pliki:**
- Modyfikuj: `src/lib/constants.ts`

**Podejście:**
- Dodaj `name: string` do typu `PortfolioItem`
- Uzupełnij pole `name` dla wszystkich 11 wpisów (nazwy klientów):
  - skowronek → `"Skowronek Studio"`
  - armagedon → `"Armagedon"`
  - devask → `"DevAsk"`
  - thecars → `"TheCars"`
  - solidcars → `"SolidCars"`
  - gsport → `"Gsport"`
  - justhodl → `"JustHodl"`
  - ausgaba → `"Ausgaba"`
  - neonpolska → `"NeonPolska"`
  - pianki-widula → `"Pianki Widuła"`
  - kalabi → `"Kalabi Meble"`

**Wzorce do naśladowania:** Istniejący `PortfolioItem` type w `constants.ts`

**Scenariusze testowe:**
- [Unit] Każdy z 11 wpisów ma niepuste pole `name`
- [Unit] TypeScript nie zgłasza błędu na brakujące pole

**Weryfikacja:** `tsc --noEmit` bez błędów; wszystkie 11 items mają `name`

---

- [x] **Unit 2: PortfolioSection → slider z prev/next nawigacją**

**Cel:** Zastąpić auto-scroll carousel manualnym sliderem. Desktop: 3 karty jednocześnie. Mobile: 1 karta. Widoczna nazwa klienta.

**Wymagania:** R2, R7

**Zależności:** Unit 1 (pole `name`)

**Pliki:**
- Modyfikuj: `src/components/sections/PortfolioSection.tsx`

**Podejście:**
- Usuń duplikację `[...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS]` i logikę `paused`
- Usuń CSS keyframe `carousel-scroll` (z globals.css jeśli używany tylko tutaj)
- `useState(currentIndex: number)` — index pierwszej widocznej karty
- Prev/Next: `currentIndex = (currentIndex - step + total) % total` gdzie step = 3 (desktop) lub 1 (mobile)
- Układ: `overflow-hidden` wrapper + `translateX(-currentIndex * cardWidth)` na inner flex
- Karty: `w-full sm:w-1/3 flex-shrink-0` lub obliczane przez CSS `calc(100% / 3)`
- Na karcie: u góry screenshot (`aspect-video`, `object-top`), pod nim `name` (białe, `font-semibold`), poniżej industry tag (gold badge), result tekst, "Zobacz projekt →"
- Przyciski prev/next: okrągłe, `aria-label`, wyłączone gdy `< 3` projekty (edge case)
- Zachować obecny styl kart: `glass`, gold border, hover `translateY(-4px)`
- Zachować `section-label`, `divider-gold`, heading

**Wzorce do naśladowania:**
- Istniejący styl kart w `PortfolioSection.tsx` (glass, border, hover)
- `ProcessSection.tsx` — grid 3-col desktop

**Scenariusze testowe:**
- [Unit] `currentIndex` zmienia się po kliknięciu prev/next
- [Unit] Wrap-around działa (ostatnia karta → pierwsza)
- [E2E] Otwórz `/`, scroll do `#portfolio`, zrób screenshot — widać 3 karty z tytułem projektu; kliknij "next", sprawdź że karty się zmieniły

**Weryfikacja:** Portfolio section wyświetla 3 karty z widoczną nazwą projektu i prev/next buttons działającymi

---

- [x] **Unit 3: PricingSection — 3 karty pakietów**

**Cel:** Nowa sekcja z cennikiem. Użytkownik widzi pakiety i ceny bez klikania gdziekolwiek.

**Wymagania:** R3, R7

**Zależności:** Brak (niezależny komponent)

**Pliki:**
- Stwórz: `src/components/sections/PricingSection.tsx`

**Podejście:**
- Stała `PRICING_PACKAGES` (inline w komponencie, nie w constants.ts — YAGNI):
  ```
  Basic | od 1 500 zł | 1-stronnicowy landing, custom design, responsywny, formularz kontaktowy, SEO meta/sitemap/OG, 14 dni, 2 rundy poprawek
  Premium | od 3 000 zł | Do 5 podstron + GA4 + Search Console + Meta Pixel + animacje + blog(opt) + 30 dni opieki + 3 rundy | highlighted
  Custom | wycena | Sklepy, CRM, aplikacje, platformy — zakres po konsultacji
  ```
- Layout: 3 karty w gridzie. Desktop: `grid-cols-3`. Mobile: `grid-cols-1` (stack).
- Premium card: większy shadow (`shadow-xl`), złoty border (`rgba(201,168,76,0.5)`), badge "Najpopularniejszy" u góry
- Basic i Custom: standard glass card (`rgba(255,255,255,0.028)`, border `rgba(201,168,76,0.14)`)
- Każda karta: nazwa, cena (duży font-heading gold), checklist bullet points, CTA button
- CTA Basic + Premium: `btn-gold`, link do `#formularz`
- CTA Custom: ghost button (gold border), link do Calendly (`NEXT_PUBLIC_CALENDLY_URL || '#formularz'`)
- Section header: `section-label`, `divider-gold`, `h2 font-heading font-bold text-white`
- Tło: `#060A14`
- Opcjonalnie: TiltCard wrapping każdej karty (jak ProcessSection)

**Wzorce do naśladowania:**
- `ProcessSection.tsx` — 3-col grid, glass cards, TiltCard
- Istniejące klasy: `.section-label`, `.divider-gold`, `.btn-gold`, `.glass`

**Scenariusze testowe:**
- [Unit] Komponent renderuje 3 karty
- [Unit] Premium karta ma badge "Najpopularniejszy"
- [E2E] Scroll do sekcji Pakiety, screenshot — widać 3 karty z cenami. Kliknij CTA Basic → strona scrolluje do #formularz

**Weryfikacja:** Sekcja renderuje poprawnie, ceny widoczne, CTA działa

---

- [x] **Unit 4: Google Reviews — server route `/api/reviews`**

**Cel:** Pobierz realne opinie z Google Places API (New). Cache 1h. Klucz API pozostaje server-side.

**Wymagania:** R4

**Zależności:** Brak (można testować niezależnie przez curl)

**Pliki:**
- Stwórz: `src/app/api/reviews/route.ts`
- Modyfikuj: `.env.local.example` (dodaj `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID`)

**Podejście:**
- GET handler (nie POST — tylko odczyt)
- Sprawdź env vars na starcie: `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID` — jeśli brak: zwróć `{ reviews: [] }` (nie crash)
- `fetch()` do Places API (New):
  ```
  GET https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}
  Headers:
    X-Goog-Api-Key: ${GOOGLE_PLACES_API_KEY}
    X-Goog-FieldMask: reviews,rating,displayName
  ```
  z `next: { revalidate: 3600 }` na opcjach fetch (ISR-style cache w Next.js)
- Zmapuj response na uproszczony typ:
  ```ts
  type Review = {
    author: string
    photoUri: string | null
    rating: number
    text: string
    relativeTime: string
  }
  ```
- Zwróć `{ reviews: Review[], placeRating?: number }` jako JSON
- Error handling: try/catch → log + zwróć `{ reviews: [] }`
- Nie ujawniaj surowej odpowiedzi Places API — tylko zmapowane pola

**Wzorce do naśladowania:**
- `src/app/api/contact/route.ts` — env var check, try/catch, JSON response pattern

**Scenariusze testowe:**
- [Unit] Gdy env vars brak → zwraca `{ reviews: [] }` z 200
- [Unit] Gdy Places API zwraca błąd → zwraca `{ reviews: [] }` z 200 (nie 500)
- [Unit] Zmapowane review zawiera tylko `author, photoUri, rating, text, relativeTime`
- Weryfikacja manualna: `curl /api/reviews` po ustawieniu env vars

**Weryfikacja:** GET `/api/reviews` zwraca JSON z tablicą reviews (lub pustą tablicą przy braku env)

---

- [x] **Unit 5: GoogleReviewsSection — sekcja z opiniami**

**Cel:** Wyświetl realne Google reviews. Widoczne logo Google (ToS). Graceful fallback gdy brak reviews.

**Wymagania:** R4, R7

**Zależności:** Unit 4 (API route)

**Pliki:**
- Stwórz: `src/components/sections/GoogleReviewsSection.tsx`

**Podejście:**
- Server Component (nie `"use client"`) — fetch `/api/reviews` na render, zero JS overhead
- Jeśli `reviews.length === 0` → nie renderuj sekcji (zwróć `null`)
- Layout: max 5 reviews w grid (desktop: 3-col, tablet: 2-col, mobile: 1-col)
- Karta review:
  - Avatar: jeśli `photoUri` → `<Image>` (next/image), else inicjały w złotym kółku
  - Imię autora (`font-semibold text-white`)
  - Gwiazdki (SVG, złote, dynamicznie wypełnione przez `rating`)
  - Tekst recenzji (`text-slate-400`, `line-clamp-4`)
  - `relativeTime` (`text-slate-500 text-sm`)
- Pod kartami: logo Google (SVG lub `<img src="/google-logo.svg">` — dodać do /public) + tekst "Opinie z Google"
- Styl kart: glass card, gold border (jak portfolio)
- Section header: `section-label "Opinie"`, `h2 "Co mówią klienci"`, `divider-gold`
- Tło: `#060A14`
- Dodać plik `/public/google-logo.svg` (oficjalne Google "G" logo dla attribution)

**Wzorce do naśladowania:**
- Istniejące glass cards z `PortfolioSection.tsx`
- Server Component pattern — bez `"use client"`, bez `useState`

**Scenariusze testowe:**
- [Unit] Gdy `reviews = []` → komponent zwraca null
- [Unit] Gdy reviews > 5 → wyświetla tylko 5 pierwszych (`reviews.slice(0, 5)`)
- [Unit] Rating 4 → 4 wypełnione gwiazdki + 1 pusta
- [E2E] Scroll do sekcji reviews — widać karty z gwiazdkami i logo Google na dole

**Weryfikacja:** Sekcja widoczna z prawdziwymi opiniami lub ukryta gdy brak danych

---

- [x] **Unit 6: LeadMagnetSection — CTA bezpłatna konsultacja**

**Cel:** Wyraźne CTA między pakietami a opiniami. Jeden klik → Calendly.

**Wymagania:** R5, R7

**Zależności:** Brak

**Pliki:**
- Stwórz: `src/components/sections/LeadMagnetSection.tsx`

**Podejście:**
- Prosta sekcja, ciemne tło z gold akcentem
- Centered layout:
  - `section-label "Bezpłatna konsultacja"`
  - `h2` — "Porozmawiajmy o Twoim projekcie" (lub podobne)
  - 3 bullet points: "Omówimy Twój projekt", "Odpowiem na wszystkie pytania", "Wycena bez zobowiązań"
  - Duży `btn-gold` → `href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? '#formularz'}` + `target="_blank" rel="noopener noreferrer"` (jeśli zewnętrzny link)
  - Pod przyciskiem: drobny tekst "Czas trwania: 30 minut · Bezpłatnie"
- Tło: ciemniejszy gradient lub radial glow (jak TransformationSection)
- ID sekcji: `id="konsultacja"`

**Wzorce do naśladowania:**
- `TransformationSection.tsx` — centered layout, radial glow background, gold bullet icons

**Scenariusze testowe:**
- [E2E] Scroll do `#konsultacja`, screenshot — widać sekcję z przyciskiem. Kliknij przycisk — otwiera nową kartę Calendly (lub scrolluje do #formularz jeśli env nie ustawione)

**Weryfikacja:** Sekcja renderuje, CTA klikalny

---

- [x] **Unit 7: Hero CTA update + StickyHeader update**

**Cel:** Primary CTA w Hero i StickyHeader prowadzi do Calendly zamiast bezpośrednio do formularza.

**Wymagania:** R6

**Zależności:** `NEXT_PUBLIC_CALENDLY_URL` w env

**Pliki:**
- Modyfikuj: `src/components/sections/HeroSection.tsx`
- Modyfikuj: `src/components/ui/StickyHeader.tsx`

**Podejście:**
- HeroSection: primary button `href` z `"#formularz"` → `process.env.NEXT_PUBLIC_CALENDLY_URL ?? '#formularz'`
  - Tekst: "Umów bezpłatną konsultację →" (zamiast "Chcę więcej klientów →")
  - Jeśli Calendly URL: dodać `target="_blank" rel="noopener noreferrer"`
  - Secondary button pozostaje: "Zobacz realizacje" → `#portfolio`
- StickyHeader: CTA button `href="#formularz"` → Calendly URL (fallback: `#formularz`)
  - Tekst: "Umów konsultację →"
- `NEXT_PUBLIC_CALENDLY_URL` czytany jako `process.env.NEXT_PUBLIC_CALENDLY_URL` (build-time var, dostępna w client components)

**Wzorce do naśladowania:** Istniejące `href` linki w HeroSection i StickyHeader

**Scenariusze testowe:**
- [E2E] Kliknij primary CTA w hero — otwiera nową kartę z Calendly (gdy env ustawiony)
- [E2E] Kliknij secondary CTA — scrolluje do portfolio section

**Weryfikacja:** Oba przyciski prowadzą do właściwych celów

---

- [x] **Unit 8: Section reorder + page.tsx + env vars**

**Cel:** Złożyć nową kolejność sekcji, usunąć stare, zaktualizować env.

**Wymagania:** R1

**Zależności:** Units 2, 3, 4, 5, 6, 7

**Pliki:**
- Modyfikuj: `src/app/page.tsx`
- Modyfikuj: `.env.local.example`
- Usuń (lub zakomentuj): `src/components/sections/PortfolioCTASection.tsx` (nie importować)
- Zakomentuj: `StatsSection` import i użycie (stats już w Hero floating stats)
- Zakomentuj lub usuń: `VideoSection` (nie w nowej strukturze)

**Podejście:**

Nowa kolejność w `page.tsx`:
```
StickyHeader
HeroSection           ← zachowany, CTA zaktualizowany (Unit 7)
AgitationSection      ← zachowany (Pain points)
TransformationSection ← zachowany (Value prop)
ProcessSection        ← zachowany
PortfolioSection      ← zastąpiony sliderem (Unit 2)
PricingSection        ← nowy (Unit 3)
LeadMagnetSection     ← nowy (Unit 6)
GoogleReviewsSection  ← nowy (Unit 5)
FaqSection            ← zachowany
ContactFormSection    ← zachowany
Footer
ExitIntentModal
LeadChatbot
```

Usuń importy: `StatsSection`, `VideoSection`, `PortfolioCTASection`

`.env.local.example` — dodaj:
```
GOOGLE_PLACES_API_KEY=
GOOGLE_PLACE_ID=
NEXT_PUBLIC_CALENDLY_URL=
```

**Wzorce do naśladowania:** Istniejące `src/app/page.tsx`

**Scenariusze testowe:**
- [E2E] `npm run dev` → strona ładuje się bez błędów; przewiń całą stronę, sprawdź kolejność sekcji
- [E2E] Żadna usunięta sekcja nie powoduje 500 ani broken import

**Weryfikacja:** `npm run build` przechodzi bez błędów TypeScript; strona renderuje poprawnie w kolejności R1

---

## Wpływ systemowy

- **Env vars (build-time):** `NEXT_PUBLIC_CALENDLY_URL` musi być w środowisku build — Docker: dodać jako `--build-arg` w compose (jak inne `NEXT_PUBLIC_*` zmienne)
- **Env vars (runtime):** `GOOGLE_PLACES_API_KEY` i `GOOGLE_PLACE_ID` tylko server-side — nie `NEXT_PUBLIC_`
- **Google ToS:** Logo Google MUSI być widoczne przy reviews — brak oznaczenia = naruszenie ToS
- **ISR cache:** `next: { revalidate: 3600 }` wewnątrz fetch w Route Handler — weryfikacja czy działa z App Router (może wymagać `unstable_cache` zamiast tego)
- **Usunięte sekcje:** `StatsSection`, `VideoSection`, `PortfolioCTASection` — ich pliki pozostają (nie usuwamy kodu), tylko nie są importowane w page.tsx
- **Nowe section IDs:** `#cennik` (PricingSection), `#konsultacja` (LeadMagnetSection), `#opinie` (GoogleReviewsSection) — dodać do Footer nav jeśli relevantne

## Ryzyka i zależności

- **Ryzyko: `GOOGLE_PLACE_ID` / `GOOGLE_PLACES_API_KEY` niedostarczony przed wdrożeniem** → Reviews API route zwraca `[]`, sekcja się ukrywa (graceful) — nie blokuje reszty redesignu
- **Ryzyko: `NEXT_PUBLIC_CALENDLY_URL` niedostarczony** → Fallback do `#formularz` — formularz kontaktowy jako backup
- **Ryzyko: Google ToS naruszenie** → Widoczne logo Google attachment do każdej review jest mitygacją
- **Zależność: Unit 1 przed Unit 2** — `name` field musi istnieć zanim slider je renderuje
- **Zależność: Unit 4 przed Unit 5** — route musi istnieć zanim component robi fetch
- **Zależność: Units 2-7 przed Unit 8** — page.tsx importuje gotowe komponenty

## Analiza ryzyk i mitygacja

| Ryzyko | Mitygacja |
|--------|-----------|
| Places API (New) rate limit lub billing | Cache 1h minimalizuje call count; free tier $200/mies. wystarczy |
| Reviews API zwraca `null` dla `text` | Map jako `review.text?.text ?? ''`, filtruj puste |
| Slider niedostępny na mobilnym dotyk/swipe | Dodać touch events (optional — nie w scope, ale warto odnotować dla przyszłości) |
| `next: { revalidate }` nie działa w Route Handler | Fallback: `unstable_cache` z `next/cache` lub `Response` z `Cache-Control` header |

## Źródła i referencje

- **Dokument źródłowy:** [docs/dev-brainstorms/2026-06-25-landing-redesign-requirements.md](../dev-brainstorms/2026-06-25-landing-redesign-requirements.md)
- Wzorzec section: `src/components/sections/ProcessSection.tsx`
- Wzorzec API route: `src/app/api/contact/route.ts`
- Design tokens: `src/app/globals.css`
- Google Places API (New): https://developers.google.com/maps/documentation/places/web-service/place-details
- Google Places ToS: https://developers.google.com/maps/documentation/places/web-service/policies
