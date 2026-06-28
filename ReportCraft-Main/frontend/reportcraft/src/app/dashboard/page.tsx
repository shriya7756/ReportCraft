"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  Clock,
  TrendingUp,
  Search,
  MoreHorizontal,
  Download,
  Share2,
  Trash2,
  Plus,
  Filter,
  Calendar,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

const recentReports = [
  {
    id: 1,
    title: "The Impact of Artificial Intelligence on Healthcare",
    date: "2024-03-17",
    status: "completed",
    pages: 12,
    sources: 45,
  },
  {
    id: 2,
    title: "Blockchain Technology in Supply Chain Management",
    date: "2024-03-15",
    status: "completed",
    pages: 8,
    sources: 32,
  },
  {
    id: 3,
    title: "Climate Change and Renewable Energy Solutions",
    date: "2024-03-14",
    status: "completed",
    pages: 15,
    sources: 67,
  },
  {
    id: 4,
    title: "The Future of Quantum Computing",
    date: "2024-03-12",
    status: "completed",
    pages: 10,
    sources: 28,
  },
];

const stats = [
  {
    title: "Total Reports",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: FileText,
    color: "primary",
  },
  {
    title: "Research Hours Saved",
    value: "156",
    change: "+23%",
    trend: "up",
    icon: Clock,
    color: "success",
  },
  {
    title: "Sources Analyzed",
    value: "2,847",
    change: "+18%",
    trend: "up",
    icon: BarChart3,
    color: "accent",
  },
  {
    title: "Avg. Report Quality",
    value: "94%",
    change: "+5%",
    trend: "up",
    icon: TrendingUp,
    color: "primary",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[var(--foreground)]">
                Dashboard
              </h1>
              <p className="text-[var(--foreground-secondary)]">
                Manage your research and track your progress
              </p>
            </div>
            <Link
              href="/research"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient text-white font-semibold shadow-lg shadow-[var(--primary-500)]/25 hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              New Research
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl bg-white dark:bg-[var(--neutral-800)] border border-[var(--border)] shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      stat.color === "primary" && "bg-[var(--primary-100)]",
                      stat.color === "success" && "bg-[var(--success-100)]",
                      stat.color === "accent" && "bg-[var(--accent-100)]"
                    )}
                  >
                    <stat.icon
                      className={cn(
                        "w-6 h-6",
                        stat.color === "primary" && "text-[var(--primary-600)]",
                        stat.color === "success" && "text-[var(--success-600)]",
                        stat.color === "accent" && "text-[var(--accent-600)]"
                      )}
                    />
                  </div>
                  <div
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium",
                      stat.trend === "up" ? "text-[var(--success-600)]" : "text-red-600"
                    )}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="text-3xl font-bold text-[var(--foreground)] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--foreground-secondary)]">
                  {stat.title}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recent Reports Section */}
          <div className="bg-white dark:bg-[var(--neutral-800)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[var(--border)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl font-bold text-[var(--foreground)]">
                  Recent Reports
                </h2>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--foreground-secondary)] hover:bg-[var(--neutral-100)] dark:hover:bg-[var(--neutral-700)] transition-colors">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--foreground-secondary)] hover:bg-[var(--neutral-100)] dark:hover:bg-[var(--neutral-700)] transition-colors">
                    <Calendar className="w-4 h-4" />
                    Date
                  </button>
                </div>
              </div>
            </div>

            <div className="divide-y divide-[var(--border)]">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="p-6 hover:bg-[var(--neutral-50)] dark:hover:bg-[var(--neutral-800)]/50 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-[var(--foreground)] truncate group-hover:text-[var(--primary-600)] transition-colors">
                            {report.title}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-[var(--foreground-secondary)]">
                            <span>{report.date}</span>
                            <span>•</span>
                            <span>{report.pages} pages</span>
                            <span>•</span>
                            <span>{report.sources} sources</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 rounded-lg text-[var(--foreground-secondary)] hover:bg-[var(--neutral-100)] dark:hover:bg-[var(--neutral-700)] transition-colors"
                        aria-label="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 rounded-lg text-[var(--foreground-secondary)] hover:bg-[var(--neutral-100)] dark:hover:bg-[var(--neutral-700)] transition-colors"
                        aria-label="Share"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 rounded-lg text-[var(--foreground-secondary)] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <Link
                        href={`/report/${report.id}`}
                        className="p-2 rounded-lg text-[var(--foreground-secondary)] hover:bg-[var(--neutral-100)] dark:hover:bg-[var(--neutral-700)] transition-colors"
                        aria-label="View report"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-[var(--border)] bg-[var(--background-secondary)]">
              <button className="w-full py-2 text-center text-sm font-medium text-[var(--primary-600)] hover:text-[var(--primary-700)] transition-colors">
                View All Reports
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: "Start New Research",
                desc: "Generate a new AI-powered report",
                href: "/research",
                icon: Search,
                color: "primary",
              },
              {
                title: "View Analytics",
                desc: "Track your research insights",
                href: "/analytics",
                icon: BarChart3,
                color: "accent",
              },
              {
                title: "Browse Templates",
                desc: "Use pre-built research templates",
                href: "/templates",
                icon: FileText,
                color: "success",
              },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-4 p-6 rounded-2xl bg-white dark:bg-[var(--neutral-800)] border border-[var(--border)] shadow-sm hover:shadow-md hover:border-[var(--primary-300)] transition-all group"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    action.color === "primary" && "bg-[var(--primary-100)]",
                    action.color === "accent" && "bg-[var(--accent-100)]",
                    action.color === "success" && "bg-[var(--success-100)]"
                  )}
                >
                  <action.icon
                    className={cn(
                      "w-6 h-6",
                      action.color === "primary" && "text-[var(--primary-600)]",
                      action.color === "accent" && "text-[var(--accent-600)]",
                      action.color === "success" && "text-[var(--success-600)]"
                    )}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--primary-600)] transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-[var(--foreground-secondary)]">
                    {action.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
