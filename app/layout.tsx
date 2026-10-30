import type { Metadata } from "next";
import { Anton, Roboto_Flex } from "next/font/google";
import { ReactLenis } from "lenis/react";

import "lenis/dist/lenis.css";
import "./globals.css";
import { siteData } from "@/data/site";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Preloader } from "@/components/ui/Preloader";
import { ScrollProgressIndicator } from "@/components/ui/ScrollProgressIndicator";
import { AmbientCanvas } from "@/components/ui/AmbientCanvas";
import { StickyEmail } from "@/components/ui/StickyEmail";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ToastProvider } from "@/components/ui/Toast";

const antonFont = Anton({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const robotoFlex = Roboto_Flex({
  weight: ["100", "400", "500", "600", "700", "800"],
  style: "normal",
  subsets: ["latin"],
  variable: "--font-roboto-flex",
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
    <html lang="en" className="dark">
      <body
        className={`${antonFont.variable} ${robotoFlex.variable} antialiased`}
      >
        <ToastProvider>
          <ReactLenis
            root
            options={{
              lerp: 0.1,
              duration: 1.4,
            }}
          >
            <Navbar />
            <CommandPalette />
            <main className="relative z-[1]">{children}</main>
            <Footer />

            <Preloader />
            <ScrollProgressIndicator />
            <AmbientCanvas />
            <StickyEmail />
          </ReactLenis>
        </ToastProvider>
      </body>
    </html>
  );
}
