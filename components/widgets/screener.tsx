'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

const ScreenerWidget: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const scriptId = 'tradingview-screener-script';

        const initWidget = () => {
            if (!containerRef.current) return;

            // Clear previous script if it exists
            containerRef.current.innerHTML = '';

            const script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
            script.async = true;
            script.innerHTML = JSON.stringify({
                width: '100%',
                height: '100%',
                defaultColumn: 'overview',
                defaultScreen: 'most_capitalized',
                market: 'india',
                showToolbar: true,
                colorTheme: theme === 'dark' ? 'dark' : 'light',
                locale: 'en',
            });

            containerRef.current.appendChild(script);
        };

        initWidget();
    }, [theme]);

    return (
        <div className="@container mx-auto max-w-5xl px-6 h-[600px]">
            <div className="tradingview-widget-container__widget h-full" ref={containerRef} />
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

export default ScreenerWidget;
