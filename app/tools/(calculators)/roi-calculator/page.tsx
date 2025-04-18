"use client"

import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/hero/hero-header";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { HelpCircle, PieChart } from "lucide-react";
import { useState } from "react";

export default function ROICalculator() {
    const [calculatorType, setCalculatorType] = useState<"basic" | "annualized">("basic");
    const [initialInvestment, setInitialInvestment] = useState("");
    const [finalValue, setFinalValue] = useState("");
    const [investmentPeriod, setInvestmentPeriod] = useState("");
    const [periodUnit, setPeriodUnit] = useState<"years" | "months">("years");
    const [includeRunningCosts, setIncludeRunningCosts] = useState<"yes" | "no">("no");
    const [runningCosts, setRunningCosts] = useState("");

    const [roi, setRoi] = useState<number | null>(null);
    const [annualizedRoi, setAnnualizedRoi] = useState<number | null>(null);
    const [netProfit, setNetProfit] = useState<number | null>(null);
    const [totalCost, setTotalCost] = useState<number | null>(null);

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();

        const initial = parseFloat(initialInvestment);
        const final = parseFloat(finalValue);
        let runningCostsValue = 0;

        if (includeRunningCosts === "yes") {
            runningCostsValue = parseFloat(runningCosts) || 0;
        }

        if (!isNaN(initial) && !isNaN(final)) {
            const totalInvestmentCost = initial + runningCostsValue;
            const profit = final - totalInvestmentCost;
            const calculatedRoi = (profit / totalInvestmentCost) * 100;

            setRoi(calculatedRoi);
            setNetProfit(profit);
            setTotalCost(totalInvestmentCost);

            // Calculate annualized ROI if period is provided
            if (calculatorType === "annualized" && !isNaN(parseFloat(investmentPeriod))) {
                const period = parseFloat(investmentPeriod);
                let periodInYears = period;

                if (periodUnit === "months") {
                    periodInYears = period / 12;
                }

                if (periodInYears > 0) {
                    // Annualized ROI formula: (1 + ROI)^(1/n) - 1
                    const annualizedRoiValue = (Math.pow((final / totalInvestmentCost), (1 / periodInYears)) - 1) * 100;
                    setAnnualizedRoi(annualizedRoiValue);
                }
            } else {
                setAnnualizedRoi(null);
            }
        }
    };

    return (
        <>
            <HeroHeader />

            <div className="relative py-16 md:py-32 bg-background">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="mx-auto max-w-3xl text-center mb-16">
                        <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl">
                            Return on Investment (ROI) Calculator
                        </h2>
                        <p className="text-muted-foreground mt-6">Instantly find out how much you're gaining with our easy-to-use ROI Calculator.</p>
                    </div>

                    <form
                        onSubmit={handleCalculate}
                        className="bg-card m-auto h-fit w-full max-w-md rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
                    >
                        <div className="p-8 pb-6 space-y-6">
                            <Tabs
                                defaultValue="basic"
                                value={calculatorType}
                                onValueChange={(value) => setCalculatorType(value as "basic" | "annualized")}
                                className="w-full"
                            >
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="basic">Basic ROI</TabsTrigger>
                                    <TabsTrigger value="annualized">Annualized ROI</TabsTrigger>
                                </TabsList>
                            </Tabs>

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
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="finalValue" className="block text-md">
                                        Final Value (₹)
                                    </Label>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="w-[200px] text-sm">
                                                    The total value of your investment after the investment period,
                                                    including the original investment amount.
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <Input
                                    type="number"
                                    required
                                    id="finalValue"
                                    value={finalValue}
                                    onChange={(e) => setFinalValue(e.target.value)}
                                    placeholder="e.g., 150000"
                                />
                            </div>

                            {calculatorType === "annualized" && (
                                <div className="space-y-2">
                                    <Label htmlFor="investmentPeriod" className="block text-md">
                                        Investment Period
                                    </Label>
                                    <div className="flex gap-4 items-end">
                                        <div className="flex-1">
                                            <Input
                                                type="number"
                                                required
                                                id="investmentPeriod"
                                                value={investmentPeriod}
                                                onChange={(e) => setInvestmentPeriod(e.target.value)}
                                                placeholder="e.g., 3"
                                                min="0.1"
                                                step="0.1"
                                            />
                                        </div>
                                        <div className="min-w-32">
                                            <RadioGroup
                                                value={periodUnit}
                                                onValueChange={(value) => setPeriodUnit(value as "years" | "months")}
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
                            )}

                            <div className="space-y-2">
                                <Label className="block text-md">Include Running Costs/Additional Investments?</Label>
                                <RadioGroup
                                    value={includeRunningCosts}
                                    onValueChange={(value) => setIncludeRunningCosts(value as "yes" | "no")}
                                    className="flex gap-6"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="includeYes" />
                                        <Label htmlFor="includeYes" className="text-md">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="includeNo" />
                                        <Label htmlFor="includeNo" className="text-md">No</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {includeRunningCosts === "yes" && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="runningCosts" className="block text-md">
                                            Running Costs/Additional Investments (₹)
                                        </Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="w-[200px] text-sm">
                                                        Include any additional costs for maintaining the investment
                                                        or additional amounts invested during the period.
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        type="number"
                                        id="runningCosts"
                                        value={runningCosts}
                                        onChange={(e) => setRunningCosts(e.target.value)}
                                        placeholder="e.g., 10000"
                                    />
                                </div>
                            )}

                            <Button type="submit" className="w-full">
                                Calculate ROI
                            </Button>

                            {roi !== null && (
                                <div className="mt-6 rounded-lg bg-muted p-4 text-md text-muted-foreground">
                                    <div className="text-center mb-4">
                                        <span className="block text-foreground text-xl font-semibold">
                                            {calculatorType === "basic" ? "Return on Investment" : "Annualized ROI"}
                                        </span>
                                        <span className={`text-2xl font-bold ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {calculatorType === "basic" || annualizedRoi === null
                                                ? `${roi.toFixed(2)}%`
                                                : `${annualizedRoi.toFixed(2)}%`
                                            }
                                        </span>
                                        {calculatorType === "annualized" && annualizedRoi !== null && (
                                            <span className="block text-sm mt-1">
                                                (Total ROI: {roi.toFixed(2)}%)
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col space-y-2 border-t pt-2">
                                        <div className="flex justify-between">
                                            <span>Initial Investment:</span>
                                            <span className="font-medium text-foreground">
                                                ₹{parseFloat(initialInvestment).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                                            </span>
                                        </div>
                                        {includeRunningCosts === "yes" && runningCosts && (
                                            <div className="flex justify-between">
                                                <span>Running Costs:</span>
                                                <span className="font-medium text-foreground">
                                                    ₹{parseFloat(runningCosts).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span>Total Investment:</span>
                                            <span className="font-medium text-foreground">
                                                ₹{totalCost?.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Final Value:</span>
                                            <span className="font-medium text-foreground">
                                                ₹{parseFloat(finalValue).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Net Profit/Loss:</span>
                                            <span className={`font-medium ${netProfit && netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                ₹{netProfit?.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                                            </span>
                                        </div>
                                    </div>

                                    {/* ROI Visualization */}
                                    {roi !== null && (
                                        <div className="mt-4 pt-2 border-t">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-md font-medium text-foreground">ROI Breakdown</h4>
                                                <PieChart className="h-4 w-4 text-muted-foreground" />
                                            </div>

                                            <div className="h-4 rounded-full bg-gray-200 overflow-hidden">
                                                <div
                                                    className={`h-full ${netProfit && netProfit >= 0 ? 'bg-green-600' : 'bg-red-600'}`}
                                                    style={{
                                                        width: `${Math.min(Math.abs(roi), 100)}%`,
                                                        marginLeft: netProfit && netProfit >= 0 ? '0' : 'auto',
                                                        marginRight: netProfit && netProfit >= 0 ? 'auto' : '0'
                                                    }}
                                                />
                                            </div>

                                            <div className="flex justify-between text-xs mt-1">
                                                <span>Investment</span>
                                                <span>{Math.abs(roi).toFixed(2)}% {netProfit && netProfit >= 0 ? 'Return' : 'Loss'}</span>
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