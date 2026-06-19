"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  Brain,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  FadeInSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/UIComponents";

const steps = [
  {
    step: "01",
    title: "Enter Topic",
    description:
      "Initiate the flow with any research subject. Zephryn instantly begins vectorizing the conceptual landscape.",
  },
  {
    step: "02",
    title: "Ethereal Synthesis",
    description:
      "Multi-agent simulated experts engage in recursive discourse, surfacing hidden technical perspectives from the edge.",
  },
  {
    step: "03",
    title: "Final Resolution",
    description:
      "A high-fidelity, peer-ready report is synthesized, complete with verifiable citations and structural clarity.",
  },
];

export default function Home() {
  return (
    <div className="bg-[var(--background)] text-[var(--text-primary)] transition-colors duration-500 selection:bg-cyan-500/30">
      {/* ========== HERO - ETHEREAL ZEPHRYN ========== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
        {/* Animated Background Blobs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="relative mx-auto max-w-7xl px-8 w-full">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 glass mb-8"
            >
              <Sparkles size={14} className="text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400/80">Ethereal Research Intelligence</span>
            </motion.div>

            <motion.h1
              className="text-7xl font-black tracking-tight sm:text-9xl lg:text-[10rem] leading-[0.8] mb-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block mb-2">Zephryn</span>
              <span className="gradient-text block">Engine.</span>
            </motion.h1>

            <motion.p
              className="mt-10 text-xl md:text-2xl font-medium leading-relaxed text-[var(--text-secondary)] max-w-2xl opacity-80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              The definitive architecture for fluid knowledge discovery. 
              Synthesizing multi-perspective signals into high-resolution 
              research reports with crystalline precision.
            </motion.p>

            <motion.div
              className="mt-16 flex flex-wrap gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/research" className="btn-zephyr btn-zephyr-primary px-12 py-5 text-lg group">
                <span className="flex items-center gap-3">
                  Enter The Flow
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link href="/about" className="btn-zephyr btn-zephyr-secondary px-12 py-5 text-lg backdrop-blur-sm">
                How it works
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== CORE ATTRIBUTES ========== */}
      <section className="py-32 relative border-t border-white/5">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <FadeInSection direction="right">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-[2rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500" />
                <div className="relative glass p-12 rounded-[2rem] border border-white/10 ring-1 ring-white/5">
                  <h2 className="text-5xl font-black tracking-tight leading-none mb-8">
                    Crystalline<br/>
                    Logic.
                  </h2>
                  <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                    We&apos;ve transcended traditional search. Zephryn utilizes a 
                    multi-agent discourse layer that mimics the peer-review 
                    rigor of human academia.
                  </p>
                  <div className="mt-12 flex gap-4">
                    <div className="h-1 w-20 bg-cyan-500 rounded-full" />
                    <div className="h-1 w-10 bg-indigo-500/30 rounded-full" />
                  </div>
                </div>
              </div>
            </FadeInSection>

            <StaggerContainer className="space-y-12">
              {[
                { 
                  title: "Fluid Discovery", 
                  desc: "Traverses archived journals and the real-time web with autonomous precision.",
                  icon: Search,
                  color: "text-cyan-400"
                },
                { 
                  title: "Atomic Synthesis", 
                  desc: "Recursive reasoning loops that surface deeply nested technical insights.",
                  icon: Brain,
                  color: "text-indigo-400"
                },
                { 
                  title: "Verifiable Flow", 
                  desc: "Every synthesis is bound by traceable, immutable inline citations.",
                  icon: Zap,
                  color: "text-fuchsia-400"
                }
              ].map((f, i) => (
                <StaggerItem key={i} className="flex gap-8 group">
                  <div className={`p-4 rounded-2xl glass border border-white/5 group-hover:border-white/20 transition-all ${f.color}`}>
                    <f.icon size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight mb-3 opacity-90">{f.title}</h3>
                    <p className="text-lg text-[var(--text-secondary)] opacity-70 leading-relaxed font-medium">{f.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ========== STEPS ========== */}
      <section className="py-32 bg-zinc-950/20">
        <div className="mx-auto max-w-7xl px-8">
          <div className="mb-24 text-center sm:text-left">
            <h2 className="text-6xl font-black tracking-tight">
              The <span className="text-cyan-400">Sequence.</span>
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((step) => (
              <FadeInSection key={step.step} delay={parseInt(step.step) * 0.1}>
                <div className="relative group p-10 h-full glass border border-white/5 rounded-3xl hover:bg-white/[0.04] transition-all">
                  <span className="text-8xl font-black block mb-6 transition-all opacity-10 group-hover:opacity-20 select-none">
                    {step.step}
                  </span>
                  <h3 className="text-3xl font-bold tracking-tight mb-4">{step.title}</h3>
                  <p className="text-lg text-[var(--text-secondary)] opacity-70 leading-relaxed font-medium">{step.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-40 px-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-cyan-500/5 blur-[150px] rounded-full" />
        <div className="mx-auto max-w-4xl relative text-center">
          <FadeInSection>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-10">
              Begin The<br/><span className="gradient-text">Inquiry.</span>
            </h2>
            <p className="text-2xl font-medium opacity-60 mb-16 italic">
              &quot;Excellence is synthesized through better questions.&quot;
            </p>
            <div className="flex justify-center">
              <Link href="/research" className="btn-zephyr btn-zephyr-primary px-16 py-6 text-2xl shadow-2xl shadow-cyan-500/20">
                Launch Zephryn
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
