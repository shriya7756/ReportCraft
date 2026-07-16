"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 border-t border-white/5 relative overflow-hidden">
      {/* Subtle separator gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1200px] px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <Link href="/" aria-label="ReportCraft — home">
          <Logo size={26} />
        </Link>

        <p className="text-sm text-[var(--text-tertiary)] order-last md:order-none">
          &copy; {currentYear} ReportCraft. AI research reports, backed by real sources.
        </p>

        <nav aria-label="Footer navigation">
          <ul className="flex gap-8 list-none m-0 p-0">
            {[
              { label: "About", href: "/about" },
              { label: "Research", href: "/research" },
              { label: "Help", href: "/help" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--rc-accent)] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
