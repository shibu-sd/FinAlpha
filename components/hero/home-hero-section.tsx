'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { ShieldCheck, TrendingUp, HandCoins, MessageCircle, BarChart3, LineChart, PieChart } from 'lucide-react'
import { motion } from 'framer-motion'

const transitionVariants = {
    item: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.3, duration: 1.5 } },
    },
}

const INVEST_GOALS = [
    { id: 'retirement', label: 'Retirement', icon: '🏖️', years: 25, rate: 13 },
    { id: 'child', label: 'Education', icon: '🎓', years: 15, rate: 12 },
    { id: 'house', label: 'House', icon: '🏡', years: 5, rate: 9 },
];

// Utility to format Indian Currency easily
const formatCurrency = (num: number) => {
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)} L`;
    return `₹${num.toLocaleString('en-IN')}`;
}

export default function HeroSection() {
    // Interactive Math State
    const [monthlySip, setMonthlySip] = useState<number>(20000);
    const [activeGoalId, setActiveGoalId] = useState('retirement');
    const activeGoal = useMemo(() => INVEST_GOALS.find(g => g.id === activeGoalId) || INVEST_GOALS[0], [activeGoalId]);

    // Calculate SIP math
    const { futureValue, invested, wealthGained, curves } = useMemo(() => {
        const months = activeGoal.years * 12;
        const monthlyRate = (activeGoal.rate / 12) / 100;
        
        const fv = monthlySip * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)) * (1 + monthlyRate);
        const totalInvested = monthlySip * months;
        const gained = fv - totalInvested;

        // Calculate curves for 7 bars to make the chart look dynamic based on SIP size
        // We use slightly randomized height scalars for visual flair, mapped to the true math curve
        const step = months / 7;
        const barData = Array.from({ length: 7 }).map((_, i) => {
            const m = Math.floor((i + 1) * step);
            const currentFv = monthlySip * (((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate)) * (1 + monthlyRate);
            const currentInv = monthlySip * m;
            // Return % of total max FV
            return {
                height: (currentFv / fv) * 100, 
                investedRatio: (currentInv / currentFv) * 100
            }
        });

        return { futureValue: fv, invested: totalInvested, wealthGained: gained, curves: barData };
    }, [monthlySip, activeGoal]);

    return (
        <main className="overflow-hidden relative bg-background min-h-[90vh] flex items-center pt-24 pb-12 lg:pt-0">
            {/* Elegant Premium Glows */}
            <div aria-hidden className="absolute inset-0 -z-10 flex justify-center overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-secondary/10 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-10%] left-[20%] w-[1000px] h-[400px] bg-emerald-500/5 blur-[150px] rounded-full mix-blend-screen" />
            </div>

            <section className="w-full relative z-10">
                <div className="mx-auto max-w-[90rem] px-6 lg:px-12 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center mt-8 lg:mt-20">
                        
                        {/* Left Content Area (6 cols) */}
                        <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left z-20">
                            
                            <div className="mb-6 inline-flex items-center justify-center lg:justify-start gap-2 text-xs md:text-sm font-semibold text-primary/90 dark:text-primary backdrop-blur-md bg-primary/10 px-5 py-2.5 rounded-full border border-primary/30 w-fit mx-auto lg:mx-0 shadow-[0_0_20px_var(--color-primary)]/10">
                                <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />
                                <span>AMFI Registered Mutual Fund Distributor</span>
                            </div>

                            <h1 className="text-balance text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight leading-[1.15] mb-6">
                                <TextEffect
                                    preset="blur"
                                    speedSegment={0.3}
                                    as="span"
                                    className="block text-foreground pb-2"
                                >
                                    Your financial edge
                                </TextEffect>
                                <span className="block mt-2 flex items-center justify-center lg:justify-start flex-wrap gap-2 md:gap-3">
                                    <TextEffect
                                        preset="blur"
                                        speedSegment={0.3}
                                        delay={0.2}
                                        as="span"
                                    >
                                        begins with
                                    </TextEffect>
                                    <span className="font-sans font-extrabold tracking-tight bg-white/5 dark:bg-white/5 bg-black/5 px-2 md:px-3 rounded-xl border border-black/10 dark:border-white/10 shadow-xl shrink-0">
                                        <span className="text-zinc-900 dark:text-white drop-shadow-sm">Fin</span>
                                        <span className="text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.2)]">Alpha</span>
                                    </span>
                                </span>
                            </h1>

                            <div className="mt-4 md:mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                <div className="text-amber-500/90 font-bold block mb-3 text-xl md:text-2xl drop-shadow-sm">Disciplined wealth for the Indian Investor.</div>
                                <TextEffect
                                    per="line"
                                    preset="fade-in-blur"
                                    speedSegment={0.3}
                                    delay={0.5}
                                    as="p"
                                >   
                                    Escape the noise of daily trading. Build lifelong wealth through structured SIPs, goal-based planning, and expert mutual fund curation.
                                </TextEffect>
                            </div>

                            <AnimatedGroup
                                variants={{
                                    container: {
                                        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } },
                                    },
                                    ...transitionVariants,
                                }}
                                className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                <div key={1} className="relative group w-full sm:w-auto">
                                    <div className="absolute -inset-0.5 bg-linear-to-r from-emerald-500 to-emerald-400 rounded-full blur opacity-40 group-hover:opacity-80 transition duration-500"></div>
                                    <Button
                                        asChild
                                        size="lg"
                                        className="relative w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 py-7 text-lg font-bold shadow-2xl transition-all hover:scale-[1.03] border border-primary/20">
                                        <Link href="/invest">
                                            <span className="text-nowrap tracking-wide">Start Your SIP Journey</span>
                                        </Link>
                                    </Button>
                                </div>
                                <div key={2} className="w-full sm:w-[260px] z-10 flex flex-col items-center relative group mt-3 sm:mt-0">
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-background border border-emerald-500/30 rounded-full z-20 shadow-[0_0_15px_#10b98115]">
                                        <span className="text-[9px] uppercase font-bold text-emerald-500/90 tracking-widest whitespace-nowrap">Free Portfolio Health-Check</span>
                                    </div>
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="lg"
                                        className="w-full bg-card hover:bg-emerald-500/10 backdrop-blur-md rounded-full px-10 py-7 text-lg font-bold shadow-lg hover:shadow-[0_0_20px_#10b98120] transition-all border-border hover:border-emerald-500/30 text-foreground relative z-10">
                                        <Link href="https://wa.me/919560264980?text=Hi%20Ankit%2C%20I%20want%20to%20learn%20about%20investing%20through%20FinAlpha" target="_blank" rel="noopener noreferrer">
                                            <MessageCircle className="mr-2 w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform" />
                                            <span className="text-nowrap tracking-wide">Speak to Me</span>
                                        </Link>
                                    </Button>
                                </div>
                            </AnimatedGroup>
                            
                            {/* Trust badges */}
                            <AnimatedGroup
                                variants={{
                                    container: { visible: { transition: { staggerChildren: 0.1, delayChildren: 1.2 } } },
                                    ...transitionVariants,
                                }}
                                className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row flex-wrap justify-center lg:justify-start gap-y-6 gap-x-4 xl:gap-x-6 opacity-90">
                                <div className="flex items-center gap-3 group">
                                    <div className="w-11 h-11 xl:w-12 xl:h-12 rounded-full border border-border bg-card flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform shrink-0">
                                        <HandCoins className="w-5 h-5 xl:w-6 xl:h-6 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-[14px] xl:text-[15px] font-bold tracking-tight text-foreground whitespace-nowrap">Skin in the Game</div>
                                        <div className="text-[12px] xl:text-[13px] font-medium text-muted-foreground mt-0.5 whitespace-nowrap">We invest where you do</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 group">
                                    <div className="w-11 h-11 xl:w-12 xl:h-12 rounded-full border border-border bg-card flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform shrink-0">
                                        <LineChart className="w-5 h-5 xl:w-6 xl:h-6 text-cyan-500" />
                                    </div>
                                    <div>
                                        <div className="text-[14px] xl:text-[15px] font-bold tracking-tight text-foreground whitespace-nowrap">Research Desk</div>
                                        <div className="text-[12px] xl:text-[13px] font-medium text-muted-foreground mt-0.5 whitespace-nowrap">Data-driven selection</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 group">
                                    <div className="w-11 h-11 xl:w-12 xl:h-12 rounded-full border border-border bg-card flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform shrink-0">
                                        <ShieldCheck className="w-5 h-5 xl:w-6 xl:h-6 text-amber-500" />
                                    </div>
                                    <div>
                                        <div className="text-[14px] xl:text-[15px] font-bold tracking-tight text-foreground whitespace-nowrap">Zero Mis-selling</div>
                                        <div className="text-[12px] xl:text-[13px] font-medium text-muted-foreground mt-0.5 whitespace-nowrap">No forced NFOs ever</div>
                                    </div>
                                </div>
                            </AnimatedGroup>

                            {/* DIY Investor Block */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.4, duration: 1 }}
                                className="mt-10 border-l-[3px] border-primary/40 pl-5 text-left max-w-md mx-auto lg:mx-0 group"
                            >
                                <h4 className="text-[13px] font-bold text-foreground mb-1.5 flex items-center gap-2 uppercase tracking-wide">
                                    <img src="/xblack.png" alt="X Logo" className="w-[18px] h-[18px] object-contain dark:invert opacity-80" />
                                    Decoding Mutual Funds with Data
                                </h4>
                                <p className="text-[15px] sm:text-base text-muted-foreground leading-relaxed mb-3">
                                    Even if you invest on your own (DIY-investor), get my unbiased 1-Pagers and mutual fund monthly portfolio updates entirely for free.
                                </p>
                                <Link href="https://x.com/AnkitFinAlpha" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold text-primary hover:text-emerald-400 transition-colors group/link uppercase tracking-wider">
                                    Follow me on 𝕏 <span className="ml-1 text-base leading-none group-hover/link:translate-x-1 group-hover/link:-translate-y-px transition-transform">↗</span>
                                </Link>
                            </motion.div>

                        </div>

                        {/* Right Content Area: Beautiful High-Fidelity UI Mockup */}
                        <div className="lg:col-span-6 relative z-10 mt-12 lg:mt-0 flex justify-center lg:justify-end perspective-[2000px]">
                            <AnimatedGroup
                                variants={{
                                    container: {
                                        visible: { transition: { staggerChildren: 0.05, delayChildren: 0.5 } },
                                    },
                                    item: {
                                        hidden: { opacity: 0, rotateY: -10, rotateX: 5, scale: 0.95, x: 50 },
                                        visible: { opacity: 1, rotateY: -5, rotateX: 2, scale: 1, x: 0, transition: { type: 'spring', bounce: 0.2, duration: 2.5 } },
                                    }
                                }}>
                                <div className="relative w-full max-w-[650px] bg-card rounded-[2.5rem] border border-border/60 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] p-2">
                                    <div className="absolute inset-0 bg-linear-to-b from-white/10 to-transparent rounded-[2.5rem] pointer-events-none" />
                                    
                                    {/* Inner screen */}
                                    <div className="relative w-full bg-background rounded-[2rem] border border-border/50 overflow-hidden flex flex-col">
                                        
                                        {/* Dashboard Header */}
                                        <div className="px-8 py-6 border-b border-border/50 flex flex-col sm:flex-row justify-between sm:items-center bg-card/50 gap-4">
                                            <div>
                                                <h3 className="text-lg font-bold flex items-center gap-2"><PieChart className="w-5 h-5 text-primary" /> Goal Portfolio</h3>
                                                <p className="text-xs text-muted-foreground mt-1">Interactive SIP Projection</p>
                                            </div>
                                            <div className="sm:text-right">
                                                <p className="text-2xl font-bold font-serif text-amber-500/90">{formatCurrency(futureValue)}</p>
                                                <p className="text-xs text-primary font-semibold flex items-center sm:justify-end gap-1 mt-0.5"><TrendingUp className="w-3 h-3"/> +{activeGoal.rate}% XIRR</p>
                                            </div>
                                        </div>

                                        {/* Goal Selector Tabs */}
                                        <div className="px-8 pt-4 flex gap-2 overflow-x-auto no-scrollbar">
                                            {INVEST_GOALS.map(goal => (
                                                <button
                                                    key={goal.id}
                                                    onClick={() => setActiveGoalId(goal.id)}
                                                    className={`px-3 py-1.5 rounded-full text-[11px] md:text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shrink-0 ${activeGoalId === goal.id ? 'bg-primary/20 text-primary font-bold border border-primary/40 shadow-[0_0_10px_var(--color-primary)]/20' : 'bg-card border border-border/80 text-zinc-400 hover:bg-muted/50 hover:text-zinc-300'}`}
                                                >
                                                    <span>{goal.icon}</span> {goal.label}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Interactive Slider Area */}
                                        <div className="px-8 pt-6 pb-2 border-b border-border/30 bg-background">
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="text-sm font-semibold">Monthly SIP Amount</span>
                                                <span className="text-lg font-bold bg-primary/10 text-primary px-3 py-1 rounded-sm">₹{monthlySip.toLocaleString('en-IN')}</span>
                                            </div>
                                            
                                            {/* Native fast range slider styled beautifully */}
                                            <input 
                                                title='Adjust SIP Amount'
                                                type="range" 
                                                min="2000" 
                                                max="100000" 
                                                step="1000"
                                                value={monthlySip}
                                                onChange={(e) => setMonthlySip(Number(e.target.value))}
                                                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary/80 transition-all focus:outline-hidden"
                                            />
                                            
                                            <div className="flex justify-between text-[10px] text-muted-foreground mt-2 font-medium uppercase tracking-wider">
                                                <span>₹2k</span>
                                                <span className="text-primary/80">{activeGoal.years} Years Timeline</span>
                                                <span>₹1L</span>
                                            </div>
                                        </div>

                                        {/* Main Chart Area */}
                                        <div className="p-8 h-[250px] relative flex flex-col justify-end">
                                            {/* Grid */}
                                            <div className="absolute inset-x-8 inset-y-8 flex flex-col justify-between pointer-events-none z-0">
                                                {[...Array(5)].map((_, idx) => (
                                                    <div key={idx} className="w-full h-px bg-border/60" />
                                                ))}
                                            </div>

                                            {/* Dynamic Glowing bars */}
                                            <div className="relative z-10 w-full h-[180px] flex items-end justify-between gap-3 md:gap-4 px-2">
                                                {curves.map((curve, i) => (
                                                    <div key={i} className="relative flex flex-col justify-end w-full group/bar h-full transition-all duration-300 ease-out">
                                                        <motion.div 
                                                            initial={false}
                                                            animate={{ height: `${curve.height}%` }}
                                                            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                                            className="w-full flex flex-col justify-end rounded-md overflow-hidden shadow-[0_0_15px_var(--color-primary)]/40 relative group-hover/bar:brightness-125"
                                                            style={{ minHeight: '10%' }}
                                                        >
                                                            {/* Gains */}
                                                            <div className="w-full bg-linear-to-t from-primary/80 to-primary flex-1" />
                                                            {/* Invested */}
                                                            <div 
                                                                className="w-full bg-amber-500 border-t border-background/20"
                                                                style={{ height: `${curve.investedRatio}%` }}
                                                            />
                                                        </motion.div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Dashboard Metrics */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border/50">
                                            <div className="bg-card p-6 flex flex-col justify-center">
                                                <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center mb-3 text-muted-foreground">
                                                    <LineChart className="w-4 h-4" />
                                                </div>
                                                <p className="text-xs text-muted-foreground font-semibold mb-1 uppercase tracking-wider">Invested</p>
                                                <p className="text-lg font-bold text-foreground">{formatCurrency(invested)}</p>
                                            </div>
                                            <div className="bg-card p-6 flex flex-col justify-center">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                                                    <BarChart3 className="w-4 h-4 text-primary" />
                                                </div>
                                                <p className="text-xs text-primary font-semibold mb-1 uppercase tracking-wider">Gains</p>
                                                <p className="text-lg font-bold text-primary">{formatCurrency(wealthGained)}</p>
                                            </div>
                                            <div className="bg-card p-6 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                                                <div className="w-12 h-12 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin-slow flex items-center justify-center mb-2 shadow-[0_0_15px_#f59e0b]/20">
                                                    <div className="w-10 h-10 rounded-full border-[3px] border-primary/20 border-b-primary flex items-center justify-center">
                                                    </div>
                                                </div>
                                                <p className="text-[10px] text-muted-foreground font-bold uppercase mt-1">Rebalancing</p>
                                                <p className="text-xs font-bold text-amber-500 relative z-10">Active</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </AnimatedGroup>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    )
}
