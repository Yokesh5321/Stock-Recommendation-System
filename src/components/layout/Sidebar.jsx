import React from 'react';
import { useStock } from '../../context/StockContext';
import { 
  LayoutDashboard, 
  Sparkles, 
  Filter, 
  Briefcase, 
  Newspaper, 
  Wallet, 
  TrendingUp,
  BarChart3,
  DollarSign,
  HelpCircle,
  Layers
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, getPortfolioSummary, getWealthSummary } = useStock();
  const summary = getPortfolioSummary();
  const wealth = getWealthSummary();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'questionnaire', label: 'Guided Quiz', icon: HelpCircle, badge: '5-STEP' },
    { id: 'portfolio-basket', label: 'Portfolio Basket', icon: Layers, badge: 'AI BASKET' },
    { id: 'recommendations', label: 'Single Stock Picks', icon: Sparkles, badge: null },
    { id: 'screener', label: 'Stock Screener', icon: Filter, badge: null },
    { id: 'portfolio', label: 'Active Portfolio', icon: Briefcase, badge: null },
    { id: 'news', label: 'Market Sentiment', icon: Newspaper, badge: null },
  ];

  return (
    <aside className="w-64 bg-dark-bg border-r border-dark-border flex flex-col justify-between hidden md:flex min-h-[calc(100vh-4rem)] select-none">
      <div className="p-4 space-y-6">
        {/* Nav list */}
        <nav className="space-y-1.5">
          <p className="px-3 text-[11px] font-semibold text-dark-muted tracking-wider uppercase mb-2">Portfolio Engine</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm'
                    : 'text-dark-muted hover:text-slate-200 hover:bg-dark-hover'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon size={18} className={isActive ? 'text-blue-400' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-cyan-500/20 text-cyan-400 rounded-md">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Financial Surplus Widget */}
        <div 
          onClick={() => setActiveTab('questionnaire')}
          className="p-4 rounded-2xl bg-gradient-to-b from-dark-card to-dark-bg border border-dark-border space-y-3 cursor-pointer hover:border-blue-500/40 transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-dark-muted font-medium">Monthly Investment Capacity</span>
            <DollarSign size={14} className="text-cyan-400" />
          </div>
          <div className="text-xl font-extrabold text-cyan-400 font-mono">
            ${wealth.monthlySurplus.toLocaleString()}/mo
          </div>
          <div className="w-full bg-dark-border h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-cyan-400 h-full rounded-full"
              style={{ width: `${Math.min(100, wealth.savingsRate)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[11px] text-dark-muted font-mono">
            <span>Savings Rate: {wealth.savingsRate}%</span>
            <span>Net Worth: ${(wealth.netWorth/1000).toFixed(0)}k</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-dark-border text-center">
        <div className="text-xs text-dark-muted flex items-center justify-center space-x-1">
          <BarChart3 size={14} className="text-cyan-400" />
          <span>Basket Quant Analytics</span>
        </div>
      </div>
    </aside>
  );
};
