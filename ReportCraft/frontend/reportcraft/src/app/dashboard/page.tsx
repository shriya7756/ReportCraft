"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Search,
  Plus,
  Trash2,
  Eye,
  ArrowRight,
  Database,
  Zap,
} from "lucide-react";
import Link from "next/link";
import {
  FadeInSection,
  StaggerContainer,
  StaggerItem,
  CountUp,
  EmptyState,
} from "@/components/UIComponents";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const router = useRouter();
  const [reports, setReports] = useState<Array<{id: string, title: string, date: string, sources: number, words: number, status: string}>>([]);

  useEffect(() => {
    // Load reports from localStorage
    const allReports = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("rc_report_") || key?.startsWith("zephyr_report_")) {
        const data = JSON.parse(localStorage.getItem(key) || "{}");
        const topic = key.replace("rc_report_", "").replace("zephyr_report_", "");
        allReports.push({
          id: key,
          title: topic.toUpperCase(),
          date: data.timestamp ? new Date(data.timestamp).toLocaleDateString() : "Present",
          sources: data.sources?.length || 0,
          words: (data.content?.intro?.split(" ").length || 0) * 6,
          status: "Verified"
        });
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReports(allReports);
  }, []);

  const totalWords = reports.reduce((acc, r) => acc + r.words, 0);
  const totalSources = reports.reduce((acc, r) => acc + r.sources, 0);

  const deleteReport = (key: string) => {
    localStorage.removeItem(key);
    setReports((prev) => prev.filter((r) => r.id !== key));
    toast.success("Intelligence record purged.");
  };

  const viewReport = (report: {id: string}) => {
    const topic = report.id.replace("rc_report_", "").replace("zephyr_report_", "");
    router.push(`/research?topic=${encodeURIComponent(topic)}`);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] transition-colors duration-500">
      <div className="mx-auto max-w-7xl px-8 py-16">
        <header className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between mb-24">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                Nexus Console
              </span>
            </div>
            <h1 className="text-6xl font-black tracking-tight mb-4">
              My <span className="gradient-text">Archive.</span>
            </h1>
            <p className="text-xl font-medium text-[var(--text-secondary)] opacity-60">Inventory of synthesized knowledge and inquiry history.</p>
          </div>
          <Link href="/research" className="btn-zephyr btn-zephyr-primary px-10 py-5 text-lg flex items-center gap-3 shadow-xl shadow-cyan-500/10">
            <Plus size={20} /> Initiate Synthesis
          </Link>
        </header>

        <StaggerContainer className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-24">
          {[
            { label: "Syntheses", value: reports.length, icon: FileText, gradient: "from-cyan-500/10 to-blue-500/10", text: "text-cyan-400" },
            { label: "Data Nodes", value: totalWords, icon: Database, gradient: "from-indigo-500/10 to-purple-500/10", text: "text-indigo-400" },
            { label: "Citations", value: totalSources, icon: Search, gradient: "from-emerald-500/10 to-teal-500/10", text: "text-emerald-400" },
            { label: "Engine Uptime", value: 100, suffix: "%", icon: Zap, gradient: "from-amber-500/10 to-orange-500/10", text: "text-amber-400" },
          ].map((stat, i) => (
            <StaggerItem key={i}>
              <div className="card-glass p-8 group hover:scale-[1.02] transition-all relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} blur-3xl -z-10`} />
                <div className="flex items-center justify-between mb-8">
                  <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${stat.text}`}>
                     <stat.icon size={22} />
                  </div>
                  <div className="text-4xl font-black tracking-tight">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-tertiary)] ml-1">{stat.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeInSection>
          <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-8">
            <h2 className="text-3xl font-black tracking-tight">Intelligence Ledger</h2>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] px-4 py-2 bg-white/5 border border-white/10 rounded-full">{reports.length} Verified Records</div>
          </div>

          <div className="space-y-4 pb-32">
            <AnimatePresence mode="popLayout">
              {reports.map((r) => (
                <motion.div
                  key={r.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="card-glass p-6 group hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6 flex-1 min-w-0">
                      <div className="h-14 w-14 shrink-0 flex items-center justify-center rounded-2xl bg-cyan-500/5 border border-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                        <FileText size={24} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xl font-bold tracking-tight truncate group-hover:text-cyan-400 transition-colors uppercase">{r.title}</h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-[0.1em]">
                          <span>{r.date}</span>
                          <span className="w-1 h-1 rounded-full bg-white/10" />
                          <span>{r.words.toLocaleString()} Knowledge Points</span>
                          <span className="w-1 h-1 rounded-full bg-white/10" />
                          <span className="text-emerald-400 font-black">{r.status}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 shrink-0">
                      <button 
                        onClick={() => viewReport(r)} 
                        className="p-3 rounded-xl glass border border-white/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
                        title="View Synthesis"
                      >
                        <Eye size={20} />
                      </button>
                      <button 
                        onClick={() => deleteReport(r.id)} 
                        className="p-3 rounded-xl glass border border-white/10 hover:border-red-500/50 hover:text-red-400 transition-all"
                        title="Purge"
                      >
                        <Trash2 size={20} />
                      </button>
                      <button 
                        onClick={() => viewReport(r)}
                        className="ml-2 p-3 rounded-xl bg-cyan-400 text-black hover:bg-cyan-300 transition-all"
                      >
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {reports.length === 0 && (
              <EmptyState 
                title="Archive Void" 
                description="The intelligence vaults are currently vacant. Initiate a query to begin synthesis."
                action={<Link href="/research" className="btn-zephyr btn-zephyr-primary px-10 py-5">Initiate First Inquiry</Link>}
              />
            )}
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
