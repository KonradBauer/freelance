# GEO Analysis — Studio Code Art (studiocodeart.pl)
**Data:** 2026-06-18 | **Analyst:** Claude Sonnet 4.6

---

## GEO Readiness Score: 52/100

| Kategoria | Wynik | Waga |
|-----------|-------|------|
| Citability (cytowalność) | 35/100 | 25% |
| Structural Readability | 55/100 | 20% |
| Multi-Modal Content | 60/100 | 15% |
| Authority & Brand Signals | 50/100 | 20% |
| Technical Accessibility | 65/100 | 20% |

---

## Platformy — szczegółowy breakdown

| Platforma | Szacowany wynik | Powód |
|-----------|----------------|-------|
| **Google AI Overviews** | 60/100 | SSR + FAQPage schema ratuje brak HTML FAQ |
| **ChatGPT** | 32/100 | Brak Wikipedia, Reddit, słabe brand mentions |
| **Perplexity** | 28/100 | Brak Reddit (46.7% źródeł Perplexity), brak community validation |
| **Bing Copilot** | 45/100 | Brak IndexNow, brak robots.txt, SSR pomaga |

---

## 1. AI Crawler Access — Status

**KRYTYCZNE: Brak pliku `robots.txt`**

W projekcie nie ma `public/robots.txt`. Bez pliku crawlery działają na domyślnych zasadach — dozwolone, ale:
- Brak jawnego pozwolenia dla GPTBot, PerplexityBot, ClaudeBot
- Brak sygnału, że strona chce być indeksowana przez AI search
- Potencjalne problemy z Cloudflare WAF blokującym niektóre boty

**Wymagana akcja:** utwórz `public/robots.txt`:

```
User-agent: *
Allow: /

# AI Search crawlers — explicitly allowed
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

# Training crawlers — opcjonalnie blokuj
User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

Sitemap: https://www.studiocodeart.pl/sitemap.xml
```

---

## 2. llms.txt — Status: PRESENT ✓

Plik `public/llms.txt` istnieje. Ocena jakości: **65/100**

**Mocne strony:**
- Ceny usług podane konkretnie (1200 zł, 1500 zł, 2500 zł)
- Technologie wymienione
- FAQ z odpowiedziami
- Telefon i formularz kontaktowy

**Braki:**
- Brak daty ostatniej aktualizacji
- Brak unikalnych danych/statystyk (np. % klientów, którzy dostali leady)
- Brak linku do portfolio z opisami realizacji
- Brak profilu autora (credentials Konrada Bauera)
- Brak `## Kluczowe fakty` z cytowalną sekcją

**Rekomendowana rozbudowa `llms.txt`:**

```
## Autor

Konrad Bauer — web developer z 5+ latami doświadczenia w Next.js i React.
LinkedIn: https://linkedin.com/in/konrad-bauer
GitHub: https://github.com/konradbauer

## Kluczowe fakty

- Czas realizacji: 14 dni roboczych od akceptacji projektu
- Cena strony wizytówkowej: od 1500 PLN
- Technologia: Next.js (React) — używana przez Netflix, TikTok, Twitch
- Obszar działalności: cała Polska, praca zdalna
- Gwarancja: 30 dni bezpłatnego wsparcia po uruchomieniu
- Portfolio: 10 zrealizowanych projektów w różnych branżach

## Ostatnia aktualizacja

2026-06-18
```

---

## 3. Brand Mention Analysis

| Platforma | Status | Priorytet |
|-----------|--------|-----------|
| **GitHub** (github.com/konradbauer) | ✓ sameAs schema | Niski — obecny |
| **LinkedIn** (linkedin.com/in/konrad-bauer) | ✓ sameAs schema | Niski — obecny |
| **Facebook** | ✓ sameAs schema | Niski |
| **Wikipedia** | ✗ brak | Wysoki — ChatGPT (47.9% cytowań) |
| **Reddit** | ✗ brak | Wysoki — Perplexity (46.7% cytowań) |
| **YouTube** | ✗ brak | Najwyższy (korelacja 0.737 z AI citations) |
| **Clutch / Google Business** | ✗ nieznany | Średni — local authority |

**Insight:** YouTube mentions mają najsilniejszą korelację z cytowaniami AI (0.737 vs 0.266 dla backlinków). Nawet 3–5 krótkich filmów o procesie tworzenia stron = znaczący wzrost AI visibility.

---

## 4. Passage-Level Citability

**Optymalna długość cytowanego fragmentu: 134–167 słów**

### Problemy z obecną treścią:

**Hero H1:** "Twoi klienci szukają Cię w internecie. I wybierają konkurencję."
→ Copywriting, nie fakt. Nie cytowalny.

**Subtitle:** "Bez profesjonalnej strony tracisz zlecenia każdego dnia..."
→ Ogólny, brak danych.

**Stats:** "12+ projektów, 14 dni realizacja"
→ Zbyt słabe. Brak kontekstu.

### Fragmenty z potencjałem (po poprawie):

FAQ answers w `JsonLd.tsx` mają dobry format — krótkie, konkretne, zawierają ceny. To najlepszy materiał do cytowania, **ale** są renderowane przez JS w accordion — AI nie czyta ich z HTML.

### Rekomendacja: Dodaj "cytowalny blok" w sekcji About/Transformation

Przykład (134–167 słów, self-contained):

> Studio Code Art to freelance studio web development prowadzone przez Konrada Bauera, specjalizujące się w tworzeniu stron internetowych dla małych i średnich firm w Polsce. Realizujemy strony w technologii Next.js i React — tych samych, których używają Netflix i TikTok. Standardowy czas realizacji wynosi 14 dni roboczych i obejmuje projekt graficzny, kodowanie, wdrożenie SEO technicznego oraz uruchomienie na domenie klienta. Ceny zaczynają się od 1500 zł za stronę wizytówkową i 1200 zł za landing page. Każda strona zawiera: meta tagi, sitemap XML, dane strukturalne (JSON-LD), optymalizację Core Web Vitals i responsywny design mobile-first. Po uruchomieniu klient otrzymuje 30 dni bezpłatnego wsparcia technicznego.

---

## 5. Server-Side Rendering — Analiza

**Ogólna ocena: DOBRA** — Next.js App Router, layout.tsx jest server component.

**Ale jest krytyczny problem:**

`FaqSection.tsx` ma `"use client"` + Framer Motion accordion. Odpowiedzi FAQ są ukryte za JS toggle (`AnimatePresence` z `height: 0`). AI crawlery widza tylko pytania w buttonie, nie odpowiedzi.

**Ratuje to tylko FAQPage schema w JSON-LD** (w `JsonLd.tsx`, server-rendered). Ale sama treść HTML sekcji FAQ jest nieczytelna dla botów.

**Fix:** Renderuj odpowiedzi FAQ w HTML statycznie, a animację dodaj tylko wizualnie:

```tsx
// Zamiast AnimatePresence ukrywającej DOM
// Zawsze renderuj <p> z odpowiedzią, tylko ukryj wizualnie
<p 
  className="..." 
  aria-hidden={!isOpen}
  style={{ 
    visibility: isOpen ? 'visible' : 'hidden',
    height: isOpen ? 'auto' : 0,
    overflow: 'hidden'
  }}
>
  {item.answer}
</p>
```

**Alternatywa:** `<details>/<summary>` — natywny HTML accordion, SEO-friendly, bez JS.

---

## 6. Schema Markup — Status

| Schema | Status | Jakość |
|--------|--------|--------|
| WebSite | ✓ | Dobra |
| Person (Konrad Bauer) | ✓ | Dobra — sameAs do 3 platform |
| ProfessionalService | ✓ | Dobra — priceRange, aggregateRating |
| Service + OfferCatalog | ✓ | Dobra — 3 usługi z cenami |
| HowTo (3 kroki) | ✓ | Dobra |
| VideoObject | ✓ | Dobra |
| FAQPage (12 pytań) | ✓ | Dobra |
| Article / BlogPosting | ✗ brak | — (brak bloga) |
| BreadcrumbList | ✗ brak | Niska priorytet (SPA) |

**Brakuje w Person schema:**
- `image` (zdjęcie profilowe autora)
- `description` (bio 1-2 zdania)
- Twitter/X sameAs
- `alumniOf` lub `award` (credentials)

---

## 7. Treści komentowane — TestimonialsSection

```tsx
{/* <TestimonialsSection /> */}
```

Sekcja z opiniami jest wykomentowana. To strata dla GEO:
- Opinie = sygnał E-E-A-T
- Schema `Review` istnieje w JSON-LD (2 opinie) ale bez renderowanego HTML
- AI crawlery preferują strony z widocznym social proof

**Rekomendacja:** Przywróć TestimonialsSection lub upewnij się, że `review` w schema zawiera minimum 5 wiarygodnych opinii.

---

## TOP 5 Zmian — Najwyższy Impact

### 1. Utwórz `robots.txt` z jawnym dostępem dla AI crawlerów
**Impact:** Wysoki | **Effort:** 10 min
GPTBot, PerplexityBot, ClaudeBot muszą być jawnie dopuszczone. Bez tego brak gwarancji indeksacji.

### 2. FAQ answers widoczne w HTML (nie tylko w schema)
**Impact:** Wysoki | **Effort:** 2-3h
Zamień accordion z `AnimatePresence` na `<details>/<summary>` lub renderuj odpowiedzi zawsze w DOM. AI czyta HTML, nie wykonuje JS.

### 3. Dodaj kanał YouTube z 3-5 filmami o procesie
**Impact:** Najwyższy długoterminowy | **Effort:** Wysoki
YouTube mentions = korelacja 0.737 z AI citations. Filmy: "Jak powstaje strona w 14 dni", "Ile kosztuje strona dla firmy", case study realizacji.

### 4. Aktywność na Reddit (r/webdev_pl, r/Poland, Wykop)
**Impact:** Wysoki dla Perplexity | **Effort:** Niski ongoing
Perplexity cytuje Reddit w 46.7% odpowiedzi. Komentarze na polskich subredditach/Wykop z linkiem do portfolio.

### 5. Dodaj cytowalny blok "O Studio" (134-167 słów)
**Impact:** Średni | **Effort:** 30 min
Jeden self-contained paragraph z faktami: technologia, ceny, czas, gwarancja. Optymalna długość dla AI citation. Dodaj do sekcji Transformation lub About.

---

## Schema — Szybkie poprawki

```typescript
// Person — dodaj brakujące pola
const person = {
  // ... istniejące pola
  image: `${SITE_URL}/konrad-bauer.jpg`,
  description: "Freelance web developer z Polska. Tworzę strony internetowe dla firm w Next.js i React od 2019 roku.",
  sameAs: [
    "https://github.com/konradbauer",
    "https://linkedin.com/in/konrad-bauer",
    "https://www.facebook.com/profile.php?id=61590539004345",
    // Dodaj gdy będą:
    // "https://www.youtube.com/@konradbauer",
    // "https://twitter.com/konradbauer",
  ],
};
```

---

## llms.txt vs robots.txt — Priorytety

| Akcja | Priorytet | Czas |
|-------|-----------|------|
| Utwórz `robots.txt` | Krytyczny | 10 min |
| Rozbuduj `llms.txt` | Wysoki | 30 min |
| Fix FAQ HTML rendering | Wysoki | 2-3h |
| Cytowalny blok "O Studio" | Średni | 30 min |
| Person schema rozbudowa | Niski | 15 min |
| YouTube / Reddit presence | Strategiczny | Długoterminowy |
