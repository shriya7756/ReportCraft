"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  Target,
  Users,
  Zap,
  Globe,
  Award,
  BookOpen,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Link from "next/link";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We constantly push the boundaries of what's possible with AI-powered research technology.",
  },
  {
    icon: Target,
    title: "Accuracy",
    description:
      "Every insight we generate is backed by rigorous verification and credible sources.",
  },
  {
    icon: Users,
    title: "Accessibility",
    description:
      "We believe powerful research tools should be accessible to everyone, everywhere.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description:
      "Our platform serves researchers across 50+ countries, breaking down knowledge barriers.",
  },
];

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "2M+", label: "Reports Generated" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9/5", label: "User Rating" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-50)] via-white to-[var(--accent-50)] dark:from-[var(--primary-950)] dark:via-[var(--neutral-900)] dark:to-[var(--accent-950)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--primary-50)_1px,transparent_1px),linear-gradient(to_bottom,var(--primary-50)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-[var(--neutral-800)]/80 shadow-md border border-[var(--border)] mb-8">
                <BookOpen className="w-4 h-4 text-[var(--primary-500)]" />
                <span className="text-sm font-medium text-[var(--foreground-secondary)]">
                  About IReportCraft
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--foreground)] mb-6">
                Empowering Research
                <span className="text-gradient"> Everywhere</span>
              </h1>

              <p className="max-w-3xl mx-auto text-xl text-[var(--foreground-secondary)] leading-relaxed">
                IReportCraft is a next-generation AI-powered research intelligence platform
                that transforms how individuals and organizations discover, analyze, and
                synthesize information. We believe everyone deserves access to professional-grade
                research capabilities.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-y border-[var(--border)] bg-[var(--background)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[var(--foreground-secondary)]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-[var(--foreground-secondary)] mb-6 leading-relaxed">
                  To democratize access to high-quality research and intelligence. We believe
                  that knowledge is power, and everyone should have the tools to discover
                  insights that matter.
                </p>
                <p className="text-lg text-[var(--foreground-secondary)] mb-6 leading-relaxed">
                  By combining cutting-edge AI technology with rigorous academic standards,
                  we are building a platform that makes professional-grade research
                  accessible to students, academics, business professionals, and curious
                  minds alike.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/research"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient text-white font-semibold shadow-lg shadow-[var(--primary-500)]/25 hover:shadow-xl transition-all"
                  >
                    Start Researching
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-[var(--primary-500)]/20 to-[var(--accent-500)]/20 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <BrainCircuit className="w-24 h-24 text-[var(--primary-600)] mx-auto mb-4" />
                    <p className="text-2xl font-bold text-[var(--foreground)]">
                      Intelligence
                    </p>
                    <p className="text-lg text-[var(--foreground-secondary)]">
                      Powered by AI
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-[var(--background-secondary)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
                Our Core Values
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-[var(--foreground-secondary)]">
                The principles that guide everything we do at IReportCraft
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="p-6 rounded-2xl bg-white dark:bg-[var(--neutral-800)] border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-[var(--foreground-secondary)]">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 md:order-1"
              >
                <div className="aspect-video rounded-3xl bg-gradient-to-br from-[var(--accent-500)]/20 to-[var(--primary-500)]/20 p-8 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/80 dark:bg-[var(--neutral-800)]/80 shadow-md">
                      <Zap className="w-8 h-8 text-[var(--accent-500)] mb-2" />
                      <p className="font-semibold text-[var(--foreground)]">Fast</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/80 dark:bg-[var(--neutral-800)]/80 shadow-md">
                      <Award className="w-8 h-8 text-[var(--primary-500)] mb-2" />
                      <p className="font-semibold text-[var(--foreground)]">Accurate</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/80 dark:bg-[var(--neutral-800)]/80 shadow-md">
                      <Globe className="w-8 h-8 text-[var(--success-500)] mb-2" />
                      <p className="font-semibold text-[var(--foreground)]">Global</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/80 dark:bg-[var(--neutral-800)]/80 shadow-md">
                      <BrainCircuit className="w-8 h-8 text-[var(--accent-600)] mb-2" />
                      <p className="font-semibold text-[var(--foreground)]">Smart</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 md:order-2"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-6">
                  Cutting-Edge Technology
                </h2>
                <p className="text-lg text-[var(--foreground-secondary)] mb-6 leading-relaxed">
                  Our platform leverages the latest advances in artificial intelligence,
                  natural language processing, and machine learning to deliver
                  unprecedented research capabilities.
                </p>
                <ul className="space-y-4">
                  {[
                    "Advanced language models trained on millions of academic sources",
                    "Real-time information retrieval from trusted databases",
                    "Intelligent summarization and synthesis algorithms",
                    "Citation verification and fact-checking systems",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-[var(--foreground-secondary)]"
                    >
                      <div className="w-6 h-6 rounded-full bg-[var(--primary-100)] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-[var(--primary-600)]" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-[var(--primary-900)] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Research?
            </h2>
            <p className="text-xl text-[var(--primary-200)] mb-8">
              Join thousands of researchers who are already using IReportCraft to
              discover insights faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/research"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-[var(--primary-900)] font-semibold hover:bg-[var(--primary-50)] transition-colors"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/help"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
