import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import { CalculatorIcon, PieChart, Shield, IndianRupeeIcon, TrendingUp, Wrench, BarChart, Scale, LineChart, Calculator } from 'lucide-react'

export default function Features() {
    return (
        <section>
            <div className="py-32">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="text-center">
                        <h2 className="text-balance text-3xl font-semibold md:text-4xl">Tools That Work as Hard as You Do</h2>
                        <p className="text-muted-foreground mt-6">Unlock calculators and utilities tailored to support your financial goals - fast, accurate, and built right in.</p>
                    </div>

                    <div className="mt-16">
                        <div className="flex items-center mb-6 gap-2">
                            <CalculatorIcon className="size-6" />
                            <h3 className="text-2xl font-medium">Calculators</h3>
                        </div>
                        <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
                            <IntegrationCard
                                title="Mutual Fund Investment Calculator"
                                description="Plan your SIPs or lump-sum investments and estimate future returns with ease."
                                link='/tools/mutual-fund-investment-calculator'>
                                <PieChart />
                            </IntegrationCard>

                            <IntegrationCard
                                title="EMI Calculator"
                                description="Break down your loan payments and know your monthly commitments upfront."
                                link='/tools/emi-calculator'>
                                <BarChart />
                            </IntegrationCard>

                            <IntegrationCard
                                title="Insurance Calculator"
                                description="Assess the right coverage for you and estimate premium costs effortlessly."
                                link='/tools/insurance-calculator'>
                                <Shield />
                            </IntegrationCard>

                            <IntegrationCard
                                title="NPV Calculator"
                                description="Calculate the Net Present Value of future cash flows to evaluate the profitability."
                                link='/tools/npv-calculator'>
                                <IndianRupeeIcon />
                            </IntegrationCard>

                            <IntegrationCard
                                title="ROI Calculator"
                                description="Find Return on Investment to understand how your capital is generating returns."
                                link='/tools/roi-calculator'>
                                <TrendingUp />
                            </IntegrationCard>
                        </div>

                        <div className="flex items-center mb-6 gap-2">
                            <Wrench className="size-6" />
                            <h3 className="text-2xl font-medium">Other Tools</h3>
                        </div>
                        <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                            <IntegrationCard
                                title="Compare Mutual Funds"
                                description="Compare mutual fund trends to find the best-performing ones."
                                link='/tools/compare-mutual-funds'>
                                <Scale />
                            </IntegrationCard>

                            <IntegrationCard
                                title="Point-to-Point Returns"
                                description="Get precise mutual fund returns over a fixed time span."
                                link='/tools/point-to-point-returns'>
                                <LineChart />
                            </IntegrationCard>

                            <IntegrationCard
                                title="SWP Basket Backtest"
                                description="Simulate systematic withdrawals from multiple funds to plan your retirement income strategy."
                                link='/tools/swp-basket-backtest'>
                                <Calculator />
                            </IntegrationCard>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const IntegrationCard = ({ title, description, children, link = 'https://github.com/shibu-sd' }: {
    title: string; description: string; children: React.ReactNode; link?: string
}) => {
    return (
        <Card className="group p-6 transform transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl hover:bg-muted/40">
            <div className="relative">
                <div className="*:size-10 transition-transform duration-300 group-hover:scale-110">
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