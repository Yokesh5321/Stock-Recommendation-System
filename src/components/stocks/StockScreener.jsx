import React, { useState } from 'react';
import { useStock } from '../../context/StockContext';
import { 
  Filter, 
  Search, 
  ArrowUpDown, 
  TrendingUp, 
  TrendingDown, 
  Star,
  Eye,
  Zap
} from 'lucide-react';

export const StockScreener = () => {
  const { stocks, setSelectedStock, watchlist, toggleWatchlist } = useStock();
  const [sectorFilter, setSectorFilter] = useState('All');
  const [recommendationFilter, setRecommendationFilter] = useState('All');
  const [sortBy, setSortBy] = useState('marketCap'); // price, changePercent, peRatio, confidence, marketCap
  const [sortOrder, setSortOrder] = useState('desc');

  const sectors = ['All', 'Technology', 'Healthcare', 'Financial Services', 'Consumer Cyclical'];

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const filteredStocks = stocks.filter(s => {
    const matchesSector = sectorFilter === 'All' || s.sector === sectorFilter;
    const matchesRec = recommendationFilter === 'All' || s.recommendation === recommendationFilter;
    return matchesSector && matchesRec;
  }).sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (sortBy === 'marketCap') {
      const getNum = str => parseFloat(str) * (str.includes('T') ? 1000 : 1);
      valA = getNum(a.marketCap);
      valB = getNum(b.marketCap);
    }

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
        <h2 className="text-2xl font-black text-slate-900">Stock Screener & Multi-Factor Filters</h2>
        <p className="text-xs text-slate-500">
          Screen stocks across sectors, financial multiples, AI recommendation signals, and volatility profiles.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Sector Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-slate-500 mr-2">Sector:</span>
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setSectorFilter(sec)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                sectorFilter === sec
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Rating Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500">Rating:</span>
          <select
            value={recommendationFilter}
            onChange={(e) => setRecommendationFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500 font-medium"
          >
            <option value="All">All Ratings</option>
            <option value="Strong Buy">Strong Buy</option>
            <option value="Buy">Buy</option>
            <option value="Hold">Hold</option>
            <option value="Sell">Sell</option>
          </select>
        </div>
      </div>

      {/* Screener Data Table */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 tracking-wider uppercase">
              <th className="pb-3 px-3">Symbol / Company</th>
              <th className="pb-3 px-3 cursor-pointer hover:text-slate-900" onClick={() => handleSort('price')}>
                <div className="flex items-center space-x-1">
                  <span>Price</span>
                  <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="pb-3 px-3 cursor-pointer hover:text-slate-900" onClick={() => handleSort('changePercent')}>
                <div className="flex items-center space-x-1">
                  <span>24h Change</span>
                  <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="pb-3 px-3">AI Recommendation</th>
              <th className="pb-3 px-3 cursor-pointer hover:text-slate-900" onClick={() => handleSort('confidence')}>
                <div className="flex items-center space-x-1">
                  <span>Confidence</span>
                  <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="pb-3 px-3 cursor-pointer hover:text-slate-900" onClick={() => handleSort('peRatio')}>
                <div className="flex items-center space-x-1">
                  <span>P/E Ratio</span>
                  <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="pb-3 px-3 cursor-pointer hover:text-slate-900" onClick={() => handleSort('marketCap')}>
                <div className="flex items-center space-x-1">
                  <span>Market Cap</span>
                  <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="pb-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-mono">
            {filteredStocks.map((stock) => {
              const isWatchlisted = watchlist.includes(stock.symbol);
              return (
                <tr key={stock.symbol} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleWatchlist(stock.symbol)}
                        className={`p-1 rounded transition ${isWatchlisted ? 'text-amber-500' : 'text-slate-400 hover:text-slate-700'}`}
                      >
                        <Star size={14} fill={isWatchlisted ? 'currentColor' : 'none'} />
                      </button>
                      <div>
                        <div className="font-bold text-slate-900 text-sm font-sans">{stock.symbol}</div>
                        <div className="text-[11px] text-slate-500 font-sans">{stock.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-bold text-slate-900">${stock.price.toFixed(2)}</td>
                  <td className="py-3.5 px-3">
                    <span className={`flex items-center font-bold ${stock.isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {stock.isUp ? <TrendingUp size={12} className="mr-0.5" /> : <TrendingDown size={12} className="mr-0.5" />}
                      {stock.isUp ? '+' : ''}{stock.changePercent}%
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase font-sans ${
                      stock.recommendation === 'Strong Buy' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      stock.recommendation === 'Buy' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      stock.recommendation === 'Hold' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {stock.recommendation}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-bold text-blue-600">{stock.confidence}%</td>
                  <td className="py-3.5 px-3 text-slate-700">{stock.peRatio}</td>
                  <td className="py-3.5 px-3 text-slate-700">{stock.marketCap}</td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => setSelectedStock(stock)}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs border border-blue-200 flex items-center space-x-1 ml-auto transition font-sans shadow-xs"
                    >
                      <Eye size={14} />
                      <span>Analyze</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
