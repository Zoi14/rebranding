"use client";

import Link from "next/link";

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
          <p className="kicker hero-kicker">{kicker}</p>

          <h1 className="h1 mt-3 hero-title">{title}</h1>

          <p className="lead mt-5 hero-subtitle">{subtitle}</p>

          <div className="mt-7 flex flex-wrap gap-3 hero-actions">
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
          </div>
        </div>
      </div>
    </section>
  );
}
