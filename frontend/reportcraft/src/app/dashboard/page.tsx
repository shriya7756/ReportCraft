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
  Loader2,
  Edit2,
  Download,
} from "lucide-react";
import {
  FadeInSection,
  StaggerContainer,
  StaggerItem,
  CountUp,
  EmptyState,
} from "@/components/UIComponents";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import toast from "react-hot-toast";

interface Report {
  id: string;
  title: string;
  date: string;
  sources: number;
  words: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null); // confirmation state
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  // Auth guard — redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const allReports: Report[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("rc_report_") || key?.startsWith("zephyr_report_")) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || "{}");
          const topic = key
            .replace("rc_report_", "")
            .replace("zephyr_report_", "");
          allReports.push({
            id: key,
            title: topic,
            date: data.timestamp
              ? new Date(data.timestamp).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Today",
            sources: data.sources?.length || 0,
            words: (data.content?.intro?.split(" ").length || 0) * 6,
          });
        } catch {
          // skip malformed entries
        }
      }
    }
    setReports(allReports);
  }, []);

  const totalSources = reports.reduce((acc, r) => acc + r.sources, 0);
  const avgSources =
    reports.length > 0 ? Math.round(totalSources / reports.length) : 0;

  const confirmDelete = (id: string) => {
    setDeletingId(id);
  };

  const cancelDelete = () => {
    setDeletingId(null);
  };

  const executeDelete = (id: string) => {
    localStorage.removeItem(id);
    setReports((prev) => prev.filter((r) => r.id !== id));
    setDeletingId(null);
    toast.success("Report deleted.");
  };

  const confirmRename = (r: Report) => {
    setRenamingId(r.id);
    setRenameValue(r.title);
  };

  const cancelRename = () => {
    setRenamingId(null);
    setRenameValue("");
  };

  const executeRename = (id: string) => {
    if (!renameValue.trim()) return;
    const oldKey = id;
    const isRc = id.startsWith("rc_report_");
    const prefix = isRc ? "rc_report_" : "zephyr_report_";
    const newKey = `${prefix}${renameValue.trim()}`;
    
    if (oldKey !== newKey) {
      const data = localStorage.getItem(oldKey);
      if (data) {
        localStorage.setItem(newKey, data);
        localStorage.removeItem(oldKey);
        setReports((prev) => prev.map(r => r.id === id ? { ...r, id: newKey, title: renameValue.trim() } : r));
      }
    }
    setRenamingId(null);
    toast.success("Report renamed.");
  };

  const handleExport = async (r: Report) => {
    const dataStr = localStorage.getItem(r.id);
    if (!dataStr) return;
    try {
      const data = JSON.parse(dataStr);
      const { exportReportToDocx } = await import("@/utils/export");
      await exportReportToDocx(r.title, data);
      toast.success("Report exported.");
    } catch (err) {
      toast.error("Failed to export report.");
    }
  };

  const viewReport = (report: Report) => {
    const topic = report.id
      .replace("rc_report_", "")
      .replace("zephyr_report_", "");
    router.push(`/research?topic=${encodeURIComponent(topic)}`);
  };

  // Show loading spinner while auth is resolving
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-[var(--rc-accent)]" size={40} aria-label="Loading" />
      </div>
    );
  }

  // Auth guard prevents render if not logged in
  if (!user) return null;

  const statTiles = [
    {
      label: "Reports",
      value: reports.length,
      suffix: undefined,
      icon: FileText,
      gradient: "from-[var(--rc-accent)]/10 to-blue-500/10",
      text: "text-[var(--rc-accent)]",
    },
    {
      label: "Est. words written",
      value: reports.reduce((acc, r) => acc + r.words, 0),
      suffix: undefined,
      icon: FileText,
      gradient: "from-indigo-500/10 to-purple-500/10",
      text: "text-indigo-400",
    },
    {
      label: "Sources cited",
      value: totalSources,
      suffix: undefined,
      icon: Search,
      gradient: "from-emerald-500/10 to-teal-500/10",
      text: "text-emerald-400",
    },
    {
      label: "Avg. sources per report",
      value: avgSources,
      suffix: undefined,
      icon: Search,
      gradient: "from-amber-500/10 to-orange-500/10",
      text: "text-amber-400",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] transition-colors duration-300">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 py-16">

        {/* Header */}
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
              Your <span className="text-gradient">reports.</span>
            </h1>
            <p className="text-[var(--text-secondary)]">
              Reports you&apos;ve generated, with sources and quick actions.
            </p>
          </div>
          <Link
            href="/research"
            className="btn-zephyr btn-zephyr-primary px-8 py-4 text-base flex items-center gap-2 self-start sm:self-auto"
            id="new-report-btn"
          >
            <Plus size={18} aria-hidden="true" /> New report
          </Link>
        </header>

        {/* Stat tiles */}
        <StaggerContainer className="grid gap-5 grid-cols-2 lg:grid-cols-4 mb-16">
          {statTiles.map((stat, i) => (
            <StaggerItem key={i}>
              <div className="card-clean p-6 relative overflow-hidden">
                <div
                  className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.gradient} blur-2xl -z-10`}
                  aria-hidden="true"
                />
                <div className={`mb-4 ${stat.text}`}>
                  <stat.icon size={20} aria-hidden="true" />
                </div>
                <div className="text-3xl font-black tracking-tight mb-1">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Report list */}
        <FadeInSection>
          <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
            <h2 className="text-2xl font-black tracking-tight">Your reports</h2>
            <span className="text-xs font-semibold text-[var(--text-secondary)] px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
              {reports.length} {reports.length === 1 ? "report" : "reports"}
            </span>
          </div>

          <div className="space-y-3 pb-24">
            <AnimatePresence mode="popLayout">
              {reports.map((r) => (
                <motion.div
                  key={r.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96, height: 0 }}
                  transition={{ duration: 0.25, ease: "circOut" }}
                  className="card-clean group hover:border-[var(--rc-accent)]/30 transition-all overflow-hidden"
                >
                  {/* Delete confirmation overlay */}
                  <AnimatePresence>
                    {deletingId === r.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-5 flex items-center justify-between gap-4 bg-red-500/5 border-b border-red-500/20"
                      >
                        <p className="text-sm font-medium text-[var(--text-primary)]">
                          Delete &quot;{r.title}&quot;? This can&apos;t be undone.
                        </p>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => executeDelete(r.id)}
                            className="px-4 py-2 text-sm font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            aria-label={`Confirm delete "${r.title}"`}
                          >
                            Delete
                          </button>
                          <button
                            onClick={cancelDelete}
                            className="px-4 py-2 text-sm font-semibold bg-white/5 text-[var(--text-secondary)] border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                            aria-label="Cancel delete"
                          >
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="p-5 flex flex-col sm:flex-row items-center justify-between gap-5">
                    <div className="flex items-center gap-5 flex-1 min-w-0 w-full">
                      <div
                        className="h-12 w-12 shrink-0 flex items-center justify-center rounded-xl bg-[var(--rc-accent)]/10 border border-cyan-500/10 text-[var(--rc-accent)] group-hover:bg-cyan-500 group-hover:text-white transition-all"
                        aria-hidden="true"
                      >
                        <FileText size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        {renamingId === r.id ? (
                          <div className="flex items-center gap-2 max-w-xs">
                            <input
                              type="text"
                              value={renameValue}
                              onChange={(e) => setRenameValue(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && executeRename(r.id)}
                              className="zephyr-input py-1.5 px-3 text-sm bg-black/20"
                              autoFocus
                            />
                            <button onClick={() => executeRename(r.id)} className="text-emerald-500 text-xs font-bold uppercase tracking-widest hover:text-emerald-400">Save</button>
                            <button onClick={cancelRename} className="text-[var(--text-secondary)] text-xs font-bold uppercase tracking-widest hover:text-[var(--text-primary)]">Cancel</button>
                          </div>
                        ) : (
                          <>
                            <h3 className="text-base font-bold tracking-tight truncate group-hover:text-[var(--rc-accent)] transition-colors capitalize">
                              {r.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-[var(--text-tertiary)]">
                              <span>{r.date}</span>
                              {r.sources > 0 && (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span>{r.sources} sources</span>
                                </>
                              )}
                              {r.words > 0 && (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span>~{r.words.toLocaleString()} words</span>
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleExport(r)}
                        className="p-2.5 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] shadow-sm border border-white/10 hover:border-emerald-500/50 hover:text-emerald-400 transition-all"
                        aria-label={`Export report: ${r.title}`}
                        title="Export report"
                      >
                        <Download size={18} aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => confirmRename(r)}
                        className="p-2.5 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] shadow-sm border border-white/10 hover:border-indigo-500/50 hover:text-indigo-400 transition-all"
                        aria-label={`Rename report: ${r.title}`}
                        title="Rename report"
                      >
                        <Edit2 size={18} aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => confirmDelete(r.id)}
                        className="p-2.5 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] shadow-sm border border-white/10 hover:border-red-500/50 hover:text-red-400 transition-all"
                        aria-label={`Delete report: ${r.title}`}
                        title="Delete report"
                      >
                        <Trash2 size={18} aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => viewReport(r)}
                        className="p-2.5 rounded-lg bg-cyan-400 text-black hover:bg-cyan-300 transition-all"
                        aria-label={`Open report: ${r.title}`}
                        title="Open report"
                      >
                        <ArrowRight size={18} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {reports.length === 0 && (
              <EmptyState
                title="No reports yet"
                description="Run your first report to see it here. Pick any topic you're curious about."
                action={
                  <Link
                    href="/research"
                    className="btn-zephyr btn-zephyr-primary px-8 py-4"
                    id="first-report-btn"
                  >
                    Start your first report
                  </Link>
                }
              />
            )}
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
