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
import {
  ProgressBar,
} from "@/components/UIComponents";
import { Suspense } from "react";
import toast from "react-hot-toast";

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
  colors: string;
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
  const [reportText, setReportText] = useState(""); // for grounding chat
  const [researchProgress, setResearchProgress] = useState(0);
  const [researchPhase, setResearchPhase] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{role: string, text: string}>>([]);
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
      { label: "Connecting to ReportCraft Knowledge Network...", p: 10 },
      { label: "Scouring scientific databases and web sources...", p: 30 },
      { label: "Cross-referencing literature and citations...", p: 55 },
      { label: "Synthesizing multi-source knowledge graph...", p: 80 },
      { label: "Compiling final research report...", p: 95 },
    ];

    // AbortController so we never hang forever (30 second hard limit)
    const controller = new AbortController();
    const hardTimeout = setTimeout(() => controller.abort(), 30000);

    // Start backend call immediately
    const backendPromise = fetch("/api/research", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic: topic.trim() }),
      signal: controller.signal,
    });

    // Animate progress in parallel
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

      // Store raw report for grounding chat
      const rawReportText: string = data.report || "";
      setReportText(rawReportText);

      // Parse report sections
      const reportText: string = data.report || "";
      const sections = reportText.split(/\n\n+/);

      const extractSection = (keywords: string[]): string => {
        for (const kw of keywords) {
          const idx = sections.findIndex((s) =>
            s.toUpperCase().includes(kw.toUpperCase())
          );
          if (idx !== -1) {
            return sections[idx].replace(/^[A-Z\s]+:\s*/i, "").trim() ||
              (sections[idx + 1] ?? "");
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
                pub: "ReportCraft.ai",
                type: "AI Research Engine",
                url: "#",
                snippet: "AI-powered multi-source research synthesis.",
                keywords: [topic],
              },
            ];

      setReportData({
        category: "Live Web Synthesis",
        colors: "from-[var(--rc-accent)] to-[var(--rc-accent)]",
        abstract,
        methodology,
        analysis,
        conclusion,
        sources,
      });

      // Save to localStorage for dashboard
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
          text: `Report on "${topic}" complete — ${sources.length} source${sources.length !== 1 ? 's' : ''} cited. Ask me anything about this topic.`,
        },
      ]);

      setCurrentStep(4);
    } catch (error) {
      clearTimeout(hardTimeout);
      console.error("Research error:", error);
      const msg =
        error instanceof Error
          ? error.name === "AbortError"
            ? "Research timed out. Please try again."
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
          reportContext: reportText, // ground answers on actual report
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
      toast.error(err instanceof Error ? err.message : "Couldn't reach the assistant. Try again.");
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleExport = async () => {
    if (!reportData) return;
    try {
      const { exportReportToDocx } = await import("@/utils/export");
      await exportReportToDocx(topic, reportData);
      toast.success("Report downloaded.");
    } catch (err) {
      toast.error("Failed to export report.");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] transition-colors duration-500">
      <div className="mx-auto max-w-7xl px-8 py-12">
        {/* Step Indicator */}
        <div className="max-w-xl mx-auto mb-16 relative">
          <div className="flex justify-between mb-4 relative z-10">
            {STEPS.map((s) => {
              const isActive = currentStep >= s.id;
              return (
                <div key={s.id} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ${
                      isActive
                        ? "bg-cyan-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/20"
                        : "bg-white/5 border-white/10 text-white/30"
                    }`}
                  >
                    <s.icon size={14} />
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest ${
                      isActive ? "text-white" : "text-white/20"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="absolute top-4 left-4 right-4 h-[1px] bg-white/5 -z-0" />
          <motion.div
            className="absolute top-4 left-4 right-4 h-[1px] bg-gradient-to-r from-[var(--rc-accent)] to-[var(--rc-accent)] -z-0"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: (currentStep - 1) / (STEPS.length - 1) }}
            transition={{ duration: 0.8, ease: "circOut" }}
          />
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="max-w-3xl mx-auto pt-10"
            >
              <div className="text-center mb-12">
                <motion.h1
                  className="text-4xl md:text-6xl font-black tracking-tight mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Start a <span className="text-gradient">report.</span>
                </motion.h1>
                <p className="text-lg text-[var(--text-secondary)] font-medium max-w-lg mx-auto">
                  Enter any topic and get a structured research report with live
                  citations in under a minute.
                </p>
              </div>

              <div className="relative group max-w-2xl mx-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-[var(--rc-accent)] to-[var(--rc-accent)] rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-[var(--card-bg)] border border-[var(--border)] shadow-sm p-10 rounded-3xl border border-white/10">
                  <div className="relative mb-8">
                    <input
                      type="text"
                      className="zephyr-input w-full text-2xl"
                      placeholder="e.g. CRISPR gene editing, Quantum computing, LLM scaling laws"
                      value={topic}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleStartResearch()
                      }
                      onChange={(e) => setTopic(e.target.value)}
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                  </div>
                  <button
                    onClick={handleStartResearch}
                    disabled={!topic.trim() || currentStep === 2}
                    className="btn-zephyr btn-zephyr-primary w-full py-5 text-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Generate report"
                  >
                    {currentStep === 2 ? (
                      <>
                        <Loader2 size={22} className="animate-spin" aria-hidden="true" />
                        Researching…
                      </>
                    ) : (
                      <>
                        Generate report <ArrowRight size={22} aria-hidden="true" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-white/30 mt-4 font-medium">
                    Powered by Cohere Command R+ · Wikipedia + live web
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step-2"
              className="max-w-xl mx-auto py-24 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="relative inline-block mb-12">
                <div className="absolute inset-0 bg-cyan-500/20 blur-3xl animate-pulse" />
                <div className="relative w-24 h-24 rounded-3xl bg-[var(--card-bg)] border border-[var(--border)] shadow-sm flex items-center justify-center border border-white/10">
                  <Cpu
                    className="text-[var(--rc-accent)] animate-spin"
                    size={40}
                    style={{ animationDuration: "3s" }}
                  />
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Researching{" "}
                <span className="text-gradient">{topic}</span>
              </h2>
              <p className="text-sm font-bold text-[var(--rc-accent)]/60 uppercase tracking-widest mb-10">
                {researchPhase}
              </p>

              <div className="px-10">
                <ProgressBar value={researchProgress} />
              </div>
              <p className="text-xs text-white/20 mt-6">
                Scanning live web sources · Synthesizing citations
              </p>
            </motion.div>
          )}

          {currentStep === 4 && reportData && (
            <motion.div
              key="step-4"
              className="grid lg:grid-cols-[1fr_380px] gap-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="space-y-12 pb-32">
                <article className="card-clean p-12 sm:p-20 relative overflow-hidden">
                  <div
                    className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${reportData.colors} opacity-[0.03] blur-[100px] pointer-events-none`}
                  />

                  <header className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                      <span className="px-3 py-1 rounded-full bg-[var(--card-bg)] border border-[var(--border)] shadow-sm border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[var(--rc-accent)]">
                        {reportData.category}
                      </span>
                      <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                        <Shield size={10} /> Live Web Research
                      </div>
                    </div>
                    <h1 className="text-6xl sm:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
                      <span className="text-gradient">{topic}</span>
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-[var(--rc-accent)] to-[var(--rc-accent)] rounded-full" />
                  </header>

                  <div className="space-y-24">
                    <section className="relative">
                      <div className="absolute -left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--rc-accent)]/50 to-transparent" />
                      <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-3">
                        <Database size={20} className="text-[var(--rc-accent)]" /> Abstract
                      </h2>
                      <p className="text-xl font-medium leading-relaxed text-[var(--text-secondary)] opacity-90">
                        {reportData.abstract}
                      </p>
                    </section>

                    <section className="grid md:grid-cols-2 gap-16">
                      <div>
                        <h2 className="text-xl font-bold tracking-tight mb-6 text-indigo-400">
                          I. Methodology
                        </h2>
                        <p className="text-lg leading-relaxed text-[var(--text-secondary)] opacity-80">
                          {reportData.methodology}
                        </p>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold tracking-tight mb-6 text-fuchsia-400">
                          II. Deep Analysis
                        </h2>
                        <p className="text-lg leading-relaxed text-[var(--text-secondary)] opacity-80">
                          {reportData.analysis}
                        </p>
                      </div>
                    </section>

                    <section className="p-10 rounded-3xl bg-white/[0.02] border border-white/5">
                      <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center gap-3">
                        <Sparkles size={20} className="text-amber-400" />{" "}
                        Conclusion
                      </h2>
                      <p className="text-lg leading-relaxed text-[var(--text-secondary)] opacity-90">
                        {reportData.conclusion}
                      </p>
                    </section>
                  </div>

                  {/* Sources Section */}
                  <div className="mt-32 pt-20 border-t border-white/5">
                    <h3 className="text-3xl font-black tracking-tight mb-12">
                      Live Web Sources
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {reportData.sources.map((s, i: number) => (
                        <div
                          key={i}
                          className="group p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] shadow-sm border border-white/5 hover:border-white/20 transition-all"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] font-black text-white/20">
                              0{i + 1}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-500/60">
                              {s.type}
                            </span>
                          </div>
                          <h4 className="font-bold text-base mb-4 group-hover:text-cyan-300 transition-colors line-clamp-2">
                            {s.title}
                          </h4>
                          <div className="flex items-center justify-between mt-auto">
                            <span className="text-[10px] font-bold uppercase text-[var(--text-tertiary)] truncate max-w-[120px]">
                              {s.pub}
                            </span>
                            <a
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 hover:text-[var(--rc-accent)] transition-all shrink-0"
                            >
                              <ExternalLink size={14} />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setTopic("");
                      setReportData(null);
                      setChatMessages([]);
                    }}
                    className="btn-zephyr btn-zephyr-secondary px-10 py-4 text-base"
                  >
                    Start a new report
                  </button>
                  <button
                    onClick={handleExport}
                    className="btn-zephyr btn-zephyr-primary px-10 py-4 text-base flex items-center gap-2"
                  >
                    <Download size={18} aria-hidden="true" />
                    Download (.docx)
                  </button>
                </div>
              </div>

              {/* Sidebar Chat */}
              <aside className="sticky top-24 h-[calc(100vh-120px)] flex flex-col min-w-0">
                <div className="bg-[var(--card-bg)] border border-[var(--border)] shadow-sm p-6 rounded-3xl border border-white/10 mb-4 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-6 px-2">
                    <div className="w-10 h-10 rounded-xl bg-[var(--rc-accent)]/10 flex items-center justify-center text-[var(--rc-accent)]" aria-hidden="true">
                      <Brain size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold tracking-tight leading-tight">
                        Ask a follow-up
                      </h3>
                      <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                        Based on this report
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-6 px-2 scrollbar-hide py-4">
                    {chatMessages.length === 0 && (
                      <div className="text-center py-16 text-[var(--text-tertiary)]">
                        <MessageSquare size={32} className="mx-auto mb-3 opacity-40" aria-hidden="true" />
                        <p className="text-sm">
                          Report ready. Ask a follow-up question below.
                        </p>
                      </div>
                    )}
                    {chatMessages.map((m, i) => (
                      <div
                        key={i}
                        className={`p-5 rounded-2xl border transition-all ${
                          m.role === "user"
                            ? "bg-white/5 border-white/5 ml-8"
                            : "bg-[var(--rc-accent)]/10 border-cyan-500/20 mr-8"
                        }`}
                      >
                        <span className="text-[10px] font-semibold block mb-2 text-[var(--text-tertiary)]">
                          {m.role === "user" ? "You" : "ReportCraft"}
                        </span>
                        <p className="text-sm font-medium leading-relaxed opacity-90">
                          {m.text}
                        </p>
                      </div>
                    ))}
                    {isChatLoading && (
                      <div className="bg-[var(--rc-accent)]/10 border border-cyan-500/20 mr-8 p-5 rounded-2xl flex items-center gap-3">
                        <Loader2 size={16} className="animate-spin text-[var(--rc-accent)]" />
                        <span className="text-xs text-[var(--rc-accent)]/60 uppercase tracking-widest font-bold">
                          Researching...
                        </span>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5 relative">
                    <input
                      type="text"
                      className="zephyr-input w-full pr-12 text-sm py-4"
                      placeholder="Ask a follow-up question..."
                      value={currentQuestion}
                      onChange={(e) => setCurrentQuestion(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleAskQuestion()
                      }
                    />
                    <button
                      onClick={handleAskQuestion}
                      disabled={isChatLoading}
                      className="absolute right-3 top-[calc(1rem+4px)] p-2 text-[var(--rc-accent)] hover:text-cyan-300 transition-colors disabled:opacity-30"
                    >
                      <Send size={18} />
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
          <Loader2 className="animate-spin text-[var(--rc-accent)]" size={48} />
        </div>
      }
    >
      <ResearchContent />
    </Suspense>
  );
}
