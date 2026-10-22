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
  Layers,
  CreditCard
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, getPortfolioSummary, getWealthSummary, currentUser } = useStock();
  const summary = getPortfolioSummary();
  const wealth = getWealthSummary();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'questionnaire', label: '🎯 Stock Need Quiz', icon: HelpCircle, badge: 'RECOMMENDED', highlight: true },
    { id: 'portfolio-basket', label: 'Recommended Basket', icon: Layers, badge: 'AI BASKET' },
    { id: 'recommendations', label: 'Single Stock Picks', icon: Sparkles, badge: null },
    { id: 'login', label: 'Demat Account', icon: CreditCard, badge: currentUser?.isAuthenticated ? 'ACTIVE' : 'LOGIN' },
    { id: 'wealth-profile', label: 'Wealth & Inputs', icon: Wallet, badge: 'SALARY' },
    { id: 'screener', label: 'Stock Screener', icon: Filter, badge: null },
    { id: 'portfolio', label: 'Active Portfolio', icon: Briefcase, badge: null },
    { id: 'news', label: 'Market Sentiment', icon: Newspaper, badge: null },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-4rem)] select-none">
      <div className="p-4 space-y-6">
        {/* Nav list */}
        <nav className="space-y-1">
          <p className="px-3 text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-2">Portfolio Engine</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                    : item.highlight
                    ? 'bg-blue-50/80 text-blue-800 border border-blue-200/90 font-semibold hover:bg-blue-100/70'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon size={18} className={isActive ? 'text-white' : item.highlight ? 'text-blue-600' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-md ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : item.highlight
                      ? 'bg-blue-600 text-white animate-pulse'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
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
          className="p-4 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 space-y-3 cursor-pointer hover:border-blue-400 hover:shadow-sm transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Monthly Surplus</span>
            <DollarSign size={14} className="text-blue-600" />
          </div>
          <div className="text-xl font-black text-blue-600 font-mono">
            ${wealth.monthlySurplus.toLocaleString()}/mo
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, wealth.savingsRate)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>Savings: {wealth.savingsRate}%</span>
            <span>Net Worth: ${(wealth.netWorth/1000).toFixed(0)}k</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-200 text-center">
        <div className="text-xs text-slate-400 flex items-center justify-center space-x-1.5 font-medium">
          <BarChart3 size={14} className="text-blue-600" />
          <span>Quant Analytics Engine</span>
        </div>
      </div>
    </aside>
  );
};
