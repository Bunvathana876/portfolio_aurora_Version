import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Geist } from "next/font/google";
import { ReactLenis } from "lenis/react";

import "lenis/dist/lenis.css";
import "./globals.css";
import { siteData } from "@/data/site";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ScrollProgressIndicator } from "@/components/ui/ScrollProgressIndicator";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ToastProvider } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteData.siteUrl),
  title: {
    default: `Portfolio - ${siteData.name}`,
    template: `%s | ${siteData.name}`,
  },
  description: `${siteData.tagline} ${siteData.bio}`,
  keywords: [
    siteData.name,
    siteData.role,
    "Flutter Developer Cambodia",
    "Full-Stack Developer Phnom Penh",
    "Next.js",
    "TypeScript",
    "FastAPI",
    "PostgreSQL",
    "Norton University",
  ],
  authors: [{ name: siteData.name, url: siteData.siteUrl }],
  creator: siteData.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteData.siteUrl,
    title: `${siteData.name} — ${siteData.role}`,
    description: siteData.tagline,
    siteName: `${siteData.name} Portfolio`,
    images: [
      {
        url: siteData.avatar,
        width: 1824,
        height: 2346,
        alt: siteData.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteData.name} — ${siteData.role}`,
    description: siteData.tagline,
    images: [siteData.avatar],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ToastProvider>
          <ReactLenis
            root
            options={{
              lerp: 0.1,
              duration: 1.2,
              anchors: true,
            }}
          >
            <ScrollProgressIndicator />
            <Navbar />
            <CommandPalette />
            <main className="relative z-[1]">{children}</main>
            <Footer />
          </ReactLenis>
        </ToastProvider>
      </body>
    </html>
  );
}
