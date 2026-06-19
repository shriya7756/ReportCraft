"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="py-20 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-8 flex flex-col md:flex-row justify-between items-center gap-10">
        <Logo size={28} />
        
        <p className="text-sm font-medium text-[var(--text-tertiary)] opacity-60">
          &copy; {new Date().getFullYear()} Zephryn. Ethereal Intelligence for Deeper Inquiry.
        </p>

        <div className="flex gap-8">
          {[
            { label: "Intelligence", href: "/about" },
            { label: "Synthesis", href: "/research" },
            { label: "Protocols", href: "/help" }
          ].map((link) => (
            <Link 
              key={link.label}
              href={link.href} 
              className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-cyan-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
