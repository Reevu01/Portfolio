"use client";
import React, { useEffect, useRef, useState, forwardRef } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Sparkles,
  FolderGit2,
  Menu,
  X,
} from "lucide-react";

// =====================================================
// FIX: motion not defined
// - Properly import `motion` (and friends) from framer-motion.
// - Rebuild full page so About section renders inside a working app.
// - Keep magnetic buttons + accent switcher + marquee.
// =====================================================

// --- Local UI primitives (Tailwind-styled) ---
const UIButton = forwardRef(function UIButton(
  { className = "", children, ...props },
  ref
) {
  return (
    <button
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
    </button>
  );
});

const UICard = ({ className = "", children, ...props }) => (
  <div
    className={
      "rounded-3xl border-2 border-black bg-white/[0.04] shadow-[8px_8px_0_0_#000] " +
      className
    }
    {...props}
  >
    {children}
  </div>
);
const UICardHeader = ({ className = "", children, ...props }) => (
  <div className={"p-0 " + className} {...props}>
    {children}
  </div>
);
const UICardContent = ({ className = "", children, ...props }) => (
  <div className={"p-6 " + className} {...props}>
    {children}
  </div>
);

// =============================
// Accents (Swiss-inspired)
// =============================
const ACCENTS = {
  orange: {
    name: "Orange",
    primary: "#FF7F00",
    gradient: "linear-gradient(135deg, #ffb347 0%, #ff7f00 50%, #cc6600 100%)",
  },
  cyan: {
    name: "Cyan",
    primary: "#00C2D1",
    gradient: "linear-gradient(135deg, #22D3EE 0%, #06B6D4 50%, #0891B2 100%)",
  },
  lime: {
    name: "Lime",
    primary: "#A3E635",
    gradient: "linear-gradient(135deg, #bef264 0%, #84cc16 50%, #4d7c0f 100%)",
  },
};

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

// =============================
// Sample data
// =============================
const NAV = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const PROJECTS = [
  { title: "FinSight AI", date: "Apr 2025", url: "#", repo: "#" },
  { title: "HydraWatch", date: "Nov 2024", url: "#", repo: "#" },
  { title: "Game Vault", date: "Sep 2024", url: "#", repo: "#" },
];

// =============================
// Helpers
// =============================
const sanitizeText = (v) =>
  String(v ?? "").replace(/[<>]/g, (m) => (m === "<" ? "‹" : "›"));
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

// =============================
// App Component
// =============================
export default function Portfolio() {
  const shouldReduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accentKey, setAccentKey] = useState("orange");
  const accent = ACCENTS[accentKey];

  // apply CSS variables for accent
  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty("--primary", accent.primary);
    r.setProperty("--gradient", accent.gradient);
  }, [accent]);

  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 600], [0, -60]);
  const scaleX = useSpring(useTransform(scrollY, [0, 1000], [0, 1]), {
    stiffness: 120,
    damping: 20,
    mass: 0.4,
  });

  useEffect(() => {
    // runtime checks ("tests")
    console.assert(typeof motion === "object", "[Test] motion imported");
    console.assert(
      typeof MagneticButton === "function",
      "[Test] MagneticButton exists"
    );
    console.assert(
      ["orange", "cyan", "lime"].includes(accentKey),
      "[Test] accentKey constrained"
    );
  }, [accentKey]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-white selection:text-black">
      <style>{`
        html{ scroll-behavior:smooth; }
        .noise:before{ content:''; position:absolute; inset:0; opacity:.08; pointer-events:none; background-image:radial-gradient(#fff 0.75px,transparent 0.75px); background-size: 6px 6px; }
        .checker { background-image: linear-gradient(45deg, rgba(255,255,255,.06) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,.06) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255,255,255,.06) 75%), linear-gradient(-45deg, transparent 75%, rgba(255,255,255,.06) 75%); background-size: 16px 16px; background-position: 0 0, 0 8px, 8px -8px, -8px 0px; }
        /* Tech stack marquee (right -> left, no pause on hover) */
        .marquee{ overflow:hidden; position:relative; }
        .marquee__track{ display:inline-block; white-space:nowrap; will-change:transform; animation: marquee 22s linear infinite; }
        @keyframes marquee{ from{ transform: translateX(0); } to{ transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce){ .marquee__track{ animation:none; transform:none; } }
      `}</style>

      {/* Progress */}
      <motion.div
        style={{ scaleX, background: "var(--primary)" }}
        className="fixed left-0 right-0 top-0 z-50 h-1 origin-left"
      />

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 border-b-2 border-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-3">
            <a
              href="#home"
              className="inline-flex items-center gap-3 font-extrabold tracking-tight"
            >
              <div
                className="h-8 w-8 rounded-[10px] border-2 border-black"
                style={{ background: "var(--gradient)" }}
              />
              <span className="text-xl">Sifat Islam</span>
            </a>

            <div className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest">
              <span className="text-white/70">Accent:</span>
              {Object.keys(ACCENTS).map((k) => (
                <button
                  key={k}
                  onClick={() => setAccentKey(k)}
                  className={`h-5 w-5 rounded-full border-2 border-black ${
                    accentKey === k ? "scale-110" : "opacity-70"
                  }`}
                  title={ACCENTS[k].name}
                  style={{ background: ACCENTS[k].primary }}
                />
              ))}
            </div>

            <nav className="hidden md:flex items-center gap-2">
              {NAV.map((n) => (
                <motion.a
                  key={n.id}
                  href={`#${n.id}`}
                  whileHover={{ y: 1 }}
                  className="px-4 py-2 text-sm rounded-[12px] border-2 border-black bg-white/5 hover:shadow-[0_0_0_2px_#000] transition"
                >
                  {sanitizeText(n.label)}
                </motion.a>
              ))}
            </nav>

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
          </div>
        </div>
        <div
          className="h-[6px] w-full border-t-2 border-black"
          style={{ background: "var(--gradient)" }}
        />

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
                  <li key={n.id}>
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
                    Let’s talk
                  </a>
                </li>
              </ul>
            </motion.nav>
          )}
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
                style={{ y: yHero }}
                initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
                animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.span
                  initial={false}
                  whileHover={{ rotate: -2, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="inline-flex items-center gap-2 rounded-[14px] border-2 border-black bg-yellow-300 px-3 py-1 text-black shadow-[3px_3px_0_0_#000]"
                >
                  <Sparkles className="h-4 w-4" /> Sifat Islam · CS @ UTD · GPA
                  3.97
                </motion.span>
                <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95]">
                  Swiss‑grid <span className="text-black/80">meets</span> bold
                  motion
                </h1>
                <p className="mt-4 max-w-2xl text-base sm:text-lg/7 text-black/90">
                  I build delightful frontends and durable backends. Strong in
                  React/Next.js, Flask, and AI tooling.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <MagneticButton
                    className="bg-neutral-900 text-white"
                    style={{ background: "#111827" }}
                  >
                    <a href="#projects" className="inline-flex items-center">
                      <Code2 className="mr-2 h-4 w-4" /> View Work
                    </a>
                  </MagneticButton>
                  <MagneticButton
                    className="text-black"
                    style={{ background: "var(--primary)" }}
                  >
                    <a href="#contact" className="inline-flex items-center">
                      <Mail className="mr-2 h-4 w-4" /> Let’s talk
                    </a>
                  </MagneticButton>
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-5">
              <UICard>
                <div className="flex items-center gap-2 px-3 py-2 border-b-2 border-black bg-white/10">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <div className="ml-2 text-xs font-semibold uppercase tracking-wider text-white/80">
                    ship/log
                  </div>
                </div>
                <UICardContent>
                  <ul className="space-y-3 text-sm text-white/90">
                    <li>
                      {sanitizeText(
                        "✓ Boosted QA accuracy 37% → 67% on FinSight AI"
                      )}
                    </li>
                    <li>
                      {sanitizeText(
                        "✓ Built realtime hydrate alerts for HackUTD project"
                      )}
                    </li>
                    <li>
                      {sanitizeText(
                        "✓ Designed typed APIs and clean data flows"
                      )}
                    </li>
                  </ul>
                </UICardContent>
              </UICard>
            </div>
          </div>
        </div>
        <div className="border-y-2 border-black checker overflow-hidden">
          <div className="marquee py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider">
            <div className="marquee__track">
              <span className="mx-8">
                React · Next.js · Flask · LangChain · LlamaIndex · MongoDB ·
                Tailwind · SQLAlchemy · Docker · Git/GitHub · A11y · Testing
              </span>
              <span className="mx-8">
                React · Next.js · Flask · LangChain · LlamaIndex · MongoDB ·
                Tailwind · SQLAlchemy · Docker · Git/GitHub · A11y · Testing
              </span>
              <span className="mx-8">
                React · Next.js · Flask · LangChain · LlamaIndex · MongoDB ·
                Tailwind · SQLAlchemy · Docker · Git/GitHub · A11y · Testing
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24 border-t-2 border-black"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div
            className="lg:col-span-7"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              variants={item}
              className="text-3xl sm:text-4xl font-black"
            >
              About Me
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-4 text-white/90 max-w-prose"
            >
              I’m <strong>Sifat Islam</strong>, a passionate software engineer
              who loves building delightful frontends and durable backends. I
              thrive on solving challenging problems, crafting accessible UI,
              and delivering precise, impactful solutions.
            </motion.p>
            <motion.p
              variants={item}
              className="mt-4 text-white/90 max-w-prose"
            >
              With experience in full‑stack development, AI tooling, and cloud
              integrations, I enjoy bridging the gap between design and
              engineering to create products that are both beautiful and
              functional.
            </motion.p>
            <motion.div variants={item} className="mt-6 flex flex-wrap gap-3">
              <MagneticButton className="bg-white text-black">
                <a href="#projects">See Projects</a>
              </MagneticButton>
              <MagneticButton
                className="text-black"
                style={{ background: "var(--primary)" }}
              >
                <a href="#contact">Hire Me</a>
              </MagneticButton>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-5 grid gap-4">
            <UICard className="p-6">
              <h3 className="text-lg font-extrabold">Principles</h3>
              <ul className="mt-3 space-y-2 text-sm text-white/85">
                <li>Typography first. Content is the interface.</li>
                <li>Motion clarifies; it never distracts.</li>
                <li>Systems over pages. A11y by default.</li>
              </ul>
            </UICard>
            <UICard className="p-6">
              <h3 className="text-lg font-extrabold">What I’m into</h3>
              <ul className="mt-3 space-y-2 text-sm text-white/85">
                <li>Design systems & component APIs</li>
                <li>Edge rendering & performance</li>
                <li>AI tooling & prompt pipelines</li>
              </ul>
            </UICard>
          </div>
        </div>
      </section>

      {/* PROJECTS (placeholder to keep anchors valid) */}
      <section
        id="projects"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24"
      >
        <div className="flex items-end justify-between gap-6 mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-black">Selected Work</h2>
          <div className="hidden sm:flex items-center gap-2 text-sm text-white/70">
            <FolderGit2 className="h-4 w-4" /> {PROJECTS.length} projects
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {PROJECTS.map((p) => (
            <UICard key={p.title} className="overflow-hidden">
              <UICardHeader>
                <div className="relative">
                  <div className="h-44 w-full checker" />
                  <div
                    className="absolute inset-x-0 -bottom-[1px] h-[6px] border-t-2 border-black"
                    style={{ background: "var(--gradient)" }}
                  />
                </div>
              </UICardHeader>
              <UICardContent>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
                    {sanitizeText(p.title)}
                  </h3>
                  <div className="inline-flex items-center gap-2 text-xs text-white/70">
                    {sanitizeText(p.date)}
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
              </UICardContent>
            </UICard>
          ))}
        </div>
      </section>

      {/* CONTACT (placeholder) */}
      <section id="contact" className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
          <div className="relative overflow-hidden rounded-3xl border-2 border-black shadow-[10px_10px_0_0_#000]">
            <div
              className="absolute inset-0 opacity-30"
              style={{ background: "var(--gradient)" }}
            />
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-0">
              <div className="md:col-span-2 p-6 sm:p-8 lg:p-16 bg-white/10">
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                  Let’s build something precise & bold
                </h2>
                <p className="mt-3 text-white/90 max-w-prose">
                  Have a role or project in mind? I’m happy to chat.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <MagneticButton
                    className="text-black"
                    style={{ background: "var(--primary)" }}
                  >
                    <a href="mailto:reevu1214@gmail.com">
                      <Mail className="mr-2 h-4 w-4" /> Let’s talk
                    </a>
                  </MagneticButton>
                  <MagneticButton className="bg-white text-black">
                    <a
                      href="https://linkedin.com/in/sifat-islam/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                  </MagneticButton>
                  <MagneticButton className="bg-white text-black">
                    <a
                      href="https://github.com/Reevu01"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  </MagneticButton>
                </div>
              </div>
              <div className="p-6 sm:p-8 lg:p-16 bg-neutral-900 border-l-2 border-black">
                <h3 className="font-semibold mb-4">Fast Facts</h3>
                <ul className="space-y-3 text-white/80 text-sm">
                  <li>GPA 3.97 · Dean’s List</li>
                  <li>HackUTD 2024: HydraWatch</li>
                  <li>Focus: DX, a11y, clean APIs</li>
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
                href="https://github.com/Reevu01"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 group"
              >
                <Github className="h-4 w-4" />{" "}
                <span className="group-hover:underline">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/sifat-islam/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 group"
              >
                <Linkedin className="h-4 w-4" />{" "}
                <span className="group-hover:underline">LinkedIn</span>
              </a>
              <a
                href="mailto:reevu1214@gmail.com"
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

// ==============================================
// Runtime checks ("test cases") — non-breaking asserts
// ==============================================
if (typeof window !== "undefined") {
  try {
    console.assert(typeof motion === "object", "[Test] motion imported");
    console.assert(
      typeof MagneticButton === "function",
      "[Test] MagneticButton defined"
    );
    const root = getComputedStyle(document.documentElement);
    console.assert(
      root.getPropertyValue("--primary").trim() !== "",
      "[Test] --primary set"
    );
    const text = document.body?.innerText || "";
    console.assert(
      text.includes("View Work"),
      "[Test] CTA 'View Work' present"
    );
    console.assert(
      text.includes("Let’s talk"),
      "[Test] CTA 'Let’s talk' present"
    );
    console.assert(
      !!document.querySelector("#about"),
      "[Test] About section present"
    );
  } catch (_) {}
}
