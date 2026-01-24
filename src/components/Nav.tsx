"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useFocusTrap } from "@/hooks/useFocusTrap";

const overlay = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.18 } },
  exit: { opacity: 0, transition: { duration: 0.14 } },
};

const panel = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.22 } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.16 } },
};

const list = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.06,
    },
  },
};

const itemVar = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.42 } },
};

type Item = { href: string; label: string };

function MenuItem({
  href,
  label,
  onClick,
  index,
}: {
  href: string;
  label: string;
  onClick: () => void;
  index: number;
}) {
  const pathname = usePathname();
  const active = useMemo(
    () => (href === "/" ? pathname === "/" : pathname?.startsWith(href)),
    [href, pathname]
  );

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className="group relative flex items-center justify-between py-8 border-b overflow-hidden"
      style={{
        borderColor: "rgba(255,255,255,.08)",
        textDecoration: "none",
      }}
    >
      {/* Gradient background on hover */}
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, rgba(255,106,26,.05) 0%, transparent 100%)",
        }}
      />

      {/* Index number */}
      <span
        className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-0 -translate-x-4"
        style={{
          fontSize: "5rem",
          fontWeight: 900,
          color: "rgba(255,106,26,.08)",
          lineHeight: 1,
          zIndex: 0,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative z-10 flex flex-col gap-2">
        <span
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight transition-all duration-300 group-hover:translate-x-3"
          style={{
            color: active ? "#ff6a1a" : "rgba(255,255,255,.95)",
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            textShadow: active ? "0 0 30px rgba(255,106,26,.3)" : "none",
          }}
        >
          {label}
        </span>

        {/* Subtitle hint */}
        <span
          className="text-xs uppercase tracking-widest opacity-0 group-hover:opacity-60 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 group-hover:translate-x-3"
          style={{ color: "rgba(245,245,245,.5)", letterSpacing: ".2em" }}
        >
          {href === "/" ? "Home Page" : href === "/services" ? "Our Services" : "Get In Touch"}
        </span>
      </div>

      {/* Animated arrow */}
      <div className="relative z-10 flex items-center gap-4">
        {active && (
          <span
            className="hidden sm:inline text-xs uppercase tracking-widest px-3 py-1 rounded-full"
            style={{
              background: "rgba(255,106,26,.15)",
              border: "1px solid rgba(255,106,26,.3)",
              color: "#ff6a1a",
              letterSpacing: ".15em",
            }}
          >
            Active
          </span>
        )}

        <span
          className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
          style={{
            borderColor: active ? "#ff6a1a" : "rgba(255,255,255,.15)",
            background: active ? "rgba(255,106,26,.1)" : "rgba(255,255,255,.03)",
          }}
        >
          <span
            aria-hidden
            className="text-2xl transition-transform duration-300 group-hover:translate-x-1"
            style={{ color: active ? "#ff6a1a" : "rgba(245,245,245,.7)" }}
          >
            →
          </span>
        </span>
      </div>

      {/* Bottom gradient line */}
      <span
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          width: "100%",
          background: "linear-gradient(90deg, transparent, #ff6a1a, transparent)",
        }}
      />
    </Link>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement | null>(null);

  // keep your categories (do not change labels)
  const items: Item[] = useMemo(
    () => [
      { href: "/", label: "Αρχική" },
      { href: "/services", label: "Υπηρεσίες" },
      { href: "/contact", label: "Επικοινωνία" },
    ],
    [] 
  );

  // stop background scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useFocusTrap(drawerRef, open, () => setOpen(false));

  // ===== Scroll-based header feel (every scroll) =====
  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 120],
    ["rgba(0,0,0,.55)", "rgba(0,0,0,.78)"]
  );
  const headerBlur = useTransform(scrollY, [0, 120], ["blur(8px)", "blur(12px)"]);
  const headerHeight = useTransform(scrollY, [0, 120], [56, 50]); // px
  const headerY = useTransform(scrollY, [0, 120], [0, -2]);

  // ===== 3D tilt on hover for the top bar =====
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 160, damping: 20 });
  const sy = useSpring(my, { stiffness: 160, damping: 20 });

  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [5, -5]);

  function onMove(e: React.MouseEvent) {
    const el = topRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    mx.set(px);
    my.set(py);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <header className="sticky top-0 z-50">
      {/* top bar */}
      <motion.div
        ref={topRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="border-b"
        style={{
          borderColor: "rgba(255,255,255,.10)",
          background: headerBg,
          backdropFilter: headerBlur as any,
          y: headerY,
        }}
      >
        <motion.nav
          className="mx-auto max-w-6xl px-4 flex items-center justify-between"
          style={{
            height: headerHeight,
            perspective: 1000,
          }}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="flex w-full items-center justify-between"
          >
            {/* BRAND */}
            <Link
              href="/"
              className="inline-flex items-center gap-2"
              style={{ transform: "translateZ(10px)" }}
            >
              <Image
                src="/img/logo.png"
                alt="Rebranding logo"
                width={100}
                height={70}
                priority
                className="rounded-sm"
              />
              <span className="hidden sm:inline text-base font-semibold text-white font-display">
                Rebranding
              </span>
              <span className="hidden sm:inline text-neutral-400 text-sm">— Ζωή</span>
            </Link>

            {/* Desktop minimal */}
            <div
              className="hidden md:flex items-center gap-6 text-sm"
              style={{ color: "rgba(245,245,245,.62)", transform: "translateZ(10px)" }}
            >
              {items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className="hover:text-white transition-colors"
                >
                  {it.label}
                </Link>
              ))}
              <Link href="/contact" className="btn-jesper primary">
                Ζήτησε προσφορά <span className="arrow">→</span>
              </Link>
            </div>

            {/* MENU button */}
            <button
              aria-label={open ? "Κλείσιμο μενού" : "Μενού"}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-3"
              style={{
                color: "rgba(255,255,255,.96)",
                letterSpacing: ".14em",
                textTransform: "uppercase",
                fontSize: ".78rem",
                fontWeight: 800,
                transform: "translateZ(10px)",
              }}
            >
              <span className="hidden sm:inline">{open ? "Close" : "Menu"}</span>

              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border"
                style={{
                  borderColor: "rgba(255,255,255,.22)",
                  background: "rgba(255,255,255,.03)",
                }}
                aria-hidden
              >
                <span className="relative block h-4 w-4">
                  <span
                    className={`absolute inset-x-0 top-0 h-[2px] bg-current transition-transform duration-300 ${
                      open ? "translate-y-[6px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute inset-x-0 bottom-0 h-[2px] bg-current transition-transform duration-300 ${
                      open ? "-translate-y-[6px] -rotate-45" : ""
                    }`}
                  />
                </span>
              </span>
            </button>
          </motion.div>
        </motion.nav>
      </motion.div>

      {/* Fullscreen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.aside
            key="menu"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={overlay}
            id="site-menu"
            role="dialog"
            aria-modal="true"
            className="fixed inset-0"
            style={{
              backgroundColor: "#070707",
              zIndex: 2147483647,
              opacity: 1,
              isolation: "isolate",
            }}
          >
            <div
              className="absolute inset-0"
              onClick={() => setOpen(false)}
              aria-hidden
              style={{ backgroundColor: "#070707", opacity: 1 }}
            >
              {/* Decorative gradient orbs */}
              <div
                className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
                style={{
                  background: "radial-gradient(circle, #ff6a1a 0%, transparent 70%)",
                  animation: "pulse 8s ease-in-out infinite",
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10"
                style={{
                  background: "radial-gradient(circle, #ff6a1a 0%, transparent 70%)",
                  animation: "pulse 8s ease-in-out infinite 4s",
                }}
              />
              {/* Grid pattern overlay */}
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                                   linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                  backgroundSize: "50px 50px",
                }}
              />
            </div>

            <motion.div
              variants={panel}
              ref={drawerRef}
              tabIndex={-1}
              onClick={(e) => e.stopPropagation()}
              className="relative h-full"
              style={{
                backgroundColor: "#070707",
                zIndex: 1,
                opacity: 1,
                outline: "none",
              }}
            >
              {/* Enhanced top row */}
              <div className="mx-auto max-w-6xl px-4 h-20 flex items-center justify-between border-b" style={{ borderColor: "rgba(255,255,255,.06)" }}>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 blur-xl opacity-50" style={{ background: "#ff6a1a" }} />
                    <Image
                      src="/img/logo.png"
                      alt="Rebranding logo"
                      width={100}
                      height={70}
                      className="rounded-sm relative z-10"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{ color: "rgba(255,255,255,.95)" }}>
                      Rebranding
                    </div>
                    <div className="text-xs" style={{ color: "rgba(245,245,245,.5)" }}>
                      by Ζωή
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="group inline-flex items-center gap-3 transition-all duration-300 hover:gap-4"
                  style={{
                    color: "rgba(255,255,255,.96)",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    fontSize: ".78rem",
                    fontWeight: 800,
                  }}
                  aria-label="Κλείσιμο"
                >
                  <span className="hidden sm:inline">Close</span>
                  <span
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 group-hover:rotate-90 group-hover:border-brand-500"
                    style={{
                      borderColor: "rgba(255,255,255,.2)",
                      background: "rgba(255,255,255,.05)",
                    }}
                    aria-hidden
                  >
                    <span className="text-lg">✕</span>
                  </span>
                </button>
              </div>

              {/* items */}
              <div className="mx-auto max-w-6xl px-4">
                <div className="max-w-4xl">
                  {/* ✅ stagger every time menu opens */}
                  <motion.div variants={list} initial="hidden" animate="show" className="mt-8">
                    {items.map((it, idx) => (
                      <motion.div key={it.href} variants={itemVar}>
                        <MenuItem
                          href={it.href}
                          label={it.label}
                          onClick={() => setOpen(false)}
                          index={idx}
                        />
                      </motion.div>
                    ))}

                    {/* Enhanced CTA Section */}
                    <motion.div variants={itemVar} className="mt-12 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,.06)" }}>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                          href="/contact"
                          className="group relative overflow-hidden flex-1 px-8 py-5 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                          onClick={() => setOpen(false)}
                          style={{
                            background: "linear-gradient(135deg, rgba(255,106,26,.18) 0%, rgba(255,106,26,.08) 100%)",
                            border: "2px solid rgba(255,106,26,.4)",
                          }}
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ transform: "translateX(-100%)", animation: "shimmer 2s infinite" }} />
                          <div className="relative flex items-center justify-between">
                            <div>
                              <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(255,106,26,.8)", letterSpacing: ".2em" }}>
                                Get Started
                              </div>
                              <div className="text-lg font-bold" style={{ color: "#ff6a1a" }}>
                                Ζήτησε προσφορά
                              </div>
                            </div>
                            <span className="text-3xl transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110" style={{ color: "#ff6a1a" }}>
                              →
                            </span>
                          </div>
                        </Link>

                        <a
                          href="https://instagram.com/rebranding_byzoe"
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center justify-center gap-3 px-6 py-5 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                          style={{
                            border: "2px solid rgba(255,255,255,.15)",
                            background: "rgba(255,255,255,.03)",
                          }}
                        >
                          <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: "rgba(245,245,245,.9)" }}>
                            Instagram
                          </span>
                          <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </a>
                      </div>
                    </motion.div>

                    {/* Enhanced footer info */}
                    <motion.div
                      variants={itemVar}
                      className="mt-12 flex items-center justify-between"
                    >
                      <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(245,245,245,.4)", letterSpacing: ".2em" }}>
                        Content • Social Media • Web Styling
                      </p>
                      <div className="flex gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: "#ff6a1a" }} />
                        <span className="w-2 h-2 rounded-full" style={{ background: "rgba(255,106,26,.5)" }} />
                        <span className="w-2 h-2 rounded-full" style={{ background: "rgba(255,106,26,.25)" }} />
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
}
