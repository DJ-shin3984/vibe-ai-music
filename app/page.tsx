import { Hero } from "@/components/Hero";
import { LandingMusicSection } from "@/components/LandingMusicSection";
import { FeatureSection } from "@/components/FeatureSection";
import { PricingSection } from "@/components/PricingSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-0 flex-1 flex-col w-full bg-black">
      <Hero
        title="Vibe AI Music"
        subtitle="AI와 함께 만드는 당신만의 음악"
        ctaLabel="시작하기"
        ctaHref="/auth"
      />
      <LandingMusicSection />
      <FeatureSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}