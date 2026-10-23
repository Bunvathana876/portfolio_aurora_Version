"use client";

import React, { useState } from "react";
import { ArrowUpRight, Github, Mail, MapPin, Phone } from "lucide-react";
import { siteData } from "@/data/site";
import { FadeIn } from "@/components/ui/SectionTransition";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const mailtoSubject = encodeURIComponent(
      `Portfolio Inquiry from ${formState.name}`
    );
    const mailtoBody = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    );

    window.location.href = `mailto:${siteData.socials.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  return (
    <section
      id="contact"
      className="mx-auto max-w-[1320px] px-6 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-32"
    >
      <FadeIn className="mb-12 sm:mb-16">
        <p className="editorial-label">05 / Contact</p>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-12 items-start">
        {/* Left Column: Direct Inquiries, Phone, Address, Elsewhere */}
        <FadeIn className="lg:col-span-6 space-y-10">
          <div>
            <h2 className="font-serif project-title-serif text-4xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-normal leading-[0.98] tracking-[-0.03em] text-foreground">
              Let&apos;s work <em className="italic">together.</em>
            </h2>

            <div className="mt-8 space-y-4">
              {/* Email Direct Link */}
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a
                  href={`mailto:${siteData.socials.email}`}
                  className="font-serif text-2xl sm:text-3xl text-foreground underline underline-offset-8 decoration-1 decoration-neutral-400 dark:decoration-neutral-600 transition-colors hover:text-accent hover:decoration-accent break-all sm:break-normal"
                >
                  {siteData.socials.email}
                </a>
              </div>

              {/* Phone Direct Link */}
              <div className="flex items-center gap-3 pt-1">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <a
                  href={`tel:${siteData.socials.phone.replace(/[^+\d]/g, "")}`}
                  className="font-mono text-lg sm:text-xl text-foreground/90 transition-colors hover:text-accent"
                >
                  {siteData.socials.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Location & Address Breakdown */}
          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-foreground/90">
                <p className="font-medium text-foreground">{siteData.socials.address}</p>
                <p className="text-muted mt-0.5">Phnom Penh, Cambodia (UTC+7)</p>
              </div>
            </div>
          </div>

          {/* Elsewhere / Online Profiles */}
          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <p className="text-xs uppercase tracking-widest text-muted mb-4">
              Elsewhere &amp; Archives
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={siteData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-accent"
                >
                  <Github className="w-4 h-4 text-muted" />
                  <span className="font-mono text-xs">github.com/Bunvathana876</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted" />
                </a>
              </li>
              <li>
                <a
                  href={siteData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-accent"
                >
                  <span className="w-4 h-4 flex items-center justify-center font-mono text-[11px] font-bold text-muted">in</span>
                  <span className="font-mono text-xs">Bun Vathana on LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted" />
                </a>
              </li>
            </ul>
          </div>
        </FadeIn>

        {/* Right Column: Minimal Underline-Only Contact Form */}
        <FadeIn delay={0.1} className="lg:col-span-5 lg:col-start-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-xs uppercase tracking-widest text-muted mb-1"
              >
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                placeholder="Your name"
                className="w-full rounded-none border-0 border-b border-neutral-200 dark:border-neutral-800 bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted transition-colors duration-200 focus:border-foreground focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block text-xs uppercase tracking-widest text-muted mb-1"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                required
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                placeholder="you@example.com"
                className="w-full rounded-none border-0 border-b border-neutral-200 dark:border-neutral-800 bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted transition-colors duration-200 focus:border-foreground focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs uppercase tracking-widest text-muted mb-1"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                placeholder="Tell me about your mobile or full-stack project..."
                className="w-full rounded-none border-0 border-b border-neutral-200 dark:border-neutral-800 bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted transition-colors duration-200 focus:border-foreground focus:outline-none resize-y"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-4">
              <button
                type="submit"
                className="group inline-flex items-center gap-2 border-b border-foreground pb-1 text-xs uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <span>Send Message</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>

              {submitted && (
                <p role="status" aria-live="polite" className="text-xs text-muted">
                  Opening mail client...
                </p>
              )}
            </div>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
