'use client'

import React from "react";
import { Tweet } from "react-tweet";
import Link from "next/link";
import { ArrowUpRight, BarChartHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ResearchDesk() {
    // You will replace these 3 IDs with the numeric IDs of your actual FinAlpha tweets!
    const FEATURED_TWEET_IDS = [
        "2042859217930035203",
        "2021827984110629102",
        "2029475020456771707",
    ];

    return (
        <section className="bg-background py-24 md:py-32 relative overflow-hidden border-t border-border/30">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-border to-transparent opacity-50" />
            <div className="absolute right-[10%] top-[30%] w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
            
            <div className="mx-auto max-w-[85rem] px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 text-blue-500 font-bold tracking-widest text-xs uppercase bg-blue-500/10 w-fit px-3 py-1.5 rounded-full mb-6 border border-blue-500/20">
                            <span className="text-sm">𝕏</span> Live from X
                        </div>
                        <h2 className="text-balance text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                            The FinAlpha <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-cyan-400">Research Desk</span>
                        </h2>
                        <p className="text-lg text-muted-foreground font-medium">
                            Join 5,700+ investors tracking our deep-dive mutual fund research, 1-pagers, and portfolio updates on X.
                        </p>
                    </div>
                    
                    <div className="shrink-0 mb-2">
                        <Button asChild size="lg" className="rounded-full bg-white text-black hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] font-bold">
                            <Link href="https://x.com/AnkitFinAlpha" target="_blank" rel="noopener noreferrer">
                                Follow @AnkitFinAlpha <ArrowUpRight className="w-5 h-5 ml-1" />
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* The Curated Tweets */}
                    {FEATURED_TWEET_IDS.map((id) => (
                        <div key={id} className="relative group rounded-3xl overflow-hidden shadow-2xl shadow-black/20 hover:-translate-y-1 transition-transform duration-500">
                            <div className="absolute inset-0 bg-linear-to-b from-blue-500/5 to-transparent pointer-events-none z-0" />
                            {/* We wrap it in a slightly themed container so it matches the site seamlessly */}
                            <div className="relative z-10 w-full h-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl flex items-center justify-center p-2 [data-theme=dark]:theme-dark">
                                {/* The React-Tweet Component automatically renders safely */}
                                <div className="w-full pointer-events-auto">
                                    <Tweet id={id} />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Placeholder Cards to show the grid layout beautifully before user adds more IDs */}
                    {FEATURED_TWEET_IDS.length < 3 && (
                        Array.from({ length: 3 - FEATURED_TWEET_IDS.length }).map((_, i) => (
                            <div key={`empty-${i}`} className="relative rounded-3xl overflow-hidden shadow-lg border border-dashed border-border/50 bg-background/50 flex flex-col items-center justify-center text-center p-8 min-h-[400px]">
                                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20 text-blue-500">
                                    <BarChartHorizontal className="w-8 h-8" />
                                </div>
                                <h4 className="text-lg font-bold mb-2">Awaiting Research</h4>
                                <p className="text-sm text-muted-foreground">Add your latest #FinAlpha1Pager Tweet ID to feature it here.</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
