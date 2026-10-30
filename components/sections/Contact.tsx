"use client";

import React, { useState } from "react";
import {
  Check,
  Copy,
  FileDown,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { siteData } from "@/data/site";

import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { useToast } from "@/components/ui/Toast";
import { sound } from "@/lib/sound";

export function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();

  const handleCopyEmail = async () => {
    try {
      sound.success();
      await navigator.clipboard.writeText(siteData.socials.email);
      setCopiedEmail(true);
      toast({
        title: "Email copied to clipboard",
        description: siteData.socials.email,
        type: "success",
      });
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      sound.tick();
      toast({
        title: "Email address",
        description: siteData.socials.email,
        type: "info",
      });
    }
  };

  const handleCopyPhone = async () => {
    try {
      sound.success();
      await navigator.clipboard.writeText(siteData.socials.phone);
      setCopiedPhone(true);
      toast({
        title: "Phone number copied",
        description: siteData.socials.phone,
        type: "success",
      });
      setTimeout(() => setCopiedPhone(false), 2400);
    } catch {
      sound.tick();
      toast({
        title: "Phone number",
        description: siteData.socials.phone,
        type: "info",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.success();
    toast({
      title: "Opening email client...",
      description: `Addressing message to ${siteData.socials.email}`,
      type: "success",
    });

    const mailtoSubject = encodeURIComponent(
      `Engineering Opportunity Inquiry from ${formState.name}`
    );
    const mailtoBody = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    );

    setTimeout(() => {
      window.location.href = `mailto:${siteData.socials.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    }, 400);
  };

  return (
    <section className="pb-28 pt-10" id="contact">
      <div className="container">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/25 text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase">
            <Sparkles size={12} className="animate-pulse" />
            <span>05 / Get In Touch</span>
          </span>
        </div>

        <div className="grid md:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: Direct Contact & Social Channels */}
          <div className="md:col-span-5 space-y-6">
            <p className="text-4xl sm:text-5xl font-anton leading-[1.05] uppercase text-foreground">
              Let&apos;s build something{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                impactful
              </span>{" "}
              together.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              Available for Software Developer roles (Flutter Mobile &amp; Full-Stack Web) in Phnom Penh, Cambodia or remote engineering opportunities.
            </p>

            <div className="space-y-4 pt-2">
              <SpotlightCard
                spotlightColor="rgba(0, 242, 254, 0.12)"
                className="p-4 sm:p-5 rounded-2xl bg-[#0c1020]/90 backdrop-blur-xl border border-white/10 flex items-center justify-between gap-3 shadow-lg"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
                    Email Direct
                  </p>
                  <a
                    href={`mailto:${siteData.socials.email}`}
                    onClick={() => sound.tick()}
                    className="text-base sm:text-lg font-mono font-bold text-foreground hover:text-cyan-400 transition-colors break-all"
                  >
                    {siteData.socials.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-muted-foreground hover:text-cyan-400 hover:border-cyan-400/40 transition-colors inline-flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </SpotlightCard>

              <SpotlightCard
                spotlightColor="rgba(0, 242, 254, 0.12)"
                className="p-4 sm:p-5 rounded-2xl bg-[#0c1020]/90 backdrop-blur-xl border border-white/10 flex items-center justify-between gap-3 shadow-lg"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
                    Phone / Telegram
                  </p>
                  <a
                    href={`tel:${siteData.socials.phone.replace(/[^+\d]/g, "")}`}
                    onClick={() => sound.tick()}
                    className="text-base sm:text-lg font-mono font-bold text-foreground hover:text-cyan-400 transition-colors inline-flex items-center gap-2"
                  >
                    <Phone size={15} className="text-cyan-400" />
                    <span>{siteData.socials.phone}</span>
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-muted-foreground hover:text-cyan-400 hover:border-cyan-400/40 transition-colors inline-flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  {copiedPhone ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </SpotlightCard>

              <SpotlightCard
                spotlightColor="rgba(0, 242, 254, 0.1)"
                className="p-4 sm:p-5 rounded-2xl bg-[#0c1020]/90 backdrop-blur-xl border border-white/10 shadow-lg"
              >
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-1 flex items-center gap-1.5">
                  <MapPin size={13} className="text-cyan-400" />
                  <span>Physical Address</span>
                </p>
                <p className="text-sm font-mono text-foreground">
                  {siteData.socials.address}
                </p>
              </SpotlightCard>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.pop()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-anton text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:opacity-95 transition-all"
              >
                <FileDown size={15} />
                <span>Download Resume</span>
              </a>
              <a
                href={siteData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.tick()}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0c1020] border border-white/10 text-sm font-mono text-foreground hover:border-cyan-400 hover:text-cyan-400 transition-colors"
              >
                <Github size={15} />
                <span>GitHub</span>
              </a>
              <a
                href={siteData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.tick()}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0c1020] border border-white/10 text-sm font-mono text-foreground hover:border-cyan-400 hover:text-cyan-400 transition-colors"
              >
                <Linkedin size={15} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right: Message Dispatch Form */}
          <div className="md:col-span-7">
            <SpotlightCard
              spotlightColor="rgba(0, 242, 254, 0.12)"
              className="p-6 sm:p-8 rounded-2xl bg-[#0c1020]/90 backdrop-blur-2xl border border-white/10 shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles size={16} className="text-cyan-400" />
                <h3 className="font-anton text-xl tracking-wider text-foreground uppercase">
                  Send a Direct Message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    placeholder="e.g. Alex"
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#060811] text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5"
                  >
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#060811] text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    placeholder="Discuss an opportunity, project scope, or technical question..."
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#060811] text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-anton text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(0,242,254,0.35)] transition-all cursor-pointer group"
                >
                  <span>Dispatch Message</span>
                  <Send size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </form>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
