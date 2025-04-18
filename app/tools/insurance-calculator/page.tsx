"use client"

import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/hero/hero-header";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from "react";

export default function InsuranceCalculator() {
    const [calculatorType, setCalculatorType] = useState<"term" | "health">("term");
    const [age, setAge] = useState("");
    const [coverAmount, setCoverAmount] = useState("");
    const [coverageTerm, setCoverageTerm] = useState("");
    const [gender, setGender] = useState<"male" | "female">("male");
    const [smokingStatus, setSmokingStatus] = useState<"non-smoker" | "smoker">("non-smoker");
    const [familySize, setFamilySize] = useState("1");
    const [preExistingConditions, setPreExistingConditions] = useState<"none" | "minor" | "major">("none");

    const [premium, setPremium] = useState<number | null>(null);
    const [recommendedCover, setRecommendedCover] = useState<number | null>(null);

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();

        if (calculatorType === "term") {
            calculateTermInsurance();
        } else {
            calculateHealthInsurance();
        }
    };

    const calculateTermInsurance = () => {
        const ageNum = parseInt(age);
        const coverAmountNum = parseFloat(coverAmount);
        const coverageTermNum = parseInt(coverageTerm);

        if (!isNaN(ageNum) && !isNaN(coverAmountNum) && !isNaN(coverageTermNum)) {
            let baseRate = 0;

            if (ageNum < 30) baseRate = 10;
            else if (ageNum < 40) baseRate = 15;
            else if (ageNum < 50) baseRate = 25;
            else if (ageNum < 60) baseRate = 45;
            else baseRate = 70;

            // Adjustments
            const genderMultiplier = gender === "female" ? 0.9 : 1; // Women typically get lower premiums
            const smokerMultiplier = smokingStatus === "smoker" ? 1.5 : 1; // Smokers pay more

            // Term length adjustment
            const termMultiplier = 1 + (coverageTermNum - 10) * 0.02; // Longer terms cost more

            // Calculate monthly premium (cover amount in lakhs * rate * adjustments)
            const coverInLakhs = coverAmountNum / 100000;
            const monthlyPremium = coverInLakhs * baseRate * genderMultiplier * smokerMultiplier * termMultiplier;

            // Recommended cover calculation (simplified: 10-15 times annual income)
            // Assuming annual income based on age for demonstration
            const estimatedAnnualIncome = ageNum * 20000; // Simple assumption
            const recommendedCoverAmount = estimatedAnnualIncome * 12;

            setPremium(monthlyPremium);
            setRecommendedCover(recommendedCoverAmount);
        }
    };

    const calculateHealthInsurance = () => {
        const ageNum = parseInt(age);
        const coverAmountNum = parseFloat(coverAmount);
        const familyMembers = parseInt(familySize);

        if (!isNaN(ageNum) && !isNaN(coverAmountNum) && !isNaN(familyMembers)) {
            let baseRate = 0;

            if (ageNum < 30) baseRate = 150;
            else if (ageNum < 45) baseRate = 200;
            else if (ageNum < 60) baseRate = 300;
            else baseRate = 500;

            // Adjustments
            const familyMultiplier = 1 + (familyMembers - 1) * 0.7; // Each additional family member adds 70% of base cost

            // Pre-existing conditions adjustment
            let conditionMultiplier = 1;
            if (preExistingConditions === "minor") conditionMultiplier = 1.2;
            if (preExistingConditions === "major") conditionMultiplier = 1.5;

            // Calculate annual premium
            const coverInLakhs = coverAmountNum / 100000;
            const annualPremium = coverInLakhs * baseRate * familyMultiplier * conditionMultiplier;
            const monthlyPremium = annualPremium / 12;

            // Recommended cover calculation
            const recommendedCoverAmount = 500000 * familyMembers;

            setPremium(monthlyPremium);
            setRecommendedCover(recommendedCoverAmount);
        }
    };

    return (
        <>
            <HeroHeader />

            <div className="relative py-16 md:py-32 bg-background">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="mx-auto max-w-3xl text-center mb-16">
                        <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl">
                            Insurance Premium Calculator
                        </h2>
                        <p className="text-muted-foreground mt-6">Quickly estimate your insurance premiums and choose the right coverage with ease.</p>
                    </div>

                    <form
                        onSubmit={handleCalculate}
                        className="bg-card m-auto h-fit w-full max-w-md rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
                    >
                        <div className="p-8 pb-6 space-y-6">
                            <div className="space-y-2">
                                <Label className="text-md">Insurance Type:</Label>
                                <RadioGroup
                                    value={calculatorType}
                                    onValueChange={(value) => setCalculatorType(value as "term" | "health")}
                                    className="flex gap-6"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="term" id="term" />
                                        <Label htmlFor="term" className="text-md">Term Life</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="health" id="health" />
                                        <Label htmlFor="health" className="text-md">Health</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="age" className="block text-md">
                                    Age (years)
                                </Label>
                                <Input
                                    type="number"
                                    required
                                    id="age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    placeholder="e.g., 35"
                                    min="18"
                                    max="70"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="coverAmount" className="block text-md">
                                    {calculatorType === "term" ? "Coverage Amount (₹)" : "Sum Insured (₹)"}
                                </Label>
                                <Input
                                    type="number"
                                    required
                                    id="coverAmount"
                                    value={coverAmount}
                                    onChange={(e) => setCoverAmount(e.target.value)}
                                    placeholder={calculatorType === "term" ? "e.g., 10000000" : "e.g., 500000"}
                                />
                            </div>

                            {calculatorType === "term" ? (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="coverageTerm" className="block text-md">
                                            Policy Term (years)
                                        </Label>
                                        <Input
                                            type="number"
                                            required
                                            id="coverageTerm"
                                            value={coverageTerm}
                                            onChange={(e) => setCoverageTerm(e.target.value)}
                                            placeholder="e.g., 30"
                                            min="5"
                                            max="40"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="block text-md">Gender</Label>
                                        <RadioGroup
                                            value={gender}
                                            onValueChange={(value) => setGender(value as "male" | "female")}
                                            className="flex gap-6"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="male" id="male" />
                                                <Label htmlFor="male" className="text-md">Male</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="female" id="female" />
                                                <Label htmlFor="female" className="text-md">Female</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="block text-md">Smoking Status</Label>
                                        <RadioGroup
                                            value={smokingStatus}
                                            onValueChange={(value) => setSmokingStatus(value as "non-smoker" | "smoker")}
                                            className="flex gap-6"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="non-smoker" id="non-smoker" />
                                                <Label htmlFor="non-smoker" className="text-md">Non-Smoker</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="smoker" id="smoker" />
                                                <Label htmlFor="smoker" className="text-md">Smoker</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="familySize" className="block text-md">
                                            Family Size
                                        </Label>
                                        <Select
                                            value={familySize}
                                            onValueChange={setFamilySize}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select family size" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1 (Self)</SelectItem>
                                                <SelectItem value="2">2 (Self + Spouse)</SelectItem>
                                                <SelectItem value="3">3 (Self + Spouse + Child)</SelectItem>
                                                <SelectItem value="4">4 (Self + Spouse + 2 Children)</SelectItem>
                                                <SelectItem value="5">5 (Self + Spouse + Children + Parent)</SelectItem>
                                                <SelectItem value="6">6+ (Joint Family)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="block text-md">Pre-existing Conditions</Label>
                                        <RadioGroup
                                            value={preExistingConditions}
                                            onValueChange={(value) => setPreExistingConditions(value as "none" | "minor" | "major")}
                                            className="space-y-1"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="none" id="none" />
                                                <Label htmlFor="none" className="text-md">None</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="minor" id="minor" />
                                                <Label htmlFor="minor" className="text-md">Minor (e.g., Hypertension)</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="major" id="major" />
                                                <Label htmlFor="major" className="text-md">Major (e.g., Diabetes)</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </>
                            )}

                            <Button type="submit" className="w-full">
                                Calculate Premium
                            </Button>

                            {premium !== null && (
                                <div className="mt-6 space-y-4 rounded-lg bg-muted p-4 text-md text-muted-foreground">
                                    <div className="text-center">
                                        <span className="block text-foreground text-lg font-medium">
                                            Estimated {calculatorType === "term" ? "Monthly" : "Monthly"} Premium
                                        </span>
                                        <span className="text-primary text-2xl font-bold">
                                            ₹{premium.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                                        </span>
                                        <span className="block text-xs mt-1">
                                            {calculatorType === "term" ? "per month" : "per month"}
                                        </span>
                                    </div>

                                    <div className="pt-2 border-t text-center">
                                        <span className="block text-foreground text-md">
                                            Recommended {calculatorType === "term" ? "Coverage" : "Sum Insured"}
                                        </span>
                                        <span className="text-primary font-semibold">
                                            ₹{recommendedCover?.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                                        </span>
                                    </div>

                                    <div className="text-xs pt-2 border-t">
                                        <p>
                                            Note: This is an estimate only. Actual premiums may vary based on
                                            {calculatorType === "term"
                                                ? " medical history, occupation, and insurer."
                                                : " hospital networks, add-ons, and specific policy benefits."}
                                        </p>
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