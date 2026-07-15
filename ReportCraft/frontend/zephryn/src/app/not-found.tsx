"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center relative overflow-hidden bg-[var(--background)]">
      
      <motion.div
        className="max-w-md text-center px-8 relative"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "circOut" }}
      >
        <div className="mb-10 relative inline-block">
          <div
            className="w-20 h-20 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] shadow-sm border border-white/10 flex items-center justify-center text-red-400 mx-auto"
          >
            <SearchX size={40} strokeWidth={1.5} aria-hidden="true" />
          </div>
        </div>

        <p
          className="text-7xl font-black tracking-tighter mb-2 opacity-10 select-none"
          aria-hidden="true"
        >
          404
        </p>

        <h1 className="text-4xl font-black tracking-tight mb-4">
          Page not found
        </h1>

        <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-10">
          We couldn&apos;t find that page. It may have moved or been deleted.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="btn-zephyr btn-zephyr-primary px-7 py-3.5 flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Home size={17} aria-hidden="true" />
            Go home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-zephyr btn-zephyr-secondary px-7 py-3.5 flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            Go back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
