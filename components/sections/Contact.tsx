"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";
import { siteData } from "@/data/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteData.socials.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${siteData.socials.email}`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const mailtoSubject = encodeURIComponent(
      formState.subject || `Portfolio Inquiry from ${formState.name}`
    );
    const mailtoBody = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    );

    window.location.href = `mailto:${siteData.socials.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      {/* Background Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-96 max-w-3xl -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-600/20 via-cyan-500/15 to-blue-600/20 blur-[120px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-14 text-center max-w-2xl mx-auto"
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400 mb-3">
          05 / Let&apos;s Connect
        </p>
        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Ready to build{" "}
          <span className="bg-gradient-to-r from-purple-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
            something extraordinary?
          </span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-300">
          Whether you need a cross-platform Flutter app or a full-stack web platform with Next.js, Python, and PostgreSQL, let&apos;s talk.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="lg:col-span-5"
        >
          <SpotlightCard className="space-y-6 p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3.5 py-1 text-xs font-medium text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Direct Channels</span>
            </div>

            <h3 className="mt-4 font-display text-2xl font-bold text-white">
              Reach out to {siteData.name}
            </h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Based in {siteData.socials.location}. Open to software engineering roles, internships, and collaborative full-stack or mobile projects.
            </p>

            <div className="mt-6 space-y-4">
              {/* Email Card with Copy */}
              <div className="group/email flex items-center justify-between rounded-2xl border border-white/10 bg-[#0a0a0f]/70 p-4 transition-all duration-200 hover:border-cyan-400/35 hover:bg-[#0a0a0f]/90">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 transition-transform duration-200 group-hover/email:scale-105">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-xs text-slate-400">Email Address</p>
                    <a
                      href={`mailto:${siteData.socials.email}`}
                      className="truncate text-sm font-medium text-white hover:text-cyan-300 transition-colors"
                    >
                      {siteData.socials.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="btn-sheen ml-2 inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:text-white active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Location Card */}
              <div className="group/loc flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0a0a0f]/70 p-4 transition-all duration-200 hover:border-purple-400/35 hover:bg-[#0a0a0f]/90">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-400/30 bg-purple-500/10 text-purple-300 transition-transform duration-200 group-hover/loc:scale-105">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Location</p>
                  <p className="text-sm font-medium text-white">
                    {siteData.socials.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Social Profiles
              </p>
              <div className="flex flex-wrap gap-3">
                <MagneticButton
                  href={siteData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/soc rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white hover:border-cyan-400/40 hover:bg-white/[0.08]"
                >
                  <Github className="h-4 w-4 text-cyan-400 transition-transform duration-200 group-hover/soc:scale-110" />
                  <span>GitHub</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-hover/soc:translate-x-0.5 group-hover/soc:-translate-y-0.5 group-hover/soc:text-cyan-300" />
                </MagneticButton>

                <MagneticButton
                  href={siteData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/soc rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white hover:border-cyan-400/40 hover:bg-white/[0.08]"
                >
                  <Linkedin className="h-4 w-4 text-blue-400 transition-transform duration-200 group-hover/soc:scale-110" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-hover/soc:translate-x-0.5 group-hover/soc:-translate-y-0.5 group-hover/soc:text-cyan-300" />
                </MagneticButton>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Right Interactive Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="lg:col-span-7"
        >
          <SpotlightCard hoverLift={false} className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-slate-300 mb-2"
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
                    placeholder="Jane Doe"
                    className="w-full rounded-xl border border-white/10 bg-[#0a0a0f]/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-all duration-200 hover:border-white/20 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium text-slate-300 mb-2"
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
                    placeholder="jane@company.com"
                    className="w-full rounded-xl border border-white/10 bg-[#0a0a0f]/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-all duration-200 hover:border-white/20 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-medium text-slate-300 mb-2"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  value={formState.subject}
                  onChange={(e) =>
                    setFormState({ ...formState, subject: e.target.value })
                  }
                  placeholder="Full-Stack / Flutter Project Collaboration"
                  className="w-full rounded-xl border border-white/10 bg-[#0a0a0f]/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-all duration-200 hover:border-white/20 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-slate-300 mb-2"
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
                  placeholder={`Hi ${siteData.name}, I'd love to discuss an upcoming project...`}
                  className="w-full rounded-xl border border-white/10 bg-[#0a0a0f]/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-all duration-200 hover:border-white/20 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] focus:outline-none resize-none"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <MagneticButton
                  type="submit"
                  className="group/submit rounded-2xl bg-gradient-to-r from-purple-600 via-cyan-500 to-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)]"
                >
                  <Send className="h-4 w-4 transition-transform duration-200 group-hover/submit:translate-x-0.5 group-hover/submit:-translate-y-0.5" />
                  <span>Send Message</span>
                </MagneticButton>

                {submitted && (
                  <p className="text-xs text-emerald-400 font-medium">
                    Opening your email client addressed to {siteData.socials.email}...
                  </p>
                )}
              </div>
            </form>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
