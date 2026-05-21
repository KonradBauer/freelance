---
title: "feat: Hero Visual Upgrade — gradient + mockup + Motion animacje"
type: feat
status: completed
date: 2026-05-21
origin: docs/dev-brainstorms/2026-05-21-hero-visual-upgrade-requirements.md
---

# feat: Hero Visual Upgrade — gradient + mockup + Motion animacje

## Przegląd

Dodaj do HeroSection radialny gradient amber, browser mockup z portfolio, i staggered entrance animations przez pakiet `motion` (dawniej Framer Motion). Zmiana czysto wizualna — treść i CTA bez zmian.

## Ujęcie problemu

Aktualne hero to czysty `bg-slate-900` bez wizualnych elementów — użytkownik z FB Ads nie widzi co kupuje i nie ma powodu zostać. Mockup strony portfolio above-the-fold pokazuje produkt i buduje credibility.

(zob. źródło: `docs/dev-brainstorms/2026-05-21-hero-visual-upgrade-requirements.md`)

## Śledzenie wymagań

- R1. Tło: radialny gradient amber (CSS inline style)
- R2. Browser mockup po prawej (desktop) / pod CTA (mobile) z `hero-mockup.jpg`
- R3. Mockup: `motion.div` fade-up entrance, ~0.5s, delay ~0.3s
- R4. Tekst: staggered `motion.div` (eyebrow → h1 → sub → CTA), `staggerChildren: 0.08`
- R5. `next/image` z `priority` na mockupie
- R6. Mobile: jednokolumnowy, mockup pod CTA
- R7. `useReducedMotion()` z `motion/react` — przy `true` animacje wyłączone (y: 0, duration: 0)

## Granice scope'u

- Nie: zmiana copy, parallax, scroll-driven animations
- Nie: animacje innych sekcji
- Nie: social proof strip (osobny feature)

## Kontekst i research

### Relevantny kod i wzorce

- `src/components/sections/PortfolioSection.tsx` — wzorzec `next/image fill` + `sizes`
- `src/components/sections/HeroSection.tsx` — plik do przepisania
- `.claude/skills/ux-ui-guidelines/resources/animations.md` — wzorce Motion: variants + staggerChildren, useReducedMotion

### Kluczowe wzorce z guidelines

```tsx
// Staggered variants pattern (z animations.md)
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = (reduce: boolean) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 24 },
  show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.5, ease: 'easeOut' } },
});

// Import (nowy pakiet)
import { motion, useReducedMotion } from 'motion/react';
```

## Kluczowe decyzje techniczne

- **Pakiet `motion` (nie `framer-motion`):** Nowy pakiet rekomendowany dla nowych projektów (2026). Import z `motion/react`.
- **`'use client'` na HeroSection:** `useReducedMotion()` to hook — wymaga Client Component. HeroSection nie fetchuje danych, więc koszt jest zerowy.
- **Gradient inline `style`:** Jednorazowy radial gradient na `<section>` — nie warto tworzyć klasy CSS dla pojedynczego użycia.
- **Variants + staggerChildren:** Czystszy niż indywidualne delays na każdym elemencie. Container `motion.div` orkiestruje dzieci.
- **`sizes` na next/image:** `(max-width: 1024px) 100vw, 50vw`

## Implementation Units

- [x] **Unit 1: Instalacja pakietu motion**

**Cel:** Dodaj `motion` do dependencies projektu.

**Wymagania:** R3, R4, R7

**Zależności:** Brak

**Pliki:**
- Modyfikuj: `package.json` (nowa dependency)

**Podejście:**
- Uruchom `npm install motion` (lub `bun add motion` jeśli projekt używa bun)
- Sprawdź `package.json` — upewnij się że `motion` jest w `dependencies`, nie `devDependencies`
- Uruchom `npx tsc --noEmit` po instalacji żeby wykluczyć konflikty typów

**Weryfikacja:**
- `motion` widoczne w `package.json` dependencies
- `npx tsc --noEmit` przechodzi bez błędów
- Import `import { motion } from 'motion/react'` nie daje błędu TS

---

- [x] **Unit 2: HeroSection redesign z Motion**

**Cel:** Przepisz HeroSection — gradient tło, 2-kolumnowy layout, browser mockup, staggered Motion animations.

**Wymagania:** R1, R2, R3, R4, R5, R6, R7

**Zależności:** Unit 1

**Pliki:**
- Modyfikuj: `src/components/sections/HeroSection.tsx`
- Asset (dostarczany przez użytkownika): `public/portfolio/hero-mockup.jpg` (~1200x750px)

**Podejście:**

*Struktura komponentu:*
- Dodaj `'use client'` na górze (wymagane przez `useReducedMotion` hook)
- Import: `import Image from 'next/image'`, `import { motion, useReducedMotion } from 'motion/react'`
- `const shouldReduceMotion = useReducedMotion()`

*Variants:*
- `containerVariants`: `hidden: {}`, `show: { transition: { staggerChildren: 0.08 } }`
- `itemVariants`: funkcja przyjmująca `shouldReduceMotion` — `hidden: { opacity: 0, y: reduce ? 0 : 24 }`, `show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.5, ease: 'easeOut' } }`
- Mockup ma osobny delay: `transition: { delay: reduce ? 0 : 0.35, duration: reduce ? 0 : 0.6, ease: 'easeOut' }`

*Layout:*
- `<section>`: `min-h-screen flex flex-col justify-center bg-slate-900` + inline `style` z radial gradient
- Wewnętrzny wrapper: `max-w-6xl mx-auto w-full px-6 py-20 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center`
- Lewa kolumna: `<motion.div variants={containerVariants} initial="hidden" animate="show" className="text-center lg:text-left">`
  - Każdy element (eyebrow span, h1, p, CTA wrapper): `<motion.div variants={itemVariants(shouldReduceMotion ?? false)}>`
- Prawa kolumna: `<motion.div initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 32 }} animate={{ opacity: 1, y: 0 }} transition={{ ... }}>`

*Browser mockup frame:*
- Outer: `rounded-xl overflow-hidden shadow-2xl border border-white/10`
- Bar: `flex items-center gap-1.5 bg-slate-800 px-4 py-2.5` + 3 `<span>` traffic lights (red-400/60, yellow-400/60, green-400/60 `w-3 h-3 rounded-full`) + URL bar `<div className="ml-2 flex-1 rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-500">twoja-strona.pl</div>`
- Image: `<div className="relative aspect-[16/10]"><Image src="/portfolio/hero-mockup.jpg" alt="Przykładowa strona portfolio" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" /></div>`

**Wzorce do naśladowania:**
- `src/components/sections/PortfolioSection.tsx` — `next/image fill` + `aspect-video` + `sizes`
- `.claude/skills/ux-ui-guidelines/resources/animations.md` — variants + staggerChildren + useReducedMotion

**Scenariusze testowe:**
- [E2E] Desktop (≥1024px): tekst po lewej, mockup po prawej w jednej linii
- [E2E] Mobile (≤768px): tekst na górze, mockup pod mikro-kopią, pełna szerokość
- [E2E] Załaduj stronę → elementy animują się staggered fade-up, mockup ostatni
- [E2E] DevTools > Rendering > emuluj `prefers-reduced-motion: reduce` → wszystko widoczne bez animacji natychmiast

**Weryfikacja:**
- `npx next build` bez błędów
- `npx tsc --noEmit` zero błędów
- Brak `any` types w nowym kodzie
- Na desktop: layout 2-kolumnowy widoczny
- `<link rel="preload">` dla hero-mockup.jpg widoczny w DevTools → Network

## Ryzyka i zależności

- **Asset `hero-mockup.jpg` nie istnieje:** `next/image` zwróci 404 ale komponent wyrenderuje się poprawnie (szary placeholder). Użytkownik dodaje plik niezależnie.
- **`motion` bundle size:** ~45KB gzip. Akceptowalne dla landing page z jednym komponentem animowanym. Sprawdź bundlephobia jeśli LCP regresuje.
- **SSR hydration:** `useReducedMotion` zwraca `null` na serwerze, `true/false` po hydration. Pattern `?? false` zapewnia bezpieczny fallback.

## Źródła i referencje

- **Dokument źródłowy:** [docs/dev-brainstorms/2026-05-21-hero-visual-upgrade-requirements.md](../dev-brainstorms/2026-05-21-hero-visual-upgrade-requirements.md)
- Wzorzec animacji: `.claude/skills/ux-ui-guidelines/resources/animations.md`
- Wzorzec next/image: `src/components/sections/PortfolioSection.tsx`
- Docs motion: `https://motion.dev/docs/react-quick-start`
