"use client";

import { useAuth } from "@/components/AuthProvider";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(email, pass);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-[88vh] flex items-center justify-center py-16 px-5"
      style={{ background: "var(--sys-grouped-background)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-[400px]"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo size={30} />
        </div>

        {/* Liquid Glass card */}
        <div className="glass-card p-8">
          {/* Header */}
          <div className="mb-7">
            <h1
              className="type-title2 mb-1.5"
              style={{ color: "var(--text-primary)" }}
            >
              Sign in
            </h1>
            <p className="type-callout" style={{ color: "var(--text-secondary)" }}>
              Welcome back. Sign in to access your reports.
            </p>
          </div>

          {/* Error — systemRed semantic token */}
          {error && (
            <div
              role="alert"
              aria-live="assertive"
              className="mb-5 px-4 py-3 rounded-xl border type-callout font-medium"
              style={{
                background: "var(--sys-red-subtle)",
                borderColor: "var(--sys-red-subtle-border)",
                color: "var(--sys-red)",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                className="block type-subhead font-medium mb-1.5"
                style={{ color: "var(--text-secondary)" }}
              >
                Email
              </label>
              <div className="relative">
                <input
                  id="login-email"
                  type="email"
                  required
                  autoComplete="email"
                  className="zephyr-input w-full"
                  style={{ paddingLeft: "44px" }}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  aria-describedby={error ? "login-error" : undefined}
                />
                {/* Icon sits within 44pt input */}
                <Mail
                  className="absolute left-3.5 top-1/2 -translate-y-1/2"
                  size={16}
                  style={{ color: "var(--text-tertiary)" }}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="login-password"
                  className="block type-subhead font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Password
                </label>
                <Link
                  href="/help"
                  className="type-footnote font-medium hover:underline"
                  style={{ color: "var(--sys-blue)" }}
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPass ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  className="zephyr-input w-full pr-12"
                  style={{ paddingLeft: "44px" }}
                  placeholder="••••••••"
                  value={pass}
                  onChange={(e) => {
                    setPass(e.target.value);
                    setError(null);
                  }}
                />
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2"
                  size={16}
                  style={{ color: "var(--text-tertiary)" }}
                  aria-hidden="true"
                />
                {/* 44pt eye toggle */}
                <button
                  type="button"
                  className="absolute right-0 top-0 bottom-0 w-[44px] flex items-center justify-center transition-colors rounded-r-[10px]"
                  style={{ color: "var(--text-tertiary)" }}
                  onClick={() => setShowPass(!showPass)}
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? (
                    <EyeOff size={16} aria-hidden="true" />
                  ) : (
                    <Eye size={16} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit — pill, 44pt, systemBlue */}
            <button
              type="submit"
              id="login-submit"
              disabled={isSubmitting}
              className="btn-zephyr btn-zephyr-primary w-full type-headline flex items-center justify-center gap-2 mt-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={16} aria-hidden="true" />
                </>
              )}
            </button>
          </form>

          <div
            className="mt-6 pt-6 border-t text-center"
            style={{ borderColor: "var(--border)" }}
          >
            <p className="type-callout" style={{ color: "var(--text-secondary)" }}>
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold hover:underline"
                style={{ color: "var(--sys-blue)" }}
              >
                Create account
              </Link>
            </p>
          </div>
        </div>

        {/* Continue without account */}
        <p className="text-center mt-5 type-callout" style={{ color: "var(--text-tertiary)" }}>
          No account needed for your first report.{" "}
          <Link
            href="/research"
            className="font-medium hover:underline"
            style={{ color: "var(--text-secondary)" }}
          >
            Try ReportCraft →
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
