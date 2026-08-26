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
      "Every claim is cross-referenced against multiple sources. Reports are grounded in real, verifiable data — not hallucinated summaries.",
  },
  {
    icon: Globe,
    title: "Open access",
    description:
      "Deep research capability shouldn't be gatekept. ReportCraft is free to try, with no paywalled knowledge.",
  },
  {
    icon: Brain,
    title: "Multi-agent reasoning",
    description:
      "Multiple AI agents cross-examine findings using Cohere Command R+ to surface insights that single-pass search misses.",
  },
  {
    icon: Layers,
    title: "Clarity first",
    description:
      "Reports are structured for reading, not for looking impressive. Abstract, methodology, analysis, conclusion — scannable and usable.",
  },
];

const highlights = [
  {
    number: "Wikipedia",
    label: "Primary source index",
    icon: Database,
  },
  {
    number: "Cohere",
    label: "Command R+ AI model",
    icon: Brain,
  },
  {
    number: "< 60s",
    label: "Typical report time",
    icon: Target,
  },
  {
    number: "Free",
    label: "To try, no credit card",
    icon: Lightbulb,
  },
];

export default function AboutPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--background)" }}
    >
      {/* Hero */}
      <section
        className="py-24 sm:py-36 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <FadeInSection>
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-6"
              style={{ color: "var(--rc-accent)" }}
            >
              About ReportCraft
            </span>
            <h1
              className="text-5xl sm:text-6xl font-semibold tracking-tight mb-6 max-w-2xl"
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontWeight: 400,
                letterSpacing: "-0.015em",
                color: "var(--text-primary)",
              }}
            >
              Research, without
              <br />
              <em style={{ fontStyle: "italic", color: "var(--rc-accent)" }}>
                the friction.
              </em>
            </h1>
            <p
              className="max-w-2xl text-base sm:text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              ReportCraft takes a topic you care about and returns a structured
              research report — sourced from live web data, reasoned over by
              Cohere Command R+, and delivered in under a minute.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Mission */}
      <section
        className="py-20 md:py-28 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="grid gap-16 lg:grid-cols-2 items-start">
            <FadeInSection>
              <span className="section-rule mb-6 block" aria-hidden="true" />
              <h2
                className="text-2xl md:text-3xl font-semibold tracking-tight mb-6"
                style={{ letterSpacing: "-0.02em" }}
              >
                Why we built this
              </h2>
              <div
                className="space-y-4 text-base leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                <p>
                  Modern research is fragmented. You open fifteen tabs, skim
                  five abstracts, copy-paste quotes into a doc, and still
                  aren&apos;t sure if the sources contradict each other. That
                  friction is the bottleneck — not the knowledge.
                </p>
                <p>
                  ReportCraft routes around the friction. You describe a topic;
                  our agents retrieve relevant sources, cross-check the facts,
                  and compile a structured report with inline citations you can
                  verify. One result, not a list of links.
                </p>
                <p>
                  It&apos;s built for students, analysts, journalists, and
                  curious people who want depth without the manual
                  cross-referencing.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.12}>
              <div className="grid grid-cols-2 gap-3">
                {highlights.map((item, i) => (
                  <div key={i} className="card-clean p-6 flex flex-col">
                    <item.icon
                      className="mb-4"
                      size={20}
                      style={{ color: "var(--rc-accent)" }}
                      aria-hidden="true"
                    />
                    <p
                      className="text-xl font-semibold tracking-tight mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.number}
                    </p>
                    <p
                      className="text-xs font-medium"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-20 md:py-28 border-b"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <FadeInSection className="mb-12">
            <span className="section-rule mb-5 block" aria-hidden="true" />
            <h2
              className="text-2xl md:text-3xl font-semibold tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Our principles
            </h2>
            <p
              className="mt-3 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              What we optimise for when building the product.
            </p>
          </FadeInSection>

          <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <StaggerItem key={i}>
                <div className="card-clean p-7 h-full flex flex-col">
                  <div
                    className="w-9 h-9 rounded-md border flex items-center justify-center mb-5"
                    style={{
                      background: "var(--rc-accent-subtle)",
                      borderColor: "var(--rc-accent-subtle-border)",
                    }}
                    aria-hidden="true"
                  >
                    <value.icon size={17} style={{ color: "var(--rc-accent)" }} />
                  </div>
                  <h3
                    className="text-sm font-semibold tracking-tight mb-2.5"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[640px] px-5 md:px-8 text-center">
          <FadeInSection>
            <h2
              className="text-3xl sm:text-5xl font-semibold tracking-tight mb-5"
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontWeight: 400,
                letterSpacing: "-0.015em",
              }}
            >
              Try it for{" "}
              <em style={{ fontStyle: "italic", color: "var(--rc-accent)" }}>
                free.
              </em>
            </h2>
            <p
              className="text-base mb-8 max-w-sm mx-auto leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              No signup required for your first report. Pick any topic and see
              what ReportCraft returns.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
              <Link
                href="/research"
                className="btn-zephyr btn-zephyr-primary px-8 py-3 text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                Start a report
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/signup"
                className="btn-zephyr btn-zephyr-secondary px-8 py-3 text-sm w-full sm:w-auto justify-center"
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
