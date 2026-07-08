import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import InteractiveDemo from "@/components/InteractiveDemo";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import YarnThread from "@/components/YarnThread";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-[#A24B3C]/15 selection:text-[#8C3E30] relative">
      {/* Navigation */}
      <Navbar />

      {/* Dynamic scroll-linked yarn thread flowing behind content */}
      <YarnThread />

      {/* Main Content Sections */}
      <main className="flex-grow relative z-20">
        <Hero />
        <Features />
        <InteractiveDemo />
        <CTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
