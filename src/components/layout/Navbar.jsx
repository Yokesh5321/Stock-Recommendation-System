import React, { useState } from 'react';
import { useStock } from '../../context/StockContext';
import { Search, Bell, Activity, Sparkles, TrendingUp, ShieldCheck, Wallet, DollarSign, Layers, User, LogOut } from 'lucide-react';

export const Navbar = () => {
  const { 
    stocks, 
    setSelectedStock, 
    setActiveTab, 
    currentUser,
    logoutUser
  } = useStock();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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
    <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40 shadow-xs">
      {/* Brand & Logo */}
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 p-0.5 flex items-center justify-center shadow-md shadow-blue-500/10">
          <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-blue-600" />
          </div>
        </div>
          <div className="flex items-center space-x-2">
            <h1 className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
              STOCK <span className="text-blue-600">RECOMMENDATION</span> SYSTEM
            </h1>
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded">
              AI PRO
            </span>
          </div>
          <p className="text-[11px] text-slate-500 hidden sm:block font-medium">Quantitative Multi-Asset & Demat Portfolio Engine</p>
      </div>

      {/* Global Search Bar */}
      <div className="relative max-w-md w-full mx-4 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search stock by symbol or company (e.g. NVDA, Apple)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className="w-full pl-10 pr-4 py-2 bg-slate-100/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
          />
        </div>

        {/* Dropdown Suggestions */}
        {isOpen && filteredStocks.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-100 max-h-80 overflow-y-auto">
            {filteredStocks.map((stock) => (
              <div
                key={stock.symbol}
                onClick={() => handleSelect(stock)}
                className="p-3 hover:bg-slate-50 flex items-center justify-between cursor-pointer transition"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-sm">{stock.symbol}</span>
                    <span className="text-xs text-slate-500">{stock.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">{stock.sector}</div>
                </div>

                <div className="text-right">
                  <div className="font-semibold text-slate-900 text-sm">${stock.price.toFixed(2)}</div>
                  <span className="text-xs text-blue-600 font-bold">{stock.recommendation}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* High-Visibility Stock Need Quiz Button */}
        <button
          onClick={() => setActiveTab('questionnaire')}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition cursor-pointer"
        >
          <Sparkles size={14} className="text-amber-300" />
          <span>🎯 Stock Need Quiz</span>
        </button>

        {/* Basket Shortcut */}
        <button
          onClick={() => setActiveTab('portfolio-basket')}
          className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs text-blue-700 font-bold transition shadow-2xs"
        >
          <Layers size={14} />
          <span>My Basket</span>
        </button>

        {/* User Account Button & Dropdown */}
        {currentUser?.isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-1 pl-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-2xl transition"
            >
              <div className="hidden xl:block text-left text-[11px]">
                <div className="font-bold text-slate-800 leading-tight truncate max-w-[110px]">{currentUser.fullName}</div>
                <div className="text-[10px] font-mono text-blue-700 font-semibold">{currentUser.dematAccountNo?.slice(0, 11)}...</div>
              </div>
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                {currentUser?.fullName
                  ? currentUser.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
                  : 'YK'}
              </div>
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 space-y-3 z-50 animate-in fade-in duration-150"
                onMouseLeave={() => setIsUserMenuOpen(false)}
              >
                <div>
                  <div className="font-bold text-sm text-slate-900">{currentUser.fullName}</div>
                  <div className="text-xs text-slate-500 font-mono">{currentUser.email}</div>
                </div>

                <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 space-y-1">
                  <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Linked Demat Account</div>
                  <div className="text-xs font-mono font-bold text-blue-700">{currentUser.dematAccountNo}</div>
                  <div className="text-[11px] text-slate-600">{currentUser.brokerName}</div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
                  <button
                    onClick={() => {
                      setActiveTab('login');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-700 font-semibold transition flex items-center space-x-2"
                  >
                    <User size={14} className="text-blue-600" />
                    <span>Demat Account Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('wealth-profile');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-700 font-semibold transition flex items-center space-x-2"
                  >
                    <ShieldCheck size={14} className="text-emerald-600" />
                    <span>Risk & Salary Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      logoutUser();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 font-semibold transition flex items-center space-x-2"
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setActiveTab('login')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center space-x-1.5 cursor-pointer"
          >
            <User size={14} />
            <span>Sign In / Demat</span>
          </button>
        )}
      </div>
    </header>
  );
};
