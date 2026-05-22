import HeroSection from "@/components/sections/HeroSection";
import AgitationSection from "@/components/sections/AgitationSection";
import TransformationSection from "@/components/sections/TransformationSection";
import StatsSection from "@/components/sections/StatsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import PortfolioCTASection from "@/components/sections/PortfolioCTASection";
import VideoSection from "@/components/sections/VideoSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactFormSection from "@/components/sections/ContactFormSection";
import StickyHeader from "@/components/ui/StickyHeader";

export default function Home() {
  return (
    <main>
      <StickyHeader />
      <HeroSection />
      <AgitationSection />
      <TransformationSection />
      <StatsSection />
      <ProcessSection />
      <PortfolioSection />
      <PortfolioCTASection />
      <VideoSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactFormSection />
    </main>
  );
}
