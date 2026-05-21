import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://studiocodeart.pl";

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Strony internetowe dla małych firm | Konrad Bauer",
    template: "%s | Konrad Bauer",
  },
  description:
    "Tworzę profesjonalne strony internetowe dla małych firm, które generują klientów i budują wiarygodność. Strona gotowa w 14 dni. Bezpłatna wycena.",
  openGraph: {
    title: "Twoi klienci szukają Cię w internecie — i wybierają konkurencję",
    description:
      "Profesjonalna strona internetowa dla Twojej firmy. Projektuję, wdrażam i oddaję w 14 dni. Sprawdź realizacje i zamów bezpłatną wycenę.",
    url: SITE_URL,
    siteName: "Konrad Bauer — Strony internetowe",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Konrad Bauer — Strony internetowe dla małych firm",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Strony internetowe dla małych firm | Konrad Bauer",
    description:
      "Profesjonalna strona gotowa w 14 dni. Projektuję i wdrażam strony, które generują klientów.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
