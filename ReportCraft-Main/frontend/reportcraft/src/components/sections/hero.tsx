"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  FileText,
  Zap,
  Shield,
  Clock,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-50)] via-white to-[var(--accent-50)] dark:from-[var(--primary-950)] dark:via-[var(--neutral-900)] dark:to-[var(--accent-950)]" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-[var(--primary-400)]/20 to-[var(--accent-400)]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-[var(--accent-400)]/20 to-[var(--primary-400)]/20 rounded-full blur-3xl"
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(79,70,229,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-[var(--neutral-800)]/80 shadow-md border border-[var(--border)] mb-8"
          >
            <Sparkles className="w-4 h-4 text-[var(--primary-500)]" />
            <span className="text-sm font-medium text-[var(--foreground-secondary)]">
              AI-Powered Research Intelligence Platform
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="text-[var(--foreground)]">Research Smarter, </span>
            <span className="text-gradient">Not Harder</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-lg sm:text-xl text-[var(--foreground-secondary)] mb-10"
          >
            Transform hours of research into comprehensive, professionally-written reports
            in minutes. Our AI analyzes millions of sources to deliver insights that matter.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/research"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient text-white font-semibold shadow-lg shadow-[var(--primary-500)]/25 hover:shadow-xl hover:shadow-[var(--primary-500)]/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>Start Researching</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white dark:bg-[var(--neutral-800)] text-[var(--foreground)] font-semibold shadow-md border border-[var(--border)] hover:bg-[var(--neutral-50)] dark:hover:bg-[var(--neutral-700)] transition-all duration-300"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: "10M+", label: "Sources Analyzed" },
              { value: "50K+", label: "Reports Generated" },
              { value: "95%", label: "Accuracy Rate" },
              { value: "5x", label: "Faster Research" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--foreground-secondary)]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
