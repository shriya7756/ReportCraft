"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
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
      <section className="relative min-h-[86vh] flex items-center pt-8 pb-24">
        <div className="relative mx-auto max-w-[1200px] px-5 md:px-8 w-full">
          <div className="max-w-[680px]">

            {/* Eyebrow — HIG Caption style */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-semibold tracking-wide"
                style={{
                  background: "var(--sys-blue-subtle)",
                  color: "var(--sys-blue)",
                  border: "1px solid var(--sys-blue-subtle-border)",
                }}
              >
                {/* Small pulsing dot — Depth */}
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "var(--sys-blue)" }}
                  aria-hidden="true"
                />
                Powered by Cohere Command R+
              </span>
            </motion.div>

            {/* Headline — SF Pro heavy weight, no serif */}
            {/* HIG: SF carries the hierarchy. One family, weight for hierarchy. */}
            <motion.h1
              className="text-[52px] md:text-[68px] lg:text-[80px] leading-[1.0] mb-7"
              style={{
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.0,
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Research reports
              <br />
              <span style={{ color: "var(--sys-blue)" }}>
                that cite their sources.
              </span>
            </motion.h1>

            {/* Subheading — HIG body (17px) */}
            <motion.p
              className="text-[17px] md:text-[19px] leading-relaxed mb-10 max-w-[500px]"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Enter any topic. Receive a structured report backed by live web
              sources in under a minute — no manual search, no tab juggling.
            </motion.p>

            {/* CTAs — pill buttons, 44pt minimum */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                href="/research"
                id="hero-cta-primary"
                className="btn-zephyr btn-zephyr-primary px-7 inline-flex items-center gap-2 text-[16px]"
              >
                Start a report
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a
                href="#how-it-works"
                id="hero-cta-secondary"
                className="btn-zephyr btn-zephyr-secondary px-7 text-[16px]"
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
                <span className="section-rule mb-6 block" aria-hidden="true" />
                {/* HIG Title1 — 28px, 700 weight */}
                <h2
                  className="type-title1 mb-6"
                >
                  One result, not a list of links.
                </h2>
                <p
                  className="type-body leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Traditional search returns ten URLs. ReportCraft reads those
                  sources, cross-references the facts, and returns a single
                  coherent report — structured, cited, and ready to use.
                </p>
                <p
                  className="type-body leading-relaxed mt-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Built for analysts, students, journalists, and curious people
                  who want depth without manual cross-referencing.
                </p>
              </div>
            </FadeInSection>

            {/* Report preview — Liquid Glass card */}
            <FadeInSection direction="left" delay={0.15}>
              <div
                className="glass-card overflow-hidden"
                aria-hidden="true"
              >
                {/* Browser chrome */}
                <div
                  className="flex items-center gap-2 px-4 py-3 border-b"
                  style={{
                    background: "var(--sys-secondary-background)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--sys-red)" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--sys-orange)" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--sys-green)" }} />
                  </div>
                  <div
                    className="ml-2 h-5 w-44 rounded-full border px-3 flex items-center text-[10px] font-mono truncate"
                    style={{
                      background: "var(--sys-tertiary-background)",
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
                      className="type-caption2 font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5"
                      style={{ color: "var(--sys-blue)", letterSpacing: "0.08em" }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "var(--sys-blue)" }}
                      />
                      Live Web Synthesis
                    </div>
                    <div
                      className="type-title3"
                      style={{ color: "var(--text-primary)" }}
                    >
                      The Future of CRISPR Editing
                    </div>
                  </div>

                  <div
                    className="space-y-2.5 p-4 rounded-xl border"
                    style={{
                      background: "var(--sys-blue-subtle)",
                      borderColor: "var(--sys-blue-subtle-border)",
                    }}
                  >
                    {[0.8, 0.65, 0.9].map((w, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className="h-4 w-4 rounded-full flex items-center justify-center shrink-0"
                          style={{
                            background: "var(--sys-blue)",
                          }}
                        >
                          <Check size={8} style={{ color: "#ffffff" }} />
                        </div>
                        <div
                          className="h-1.5 rounded-full"
                          style={{
                            width: `${w * 100}%`,
                            background: "var(--sys-gray4)",
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
                        className="h-2 w-1/4 rounded-full"
                        style={{
                          background: "var(--text-secondary)",
                          opacity: 0.5,
                        }}
                      />
                      <div
                        className="px-2 py-0.5 rounded-full text-[9px] font-semibold border"
                        style={{
                          background: "var(--sys-blue-subtle)",
                          borderColor: "var(--sys-blue-subtle-border)",
                          color: "var(--sys-blue)",
                        }}
                      >
                        [1] Nature
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {[1, 0.9, 0.75].map((w, i) => (
                        <div
                          key={i}
                          className="h-1.5 rounded-full"
                          style={{
                            width: `${w * 100}%`,
                            background: "var(--sys-gray4)",
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
          background: "var(--sys-grouped-background)",
          borderColor: "var(--border)",
        }}
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <FadeInSection className="mb-14">
            <span className="section-rule mb-5 block" aria-hidden="true" />
            <h2 className="type-title2">
              How it works
            </h2>
          </FadeInSection>

          <StaggerContainer className="grid gap-px border rounded-2xl overflow-hidden">
            {capabilities.map((cap, i) => (
              <StaggerItem key={i}>
                <div
                  className="p-8 md:p-10 group hover:bg-[var(--surface-hover)] transition-colors"
                  style={{ background: "var(--card-bg)" }}
                >
                  <div className="flex gap-8 items-start">
                    <span
                      className="type-caption1 font-semibold mt-0.5 shrink-0 w-5 tabular-nums"
                      style={{
                        color: "var(--sys-blue)",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3
                        className="type-headline mb-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {cap.title}
                      </h3>
                      <p
                        className="type-callout leading-relaxed"
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
            <h2 className="type-title2">
              Three steps, under a minute.
            </h2>
          </FadeInSection>

          <div className="grid gap-4 lg:grid-cols-3">
            {steps.map((step, idx) => (
              <FadeInSection key={step.step} delay={idx * 0.08}>
                {/* Liquid Glass step card */}
                <div className="glass-card p-8 h-full interactive-card">
                  <span
                    className="block text-[40px] font-black mb-6 select-none leading-none"
                    style={{
                      color: "var(--sys-blue-subtle-border)",
                      letterSpacing: "-0.04em",
                      fontVariantNumeric: "tabular-nums",
                    }}
                    aria-hidden="true"
                  >
                    {step.step}
                  </span>
                  <h3
                    className="type-headline mb-3"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="type-callout leading-relaxed"
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
        style={{
          borderColor: "var(--border)",
          background: "var(--sys-grouped-background)",
        }}
      >
        <div className="mx-auto max-w-[600px] text-center">
          <FadeInSection>
            {/* HIG: SF Pro 800 weight for display moments */}
            <h2
              className="text-[40px] md:text-[52px] mb-5"
              style={{
                fontWeight: 800,
                letterSpacing: "-0.028em",
                lineHeight: 1.05,
              }}
            >
              Pick a topic.{" "}
              <span style={{ color: "var(--sys-blue)" }}>
                See what comes back.
              </span>
            </h2>
            <p
              className="type-body mb-8 max-w-sm mx-auto leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              No signup required. Any topic, cited report in under a minute.
            </p>
            <Link
              href="/research"
              id="final-cta"
              className="btn-zephyr btn-zephyr-primary px-10 text-[17px] inline-flex items-center gap-2"
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
