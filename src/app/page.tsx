import HeroSection from "@/components/sections/HeroSection";
import AgitationSection from "@/components/sections/AgitationSection";
import TransformationSection from "@/components/sections/TransformationSection";
import ProcessSection from "@/components/sections/ProcessSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import PricingSection from "@/components/sections/PricingSection";
import LeadMagnetSection from "@/components/sections/LeadMagnetSection";
import GoogleReviewsSection from "@/components/sections/GoogleReviewsSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactFormSection from "@/components/sections/ContactFormSection";
import StickyHeader from "@/components/ui/StickyHeader";
import Footer from "@/components/ui/Footer";
import ExitIntentModal from "@/components/ui/ExitIntentModal";
import LeadChatbot from "@/components/ui/LeadChatbot";

export default function Home() {
  return (
    <>
      <StickyHeader />
      <main>
        <HeroSection />
        <AgitationSection />
        <TransformationSection />
        <ProcessSection />
        <PortfolioSection />
        <PricingSection />
        <LeadMagnetSection />
        <GoogleReviewsSection />
        <FaqSection />
        <ContactFormSection />
      </main>
      <Footer />
      <ExitIntentModal />
      <LeadChatbot />
    </>
  );
}
