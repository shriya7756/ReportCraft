"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Globe,
  FileText,
  Sparkles,
  Loader2,
  ExternalLink,
  Send,
  MessageSquare,
  Brain,
  Database,
  Cpu,
  Shield,
  Download,
} from "lucide-react";
import { ProgressBar } from "@/components/UIComponents";
import { Suspense } from "react";
import toast from "react-hot-toast";
import type { Metadata } from "next";

const STEPS = [
  { id: 1, label: "Topic", icon: Search },
  { id: 2, label: "Researching", icon: Globe },
  { id: 3, label: "Compiling", icon: FileText },
  { id: 4, label: "Report", icon: Sparkles },
];

interface Source {
  id: number;
  title: string;
  pub: string;
  type: string;
  url: string;
  snippet: string;
  keywords: string[];
}

interface ReportData {
  category: string;
  abstract: string;
  methodology: string;
  analysis: string;
  conclusion: string;
  sources: Source[];
}

function ResearchContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [topic, setTopic] = useState("");
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [reportText, setReportText] = useState("");
  const [researchProgress, setResearchProgress] = useState(0);
  const [researchPhase, setResearchPhase] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; text: string }>>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleStartResearch = async () => {
    if (!topic.trim()) return toast.error("Please enter a research topic.");

    setCurrentStep(2);
    setResearchProgress(0);
    setReportData(null);
    setReportText("");
    setChatMessages([]);

    const phases = [
      { label: "Connecting to ReportCraft knowledge network…", p: 10 },
      { label: "Scanning scientific databases and web sources…", p: 30 },
      { label: "Cross-referencing literature and citations…", p: 55 },
      { label: "Synthesising multi-source knowledge graph…", p: 80 },
      { label: "Compiling final research report…", p: 95 },
    ];

    const controller = new AbortController();
    const hardTimeout = setTimeout(() => controller.abort(), 30000);

    const backendPromise = fetch("/api/research", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic: topic.trim() }),
      signal: controller.signal,
    });

    for (const phase of phases) {
      setResearchPhase(phase.label);
      setResearchProgress(phase.p);
      await new Promise((r) => setTimeout(r, 700));
    }

    try {
      const response = await backendPromise;
      clearTimeout(hardTimeout);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Research failed: ${response.status}`);
      }

      const data = await response.json();

      setResearchProgress(100);
      setResearchPhase("Report ready.");

      const rawReportText: string = data.report || "";
      setReportText(rawReportText);

      const reportStr: string = data.report || "";
      const sections = reportStr.split(/\n\n+/);

      const extractSection = (keywords: string[]): string => {
        for (const kw of keywords) {
          const idx = sections.findIndex((s) =>
            s.toUpperCase().includes(kw.toUpperCase())
          );
          if (idx !== -1) {
            return (
              sections[idx].replace(/^[A-Z\s]+:\s*/i, "").trim() ||
              (sections[idx + 1] ?? "")
            );
          }
        }
        return "";
      };

      const abstract =
        data.abstract ||
        extractSection(["ABSTRACT"]) ||
        sections[0] ||
        "Research complete.";
      const methodology =
        data.methodology ||
        extractSection(["METHODOLOGY", "METHOD"]) ||
        sections[1] ||
        "See full report for details.";
      const analysis =
        data.analysis ||
        extractSection(["ANALYSIS", "DEEP ANALYSIS", "FINDINGS"]) ||
        sections[2] ||
        "See full report for details.";
      const conclusion =
        data.conclusion ||
        extractSection(["CONCLUSION", "SUMMARY"]) ||
        sections[sections.length - 1] ||
        "Synthesis complete.";

      const sources: Source[] =
        data.sources && data.sources.length > 0
          ? data.sources
          : [
              {
                id: 1,
                title: "ReportCraft Research Synthesis",
                pub: "ReportCraft",
                type: "AI Research Engine",
                url: "#",
                snippet: "AI-powered multi-source research synthesis.",
                keywords: [topic],
              },
            ];

      setReportData({
        category: "Live Web Synthesis",
        abstract,
        methodology,
        analysis,
        conclusion,
        sources,
      });

      localStorage.setItem(
        `zephyr_report_${topic.trim()}`,
        JSON.stringify({
          timestamp: Date.now(),
          content: { intro: abstract },
          sources,
        })
      );

      setChatMessages([
        {
          role: "assistant",
          text: `Report on "${topic}" complete — ${sources.length} source${sources.length !== 1 ? "s" : ""} cited. Ask me anything about this topic.`,
        },
      ]);

      setCurrentStep(4);
    } catch (error) {
      clearTimeout(hardTimeout);
      const msg =
        error instanceof Error
          ? error.name === "AbortError"
            ? "Research timed out. Please try again with a more specific topic."
            : error.message
          : "Research synthesis failed. Please try again.";
      toast.error(msg, { duration: 5000 });
      setCurrentStep(1);
    }
  };

  const handleAskQuestion = async () => {
    if (!currentQuestion.trim() || !topic || isChatLoading) return;
    const userMsg = { role: "user", text: currentQuestion };
    setChatMessages((prev) => [...prev, userMsg]);
    setCurrentQuestion("");
    setIsChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          message: currentQuestion,
          reportContext: reportText,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Assistant unavailable.");
      }
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.response },
      ]);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Couldn't reach the assistant. Try again."
      );
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleExport = async () => {
    if (!reportData) return;
    try {
      const { exportReportToDocx } = await import("@/utils/export");
      await exportReportToDocx(topic, reportData);
      toast.success("Report downloaded as .docx");
    } catch {
      toast.error("Failed to export report. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ background: "var(--background)", color: "var(--text-primary)" }}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-10">

        {/* Step Indicator */}
        <div className="max-w-lg mx-auto mb-14 relative">
          <div className="flex justify-between mb-3 relative z-10">
            {STEPS.map((s) => {
              const isActive = currentStep >= s.id;
              return (
                <div key={s.id} className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isActive
                        ? "border-[var(--rc-accent)] text-white"
                        : "border-[var(--border)] text-[var(--text-tertiary)]"
                    }`}
                    style={isActive ? { background: "var(--rc-accent)" } : { background: "var(--surface)" }}
                  >
                    <s.icon size={13} aria-hidden="true" />
                  </div>
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wider"
                    style={{
                      color: isActive ? "var(--text-primary)" : "var(--text-tertiary)",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Track */}
          <div
            className="absolute top-4 left-4 right-4 h-px -z-0"
            style={{ background: "var(--border)" }}
          />
          <motion.div
            className="absolute top-4 left-4 right-4 h-px -z-0"
            style={{ background: "var(--rc-accent)", originX: 0 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: (currentStep - 1) / (STEPS.length - 1) }}
            transition={{ duration: 0.6, ease: "circOut" }}
          />
        </div>

        <AnimatePresence mode="wait">
          {/* ── STEP 1: Topic Input ── */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              className="max-w-2xl mx-auto pt-6"
            >
              <div className="text-center mb-10">
                <h1
                  className="text-3xl md:text-5xl font-semibold tracking-tight mb-3"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Start a report.
                </h1>
                <p
                  className="text-base md:text-lg max-w-md mx-auto"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Enter any topic and receive a structured research report with
                  live citations in under a minute.
                </p>
              </div>

              <div
                className="card-clean p-8"
              >
                <div className="relative mb-5">
                  <label htmlFor="topic-input" className="sr-only">
                    Research topic
                  </label>
                  <input
                    id="topic-input"
                    type="text"
                    className="zephyr-input w-full text-lg pr-12"
                    placeholder="e.g. CRISPR gene editing, Quantum computing, LLM scaling laws"
                    value={topic}
                    onKeyDown={(e) => e.key === "Enter" && handleStartResearch()}
                    onChange={(e) => setTopic(e.target.value)}
                    autoFocus
                    autoComplete="off"
                  />
                  <Search
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    size={18}
                    style={{ color: "var(--text-tertiary)" }}
                    aria-hidden="true"
                  />
                </div>
                <button
                  onClick={handleStartResearch}
                  disabled={!topic.trim()}
                  className="btn-zephyr btn-zephyr-primary w-full py-3.5 text-base flex items-center justify-center gap-2"
                  aria-label="Generate research report"
                >
                  Generate report
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
                <p
                  className="text-center text-xs mt-4"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Powered by Cohere Command R+ · Wikipedia + live web
                </p>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Researching ── */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              className="max-w-md mx-auto py-20 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="mb-10 flex justify-center">
                <div
                  className="w-16 h-16 rounded-lg border flex items-center justify-center"
                  style={{
                    background: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  <Loader2
                    size={28}
                    className="animate-spin"
                    style={{ color: "var(--rc-accent)" }}
                    aria-label="Researching…"
                  />
                </div>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight mb-2">
                Researching{" "}
                <span style={{ color: "var(--rc-accent)" }}>{topic}</span>
              </h2>
              <p
                className="text-sm mb-8"
                style={{ color: "var(--text-tertiary)" }}
              >
                {researchPhase}
              </p>
              <div className="px-4">
                <ProgressBar value={researchProgress} label={`${Math.round(researchProgress)}%`} />
              </div>
              <p
                className="text-xs mt-5"
                style={{ color: "var(--text-tertiary)" }}
              >
                Scanning live web sources · Synthesising citations
              </p>
            </motion.div>
          )}

          {/* ── STEP 4: Report ── */}
          {currentStep === 4 && reportData && (
            <motion.div
              key="step-4"
              className="grid lg:grid-cols-[1fr_360px] gap-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Report article */}
              <div className="space-y-10 pb-20">
                <article className="card-clean overflow-hidden">
                  {/* Report header */}
                  <div
                    className="px-8 sm:px-12 py-10 border-b"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded border text-[10px] font-semibold uppercase tracking-widest"
                        style={{
                          background: "var(--rc-accent-subtle)",
                          borderColor: "var(--rc-accent-subtle-border)",
                          color: "var(--rc-accent)",
                        }}
                      >
                        {reportData.category}
                      </span>
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-[10px] font-semibold uppercase tracking-widest"
                        style={{
                          background: "var(--surface)",
                          borderColor: "var(--border)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        <Shield size={9} aria-hidden="true" />
                        Live Web Research
                      </span>
                    </div>
                    <h1
                      className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6 capitalize"
                      style={{ letterSpacing: "-0.02em", color: "var(--text-primary)" }}
                    >
                      {topic}
                    </h1>
                    <span className="section-rule block" aria-hidden="true" />
                  </div>

                  {/* Report sections */}
                  <div className="px-8 sm:px-12 py-10 space-y-14">
                    {/* Abstract */}
                    <section aria-labelledby="section-abstract">
                      <div className="flex items-center gap-3 mb-5">
                        <Database
                          size={15}
                          style={{ color: "var(--rc-accent)" }}
                          aria-hidden="true"
                        />
                        <h2
                          id="section-abstract"
                          className="text-xs font-bold uppercase tracking-widest"
                          style={{ color: "var(--rc-accent)" }}
                        >
                          Abstract
                        </h2>
                      </div>
                      <p
                        className="text-base md:text-lg leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {reportData.abstract}
                      </p>
                    </section>

                    {/* Methodology + Analysis */}
                    <section className="grid md:grid-cols-2 gap-10">
                      <div>
                        <h2
                          className="text-sm font-semibold mb-4 uppercase tracking-widest"
                          style={{ color: "var(--text-tertiary)" }}
                        >
                          I. Methodology
                        </h2>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {reportData.methodology}
                        </p>
                      </div>
                      <div>
                        <h2
                          className="text-sm font-semibold mb-4 uppercase tracking-widest"
                          style={{ color: "var(--text-tertiary)" }}
                        >
                          II. Analysis
                        </h2>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {reportData.analysis}
                        </p>
                      </div>
                    </section>

                    {/* Conclusion */}
                    <section
                      className="p-8 rounded-lg border"
                      style={{
                        background: "var(--surface)",
                        borderColor: "var(--border)",
                      }}
                      aria-labelledby="section-conclusion"
                    >
                      <h2
                        id="section-conclusion"
                        className="text-sm font-semibold mb-4 uppercase tracking-widest"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        Conclusion
                      </h2>
                      <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {reportData.conclusion}
                      </p>
                    </section>
                  </div>

                  {/* Sources */}
                  <div
                    className="px-8 sm:px-12 py-10 border-t"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <h3
                      className="text-base font-semibold tracking-tight mb-6"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Sources cited ({reportData.sources.length})
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {reportData.sources.map((s, i: number) => (
                        <div
                          key={i}
                          className="card-clean p-4 hover:border-[var(--border-hover)] transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span
                              className="text-[9px] font-mono"
                              style={{ color: "var(--text-tertiary)" }}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span
                              className="text-[9px] font-semibold uppercase tracking-wider"
                              style={{ color: "var(--text-tertiary)" }}
                            >
                              {s.type}
                            </span>
                          </div>
                          <h4
                            className="font-medium text-sm mb-3 leading-snug line-clamp-2"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {s.title}
                          </h4>
                          <div className="flex items-center justify-between">
                            <span
                              className="text-[10px] font-medium truncate max-w-[110px]"
                              style={{ color: "var(--text-tertiary)" }}
                            >
                              {s.pub}
                            </span>
                            <a
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded border transition-colors hover:border-[var(--rc-accent)] hover:text-[var(--rc-accent)] shrink-0"
                              style={{
                                borderColor: "var(--border)",
                                color: "var(--text-tertiary)",
                              }}
                              aria-label={`Open source: ${s.title}`}
                            >
                              <ExternalLink size={12} aria-hidden="true" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>

                {/* Actions */}
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setTopic("");
                      setReportData(null);
                      setChatMessages([]);
                    }}
                    className="btn-zephyr btn-zephyr-secondary px-8 py-3 text-sm"
                  >
                    New report
                  </button>
                  <button
                    onClick={handleExport}
                    className="btn-zephyr btn-zephyr-primary px-8 py-3 text-sm flex items-center gap-2"
                  >
                    <Download size={15} aria-hidden="true" />
                    Download (.docx)
                  </button>
                </div>
              </div>

              {/* Chat sidebar */}
              <aside className="sticky top-[76px] h-[calc(100vh-100px)] flex flex-col min-w-0">
                <div
                  className="card-clean flex flex-col h-full overflow-hidden"
                >
                  {/* Chat header */}
                  <div
                    className="flex items-center gap-3 px-5 py-4 border-b shrink-0"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-md border flex items-center justify-center shrink-0"
                      style={{
                        background: "var(--rc-accent-subtle)",
                        borderColor: "var(--rc-accent-subtle-border)",
                      }}
                      aria-hidden="true"
                    >
                      <Brain size={15} style={{ color: "var(--rc-accent)" }} />
                    </div>
                    <div>
                      <h3
                        className="text-sm font-semibold leading-tight"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Ask a follow-up
                      </h3>
                      <p
                        className="text-xs"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        Grounded in this report
                      </p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
                    {chatMessages.length === 0 && (
                      <div
                        className="text-center py-12"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        <MessageSquare
                          size={24}
                          className="mx-auto mb-2 opacity-40"
                          aria-hidden="true"
                        />
                        <p className="text-sm">Ask a follow-up question below.</p>
                      </div>
                    )}
                    {chatMessages.map((m, i) => (
                      <div
                        key={i}
                        className="rounded-md border px-4 py-3"
                        style={
                          m.role === "user"
                            ? {
                                background: "var(--surface)",
                                borderColor: "var(--border)",
                                marginLeft: "24px",
                              }
                            : {
                                background: "var(--rc-accent-subtle)",
                                borderColor: "var(--rc-accent-subtle-border)",
                                marginRight: "24px",
                              }
                        }
                      >
                        <span
                          className="text-[9px] font-semibold block mb-1.5 uppercase tracking-wider"
                          style={{ color: "var(--text-tertiary)" }}
                        >
                          {m.role === "user" ? "You" : "ReportCraft"}
                        </span>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {m.text}
                        </p>
                      </div>
                    ))}
                    {isChatLoading && (
                      <div
                        className="rounded-md border px-4 py-3 flex items-center gap-2"
                        style={{
                          background: "var(--rc-accent-subtle)",
                          borderColor: "var(--rc-accent-subtle-border)",
                          marginRight: "24px",
                        }}
                      >
                        <Loader2
                          size={13}
                          className="animate-spin"
                          style={{ color: "var(--rc-accent)" }}
                          aria-hidden="true"
                        />
                        <span
                          className="text-xs font-medium"
                          style={{ color: "var(--rc-accent)" }}
                        >
                          Thinking…
                        </span>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Input */}
                  <div
                    className="p-4 border-t shrink-0 relative"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <label htmlFor="chat-input" className="sr-only">
                      Ask a follow-up question
                    </label>
                    <input
                      id="chat-input"
                      type="text"
                      className="zephyr-input w-full pr-11 text-sm"
                      placeholder="Ask a follow-up question…"
                      value={currentQuestion}
                      onChange={(e) => setCurrentQuestion(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAskQuestion()}
                    />
                    <button
                      onClick={handleAskQuestion}
                      disabled={isChatLoading || !currentQuestion.trim()}
                      className="absolute right-7 top-1/2 -translate-y-1/2 p-1.5 rounded transition-colors disabled:opacity-30"
                      style={{ color: "var(--rc-accent)" }}
                      aria-label="Send question"
                    >
                      <Send size={15} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </aside>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ResearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2
            className="animate-spin"
            size={32}
            style={{ color: "var(--rc-accent)" }}
            aria-label="Loading…"
          />
        </div>
      }
    >
      <ResearchContent />
    </Suspense>
  );
}
