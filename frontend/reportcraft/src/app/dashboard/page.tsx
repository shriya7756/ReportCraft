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
import type { Metadata } from "next";

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
          style={{ color: "var(--rc-accent)" }}
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
              className="text-3xl md:text-4xl font-semibold tracking-tight mb-1.5"
              style={{ letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              Your reports
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem" }}>
              Reports you&apos;ve generated, with sources and quick actions.
            </p>
          </div>
          <Link
            href="/research"
            className="btn-zephyr btn-zephyr-primary px-6 py-2.5 text-sm flex items-center gap-2 self-start sm:self-auto"
            id="new-report-btn"
          >
            <Plus size={15} aria-hidden="true" />
            New report
          </Link>
        </header>

        {/* Stat tiles */}
        <StaggerContainer className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-12">
          {statTiles.map((stat, i) => (
            <StaggerItem key={i}>
              <div className="card-clean p-5">
                <div className="mb-3" style={{ color: "var(--text-tertiary)" }}>
                  <stat.icon size={16} aria-hidden="true" />
                </div>
                <div
                  className="text-2xl font-semibold tracking-tight mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  <CountUp end={stat.value} />
                </div>
                <div
                  className="text-xs font-medium"
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
              className="text-base font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Report history
            </h2>
            <span
              className="text-xs font-medium px-2.5 py-1 rounded border"
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
                  {/* Delete confirmation */}
                  <AnimatePresence>
                    {deletingId === r.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="px-5 py-3.5 flex items-center justify-between gap-4 border-b"
                        style={{
                          background: "rgba(239,68,68,0.04)",
                          borderColor: "rgba(239,68,68,0.15)",
                        }}
                      >
                        <p
                          className="text-sm font-medium"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Delete &quot;{r.title}&quot;? This cannot be undone.
                        </p>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => executeDelete(r.id)}
                            className="px-3.5 py-1.5 text-xs font-semibold bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                            aria-label={`Confirm delete "${r.title}"`}
                          >
                            Delete
                          </button>
                          <button
                            onClick={cancelDelete}
                            className="px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors"
                            style={{
                              background: "var(--surface)",
                              border: "1px solid var(--border)",
                              color: "var(--text-secondary)",
                            }}
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
                        className="h-9 w-9 shrink-0 flex items-center justify-center rounded-md border transition-colors"
                        style={{
                          background: "var(--surface)",
                          borderColor: "var(--border)",
                          color: "var(--text-tertiary)",
                        }}
                        aria-hidden="true"
                      >
                        <FileText size={15} />
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
                              className="zephyr-input py-1.5 px-3 text-sm"
                              autoFocus
                            />
                            <button
                              onClick={() => executeRename(r.id)}
                              className="text-xs font-semibold transition-colors"
                              style={{ color: "var(--rc-accent)" }}
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelRename}
                              className="text-xs font-semibold transition-colors"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <>
                            <h3
                              className="text-sm font-semibold tracking-tight truncate capitalize"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {r.title}
                            </h3>
                            <div
                              className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 mt-0.5 text-xs"
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

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleExport(r)}
                        className="p-2 rounded-md border transition-colors hover:border-[var(--rc-accent)] hover:text-[var(--rc-accent)]"
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
                        className="p-2 rounded-md border transition-colors hover:border-[var(--rc-accent)] hover:text-[var(--rc-accent)]"
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
                        className="p-2 rounded-md border transition-colors hover:border-red-400 hover:text-red-500"
                        style={{
                          borderColor: "var(--border)",
                          color: "var(--text-tertiary)",
                        }}
                        aria-label={`Delete report: ${r.title}`}
                        title="Delete report"
                      >
                        <Trash2 size={15} aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => viewReport(r)}
                        className="btn-zephyr btn-zephyr-primary p-2 ml-1"
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
                    className="btn-zephyr btn-zephyr-primary px-7 py-3 text-sm"
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
