export const CTA_TEXT = "Chcę więcej klientów →";

export type ProcessStep = {
  step: number;
  title: string;
  description: string;
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
  },
  {
    step: 2,
    title: "Projekt i akceptacja",
    description:
      "Projektuję stronę dopasowaną do Twojej branży. Wprowadzam poprawki do momentu, gdy jesteś w pełni zadowolony.",
  },
  {
    step: 3,
    title: "Uruchomienie i wsparcie",
    description:
      "Wdrażam gotową stronę na Twoją domenę. Szkolę z obsługi i jestem dostępny po uruchomieniu.",
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "skowronek",
    industry: "Fotografia i wideo ślubne",
    result: "Skowronek Studio – profesjonalna strona dla fotografa i videografa ślubnego. Klienci rezerwują sesje przez formularz kontaktowy.",
    imageSrc: "/portfolio/portfolio-1.png",
    imageAlt: "Strona Skowronek Studio - fotografia i wideo ślubne",
    url: "https://skowronekstudio.pl",
  },
  {
    id: "armagedon",
    industry: "Zespół weselny",
    result: "Armagedon – strona zespołu weselnego z galerią, audio demo i formularzem rezerwacji terminów.",
    imageSrc: "/portfolio/portfolio-2.png",
    imageAlt: "Strona Armagedon - zespół weselny",
    url: "https://armagedon.com.pl",
  },
  {
    id: "devask",
    industry: "Platforma społecznościowa",
    result: "DevAsk – platforma z pytaniami z prawdziwych rozmów rekrutacyjnych IT. Filtrowanie po technologii, głosowanie, moderacja.",
    imageSrc: "/portfolio/devask.png",
    imageAlt: "DevAsk - platforma pytań rekrutacyjnych IT",
    url: "https://devask-alpha.vercel.app/",
  },
  {
    id: "thecars",
    industry: "Wynajem samochodów",
    result: "TheCars – system rezerwacji i zarządzania flotą. Interaktywny kalendarz dostępności, przepływ rezerwacji w czasie rzeczywistym.",
    imageSrc: "/portfolio/thecars.png",
    imageAlt: "TheCars - platforma wynajmu samochodów",
    url: "https://thecars.pl/",
  },
  {
    id: "solidcars",
    industry: "Wynajem samochodów / CRM",
    result: "SolidCars – wewnętrzne narzędzia CRM dla wypożyczalni: śledzenie rezerwacji, dashboardy raportowe, zarządzanie treścią.",
    imageSrc: "/portfolio/solidcars.png",
    imageAlt: "SolidCars - CRM dla wypożyczalni samochodów",
    url: "https://solidcars.ae/",
  },
  {
    id: "gsport",
    industry: "E-commerce sportowy",
    result: "Gsport – kompletna warstwa UI e-commerce na podstawie projektów Figma. Responsywne komponenty, integracja backendu.",
    imageSrc: "/portfolio/gsport.png",
    imageAlt: "Gsport - sklep sportowy e-commerce",
    url: "https://gsport.pl/",
  },
  {
    id: "justhodl",
    industry: "Web3 / Fintech",
    result: "JustHodl – platforma Web3. Strony lądowania, sekcje funkcji, interfejsy użytkownika. Spójność marki i wydajność.",
    imageSrc: "/portfolio/justhodl.png",
    imageAlt: "JustHodl - platforma Web3",
    url: "https://justhodl.digital/",
  },
  {
    id: "ausgaba",
    industry: "E-commerce",
    result: "Ausgaba – sklep internetowy zbudowany od zera. Migracja z Vue.js do Qwik.js – poprawa wydajności i nowoczesny stack.",
    imageSrc: "/portfolio/ausgaba.png",
    imageAlt: "Ausgaba - sklep internetowy",
    url: "https://ausgaba.pl/",
  },
  {
    id: "neonpolska",
    industry: "E-commerce / Neony LED",
    result: "NeonPolska – sklep e-commerce zbudowany od zera. Pixel-perfect UI, optymalizacja SEO, wysokie pozycje w wyszukiwarkach.",
    imageSrc: "/portfolio/neonpolska.png",
    imageAlt: "NeonPolska - sklep z neonami LED",
    url: "https://neonpolska.pl/",
  },
];

export const VIDEO_EMBED_SRC = "/portfolio/video.mp4";
export const VIDEO_THUMBNAIL_SRC = "/portfolio/video-thumbnail.jpg";
