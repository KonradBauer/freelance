import type { Metadata } from "next";
import { siteMetadata } from "@/lib/metadata";
import CookieConsent from "@/components/ui/CookieConsent";
import FBPixel from "@/components/ui/FBPixel";
import GoogleAnalytics from "@/components/ui/GoogleAnalytics";
import JsonLd from "@/components/ui/JsonLd";
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
        <JsonLd />
        {children}
        <CookieConsent />
        <FBPixel />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
