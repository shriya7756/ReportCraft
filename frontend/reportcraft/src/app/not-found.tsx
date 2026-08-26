"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="flex min-h-[85vh] items-center justify-center px-5"
      style={{ background: "var(--background)" }}
    >
      <motion.div
        className="max-w-sm text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* 404 number */}
        <p
          className="text-[120px] font-semibold leading-none mb-4 select-none"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "var(--border)",
            letterSpacing: "-0.04em",
          }}
          aria-hidden="true"
        >
          404
        </p>

        <h1
          className="text-2xl font-semibold tracking-tight mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Page not found
        </h1>

        <p
          className="text-sm leading-relaxed mb-8 max-w-xs mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          We couldn&apos;t find that page. It may have moved, been deleted, or
          the URL might be wrong.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="btn-zephyr btn-zephyr-primary px-7 py-3 text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Home size={15} aria-hidden="true" />
            Go home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-zephyr btn-zephyr-secondary px-7 py-3 text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Go back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
