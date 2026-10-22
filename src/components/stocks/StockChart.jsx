import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export const StockChart = ({ stock }) => {
  const [timeframe, setTimeframe] = useState('1D');

  const data = stock.chartData?.[timeframe] || stock.chartData['1D'];
  const isPositive = stock.isUp;
  const strokeColor = isPositive ? '#059669' : '#e11d48';
  const fillColor = isPositive ? 'rgba(5, 150, 105, 0.15)' : 'rgba(225, 29, 72, 0.15)';

  return (
    <div className="space-y-4">
      {/* Timeframe Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {['1D', '1W', '1M', '1Y'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                timeframe === tf
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 font-mono">
          High: <span className="text-slate-800 font-bold">${(stock.price * 1.03).toFixed(2)}</span> | 
          Low: <span className="text-slate-800 font-bold">${(stock.price * 0.97).toFixed(2)}</span>
        </div>
      </div>

      {/* Chart Area */}
      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${stock.symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.25} />
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.8} />
            <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} domain={['auto', 'auto']} tickLine={false} tickFormatter={(v) => `$${v}`} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                borderRadius: '12px',
                color: '#0f172a',
                fontSize: '12px',
                boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.08)'
              }}
              formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Price']}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={strokeColor}
              strokeWidth={2.5}
              fillOpacity={1}
              fill={`url(#gradient-${stock.symbol})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
