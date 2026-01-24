"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useFocusTrap } from "@/hooks/useFocusTrap";

// Mobile menu animations
const mobileMenuPanel = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1], // Elastic easing
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.25,
      ease: "easeIn"
    }
  },
};

const mobileMenuList = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const mobileMenuItem = {
  hidden: { opacity: 0, x: -20, filter: "blur(4px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.34, 1.26, 0.64, 1], // Elastic
    }
  },
};

// Initial load animation for nav bar
const navBarInitial = {
  hidden: { opacity: 0, y: -10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    }
  }
};

type Item = { href: string; label: string };

function MobileMenuItem({
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
      className="group flex items-center justify-between py-4 px-4 rounded-xl hover:bg-black/5 transition-all duration-300"
    >
      <span
        className={`text-2xl sm:text-3xl font-semibold tracking-tight ${
          active ? "text-gray-900" : "text-gray-700"
        }`}
      >
        {label}
      </span>

      <span
        aria-hidden
        className="text-lg opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
      >
        →
      </span>
    </Link>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Navigation items
  const items: Item[] = useMemo(
    () => [
      { href: "/", label: "Αρχική" },
      { href: "/services", label: "Υπηρεσίες" },
      { href: "/contact", label: "Επικοινωνία" },
    ],
    []
  );

  // Mount animation
  useEffect(() => {
    setMounted(true);
  }, []);

  // Stop background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useFocusTrap(drawerRef, open, () => setOpen(false));

  // Scroll-based effects for floating menu
  const { scrollY } = useScroll();

  // Increase shadow and blur on scroll
  const shadowOpacity = useTransform(scrollY, [0, 100], [0.05, 0.15]);
  const blurAmount = useTransform(scrollY, [0, 100], [12, 20]);

  // Add subtle scale and padding adjustments
  const navPadding = useTransform(scrollY, [0, 100], [16, 12]);

  return (
    <motion.header
      className="sticky top-0 z-50 px-4 pt-4"
      initial="hidden"
      animate={mounted ? "show" : "hidden"}
      variants={navBarInitial}
    >
      {/* Floating Glass Navigation Bar */}
      <motion.div
        className="mx-auto max-w-7xl rounded-full border border-black/5 bg-white/80 shadow-sm backdrop-blur-lg"
        style={{
          boxShadow: useTransform(
            shadowOpacity,
            (val) => `0 4px 24px rgba(0, 0, 0, ${val})`
          ),
        }}
      >
        <nav className="relative flex items-center justify-between px-6 py-3">
          {/* Left: Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/img/logo.png"
              alt="Rebranding logo"
              width={60}
              height={42}
              priority
              className="rounded-sm"
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-bold text-gray-900">
                Rebranding
              </span>
              <span className="text-xs text-gray-500">by Ζωή</span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {items.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-black/5"
                >
                  <span className={isActive ? "text-gray-900" : "text-gray-600"}>
                    {item.label}
                  </span>

                  {/* Elastic underline animation */}
                  <motion.span
                    className="absolute bottom-1 left-1/2 h-0.5 bg-blue-600"
                    initial={{ width: 0, x: "-50%" }}
                    animate={{
                      width: isActive ? "50%" : "0%",
                      x: "-50%"
                    }}
                    whileHover={{
                      width: "50%",
                      transition: {
                        duration: 0.4,
                        ease: [0.34, 1.56, 0.64, 1] // Elastic
                      }
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right: CTA Button + Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            {/* CTA Button - Hidden on mobile, visible on desktop */}
            <Link
              href="/contact"
              className="hidden md:flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md hover:scale-105"
            >
              ΖΗΤΗΣΕ ΠΡΟΣΦΟΡΑ
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                →
              </motion.span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              aria-label={open ? "Κλείσιμο μενού" : "Μενού"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/50 transition-all duration-300 hover:bg-black/5 hover:scale-110 md:hidden"
            >
              <span className="relative block h-4 w-4">
                <span
                  className={`absolute inset-x-0 top-0 h-[2px] bg-gray-900 transition-transform duration-300 ${
                    open ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute inset-x-0 top-1/2 h-[2px] bg-gray-900 transition-opacity duration-300 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                  style={{ transform: "translateY(-50%)" }}
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-[2px] bg-gray-900 transition-transform duration-300 ${
                    open ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.div>

      {/* Mobile Menu Dropdown - Glass Effect */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={mobileMenuPanel}
            id="mobile-menu"
            className="absolute left-4 right-4 top-20 z-40 overflow-hidden rounded-3xl border border-black/5 bg-white/90 shadow-xl backdrop-blur-xl"
            ref={drawerRef}
            tabIndex={-1}
          >
            <div className="p-4">
              {/* Menu Items */}
              <motion.div
                variants={mobileMenuList}
                initial="hidden"
                animate="show"
                className="space-y-1"
              >
                {items.map((item) => (
                  <motion.div key={item.href} variants={mobileMenuItem}>
                    <MobileMenuItem
                      href={item.href}
                      label={item.label}
                      onClick={() => setOpen(false)}
                    />
                  </motion.div>
                ))}

                {/* CTA Button in mobile menu */}
                <motion.div variants={mobileMenuItem} className="pt-4">
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
                  >
                    ΖΗΤΗΣΕ ΠΡΟΣΦΟΡΑ
                    <span>→</span>
                  </Link>
                </motion.div>

                {/* Social Links */}
                <motion.div variants={mobileMenuItem} className="pt-3">
                  <a
                    href="https://instagram.com/rebranding_byzoe"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white/50 px-6 py-3 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-black/5"
                  >
                    Instagram
                    <span>→</span>
                  </a>
                </motion.div>

                <motion.p
                  variants={mobileMenuItem}
                  className="pt-4 text-center text-xs text-gray-500"
                >
                  Content • Social Media • Web Styling
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
