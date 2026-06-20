"use client";

import { useAuth } from "@/components/AuthProvider";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Lock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, pass);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-20 px-8 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        <div className="card-glass p-12 sm:p-16 relative border border-white/10">
          <div className="mb-12">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6">
              <Sparkles size={24} />
            </div>
            <h1 className="text-5xl font-black tracking-tight mb-4">Identity.</h1>
            <p className="text-xl font-medium text-[var(--text-secondary)] opacity-70">Access the deep synthesis engine.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-tertiary)] ml-1">Archive Email</label>
              <div className="relative">
                <input 
                  type="email" 
                  required
                  className="zephyr-input w-full"
                  style={{ paddingLeft: '48px' }}
                  placeholder="name@nexus.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-tertiary)] ml-1">Security Key</label>
              <div className="relative">
                <input 
                  type="password" 
                  required
                  className="zephyr-input w-full"
                  style={{ paddingLeft: '48px' }}
                  placeholder="••••••••"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              </div>
            </div>

            <button type="submit" className="btn-zephyr btn-zephyr-primary w-full py-5 text-xl flex items-center justify-center gap-3 shadow-xl shadow-cyan-500/10">
              Complete Auth <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-12 pt-10 border-t border-white/5 text-center">
            <p className="font-medium text-[var(--text-secondary)] opacity-60">
              New to the nexus? <Link href="/signup" className="text-cyan-400 font-bold hover:underline">Register Identity</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
