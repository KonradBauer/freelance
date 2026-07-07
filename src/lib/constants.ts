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
  name: string;
  industry: string;
  result: string;
  imageSrc: string;
  imageAlt: string;
  url?: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: "Bezpłatna rozmowa",
    description:
      "Opowiadasz mi o firmie i celach. Analizuję rynek i konkurencję w Twojej branży. Oddzwaniam w ciągu 24 godzin z wyceną i harmonogramem.",
    timeline: "do 24h",
    deliverable: "Plan + wycena",
  },
  {
    step: 2,
    title: "Projekt pod Twoich klientów",
    description:
      "Projektuję stronę zorientowaną na konwersję: układ, treści i CTA tak, żeby odwiedzający stawał się zapytaniem. Poprawki do momentu, gdy jesteś w pełni zadowolony.",
    timeline: "5-10 dni",
    deliverable: "Gotowy projekt do akceptacji",
  },
  {
    step: 3,
    title: "Launch i analityka",
    description:
      "Wdrażam stronę na Twoją domenę i konfiguruję analitykę (GA4 + Search Console) - od dnia 1 widzisz skąd trafiają klienci. Dostępny przez 30 dni po wdrożeniu.",
    timeline: "1-2 dni",
    deliverable: "Strona live + analityka",
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "kalabi",
    name: "Kalabi Meble",
    industry: "Meble",
    result: "Kalabi Meble dostało nowoczesną stronę z pełną prezentacją oferty. Klienci przeglądają produkty i pytają o wycenę bezpośrednio ze strony.",
    imageSrc: "/portfolio/kalabi.png",
    imageAlt: "Kalabi Meble - sklep z meblami",
    url: "https://kalabimeble.pl",
  },
  {
    id: "pianki-widula",
    name: "Pianki Widuła",
    industry: "Produkcja przemysłowa B2B",
    result: "Przetwórnia Pianek Widuła zastąpiła kontakt telefoniczny stroną z pełną ofertą. Producenci mebli i materaców z całej Polski wysyłają zapytania bezpośrednio ze strony.",
    imageSrc: "/portfolio/pianki-widula.png",
    imageAlt: "Pianki Widuła - przetwórnia pianek tapicerskich CNC",
    url: "https://pianki-widula.pl/",
  },
  {
    id: "armagedon",
    name: "Armagedon",
    industry: "Zespół weselny",
    result: "Armagedon zastąpił ulotki stroną z audio demo i galerią. Klienci sprawdzają wolne terminy i piszą sami - bez pośredników.",
    imageSrc: "/portfolio/portfolio-2.png",
    imageAlt: "Strona Armagedon - zespół weselny",
    url: "https://armagedon.com.pl",
  },
  {
    id: "skowronek",
    name: "Skowronek Studio",
    industry: "Fotografia i wideo ślubne",
    result: "Skowronek Studio zaczęło pozyskiwać klientów przez internet. Formularz kontaktowy stał się głównym kanałem zapytań - bez cold callingu.",
    imageSrc: "/portfolio/portfolio-1.png",
    imageAlt: "Strona Skowronek Studio - fotografia i wideo ślubne",
    url: "https://skowronekstudio.pl",
  },
  {
    id: "devask",
    name: "DevAsk",
    industry: "Platforma społecznościowa",
    result: "DevAsk zbudował społeczność programistów przygotowujących się do rekrutacji IT. Platforma zbiera pytania z prawdziwych rozmów i angażuje użytkowników od dnia premiery.",
    imageSrc: "/portfolio/devask.png",
    imageAlt: "DevAsk - platforma pytań rekrutacyjnych IT",
    url: "https://devask-alpha.vercel.app/",
  },
];

export const VIDEO_EMBED_SRC = "/portfolio/video.mp4";
export const VIDEO_THUMBNAIL_SRC = "/portfolio/video-thumbnail.jpg";

export type Review = {
  author: string;
  rating: number;
  text: string;
};

export const REVIEWS: Review[] = [
  {
    author: "Marcin Macherzyński",
    rating: 5,
    text: "Fachowo wykonana robota oraz świetny kontakt na każdym etapie tworzenia strony www. Oprócz wymaganych funkcji Pan Konrad wdrożył również kilka usprawnień które przekładają się na efekt końcowy - podejście godne polecenia, pełne zaangażowanie a nie tylko prostolinijne wykonanie fuchy wg skryptu. Zdecydowanie polecam",
  },
  {
    author: "Kamila Bauer",
    rating: 5,
    text: "Bardzo profesjonalna obsługa. Dobry kontakt, zaangażowanie i zrozumienie potrzeb klienta, a także szybka realizacja. Serdecznie polecam",
  },
  {
    author: "Kamil Kujawski",
    rating: 5,
    text: "Polecam współpracę. Strona została wykonana dokładnie tak, jak oczekiwałem - wygląda profesjonalnie, działa sprawnie i jest przejrzysta dla klientów. Kontakt przez cały czas był bardzo dobry, a wszelkie poprawki były wprowadzane szybko i bez problemów. Widać zaangażowanie i dbałość o szczegóły. Jestem zadowolony z efektu końcowego i na pewno skorzystałbym ponownie.",
  },
];
