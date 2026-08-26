"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Github } from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { label: "Research", href: "/research" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Help & Documentation", href: "/help" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Sign in", href: "/login" },
    { label: "Create account", href: "/signup" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t"
      style={{ borderColor: "var(--border)" }}
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-12 md:py-16">

        {/* Top — logo + columns */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto_auto]">

          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" aria-label="ReportCraft — home">
              <Logo size={30} />
            </Link>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              AI-generated research reports grounded in live web sources.
              Every claim cited, every source clickable.
            </p>
            <a
              href="https://github.com/shriya7756/ReportCraft"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "var(--text-tertiary)" }}
              aria-label="View ReportCraft on GitHub"
            >
              <Github size={15} aria-hidden="true" />
              GitHub
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-4"
                style={{ color: "var(--text-tertiary)" }}
              >
                {group}
              </p>
              <ul className="space-y-2.5 list-none m-0 p-0">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:opacity-100"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom — copyright */}
        <div
          className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            &copy; {currentYear} ReportCraft. Powered by{" "}
            <a
              href="https://cohere.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-opacity hover:opacity-80"
              style={{ color: "var(--text-tertiary)" }}
            >
              Cohere Command R+
            </a>
            .
          </p>
          <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            Research grounded in Wikipedia &amp; live web sources.
          </p>
        </div>
      </div>
    </footer>
  );
}
