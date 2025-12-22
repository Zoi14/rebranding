"use client";

type Props = { url: string; className?: string };

export default function SplineEmbed({ url, className = "" }: Props) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 ${className}`}>
      <iframe
        src={url}
        className="h-full w-full"
        style={{ border: 0 }}
        allow="fullscreen"
      />
    </div>
  );
}
