"use client"

import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/hero/hero-header";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";

export default function NPVCalculator() {
    const [initialInvestment, setInitialInvestment] = useState("");
    const [discountRate, setDiscountRate] = useState("");
    const [cashFlows, setCashFlows] = useState([{ year: 1, amount: "" }]);
    const [calculationMethod, setCalculationMethod] = useState<"manual" | "fixed">("manual");
    const [fixedCashFlowAmount, setFixedCashFlowAmount] = useState("");
    const [projectDuration, setProjectDuration] = useState("");

    const [npvResult, setNpvResult] = useState<number | null>(null);
    const [irr, setIrr] = useState<number | null>(null);
    const [paybackPeriod, setPaybackPeriod] = useState<number | null>(null);
    const [cashFlowDetails, setCashFlowDetails] = useState<Array<{
        year: number;
        cashFlow: number;
        discountFactor: number;
        presentValue: number;
        cumulativePV: number;
    }> | null>(null);

    const handleAddCashFlow = () => {
        setCashFlows([...cashFlows, { year: cashFlows.length + 1, amount: "" }]);
    };

    const handleRemoveCashFlow = (index: number) => {
        if (cashFlows.length > 1) {
            const newCashFlows = cashFlows.filter((_, i) => i !== index);
            const renumberedCashFlows = newCashFlows.map((cf, i) => ({ ...cf, year: i + 1 }));
            setCashFlows(renumberedCashFlows);
        }
    };

    const handleCashFlowChange = (index: number, value: string) => {
        const newCashFlows = [...cashFlows];
        newCashFlows[index].amount = value;
        setCashFlows(newCashFlows);
    };

    const calculateNPV = (e: React.FormEvent) => {
        e.preventDefault();

        const initialInv = parseFloat(initialInvestment);
        const rate = parseFloat(discountRate) / 100;

        if (isNaN(initialInv) || isNaN(rate)) {
            return;
        }

        let effectiveCashFlows: number[] = [];

        if (calculationMethod === "manual") {
            effectiveCashFlows = cashFlows.map(cf => parseFloat(cf.amount) || 0);
        } else {
            const fixedAmount = parseFloat(fixedCashFlowAmount);
            const duration = parseInt(projectDuration);

            if (isNaN(fixedAmount) || isNaN(duration)) {
                return;
            }

            effectiveCashFlows = Array(duration).fill(fixedAmount);
        }

        const details: Array<{
            year: number;
            cashFlow: number;
            discountFactor: number;
            presentValue: number;
            cumulativePV: number;
        }> = [];

        let cumulativePV = -initialInv;
        let payback: number | null = null;
        let npv = -initialInv;

        const calculateIRR = (cashFlows: number[], initialInvestment: number): number | null => {
            const npvAtRate = (rate: number): number => {
                return -initialInvestment + cashFlows.reduce((sum, cf, index) =>
                    sum + cf / Math.pow(1 + rate, index + 1), 0);
            };

            let lowerRate = -0.99;
            let upperRate = 1;

            while (npvAtRate(upperRate) > 0) {
                upperRate *= 2;
                if (upperRate > 100) return null;
            }

            // Binary search
            for (let i = 0; i < 20; i++) {
                const midRate = (lowerRate + upperRate) / 2;
                const npvAtMid = npvAtRate(midRate);

                if (Math.abs(npvAtMid) < 0.1) {
                    return midRate;
                }

                if (npvAtMid > 0) {
                    lowerRate = midRate;
                } else {
                    upperRate = midRate;
                }
            }

            return (lowerRate + upperRate) / 2; // Return best approximation
        };

        // Process each cash flow
        effectiveCashFlows.forEach((cf, index) => {
            const year = index + 1;
            const discountFactor = 1 / Math.pow(1 + rate, year);
            const presentValue = cf * discountFactor;

            npv += presentValue;
            cumulativePV += presentValue;

            if (payback === null && cumulativePV >= 0) {
                const previousCumPV = index > 0 ? details[index - 1].cumulativePV : -initialInv;
                if (previousCumPV < 0) {
                    const fraction = Math.abs(previousCumPV) / (Math.abs(previousCumPV) + cumulativePV);
                    payback = year - 1 + fraction;
                } else {
                    payback = year;
                }
            }

            details.push({
                year,
                cashFlow: cf,
                discountFactor,
                presentValue,
                cumulativePV
            });
        });

        const irrValue = calculateIRR(effectiveCashFlows, initialInv);

        setNpvResult(npv);
        setIrr(irrValue !== null ? irrValue * 100 : null);
        setPaybackPeriod(payback);
        setCashFlowDetails(details);
    };

    return (
        <>
            <HeroHeader />

            <div className="relative py-16 md:py-32 bg-background">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="mx-auto max-w-3xl text-center mb-16">
                        <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl">
                            Net Present Value (NPV) Calculator
                        </h2>
                        <p className="text-muted-foreground mt-6">Make better investment decisions by instantly computing Net Present Value with ease.</p>
                    </div>

                    <form
                        onSubmit={calculateNPV}
                        className="bg-card m-auto h-fit w-full max-w-md rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
                    >
                        <div className="p-8 pb-6 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="initialInvestment" className="block text-md">
                                    Initial Investment (₹)
                                </Label>
                                <Input
                                    type="number"
                                    required
                                    id="initialInvestment"
                                    value={initialInvestment}
                                    onChange={(e) => setInitialInvestment(e.target.value)}
                                    placeholder="e.g., 100000"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="discountRate" className="block text-md">
                                    Discount Rate (% per annum)
                                </Label>
                                <Input
                                    type="number"
                                    required
                                    id="discountRate"
                                    value={discountRate}
                                    onChange={(e) => setDiscountRate(e.target.value)}
                                    placeholder="e.g., 10"
                                    step="0.01"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="block text-md">Cash Flow Entry Method</Label>
                                <RadioGroup
                                    value={calculationMethod}
                                    onValueChange={(value) => setCalculationMethod(value as "manual" | "fixed")}
                                    className="flex gap-6"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="manual" id="manual" />
                                        <Label htmlFor="manual" className="text-md">Manual Entry</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="fixed" id="fixed" />
                                        <Label htmlFor="fixed" className="text-md">Fixed Amount</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {calculationMethod === "manual" ? (
                                <div className="space-y-4">
                                    <Label className="block text-md">Cash Flows</Label>
                                    {cashFlows.map((cf, index) => (
                                        <div key={index} className="flex gap-2 items-center">
                                            <div className="w-12 text-md">Year {cf.year}</div>
                                            <Input
                                                type="number"
                                                value={cf.amount}
                                                onChange={(e) => handleCashFlowChange(index, e.target.value)}
                                                placeholder="Amount"
                                                className="flex-1"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleRemoveCashFlow(index)}
                                                className="h-8 w-8"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleAddCashFlow}
                                        className="w-full mt-2"
                                    >
                                        <PlusCircle className="mr-2 h-4 w-4" /> Add Year
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="fixedCashFlowAmount" className="block text-md">
                                            Annual Cash Flow (₹)
                                        </Label>
                                        <Input
                                            type="number"
                                            required
                                            id="fixedCashFlowAmount"
                                            value={fixedCashFlowAmount}
                                            onChange={(e) => setFixedCashFlowAmount(e.target.value)}
                                            placeholder="e.g., 25000"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="projectDuration" className="block text-md">
                                            Project Duration (Years)
                                        </Label>
                                        <Input
                                            type="number"
                                            required
                                            id="projectDuration"
                                            value={projectDuration}
                                            onChange={(e) => setProjectDuration(e.target.value)}
                                            placeholder="e.g., 5"
                                        />
                                    </div>
                                </div>
                            )}

                            <Button type="submit" className="w-full">
                                Calculate NPV
                            </Button>

                            {npvResult !== null && (
                                <div className="mt-6 rounded-lg bg-muted p-4 text-md text-muted-foreground">
                                    <div className="text-center mb-4">
                                        <span className="block text-foreground text-xl font-semibold">
                                            Net Present Value
                                        </span>
                                        <span className={`text-2xl font-bold ${npvResult >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            ₹{npvResult.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                                        </span>
                                        <span className="block mt-1 text-sm">
                                            {npvResult >= 0
                                                ? "This investment appears to be financially viable."
                                                : "This investment may not be financially viable."}
                                        </span>
                                    </div>

                                    <div className="flex flex-col space-y-2 border-t pt-2">
                                        <div className="flex justify-between">
                                            <span>Initial Investment:</span>
                                            <span className="font-medium text-foreground">
                                                ₹{parseFloat(initialInvestment).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                                            </span>
                                        </div>
                                        {irr !== null && (
                                            <div className="flex justify-between">
                                                <span>Internal Rate of Return (IRR):</span>
                                                <span className={`font-medium ${irr >= parseFloat(discountRate) ? 'text-green-600' : 'text-amber-600'}`}>
                                                    {irr.toFixed(2)}%
                                                </span>
                                            </div>
                                        )}
                                        {paybackPeriod !== null && (
                                            <div className="flex justify-between">
                                                <span>Payback Period:</span>
                                                <span className="font-medium text-foreground">
                                                    {paybackPeriod.toFixed(2)} years
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {cashFlowDetails && (
                                        <div className="mt-4 pt-2 border-t">
                                            <h4 className="text-md font-medium text-foreground mb-2">Cash Flow Details</h4>
                                            <div className="overflow-x-auto">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Year</TableHead>
                                                            <TableHead>Cash Flow</TableHead>
                                                            <TableHead>Present Value</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>0</TableCell>
                                                            <TableCell className="text-red-600">-₹{parseFloat(initialInvestment).toLocaleString("en-IN", { maximumFractionDigits: 0 })}</TableCell>
                                                            <TableCell className="text-red-600">-₹{parseFloat(initialInvestment).toLocaleString("en-IN", { maximumFractionDigits: 0 })}</TableCell>
                                                        </TableRow>
                                                        {cashFlowDetails.map((detail, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell>{detail.year}</TableCell>
                                                                <TableCell>₹{detail.cashFlow.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</TableCell>
                                                                <TableCell>₹{detail.presentValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                    )}
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