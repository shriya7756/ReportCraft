"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
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
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  // Auth guard
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [user, authLoading, router]);

  // Load reports from localStorage
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

  const confirmDelete = (id: string) => setDeletingId(id);
  const cancelDelete = () => setDeletingId(null);

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
    const isRc = id.startsWith("rc_report_");
    const prefix = isRc ? "rc_report_" : "zephyr_report_";
    const newKey = `${prefix}${renameValue.trim()}`;

    if (id !== newKey) {
      const data = localStorage.getItem(id);
      if (data) {
        localStorage.setItem(newKey, data);
        localStorage.removeItem(id);
        setReports((prev) =>
          prev.map((r) =>
            r.id === id ? { ...r, id: newKey, title: renameValue.trim() } : r
          )
        );
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
    } catch {
      toast.error("Failed to export report.");
    }
  };

  const viewReport = (report: Report) => {
    const topic = report.id
      .replace("rc_report_", "")
      .replace("zephyr_report_", "");
    router.push(`/research?topic=${encodeURIComponent(topic)}`);
  };

  // Loading state
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2
          className="animate-spin"
          size={32}
          style={{ color: "var(--sys-blue)" }}
          aria-label="Loading"
        />
      </div>
    );
  }

  if (!user) return null;

  const statTiles = [
    {
      label: "Reports generated",
      value: reports.length,
      icon: FileText,
    },
    {
      label: "Estimated words",
      value: reports.reduce((acc, r) => acc + r.words, 0),
      icon: FileText,
    },
    {
      label: "Sources cited",
      value: totalSources,
      icon: Search,
    },
    {
      label: "Avg. sources / report",
      value: avgSources,
      icon: Search,
    },
  ];

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ background: "var(--background)" }}
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-12">

        {/* Page header */}
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <h1
              className="type-large-title mb-1.5"
              style={{ color: "var(--text-primary)" }}
            >
              Your reports
            </h1>
            <p className="type-body" style={{ color: "var(--text-secondary)" }}>
              Reports you&apos;ve generated, with sources and quick actions.
            </p>
          </div>
          {/* 44pt CTA button */}
          <Link
            href="/research"
            className="btn-zephyr btn-zephyr-primary px-6 inline-flex items-center gap-2 self-start sm:self-auto type-callout"
            id="new-report-btn"
          >
            <Plus size={16} aria-hidden="true" />
            New report
          </Link>
        </header>

        {/* Stat tiles — Liquid Glass */}
        <StaggerContainer className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-12">
          {statTiles.map((stat, i) => (
            <StaggerItem key={i}>
              <div className="glass-card p-5">
                {/* systemBlue icon tint */}
                <div className="mb-3" style={{ color: "var(--sys-blue)" }}>
                  <stat.icon size={17} aria-hidden="true" />
                </div>
                <div
                  className="type-title2 mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  <CountUp end={stat.value} />
                </div>
                <div
                  className="type-caption1"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {stat.label}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Report list */}
        <FadeInSection>
          <div
            className="flex items-center justify-between mb-5 pb-4 border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <h2
              className="type-headline"
              style={{ color: "var(--text-primary)" }}
            >
              Report history
            </h2>
            <span
              className="type-caption1 font-medium px-3 py-1 rounded-full border"
              style={{
                color: "var(--text-secondary)",
                borderColor: "var(--border)",
                background: "var(--surface)",
              }}
            >
              {reports.length} {reports.length === 1 ? "report" : "reports"}
            </span>
          </div>

          <div className="space-y-2 pb-16">
            <AnimatePresence mode="popLayout">
              {reports.map((r) => (
                <motion.div
                  key={r.id}
                  layout
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98, height: 0 }}
                  transition={{ duration: 0.2, ease: "circOut" }}
                  className="card-clean group overflow-hidden"
                >
                  {/* Delete confirmation — systemRed */}
                  <AnimatePresence>
                    {deletingId === r.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="px-5 py-3.5 flex items-center justify-between gap-4 border-b"
                        style={{
                          background: "var(--sys-red-subtle)",
                          borderColor: "var(--sys-red-subtle-border)",
                        }}
                      >
                        <p
                          className="type-callout font-medium"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Delete &quot;{r.title}&quot;? This cannot be undone.
                        </p>
                        <div className="flex items-center gap-2 shrink-0">
                          {/* 44pt delete confirm — systemRed */}
                          <button
                            onClick={() => executeDelete(r.id)}
                            className="btn-zephyr btn-zephyr-danger px-4 type-footnote"
                            style={{ minHeight: "36px" }}
                            aria-label={`Confirm delete "${r.title}"`}
                          >
                            Delete
                          </button>
                          <button
                            onClick={cancelDelete}
                            className="btn-zephyr btn-zephyr-ghost px-4 type-footnote"
                            style={{ minHeight: "36px" }}
                            aria-label="Cancel delete"
                          >
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {/* Left: icon + info */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div
                        className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl border transition-colors"
                        style={{
                          background: "var(--sys-blue-subtle)",
                          borderColor: "var(--sys-blue-subtle-border)",
                          color: "var(--sys-blue)",
                        }}
                        aria-hidden="true"
                      >
                        <FileText size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        {renamingId === r.id ? (
                          <div className="flex items-center gap-2 max-w-xs">
                            <label htmlFor={`rename-${r.id}`} className="sr-only">
                              Rename report
                            </label>
                            <input
                              id={`rename-${r.id}`}
                              type="text"
                              value={renameValue}
                              onChange={(e) => setRenameValue(e.target.value)}
                              onKeyDown={(e) =>
                                e.key === "Enter" && executeRename(r.id)
                              }
                              className="zephyr-input type-callout"
                              style={{ minHeight: "36px", padding: "6px 12px" }}
                              autoFocus
                            />
                            <button
                              onClick={() => executeRename(r.id)}
                              className="type-callout font-semibold transition-colors"
                              style={{ color: "var(--sys-blue)" }}
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelRename}
                              className="type-callout font-semibold transition-colors"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <>
                            <h3
                              className="type-callout font-semibold truncate capitalize"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {r.title}
                            </h3>
                            <div
                              className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 mt-0.5 type-footnote"
                              style={{ color: "var(--text-tertiary)" }}
                            >
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

                    {/* Actions — all 44pt touch targets */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleExport(r)}
                        className="w-[44px] h-[44px] flex items-center justify-center rounded-xl border transition-all hover:border-[var(--sys-blue)] hover:text-[var(--sys-blue)] hover:bg-[var(--sys-blue-subtle)]"
                        style={{
                          borderColor: "var(--border)",
                          color: "var(--text-tertiary)",
                        }}
                        aria-label={`Export report: ${r.title}`}
                        title="Export as .docx"
                      >
                        <Download size={15} aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => confirmRename(r)}
                        className="w-[44px] h-[44px] flex items-center justify-center rounded-xl border transition-all hover:border-[var(--sys-blue)] hover:text-[var(--sys-blue)] hover:bg-[var(--sys-blue-subtle)]"
                        style={{
                          borderColor: "var(--border)",
                          color: "var(--text-tertiary)",
                        }}
                        aria-label={`Rename report: ${r.title}`}
                        title="Rename report"
                      >
                        <Edit2 size={15} aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => confirmDelete(r.id)}
                        className="w-[44px] h-[44px] flex items-center justify-center rounded-xl border transition-all hover:border-[var(--sys-red)] hover:text-[var(--sys-red)] hover:bg-[var(--sys-red-subtle)]"
                        style={{
                          borderColor: "var(--border)",
                          color: "var(--text-tertiary)",
                        }}
                        aria-label={`Delete report: ${r.title}`}
                        title="Delete report"
                      >
                        <Trash2 size={15} aria-hidden="true" />
                      </button>
                      {/* View — pill, systemBlue */}
                      <button
                        onClick={() => viewReport(r)}
                        className="btn-zephyr btn-zephyr-primary ml-1"
                        style={{ minHeight: "36px", minWidth: "36px", padding: "0 12px" }}
                        aria-label={`Open report: ${r.title}`}
                        title="Open report"
                      >
                        <ArrowRight size={15} aria-hidden="true" />
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
                    className="btn-zephyr btn-zephyr-primary px-7 type-callout"
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
