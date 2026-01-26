import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "../../components/ContactForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Επικοινωνία",
  description: "Φόρμα επικοινωνίας για αιτήματα & συνεργασίες.",
};

export default function Page() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, var(--bg-dark) 0%, #1E293B 100%)",
          }}
        />

        {/* Decorative elements */}
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-10"
          style={{ background: "var(--accent)", filter: "blur(100px)" }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full opacity-10"
          style={{ background: "var(--accent)", filter: "blur(80px)" }}
        />

        {/* Decorative lines */}
        <div
          className="absolute top-1/2 left-0 w-1/3 h-px opacity-20"
          style={{ background: "linear-gradient(90deg, transparent, var(--accent))" }}
        />
        <div
          className="absolute top-1/2 right-0 w-1/3 h-px opacity-20"
          style={{ background: "linear-gradient(90deg, var(--accent), transparent)" }}
        />

        {/* Content */}
        <div className="relative container-page text-center py-32">
          <div className="max-w-2xl mx-auto">
            {/* Kicker */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="w-12 h-px" style={{ background: "var(--accent)" }} />
              <span
                className="text-xs uppercase tracking-widest"
                style={{ color: "var(--accent)", letterSpacing: "0.25em" }}
              >
                Contact
              </span>
              <span className="w-12 h-px" style={{ background: "var(--accent)" }} />
            </div>

            {/* Title */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium leading-tight mb-6"
              style={{ color: "var(--text-on-dark)" }}
            >
              Ας <span style={{ color: "var(--accent)" }}>μιλήσουμε</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg lg:text-xl max-w-lg mx-auto leading-relaxed"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Στείλε μου μήνυμα και θα σου απαντήσω μέσα σε 24 ώρες.
              Ας δημιουργήσουμε κάτι μαζί.
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

      {/* ========== CONTACT SECTION ========== */}
      <section className="py-16 lg:py-24">
        <div className="container-page">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px" style={{ background: "var(--accent)" }} />
                  <span
                    className="text-xs uppercase tracking-widest"
                    style={{ color: "var(--accent)", letterSpacing: "0.2em" }}
                  >
                    Φόρμα Επικοινωνίας
                  </span>
                </div>
                <p style={{ color: "var(--text-muted)" }}>
                  Συμπλήρωσε τα στοιχεία σου και περίγραψε τι χρειάζεσαι.
                </p>
              </div>

              <Suspense fallback={<div style={{ padding: 40 }}>Φόρτωση...</div>}>
                <ContactForm />
              </Suspense>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <div
                className="relative p-8 lg:p-10 h-full"
                style={{ background: "var(--bg-dark)" }}
              >
                {/* Decorative corners */}
                <div
                  className="absolute top-4 right-4 w-12 h-12 border-t border-r"
                  style={{ borderColor: "var(--accent)" }}
                />
                <div
                  className="absolute bottom-4 left-4 w-12 h-12 border-b border-l"
                  style={{ borderColor: "var(--accent)" }}
                />

                <div className="relative">
                  <h3
                    className="text-xl font-display font-medium mb-10"
                    style={{ color: "var(--text-on-dark)" }}
                  >
                    Στοιχεία Επικοινωνίας
                  </h3>

                  <div className="space-y-8">
                    <div>
                      <p
                        className="text-xs uppercase tracking-widest mb-3"
                        style={{ color: "var(--accent)", letterSpacing: "0.15em" }}
                      >
                        Email
                      </p>
                      <a
                        href="mailto:rebrandingbyzoe@gmail.com"
                        className="text-lg transition-colors hover:text-[var(--accent)]"
                        style={{ color: "var(--text-on-dark)" }}
                      >
                        rebrandingbyzoe@gmail.com
                      </a>
                    </div>

                    <div>
                      <p
                        className="text-xs uppercase tracking-widest mb-3"
                        style={{ color: "var(--accent)", letterSpacing: "0.15em" }}
                      >
                        Instagram
                      </p>
                      <a
                        href="https://instagram.com/rebranding_byzoe"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-lg transition-colors hover:text-[var(--accent)]"
                        style={{ color: "var(--text-on-dark)" }}
                      >
                        @rebranding_byzoe
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                      </a>
                    </div>

                    <div>
                      <p
                        className="text-xs uppercase tracking-widest mb-3"
                        style={{ color: "var(--accent)", letterSpacing: "0.15em" }}
                      >
                        Απάντηση
                      </p>
                      <p style={{ color: "rgba(255,255,255,0.6)" }}>
                        Συνήθως μέσα σε 24 ώρες
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className="my-10 h-px"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                  />

                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Προτιμάς να στείλεις απευθείας; DM στο Instagram
                    ή email - θα σου απαντήσω το συντομότερο.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
