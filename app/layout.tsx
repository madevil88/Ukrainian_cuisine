import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/Components/UI/layout/header";
import { siteConfig } from "@/config/site.config";
import { layoutConfig } from "@/config/layout.config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={`
        min-h-full
        flex
        flex-col`}
        suppressHydrationWarning>
        <Header />
        <main className={`
          flex
          flex-col
          flex-1
          w-full
          justify-center
          items-center`}>
          {children}
        </main>
        <footer
          style={{ height: layoutConfig.footerHeight }}
          className="flex items-center justify-center w-full bg-background">
          <p>{siteConfig.description}</p>
        </footer>
      </body>
    </html>
  );
}
