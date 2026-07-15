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
  { id: "getting-started", label: "Getting started", icon: Zap },
  { id: "research", label: "Running a report", icon: Compass },
  { id: "reports", label: "Your reports", icon: BookOpen },
  { id: "account", label: "Account & privacy", icon: Shield },
  { id: "troubleshooting", label: "Troubleshooting", icon: LifeBuoy },
];

const faqs: Record<string, { question: string; answer: string }[]> = {
  "getting-started": [
    {
      question: "What is ReportCraft?",
      answer:
        "ReportCraft is an AI research tool. You enter a topic, and it returns a structured report with an abstract, methodology, analysis, and conclusion — each section backed by inline citations from real web sources.",
    },
    {
      question: "How do I run my first report?",
      answer:
        "Go to the Research page, type a topic in the text field, and click Generate report. ReportCraft will fetch sources, reason over them using Cohere Command R+, and return a structured report in under a minute.",
    },
    {
      question: "Is ReportCraft free?",
      answer:
        "Yes, you can run reports without signing up. Creating an account lets you save your report history to your Dashboard.",
    },
    {
      question: "What topics work best?",
      answer:
        "Any factual topic works well — scientific research, market analysis, technology, history, policy, and more. The more specific the topic, the more focused the report.",
    },
  ],
  research: [
    {
      question: "How does the research work?",
      answer:
        "ReportCraft searches Wikipedia and live web sources for context on your topic, then uses Cohere Command R+ to reason over that context and write a structured report with citations.",
    },
    {
      question: "What sources does it use?",
      answer:
        "Primarily Wikipedia (for factual grounding) and the live web. Every source used is listed in the Sources section of the report, with a link to the original page.",
    },
    {
      question: "How long does a report take?",
      answer:
        "Most reports complete in 30–60 seconds. The progress bar on the Research page shows what's happening at each stage.",
    },
  ],
  reports: [
    {
      question: "Can I export my report?",
      answer:
        "Export is on the roadmap. For now, you can copy the report text or use your browser's print-to-PDF feature to save it.",
    },
    {
      question: "Are the citations real?",
      answer:
        "Yes. Each source card in the Sources section links to the original Wikipedia article or web page. Click the external link icon to verify any source.",
    },
  ],
  account: [
    {
      question: "How is my data stored?",
      answer:
        "Your account and report history are stored locally in your browser (localStorage). No data is sent to a server except the topic you submit for research.",
    },
  ],
  troubleshooting: [
    {
      question: "My report isn't loading. What should I do?",
      answer:
        "Try refreshing the page and submitting your topic again. If the problem persists, check your internet connection — ReportCraft needs to reach the Cohere API and Wikipedia to generate reports.",
    },
    {
      question: "I got an error on the research page. What does it mean?",
      answer:
        "A timeout error usually means the AI took longer than allowed (30 seconds). Try a more specific topic or try again after a moment.",
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
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--rc-accent)]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero */}
      <section className="relative py-20 text-center mb-20">
        <div className="mx-auto max-w-3xl">
          <FadeInSection>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] shadow-sm mb-8 text-[var(--rc-accent)]">
              <LifeBuoy size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Help &amp; <span className="text-gradient">Support</span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Browse common questions or search for a specific topic below.
            </p>

            {/* Search */}
            <div className="relative mt-12 max-w-xl mx-auto group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--rc-accent)]/20 to-[var(--rc-accent)]/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20"
                />
                 <input
                  type="text"
                  id="help-search"
                  className="zephyr-input w-full pl-14 py-5 text-lg"
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search help articles"
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
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)] ml-4 mb-5">Categories</p>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setExpandedFaqs([]);
                    }}
                    className={`flex items-center gap-4 w-full px-5 py-4 rounded-xl text-sm font-bold transition-all text-left border ${
                      activeCategory === cat.id
                        ? "bg-white/5 border-[var(--rc-accent)]/30 text-[var(--rc-accent)] shadow-lg shadow-cyan-500/5"
                        : "bg-white/[0.02] border-white/5 text-[var(--text-secondary)] hover:bg-white/[0.05] hover:border-white/10"
                    }`}
                  >
                    <cat.icon size={18} className={activeCategory === cat.id ? "text-[var(--rc-accent)]" : "opacity-30"} />
                    {cat.label}
                  </button>
                ))}
              </div>
            </FadeInSection>
          )}

          {/* FAQ Content */}
          <div className={searchQuery ? "lg:col-span-2" : "lg:col-span-1"}>
            {!searchQuery && (
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)] ml-2 mb-5">Questions</p>
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
                  <div className="card-clean p-12 text-center">
                    <p className="text-base text-[var(--text-secondary)]">
                      No results found. Try a different search term.
                    </p>
                  </div>
                ) : (
                  filteredFaqs.map((faq, index) => (
                    <div key={index} className="card-clean overflow-hidden hover:border-white/20 transition-all">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="flex items-center justify-between w-full p-8 text-left gap-8 group"
                      >
                        <span className="text-lg font-bold tracking-tight group-hover:text-[var(--rc-accent)] transition-colors">
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
              <div className="card-clean p-8 border border-cyan-500/20 bg-gradient-to-r from-[var(--rc-accent)]/5 to-transparent flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-lg font-bold mb-1.5">Still need help?</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Open a GitHub issue or reach out directly.</p>
                </div>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-zephyr btn-zephyr-primary px-7 py-3.5 text-sm whitespace-nowrap"
                >
                  Contact support
                </a>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </div>
  );
}
