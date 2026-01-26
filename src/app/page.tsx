import React from "react";
import Link from "next/link";
import MarqueeLine from "@/components/MarqueeLine";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import AnimatedCounter from "@/components/AnimatedCounter";

// IMPORT ANIMATIONS
import { Reveal } from "@/components/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";
import ServicesGrid from "@/components/ServicesGrid";
import LiquidSphere from "@/components/LiquidSphere"; // <--- ΤΟ ΝΕΟ 3D IMPORT

export default function HomePage() {
  return (
    <div className="bg-[#0F172A] text-white selection:bg-blue-500 selection:text-white overflow-hidden">
      <ScrollProgress />
      <BackToTop />

      {/* ========== HERO SECTION WITH 3D BLOB ========== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* --- 3D BACKGROUND (Liquid Sphere) --- */}
        {/* Αυτό αντικαθιστά το VideoBackground */}
        <LiquidSphere />

        {/* --- HERO CONTENT --- */}
        {/* ΠΡΟΣΟΧΗ: pointer-events-none για να περνάει το ποντίκι στο 3D background */}
        <div className="relative container mx-auto px-6 pt-32 pb-20 z-10 text-center flex flex-col items-center pointer-events-none">

          <Reveal>
            <div className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
                Creative Studio 2026
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-6xl md:text-7xl lg:text-9xl font-display font-medium leading-[1.1] mb-8 tracking-tighter drop-shadow-2xl">
              Απογείωσε το <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 filter drop-shadow-lg">
                Brand
              </span> σου
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-2xl text-slate-200 max-w-2xl mx-auto mb-12 leading-relaxed font-light drop-shadow-md">
              Digital εμπειρίες που συνδυάζουν στρατηγική και <br className="hidden md:block" /> premium αισθητική.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            {/* ΣΗΜΑΝΤΙΚΟ: pointer-events-auto ΕΔΩ για να πατιούνται τα κουμπιά */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pointer-events-auto">
              <Link href="/contact" className="group relative px-8 py-4 bg-white text-black rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)]">
                <span className="relative z-10 font-bold tracking-widest text-sm uppercase group-hover:text-blue-600 transition-colors">
                  Ξεκινα Τωρα
                </span>
              </Link>
              <Link href="/services" className="px-8 py-4 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm hover:bg-white/10 transition-all text-sm uppercase tracking-widest font-medium text-slate-200 hover:text-white hover:border-white/40">
                Υπηρεσιες
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== MARQUEE ========== */}
      <Reveal width="100%">
        <div className="border-y border-white/5 bg-[#0F172A]/80 backdrop-blur-xl relative z-20">
          <MarqueeLine />
        </div>
      </Reveal>

      {/* ========== BENTO GRID STATS ========== */}
      <section className="py-32 lg:py-48 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Left Content */}
            <div>
              <Reveal>
                <h2 className="text-4xl lg:text-6xl font-display font-medium mb-8 leading-tight">
                  Δημιουργώ <span className="text-blue-400 italic">digital experiences</span> που μένουν αξέχαστες.
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="space-y-6 text-lg text-slate-300 font-light leading-relaxed">
                  <p>
                    Είμαι η Ζωή. Με σπουδές στο <strong className="text-white font-medium">Web Design & Development</strong> και εξειδίκευση στο <strong className="text-white font-medium">Marketing</strong>, γεφυρώνω το χάσμα μεταξύ τεχνολογίας και δημιουργικότητας.
                  </p>
                  <p>
                    Δεν διαχειρίζομαι απλά λογαριασμούς. Βοηθάω επιχειρήσεις να βρουν την ψηφιακή τους ταυτότητα και να <span className="text-blue-400">απογειώσουν</span> την παρουσία τους στα Social Media με στρατηγική που φέρνει αποτελέσματα.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-widest text-slate-400">
                    Strategy
                  </span>
                  <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-widest text-slate-400">
                    Design
                  </span>
                  <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-widest text-slate-400">
                    Development
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Right: Bento Grid Stats with STAGGER */}
            <StaggerContainer className="grid grid-cols-2 gap-4">
              <StaggerItem className="p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="text-4xl font-display font-bold text-white mb-2">Unique</div>
                <div className="text-sm uppercase tracking-widest text-slate-500">Vision</div>
              </StaggerItem>

              <StaggerItem className="p-8 rounded-3xl bg-blue-600 border border-blue-500 text-white transform lg:translate-y-8 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                <div className="text-5xl font-display font-bold mb-2">
                  <AnimatedCounter end={100} suffix="%" />
                </div>
                <div className="text-sm uppercase tracking-widest text-blue-200">Αφοσιωση</div>
              </StaggerItem>

              <StaggerItem className="p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="text-4xl font-display font-bold text-white mb-2">Fresh</div>
                <div className="text-sm uppercase tracking-widest text-slate-500">Ideas</div>
              </StaggerItem>

              <StaggerItem className="p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors transform lg:translate-y-8">
                <div className="text-5xl font-display font-bold text-white mb-2">24h</div>
                <div className="text-sm uppercase tracking-widest text-slate-500">Support</div>
              </StaggerItem>
            </StaggerContainer>

          </div>
        </div>
      </section>

      {/* ========== SERVICES (Detailed Grid) ========== */}
      <ServicesGrid />

      {/* ========== CTA (Scale Animation) ========== */}
      <section className="relative py-32 lg:py-48 flex items-center justify-center">
        <Reveal>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-5xl md:text-7xl font-display font-medium text-white mb-8">
              Ready to launch?
            </h2>
            <Link href="/contact" className="inline-block px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition-all hover:scale-110 shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]">
              Ζητησε Προσφορα
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}