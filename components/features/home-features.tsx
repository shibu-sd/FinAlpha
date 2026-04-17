import { Target, Leaf, Scale, Calculator, SearchCheck, ArrowUpRight, Check, Sparkles, TrendingUp } from "lucide-react";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Features() {
    return (
        <section className="bg-background py-24 md:py-32 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-border to-transparent opacity-50" />
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute right-0 top-[20%] w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
            
            <div className="mx-auto max-w-[85rem] px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="max-w-3xl">
                        <h2 className="text-balance text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                            A structured path to <span className="italic font-serif text-amber-500 drop-shadow-sm">wealth.</span>
                        </h2>
                        <p className="text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed">
                            Investing isn&apos;t about chasing the next hot tip. It&apos;s about setting clear goals and staying disciplined. Here&apos;s how we help you build a robust mutual fund portfolio.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[25rem] gap-6 lg:gap-8">
                    
                    {/* Bento 1: Large Wide Card (Goal Based Planning) */}
                    <div className="md:col-span-12 lg:col-span-8 group relative overflow-hidden rounded-[2.5rem] border border-border/50 bg-card hover:bg-card/80 transition-all duration-500 shadow-xl shadow-black/5">
                        <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent z-0 pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col md:flex-row h-full">
                            {/* Text Area */}
                            <div className="p-8 md:p-10 flex flex-col justify-between w-full md:w-1/2 z-20">
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-background border border-border shadow-xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                            <Target className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="px-3 py-1 text-[10px] sm:text-xs font-bold tracking-widest uppercase bg-primary/10 text-primary rounded-full">Core Strategy</div>
                                    </div>
                                    <h3 className="text-3xl font-bold tracking-tight text-foreground mb-4">Goal-Based Planning</h3>
                                    <p className="text-muted-foreground leading-relaxed text-base">
                                        Whether you&apos;re saving for a child&apos;s education, a dream home, or an early retirement, we align your mutual fund selection with your specific timeline and risk profile.
                                    </p>
                                </div>
                            </div>
                            
                            {/* Mock UI Area */}
                            <div className="relative w-full md:w-1/2 h-full min-h-[300px] flex items-end justify-end">
                                <div className="absolute right-0 bottom-0 md:-right-4 md:-bottom-4 w-[90%] md:w-[110%] h-[85%] bg-background/90 backdrop-blur-xl border border-border rounded-tl-[2rem] shadow-2xl p-6 md:p-8 flex flex-col gap-6 group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-700 ease-out z-10">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <span className="text-sm font-bold text-foreground">Retirement Corpus</span>
                                                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">Aggressive • Equity</div>
                                            </div>
                                            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-sm">20 Years</span>
                                        </div>
                                        <div className="w-full h-4 bg-muted rounded-full overflow-hidden shadow-inner">
                                            <div className="h-full bg-linear-to-r from-primary/60 to-primary w-[40%] rounded-full shadow-[0_0_10px_var(--color-primary)]/50 relative overflow-hidden">
                                                <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <span className="text-sm font-bold text-foreground">House Downpayment</span>
                                                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">Balanced • Debt/Hybrid</div>
                                            </div>
                                            <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-sm">5 Years</span>
                                        </div>
                                        <div className="w-full h-4 bg-muted rounded-full overflow-hidden shadow-inner">
                                            <div className="h-full bg-linear-to-r from-amber-500/80 to-amber-500 w-[75%] rounded-full shadow-[0_0_10px_#f59e0b]/50 relative overflow-hidden">
                                                <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2.5s_infinite]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bento 2: Vertical Card (SIP Consistency) */}
                    <div className="md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-[2.5rem] border border-border/50 bg-card hover:bg-card/80 transition-all duration-500 flex flex-col justify-between p-8 md:p-10 shadow-xl shadow-black/5">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-secondary)_0%,transparent_50%)] opacity-5 z-0 pointer-events-none" />
                        
                        <div className="relative z-10">
                            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-background border border-border shadow-xs group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 mb-6">
                                <Calculator className="w-6 h-6 text-amber-500" />
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">The SIP Advantage</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Automate investments. Benefit from Rupee Cost Averaging without trying to time volatile markets.
                            </p>
                        </div>

                        <div className="relative z-10 w-full mt-8">
                            <div className="bg-background rounded-2xl border border-border p-4 shadow-lg group-hover:-translate-y-1 transition-transform duration-500 relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Auto-Pay Success</span>
                                    <span className="text-[10px] font-semibold bg-muted px-2 py-0.5 rounded-sm">Today, 9:00 AM</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                                        <Check className="w-5 h-5 text-emerald-500" />
                                    </div>
                                    <div>
                                        <span className="font-bold text-lg text-foreground block leading-tight">₹25,000</span>
                                        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Invested successfully</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bento 3: Square (Curation & Tracking) */}
                    <div className="md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-[2.5rem] border border-border/50 bg-card hover:bg-card/80 transition-all duration-500 p-8 md:p-10 flex flex-col shadow-xl shadow-black/5">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,theme(colors.primary.DEFAULT/0.15)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform duration-300 mb-6">
                                <SearchCheck className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">Expert Curation</h3>
                            <p className="text-muted-foreground leading-relaxed flex-1">
                                With over 2500+ mutual funds in India, choosing the right active or passive fund is overwhelming. We curate funds backed by deep research to weed out underperformers.
                            </p>
                        </div>
                    </div>

                    {/* Bento 4: Square (Tax Efficiency & Rebalancing) */}
                    <div className="md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-[2.5rem] border border-border/50 bg-card hover:bg-card/80 transition-all duration-500 p-8 md:p-10 flex flex-col shadow-xl shadow-black/5">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,theme(colors.purple.500/0.1)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20 group-hover:scale-110 transition-transform duration-300 mb-6">
                                <Scale className="w-6 h-6 text-purple-500" />
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">Portfolio Tracking</h3>
                            <p className="text-muted-foreground leading-relaxed flex-1">
                                Portfolios naturally drift over time. We assist in periodic rebalancing across equities, debt, and hybrid asset classes to strictly maintain your ideal risk profile.
                            </p>
                        </div>
                    </div>

                    {/* Bento 5: CTA (Tax Saving ELSS) */}
                    <div className="md:col-span-12 lg:col-span-4 group relative overflow-hidden rounded-[2.5rem] border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all duration-500 p-8 flex flex-col items-center justify-center text-center shadow-xl shadow-primary/5">
                        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzb1zcvla/image/upload/v1714555023/grid-bg_yexvdf.svg')] opacity-[0.03] dark:opacity-10 pointer-events-none mix-blend-overlay"></div>
                        <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-transparent pointer-events-none"></div>
                        
                        <div className="relative z-10">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_var(--color-primary)]/40 text-primary-foreground">
                                <Leaf className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">Save Tax Efficiently</h3>
                            <p className="text-muted-foreground leading-relaxed mb-8 max-w-sm mx-auto font-medium">
                                Save up to ₹46,800 annually under Section 80C by investing in Equity Linked Savings Schemes (ELSS).
                            </p>
                            <Button asChild size="lg" className="rounded-full font-bold group-hover:scale-105 transition-transform bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                                <Link href="/invest">
                                    Start ELSS SIP <ArrowUpRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}