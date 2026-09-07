"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, LogOut, Sun, Moon } from "lucide-react";
import { Logo } from "./Logo";
import { useAuth } from "./AuthProvider";
import { useTheme } from "./ThemeProvider";

const NAV_LINKS = [
  { href: "/research", label: "Research" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About" },
  { href: "/help", label: "Help" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 16);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? "glass-nav"
            : "bg-transparent border-b border-transparent"
        }`}
        role="banner"
      >
        {/* HIG: nav height ~52px, 8pt grid */}
        <div className="mx-auto max-w-[1200px] flex items-center justify-between px-5 md:px-8 h-[52px]">

          {/* Logo — 44pt tap target */}
          <Link
            href="/"
            className="flex items-center justify-center min-h-[44px] min-w-[44px] -ml-2 px-2 transition-opacity hover:opacity-75 rounded-xl"
            aria-label="ReportCraft — home"
          >
            <Logo size={32} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative px-4 min-h-[44px] flex items-center
                    text-[15px] font-medium rounded-xl transition-all duration-150
                    ${isActive
                      ? "text-[var(--sys-blue)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--sys-fill)]"
                    }
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                  {/* Active indicator dot — HIG Depth principle */}
                  {isActive && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: "var(--sys-blue)" }}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-1">
            {user ? (
              <div className="hidden md:flex items-center gap-1">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 min-h-[44px] rounded-xl text-[15px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--sys-fill)] transition-all"
                  aria-label={`Profile: ${user.email}`}
                >
                  {/* Avatar — systemBlue tinted */}
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "var(--sys-blue)" }}
                    aria-hidden="true"
                  >
                    <span className="text-[11px] font-bold text-white uppercase">
                      {user.email[0]}
                    </span>
                  </div>
                  <span className="truncate max-w-[120px]">
                    {user.email.split("@")[0]}
                  </span>
                </Link>
                {/* 44pt icon button */}
                <button
                  onClick={logout}
                  className="w-[44px] h-[44px] flex items-center justify-center rounded-xl text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--sys-fill)] transition-all"
                  aria-label="Sign out"
                  title="Sign out"
                >
                  <LogOut size={17} aria-hidden="true" />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 min-h-[44px] flex items-center text-[15px] font-medium text-[var(--text-secondary)] hover:text-[var(--sys-blue)] transition-colors rounded-xl"
                >
                  Sign in
                </Link>
                {/* Primary pill CTA — systemBlue */}
                <Link
                  href="/research"
                  className="btn-zephyr btn-zephyr-primary px-5 text-[15px]"
                  style={{ minHeight: "36px", minWidth: "auto" }}
                >
                  Start a report
                </Link>
              </div>
            )}

            {/* Theme Toggle — 44pt */}
            <button
              onClick={toggleTheme}
              className="w-[44px] h-[44px] flex items-center justify-center rounded-xl transition-all hover:bg-[var(--sys-fill)]"
              style={{ color: "var(--text-tertiary)" }}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark" ? (
                <Sun size={17} aria-hidden="true" />
              ) : (
                <Moon size={17} aria-hidden="true" />
              )}
            </button>

            {/* Mobile Toggle — 44pt */}
            <button
              className="md:hidden w-[44px] h-[44px] flex items-center justify-center rounded-xl text-[var(--text-primary)] hover:bg-[var(--sys-fill)] transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu — Liquid Glass full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex flex-col"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "var(--glass-blur)",
              WebkitBackdropFilter: "var(--glass-blur)",
            }}
          >
            {/* Mobile header */}
            <div
              className="flex items-center justify-between px-5 h-[52px] border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <Logo size={28} />
              {/* 44pt close button */}
              <button
                className="w-[44px] h-[44px] flex items-center justify-center rounded-xl text-[var(--text-primary)] hover:bg-[var(--sys-fill)] transition-all"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Mobile links */}
            <nav
              className="flex flex-col p-4 gap-1 flex-1 overflow-y-auto"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center px-4 min-h-[52px] rounded-xl text-[17px] font-medium transition-all ${
                        isActive
                          ? "text-[var(--sys-blue)] bg-[var(--sys-blue-subtle)]"
                          : "text-[var(--text-primary)] hover:bg-[var(--sys-fill)]"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <div
                className="mt-auto pt-5 border-t flex flex-col gap-2"
                style={{ borderColor: "var(--border)" }}
              >
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 min-h-[52px] rounded-xl text-[17px] font-medium text-[var(--text-secondary)] hover:bg-[var(--sys-fill)] transition-all"
                      onClick={() => setMobileOpen(false)}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "var(--sys-blue)" }}
                        aria-hidden="true"
                      >
                        <span className="text-[11px] font-bold text-white uppercase">
                          {user.email[0]}
                        </span>
                      </div>
                      <span className="truncate">{user.email}</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 min-h-[52px] rounded-xl text-[17px] font-medium text-[var(--text-secondary)] hover:bg-[var(--sys-fill)] transition-all text-left"
                    >
                      <LogOut size={18} aria-hidden="true" />
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/research"
                      className="btn-zephyr btn-zephyr-primary w-full text-[17px]"
                      onClick={() => setMobileOpen(false)}
                    >
                      Start a report
                    </Link>
                    <Link
                      href="/login"
                      className="btn-zephyr btn-zephyr-secondary w-full text-[17px]"
                      onClick={() => setMobileOpen(false)}
                    >
                      Sign in
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed nav */}
      <div className="h-[52px]" />
    </>
  );
}
