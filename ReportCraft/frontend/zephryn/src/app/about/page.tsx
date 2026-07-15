"use client";

import { motion } from "framer-motion";
import {
  Target,
  Globe,
  Lightbulb,
  Layers,
  ArrowRight,
  Search,
  Brain,
  Database,
} from "lucide-react";
import Link from "next/link";
import {
  FadeInSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/UIComponents";

const values = [
  {
    icon: Search,
    title: "Source accuracy",
    description:
      "Every claim is cross-referenced against multiple sources. We ground reports in real, verifiable data — not hallucinated summaries.",
    color: "text-[var(--rc-accent)]",
    bg: "bg-[var(--rc-accent)]/10",
  },
  {
    icon: Globe,
    title: "Open access",
    description:
      "Deep research capability shouldn't be gatekept. ReportCraft is free to try, with no paywalled knowledge.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    icon: Brain,
    title: "Multi-agent reasoning",
    description:
      "Multiple AI agents cross-examine findings using Cohere Command R+ to surface insights that single-pass search misses.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: Layers,
    title: "Clarity first",
    description:
      "Reports are structured for reading, not just for looking impressive. Abstract, methodology, analysis, conclusion — scannable and usable.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

const teamStats = [
  {
    number: "Wikipedia",
    label: "Primary source index",
    icon: Database,
    color: "text-[var(--rc-accent)]",
  },
  {
    number: "Cohere",
    label: "Command R+ AI model",
    icon: Brain,
    color: "text-indigo-400",
  },
  {
    number: "< 60s",
    label: "Typical report time",
    icon: Target,
    color: "text-emerald-400",
  },
  {
    number: "Free",
    label: "To try, no credit card",
    icon: Lightbulb,
    color: "text-amber-400",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">

      {/* Hero */}
      <section className="relative overflow-hidden py-28 sm:py-40 border-b border-white/5">
                
        <div className="relative mx-auto max-w-[1200px] px-6 md:px-8 text-center">
          <FadeInSection>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--card-bg)] border border-[var(--border)] shadow-sm border border-white/10 text-xs font-semibold text-[var(--rc-accent)] mb-10">
              About ReportCraft
            </div>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-6">
              Research, without
              <br />
              <span className="text-gradient">the friction.</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg sm:text-xl leading-relaxed text-[var(--text-secondary)] mt-6">
              ReportCraft takes a topic you care about and returns a structured
              research report — sourced from live web data, reasoned over by
              Cohere Command R+, and delivered in under a minute.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 md:py-32 relative">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <div className="grid gap-16 lg:grid-cols-2 items-start">
            <FadeInSection>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">
                Why we built this
              </h2>
              <div className="space-y-5 text-base leading-relaxed text-[var(--text-secondary)]">
                <p>
                  Modern research is fragmented. You open fifteen tabs, skim
                  five abstracts, copy-paste quotes into a doc, and still
                  aren&apos;t sure if the sources contradict each other. That
                  friction is the bottleneck — not the knowledge.
                </p>
                <p>
                  ReportCraft routes around the friction. You describe a
                  topic; our agents retrieve relevant sources, cross-check the
                  facts, and compile a structured report with inline citations
                  you can verify. One result, not a list of links.
                </p>
                <p>
                  It&apos;s built for students, analysts, journalists, and
                  curious people who want depth without the manual
                  cross-referencing.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {teamStats.map((stat, i) => (
                  <div
                    key={i}
                    className="card-clean p-6 flex flex-col items-center text-center"
                  >
                    <stat.icon
                      className={`mb-4 ${stat.color}`}
                      size={28}
                      aria-hidden="true"
                    />
                    <p className="text-2xl font-black tracking-tight mb-1">
                      {stat.number}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-white/[0.01] border-y border-white/5">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Our principles
            </h2>
            <p className="text-[var(--text-secondary)] mt-4">
              What we optimise for when building the product.
            </p>
          </FadeInSection>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <StaggerItem key={i}>
                <div className="card-clean p-8 h-full flex flex-col group hover:scale-[1.01] transition-all">
                  <div
                    className={`w-12 h-12 rounded-xl ${value.bg} flex items-center justify-center mb-6 ${value.color}`}
                    aria-hidden="true"
                  >
                    <value.icon size={24} />
                  </div>
                  <h3 className="text-base font-bold tracking-tight mb-3 group-hover:text-[var(--rc-accent)] transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-40 relative overflow-hidden">
                <div className="mx-auto max-w-3xl px-6 md:px-8 text-center relative">
          <FadeInSection>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-6">
              Try it for <span className="text-gradient">free.</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10 max-w-lg mx-auto">
              No signup required for your first report. Pick any topic and see
              what ReportCraft returns.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                href="/research"
                className="btn-zephyr btn-zephyr-primary px-10 py-5 text-base flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                Try it now
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <Link
                href="/signup"
                className="btn-zephyr btn-zephyr-secondary px-10 py-5 text-base w-full sm:w-auto justify-center"
              >
                Create account
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
