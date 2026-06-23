---
date: 2026-06-23
topic: lead-chatbot
---

# Lead Chatbot - Kwalifikacja leadów + email sequences

## Problem

Strona zbiera kontakt przez formularz (3 kroki) i modal exit-intent, ale oba mechanizmy są ślepe - nie kwalifikują leadu, nie różnicują odpowiedzi ani nie prowadzą follow-upu. Właściciel nie wie czy lead jest wart 3000 czy 20000 zł. Chatbot jako lead magnet zbiera richer dane, automatycznie scoruje lead i uruchamia odpowiednią sekwencję mailową - bez manualnej pracy po każdym zgłoszeniu.

## Wymagania

### Trigger i koegzystencja z ExitIntentModal

- R1. Chatbot otwiera się automatycznie po spełnieniu obu warunków: (a) user jest na stronie min. 20 sekund ORAZ (b) user przewinął min. 50% strony ("AND" logika, nie "OR")
- R2. Chatbot otwiera się przy drugiej wizycie (return visitor) bez warunku scroll/time - powracający ma wyższy intent
- R3. Jeśli chatbot już był otwarty w tej sesji - nie otwiera się ponownie (sessionStorage flag: `chatbotShown`)
- R4. Jeśli ExitIntentModal już był pokazany w tej sesji (`exitModalShown`) - chatbot może się nadal pokazać po trigger (różne cele: modal = telefon, chatbot = email + kwalifikacja)
- R5. Chatbot widget widoczny jako minimalizowany przycisk na dole-prawym rogu przez cały czas (może być otwarty manualnie przez usera w każdej chwili)
- R6. Na mobile: chatbot nie otwiera się automatycznie (za małe okno), ale przycisk widoczny i klikany manualnie

### Konwersacja - 7 pytań

Ton: nieformalne per Ty, ciepłe, emoji dozwolone, podpisany jako "Konrad".

- R7. Wiadomość powitalna: "Hej! Jestem Konrad 👋 Pomagam firmom zdobywać klientów przez internet. Zanim wyślesz formularz - powiedz mi w 2 minutach czego szukasz, a dopasuje Ci od razu konkretną odpowiedź."
- R8. Pytanie 1 (opener): "Co Cię tu przyciągnęło?" | Przyciski: [Chcę nową stronę] [Mam stronę ale nie działa] [Chcę sklep online] [Tylko oglądam]
- R9. Opcja "Tylko oglądam" → skrócona ścieżka: bot oferuje bezpłatny zasób (np. "Wyślę Ci checklistę 10 rzeczy, które każda strona firmowa musi mieć - email?") zamiast pełnej kwalifikacji. Zbiera email → sekwencja Cold.
- R10. Pytanie 2 (sytuacja): "Czy masz teraz stronę?" | Przyciski: [Tak, ale słabo działa] [Nie, zaczynam od zera] [Tak, potrzebuję czegoś dodatkowego]
- R11. Pytanie 3 (typ firmy): "Jaki to biznes?" | Przyciski: [Prowadzę swój biznes] [Pracuję w firmie (10-50 osób)] [Większa organizacja]
- R12. Pytanie 4 (cel): "Co ma robić ta strona dla Ciebie?" | Przyciski: [Przyciągać nowych klientów] [Wyglądać bardziej profesjonalnie] [Sprzedawać produkty online] [Coś innego]
- R13. Pytanie 5 (budżet - framowanie): "Żeby nie tracić Twojego czasu - w jakim budżecie myślisz? Moje projekty zazwyczaj mieszczą się w jednym z tych przedziałów:" | Przyciski: [do 3 000 zł] [3 000-6 000 zł] [6 000-15 000 zł] [15 000+ zł]
- R14. Pytanie 6 (timeline): "Kiedy chciałbyś to mieć gotowe?" | Przyciski: [Jak najszybciej (w ciągu miesiąca)] [W ciągu 1-3 miesięcy] [3-6 miesięcy] [Nie wiem jeszcze]
- R15. Pytanie 7 (GDPR + email): "Super - wyślę Ci 2-3 przykłady z portfolio dopasowane do Twojego przypadku + orientacyjną wycenę. Na jaki email?" + checkbox: "Wyrażam zgodę na kontakt mailowy w celu omówienia projektu." - wymagany przed submitem
- R16. Wiadomość końcowa po submicie: spersonalizowana odpowiedź oparta na score - np. dla Hot: "Świetnie - to brzmi jak projekt w przedziale X-Y tys. zł. Wyślę Ci portfolio za chwilę. Możesz też od razu umówić rozmowę: [link Calendly]"

### Lead Scoring (50 punktów)

- R17. Scoring obliczany automatycznie po zakończeniu konwersacji (webhook → Make.com)

| Sygnał | Punkty |
|---|---|
| Budżet: 15 000+ zł | +20 |
| Budżet: 6 000-15 000 zł | +15 |
| Budżet: 3 000-6 000 zł | +8 |
| Budżet: do 3 000 zł | -15 (dyskwalifikacja) |
| Timeline: w ciągu miesiąca | +15 |
| Timeline: 1-3 miesięcy | +10 |
| Timeline: 3-6 miesięcy | +5 |
| Timeline: nie wiem | 0 |
| Firma 10-50 osób | +8 |
| Większa organizacja | +10 |
| Własny biznes | +3 |
| Brak strony (zaczyna od zera) | +7 |
| Cel: zdobywać klientów | +5 |
| Cel: sprzedaż online | +5 |
| Cel: wyglądać profesjonalnie | +2 |
| Return visitor | +3 |

- R18. Progi tierów:
  - Hot (SQL): 35+ pkt → natychmiastowy mail + Calendly link
  - Warm (MQL): 20-34 pkt → mail z portfolio + 4-mailowa sekwencja/14 dni
  - Cold (Nurture): 10-19 pkt → lead magnet + 3 maile/30 dni
  - Disqualified: <10 pkt lub budżet <3000 zł → 1 mail z uprzejmym odrzuceniem

### Email sequences

Wszystkie sekwencje wysyłane przez Resend (już w projekcie). Make.com zarządza schedulingiem.

- R19. **Hot sequence** (4 maile / 10 dni):
  - Mail 0: do 10 minut od zakończenia bota. Temat: "Re: Twój projekt [typ z bota]". Treść: 2-3 przykłady portfolio pasujące do celu/branży, orientacyjna wycena, link do Calendly. Maks 150 słów, ton osobisty.
  - Mail 1: Dzień 2 jeśli brak rezerwacji. Temat: "Jedno szybkie pytanie o [cel]". Jedno konkretne pytanie o projekt, ponowny link Calendly.
  - Mail 2: Dzień 5. Temat: "Mam wolne terminy w [miesiąc]". Konkretny wynik z podobnego projektu.
  - Mail 3: Dzień 10. Temat: "Ostatnia wiadomość ode mnie". Miękkie zamknięcie - "Jeśli to nie ten moment, spoko. Odezwij się gdy będziesz gotowy." + link do portfolio.

- R20. **Warm sequence** (4 maile / 14 dni):
  - Mail 1: 30 minut po bocie. Temat: "Portfolio dla [cel] - jak obiecałem". Link do portfolio, 1 case study pasujący do branży.
  - Mail 2: Dzień 4. Temat: "Ile naprawdę kosztuje strona [typ] w Polsce?". Edukacyjny mail z transparentnym cennikiem.
  - Mail 3: Dzień 8. Temat: "Przykład: jak [podobna firma] osiągnęła [wynik]". Jeden szczegółowy case study + CTA booking.
  - Mail 4: Dzień 14. Temat: "Mam pytanie o Twój projekt". 2 konkretne pytania o projekt - re-engagement przez personalizację.

- R21. **Cold sequence** (3 maile / 30 dni):
  - Mail 1: 1 godzina po bocie. Lead magnet jako lista w treści maila: "10 rzeczy, które każda strona firmowa musi mieć" - 10 punktów z krótkim opisem każdego. Bez sprzedaży, bez PDF, bez linków zewnętrznych.
  - Mail 2: Dzień 14. "Czy nadal myślisz o [cel z bota]?". Soft check-in, jeden nowy projekt w portfolio.
  - Mail 3: Dzień 30. Krótki update - nowy projekt, dostępność. Bez presji.

- R22. **Disqualified** (1 mail):
  - Natychmiast po bocie. Treść: "Dzięki za kontakt. Na podstawie budżetu, który podałeś, moje projekty zaczynają się od innej kwoty. Jeśli szukasz tańszych opcji, tu są alternatywy: [linki do kreatorów]. Gdyby coś się zmieniło - pisz śmiało."

### CRM / Dane

- R23. Każdy lead zapisywany do Google Sheets: imię, email, odpowiedzi z bota, score, tier, data, status (sent/opened/booked)
- R24. Jeden arkusz = wszystkie leady, posortowane po score desc
- R25. Brak zaawansowanego CRM - Google Sheets jako wystarczający dla freelancera

### GDPR

- R26. Przed pytaniem o email (pytanie 7): wyświetlony checkbox zgody na kontakt mailowy - wymagany, bot nie kontynuuje bez zaznaczenia
- R27. Timestamp zgody zapisywany w Google Sheets przy każdym leadzie
- R28. Każdy mail zawiera link do wypisu (Resend unsubscribe)
- R29. Polityka prywatności linkowana w wiadomości z checkboxem

## Kryteria sukcesu

- Bot otwiera się automatycznie po 20s + 50% scroll, max raz per sesja
- Konwersacja przechodzi przez 7 kroków bez błędów (w tym ścieżka "Tylko oglądam")
- Score obliczany i mail wysłany w ciągu 30 minut od zakończenia rozmowy
- Hot lead dostaje mail w ciągu 10 minut
- Dane leadów widoczne w Google Sheets
- Follow-upy wysyłane automatycznie zgodnie z harmonogramem per tier
- Bot NIE pojawia się na mobile automatycznie, widoczny jako klikany przycisk

## Granice scope'u

- Brak AI/LLM w bocie - konwersacja rule-based (Typebot flows)
- Brak integracji WhatsApp - email jest jedynym kanałem automatycznym
- Brak własnego CRM - Google Sheets wystarczy
- Brak A/B testów bot flows - jedno flow
- ExitIntentModal pozostaje bez zmian (różny cel: szybki telefon)
- Brak scoring'u na bazie zachowania na stronie (heatmaps, etc.) - tylko odpowiedzi z bota

## Kluczowe decyzje

- **Typebot embed**: szybka implementacja, visual editor, darmowy do 200 chat/mc, React SDK pasuje do Next.js
- **Make.com**: GUI bez kodu, free tier 1000 ops/mc (ok. 300 leadów), nie wymaga konfiguracji serwera mimo posiadanego VPS
- **Resend już w projekcie**: zero nowej infrastruktury emailowej
- **Koegzystencja z ExitIntentModal**: różne triggery, różne cele (telefon vs email/kwalifikacja), oba sensowne
- **Progi budżetu**: do 3000 zł = dyskwalifikacja (poniżej rynkowego minimum mid-range freelancera)
- **Ton nieformalne per Ty**: buduje zaufanie, spójny z polskim SMB rynkiem

## Zależności / Założenia

- Konto Typebot (darmowe, cloud) - do założenia
- Konto Make.com (darmowe) - do założenia
- Google Sheets - dostępne (Google account)
- Resend API key - już w projekcie (`RESEND_API_KEY` env)
- Calendly booking link: `https://calendly.com/konradbauer94/30min` - wstawiany bezpośrednio do sekwencji Hot i wiadomości końcowej bota
- Typebot React SDK instalowany jako zależność npm

## Otwarte pytania

### Do rozwiązania przed planowaniem
*(wszystkie pytania rozwiązane)*

### Odroczone do planowania
- [Dotyczy R1][Techniczne] Dokładna implementacja IntersectionObserver dla 50% scroll trigger w Next.js (lub scroll event)
- [Dotyczy R5][Techniczne] Czy Typebot widget ma własny launcher przycisk czy potrzebujemy custom trigger button
- [Dotyczy R17][Techniczne] Make.com: czy jeden scenario obsłuży wszystkie 4 tierzee czy potrzeba osobnych scenariuszy
- [Dotyczy R19][Wymaga researchu] Calendly embed vs link - co lepiej działa w emailu (CTR)

## Następne kroki
→ `/dev-plan` do planowania technicznego implementacji
