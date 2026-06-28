"use client";

import { motion } from "framer-motion";
import {
  Brain,
  FileText,
  Clock,
  Shield,
  Zap,
  Search,
  BarChart3,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Our advanced AI understands context and nuance to generate insights that go beyond surface-level research.",
    gradient: "from-[var(--primary-500)] to-[var(--primary-600)]",
  },
  {
    icon: Globe,
    title: "Multi-Source Intelligence",
    description:
      "Aggregates data from academic journals, news sources, databases, and the web to provide comprehensive coverage.",
    gradient: "from-[var(--accent-500)] to-[var(--accent-600)]",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Complete research tasks in minutes that used to take hours. Get instant citations and verified facts.",
    gradient: "from-[var(--success-500)] to-[var(--success-600)]",
  },
  {
    icon: Shield,
    title: "Verified Sources",
    description:
      "Every claim is backed by credible sources. Automatic fact-checking and source verification included.",
    gradient: "from-[var(--primary-600)] to-[var(--accent-600)]",
  },
  {
    icon: FileText,
    title: "Professional Reports",
    description:
      "Generate publication-ready reports with proper formatting, citations, and professional writing quality.",
    gradient: "from-[var(--accent-600)] to-[var(--primary-600)]",
  },
  {
    icon: BarChart3,
    title: "Visual Analytics",
    description:
      "Transform complex data into beautiful charts and visualizations that make insights immediately clear.",
    gradient: "from-[var(--primary-400)] to-[var(--accent-400)]",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function Features() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--background)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--primary-50)_1px,transparent_1px),linear-gradient(to_bottom,var(--primary-50)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
            Everything You Need for
            <span className="text-gradient"> Premium Research</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-[var(--foreground-secondary)]">
            Powerful features designed to transform your research workflow
            and deliver professional-grade results.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative p-6 rounded-2xl bg-white dark:bg-[var(--neutral-800)] border border-[var(--border)] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                {feature.title}
              </h3>
              <p className="text-[var(--foreground-secondary)]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
