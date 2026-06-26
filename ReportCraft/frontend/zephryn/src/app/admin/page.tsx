"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  Users, 
  FileText, 
  Activity, 
  ShieldCheck, 
  ArrowLeft,
  Search,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { StaggerContainer, StaggerItem, FadeInSection } from "@/components/UIComponents";

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [logs, setLogs] = useState([
    { id: 1, user: "shriya@example.com", action: "Generated Report", target: "Quantum Computing", time: "2 mins ago" },
    { id: 2, user: "john@doe.com", action: "Uploaded Paper", target: "neural_net.pdf", time: "15 mins ago" },
    { id: 3, user: "sarah@tech.io", action: "Asked Question", target: "What is ROI of AI?", time: "1 hour ago" },
    { id: 4, user: "admin@ReportCraft.com", action: "Login", target: "System", time: "2 hours ago" },
  ]);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "admin") return null;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="mx-auto max-w-7xl px-8 py-16">
        <header className="mb-16 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase">Admin <span className="text-[#B3F53C]" style={{ WebkitTextStroke: "2px black" }}>Command.</span></h1>
            <p className="mt-4 text-xl font-bold text-gray-500">System-wide transparency and control.</p>
          </div>
          <Link href="/dashboard" className="flex items-center gap-2 font-black uppercase hover:underline">
            <ArrowLeft size={20} /> Dashboard
          </Link>
        </header>

        <StaggerContainer className="grid gap-8 grid-cols-1 md:grid-cols-3 mb-16">
          {[
            { label: "Active Users", value: "1,284", icon: Users, color: "#B3F53C" },
            { label: "Total Reports", value: "8,432", icon: FileText, color: "#FFFFFF" },
            { label: "System Health", value: "99.9%", icon: ShieldCheck, color: "#B3F53C" },
          ].map((stat, i) => (
            <StaggerItem key={i}>
              <div className="bg-white border-8 border-black p-8 shadow-[12px_12px_0_0_black]">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 border-4 border-black" style={{ background: stat.color }}>
                    <stat.icon size={24} />
                  </div>
                  <span className="text-4xl font-black">{stat.value}</span>
                </div>
                <h3 className="text-xl font-black uppercase tracking-widest">{stat.label}</h3>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="grid lg:grid-cols-2 gap-16">
          <FadeInSection>
            <div className="bg-black text-white p-12 border-8 border-black shadow-[16px_16px_0_0_#B3F53C]">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                <Activity className="text-[#B3F53C]" /> Live Activity
              </h2>
              <div className="space-y-6">
                {logs.map((log) => (
                  <div key={log.id} className="border-b-2 border-white/20 pb-4 last:border-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-black text-[#B3F53C]">{log.user}</span>
                      <span className="text-xs font-bold text-white/40">{log.time}</span>
                    </div>
                    <p className="text-sm font-bold">
                      {log.action}: <span className="italic text-white/80">{log.target}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>

          <FadeInSection>
            <div className="bg-white p-12 border-8 border-black shadow-[16px_16px_0_0_black]">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                <ShieldCheck /> Security Status
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border-4 border-black bg-[#B3F53C]/10">
                  <CheckCircle className="text-emerald-500" />
                  <span className="font-black">All AI agents operational</span>
                </div>
                <div className="flex items-center gap-4 p-4 border-4 border-black bg-[#B3F53C]/10">
                  <CheckCircle className="text-emerald-500" />
                  <span className="font-black">Database synchronized</span>
                </div>
                <div className="flex items-center gap-4 p-4 border-4 border-black bg-amber-50">
                  <AlertCircle className="text-amber-500" />
                  <span className="font-black text-amber-900">3 flagged research attempts (Rate Limit)</span>
                </div>
              </div>
              <button className="mt-8 w-full bg-black text-white p-4 font-black uppercase tracking-widest hover:bg-[#B3F53C] hover:text-black transition-colors border-4 border-black">
                Generate System Audit
              </button>
            </div>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
}
