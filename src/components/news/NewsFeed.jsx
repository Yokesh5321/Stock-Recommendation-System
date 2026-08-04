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
      <div className="p-6 rounded-2xl bg-gradient-to-r from-dark-card to-dark-bg border border-dark-border space-y-1">
        <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
          <Newspaper size={18} />
          <span>AI FINANCIAL INTELLIGENCE & NEWS FEED</span>
        </div>
        <h2 className="text-2xl font-black text-white">Market Sentiment & Catalysts</h2>
        <p className="text-xs text-dark-muted">
          Real-time news processing using Natural Language Processing (NLP) sentiment scoring for instant market impact analysis.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center space-x-2 p-4 rounded-2xl bg-dark-card border border-dark-border">
        <span className="text-xs font-semibold text-dark-muted mr-2">Sentiment Filter:</span>
        {['All', 'Bullish', 'Neutral', 'Bearish'].map((sent) => (
          <button
            key={sent}
            onClick={() => setSentimentFilter(sent)}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
              sentimentFilter === sent
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-dark-bg text-dark-muted hover:text-slate-200 border border-dark-border'
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
            className="p-6 rounded-2xl bg-dark-card border border-dark-border hover:border-blue-500/40 shadow-xl space-y-3 transition"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-3 text-xs font-mono text-dark-muted">
                <span className="font-bold text-blue-400">{item.source}</span>
                <span>•</span>
                <span>{item.time}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className={`px-2.5 py-0.5 rounded text-xs font-extrabold ${
                  item.sentiment === 'Bullish' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                  item.sentiment === 'Neutral' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}>
                  {item.sentiment} Signal
                </span>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  Impact Score: {item.impactScore}/100
                </span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-100">{item.title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">{item.summary}</p>

            {/* Related Tickers */}
            <div className="pt-3 border-t border-dark-border flex items-center space-x-2">
              <span className="text-xs text-dark-muted font-mono">Impacted Symbols:</span>
              <div className="flex items-center space-x-1.5">
                {item.relatedTickers.map((ticker) => {
                  const matchedStock = stocks.find(s => s.symbol === ticker);
                  return (
                    <button
                      key={ticker}
                      onClick={() => matchedStock && setSelectedStock(matchedStock)}
                      className="px-2.5 py-1 rounded-lg bg-dark-bg hover:bg-dark-hover border border-dark-border text-xs font-mono font-bold text-slate-200 hover:text-cyan-400 transition"
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
