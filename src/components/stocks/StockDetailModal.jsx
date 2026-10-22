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
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full p-6 md:p-8 shadow-2xl space-y-6 relative my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-slate-400 hover:text-slate-900 p-2 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 transition"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pr-12">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center font-extrabold text-blue-700 text-xl font-mono shadow-xs">
              {stock.symbol}
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-extrabold text-slate-900">{stock.name}</h2>
                <button
                  onClick={() => toggleWatchlist(stock.symbol)}
                  className={`p-1.5 rounded-lg border transition ${
                    isWatchlisted
                      ? 'bg-amber-50 border-amber-300 text-amber-500'
                      : 'bg-slate-100 border-slate-200 text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <Star size={18} fill={isWatchlisted ? 'currentColor' : 'none'} />
                </button>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
                <span>{stock.sector}</span>
                <span>•</span>
                <span>{stock.industry}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-left md:text-right">
              <div className="text-3xl font-extrabold text-slate-900 font-mono">${stock.price.toFixed(2)}</div>
              <div className={`flex items-center text-sm font-bold ${stock.isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stock.isUp ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                {stock.isUp ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent}%)
              </div>
            </div>

            <button
              onClick={() => setShowTradeModal(true)}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 flex items-center space-x-2 transition"
            >
              <ArrowUpRight size={18} />
              <span>Trade Now</span>
            </button>
          </div>
        </div>

        {/* Personal Fit & Dollar Allocation Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/40 border border-blue-200/90 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <Wallet className="text-blue-600" size={20} />
              <span className="font-extrabold text-slate-900 text-base">Salary & Assets Compatibility</span>
            </div>

            <span className="px-3 py-1 rounded-xl bg-blue-100 border border-blue-200 text-blue-800 font-bold text-xs font-mono">
              {fit.fitScore}% Personal Match
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-2 shadow-xs">
            <div className="text-slate-700">
              Suggested Monthly Investment: <strong className="text-emerald-600 font-bold text-sm">${fit.suggestedMonthlyAllocation.toLocaleString()}/mo</strong>
            </div>
            <div className="text-slate-500">
              Out of your ${wealth.monthlySurplus.toLocaleString()} surplus
            </div>
          </div>

          <div className="space-y-1">
            {fit.matchReasons.map((reason, idx) => (
              <div key={idx} className="text-xs text-slate-700 flex items-start space-x-2">
                <CheckCircle size={14} className="text-blue-600 mt-0.5 shrink-0" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Chart */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <StockChart stock={stock} />
        </div>

        {/* AI Rationale */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center space-x-2 text-blue-700 font-bold text-sm">
            <Sparkles size={18} />
            <span>AI Fundamental Rationale</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed font-sans">
            {stock.aiRationale}
          </p>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 space-y-2">
            <span className="text-xs font-bold text-emerald-800 flex items-center space-x-1.5">
              <CheckCircle size={15} />
              <span>Investment Catalysts (Pros)</span>
            </span>
            <ul className="space-y-1.5">
              {stock.pros.map((pro, idx) => (
                <li key={idx} className="text-xs text-slate-700 flex items-start space-x-2">
                  <span className="text-emerald-600 font-bold mt-0.5">•</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/90 space-y-2">
            <span className="text-xs font-bold text-rose-800 flex items-center space-x-1.5">
              <AlertTriangle size={15} />
              <span>Key Risks (Cons)</span>
            </span>
            <ul className="space-y-1.5">
              {stock.cons.map((con, idx) => (
                <li key={idx} className="text-xs text-slate-700 flex items-start space-x-2">
                  <span className="text-rose-600 font-bold mt-0.5">•</span>
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
