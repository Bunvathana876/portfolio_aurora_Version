import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { siteData } from "@/data/site";
import { Navbar } from "@/components/ui/Navbar";
import { CommandPalette } from "@/components/ui/CommandPalette";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <meta name="color-scheme" content="light dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var s=localStorage.getItem("color-scheme");var m=document.querySelector('meta[name="color-scheme"]');if(m){m.content=s||"light dark";}if(s==="dark"){document.documentElement.classList.add("dark");document.documentElement.classList.remove("light");}else if(s==="light"){document.documentElement.classList.add("light");document.documentElement.classList.remove("dark");}}catch(e){}`,
          }}
        />
      </head>
      <body className="font-sans bg-background text-foreground antialiased">
        <Navbar />
        <CommandPalette />
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}
