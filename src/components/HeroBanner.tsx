"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  kicker?: string;
  title: string;
  subtitle: string;
  imageUrl?: string;
  videoUrl?: string;
};

export default function HeroBanner({
  kicker = "Creative Studio",
  title,
  subtitle,
  imageUrl = "/img/hero.PNG",
  videoUrl,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // mouse-based parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 160, damping: 20 });
  const sy = useSpring(my, { stiffness: 160, damping: 20 });

  // subtle 3D rotation for the whole content block
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);

  // little drifting glow behind
  const glowX = useTransform(sx, [-0.5, 0.5], ["-8%", "8%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["-6%", "6%"]);

  function onMove(e: React.MouseEvent) {
    const el = wrapRef.current;
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
    <section className="relative min-h-[92vh] w-full overflow-hidden flex items-center">
      {/* Background */}
      <div className="absolute inset-0">
        {videoUrl ? (
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        )}

        {/* 2026 Premium gradient overlay - deeper blacks */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,5,5,.88) 0%, rgba(5,5,5,.92) 45%, rgba(5,5,5,.96) 100%)",
          }}
        />

        {/* Electric glow accent */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 1200px 600px at 50% 0%, rgba(255,111,26,.08), transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={wrapRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative container-page w-full"
        style={{ perspective: 1400 }}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="max-w-5xl py-20"
        >
          {/* Electric glow blob that follows mouse */}
          <motion.div
            aria-hidden
            style={{ x: glowX, y: glowY }}
            className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full opacity-20"
            animate={{
              background: [
                "radial-gradient(circle, rgba(255,111,26,.25) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(255,111,26,.15) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(255,111,26,.25) 0%, transparent 70%)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Kicker */}
          <motion.p
            className="kicker"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ transform: "translateZ(20px)" }}
          >
            {kicker}
          </motion.p>

          {/* MASSIVE 2026 Title with 3D depth */}
          <div className="relative mt-4">
            {/* Deep back layer */}
            <motion.h1
              aria-hidden
              className="h1 absolute inset-0 select-none opacity-25"
              style={{
                transform: "translateZ(-50px) translateY(10px)",
                filter: "blur(1.2px)",
                color: "rgba(255,111,26,.15)",
              }}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 0.25, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {title}
            </motion.h1>

            {/* Mid layer */}
            <motion.h1
              aria-hidden
              className="h1 absolute inset-0 select-none opacity-18"
              style={{
                transform: "translateZ(-25px) translateY(5px)",
                filter: "blur(0.4px)",
              }}
              initial={{ opacity: 0, y: 25, scale: 0.99 }}
              animate={{ opacity: 0.18, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {title}
            </motion.h1>

            {/* Front MASSIVE layer */}
            <motion.h1
              className="h1 relative"
              style={{
                transform: "translateZ(35px)",
                textShadow: "0 4px 30px rgba(255,111,26,.15)",
              }}
              initial={{ opacity: 0, y: 20, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.25,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              {title}
            </motion.h1>
          </div>

          {/* Lead text */}
          <motion.p
            className="lead mt-6 max-w-2xl"
            style={{ transform: "translateZ(25px)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons with elastic hover */}
          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            style={{ transform: "translateZ(25px)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link href="/contact" className="btn">
                Ζήτησε προσφορά
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <a
                className="btn secondary"
                href="https://instagram.com/rebranding_byzoe"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
