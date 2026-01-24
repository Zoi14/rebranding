"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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

  return (
    <section className="relative min-h-[86vh] w-full overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50">
      {/* Light Mode Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(15,23,42,0.15) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(37,99,235,.02) 0%, transparent 50%, rgba(37,99,235,.04) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative container-page section">
        <div className="max-w-3xl">

          <motion.p
            className="kicker"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {kicker}
          </motion.p>

          <motion.h1
            className="h1 mt-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="lead mt-5"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            className="mt-7 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
          >
            <Link href="/contact" className="btn">
              Ζήτησε προσφορά
            </Link>

            <a
              className="btn secondary"
              href="https://instagram.com/rebranding_byzoe"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
