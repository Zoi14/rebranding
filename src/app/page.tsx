import React from "react";
import Link from "next/link";
import HeroBanner from "@/components/HeroBanner";
import SplineHero from "@/components/SplineHero";

import SplineEmbed from "@/components/SplineEmbed";



export default function HomePage() {
  return (
    <main>
      <HeroBanner
        kicker="Rebranding — Ζωή"
        title="Δημιουργώ περιεχόμενο που απογειώνει το brand σου"
        subtitle="Ανασχεδιασμός • Social Media • Ιστοσελίδες"
        imageUrl="/img/hero.PNG"
      />



    
    </main>
  );
}
