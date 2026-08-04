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
  const { stocks, indices, newsFeed, setSelectedStock, setActiveTab, financialProfile, getWealthSummary, getPersonalizedFit } = useStock();

  const wealth = getWealthSummary();
  
  // Find top stock matched to personal salary/goal
  const rankedStocks = stocks.map(s => ({
    ...s,
    fit: getPersonalizedFit(s)
  })).sort((a, b) => b.fit.fitScore - a.fit.fitScore);

  const topPersonalPick = rankedStocks[0];
  const topGainers = [...stocks].sort((a, b) => b.changePercent - a.changePercent).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Top Personal Financial Quick Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-dark-card border border-dark-border flex items-center justify-between">
          <div>
            <div className="text-xs text-dark-muted font-medium">Monthly Surplus Available</div>
            <div className="text-xl font-extrabold text-cyan-400 font-mono mt-0.5">${wealth.monthlySurplus.toLocaleString()}/mo</div>
          </div>
          <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
            <DollarSign size={20} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-dark-card border border-dark-border flex items-center justify-between">
          <div>
            <div className="text-xs text-dark-muted font-medium">Calculated Net Worth</div>
            <div className="text-xl font-extrabold text-slate-100 font-mono mt-0.5">${wealth.netWorth.toLocaleString()}</div>
          </div>
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
            <Wallet size={20} />
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('wealth-profile')}
          className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-dark-card border border-blue-500/30 flex items-center justify-between cursor-pointer hover:border-blue-500 transition"
        >
          <div>
            <div className="text-xs text-dark-muted font-medium">Primary Financial Goal</div>
            <div className="text-sm font-extrabold text-blue-400 mt-0.5">{financialProfile.primaryGoal}</div>
          </div>
          <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
            <ShieldCheck size={20} />
          </div>
        </div>
      </div>

      {/* Hero AI Signal Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-dark-card to-indigo-950 border border-blue-500/30 p-6 md:p-8 shadow-2xl">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-semibold text-cyan-400">
              <Sparkles size={14} />
              <span>TOP STOCK MATCH FOR YOUR ${financialProfile.monthlySalary.toLocaleString()} SALARY</span>
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-3xl font-black text-white">{topPersonalPick.symbol}</h2>
                <span className="text-sm text-dark-muted font-medium">{topPersonalPick.name}</span>
                <span className="px-2.5 py-1 text-xs font-extrabold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg">
                  {topPersonalPick.fit.fitScore}% Personal Match
                </span>
              </div>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                {topPersonalPick.aiRationale}
              </p>
            </div>

            {/* Suggested allocation pill */}
            <div className="p-3 bg-dark-bg/80 border border-dark-border rounded-xl font-mono text-xs text-slate-200">
              Suggested Monthly Investment: <strong className="text-emerald-400 font-extrabold">${topPersonalPick.fit.suggestedMonthlyAllocation.toLocaleString()}/month</strong> from your ${wealth.monthlySurplus.toLocaleString()} surplus.
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="text-xs font-mono">
                <span className="text-dark-muted">Price: </span>
                <span className="text-slate-100 font-extrabold text-base">${topPersonalPick.price.toFixed(2)}</span>
              </div>
              <div className="text-xs font-mono">
                <span className="text-dark-muted">Target: </span>
                <span className="text-emerald-400 font-extrabold text-base">${topPersonalPick.targetPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={() => setSelectedStock(topPersonalPick)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/30 flex items-center space-x-2 transition"
              >
                <span>View Full Breakdown</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          {/* Market Sentiment Gauge Widget */}
          <div className="p-5 rounded-2xl bg-dark-bg/80 border border-dark-border space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-dark-muted font-medium">Overall Market Sentiment</span>
              <span className="text-emerald-400 font-bold flex items-center">
                <Activity size={14} className="mr-1" /> Bullish (78/100)
              </span>
            </div>
            <div className="w-full bg-dark-border h-3 rounded-full overflow-hidden p-0.5">
              <div className="bg-gradient-to-r from-amber-500 via-blue-500 to-emerald-400 h-full rounded-full" style={{ width: '78%' }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-dark-muted font-mono">
              <span>Fear (0)</span>
              <span>Neutral (50)</span>
              <span>Greed (100)</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Institutional flows indicate strong momentum in semiconductor & software large-caps.
            </p>
          </div>
        </div>
      </div>

      {/* Top Gainers & Ranked Picks Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Stocks Grid (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles size={18} className="text-cyan-400" />
              <h3 className="text-base font-bold text-slate-100">Top Matched Stocks For You</h3>
            </div>
            <button
              onClick={() => setActiveTab('recommendations')}
              className="text-xs text-blue-400 hover:underline font-medium"
            >
              View All Matched Picks →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rankedStocks.slice(0, 4).map((stock) => (
              <div
                key={stock.symbol}
                onClick={() => setSelectedStock(stock)}
                className="p-4 rounded-2xl bg-dark-card border border-dark-border hover:border-blue-500/50 cursor-pointer transition space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center font-bold text-blue-400 text-sm">
                      {stock.symbol}
                    </div>
                    <div>
                      <div className="font-bold text-slate-100 text-sm group-hover:text-cyan-400 transition">{stock.symbol}</div>
                      <div className="text-[11px] text-dark-muted">{stock.sector}</div>
                    </div>
                  </div>

                  <span className="text-[11px] px-2 py-0.5 rounded font-extrabold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    {stock.fit.fitScore}% Match
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-dark-border">
                  <div>
                    <span className="text-dark-muted">Price: </span>
                    <span className="text-slate-100 font-bold">${stock.price.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-dark-muted">Suggested: </span>
                    <span className="text-emerald-400 font-bold">${stock.fit.suggestedMonthlyAllocation}/mo</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Movers */}
        <div className="p-5 rounded-2xl bg-dark-card border border-dark-border space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp size={18} className="text-emerald-400" />
              <h3 className="text-base font-bold text-slate-100">Top Daily Movers</h3>
            </div>
          </div>

          <div className="space-y-3">
            {topGainers.map((stock) => (
              <div
                key={stock.symbol}
                onClick={() => setSelectedStock(stock)}
                className="p-3 rounded-xl bg-dark-bg/70 border border-dark-border hover:bg-dark-hover flex items-center justify-between cursor-pointer transition"
              >
                <div>
                  <div className="font-bold text-slate-200 text-sm">{stock.symbol}</div>
                  <div className="text-[11px] text-dark-muted">{stock.name}</div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-sm font-bold text-slate-100">${stock.price.toFixed(2)}</div>
                  <div className="text-xs font-semibold text-emerald-400 flex items-center justify-end">
                    <TrendingUp size={12} className="mr-0.5" />
                    +{stock.changePercent}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
