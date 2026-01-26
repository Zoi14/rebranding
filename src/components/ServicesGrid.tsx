"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

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
  onClick,
}: {
  s: Service;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`group relative overflow-hidden border border-white/10 bg-white/[0.03] hover:border-blue-400/30 hover:bg-white/[0.06] rounded-2xl cursor-pointer h-full transition-colors duration-300`}
    >
      <div className="p-6 md:p-8 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-display font-medium text-white group-hover:text-blue-400 transition-colors duration-300 leading-tight">
              {s.title}
            </h3>
            <p className="mt-3 text-sm md:text-base text-slate-400 leading-relaxed font-light">
              {s.desc}
            </p>
          </div>

          {/* Arrow Icon */}
          <div className="mt-1 flex-shrink-0 ml-2 text-white/20 group-hover:text-blue-400 transition-colors duration-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 mb-6 h-px w-full bg-white/5 group-hover:bg-blue-500/30 transition-colors duration-300" />

        {/* Bullets Preview */}
        <ul className="space-y-3 mt-auto">
          {s.bullets.map((b) => (
            <li key={b} className="flex items-center gap-3 text-sm text-slate-300 group-hover:text-white transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400 flex-shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 pt-4 border-t border-white/5 flex items-center text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-blue-400 transition-colors">
          <span>View Details</span>
          <span className="ml-2">→</span>
        </div>
      </div>
    </motion.div>
  );
}

function ServiceModal({ s, onClose }: { s: Service; onClose: () => void }) {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-md"
      />

      {/* Modal Content */}
      <motion.div
        layoutId={`modal-${s.id}`}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0B1121] border border-white/10 rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 right-0 z-10 flex justify-end p-4 bg-gradient-to-b from-[#0B1121] to-transparent">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 md:px-12 pb-12">
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white mb-4">
              {s.title}
            </h2>
            <p className="text-lg md:text-xl text-slate-400 font-light max-w-2xl">
              {s.desc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">

            {/* Left Column: Details */}
            <div className="space-y-10">
              {/* Includes */}
              <div>
                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-blue-400 mb-6">
                  <span className="w-8 h-px bg-blue-500"></span>
                  Τι περιλαμβανει
                </h4>
                <ul className="space-y-4">
                  {s.details.includes.map((x) => (
                    <li key={x} className="flex items-start gap-3 text-base text-slate-200">
                      <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Ideal For & Deliverables */}
            <div className="space-y-8">
              <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-white/60 mb-4">Ιδανικο για</h4>
                  <ul className="space-y-3">
                    {s.details.idealFor.map((x) => (
                      <li key={x} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-blue-500 mt-1 flex-shrink-0">•</span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-white/60 mb-4">Παραδοτεα</h4>
                  <ul className="space-y-3">
                    {s.details.deliverables.map((x) => (
                      <li key={x} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-green-400 mt-1 flex-shrink-0">✓</span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-4">
                <Link
                  href="/contact"
                  className="w-full text-center px-6 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-sm font-bold uppercase tracking-widest text-white transition-all hover:scale-[1.02]"
                >
                  Ζητησε Προσφορα
                </Link>
                <a
                  href="https://instagram.com/rebranding_byzoe"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-center px-6 py-4 rounded-full border border-white/10 hover:bg-white/5 text-sm font-bold uppercase tracking-widest text-slate-300 transition-all"
                >
                  DM στο Instagram
                </a>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ServicesGrid() {
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

  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section className="section bg-[#0F172A] py-40 lg:py-80" aria-label="Υπηρεσίες">
      <div className="container-page px-6 mx-auto max-w-7xl">

        {/* Header */}
        <Reveal>
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-blue-500"></span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                Our Services
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-medium text-white mb-6 leading-tight">
              Επίλεξε την <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                ιδανική λύση
              </span> για εσένα.
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl font-light leading-relaxed">
              Κάνε κλικ σε κάθε κάρτα για να δεις αναλυτικά τι περιλαμβάνει,
              σε ποιον απευθύνεται και τι ακριβώς θα παραλάβεις.
            </p>
          </div>
        </Reveal>

        {/* Grid */}
        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <StaggerItem key={s.id} className="h-full">
              <ServiceCard
                s={s}
                onClick={() => setSelectedService(s)}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Modal */}
        <AnimatePresence>
          {selectedService && (
            <ServiceModal
              s={selectedService}
              onClose={() => setSelectedService(null)}
            />
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}