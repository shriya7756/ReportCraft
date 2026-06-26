"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  BookOpen,
  Zap,
  Shield,
  Compass,
  LifeBuoy
} from "lucide-react";
import Link from "next/link";
import {
  FadeInSection,
} from "@/components/UIComponents";

const categories = [
  { id: "getting-started", label: "Getting Started", icon: Zap },
  { id: "research", label: "Research Nexus", icon: Compass },
  { id: "reports", label: "Synthesis Archive", icon: BookOpen },
  { id: "account", label: "Identity Resonance", icon: Shield },
  { id: "troubleshooting", label: "System Recovery", icon: LifeBuoy },
];

const faqs: Record<string, { question: string; answer: string }[]> = {
  "getting-started": [
    {
      question: "What is ReportCraft?",
      answer:
        "ReportCraft is a premium autonomous research nexus. It utilizes advanced reasoning ensembles to synthesize multi-perspective intelligence reports with high-fidelity citations and ethereal readability.",
    },
    {
      question: "How do I initiate my first inquiry?",
      answer:
        "Navigate to the Synthesis console, input your core topic within the neural field, and trigger search. ReportCraft will automatically coordinate specialized expert agents to map the knowledge landscape.",
    },
    {
      question: "Is ReportCraft free to access?",
      answer:
        "ReportCraft offers an introductory frequency for all seekers. For deeper resonance, higher compute thresholds, and exclusive reasoning models, explore our Pro and Enterprise tiers.",
    },
    {
      question: "What topics are compatible?",
      answer:
        "Our engine is optimized for high-complexity intellectual inquiries including scientific research, market intelligence, technological forecasting, and historical analysis.",
    },
  ],
  research: [
    {
      question: "How does the multi-perspective engine operate?",
      answer:
        "ReportCraft identifies high-value expert personas relevant to your inquire. It then facilitates a collaborative discourse between these agents, cross-verifying data and surfacing hidden insights.",
    },
    {
      question: "What data sources are indexed?",
      answer:
        "We integrate with a global matrix of search retrievers, academic repositories, and real-time knowledge bases to ensure the highest quality source material for your reports.",
    },
    {
      question: "How long does synthesis take?",
      answer:
        "Complexity determines speed. Standard inquiries take 2-5 minutes as the agents negotiate perspectives and verify citations and source fidelity.",
    },
  ],
  reports: [
    {
      question: "Can I export my research?",
      answer:
        "Yes. All intelligence records can be exported as high-fidelity PDF, Markdown, or HTML. Each export retains the full glassmorphic styling and verified source links.",
    },
    {
      question: "Are citations verifiable?",
      answer:
        "Every claim in a ReportCraft report is anchored to a verified source. You can click any citation marker to view the origin URI and the supporting data segment.",
    },
  ],
  account: [
    {
      question: "How is my identity data protected?",
      answer:
        "Your inquiry history and profile data are protected by high-level encryption. We prioritize privacy and do not feed user research back into general training models.",
    },
  ],
  troubleshooting: [
    {
      question: "My synthesis is stalled. What should I do?",
      answer:
        "Neural synchronization can occasionally experience latency. Refresh the nexus console or check your network connectivity to restore resonance with the research backbone.",
    },
  ],
};

export default function HelpPage() {
  const [activeCategory, setActiveCategory] = useState("getting-started");
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFaq = (index: number) => {
    setExpandedFaqs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const currentFaqs = faqs[activeCategory] || [];
  const filteredFaqs = searchQuery
    ? Object.values(faqs)
        .flat()
        .filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : currentFaqs;

  return (
    <div className="min-h-screen bg-[var(--background)] py-20 px-4 sm:px-8 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero */}
      <section className="relative py-20 text-center mb-20">
        <div className="mx-auto max-w-3xl">
          <FadeInSection>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass mb-8 text-cyan-400">
              <LifeBuoy size={32} />
            </div>
            <h1 className="text-5xl font-black tracking-tight mb-6">
              Neural <span className="gradient-text">Support.</span>
            </h1>
            <p className="text-xl font-medium text-[var(--text-secondary)] opacity-60 leading-relaxed">
              Browse our knowledge landscape or search specific resonance parameters.
            </p>

            {/* Search */}
            <div className="relative mt-12 max-w-xl mx-auto group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20"
                />
                <input
                  type="text"
                  className="zephyr-input w-full pl-14 py-5 text-lg"
                  placeholder="Inquire for assistance..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      <div className="mx-auto max-w-6xl pb-32">
        <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
          {/* Sidebar Categories */}
          {!searchQuery && (
            <FadeInSection className="lg:col-span-1">
              <div className="space-y-2 sticky top-32">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--text-tertiary)] ml-4 mb-6">Sectors</p>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setExpandedFaqs([]);
                    }}
                    className={`flex items-center gap-4 w-full px-5 py-4 rounded-xl text-sm font-bold transition-all text-left border ${
                      activeCategory === cat.id
                        ? "bg-white/5 border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/5"
                        : "bg-white/[0.02] border-white/5 text-[var(--text-secondary)] hover:bg-white/[0.05] hover:border-white/10"
                    }`}
                  >
                    <cat.icon size={18} className={activeCategory === cat.id ? "text-cyan-400" : "opacity-30"} />
                    {cat.label}
                  </button>
                ))}
              </div>
            </FadeInSection>
          )}

          {/* FAQ Content */}
          <div className={searchQuery ? "lg:col-span-2" : "lg:col-span-1"}>
            {!searchQuery && (
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--text-tertiary)] ml-2 mb-6">Active Queries</p>
            )}
            <AnimatePresence mode="wait">
              <motion.div
                key={searchQuery || activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-4"
              >
                {filteredFaqs.length === 0 ? (
                  <div className="card-glass p-12 text-center">
                    <p className="text-lg font-medium text-[var(--text-secondary)] opacity-40">
                      No resonance found. Refine your query parameters.
                    </p>
                  </div>
                ) : (
                  filteredFaqs.map((faq, index) => (
                    <div key={index} className="card-glass overflow-hidden hover:border-white/20 transition-all">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="flex items-center justify-between w-full p-8 text-left gap-8 group"
                      >
                        <span className="text-lg font-bold tracking-tight group-hover:text-cyan-400 transition-colors">
                          {faq.question}
                        </span>
                        <div className={`p-2 rounded-lg bg-white/5 transition-all ${expandedFaqs.includes(index) ? "rotate-180 bg-cyan-400 text-black" : "text-white/20"}`}>
                          <ChevronDown size={20} />
                        </div>
                      </button>
                      <AnimatePresence>
                        {expandedFaqs.includes(index) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                            className="overflow-hidden bg-white/[0.01]"
                          >
                            <div className="p-8 pt-0 text-base leading-relaxed text-[var(--text-secondary)] opacity-70 border-t border-white/5">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>

            {/* Support CTA */}
            <FadeInSection delay={0.4} className="mt-12">
              <div className="card-glass p-10 border border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-transparent flex flex-col sm:flex-row items-center justify-between gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-2">Still experiencing dissonance?</h3>
                  <p className="text-sm text-[var(--text-secondary)] opacity-60">Our human reasoning ensemble is available for direct synchronization.</p>
                </div>
                <Link href="/contact" className="btn-zephyr btn-zephyr-primary px-8 py-4 whitespace-nowrap">
                  Contact Protocol
                </Link>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </div>
  );
}
