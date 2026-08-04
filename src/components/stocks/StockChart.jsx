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
  const strokeColor = isPositive ? '#10b981' : '#f43f5e';
  const fillColor = isPositive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)';

  return (
    <div className="space-y-4">
      {/* Timeframe Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 bg-dark-bg p-1 rounded-xl border border-dark-border">
          {['1D', '1W', '1M', '1Y'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                timeframe === tf
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-dark-muted hover:text-slate-200'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        <div className="text-xs text-dark-muted font-mono">
          High: <span className="text-slate-200 font-semibold">${(stock.price * 1.03).toFixed(2)}</span> | 
          Low: <span className="text-slate-200 font-semibold">${(stock.price * 0.97).toFixed(2)}</span>
        </div>
      </div>

      {/* Chart Area */}
      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${stock.symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.4} />
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2d4d" opacity={0.5} />
            <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} domain={['auto', 'auto']} tickLine={false} tickFormatter={(v) => `$${v}`} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#131b2e',
                borderColor: '#1f2d4d',
                borderRadius: '12px',
                color: '#f1f5f9',
                fontSize: '12px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
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
