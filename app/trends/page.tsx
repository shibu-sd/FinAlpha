import TrendsFeatures from "@/components/features/trends-features";
import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/hero/hero-header";
import HeroSection from "@/components/hero/trends-hero-section";
export default function Trends() {
  return (
    <>
      <HeroHeader />
      <HeroSection />
      <TrendsFeatures />
      <FooterSection />
    </>
  );
}
