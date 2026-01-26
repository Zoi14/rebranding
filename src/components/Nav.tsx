"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

type NavItem = { href: string; label: string };

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const items: NavItem[] = useMemo(
    () => [
      { href: "/", label: "Αρχική" },
      { href: "/services", label: "Υπηρεσίες" },
      { href: "/contact", label: "Επικοινωνία" },
    ],
    []
  );

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useFocusTrap(drawerRef, open, () => setOpen(false));

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <>
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <div className="container-page">
          <nav className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <span
                className="text-xl lg:text-2xl font-display font-medium tracking-tight transition-colors"
                style={{ color: scrolled ? "var(--text)" : "white" }}
              >
                Rebranding
              </span>
              <span
                className="hidden sm:block text-xs uppercase tracking-widest transition-colors"
                style={{
                  color: scrolled ? "var(--accent)" : "rgba(255,255,255,0.7)",
                  letterSpacing: "0.2em"
                }}
              >
                by Zoe
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-12">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative text-sm uppercase tracking-widest transition-colors group"
                  style={{
                    color: scrolled
                      ? (isActive(item.href) ? "var(--accent)" : "var(--text-muted)")
                      : (isActive(item.href) ? "white" : "rgba(255,255,255,0.7)"),
                    letterSpacing: "0.15em",
                  }}
                >
                  {item.label}
                  <span
                    className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                    style={{
                      width: isActive(item.href) ? "100%" : "0%",
                      background: scrolled ? "var(--accent)" : "white",
                    }}
                  />
                  <span
                    className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                    style={{
                      background: scrolled ? "var(--accent)" : "white",
                    }}
                  />
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* CTA Button - Desktop */}
              <Link
                href="/contact"
                className="hidden lg:inline-flex px-6 py-3 text-xs uppercase tracking-widest transition-all duration-300"
                style={{
                  background: scrolled ? "var(--accent)" : "white",
                  color: scrolled ? "white" : "var(--bg-dark)",
                  letterSpacing: "0.12em",
                }}
              >
                Ζήτησε Προσφορά
              </Link>

              {/* Menu Button */}
              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-3 py-2 transition-colors"
                style={{
                  color: scrolled ? "var(--text)" : "white",
                }}
              >
                <span className="hidden sm:block text-xs uppercase tracking-widest" style={{ letterSpacing: "0.15em" }}>
                  Menu
                </span>
                <div className="flex flex-col gap-1.5 w-6">
                  <span
                    className="h-px w-full transition-colors"
                    style={{ background: scrolled ? "var(--text)" : "white" }}
                  />
                  <span
                    className="h-px w-4 ml-auto transition-colors"
                    style={{ background: scrolled ? "var(--text)" : "white" }}
                  />
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Fullscreen Menu */}
      <div
        className="fixed inset-0 transition-all duration-500"
        style={{
          zIndex: 9999,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {/* Dark overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: "var(--bg-dark)",
            opacity: open ? 1 : 0,
          }}
          onClick={() => setOpen(false)}
        />

        {/* Menu panel */}
        <div
          ref={drawerRef}
          className="absolute top-0 right-0 h-full w-full lg:w-[500px] transition-transform duration-500 ease-out"
          style={{
            background: "var(--bg)",
            transform: open ? "translateX(0)" : "translateX(100%)",
          }}
        >
          <div className="h-full flex flex-col">
            {/* Menu Header */}
            <div className="flex items-center justify-between h-20 lg:h-24 px-6 lg:px-12 border-b" style={{ borderColor: "var(--border)" }}>
              <span className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)", letterSpacing: "0.2em" }}>
                Menu
              </span>
              <button
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 text-xs uppercase tracking-widest transition-colors hover:text-[var(--accent)]"
                style={{ color: "var(--text)", letterSpacing: "0.15em" }}
              >
                Close
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex-1 overflow-y-auto px-6 lg:px-12 py-12">
              {/* Navigation */}
              <nav className="space-y-1 mb-16">
                {items.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-5 border-b group transition-colors hover:text-[var(--accent)]"
                    style={{
                      borderColor: "var(--border)",
                      color: isActive(item.href) ? "var(--accent)" : "var(--text)",
                    }}
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-xs" style={{ color: "var(--text-light)" }}>
                        0{index + 1}
                      </span>
                      <span className="text-2xl lg:text-3xl font-display font-light">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-lg transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                ))}
              </nav>

              {/* Contact Info */}
              <div className="space-y-8">
                <p className="text-xs uppercase tracking-widest" style={{ color: "var(--text-light)", letterSpacing: "0.2em" }}>
                  Επικοινωνία
                </p>

                <div className="space-y-6">
                  <a
                    href="mailto:rebrandingbyzoe@gmail.com"
                    className="block text-lg transition-colors hover:text-[var(--accent)]"
                    style={{ color: "var(--text)" }}
                  >
                    rebrandingbyzoe@gmail.com
                  </a>
                  <a
                    href="https://instagram.com/rebranding_byzoe"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-lg transition-colors hover:text-[var(--accent)]"
                    style={{ color: "var(--text)" }}
                  >
                    @rebranding_byzoe
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                </div>

                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex mt-4 px-8 py-4 text-xs uppercase tracking-widest transition-opacity hover:opacity-80"
                  style={{
                    background: "var(--accent)",
                    color: "white",
                    letterSpacing: "0.12em",
                  }}
                >
                  Δωρεάν Αξιολόγηση
                </Link>
              </div>
            </div>

            {/* Menu Footer */}
            <div className="px-6 lg:px-12 py-6 border-t" style={{ borderColor: "var(--border)" }}>
              <p className="text-xs" style={{ color: "var(--text-light)" }}>
                © {new Date().getFullYear()} Rebranding by Zoe
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
