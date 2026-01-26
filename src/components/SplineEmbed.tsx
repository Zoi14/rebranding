"use client";

type Props = { url: string; className?: string };

export default function SplineEmbed({ url, className = "" }: Props) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--border)",
        background: "var(--bg-elevated)",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <iframe
        src={url}
        className="h-full w-full"
        style={{ border: 0 }}
        allow="fullscreen"
      />
    </div>
  );
}
