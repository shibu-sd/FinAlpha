import { ContainerTextFlip } from "../ui/container-text-flip";

export default function HeroSection() {
    return (
        <section className="relative pt-16 pb-6 md:pt-32 md:pb-16 overflow-hidden">
            {/* Subtle Top Glow */}
            <div aria-hidden className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 dark:bg-primary/15 blur-[100px] rounded-full pointer-events-none" />
            <div className="@container mx-auto max-w-5xl px-6 relative z-10">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-bold tracking-tight lg:text-[3.5rem] flex justify-center items-center gap-3 flex-wrap leading-tight">
                        <span>Stay in sync with</span>
                        <ContainerTextFlip
                            words={["market indices", "sector trends", "macro health", "fund flows", "economic data"]}
                            textClassName="text-4xl lg:text-[3.5rem] font-bold text-primary drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                        />
                    </h2>
                    <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
                        Track the macro environment. Understand broad sector shifts and benchmark indices before making critical Mutual Fund allocations.
                    </p>
                </div>
            </div>
        </section>
    );
}
