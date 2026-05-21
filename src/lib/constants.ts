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

// TODO: właściciel — dostosuj opisy kroków do swojego procesu
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

// TODO: właściciel — podmień imageSrc na rzeczywiste screenshoty w public/portfolio/
// TODO: właściciel — uzupełnij result o konkretny efekt dla klienta
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "projekt-1",
    industry: "Branża slubna",
    result: "TODO: konkretny efekt, np. wzrost zapytań o 40%",
    imageSrc: "/portfolio/projekt-1.jpg",
    imageAlt: "TODO: opis zdjęcia projektu 1",
    url: "TODO: link do realizacji (opcjonalny)",
  },
  {
    id: "projekt-2",
    industry: "Branża slubna",
    result: "TODO: konkretny efekt, np. profesjonalna prezentacja oferty",
    imageSrc: "/portfolio/projekt-2.jpg",
    imageAlt: "TODO: opis zdjęcia projektu 2",
    url: "TODO: link do realizacji (opcjonalny)",
  },
  {
    id: "projekt-3",
    industry: "Branża meblarska",
    result: "TODO: konkretny efekt, np. klienci sami znajdowali katalog online",
    imageSrc: "/portfolio/projekt-3.jpg",
    imageAlt: "TODO: opis zdjęcia projektu 3",
  },
];

// TODO: właściciel — podmień na rzeczywisty URL YouTube/Vimeo embed
// Format YouTube: https://www.youtube.com/embed/VIDEO_ID
// Format Vimeo:   https://player.vimeo.com/video/VIDEO_ID
export const VIDEO_EMBED_SRC = "https://www.youtube.com/embed/TODO_VIDEO_ID";

// TODO: właściciel — dodaj miniaturę wideo do public/portfolio/video-thumbnail.jpg
export const VIDEO_THUMBNAIL_SRC = "/portfolio/video-thumbnail.jpg";
