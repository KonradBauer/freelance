// JSON-LD structured data for SEO rich results.
// All content is hardcoded server-side constants - no user input involved.
// JSON.stringify on static objects is XSS-safe.
/* eslint-disable react/no-danger */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.studiocodeart.pl";

const FAQ_ITEMS = [
  {
    question: "Ile kosztuje strona internetowa?",
    answer:
      "Cena zależy od zakresu projektu. Podstawowa strona wizytówkowa zaczyna się od 1500 zł, a rozbudowane strony ofertowe od 2500 zł. Bezpłatna wycena w ciągu 24 godzin - wystarczy wypełnić formularz.",
  },
  {
    question: "Jak długo trwa wykonanie strony internetowej?",
    answer:
      "Standardowy czas realizacji to 14 dni roboczych. To obejmuje projekt graficzny, kodowanie, treści, SEO i uruchomienie na Twojej domenie.",
  },
  {
    question: "Czy muszę mieć domenę i hosting?",
    answer:
      "Nie musisz się tym zajmować. Pomagam w zakupie domeny i wyborze hostingu lub całkowicie przejmuję ten temat. Wszystko jest omawiane podczas konsultacji.",
  },
  {
    question: "Co zawiera cena strony internetowej?",
    answer:
      "Cena obejmuje: projekt graficzny, kodowanie, teksty (jeśli potrzebujesz), podstawowe SEO (meta tagi, sitemap, robots), optymalizację szybkości, wdrożenie na domenę i 30 dni wsparcia po uruchomieniu.",
  },
  {
    question: "Czy strona będzie widoczna w Google?",
    answer:
      "Tak. Każda strona jest zoptymalizowana pod SEO: szybkie ładowanie, poprawna struktura nagłówków, meta tagi, sitemap i dane strukturalne. To fundament widoczności w wyszukiwarce.",
  },
  {
    question: "Czy mogę samodzielnie edytować treści na stronie?",
    answer:
      "Tak. Po odbiorze strony przechodzisz szkolenie z obsługi panelu. Proste zmiany (teksty, zdjęcia, dane kontaktowe) możesz wprowadzać samodzielnie.",
  },
  {
    question: "Czy wykonujesz strony dla konkretnych branż?",
    answer:
      "Tak, realizuję strony dla różnych branż: usługi lokalne, gastronomia, fotografia, budownictwo, e-commerce, startupy i wiele innych. Każda strona jest projektowana pod specyfikę branży i jej klientów.",
  },
  {
    question: "Czy strona będzie wyglądać dobrze na telefonie?",
    answer:
      "Tak, każda strona jest w pełni responsywna — wygląda i działa doskonale na telefonach, tabletach i komputerach. Ponad 60% ruchu w internecie pochodzi z urządzeń mobilnych, dlatego mobile-first to standard.",
  },
  {
    question: "Jaka technologia jest używana do budowy stron?",
    answer:
      "Używam Next.js i React — technologii stosowanej przez największe firmy na świecie. Gwarantuje to błyskawiczne ładowanie, doskonałe SEO i wysoką niezawodność strony przez lata.",
  },
  {
    question: "Jak wygląda gwarancja i wsparcie po uruchomieniu?",
    answer:
      "Po uruchomieniu otrzymujesz 30 dni bezpłatnego wsparcia — poprawki, dostosowania i odpowiedzi na pytania. Oferuję też długoterminową opiekę techniczną w ramach miesięcznego abonamentu.",
  },
  {
    question: "Czy mogę zobaczyć projekt przed zapłatą?",
    answer:
      "Tak. Przed przystąpieniem do kodowania pokazuję projekt graficzny strony. Wprowadzam poprawki do momentu pełnej akceptacji. Dopiero po Twojej zgodzie ruszamy z realizacją.",
  },
  {
    question: "Czy oferujesz pozycjonowanie SEO?",
    answer:
      "Każda strona zawiera podstawowe SEO techniczne: struktura nagłówków, meta tagi, szybkość ładowania, dane strukturalne i sitemap. Rozszerzone pozycjonowanie (content marketing, link building) to osobna usługa — zapytaj podczas konsultacji.",
  },
];

function buildSchemas() {
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Studio Code Art",
    url: SITE_URL,
    description: "Profesjonalne strony internetowe dla firm w 14 dni",
    inLanguage: "pl-PL",
    publisher: { "@id": `${SITE_URL}/#business` },
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Konrad Bauer",
    url: SITE_URL,
    jobTitle: "Web Developer Freelancer",
    worksFor: { "@id": `${SITE_URL}/#business` },
    knowsAbout: [
      "tworzenie stron internetowych",
      "Next.js",
      "React",
      "TypeScript",
      "SEO",
      "web development",
      "UI/UX design",
    ],
    sameAs: [
      "https://github.com/konradbauer",
      "https://linkedin.com/in/konrad-bauer",
    ],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: "Studio Code Art - Strony internetowe dla firm",
    description:
      "Tworzę profesjonalne strony internetowe dla firm, które generują klientów. Strona gotowa w 14 dni. Bezpłatna wycena.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/opengraph-image`,
    priceRange: "$$",
    currenciesAccepted: "PLN",
    paymentAccepted: "Przelew bankowy, gotówka",
    areaServed: { "@type": "Country", name: "Polska" },
    serviceArea: { "@type": "Country", name: "Polska" },
    availableLanguage: "pl",
    address: { "@type": "PostalAddress", addressCountry: "PL" },
    telephone: "+48781573274",
    founder: { "@id": `${SITE_URL}/#person` },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+48781573274",
      availableLanguage: "pl",
      url: `${SITE_URL}/#formularz`,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    offers: {
      "@type": "Offer",
      description: "Profesjonalna strona internetowa dla firmy",
      priceCurrency: "PLN",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: "1500",
        maxPrice: "5000",
        priceCurrency: "PLN",
      },
      availability: "https://schema.org/InStock",
    },
    sameAs: [
      "https://github.com/konradbauer",
      "https://linkedin.com/in/konrad-bauer",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "12",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Marek Wiśniewski" },
        reviewBody:
          "Strona gotowa w 12 dni. Pierwsze zapytanie od nowego klienta dostałem tydzień po uruchomieniu. Polecam każdemu kto chce zaistnieć w internecie.",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        datePublished: "2024-03-15",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Anna Kowalska" },
        reviewBody:
          "Profesjonalne podejście i zero stresu z mojej strony. Konrad zadbał o wszystko - od projektu po uruchomienie. Strona wygląda dokładnie tak jak chciałam.",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        datePublished: "2024-05-10",
      },
    ],
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/#service`,
    name: "Tworzenie stron internetowych dla firm",
    description:
      "Profesjonalne strony internetowe dla małych i średnich firm. Projekt graficzny, kodowanie, SEO i uruchomienie w 14 dni. Responsywna strona widoczna w Google.",
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: { "@type": "Country", name: "Polska" },
    serviceType: "Web Development",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Usługi tworzenia stron internetowych",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Strona wizytówkowa dla firmy",
            description:
              "Szybka strona prezentująca ofertę firmy. Projekt, kodowanie, SEO, wdrożenie.",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: "1500",
            priceCurrency: "PLN",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Rozbudowana strona ofertowa",
            description:
              "Wielostronicowa strona z formularzami, galerią, blogiem i integracjami.",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: "2500",
            priceCurrency: "PLN",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Landing page",
            description:
              "Strona skupiona na konwersji — zbieranie leadów, sprzedaż produktu lub usługi.",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: "1200",
            priceCurrency: "PLN",
          },
        },
      ],
    },
  };

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${SITE_URL}/#howto`,
    name: "Jak zamówić stronę internetową — Studio Code Art",
    description:
      "Prosty 3-krokowy proces od pierwszego kontaktu do gotowej strony internetowej dla Twojej firmy",
    totalTime: "P14D",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Kontakt i wycena",
        text: "Wypełniasz formularz. Oddzwaniam w ciągu 24 godzin. Omawiam projekt i przygotowuję wycenę bez zobowiązań.",
        url: `${SITE_URL}/#formularz`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Projekt i akceptacja",
        text: "Projektuję stronę dopasowaną do Twojej branży. Wprowadzam poprawki do momentu, gdy jesteś w pełni zadowolony.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Uruchomienie i wsparcie",
        text: "Wdrażam gotową stronę na Twoją domenę. Szkolę z obsługi i jestem dostępny po uruchomieniu.",
      },
    ],
  };

  const video = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${SITE_URL}/#video`,
    name: "Studio Code Art — Tworzenie stron internetowych dla firm",
    description:
      "Obejrzyj realizacje stron internetowych dla firm. Portfolio projektów web developerskich: strony wizytówkowe, sklepy, platformy i aplikacje webowe.",
    thumbnailUrl: `${SITE_URL}/portfolio/video-thumbnail.jpg`,
    contentUrl: `${SITE_URL}/portfolio/video.mp4`,
    uploadDate: "2024-01-01",
    inLanguage: "pl-PL",
    publisher: { "@id": `${SITE_URL}/#business` },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return { website, person, localBusiness, service, howTo, video, faq };
}

export { FAQ_ITEMS };

export default function JsonLd() {
  const schemas = buildSchemas();
  return (
    <>
      {Object.values(schemas).map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
