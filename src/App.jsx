import React from 'react';
import { StockProvider, useStock } from './context/StockContext';
import { TickerTape } from './components/layout/TickerTape';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';

import { Dashboard } from './components/dashboard/Dashboard';
import { FinancialQuestionnaire } from './components/profile/FinancialQuestionnaire';
import { PersonalWealthProfiler } from './components/profile/PersonalWealthProfiler';
import { PortfolioBasketView } from './components/recommendations/PortfolioBasketView';
import { RecommendationFeed } from './components/recommendations/RecommendationFeed';
import { StockScreener } from './components/stocks/StockScreener';
import { PortfolioView } from './components/portfolio/PortfolioView';
import { NewsFeed } from './components/news/NewsFeed';
import { StockDetailModal } from './components/stocks/StockDetailModal';
import { LoginPage } from './components/auth/LoginPage';

import { ShieldCheck } from 'lucide-react';

const MainContent = () => {
  const { activeTab, setActiveTab, selectedStock, setSelectedStock, currentUser } = useStock();

  return (
    <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
      {/* Sign-in prompt alert if not authenticated */}
      {!currentUser?.isAuthenticated && activeTab !== 'login' && (
        <div className="mb-6 p-4 rounded-2xl bg-blue-50/80 border border-blue-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 text-white rounded-xl shadow-xs">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Sign In Required for Personalized Demat Recommendations</div>
              <p className="text-[11px] text-slate-500">Sign in using your Email ID or open an investor Demat account to enable factor modeling and save trades.</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('login')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
          >
            Sign In to Demat
          </button>
        </div>
      )}

      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'login' && <LoginPage />}
      {activeTab === 'questionnaire' && <FinancialQuestionnaire />}
      {activeTab === 'wealth-profile' && <PersonalWealthProfiler />}
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

const AppShell = () => {
  const { currentUser, isGuestMode } = useStock();

  // Prompt user to sign in immediately upon opening if not authenticated
  if (!currentUser?.isAuthenticated && !isGuestMode) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
        <TickerTape />
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4 md:p-8">
          <LoginPage />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <TickerTape />
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <MainContent />
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <StockProvider>
      <AppShell />
    </StockProvider>
  );
}
