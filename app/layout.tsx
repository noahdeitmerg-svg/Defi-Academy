import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

// Brand-System: Inter ist die verbindliche Primaer-Schrift
// (siehe brand/typography.json). Weights 400/500/600/700 decken
// alle Hierarchie-Stufen (body, bullet, slide_title, title, caption).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function siteUrlToMetadataBase(raw: string | undefined): URL | null {
  if (raw == null || raw === "") return null;
  const normalized = raw.startsWith("http") ? raw : `https://${raw}`;
  return new URL(normalized);
}

const metadataBase =
  siteUrlToMetadataBase(process.env.NEXT_PUBLIC_SITE_URL) ??
  siteUrlToMetadataBase(process.env.SITE_URL) ??
  new URL("http://localhost:3000");

export const metadata: Metadata = {
  metadataBase,
  title: "DeFi Akademie",
  description: "DeFi Akademie — strukturiertes Lernprogramm mit Modulen, Lektionen, Videos, Quiz und Praxisuebungen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} min-h-dvh font-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
