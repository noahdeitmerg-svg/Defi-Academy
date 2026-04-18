import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
  title: "DeFi Academy",
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
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh font-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
