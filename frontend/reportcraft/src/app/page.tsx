"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowRight, Link2, FileText, Check } from "lucide-react";
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
      "Any subject — from CRISPR gene editing to startup funding trends. Broad or specific, ReportCraft handles it.",
  },
  {
    step: "02",
    title: "Agents research in parallel",
    description:
      "Cohere Command R+ agents scan live web sources and Wikipedia, cross-reference facts, and build a structured knowledge base.",
  },
  {
    step: "03",
    title: "Receive a cited report",
    description:
      "A structured report arrives in under a minute, with every claim linked to a real source you can verify independently.",
  },
];

const capabilities = [
  {
    title: "Real-time web retrieval",
    desc: "Scans live sources and Wikipedia to ground every claim in current, verifiable data — not a static training snapshot.",
  },
  {
    title: "Multi-agent reasoning",
    desc: "Multiple AI agents cross-examine findings using Cohere Command R+ to surface insights that single-pass search misses.",
  },
  {
    title: "Inline citations",
    desc: "Every section links to its source. Click any citation to verify the original page — no black-box synthesis.",
  },
];

export default function Home() {
  return (
    <div
      className="transition-colors duration-300"
      style={{ background: "var(--background)", color: "var(--text-primary)" }}
    >
      {/* ========== HERO ========== */}
      <section className="relative min-h-[82vh] flex items-center pt-8 pb-24">
        <div className="relative mx-auto max-w-[1200px] px-5 md:px-8 w-full">
          <div className="max-w-[700px]">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--rc-accent)" }}
              >
                Powered by Cohere Command R+
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-5xl md:text-[68px] lg:text-[80px] leading-[1.0] tracking-tight mb-7"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400, letterSpacing: "-0.015em" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Research reports
              <br />
              <em style={{ fontStyle: "italic", color: "var(--rc-accent)" }}>
                that cite their sources.
              </em>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-lg md:text-xl leading-relaxed mb-10 max-w-[520px]"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Enter any topic. Receive a structured report backed by live web
              sources in under a minute — no manual search, no tab juggling.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                href="/research"
                id="hero-cta-primary"
                className="btn-zephyr btn-zephyr-primary px-7 py-3 text-[15px] inline-flex items-center gap-2"
              >
                Start a report
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a
                href="#how-it-works"
                id="hero-cta-secondary"
                className="btn-zephyr btn-zephyr-secondary px-7 py-3 text-[15px]"
              >
                See how it works
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== WHAT IT IS ========== */}
      <section
        className="py-20 md:py-28 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <FadeInSection>
              <div>
                <span
                  className="section-rule mb-6 block"
                  aria-hidden="true"
                />
                <h2
                  className="text-3xl md:text-4xl font-semibold tracking-tight mb-6"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  One result, not a list of links.
                </h2>
                <p
                  className="text-base md:text-lg leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Traditional search returns ten URLs. ReportCraft reads those
                  sources, cross-references the facts, and returns a single
                  coherent report — structured, cited, and ready to use.
                </p>
                <p
                  className="text-base leading-relaxed mt-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Built for analysts, students, journalists, and curious people
                  who want depth without manual cross-referencing.
                </p>
              </div>
            </FadeInSection>

            {/* Report preview mock */}
            <FadeInSection direction="left" delay={0.15}>
              <div
                className="rounded-lg overflow-hidden border"
                style={{
                  background: "var(--card-bg)",
                  borderColor: "var(--border)",
                }}
                aria-hidden="true"
              >
                {/* Browser chrome */}
                <div
                  className="flex items-center gap-2 px-4 py-3 border-b"
                  style={{
                    background: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
                  </div>
                  <div
                    className="ml-2 h-5 w-44 rounded border px-2 flex items-center text-[10px] font-mono truncate"
                    style={{
                      background: "var(--background)",
                      borderColor: "var(--border)",
                      color: "var(--text-tertiary)",
                    }}
                  >
                    reportcraft.app/research
                  </div>
                </div>

                {/* Report content mock */}
                <div className="p-6 space-y-5">
                  <div>
                    <div
                      className="text-[9px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5"
                      style={{ color: "var(--rc-accent)" }}
                    >
                      Live Web Synthesis
                    </div>
                    <div
                      className="text-xl font-semibold tracking-tight"
                      style={{ color: "var(--text-primary)" }}
                    >
                      The Future of CRISPR Editing
                    </div>
                  </div>

                  <div
                    className="space-y-2.5 p-4 rounded-md border"
                    style={{
                      background: "var(--surface)",
                      borderColor: "var(--border)",
                    }}
                  >
                    {[0.8, 0.65, 0.9].map((w, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className="h-3.5 w-3.5 rounded flex items-center justify-center shrink-0"
                          style={{
                            background: "var(--rc-accent-subtle)",
                          }}
                        >
                          <Check size={8} style={{ color: "var(--rc-accent)" }} />
                        </div>
                        <div
                          className="h-1.5 rounded"
                          style={{
                            width: `${w * 100}%`,
                            background: "var(--border-hover)",
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div
                    className="pt-3 border-t"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="h-2 w-1/4 rounded"
                        style={{
                          background: "var(--text-secondary)",
                          opacity: 0.5,
                        }}
                      />
                      <div
                        className="px-1.5 py-0.5 rounded text-[9px] font-semibold border"
                        style={{
                          background: "var(--rc-accent-subtle)",
                          borderColor: "var(--rc-accent-subtle-border)",
                          color: "var(--rc-accent)",
                        }}
                      >
                        [1] Nature
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {[1, 0.9, 0.75].map((w, i) => (
                        <div
                          key={i}
                          className="h-1.5 rounded"
                          style={{
                            width: `${w * 100}%`,
                            background: "var(--border-hover)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ========== CAPABILITIES ========== */}
      <section
        className="py-20 md:py-28 border-t"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <FadeInSection className="mb-14">
            <span className="section-rule mb-5 block" aria-hidden="true" />
            <h2
              className="text-2xl md:text-3xl font-semibold tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              How it works
            </h2>
          </FadeInSection>

          <StaggerContainer className="grid gap-px border rounded-lg overflow-hidden"
            style={{ borderColor: "var(--border)" } as React.CSSProperties}
          >
            {capabilities.map((cap, i) => (
              <StaggerItem key={i}>
                <div
                  className="p-8 md:p-10 group hover:bg-[var(--surface-hover)] transition-colors"
                  style={{ background: "var(--card-bg)" }}
                >
                  <div className="flex gap-8 items-start">
                    <span
                      className="text-xs font-mono font-semibold mt-0.5 shrink-0 w-5"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3
                        className="text-base font-semibold mb-2 tracking-tight"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {cap.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {cap.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section
        id="how-it-works"
        className="py-20 md:py-28 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <FadeInSection className="mb-14">
            <span className="section-rule mb-5 block" aria-hidden="true" />
            <h2
              className="text-2xl md:text-3xl font-semibold tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Three steps, under a minute.
            </h2>
          </FadeInSection>

          <div className="grid gap-6 lg:grid-cols-3">
            {steps.map((step, idx) => (
              <FadeInSection key={step.step} delay={idx * 0.08}>
                <div
                  className="card-clean p-8 h-full hover:border-[var(--border-hover)] transition-colors"
                >
                  <span
                    className="block text-4xl font-light mb-6 select-none"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: "var(--border-hover)",
                    }}
                    aria-hidden="true"
                  >
                    {step.step}
                  </span>
                  <h3
                    className="text-base font-semibold tracking-tight mb-3"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section
        className="py-24 md:py-32 px-5 md:px-8 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-[680px] text-center">
          <FadeInSection>
            <h2
              className="text-4xl md:text-5xl font-semibold tracking-tight mb-5"
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontWeight: 400,
                letterSpacing: "-0.015em",
              }}
            >
              Pick a topic.
              <br />
              <em style={{ fontStyle: "italic", color: "var(--rc-accent)" }}>
                See what comes back.
              </em>
            </h2>
            <p
              className="text-base md:text-lg mb-8 max-w-sm mx-auto leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              No signup required. Any topic, cited report in under a minute.
            </p>
            <Link
              href="/research"
              id="final-cta"
              className="btn-zephyr btn-zephyr-primary px-10 py-3.5 text-base inline-flex items-center gap-2"
            >
              Start a report
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
