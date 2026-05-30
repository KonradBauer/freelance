export const CTA_TEXT = "Chcę więcej klientów →";

export type ProcessStep = {
  step: number;
  title: string;
  description: string;
  timeline: string;
  deliverable: string;
};

export type PortfolioItem = {
  id: string;
  industry: string;
  result: string;
  imageSrc: string;
  imageAlt: string;
  url?: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: "Kontakt i wycena",
    description:
      "Wypełniasz formularz. Oddzwaniam w ciągu 24 godzin. Omawiam projekt i przygotowuję wycenę bez zobowiązań.",
    timeline: "do 24h",
    deliverable: "Wycena + harmonogram",
  },
  {
    step: 2,
    title: "Projekt i akceptacja",
    description:
      "Projektuję stronę dopasowaną do Twojej branży. Wprowadzam poprawki do momentu, gdy jesteś w pełni zadowolony.",
    timeline: "5–10 dni",
    deliverable: "Gotowy projekt do akceptacji",
  },
  {
    step: 3,
    title: "Uruchomienie i wsparcie",
    description:
      "Wdrażam gotową stronę na Twoją domenę. Szkolę z obsługi i jestem dostępny po uruchomieniu.",
    timeline: "1–2 dni",
    deliverable: "Działająca strona + szkolenie",
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "skowronek",
    industry: "Fotografia i wideo ślubne",
    result: "Skowronek Studio zaczęło pozyskiwać klientów przez internet. Formularz kontaktowy stał się głównym kanałem zapytań — bez cold callingu.",
    imageSrc: "/portfolio/portfolio-1.png",
    imageAlt: "Strona Skowronek Studio - fotografia i wideo ślubne",
    url: "https://skowronekstudio.pl",
  },
  {
    id: "armagedon",
    industry: "Zespół weselny",
    result: "Armagedon zastąpił ulotki stroną z audio demo i galerią. Klienci sprawdzają wolne terminy i piszą sami — bez pośredników.",
    imageSrc: "/portfolio/portfolio-2.png",
    imageAlt: "Strona Armagedon - zespół weselny",
    url: "https://armagedon.com.pl",
  },
  {
    id: "devask",
    industry: "Platforma społecznościowa",
    result: "DevAsk skupia pytania z prawdziwych rozmów rekrutacyjnych IT. Platforma zbudowana od zera — filtrowanie, głosowanie, moderacja treści.",
    imageSrc: "/portfolio/devask.png",
    imageAlt: "DevAsk - platforma pytań rekrutacyjnych IT",
    url: "https://devask-alpha.vercel.app/",
  },
  {
    id: "thecars",
    industry: "Wynajem samochodów",
    result: "TheCars wyeliminował telefoniczne rezerwacje. Interaktywny kalendarz i przepływ online skróciły czas obsługi klienta o połowę.",
    imageSrc: "/portfolio/thecars.png",
    imageAlt: "TheCars - platforma wynajmu samochodów",
    url: "https://thecars.pl/",
  },
  {
    id: "solidcars",
    industry: "Wynajem samochodów",
    result: "SolidCars dostał wewnętrzne narzędzia CRM zamiast arkuszy Excel. Śledzenie rezerwacji i raporty w jednym miejscu.",
    imageSrc: "/portfolio/solidcars.png",
    imageAlt: "SolidCars - CRM dla wypożyczalni samochodów",
    url: "https://solidcars.ae/",
  },
  {
    id: "gsport",
    industry: "E-commerce sportowy",
    result: "Gsport — pixel-perfect UI z projektów Figma zintegrowany z backendem w 3 tygodnie. Zero regresji przy wdrożeniu.",
    imageSrc: "/portfolio/gsport.png",
    imageAlt: "Gsport - sklep sportowy e-commerce",
    url: "https://gsport.pl/",
  },
  {
    id: "justhodl",
    industry: "Foundation",
    result: "JustHodl — landing page i interfejsy Web3 spójne z marką. Szybki czas ładowania mimo złożonych animacji.",
    imageSrc: "/portfolio/justhodl.png",
    imageAlt: "JustHodl - platforma Web3",
    url: "https://justhodl.digital/",
  },
  {
    id: "ausgaba",
    industry: "E-commerce",
    result: "Ausgaba przeszedł migrację Vue.js → Qwik.js. Wynik Lighthouse wzrósł o 40 punktów, czas ładowania spadł o 60%.",
    imageSrc: "/portfolio/ausgaba.png",
    imageAlt: "Ausgaba - sklep internetowy",
    url: "https://ausgaba.pl/",
  },
  {
    id: "neonpolska",
    industry: "E-commerce",
    result: "NeonPolska zbudowany od zera. Optymalizacja SEO przełożyła się na pierwsze strony Google dla kluczowych fraz produktowych.",
    imageSrc: "/portfolio/neonpolska.png",
    imageAlt: "NeonPolska - sklep ze sprzętem narciarskim",
    url: "https://neonpolska.pl/",
  },
  {
    id: "kalabi",
    industry: "Meble",
    result: "Kalabi Meble dostało nowoczesną stronę z pełną prezentacją oferty. Klienci przeglądają produkty i pytają o wycenę bezpośrednio ze strony.",
    imageSrc: "/portfolio/kalabi.png",
    imageAlt: "Kalabi Meble - sklep z meblami",
    url: "https://kalabimeble.pl",
  },
];

export const VIDEO_EMBED_SRC = "/portfolio/video.mp4";
export const VIDEO_THUMBNAIL_SRC = "/portfolio/video-thumbnail.jpg";
