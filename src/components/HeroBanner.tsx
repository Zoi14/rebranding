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
      <div className="relative container-page section">
        <div className="max-w-3xl">
          <motion.p
            className="kicker"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
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
