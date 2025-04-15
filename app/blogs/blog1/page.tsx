import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { HeroHeader } from '@/components/hero/hero-header';
import FooterSection from '@/components/footer';

const Blog1 = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <HeroHeader />

            <main className="flex-1 mx-auto w-full max-w-4xl px-6 py-32">
                <div className="relative">
                    <div aria-hidden className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_10%,transparent_0%,var(--color-background)_75%)]"></div>

                    <div className="mb-8 text-center">
                        <h1 className="mt-8 text-balance text-4xl md:text-5xl font-bold mb-6">
                            The Enduring Shine: Why Gold Continues to Outperform as a Premier Asset in a Modern Portfolio
                        </h1>
                        <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
                            <span>April 13, 2025</span>
                            <span>•</span>
                            <span>6 min read</span>
                        </div>
                    </div>

                    <div className="mb-12">
                        <div className="bg-background relative overflow-hidden rounded-2xl border p-2 shadow-lg shadow-zinc-950/15">
                            <Image
                                src="/blogs/blog1-img1.png"
                                alt="Gold bar with a stock char background"
                                width={800}
                                height={400}
                                className="rounded-xl w-full"
                            />
                        </div>
                    </div>

                    <article className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="font-semibold text-xl">Introduction</p>
                        <p>In a world dominated by rapid digital transformation, market volatility, and monetary policy shifts, one asset class has retained its timeless appeal—gold. Far beyond its traditional role as a symbol of opulence, gold has consistently proven itself as a stabilizing force in modern portfolios. As investors grapple with persistent equity fluctuations and the rise of high-risk digital assets, gold is emerging once again as a critical pillar of financial resilience.</p>

                        <h2 className="mt-8 mb-4 text-2xl font-bold">1. Gold Through the Ages: The Original Global Currency</h2>
                        <p>Gold's legacy as a store of value stretches back over 5,000 years. From ancient civilizations using it in trade to its institutional role in the Bretton Woods monetary system, gold has functioned as a universal standard of wealth and trust. Today, it continues to hold a special place in the vaults of central banks and sovereign wealth funds.</p>

                        <p className="font-semibold mt-6">Case in Point: The Reserve Bank of India's Strategic Gold Repatriation</p>
                        <p>The Reserve Bank of India (RBI) has recently initiated the repatriation of a portion of its gold reserves from foreign banks, bringing them back to domestic vaults. This reflects a growing global consensus: in an unpredictable world, physical gold remains a national safeguard.</p>

                        <h2 className="mt-8 mb-4 text-2xl font-bold">2. Gold vs. Equities: A Comparative Study Since 1995</h2>
                        <p className="font-semibold">Chart 1: Performance of Gold vs. Sensex (1995–Present)</p>
                        <div className="bg-background relative overflow-hidden rounded-2xl border p-2 shadow-lg shadow-zinc-950/15 mb-4 mt-4">
                            <Image
                                src="/blogs/blog1-img2.png"
                                alt="Chart showing performance of Gold vs Sensex from 1995 to present"
                                width={700}
                                height={350}
                                className="rounded-xl w-full"
                            />
                        </div>

                        <ul className="space-y-2 mt-6">
                            <li><span className="font-semibold">Consistency in Crisis:</span> Gold has proven its value during financial shocks, preserving wealth and providing safety.</li>
                            <li><span className="font-semibold">Portfolio Hedge:</span> Gold acts as a counterweight to equities, especially in bear markets.</li>
                            <li><span className="font-semibold">Risk-Adjusted Performance:</span> Lower volatility and inverse equity correlation make gold ideal for diversification.</li>
                        </ul>

                        <h2 className="mt-8 mb-4 text-2xl font-bold">3. Recent Rally: Gold's Momentum in the Last Two Months</h2>
                        <p className="font-semibold">Chart 2: Gold Price Movement (Past 60 Days)</p>
                        <div className="bg-background relative overflow-hidden rounded-2xl border p-2 shadow-lg shadow-zinc-950/15 mb-4 mt-4">
                            <Image
                                src="/blogs/blog1-img3.png"
                                alt="Chart showing gold price movement in the past 60 days"
                                width={700}
                                height={300}
                                className="rounded-xl w-full"
                            />
                        </div>

                        <ul className="space-y-2 mt-6">
                            <li><span className="font-semibold">Flight to Safety:</span> The recent surge highlights gold's role as a safe haven during macroeconomic distress.</li>
                            <li><span className="font-semibold">Resilience vs. Risk:</span> Gold tends to attract capital when liquidity tightens and fear takes hold.</li>
                        </ul>

                        <h2 className="mt-8 mb-4 text-2xl font-bold">4. Gold vs. Bitcoin: Comparing Safety and Speculation</h2>
                        <p>Bitcoin, while often touted as "digital gold," displays characteristics more akin to speculative equities. Gold's legacy, low volatility, and central bank backing give it an edge as a defensive asset.</p>

                        <div className="bg-background relative overflow-hidden rounded-2xl border p-2 shadow-lg shadow-zinc-950/15 my-6">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b">
                                        <tr>
                                            <th className="px-4 py-3 text-left">Factor</th>
                                            <th className="px-4 py-3 text-left">Gold</th>
                                            <th className="px-4 py-3 text-left">Bitcoin</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b">
                                            <td className="px-4 py-3">Volatility</td>
                                            <td className="px-4 py-3">Low</td>
                                            <td className="px-4 py-3">Extremely High</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="px-4 py-3">Tangibility</td>
                                            <td className="px-4 py-3">Yes</td>
                                            <td className="px-4 py-3">No</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="px-4 py-3">Correlation with Equities</td>
                                            <td className="px-4 py-3">Low/Negative</td>
                                            <td className="px-4 py-3">Increasingly Positive</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="px-4 py-3">Institutional Trust</td>
                                            <td className="px-4 py-3">Backed by Central Banks</td>
                                            <td className="px-4 py-3">Lacks Sovereign Endorsement</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3">Crisis Performance</td>
                                            <td className="px-4 py-3">Proven Stability</td>
                                            <td className="px-4 py-3">Unpredictable Behavior</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <h2 className="mt-8 mb-4 text-2xl font-bold">5. Final Thoughts: Gold as the Guardian of Wealth</h2>
                        <p>Gold may not deliver rapid returns, but it offers something far more valuable—resilience. In uncertain times, it becomes a portfolio's foundation, providing peace of mind and protection.</p>
                        <p>Whether through physical bars, ETFs, sovereign bonds, or digital platforms, investors today have flexible access to this time-tested asset.</p>

                        <h3 className="mt-8 mb-4 text-xl font-bold">Call to Action:</h3>
                        <p>Are you prepared for the next market shock? Strengthen your financial foundation by allocating a portion of your portfolio to gold. In an era of uncertainty, gold continues to be the asset that not only glitters—but endures.</p>
                    </article>
                </div>
            </main>

            <FooterSection />
        </div>
    );
};

export default Blog1;