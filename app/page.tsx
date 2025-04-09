import Features from "@/components/features";
import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/hero-header";
import HeroSection from "@/components/hero-section";
import Testimonials from "@/components/testimonials";
import Image from "next/image";

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
