'use client';

import { useEffect, useRef } from 'react';

const FinlogixWidget: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initWidget = () => {
            // Clear any previous widget content (important when remounting)
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }

            // @ts-ignore – Widget is a global injected by the script
            if (typeof Widget !== 'undefined') {
                // @ts-ignore
                Widget.init({
                    widgetId: '979ec615-0f9a-4ebb-9aa6-12afc94b088c',
                    type: 'StripBar',
                    language: 'en',
                    showBrand: true,
                    isShowTradeButton: true,
                    isShowBeneathLink: true,
                    isShowDataFromACYInfo: true,
                    symbolPairs: [
                        { symbolId: '83', symbolName: 'INDIA50' },
                        { symbolId: '20070', symbolName: 'Infosys' },
                        { symbolId: '20281', symbolName: 'ICICI Bank Ltd' },
                        { symbolId: '20273', symbolName: 'HDFC Bank Limited' },
                        { symbolId: '20186', symbolName: 'DrReddys' },
                        { symbolId: '10029', symbolName: 'Microsoft' },
                        { symbolId: '10021', symbolName: 'NVIDIA' },
                        { symbolId: '10004', symbolName: 'Alphabet' },
                        { symbolId: '10006', symbolName: 'Amazon' },
                        { symbolId: '10007', symbolName: 'Apple' },
                    ],
                    isAdaptive: true,
                });
            }
        };

        const existingScript = document.getElementById('finlogix-script');

        if (!existingScript) {
            const script = document.createElement('script');
            script.src = 'https://widget.finlogix.com/Widget.js';
            script.id = 'finlogix-script';
            script.async = true;
            script.onload = initWidget;
            document.body.appendChild(script);
        } else {
            initWidget(); // re-init if already loaded
        }
    }, []);

    return (
        <div
            className="finlogix-container fixed top-0 left-0 w-full z-50 pointer-events-none"
            style={{ height: '50px' }}
            ref={containerRef}
        />
    );

};

export default FinlogixWidget;