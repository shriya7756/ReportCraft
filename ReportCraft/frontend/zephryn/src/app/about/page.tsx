"use client";

import { motion } from "framer-motion";
import {
  Target,
  Lightbulb,
  Globe,
  Heart,
  Shield,
  Zap,
  ArrowRight,
  Sparkles,
  Search,
  Cpu,
  Database
} from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import {
  FadeInSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/UIComponents";

const values = [
  {
    icon: Search,
    title: "Precision Synthesis",
    description:
      "Every data point is cross-verified and multi-sourced. We believe in elevating the frequency of truth in a world of digital noise.",
    color: "text-cyan-400"
  },
  {
    icon: Globe,
    title: "Nexus Access",
    description:
      "Deep analytical power should not be gated. ReportCraft democratizes high-fidelity research for every curious mind on the planet.",
    color: "text-indigo-400"
  },
  {
    icon: Lightbulb,
    title: "Expert Simulation",
    description:
      "True insight lives at the intersection of perspectives. Our engine simulates collaborative expertise to surface multidimensional angles.",
    color: "text-purple-400"
  },
  {
    icon: Sparkles,
    title: "Ethereal Design",
    description:
      "Beauty and utility are one. We've crafted an interface that feels as fluid and expansive as the knowledge it helps you discover.",
    color: "text-emerald-400"
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <section className="relative overflow-hidden py-32 sm:py-48 border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/5 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative mx-auto max-w-5xl px-8 text-center">
          <FadeInSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-400 mb-12">
              The Genesis of ReportCraft
            </div>
            <h1 className="text-6xl sm:text-8xl font-black tracking-tight mb-8">
              Synthesizing <span className="gradient-text">Infinity.</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl sm:text-2xl leading-relaxed text-[var(--text-secondary)] opacity-60 font-medium">
              ReportCraft is a transcendental research environment. We blend advanced autonomous reasoners with premium design to deliver comprehensive knowledge in a single resonance.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Mission */}
      <section className="py-32 relative">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid gap-20 lg:grid-cols-2 items-center">
            <FadeInSection>
              <h2 className="text-4xl font-black tracking-tight mb-8">Our Core Protocol</h2>
              <div className="space-y-6 text-lg leading-relaxed text-[var(--text-secondary)] opacity-70">
                <p>
                  We believe that the bottleneck of human progress is the speed of synthesis. Modern research is fragmented, buried under layers of noise and accessibility barriers.
                </p>
                <p>
                  ReportCraft orchestrates an ensemble of specialized language agents that don't just search—they understand. They debate, cross-examine, and refine information into a cohesive intelligence report.
                </p>
                <p>
                  This is built for the high-end analyst, the visionary student, and the tireless researcher who demands depth without the friction of manual cross-referencing.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "99.9%", label: "Synthesis Fidelity", icon: Shield, color: "text-emerald-400" },
                  { number: "100ms", label: "Query Latency", icon: Zap, color: "text-amber-400" },
                  { number: "Expert", label: "Level Reasoning", icon: Cpu, color: "text-cyan-400" },
                  { number: "Global", label: "Source Index", icon: Database, color: "text-indigo-400" },
                ].map((stat, i) => (
                  <div key={i} className="card-glass p-8 flex flex-col items-center text-center group hover:border-white/20 transition-all">
                    <stat.icon className={`mb-6 ${stat.color} opacity-50 group-hover:opacity-100 transition-opacity`} size={32} />
                    <p className="text-4xl font-black tracking-tight mb-2">{stat.number}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 bg-white/[0.01] border-y border-white/5">
        <div className="mx-auto max-w-7xl px-8">
          <FadeInSection className="text-center mb-20">
            <h2 className="text-4xl font-black tracking-tight">Ethereal Principles</h2>
            <p className="text-lg text-[var(--text-secondary)] opacity-60 mt-4">The architecture of our intuition.</p>
          </FadeInSection>

          <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <StaggerItem key={i}>
                <div className="card-glass p-10 h-full flex flex-col group hover:scale-[1.02] transition-all">
                  <div className={`w-14 h-14 rounded-2xl glass flex items-center justify-center mb-8 ${value.color}`}>
                    <value.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight mb-4 group-hover:text-cyan-400 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)] opacity-60">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-48 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none" />
        <div className="mx-auto max-w-4xl px-8 text-center relative">
          <FadeInSection>
            <h2 className="text-5xl sm:text-7xl font-black tracking-tight mb-12">Experience the <span className="gradient-text">Nexus.</span></h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link href="/research" className="btn-zephyr btn-zephyr-primary px-12 py-6 text-xl flex items-center gap-4 w-full sm:w-auto justify-center">
                Initiate Inquiry
                <ArrowRight
                  size={24}
                  className="transition-transform group-hover:translate-x-2"
                />
              </Link>
              <Link href="/signup" className="btn-zephyr btn-zephyr-secondary px-12 py-6 text-xl w-full sm:w-auto justify-center">
                Register Identity
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
