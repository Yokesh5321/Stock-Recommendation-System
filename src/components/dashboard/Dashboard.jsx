import React from 'react';
import { useStock } from '../../context/StockContext';
import { 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ShieldCheck, 
  BarChart3, 
  Layers, 
  CheckCircle2, 
  Star,
  Activity,
  Wallet,
  DollarSign
} from 'lucide-react';

export const Dashboard = () => {
  const { 
    stocks, 
    indices, 
    setSelectedStock, 
    setActiveTab, 
    financialProfile, 
    getWealthSummary, 
    getPersonalizedFit,
    currentUser
  } = useStock();

  const wealth = getWealthSummary();
  
  // Rank stocks by personalized fit score
  const rankedStocks = stocks.map(s => ({
    ...s,
    fit: getPersonalizedFit(s) || { fitScore: 85, matchReasons: [], suggestedMonthlyAllocation: 500 }
  })).sort((a, b) => (b.fit?.fitScore ?? 0) - (a.fit?.fitScore ?? 0));

  const topRecommendations = rankedStocks.slice(0, 4);
  const topGainers = [...stocks].sort((a, b) => (b.changePercent ?? 0) - (a.changePercent ?? 0)).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* 1. Clean Investor Header & Quiz Action */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Welcome, {currentUser?.fullName || 'Investor'}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
              {currentUser?.dematAccountNo || 'DEMAT-88492049'}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Broker: <strong className="text-slate-700">{currentUser?.brokerName || 'Zerodha'}</strong> • Strategy: <strong className="text-slate-700">{financialProfile.primaryGoal}</strong>
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setActiveTab('questionnaire')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center space-x-1.5 transition cursor-pointer"
          >
            <Sparkles size={14} className="text-amber-300" />
            <span>🎯 Take Recommendation Quiz</span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio-basket')}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 flex items-center space-x-1.5 transition cursor-pointer"
          >
            <Layers size={14} />
            <span>My Basket</span>
          </button>
        </div>
      </div>

      {/* 2. Key Financial Snapshot (3 Neat Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Monthly Stock Surplus</span>
            <DollarSign size={16} className="text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-600 font-mono">
            ${(wealth?.monthlySurplus ?? 0).toLocaleString()}/mo
          </div>
          <p className="text-[11px] text-slate-400">Available from salary for equity accumulation</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Investment Goal</span>
            <ShieldCheck size={16} className="text-indigo-600" />
          </div>
          <div className="text-lg font-bold text-slate-900 truncate">
            {financialProfile?.primaryGoal || 'Wealth Accumulation'}
          </div>
          <p className="text-[11px] text-slate-400">Calibrates sector exposure & risk limits</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Calculated Net Worth</span>
            <Wallet size={16} className="text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">
            ${(wealth?.netWorth ?? 0).toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400">Total liquid savings and asset value</p>
        </div>
      </div>

      {/* 3. Primary Section: Recommended Stocks For Your Demat */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <Sparkles size={18} className="text-blue-600" />
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Recommended Stocks For Your Demat
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Ranked by Sharpe ratio and matched to your {financialProfile.primaryGoal} objective.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('recommendations')}
            className="text-xs text-blue-600 hover:text-blue-800 font-bold hover:underline flex items-center space-x-1"
          >
            <span>View All Stock Picks</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Clean 4-Card Recommendation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topRecommendations.map((stock) => (
            <div
              key={stock.symbol}
              onClick={() => setSelectedStock(stock)}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md cursor-pointer transition space-y-3 group shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center font-black text-blue-700 text-sm">
                    {stock.symbol}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition flex items-center space-x-2">
                      <span>{stock.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                        {stock.sector}
                      </span>
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-900 mt-0.5">
                      ${stock.price.toFixed(2)}{' '}
                      <span className={`text-[11px] ${stock.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
                      </span>
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {stock.fit?.fitScore ?? 85}% Match
                </span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {stock.fit?.matchReasons?.[0] || `Strong alignment with your ${financialProfile?.primaryGoal || 'portfolio'} investment goal.`}
              </p>

              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">
                  Suggested SIP: <strong className="text-blue-700 font-bold">${stock.fit?.suggestedMonthlyAllocation ?? 500}/mo</strong>
                </span>
                <span className="text-blue-600 font-bold group-hover:underline flex items-center space-x-1">
                  <span>View Details</span>
                  <ArrowUpRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Market Overview & Daily Movers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Live Indices */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900">Major Market Indices</h4>
            <span className="text-[11px] text-slate-400 font-mono">Live Simulation</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {indices.slice(0, 3).map((idx) => (
              <div key={idx.symbol} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                <div className="text-xs font-bold text-slate-700 truncate">{idx.name}</div>
                <div className="text-sm font-black font-mono text-slate-900">${(idx.price ?? idx.value ?? 0).toLocaleString()}</div>
                <div className={`text-xs font-mono font-bold ${(idx.change ?? 0) >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {(idx.change ?? 0) >= 0 ? '+' : ''}{idx.changePercent}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Movers */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
              <TrendingUp size={16} className="text-emerald-600" />
              <span>Top Daily Movers</span>
            </h4>
          </div>

          <div className="space-y-2">
            {topGainers.map((stock) => (
              <div
                key={stock.symbol}
                onClick={() => setSelectedStock(stock)}
                className="p-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between cursor-pointer transition border border-transparent hover:border-slate-200"
              >
                <div>
                  <span className="font-bold text-slate-900 text-xs">{stock.symbol}</span>
                  <span className="text-[11px] text-slate-400 ml-1.5">{stock.name}</span>
                </div>
                <div className="text-right font-mono text-xs font-bold text-emerald-600">
                  +{stock.changePercent}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
