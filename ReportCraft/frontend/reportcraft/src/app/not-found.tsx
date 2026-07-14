"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center relative overflow-hidden bg-[var(--background)]">
      {/* Background Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div
        className="max-w-md text-center px-8 relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "circOut" }}
      >
        <div className="mb-12 relative inline-block group">
          <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
          <div className="w-24 h-24 rounded-3xl glass border border-white/10 flex items-center justify-center text-red-400 relative">
            <SearchX size={48} strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-8xl font-black tracking-tighter mb-4 opacity-10">404</h1>
        
        <h1 className="text-5xl font-black tracking-tight mb-6">
          Lost in the <span className="gradient-text">Nexus.</span>
        </h1>
        
        <p className="text-lg font-medium text-[var(--text-secondary)] opacity-60 leading-relaxed mb-12">
          The inquiry you seek has no resonance. The data node may have been purged or relocated to another sector.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-zephyr btn-zephyr-primary px-8 py-4 flex items-center gap-2 w-full sm:w-auto justify-center">
            <Home size={18} />
            Return Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-zephyr btn-zephyr-secondary px-8 py-4 flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <ArrowLeft size={18} />
            Reverse Step
          </button>
        </div>
      </motion.div>
    </div>
  );
}
