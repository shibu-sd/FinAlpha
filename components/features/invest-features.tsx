'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    TrendingUp,
    Target,
    ShieldCheck,
    IndianRupee,
    Briefcase,
    GraduationCap,
    Home,
    Car,
    ArrowRight,
    CheckCircle2,
    Check,
    MessageCircle,
    Loader2,
    Lightbulb
} from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InvestFlow() {
    const [step, setStep] = useState(1);
    const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
    const [investmentType, setInvestmentType] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const goals = [
        { id: "retirement", icon: Briefcase, title: "Retirement", desc: "Long-term compounding" },
        { id: "house", icon: Home, title: "Dream Home", desc: "Mid-term corpus building" },
        { id: "child", icon: GraduationCap, title: "Child's Future", desc: "Education & marriage planning" },
        { id: "wealth", icon: TrendingUp, title: "Pure Wealth", desc: "Aggressive capital appreciation" },
        { id: "tax", icon: ShieldCheck, title: "Tax Saving", desc: "ELSS under 80C" },
        { id: "other", icon: Car, title: "Other Goal", desc: "Vehicle, vacation, etc." },
    ];

    const handleNext = () => setStep((s) => Math.min(s + 1, 4));
    const handleBack = () => setStep((s) => Math.max(s - 1, 1));

    // Simulate analysis when transitioning from Step 2 to Step 3
    const submitStep2 = () => {
        setIsAnalyzing(true);
        setStep(3);
        setTimeout(() => {
            setIsAnalyzing(false);
        }, 1500);
    };

    // Strategy Text Generator
    const getStrategyText = () => {
        if (!selectedGoal || !investmentType) return "";
        const typeText = investmentType === 'sip' ? 'disciplined monthly SIPs' : 'a strategic one-time lumpsum allocation';
        switch(selectedGoal) {
            case 'retirement': return `For your long-term retirement timeline, we strongly recommend structuring ${typeText} heavily into Aggressive Growth and Small/Mid-Cap Equity funds. This precisely maximizes decades of compounding while riding out short-term volatility.`;
            case 'child': return `For your child's future, we recommend a dynamic asset allocation using ${typeText}. We will start with high-alpha pure equity and automatically shift to safer debt as the college years approach to protect the corpus.`;
            case 'house': return `For a mid-term real estate corpus, severe drawdowns are dangerous. We will structure your ${typeText} primarily into Balanced Advantage and Hybrid funds for steady, predictable growth that beats inflation.`;
            case 'tax': return `To maximize your Section 80C tax benefits via ${typeText}, we will curate a portfolio of top-tier ELSS (Equity Linked Savings Schemes) funds. These offer pure equity market returns with the lowest lock-in period (3 years) of any tax instrument.`;
            case 'wealth': return `For pure wealth creation, we take a high-conviction approach. We will direct your ${typeText} into focused Flexi-Cap and Multi-Asset strategies to capture alpha wherever the market is running.`;
            default: return `Based on your goal, we will tailor ${typeText} across a diversified core mix of Equity and Debt to precisely match your timeline and risk appetite.`;
        }
    };

    // Construct the WhatsApp payload
    const getWhatsAppUrl = () => {
        const goalObj = goals.find(g => g.id === selectedGoal);
        const goalName = goalObj ? goalObj.title : 'Investing';
        const typeName = investmentType === 'sip' ? 'SIP' : 'Lumpsum';
        const text = encodeURIComponent(`Hi Ankit, I want to invest in ${typeName} for ${goalName}. Can we discuss exactly which funds I should pick?`);
        return `https://wa.me/919560264980?text=${text}`;
    };

    return (
        <section className="bg-background min-h-screen py-24 relative overflow-hidden">
            {/* Ambient Background Lights */}
            <div aria-hidden className="absolute inset-0 -z-10 flex justify-center overflow-hidden pointer-events-none">
                <div className="absolute top-[0%] -left-[10%] w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[0%] right-[0%] w-[600px] h-[600px] bg-secondary/5 blur-[150px] rounded-full mix-blend-screen" />
            </div>

            <div className="mx-auto max-w-4xl px-6 relative z-10 pt-10">
                {/* Header Sequence */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Design Your Portfolio</h1>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        In just 3 clicks, we'll design your mutual fund strategy and connect you safely via AssetPlus (AMFI Registered: ARN-331197).
                    </p>
                </div>

                {/* Progress Indicators */}
                <div className="flex items-center justify-center gap-3 mb-10">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= i ? 'bg-primary text-primary-foreground shadow-[0_0_15px_var(--color-primary)]/30' : step + 1 === i && isAnalyzing ? 'bg-primary/20 text-primary border border-primary/50 animate-pulse' : 'bg-card text-muted-foreground border border-border'}`}>
                                {step > i ? <Check className="w-5 h-5" /> : step === i && isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : i}
                            </div>
                            {i !== 3 && <div className={`w-12 md:w-20 h-1 rounded-full overflow-hidden bg-card border border-border/50`}><div className={`h-full bg-primary transition-all duration-700 ${step > i ? 'w-full' : 'w-0'}`} /></div>}
                        </div>
                    ))}
                </div>

                {/* Flow Container */}
                <Card className="border-border/60 bg-card/60 backdrop-blur-xl shadow-2xl rounded-[2.5rem] overflow-hidden min-h-[500px] relative mt-4">
                    <CardContent className="p-8 md:p-12 h-full">
                        <AnimatePresence mode="wait">
                            
                            {/* STEP 1: CHOOSE GOAL */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h2 className="text-2xl font-bold mb-6 text-foreground">What is the primary goal of your investment?</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {goals.map((g) => (
                                            <div 
                                                key={g.id}
                                                onClick={() => setSelectedGoal(g.id)}
                                                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-start gap-4 ${selectedGoal === g.id ? 'border-primary bg-primary/5 relative shadow-md shadow-primary/5 scale-[1.02]' : 'border-border/50 bg-background/50 hover:border-border hover:bg-muted/20'}`}
                                            >
                                                {selectedGoal === g.id && (
                                                    <div className="absolute top-4 right-4 text-primary">
                                                        <CheckCircle2 className="w-5 h-5" />
                                                    </div>
                                                )}
                                                <div className={`p-3 rounded-xl transition-colors ${selectedGoal === g.id ? 'bg-primary/20 text-primary shadow-inner' : 'bg-muted/50 text-muted-foreground'}`}>
                                                    <g.icon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg text-foreground">{g.title}</h3>
                                                    <p className="text-sm text-muted-foreground mt-1">{g.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-10 flex justify-end">
                                        <Button 
                                            size="lg" 
                                            disabled={!selectedGoal} 
                                            onClick={handleNext}
                                            className="rounded-full px-8 text-base bg-foreground text-background hover:bg-foreground/90 font-bold shadow-xl"
                                        >
                                            Continue <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2: CHOOSE TYPE */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col h-full"
                                >
                                    <h2 className="text-2xl font-bold mb-2 text-foreground">How do you want to invest?</h2>
                                    <p className="text-muted-foreground mb-8">Choose the deployment mechanism that suits your current cash flow.</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                        <div 
                                            onClick={() => setInvestmentType('sip')}
                                            className={`p-8 rounded-[2rem] border-2 cursor-pointer transition-all duration-300 flex flex-col items-center text-center ${investmentType === 'sip' ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10 scale-[1.02]' : 'border-border/50 bg-background/50 hover:border-border hover:bg-muted/20'}`}
                                        >
                                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                                                <TrendingUp className="w-8 h-8 text-primary" />
                                            </div>
                                            <h3 className="font-bold text-2xl mb-2 text-foreground">Monthly SIP</h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed">Invest a fixed amount every month. Best for salaried professionals and mitigating market volatility through Rupee cost averaging.</p>
                                            {investmentType === 'sip' && <CheckCircle2 className="w-6 h-6 text-primary mt-6" />}
                                        </div>

                                        <div 
                                            onClick={() => setInvestmentType('lumpsum')}
                                            className={`p-8 rounded-[2rem] border-2 cursor-pointer transition-all duration-300 flex flex-col items-center text-center ${investmentType === 'lumpsum' ? 'border-amber-500 bg-amber-500/5 shadow-xl shadow-amber-500/10 scale-[1.02]' : 'border-border/50 bg-background/50 hover:border-border hover:bg-muted/20'}`}
                                        >
                                            <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-6">
                                                <IndianRupee className="w-8 h-8 text-amber-500" />
                                            </div>
                                            <h3 className="font-bold text-2xl mb-2 text-foreground">One-time Lumpsum</h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed">Got a yearly bonus or fixed corpus? Invest a large bulk amount at once. Ideal if you have idle cash and the market dips.</p>
                                            {investmentType === 'lumpsum' && <CheckCircle2 className="w-6 h-6 text-amber-500 mt-6" />}
                                        </div>
                                    </div>

                                    <div className="mt-auto flex justify-between items-center">
                                        <Button variant="ghost" onClick={handleBack} className="rounded-full text-muted-foreground hover:text-foreground">
                                            Back
                                        </Button>
                                        <Button 
                                            size="lg" 
                                            disabled={!investmentType} 
                                            onClick={submitStep2}
                                            className="rounded-full px-8 text-base bg-foreground text-background hover:bg-foreground/90 font-bold shadow-xl"
                                        >
                                            Analyze Strategy <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3 & 4: THE STRATEGY & THE 2-PATH FINISH */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex flex-col h-full relative"
                                >
                                    {isAnalyzing ? (
                                         <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/50 z-20">
                                            <div className="relative">
                                                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                                                <div className="absolute inset-0 w-12 h-12 bg-primary/20 blur-xl rounded-full" />
                                            </div>
                                            <h3 className="text-xl font-bold mt-6 text-foreground animate-pulse">Curating your strategy...</h3>
                                            <p className="text-muted-foreground text-sm mt-2">Analyzing optimal fund allocation for your goal.</p>
                                        </div>
                                    ) : (
                                        <div className="text-center md:py-4">
                                            {/* The Strategy Reveal Payload */}
                                            <div className="bg-background/80 border border-primary/20 rounded-[2rem] p-8 md:p-10 mb-10 relative overflow-hidden shadow-2xl shadow-primary/5">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] pointer-events-none" />
                                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20">
                                                    <Lightbulb className="w-6 h-6 text-primary" />
                                                </div>
                                                <h2 className="text-xs font-bold tracking-widest text-primary uppercase mb-3">Your Recommended Strategy</h2>
                                                <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed max-w-2xl mx-auto">
                                                    "{getStrategyText()}"
                                                </p>
                                            </div>

                                            <h3 className="text-2xl font-bold mb-8">How would you like to proceed?</h3>
                                            
                                            {/* The Two-Path Finish */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                                                {/* Path 1: Consult First */}
                                                <div className="bg-background/50 border border-border/80 hover:border-emerald-500/50 transition-colors rounded-2xl p-6 flex flex-col justify-between">
                                                    <div className="mb-6">
                                                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                                                            <MessageCircle className="w-5 h-5 text-emerald-500" />
                                                        </div>
                                                        <h4 className="font-bold text-lg mb-1">I want to discuss this</h4>
                                                        <p className="text-xs text-muted-foreground">Chat with Ankit to fine-tune exactly which funds match this strategy.</p>
                                                    </div>
                                                    <Button asChild variant="outline" className="w-full rounded-full border-emerald-500/30 hover:bg-emerald-500/5 hover:text-emerald-500 font-semibold group">
                                                        <Link href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                                                            WhatsApp Ankit <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                                        </Link>
                                                    </Button>
                                                </div>

                                                {/* Path 2: Just Do It (AssetPlus) */}
                                                <div className="bg-background/50 border border-border/80 hover:border-primary/50 transition-colors rounded-2xl p-6 flex flex-col justify-between">
                                                    <div className="mb-6">
                                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                                            <ShieldCheck className="w-5 h-5 text-primary" />
                                                        </div>
                                                        <h4 className="font-bold text-lg mb-1">I'm ready to start</h4>
                                                        <p className="text-xs text-muted-foreground">Go straight to AssetPlus to complete KYC and open your FinAlpha account.</p>
                                                    </div>
                                                    <Button asChild className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 group">
                                                        <Link href="https://www.assetplus.in/mfd/FinAlpha" target="_blank" rel="noopener noreferrer">
                                                            Open KYC Portal <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>

                                            <button onClick={handleBack} className="mt-8 text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
                                                Go back and change goals
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
