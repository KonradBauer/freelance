// JSON-LD structured data for SEO rich results.
// All content is hardcoded server-side constants — no user input involved.
// JSON.stringify on static objects is XSS-safe.
/* eslint-disable react/no-danger */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://studiocodeart.pl";

const FAQ_ITEMS = [
  {
    question: "Ile kosztuje strona internetowa?",
    answer:
      "Cena zależy od zakresu projektu. Podstawowa strona wizytówkowa zaczyna się od 1500 zł, a rozbudowane strony ofertowe od 2500 zł. Bezpłatna wycena w ciągu 24 godzin — wystarczy wypełnić formularz.",
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
];

function buildSchemas() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: "Studio Code Art — Strony internetowe dla małych firm",
    description:
      "Tworzę profesjonalne strony internetowe dla małych firm, które generują klientów. Strona gotowa w 14 dni. Bezpłatna wycena.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.jpg`,
    priceRange: "$$",
    areaServed: { "@type": "Country", name: "Polska" },
    availableLanguage: "pl",
    address: { "@type": "PostalAddress", addressCountry: "PL" },
    telephone: "+48781573274",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+48781573274",
      availableLanguage: "pl",
      url: `${SITE_URL}/#formularz`,
    },
    offers: {
      "@type": "Offer",
      description: "Profesjonalna strona internetowa dla małej firmy",
      priceCurrency: "PLN",
      availability: "https://schema.org/InStock",
    },
    sameAs: ["https://github.com/konradbauer", "https://linkedin.com/in/konrad-bauer"],
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
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Anna Kowalska" },
        reviewBody:
          "Profesjonalne podejście i zero stresu z mojej strony. Konrad zadbał o wszystko — od projektu po uruchomienie. Strona wygląda dokładnie tak jak chciałam.",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      },
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return { localBusiness, faq };
}

export { FAQ_ITEMS };

export default function JsonLd() {
  const { localBusiness, faq } = buildSchemas();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}
