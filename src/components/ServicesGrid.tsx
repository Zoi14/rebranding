"use client";

import { useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
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
  featured = false,
}: {
  s: Service;
  isOpen: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
  featured?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 180, damping: 20 });
  const sy = useSpring(my, { stiffness: 180, damping: 20 });

  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);

  const glowX = useTransform(sx, [-0.5, 0.5], ["30%", "70%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["25%", "75%"]);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
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
    <div style={{ perspective: 1400 }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onToggle();
        }}
        aria-expanded={isOpen}
        className={`card tile relative overflow-hidden h-full ${
          featured ? "border-electric-500/20" : ""
        }`}
        style={{
          cursor: "pointer",
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: featured
            ? "linear-gradient(135deg, rgba(255,111,26,.04) 0%, rgba(255,255,255,.02) 100%)"
            : "var(--glass-bg)",
          boxShadow: featured
            ? "0 0 0 1px rgba(255,111,26,.15), 0 8px 32px rgba(0,0,0,.4)"
            : "var(--shadow-glass)",
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17,
        }}
      >
        {/* Electric moving highlight */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background: useTransform([glowX, glowY], ([x, y]) => {
              return `radial-gradient(480px circle at ${x} ${y}, rgba(255,111,26,.18), transparent 60%)`;
            }),
          }}
        />

        {/* Glass inner border */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow: featured
              ? "inset 0 0 0 1px rgba(255,111,26,.12)"
              : "inset 0 0 0 1px rgba(255,255,255,.04)",
            opacity: 0.8,
          }}
        />

        {/* content lifted in 3D space */}
        <div style={{ transform: "translateZ(22px)" }} className="relative">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3
                className="text-lg font-bold tracking-tight"
                style={{
                  background: featured
                    ? "linear-gradient(135deg, rgba(255,111,26,.95) 0%, rgba(250,250,250,.9) 100%)"
                    : "linear-gradient(135deg, rgba(250,250,250,.95) 0%, rgba(250,250,250,.75) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {s.desc}
              </p>
            </div>

            <motion.span
              className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border backdrop-blur-sm font-bold text-base"
              style={{
                borderColor: isOpen ? "rgba(255,111,26,.5)" : "var(--glass-border)",
                background: isOpen
                  ? "rgba(255,111,26,.1)"
                  : "rgba(255,255,255,.03)",
              }}
              aria-hidden
              animate={{
                rotate: isOpen ? 180 : 0,
                scale: isOpen ? 1.05 : 1,
                borderColor: isOpen ? "rgba(255,111,26,.5)" : "var(--glass-border)",
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >
              {isOpen ? "−" : "+"}
            </motion.span>
          </div>

          <div className="mt-4 divider" />

          <ul className="mt-5 space-y-2.5 text-sm">
            {s.bullets.map((b, i) => (
              <motion.li
                key={b}
                className="flex items-start gap-2.5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <span
                  aria-hidden
                  className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                  style={{
                    background: featured
                      ? "var(--electric-500)"
                      : "rgba(255,111,26,.6)",
                  }}
                />
                <span className="leading-relaxed">{b}</span>
              </motion.li>
            ))}
          </ul>

          {children}
        </div>
      </motion.div>
    </div>
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

  // Bento grid layout helper: featured services get larger cards
  const bentoLayout = [
    { span: "md:col-span-2", featured: true },  // social (wide)
    { span: "md:col-span-1", featured: false }, // content
    { span: "md:col-span-1", featured: false }, // video
    { span: "md:col-span-2", featured: true },  // web (wide)
    { span: "md:col-span-1", featured: false }, // redesign
    { span: "md:col-span-1", featured: false }, // design
  ];

  return (
    <section className="section" aria-label="Υπηρεσίες">
      <div className="container-page">
        <div className="page-header">
          <motion.span
            className="badge"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Υπηρεσίες
          </motion.span>
          <motion.h2
            className="mt-4 text-3xl sm:text-4xl font-black tracking-tighter uppercase"
            style={{
              background: "linear-gradient(135deg, rgba(250,250,250,.98) 0%, rgba(250,250,250,.7) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Πάτα για λεπτομέρειες
          </motion.h2>
          <motion.p
            className="mt-3"
            style={{ color: "var(--muted)" }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            Κάθε κάρτα ανοίγει για να δεις τι περιλαμβάνει, για ποιον είναι και τι παραδίδω.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <div className="mt-10 grid gap-5 md:grid-cols-3 auto-rows-fr">
          {services.map((s, i) => {
            const isOpen = openId === s.id;
            const layout = bentoLayout[i] || { span: "md:col-span-1", featured: false };

            return (
              <Reveal key={s.id} delay={i * 0.08} y={28}>
                <div className={layout.span}>
                  <ServiceCard
                    s={s}
                    isOpen={isOpen}
                    onToggle={() => setOpenId((cur) => (cur === s.id ? null : s.id))}
                    featured={layout.featured}
                  >
                    <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        className="overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                        style={{ transform: "translateZ(18px)" }}
                      >
                        <div className="mt-6 space-y-5">
                          <div>
                            <p className="text-sm font-bold tracking-wide uppercase opacity-80">
                              Τι περιλαμβάνει
                            </p>
                            <ul className="mt-3 space-y-2.5 text-sm" style={{ color: "var(--muted)" }}>
                              {s.details.includes.map((x, i) => (
                                <motion.li
                                  key={x}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  className="flex gap-2"
                                >
                                  <span className="text-electric-500">•</span>
                                  <span>{x}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p className="text-sm font-bold tracking-wide uppercase opacity-80">
                              Ιδανικό για
                            </p>
                            <ul className="mt-3 space-y-2.5 text-sm" style={{ color: "var(--muted)" }}>
                              {s.details.idealFor.map((x, i) => (
                                <motion.li
                                  key={x}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  className="flex gap-2"
                                >
                                  <span className="text-electric-500">•</span>
                                  <span>{x}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p className="text-sm font-bold tracking-wide uppercase opacity-80">
                              Παραδοτέα
                            </p>
                            <ul className="mt-3 space-y-2.5 text-sm" style={{ color: "var(--muted)" }}>
                              {s.details.deliverables.map((x, i) => (
                                <motion.li
                                  key={x}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  className="flex gap-2"
                                >
                                  <span className="text-electric-500">•</span>
                                  <span>{x}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-2 pb-1">
                            <p className="text-xs italic opacity-70" style={{ color: "var(--muted)" }}>
                              Η τιμολόγηση προσαρμόζεται στις ανάγκες του κάθε project.
                            </p>
                          </div>

                          <div className="pt-3 flex flex-wrap gap-3">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                              <a
                                href={`https://instagram.com/${IG_USERNAME}`}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-jesper"
                              >
                                Instagram DM <span className="arrow">→</span>
                              </a>
                            </motion.div>

                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                              <a href="/contact" className="btn-jesper primary">
                                Ζήτησε προσφορά <span className="arrow">→</span>
                              </a>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    </AnimatePresence>
                  </ServiceCard>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
