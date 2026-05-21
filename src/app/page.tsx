import HeroSection from "@/components/sections/HeroSection";
import AgitationSection from "@/components/sections/AgitationSection";
import TransformationSection from "@/components/sections/TransformationSection";
import ProcessSection from "@/components/sections/ProcessSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import VideoSection from "@/components/sections/VideoSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AgitationSection />
      <TransformationSection />
      <ProcessSection />
      <PortfolioSection />
      <VideoSection />
      {/* Unit 5: ContactFormSection — id="formularz" */}
    </main>
  );
}
