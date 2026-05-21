import type { Metadata } from "next";

// TODO: właściciel — podmień na finalną domenę przed uruchomieniem kampanii FB Ads
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

// TODO: właściciel — uzupełnij tytuł i opis dopiero po przygotowaniu copywritingu
export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TODO: Główny nagłówek strony",
    template: "%s | TODO: Nazwa marki",
  },
  description: "TODO: Opis 120-160 znaków — co robisz, dla kogo, co zyskają",
  openGraph: {
    title: "TODO: Tytuł OG dla FB Ads link preview",
    description: "TODO: Opis OG — 2-3 zdania zachęcające do kliknięcia",
    url: SITE_URL,
    siteName: "TODO: Nazwa marki",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TODO: Opis obrazu OG",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TODO: Tytuł Twitter/X",
    description: "TODO: Opis Twitter/X",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
