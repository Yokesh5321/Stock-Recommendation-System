import React, { useState } from 'react';
import { useStock } from '../../context/StockContext';
import { 
  Sparkles, 
  Wallet, 
  DollarSign, 
  TrendingUp, 
  Zap, 
  Target, 
  ShieldCheck, 
  ArrowUpRight,
  Star,
  CheckCircle2,
  Sliders
} from 'lucide-react';

export const RecommendationFeed = () => {
  const { 
    stocks, 
    setSelectedStock, 
    financialProfile, 
    getWealthSummary, 
    getPersonalizedFit, 
    watchlist, 
    toggleWatchlist,
    setActiveTab 
  } = useStock();

  const wealth = getWealthSummary();
  const [goalFilter, setGoalFilter] = useState('All');

  // Compute personalized fit score for each stock
  const personalizedStocks = stocks.map(stock => {
    const fit = getPersonalizedFit(stock);
    return {
      ...stock,
      fitScore: fit.fitScore,
      suggestedMonthlyAllocation: fit.suggestedMonthlyAllocation,
      matchReasons: fit.matchReasons
    };
  }).sort((a, b) => b.fitScore - a.fitScore);

  const filteredStocks = goalFilter === 'All'
    ? personalizedStocks
    : personalizedStocks.filter(s => s.fitScore >= 80);

  return (
    <div className="space-y-6">
      {/* Personalized Match Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950 via-dark-card to-indigo-950 border border-blue-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs">
            <Sparkles size={16} />
            <span>SALARY & ASSET-MATCHED RECOMMENDATIONS</span>
          </div>
          <h2 className="text-2xl font-black text-white">Stock Recommendations tailored to You</h2>
          <p className="text-xs text-slate-300">
            Matched for your <strong className="text-cyan-400">${wealth.monthlySurplus.toLocaleString()}/mo Surplus</strong> (Salary: ${financialProfile.monthlySalary.toLocaleString()}) & Net Worth of <strong className="text-emerald-400">${wealth.netWorth.toLocaleString()}</strong>.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('wealth-profile')}
          className="px-4 py-2.5 rounded-xl bg-dark-bg hover:bg-dark-hover border border-dark-border text-xs font-bold text-slate-200 flex items-center space-x-2 transition"
        >
          <Wallet size={16} className="text-cyan-400" />
          <span>Edit Financial Inputs</span>
        </button>
      </div>

      {/* Needs Filter Bar */}
      <div className="flex items-center space-x-2 p-4 rounded-2xl bg-dark-card border border-dark-border">
        <span className="text-xs font-semibold text-dark-muted mr-2">Filter:</span>
        <button
          onClick={() => setGoalFilter('All')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition ${
            goalFilter === 'All'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-dark-bg text-dark-muted hover:text-slate-200 border border-dark-border'
          }`}
        >
          All Ranked Stocks ({stocks.length})
        </button>
        <button
          onClick={() => setGoalFilter('TopMatch')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition ${
            goalFilter === 'TopMatch'
              ? 'bg-cyan-600 text-white shadow-md'
              : 'bg-dark-bg text-dark-muted hover:text-slate-200 border border-dark-border'
          }`}
        >
          Highest Fit Match (80%+)
        </button>
      </div>

      {/* Personalized Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStocks.map((stock) => {
          const isWatchlisted = watchlist.includes(stock.symbol);
          const upsidePct = (((stock.targetPrice - stock.price) / stock.price) * 100).toFixed(1);

          return (
            <div
              key={stock.symbol}
              className="p-6 rounded-3xl bg-dark-card border border-dark-border hover:border-blue-500/50 shadow-xl space-y-4 transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header with Fit Badge */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-0.5 shadow-md">
                      <div className="w-full h-full bg-dark-bg rounded-[14px] flex items-center justify-center font-bold text-white text-base font-mono">
                        {stock.symbol}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-extrabold text-slate-100 text-lg">{stock.symbol}</h3>
                        <button
                          onClick={() => toggleWatchlist(stock.symbol)}
                          className={`p-1 rounded-md transition ${isWatchlisted ? 'text-amber-400' : 'text-dark-muted hover:text-white'}`}
                        >
                          <Star size={16} fill={isWatchlisted ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                      <p className="text-xs text-dark-muted">{stock.name}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="px-3 py-1 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 font-extrabold text-xs font-mono">
                      {stock.fitScore}% Personal Match
                    </div>
                  </div>
                </div>

                {/* Monthly Surplus Allocation Suggestion Card */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/40 to-dark-bg border border-blue-500/30 flex items-center justify-between text-xs font-mono">
                  <div className="text-slate-300">
                    <span className="text-dark-muted">Suggested Monthly SIP: </span>
                    <strong className="text-emerald-400 font-extrabold text-sm">
                      ${stock.suggestedMonthlyAllocation.toLocaleString()}/mo
                    </strong>
                  </div>
                  <div className="text-dark-muted text-[11px]">
                    from your ${wealth.monthlySurplus.toLocaleString()} surplus
                  </div>
                </div>

                {/* Price & Target Row */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-dark-bg rounded-xl border border-dark-border font-mono text-xs">
                  <div>
                    <div className="text-dark-muted text-[10px]">Price</div>
                    <div className="text-slate-100 font-bold text-sm mt-0.5">${stock.price.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-dark-muted text-[10px]">Target</div>
                    <div className="text-emerald-400 font-bold text-sm mt-0.5">${stock.targetPrice.toFixed(2)} (+{upsidePct}%)</div>
                  </div>
                  <div>
                    <div className="text-dark-muted text-[10px]">Signal</div>
                    <div className="text-blue-400 font-bold text-sm mt-0.5">{stock.recommendation}</div>
                  </div>
                </div>

                {/* Personal Rationale Reasons */}
                <div className="space-y-1 pt-1">
                  <div className="text-[11px] font-semibold text-dark-muted">Why it fits your profile:</div>
                  {stock.matchReasons.map((reason, idx) => (
                    <div key={idx} className="text-xs text-slate-300 flex items-start space-x-1.5">
                      <CheckCircle2 size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analyze & Trade Button */}
              <div className="pt-3 border-t border-dark-border flex items-center justify-between">
                <span className="text-xs text-dark-muted font-mono">Risk Rating: <strong className="text-slate-200">{stock.riskScore}</strong></span>
                <button
                  onClick={() => setSelectedStock(stock)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center space-x-1.5 transition"
                >
                  <span>Detailed Analysis</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
