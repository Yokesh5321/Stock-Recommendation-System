import React, { useState } from 'react';
import { useStock } from '../../context/StockContext';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { TradeModal } from './TradeModal';
import { 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  PieChart as PieIcon, 
  Star,
  ArrowUpRight,
  Plus
} from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#06b6d4', '#f59e0b', '#ec4899'];

export const PortfolioView = () => {
  const { stocks, portfolio, watchlist, setSelectedStock, getPortfolioSummary } = useStock();
  const [activeTradeStock, setActiveTradeStock] = useState(null);

  const summary = getPortfolioSummary();

  // Holdings dataset with live prices
  const holdingsData = portfolio.holdings.map(h => {
    const stock = stocks.find(s => s.symbol === h.symbol) || {};
    const currentPrice = stock.price || h.avgPrice;
    const currentValue = h.shares * currentPrice;
    const investedValue = h.shares * h.avgPrice;
    const pnl = currentValue - investedValue;
    const pnlPercent = (pnl / investedValue) * 100;

    return {
      ...h,
      name: stock.name || h.symbol,
      currentPrice,
      currentValue,
      pnl,
      pnlPercent,
      isProfit: pnl >= 0,
      stock
    };
  });

  // Watchlist dataset
  const watchlistStocks = stocks.filter(s => watchlist.includes(s.symbol));

  // Pie chart data
  const pieData = [
    ...holdingsData.map(h => ({ name: h.symbol, value: h.currentValue })),
    { name: 'Cash', value: portfolio.cashBalance }
  ];

  return (
    <div className="space-y-6">
      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-dark-card border border-dark-border space-y-2">
          <span className="text-xs text-dark-muted font-medium">Total Account Value</span>
          <div className="text-2xl font-extrabold text-white font-mono">
            ${summary.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-dark-muted font-mono">
            Invested + Available Cash
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-dark-card border border-dark-border space-y-2">
          <span className="text-xs text-dark-muted font-medium">Unrealized Total P&L</span>
          <div className={`text-2xl font-extrabold font-mono flex items-center ${summary.isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
            {summary.isProfit ? '+' : ''}${summary.totalPnl.toFixed(2)}
          </div>
          <div className={`text-[11px] font-mono font-semibold ${summary.isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
            ({summary.isProfit ? '+' : ''}{summary.totalPnlPercent.toFixed(2)}% Return)
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-dark-card border border-dark-border space-y-2">
          <span className="text-xs text-dark-muted font-medium">Available Buying Power</span>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono">
            ${summary.cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-dark-muted">Liquid cash ready for trade</div>
        </div>

        <div className="p-5 rounded-2xl bg-dark-card border border-dark-border space-y-2">
          <span className="text-xs text-dark-muted font-medium">Active Holdings</span>
          <div className="text-2xl font-extrabold text-white font-mono">
            {portfolio.holdings.length} Positions
          </div>
          <div className="text-[11px] text-dark-muted">Diversified across sectors</div>
        </div>
      </div>

      {/* Asset Allocation & Holdings Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart (1 col) */}
        <div className="p-5 rounded-2xl bg-dark-card border border-dark-border space-y-4">
          <div className="flex items-center space-x-2">
            <PieIcon size={18} className="text-cyan-400" />
            <h3 className="text-base font-bold text-slate-100">Asset Allocation</h3>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#131b2e',
                    borderColor: '#1f2d4d',
                    borderRadius: '12px',
                    color: '#f1f5f9',
                    fontSize: '12px'
                  }}
                  formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Value']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 font-mono text-xs">
            {pieData.map((item, idx) => (
              <div key={item.name} className="flex justify-between items-center text-slate-300">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                  <span>{item.name}</span>
                </div>
                <span className="font-bold">${item.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Holdings Table (2 cols) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-dark-card border border-dark-border space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Briefcase size={18} className="text-blue-400" />
              <h3 className="text-base font-bold text-slate-100">Current Stock Holdings</h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-dark-border text-[11px] font-semibold text-dark-muted tracking-wider uppercase">
                  <th className="pb-3 px-2">Symbol</th>
                  <th className="pb-3 px-2">Qty</th>
                  <th className="pb-3 px-2">Avg Price</th>
                  <th className="pb-3 px-2">Current</th>
                  <th className="pb-3 px-2">Total Value</th>
                  <th className="pb-3 px-2">Unrealized P&L</th>
                  <th className="pb-3 px-2 text-right">Trade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border text-xs font-mono">
                {holdingsData.map((item) => (
                  <tr key={item.symbol} className="hover:bg-dark-hover transition">
                    <td className="py-3 px-2 font-bold text-slate-100 font-sans">{item.symbol}</td>
                    <td className="py-3 px-2 text-slate-200">{item.shares}</td>
                    <td className="py-3 px-2 text-dark-muted">${item.avgPrice.toFixed(2)}</td>
                    <td className="py-3 px-2 font-semibold text-slate-100">${item.currentPrice.toFixed(2)}</td>
                    <td className="py-3 px-2 font-bold text-slate-100">${item.currentValue.toFixed(2)}</td>
                    <td className="py-3 px-2">
                      <span className={`font-bold ${item.isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {item.isProfit ? '+' : ''}${item.pnl.toFixed(2)} ({item.isProfit ? '+' : ''}{item.pnlPercent.toFixed(1)}%)
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <button
                        onClick={() => setActiveTradeStock(item.stock)}
                        className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition font-sans"
                      >
                        Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Watchlist Section */}
      <div className="p-5 rounded-2xl bg-dark-card border border-dark-border space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star size={18} className="text-amber-400 fill-amber-400" />
            <h3 className="text-base font-bold text-slate-100">Saved Watchlist ({watchlistStocks.length})</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {watchlistStocks.map((stock) => (
            <div
              key={stock.symbol}
              onClick={() => setSelectedStock(stock)}
              className="p-4 rounded-xl bg-dark-bg border border-dark-border hover:border-blue-500/40 cursor-pointer transition flex items-center justify-between"
            >
              <div>
                <div className="font-extrabold text-slate-100 text-sm">{stock.symbol}</div>
                <div className="text-xs text-dark-muted">{stock.name}</div>
              </div>
              <div className="text-right font-mono">
                <div className="text-sm font-bold text-slate-100">${stock.price.toFixed(2)}</div>
                <div className={`text-xs font-semibold ${stock.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {stock.isUp ? '+' : ''}{stock.changePercent}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trade Modal Child */}
      {activeTradeStock && (
        <TradeModal stock={activeTradeStock} onClose={() => setActiveTradeStock(null)} />
      )}
    </div>
  );
};
