"use client";

export function Logo({ size = 32, className = "" }: { size?: number; className?: string }) {
  const markSize = Math.round(size * 0.75);

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Geometric mark — four quadrant squares suggesting structured data/reports */}
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Top-left — solid */}
        <rect x="2" y="2" width="9" height="9" rx="1.5" fill="var(--rc-accent)" />
        {/* Top-right — outline */}
        <rect
          x="13"
          y="2"
          width="9"
          height="9"
          rx="1.5"
          fill="none"
          stroke="var(--rc-accent)"
          strokeWidth="1.5"
        />
        {/* Bottom-left — outline */}
        <rect
          x="2"
          y="13"
          width="9"
          height="9"
          rx="1.5"
          fill="none"
          stroke="var(--border-hover)"
          strokeWidth="1.5"
        />
        {/* Bottom-right — subtle */}
        <rect x="13" y="13" width="9" height="9" rx="1.5" fill="var(--border)" />
      </svg>

      <span
        style={{
          fontSize: `${Math.round(size * 0.56)}px`,
          fontFamily: "var(--font-inter, Inter, system-ui, sans-serif)",
          fontWeight: 700,
          letterSpacing: "-0.025em",
          color: "var(--text-primary)",
          lineHeight: 1,
        }}
      >
        ReportCraft
      </span>
    </div>
  );
}
