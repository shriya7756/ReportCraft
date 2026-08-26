"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Users,
  FileText,
  Activity,
  ShieldCheck,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { StaggerContainer, StaggerItem, FadeInSection } from "@/components/UIComponents";

const logs = [
  { id: 1, user: "shriya@example.com", action: "Generated Report", target: "Quantum Computing", time: "2 min ago" },
  { id: 2, user: "john@doe.com", action: "Generated Report", target: "Neural Scaling Laws", time: "15 min ago" },
  { id: 3, user: "sarah@tech.io", action: "Exported Report", target: "Startup Funding Trends", time: "1 hr ago" },
  { id: 4, user: "admin@ReportCraft.com", action: "Signed in", target: "System", time: "2 hr ago" },
];

const securityChecks = [
  { label: "All AI agents operational", status: "ok" },
  { label: "Cohere API reachable", status: "ok" },
  { label: "3 rate-limited requests in last hour", status: "warn" },
];

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loader2
          className="animate-spin"
          size={28}
          style={{ color: "var(--rc-accent)" }}
          aria-label="Loading"
        />
      </div>
    );
  }

  if (!user || user.role !== "admin") return null;

  const statTiles = [
    { label: "Active users (demo)", value: "1,284", icon: Users },
    { label: "Total reports (demo)", value: "8,432", icon: FileText },
    { label: "System health", value: "99.9%", icon: ShieldCheck },
  ];

  return (
    <div
      className="min-h-screen py-14"
      style={{ background: "var(--background)" }}
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">

        {/* Header */}
        <header className="flex items-start justify-between gap-6 mb-12">
          <div>
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--rc-accent)" }}
            >
              Admin
            </span>
            <h1
              className="text-3xl md:text-4xl font-semibold tracking-tight"
              style={{ letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              System overview
            </h1>
          </div>
          <Link
            href="/dashboard"
            className="btn-zephyr btn-zephyr-secondary px-5 py-2.5 text-sm flex items-center gap-2 shrink-0"
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Dashboard
          </Link>
        </header>

        {/* Stats */}
        <StaggerContainer className="grid gap-4 grid-cols-1 sm:grid-cols-3 mb-10">
          {statTiles.map((stat, i) => (
            <StaggerItem key={i}>
              <div className="card-clean p-6 flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-md border flex items-center justify-center shrink-0"
                  style={{
                    background: "var(--surface)",
                    borderColor: "var(--border)",
                    color: "var(--text-tertiary)",
                  }}
                  aria-hidden="true"
                >
                  <stat.icon size={18} />
                </div>
                <div>
                  <p
                    className="text-xl font-semibold tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-xs font-medium"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {stat.label}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Two-column panels */}
        <div className="grid lg:grid-cols-2 gap-6 pb-24">

          {/* Activity log */}
          <FadeInSection>
            <div className="card-clean h-full">
              <div
                className="flex items-center gap-3 px-6 py-4 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <Activity
                  size={16}
                  style={{ color: "var(--rc-accent)" }}
                  aria-hidden="true"
                />
                <h2
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Recent activity
                </h2>
                <span
                  className="ml-auto text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border"
                  style={{
                    background: "var(--surface)",
                    borderColor: "var(--border)",
                    color: "var(--text-tertiary)",
                  }}
                >
                  Demo data
                </span>
              </div>
              <div className="divide-y" style={{ borderColor: "var(--border)" }}>
                {logs.map((log) => (
                  <div key={log.id} className="px-6 py-4">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <span
                        className="text-sm font-medium truncate"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {log.user}
                      </span>
                      <span
                        className="text-xs shrink-0 font-mono"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        {log.time}
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      {log.action}
                      {" — "}
                      <span style={{ color: "var(--text-tertiary)" }}>
                        {log.target}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Security status */}
          <FadeInSection delay={0.1}>
            <div className="card-clean h-full">
              <div
                className="flex items-center gap-3 px-6 py-4 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <ShieldCheck
                  size={16}
                  style={{ color: "var(--rc-accent)" }}
                  aria-hidden="true"
                />
                <h2
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Security status
                </h2>
              </div>
              <div className="p-6 space-y-3">
                {securityChecks.map((check, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 rounded-md border"
                    style={
                      check.status === "ok"
                        ? {
                            background: "rgba(34, 197, 94, 0.04)",
                            borderColor: "rgba(34, 197, 94, 0.15)",
                          }
                        : {
                            background: "rgba(245, 158, 11, 0.04)",
                            borderColor: "rgba(245, 158, 11, 0.15)",
                          }
                    }
                  >
                    {check.status === "ok" ? (
                      <CheckCircle
                        size={15}
                        className="text-emerald-500 shrink-0"
                        aria-hidden="true"
                      />
                    ) : (
                      <AlertCircle
                        size={15}
                        className="text-amber-500 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
}
