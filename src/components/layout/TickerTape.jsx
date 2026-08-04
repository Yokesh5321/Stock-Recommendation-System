import React from 'react';
import { useStock } from '../../context/StockContext';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const TickerTape = () => {
  const { indices } = useStock();

  return (
    <div className="w-full bg-dark-bg border-b border-dark-border overflow-hidden py-1.5 px-4 text-xs font-mono select-none">
      <div className="flex space-x-8 animate-ticker whitespace-nowrap">
        {[...indices, ...indices].map((item, idx) => (
          <div key={idx} className="inline-flex items-center space-x-2">
            <span className="font-semibold text-slate-300">{item.symbol}</span>
            <span className="text-slate-100">${item.price.toLocaleString()}</span>
            <span className={`flex items-center text-[11px] ${item.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
              {item.isUp ? <TrendingUp size={12} className="mr-0.5" /> : <TrendingDown size={12} className="mr-0.5" />}
              {item.isUp ? '+' : ''}{item.changePercent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
