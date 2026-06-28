"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Download,
  Share2,
  Printer,
  Bookmark,
  CheckCircle2,
  Clock,
  FileText,
  ExternalLink,
  ChevronRight,
  User,
  Calendar,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

const sampleReport = {
  title: "The Impact of Artificial Intelligence on Healthcare",
  author: "IReportCraft AI",
  date: "March 17, 2026",
  readTime: "12 min read",
  sections: [
    {
      id: "executive-summary",
      title: "Executive Summary",
      content: `
        Artificial Intelligence (AI) is revolutionizing healthcare delivery across the globe. This comprehensive report examines the current state of AI in healthcare, analyzing its impact on diagnostics, treatment planning, patient care, and operational efficiency. Our research indicates that AI-powered solutions have the potential to reduce diagnostic errors by up to 85% while significantly improving patient outcomes.

        Key findings include:
        • AI diagnostic tools show 95% accuracy in detecting early-stage cancers
        • Operational costs reduced by 30-40% in hospitals implementing AI systems
        • Patient satisfaction scores increased by 25% with AI-assisted care
        • Drug discovery timelines shortened from 10-15 years to 2-5 years
      `,
    },
    {
      id: "introduction",
      title: "Introduction",
      content: `
        The healthcare industry stands at the precipice of a technological revolution. Artificial Intelligence, once confined to research laboratories, has emerged as a transformative force in clinical settings worldwide. From early disease detection to personalized treatment protocols, AI technologies are redefining what's possible in medical care.

        This report synthesizes data from over 500 peer-reviewed studies, industry reports, and expert interviews to provide a comprehensive overview of AI's impact on healthcare. We examine both the promises and challenges of integrating AI into medical practice, offering insights for healthcare professionals, policymakers, and technology developers.
      `,
    },
    {
      id: "diagnostics",
      title: "AI in Medical Diagnostics",
      content: `
        Medical diagnostics has been one of the earliest and most successful applications of AI in healthcare. Machine learning algorithms, particularly deep learning models, have demonstrated remarkable capabilities in analyzing medical images, detecting patterns invisible to the human eye, and providing diagnostic support to clinicians.

        Radiology and Imaging
        AI systems have achieved human-level or superior performance in interpreting medical images. Google's DeepMind developed an AI system that can detect over 50 eye diseases with 94% accuracy, matching world-leading experts. Similarly, AI algorithms for mammography screening have reduced false positives by 5.7% and false negatives by 9.4%.

        Pathology
        Digital pathology combined with AI is transforming tissue analysis. AI systems can now identify cancerous cells in histopathological images with greater speed and consistency than human pathologists. This technology is particularly valuable in regions with a shortage of specialized pathologists.

        Early Disease Detection
        AI algorithms analyzing electronic health records can identify patients at risk of developing serious conditions before symptoms appear. For example, AI systems can predict sepsis up to 6 hours before clinical manifestation, enabling timely intervention.
      `,
    },
    {
      id: "treatment",
      title: "Treatment and Personalized Medicine",
      content: `
        Beyond diagnostics, AI is revolutionizing treatment planning and delivery. Personalized medicine, once a theoretical concept, is becoming reality through AI's ability to analyze vast datasets and identify optimal treatment protocols for individual patients.

        Drug Discovery and Development
        AI is dramatically accelerating the drug discovery process. Machine learning algorithms can predict molecular behavior, identify promising drug candidates, and optimize clinical trial design. Insilico Medicine used AI to identify a novel drug candidate for fibrosis in just 46 days, compared to the typical 2-3 years.

        Treatment Optimization
        AI systems analyze patient data to recommend optimal treatment plans, considering factors such as genetic profile, medical history, and lifestyle. IBM Watson for Oncology provides evidence-based treatment recommendations to oncologists worldwide.

        Surgical Robotics
        AI-powered surgical robots are enabling unprecedented precision in complex procedures. The da Vinci Surgical System, enhanced with AI capabilities, has been used in over 8.5 million procedures worldwide, reducing complications and recovery times.
      `,
    },
    {
      id: "operational",
      title: "Operational Efficiency",
      content: `
        Healthcare operations present significant opportunities for AI optimization. From scheduling to supply chain management, AI is helping healthcare organizations deliver better care more efficiently.

        Predictive Analytics
        AI systems can predict patient volume, enabling better staff scheduling and resource allocation. Hospitals using predictive analytics have reduced emergency department wait times by 15-30%.

        Administrative Automation
        Natural Language Processing (NLP) is automating administrative tasks such as clinical documentation, coding, and billing. This automation allows healthcare professionals to spend more time with patients and less time on paperwork.

        Supply Chain Optimization
        AI algorithms optimize inventory management, predicting supply needs and reducing waste. During the COVID-19 pandemic, AI systems helped hospitals manage critical supply shortages by predicting demand patterns.
      `,
    },
    {
      id: "challenges",
      title: "Challenges and Considerations",
      content: `
        Despite its promise, AI integration in healthcare faces significant challenges that must be addressed for widespread adoption.

        Data Privacy and Security
        Healthcare data is among the most sensitive personal information. AI systems require large datasets for training, raising concerns about patient privacy. Strict compliance with regulations like HIPAA and GDPR is essential.

        Algorithmic Bias
        AI systems can perpetuate or amplify existing biases if training data is not representative. Studies have shown that some AI diagnostic tools perform differently across racial and ethnic groups, potentially exacerbating healthcare disparities.

        Regulatory Framework
        The regulatory landscape for AI in healthcare is still evolving. Organizations like the FDA are developing new frameworks for evaluating AI medical devices, balancing innovation with patient safety.

        Clinical Integration
        Integrating AI tools into existing clinical workflows presents technical and cultural challenges. Healthcare professionals require training to effectively use AI tools, and systems must be designed to complement rather than complicate clinical practice.
      `,
    },
    {
      id: "conclusion",
      title: "Conclusion and Future Outlook",
      content: `
        Artificial Intelligence is fundamentally transforming healthcare, offering unprecedented opportunities to improve patient outcomes, reduce costs, and enhance operational efficiency. The evidence presented in this report demonstrates that AI is not merely a futuristic concept but a present reality delivering tangible benefits across the healthcare ecosystem.

        Looking ahead, several trends will shape AI's continued evolution in healthcare:

        1. Multimodal AI systems that integrate diverse data types (imaging, genomics, clinical notes) for comprehensive patient assessment.

        2. Federated learning approaches that enable AI model training across institutions while preserving data privacy.

        3. Edge computing solutions that bring AI capabilities directly to medical devices and point-of-care settings.

        4. Explainable AI that provides clinicians with clear rationales for AI-generated recommendations.

        5. AI-powered virtual health assistants that provide continuous patient monitoring and support.

        As we move forward, successful AI implementation will require collaboration between technologists, clinicians, policymakers, and patients. With appropriate safeguards, ethical frameworks, and continuous evaluation, AI will continue to fulfill its promise of transforming healthcare for the better.

        The future of healthcare is intelligent, personalized, and powered by AI.
      `,
    },
  ],
  sources: [
    { title: "Topol, E. J. (2019). Deep Medicine: How AI Will Make Healthcare Human Again", url: "#" },
    { title: "Nature Medicine: International evaluation of an AI system for breast cancer screening", url: "#" },
    { title: "The Lancet Digital Health: AI for health—state of the art, challenges, and opportunities", url: "#" },
    { title: "FDA: Artificial Intelligence/Machine Learning-Based Medical Devices", url: "#" },
    { title: "Health Affairs: The Impact Of Artificial Intelligence On Medical Costs", url: "#" },
    { title: "NEJM Catalyst: AI in Health Care — The Hope, the Hype, and the Reality", url: "#" },
  ],
};

export default function ReportPage() {
  const params = useParams();
  const [activeSection, setActiveSection] = React.useState("executive-summary");
  const [bookmarked, setBookmarked] = React.useState(false);

  // Track scroll position for table of contents
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = sampleReport.sections.map((s) =>
        document.getElementById(s.id)
      );

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sampleReport.sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navigation />
      <main className="pt-20">
        {/* Report Header */}
        <div className="bg-[var(--background-secondary)] border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-2 mb-4">
              <Link
                href="/research"
                className="flex items-center gap-1 text-sm text-[var(--foreground-secondary)] hover:text-[var(--primary-600)] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Research
              </Link>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
                  {sampleReport.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--foreground-secondary)]">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {sampleReport.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {sampleReport.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {sampleReport.readTime}
                  </div>
                  <div className="flex items-center gap-1 text-[var(--success-600)]">
                    <CheckCircle2 className="w-4 h-4" />
                    Verified Sources
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={cn(
                    "p-2 rounded-lg border transition-all",
                    bookmarked
                      ? "border-[var(--primary-500)] bg-[var(--primary-50)] text-[var(--primary-600)]"
                      : "border-[var(--border)] text-[var(--foreground-secondary)] hover:border-[var(--primary-300)]"
                  )}
                  aria-label="Bookmark report"
                >
                  <Bookmark className={cn("w-5 h-5", bookmarked && "fill-current")} />
                </button>
                <button
                  onClick={handlePrint}
                  className="p-2 rounded-lg border border-[var(--border)] text-[var(--foreground-secondary)] hover:border-[var(--primary-300)] transition-all"
                  aria-label="Print report"
                >
                  <Printer className="w-5 h-5" />
                </button>
                <button
                  className="p-2 rounded-lg border border-[var(--border)] text-[var(--foreground-secondary)] hover:border-[var(--primary-300)] transition-all"
                  aria-label="Share report"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient text-white font-medium hover:shadow-lg transition-all">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Table of Contents - Sticky Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h3 className="font-semibold text-[var(--foreground)] mb-4">
                  Table of Contents
                </h3>
                <nav className="space-y-1">
                  {sampleReport.sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={cn(
                        "block px-3 py-2 rounded-lg text-sm transition-colors",
                        activeSection === section.id
                          ? "bg-[var(--primary-50)] text-[var(--primary-700)] font-medium"
                          : "text-[var(--foreground-secondary)] hover:bg-[var(--neutral-100)] hover:text-[var(--foreground)]"
                      )}
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>

                <div className="mt-8 pt-8 border-t border-[var(--border)]">
                  <h3 className="font-semibold text-[var(--foreground)] mb-4">
                    Sources ({sampleReport.sources.length})
                  </h3>
                  <div className="space-y-2">
                    {sampleReport.sources.map((source, index) => (
                      <a
                        key={index}
                        href={source.url}
                        className="block text-xs text-[var(--foreground-secondary)] hover:text-[var(--primary-600)] transition-colors"
                      >
                        [{index + 1}] {source.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <article className="flex-1 max-w-3xl">
              {sampleReport.sections.map((section, index) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                    {section.title}
                  </h2>
                  <div className="prose prose-lg max-w-none text-[var(--foreground)]">
                    {section.content.split("\n\n").map((paragraph, pIndex) => (
                      <p key={pIndex} className="mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.section>
              ))}

              {/* Sources Section */}
              <section className="mt-16 pt-8 border-t border-[var(--border)]">
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                  References
                </h2>
                <ol className="space-y-3">
                  {sampleReport.sources.map((source, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-sm text-[var(--foreground-secondary)]"
                    >
                      <span className="font-medium text-[var(--foreground)]">
                        [{index + 1}]
                      </span>
                      <a
                        href={source.url}
                        className="hover:text-[var(--primary-600)] transition-colors flex items-center gap-1"
                      >
                        {source.title}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                  ))}
                </ol>
              </section>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
