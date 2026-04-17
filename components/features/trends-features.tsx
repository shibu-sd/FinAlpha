import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronRight, Newspaper, Grid, Filter, Calendar } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

export default function TrendsFeatures() {
    return (
        <section>
            <div className="mx-auto max-w-5xl px-6 ">
                <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-2">
                    <TrendCard
                        title="Top Market Stories"
                        description="Get the latest market news, expert analysis, and breaking financial stories all in one place."
                        link='/trends/top-market-stories'>
                        <Newspaper />
                    </TrendCard>

                    <TrendCard
                        title="Stock Heatmap"
                        description="Visualize market performance at a glance with our intuitive stock sector heatmap."
                        link='/trends/stock-heatmap'>
                        <Grid />
                    </TrendCard>

                    <TrendCard
                        title="Stock Screener"
                        description="Filter stocks based on custom parameters to find opportunities that match your investment strategy."
                        link='/trends/stock-screener'>
                        <Filter />
                    </TrendCard>

                    <TrendCard
                        title="Economic Calendar"
                        description="Track upcoming economic events, earnings releases, and market-moving announcements."
                        link='/trends/economic-calendar'>
                        <Calendar />
                    </TrendCard>
                </div>
            </div>
        </section>
    )
}

const TrendCard = ({
    title,
    description,
    children,
    link = '#',
}: {
    title: string
    description: string
    children: React.ReactNode
    link?: string
}) => {
    return (
        <Card className="group overflow-hidden rounded-2xl md:rounded-3xl border border-border/40 bg-zinc-50/50 dark:bg-zinc-900/30 p-1 md:p-2 transition-all duration-500 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/60 backdrop-blur-md shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-black/40">
            <div className="relative flex flex-col justify-between h-full rounded-xl md:rounded-2xl bg-white/60 dark:bg-zinc-950/40 p-6 border border-border/30 transition-colors">
                <div>
                    <div className="w-fit rounded-xl border border-border/60 bg-white dark:bg-white/5 p-3 shadow-xs transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
                        <div className="*:size-6 text-foreground/80 group-hover:text-primary transition-colors">
                            {children}
                        </div>
                    </div>

                    <div className="space-y-2 py-6">
                        <h3 className="text-lg font-semibold transition-colors duration-300">
                            {title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-2 text-sm">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="flex pt-4 mt-auto">
                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="p-0 gap-1 hover:bg-transparent text-primary hover:text-primary/80 transition-all duration-300 group-hover:translate-x-1">
                        <Link href={link} className="font-medium font-sans">
                            Explore
                            <ChevronRight className="ml-0 !size-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    </Button>
                </div>
            </div>
        </Card>
    )
}
