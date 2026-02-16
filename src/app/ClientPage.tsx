/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
// Βεβαιώσου ότι τα paths είναι σωστά
import MarqueeLine from "@/components/MarqueeLine";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Reveal } from "@/components/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";
import ServicesGrid from "@/components/ServicesGrid";
import LiquidSphere from "@/components/LiquidSphere";

export default function ClientPage(props: any) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  if (!data || !data.page) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <div className="bg-[#0F172A] text-white selection:bg-blue-500 selection:text-white overflow-hidden">
      <ScrollProgress />
      <BackToTop />

      {/* Εδώ γίνεται η μαγεία: Ελέγχουμε τι blocks έχει βάλει ο χρήστης στο CMS */}
      {data.page.blocks?.map((block: any, i: number) => {
        switch (block.__typename) {
          case "PageBlocksHero":
            return <HeroBlock key={i} data={block} />;
          case "PageBlocksMarquee":
            return <MarqueeBlock key={i} data={block} />;
          case "PageBlocksAbout":
            return <AboutBlock key={i} data={block} />;
          case "PageBlocksServices":
            return <ServicesBlock key={i} data={block} />;
          case "PageBlocksCta":
            return <CtaBlock key={i} data={block} />;
          default:
            return null;
        }
      })}

      <Footer />
    </div>
  );
}

// --- SUB-COMPONENTS (BLOCKS) ---

const HeroBlock = ({ data }: { data: any }) => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <LiquidSphere />
    <div className="relative container mx-auto px-6 pt-32 pb-20 z-10 text-center flex flex-col items-center pointer-events-none">
      <Reveal>
        <div className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(37,99,235,0.3)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
            {data.heroBadge || "Creative Studio"}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="text-6xl md:text-7xl lg:text-9xl font-display font-medium leading-[1.1] mb-8 tracking-tighter drop-shadow-2xl">
          {data.heroTitlePre} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 filter drop-shadow-lg">
            {data.heroTitleHighlight}
          </span>{" "}
          {data.heroTitlePost}
        </h1>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="text-lg md:text-2xl text-slate-200 max-w-2xl mx-auto mb-12 leading-relaxed font-light drop-shadow-md">
          {data.heroSubtitle}
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pointer-events-auto">
          <Link href="/contact" className="group relative px-8 py-4 bg-white text-black rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)]">
            <span className="relative z-10 font-bold tracking-widest text-sm uppercase group-hover:text-blue-600 transition-colors">
              {data.heroCtaPrimary}
            </span>
          </Link>
          <Link href="/services" className="px-8 py-4 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm hover:bg-white/10 transition-all text-sm uppercase tracking-widest font-medium text-slate-200 hover:text-white hover:border-white/40">
            {data.heroCtaSecondary}
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);

const MarqueeBlock = ({ data }: { data: any }) => {
  if (data.visible === false) return null;
  return (
    <Reveal width="100%">
      <div className="border-y border-white/5 bg-[#0F172A]/80 backdrop-blur-xl relative z-20">
        <MarqueeLine />
      </div>
    </Reveal>
  );
};

const AboutBlock = ({ data }: { data: any }) => (
  <section className="py-32 lg:py-48 relative">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <Reveal>
            <h2 className="text-4xl lg:text-6xl font-display font-medium mb-8 leading-tight">
              {data.aboutHeadingPre}{" "}
              <span className="text-blue-400 italic">
                {data.aboutHeadingHighlight}
              </span>{" "}
              {data.aboutHeadingPost}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-6 text-lg text-slate-300 font-light leading-relaxed">
              <TinaMarkdown content={data.aboutBody} />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-4">
              {data.aboutTags &&
                data.aboutTags.map((tag: string, i: number) => (
                  <span key={i} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-widest text-slate-400">
                    {tag}
                  </span>
                ))}
            </div>
          </Reveal>
        </div>

        <StaggerContainer className="grid grid-cols-2 gap-4">
          {data.stats &&
            data.stats.map((stat: any, index: number) => {
              const isEven = index % 2 !== 0;
              const baseClasses = "p-8 rounded-3xl border transition-colors";
              const highlightClasses = "bg-blue-600 border-blue-500 text-white shadow-[0_0_30px_rgba(37,99,235,0.3)]";
              const normalClasses = "bg-white/5 border-white/5 backdrop-blur-sm hover:bg-white/10";
              const transformClass = isEven ? "transform lg:translate-y-8" : "";

              return (
                <StaggerItem
                  key={index}
                  className={`${baseClasses} ${stat.isHighlighted ? highlightClasses : normalClasses} ${transformClass}`}
                >
                  <div className={`text-${stat.isAnimated ? "5xl" : "4xl"} font-display font-bold ${stat.isHighlighted ? "" : "text-white"} mb-2`}>
                    {stat.isAnimated ? (
                      <AnimatedCounter end={parseInt(stat.value)} suffix={stat.suffix} />
                    ) : (
                      <>{stat.value}{stat.suffix}</>
                    )}
                  </div>
                  <div className={`text-sm uppercase tracking-widest ${stat.isHighlighted ? "text-blue-200" : "text-slate-500"}`}>
                    {stat.label}
                  </div>
                </StaggerItem>
              );
            })}
        </StaggerContainer>
      </div>
    </div>
  </section>
);

const ServicesBlock = ({ data }: { data: any }) => <ServicesGrid />;

const CtaBlock = ({ data }: { data: any }) => (
  <section className="relative py-32 lg:py-48 flex items-center justify-center">
    <Reveal>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-5xl md:text-7xl font-display font-medium text-white mb-8">
          {data.ctaHeading}
        </h2>
        <Link href="/contact" className="inline-block px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition-all hover:scale-110 shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]">
          {data.ctaButtonLabel}
        </Link>
      </div>
    </Reveal>
  </section>
);