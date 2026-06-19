"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut, LayoutDashboard, Search } from "lucide-react";
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



  const navLinks = [
    { href: "/", label: "Intelligence" },
    { href: "/research", label: "Research", icon: <Search size={14}/> },
    { href: "/dashboard", label: "Synthesis", icon: <LayoutDashboard size={14}/> },
    ...(user ? [{ href: "/profile", label: "Identity", icon: <User size={14}/> }] : []),
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "glass-nav py-3 border-b border-white/5" 
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-[1.02]">
            <Logo size={36} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-bold tracking-tight transition-all relative py-1 ${
                    isActive 
                      ? "text-cyan-400" 
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-active" 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-8">
            {user ? (
              <div className="flex items-center gap-6">
                <Link 
                   href="/profile"
                   className={`hidden lg:flex items-center gap-3 px-1 transition-opacity hover:opacity-80`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center p-[1px]">
                    <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center">
                      <User size={14} className="text-cyan-400" />
                    </div>
                  </div>
                  <span className="text-sm font-bold truncate max-w-[120px] tracking-tight">{user.email.split('@')[0]}</span>
                </Link>
                <button 
                  onClick={logout}
                  className={`p-2 hover:text-red-400 transition-colors opacity-60 hover:opacity-100`}
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="btn-zephyr btn-zephyr-primary px-8 py-2.5 text-sm shadow-lg shadow-cyan-500/10"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 text-[var(--text-primary)]"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[60] glass flex flex-col items-center justify-center p-8 backdrop-blur-3xl"
          >
            <button 
              className="absolute top-8 right-8 p-2 text-[var(--text-primary)]"
              onClick={() => setMobileOpen(false)}
            >
              <X size={32} />
            </button>

            <div className="flex flex-col items-center gap-12 w-full max-w-sm">
              <Logo size={64} className="mb-8" />
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-4xl font-black tracking-tighter hover:text-cyan-400 transition-colors text-center w-full py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="w-full pt-12">
                {user ? (
                  <button 
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="w-full btn-zephyr py-5 text-xl bg-red-500/10 text-red-400 border border-red-500/20"
                  >
                    Disconnect
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="w-full btn-zephyr btn-zephyr-primary py-5 text-xl"
                    onClick={() => setMobileOpen(false)}
                  >
                    Get Started
                  </Link>
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
