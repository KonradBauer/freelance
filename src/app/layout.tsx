import type { Metadata } from "next";
import { siteMetadata } from "@/lib/metadata";
import CookieConsent from "@/components/ui/CookieConsent";
import FBPixel from "@/components/ui/FBPixel";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className="font-body antialiased bg-white text-slate-900">
        {children}
        <CookieConsent />
        <FBPixel />
      </body>
    </html>
  );
}
