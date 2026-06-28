import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Testimonials } from "@/components/sections/testimonials";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navigation />
      <main>
        <Hero />
        <section id="features">
          <Features />
        </section>
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
