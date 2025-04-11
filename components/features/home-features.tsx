import { TrendingUp, Wrench, Bot, Quote, NotebookPen} from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function Features() {
    return (
        <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Crafted for Confident Decisions</h2>
                    <p className="mt-4">Explore everything you need to stay ahead in the market with confidence.</p>
                </div>
                <div className="mx-auto mt-8 md:mt-16">
                    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
                        <GridItem
                            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                            icon={<TrendingUp className="h-4 w-4 text-black dark:text-neutral-400" />}
                            title="Market Insights"
                            description="Stay updated with live stock prices, daily market stories, stock heatmaps, and a dynamic economic calendar."
                        />

                        <GridItem
                            area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
                            icon={<Wrench className="h-4 w-4 text-black dark:text-neutral-400" />}
                            title="Smart Tools"
                            description="From SIP to ROI, access a suite of powerful financial calculators designed to simplify planning and boost precision."
                        />

                        <GridItem
                            area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
                            icon={<Bot className="h-4 w-4 text-black dark:text-neutral-400" />}
                            title="Alpha"
                            description="An AI-powered assistant designed to simplify finance — ask anything, anytime, and get instant, insightful responses."
                        />

                        <GridItem
                            area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
                            icon={<Quote className="h-4 w-4 text-black dark:text-neutral-400" />}
                            title="Expert Blogs"
                            description="Stay informed with deep dives, expert opinions, and simplified breakdowns of complex financial concepts."
                        />

                        <GridItem
                            area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
                            icon={<NotebookPen className="h-4 w-4 text-black dark:text-neutral-400" />}
                            title="Interactive Quizzes"
                            description="Learn by doing — test your financial IQ with fun, bite-sized quizzes designed to educate and engage."
                        />
                    </ul>
                </div>
            </div>
        </section>
    );
}

interface GridItemProps {
    area: string;
    icon: React.ReactNode;
    title: string;
    description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
    return (
        <li className={`min-h-[14rem] list-none ${area}`}>
            <div className="relative h-full rounded-2.5xl border p-2 md:rounded-3xl md:p-3">
                <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
                    <div className="relative flex flex-1 flex-col justify-between gap-3">
                        <div className="w-fit rounded-lg border border-gray-600 p-2">
                            {icon}
                        </div>
                        <div className="space-y-3">
                            <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                                {title}
                            </h3>
                            <h2 className="font-sans text-sm/[1.125rem] md:text-base/[1.375rem] text-black dark:text-neutral-400">
                                {description}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};