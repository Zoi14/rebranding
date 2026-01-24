"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

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

  return (
    <header className="sticky top-0 z-50">
      {/* top bar */}
      <div
        className="border-b"
        style={{
          borderColor: "rgba(255,255,255,.10)",
          background: "rgba(0,0,0,.55)",
          backdropFilter: "blur(8px)",
        }}
      >
        <nav
          className="mx-auto max-w-6xl px-4 flex items-center justify-between"
          style={{
            height: "56px",
          }}
        >
          <div className="flex w-full items-center justify-between">
            {/* BRAND */}
            <Link
              href="/"
              className="inline-flex items-center gap-2"
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
              style={{ color: "rgba(245,245,245,.62)" }}
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
          </div>
        </nav>
      </div>

      {/* Fullscreen overlay menu */}
        {open && (
          <aside
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

            <div
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
                  <div>
                    {items.map((it) => (
                      <div key={it.href}>
                        <MenuItem
                          href={it.href}
                          label={it.label}
                          onClick={() => setOpen(false)}
                        />
                      </div>
                    ))}

                    <div className="mt-6 flex flex-wrap gap-3">
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
                    </div>

                    <p
                      className="mt-8 text-xs"
                      style={{ color: "rgba(245,245,245,.62)" }}
                    >
                      Content • Social Media • Web Styling
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}
    </header>
  );
}
