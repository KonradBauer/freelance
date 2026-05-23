import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://studiocodeart.pl";

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Strony internetowe dla małych firm | Studio Code Art - gotowe w 14 dni",
    template: "%s | Studio Code Art",
  },
  description:
    "Profesjonalna strona internetowa dla Twojej firmy gotowa w 14 dni. Projektuję strony, które generują klientów, budują wiarygodność i są widoczne w Google. Bezpłatna wycena.",
  keywords: [
    "strony internetowe dla firm",
    "tworzenie stron internetowych",
    "strona internetowa dla małej firmy",
    "strona www dla firmy",
    "web developer freelancer Polska",
    "profesjonalna strona firmowa",
    "strona internetowa na zamówienie",
    "strona internetowa 14 dni",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Twoi klienci szukają Cię w internecie - i wybierają konkurencję",
    description:
      "Profesjonalna strona internetowa dla Twojej firmy gotowa w 14 dni. Sprawdź realizacje i zamów bezpłatną wycenę.",
    url: SITE_URL,
    siteName: "Studio Code Art - Strony internetowe",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Studio Code Art - Strony internetowe dla małych firm",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Strony internetowe dla małych firm | Studio Code Art",
    description:
      "Profesjonalna strona gotowa w 14 dni. Projektuję i wdrażam strony, które generują klientów.",
    images: ["/opengraph-image"],
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
