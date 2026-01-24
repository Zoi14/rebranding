"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";

type Service = {
  id: string;
  title: string;
  desc: string;
  bullets: string[];
  details: {
    includes: string[];
    idealFor: string[];
    deliverables: string[];
  };
};

function ServiceCard({
  s,
  isOpen,
  onToggle,
  children,
}: {
  s: Service;
  isOpen: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onToggle();
      }}
      aria-expanded={isOpen}
      className="card tile relative overflow-hidden"
      style={{ cursor: "pointer" }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.15 }}
    >
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
              {s.desc}
            </p>
          </div>

          <motion.span
            className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-lg border"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in srgb, var(--surface-strong) 80%, transparent)",
            }}
            aria-hidden
            animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.03 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? "−" : "+"}
          </motion.span>
        </div>

        <div className="mt-4 divider" />

        <ul className="mt-4 space-y-2 text-sm">
          {s.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span
                aria-hidden
                className="mt-1 h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--brand-500)" }}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {children}
      </div>
    </motion.div>
  );
}

export default function ServicesGrid() {
  const IG_USERNAME = "rebranding_byzoe";

  const services: Service[] = useMemo(
    () => [
      {
        id: "social",
        title: "Διαχείριση Social Media",
        desc: "Στρατηγική, πρόγραμμα περιεχομένου, captions & δημοσιεύσεις με συνεπή αισθητική.",
        bullets: ["Content plan", "Captions & hashtags", "Brand consistency"],
        details: {
          includes: [
            "Στρατηγική & στόχοι (μήνα/εβδομάδα)",
            "Calendar περιεχομένου",
            "Captions + hashtags",
            "Basic reporting (προαιρετικά)",
          ],
          idealFor: [
            "Επαγγελματίες/brands που θέλουν συνέπεια",
            "Business που θέλουν καθαρή, premium εικόνα",
          ],
          deliverables: [
            "Πλάνο περιεχομένου",
            "Posts/Reels scheduling",
            "Mini report (ανά πακέτο)",
          ],
        },
      },
      {
        id: "content",
        title: "Δημιουργία Περιεχομένου",
        desc: "Γυρίσματα με κινητό + δημιουργικά videos που δείχνουν premium.",
        bullets: ["Reels/TikTok", "Hook-first structure", "Templates"],
        details: {
          includes: [
            "Ιδέες / hooks",
            "Λήψεις με κινητό (όπου γίνεται)",
            "Μοντάζ + υπότιτλοι",
            "Exports για IG/TikTok",
          ],
          idealFor: [
            "Creators/brands που χρειάζονται υλικό",
            "Υπηρεσίες που θέλουν καλύτερο content look",
          ],
          deliverables: ["Reels/shorts", "Story cutdowns", "Cover frames"],
        },
      },
      {
        id: "video",
        title: "Επεξεργασία Video",
        desc: "Καθαρό μοντάζ, ρυθμός, υπότιτλοι και pro τελείωμα.",
        bullets: ["Editing", "Subtitles", "Color/Audio polish"],
        details: {
          includes: [
            "Cut & pacing",
            "Captions / subtitles",
            "Basic color correction",
            "Audio cleanup",
          ],
          idealFor: ["Όποιον έχει raw υλικό", "Συχνό posting χωρίς χρόνο για editing"],
          deliverables: ["Exports σε σωστές αναλογίες", "1–2 revisions (ανά πακέτο)"],
        },
      },
      {
        id: "web",
        title: "Web Design / Κατασκευή Site",
        desc: "Στυλάτο site που παρουσιάζει σωστά τις υπηρεσίες σου και οδηγεί σε leads.",
        bullets: ["Landing pages", "Portfolio", "Conversion-first structure"],
        details: {
          includes: [
            "Responsive design",
            "Δομή για conversions (CTA flow)",
            "Βασικό SEO structure",
          ],
          idealFor: ["Νέα παρουσία online", "Υπηρεσίες που θέλουν leads"],
          deliverables: [
            "Landing ή πολυσέλιδο site",
            "Φόρμα επικοινωνίας",
            "Βασικά performance tweaks",
          ],
        },
      },
      {
        id: "redesign",
        title: "Redesign Υπάρχοντος Site",
        desc: "Αναβάθμιση design/UX για να φαίνεται premium και να δουλεύει καλύτερα.",
        bullets: ["UI refresh", "Better UX", "CTA optimization"],
        details: {
          includes: ["UI refresh", "Βελτίωση δομής/κειμένων", "CTA & sections redesign"],
          idealFor: ["Site που φαίνεται παλιό", "Όταν θες πιο premium εικόνα"],
          deliverables: ["Νέα sections", "Βελτιωμένο look & flow", "Σημειώσεις για βελτιώσεις"],
        },
      },
      {
        id: "design",
        title: "Posters & Creatives",
        desc: "Posters, promos και visuals για καμπάνιες & stories.",
        bullets: ["Campaign creatives", "Story templates", "Print & digital"],
        details: {
          includes: [
            "Design posters/visuals",
            "IG story templates",
            "Brand consistency",
          ],
          idealFor: ["Προσφορές/καμπάνιες", "Events", "Συνεχή ανάγκη για visuals"],
          deliverables: [
            "PNG/JPG exports",
            "Εκδόσεις για story/post",
            "Source files (αν συμφωνηθεί)",
          ],
        },
      },
    ],
    []
  );

  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="section" aria-label="Υπηρεσίες">
      <div className="container-page">
        <div className="page-header">
          <span className="badge">Υπηρεσίες</span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">
            Πάτα σε μια υπηρεσία για λεπτομέρειες
          </h2>
          <p className="mt-2" style={{ color: "var(--muted)" }}>
            Κάθε κάρτα ανοίγει για να δεις τι περιλαμβάνει, για ποιον είναι και τι παραδίδω.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const isOpen = openId === s.id;

            return (
              <Reveal key={s.id} delay={i * 0.06} y={22}>
                <ServiceCard
                  s={s}
                  isOpen={isOpen}
                  onToggle={() => setOpenId((cur) => (cur === s.id ? null : s.id))}
                >
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="mt-5 space-y-4">
                          <div>
                            <p className="text-sm font-semibold">Τι περιλαμβάνει</p>
                            <ul className="mt-2 space-y-2 text-sm" style={{ color: "var(--muted)" }}>
                              {s.details.includes.map((x) => (
                                <li key={x}>• {x}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p className="text-sm font-semibold">Ιδανικό για</p>
                            <ul className="mt-2 space-y-2 text-sm" style={{ color: "var(--muted)" }}>
                              {s.details.idealFor.map((x) => (
                                <li key={x}>• {x}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p className="text-sm font-semibold">Παραδοτέα</p>
                            <ul className="mt-2 space-y-2 text-sm" style={{ color: "var(--muted)" }}>
                              {s.details.deliverables.map((x) => (
                                <li key={x}>• {x}</li>
                              ))}
                            </ul>
                          </div>

                          <p className="text-xs" style={{ color: "var(--muted)" }}>
                            Η τιμολόγηση προσαρμόζεται στις ανάγκες του κάθε project.
                          </p>

                          <div className="pt-3 flex flex-wrap gap-3">
                            <a
                              href={`https://instagram.com/${IG_USERNAME}`}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-jesper"
                            >
                              Instagram DM <span className="arrow">→</span>
                            </a>

                            <a href="/contact" className="btn-jesper primary">
                              Ζήτησε προσφορά <span className="arrow">→</span>
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </ServiceCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
