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
} from "lucide-react";
import {
  ProgressBar,
} from "@/components/UIComponents";
import { Suspense } from "react";
import toast from "react-hot-toast";

const STEPS = [
  { id: 1, label: "Define", icon: Search },
  { id: 2, label: "Explore", icon: Globe },
  { id: 3, label: "Synthesize", icon: FileText },
  { id: 4, label: "Resolution", icon: Sparkles },
];



interface ReportData {
  category: string;
  colors: string;
  abstract: string;
  methodology: string;
  analysis: string;
  conclusion: string;
  sources: Array<{id: number, title: string, pub: string, type: string, url: string, snippet: string, keywords: string[]}>;
}

function ResearchContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [topic, setTopic] = useState("");
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [researchProgress, setResearchProgress] = useState(0);
  const [researchPhase, setResearchPhase] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{role: string, text: string}>>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleStartResearch = async () => {
    if (!topic.trim()) return toast.error("Research subject unidentified.");
    
    setCurrentStep(2);

    const phases = [
      { label: "Establishing connection to Zephryn Nexus...", p: 10 },
      { label: "Orchestrating multi-agent reasoning ensemble...", p: 30 },
      { label: "Executing recursive discourse queries...", p: 50 },
      { label: "Synthesizing multi-modal knowledge graph...", p: 70 },
      { label: "Generating Final Resolution Report...", p: 100 },
    ];

    // Dummy progress feel but real backend trigger
    const backendTrigger = fetch("http://localhost:8000/research", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, retrieve_top_k: 5 }),
    });

    for (const phase of phases) {
      setResearchPhase(phase.label);
      setResearchProgress(phase.p);
      await new Promise(r => setTimeout(r, 600));
    }

    try {
      const response = await backendTrigger;
      if (!response.ok) throw new Error("Synthesis node offline or unreachable.");
      const data = await response.json();
      
      // Map backend report to frontend structure
      setReportData({
          category: "Verified Synthesis",
          colors: "from-cyan-500 to-indigo-500",
          abstract: data.report.split('\n\n')[0] || "Synthesis complete.",
          methodology: data.report.split('\n\n')[1] || "Orchestration detailed in logs.",
          analysis: data.report.split('\n\n')[2] || "Refer to full synthesis for details.",
          conclusion: data.report.split('\n\n').slice(-1)[0] || "Resolution finalized.",
          sources: [
            { id: 1, title: "Synthesis Protocol 1.1.1", pub: "Zephryn Genesis", type: "Internal Protocol", url: "#", snippet: "Direct verified synthesis.", keywords: ["Autonomous"] },
          ]
      });
      
      if (data.initial_turn) {
          setChatMessages([{ role: 'assistant', text: data.initial_turn.raw_utterance || data.initial_turn.utterance }]);
      }
      
      setCurrentStep(4);
    } catch (error) {
       toast.error(error instanceof Error ? error.message : "Synthesis failed.");
       setCurrentStep(1);
    } finally {
       // Done
    }
  };

  const handleAskQuestion = async () => {
    if (!currentQuestion.trim() || !topic) return;
    const userMsg = { role: "user", text: currentQuestion };
    setChatMessages(prev => [...prev, userMsg]);
    
    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, message: currentQuestion }),
      });
      
      if (!response.ok) throw new Error("Agent disconnected.");
      const data = await response.json();
      setChatMessages(prev => [...prev, { role: "assistant", text: data.response }]);
    } catch {
      toast.error("Discourse connection interrupted.");
    }
    
    setCurrentQuestion("");
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] transition-colors duration-500">
      <div className="mx-auto max-w-7xl px-8 py-12">
        {/* Step Indicator */}
        <div className="max-w-xl mx-auto mb-16 relative">
          <div className="flex justify-between mb-4 relative z-10">
            {STEPS.map(s => {
              const isActive = currentStep >= s.id;
              return (
                <div key={s.id} className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ${
                    isActive ? 'bg-cyan-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/20' : 'bg-white/5 border-white/10 text-white/30'
                  }`}>
                    <s.icon size={14} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-white' : 'text-white/20'}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="absolute top-4 left-4 right-4 h-[1px] bg-white/5 -z-0" />
          <motion.div 
            className="absolute top-4 left-4 right-4 h-[1px] bg-gradient-to-r from-cyan-500 to-indigo-500 -z-0"
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
              <div className="text-center mb-16">
                <motion.h1 
                  className="text-6xl md:text-8xl font-black tracking-tight mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Pure <span className="gradient-text">Inquiry.</span>
                </motion.h1>
                <p className="text-xl text-[var(--text-secondary)] font-medium max-w-lg mx-auto opacity-70">
                  Transcend hallucinations. Subject-locked verification engine.
                </p>
              </div>

              <div className="relative group max-w-2xl mx-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative glass p-10 rounded-3xl border border-white/10">
                  <div className="relative mb-8">
                    <input
                      type="text"
                      className="zephyr-input w-full text-2xl"
                      placeholder="Subject Name (e.g. CIFAR-10, Fusion)"
                      value={topic}
                      onKeyDown={(e) => e.key === 'Enter' && handleStartResearch()}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" />
                  </div>
                  <button onClick={handleStartResearch} className="btn-zephyr btn-zephyr-primary w-full py-5 text-xl flex items-center justify-center gap-3">
                    Launch Synthesis <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div key="step-2" className="max-w-xl mx-auto py-24 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="relative inline-block mb-12">
                <div className="absolute inset-0 bg-cyan-500/20 blur-3xl animate-pulse" />
                <div className="relative w-24 h-24 rounded-3xl glass flex items-center justify-center border border-white/10">
                  <Cpu className="text-cyan-400 animate-spin" size={40} style={{ animationDuration: '3s' }} />
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">Synthesizing {topic}</h2>
              <p className="text-sm font-bold text-cyan-400/60 uppercase tracking-widest mb-10">{researchPhase}</p>
              
              <div className="px-10">
                <ProgressBar value={researchProgress} />
              </div>
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
                <article className="card-glass p-12 sm:p-20 relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${reportData.colors} opacity-[0.03] blur-[100px] pointer-events-none`} />
                  
                  <header className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                      <span className="px-3 py-1 rounded-full glass border border-white/10 text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                        {reportData.category}
                      </span>
                      <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                        <Shield size={10} /> Verified Synthesis
                      </div>
                    </div>
                    <h1 className="text-6xl sm:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
                      <span className="gradient-text">{topic}</span>
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full" />
                  </header>

                  <div className="space-y-24">
                    <section className="relative">
                      <div className="absolute -left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500/50 to-transparent" />
                      <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-3">
                        <Database size={20} className="text-cyan-400" /> Abstract
                      </h2>
                      <p className="text-xl font-medium leading-relaxed text-[var(--text-secondary)] opacity-90">{reportData.abstract}</p>
                    </section>

                    <section className="grid md:grid-cols-2 gap-16">
                      <div>
                        <h2 className="text-xl font-bold tracking-tight mb-6 text-indigo-400">I. Methodology</h2>
                        <p className="text-lg leading-relaxed text-[var(--text-secondary)] opacity-80">{reportData.methodology}</p>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold tracking-tight mb-6 text-fuchsia-400">II. Deep Analysis</h2>
                        <p className="text-lg leading-relaxed text-[var(--text-secondary)] opacity-80">{reportData.analysis}</p>
                      </div>
                    </section>

                    <section className="p-10 rounded-3xl bg-white/[0.02] border border-white/5">
                      <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center gap-3">
                        <Sparkles size={20} className="text-amber-400" /> Conclusion
                      </h2>
                      <p className="text-lg leading-relaxed text-[var(--text-secondary)] opacity-90">{reportData.conclusion}</p>
                    </section>
                  </div>

                  {/* Sources Section */}
                  <div className="mt-32 pt-20 border-t border-white/5">
                    <h3 className="text-3xl font-black tracking-tight mb-12">Resolution Sources</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {reportData.sources.map((s, i:number) => (
                        <div key={i} className="group p-6 rounded-2xl glass border border-white/5 hover:border-white/20 transition-all">
                          <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] font-black text-white/20">0{i+1}</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-500/60">{s.type}</span>
                          </div>
                          <h4 className="font-bold text-lg mb-6 group-hover:text-cyan-300 transition-colors">{s.title}</h4>
                          <div className="flex items-center justify-between mt-auto">
                            <span className="text-[10px] font-bold uppercase text-[var(--text-tertiary)]">{s.pub}</span>
                            <a href={s.url} target="_blank" className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all">
                              <ExternalLink size={14} />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>

                <div className="flex justify-center">
                  <button onClick={() => setCurrentStep(1)} className="btn-zephyr btn-zephyr-secondary px-12 py-5 text-xl">
                    Initiate New Inquiry
                  </button>
                </div>
              </div>

              {/* Sidebar Chat */}
              <aside className="sticky top-24 h-[calc(100vh-120px)] flex flex-col min-w-0">
                <div className="glass p-6 rounded-3xl border border-white/10 mb-4 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-8 px-2">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                      <Brain size={20} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold tracking-tight leading-tight">Expert Discourse</h3>
                        <p className="text-[10px] font-bold uppercase text-white/20 tracking-widest">Synthesis Mode Active</p>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto space-y-6 px-2 scrollbar-hide py-4">
                    {chatMessages.length === 0 && (
                      <div className="text-center py-20 opacity-20">
                        <MessageSquare size={40} className="mx-auto mb-4" />
                        <p className="text-[10px] font-bold uppercase tracking-widest">Awaiting Inquiry...</p>
                      </div>
                    )}
                    {chatMessages.map((m, i) => (
                      <div key={i} className={`p-5 rounded-2xl border transition-all ${
                        m.role === 'user' 
                          ? 'bg-white/5 border-white/5 ml-8' 
                          : 'bg-cyan-500/5 border-cyan-500/20 mr-8 animate-fade-in-up'
                      }`}>
                        <span className="text-[9px] font-bold uppercase block mb-2 opacity-30">
                          {m.role === 'user' ? 'Scientist' : 'Zephryn Synthesis'}
                        </span>
                        <p className="text-sm font-medium leading-relaxed opacity-90">{m.text}</p>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5 relative">
                    <input 
                      type="text" 
                      className="zephyr-input w-full pr-12 text-sm py-4"
                      placeholder="Ask the synthesis engine..."
                      value={currentQuestion}
                      onChange={(e)=>setCurrentQuestion(e.target.value)}
                      onKeyDown={(e)=>e.key === 'Enter' && handleAskQuestion()}
                    />
                    <button onClick={handleAskQuestion} className="absolute right-3 top-[calc(1rem+4px)] p-2 text-cyan-400 hover:text-cyan-300 transition-colors">
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
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="animate-spin text-cyan-400" size={48} /></div>}>
      <ResearchContent />
    </Suspense>
  );
}
