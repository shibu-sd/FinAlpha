"use client"

import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { schemeCodes } from '../../../../lib/mutual-fund-map';
import { Card } from '@/components/ui/card';
import { Search, X, Calculator, TrendingUp, TrendingDown, IndianRupee, Calendar as CalendarIcon } from 'lucide-react';
import FooterSection from '@/components/footer';
import { HeroHeader } from '@/components/hero/hero-header';
import Calendar13 from '@/components/calendar-13';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, parseISO, addMonths, startOfMonth, isAfter, isBefore, addDays } from 'date-fns';
import { cn } from '@/lib/utils';

type SchemeCodesType = Record<string, number>;

interface FundData {
    date: string;
    nav: string;
}

interface FundMeta {
    fund_house: string;
    scheme_type: string;
    scheme_category: string;
    scheme_code: number;
    scheme_name: string;
}

interface FundResponse {
    meta: FundMeta;
    data: FundData[];
}

interface SelectedFund {
    schemeName: string;
    schemeCode: number;
    investmentAmount: string;
    swpAmount: string;
    data?: FundResponse;
    isLoading: boolean;
}

interface SWPResult {
    fundName: string;
    initialUnits: number;
    totalWithdrawn: number;
    remainingUnits: number;
    finalValue: number;
    totalWithdrawals: number;
}

interface PortfolioResult {
    totalInitialInvestment: number;
    totalAmountWithdrawn: number;
    totalFinalPortfolioValue: number;
    overallGainLoss: number;
    overallGainLossPercentage: number;
    fundResults: SWPResult[];
}

export default function SWPBasketBacktest() {
    const [searchTerms, setSearchTerms] = useState<string[]>(["", "", "", ""]);
    const [searchResults, setSearchResults] = useState<Record<number, string[]>>({});
    const [selectedFunds, setSelectedFunds] = useState<(SelectedFund | null)[]>([null, null, null, null]);
    const [investmentDate, setInvestmentDate] = useState<Date | undefined>(undefined);
    const [swpStartDate, setSwpStartDate] = useState<Date | undefined>(undefined);
    const [swpEndDate, setSwpEndDate] = useState<Date | undefined>(undefined);
    const [investmentAmounts, setInvestmentAmounts] = useState<string[]>(["", "", "", ""]);
    const [swpAmounts, setSwpAmounts] = useState<string[]>(["", "", "", ""]);
    const [isCalculating, setIsCalculating] = useState(false);
    const [result, setResult] = useState<PortfolioResult | null>(null);

    const typedSchemeCodes = schemeCodes as SchemeCodesType;

    // Get today's date for validation
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Set to end of day to allow today itself

    const getSearchResults = (searchTerm: string, index: number) => {
        if (!searchTerm || searchTerm.length < 3) {
            setSearchResults(prev => ({ ...prev, [index]: [] }));
            return;
        }

        const results = Object.entries(typedSchemeCodes)
            .filter(([name]) => name.toLowerCase().includes(searchTerm.toLowerCase()))
            .slice(0, 5)
            .map(([name]) => name);

        setSearchResults(prev => ({ ...prev, [index]: results }));
    };

    const handleSearchChange = (value: string, index: number) => {
        const newSearchTerms = [...searchTerms];
        newSearchTerms[index] = value;
        setSearchTerms(newSearchTerms);
        getSearchResults(value, index);
    };

    const selectFund = async (schemeName: string, index: number) => {
        const schemeCode = typedSchemeCodes[schemeName];

        // Clear search results and terms
        setSearchResults(prev => ({ ...prev, [index]: [] }));
        const newSearchTerms = [...searchTerms];
        newSearchTerms[index] = "";
        setSearchTerms(newSearchTerms);

        // Check if fund is already selected
        if (selectedFunds.some(fund => fund && fund.schemeCode === schemeCode)) {
            return;
        }

        const newFund: SelectedFund = {
            schemeName,
            schemeCode,
            investmentAmount: investmentAmounts[index] || "",
            swpAmount: swpAmounts[index] || "",
            isLoading: true
        };

        // Update the selected funds array
        const updatedFunds = [...selectedFunds];
        updatedFunds[index] = newFund;
        setSelectedFunds(updatedFunds);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_MUTUAL_FUND_API_BASE_URL}/${schemeCode}`);
            const data: FundResponse = await response.json();

            // FIX 4: Sort the data by date (newest first) before saving
            const sortedData = {
                ...data,
                data: data.data.sort((a, b) => {
                    const dateA = parseDate(a.date);
                    const dateB = parseDate(b.date);
                    return dateB.getTime() - dateA.getTime(); // Newest first
                })
            };

            // Update the fund with fetched and sorted data
            setSelectedFunds(current =>
                current.map((fund, idx) =>
                    idx === index && fund
                        ? { ...fund, data: sortedData, isLoading: false }
                        : fund
                )
            );
        } catch (error) {
            console.error("Error fetching fund data:", error);
            setSelectedFunds(current =>
                current.map((fund, idx) =>
                    idx === index && fund
                        ? { ...fund, isLoading: false }
                        : fund
                )
            );
        }
    };

    const removeFund = (index: number) => {
        // FIX 2: Clear state for specific index without shuffling
        const updatedFunds = [...selectedFunds];
        const updatedInvestmentAmounts = [...investmentAmounts];
        const updatedSwpAmounts = [...swpAmounts];
        const updatedSearchTerms = [...searchTerms];

        updatedFunds[index] = null;
        updatedInvestmentAmounts[index] = "";
        updatedSwpAmounts[index] = "";
        updatedSearchTerms[index] = "";

        setSelectedFunds(updatedFunds);
        setInvestmentAmounts(updatedInvestmentAmounts);
        setSwpAmounts(updatedSwpAmounts);
        setSearchTerms(updatedSearchTerms);
    };

    const handleInvestmentAmountChange = (value: string, index: number) => {
        const newAmounts = [...investmentAmounts];
        newAmounts[index] = value;
        setInvestmentAmounts(newAmounts);

        // Update the fund object if it exists
        if (selectedFunds[index]) {
            const updatedFunds = [...selectedFunds];
            updatedFunds[index] = { ...updatedFunds[index]!, investmentAmount: value };
            setSelectedFunds(updatedFunds);
        }
    };

    const handleSwpAmountChange = (value: string, index: number) => {
        const newAmounts = [...swpAmounts];
        newAmounts[index] = value;
        setSwpAmounts(newAmounts);

        // Update the fund object if it exists
        if (selectedFunds[index]) {
            const updatedFunds = [...selectedFunds];
            updatedFunds[index] = { ...updatedFunds[index]!, swpAmount: value };
            setSelectedFunds(updatedFunds);
        }
    };

    const parseDate = (dateStr: string): Date => {
        const [day, month, year] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Validation functions to prevent future dates
    const validateDates = () => {
        const now = new Date();

        if (investmentDate && isAfter(investmentDate, now)) {
            alert('Investment Date cannot be in the future');
            setInvestmentDate(undefined);
            return false;
        }

        if (swpStartDate && isAfter(swpStartDate, now)) {
            alert('SWP Start Date cannot be in the future');
            setSwpStartDate(undefined);
            return false;
        }

        if (swpEndDate && isAfter(swpEndDate, now)) {
            alert('SWP End Date cannot be in the future');
            setSwpEndDate(undefined);
            return false;
        }

        return true;
    };

    const calculateSWP = async () => {
        if (!investmentDate || !swpStartDate || !swpEndDate) {
            alert('Please select all dates');
            return;
        }

        // Validate dates are not in the future
        if (!validateDates()) {
            return;
        }

        if (isAfter(swpStartDate, swpEndDate)) {
            alert('SWP Start Date must be before SWP End Date');
            return;
        }

        const validFunds = selectedFunds.filter(fund => fund && fund.data && investmentAmounts[selectedFunds.indexOf(fund)]);

        if (validFunds.length === 0) {
            alert('Please select at least one fund and provide investment amounts');
            return;
        }

        setIsCalculating(true);
        setResult(null);

        try {
            const fundResults: SWPResult[] = [];
            // FIX 5: Initialize totalInitialInvestment before the loop
            let totalInitialInvestment = 0;

            for (let i = 0; i < selectedFunds.length; i++) {
                const fund = selectedFunds[i];
                if (!fund || !fund.data || !investmentAmounts[i]) continue;

                const investmentAmount = parseFloat(investmentAmounts[i]);
                const swpAmount = parseFloat(swpAmounts[i]) || 0;

                if (investmentAmount <= 0) continue;

                // FIX 5: Add to totalInitialInvestment in the loop
                totalInitialInvestment += investmentAmount;

                const navData = fund.data.data;

                // Find NAV on investment date
                const investmentNav = navData.find(item => {
                    const itemDate = parseDate(item.date);
                    return itemDate <= investmentDate!;
                }) || navData[navData.length - 1]; // Fallback to oldest available

                if (!investmentNav) {
                    console.error("No investment NAV found for fund:", fund.schemeName);
                    continue;
                }

                const initialUnits = investmentAmount / parseFloat(investmentNav.nav);
                let remainingUnits = initialUnits;
                let totalWithdrawn = 0;
                let totalWithdrawals = 0;

                // Process SWP from start date to end date
                let currentDate = startOfMonth(swpStartDate!);

                while (currentDate <= swpEndDate!) {
                    // Find NAV for current withdrawal date
                    const withdrawalNav = navData.find(item => {
                        const itemDate = parseDate(item.date);
                        return itemDate <= currentDate;
                    }) || navData[navData.length - 1]; // Fallback to oldest available

                    if (!withdrawalNav) {
                        console.error("No withdrawal NAV found for date:", currentDate);
                        currentDate = addMonths(currentDate, 1);
                        continue;
                    }

                    if (swpAmount > 0) {
                        const currentNAV = parseFloat(withdrawalNav.nav);
                        const unitsNeededForFullSWP = swpAmount / currentNAV;

                        // FIX 1: Correct the withdrawal logic
                        if (remainingUnits >= unitsNeededForFullSWP) {
                            // Enough units for full withdrawal
                            remainingUnits -= unitsNeededForFullSWP;
                            totalWithdrawn += swpAmount;
                            totalWithdrawals++;
                        } else {
                            // Insufficient units - withdraw what's available
                            const actualWithdrawnAmount = remainingUnits * currentNAV;
                            totalWithdrawn += actualWithdrawnAmount;
                            remainingUnits = 0;
                            totalWithdrawals++;

                            // FIX 1: Break out of the loop as this fund is now empty
                            break;
                        }
                    }

                    currentDate = addMonths(currentDate, 1);
                }

                // Calculate final value using latest NAV
                if (navData.length === 0) {
                    console.error("No NAV data available for fund:", fund.schemeName);
                    continue;
                }
                const latestNav = parseFloat(navData[0].nav);
                const finalValue = remainingUnits * latestNav;

                fundResults.push({
                    fundName: fund.schemeName,
                    initialUnits,
                    totalWithdrawn,
                    remainingUnits,
                    finalValue,
                    totalWithdrawals
                });
            }

            // Calculate portfolio summary
            const totalAmountWithdrawn = fundResults.reduce((sum, result) => sum + result.totalWithdrawn, 0);
            const totalFinalPortfolioValue = fundResults.reduce((sum, result) => sum + result.finalValue, 0);
            const overallGainLoss = totalFinalPortfolioValue + totalAmountWithdrawn - totalInitialInvestment;
            const overallGainLossPercentage = (overallGainLoss / totalInitialInvestment) * 100;

            setResult({
                totalInitialInvestment,
                totalAmountWithdrawn,
                totalFinalPortfolioValue,
                overallGainLoss,
                overallGainLossPercentage,
                fundResults
            });

        } catch (error) {
            console.error('Error calculating SWP:', error);
            alert('An error occurred while calculating. Please try again.');
        } finally {
            setIsCalculating(false);
        }
    };

    // FIX 3: Check for truthiness instead of !== undefined
    const isSearchDisabled = (index: number): boolean => {
        return !!selectedFunds[index];
    };

    return (
        <>
            <HeroHeader />

            <div className="py-16 md:py-32 bg-background">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mx-auto max-w-3xl text-center mb-16">
                        <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl">
                            SWP Basket Backtest
                        </h2>
                        <p className="text-muted-foreground mt-6">
                            Simulate systematic withdrawals from a basket of mutual funds to analyze your retirement income strategy.
                        </p>
                    </div>

                    {/* Portfolio-Level Inputs */}
                    <Card className="p-6 mb-8">
                        <h3 className="text-xl font-semibold mb-6">Portfolio Settings</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Investment Date</label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !investmentDate && "text-muted-foreground/40"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {investmentDate ? format(investmentDate, "PPP") : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar13
                                            selected={investmentDate}
                                            onSelect={(date) => {
                                                if (date && isAfter(date, today)) {
                                                    alert('Investment Date cannot be in the future');
                                                    return;
                                                }
                                                setInvestmentDate(date);
                                            }}
                                            disabled={(date) => isAfter(date, today)}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">SWP Start Date</label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !swpStartDate && "text-muted-foreground/40"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {swpStartDate ? format(swpStartDate, "PPP") : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar13
                                            selected={swpStartDate}
                                            onSelect={(date) => {
                                                if (date && isAfter(date, today)) {
                                                    alert('SWP Start Date cannot be in the future');
                                                    return;
                                                }
                                                setSwpStartDate(date);
                                            }}
                                            disabled={(date) => isAfter(date, today)}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">SWP End Date</label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !swpEndDate && "text-muted-foreground/40"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {swpEndDate ? format(swpEndDate, "PPP") : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar13
                                            selected={swpEndDate}
                                            onSelect={(date) => {
                                                if (date && isAfter(date, today)) {
                                                    alert('SWP End Date cannot be in the future');
                                                    return;
                                                }
                                                setSwpEndDate(date);
                                            }}
                                            disabled={(date) => isAfter(date, today)}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </Card>

                    {/* Fund Selection Section */}
                    <Card className="p-6 mb-8">
                        <h3 className="text-xl font-semibold mb-6">Select Funds (Up to 4)</h3>
                        <div className="grid gap-6 md:grid-cols-2">
                            {[0, 1, 2, 3].map((index) => {
                                const fund = selectedFunds[index];
                                const placeholderText = fund
                                    ? (fund.schemeName.length > 40 ? fund.schemeName.substring(0, 40) + "..." : fund.schemeName)
                                    : `Search mutual fund ${index + 1}`;

                                return (
                                    <div key={index} className="space-y-4 p-4 border rounded-lg">
                                        <div className="relative">
                                            <div className="flex items-center">
                                                <Input
                                                    placeholder={placeholderText}
                                                value={searchTerms[index]}
                                                onChange={(e) => handleSearchChange(e.target.value, index)}
                                                className="pr-10"
                                                disabled={isSearchDisabled(index)}
                                            />
                                            {isSearchDisabled(index) ? (
                                                <button
                                                    className="absolute right-3 text-muted-foreground hover:text-foreground"
                                                    onClick={() => removeFund(index)}
                                                >
                                                    <X className="h-5 w-5" />
                                                </button>
                                            ) : (
                                                <Search className="absolute right-3 h-5 w-5 text-muted-foreground" />
                                            )}
                                        </div>

                                        {searchResults[index] && searchResults[index].length > 0 && !isSearchDisabled(index) && (
                                            <div className="absolute z-10 mt-1 w-full bg-card rounded-md shadow-lg border">
                                                <ul className="py-1 max-h-60 overflow-auto">
                                                    {searchResults[index]!.map((schemeName) => (
                                                        <li
                                                            key={schemeName}
                                                            className="px-4 py-2 hover:bg-accent cursor-pointer text-sm"
                                                            onClick={() => selectFund(schemeName, index)}
                                                        >
                                                            {schemeName.length > 60 ? `${schemeName.substring(0, 60)}...` : schemeName}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Investment Amount (₹)</label>
                                            <Input
                                                type="number"
                                                placeholder="100000"
                                                value={investmentAmounts[index]}
                                                onChange={(e) => handleInvestmentAmountChange(e.target.value, index)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Monthly SWP (₹)</label>
                                            <Input
                                                type="number"
                                                placeholder="5000"
                                                value={swpAmounts[index]}
                                                onChange={(e) => handleSwpAmountChange(e.target.value, index)}
                                            />
                                        </div>
                                    </div>

                                    {selectedFunds[index]?.isLoading && (
                                        <div className="text-center text-sm text-muted-foreground">
                                            Loading fund data...
                                        </div>
                                    )}
                                </div>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Calculate Button */}
                    <div className="text-center mb-8">
                        <Button
                            onClick={calculateSWP}
                            disabled={isCalculating || !investmentDate || !swpStartDate || !swpEndDate}
                            className="px-8 py-3 text-lg"
                        >
                            {isCalculating ? (
                                <>
                                    <Calculator className="mr-2 h-5 w-5 animate-spin" />
                                    Calculating...
                                </>
                            ) : (
                                <>
                                    <Calculator className="mr-2 h-5 w-5" />
                                    Calculate
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Results Section */}
                    {result && (
                        <Card className="p-6 mb-8">
                            <h3 className="text-2xl font-semibold mb-6">Consolidated Summary</h3>

                            {/* Portfolio Summary */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <div className="text-center p-4 bg-muted rounded-lg">
                                    <div className="text-sm text-muted-foreground mb-1">Total Initial Investment</div>
                                    <div className="text-xl font-bold text-foreground">
                                        {formatCurrency(result.totalInitialInvestment)}
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-muted rounded-lg">
                                    <div className="text-sm text-muted-foreground mb-1">Total Amount Withdrawn</div>
                                    <div className="text-xl font-bold text-blue-600">
                                        {formatCurrency(result.totalAmountWithdrawn)}
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-muted rounded-lg">
                                    <div className="text-sm text-muted-foreground mb-1">Final Portfolio Value</div>
                                    <div className="text-xl font-bold text-foreground">
                                        {formatCurrency(result.totalFinalPortfolioValue)}
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-muted rounded-lg">
                                    <div className="text-sm text-muted-foreground mb-1">Overall Gain/Loss</div>
                                    <div className={`text-xl font-bold flex items-center justify-center gap-1 ${
                                        result.overallGainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {result.overallGainLoss >= 0 ? (
                                            <TrendingUp className="h-5 w-5" />
                                        ) : (
                                            <TrendingDown className="h-5 w-5" />
                                        )}
                                        {formatCurrency(Math.abs(result.overallGainLoss))}
                                        <span className="text-sm">({result.overallGainLossPercentage.toFixed(2)}%)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Individual Fund Results */}
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Individual Fund Performance</h4>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left p-3">Fund Name</th>
                                                <th className="text-right p-3">Initial Investment</th>
                                                <th className="text-right p-3">Total Withdrawn</th>
                                                <th className="text-right p-3">Final Value</th>
                                                <th className="text-right p-3">Withdrawals</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result.fundResults.map((fundResult, index) => {
                                                const fundIndex = selectedFunds.findIndex(f => f && f.schemeName === fundResult.fundName);
                                                const initialInvestment = parseFloat(investmentAmounts[fundIndex] || "0");

                                                return (
                                                    <tr key={index} className="border-b hover:bg-muted/50">
                                                        <td className="p-3">
                                                            <div className="max-w-xs truncate" title={fundResult.fundName}>
                                                                {fundResult.fundName}
                                                            </div>
                                                        </td>
                                                        <td className="text-right p-3">{formatCurrency(initialInvestment)}</td>
                                                        <td className="text-right p-3">{formatCurrency(fundResult.totalWithdrawn)}</td>
                                                        <td className="text-right p-3">{formatCurrency(fundResult.finalValue)}</td>
                                                        <td className="text-right p-3">{fundResult.totalWithdrawals}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </div>

            <FooterSection />
        </>
    );
}