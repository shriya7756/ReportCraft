"use client";

import { useAuth } from "@/components/AuthProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Shield,
  LogOut,
  Loader2,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/UIComponents";

export default function ProfilePage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [reportsCount, setReportsCount] = useState(0);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }

    const count = Object.keys(localStorage).filter(
      (k) => k.startsWith("rc_report_") || k.startsWith("zephyr_report_")
    ).length;
    setReportsCount(count);
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loader2
          className="animate-spin"
          size={28}
          style={{ color: "var(--rc-accent)" }}
          aria-label="Loading profile"
        />
      </div>
    );
  }

  const userInitial = user.email[0].toUpperCase();
  const userName = user.email.split("@")[0];

  const stats = [
    {
      label: "Reports generated",
      value: reportsCount,
      icon: FileText,
    },
    {
      label: "Account role",
      value: user.role === "admin" ? "Administrator" : "Member",
      icon: Shield,
    },
  ];

  return (
    <div
      className="min-h-screen py-16"
      style={{ background: "var(--background)" }}
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">

        {/* Page header */}
        <header className="mb-12">
          <h1
            className="text-3xl md:text-4xl font-semibold tracking-tight mb-1.5"
            style={{ letterSpacing: "-0.02em", color: "var(--text-primary)" }}
          >
            Profile
          </h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Manage your account and preferences.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

          {/* Left: User details */}
          <div className="space-y-5">

            {/* Identity card */}
            <div className="card-clean p-8">
              <div className="flex items-start gap-5">
                {/* Avatar */}
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center shrink-0 text-white text-xl font-semibold select-none"
                  style={{ background: "var(--rc-accent)" }}
                  aria-hidden="true"
                >
                  {userInitial}
                </div>

                <div className="flex-1 min-w-0">
                  <h2
                    className="text-xl font-semibold tracking-tight truncate capitalize mb-0.5"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {userName}
                  </h2>
                  <p
                    className="text-sm truncate"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {user.email}
                  </p>
                  <span
                    className="inline-block mt-2 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border"
                    style={{
                      background: "var(--rc-accent-subtle)",
                      borderColor: "var(--rc-accent-subtle-border)",
                      color: "var(--rc-accent)",
                    }}
                  >
                    {user.role === "admin" ? "Administrator" : "Member"}
                  </span>
                </div>
              </div>
            </div>

            {/* Account details */}
            <div className="card-clean p-8">
              <h3
                className="text-sm font-semibold mb-6 uppercase tracking-wider"
                style={{ color: "var(--text-tertiary)" }}
              >
                Account details
              </h3>
              <dl className="space-y-5">
                <div className="grid grid-cols-[140px_1fr] gap-4">
                  <dt
                    className="text-sm font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Email
                  </dt>
                  <dd
                    className="text-sm font-mono truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {user.email}
                  </dd>
                </div>
                <div
                  className="border-t"
                  style={{ borderColor: "var(--border)" }}
                />
                <div className="grid grid-cols-[140px_1fr] gap-4">
                  <dt
                    className="text-sm font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    User ID
                  </dt>
                  <dd
                    className="text-sm font-mono text-[12px] truncate"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {user.id}
                  </dd>
                </div>
                <div
                  className="border-t"
                  style={{ borderColor: "var(--border)" }}
                />
                <div className="grid grid-cols-[140px_1fr] gap-4">
                  <dt
                    className="text-sm font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Storage
                  </dt>
                  <dd
                    className="text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Browser localStorage
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right: Stats + sign out */}
          <div className="space-y-5">

            {/* Stats */}
            <StaggerContainer className="space-y-3">
              {stats.map((stat, i) => (
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

            {/* Sign out */}
            <div className="card-clean p-6">
              <p
                className="text-sm mb-4"
                style={{ color: "var(--text-secondary)" }}
              >
                You&apos;re signed in as{" "}
                <strong style={{ color: "var(--text-primary)" }}>
                  {user.email}
                </strong>
                . Report history is stored locally in this browser.
              </p>
              <button
                onClick={logout}
                className="btn-zephyr btn-zephyr-secondary w-full py-2.5 text-sm flex items-center justify-center gap-2"
                aria-label="Sign out of ReportCraft"
              >
                <LogOut size={15} aria-hidden="true" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
