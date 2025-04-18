"use client"

import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/hero/hero-header";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export default function EMICalculator() {
    const [loanAmount, setLoanAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [loanTenure, setLoanTenure] = useState("");
    const [tenureType, setTenureType] = useState<"years" | "months">("years");
    const [emi, setEmi] = useState<number | null>(null);
    const [totalInterest, setTotalInterest] = useState<number | null>(null);
    const [totalAmount, setTotalAmount] = useState<number | null>(null);

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();

        const P = parseFloat(loanAmount);
        const r = parseFloat(interestRate) / 12 / 100;
        const n = tenureType === "years" ? parseInt(loanTenure) * 12 : parseInt(loanTenure);

        if (!isNaN(P) && !isNaN(r) && !isNaN(n)) {
            const monthlyEmi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
            const totalPayment = monthlyEmi * n;
            const interestPaid = totalPayment - P;

            setEmi(monthlyEmi);
            setTotalInterest(interestPaid);
            setTotalAmount(totalPayment);
        }
    };

    return (
        <>
            <HeroHeader />

            <div className="relative py-16 md:py-32 bg-background">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="mx-auto max-w-3xl text-center mb-16">
                        <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl">
                            Loan EMI Calculator
                        </h2>
                        <p className="text-muted-foreground mt-6">Find out your exact monthly outflow with our simple and reliable Loan EMI Calculator.</p>
                    </div>

                    <form
                        onSubmit={handleCalculate}
                        className="bg-card m-auto h-fit w-full max-w-md rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
                    >
                        <div className="p-8 pb-6 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="loanAmount" className="block text-md">
                                    Loan Amount (₹)
                                </Label>
                                <Input
                                    type="number"
                                    required
                                    id="loanAmount"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(e.target.value)}
                                    placeholder="e.g., 1000000"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="interestRate" className="block text-md">
                                    Interest Rate (% per annum)
                                </Label>
                                <Input
                                    type="number"
                                    required
                                    id="interestRate"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(e.target.value)}
                                    placeholder="e.g., 8.5"
                                    step="0.01"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="loanTenure" className="block text-md">
                                    Loan Tenure
                                </Label>
                                <div className="flex gap-4 items-end">
                                    <div className="flex-1">
                                        <Input
                                            type="number"
                                            required
                                            id="loanTenure"
                                            value={loanTenure}
                                            onChange={(e) => setLoanTenure(e.target.value)}
                                            placeholder={tenureType === "years" ? "e.g., 20" : "e.g., 240"}
                                        />
                                    </div>
                                    <div className="min-w-32">
                                        <RadioGroup
                                            value={tenureType}
                                            onValueChange={(value) => setTenureType(value as "years" | "months")}
                                            className="flex gap-4"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="years" id="years" />
                                                <Label htmlFor="years" className="text-sm">Years</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="months" id="months" />
                                                <Label htmlFor="months" className="text-sm">Months</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" className="w-full">
                                Calculate EMI
                            </Button>

                            {emi !== null && (
                                <div className="mt-6 rounded-lg bg-muted p-4 text-md text-muted-foreground">
                                    <div className="mb-4">
                                        <div className="text-center">
                                            <span className="block text-foreground text-xl font-semibold">
                                                Monthly EMI
                                            </span>
                                            <span className="text-primary text-2xl font-bold">
                                                ₹{emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <div className="flex justify-between">
                                            <span>Principal Amount:</span>
                                            <span className="font-medium text-foreground">
                                                ₹{parseFloat(loanAmount).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Total Interest:</span>
                                            <span className="font-medium text-amber-600">
                                                ₹{totalInterest?.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                                            </span>
                                        </div>
                                        <div className="flex justify-between border-t pt-2 mt-2">
                                            <span>Total Amount:</span>
                                            <span className="font-semibold text-foreground">
                                                ₹{totalAmount?.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="h-4 rounded-full bg-gray-200 overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full"
                                                style={{
                                                    width: `${(parseFloat(loanAmount) / (totalAmount || 1)) * 100}%`
                                                }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-xs mt-1">
                                            <span>Principal ({Math.round((parseFloat(loanAmount) / (totalAmount || 1)) * 100)}%)</span>
                                            <span>Interest ({Math.round((totalInterest || 0) / (totalAmount || 1) * 100)}%)</span>
                                        </div>
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