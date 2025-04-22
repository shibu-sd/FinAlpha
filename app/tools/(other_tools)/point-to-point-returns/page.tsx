"use client"

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { schemeCodes } from '../../../../lib/mutual-fund-map';
import { Card } from '@/components/ui/card';
import { Search, X, ArrowRightIcon } from 'lucide-react';
import FooterSection from '@/components/footer';
import { HeroHeader } from '@/components/hero/hero-header';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type SchemeCodesType = Record<string, number>;

interface FundData {
    date: string;
    nav: string;
}

interface FundMeta {
    fund_house: string;
    scheme_type: string;
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
    data?: FundResponse;
    isLoading: boolean;
}

interface ChartDataPoint {
    date: string;
    nav: number;
    formattedDate: string;
}

export default function PointToPointCalculator() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [selectedFund, setSelectedFund] = useState<SelectedFund | null>(null);
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
    const [calculateResult, setCalculateResult] = useState<{
        startNav: number;
        endNav: number;
        returns: number;
        cagr?: number;
        daysElapsed: number;
        actualStartDate: string;
        actualEndDate: string;
    } | null>(null);

    const typedSchemeCodes = schemeCodes as SchemeCodesType;

    const getSearchResults = (searchTerm: string) => {
        if (!searchTerm || searchTerm.length < 3) {
            setSearchResults([]);
            return;
        }

        const results = Object.entries(typedSchemeCodes)
            .filter(([name]) => name.toLowerCase().includes(searchTerm.toLowerCase()))
            .slice(0, 5)
            .map(([name]) => name);

        setSearchResults(results);
    };

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        getSearchResults(value);
    };

    const selectFund = async (schemeName: string) => {
        const schemeCode = typedSchemeCodes[schemeName];

        // Clear search results and terms
        setSearchResults([]);
        setSearchTerm("");
        setCalculateResult(null);
        setChartData([]);

        const newFund: SelectedFund = {
            schemeName,
            schemeCode,
            isLoading: true
        };

        setSelectedFund(newFund);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_MUTUAL_FUND_API_BASE_URL}/${schemeCode}`);
            const data: FundResponse = await response.json();

            // Update the fund with fetched data
            setSelectedFund({
                ...newFund,
                data,
                isLoading: false
            });
        } catch (error) {
            console.error("Error fetching fund data:", error);
            setSelectedFund({
                ...newFund,
                isLoading: false
            });
        }
    };

    const removeFund = () => {
        setSelectedFund(null);
        setStartDate(undefined);
        setEndDate(undefined);
        setCalculateResult(null);
        setChartData([]);
    };

    const findClosestDate = (navData: FundData[], targetDateStr: string): FundData | null => {
        const parts = targetDateStr.split('-');
        const targetDate = new Date(
            parseInt(parts[2]), // Year
            parseInt(parts[1]) - 1, // Month (0-indexed)
            parseInt(parts[0]) // Day
        );

        if (!navData.length) return null;

        // Sort data by date for binary search
        const sortedData = [...navData].sort((a, b) => {
            const dateA = parseNavDate(a.date);
            const dateB = parseNavDate(b.date);
            return dateA.getTime() - dateB.getTime();
        });

        // Find exact match first
        const exactMatch = sortedData.find(item => item.date === targetDateStr);
        if (exactMatch) return exactMatch;

        // If no exact match, find closest
        let closestItem = sortedData[0];
        let closestDiff = Math.abs(parseNavDate(closestItem.date).getTime() - targetDate.getTime());

        for (const item of sortedData) {
            const date = parseNavDate(item.date);
            const diff = Math.abs(date.getTime() - targetDate.getTime());

            if (diff < closestDiff) {
                closestDiff = diff;
                closestItem = item;
            }
        }

        return closestItem;
    };

    const parseNavDate = (dateStr: string): Date => {
        const parts = dateStr.split('-');
        return new Date(
            parseInt(parts[2]), // Year
            parseInt(parts[1]) - 1, // Month (0-indexed)
            parseInt(parts[0]) // Day
        );
    };

    const generateChartData = (navData: FundData[], startDateStr: string, endDateStr: string) => {
        if (!navData.length) return [];

        const startDate = parseNavDate(startDateStr);
        const endDate = parseNavDate(endDateStr);

        return navData
            .filter(item => {
                const itemDate = parseNavDate(item.date);
                return itemDate >= startDate && itemDate <= endDate;
            })
            .map(item => {
                const itemDate = parseNavDate(item.date);
                return {
                    date: item.date,
                    nav: parseFloat(item.nav),
                    formattedDate: format(itemDate, 'dd MMM yyyy')
                };
            })
            .sort((a, b) => {
                const dateA = parseNavDate(a.date);
                const dateB = parseNavDate(b.date);
                return dateA.getTime() - dateB.getTime();
            });
    };

    const calculateReturns = () => {
        if (!selectedFund?.data || !startDate || !endDate) return;

        const navData = selectedFund.data.data;

        const formatDateForComparison = (date: Date) => {
            return format(date, 'dd-MM-yyyy');
        };

        const formattedStartDate = formatDateForComparison(startDate);
        const formattedEndDate = formatDateForComparison(endDate);

        const startNav = findClosestDate(navData, formattedStartDate);
        const endNav = findClosestDate(navData, formattedEndDate);

        if (!startNav || !endNav) {
            alert("Could not find any NAV data for the fund.");
            return;
        }

        const startNavValue = parseFloat(startNav.nav);
        const endNavValue = parseFloat(endNav.nav);

        const returns = ((endNavValue - startNavValue) / startNavValue) * 100;

        const actualStartDate = parseNavDate(startNav.date);
        const actualEndDate = parseNavDate(endNav.date);
        const daysElapsed = Math.round((actualEndDate.getTime() - actualStartDate.getTime()) / (1000 * 60 * 60 * 24));

        let cagr;
        if (daysElapsed > 365) {
            const years = daysElapsed / 365;
            cagr = (Math.pow((endNavValue / startNavValue), (1 / years)) - 1) * 100;
        }

        const chartDataPoints = generateChartData(navData, startNav.date, endNav.date);
        setChartData(chartDataPoints);

        setCalculateResult({
            startNav: startNavValue,
            endNav: endNavValue,
            returns,
            cagr,
            daysElapsed,
            actualStartDate: startNav.date,
            actualEndDate: endNav.date
        });
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-popover p-3 border rounded shadow-md text-popover-foreground">
                    <p className="font-medium">{payload[0].payload.formattedDate}</p>
                    <p className="text-sm">NAV: ₹{payload[0].value.toFixed(2)}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <>
            <HeroHeader />

            <div className="py-16 md:py-32 bg-background">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mx-auto max-w-3xl text-center mb-16">
                        <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl">
                            Point to Point Returns Calculator
                        </h2>
                        <p className="text-muted-foreground mt-6">
                            Calculate the exact returns of a mutual fund between two specific dates.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:max-w-3xl mx-auto mb-8">
                        <div className="relative md:col-span-2">
                            <div className="flex items-center">
                                <Input
                                    placeholder={selectedFund ? selectedFund.schemeName : "Search for a mutual fund"}
                                    value={searchTerm}
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                    className="pr-10"
                                    disabled={!!selectedFund}
                                />
                                {selectedFund ? (
                                    <button
                                        className="absolute right-3 text-muted-foreground hover:text-foreground"
                                        onClick={removeFund}
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                ) : (
                                    <Search className="absolute right-3 h-5 w-5 text-muted-foreground" />
                                )}
                            </div>

                            {searchResults.length > 0 && !selectedFund && (
                                <div className="absolute z-10 mt-1 w-full bg-card rounded-md shadow-lg border">
                                    <ul className="py-1 max-h-60 overflow-auto">
                                        {searchResults.map((schemeName) => (
                                            <li
                                                key={schemeName}
                                                className="px-4 py-2 hover:bg-accent cursor-pointer text-sm"
                                                onClick={() => selectFund(schemeName)}
                                            >
                                                {schemeName}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {selectedFund && !selectedFund.isLoading && (
                            <>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Start Date</label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !startDate && "text-muted-foreground"
                                                )}
                                            >
                                                {startDate ? format(startDate, "PPP") : "Select date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={startDate}
                                                onSelect={setStartDate}
                                                initialFocus
                                                disabled={(date) => {
                                                    return date > new Date() || (endDate ? date > endDate : false);
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-2 block">End Date</label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !endDate && "text-muted-foreground"
                                                )}
                                            >
                                                {endDate ? format(endDate, "PPP") : "Select date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={endDate}
                                                onSelect={setEndDate}
                                                initialFocus
                                                disabled={(date) => {
                                                    return date > new Date() || (startDate ? date < startDate : false);
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="md:col-span-2 mt-2">
                                    <Button
                                        className="w-full"
                                        disabled={!startDate || !endDate}
                                        onClick={calculateReturns}
                                    >
                                        Calculate Returns
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Results Card */}
                    {calculateResult && (
                        <Card className="p-6 mb-8 lg:max-w-5xl mx-auto">
                            <h3 className="text-xl font-semibold mb-4">Return Analysis</h3>

                            <div className="grid gap-4 md:grid-cols-2 mb-6">
                                <div>
                                    <p className="text-sm text-muted-foreground">Fund Name</p>
                                    <p className="font-medium">{selectedFund?.schemeName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Fund House</p>
                                    <p className="font-medium">{selectedFund?.data?.meta.fund_house}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Time Period</p>
                                    <p className="font-medium">{calculateResult.daysElapsed} days</p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-muted rounded-lg mb-6">
                                <div className="text-center mb-4 md:mb-0">
                                    <p className="text-sm text-muted-foreground">Starting NAV</p>
                                    <p className="text-xl font-semibold">₹{calculateResult.startNav.toFixed(2)}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {format(parseNavDate(calculateResult.actualStartDate), "dd MMM yyyy")}
                                        {startDate && calculateResult.actualStartDate !== format(startDate, 'dd-MM-yyyy') &&
                                            " (closest to selected)"}
                                    </p>
                                </div>

                                <ArrowRightIcon className="h-5 w-5 text-muted-foreground mb-4 md:mb-0" />

                                <div className="text-center">
                                    <p className="text-sm text-muted-foreground">Ending NAV</p>
                                    <p className="text-xl font-semibold">₹{calculateResult.endNav.toFixed(2)}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {format(parseNavDate(calculateResult.actualEndDate), "dd MMM yyyy")}
                                        {endDate && calculateResult.actualEndDate !== format(endDate, 'dd-MM-yyyy') &&
                                            " (closest to selected)"}
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2 mb-6">
                                <div className="p-4 bg-muted rounded-lg text-center">
                                    <p className="text-sm text-muted-foreground mb-1">Total Returns</p>
                                    <p className={`text-2xl font-bold ${calculateResult.returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {calculateResult.returns >= 0 ? '+' : ''}{calculateResult.returns.toFixed(2)}%
                                    </p>
                                </div>

                                {calculateResult.cagr && (
                                    <div className="p-4 bg-muted rounded-lg text-center">
                                        <p className="text-sm text-muted-foreground mb-1">CAGR</p>
                                        <p className={`text-2xl font-bold ${calculateResult.cagr >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {calculateResult.cagr >= 0 ? '+' : ''}{calculateResult.cagr.toFixed(2)}%
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* NAV Chart */}
                            {chartData.length > 0 && (
                                <div className="mt-6 mb-6">
                                    <h4 className="text-lg font-medium mb-4">NAV Performance Chart</h4>
                                    <div className="h-64 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart
                                                data={chartData}
                                                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis
                                                    dataKey="formattedDate"
                                                    tick={{ fontSize: 12 }}
                                                    interval="preserveStartEnd"
                                                    tickFormatter={(value) => {
                                                        // Show shorter date format for small screens
                                                        const dateParts = value.split(' ');
                                                        return `${dateParts[0]} ${dateParts[1]}`;
                                                    }}
                                                />
                                                <YAxis
                                                    domain={['auto', 'auto']}
                                                    tickFormatter={(value) => `₹${value}`}
                                                />
                                                <Tooltip content={<CustomTooltip />} />
                                                <Line
                                                    type="monotone"
                                                    dataKey="nav"
                                                    stroke="#2563eb"
                                                    activeDot={{ r: 6 }}
                                                    dot={false}
                                                    strokeWidth={2}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            )}

                            <p className="text-xs text-muted-foreground mt-4">
                                Note: Past performance is not indicative of future returns. Investment decisions should not be based solely on historical data.
                            </p>
                        </Card>
                    )}

                    {selectedFund?.isLoading && (
                        <div className="text-center p-10">
                            <p>Loading fund data...</p>
                        </div>
                    )}

                    {!selectedFund && (
                        <div className="text-center p-24 border rounded-lg bg-muted/50 lg:max-w-3xl mx-auto">
                            <p className="text-lg text-muted-foreground">
                                Search and select a mutual fund to calculate point-to-point returns.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <FooterSection />
        </>
    );
}