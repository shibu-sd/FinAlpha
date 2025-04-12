import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import { CalculatorIcon, PieChart, Shield, IndianRupeeIcon, TrendingUp } from 'lucide-react'

export default function Features() {
    return (
        <section>
            <div className="py-32">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="text-center">
                        <h2 className="text-balance text-3xl font-semibold md:text-4xl">Integrate with your favorite tools</h2>
                        <p className="text-muted-foreground mt-6">Connect seamlessly with popular platforms and services to enhance your workflow.</p>
                    </div>

                    <div className="mt-12 grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">

                        <IntegrationCard
                            title="Mutual Fund Investment Calculator"
                            description="Plan your SIPs or lump-sum investments and estimate future returns with ease."
                            link='/'>
                            <PieChart />
                        </IntegrationCard>

                        <IntegrationCard
                            title="EMI Calculator"
                            description="Break down your loan payments and know your monthly commitments upfront."
                            link='/'>
                            <CalculatorIcon />
                        </IntegrationCard>

                        <IntegrationCard
                            title="Insurance Calculator"
                            description="Assess the right coverage for you and estimate premium costs effortlessly."
                            link='/'>
                            <Shield />
                        </IntegrationCard>

                        <IntegrationCard
                            title="NPV Calculator"
                            description="Calculate the Net Present Value of future cash flows to evaluate the profitability."
                            link='/'>
                            <IndianRupeeIcon />
                        </IntegrationCard>

                        <IntegrationCard
                            title="ROI Calculator"
                            description="Find Return on Investment to understand how your capital is generating returns."
                            link='/'>
                            <TrendingUp />
                        </IntegrationCard>

                    </div>
                </div>
            </div>
        </section>
    )
}

const IntegrationCard = ({ title, description, children, link = 'https://github.com/shibu-sd' }: { title: string; description: string; children: React.ReactNode; link?: string }) => {
    return (
        <Card className="p-6">
            <div className="relative">
                <div className="*:size-10">{children}</div>

                <div className="space-y-2 py-6">
                    <h3 className="text-base font-medium">{title}</h3>
                    <p className="text-muted-foreground line-clamp-2 text-sm">{description}</p>
                </div>

                <div className="flex gap-3 border-t border-dashed pt-6">
                    <Button
                        asChild
                        variant="secondary"
                        size="sm"
                        className="gap-1 pr-2 shadow-none">
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
