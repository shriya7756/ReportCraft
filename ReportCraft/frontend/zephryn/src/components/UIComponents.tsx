"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

/**
 * FadeInSection - Fades in children when they enter the viewport
 */
export function FadeInSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const directionMap = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerContainer - Staggers children animations
 */
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * SkeletonLine - Skeleton loader line
 */
export function SkeletonLine({
  width = "100%",
  height = "16px",
  className = "",
}: {
  width?: string;
  height?: string;
  className?: string;
}) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

/**
 * SkeletonCard - Card-shaped skeleton loader
 */
export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`card-premium p-6 space-y-4 ${className}`}
      aria-hidden="true"
    >
      <SkeletonLine width="60%" height="20px" />
      <SkeletonLine width="100%" height="12px" />
      <SkeletonLine width="90%" height="12px" />
      <SkeletonLine width="45%" height="12px" />
    </div>
  );
}

/**
 * CountUp - Animated number counter
 */
export function CountUp({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
  className = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}

/**
 * ProgressBar - Gradient progress bar
 */
export function ProgressBar({
  value,
  className = "",
  label,
}: {
  value: number;
  className?: string;
  label?: string;
}) {
  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
            {label}
          </span>
          <span className="text-sm font-medium opacity-60" style={{ color: "var(--text-secondary)" }}>
            {Math.round(value)}%
          </span>
        </div>
      )}
      <div className="progress-bar rounded-full h-2.5 bg-zinc-200 dark:bg-zinc-800" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
        <div 
          className="h-full rounded-full transition-all duration-500 ease-out" 
          style={{ 
            width: `${value}%`, 
            background: "linear-gradient(90deg, var(--zephyr-cyan), var(--zephyr-indigo))",
            boxShadow: "0 0 10px rgba(34, 211, 238, 0.4)"
          }} 
        />
      </div>
    </div>
  );
}

/**
 * EmptyState - Illustration with text for empty states
 */
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-[var(--rc-accent)]/10 blur-3xl rounded-full" />
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative drop-shadow-2xl"
          aria-hidden="true"
        >
          <circle cx="60" cy="60" r="50" fill="url(#zephyr-grad)" fillOpacity="0.1" />
          <defs>
            <linearGradient id="zephyr-grad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--zephyr-cyan)" />
              <stop offset="1" stopColor="var(--zephyr-indigo)" />
            </linearGradient>
          </defs>
          <path d="M40 45C40 42.2386 42.2386 40 45 40H75C77.7614 40 80 42.2386 80 45V85C80 87.7614 77.7614 90 75 90H45C42.2386 90 40 87.7614 40 85V45Z" fill="var(--surface-elevated)" stroke="var(--border)" strokeWidth="1.5" />
          <rect x="50" y="52" width="20" height="1" rx="0.5" fill="var(--border)" />
          <rect x="50" y="58" width="15" height="1" rx="0.5" fill="var(--border)" />
          <rect x="50" y="64" width="22" height="1" rx="0.5" fill="var(--border)" />
        </svg>
      </div>
      <h3 className="text-xl font-bold tracking-tight mb-3" style={{ color: "var(--text-primary)" }}>
        {title}
      </h3>
      <p className="text-base max-w-sm mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {description}
      </p>
      {action}
    </div>
  );
}
