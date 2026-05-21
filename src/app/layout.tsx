import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Strony internetowe dla małych firm",
  description: "Tworzę strony internetowe, które generują klientów.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
