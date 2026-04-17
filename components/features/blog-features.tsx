'use client'

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    ClockIcon,
    Calendar,
    ArrowUpRight,
    BookOpen
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

const blogPosts = [
    {
        id: 1,
        title: "The Enduring Shine : Why Gold Remains a Premier Asset",
        category: "Macro & Finance",
        excerpt: "In an age of digital disruption and economic uncertainty, gold continues to shine as a resilient, time-tested asset that offers stability and long-term value. We explore how it balances a modern mutual fund portfolio.",
        readTime: "5 min read",
        date: "Nov 20, 2024",
        image: "/blogs/blog1-thumbnail.png",
        imageAlt: "Gold bars with title",
        href: "/blogs/blog1"
    },
    // Future posts will automatically populate the grid below
];

export default function Features() {
    const featuredPost = blogPosts[0];
    const olderPosts = blogPosts.slice(1);

    return (
        <section className="bg-background min-h-[90vh] py-32 relative overflow-hidden">
            {/* Ambient Lighting */}
            <div aria-hidden className="absolute inset-0 -z-10 flex justify-center overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full mix-blend-screen opacity-70" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[500px] bg-secondary/5 blur-[150px] rounded-full mix-blend-screen opacity-70" />
            </div>

            <div className="mx-auto max-w-6xl px-6 lg:px-8 relative z-10">
                
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-6">
                        <BookOpen className="w-4 h-4" />
                        FinAlpha Intelligence
                    </div>
                    <h2 className="text-balance text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        Market Insights & <span className="text-primary drop-shadow-[0_0_15px_rgba(34,197,94,0.2)]">Deep Research</span>
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Explore articles, market analysis, and wealth creation strategies crafted to simplify finance and empower your investment journey.
                    </p>
                </div>

                {/* FEATURED POST (Hero Component) */}
                {featuredPost && (
                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-6 bg-primary rounded-full"></div>
                            <h3 className="text-xl font-bold text-foreground">Featured Analysis</h3>
                        </div>
                        
                        <Card className="group overflow-hidden rounded-[2.5rem] border border-border/50 bg-card/40 backdrop-blur-md hover:bg-card/60 transition-all duration-500 p-2 shadow-2xl shadow-black/5 hover:shadow-primary/5">
                            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8">
                                {/* Image Half */}
                                <div className="relative h-[300px] lg:h-full w-full overflow-hidden rounded-[2rem] bg-muted/20">
                                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 hidden group-hover:block transition-opacity duration-500" />
                                    <img
                                        src={featuredPost.image}
                                        alt={featuredPost.imageAlt}
                                        className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-6 left-6 z-20">
                                        <Badge className="bg-background/80 backdrop-blur-lg text-primary border-primary/20 hover:bg-background px-4 py-1.5 font-semibold shadow-xl">
                                            {featuredPost.category}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Content Half */}
                                <div className="flex flex-col justify-center p-6 lg:p-10 lg:pl-4">
                                    <div className="flex items-center gap-4 text-muted-foreground text-sm font-medium mb-6">
                                        <div className="flex items-center gap-1.5 bg-background/50 px-3 py-1 rounded-full border border-border/40">
                                            <Calendar className="h-4 w-4 text-primary" /> {featuredPost.date}
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-background/50 px-3 py-1 rounded-full border border-border/40">
                                            <ClockIcon className="h-4 w-4 text-primary" /> {featuredPost.readTime}
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-6 transition-colors group-hover:text-primary">
                                        {featuredPost.title}
                                    </h3>
                                    
                                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                                        {featuredPost.excerpt}
                                    </p>
                                    
                                    <Button asChild size="lg" className="w-fit rounded-full font-bold group-hover:scale-105 transition-transform bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                                        <Link href={featuredPost.href}>
                                            Read Full Analysis <ArrowUpRight className="w-5 h-5 ml-2" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                {/* THE GRID (Recent Articles) */}
                {olderPosts.length > 0 && (
                    <div className="mt-20">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-2 h-6 bg-muted-foreground/30 rounded-full"></div>
                            <h3 className="text-xl font-bold text-foreground">Recent Articles</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {olderPosts.map((post) => (
                                <Link href={post.href} key={post.id} className="group block focus:outline-none">
                                    <Card className="h-full overflow-hidden rounded-[2rem] border border-border/40 bg-background/50 backdrop-blur-sm hover:bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/10 flex flex-col">
                                        <div className="relative h-56 w-full overflow-hidden bg-muted/20">
                                            <img
                                                src={post.image}
                                                alt={post.imageAlt}
                                                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <Badge className="bg-background/90 backdrop-blur-md text-foreground border-transparent shadow-sm">
                                                    {post.category}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-1">
                                            <h3 className="text-xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors">
                                                {post.title}
                                            </h3>
                                            <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed mb-6 flex-1">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between text-muted-foreground text-xs mt-auto pt-4 border-t border-border/30">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="h-3.5 w-3.5" /> {post.date}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <ClockIcon className="h-3.5 w-3.5" /> {post.readTime}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};