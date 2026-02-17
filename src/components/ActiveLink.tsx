"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import React from "react";

type Props = React.PropsWithChildren<{
  href: string;
  exact?: boolean;
  className?: string;
}>;

export default function ActiveLink({ href, exact = false, className = "", children }: Props) {
  const pathname = usePathname();

  // Διόρθωση λογικής: Αν το href είναι η αρχική ("/") κάνουμε πάντα exact match
  // αλλιώς ελέγχουμε αν το pathname ξεκινάει με το href (για subpages π.χ. /services/web)
  const isActive = href === "/"
    ? pathname === href
    : exact
      ? pathname === href
      : (pathname || "").startsWith(href);

  return (
    <Link
      href={href}
      className={`relative px-4 py-2 text-sm uppercase tracking-widest font-medium transition-all duration-300
        ${isActive ? "text-white" : "text-slate-400 hover:text-white"}
        ${className}
      `}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="relative z-10">{children}</span>

      {/* Active Indicator: Glowing Blue Dot */}
      {isActive && (
        <motion.span
          layoutId="nav-indicator"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,1)]"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        />
      )}

      {/* Subtle Hover Effect Background */}
      <span className="absolute inset-0 rounded-lg bg-white/0 hover:bg-white/[0.03] transition-colors -z-10" />
    </Link>
  );
}