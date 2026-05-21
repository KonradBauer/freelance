---
date: 2026-05-21
topic: freelance-landing-page
---

# Freelance Landing Page — Generowanie leadów przez FB Ads

## Problem

Właściciele małych firm tracą klientów, bo nie są obecni profesjonalnie online. Freelancer (web dev + design) potrzebuje strony, która:
- Mówi językiem klienta (empatia, transformacja, nie "usługi techniczne")
- Generuje leady przez formularz kontaktowy
- Jest optymalna pod zimny ruch z Facebook Ads

## Wymagania

- **R1.** Jedna long-scroll strona bez rozpraszającej nawigacji (zero menu z linkami do podstron)
- **R2.** Hero sekcja: nagłówek oparty na bólu klienta (nie "tworzę strony" ale "twoi klienci nie mogą Cię znaleźć"), sub-nagłówek, jeden przycisk CTA scrollujący do formularza
- **R3.** Sekcja agitacji: konkretne konsekwencje braku profesjonalnej strony (traci klientów na rzecz konkurencji, brak zaufania, niewidoczność)
- **R4.** Sekcja transformacji: stan "po" — klient widzi rozwiązanie swojego problemu zanim dotrze do formularza
- **R5.** Sekcja "Jak działam": 3 kroki (kontakt → wycena → realizacja), prosty i przewidywalny proces
- **R6.** Portfolio: minimum 3 realizacje (branża weselna x2, meblarska x1) z miniaturą, nazwą branży i jednozdaniowym opisem efektu
- **R7.** Sekcja social proof: osadzony film wideo (nagranie z ofertą systemu foto-wideo)
- **R8.** Formularz kwalifikujący z 4 polami: imię, telefon, branża (select z opcjami), orientacyjny budżet (select z przedziałami)
- **R9.** Strona potwierdzenia (osobny URL `/dziekujemy`) po wysłaniu formularza — nie modal
- **R10.** Facebook Pixel: zdarzenia `PageView` na wejściu i `Lead` po submissio formularza
- **R11.** Mobile-first — cały layout projektowany od 390px (FB Ads ruch = 80%+ mobile)
- **R12.** Core Web Vitals: LCP < 2.5s (Next.js SSG, obrazy przez `next/image`, wideo lazy-load)

## Kryteria sukcesu

- Conversion rate landing page ≥ 3% z zimnego ruchu FB Ads
- Formularz generuje ≥ 1 kwalifikowany lead tygodniowo przy aktywnej kampanii
- Strona działa jako "sprzedawca 24/7" — klient rozumie ofertę i jest gotowy rozmawiać bez wcześniejszego kontaktu

## Granice scope'u

- Brak bloga, podstron branżowych, sklepu, panelu klienta
- Brak live chatu ani chatbota (prostota ponad wszystko)
- Brak wielojęzyczności
- Brak sekcji cennika na stronie — kwalifikacja budżetu wyłącznie przez pole select w formularzu
- Copywriting (treść nagłówków, opisy) poza scope'em technicznym — wymaga przygotowania przez właściciela

## Kluczowe decyzje

- **Broad positioning zamiast niszowego**: klient ma się utożsamić z bólem (brak obecności online), nie z branżą. Ryzyko: wolniejsza konwersja niż niszowe LP. Uzasadnienie: właściciel chce obsługiwać wiele branż.
- **Formularz kwalifikujący zamiast Calendly**: niższy friction dla zimnego ruchu, właściciel dzwoni sam — nie czeka na rezerwację.
- **Long-form transformation page**: buduje narrację emocjonalną zanim klient zobaczy formularz, optymalne dla zimnego ruchu FB Ads.
- **Thank you page (osobny URL)**: umożliwia śledzenie konwersji w FB Ads przez URL-based event, nie pixel JS.

## Zależności / Założenia

- Właściciel przygotowuje copy (nagłówki, opisy sekcji) przed implementacją
- Nagranie wideo jest dostępne do osadzenia (YouTube/Vimeo lub własny hosting)
- Screenshoty/linki do 3 realizacji gotowe przed startem
- Hosting: Vercel (Next.js natywnie, darmowy tier wystarczy na start)

## Otwarte pytania

### Do rozwiązania przed planowaniem

*(brak — wszystkie blokujące pytania rozwiązane)*

### Odroczone do planowania

- **[Dotyczy R8][Techniczne]** Jak obsługiwać wysyłanie formularza — Next.js API Route, zewnętrzny serwis (Resend, Formspree), czy integracja z CRM/Notion?
- **[Dotyczy R10][Wymaga researchu]** Czy FB Pixel wymaga zgody cookies (RODO)? Jeśli tak — jak minimalistycznie zaimplementować consent banner?
- **[Dotyczy R6][Techniczne]** Format portfolio: statyczne screenshoty czy animowane przejście before/after?

## Następne kroki

→ `/dev-plan` do planowania technicznego implementacji
