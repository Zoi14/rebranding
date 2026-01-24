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
    <section className="relative min-h-[86vh] w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {videoUrl ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        )}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,10,.65) 0%, rgba(10,10,10,.78) 55%, rgba(10,10,10,.92) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={wrapRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative container-page section"
        style={{ perspective: 1200 }}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="max-w-3xl"
        >
          {/* moving glow blob */}
          <motion.div
            aria-hidden
            style={{ x: glowX, y: glowY }}
            className="pointer-events-none absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full blur-3xl opacity-25"
          />

          <p className="kicker">{kicker}</p>

          {/* 3D Title */}
          <div className="relative mt-3">
            {/* back layers (depth) */}
            <motion.h1
              aria-hidden
              className="h1 absolute inset-0 select-none opacity-30"
              style={{
                transform: "translateZ(-40px) translateY(8px)",
                filter: "blur(0.6px)",
              }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 0.28, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              {title}
            </motion.h1>

            <motion.h1
              aria-hidden
              className="h1 absolute inset-0 select-none opacity-20"
              style={{
                transform: "translateZ(-20px) translateY(4px)",
                filter: "blur(0.25px)",
              }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 0.2, y: 0 }}
              transition={{ duration: 0.55, delay: 0.03 }}
            >
              {title}
            </motion.h1>

            {/* front layer */}
            <motion.h1
              className="h1 relative"
              style={{ transform: "translateZ(25px)" }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              {title}
            </motion.h1>
          </div>

          <motion.p
            className="lead mt-5"
            style={{ transform: "translateZ(18px)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            {subtitle}
          </motion.p>

          <div
            className="mt-7 flex flex-wrap gap-3"
            style={{ transform: "translateZ(18px)" }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <Link href="/contact" className="btn">
                Ζήτησε προσφορά
              </Link>
            </motion.div>

            <a
              className="btn secondary"
              href="https://instagram.com/rebranding_byzoe"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
