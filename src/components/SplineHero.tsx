"use client";

import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

type Props = {
  scene: string;
  className?: string;
};

export default function SplineHero({ scene, className = "" }: Props) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 ${className}`}
      style={{ minHeight: 420 }}
    >
      <div className="pointer-events-none absolute -inset-10 bg-white/10 blur-2xl opacity-30" />
      <Spline scene={scene} />
    </div>
  );
}
