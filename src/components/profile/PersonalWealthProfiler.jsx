import React from 'react';
import { useStock } from '../../context/StockContext';
import { 
  Wallet, 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  PieChart, 
  Layers, 
  ArrowRight,
  PiggyBank,
  AlertCircle
} from 'lucide-react';

export const PersonalWealthProfiler = () => {
  const { financialProfile, setFinancialProfile, getWealthSummary, setActiveTab } = useStock();
  const summary = getWealthSummary();

  const handleInputChange = (field, value) => {
    setFinancialProfile(prev => ({
      ...prev,
      [field]: typeof value === 'number' ? Math.max(0, value) : value
    }));
  };

  const goalsList = [
    { id: 'Wealth Accumulation', label: 'Wealth Accumulation', desc: 'Focus on high upside, long-term capital appreciation' },
    { id: 'Passive Dividend Income', label: 'Passive Dividend Income', desc: 'Focus on quarterly cash dividends & yield stability' },
    { id: 'Capital Preservation', label: 'Capital Preservation', desc: 'Protect principal with blue-chip defensive stocks' },
    { id: 'Aggressive Growth', label: 'Aggressive AI Growth', desc: 'Maximize tech & AI growth stock exposure' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950 via-dark-card to-indigo-950 border border-blue-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-semibold text-cyan-400">
            <Wallet size={14} />
            <span>PERSONAL WEALTH & SALARY ENGINE</span>
          </div>
          <h2 className="text-3xl font-black text-white">Your Financial Profile & Goals</h2>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Enter your monthly salary, living expenses, assets, and debt. Our AI match algorithm will recommend stock quantities and monthly dollar allocations tailored specifically to your financial capacity.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('recommendations')}
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/30 flex items-center space-x-2 whitespace-nowrap transition"
        >
          <span>View Matched Stock Picks</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Real-time Financial Metrics Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-dark-card border border-dark-border space-y-2">
          <div className="flex items-center justify-between text-xs text-dark-muted">
            <span>Calculated Net Worth</span>
            <PiggyBank size={16} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-100 font-mono">
            ${summary.netWorth.toLocaleString()}
          </div>
          <div className="text-[11px] text-dark-muted font-mono">
            Assets (${summary.totalAssets.toLocaleString()}) - Liabilities
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-dark-card border border-dark-border space-y-2">
          <div className="flex items-center justify-between text-xs text-dark-muted">
            <span>Monthly Surplus to Invest</span>
            <DollarSign size={16} className="text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono">
            ${summary.monthlySurplus.toLocaleString()}/mo
          </div>
          <div className="text-[11px] text-dark-muted font-mono">
            Salary (${financialProfile.monthlySalary.toLocaleString()}) - Expenses
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-dark-card border border-dark-border space-y-2">
          <div className="flex items-center justify-between text-xs text-dark-muted">
            <span>Emergency Cash Buffer</span>
            <ShieldCheck size={16} className="text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-100 font-mono">
            {summary.emergencyBufferMonths} Months
          </div>
          <div className={`text-[11px] font-medium ${summary.emergencyBufferMonths >= 6 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {summary.emergencyBufferMonths >= 6 ? '✓ Healthy liquid reserve' : '⚠️ Recommended: 6+ months'}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-dark-card border border-dark-border space-y-2">
          <div className="flex items-center justify-between text-xs text-dark-muted">
            <span>Monthly Savings Rate</span>
            <TrendingUp size={16} className="text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-100 font-mono">
            {summary.savingsRate}%
          </div>
          <div className="text-[11px] text-dark-muted font-mono">
            Surplus / Monthly Salary
          </div>
        </div>
      </div>

      {/* Main Profile Form & Goal Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-dark-card border border-dark-border space-y-6">
          <h3 className="text-lg font-bold text-slate-100 border-b border-dark-border pb-3">
            Income, Expenses & Wealth Breakdown
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Monthly Salary */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Monthly Salary / Income ($)</label>
              <input
                type="number"
                min="0"
                value={financialProfile.monthlySalary}
                onChange={(e) => handleInputChange('monthlySalary', parseFloat(e.target.value) || 0)}
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Monthly Expenses */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Monthly Living Expenses ($)</label>
              <input
                type="number"
                min="0"
                value={financialProfile.monthlyExpenses}
                onChange={(e) => handleInputChange('monthlyExpenses', parseFloat(e.target.value) || 0)}
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Liquid Cash */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Liquid Cash & Bank Savings ($)</label>
              <input
                type="number"
                min="0"
                value={financialProfile.liquidCash}
                onChange={(e) => handleInputChange('liquidCash', parseFloat(e.target.value) || 0)}
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Real Estate & Investments */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Real Estate & Property Assets ($)</label>
              <input
                type="number"
                min="0"
                value={financialProfile.realEstateAssets}
                onChange={(e) => handleInputChange('realEstateAssets', parseFloat(e.target.value) || 0)}
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Total Liabilities */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Total Loans & Liabilities ($)</label>
              <input
                type="number"
                min="0"
                value={financialProfile.totalLiabilities}
                onChange={(e) => handleInputChange('totalLiabilities', parseFloat(e.target.value) || 0)}
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Dependents */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Number of Family Dependents</label>
              <input
                type="number"
                min="0"
                value={financialProfile.dependents}
                onChange={(e) => handleInputChange('dependents', parseInt(e.target.value) || 0)}
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Goal Selector (1 col) */}
        <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-4">
          <h3 className="text-lg font-bold text-slate-100 border-b border-dark-border pb-3">
            Primary Financial Need
          </h3>

          <div className="space-y-3">
            {goalsList.map((g) => (
              <div
                key={g.id}
                onClick={() => handleInputChange('primaryGoal', g.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition ${
                  financialProfile.primaryGoal === g.id
                    ? 'bg-blue-600/20 border-blue-500 text-slate-100 shadow-md'
                    : 'bg-dark-bg border-dark-border text-dark-muted hover:border-slate-600'
                }`}
              >
                <div className="font-bold text-sm text-slate-100 flex items-center justify-between">
                  <span>{g.label}</span>
                  {financialProfile.primaryGoal === g.id && <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>}
                </div>
                <p className="text-xs text-dark-muted mt-1">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
