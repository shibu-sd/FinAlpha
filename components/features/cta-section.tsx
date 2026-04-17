import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

export default function CTASection() {
    return (
        <section>
            <div className="py-16 md:py-24">
                <div className="mx-auto max-w-3xl px-6 text-center">
                    <h2 className="text-balance text-3xl font-semibold md:text-4xl">
                        Ready to Start Your Investment Journey?
                    </h2>
                    <p className="text-xl sm:text-2xl text-muted-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Get personalized mutual fund guidance from a real market professional — no generic templates, no sales pitch.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                        <Link
                            href="/invest"
                        >
                            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-background group hover:scale-[1.02] transition-transform duration-300">
                                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#A7F3D0_0%,#065F46_50%,#A7F3D0_100%)]" />
                                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background group-hover:bg-background/90 px-8 py-1 text-base font-medium text-foreground backdrop-blur-3xl shadow-xl shadow-emerald-900/20">
                                    Start Investing
                                </span>
                            </button>
                        </Link>

                        <Link
                            href="https://wa.me/919560264980?text=Hi%20Ankit%2C%20I%20want%20to%20learn%20about%20investing%20through%20FinAlpha"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-8 text-base font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors cursor-pointer">
                                <MessageCircle className="h-5 w-5" />
                                Chat on WhatsApp
                            </button>
                        </Link>
                    </div>

                    <p className="text-xs text-muted-foreground mt-6">
                        AMFI Registered Mutual Fund Distributor | ARN-331197
                    </p>
                </div>
            </div>
        </section>
    )
}
