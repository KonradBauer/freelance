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
    timeline: "5–10 dni",
    deliverable: "Gotowy projekt do akceptacji",
  },
  {
    step: 3,
    title: "Launch i analityka",
    description:
      "Wdrażam stronę na Twoją domenę i konfiguruję analitykę (GA4 + Search Console) - od dnia 1 widzisz skąd trafiają klienci. Dostępny przez 30 dni po wdrożeniu.",
    timeline: "1–2 dni",
    deliverable: "Strona live + analityka",
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
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
    id: "armagedon",
    name: "Armagedon",
    industry: "Zespół weselny",
    result: "Armagedon zastąpił ulotki stroną z audio demo i galerią. Klienci sprawdzają wolne terminy i piszą sami - bez pośredników.",
    imageSrc: "/portfolio/portfolio-2.png",
    imageAlt: "Strona Armagedon - zespół weselny",
    url: "https://armagedon.com.pl",
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
  {
    id: "thecars",
    name: "TheCars",
    industry: "Wynajem samochodów",
    result: "TheCars wyeliminował telefoniczne rezerwacje. Interaktywny kalendarz i przepływ online skróciły czas obsługi klienta o połowę.",
    imageSrc: "/portfolio/thecars-1.png",
    imageAlt: "TheCars - platforma wynajmu samochodów",
    url: "https://thecars.pl/",
  },
  {
    id: "solidcars",
    name: "SolidCars",
    industry: "Wynajem samochodów",
    result: "SolidCars dostał wewnętrzne narzędzia CRM zamiast arkuszy Excel. Śledzenie rezerwacji i raporty w jednym miejscu.",
    imageSrc: "/portfolio/solidcars.png",
    imageAlt: "SolidCars - CRM dla wypożyczalni samochodów",
    url: "https://solidcars.ae/",
  },
  {
    id: "gsport",
    name: "Gsport",
    industry: "E-commerce sportowy",
    result: "Gsport wdrożył nowy sklep w 3 tygodnie - bez przestojów sprzedaży i zero błędów w dniu premiery.",
    imageSrc: "/portfolio/gsport.png",
    imageAlt: "Gsport - sklep sportowy e-commerce",
    url: "https://gsport.pl/",
  },
  {
    id: "justhodl",
    name: "JustHodl",
    industry: "Foundation",
    result: "JustHodl zbudował obecność online w Web3 ze szybko ładującym się interfejsem - niski bounce rate mimo złożonych animacji i technologii blockchain.",
    imageSrc: "/portfolio/justhodl.png",
    imageAlt: "JustHodl - platforma Web3",
    url: "https://justhodl.digital/",
  },
  {
    id: "ausgaba",
    name: "Ausgaba",
    industry: "E-commerce",
    result: "Ausgaba przyspieszyła sklep o 60% czasu ładowania - wyższe pozycje w Google i mniejszy wskaźnik porzucenia koszyka.",
    imageSrc: "/portfolio/ausgaba.png",
    imageAlt: "Ausgaba - sklep internetowy",
    url: "https://ausgaba.pl/",
  },
  {
    id: "neonpolska",
    name: "NeonPolska",
    industry: "E-commerce",
    result: "NeonPolska zbudowany od zera. Optymalizacja SEO przełożyła się na pierwsze strony Google dla kluczowych fraz produktowych.",
    imageSrc: "/portfolio/neonpolska-1.png",
    imageAlt: "NeonPolska - sklep ze sprzętem narciarskim",
    url: "https://neonpolska.pl/",
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
    id: "kalabi",
    name: "Kalabi Meble",
    industry: "Meble",
    result: "Kalabi Meble dostało nowoczesną stronę z pełną prezentacją oferty. Klienci przeglądają produkty i pytają o wycenę bezpośrednio ze strony.",
    imageSrc: "/portfolio/kalabi.png",
    imageAlt: "Kalabi Meble - sklep z meblami",
    url: "https://kalabimeble.pl",
  },
];

export const VIDEO_EMBED_SRC = "/portfolio/video.mp4";
export const VIDEO_THUMBNAIL_SRC = "/portfolio/video-thumbnail.jpg";
