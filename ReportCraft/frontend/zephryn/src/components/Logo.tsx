"use client";

export function Logo({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        {/* Glow behind the logo */}
        <div 
          className="absolute inset-0 bg-cyan-400/20 blur-md rounded-full" 
          aria-hidden="true" 
        />
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Zephryn intelligence logo"
          role="img"
          className="relative drop-shadow-sm"
        >
          <path
            d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM24 38C16.268 38 10 31.732 10 24C10 16.268 16.268 10 24 10C31.732 10 38 16.268 38 24C38 31.732 31.732 38 24 38Z"
            fill="url(#zephyr_logo_grad)"
          />
          <path
            d="M24 32V24L30 20L24 16V24L18 28L24 32Z"
            fill="url(#zephyr_logo_grad)"
          />
          <defs>
            <linearGradient id="zephyr_logo_grad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22D3EE" />
              <stop offset="1" stopColor="#6366F1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span 
        className="text-2xl font-black tracking-tighter" 
        style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}
      >
        Zephryn
      </span>
    </div>
  );
}
