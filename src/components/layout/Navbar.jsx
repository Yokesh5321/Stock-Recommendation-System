import React, { useState } from 'react';
import { useStock } from '../../context/StockContext';
import { Search, Bell, Activity, Sparkles, TrendingUp, ShieldCheck, Wallet, DollarSign, Layers } from 'lucide-react';

export const Navbar = () => {
  const { stocks, setSelectedStock, setActiveTab, financialProfile, getWealthSummary } = useStock();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wealth = getWealthSummary();

  const filteredStocks = query.trim()
    ? stocks.filter(s => 
        s.symbol.toLowerCase().includes(query.toLowerCase()) || 
        s.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = (stock) => {
    setSelectedStock(stock);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <header className="h-16 bg-dark-bg/90 backdrop-blur-md border-b border-dark-border px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Brand & Logo */}
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <div className="w-full h-full bg-dark-bg rounded-[10px] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-bold text-lg text-white tracking-wide">QUANT<span className="text-cyan-400">WEALTH</span></h1>
            <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded">Basket AI</span>
          </div>
          <p className="text-[11px] text-dark-muted hidden sm:block">Personalized Multi-Stock Portfolio Engine</p>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="relative max-w-md w-full mx-4 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-dark-muted" />
          <input
            type="text"
            placeholder="Search stock by symbol or company (e.g. NVDA, Apple)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className="w-full pl-10 pr-4 py-2 bg-dark-card/80 border border-dark-border rounded-xl text-sm text-slate-200 placeholder-dark-muted focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />
        </div>

        {/* Dropdown Suggestions */}
        {isOpen && filteredStocks.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-dark-card border border-dark-border rounded-xl shadow-2xl overflow-hidden z-50 divide-y divide-dark-border max-h-80 overflow-y-auto">
            {filteredStocks.map((stock) => (
              <div
                key={stock.symbol}
                onClick={() => handleSelect(stock)}
                className="p-3 hover:bg-dark-hover flex items-center justify-between cursor-pointer transition"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-100 text-sm">{stock.symbol}</span>
                    <span className="text-xs text-dark-muted">{stock.name}</span>
                  </div>
                  <div className="text-[11px] text-dark-muted">{stock.sector}</div>
                </div>

                <div className="text-right">
                  <div className="font-semibold text-slate-200 text-sm">${stock.price.toFixed(2)}</div>
                  <span className="text-xs text-cyan-400 font-bold">{stock.recommendation}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* Basket Shortcut */}
        <button
          onClick={() => setActiveTab('portfolio-basket')}
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/30 rounded-xl text-xs text-blue-400 font-bold transition"
        >
          <Layers size={14} />
          <span>My Basket</span>
        </button>

        {/* Surplus Pill */}
        <button
          onClick={() => setActiveTab('questionnaire')}
          className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-xl text-xs text-cyan-400 font-medium transition"
        >
          <DollarSign size={14} />
          <span>Surplus: </span>
          <strong className="font-mono text-white">${wealth.monthlySurplus.toLocaleString()}/mo</strong>
        </button>

        {/* User Avatar */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-dark-border cursor-pointer">
          YK
        </div>
      </div>
    </header>
  );
};
