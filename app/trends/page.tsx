import TrendsFeatures from "@/components/features/trends-features";
import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/hero/hero-header";
import HeroSection from "@/components/hero/trends-hero-section";
import StripWidget from "@/components/widgets/strip";

export default function Trends() {
  return (
    <>
      <StripWidget />
      <div className="pt-[50px]">
        <HeroHeader />
        <HeroSection />
        <TrendsFeatures />
        <FooterSection />
      </div>
    </>
  );
}
