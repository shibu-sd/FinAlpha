import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/hero/hero-header";
import EconomicCalendar from "@/components/widgets/economic-calendar";
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
                                Economic Calendar
                            </h3>
                            <p className="text-muted-foreground mt-6">Stay updated on economic events and market-moving announcements with this Economic Calendar.</p>
                        </div>
                        <EconomicCalendar />
                    </div>
                </div>
                <FooterSection />
            </div>
        </>
    );
}
