"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut, LayoutDashboard, Search, FileText } from "lucide-react";
import { Logo } from "./Logo";
import { useAuth } from "./AuthProvider";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/research", label: "Research", icon: <Search size={14} aria-hidden="true" /> },
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={14} aria-hidden="true" /> },
    ...(user ? [{ href: "/profile", label: "Profile", icon: <User size={14} aria-hidden="true" /> }] : []),
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--card-bg)] border border-[var(--border)] shadow-sm-nav py-3 border-b border-white/5"
            : "bg-transparent py-5 border-b border-transparent"
        }`}
        role="banner"
      >
        <div className="mx-auto max-w-[1200px] flex items-center justify-between px-6 md:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group transition-transform hover:scale-[1.02]"
            aria-label="ReportCraft — go to home page"
          >
            <Logo size={34} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold tracking-tight transition-all relative py-1 ${
                    isActive
                      ? "text-[var(--rc-accent)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-[var(--rc-accent)] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                <Link
                  href="/profile"
                  className="flex items-center gap-2.5 px-1 transition-opacity hover:opacity-80"
                  aria-label={`Profile: ${user.email}`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--rc-accent)] to-[var(--rc-accent)] flex items-center justify-center p-[1px]">
                    <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center">
                      <User size={14} className="text-[var(--rc-accent)]" aria-hidden="true" />
                    </div>
                  </div>
                  <span className="text-sm font-semibold truncate max-w-[120px] tracking-tight">
                    {user.email.split("@")[0]}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-[var(--text-tertiary)] hover:text-red-400 transition-colors"
                  aria-label="Sign out"
                  title="Sign out"
                >
                  <LogOut size={18} aria-hidden="true" />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors px-1"
                >
                  Sign in
                </Link>
                <Link
                  href="/research"
                  className="btn-zephyr btn-zephyr-primary px-5 py-2.5 text-sm flex items-center gap-2"
                >
                  <FileText size={15} aria-hidden="true" />
                  Start a report
                </Link>
              </div>
            )}

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 text-[var(--text-primary)]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-[var(--card-bg)] border border-[var(--border)] shadow-sm flex flex-col items-center justify-center p-8 backdrop-blur-3xl"
          >
            <button
              className="absolute top-6 right-6 p-2 text-[var(--text-primary)]"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} aria-hidden="true" />
            </button>

            <div className="flex flex-col items-center gap-10 w-full max-w-sm">
              <Logo size={52} className="mb-4" />

              <nav className="flex flex-col items-center gap-8 w-full" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-3xl font-bold hover:text-[var(--rc-accent)] transition-colors text-center w-full py-1"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="w-full pt-8 border-t border-white/10 flex flex-col gap-3">
                {user ? (
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="w-full btn-zephyr py-4 text-lg bg-red-500/10 text-red-400 border border-red-500/20"
                  >
                    Sign out
                  </button>
                ) : (
                  <>
                    <Link
                      href="/research"
                      className="w-full btn-zephyr btn-zephyr-primary py-4 text-lg text-center"
                      onClick={() => setMobileOpen(false)}
                    >
                      Start a report
                    </Link>
                    <Link
                      href="/login"
                      className="w-full btn-zephyr btn-zephyr-secondary py-4 text-lg text-center"
                      onClick={() => setMobileOpen(false)}
                    >
                      Sign in
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-4" />
    </>
  );
}
