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
              <span className="hidden sm:inline text-base font-semibold text-slate-900 font-display">
                Rebranding
              </span>
              <span className="hidden sm:inline text-slate-500 text-sm">— Ζωή</span>
            </Link>

            {/* Desktop minimal */}
            <div
              className="hidden md:flex items-center gap-6 text-sm"
              style={{ color: "rgba(15,23,42,.65)", transform: "translateZ(10px)" }}
            >
              {items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className="hover:text-slate-900 transition-colors"
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
            />

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

                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2"
                  style={{
                    color: "rgba(255,255,255,.96)",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    fontSize: ".78rem",
                    fontWeight: 800,
                  }}
                  aria-label="Κλείσιμο"
                >
                  <span>Close</span>
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border"
                    style={{
                      borderColor: "rgba(255,255,255,.18)",
                      background: "rgba(255,255,255,.03)",
                    }}
                    aria-hidden
                  >
                    ✕
                  </span>
                </button>
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
