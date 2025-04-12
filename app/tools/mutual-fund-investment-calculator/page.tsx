"use client"

import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/hero/hero-header";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export default function Tools() {
    const [investmentType, setInvestmentType] = useState<"sip" | "lumpsum">("sip");
    const [monthlyInvestment, setMonthlyInvestment] = useState("");
    const [returnRate, setReturnRate] = useState("");
    const [years, setYears] = useState("");
    const [result, setResult] = useState<number | null>(null);
    const [totalInvestment, setTotalInvestment] = useState<number | null>(null);
    const [wealthGained, setWealthGained] = useState<number | null>(null);

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();

        const P = parseFloat(monthlyInvestment);
        const annualRate = parseFloat(returnRate) / 100;
        const yearsNum = parseInt(years);
        const r = annualRate / 12;
        const n = yearsNum * 12;

        if (investmentType === "sip") {
            if (!isNaN(P) && !isNaN(r) && !isNaN(n)) {
                const futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
                const totalInvested = P * n;
                const gain = futureValue - totalInvested;

                setResult(futureValue);
                setTotalInvestment(totalInvested);
                setWealthGained(gain);
            }
        } else {
            if (!isNaN(P) && !isNaN(annualRate) && !isNaN(yearsNum)) {
                const futureValue = P * Math.pow(1 + annualRate, yearsNum);
                const totalInvested = P;
                const gain = futureValue - totalInvested;

                setResult(futureValue);
                setTotalInvestment(totalInvested);
                setWealthGained(gain);
            }
        }
    };

    return (
        <>
            <HeroHeader />

            <div className="relative py-16 md:py-32 bg-background">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl mb-16">
                            Mutual Fund Investment Calculator
                        </h2>
                    </div>

                    <form
                        onSubmit={handleCalculate}
                        className="bg-card m-auto h-fit w-full max-w-md rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
                    >
                        <div className="p-8 pb-6 space-y-6">
                            <div className="space-y-2">
                                <Label className="text-md">Investment Type</Label>
                                <RadioGroup
                                    value={investmentType}
                                    onValueChange={(value) => setInvestmentType(value as "sip" | "lumpsum")}
                                    className="flex gap-6"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="sip" id="sip" />
                                        <Label htmlFor="sip" className="text-md">SIP</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="lumpsum" id="lumpsum" />
                                        <Label htmlFor="lumpsum" className="text-md">Lump Sum</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {investmentType === "sip" ? (
                                <div className="space-y-2">
                                    <Label htmlFor="monthlyInvestment" className="block text-md">
                                        Monthly Investment (₹)
                                    </Label>
                                    <Input
                                        type="number"
                                        required
                                        id="monthlyInvestment"
                                        value={monthlyInvestment}
                                        onChange={(e) => setMonthlyInvestment(e.target.value)}
                                        placeholder="e.g., 5000"
                                    />
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Label htmlFor="monthlyInvestment" className="block text-md">
                                        Lump Sum Amount (₹)
                                    </Label>
                                    <Input
                                        type="number"
                                        required
                                        id="monthlyInvestment"
                                        value={monthlyInvestment}
                                        onChange={(e) => setMonthlyInvestment(e.target.value)}
                                        placeholder="e.g., 100000"
                                    />
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="returnRate" className="block text-md">
                                    Expected Annual Return Rate (%)
                                </Label>
                                <Input
                                    type="number"
                                    required
                                    id="returnRate"
                                    value={returnRate}
                                    onChange={(e) => setReturnRate(e.target.value)}
                                    placeholder="e.g., 12"
                                    step="0.01"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="years" className="block text-md">
                                    Investment Duration (Years)
                                </Label>
                                <Input
                                    type="number"
                                    required
                                    id="years"
                                    value={years}
                                    onChange={(e) => setYears(e.target.value)}
                                    placeholder="e.g., 10"
                                />
                            </div>

                            <Button type="submit" className="w-full">
                                Calculate
                            </Button>

                            {result !== null && (
                                <div className="mt-6 space-y-2 rounded-lg bg-muted p-4 text-md text-muted-foreground">
                                    <div className="flex justify-between">
                                        <span>Total Investment</span>
                                        <span className="font-medium text-foreground">
                                            ₹{totalInvestment?.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Wealth Gained</span>
                                        <span className="font-medium text-green-600">
                                            ₹{wealthGained?.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-t pt-2 mt-2">
                                        <span>Maturity Value</span>
                                        <span className="font-semibold text-primary">
                                            ₹{result?.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            <FooterSection />
        </>
    );
}