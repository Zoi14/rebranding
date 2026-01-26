"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface ServiceCardProps {
    num: string;
    title: string;
    desc: string;
    icon: ReactNode;
    href?: string;
}

export default function ServiceCard({ num, title, desc, icon, href = "/services" }: ServiceCardProps) {
    return (
        <Link
            href={href}
            className="group relative overflow-hidden hover-lift"
            style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-xl)",
                padding: "3.5rem",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Gradient border on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: "var(--gradient-primary)",
                    padding: "2px",
                    borderRadius: "var(--radius-xl)",
                    zIndex: -1,
                }}
            />

            {/* Animated gradient overlay */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{
                    background: "var(--gradient-mesh)",
                }}
            />

            {/* Number badge */}
            <span
                className="absolute top-8 right-8 text-lg font-display font-medium opacity-20 group-hover:opacity-100 transition-opacity"
                style={{ color: "var(--accent)" }}
            >
                {num}
            </span>

            {/* Icon with animation */}
            <div
                className="mb-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                style={{ color: "var(--text-muted)" }}
            >
                <div className="transition-colors group-hover:text-[var(--accent)]">
                    {icon}
                </div>
            </div>

            {/* Title */}
            <h3
                className="text-xl lg:text-2xl font-display font-medium mb-6 transition-colors"
                style={{ color: "var(--text)", lineHeight: "1.5", marginBottom: "1.5rem" }}
            >
                <span className="group-hover:gradient-text transition-all">
                    {title}
                </span>
            </h3>

            {/* Description */}
            <p
                className="text-sm lg:text-base mb-10"
                style={{
                    color: "var(--text-muted)",
                    lineHeight: "2",
                    letterSpacing: "0.02em",
                    marginBottom: "2rem"
                }}
            >
                {desc}
            </p>

            {/* Arrow link */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider transition-all group-hover:gap-4" style={{ marginTop: "auto" }}>
                <span style={{ color: "var(--accent)", letterSpacing: "0.1em" }}>
                    Μάθε περισσότερα
                </span>
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ color: "var(--accent)" }}
                    className="transition-transform group-hover:translate-x-1"
                >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </div>

            {/* Bottom accent line */}
            <div
                className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                style={{ background: "var(--gradient-primary)" }}
            />
        </Link>
    );
}
