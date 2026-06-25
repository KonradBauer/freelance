---
date: 2026-06-25
topic: landing-redesign
---

# Redesign Landing Page — webble-inspired + pakiety + Google Reviews

## Problem

Obecny landing ma dobry content ale słaby układ lejka sprzedażowego. Portfolio jest carousel bez tytułów projektów. Brak pakietów cenowych. Brak Google reviews. Brak lead magnet. Użytkownicy nie wiedzą ile kosztuje usługa ani dlaczego wybrać tego freelancera zamiast innego.

## Wymagania

- R1. **Reorder sekcji** — nowa kolejność wzorowana na webble.com.pl:
  Hero → Pain points → Value prop / usługi → Process → Portfolio (slider) → Pakiety → Google Reviews → Lead magnet CTA → FAQ → Contact form

- R2. **Portfolio — slider z nawigacją** — zastąpić auto-scroll carousel slajderem z przyciskami prev/next. Każda karta: screenshot (aspect-video), nazwa klienta (widoczna), tag branżowy, opis rezultatu, przycisk "Zobacz projekt →". Pokazywać 1 projekt na pełną szerokość lub 3 obok siebie (desktop). Użyć framer-motion (już zainstalowany) lub czysty CSS/useState.

- R3. **Sekcja Pakiety cenowe** — nowy komponent `PricingSection.tsx`. 3 karty: Basic / Premium / Custom.
  - Basic (od 1 500 zł): 1-stronnicowy landing, custom design, responsywny, formularz kontaktowy, SEO meta/sitemap/OG, realizacja 14 dni, 2 rundy poprawek
  - Premium (od 3 000 zł): Do 5 podstron, wszystko z Basic + GA4 + Search Console + Meta Pixel + animacje + blog (opcja) + 3 rundy poprawek + 30 dni opieki technicznej, realizacja 21 dni
  - Custom (wycena): sklepy, CRM, aplikacje, platformy — wycena po bezpłatnej konsultacji
  - CTA każdej karty scrolluje do formularza lub otwiera Calendly

- R4. **Google Reviews — API** — nowy server route `src/app/api/reviews/route.ts` pobiera opinie przez Google Places API (New). Dane cache'owane przez `next: { revalidate: 3600 }`. Nowa sekcja `GoogleReviewsSection.tsx` wyświetla karty: avatar inicjałowy lub zdjęcie, imię, ocena gwiazdkowa, tekst, data. Wymaga: `GOOGLE_PLACES_API_KEY` (env) + `GOOGLE_PLACE_ID` (env).

- R5. **Lead magnet — Bezpłatna konsultacja 30 min** — nowa sekcja `LeadMagnetSection.tsx` między pakietami a opiniami (lub między opiniami a FAQ). Duże CTA: "Umów bezpłatną konsultację 30 min" → otwiera Calendly w nowej karcie (link konfigurowalny przez `NEXT_PUBLIC_CALENDLY_URL`). Krótki opis co dostaje: omówienie projektu, odpowiedź na pytania, wycena bez zobowiązań.

- R6. **Hero — primary CTA zmiana** — główny przycisk: "Umów bezpłatną konsultację →" → Calendly link. Drugi przycisk: "Zobacz realizacje" → #portfolio. Zachować floating stats.

- R7. **Spójność wizualna** — wszystkie nowe sekcje używają istniejącego design systemu (dark `#060A14`, gold `#C9A84C`, slate palette, `btn-gold`, `section-label`, `font-heading`).

## Kryteria sukcesu

- Użytkownik widzi pakiety i ceny bez klikania nigdzie
- Kliknięcie "Umów konsultację" otwiera Calendly (bezpośrednia konwersja)
- Sekcja Google Reviews wyświetla prawdziwe opinie z API
- Portfolio pokazuje tytuł/nazwę klienta widocznie na każdej karcie
- Strona ładuje się bez regresji wydajności (images lazy, API cached)

## Granice scope'u

- Nie dodajemy nowych npm packages (framer-motion, next/image — już są)
- Nie robimy osobnej strony /oferta — pakiety na landingu
- Nie dodajemy Calendly widget SDK — tylko link href
- Nie piszemy copy (teksty) od nowa — adaptujemy istniejący content z constants.ts
- Nie robimy systemu zarządzania reviews z panelem admina
- TestimonialsSection (zakomentowana) — zostaje zakomentowana, Google Reviews ją zastępuje

## Kluczowe decyzje

- **Google Reviews przez API, nie widget**: Żaden zewnętrzny widget. Własny route + własne komponenty — pełna kontrola nad wyglądem.
- **Calendly jako link, nie embed**: Zero nowych dependencies, zero problemów z CSP.
- **Pricing na landingu**: Nie na osobnej stronie — redukuje friction, poprawia konwersję.
- **Portfolio slider**: Webble-style prev/next zamiast auto-carousel — użytkownik kontroluje tempo.
- **Basic 1 500 zł / Premium 3 000 zł**: Competitive z rynkiem freelancerów PL 2026 (freelancerzy: 1 500–5 000 zł za landing).

## Zależności / Założenia

- User dostarcza `GOOGLE_PLACES_API_KEY` (Google Cloud Console, Places API włączone) i `GOOGLE_PLACE_ID` (znaleźć na maps.google.com)
- User dostarcza `NEXT_PUBLIC_CALENDLY_URL` (link do swojego Calendly)
- Minimum 3 prawdziwe Google reviews muszą istnieć na profilu żeby sekcja miała sens
- framer-motion, next/image — już w projekcie

## Otwarte pytania

### Do rozwiązania przed planowaniem
*(brak — wszystkie decyzje produktowe rozwiązane)*

### Odroczone do planowania
- [Dotyczy R2][Techniczne] Ile projektów w suwaku — wszystkie 11 czy wybrane 6?
- [Dotyczy R4][Wymaga researchu] Google Places API (New) endpoint i format odpowiedzi dla reviews
- [Dotyczy R3][Techniczne] Kolejność kart: Basic po lewej (highlighted) czy Premium highlighted?

## Następne kroki
→ `/dev-plan` do planowania technicznego implementacji

> **Przed wdrożeniem** user dostarcza do `.env.local`:
> - `GOOGLE_PLACES_API_KEY` (Google Cloud Console → Places API)
> - `GOOGLE_PLACE_ID` (z URL profilu na maps.google.com)
> - `NEXT_PUBLIC_CALENDLY_URL` (calendly.com/twoj-link)
