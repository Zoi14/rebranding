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
}: {
  href: string;
  label: string;
  onClick: () => void;
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
      className="group flex items-center justify-between py-5 border-b"
      style={{
        borderColor: "rgba(255,255,255,.10)",
        textDecoration: "none",
      }}
    >
      <span
        className="text-3xl sm:text-4xl font-semibold tracking-tight"
        style={{
          color: active ? "rgba(255,255,255,.98)" : "rgba(255,255,255,.92)",
          textTransform: "uppercase",
          letterSpacing: "-0.01em",
        }}
      >
        {label}
      </span>

      <span
        aria-hidden
        className="text-xl opacity-70 group-hover:opacity-100 transition-opacity"
        style={{ color: "rgba(245,245,245,.62)" }}
      >
        ↓
      </span>
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

  // ===== 2026 Premium scroll-based glassmorphic header =====
  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(5,5,5,.35)", "rgba(5,5,5,.75)"]
  );
  const headerBlur = useTransform(scrollY, [0, 100], ["blur(12px)", "blur(16px)"]);
  const headerBorder = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255,255,255,.06)", "rgba(255,255,255,.10)"]
  );
  const headerHeight = useTransform(scrollY, [0, 100], [64, 56]); // px
  const headerY = useTransform(scrollY, [0, 100], [12, 0]);

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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      {/* Floating glassmorphic bar */}
      <motion.div
        ref={topRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="mx-auto max-w-6xl rounded-2xl border"
        style={{
          borderColor: headerBorder,
          background: headerBg,
          backdropFilter: headerBlur as any,
          WebkitBackdropFilter: headerBlur as any,
          y: headerY,
          boxShadow: "0 8px 32px rgba(0,0,0,.25)",
        }}
      >
        <motion.nav
          className="px-6 flex items-center justify-between"
          style={{
            height: headerHeight,
            perspective: 1200,
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
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              style={{ transform: "translateZ(12px)" }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2.5"
              >
                <Image
                  src="/img/logo.png"
                  alt="Rebranding logo"
                  width={90}
                  height={63}
                  priority
                  className="rounded-lg"
                />
                <div className="hidden sm:flex flex-col">
                  <span className="text-sm font-bold text-white tracking-wide font-display uppercase">
                    Rebranding
                  </span>
                  <span className="text-xs opacity-60 tracking-wider">by Ζωή</span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop minimal */}
            <div
              className="hidden md:flex items-center gap-8 text-sm"
              style={{ transform: "translateZ(12px)" }}
            >
              {items.map((it) => (
                <motion.div
                  key={it.href}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    href={it.href}
                    className="font-medium tracking-wide transition-colors"
                    style={{
                      color: "rgba(250,250,250,.6)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "rgba(255,111,26,.95)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(250,250,250,.6)";
                    }}
                  >
                    {it.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link href="/contact" className="btn-jesper primary">
                  Ζήτησε προσφορά <span className="arrow">→</span>
                </Link>
              </motion.div>
            </div>

            {/* MENU button - Premium glassmorphic */}
            <motion.button
              aria-label={open ? "Κλείσιμο μενού" : "Μενού"}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-3 md:hidden"
              style={{
                color: "rgba(255,255,255,.95)",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                fontSize: ".75rem",
                fontWeight: 700,
                transform: "translateZ(12px)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="hidden sm:inline font-bold">{open ? "Close" : "Menu"}</span>

              <motion.span
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md"
                style={{
                  borderColor: open ? "rgba(255,111,26,.6)" : "rgba(255,255,255,.15)",
                  background: open ? "rgba(255,111,26,.08)" : "rgba(255,255,255,.04)",
                  boxShadow: open ? "0 0 20px rgba(255,111,26,.15)" : "none",
                }}
                animate={{
                  borderColor: open ? "rgba(255,111,26,.6)" : "rgba(255,255,255,.15)",
                  background: open ? "rgba(255,111,26,.08)" : "rgba(255,255,255,.04)",
                }}
                aria-hidden
              >
                <span className="relative block h-4 w-4">
                  <motion.span
                    className="absolute inset-x-0 top-0 h-[2px] rounded-full bg-current"
                    animate={{
                      translateY: open ? "6px" : "0px",
                      rotate: open ? 45 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                  />
                  <motion.span
                    className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-current"
                    animate={{
                      translateY: open ? "-6px" : "0px",
                      rotate: open ? -45 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                  />
                </span>
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.nav>
      </motion.div>

      {/* Fullscreen overlay menu - 2026 Premium */}
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
              backgroundColor: "#050505",
              zIndex: 2147483647,
              opacity: 1,
              isolation: "isolate",
            }}
          >
            {/* Electric gradient glow in background */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: "radial-gradient(ellipse 1000px 600px at 50% 30%, rgba(255,111,26,.12), transparent 70%)",
              }}
            />

            <div
              className="absolute inset-0"
              onClick={() => setOpen(false)}
              aria-hidden
              style={{ backgroundColor: "transparent" }}
            />

            <motion.div
              variants={panel}
              ref={drawerRef}
              tabIndex={-1}
              onClick={(e) => e.stopPropagation()}
              className="relative h-full"
              style={{
                backgroundColor: "transparent",
                zIndex: 1,
                opacity: 1,
                outline: "none",
              }}
            >
              {/* top row */}
              <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src="/img/logo.png"
                    alt="Rebranding logo"
                    width={100}
                    height={70}
                    className="rounded-sm"
                  />
                </div>

                <motion.button
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-3"
                  style={{
                    color: "rgba(255,255,255,.95)",
                    letterSpacing: ".16em",
                    textTransform: "uppercase",
                    fontSize: ".75rem",
                    fontWeight: 700,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  aria-label="Κλείσιμο"
                >
                  <span className="font-bold">Close</span>
                  <motion.span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md text-lg"
                    style={{
                      borderColor: "rgba(255,111,26,.6)",
                      background: "rgba(255,111,26,.08)",
                      boxShadow: "0 0 20px rgba(255,111,26,.15)",
                    }}
                    whileHover={{
                      borderColor: "rgba(255,111,26,.8)",
                      background: "rgba(255,111,26,.12)",
                      boxShadow: "0 0 30px rgba(255,111,26,.25)",
                    }}
                    aria-hidden
                  >
                    ✕
                  </motion.span>
                </motion.button>
              </div>

              {/* items */}
              <div className="mx-auto max-w-6xl px-4">
                <div className="max-w-xl">
                  {/* ✅ stagger every time menu opens */}
                  <motion.div variants={list} initial="hidden" animate="show">
                    {items.map((it) => (
                      <motion.div key={it.href} variants={itemVar}>
                        <MenuItem
                          href={it.href}
                          label={it.label}
                          onClick={() => setOpen(false)}
                        />
                      </motion.div>
                    ))}

                    <motion.div variants={itemVar} className="mt-6 flex flex-wrap gap-3">
                      <a
                        href="https://instagram.com/rebranding_byzoe"
                        target="_blank"
                        rel="noreferrer"
                        className="btn-jesper"
                      >
                        Instagram <span className="arrow">→</span>
                      </a>

                      <Link
                        href="/contact"
                        className="btn-jesper primary"
                        onClick={() => setOpen(false)}
                      >
                        Ζήτησε προσφορά <span className="arrow">→</span>
                      </Link>
                    </motion.div>

                    <motion.p
                      variants={itemVar}
                      className="mt-8 text-xs"
                      style={{ color: "rgba(245,245,245,.62)" }}
                    >
                      Content • Social Media • Web Styling
                    </motion.p>
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
