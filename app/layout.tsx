import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { siteData } from "@/data/site";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { IntroLoader } from "@/components/ui/IntroLoader";
import { Navbar } from "@/components/ui/Navbar";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { SectionTransitionOverlay } from "@/components/ui/SectionTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteData.siteUrl),
  title: {
    default: `${siteData.name} — ${siteData.role}`,
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
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteData.name} — ${siteData.role}`,
    description: siteData.tagline,
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
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} dark`}
    >
      <body className="font-sans bg-[#0a0a0f] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-white">
        {/* Faint Grid Background & Subtle Noise Overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 bg-grid-pattern opacity-100"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <SmoothScrollProvider>
          <IntroLoader />
          <ScrollProgress />
          <SectionTransitionOverlay />
          <CustomCursor />
          <Navbar />
          <CommandPalette />
          <div className="relative z-10">{children}</div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
