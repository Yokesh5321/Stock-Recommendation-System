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
  AlertCircle,
  Sparkles
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
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-50/90 via-indigo-50/40 to-white border border-blue-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-100/70 border border-blue-200 rounded-full text-xs font-bold text-blue-700">
            <Wallet size={14} />
            <span>PERSONAL WEALTH & SALARY ENGINE</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900">Your Financial Profile & Goals</h2>
          <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
            Enter your monthly salary, living expenses, assets, and debt. Our AI match algorithm will recommend stock quantities and monthly dollar allocations tailored specifically to your financial capacity.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('questionnaire')}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center space-x-2 whitespace-nowrap transition cursor-pointer"
          >
            <Sparkles size={16} className="text-amber-300" />
            <span>🎯 Take Stock Need Quiz</span>
          </button>

          <button
            onClick={() => setActiveTab('recommendations')}
            className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs flex items-center space-x-2 whitespace-nowrap transition"
          >
            <span>View Matched Stock Picks</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Real-time Financial Metrics Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Calculated Net Worth</span>
            <PiggyBank size={16} className="text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            ${summary.netWorth.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Assets (${summary.totalAssets.toLocaleString()}) - Liabilities
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Monthly Surplus to Invest</span>
            <DollarSign size={16} className="text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-blue-600 font-mono">
            ${summary.monthlySurplus.toLocaleString()}/mo
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Salary (${financialProfile.monthlySalary.toLocaleString()}) - Expenses
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Emergency Cash Buffer</span>
            <ShieldCheck size={16} className="text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {summary.emergencyBufferMonths} Months
          </div>
          <div className={`text-[11px] font-bold ${summary.emergencyBufferMonths >= 6 ? 'text-emerald-600' : 'text-amber-600'}`}>
            {summary.emergencyBufferMonths >= 6 ? '✓ Healthy liquid reserve' : '⚠️ Recommended: 6+ months'}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Monthly Savings Rate</span>
            <TrendingUp size={16} className="text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {summary.savingsRate}%
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Surplus / Monthly Salary
          </div>
        </div>
      </div>

      {/* Main Profile Form & Goal Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Income, Expenses & Wealth Breakdown
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Monthly Salary */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Monthly Salary / Income ($)</label>
              <input
                type="number"
                min="0"
                value={financialProfile.monthlySalary}
                onChange={(e) => handleInputChange('monthlySalary', parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

            {/* Monthly Expenses */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Monthly Living Expenses ($)</label>
              <input
                type="number"
                min="0"
                value={financialProfile.monthlyExpenses}
                onChange={(e) => handleInputChange('monthlyExpenses', parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

            {/* Liquid Cash */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Liquid Cash & Bank Savings ($)</label>
              <input
                type="number"
                min="0"
                value={financialProfile.liquidCash}
                onChange={(e) => handleInputChange('liquidCash', parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

            {/* Real Estate & Investments */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Real Estate & Property Assets ($)</label>
              <input
                type="number"
                min="0"
                value={financialProfile.realEstateAssets}
                onChange={(e) => handleInputChange('realEstateAssets', parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

            {/* Total Liabilities */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Total Loans & Liabilities ($)</label>
              <input
                type="number"
                min="0"
                value={financialProfile.totalLiabilities}
                onChange={(e) => handleInputChange('totalLiabilities', parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

            {/* Dependents */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Number of Family Dependents</label>
              <input
                type="number"
                min="0"
                value={financialProfile.dependents}
                onChange={(e) => handleInputChange('dependents', parseInt(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Goal Selector (1 col) */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Primary Financial Need
          </h3>

          <div className="space-y-3">
            {goalsList.map((g) => (
              <div
                key={g.id}
                onClick={() => handleInputChange('primaryGoal', g.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition ${
                  financialProfile.primaryGoal === g.id
                    ? 'bg-blue-50/70 border-blue-400 text-slate-900 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-sm text-slate-900 flex items-center justify-between">
                  <span>{g.label}</span>
                  {financialProfile.primaryGoal === g.id && <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>}
                </div>
                <p className="text-xs text-slate-500 mt-1">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
