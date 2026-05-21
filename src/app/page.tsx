import HeroSection from "@/components/sections/HeroSection";
import AgitationSection from "@/components/sections/AgitationSection";
import TransformationSection from "@/components/sections/TransformationSection";
import StatsSection from "@/components/sections/StatsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import VideoSection from "@/components/sections/VideoSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactFormSection from "@/components/sections/ContactFormSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AgitationSection />
      <TransformationSection />
      <StatsSection />
      <ProcessSection />
      <PortfolioSection />
      <VideoSection />
      <TestimonialsSection />
      <ContactFormSection />
    </main>
  );
}
