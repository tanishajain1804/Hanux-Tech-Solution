import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";
import "./About.css";

// Leadership Members Data
interface LeadershipMember {
  i: number;
  initials: string;
  name: string;
  role: string;
  shortLine: string;
  bio: string;
  tags: string[];
  statText: string;
  gradient: string;
}

const LEADERSHIP: LeadershipMember[] = [
  {
    i: 0,
    initials: "PK",
    name: "Priya Kapoor",
    role: "Chief Technology Officer",
    shortLine: "Ex-CRED & Razorpay. Owns the technical roadmap.",
    bio: "8 years in product engineering. Previously led platform teams at CRED and Razorpay. Owns HanuxTech's entire technical roadmap and architecture review process.",
    tags: ["System Design", "React", "AWS", "Team Leadership"],
    statText: "Reviews every architecture decision",
    gradient: "linear-gradient(135deg,#7c3aed,#a78bfa)"
  },
  {
    i: 1,
    initials: "AM",
    name: "Arjun Mehta",
    role: "Chief Operating Officer",
    shortLine: "10 years in infrastructure. Runs delivery & ops.",
    bio: "10 years in infrastructure and delivery. Kept 500K sessions online without a single missed alert. Runs sprint operations and client delivery across every active project.",
    tags: ["Terraform", "AWS ECS", "Delivery Ops", "Kubernetes"],
    statText: "99.9% uptime across every deploy",
    gradient: "linear-gradient(135deg,#0ea68c,#34d399)"
  },
  {
    i: 2,
    initials: "SM",
    name: "Shreya Mishra",
    role: "Senior Full-Stack Engineer",
    shortLine: "5 years of TypeScript, zero tolerance for untyped APIs.",
    bio: "5 years of TypeScript, zero tolerance for untyped APIs. Shipped the fastest MVP in HanuxTech history — 5.5 weeks from brief to live on AWS.",
    tags: ["TypeScript", "Next.js", "GraphQL", "NestJS"],
    statText: "Shipped fastest MVP (5.5 weeks)",
    gradient: "linear-gradient(135deg,#f59e0b,#fcd34d)"
  },
  {
    i: 3,
    initials: "VN",
    name: "Vikram Nair",
    role: "AI & ML Integration Lead",
    shortLine: "Ex-Swiggy ML team. Specialises in embedding LLMs.",
    bio: "Ex-Swiggy ML team. Specialises in embedding LLMs into real products. Has shipped 8 production AI features in the last 18 months — not demos, real products.",
    tags: ["Python", "LangChain", "OpenAI", "RAG", "FastAPI"],
    statText: "Shipped 8 production AI features",
    gradient: "linear-gradient(135deg,#ef4444,#f87171)"
  },
  {
    i: 4,
    initials: "DP",
    name: "Divya Pillai",
    role: "QA & Performance Lead",
    shortLine: "6 years finding bugs. Lighthouse scores >90.",
    bio: "6 years finding bugs before users do. Lighthouse scores above 90 on every build she touches. Every test suite ships with 80%+ coverage.",
    tags: ["Cypress", "Playwright", "k6", "Jest", "Lighthouse"],
    statText: "80%+ unit test coverage",
    gradient: "linear-gradient(135deg,#0ea68c,#60a5fa)"
  }
];

// Process Data
interface ProcessStep {
  step: string;
  icon: string;
  title: string;
  desc: string;
  dur: string;
  pbTitle: string;
  items: string[];
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01 — Discovery",
    icon: "🔍",
    title: "Discovery & Architecture",
    desc: "We map your goals, users, and tech constraints before a line of code is touched.",
    dur: "Week 1–2",
    pbTitle: "Discovery Deliverables",
    items: [
      "Project scope document",
      "Architecture diagram",
      "DB schema draft",
      "Risk & dependency map",
      "Tech stack brief (signed off)"
    ]
  },
  {
    step: "02 — Design",
    icon: "✏️",
    title: "UI/UX & API Design",
    desc: "High-fidelity Figma prototypes validated against real users. You approve before we build.",
    dur: "Week 2–4",
    pbTitle: "Design Deliverables",
    items: [
      "Full Figma design kit",
      "Mobile + desktop flows",
      "OpenAPI 3.0 contract",
      "Usability-tested prototype",
      "Signed-off design approval"
    ]
  },
  {
    step: "03 — Engineering",
    icon: "⚙️",
    title: "Agile Development",
    desc: "2-week sprints, TDD, CI/CD from day one. You see working software every fortnight.",
    dur: "Week 4–10",
    pbTitle: "Engineering Deliverables",
    items: [
      "Working software bi-weekly",
      "Shared staging environment",
      "CI/CD pipeline live",
      "80%+ unit test coverage",
      "Reviewed & documented code"
    ]
  },
  {
    step: "04 — Launch",
    icon: "🚀",
    title: "Performance & Deploy",
    desc: "Lighthouse >90, load testing at 10× peak, blue-green deploy, 30-day support.",
    dur: "Week 10–12",
    pbTitle: "Launch Deliverables",
    items: [
      "Live production environment",
      "Runbook & deploy docs",
      "Uptime monitoring & alerts",
      "Knowledge transfer session",
      "30-day post-launch support"
    ]
  }
];

const PDATA = [
  {
    cols: [
      { t: "What happens", items: ["Stakeholder interviews", "Goal & user mapping", "Tech stack evaluation", "Risk assessment"] },
      { t: "Deliverables", items: ["Scope document", "Architecture diagram", "DB schema draft", "Signed-off brief"] },
      { t: "Your time", items: ["2×60min workshops", "Review scope doc", "Introduce stakeholders", "Async Slack"], wk: "Week 1–2" }
    ]
  },
  {
    cols: [
      { t: "What happens", items: ["Information architecture", "Design system build", "Figma prototype", "Usability testing"] },
      { t: "Deliverables", items: ["Figma design kit", "Mobile + desktop flows", "OpenAPI contract", "Signed prototype"] },
      { t: "Your time", items: ["Weekly design review", "Brand assets handover", "Approve screens", "Connect test users"], wk: "Week 2–4" }
    ]
  },
  {
    cols: [
      { t: "What happens", items: ["2-week sprint cycles", "TDD 80%+ coverage", "Friday demos", "3rd-party integrations"] },
      { t: "Deliverables", items: ["Working software bi-weekly", "Staging environment URL", "CI/CD pipeline live", "Reviewed & documented"] },
      { t: "Your time", items: ["Sprint review 30min", "Jira board access", "Feedback within 48hrs", "Content on schedule"], wk: "Week 4–10" }
    ]
  },
  {
    cols: [
      { t: "What happens", items: ["Lighthouse audit >90", "Load test at 10× peak", "Blue-green deploy", "30-day support window"] },
      { t: "Deliverables", items: ["Live production env", "Runbook & deploy docs", "Uptime monitoring", "Knowledge transfer"] },
      { t: "Your time", items: ["UAT sign-off", "Domain/DNS access", "Internal training 2hrs", "Go/no-go approval"], wk: "Week 10–12" }
    ]
  }
];

// Tech Stack Data
interface TechStackItem {
  n: string;
  cat: string;
}

const TECHS: TechStackItem[] = [
  { n: "React", cat: "frontend" }, { n: "Next.js", cat: "frontend" }, { n: "TypeScript", cat: "frontend" },
  { n: "TailwindCSS", cat: "frontend" }, { n: "Framer Motion", cat: "frontend" }, { n: "Vite", cat: "frontend" },
  { n: "Node.js", cat: "backend" }, { n: "NestJS", cat: "backend" }, { n: "Python", cat: "backend" },
  { n: "GraphQL", cat: "backend" }, { n: "PostgreSQL", cat: "backend" }, { n: "Redis", cat: "backend" },
  { n: "Prisma", cat: "backend" }, { n: "tRPC", cat: "backend" },
  { n: "Docker", cat: "devops" }, { n: "AWS", cat: "devops" }, { n: "Terraform", cat: "devops" },
  { n: "GitHub Actions", cat: "devops" }, { n: "Vercel", cat: "devops" }, { n: "Kubernetes", cat: "devops" },
  { n: "OpenAI", cat: "ai" }, { n: "LangChain", cat: "ai" }, { n: "Hugging Face", cat: "ai" },
  { n: "FastAPI", cat: "ai" }, { n: "Pinecone", cat: "ai" }, { n: "RAG Pipelines", cat: "ai" }
];

const TechIcon: React.FC<{ name: string }> = ({ name }) => {
  switch (name) {
    case "React":
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" width="16" height="16" fill="none" stroke="#61dafb" strokeWidth="1.2">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          <circle r="2" fill="#61dafb"/>
        </svg>
      );
    case "Next.js":
      return (
        <svg viewBox="0 0 128 128" width="16" height="16" fill="currentColor">
          <path d="M64 0a64 64 0 1 0 64 64A64.07 64.07 0 0 0 64 0zm28.3 92.4L52.8 41.2H43V86h7.6V49.8L83.7 93.6c-6.1 4.1-13.3 6.4-21.1 6.4a36 36 0 1 1 29.7-17.6zM93 41.2h7.6v45.2H93z"/>
        </svg>
      );
    case "TypeScript":
      return (
        <svg viewBox="0 0 128 128" width="16" height="16" fill="#3178c6">
          <rect width="128" height="128" rx="8" fill="#3178c6"/>
          <text x="110" y="105" fontFamily="sans-serif" fontWeight="bold" fontSize="62" fill="white" textAnchor="end">TS</text>
        </svg>
      );
    case "TailwindCSS":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 15c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"/>
        </svg>
      );
    case "Framer Motion":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M12 0l12 12H12L0 24V12h12L24 0z"/>
        </svg>
      );
    case "Vite":
      return (
        <svg viewBox="0 0 256 256" width="16" height="16">
          <defs>
            <linearGradient id="viteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BD34FE"/>
              <stop offset="100%" stopColor="#41B883"/>
            </linearGradient>
          </defs>
          <path fill="url(#viteGradient)" d="M128 0L16 64v128l112 64 112-64V64z"/>
          <path fill="#FFD600" d="M128 48L64 128h48v80l64-80h-48z"/>
        </svg>
      );
    case "Node.js":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#339933">
          <path d="M12 2L4 6.5v9L12 20l8-4.5v-9L12 2zm0 2.5l5.5 3v6L12 16.5l-5.5-3v-6l5.5-3z"/>
        </svg>
      );
    case "NestJS":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#E0234E">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 3l7 3.5v7l-7 3.5-7-3.5v-7L12 5z"/>
        </svg>
      );
    case "Python":
      return (
        <svg viewBox="0 0 110 110" width="16" height="16">
          <path fill="#3776AB" d="M55 2c-15.6 0-25 6.7-25 19.8h11.4c0-7.8 5.7-10.4 13.6-10.4 9.1 0 14.6 4.7 14.6 11.4v8.3H36c-13.6 0-22.3 8.8-22.3 22.8 0 13.5 9.4 22.8 22.3 22.8H45c0 7.8-5.7 10.4-13.6 10.4-9.1 0-14.6-4.7-14.6-11.4H5.4C5.4 98.3 14.8 105 30.4 105c15.6 0 25-6.7 25-19.8V76.8h33.6c13.6 0 22.3-8.8 22.3-22.8 0-13.5-9.4-22.8-22.3-22.8H78.6c0-7.8 5.7-10.4 13.6-10.4 9.1 0 14.6 4.7 14.6 11.4h11.4c0-13.1-9.4-19.8-25-19.8H55z"/>
        </svg>
      );
    case "GraphQL":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#E10098">
          <path d="M12 2L2 8v8l10 6 10-6V8L12 2zm0 2.5L19.5 9l-7.5 4.5L4.5 9 12 4.5zM4.5 15l7.5 4.5 7.5-4.5-7.5-4.5-7.5 4.5z"/>
        </svg>
      );
    case "PostgreSQL":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#336791">
          <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm1 4h-2v6H7v2h4v4h2v-4h4v-2h-4V6z"/>
        </svg>
      );
    case "Redis":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#DC382D">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 3.5l6.5 3.25V15.25L12 18.5l-6.5-3.25V8.75L12 5.5z"/>
        </svg>
      );
    case "Prisma":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#2D3748">
          <path d="M12 2L2 22h20L12 2zm0 4.5L18.5 19H5.5L12 6.5z"/>
        </svg>
      );
    case "tRPC":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 8v8l10 6 10-6V8L12 2zm0 4v12M8 8h8M8 12h8"/>
        </svg>
      );
    case "Docker":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#2496ED">
          <path d="M3 10h3v3H3zm4 0h3v3H7zm4 0h3v3h-3zm4 0h3v3h-3zm-8-4h3v3H7zm4 0h3v3h-3zm4 0h3v3h-3zm-4-4h3v3h-3zM2 14h20v2H2z"/>
        </svg>
      );
    case "AWS":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#FF9900">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H7v-2h4v2zm6-4H7v-2h10v2zm0-4H7V6h10v2z"/>
        </svg>
      );
    case "Terraform":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#7B42BC">
          <path d="M2 2h9v9H2zm11 0h9v9h-9zM2 13h9v9H2zm11 0h9v9h-9z"/>
        </svg>
      );
    case "GitHub Actions":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#2088FF">
          <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
        </svg>
      );
    case "Vercel":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M12 2L24 22H0L12 2z"/>
        </svg>
      );
    case "Kubernetes":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#326CE5">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 3.25L18.75 8.5v7L12 18.75l-6.75-3.25v-7L12 5.25z"/>
        </svg>
      );
    case "OpenAI":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#10a37f">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
        </svg>
      );
    case "LangChain":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#1C3C3A">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 4.5L17.5 9v6L12 17.5 6.5 15V9L12 6.5z"/>
        </svg>
      );
    case "Hugging Face":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#FFD21E">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="8" cy="10" r="1.5"/>
          <circle cx="16" cy="10" r="1.5"/>
          <path d="M8 15s1.5 2 4 2 4-2 4-2" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case "FastAPI":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#009688">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm1 14.5l-4-4h3v-4h2v-2l4 4h-3v4h-2v2z"/>
        </svg>
      );
    case "Pinecone":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#10B981">
          <path d="M12 2L2 22h20L12 2z"/>
        </svg>
      );
    case "RAG Pipelines":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M4 4h16v16H4zm2 2v12h12V6zM8 8h8v2H8zm0 4h8v2H8z"/>
        </svg>
      );
    default:
      return null;
  }
};

export const About: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroH1Visible, setHeroH1Visible] = useState(false);
  const [ctasVisible, setCtasVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [storyIndex, setStoryIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [flippedLeadCard, setFlippedLeadCard] = useState<number | null>(null);

  const handleFlipLeadCard = (idx: number, forceState?: boolean) => {
    const isCurrentlyFlipped = flippedLeadCard === idx;
    const willOpen = forceState !== undefined ? forceState : !isCurrentlyFlipped;
    if (willOpen) {
      setFlippedLeadCard(idx);
    } else {
      if (isCurrentlyFlipped) {
        setFlippedLeadCard(null);
      }
    }
  };
  const [currentTime, setCurrentTime] = useState("--:--:--");
  const [techFilter, setTechFilter] = useState("all");
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  const getRvClass = (id: string, type: "rv" | "rv-l" | "rv-r" = "rv", extra: string = "") => {
    const isRevealed = revealedIds[id];
    return `${type} ${isRevealed ? "in" : ""} ${extra}`;
  };

  // Refs for interactive canvases/dimensions
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const connPathRef = useRef<SVGPathElement>(null);
  const connWrapRef = useRef<HTMLDivElement>(null);

  // Counter values states (incremented dynamically)
  const [statsCounters, setStatsCounters] = useState([0, 0, 0, 0]);
  const [numberCounters, setNumberCounters] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [lighthouseVal, setLighthouseVal] = useState(0);

  // Ticker projects state
  const [tickerProjects, setTickerProjects] = useState([
    { n: "FinCore Portal", p: "eng" },
    { n: "MedFlow AI", p: "des" },
    { n: "TradeOS v3", p: "qua" },
    { n: "EduStack LMS", p: "eng" },
    { n: "RetailSync API", p: "des" }
  ]);

  const pad = (n: number) => String(n).padStart(2, "0");
  const cubic = (t: number) => 1 - Math.pow(1 - t, 3);

  // 1. Scroll Progress Bar & Reveal Intersection Observer
  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(h ? window.scrollY / h : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Reveal elements IntersectionObserver using React state
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id) {
              setRevealedIds((prev) => ({ ...prev, [id]: true }));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -36px 0px" }
    );

    const revealElements = document.querySelectorAll("[data-rv]");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // 2. Typewriter Effect
  useEffect(() => {
    const phrases = [
      "We build software that scales — every sprint, every client, every time.",
      "Senior engineers. Zero black-box development. Full transparency.",
      "Our agile pipeline ships working software every two weeks."
    ];
    let pi = 0;
    let ci = 0;
    let del = false;
    let timeoutId: any;

    const type = () => {
      const ph = phrases[pi];
      if (!del) {
        setTypewriterText(ph.slice(0, ++ci));
        if (ci === ph.length) {
          del = true;
          timeoutId = setTimeout(type, 2600);
          return;
        }
      } else {
        setTypewriterText(ph.slice(0, --ci));
        if (ci === 0) {
          del = false;
          pi = (pi + 1) % phrases.length;
          timeoutId = setTimeout(type, 380);
          return;
        }
      }
      timeoutId = setTimeout(type, del ? 20 : 38);
    };

    const initialTimeout = setTimeout(type, 1100);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(timeoutId);
    };
  }, []);

  // 3. Hero Entrance Animations & Counters Trigger
  useEffect(() => {
    setHeroH1Visible(true);
    const cardTimer = setTimeout(() => setCardVisible(true), 550);
    const ctasTimer = setTimeout(() => setCtasVisible(true), 950);

    // Hero Stats Counter Animate
    const statsTimer = setTimeout(() => {
      setStatsVisible(true);
      const targets = [54, 98, 24, 6];
      const start = performance.now();
      const dur = 1600;

      const runStats = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const easeVal = cubic(p);
        setStatsCounters(targets.map((t) => Math.round(easeVal * t)));
        if (p < 1) requestAnimationFrame(runStats);
      };

      requestAnimationFrame(runStats);
    }, 1400);

    return () => {
      clearTimeout(cardTimer);
      clearTimeout(ctasTimer);
      clearTimeout(statsTimer);
    };
  }, []);

  // 4. Hero Particles Canvas Animation
  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const N = 65;
    const DIST = 105;
    let RAF: number;

    class Pt {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      c: string;
      a: number;
      born: number;
      delay: number;

      constructor() {
        const a = Math.random() * Math.PI * 2;
        const r = Math.random() * Math.min(W, H) * 0.5;
        this.x = W * 0.5 + Math.cos(a) * r;
        this.y = H * 0.5 + Math.sin(a) * r;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.r = Math.random() * 2 + 1.2;
        this.c = Math.random() > 0.75 ? "14,166,140" : "30,79,216";
        this.a = Math.random() * 0.45 + 0.2;
        this.born = 0;
        this.delay = Math.random();
      }
    }

    let pts = Array.from({ length: N }, () => new Pt());
    let mx = -999;
    let my = -999;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      pts = Array.from({ length: N }, () => new Pt());
    };
    window.addEventListener("resize", handleResize, { passive: true });

    let st = 0;
    const loop = (ts: number) => {
      if (!st) st = ts;
      const elapsed = ts - st;
      ctx.clearRect(0, 0, W, H);

      // Mouse repulsion
      pts.forEach((p) => {
        const dx = p.x - mx;
        const dy = p.y - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 85 && d > 0) {
          const f = ((85 - d) / 85) * 0.55;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
          const s = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (s > 2) {
            p.vx = (p.vx / s) * 2;
            p.vy = (p.vy / s) * 2;
          }
        }
      });

      pts.forEach((p) => {
        const tb = elapsed / 1400 > p.delay ? 1 : 0;
        if (p.born < tb) p.born = Math.min(p.born + 0.025, tb);
        if (p.born < 0.01) return;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });

      // Draw connections
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        if (a.born < 0.05) continue;
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          if (b.born < 0.05) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < DIST) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${a.c},${(1 - d / DIST) * 0.28 * Math.min(a.born, b.born)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      pts.forEach((p) => {
        if (p.born < 0.01) return;
        const sc = p.born < 0.5 ? p.born * 2 : 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * sc, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${p.a * p.born})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.6 * sc, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${0.05 * p.born})`;
        ctx.fill();
      });

      RAF = requestAnimationFrame(loop);
    };

    RAF = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(RAF);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 5. Story Timeline Autoplay
  useEffect(() => {
    if (!autoplayEnabled) return;
    const auto = setInterval(() => {
      setStoryIndex((prev) => (prev + 1) % 4);
    }, 4500);

    return () => clearInterval(auto);
  }, [autoplayEnabled]);

  // 6. SVG Process Connector Draw Logic
  const calculateProcessConn = () => {
    const wrap = connWrapRef.current;
    const path = connPathRef.current;
    if (!wrap || !path) return;

    const wr = wrap.getBoundingClientRect();
    const pts = [0, 1, 2, 3].map((i) => {
      const card = document.getElementById("pc" + i);
      if (!card) return { x: 0, y: 0 };
      const cr = card.getBoundingClientRect();
      return { x: cr.left - wr.left + cr.width / 2, y: wr.height / 2 };
    });

    let d = `M${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < 3; i++) {
      const cx = (pts[i].x + pts[i + 1].x) / 2;
      d += ` C${cx} ${pts[i].y} ${cx} ${pts[i + 1].y} ${pts[i + 1].x} ${pts[i + 1].y}`;
    }

    path.setAttribute("d", d);
    const len = path.getTotalLength();
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = String(len);

    pts.forEach((p, i) => {
      const node = document.getElementById("cn" + i);
      if (node) {
        node.style.left = p.x + "px";
        node.style.top = p.y + "px";
      }
    });
  };

  useEffect(() => {
    // Run observer to trigger connector drawing
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            calculateProcessConn();
            const path = connPathRef.current;
            if (path) {
              path.classList.add("drawn");
              setTimeout(() => {
                path.style.strokeDashoffset = "0";
              }, 100);
            }
          }, 200);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("process");
    if (section) observer.observe(section);

    window.addEventListener("resize", calculateProcessConn, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", calculateProcessConn);
    };
  }, []);

  // Process Card Auto cycle
  useEffect(() => {
    if (flippedCard !== null) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3200);

    return () => clearInterval(interval);
  }, [flippedCard]);



  // 8. Numbers Clock Timer
  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setCurrentTime(`${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // 9. Numbers intersection triggers counter animations
  useEffect(() => {
    let numAnimated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !numAnimated) {
          numAnimated = true;

          // Animate counters
          const start = performance.now();
          const dur = 1600;

          const runCounts = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const easeVal = cubic(p);
            // Counter targets mapping
            setNumberCounters([
              Math.round(easeVal * 54),  // Total Projects
              Math.round(easeVal * 98),  // CSAT Score
              Math.round(easeVal * 97),  // On-time rate
              Math.round(easeVal * 24),  // Team Size
              Math.round(easeVal * 6),   // Years Founded
              Math.round(easeVal * 8),   // Active Projects in Flight
              Math.round(easeVal * 99)   // Accessibility
            ]);
            setLighthouseVal(Math.round(easeVal * 94));
            if (p < 1) requestAnimationFrame(runCounts);
          };
          requestAnimationFrame(runCounts);

          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("numbers");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Live Projects in Flight state updater (updates randomly every 6.5s)
  useEffect(() => {
    const pcs = ["eng", "des", "qua"];
    let tp = 0;

    const interval = setInterval(() => {
      setTickerProjects((prev) => {
        const next = [...prev];
        const index = tp % next.length;
        const phaseIndex = Math.floor(Math.random() * 3);
        next[index] = {
          ...next[index],
          p: pcs[phaseIndex]
        };
        tp++;
        return next;
      });
    }, 6500);

    return () => clearInterval(interval);
  }, []);

  // 10. Tech Stack filter helper
  const handleTechFilter = (cat: string) => {
    setTechFilter(cat);
  };



  const goStory = (idx: number) => {
    setStoryIndex(idx);
    setAutoplayEnabled(false);
  };

  useEffect(() => {
    if (flippedCard !== null) {
      const detail = document.getElementById("procDetail");
      if (detail) {
        setTimeout(() => {
          detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 120);
      }
    }
  }, [flippedCard]);

  const handleFlipCard = (i: number) => {
    if (flippedCard === i) {
      setFlippedCard(null);
    } else {
      setFlippedCard(i);
      setActiveStep(i);
    }
  };

  const handleCloseCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedCard(null);
  };

  return (
    <div className="about-page-wrap relative w-full overflow-x-hidden">
      <Navbar />

      {/* Progress Scroll Indicator */}
      <div id="pgbar" style={{ transform: `scaleX(${scrollProgress})` }} />

      {/* BACKGROUND DECORATIONS */}
      <div id="hero-wrap" style={{ position: "relative", background: "var(--bg)", overflow: "hidden" }}>
        <canvas id="hero-canvas" ref={heroCanvasRef} aria-hidden="true" />
        <div className="hero-glow" />

        {/* HERO SECTION */}
        <section id="hero">
          <div className="hero-left">
            <div id="rv-hero-badge" data-rv className={getRvClass("rv-hero-badge", "rv", "hero-badge")}>
              <div className="badge-pulse">🌐</div>About HanuxTech
            </div>
            <h1 className="hero-h1">
              <span className={`word ${heroH1Visible ? "vis" : ""}`} style={{ transitionDelay: "400ms" }}>We</span>{" "}
              <span className={`word ${heroH1Visible ? "vis" : ""}`} style={{ transitionDelay: "540ms" }}>Build</span>{" "}
              <span className={`word acc ${heroH1Visible ? "vis" : ""}`} style={{ transitionDelay: "680ms" }}>Software</span>{" "}
              <span className={`word ${heroH1Visible ? "vis" : ""}`} style={{ transitionDelay: "820ms" }}>That</span>{" "}
              <span className={`word ${heroH1Visible ? "vis" : ""}`} style={{ transitionDelay: "960ms" }}>Scales.</span>
            </h1>
            <p className="hero-sub">
              <span>{typewriterText}</span>
              <span className="tw-cursor" />
            </p>
            <div className={`hero-ctas ${ctasVisible ? "vis" : ""}`}>
              <a href="#process" className="btn-fill">
                See How We Work
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="/projects" className="btn-ghost">Start a Project</a>
            </div>
            <div className={`hero-stats ${statsVisible ? "vis" : ""}`}>
              <div>
                <div className="hstat-num">
                  <b>{statsCounters[0]}</b>+
                </div>
                <div className="hstat-lbl">Projects<br />Shipped</div>
              </div>
              <div>
                <div className="hstat-num">
                  <b>{statsCounters[1]}</b>%
                </div>
                <div className="hstat-lbl">Client<br />Satisfaction</div>
              </div>
              <div>
                <div className="hstat-num">
                  <b>{statsCounters[2]}</b>
                </div>
                <div className="hstat-lbl">Senior<br />Engineers</div>
              </div>
              <div>
                <div className="hstat-num">
                  <b>{statsCounters[3]}</b>yr
                </div>
                <div className="hstat-lbl">Industry<br />Experience</div>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="fc fc-a">
              <span className="fc-ic">⚡</span>
              <div>
                <div>Build deployed</div>
                <div className="fc-sub">2 min ago · Zero downtime</div>
              </div>
            </div>
            <div className="fc fc-b">
              <span className="fc-ic">📈</span>
              <div>
                <div>Lighthouse: 97</div>
                <div className="fc-sub">Performance audit passed</div>
              </div>
            </div>
            <div className={`hero-card ${cardVisible ? "vis" : ""}`}>
              <div className="card-dots">
                <span />
                <span />
                <span />
              </div>
              <div className="code-block">
                <div><span className="cm">// HanuxTech — NestJS API Gateway</span></div>
                <div><span className="kw">@Controller</span>(<span className="str">'api/v2'</span>)</div>
                <div><span className="kw">export class</span> <span className="fn">AppController</span> {"{"}</div>
                <div>&nbsp;&nbsp;<span className="kw">@Get</span>(<span className="str">'health'</span>)</div>
                <div>&nbsp;&nbsp;<span className="fn">getHealth</span>() {"{"}</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">return</span> {"{"} status: <span className="str">'✅ live'</span>, uptime: <span className="str">'99.99%'</span> {"}"};</div>
                <div>&nbsp;&nbsp;{"}"}</div>
                <div>{"}"}</div>
              </div>
              <div className="card-metrics">
                <div className="cm-box">
                  <div className="cm-val g">99.9%</div>
                  <div className="cm-lbl">Uptime</div>
                </div>
                <div className="cm-box">
                  <div className="cm-val b">&lt;42ms</div>
                  <div className="cm-lbl">Latency</div>
                </div>
                <div className="cm-box">
                  <div className="cm-val">SSR</div>
                  <div className="cm-lbl">Architecture</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* § 2 STORY SECTION */}
      <section id="story">
        <div id="rv-story-head" data-rv className={getRvClass("rv-story-head", "rv", "story-head s-inner")}>
          <div className="eyebrow">Our Story</div>
          <h2 className="st">Six years. <em>Every sprint counted.</em></h2>
        </div>
        <div className="story-pin-wrap">
          <div className="story-track" style={{ transform: `translateX(-${storyIndex * 25}%)`, transition: "transform .7s cubic-bezier(.16,1,.3,1)" }}>
            <div className="story-panel">
              <div className="sp-year">2018</div>
              <div className="sp-content">
                <div className="sp-tag"><div className="sp-tag-bar" />Founded</div>
                <h3 className="sp-h">Three engineers,<br /><em>one shared desk.</em></h3>
                <p className="sp-p">HanuxTech started in a co-working space in Pune — three senior engineers who were tired of seeing good product ideas die in bad code. First client signed within 8 days.</p>
                <div className="sp-stat">
                  <span className="sp-stat-num">1</span>
                  <span className="sp-stat-lbl">founding client</span>
                </div>
              </div>
            </div>
            <div className="story-panel">
              <div className="sp-year">2020</div>
              <div className="sp-content">
                <div className="sp-tag"><div className="sp-tag-bar" />First Scale</div>
                <h3 className="sp-h">Remote-first before<br /><em>it was necessary.</em></h3>
                <p className="sp-p">COVID forced every studio online. We'd been async-first since day one — so while others scrambled, we scaled. Team grew to 12 across India, UAE, and the UK.</p>
                <div className="sp-stat">
                  <span className="sp-stat-num">12</span>
                  <span className="sp-stat-lbl">team members</span>
                </div>
              </div>
            </div>
            <div className="story-panel">
              <div className="sp-year">2022</div>
              <div className="sp-content">
                <div className="sp-tag"><div className="sp-tag-bar" />Product Milestone</div>
                <h3 className="sp-h">500K sessions,<br /><em>zero downtime.</em></h3>
                <p className="sp-p">Our biggest challenge: rebuild a legacy Java fintech portal while keeping it live for 500,000 active users. We did it — 14 weeks, blue-green deploy, not one incident ticket.</p>
                <div className="sp-stat">
                  <span className="sp-stat-num">500K</span>
                  <span className="sp-stat-lbl">concurrent users handled</span>
                </div>
              </div>
            </div>
            <div className="story-panel">
              <div className="sp-year">2024</div>
              <div className="sp-content">
                <div className="sp-tag"><div className="sp-tag-bar" />Today</div>
                <h3 className="sp-h">54 products.<br /><em>73% return clients.</em></h3>
                <p className="sp-p">We don't chase volume. We choose projects where we can own the outcome end-to-end. 24 senior engineers, a 98% CSAT score, and a sprint that opens every 14 days.</p>
                <div className="sp-stat">
                  <span className="sp-stat-num">54</span>
                  <span className="sp-stat-lbl">products shipped</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="s-inner" style={{ paddingTop: 0 }}>
          <div className="story-prog">
            <div className="story-prog-fill" style={{ width: `${((storyIndex + 1) / 4) * 100}%` }} />
          </div>
          <div className="story-nav">
            {[0, 1, 2, 3].map((idx) => (
              <button
                key={idx}
                className={`story-dot ${storyIndex === idx ? "on" : ""}`}
                onClick={() => goStory(idx)}
                aria-label={String(2018 + idx * 2)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* § 3 PROCESS SECTION */}
      <section id="process" style={{ overflow: "hidden" }}>
        <div id="rv-process-head" data-rv className={getRvClass("rv-process-head", "rv", "process-head")}>
          <div>
            <div className="eyebrow">How We Work</div>
            <h2 className="st">Built for <em>zero surprises.</em></h2>
          </div>
          <p className="sdesc">Our 4-phase framework ships working software every two weeks. Click any phase to see exactly what you receive.</p>
        </div>
        <div className="conn-wrap" style={{ position: "relative" }} ref={connWrapRef}>
          <div className={`cn-node ${activeStep >= 0 ? "on" : ""}`} id="cn0" />
          <div className={`cn-node ${activeStep >= 1 ? "on" : ""}`} id="cn1" />
          <div className={`cn-node ${activeStep >= 2 ? "on" : ""}`} id="cn2" />
          <div className={`cn-node ${activeStep >= 3 ? "on" : ""}`} id="cn3" />
          <svg id="conn-svg" aria-hidden="true">
            <defs>
              <linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e4fd8" />
                <stop offset="100%" stopColor="#0ea68c" />
              </linearGradient>
            </defs>
            <path id="conn-path" ref={connPathRef} d="" />
          </svg>
        </div>
        <div className="process-cards">
          {PROCESS_STEPS.map((ps, idx) => (
            <div
              key={idx}
              id={`pc${idx}`}
              data-rv
              className={getRvClass(`pc${idx}`, "rv", `pc ${flippedCard === idx ? "flip" : ""} ${activeStep === idx ? "active" : ""}`)}
              onClick={() => handleFlipCard(idx)}
              tabIndex={0}
              role="button"
              data-cursor="text"
              data-cursor-text="FLIP"
            >
              <div className="pc-inner">
                <div className="pc-front">
                  <div className="pc-top-bar" />
                  <div className="pc-step">{ps.step}</div>
                  <div className="pc-icon">{ps.icon}</div>
                  <div className="pc-title">{ps.title}</div>
                  <div className="pc-desc">{ps.desc}</div>
                  <div className="pc-dur">⏱ {ps.dur}</div>
                  <div className="pc-hint">↕ Click to flip</div>
                </div>
                <div className="pc-back">
                  <button className="pc-close" onClick={(e) => handleCloseCard(e)}>✕</button>
                  <div className="pb-lbl">What you get</div>
                  <div className="pb-title">{ps.pbTitle}</div>
                  <ul className="pb-items">
                    {ps.items.map((item, idy) => (
                      <li key={idy}>{item}</li>
                    ))}
                  </ul>
                  <div className="pb-week">
                    <div className="pb-wdot" />
                    {ps.dur} · Review cycles
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`proc-detail ${flippedCard !== null ? "open" : ""}`}>
          <div className="pd-inner">
            {flippedCard !== null &&
              PDATA[flippedCard].cols.map((col, idx) => (
                <div key={idx}>
                  <div className="pd-col-title">{col.t}</div>
                  <ul className="pd-list">
                    {col.items.map((it, idy) => (
                      <li key={idy}>{it}</li>
                    ))}
                  </ul>
                  {col.wk && <div className="pd-badge">⏱ {col.wk}</div>}
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* § 2 LEADERSHIP */}
      <section id="story">
        <div id="rv-story-head" data-rv className={getRvClass("rv-story-head", "rv", "story-head")}>
          <div className="eyebrow">Leadership</div>
          <h2 className="st">Built by people, <em>not by process.</em></h2>
        </div>

        <div className="lead-wrap">
          {/* CEO SPOTLIGHT CARD */}
          <div id="rv-ceo-card" data-rv className={getRvClass("rv-ceo-card", "rv", "ceo-card")}>
            <div className="ceo-quote-mark">"</div>
            <div className="ceo-photo-wrap">
              <div className="ceo-photo-ring" />
              <div className="ceo-photo" style={{ background: "linear-gradient(135deg,#1e4fd8,#3b7bf5)" }}>RS</div>
            </div>
            <div className="ceo-body">
              <div className="ceo-eyebrow">
                <div className="ceo-eyebrow-bar" />
                Founder & CEO
              </div>
              <p className="ceo-quote">"We never set out to be the biggest studio — just the one clients trust with the project that actually matters to them."</p>
              <div className="ceo-name-row">
                <span className="ceo-name">Rahul Sharma</span>
                <span className="ceo-title-pill">Founder & CEO</span>
              </div>
              <div className="ceo-sub">7 years building enterprise platforms · Led architecture for three unicorn-stage startups</div>
            </div>
          </div>

          {/* TWO LEADERSHIP FLIP CARDS */}
          <div className="lead-row">
            {LEADERSHIP.map((lead, idx) => {
              const isFlipped = flippedLeadCard === lead.i;
              return (
                <div
                  key={idx}
                  id={`rv-lc-${lead.i}`}
                  data-rv
                  className={getRvClass(`rv-lc-${lead.i}`, "rv", `lc ${isFlipped ? "flipped" : ""}`)}
                  onClick={() => handleFlipLeadCard(lead.i)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleFlipLeadCard(lead.i);
                    }
                    if (e.key === 'Escape') {
                      handleFlipLeadCard(lead.i, false);
                    }
                  }}
                >
                  <div className="lc-inner">
                    {/* Front Face */}
                    <div className="lc-face lc-front">
                      <div className="lc-front-avatar" style={{ background: lead.gradient }}>
                        {lead.initials}
                      </div>
                      <div className="lc-front-body">
                        <div className="lc-front-name">{lead.name}</div>
                        <div className="lc-front-role">{lead.role}</div>
                        <div className="lc-front-line">{lead.shortLine}</div>
                      </div>
                      <div className="lc-flip-hint">
                        <svg viewBox="0 0 14 14" fill="none">
                          <path d="M11 5.5A4.5 4.5 0 1 1 6.5 1M11 1v3.5H7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>

                    {/* Back Face */}
                    <div className="lc-face lc-back">
                      <button
                        className="lc-back-close"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFlipLeadCard(lead.i, false);
                        }}
                        aria-label="Close"
                      >
                        ✕
                      </button>
                      <div className="lcb-top">
                        <div className="lcb-avatar" style={{ background: lead.gradient }}>
                          {lead.initials}
                        </div>
                        <div>
                          <div className="lcb-name">{lead.name}</div>
                          <div className="lcb-role">{lead.role}</div>
                        </div>
                      </div>
                      <div className="lcb-bio">{lead.bio}</div>
                      <div className="lcb-tags">
                        {lead.tags.map((tag, idy) => (
                          <span className="lcb-tag" key={idy}>{tag}</span>
                        ))}
                      </div>
                      <div className="lcb-stat">
                        <span className="lcb-stat-dot" />
                        {lead.statText}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* § 5 NUMBERS SECTION */}
      <section id="numbers">
        <div id="rv-numbers-head" data-rv className={getRvClass("rv-numbers-head", "rv", "numbers-head")}>
          <div>
            <div className="eyebrow">By the Numbers</div>
            <h2 className="st">Real output. <em>Measured, not estimated.</em></h2>
          </div>
          <div className="num-status">
            <div className="led" />All systems operational
            <span className="num-clock">{currentTime}</span>
          </div>
        </div>
        <div className="num-grid">
          <div id="rv-nt-1" data-rv className={getRvClass("rv-nt-1", "rv", "nt nb nt-1")}>
            <div className="nt-ey">Total delivered</div>
            <div className="nt-numrow">
              <span className="nt-num">{numberCounters[0]}</span>
              <span className="nt-suf"> projects</span>
            </div>
            <div className="nt-lbl">Products Shipped</div>
            <div className="nt-desc">Across fintech, edtech, healthtech, SaaS and enterprise since 2018.</div>
            <div className="bar-g">
              <div className="brow">
                <span className="brow-lbl">SaaS</span>
                <div className="btrack">
                  <div className="bfill" style={{ background: "linear-gradient(90deg,var(--blue),var(--blue2))", width: `${numberCounters[0] ? 78 : 0}%` }} />
                </div>
                <span className="brow-val">78%</span>
              </div>
              <div className="brow">
                <span className="brow-lbl">Avg studio</span>
                <div className="btrack">
                  <div className="bfill" style={{ background: "#dde4f7", width: `${numberCounters[0] ? 45 : 0}%` }} />
                </div>
                <span className="brow-val">45%</span>
              </div>
              <div className="brow">
                <span className="brow-lbl">Mobile</span>
                <div className="btrack">
                  <div className="bfill" style={{ background: "linear-gradient(90deg,var(--blue),var(--blue2))", width: `${numberCounters[0] ? 55 : 0}%` }} />
                </div>
                <span className="brow-val">55%</span>
              </div>
            </div>
          </div>

          <div id="rv-nt-2" data-rv className={getRvClass("rv-nt-2", "rv", "nt ng nt-2")}>
            <div className="nt-ey">CSAT score</div>
            <div className="nt-numrow">
              <span className="nt-num">{numberCounters[1]}</span>
              <span className="nt-suf">%</span>
            </div>
            <div className="nt-lbl">Client Satisfaction</div>
            <div className="nt-desc">Post-project NPS survey across all engagements since 2021.</div>
            <div className="bar-g">
              <div className="brow">
                <span className="brow-lbl">HanuxTech</span>
                <div className="btrack">
                  <div className="bfill" style={{ background: "linear-gradient(90deg,var(--teal),#34d399)", width: `${numberCounters[1] ? 98 : 0}%` }} />
                </div>
                <span className="brow-val">98%</span>
              </div>
              <div className="brow">
                <span className="brow-lbl">Top quartile</span>
                <div className="btrack">
                  <div className="bfill" style={{ background: "#dde4f7", width: `${numberCounters[1] ? 82 : 0}%` }} />
                </div>
                <span className="brow-val">82%</span>
              </div>
              <div className="brow">
                <span className="brow-lbl">Industry avg</span>
                <div className="btrack">
                  <div className="bfill" style={{ background: "#f0e8d8", width: `${numberCounters[1] ? 67 : 0}%` }} />
                </div>
                <span className="brow-val">67%</span>
              </div>
            </div>
          </div>

          <div id="rv-nt-3" data-rv className={getRvClass("rv-nt-3", "rv", "nt na nt-3")}>
            <div className="nt-ey">Performance</div>
            <div className="nt-lbl" style={{ marginBottom: ".65rem" }}>Quality Scores</div>
            <div className="rad-wrap">
              <svg width="92" height="92" viewBox="0 0 92 92" aria-hidden="true" style={{ flexShrink: 0 }}>
                <circle className="rad-r-track" cx="46" cy="46" r="40" />
                <circle
                  className="rad-r-fill"
                  cx="46"
                  cy="46"
                  r="40"
                  stroke="url(#rg)"
                  id="radC"
                  transform="rotate(-90 46 46)"
                  style={{ strokeDashoffset: 2 * Math.PI * 40 - (lighthouseVal / 100) * 2 * Math.PI * 40, strokeDasharray: 2 * Math.PI * 40 }}
                />
                <defs>
                  <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>
                </defs>
                <text x="46" y="42" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="15" fontWeight="600" fill="#0d1b3e" id="radT">
                  {lighthouseVal}
                </text>
                <text x="46" y="54" textAnchor="middle" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="6.5" fontWeight="700" fill="#9baecf" letterSpacing="1">
                  LIGHTHOUSE
                </text>
              </svg>
              <div className="rad-stats">
                <div className="ris">
                  <div className="ris-num" style={{ color: "var(--teal)" }}>{numberCounters[6] ? 99 : 0}</div>
                  <div className="ris-lbl">Accessibility</div>
                </div>
                <div className="ris">
                  <div className="ris-num" style={{ color: "var(--blue)" }}>{numberCounters[6] ? 96 : 0}</div>
                  <div className="ris-lbl">Best Practices</div>
                </div>
                <div className="ris">
                  <div className="ris-num" style={{ color: "var(--violet)" }}>{numberCounters[6] ? 100 : 0}</div>
                  <div className="ris-lbl">SEO</div>
                </div>
              </div>
            </div>
          </div>

          <div id="rv-nt-4" data-rv className={getRvClass("rv-nt-4", "rv", "nt nb nt-4")}>
            <div className="nt-ey">On-time rate</div>
            <div className="nt-numrow">
              <span className="nt-num">{numberCounters[2]}</span>
              <span className="nt-suf">%</span>
            </div>
            <div className="nt-lbl">On-Time Delivery</div>
            <div className="nt-desc">52 of 54 projects launched on the original agreed date.</div>
            <div className="bar-g" style={{ marginTop: ".75rem" }}>
              <div className="brow">
                <span className="brow-lbl">HanuxTech</span>
                <div className="btrack">
                  <div className="bfill" style={{ background: "linear-gradient(90deg,var(--blue),var(--blue2))", width: `${numberCounters[2] ? 97 : 0}%` }} />
                </div>
                <span className="brow-val">97%</span>
              </div>
              <div className="brow">
                <span className="brow-lbl">Industry</span>
                <div className="btrack">
                  <div className="bfill" style={{ background: "#dde4f7", width: `${numberCounters[2] ? 58 : 0}%` }} />
                </div>
                <span className="brow-val">58%</span>
              </div>
            </div>
          </div>

          <div id="rv-nt-5" data-rv className={getRvClass("rv-nt-5", "rv", "nt nv nt-5")}>
            <div className="nt-ey">Team size</div>
            <div className="nt-numrow">
              <span className="nt-num">{numberCounters[3]}</span>
              <span className="nt-suf"> eng</span>
            </div>
            <div className="nt-lbl">Senior Engineers</div>
            <div className="nt-desc">Avg 7yr XP. No juniors on client builds.</div>
            <div className="bar-g" style={{ marginTop: ".75rem" }}>
              <div className="brow">
                <span className="brow-lbl">Full-stack</span>
                <div className="btrack">
                  <div className="bfill" style={{ background: "linear-gradient(90deg,var(--violet),#a78bfa)", width: `${numberCounters[3] ? 71 : 0}%` }} />
                </div>
                <span className="brow-val">71%</span>
              </div>
              <div className="brow">
                <span className="brow-lbl">DevOps/AI</span>
                <div className="btrack">
                  <div className="bfill" style={{ background: "linear-gradient(90deg,var(--violet),#a78bfa)", width: `${numberCounters[3] ? 29 : 0}%` }} />
                </div>
                <span className="brow-val">29%</span>
              </div>
            </div>
          </div>

          <div id="rv-nt-6" data-rv className={getRvClass("rv-nt-6", "rv", "nt nt-6")}>
            <div className="nt-ey">Founded</div>
            <div className="nt-numrow">
              <span className="nt-num">{numberCounters[4]}</span>
              <span className="nt-suf"> years</span>
            </div>
            <div className="nt-lbl">In the Industry</div>
            <div className="nt-desc">Revenue up every year since 2018.</div>
            <div className="spark" id="sparkChart">
              {[18, 28, 40, 56, 76, 100].map((h, i) => (
                <div
                  key={i}
                  className={`spark-b ${i === 5 ? "on" : ""}`}
                  style={{ height: `${numberCounters[4] ? h : 5}%`, transition: "height .9s cubic-bezier(.16,1,.3,1),background .3s" }}
                />
              ))}
            </div>
            <div className="spark-lbls">
              <span>19</span>
              <span>20</span>
              <span>21</span>
              <span>22</span>
              <span>23</span>
              <span>24</span>
            </div>
          </div>

          <div id="rv-nt-7" data-rv className={getRvClass("rv-nt-7", "rv", "nt ng nt-7")} style={{ position: "relative" }}>
            <div className="live-badge">
              <div className="live-dot" />Live
            </div>
            <div className="nt-ey">Right now</div>
            <div className="nt-numrow">
              <span className="nt-num">{numberCounters[5]}</span>
              <span className="nt-suf"> active</span>
            </div>
            <div className="nt-lbl">Projects In Flight</div>
            <div className="ticker">
              {tickerProjects.map((p, idx) => {
                const labels: Record<string, string> = { eng: "Engineering", des: "Design", qua: "QA & Launch" };
                const colors: Record<string, string> = { eng: "#1e4fd8", des: "#7c3aed", qua: "#0ea68c" };
                return (
                  <div className="tick-row" key={idx}>
                    <div className="tick-dot" style={{ backgroundColor: colors[p.p] }} />
                    <span>{p.n}</span>
                    <span className={`tick-phase tp-${p.p}`}>{labels[p.p]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* § 6 TECH STACK SECTION */}
      <section id="stack">
        <div id="rv-stack-head" data-rv className={getRvClass("rv-stack-head", "rv", "stack-head")}>
          <div className="eyebrow">Tech Stack</div>
          <h2 className="st">Tools we <em>actually ship with.</em></h2>
          <div className="stack-filter">
            <button className={`sf ${techFilter === "all" ? "on" : ""}`} onClick={() => handleTechFilter("all")}>All</button>
            <button className={`sf ${techFilter === "frontend" ? "on" : ""}`} onClick={() => handleTechFilter("frontend")}>Frontend</button>
            <button className={`sf ${techFilter === "backend" ? "on" : ""}`} onClick={() => handleTechFilter("backend")}>Backend</button>
            <button className={`sf ${techFilter === "devops" ? "on" : ""}`} onClick={() => handleTechFilter("devops")}>DevOps</button>
            <button className={`sf ${techFilter === "ai" ? "on" : ""}`} onClick={() => handleTechFilter("ai")}>AI / ML</button>
          </div>
        </div>
        <div id="rv-mq-1" data-rv className={getRvClass("rv-mq-1", "rv", "marquee-outer")}>
          <div className="marquee-fade-l" />
          <div className="marquee-fade-r" />
          <div className="marquee-track">
            {[...TECHS, ...TECHS].map((tech, idx) => {
              const dim = techFilter !== "all" && tech.cat !== techFilter;
              const hi = techFilter !== "all" && tech.cat === techFilter;
              return (
                <div key={idx} className={`tech-chip ${dim ? "dim" : ""} ${hi ? "hi" : ""}`}>
                  <TechIcon name={tech.n} />
                  <span>{tech.n}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div id="rv-mq-2" data-rv className={getRvClass("rv-mq-2", "rv", "marquee-outer")}>
          <div className="marquee-fade-l" />
          <div className="marquee-fade-r" />
          <div className="marquee-track rev">
            {[...TECHS, ...TECHS].reverse().map((tech, idx) => {
              const dim = techFilter !== "all" && tech.cat !== techFilter;
              const hi = techFilter !== "all" && tech.cat === techFilter;
              return (
                <div key={idx} className={`tech-chip ${dim ? "dim" : ""} ${hi ? "hi" : ""}`}>
                  <TechIcon name={tech.n} />
                  <span>{tech.n}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      <Footer />
    </div>
  );
};

export default About;
