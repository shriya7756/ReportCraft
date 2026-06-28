"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, ArrowLeft, BrainCircuit, FileQuestion } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Illustration */}
            <div className="relative w-48 h-48 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-200)] to-[var(--accent-200)] rounded-full opacity-50 animate-pulse" />
              <div className="absolute inset-4 bg-white dark:bg-[var(--neutral-800)] rounded-full shadow-xl flex items-center justify-center">
                <FileQuestion className="w-20 h-20 text-[var(--primary-500)]" />
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold text-gradient mb-4">
              404
            </h1>

            <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-4">
              Page Not Found
            </h2>

            <p className="text-lg text-[var(--foreground-secondary)] mb-8 max-w-md mx-auto">
              We couldn't find the page you're looking for. It might have been moved,
              deleted, or never existed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient text-white font-semibold shadow-lg shadow-[var(--primary-500)]/25 hover:shadow-xl transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Home
              </Link>
              <Link
                href="/research"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-[var(--neutral-800)] text-[var(--foreground)] font-semibold border border-[var(--border)] hover:bg-[var(--neutral-50)] dark:hover:bg-[var(--neutral-700)] transition-all"
              >
                <Search className="w-4 h-4" />
                Start Research
              </Link>
            </div>

            {/* Quick Links */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Research", href: "/research", desc: "Generate a report" },
                { title: "Dashboard", href: "/dashboard", desc: "View your reports" },
                { title: "Help Center", href: "/help", desc: "Get assistance" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="p-4 rounded-xl bg-[var(--background-secondary)] hover:bg-[var(--neutral-100)] dark:hover:bg-[var(--neutral-800)] transition-colors group"
                >
                  <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--primary-600)] transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-[var(--foreground-secondary)]">
                    {link.desc}
                  </p>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
