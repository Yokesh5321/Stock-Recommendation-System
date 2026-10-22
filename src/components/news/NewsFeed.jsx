import React, { useState } from 'react';
import { useStock } from '../../context/StockContext';
import { Newspaper, Sparkles, TrendingUp, TrendingDown, Layers, Filter } from 'lucide-react';

export const NewsFeed = () => {
  const { newsFeed, stocks, setSelectedStock } = useStock();
  const [sentimentFilter, setSentimentFilter] = useState('All');

  const filteredNews = sentimentFilter === 'All'
    ? newsFeed
    : newsFeed.filter(item => item.sentiment === sentimentFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
        <div className="flex items-center space-x-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
          <Newspaper size={18} />
          <span>AI FINANCIAL INTELLIGENCE & NEWS FEED</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900">Market Sentiment & Catalysts</h2>
        <p className="text-xs text-slate-500">
          Real-time news processing using Natural Language Processing (NLP) sentiment scoring for instant market impact analysis.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center space-x-2 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <span className="text-xs font-semibold text-slate-500 mr-2">Sentiment Filter:</span>
        {['All', 'Bullish', 'Neutral', 'Bearish'].map((sent) => (
          <button
            key={sent}
            onClick={() => setSentimentFilter(sent)}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
              sentimentFilter === sent
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {sent}
          </button>
        ))}
      </div>

      {/* News List */}
      <div className="space-y-4">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md shadow-xs space-y-3 transition duration-200"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-3 text-xs font-mono text-slate-500">
                <span className="font-bold text-blue-700">{item.source}</span>
                <span>•</span>
                <span>{item.time}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className={`px-2.5 py-0.5 rounded text-xs font-extrabold ${
                  item.sentiment === 'Bullish' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  item.sentiment === 'Neutral' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}>
                  {item.sentiment} Signal
                </span>
                <span className="text-xs font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-semibold">
                  Impact Score: {item.impactScore}/100
                </span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">{item.summary}</p>

            {/* Related Tickers */}
            <div className="pt-3 border-t border-slate-100 flex items-center space-x-2">
              <span className="text-xs text-slate-500 font-mono">Impacted Symbols:</span>
              <div className="flex items-center space-x-1.5">
                {item.relatedTickers.map((ticker) => {
                  const matchedStock = stocks.find(s => s.symbol === ticker);
                  return (
                    <button
                      key={ticker}
                      onClick={() => matchedStock && setSelectedStock(matchedStock)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 border border-slate-200 text-xs font-mono font-bold text-slate-700 hover:text-blue-700 transition"
                    >
                      ${ticker}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
