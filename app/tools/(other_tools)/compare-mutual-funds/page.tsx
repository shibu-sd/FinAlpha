"use client"

import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { schemeCodes } from '../../../../lib/mutual-fund-map';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, X } from 'lucide-react';
import FooterSection from '@/components/footer';
import { HeroHeader } from '@/components/hero/hero-header';

type SchemeCodesType = Record<string, number>;
type ReturnPeriods = "1M" | "3M" | "6M" | "1Y" | "3Y" | "5Y";
type PeriodType = ReturnPeriods | "All";

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
    data?: FundResponse;
    isLoading: boolean;
}

interface FundComparison {
    name: string;
    fundHouse: string;
    category: string;
    currentNav: string;
    "1M"?: string;
    "3M"?: string;
    "6M"?: string;
    "1Y"?: string;
    "3Y"?: string;
    "5Y"?: string;
}

export default function MutualFundCalculator() {
    const [searchTerms, setSearchTerms] = useState<string[]>(["", "", "", ""]);
    const [searchResults, setSearchResults] = useState<Record<number, string[]>>({});
    const [selectedFunds, setSelectedFunds] = useState<SelectedFund[]>([]);
    const [comparisonPeriod, setComparisonPeriod] = useState<PeriodType>("1Y");

    const typedSchemeCodes = schemeCodes as SchemeCodesType;

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
        if (selectedFunds.some(fund => fund.schemeCode === schemeCode)) {
            return;
        }

        const newFund: SelectedFund = {
            schemeName,
            schemeCode,
            isLoading: true
        };

        // If we already have 4 funds, remove the oldest one
        let updatedFunds: SelectedFund[];
        if (selectedFunds.length >= 4) {
            updatedFunds = [...selectedFunds.slice(1), newFund];
        } else {
            updatedFunds = [...selectedFunds, newFund];
        }

        setSelectedFunds(updatedFunds);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_MUTUAL_FUND_API_BASE_URL}/${schemeCode}`);
            const data: FundResponse = await response.json();

            // Update the fund with fetched data
            setSelectedFunds(current =>
                current.map(fund =>
                    fund.schemeCode === schemeCode
                        ? { ...fund, data, isLoading: false }
                        : fund
                )
            );
        } catch (error) {
            console.error("Error fetching fund data:", error);
            setSelectedFunds(current =>
                current.map(fund =>
                    fund.schemeCode === schemeCode
                        ? { ...fund, isLoading: false }
                        : fund
                )
            );
        }
    };

    const removeFund = (schemeCode: number) => {
        setSelectedFunds(current => current.filter(fund => fund.schemeCode !== schemeCode));
    };

    const comparisonData = useMemo(() => {
        if (!selectedFunds.length) return [];

        return selectedFunds
            .filter(fund => fund.data)
            .map(fund => {
                const navData = fund.data?.data || [];
                let returns: Record<ReturnPeriods, string> = {
                    "1M": "N/A",
                    "3M": "N/A",
                    "6M": "N/A",
                    "1Y": "N/A",
                    "3Y": "N/A",
                    "5Y": "N/A"
                };

                if (navData.length > 0) {
                    const currentNav = parseFloat(navData[0].nav);

                    // Calculate returns for different periods
                    const periods: Record<ReturnPeriods, number> = {
                        "1M": 30,
                        "3M": 90,
                        "6M": 180,
                        "1Y": 365,
                        "3Y": 1095,
                        "5Y": 1825
                    };

                    Object.entries(periods).forEach(([period, days]) => {
                        const pastIndex = navData.findIndex(item => {
                            const itemDate = new Date(item.date.split('-').reverse().join('-'));
                            const today = new Date();
                            const diffTime = Math.abs(today.getTime() - itemDate.getTime());
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                            return diffDays >= days;
                        });

                        if (pastIndex !== -1) {
                            const pastNav = parseFloat(navData[pastIndex].nav);
                            const returnPercentage = ((currentNav - pastNav) / pastNav) * 100;
                            returns[period as ReturnPeriods] = returnPercentage.toFixed(2);
                        }
                    });
                }

                const result: FundComparison = {
                    name: fund.schemeName,
                    fundHouse: fund.data?.meta.fund_house || "N/A",
                    category: fund.data?.meta.scheme_category || "N/A",
                    currentNav: navData.length > 0 ? parseFloat(navData[0].nav).toFixed(2) : "N/A",
                    ...returns
                };

                return result;
            });
    }, [selectedFunds]);

    const chartData = useMemo(() => {
        if (!selectedFunds.length) return [];

        let dayLimit;
        switch (comparisonPeriod) {
            case "1M": dayLimit = 30; break;
            case "3M": dayLimit = 90; break;
            case "6M": dayLimit = 180; break;
            case "1Y": dayLimit = 365; break;
            case "3Y": dayLimit = 1095; break;
            case "5Y": dayLimit = 1825; break;
            default: dayLimit = 999999; // All data
        }

        const allDates = new Set<string>();
        selectedFunds.forEach(fund => {
            const navData = fund.data?.data || [];
            navData.slice(0, dayLimit).forEach(item => {
                allDates.add(item.date);
            });
        });

        const sortedDates = Array.from(allDates).sort((a, b) => {
            const dateA = new Date(a.split('-').reverse().join('-'));
            const dateB = new Date(b.split('-').reverse().join('-'));
            return dateA.getTime() - dateB.getTime();
        }).slice(0, dayLimit);

        const chartData: Record<string, any>[] = sortedDates.map(date => {
            const dataPoint: Record<string, any> = { date };

            selectedFunds.forEach(fund => {
                if (!fund.data) return;

                const navItem = fund.data.data.find(item => item.date === date);
                if (navItem) {
                    dataPoint[fund.schemeName] = parseFloat(navItem.nav);
                }
            });

            return dataPoint;
        });

        return chartData;
    }, [selectedFunds, comparisonPeriod]);

    const getXAxisTickCount = (period: PeriodType): number => {
        switch (period) {
            case "1M": return 8;
            case "3M": return 6;
            case "6M": return 12;
            case "1Y": return 12;
            case "3Y": return 12;
            case "5Y": return 10;
            case "All": return 16;
            default: return 12;
        }
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background p-3 border rounded shadow">
                    <p className="font-medium mb-2">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <div
                            key={`tooltip-${index}`}
                            className="flex items-center justify-between gap-4 mb-1"
                        >
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: entry.color }}
                                />
                                <span className="text-sm">{entry.name.length > 20 ? `${entry.name.substring(0, 20)}...` : entry.name}</span>
                            </div>
                            <div className="text-sm">
                                <span className="font-medium">₹{entry.value.toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    const isSearchDisabled = (index: number): boolean => {
        return selectedFunds[index] !== undefined;
    };

    const colors = ["#2563eb", "#db2777", "#16a34a", "#ea580c"];

    return (
        <>
            <HeroHeader />

            <div className="py-16 md:py-32 bg-background">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mx-auto max-w-3xl text-center mb-16">
                        <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl">
                            Mutual Fund Comparison Tool
                        </h2>
                        <p className="text-muted-foreground mt-6">
                            Search and compare upto 4 mutual funds to make informed investment decisions.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                        {[0, 1, 2, 3].map((index) => (
                            <div key={index} className="relative">
                                <div className="flex items-center">
                                    <Input
                                        placeholder={isSearchDisabled(index) ?
                                            selectedFunds[index]?.schemeName.substring(0, 30) + (selectedFunds[index]?.schemeName.length > 30 ? "..." : "") :
                                            `Search mutual fund ${index + 1}`}
                                        value={searchTerms[index]}
                                        onChange={(e) => handleSearchChange(e.target.value, index)}
                                        className="pr-10"
                                        disabled={isSearchDisabled(index)}
                                    />
                                    {isSearchDisabled(index) ? (
                                        <button
                                            className="absolute right-3 text-muted-foreground hover:text-foreground"
                                            onClick={() => removeFund(selectedFunds[index].schemeCode)}
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    ) : (
                                        <Search className="absolute right-3 h-5 w-5 text-muted-foreground" />
                                    )}
                                </div>

                                {searchResults[index]?.length > 0 && !isSearchDisabled(index) && (
                                    <div className="absolute z-10 mt-1 w-full bg-card rounded-md shadow-lg border">
                                        <ul className="py-1 max-h-60 overflow-auto">
                                            {searchResults[index].map((schemeName) => (
                                                <li
                                                    key={schemeName}
                                                    className="px-4 py-2 hover:bg-accent cursor-pointer text-sm"
                                                    onClick={() => selectFund(schemeName, index)}
                                                >
                                                    {schemeName}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Period Selection */}
                    {selectedFunds.length > 0 && (
                        <div className="flex justify-center mb-6 gap-2">
                            {(["1M", "3M", "6M", "1Y", "3Y", "5Y", "All"] as const).map((period) => (
                                <Button
                                    key={period}
                                    variant={comparisonPeriod === period ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setComparisonPeriod(period)}
                                >
                                    {period}
                                </Button>
                            ))}
                        </div>
                    )}

                    {/* Chart Section */}
                    {selectedFunds.length > 0 && chartData.length > 0 && (
                        <Card className="p-6 mb-8">
                            <h3 className="text-xl font-semibold mb-4">NAV Comparison</h3>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={(date) => {
                                            const parts = date.split('-');
                                            return `${parts[1]}/${parts[2]}`;
                                        }}
                                        tick={{ fontSize: 12 }}
                                        interval={Math.floor(chartData.length / getXAxisTickCount(comparisonPeriod))}
                                    />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    {selectedFunds.map((fund, index) => (
                                        <Line
                                            key={fund.schemeCode}
                                            type="monotone"
                                            dataKey={fund.schemeName}
                                            name={fund.schemeName}
                                            stroke={colors[index % colors.length]}
                                            activeDot={{ r: 6 }}
                                            dot={false}
                                            strokeWidth={2}
                                        />
                                    ))}
                                </LineChart>
                            </ResponsiveContainer>
                        </Card>
                    )}

                    {/* Comparison Table */}
                    {comparisonData.length > 0 && (
                        <Card className="mb-8">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Fund Name</TableHead>
                                            <TableHead>Current NAV</TableHead>
                                            <TableHead>1M Return (%)</TableHead>
                                            <TableHead>3M Return (%)</TableHead>
                                            <TableHead>6M Return (%)</TableHead>
                                            <TableHead>1Y Return (%)</TableHead>
                                            <TableHead>3Y Return (%)</TableHead>
                                            <TableHead>5Y Return (%)</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {comparisonData.map((fund, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium">{fund.name.length > 50 ? `${fund.name.substring(0, 50)}...` : fund.name}</TableCell>
                                                <TableCell>₹{fund.currentNav}</TableCell>
                                                <TableCell className={fund["1M"] && fund["1M"] !== "N/A" && parseFloat(fund["1M"]) >= 0 ? "text-green-600" : "text-red-600"}>
                                                    {fund["1M"] !== "N/A" ? `${fund["1M"]}%` : "N/A"}
                                                </TableCell>
                                                <TableCell className={fund["3M"] && fund["3M"] !== "N/A" && parseFloat(fund["3M"]) >= 0 ? "text-green-600" : "text-red-600"}>
                                                    {fund["3M"] !== "N/A" ? `${fund["3M"]}%` : "N/A"}
                                                </TableCell>
                                                <TableCell className={fund["6M"] && fund["6M"] !== "N/A" && parseFloat(fund["6M"]) >= 0 ? "text-green-600" : "text-red-600"}>
                                                    {fund["6M"] !== "N/A" ? `${fund["6M"]}%` : "N/A"}
                                                </TableCell>
                                                <TableCell className={fund["1Y"] && fund["1Y"] !== "N/A" && parseFloat(fund["1Y"]) >= 0 ? "text-green-600" : "text-red-600"}>
                                                    {fund["1Y"] !== "N/A" ? `${fund["1Y"]}%` : "N/A"}
                                                </TableCell>
                                                <TableCell className={fund["3Y"] && fund["3Y"] !== "N/A" && parseFloat(fund["3Y"]) >= 0 ? "text-green-600" : "text-red-600"}>
                                                    {fund["3Y"] !== "N/A" ? `${fund["3Y"]}%` : "N/A"}
                                                </TableCell>
                                                <TableCell className={fund["5Y"] && fund["5Y"] !== "N/A" && parseFloat(fund["5Y"]) >= 0 ? "text-green-600" : "text-red-600"}>
                                                    {fund["5Y"] !== "N/A" ? `${fund["5Y"]}%` : "N/A"}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </Card>
                    )}

                    {selectedFunds.length === 0 && (
                        <div className="text-center p-24 border rounded-lg bg-muted/50">
                            <p className="text-lg text-muted-foreground">
                                Search and select mutual funds to compare their performance.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <FooterSection />
        </>
    );
}