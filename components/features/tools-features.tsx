'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowUpRight, CalculatorIcon, PieChart, Shield, IndianRupeeIcon, TrendingUp, Wrench, BarChart, Scale, LineChart, Calculator, Star } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

export default function Features() {
    return (
        <section className="bg-background min-h-[90vh] py-24 relative overflow-hidden">
            {/* Ambient Lighting */}
            <div aria-hidden className="absolute inset-0 -z-10 flex justify-center overflow-hidden pointer-events-none">
                <div className="absolute top-[0%] right-[10%] w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[500px] bg-secondary/5 blur-[150px] rounded-full mix-blend-screen" />
            </div>

            <div className="mx-auto max-w-[85rem] px-6 lg:px-8 relative z-10 pt-10">
                {/* Page Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-6">
                        <Wrench className="w-4 h-4" />
                        FinAlpha Utility Suite
                    </div>
                    <h2 className="text-balance text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        Calculators built for <span className="italic font-serif text-amber-500 drop-shadow-sm">serious</span> investors.
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Don't guess your financial future. Use our custom-built intelligence tools to calculate SIP compounding, simulate SWP drawdowns, and plan your wealth effectively.
                    </p>
                </div>

                {/* THE HERO SUITE: Core Investor Tools */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Star className="w-6 h-6 text-amber-500 fill-amber-500/20" />
                        <h3 className="text-2xl font-bold text-foreground tracking-tight">The Core Utility Suite</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {/* Major Card 1: SIP/MF Calculator */}
                        <div className="group relative overflow-hidden rounded-[2.5rem] border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all duration-500 p-8 md:p-10 flex flex-col shadow-xl shadow-primary/5">
                            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent z-0 pointer-events-none" />
                            <div className="relative z-10 flex-1">
                                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300 mb-8">
                                    <PieChart className="w-8 h-8 text-primary-foreground" />
                                </div>
                                <h3 className="text-3xl font-bold tracking-tight text-foreground mb-4">Mutual Fund Growth Evaluator</h3>
                                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                                    Plan your monthly SIPs or lumpsum deployments. Visualize exact long-term compounding curves to see when you hit your retirement corpus.
                                </p>
                            </div>
                            <Button asChild size="lg" className="w-fit rounded-full font-bold group-hover:scale-105 transition-transform bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                                <Link href="/tools/mutual-fund-investment-calculator">
                                    Open Calculator <ArrowUpRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                        </div>

                        {/* Major Card 2: SWP Backtest */}
                        <div className="group relative overflow-hidden rounded-[2.5rem] border border-border/50 bg-card hover:bg-card/80 transition-all duration-500 p-8 md:p-10 flex flex-col shadow-xl shadow-black/5">
                            <div className="absolute inset-0 bg-linear-to-tl from-amber-500/5 to-transparent z-0 pointer-events-none" />
                            <div className="relative z-10 flex-1">
                                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-background border border-border/50 shadow-xs group-hover:scale-110 transition-transform duration-300 mb-8">
                                    <Calculator className="w-8 h-8 text-amber-500" />
                                </div>
                                <h3 className="text-3xl font-bold tracking-tight text-foreground mb-4">SWP Basket Backtest</h3>
                                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                                    Retiring soon? Simulate systematic monthly withdrawals from a diversified mutual fund portfolio to ensure your corpus outlives you.
                                </p>
                            </div>
                            <Button asChild variant="outline" size="lg" className="w-fit rounded-full font-bold transition-all border-border/60 hover:bg-amber-500/10 hover:text-amber-500 hover:border-amber-500/30">
                                <Link href="/tools/swp-basket-backtest">
                                    Run SWP Simulation <ArrowUpRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* SECONDARY UTILITIES: The Standard Grid */}
                <div className="mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <CalculatorIcon className="w-6 h-6 text-muted-foreground" />
                        <h3 className="text-2xl font-bold text-foreground tracking-tight">Financial Utilities</h3>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <UtilityCard
                            title="Compare Mutual Funds"
                            description="Stack up active vs passive funds side-by-side to easily compare their historical performance."
                            link='/tools/compare-mutual-funds'>
                            <Scale />
                        </UtilityCard>

                        <UtilityCard
                            title="Point-to-Point Returns"
                            description="Calculate precise historical returns for any mutual fund over specific custom time frames."
                            link='/tools/point-to-point-returns'>
                            <LineChart />
                        </UtilityCard>

                        <UtilityCard
                            title="EMI Calculator"
                            description="Break down home loans and auto loans. See exactly how much interest you bleed to the bank."
                            link='/tools/emi-calculator'>
                            <BarChart />
                        </UtilityCard>

                        <UtilityCard
                            title="Insurance Cover Check"
                            description="Verify if your term insurance plan provides adequate financial cover for your family's needs."
                            link='/tools/insurance-calculator'>
                            <Shield />
                        </UtilityCard>

                        <UtilityCard
                            title="NPV Calculator"
                            description="Calculate the Net Present Value of future cash flows to evaluate long-term investments."
                            link='/tools/npv-calculator'>
                            <IndianRupeeIcon />
                        </UtilityCard>

                        <UtilityCard
                            title="ROI Calculator"
                            description="Calculate your exact Return on Investment to see if a particular asset class is truly profitable."
                            link='/tools/roi-calculator'>
                            <TrendingUp />
                        </UtilityCard>
                    </div>
                </div>
            </div>
        </section>
    )
}

const UtilityCard = ({ title, description, children, link = '#' }: {
    title: string; description: string; children: React.ReactNode; link?: string
}) => {
    return (
        <Card className="group p-8 rounded-[1.5rem] border-border/40 bg-background/50 hover:bg-card transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 relative overflow-hidden">
             <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-muted/50 border border-border/50 text-foreground transition-transform duration-300 group-hover:scale-110 mb-5">
                    <div className="w-6 h-6">{children}</div>
                </div>

                <div className="flex-1 space-y-2 mb-6">
                    <h3 className="text-lg font-bold tracking-tight transition-colors duration-300 group-hover:text-primary">
                        {title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {description}
                    </p>
                </div>

                <Button
                    asChild
                    className="w-fit rounded-full font-bold transition-all duration-300 bg-background/80 border border-border/80 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary mt-auto relative z-20 shadow-xs group-hover:shadow-md">
                    <Link href={link}>
                        <span>Use Tool</span>
                        <ArrowUpRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                </Button>
            </div>
        </Card>
    )
}