"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "IReportCraft has completely transformed how we approach market research. What used to take our team weeks now happens in hours.",
    author: "Sarah Chen",
    role: "Director of Research, TechCorp",
    rating: 5,
  },
  {
    quote:
      "The quality of reports generated is exceptional. It's like having a team of research analysts available 24/7.",
    author: "Marcus Johnson",
    role: "Strategy Consultant",
    rating: 5,
  },
  {
    quote:
      "As an academic researcher, the source verification feature gives me confidence in every citation. This is the future of research.",
    author: "Dr. Emily Rodriguez",
    role: "Associate Professor, MIT",
    rating: 5,
  },
  {
    quote:
      "We've reduced our research costs by 70% while improving output quality. IReportCraft is an indispensable tool for our agency.",
    author: "James Wilson",
    role: "CEO, Insight Analytics",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden bg-[var(--background-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
            Trusted by Researchers
            <span className="text-gradient"> Worldwide</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-[var(--foreground-secondary)]">
            See what industry professionals and academics are saying about IReportCraft.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative p-8 rounded-2xl bg-white dark:bg-[var(--neutral-800)] border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[var(--primary-200)] dark:text-[var(--primary-800)]" />

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[var(--accent-400)] text-[var(--accent-400)]"
                  />
                ))}
              </div>

              <p className="text-lg text-[var(--foreground)] mb-6 italic">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient flex items-center justify-center text-white font-semibold">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-[var(--foreground)]">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-[var(--foreground-secondary)]">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
