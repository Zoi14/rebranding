import ServicesGrid from "@/components/ServicesGrid";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, var(--bg-dark) 0%, #1E293B 100%)",
          }}
        />

        {/* Decorative elements */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: "var(--accent)", filter: "blur(120px)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10"
          style={{ background: "var(--accent)", filter: "blur(80px)" }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px),
                              linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Content */}
        <div className="relative container-page text-center py-32">
          <div className="max-w-3xl mx-auto">
            {/* Kicker */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="w-12 h-px" style={{ background: "var(--accent)" }} />
              <span
                className="text-xs uppercase tracking-widest"
                style={{ color: "var(--accent)", letterSpacing: "0.25em" }}
              >
                Services
              </span>
              <span className="w-12 h-px" style={{ background: "var(--accent)" }} />
            </div>

            {/* Title */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium leading-tight mb-6"
              style={{ color: "var(--text-on-dark)" }}
            >
              Υπηρεσίες για
              <br />
              <span style={{ color: "var(--accent)" }}>premium</span> παρουσία
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg lg:text-xl max-w-xl mx-auto leading-relaxed"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Social media, content creation, web design & redesign.
              Ολοκληρωμένες λύσεις για brands που θέλουν να ξεχωρίσουν.
            </p>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{
            background: "linear-gradient(to top, var(--bg), transparent)",
          }}
        />
      </section>

      {/* ========== SERVICES GRID ========== */}
      <ServicesGrid />

      {/* ========== CTA ========== */}
      <section className="py-24 bg-slate-50">
        <div className="container-page">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-8 h-px bg-blue-500" />
              <span className="text-xs uppercase tracking-widest text-blue-500 font-bold">
                Get Started
              </span>
              <span className="w-8 h-px bg-blue-500" />
            </div>

            <h2 className="text-3xl lg:text-5xl font-display font-medium mb-6 text-slate-900">
              Δεν είσαι σίγουρη τι χρειάζεσαι;
            </h2>

            <p className="text-lg text-slate-600 mb-12 leading-relaxed">
              Στείλε μου μήνυμα και θα σε βοηθήσω να βρεις την ιδανική λύση για το brand σου.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link
                href="/contact"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-bold uppercase tracking-widest transition-all hover:scale-105 shadow-[0_4px_20px_rgba(37,99,235,0.3)]"
              >
                Δωρεαν Αξιολογηση
              </Link>
              <a
                href="https://instagram.com/rebranding_byzoe"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 border border-slate-300 hover:border-slate-900 text-slate-600 hover:text-slate-900 rounded-full text-sm font-bold uppercase tracking-widest transition-all hover:bg-white"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
