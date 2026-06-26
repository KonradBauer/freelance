---
date: 2026-06-26
topic: roi-copy-rewrite
---

# Przepisanie copy strony: z "projektuję strony" na ROI-first

## Problem

Strona studiocodeart.pl komunikuje się jak projektant stron (technologie, cechy, ceny 1200 zł), choć klienci z budżetem 2500–5000 zł kupują wyniki, nie usługę. Badge "Strony internetowe dla firm", blok z "Next.js jak Netflix", ceny od 1200 zł i brak pakietu jako kompleksowej usługi — to wszystko odpycha klientów gotowych zapłacić więcej, bo nie rozumieją dlaczego mają.

Dokument "Jak pozyskiwać klientów" wskazuje jasno: klient musi zobaczyć CO ZYSKA, nie co dostanie. Strona ma stać się dowodem autorytetu i ROI — nie katalogiem usług.

## Wymagania

- R1. **Badge w Hero** — zmień "Strony internetowe dla firm" na komunikat ROI-focused (np. "Strony które zarabiają na siebie" lub "Więcej klientów przez internet").

- R2. **Stats w Hero i StatsSection** — zastąp "12+ projektów / 14 dni realizacja" metrykami zorientowanymi na wynik klienta. Minimum jedno stat musi mówić co klient zyskał, nie ile trwało lub ile projektów zrobiono. Propozycja: "11 firm zaczęło pozyskiwać klientów przez internet / 100% klientów poleca Studio Code Art".

- R3. **SEO block w TransformationSection** — usuń wzmiankę o technologiach (Next.js, React, Netflix, TikTok) i cenach 1200/1500/2500 zł. Zastąp opisem kto zyskał i co zyskał (parafrazując istniejące opisy z portfolio). Dolny przedział cenowy który jest komunikowany: "projekty od 2500 zł".

- R4. **TransformationSection copy** — lista AFTER_POINTS musi mieć min. 2 punkty sformułowane jako konkretny wynik finansowy lub zapytania, nie tylko "wyglądasz profesjonalnie".

- R5. **Nowa sekcja ValuePropositionSection** — wstawiona między TransformationSection a PortfolioSection (lub po PortfolioSection, przed PricingSection). Pokazuje pakiet jako kompleksową usługę: strona + SEO techniczne + analiza konkurencji + optymalizacja konwersji + szkolenie. Nagłówek: "Dlaczego klienci płacą nam więcej niż innym" lub ekwiwalent. Cel: klient rozumie różnicę zanim zobaczy cennik.

- R6. **Portfolio opisy** — sformatuj result dla każdej realizacji jako "co klient zyskał" bardziej niż "co zrobiliśmy". Priorytet: realizacje które mają konkretny wynik (NeonPolska → "pierwsze strony Google", Pianki Widuła → "producenci z całej Polski", Armagedon → "klienci piszą sami"). Opisy bez mierzalnego wyniku (Gsport, JustHodl, DevAsk) przepisz na "klient zyskał X dzięki Y".

- R7. **PricingSection** — dla każdego pakietu zmień pierwsze zdanie opisu z feature-list na "co klient zyska". Ceny zostają bez zmian (w tym pakiet 1200 zł). Zmieniamy tylko framing: nagłówki i opisy pakietów muszą mówić o wynikach klienta, nie o technicznych składnikach.

- R8. **ProcessSection** — zmień tytuły kroków z "Kontakt i wycena / Projekt i akceptacja / Uruchomienie i wsparcie" na formuły zorientowane na klienta: co klient dostaje, nie co my robimy. Deliverables zostają jako "dowody" etapu.

## Kryteria sukcesu

- Wizytownik który trafi na stronę nie widzi ceny poniżej 2500 zł w pierwszym scrollu
- Pierwsza sekcja po Hero nie pyta "co tracisz bez strony" tylko "co zyskujesz dzięki nam" (lub utrzymuje obecne AgitationSection jako ból → rozwiązanie)
- Nowa ValuePropositionSection odpowiada na pytanie "dlaczego więcej niż u konkurencji" zanim klient dotrze do cennika
- Portfolio opisuje wyniki klienta, nie cechy techniczne pracy

## Granice scope'u

- NIE zmieniamy struktury komponentów — tylko copy i kolejność sekcji jeśli needed dla ValuePropositionSection
- NIE dodajemy screenshotów statystyk do portfolio — brak danych od klientów
- NIE zawężamy do konkretnych branż — zostajemy generalistą z ROI-focus
- NIE ukrywamy cennika całkowicie — ceny zostają, ale dolny próg podniesiony do 2500 zł
- NIE robimy pełnych case study pages — scope to landing page, nie blog/portfolio subpages

## Kluczowe decyzje

- **Target cena 2500–5000 zł komunikacyjnie:** Cennik zostaje bez zmian (w tym 1200 zł). Zmiana dotyczy tylko copy poza cennikiem — hero, stats, sekcje powyżej cennika nie wspominają o niskich kwotach.
- **Generalist, ROI-focused:** Nie zawężamy do branży. Zamiast specjalizacji branżowej → specjalizacja w "stronach które przynoszą klientów".
- **Nowa sekcja ValueProposition:** Klient MUSI zobaczyć "dlaczego więcej" przed cennikiem. To jest kluczowy gap w obecnej stronie.
- **Case study tylko tekstowe:** Brak screenshotów od klientów. Portfolio reformatowane copywritingiem, nie nowym komponentem.

## Zależności / Założenia

- PricingSection istnieje i ma widoczne ceny — zakładamy że ma pakiet poniżej 2500 zł który należy przemianować lub ukryć
- ValuePropositionSection to nowy komponent który trzeba stworzyć od zera (ok. 60-100 linii TSX)
- Zmiana treści w constants.ts dla PORTFOLIO_ITEMS i PROCESS_STEPS nie wymaga nowych komponentów

## Otwarte pytania

### Do rozwiązania przed planowaniem

*(brak — wszystkie decyzje produktowe rozstrzygnięte)*

### Odroczone do planowania

- [Dotyczy R5][Techniczne] Gdzie dokładnie ValuePropositionSection wchodzi w page.tsx — przed czy po PortfolioSection?
- [Dotyczy R5][Techniczne] Czy ValuePropositionSection korzysta z istniejących komponentów (TiltCard) czy nowy layout?
- [Dotyczy R2][Wymaga researchu] Sprawdzić czy StatsSection i Hero stats mogą mieć różne wartości — obecnie STATS są zduplikowane w obu miejscach

## Następne kroki
→ /dev-plan do planowania technicznego implementacji
