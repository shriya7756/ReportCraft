"use client";

import { useAuth } from "@/components/AuthProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Settings, 
  Shield, 
  LogOut, 
  FileText, 
  Zap,
  Cpu,
  Fingerprint
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
     reportsCount: 0,
     activityLevel: "Resonance",
     joinDate: "March 2025"
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
    
    // Calculate stats from localStorage
    const keys = Object.keys(localStorage);
    const count = keys.filter(k => k.startsWith("rc_report_") || k.startsWith("zephyr_report_")).length;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStats(prev => ({ ...prev, reportsCount: count }));
  }, [user, isLoading, router]);

  if (isLoading || !user) return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="h-16 w-16 rounded-2xl border-2 border-cyan-500/20 border-t-cyan-500 animate-spin" />
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-400">Verifying Identity...</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--background)] py-20 px-8 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
           <div className="flex-1 min-w-0">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/10 text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-8"
              >
                <Fingerprint size={12} /> Identity Resonance Active
              </motion.div>
              <h1 className="text-7xl sm:text-8xl font-black tracking-tight leading-[0.9] truncate mb-8">
                <span className="gradient-text">{user.email.split('@')[0]}</span>
              </h1>
              <p className="text-xl font-medium text-[var(--text-secondary)] opacity-60 max-w-2xl leading-relaxed">
                Authorized for deep synthesis and multidimensional inquiry within the ReportCraft nexus since {stats.joinDate}.
              </p>
           </div>
           
           <div className="flex flex-col gap-4 shrink-0">
              <button 
                onClick={() => logout()}
                className="btn-zephyr btn-zephyr-secondary flex items-center justify-center gap-3 py-4 px-8 text-sm group"
              >
                De-authenticate Identity <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
              </button>
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-3 gap-6 mb-24">
           {[
             { label: "Analyses", value: stats.reportsCount, icon: FileText, color: "text-cyan-400" },
             { label: "Nexus Level", value: stats.activityLevel, icon: Zap, color: "text-indigo-400" },
             { label: "Role Status", value: user.role.toUpperCase(), icon: Shield, color: "text-emerald-400" }
           ].map((stat, i) => (
             <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card-glass p-8 group hover:scale-[1.02] transition-all"
             >
                <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 ${stat.color}`}>
                   <stat.icon size={22} />
                </div>
                <h3 className="text-4xl font-black tracking-tight mb-2">{stat.value}</h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-tertiary)] opacity-60">{stat.label}</p>
             </motion.div>
           ))}
        </div>

        {/* Account Details */}
        <div className="grid lg:grid-cols-2 gap-8 pb-32">
           <div className="card-glass p-12 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl -z-10" />
              <h2 className="text-2xl font-bold tracking-tight mb-12 flex items-center gap-3">
                <Cpu size={20} className="text-cyan-400" /> Core Credentials
              </h2>
              <div className="space-y-10">
                 <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-tertiary)] ml-1">Identity Access Point</label>
                    <div className="zephyr-input w-full py-4 text-base bg-white/[0.02] border border-white/5">{user.email}</div>
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-tertiary)] ml-1">Stored Resonance Hash</label>
                    <div className="zephyr-input w-full py-4 bg-white/[0.01] border border-white/5 font-mono text-[9px] opacity-30 uppercase truncate px-4">
                      {btoa(user.email + stats.joinDate).repeat(2)}
                    </div>
                 </div>
              </div>
           </div>

           <div className="card-glass p-12 flex flex-col items-center justify-center text-center border border-white/10 relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 blur-3xl -z-10" />
              <div className="w-16 h-16 rounded-2xl glass mb-8 flex items-center justify-center text-white/20 group-hover:text-indigo-400 transition-colors">
                <Settings size={32} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Core Preferences</h2>
              <p className="text-sm font-medium text-[var(--text-secondary)] opacity-60 mb-10 max-w-xs leading-relaxed">
                System configuration is currently optimized for premium glassmorphism. Modification is restricted at this depth.
              </p>
              <button disabled className="w-full py-4 rounded-xl border border-white/5 bg-white/5 text-white/20 font-bold uppercase text-[10px] tracking-widest cursor-not-allowed">
                Edit Resonance Parameters (Locked)
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
