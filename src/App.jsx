import React from 'react';
import { StockProvider, useStock } from './context/StockContext';
import { TickerTape } from './components/layout/TickerTape';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';

import { Dashboard } from './components/dashboard/Dashboard';
import { FinancialQuestionnaire } from './components/profile/FinancialQuestionnaire';
import { PortfolioBasketView } from './components/recommendations/PortfolioBasketView';
import { RecommendationFeed } from './components/recommendations/RecommendationFeed';
import { StockScreener } from './components/stocks/StockScreener';
import { PortfolioView } from './components/portfolio/PortfolioView';
import { NewsFeed } from './components/news/NewsFeed';
import { StockDetailModal } from './components/stocks/StockDetailModal';

const MainContent = () => {
  const { activeTab, selectedStock, setSelectedStock } = useStock();

  return (
    <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'questionnaire' && <FinancialQuestionnaire />}
      {activeTab === 'portfolio-basket' && <PortfolioBasketView />}
      {activeTab === 'recommendations' && <RecommendationFeed />}
      {activeTab === 'screener' && <StockScreener />}
      {activeTab === 'portfolio' && <PortfolioView />}
      {activeTab === 'news' && <NewsFeed />}

      {/* Detail Modal Overlay */}
      {selectedStock && (
        <StockDetailModal stock={selectedStock} onClose={() => setSelectedStock(null)} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <StockProvider>
      <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col font-sans">
        <TickerTape />
        <Navbar />

        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            <MainContent />
          </main>
        </div>
      </div>
    </StockProvider>
  );
}
