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
  LifeBuoy,
  Github,
} from "lucide-react";
import { FadeInSection } from "@/components/UIComponents";

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
        "Yes. You can run reports without signing up. Creating an account lets you save your report history to your Dashboard and export reports as .docx files.",
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
        "Yes. Every completed report has a Download (.docx) button that exports the full report as a Microsoft Word document. You can also find this option in your Dashboard.",
    },
    {
      question: "Are the citations real?",
      answer:
        "Yes. Each source card in the Sources section links to the original Wikipedia article or web page. Click the external link icon to verify any source independently.",
    },
    {
      question: "Where are my saved reports?",
      answer:
        "Reports are saved in your Dashboard. They are stored in your browser's localStorage, so they persist across sessions on the same device.",
    },
  ],
  account: [
    {
      question: "How is my data stored?",
      answer:
        "Your account and report history are stored locally in your browser (localStorage). No personal data is sent to a server — only the topic you submit for research is processed externally.",
    },
    {
      question: "Do I need an account to use ReportCraft?",
      answer:
        "No. You can run reports without an account. An account lets you access your report history across sessions and use the Dashboard to manage saved reports.",
    },
  ],
  troubleshooting: [
    {
      question: "My report isn't loading. What should I do?",
      answer:
        "Try refreshing the page and submitting your topic again. If the problem persists, check your internet connection — ReportCraft needs to reach the Cohere API and Wikipedia to generate reports.",
    },
    {
      question: "I got a timeout error. What does it mean?",
      answer:
        "A timeout error usually means the AI took longer than 30 seconds. Try a more specific topic or try again after a moment. Very broad topics (e.g. 'History') can take longer.",
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
    <div
      className="min-h-screen py-16 md:py-24"
      style={{ background: "var(--background)" }}
    >
      {/* Hero */}
      <section
        className="py-16 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <FadeInSection>
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--rc-accent)" }}
            >
              Help & Documentation
            </span>
            <h1
              className="text-4xl md:text-5xl font-semibold tracking-tight mb-4"
              style={{ letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              How can we help?
            </h1>
            <p
              className="text-base max-w-md leading-relaxed mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Browse common questions below. Use search to find a specific topic.
            </p>

            {/* Search */}
            <div className="relative max-w-lg">
              <label htmlFor="help-search" className="sr-only">
                Search help articles
              </label>
              <input
                type="text"
                id="help-search"
                className="zephyr-input w-full"
                style={{ paddingLeft: "44px" }}
                placeholder="Search — e.g. export, citations, timeout…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search help articles"
              />
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--text-tertiary)" }}
                aria-hidden="true"
              />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-12 pb-24">
        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">

          {/* Sidebar */}
          {!searchQuery && (
            <aside className="lg:sticky lg:top-20 lg:self-start">
              <p
                className="text-[10px] font-semibold uppercase tracking-widest mb-3 px-1"
                style={{ color: "var(--text-tertiary)" }}
              >
                Categories
              </p>
              <nav aria-label="Help categories" className="space-y-0.5">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setExpandedFaqs([]);
                      }}
                      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-left ${
                        isActive
                          ? "bg-[var(--surface)] text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)]"
                      }`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <cat.icon
                        size={15}
                        aria-hidden="true"
                        style={{
                          color: isActive ? "var(--rc-accent)" : "var(--text-tertiary)",
                        }}
                      />
                      {cat.label}
                    </button>
                  );
                })}
              </nav>
            </aside>
          )}

          {/* FAQs */}
          <div className={searchQuery ? "lg:col-span-2" : ""}>
            {!searchQuery && (
              <p
                className="text-[10px] font-semibold uppercase tracking-widest mb-4 px-1"
                style={{ color: "var(--text-tertiary)" }}
              >
                {categories.find((c) => c.id === activeCategory)?.label}
              </p>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={searchQuery || activeCategory}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                {filteredFaqs.length === 0 ? (
                  <div
                    className="card-clean p-10 text-center"
                  >
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      No results for &quot;{searchQuery}&quot;. Try a different search term.
                    </p>
                  </div>
                ) : (
                  filteredFaqs.map((faq, index) => {
                    const isOpen = expandedFaqs.includes(index);
                    return (
                      <div
                        key={index}
                        className="card-clean overflow-hidden"
                        style={isOpen ? { borderColor: "var(--border-hover)" } : {}}
                      >
                        <button
                          onClick={() => toggleFaq(index)}
                          className="flex items-center justify-between w-full px-6 py-5 text-left gap-6"
                          aria-expanded={isOpen}
                          aria-controls={`faq-answer-${index}`}
                        >
                          <span
                            className="text-sm font-semibold tracking-tight"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {faq.question}
                          </span>
                          <div
                            className="p-1 rounded shrink-0 transition-transform duration-200"
                            style={{
                              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                              color: isOpen ? "var(--rc-accent)" : "var(--text-tertiary)",
                            }}
                          >
                            <ChevronDown size={17} aria-hidden="true" />
                          </div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              id={`faq-answer-${index}`}
                              role="region"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "circOut" }}
                              className="overflow-hidden"
                            >
                              <div
                                className="px-6 pb-6 text-sm leading-relaxed border-t pt-4"
                                style={{
                                  color: "var(--text-secondary)",
                                  borderColor: "var(--border)",
                                }}
                              >
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                )}
              </motion.div>
            </AnimatePresence>

            {/* Support CTA */}
            <FadeInSection delay={0.2} className="mt-10">
              <div
                className="card-clean p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
              >
                <div>
                  <h3
                    className="text-base font-semibold mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Still need help?
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Open an issue on GitHub and we&apos;ll respond there.
                  </p>
                </div>
                <a
                  href="https://github.com/shriya7756/ReportCraft/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-zephyr btn-zephyr-secondary px-6 py-2.5 text-sm flex items-center gap-2 shrink-0"
                  aria-label="Open a GitHub issue for support"
                >
                  <Github size={15} aria-hidden="true" />
                  Open an issue
                </a>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </div>
  );
}
