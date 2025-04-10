'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

const HeatmapWidget: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const scriptId = 'tradingview-heatmap-script';

        const initWidget = () => {
            if (!containerRef.current) return;

            // Clear previous widget content
            containerRef.current.innerHTML = '';

            const widgetOptions = {
                exchanges: [],
                dataSource: 'SENSEX',
                grouping: 'sector',
                blockSize: 'market_cap_basic',
                blockColor: 'change',
                locale: 'en',
                symbolUrl: '',
                colorTheme: theme === 'dark' ? 'dark' : 'light',
                hasTopBar: true,
                isDataSetEnabled: false,
                isZoomEnabled: true,
                hasSymbolTooltip: true,
                isMonoSize: false,
                width: '100%',
                height: '100%',
            };

            const script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js';
            script.async = true;
            script.innerHTML = JSON.stringify(widgetOptions);

            containerRef.current.appendChild(script);
        };

        initWidget();

        // Re-init on theme switch
        const observer = new MutationObserver(() => {
            initWidget();
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, [theme]);

    return (
        <div className="@container mx-auto max-w-5xl px-6">
            <div className="tradingview-widget-container__widget h-[600px]" ref={containerRef} />
            <div className="tradingview-widget-copyright mt-2 text-sm text-muted-foreground text-center">
                <a
                    href="https://www.tradingview.com/"
                    rel="noopener nofollow"
                    target="_blank"
                >
                </a>
            </div>
        </div>
    );
};

export default HeatmapWidget;
