"use client";

import { ArrowUpRight, Github, Linkedin, Mail, Send } from "lucide-react";
import { siteData } from "@/data/site";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Contact() {
  const links = [
    { label: "Email", href: `mailto:${siteData.socials.email}`, icon: Mail },
    { label: "GitHub", href: siteData.socials.github, icon: Github },
    { label: "LinkedIn", href: siteData.socials.linkedin, icon: Linkedin },
    { label: "Telegram QR", href: "/images/telegram-qr.jpg", icon: Send },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container">
        <ScrollReveal className="max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-sky-400">05 / Contact</p>
          <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-100">Let&apos;s connect.</h2>
          <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-slate-400">
            Open to mobile and full-stack software development opportunities.
          </p>
          <a
            href={`mailto:${siteData.socials.email}`}
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-xl bg-sky-400 px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090D16]"
          >
            Email me <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </ScrollReveal>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {links.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") || href.startsWith("/images") ? "_blank" : undefined}
              rel={href.startsWith("http") || href.startsWith("/images") ? "noopener noreferrer" : undefined}
              className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-[#111827]/70 px-5 py-4 text-slate-200 transition-colors hover:border-sky-400/40 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <span className="flex items-center gap-3"><Icon size={18} aria-hidden="true" />{label}</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;
