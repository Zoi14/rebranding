"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = React.PropsWithChildren<{ href: string; exact?: boolean; className?: string }>;

export default function ActiveLink({ href, exact = false, className, children }: Props) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : (pathname === href || pathname.startsWith(href));
  return (
    <Link
      href={href}
      className={[
        "px-3 py-2 rounded-xl transition",
        isActive ? "bg-neutral-800 text-white" : "text-neutral-300 hover:text-white hover:bg-neutral-800",
        className ?? "",
      ].join(" ")}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}