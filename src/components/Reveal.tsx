"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export default function Reveal({ children, className = "", delay = 0, y = 18 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  // ✅ every time (not once)
  const inView = useInView(ref, {
    once: false,
    margin: "-10% 0px -10% 0px",
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      // ✅ όταν είναι έξω, γυρνάει πίσω (reset)
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y, filter: "blur(6px)" }}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
