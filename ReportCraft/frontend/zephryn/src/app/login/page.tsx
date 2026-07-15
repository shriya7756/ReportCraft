"use client";

import { useAuth } from "@/components/AuthProvider";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

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
      // On success, AuthProvider handles redirect
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-20 px-6 md:px-8 relative overflow-hidden">
      {/* Ambient background */}
            
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative"
      >
        <div className="card-clean p-10 sm:p-12 border border-white/10">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-black tracking-tight mb-2">Sign in</h1>
            <p className="text-[var(--text-secondary)]">
              Welcome back. Sign in to access your reports.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div
              role="alert"
              aria-live="assertive"
              className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400 font-medium"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="login-email"
                className="block text-sm font-semibold text-[var(--text-secondary)]"
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
                <Mail
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
                  size={17}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="login-password"
                  className="block text-sm font-semibold text-[var(--text-secondary)]"
                >
                  Password
                </label>
                <a
                  href="/help"
                  className="text-xs text-[var(--rc-accent)] hover:underline font-medium"
                >
                  Forgot password?
                </a>
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
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
                  size={17}
                  aria-hidden="true"
                />
                <button
                  type="button"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                  onClick={() => setShowPass(!showPass)}
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? (
                    <EyeOff size={17} aria-hidden="true" />
                  ) : (
                    <Eye size={17} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="login-submit"
              disabled={isSubmitting}
              className="btn-zephyr btn-zephyr-primary w-full py-4 text-base flex items-center justify-center gap-2.5 mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={18} aria-hidden="true" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-sm text-[var(--text-secondary)]">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-[var(--rc-accent)] font-semibold hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
