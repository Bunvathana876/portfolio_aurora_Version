export interface SocialLinks {
  email: string;
  location: string;
  github: string;
  linkedin: string;
}

export interface SkillItem {
  name: string;
  level?: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  accent: "purple" | "cyan" | "blue" | "emerald" | "amber";
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  featured?: boolean;
  metrics?: string;
  accentColor: string;
}

export interface TimelineItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  highlights: string[];
  type: "education" | "engineering" | "project";
}

export interface StatItem {
  label: string;
  value: string;
  detail: string;
}

export interface LiveStatusItem {
  id: "available" | "working" | "listening";
  category: string;
  label: string;
  sublabel: string;
  accent: "emerald" | "cyan" | "purple";
  href?: string;
}

export interface SiteConfig {
  name: string;
  initials: string;
  role: string;
  roles: string[];
  tagline: string;
  bio: string;
  availability: string;
  liveStatus: LiveStatusItem[];
  siteUrl: string;
  stats: StatItem[];
  skillCategories: SkillCategory[];
  projects: Project[];
  timeline: TimelineItem[];
  socials: SocialLinks;
}

export const siteData: SiteConfig = {
  name: "Bun Vathana",
  initials: "BV",
  role: "Full-Stack & Cross-Platform Mobile Developer",
  roles: [
    "Full-Stack & Cross-Platform Mobile Developer",
    "Flutter & Dart Mobile Engineer",
    "Next.js & TypeScript Architect",
    "Python (FastAPI & Flask) Backend Builder",
  ],
  tagline: "Building fast, intuitive mobile apps and scalable full-stack web systems.",
  bio: "I'm a fourth-year Computer Science and Software Engineering student at Norton University in Phnom Penh. I specialize in crafting cross-platform mobile experiences with Flutter and engineering full-stack web applications using Next.js, TypeScript, Python (FastAPI/Flask), and PostgreSQL.",
  availability: "Available for Full-Stack & Mobile Engineering Opportunities",
  liveStatus: [
    {
      id: "available",
      category: "Available for work",
      label: "Open for Full-Stack & Mobile Roles",
      sublabel: "Phnom Penh (UTC+7) • Remote or On-site",
      accent: "emerald",
      href: "#contact",
    },
    {
      id: "working",
      category: "Currently working on",
      label: "ShopPanda Commerce & Offline Sync Engine",
      sublabel: "Flutter • Next.js • FastAPI • PostgreSQL",
      accent: "cyan",
      href: "#projects",
    },
    {
      id: "listening",
      category: "Listening to",
      label: "Midnight City — M83",
      sublabel: "Synthwave Focus • Late-Night Build Session",
      accent: "purple",
    },
  ],
  siteUrl: "https://bunvathana.dev",
  stats: [
    {
      label: "Academic Standing",
      value: "Year 4",
      detail: "CS & Software Engineering @ Norton University",
    },
    {
      label: "Core Stack",
      value: "16+",
      detail: "Production frameworks, databases & dev tools",
    },
    {
      label: "Flagship Systems",
      value: "3+",
      detail: "End-to-end mobile, web & AI expert systems shipped",
    },
    {
      label: "Base Location",
      value: "PNH",
      detail: "Phnom Penh, Cambodia (UTC+7)",
    },
  ],
  skillCategories: [
    {
      category: "Mobile",
      description: "Cross-platform native-feel apps with offline-first state & smooth 60fps UI.",
      accent: "cyan",
      skills: ["Flutter", "Dart"],
    },
    {
      category: "Frontend",
      description: "Reactive, accessible, and high-performance web interfaces with modern styling.",
      accent: "purple",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      category: "Backend",
      description: "Scalable RESTful APIs, microservices, and rule-based inference backends.",
      accent: "blue",
      skills: ["Python", "FastAPI", "Flask", "Node.js", "Express"],
    },
    {
      category: "Database & ORM",
      description: "Relational data modeling, type-safe queries, and embedded local persistence.",
      accent: "emerald",
      skills: ["PostgreSQL", "MySQL", "SQLite", "Prisma ORM"],
    },
    {
      category: "Tools & Design",
      description: "Containerized deployments, version control workflows, and UI/UX prototyping.",
      accent: "amber",
      skills: ["Docker", "Git", "Figma"],
    },
  ],
  projects: [
    {
      id: "shop-panda",
      title: "ShopPanda (Supermarket E-Commerce Platform)",
      subtitle: "Cross-Platform Mobile & Next.js Admin Ecosystem",
      description:
        "A cross-platform Flutter mobile shopping app featuring offline catalog state management and dark mode, paired with a Next.js admin dashboard.",
      tags: ["Flutter", "Dart", "Next.js", "Offline State", "Dark Mode"],
      liveUrl: "#",
      githubUrl: "https://github.com/YOUR_GITHUB/shop-panda",
      featured: true,
      metrics: "Flutter App + Next.js Admin",
      accentColor: "from-cyan-500/20 via-blue-500/10 to-purple-500/20",
    },
    {
      id: "smart-diagnostic-platform",
      title: "Smart Diagnostic & Service Management Platform",
      subtitle: "Full-Stack IT Helpdesk & Ticketing System",
      description:
        "A full-stack IT helpdesk and ticketing web application built with Next.js, TypeScript, Prisma ORM, and PostgreSQL.",
      tags: ["Next.js", "TypeScript", "Prisma ORM", "PostgreSQL", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "https://github.com/YOUR_GITHUB/smart-diagnostic-platform",
      featured: true,
      metrics: "Type-Safe Prisma + PostgreSQL",
      accentColor: "from-purple-500/20 via-indigo-500/10 to-cyan-500/20",
    },
    {
      id: "sunflower-expert-system",
      title: "Sunflower Disease Diagnosis Expert System",
      subtitle: "Bilingual Agricultural Rule-Based Diagnostic Engine",
      description:
        "A bilingual (English/Khmer) rule-based agricultural diagnostic system built with React, FastAPI, Flask, and PostgreSQL.",
      tags: ["React", "FastAPI", "Flask", "PostgreSQL", "English / Khmer"],
      liveUrl: "#",
      githubUrl: "https://github.com/YOUR_GITHUB/sunflower-expert-system",
      featured: true,
      metrics: "Bilingual EN/KM Rule Engine",
      accentColor: "from-blue-500/20 via-cyan-500/10 to-emerald-500/20",
    },
  ],
  timeline: [
    {
      period: "2023 — Present",
      role: "B.Sc. in Computer Science & Software Engineering (Year 4)",
      organization: "Norton University",
      location: "Phnom Penh, Cambodia",
      description:
        "Fourth-year undergraduate focusing on software architecture, mobile application engineering, relational database systems, and intelligent rule-based software.",
      highlights: [
        "Engineered full-stack and cross-platform capstone and academic systems",
        "Specialized in Flutter/Dart, Next.js, Python (FastAPI/Flask), and PostgreSQL",
      ],
      type: "education",
    },
    {
      period: "2025 — 2026",
      role: "Full-Stack & Cross-Platform Mobile Developer",
      organization: "ShopPanda & Smart Diagnostic Systems",
      location: "Phnom Penh, Cambodia",
      description:
        "Architected and delivered ShopPanda—an offline-capable Flutter supermarket commerce app with a Next.js admin portal—alongside an enterprise-style IT helpdesk ticketing platform powered by Next.js, TypeScript, Prisma ORM, and PostgreSQL.",
      highlights: [
        "Implemented offline catalog state management and adaptive dark mode in Flutter",
        "Designed normalized PostgreSQL schemas with type-safe Prisma ORM queries",
      ],
      type: "engineering",
    },
    {
      period: "2024 — 2025",
      role: "Backend & Knowledge Systems Developer",
      organization: "Sunflower Disease Diagnosis Expert System",
      location: "Phnom Penh, Cambodia",
      description:
        "Built a bilingual (English/Khmer) rule-based agricultural diagnostic platform enabling farmers and agronomists to identify sunflower crop diseases through interactive symptom inference.",
      highlights: [
        "Combined React frontend with Python (FastAPI & Flask) inference APIs",
        "Full Khmer and English localization backed by PostgreSQL persistence",
      ],
      type: "project",
    },
  ],
  socials: {
    email: "vathanabun934@gmail.com",
    location: "Phnom Penh, Cambodia",
    github: "https://github.com/YOUR_GITHUB",
    linkedin: "https://linkedin.com/in/YOUR_LINKEDIN",
  },
};
