import React, { useState } from 'react';
import { useStock } from '../../context/StockContext';
import { X, ArrowUpRight, ArrowDownRight, DollarSign, CheckCircle2 } from 'lucide-react';

export const TradeModal = ({ stock, onClose }) => {
  const { executeTrade, portfolio, currentUser } = useStock();
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
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 relative text-slate-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center font-bold text-blue-700 text-lg">
            {stock.symbol}
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900">{stock.name}</h3>
            <p className="text-xs text-slate-500 font-mono">
              Live Price: <span className="text-slate-800 font-semibold">${stock.price.toFixed(2)}</span>
            </p>
          </div>
        </div>

        {/* Success overlay */}
        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 size={48} className="text-emerald-600 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-emerald-600">Order Executed Successfully!</h4>
            <p className="text-xs text-slate-500 font-mono">
              {tradeType} {shares} shares of {stock.symbol} @ ${stock.price.toFixed(2)}
            </p>
          </div>
        ) : (
          <form onSubmit={handleExecute} className="space-y-4">
            {/* BUY / SELL Switch */}
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setTradeType('BUY')}
                className={`py-2 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1 ${
                  tradeType === 'BUY'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
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
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ArrowDownRight size={14} />
                <span>SELL {stock.symbol}</span>
              </button>
            </div>

            {/* Account Info */}
            {currentUser?.dematAccountNo && (
              <div className="flex justify-between text-xs font-mono p-3 bg-blue-50/70 rounded-xl border border-blue-200">
                <span className="text-slate-500">Trading Demat:</span>
                <span className="text-blue-700 font-semibold">{currentUser.dematAccountNo}</span>
              </div>
            )}
            <div className="flex justify-between text-xs font-mono p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500">Cash Available:</span>
              <span className="text-slate-900 font-semibold">${portfolio.cashBalance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs font-mono p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500">Currently Owned:</span>
              <span className="text-slate-900 font-semibold">{ownedShares} shares</span>
            </div>

            {/* Quantity Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Number of Shares</label>
              <input
                type="number"
                min="1"
                max={tradeType === 'SELL' ? ownedShares || 1 : 1000}
                value={shares}
                onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-mono focus:outline-hidden focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            {/* Total summary */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Estimated Total</span>
                <span>{tradeType === 'BUY' ? 'Debit' : 'Credit'}</span>
              </div>
              <div className="text-2xl font-extrabold text-slate-900 font-mono">
                ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            {/* Action button */}
            <button
              type="submit"
              className={`w-full py-3 rounded-xl font-bold text-sm shadow-md transition ${
                tradeType === 'BUY'
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                  : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20'
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
