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
    id: "projekt-1",
    industry: "Fotografia i wideo ślubne",
    result:
      "Skowronek Studio - profesjonalna strona dla fotografa i videografa ślubnego. Klienci rezerwują sesje przez formularz kontaktowy.",
    imageSrc: "/portfolio/portfolio-1.png",
    imageAlt: "Strona Skowronek Studio - fotografia i wideo ślubne",
  },
  {
    id: "projekt-2",
    industry: "Zespół muzyczny",
    result:
      "Armagedon - strona zespołu weselnego z galerią, audio demo i formularzem rezerwacji terminów.",
    imageSrc: "/portfolio/portfolio-2.png",
    imageAlt: "Strona Armagedon - zespół weselny",
  },
  {
    id: "projekt-3",
    industry: "Branża meblarska",
    result: "Realizacja w trakcie przygotowania. Wkrótce nowy projekt.",
    imageSrc: "",
    imageAlt: "",
  },
];

export const VIDEO_EMBED_SRC = "/portfolio/video.mp4";
export const VIDEO_THUMBNAIL_SRC = "/portfolio/video-thumbnail.jpg";
