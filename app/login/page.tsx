'use client'

import React, { useEffect, useState } from 'react'
import { Logo } from '@/components/logo'
import { ShieldCheck, ArrowRight, ExternalLink, Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function LoginBridgePage() {
    const [progress, setProgress] = useState(0)
    const ASSETPLUS_URL = "https://www.assetplus.in/mfd/FinAlpha"

    useEffect(() => {
        // Animate progress bar purely for visual feedback
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return prev + 2
            })
        }, 30)

        // Redirect after exactly 2.5 seconds (allowing progress bar to "complete")
        const timeout = setTimeout(() => {
            window.location.href = ASSETPLUS_URL
        }, 2500)

        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [])

    return (
        <div className="min-h-screen bg-background relative flex items-center justify-center overflow-hidden p-6">
            {/* Ambient Lighting */}
            <div aria-hidden className="absolute inset-0 -z-10 flex justify-center overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            <Card className="w-full max-w-md p-8 md:p-10 border-border/50 bg-background/50 backdrop-blur-xl shadow-2xl shadow-black/10 flex flex-col items-center text-center relative overflow-hidden rounded-[2rem]">
                <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent z-0 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col items-center w-full">
                    {/* Header Logos */}
                    <div className="flex items-center gap-4 mb-10 w-full justify-center">
                        <Logo />
                    </div>

                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 relative">
                        <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-ping opacity-20" />
                        <ShieldCheck className="w-8 h-8 text-primary" />
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight mb-3">
                        Secure Redirect
                    </h1>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-[280px]">
                        You are being securely redirected to <span className="font-semibold text-foreground">AssetPlus</span>, our execution partner, to access your portfolio.
                    </p>

                    {/* Progress Bar & Status */}
                    <div className="w-full space-y-4 mb-6">
                        <div className="flex justify-between items-center text-xs font-medium text-muted-foreground px-1">
                            <span>Establishing secure connection...</span>
                            <span className="text-primary">{progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted overflow-hidden rounded-full">
                            <div 
                                className="h-full bg-primary transition-all duration-[30ms] ease-linear"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-500/80 uppercase tracking-widest bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Forwarding
                    </div>

                    {/* Manual Fallback */}
                    <div className="mt-8 text-xs text-muted-foreground">
                        Taking too long? <a href={ASSETPLUS_URL} className="text-primary hover:underline inline-flex items-center">Click here <ExternalLink className="ml-1 w-3 h-3" /></a>
                    </div>
                </div>
            </Card>
        </div>
    )
}
