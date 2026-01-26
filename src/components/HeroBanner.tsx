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
  imageUrl = "/img/hero.png",
  videoUrl,
}: Props) {
  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden flex items-center">
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

        {/* Overlay - professional blue gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,23,42,.55) 0%, rgba(15,23,42,.70) 50%, rgba(15,23,42,.85) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative container-page py-20">
        <div className="max-w-3xl">
          {/* Kicker with decorative gold line */}
          <div className="flex items-center gap-3">
            <span
              className="w-8 h-px"
              style={{ background: "var(--accent)" }}
            />
            <p
              className="text-xs font-medium uppercase tracking-widest"
              style={{ color: "var(--accent)", letterSpacing: "0.2em" }}
            >
              {kicker}
            </p>
          </div>

          {/* Title with display font */}
          <h1
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-display font-medium leading-tight"
            style={{ color: "white", letterSpacing: "-0.02em" }}
          >
            {title}
          </h1>

          <p
            className="mt-6 text-lg sm:text-xl max-w-xl leading-relaxed"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            {subtitle}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            {/* Primary CTA */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-xs font-medium uppercase tracking-widest transition-all duration-300 hover:opacity-90"
              style={{
                background: "var(--accent)",
                color: "white",
                letterSpacing: "0.15em",
              }}
            >
              Ζήτησε προσφορά
            </Link>

            {/* Secondary CTA */}
            <a
              href="https://instagram.com/rebranding_byzoe"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 text-xs font-medium uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-[var(--bg-dark)]"
              style={{
                background: "transparent",
                color: "white",
                border: "1px solid rgba(255,255,255,0.4)",
                letterSpacing: "0.15em",
              }}
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Decorative gold accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-30"
        style={{
          background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
        }}
      />
    </section>
  );
}
