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
    link = 'https://github.com/shibu-sd',
}: {
    title: string
    description: string
    children: React.ReactNode
    link?: string
}) => {
    return (
        <Card className="group p-6 transform transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl hover:bg-muted/40">
            <div className="relative">
                <div className="*:size-10 transition-transform duration-300 group-hover:scale-105">
                    {children}
                </div>

                <div className="space-y-2 py-6">
                    <h3 className="text-base font-medium transition-colors duration-300 group-hover:text-primary">
                        {title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 text-sm">
                        {description}
                    </p>
                </div>

                <div className="flex gap-3 border-t border-dashed pt-6">
                    <Button
                        asChild
                        variant="secondary"
                        size="sm"
                        className="gap-1 pr-2 shadow-none transition-all duration-300 group-hover:translate-x-1">
                        <Link href={link}>
                            Explore
                            <ChevronRight className="ml-0 !size-3.5 opacity-50" />
                        </Link>
                    </Button>
                </div>
            </div>
        </Card>
    )
}
