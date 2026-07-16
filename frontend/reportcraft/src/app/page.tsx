"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  Brain,
  Link2,
  FileText,
  Check,
} from "lucide-react";
import {
  FadeInSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/UIComponents";

const steps = [
  {
    step: "01",
    title: "Enter a topic",
    description:
      "Type any subject — from CRISPR gene editing to startup funding trends. Broad or specific, ReportCraft handles it.",
  },
  {
    step: "02",
    title: "Agents research in parallel",
    description:
      "Cohere Command R+ agents scan live web sources and Wikipedia, cross-reference facts, and build a structured knowledge base.",
  },
  {
    step: "03",
    title: "Get a cited report",
    description:
      "A structured report arrives in under a minute, with every claim linked to a real source you can click through to verify.",
  },
];

const features = [
  {
    title: "Real-time web search",
    desc: "Scans live web sources and Wikipedia to ground every claim in verifiable, up-to-date data.",
    icon: Search,
    color: "text-[var(--rc-accent)]",
    bg: "bg-[var(--rc-accent)]/10",
  },
  {
    title: "Multi-agent reasoning",
    desc: "Multiple AI agents powered by Cohere Command R+ cross-examine findings to surface deeper insights.",
    icon: Brain,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    title: "Inline citations",
    desc: "Every section links back to its source. Click any citation to verify the claim against the original page.",
    icon: Link2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

export default function Home() {
  return (
    <div className="bg-[var(--background)] text-[var(--text-primary)] transition-colors duration-300 selection:bg-cyan-500/30">

      {/* ========== HERO ========== */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden pt-20">
        {/* Ambient background — static, not looping */}
                
        <div className="relative mx-auto max-w-[1200px] px-6 md:px-8 w-full py-16">
          <div className="max-w-3xl">
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-[var(--card-bg)] border border-[var(--border)] shadow-sm mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true" />
              <span className="text-xs font-semibold text-[var(--rc-accent)]/90">
                Powered by Cohere Command R+
              </span>
            </motion.div>

            {/* Headline — one sentence, scannable */}
            <motion.h1
              className="text-5xl font-black tracking-tight sm:text-7xl lg:text-8xl leading-[0.9] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              AI research reports,
              <br />
              <span className="text-gradient">with real citations.</span>
            </motion.h1>

            {/* Subheading — specific, honest */}
            <motion.p
              className="mt-6 text-lg md:text-xl leading-relaxed text-[var(--text-secondary)] max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              Enter any topic. Get a structured report backed by live web
              sources in minutes. No manual search, no tab juggling.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              <Link
                href="/research"
                id="hero-cta-primary"
                className="btn-zephyr btn-zephyr-primary px-8 py-4 text-base group"
              >
                <span className="flex items-center gap-2.5">
                  <FileText size={18} aria-hidden="true" />
                  Start a report
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </span>
              </Link>
              <a
                href="#how-it-works"
                id="hero-cta-secondary"
                className="btn-zephyr btn-zephyr-secondary px-8 py-4 text-base"
              >
                See how it works
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== HOW REPORTCRAFT RESEARCHES ========== */}
      <section className="py-24 md:py-32 relative border-t border-white/5">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <FadeInSection direction="right">
              <div className="relative">
                <div
                  className="absolute -inset-4 bg-gradient-to-r from-[var(--rc-accent)] to-[var(--rc-accent)] rounded-[2rem] opacity-10 blur-2xl"
                  aria-hidden="true"
                />
                <div className="relative bg-[var(--card-bg)] border border-[var(--border)] shadow-sm p-10 rounded-[2rem] border border-white/10">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-6">
                    How ReportCraft
                    <br />
                    <span className="text-gradient">researches.</span>
                  </h2>
                  <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
                    Traditional search returns a list of links. ReportCraft
                    reads those sources, cross-references the facts, and returns
                    a single coherent report — structured, cited, and ready to
                    use.
                  </p>
                  <div className="mt-8 flex gap-3" aria-hidden="true">
                    <div className="h-1 w-16 bg-cyan-500 rounded-full" />
                    <div className="h-1 w-8 bg-indigo-500/30 rounded-full" />
                  </div>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection direction="left" delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card-bg)] shadow-lg select-none">
                {/* Header mock */}
                <div className="border-b border-[var(--border)] px-4 py-3 flex items-center gap-2 bg-[var(--surface-hover)]">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  <div className="ml-4 h-6 w-48 bg-[var(--background)] border border-[var(--border)] rounded text-[10px] px-2 flex items-center text-[var(--text-secondary)] font-mono truncate">
                    reportcraft.app/crispr
                  </div>
                </div>
                {/* Body mock */}
                <div className="p-6 md:p-8 space-y-6">
                  {/* Topic Title */}
                  <div>
                    <div className="text-[10px] font-bold text-[var(--rc-accent)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Brain size={12} /> Live Web Synthesis
                    </div>
                    <div className="text-2xl font-black text-[var(--text-primary)]">The Future of CRISPR Editing</div>
                  </div>
                  {/* Outline / Summary */}
                  <div className="space-y-3 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-[var(--rc-accent)]/10 flex items-center justify-center shrink-0">
                        <Check size={10} className="text-[var(--rc-accent)]" />
                      </div>
                      <div className="h-2 w-3/4 bg-[var(--text-tertiary)] rounded opacity-50" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-[var(--rc-accent)]/10 flex items-center justify-center shrink-0">
                        <Check size={10} className="text-[var(--rc-accent)]" />
                      </div>
                      <div className="h-2 w-1/2 bg-[var(--text-tertiary)] rounded opacity-50" />
                    </div>
                  </div>
                  {/* Cited Sections */}
                  <div className="pt-4 border-t border-[var(--border)]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-3 w-1/4 bg-[var(--text-secondary)] rounded opacity-70" />
                      <div className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                        [1] Nature
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-1.5 w-full bg-[var(--border-hover)] rounded" />
                      <div className="h-1.5 w-[95%] bg-[var(--border-hover)] rounded" />
                      <div className="h-1.5 w-4/5 bg-[var(--border-hover)] rounded" />
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-3 w-1/3 bg-[var(--text-secondary)] rounded opacity-70" />
                      <div className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        [2] MIT Tech Review
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-1.5 w-full bg-[var(--border-hover)] rounded" />
                      <div className="h-1.5 w-[85%] bg-[var(--border-hover)] rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section id="how-it-works" className="py-24 md:py-32 bg-zinc-950/20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <div className="mb-16 text-center">
            <FadeInSection>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                How it <span className="text-[var(--rc-accent)]">works.</span>
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
                Three steps, under a minute.
              </p>
            </FadeInSection>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {steps.map((step, idx) => (
              <FadeInSection key={step.step} delay={idx * 0.1}>
                <div className="relative group p-8 h-full bg-[var(--card-bg)] border border-[var(--border)] shadow-sm border border-white/5 rounded-2xl hover:bg-white/[0.03] transition-all">
                  <span
                    className="text-7xl font-black block mb-5 select-none transition-all opacity-[0.07] group-hover:opacity-[0.14]"
                    aria-hidden="true"
                  >
                    {step.step}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-32 md:py-40 px-6 md:px-8 relative overflow-hidden">
                <div className="mx-auto max-w-3xl relative text-center">
          <FadeInSection>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              Ready to see it
              <br />
              <span className="text-gradient">in action?</span>
            </h2>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-lg mx-auto">
              Pick any topic you&apos;re curious about and get a cited research
              report in under a minute.
            </p>
            <Link
              href="/research"
              id="final-cta"
              className="btn-zephyr btn-zephyr-primary px-12 py-5 text-lg inline-flex items-center gap-3"
            >
              <FileText size={20} aria-hidden="true" />
              Start a report
            </Link>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
