---
date: 2026-06-23
topic: cro-upgrade
---

# CRO Upgrade — Multi-step formularz + Modal exit-intent + Sticky bar

## Problem

Obecny formularz kontaktowy pokazuje wszystkie pola naraz (single-step, 5 pól). Dane z Venture Harbour (B2B, n=realny test): multi-step form daje +743% CVR vs. single-step. Strona nie ma żadnego mechanizmu odzyskiwania odwiedzających opuszczających stronę. Brak sticky CTA utrudnia konwersję na długich stronach one-page. Potencjał konwersji znacząco poniżej możliwości.

## Wymagania

### Multi-step formularz (refactor ContactForm.tsx)

- R1. Formularz podzielony na 3 kroki z widocznym progress barem (1 z 3, 2 z 3, 3 z 3)
- R2. Krok 1: "Czego potrzebujesz?" — wybór projektu (radio/karty): Strona wizytówkowa / Sklep internetowy / Platforma & aplikacja / Modernizacja istniejącej strony / Nie wiem jeszcze
- R3. Krok 2: Budżet (select z obecnych BUDGETS) + Branża (select z obecnych INDUSTRIES)
- R4. Krok 3: Imię i nazwisko (text) + Numer telefonu (tel) — dane kontaktowe na końcu (najwyższe commitment = ostatni krok)
- R5. Przycisk "Wstecz" w krokach 2 i 3 — użytkownik może cofnąć bez utraty danych
- R6. Walidacja per-krok: user nie może przejść do następnego kroku bez wypełnienia pól bieżącego
- R7. Pole "Opis projektu" usunięte z formularza głównego (zbyt wysokie friction dla multi-step flow) — opcjonalnie przeniesione do kroku 1 lub usunięte całkowicie
- R8. Po submit: redirect do /dziekujemy (bez zmian)
- R9. Schemat Zod (schemas.ts) zaktualizowany o nowe pole `projectType` (enum z 5 opcji z R2) jako wymagane; `projectDescription` staje się opcjonalne lub usunięte
- R10. API /api/contact przyjmuje nowe pole `projectType`; walidacja server-side zaktualizowana

### Modal exit-intent

- R11. Modal pojawia się gdy użytkownik ruszy kursorem w kierunku górnej krawędzi przeglądarki (exit-intent: `mouseleave` na `document` z `clientY < 5`)
- R12. Modal działa TYLKO na desktopie (breakpoint: `window.innerWidth >= 768px`) — zero ryzyka Google penalty
- R13. Modal pokazywany maksymalnie raz per sesja (sessionStorage flag: `exitModalShown`)
- R14. Modal NIE pokazuje się jeśli użytkownik już wysłał formularz w tej sesji (sessionStorage flag: `formSubmitted`)
- R15. Modal zawiera: nagłówek "Poczekaj — masz projekt?", podtytuł "Zostaw numer, oddzwonię bezpłatnie w 24h", dwa pola: Imię + Telefon, przycisk "Oddzwoń do mnie →", link "Nie, dziękuję" (zamknięcie)
- R16. Modal wysyła do tego samego `/api/contact` z domyślnymi wartościami dla brakujących pól (projectType: "Nie wiem jeszcze", industry: "Inna", budget: z listy BUDGETS)
- R17. Po sukcesie: redirect do /dziekujemy (bez zmian — ten sam FB Pixel Lead event)
- R18. Klawiatura: ESC zamyka modal; focus trap wewnątrz modala
- R19. Animacja: płynne wejście (fade + scale), tło z backdrop-blur + overlay

### Sticky bar

- R20. Stały pasek na dole viewport (fixed bottom-0), zawsze widoczny na wszystkich breakpointach
- R21. Treść: "Chcesz stronę, która sprzedaje?" + przycisk "Bezpłatna wycena →" (anchor link do sekcji formularza `#kontakt`)
- R22. Sticky bar znika (display:none lub unmount) gdy sekcja z formularzem jest widoczna w viewport (IntersectionObserver) — unika duplikacji CTA gdy user jest przy formularzu
- R23. Sticky bar nie zakrywa stopki / ważnych elementów — dodaje padding-bottom do body równy wysokości paska

### Gwarancja satysfakcji (content change)

- R24. W sekcji procesu lub kontaktu (blisko formularza) dodać zdanie: "Pracuję do momentu, gdy jesteś w pełni zadowolony — bez dodatkowych kosztów." (data: +26% CVR przy gwarancjach satysfakcji)

## Kryteria sukcesu

- Multi-step form dostępny na stronie produkcyjnej ze wszystkimi 3 krokami + progress bar
- Modal exit-intent nie pojawia się na mobile, pojawia się max 1 raz per sesja na desktop
- Sticky bar nie zasłania formularza gdy jest w viewport
- Wszystkie formularze (główny + modal) działają z istniejącym rate limitingiem i redirectem do /dziekujemy
- Honeypot pole obecne w obu formularzach
- GDPR: modal zawiera tekst zgody pod przyciskiem ("Wyrażam zgodę na kontakt telefoniczny")

## Granice scope'u

- Brak live chat widget — osobna decyzja na przyszłość
- Brak lead magnet (checklista PDF) — nie ma zasobu do ofertowania
- Brak A/B testingu infrastruktury — implementujemy i obserwujemy manualnie przez Analytics
- Testimoniale z nazwiskami/zdjęciami — content change, nie kod; nie blokuje planowania
- Sticky bar ukrywany przy formularzu — nie przy każdym innym CTA na stronie

## Kluczowe decyzje

- **Multi-step zamiast single-step**: +743% CVR (Venture Harbour), najwyższy ROI z całego datasetu CRO
- **Exit-intent zamiast time-delay modal**: mniej inwazyjny, wyłapuje real intent opuszczenia, unika Google penalty
- **Desktop only dla modala**: exit-intent nie działa na touch, zero Google mobile SEO risk
- **Tylko 2 pola w modalu**: max friction reduction — name + phone wystarczy do oddzwonienia; eliminuje przeszkody
- **Sticky bar znika przy formularzu**: unika redundantnego CTA i denerwującego nakładania się

## Zależności / Założenia

- Istniejący schemat Zod musi być rozszerzony o `projectType` (enum) — breaking change w API; modal musi wypełniać brakujące pola defaultami
- API rate limit (5 req/hr/IP) pozostaje bez zmian — dotyczy obu formularzy
- sessionStorage dostępny (99.9% przeglądarek)
- `mouseleave` exit-intent: może nie zadziałać w iframe; na stronie produkcyjnej OK
- Pole `projectDescription` w schema — czy usunąć całkowicie czy zachować jako opcjonalne: odroczyć do planowania

## Otwarte pytania

### Do rozwiązania przed planowaniem
*(brak — wszystkie decyzje produktowe rozstrzygnięte)*

### Odroczone do planowania
- [Dotyczy R7][Techniczne] Czy `projectDescription` usunąć ze schematu całkowicie czy zostawić jako opcjonalne (backward-compat z istniejącymi leadami)?
- [Dotyczy R16][Techniczne] Które defaulty dla brakujących pól w modalu? `budget` musi być z `BUDGETS` enum — jaką wartość wybrać jako "nieznany"?
- [Dotyczy R22][Techniczne] IntersectionObserver threshold dla sticky bar — 0% (pierwsze piksele formularza) czy 50% (formularz w połowie widoczny)?

## Następne kroki

→ `/dev-plan` do planowania technicznego implementacji
