import Features from "@/components/features";
import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/hero/hero-header";
import HeroSection from "@/components/hero/home-hero-section";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <>
      <HeroHeader />
      <HeroSection />
      <Features />
      <Testimonials />
      <FooterSection />
    </>
  );
}
