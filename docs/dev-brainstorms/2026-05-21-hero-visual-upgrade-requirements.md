---
date: 2026-05-21
topic: hero-visual-upgrade
---

# Hero Visual Upgrade — tło, mockup, animacje

## Problem

Aktualne HeroSection to czysty `bg-slate-900` bez elementów wizualnych. Dla zimnego ruchu FB Ads użytkownik nie widzi od razu co kupuje — brak dowodu społecznego i wizji produktu above the fold obniża konwersję.

## Wymagania

- R1. Tło sekcji hero: radialny gradient amber (CSS-only, zero LCP penalty)
- R2. Po prawej (desktop) / pod CTA (mobile): ramka przeglądarki z mockupem strony portfolio (`/public/portfolio/hero-mockup.jpg`, ~1200x750px)
- R3. Mockup wlatuje od dołu przy załadowaniu strony — CSS keyframe `fade-up` (translate + opacity), czas ~0.6s, delay ~0.2s
- R4. Tekst hero (eyebrow, h1, sub, CTA) ma własne entrance animations (staggered fade-up, krócej niż mockup)
- R5. Mockup renderowany przez `next/image` z `priority` — nie może opóźniać LCP
- R6. Na mobile: layout jednokolumnowy, tekst na górze, mockup poniżej CTA (nie obok)
- R7. Animacje respektują `prefers-reduced-motion` — przy `reduce` animacje wyłączone

## Kryteria sukcesu

- LCP nie regresuje powyżej 2.5s (mockup z priority + preload)
- Hero wygląda profesjonalnie bez dodanego JS (tylko CSS + next/image)
- Mockup można podmienić przez wymianę jednego pliku `hero-mockup.jpg`

## Granice scope'u

- Nie: video background, parallax JS, biblioteki animacji (Framer Motion, GSAP)
- Nie: zmiana treści (copy) hero — tylko warstwa wizualna
- Nie: animacje innych sekcji — tylko hero
- Nie: nowe statystyki/social proof strip (może być osobny feature)

## Kluczowe decyzje

- Gradient CSS-only: `radial-gradient` od amber-400/10 przez transparent do slate-900 — nie wymaga obrazka, zero LCP
- Animacje CSS keyframes w `globals.css` lub Tailwind `animate-*` — zero JS bundle
- `hero-mockup.jpg` jako osobny plik w `/public/portfolio/` — klient wymienia bez zmian kodu

## Następne kroki

→ `/dev-plan` do planowania technicznego implementacji
