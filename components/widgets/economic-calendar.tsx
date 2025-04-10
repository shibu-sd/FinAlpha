'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

const EconomicCalendar: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const scriptId = 'tradingview-events-script';

        const initWidget = () => {
            if (!containerRef.current) return;

            // Clear previous widget instance
            containerRef.current.innerHTML = '';

            const script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
            script.async = true;
            script.innerHTML = JSON.stringify({
                width: '100%',
                height: '100%',
                colorTheme: theme === 'dark' ? 'dark' : 'light',
                isTransparent: false,
                locale: 'en',
                importanceFilter: '-1,0,1',
                countryFilter: 'in',
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

export default EconomicCalendar;
