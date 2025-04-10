import { ContainerTextFlip } from "../ui/container-text-flip";

export default function HeroSection() {
    return (
        <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl flex justify-center items-center gap-3 flex-wrap">
                        <span>Stay in sync with</span>
                        <ContainerTextFlip
                            words={["live stock prices", "market stories", "stock heatmap", "stock screener", "economic calendar"]}
                            textClassName="text-4xl lg:text-5xl"
                        />
                    </h2>
                    <p className="mt-4">
                        Get a real-time pulse on the market with FinAlpha's all-in-one trends dashboard.
                    </p>
                </div>
            </div>
        </section>
    );
}
