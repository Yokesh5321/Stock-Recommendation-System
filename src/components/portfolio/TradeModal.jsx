import React, { useState } from 'react';
import { useStock } from '../../context/StockContext';
import { X, ArrowUpRight, ArrowDownRight, DollarSign, CheckCircle2 } from 'lucide-react';

export const TradeModal = ({ stock, onClose }) => {
  const { executeTrade, portfolio } = useStock();
  const [tradeType, setTradeType] = useState('BUY');
  const [shares, setShares] = useState(5);
  const [isSuccess, setIsSuccess] = useState(false);

  const existingHolding = portfolio.holdings.find(h => h.symbol === stock.symbol);
  const ownedShares = existingHolding ? existingHolding.shares : 0;

  const totalCost = shares * stock.price;

  const handleExecute = (e) => {
    e.preventDefault();
    if (shares <= 0) return;

    const success = executeTrade(stock.symbol, tradeType, Number(shares), stock.price);
    if (success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-dark-card border border-dark-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-dark-muted hover:text-white p-1 rounded-lg hover:bg-dark-hover transition"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-bold text-blue-400 text-lg">
            {stock.symbol}
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-100">{stock.name}</h3>
            <p className="text-xs text-dark-muted font-mono">
              Live Price: <span className="text-slate-200 font-semibold">${stock.price.toFixed(2)}</span>
            </p>
          </div>
        </div>

        {/* Success overlay */}
        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 size={48} className="text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-emerald-400">Order Executed Successfully!</h4>
            <p className="text-xs text-dark-muted font-mono">
              {tradeType} {shares} shares of {stock.symbol} @ ${stock.price.toFixed(2)}
            </p>
          </div>
        ) : (
          <form onSubmit={handleExecute} className="space-y-4">
            {/* BUY / SELL Switch */}
            <div className="grid grid-cols-2 gap-2 bg-dark-bg p-1 rounded-xl border border-dark-border">
              <button
                type="button"
                onClick={() => setTradeType('BUY')}
                className={`py-2 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1 ${
                  tradeType === 'BUY'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-dark-muted hover:text-slate-200'
                }`}
              >
                <ArrowUpRight size={14} />
                <span>BUY {stock.symbol}</span>
              </button>
              <button
                type="button"
                onClick={() => setTradeType('SELL')}
                className={`py-2 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1 ${
                  tradeType === 'SELL'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-dark-muted hover:text-slate-200'
                }`}
              >
                <ArrowDownRight size={14} />
                <span>SELL {stock.symbol}</span>
              </button>
            </div>

            {/* Account Info */}
            <div className="flex justify-between text-xs font-mono p-3 bg-dark-bg/60 rounded-xl border border-dark-border">
              <span className="text-dark-muted">Cash Available:</span>
              <span className="text-slate-200 font-semibold">${portfolio.cashBalance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs font-mono p-3 bg-dark-bg/60 rounded-xl border border-dark-border">
              <span className="text-dark-muted">Currently Owned:</span>
              <span className="text-slate-200 font-semibold">{ownedShares} shares</span>
            </div>

            {/* Quantity Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-dark-muted">Number of Shares</label>
              <input
                type="number"
                min="1"
                max={tradeType === 'SELL' ? ownedShares || 1 : 1000}
                value={shares}
                onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-slate-100 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Total summary */}
            <div className="p-4 bg-gradient-to-r from-dark-bg to-dark-hover rounded-xl border border-dark-border space-y-1">
              <div className="flex justify-between text-xs text-dark-muted">
                <span>Estimated Total</span>
                <span>{tradeType === 'BUY' ? 'Debit' : 'Credit'}</span>
              </div>
              <div className="text-xl font-extrabold text-slate-100 font-mono">
                ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            {/* Action button */}
            <button
              type="submit"
              className={`w-full py-3 rounded-xl font-bold text-sm shadow-lg transition ${
                tradeType === 'BUY'
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20'
                  : 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20'
              }`}
            >
              Confirm {tradeType} Order
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
