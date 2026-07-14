"use client";

import { useAuth } from "@/components/AuthProvider";
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, UserPlus, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function SignupPage() {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(pass !== confirm) {
      toast.error("Match error: Passwords do not align.");
      return;
    }
    signup(email, pass);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-20 px-8 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        <div className="card-glass p-12 sm:p-16 relative border border-white/10">
          <div className="mb-12 text-center">
            <div className="inline-flex w-14 h-14 rounded-2xl bg-indigo-500/10 items-center justify-center text-indigo-400 mb-8">
              <UserPlus size={28} />
            </div>
            <h1 className="text-5xl font-black tracking-tight mb-4">New Entity.</h1>
            <p className="text-xl font-medium text-[var(--text-secondary)] opacity-60">Register your identity for deep synthesis access.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-tertiary)] ml-1">Archive Email</label>
              <div className="relative">
                <input 
                  type="email" 
                  required
                  className="zephyr-input w-full"
                  style={{ paddingLeft: '48px' }}
                  placeholder="name@archive.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-tertiary)] ml-1">Security Key</label>
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
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-tertiary)] ml-1">Verify Key</label>
                <div className="relative">
                  <input 
                    type="password" 
                    required
                    className="zephyr-input w-full"
                    style={{ paddingLeft: '48px' }}
                    placeholder="••••••••"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-zephyr btn-zephyr-primary w-full py-5 text-xl flex items-center justify-center gap-3 shadow-xl shadow-cyan-500/10">
              Instantiate Identity <Sparkles size={22} className="group-hover:rotate-12 transition-transform" />
            </button>
          </form>

          <div className="mt-12 pt-10 border-t border-white/5 text-center">
            <p className="font-medium text-[var(--text-secondary)] opacity-60">
              Already indexed? <Link href="/login" className="text-indigo-400 font-bold hover:underline">Verify Identity</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
