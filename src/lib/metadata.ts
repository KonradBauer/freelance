import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.studiocodeart.pl";

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Strony internetowe dla firm | Studio Code Art - gotowe w 14 dni",
    template: "%s | Studio Code Art",
  },
  description:
    "Profesjonalna strona internetowa dla Twojej firmy gotowa w 14 dni. Projektuję strony, które generują klientów, budują wiarygodność i są widoczne w Google. Bezpłatna wycena.",
  keywords: [
    "strony internetowe dla firm",
    "tworzenie stron internetowych",
    "strona internetowa dla firmy",
    "strona www dla firmy",
    "web developer freelancer Polska",
    "profesjonalna strona firmowa",
    "strona internetowa na zamówienie",
    "strona internetowa 14 dni",
    "tworzenie strony internetowej cena",
    "nowoczesna strona internetowa dla firmy",
    "responsywna strona internetowa",
    "strona internetowa małej firmy",
    "landing page dla firmy",
    "Next.js developer Polska",
    "React developer freelancer",
    "ile kosztuje strona internetowa",
    "strona internetowa dla małej firmy cena",
    "web developer freelancer",
    "profesjonalny web developer",
    "tanie strony internetowe dla firm",
    "strona internetowa sklep",
    "pozycjonowanie strony internetowej",
    "strona wizytówkowa dla firmy",
  ],
  authors: [{ name: "Konrad Bauer", url: SITE_URL }],
  creator: "Konrad Bauer",
  publisher: "Studio Code Art",
  category: "Web Development",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Twoi klienci szukają Cię w internecie - i wybierają konkurencję",
    description:
      "Profesjonalna strona internetowa dla Twojej firmy gotowa w 14 dni. Sprawdź realizacje i zamów bezpłatną wycenę.",
    url: SITE_URL,
    siteName: "Studio Code Art - Strony internetowe",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Strony internetowe dla firm | Studio Code Art",
    description:
      "Profesjonalna strona gotowa w 14 dni. Projektuję i wdrażam strony, które generują klientów.",
    images: ["/opengraph-image"],
    creator: "@konradbauer",
  },
  verification: {
    google: "4tCBzfc69RPH2Gbpso1NpQwNL-uXIXW5uTW281uDo0g",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
