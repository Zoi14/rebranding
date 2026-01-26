"use client";

import React from "react";
import { motion } from "framer-motion";

const MARQUEE_ITEMS = [
  "Social Media Management",
  "Content Creation",
  "Web Design & Development",
  "Video Editing",
  "Brand Strategy",
  "Rebranding",
  "Posters & Graphics",
];

export default function MarqueeLine() {
  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-[#0F172A] py-6 select-none">

      {/* --- Gradient Fades (για να σβήνει ομαλά στις άκρες) --- */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 z-10 bg-gradient-to-r from-[#0F172A] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 z-10 bg-gradient-to-l from-[#0F172A] to-transparent pointer-events-none" />

      {/* --- The Moving Track --- */}
      <div className="flex">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 30, // Πόσο αργά κυλάει (μεγαλύτερο νούμερο = πιο αργά)
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex flex-shrink-0 items-center gap-8 pr-8"
        >
          {/* Render Items Twice for Seamless Loop */}
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
            <div key={index} className="flex items-center gap-8">
              <span className="text-sm md:text-base uppercase tracking-[0.2em] text-slate-400 font-medium whitespace-nowrap">
                {item}
              </span>
              {/* Separator Dot */}
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}