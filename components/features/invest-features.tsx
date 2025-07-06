import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
    TrendingUp,
    Target,
    Shield,
    User,
} from "lucide-react";
import Link from "next/link";

const Features = () => {
    return (
        <section>
            <div className="py-32">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-balance text-3xl font-semibold md:text-4xl">
                            Invest with Confidence
                        </h2>
                        <p className="text-muted-foreground mt-6">
                            Guided by a Trader Who Walks the Talk.
                        </p>
                    </div>

                    <div className="text-center mb-12">
                        <Card className="mx-auto max-w-4xl">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-center gap-2">
                                    <User className="h-6 w-6 text-primary" />
                                    Real Experience, Real Results
                                </CardTitle>
                                <CardDescription className="text-lg">
                                    Investment guidance from someone who's been there, done that.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="py-8">
                                <div className="text-left space-y-6 max-w-3xl mx-auto">
                                    <p className="text-lg leading-relaxed">
                                        As a full-time trader, investor, and equity market professional, I've spent years navigating the highs and lows of the market with deep research, discipline, and real skin in the game.
                                    </p>
                                    <p className="text-lg leading-relaxed">
                                        I now use that experience to help you make smarter, long-term investment decisions - tailored to your goals, not generic advice.
                                    </p>
                                    <p className="text-lg leading-relaxed">
                                        I offer guidance rooted in real market experience - practical, personal, and free from the usual sales talk.
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6 mt-12 mb-8">
                                    <div className="text-center p-6 rounded-lg border bg-card">
                                        <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                                        <h3 className="font-semibold mb-2">Market Experience</h3>
                                        <p className="text-muted-foreground text-sm">
                                            Years of hands-on trading and investment experience across market cycles.
                                        </p>
                                    </div>
                                    <div className="text-center p-6 rounded-lg border bg-card">
                                        <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                                        <h3 className="font-semibold mb-2">Tailored Strategy</h3>
                                        <p className="text-muted-foreground text-sm">
                                            Personalized investment approaches based on your specific goals and risk tolerance.
                                        </p>
                                    </div>
                                    <div className="text-center p-6 rounded-lg border bg-card">
                                        <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                                        <h3 className="font-semibold mb-2">Risk Management</h3>
                                        <p className="text-muted-foreground text-sm">
                                            Disciplined approach to managing downside while optimizing for long-term growth.
                                        </p>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <Link 
                                        href="https://www.assetplus.in/mfd/FinAlpha"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#A7F3D0_0%,#065F46_50%,#A7F3D0_100%)]" />
                                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-base font-medium text-white backdrop-blur-3xl">
                                                Invest Now
                                            </span>
                                        </button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;