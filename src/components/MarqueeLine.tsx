"use client";

import { motion } from "framer-motion";

export default function MarqueeLine() {
  const text =
    "Social Media • Content Creation • Web Design • Redesign • Posters • Video Editing • ";

  return (
    <div className="overflow-hidden border-y" style={{ borderColor: "var(--border)" }}>
      <motion.div
        className="whitespace-nowrap py-3 text-sm"
        style={{ color: "var(--muted)" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
      >
        <span className="mr-8">{text}{text}{text}</span>
      </motion.div>
    </div>
  );
}
