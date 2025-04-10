import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/hero/hero-header";
import HeroSection from "@/components/hero/trends-hero-section";
import HeatmapWidget from "@/components/widgets/heatmap";
import NewsWidget from "@/components/widgets/news";
import ScreenerWidget from "@/components/widgets/screener";
import StripWidget from "@/components/widgets/strip";

export default function Home() {
  return (
    <>
      <StripWidget />
      <div className="pt-[50px]">
        <HeroHeader />
        <HeroSection />

        <div className="mb-12">
          <NewsWidget />
        </div>

        <hr></hr>

        <div className="mt-12 mb-12">
          <HeatmapWidget />
        </div>

        <hr></hr>

        <div className="mt-12">
          <ScreenerWidget />
        </div>

        <FooterSection />
      </div>
    </>
  );
}
