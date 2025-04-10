import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/hero/hero-header";
import HeroSection from "@/components/hero/trends-hero-section";
import NewsWidget from "@/components/widgets/news";
import StripWidget from "@/components/widgets/strip";

export default function Home() {
  return (
    <>
      <StripWidget />
      <div className="pt-[50px]">
        <HeroHeader />
        <HeroSection />
        <NewsWidget />
        <FooterSection />
      </div>
    </>
  );
}
