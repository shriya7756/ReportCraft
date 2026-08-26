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
            ? "glass-nav shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
        role="banner"
      >
        <div className="mx-auto max-w-[1200px] flex items-center justify-between px-5 md:px-8 h-[60px]">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-80"
            aria-label="ReportCraft — home"
          >
            <Logo size={34} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "text-[var(--text-primary)] bg-[var(--surface)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="hidden md:flex items-center gap-1">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
                  aria-label={`Profile: ${user.email}`}
                >
                  <div
                    className="w-6 h-6 rounded-full bg-[var(--rc-accent)] flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <span className="text-[10px] font-bold text-white uppercase">
                      {user.email[0]}
                    </span>
                  </div>
                  <span className="truncate max-w-[120px]">
                    {user.email.split("@")[0]}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 rounded-md text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
                  aria-label="Sign out"
                  title="Sign out"
                >
                  <LogOut size={16} aria-hidden="true" />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3.5 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/research"
                  className="btn-zephyr btn-zephyr-primary px-4 py-2 text-sm"
                >
                  Start a report
                </Link>
              </div>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md transition-colors"
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

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 rounded-md text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
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

      {/* Mobile Menu — full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[60] flex flex-col"
            style={{ background: "var(--background)" }}
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between px-5 h-[60px] border-b border-[var(--border)]">
              <Logo size={30} />
              <button
                className="p-2 rounded-md text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Mobile links */}
            <nav
              className="flex flex-col p-5 gap-1 flex-1 overflow-y-auto"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center px-4 py-3.5 rounded-md text-base font-medium transition-colors ${
                        isActive
                          ? "text-[var(--rc-accent)] bg-[var(--rc-accent-subtle)]"
                          : "text-[var(--text-primary)] hover:bg-[var(--surface)]"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <div className="mt-auto pt-6 border-t border-[var(--border)] flex flex-col gap-2">
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface)] transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <div
                        className="w-7 h-7 rounded-full bg-[var(--rc-accent)] flex items-center justify-center shrink-0"
                        aria-hidden="true"
                      >
                        <span className="text-[10px] font-bold text-white uppercase">
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
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface)] transition-colors text-left"
                    >
                      <LogOut size={16} aria-hidden="true" />
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/research"
                      className="btn-zephyr btn-zephyr-primary w-full py-3 text-base"
                      onClick={() => setMobileOpen(false)}
                    >
                      Start a report
                    </Link>
                    <Link
                      href="/login"
                      className="btn-zephyr btn-zephyr-secondary w-full py-3 text-base"
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
      <div className="h-[60px]" />
    </>
  );
}
