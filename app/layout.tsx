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

const vercelUrl = process.env.VERCEL_URL;
const metadataBase =
  vercelUrl != null
    ? new URL(vercelUrl.startsWith("http") ? vercelUrl : `https://${vercelUrl}`)
    : new URL("http://localhost:3000");

export const metadata: Metadata = {
  metadataBase,
  title: "DeFi Academy",
  description: "Kurrikulum-basierte Lernplattform für DeFi — MVP",
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
