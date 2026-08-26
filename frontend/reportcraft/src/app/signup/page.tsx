"use client";

import { useAuth } from "@/components/AuthProvider";
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

export default function SignupPage() {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (pass !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    if (pass.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsSubmitting(true);
    try {
      await signup(email, pass);
      // On success, AuthProvider handles redirect
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-[88vh] flex items-center justify-center py-16 px-5"
      style={{ background: "var(--background)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-[400px]"
      >
        <div className="card-clean p-8">
          {/* Header */}
          <div className="mb-7">
            <h1
              className="text-2xl font-semibold tracking-tight mb-1.5"
              style={{ letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              Create account
            </h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Start researching any topic in seconds.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div
              role="alert"
              aria-live="assertive"
              className="mb-5 px-4 py-3 rounded-md border text-sm font-medium"
              style={{
                background: "rgba(239,68,68,0.05)",
                borderColor: "rgba(239,68,68,0.2)",
                color: "#dc2626",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="signup-email"
                className="block text-sm font-semibold text-[var(--text-secondary)]"
              >
                Email
              </label>
              <div className="relative">
                <input
                  id="signup-email"
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
              <label
                htmlFor="signup-password"
                className="block text-sm font-semibold text-[var(--text-secondary)]"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPass ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  className="zephyr-input w-full pr-12"
                  style={{ paddingLeft: "44px" }}
                  placeholder="At least 6 characters"
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

            {/* Confirm password */}
            <div className="space-y-2">
              <label
                htmlFor="signup-confirm"
                className="block text-sm font-semibold text-[var(--text-secondary)]"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="signup-confirm"
                  type={showConfirm ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  className="zephyr-input w-full pr-12"
                  style={{ paddingLeft: "44px" }}
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(e) => {
                    setConfirm(e.target.value);
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
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirm ? (
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
              id="signup-submit"
              disabled={isSubmitting}
              className="btn-zephyr btn-zephyr-primary w-full py-3 text-sm flex items-center justify-center gap-2 mt-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                  Creating account…
                </>
              ) : (
                <>Create account</>
              )}
            </button>
          </form>

          <div
            className="mt-6 pt-6 border-t text-center"
            style={{ borderColor: "var(--border)" }}
          >
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold hover:underline"
                style={{ color: "var(--rc-accent)" }}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
