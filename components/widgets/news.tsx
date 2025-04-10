'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

const NewsWidget: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const scriptId = 'tradingview-timeline-script';

        const initWidget = () => {
            if (!containerRef.current) return;

            // Clear previous widget (if any)
            containerRef.current.innerHTML = '';

            const script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
            script.async = true;
            script.innerHTML = JSON.stringify({
                feedMode: 'all_symbols',
                isTransparent: false,
                displayMode: 'regular',
                width: '100%',
                height: 600,
                colorTheme: theme === 'dark' ? 'dark' : 'light',
                locale: 'en',
            });

            containerRef.current.appendChild(script);
        };

        initWidget();
    }, [theme]);

    return (
        <div className="@container mx-auto max-w-5xl px-6">
            <div className="tradingview-widget-container__widget" ref={containerRef} />
            <div className="tradingview-widget-copyright">
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

export default NewsWidget;
