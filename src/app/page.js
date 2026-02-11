"use client";
import React, { useState, useEffect, forwardRef, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa6";

import {
  Github,
  ArrowUpRight,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Sparkles,
  FolderGit2,
  Rocket,
  Menu,
  X,
  Briefcase,
  GraduationCap,
  Eye,
} from "lucide-react";
import Image from "next/image";

// =============================
// Accents (palette)
// =============================
const ACCENTS = {
  orange: {
    name: "Orange",
    primary: "#F24D1B",
    gradient: "linear-gradient(135deg, #f35933 0%, #F24D1B 50%, #e64a19 100%)",
  },
  cyan: {
    name: "Cyan",
    primary: "#06B6D4",
    gradient: "linear-gradient(135deg, #0abfdb 0%, #06B6D4 50%, #06acc1 100%)",
  },
  red: {
    name: "Red",
    primary: "#F03746",
    gradient: "linear-gradient(135deg, #f14b58 0%, #F03746 50%, #e33341 100%)",
  },
  violet: {
    name: "Violet",
    primary: "#8531DE",
    gradient: "linear-gradient(135deg, #9146e1 0%, #8531DE 50%, #7a2dd2 100%)",
  },
};
// Make UIButton polymorphic
const UIButton = forwardRef(function UIButton(
  { as: Tag = "button", className = "", children, ...props },
  ref,
) {
  return (
    <Tag
      ref={ref}
      className={
        "inline-flex items-center justify-center rounded-[12px] border-2 border-black px-4 py-2 font-bold tracking-wide " +
        "shadow-[4px_4px_0_0_#000] transition-all duration-200 " +
        "hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#000] active:translate-y-0 active:shadow-[2px_2px_0_0_#000] " +
        className
      }
      {...props}
    >
      {children}
    </Tag>
  );
});

// =============================
// MagneticButton – hover tilt/drag
// =============================
const MagneticButton = ({
  children,
  className = "",
  as = UIButton,
  ...props
}) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      setPos({ x: relX * 0.25, y: relY * 0.25 });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const Comp = as;
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="inline-block"
      style={{ perspective: 600 }}
    >
      <motion.div
        animate={{
          x: hover ? pos.x : 0,
          y: hover ? pos.y : 0,
          rotateX: hover ? -pos.y * 0.05 : 0,
          rotateY: hover ? pos.x * 0.05 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.4 }}
      >
        <Comp
          className={"group select-none active:scale-[0.98] " + className}
          {...props}
        >
          <span className="inline-flex items-center gap-2">
            {children}
            <ArrowUpRight className="size-4 -mr-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </Comp>
      </motion.div>
    </div>
  );
};

// --- Minimal UI shims so it runs on Canvas & plain Vite ---
function cx(...cls) {
  return cls.filter(Boolean).join(" ");
}
const Card = ({ className = "", children }) => (
  <div
    className={cx(
      "rounded-2xl border border-white/10 bg-white/[0.04]",
      className,
    )}
  >
    {children}
  </div>
);
const CardContent = ({ className = "", children }) => (
  <div className={className}>{children}</div>
);
const Button = ({ className = "", children, asChild, ...props }) => (
  <button className={cx("px-4 py-2 font-semibold", className)} {...props}>
    {children}
  </button>
);
// ---------------------------------------------------------

// =============================
// 🎭 Postmodern Theme + Smooth Animations
// =============================
const THEME = {
  primary: "#F97316", // Orange-500
  gradient:
    "linear-gradient(135deg, #22D3EE 0%, #F472B6 45%, #A78BFA 70%, #34D399 100%)",
  paper: "#0b0b0b",
};

const LINKS = {
  email: "mailto:reevu1214@gmail.com",
  github: "https://github.com/Reevu01",
  linkedin: "https://linkedin.com/in/sifat-islam/",
  art: "https://www.instagram.com/_.revart._/", // Art portfolio link from resume
  resume: "resume.pdf", // When running locally, place the PDF in /public
  phone: "tel:+14697507728",
  photo: "photo.jpg",
  profile: "profile.jpg",
  back: "back.jpg",
  fin: "/finsight.png",
  hydra: "/hydrawatch.png",
  game: "/game.png",
  expert: "/Expert.jpg", // watch filename case!
  weather: "/weather.png",
  medsplit: "/medsplit.png",
};

// Sanitize any user/dynamic text so JSX never sees raw angle brackets
const sanitizeText = (v) =>
  String(v ?? "").replace(/[<>]/g, (m) => (m === "<" ? "‹" : "›"));

const NAV = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const PROJECTS = [
  {
    title: "MedSplit",
    date: "Sep 2025",
    blurb:
      "Healthcare marketplace that pools med demand, enables doctor-verified donations, and routes micro-grants to lower medication costs and waste.",
    impact:
      "Optimistic UI/event bus, domain-modeled REST APIs; secure uploads & server-validated checkout.",
    stack: ["Next.js", "Flask", "TypeScript", "TailwindCSS", "GEMINI API"],
    url: "https://devpost.com/software/baubau?ref_content=user-portfolio&ref_feature=in_progress", // TODO: add Devpost link
    repo: "https://github.com/Aproteem/MedSplit",
    image: LINKS.medsplit,
    featured: true,
  },
  {
    title: "FinSight AI",
    date: "Apr 2025",
    blurb:
      "AI-powered web app to upload and query annual financial reports with conversational summaries and insights with a custom PDF parser.",
    impact: "",
    stack: [
      "Next.js",
      "LangChain",
      "LlamaIndex",
      "Unstructured.io",
      "OpenAI API",
      "Flask",
      "MongoDB",
    ],
    url: "https://devpost.com/software/finsight-ai-4gl82u",
    repo: "https://github.com/Reevu01/FinSight-AI",
    image: LINKS.fin,
  },
  {
    title: "HydraWatch",
    date: "Nov 2024 (HackUTD)",
    blurb:
      "Deployable web app for EOG Resources with ML model + Flask APIs to detect and visualize hydrate formation in gas pipelines.",
    impact: "",
    stack: [
      "Flask",
      "Next.js",
      "TailwindCSS",
      "SQLAlchemy",
      "Framer Motion",
      "Google Colab",
      "ML",
    ],
    url: "https://devpost.com/software/lorem-ipsum-zxuv8p",
    repo: "https://github.com/Reevu01/Hydra-Watch",
    image: LINKS.hydra,
  },
  {
    title: "Game Vault",
    date: "Sep 2024",
    blurb:
      "Full‑stack personal game library: catalog games, purchase sources, playtime & completion; Flask REST APIs consumed by Next.js.",
    impact:
      "Optimized CRUD for reliable handling of library entries with CORS between services.",
    stack: ["Next.js", "Flask", "MongoDB", "TailwindCSS", "Node.js", "Python"],
    url: "#",
    repo: "https://github.com/Reevu01",
    image: LINKS.game,
  },
  {
    title: "Expert Events",
    date: "Feb–Apr 2024",
    blurb:
      "Android app to host & connect campus events; AI chatbot gives personalized recommendations from user history.",
    impact:
      "Served 50+ orgs to 30k+ students; 90% accuracy on personalized suggestions; 50% more efficient data storage.",
    stack: ["Flutter", "Dart", "Firebase", "Firestore", "OpenAI API"],
    url: "https://www.youtube.com/watch?v=oVCbcvjFm3I",
    repo: "https://github.com/acm-projects/ExpertEvents",
    image: LINKS.expert,
  },
  {
    title: "Weatherit",
    date: "Sep 2024",
    blurb:
      "Engineered a Flask-based web app to provide real-time weather updates, integrating Google Maps Geolocation and Open Metro's Weather API.",
    impact: "",
    stack: [
      "Flask",
      "Python",
      "HTML",
      "CSS",
      "Javascript",
      "Google Maps API",
      "Open Metro API",
    ],
    url: "https://github.com/Reevu01/Weatherit",
    repo: "https://github.com/Reevu01/Weatherit", // Assuming no repo link was provided
    image: LINKS.weather, // Assuming a corresponding image link
  },
];

const SKILLS = [
  // Languages
  "Java",
  "Python",
  "C++",
  "C",
  "C#",
  "Assembly (MASM)",
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "Dart",
  "SQL",
  // Frameworks & Libraries
  "React",
  "Next.js",
  "Node.js",
  "Flask",
  "Flutter",
  "Firebase",
  "Firestore",
  "MongoDB",
  "SQLAlchemy",
  "Framer Motion",
  "shadcn/ui",
  // Tools & Platforms
  "VS Code",
  "Eclipse",
  "Xcode",
  "Unity",
  "PyTorch",
  "Docker",
  "Git/GitHub",
  "Google Colab",
  "Linux",
  "Postman",
  // AI/LLM
  "LangChain",
  "LlamaIndex",
  "Unstructured.io",
];

const EXPERIENCE = [
  {
    role: "Software Engineering Co-op (Embedded Linux)",
    org: "Adtran",
    date: "Jan 2026 – April 2026",
    bullets: [
      "Selected as an upcoming Co-op student to work at Adtran.",
      "Will work on full-stack development, cloud, and scalable solutions in a collaborative engineering environment.",
      "Developing and debugging C++ software for an embedded Linux–based Ethernet network demarcation device drivers.",
      "Implemented and validated APL layer port-speed handling and traffic-control rules for carrier-grade Layer-2 networking on Linux.",
    ],
    url: "https://www.adtran.com/en",
  },
  {
    role: "Student Support Analyst",
    org: "UT Dallas – Office of Information Technology",
    date: "Jan 2025 – Dec 2025",
    bullets: [
      "Provide quality technical support across phone, email, chat, remote tools, and in‑person at the Technology Bar.",
      "Troubleshoot approved technologies and document tickets thoroughly for accurate follow‑up.",
    ],
    url: "https://oit.utdallas.edu",
  },
  {
    role: "eLearning Recording Studio Assistant",
    org: "UT Dallas – Learning Technologies",
    date: "Jan 2024 – Aug 2024",
    bullets: [
      "Edited, produced, and reviewed 50+ multimedia materials with ~95% faculty satisfaction.",
      "Guided staff on multimedia tools and streamlined eLearning content production.",
    ],
    url: "https://ets.utdallas.edu/elearning-services",
  },
  {
    role: "Backend Developer",
    org: "ACM UTD",
    date: "Jan 2024 – Apr 2024",
    bullets: [
      "Optimized Firestore schema for improved storage efficiency, ensuring seamless event data access.",
      "Collaborated with a cross-functional team to deliver ExpertEvents on time, boosting student community engagement.",
    ],
    url: "https://www.acmutd.co",
  },
  {
    role: "Digital Illustrator",
    org: "Fiverr – Freelance",
    date: "Oct 2020 – Jan 2025",
    bullets: [
      "Delivered over 150 unique digital illustrations for various industries, enhancing brand visibility and engagement.",
      "Achieved 95% client satisfaction rating by consistently meeting deadlines and exceeding expectations in design quality.",
    ],
    url: "https://www.fiverr.com",
  },
];

const EDUCATION = [
  {
    school: "The University of Texas at Dallas, Richardson, TX",
    degree: "B.S. in Computer Science (GPA: 3.97)",
    date: "Aug 2022 – May 2027",
    honors: ["Dean’s List", "Academic Success Scholarship"],
    coursework: [
      "Object Oriented Programming in Java & C++",
      "Computer Architecture (MASM)",
      "Discrete Math",
      "Data Structures & Algorithms",
      "Programming Languages & Paradigms",
      "Probability & Statistics for CS/SE",
      "Database Systems",
      "Computer Networks",
      "Digital Logic",
    ],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 16 },
  },
};

function Sticker({ children }) {
  return (
    <motion.span
      initial={false}
      whileHover={{ rotate: -2, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="inline-flex items-center gap-2 rounded-[14px] border-2 border-black bg-yellow-300 px-3 py-1 text-black shadow-[3px_3px_0_0_#000]"
    >
      {children}
    </motion.span>
  );
}

function Window({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="rounded-2xl overflow-hidden border-2 border-black bg-white/5 shadow-[6px_6px_0_0_#000]"
    >
      <div className="flex items-center gap-2 px-3 py-2 border-b-2 border-black bg-white/10">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-400" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <div className="ml-2 text-xs font-semibold uppercase tracking-wider text-white/80">
          {sanitizeText(title)}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  );
}

export default function Portfolio() {
  const shouldReduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);

  // Which section is currently in view?

  // Accent selection (persisted)
  const [accentKey, setAccentKey] = useState(null); // don't decide on server
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("accentKey") || "orange";
      setAccentKey(saved);
    } catch {}
  }, []);

  function chooseAccent(key) {
    setAccentKey(key); // update UI
    document.documentElement.setAttribute("data-accent", key); // flip attribute
    try {
      localStorage.setItem("accentKey", key);
    } catch {}
  }

  // Lightweight runtime "tests" to prevent bad labels from breaking JSX
  useEffect(() => {
    const hasAngles = (s) => /[<>]/.test(String(s ?? ""));
    console.assert(
      NAV.every((n) => typeof n.label === "string"),
      "[Test] NAV labels must be strings",
    );
    console.assert(
      NAV.every((n) => !hasAngles(n.label)),
      "[Test] NAV labels must not contain < or >",
    );
    // Extra tests for project fields and bullets
    PROJECTS.forEach((p, i) => {
      console.assert(
        !hasAngles(p.title),
        `[Test] PROJECTS[${i}].title has < or >`,
      );
      console.assert(
        !hasAngles(p.date),
        `[Test] PROJECTS[${i}].date has < or >`,
      );
      console.assert(
        !hasAngles(p.blurb),
        `[Test] PROJECTS[${i}].blurb has < or >`,
      );
      console.assert(
        !hasAngles(p.impact),
        `[Test] PROJECTS[${i}].impact has < or >`,
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-white selection:text-black">
      {/* Theme + patterns + motion prefs */}
      <style>{`
        html{ scroll-behavior: smooth; }
  :root {
    --primary: #888888; /* neutral placeholder */
    --gradient: linear-gradient(135deg, #666 0%, #777 50%, #888 100%);
    --paper: #0b0b0b;
  }
        .noise { position: relative; }
        .noise:before { content:''; position:absolute; inset:0; opacity:.08; pointer-events:none; background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>'); }
        .checker { background-image: linear-gradient(45deg, rgba(255,255,255,.06) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,.06) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255,255,255,.06) 75%), linear-gradient(-45deg, transparent 75%, rgba(255,255,255,.06) 75%); background-size: 16px 16px; background-position: 0 0, 0 8px, 8px -8px, -8px 0px; }
        .dots { background-image: radial-gradient(rgba(255,255,255,.12) 1px, transparent 1px); background-size: 12px 12px; }
        .outline-text { -webkit-text-stroke: 2px #000; color: transparent; text-shadow: 4px 4px 0 #000; }
        .marquee { display:flex; gap:2rem; white-space:nowrap; animation: slide 20s linear infinite; }
        @keyframes slide { from { transform: translateX(0); } to { transform: translateX(-50%);} }
        @media (prefers-reduced-motion: reduce) { .marquee { animation: none; } } section[id]{ scroll-margin-top: 80px; }

      `}</style>

      {/* TOP BAR */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 border-b-2 border-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-3">
            <a
              href="#home"
              className="inline-flex items-center gap-3 font-extrabold tracking-tight"
            >
              <div
                className="h-12 w-12 rounded-full border-2 border-black"
                style={{ background: "var(--gradient)" }}
              >
                <img
                  src={LINKS.profile}
                  alt="Description of image"
                  className="object-cover w-full h-full hover:scale-110 rounded-full transition-transform duration-300"
                />
              </div>
              <span className="text-xl">Sifat Islam</span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-2">
              {NAV.map((n) => (
                <motion.a
                  key={`desktop-nav-${n.id}`}
                  href={`#${n.id}`}
                  whileHover={{ y: 1 }}
                  className="px-4 py-2 font-bold text-sm rounded-[12px] border-2 border-black bg-white/5 transition hover:shadow-[0_0_0_4px_var(--primary)] focus-visible:shadow-[0_0_0_4px_var(--primary)] focus-visible:outline-none"
                >
                  {sanitizeText(n.label)}
                </motion.a>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-xl border-2 border-black bg-white text-black h-10 w-10 shadow-[3px_3px_0_0_#000]"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Open menu"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
            {/* Accent picker (desktop) */}
            <div className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest">
              <span className="text-white/70">Accent:</span>
              {Object.entries(ACCENTS).map(([key, val]) => (
                <button
                  key={`desktop-accent-${key}`}
                  onClick={() => chooseAccent(key)}
                  className={
                    "h-5 w-5 rounded-full border-2 border-black transition " +
                    (accentKey === key
                      ? "scale-110"
                      : "opacity-70 hover:opacity-100 hover:scale-125")
                  }
                  title={val.name}
                  aria-label={`Use ${val.name} accent`}
                  style={{ background: val.primary }}
                />
              ))}
            </div>

            {/* Quick actions */}
            <div className="hidden sm:flex items-center gap-2">
              <MagneticButton
                as={({ children, ...p }) => (
                  <UIButton
                    as="a"
                    {...p}
                    href={LINKS.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </UIButton>
                )}
                className="text-black rounded-[12px] border-2 border-black shadow-[4px_4px_0_0_#000]"
                style={{ background: "var(--primary)" }}
              >
                View Resume
              </MagneticButton>
            </div>
          </div>
        </div>
        <div
          className="h-[6px] w-full border-t-2 border-black"
          style={{ background: "var(--gradient)" }}
        />

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-b-2 border-black bg-neutral-900"
            >
              <ul className="px-4 py-4 space-y-2">
                {NAV.map((n) => (
                  <li key={`mobile-nav-${n.id}`}>
                    <a
                      href={`#${n.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="block w-full rounded-xl border-2 border-black bg-white text-black px-4 py-3 text-base shadow-[3px_3px_0_0_#000]"
                    >
                      {sanitizeText(n.label)}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#contact"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full rounded-xl border-2 border-black px-4 py-3 text-base bg-[var(--primary)] text-black shadow-[3px_3px_0_0_#000]"
                  >
                    Hire Me
                  </a>
                </li>
              </ul>
            </motion.nav>
          )}
          {/* Accent picker (mobile) */}
          {/* Accent picker (mobile) */}
          <div className="md:hidden flex items-center gap-2 px-4 pb-3 pt-1">
            <span className="text-white/70 text-xs">Accent:</span>
            {Object.entries(ACCENTS).map(([key, val]) => (
              <button
                key={`mobile-accent-${key}`}
                onClick={() => chooseAccent(key)} // ✅ use chooseAccent
                className={
                  "h-5 w-5 rounded-full border-2 border-black transition " +
                  (accentKey === key ? "scale-110" : "opacity-70")
                }
                title={val.name}
                aria-label={`Use ${val.name} accent`}
                style={{ background: val.primary }}
              />
            ))}
          </div>
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section id="home" className="relative">
        <div
          className="w-full noise border-b-2 border-black"
          style={{ background: "var(--primary)" }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-end">
            <div className="lg:col-span-7">
              <motion.div
                initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
                animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Sticker>
                  <Sparkles className="h-4 w-4" /> Sifat Islam · CS @ UTD · GPA
                  3.97
                </Sticker>
                <h1
                  className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                 font-extrabold tracking-tight leading-[0.95]"
                >
                  Hi, I’m Sifat. I Code, Design, and{" "}
                  <span className="outline-text">Create</span>
                </h1>
                <p className="mt-4 max-w-2xl text-base font-semibold sm:text-lg/7 text-black/90">
                  I’m a former Freelance Digital Artist who is currently
                  majoring in Computer Science at UT Dallas. I am driven by
                  accessibility, developer experience, and measurable impact. I
                  enjoy transforming ideas into tangible projects — from
                  crafting AI-powered platforms to designing intuitive user
                  interfaces and illustrations.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <motion.div whileHover={{ y: 1 }} whileTap={{ scale: 0.98 }}>
                    <MagneticButton
                      className="rounded-[12px] border-2 border-black shadow-[4px_4px_0_0_#000]"
                      style={{ background: "#111827" }}
                    >
                      <a href="#projects" className="inline-flex items-center">
                        <Code2 className="mr-2 h-4 w-4" /> View Projects
                      </a>
                    </MagneticButton>
                  </motion.div>
                  <motion.div whileHover={{ y: 1 }} whileTap={{ scale: 0.98 }}>
                    <MagneticButton className="text-black bg-yellow-300">
                      <a href="#contact" className="inline-flex items-center">
                        <Mail className="mr-2 h-4 w-4" /> Let’s talk
                      </a>
                    </MagneticButton>
                  </motion.div>
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-5">
              <motion.div
                variants={item}
                className="lg:col-span-5"
                initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
                animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  whileHover={{ rotate: -1 }}
                  className="aspect-[4/3] rounded-3xl border-2 border-black overflow-hidden dots bg-white/5 flex items-center justify-center shadow-[8px_8px_0_0_#000]"
                >
                  <img
                    src={LINKS.photo}
                    alt="Description of image"
                    className="object-cover w-full h-full"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="border-y-2 border-black checker overflow-hidden">
          <div className="marquee py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider">
            <span>
              React · Next.js · Flask · LangChain · LlamaIndex · MongoDB ·
              Firebase · Tailwind · SQLAlchemy · Docker · Git/GitHub · A11y ·
              Testing
            </span>
            <span>
              React · Next.js · Flask · LangChain · LlamaIndex · MongoDB ·
              Firebase · Tailwind · SQLAlchemy · Docker · Git/GitHub · A11y ·
              Testing
            </span>
          </div>
        </div>
        <div className=" pb-24"></div>{" "}
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24"
      >
        <div className="flex items-end justify-between gap-6 mb-8 sm:mb-10">
          <h2 className="flex items-center gap-2 text-3xl sm:text-4xl font-black">
            <Eye className="h-6 w-6 text-white/80" />
            Projects
          </h2>

          <div className="hidden sm:flex items-center gap-2 text-sm text-white/70">
            <FolderGit2 className="h-4 w-4" /> {PROJECTS.length} projects
          </div>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 items-stretch"
        >
          {PROJECTS.map((p) => (
            <motion.div
              key={p.title}
              variants={item}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Card className="group h-full flex flex-col overflow-hidden rounded-3xl border-2 border-black bg-white/[0.04] backdrop-blur shadow-[8px_8px_0_0_#000]">
                {" "}
                <div className="relative">
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={p.image} // e.g. "/finsight.png" or "/projects/finsight.png"
                      alt={`${p.title} preview`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={false}
                    />
                  </div>
                  <div
                    className="absolute inset-x-0 -bottom-[1px] h-[6px] border-t-2 border-black"
                    style={{ background: "var(--gradient)" }}
                  />
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
                      {sanitizeText(p.title)}
                    </h3>
                    <div className="inline-flex items-center gap-2 text-xs text-white/70">
                      {sanitizeText(p.date)}
                    </div>
                  </div>
                  <div className="mt-2 text-white/90 flex-1">
                    {" "}
                    {/* ⬅️ flex-1 pushes footer down */}
                    <p>{sanitizeText(p.blurb)}</p>
                    <p className="mt-2 text-white/70 text-sm">
                      {sanitizeText(p.impact)}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.stack.map((t) => (
                        <motion.span
                          key={t}
                          whileHover={{ scale: 1.04 }}
                          className="text-xs rounded-full px-2.5 py-1 border-2 border-black bg-white text-black shadow-[2px_2px_0_0_#000]"
                        >
                          {sanitizeText(t)}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <a
                      href={p.repo}
                      className="p-2 rounded-lg hover:bg-white/10"
                      aria-label="GitHub repo"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    {p.url && (
                      <a
                        href={p.url}
                        className="p-2 rounded-lg hover:bg-white/10"
                        aria-label="Live demo"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24"
      >
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-black flex items-center gap-2">
            <Briefcase className="h-6 w-6" /> Experience
          </h2>
          <span
            className="h-3 w-3 rounded-full border-2 border-black"
            style={{ background: "var(--primary)" }}
          />
        </div>
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6"
        >
          {EXPERIENCE.map((job) => (
            <motion.li
              key={job.role + job.org}
              variants={item}
              className="rounded-2xl border-2 border-black bg-white/[0.04] p-6 shadow-[6px_6px_0_0_#000]     transform transition-transform duration-200 ease-out hover:scale-[1.03] hover:-translate-y-0.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <div className="text-lg font-extrabold">
                    {sanitizeText(job.role)}
                  </div>
                  <div className="text-white/80 hover:text-orange-300 transition-colors duration-200 ease-out">
                    <a href={job.url} target="_blank" rel="noreferrer">
                      {sanitizeText(job.org)}
                    </a>{" "}
                  </div>
                </div>
                <div className="text-sm text-white/70">
                  {sanitizeText(job.date)}
                </div>
              </div>
              <ul className="mt-3 list-disc list-inside space-y-1 text-white/85">
                {job.bullets.map((b, i) => (
                  <li key={i}>{sanitizeText(b)}</li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {/* EDUCATION */}
      <section
        id="education"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24 "
      >
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-black flex items-center gap-2">
            <GraduationCap className="h-6 w-6" /> Education
          </h2>
        </div>
        {EDUCATION.map((ed) => (
          <div
            key={ed.school}
            className="rounded-2xl border-2 border-black bg-white/[0.04] p-6 shadow-[6px_6px_0_0_#000]  transform transition-transform duration-200 ease-out hover:scale-[1.03] hover:-translate-y-0.5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <div className="text-lg font-extrabold hover:text-orange-400 transition-colors duration-100 ease-out">
                  <a
                    href="https://www.utdallas.edu"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {sanitizeText(ed.school)}
                  </a>
                </div>
                <div className="text-white/80">{sanitizeText(ed.degree)}</div>
              </div>
              <div className="text-sm text-white/70">
                {sanitizeText(ed.date)}
              </div>
            </div>
            <div className="mt-3 text-sm text-white/85">
              <strong>Honors:</strong> {ed.honors.map(sanitizeText).join(", ")}
            </div>
            <div className="mt-2 text-sm text-white/70">
              <strong>Coursework:</strong>{" "}
              {ed.coursework.map(sanitizeText).join(" · ")}
            </div>
          </div>
        ))}
      </section>

      {/* SKILLS */}
      <section
        id="skills"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24"
      >
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-black">Skills</h2>
          <span
            className="h-3 w-3 rounded-full border-2 border-black"
            style={{ background: "var(--primary)" }}
          />
        </div>
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
        >
          {SKILLS.map((s) => (
            <motion.li
              key={s}
              variants={item}
              whileHover={{ y: -2 }}
              className="rounded-2xl px-4 py-3 border-2 border-black bg-white text-black shadow-[4px_4px_0_0_#000] text-sm"
            >
              {sanitizeText(s)}
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
          <div className="relative overflow-hidden rounded-3xl border-2 border-black shadow-[10px_10px_0_0_#000]">
            <div
              // className="absolute inset-0 blur-lg opacity-20"
              className="absolute inset-0 opacity-30"
              style={{ background: "var(--gradient)" }}
            >
              {/* <img
                src={LINKS.back}
                alt="Description of image"
                className="object-cover w-full h-full"
              /> */}
            </div>
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-0">
              <div className="md:col-span-2 p-6 sm:p-8 lg:p-16 bg-white/10">
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                  Let’s build something outrageous
                </h2>
                <p className="mt-3 text-white/90 max-w-prose">
                  Have a role or project in mind? I’m happy to chat. I usually
                  reply within a day.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 items-center">
                  <div className="flex gap-3 w-full sm:w-auto">
                    <motion.div
                      whileHover={{ y: 3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MagneticButton
                        className="rounded-[12px] border-2 border-black shadow-[4px_4px_0_0_#000] px-4 py-2"
                        style={{ background: "var(--primary)" }}
                      >
                        <a
                          href="https://mail.google.com/mail/?view=cm&fs=1&to=reevu1214@gmail.com"
                          target="_blank"
                          className="flex items-center gap-2 text-white font-bold justify-center"
                        >
                          <Mail className="h-4 w-4" />
                          Email Me
                        </a>
                      </MagneticButton>
                    </motion.div>
                    {/* Mobile-only Resume Download Button */}
                    <motion.div
                      whileHover={{ y: 3 }}
                      whileTap={{ scale: 0.98 }}
                      className="sm:hidden"
                    >
                      <MagneticButton
                        className="rounded-[12px] border-2 border-black shadow-[4px_4px_0_0_#000] px-4 py-2"
                        style={{ background: "var(--primary)" }}
                      >
                        <a
                          href={LINKS.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-white font-bold justify-center"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                          View Resume
                        </a>
                      </MagneticButton>
                    </motion.div>
                  </div>
                  <motion.div whileHover={{ y: 1 }} whileTap={{ scale: 0.98 }}>
                    <MagneticButton
                      className="rounded-[12px] border-2 border-black shadow-[4px_4px_0_0_#000]"
                      style={{ background: "var(--primary)" }}
                    >
                      <a
                        href="https://www.linkedin.com/in/sifat-islam"
                        target="_blank"
                        className="flex items-center gap-2 text-white font-bold"
                      >
                        <FaLinkedin className="h-4 w-4" />
                        LinkedIn Profile
                      </a>
                    </MagneticButton>
                  </motion.div>
                  <motion.div whileHover={{ y: 1 }} whileTap={{ scale: 0.98 }}>
                    <Button className="rounded-[12px] border-2 border-black text-black hover:bg-slate-950 hover:font-extrabold bg-white hover:text-yellow-300">
                      <a href={LINKS.github} target="_blank" rel="noreferrer">
                        GitHub
                      </a>
                    </Button>
                  </motion.div>
                </div>
                <div className="mt-4 text-sm text-white/70">
                  Or call:{" "}
                  <a href={LINKS.phone} className="underline">
                    (469) 750‑7728
                  </a>
                </div>
              </div>
              <div className="p-6 sm:p-8 lg:p-16 bg-neutral-900 border-l-2 border-black">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Fast Facts
                </h3>
                <ul className="space-y-3 text-white/80 text-sm">
                  <li>GPA 3.97 · Dean’s List</li>
                  <li>HackUTD 2024: HydraWatch</li>
                  <li>English & Bengali</li>
                  <li>Current Focus: Learning Docker and Automation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Sifat Islam.
            </p>
            <div className="flex items-center gap-3 text-sm">
              <a
                href={LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 group"
              >
                <Github className="h-4 w-4" />{" "}
                <span className="group-hover:underline">GitHub</span>
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 group"
              >
                <Linkedin className="h-4 w-4" />{" "}
                <span className="group-hover:underline">LinkedIn</span>
              </a>
              <a
                href={LINKS.email}
                className="inline-flex items-center gap-1 group"
              >
                <Mail className="h-4 w-4" />{" "}
                <span className="group-hover:underline">Email</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
