"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Search,
  FileText,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Settings,
  BookOpen,
  Clock,
  Globe,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Topic", description: "Enter your research topic" },
  { id: 2, title: "Configure", description: "Set research parameters" },
  { id: 3, title: "Generate", description: "AI generates your report" },
];

const researchOptions = {
  depth: ["Overview", "Standard", "Deep Dive"],
  sources: ["Academic", "News", "Web", "All Sources"],
  format: ["Report", "Article", "Whitepaper", "Briefing"],
};

export default function ResearchPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [config, setConfig] = useState({
    depth: "Standard",
    sources: "All Sources",
    format: "Report",
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleNext = () => {
    if (currentStep === 1 && !topic.trim()) {
      toast.error("Please enter a research topic");
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    toast.success("Research started! Generating your report...");

    // Simulate progress
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setIsGenerating(false);
    toast.success("Report generated successfully!");
    router.push("/report/sample-report");
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={false}
                      animate={{
                        backgroundColor:
                          currentStep >= step.id
                            ? "var(--primary-600)"
                            : "var(--neutral-200)",
                        color:
                          currentStep >= step.id
                            ? "white"
                            : "var(--neutral-500)",
                      }}
                      className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors duration-300"
                    >
                      {currentStep > step.id ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        step.id
                      )}
                    </motion.div>
                    <span
                      className={cn(
                        "mt-2 text-sm font-medium",
                        currentStep >= step.id
                          ? "text-[var(--primary-600)]"
                          : "text-[var(--neutral-400)]"
                      )}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-px mx-4 bg-[var(--neutral-200)]">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX: currentStep > step.id ? 1 : 0,
                        }}
                        className="h-full bg-[var(--primary-600)] origin-left"
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white dark:bg-[var(--neutral-800)] rounded-2xl p-8 shadow-lg border border-[var(--border)]"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
                    What would you like to research?
                  </h1>
                  <p className="text-[var(--foreground-secondary)]">
                    Enter any topic and our AI will generate a comprehensive report
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g., The Impact of Artificial Intelligence on Healthcare"
                      className="w-full px-6 py-4 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--neutral-400)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] focus:border-transparent transition-all text-lg"
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--neutral-400)]" />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      "Climate Change",
                      "Blockchain Technology",
                      "Quantum Computing",
                      "Space Exploration",
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setTopic(suggestion)}
                        className="px-4 py-2 rounded-full bg-[var(--neutral-100)] dark:bg-[var(--neutral-700)] text-sm text-[var(--foreground-secondary)] hover:bg-[var(--primary-100)] hover:text-[var(--primary-700)] transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white dark:bg-[var(--neutral-800)] rounded-2xl p-8 shadow-lg border border-[var(--border)]"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
                    Configure Your Research
                  </h1>
                  <p className="text-[var(--foreground-secondary)]">
                    Customize how the AI approaches your topic
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-3">
                      Research Depth
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {researchOptions.depth.map((depth) => (
                        <button
                          key={depth}
                          onClick={() => setConfig({ ...config, depth })}
                          className={cn(
                            "px-4 py-3 rounded-xl border text-sm font-medium transition-all",
                            config.depth === depth
                              ? "border-[var(--primary-500)] bg-[var(--primary-50)] text-[var(--primary-700)]"
                              : "border-[var(--border)] text-[var(--foreground-secondary)] hover:border-[var(--primary-300)]"
                          )}
                        >
                          {depth}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-3">
                      Source Types
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {researchOptions.sources.map((source) => (
                        <button
                          key={source}
                          onClick={() => setConfig({ ...config, sources: source })}
                          className={cn(
                            "px-4 py-3 rounded-xl border text-sm font-medium transition-all",
                            config.sources === source
                              ? "border-[var(--primary-500)] bg-[var(--primary-50)] text-[var(--primary-700)]"
                              : "border-[var(--border)] text-[var(--foreground-secondary)] hover:border-[var(--primary-300)]"
                          )}
                        >
                          {source}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-3">
                      Output Format
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {researchOptions.format.map((format) => (
                        <button
                          key={format}
                          onClick={() => setConfig({ ...config, format })}
                          className={cn(
                            "px-4 py-3 rounded-xl border text-sm font-medium transition-all",
                            config.format === format
                              ? "border-[var(--primary-500)] bg-[var(--primary-50)] text-[var(--primary-700)]"
                              : "border-[var(--border)] text-[var(--foreground-secondary)] hover:border-[var(--primary-300)]"
                          )}
                        >
                          {format}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white dark:bg-[var(--neutral-800)] rounded-2xl p-8 shadow-lg border border-[var(--border)]"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
                    Ready to Generate
                  </h1>
                  <p className="text-[var(--foreground-secondary)]">
                    Review your settings and start the research process
                  </p>
                </div>

                <div className="bg-[var(--neutral-50)] dark:bg-[var(--neutral-900)] rounded-xl p-6 mb-6">
                  <h3 className="font-semibold text-[var(--foreground)] mb-4">
                    Research Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[var(--foreground-secondary)]">Topic</span>
                      <span className="font-medium text-[var(--foreground)]">{topic}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--foreground-secondary)]">Depth</span>
                      <span className="font-medium text-[var(--foreground)]">{config.depth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--foreground-secondary)]">Sources</span>
                      <span className="font-medium text-[var(--foreground)]">{config.sources}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--foreground-secondary)]">Format</span>
                      <span className="font-medium text-[var(--foreground)]">{config.format}</span>
                    </div>
                  </div>
                </div>

                {isGenerating && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[var(--foreground)]">
                        Generating report...
                      </span>
                      <span className="text-sm text-[var(--foreground-secondary)]">
                        {progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-[var(--neutral-200)] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient rounded-full"
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[var(--foreground-secondary)]">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Analyzing sources and generating insights...</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
                currentStep === 1
                  ? "opacity-0 pointer-events-none"
                  : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--neutral-100)]"
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient text-white font-medium shadow-lg shadow-[var(--primary-500)]/25 hover:shadow-xl hover:shadow-[var(--primary-500)]/30 transition-all duration-300"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient text-white font-medium shadow-lg shadow-[var(--primary-500)]/25 hover:shadow-xl hover:shadow-[var(--primary-500)]/30 transition-all duration-300 disabled:opacity-70"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Report
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
