export interface SocialLinks {
  email: string;
  phone: string;
  location: string;
  address: string;
  github: string;
  linkedin: string;
  dateOfBirth?: string;
}

export interface LanguageItem {
  language: string;
  proficiency: string;
}

export interface SkillColumn {
  heading: string;
  items: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  year: string;
  role: string;
  description: string;
  overview: string;
  highlights?: string[];
  tags: string[];
  techStack: string[];
  image: string;
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

export interface SiteConfig {
  name: string;
  initials: string;
  role: string;
  tagline: string;
  bio: string;
  avatar: string;
  availability: string;
  siteUrl: string;
  education: {
    degree: string;
    period: string;
    institution: string;
    location: string;
  };
  skills: SkillColumn[];
  coreSkills: string[];
  personalTraits: string[];
  languages: LanguageItem[];
  projects: Project[];
  timeline: TimelineItem[];
  socials: SocialLinks;
}

export const siteData: SiteConfig = {
  name: "Bun Vathana",
  initials: "BV",
  role: "Software Developer · Mobile & Full-Stack Web",
  tagline: "Building cross-platform mobile applications with Flutter and full-stack web applications with Next.js, React, and FastAPI.",
  bio: "Motivated Software Developer and senior student pursuing a Bachelor of Science in Software Development at Norton University. Experienced in building cross-platform mobile applications with Flutter and full-stack web applications using React, Next.js, and FastAPI. Passionate about writing clean, maintainable code, designing responsive interfaces, and collaborating effectively within engineering teams.",
  avatar: "/images/portrait.jpg",
  availability: "Available for Mobile & Full-Stack Engineering Opportunities",
  siteUrl: "https://bunvathana.dev",
  education: {
    degree: "Bachelor of Science in Software Development",
    period: "2023 — 2026",
    institution: "Norton University",
    location: "Phnom Penh, Cambodia",
  },
  skills: [
    {
      heading: "Mobile Development",
      items: [
        "Flutter",
        "Dart",
        "Cross-Platform UI",
        "State Management",
        "Offline-First SQLite",
      ],
    },
    {
      heading: "Frontend Web",
      items: [
        "React.js",
        "Next.js",
        "JavaScript (ES6+)",
        "HTML5 & CSS3",
        "Tailwind CSS",
      ],
    },
    {
      heading: "Backend & APIs",
      items: [
        "Python",
        "FastAPI",
        "Node.js",
        "RESTful API Design",
      ],
    },
    {
      heading: "Databases & DevOps",
      items: [
        "PostgreSQL",
        "SQLite",
        "MySQL",
        "Relational Schema Design",
        "Docker & Docker Compose",
        "Git & GitHub",
        "Postman & Linux CLI",
      ],
    },
  ],
  coreSkills: [
    "Adaptable & Fast Learner",
    "Creative Problem-Solving",
    "Team Collaboration",
    "Clean Code Architecture",
    "Time Management",
    "Diligent & Hardworking",
  ],
  personalTraits: [
    "Creative Problem-Solving",
    "Diligent, Honest & Reliable",
    "Collaborative Team Player",
    "Clean Code & Fast Learner",
  ],
  languages: [
    {
      language: "Khmer",
      proficiency: "Native",
    },
    {
      language: "English",
      proficiency: "Intermediate",
    },
  ],
  projects: [
    {
      id: "sunflower-expert-system",
      slug: "sunflower-expert-system",
      title: "Sunflower Disease Diagnostic Expert System",
      subtitle: "Bilingual Agricultural Rule-Based Diagnostic Engine",
      category: "AI & Diagnostic Systems",
      year: "2025",
      role: "Lead Developer",
      description:
        "Engineered expert diagnosis engine that evaluates sunflower leaf symptoms to identify plant diseases and prescribe structured treatment plans in Khmer and English.",
      overview:
        "The Sunflower Disease Diagnostic Expert System bridges agricultural phytopathology knowledge and practical software for Cambodian farmers and agronomists. Using a deterministic rule-based inference engine powered by Python, FastAPI, and PostgreSQL, the platform evaluates observed sunflower leaf symptoms in both English and Khmer to deliver accurate disease diagnoses and structured treatment protocols in real time.",
      highlights: [
        "Engineered expert diagnosis engine that evaluates sunflower leaf symptoms to identify plant diseases and prescribe structured treatment plans.",
        "Designed bilingual database schema in PostgreSQL supporting dynamic symptom data and remedies in Khmer and English.",
        "Connected responsive React client to FastAPI REST endpoints for real-time analysis turnaround.",
      ],
      tags: ["Python", "FastAPI", "PostgreSQL", "React", "Khmer & English"],
      techStack: [
        "Python",
        "FastAPI",
        "PostgreSQL",
        "React.js",
        "Tailwind CSS",
        "RESTful APIs",
      ],
      image: "/images/projects/sunflower-expert-system.jpg",
      liveUrl: "#",
      githubUrl: "https://github.com/Bunvathana876",
      featured: true,
      metrics: "Bilingual EN/KM Rule Engine",
      accentColor: "from-amber-500/20 via-yellow-500/10 to-emerald-500/20",
    },
    {
      id: "full-stack-ecommerce",
      slug: "dual-client-ecommerce",
      title: "Full-Stack Dual-Client E-Commerce Platform",
      subtitle: "Cross-Platform Flutter Mobile & Next.js Admin Ecosystem",
      category: "Mobile & E-Commerce",
      year: "2026",
      role: "Full-Stack & Mobile Developer",
      description:
        "A dual-client retail system with a cross-platform Flutter consumer mobile app and a Next.js administrative inventory dashboard containerized with Docker Compose.",
      overview:
        "A modern, end-to-end supermarket retail ecosystem. The cross-platform Flutter mobile client features smooth catalog browsing, client-side shopping cart state management, and streamlined checkout. Store administrators manage inventory, product catalogs, and customer order fulfillment queues through a responsive Next.js web portal, backed by containerized FastAPI and PostgreSQL services.",
      highlights: [
        "Built cross-platform shopping app in Flutter with smooth catalog browsing, client cart state, and order workflows.",
        "Developed administrative dashboard using Next.js for managing product inventory and tracking customer fulfillment.",
        "Containerized backend services and database with Docker Compose for consistent local testing and deployments.",
      ],
      tags: ["Flutter", "Next.js", "FastAPI", "PostgreSQL", "Docker Compose"],
      techStack: [
        "Flutter",
        "Dart",
        "Next.js",
        "TypeScript",
        "FastAPI",
        "PostgreSQL",
        "Docker Compose",
      ],
      image: "/images/projects/shop-panda.jpg",
      liveUrl: "#",
      githubUrl: "https://github.com/Bunvathana876",
      featured: true,
      metrics: "Flutter Mobile + Next.js Admin",
      accentColor: "from-cyan-500/20 via-blue-500/10 to-purple-500/20",
    },
    {
      id: "daily-flow",
      slug: "daily-flow",
      title: "Daily Flow — Habit & Routine Tracker",
      subtitle: "Offline-First Mobile Habit & Task Logging Application",
      category: "Mobile Application",
      year: "2025",
      role: "Mobile Developer",
      description:
        "An offline-first Flutter mobile application utilizing SQLite for reliable local task logging, habit streaks, data persistence, and scheduled notifications.",
      overview:
        "Daily Flow is a personal routine and habit optimization mobile app built for focused daily productivity. Created using Flutter and Dart, the application uses an offline-first SQLite database architecture to ensure instant, zero-latency interaction without network dependency. It features streak calculations, calendar logging, and local push notifications to prompt users throughout the day.",
      highlights: [
        "Created offline-first mobile app utilizing SQLite for reliable local task logging, habit streaks, and data persistence.",
        "Implemented scheduled notifications to prompt user daily routines and increase task completion rates.",
        "Engineered smooth gesture-driven habit check-ins and persistent streak milestones.",
      ],
      tags: ["Flutter", "Dart", "SQLite", "Offline-First", "Local Notifications"],
      techStack: [
        "Flutter",
        "Dart",
        "SQLite",
        "Local Notifications",
        "State Management",
      ],
      image: "/images/projects/smart-diagnostic-platform.jpg",
      liveUrl: "#",
      githubUrl: "https://github.com/Bunvathana876",
      featured: true,
      metrics: "100% Offline SQLite Persistence",
      accentColor: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
    },
    {
      id: "tea-pos-system",
      slug: "tea-pos-system",
      title: "Coffee & Milk Tea Shop POS System",
      subtitle: "Real-Time Point-of-Sale Checkout & Order Management System",
      category: "Web Application",
      year: "2024",
      role: "Frontend Developer",
      description:
        "A responsive point-of-sale checkout system supporting customizable drink options (sweetness, ice, toppings) with real-time receipt computation.",
      overview:
        "Designed for counter checkout and beverage retail operations, this Point-of-Sale web platform accelerates cashier order entry. Built with React and Tailwind CSS, it enables rapid drink selection, multi-tier option customization (sweetness, ice level, extra toppings), dynamic tax and discount calculations, and real-time receipt generation.",
      highlights: [
        "Built point-of-sale checkout system supporting customizable drink options (sweetness, ice, toppings) with real-time receipt computation.",
        "Engineered responsive, touch-optimized cashier UI in React and Tailwind CSS for rapid counter transactions.",
        "Handled real-time cart state with dynamic price recalculation and instant receipt review.",
      ],
      tags: ["React", "JavaScript", "Tailwind CSS", "POS System", "Real-Time Cart"],
      techStack: [
        "React.js",
        "JavaScript (ES6+)",
        "Tailwind CSS",
        "HTML5",
        "CSS3",
      ],
      image: "/images/projects/sunflower-expert-system.jpg",
      liveUrl: "#",
      githubUrl: "https://github.com/Bunvathana876",
      featured: true,
      metrics: "Real-Time Receipt Computation",
      accentColor: "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
    },
  ],
  timeline: [
    {
      period: "2023 — 2026",
      role: "Bachelor of Science in Software Development",
      organization: "Norton University",
      location: "Phnom Penh, Cambodia",
      description:
        "Senior undergraduate studying Software Development with specialized coursework in cross-platform mobile development with Flutter, full-stack web architecture, relational database design, and software quality.",
      highlights: [
        "Bachelor of Science in Software Development (2023 — 2026)",
        "Focus on Flutter, React, Next.js, Python (FastAPI), and PostgreSQL",
      ],
      type: "education",
    },
    {
      period: "2025 — 2026",
      role: "Full-Stack & Mobile Developer",
      organization: "Full-Stack Dual-Client E-Commerce Platform",
      location: "Phnom Penh, Cambodia",
      description:
        "Built cross-platform shopping app in Flutter with smooth catalog browsing, client cart state, and order workflows. Developed administrative dashboard using Next.js and containerized backend with Docker Compose.",
      highlights: [
        "Built cross-platform shopping app in Flutter with smooth catalog browsing and order workflows",
        "Developed Next.js admin dashboard and containerized backend with Docker Compose",
      ],
      type: "engineering",
    },
    {
      period: "2025",
      role: "Mobile Application Developer",
      organization: "Daily Flow — Habit & Routine Tracker",
      location: "Phnom Penh, Cambodia",
      description:
        "Created offline-first mobile app utilizing SQLite for reliable local task logging, habit streaks, and data persistence. Implemented scheduled notifications to prompt user daily routines and increase task completion rates.",
      highlights: [
        "Created offline-first mobile app with SQLite data persistence",
        "Implemented scheduled notifications for daily routine prompts",
      ],
      type: "project",
    },
    {
      period: "2024 — 2025",
      role: "Software Developer",
      organization: "Sunflower Disease Diagnostic Expert System",
      location: "Phnom Penh, Cambodia",
      description:
        "Engineered expert diagnosis engine that evaluates sunflower leaf symptoms to identify plant diseases and prescribe structured treatment plans in Khmer and English backed by FastAPI and PostgreSQL.",
      highlights: [
        "Engineered expert diagnosis engine evaluating sunflower leaf symptoms",
        "Designed bilingual database schema in PostgreSQL supporting dynamic symptom data and remedies in Khmer and English",
      ],
      type: "project",
    },
    {
      period: "2024",
      role: "Frontend Developer",
      organization: "Coffee & Milk Tea Shop POS System",
      location: "Phnom Penh, Cambodia",
      description:
        "Built point-of-sale checkout system supporting customizable drink options (sweetness, ice, toppings) with real-time receipt computation using React, JavaScript, and Tailwind CSS.",
      highlights: [
        "Built POS checkout system supporting customizable drink options",
        "Real-time receipt calculation and touch-friendly cashier workflow",
      ],
      type: "project",
    },
  ],
  socials: {
    phone: "(+855) 89 429 756",
    email: "vathanabun934@gmail.com",
    github: "https://github.com/Bunvathana876",
    linkedin: "https://linkedin.com/in/bunvathana",
    location: "Phnom Penh, Cambodia",
    address: "Sangkat Tuek L'ak Ti Pir, Khan Tuol Kouk, Phnom Penh, Cambodia",
    dateOfBirth: "17 December 2005",
  },
};
