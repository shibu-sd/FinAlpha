import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/hero/hero-header";
import ScreenerWidget from "@/components/widgets/screener";
import StripWidget from "@/components/widgets/strip";

export default function Trends() {
    return (
        <>
            <StripWidget />
            <div className="pt-[50px]">
                <HeroHeader />
                <div className="relative py-16 md:py-32 bg-background">
                    <div className="mx-auto max-w-5xl">
                        <div className="mx-auto max-w-3xl text-center mb-16">
                            <h3 className="text-balance text-3xl md:text-4xl lg:text-5xl">
                                Stock Screener
                            </h3>
                            <p className="text-muted-foreground mt-6">Filter and discover stocks that match your investment strategy with this powerful Stock Screener.</p>
                        </div>
                        <ScreenerWidget />
                    </div>
                </div>
                <FooterSection />
            </div>
        </>
    );
}
