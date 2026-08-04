import React, { useState } from 'react';
import { useStock } from '../../context/StockContext';
import { StockChart } from './StockChart';
import { TradeModal } from '../portfolio/TradeModal';
import { 
  X, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  Star, 
  ShieldAlert, 
  Target, 
  CheckCircle, 
  AlertTriangle,
  ArrowUpRight,
  Zap,
  Wallet,
  DollarSign
} from 'lucide-react';

export const StockDetailModal = ({ stock, onClose }) => {
  const { watchlist, toggleWatchlist, financialProfile, getWealthSummary, getPersonalizedFit } = useStock();
  const [showTradeModal, setShowTradeModal] = useState(false);

  if (!stock) return null;

  const wealth = getWealthSummary();
  const fit = getPersonalizedFit(stock);
  const isWatchlisted = watchlist.includes(stock.symbol);
  const upsidePct = (((stock.targetPrice - stock.price) / stock.price) * 100).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-dark-card border border-dark-border rounded-3xl max-w-4xl w-full p-6 md:p-8 shadow-2xl space-y-6 relative my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-dark-muted hover:text-white p-2 rounded-xl bg-dark-bg border border-dark-border hover:bg-dark-hover transition"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pr-12">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-0.5 shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-dark-bg rounded-[14px] flex items-center justify-center font-extrabold text-white text-xl font-mono">
                {stock.symbol}
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-extrabold text-white">{stock.name}</h2>
                <button
                  onClick={() => toggleWatchlist(stock.symbol)}
                  className={`p-1.5 rounded-lg border transition ${
                    isWatchlisted
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                      : 'bg-dark-bg border-dark-border text-dark-muted hover:text-white'
                  }`}
                >
                  <Star size={18} fill={isWatchlisted ? 'currentColor' : 'none'} />
                </button>
              </div>
              <div className="flex items-center space-x-2 text-xs text-dark-muted mt-1">
                <span>{stock.sector}</span>
                <span>•</span>
                <span>{stock.industry}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-left md:text-right">
              <div className="text-3xl font-extrabold text-white font-mono">${stock.price.toFixed(2)}</div>
              <div className={`flex items-center text-sm font-semibold ${stock.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                {stock.isUp ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                {stock.isUp ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent}%)
              </div>
            </div>

            <button
              onClick={() => setShowTradeModal(true)}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center space-x-2 transition"
            >
              <ArrowUpRight size={18} />
              <span>Trade Now</span>
            </button>
          </div>
        </div>

        {/* Personal Fit & Dollar Allocation Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/50 via-dark-bg to-cyan-950/50 border border-cyan-500/30 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <Wallet className="text-cyan-400" size={20} />
              <span className="font-extrabold text-white text-base">Salary & Assets Compatibility</span>
            </div>

            <span className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-black text-xs font-mono">
              {fit.fitScore}% Personal Match
            </span>
          </div>

          <div className="p-3 bg-dark-bg rounded-xl border border-dark-border flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-2">
            <div className="text-slate-300">
              Suggested Monthly Investment: <strong className="text-emerald-400 font-extrabold text-sm">${fit.suggestedMonthlyAllocation.toLocaleString()}/mo</strong>
            </div>
            <div className="text-dark-muted">
              Out of your ${wealth.monthlySurplus.toLocaleString()} surplus
            </div>
          </div>

          <div className="space-y-1">
            {fit.matchReasons.map((reason, idx) => (
              <div key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                <CheckCircle size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Chart */}
        <div className="p-5 rounded-2xl bg-dark-bg border border-dark-border">
          <StockChart stock={stock} />
        </div>

        {/* AI Rationale */}
        <div className="p-5 rounded-2xl bg-dark-bg/80 border border-dark-border space-y-3">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
            <Sparkles size={18} />
            <span>AI Fundamental Rationale</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            {stock.aiRationale}
          </p>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-950/10 border border-emerald-500/20 space-y-2">
            <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1.5">
              <CheckCircle size={15} />
              <span>Investment Catalysts (Pros)</span>
            </span>
            <ul className="space-y-1.5">
              {stock.pros.map((pro, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-rose-950/10 border border-rose-500/20 space-y-2">
            <span className="text-xs font-bold text-rose-400 flex items-center space-x-1.5">
              <AlertTriangle size={15} />
              <span>Key Risks (Cons)</span>
            </span>
            <ul className="space-y-1.5">
              {stock.cons.map((con, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                  <span className="text-rose-400 mt-0.5">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {showTradeModal && (
        <TradeModal stock={stock} onClose={() => setShowTradeModal(false)} />
      )}
    </div>
  );
};
