import { useState, useEffect } from 'react';

// Random simulated price generator hook
// Independent per client instance
export function useStockSimulator(subscribedStocks) {
    const [stockPrices, setStockPrices] = useState({});

    useEffect(() => {
        // Initial values
        const initialPrices = {};
        subscribedStocks.forEach(ticker => {
            // Generate a consistently randomish starting price based on ticker string length to keep it realisticish but consistent
            // Or just random, user said random is fine.
            // Let's pick a base price for major tech stacks:
            let base = 100;
            if (ticker === 'GOOG' || ticker === 'GOOGL') base = 175;
            if (ticker === 'TSLA') base = 250;
            if (ticker === 'AMZN') base = 180;
            if (ticker === 'META') base = 500;
            if (ticker === 'NVDA') base = 900;
            if (ticker === 'MSFT') base = 420;
            if (ticker === 'AAPL') base = 170;

            // If unknown, just random 50-150
            if (base === 100) base = Math.floor(Math.random() * 100) + 50;

            initialPrices[ticker] = {
                price: base,
                change: 0,
                percentChange: 0
            };
        });
        setStockPrices(prev => ({ ...initialPrices, ...prev })); // Keep existing if any to avoid reset flickering

        const interval = setInterval(() => {
            setStockPrices(currentPrices => {
                const newPrices = { ...currentPrices };
                subscribedStocks.forEach(ticker => {
                    const current = newPrices[ticker] || { price: 100, change: 0, percentChange: 0 };
                    // Fluctuate by -2% to +2%
                    const volatility = 0.02;
                    const changePercent = (Math.random() * volatility * 2) - volatility;
                    const changeAmount = current.price * changePercent;
                    const newPrice = current.price + changeAmount;

                    newPrices[ticker] = {
                        price: parseFloat(newPrice.toFixed(2)),
                        change: parseFloat(changeAmount.toFixed(2)),
                        percentChange: parseFloat((changePercent * 100).toFixed(2))
                    };
                });
                return newPrices;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [subscribedStocks]); // reset if list changes, but we want to persist mostly.

    return stockPrices;
}
