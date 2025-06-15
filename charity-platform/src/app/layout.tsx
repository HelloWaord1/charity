import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CustomWalletProvider } from "@/context/wallet-context";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Charity Platform - Исламская благотворительность на блокчейне Solana",
  description: "Прозрачное распределение Закята и Садаки, финансирование халяльных проектов с полным соответствием исламским принципам на блокчейне Solana",
  keywords: ["закят", "садака", "блокчейн", "solana", "исламская благотворительность", "халяль"],
  authors: [{ name: "Charity Platform Team" }],
  openGraph: {
    title: "Charity Platform - Исламская благотворительность на блокчейне",
    description: "Прозрачное распределение Закята и Садаки на блокчейне Solana",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Charity Platform - Исламская благотворительность",
    description: "Прозрачное распределение Закята и Садаки на блокчейне Solana",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
      >
        <CustomWalletProvider>
          {children}
        </CustomWalletProvider>
      </body>
    </html>
  );
}
