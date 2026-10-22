import React from 'react';
import { useStock } from '../../context/StockContext';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const TickerTape = () => {
  const { indices } = useStock();

  return (
    <div className="w-full bg-white border-b border-slate-200 overflow-hidden py-1.5 px-4 text-xs font-mono select-none shadow-sm">
      <div className="flex space-x-8 animate-ticker whitespace-nowrap">
        {[...indices, ...indices].map((item, idx) => (
          <div key={idx} className="inline-flex items-center space-x-2">
            <span className="font-bold text-slate-800">{item.symbol}</span>
            <span className="text-slate-700 font-semibold">${item.price.toLocaleString()}</span>
            <span className={`flex items-center text-[11px] font-bold ${item.isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
              {item.isUp ? <TrendingUp size={12} className="mr-0.5" /> : <TrendingDown size={12} className="mr-0.5" />}
              {item.isUp ? '+' : ''}{item.changePercent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
