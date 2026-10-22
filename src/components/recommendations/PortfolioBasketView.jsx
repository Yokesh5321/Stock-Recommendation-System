import React from 'react';
import { useStock } from '../../context/StockContext';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { 
  PieChart as PieIcon, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Layers,
  Zap,
  Briefcase
} from 'lucide-react';

const BASKET_COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#06b6d4', '#f59e0b'];

export const PortfolioBasketView = () => {
  const { generatePortfolioBasket, adoptPortfolioBasket, getWealthSummary, financialProfile, setActiveTab, setSelectedStock, stocks } = useStock();

  const wealth = getWealthSummary();
  const basket = generatePortfolioBasket();

  // Pie chart data
  const pieData = [
    { name: 'AI & High Tech Growth', value: basket.growthPct },
    { name: 'Passive Dividend Yield', value: basket.dividendPct },
    { name: 'Defensive Healthcare', value: basket.defensivePct },
    { name: 'Liquid Cash Buffer', value: basket.cashPct }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-50/90 via-indigo-50/40 to-white border border-blue-200/90 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-100/70 border border-blue-200 rounded-full text-xs font-bold text-blue-700">
            <Sparkles size={14} />
            <span>CUSTOM MULTI-STOCK PORTFOLIO BASKET</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900">Your Tailored Portfolio Allocation</h2>
          <p className="text-xs text-slate-600 max-w-xl">
            Customized multi-stock basket designed for your <strong className="text-blue-700">${wealth.monthlySurplus.toLocaleString()}/mo Surplus</strong> (Salary: ${financialProfile.monthlySalary.toLocaleString()}) and <strong>{financialProfile.primaryGoal}</strong> goal.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('questionnaire')}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 transition shadow-xs"
          >
            Retake Quiz
          </button>
          <button
            onClick={adoptPortfolioBasket}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center space-x-2 transition"
          >
            <Briefcase size={16} />
            <span>Adopt & Invest Basket</span>
          </button>
        </div>
      </div>

      {/* Asset Allocation Pie + 5-Year Growth Projection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <PieIcon size={18} className="text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">Recommended Asset Class Breakdown</h3>
            </div>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={BASKET_COLORS[index % BASKET_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderRadius: '12px',
                    color: '#0f172a',
                    fontSize: '12px',
                    boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.08)'
                  }}
                  formatter={(value) => [`${value}%`, 'Allocation']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 font-mono text-xs pt-2 border-t border-slate-100">
            {pieData.map((item, idx) => (
              <div key={item.name} className="flex justify-between items-center text-slate-700 p-2 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: BASKET_COLORS[idx % BASKET_COLORS.length] }}></span>
                  <span className="truncate max-w-[110px] font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-blue-600">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5-Year Wealth Growth Projection Chart */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp size={18} className="text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900">Projected 5-Year Wealth Growth</h3>
            </div>
            <span className="text-xs font-mono text-emerald-600 font-bold">@ 12% Expected CAGR</span>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={basket.growthProjections} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.8} />
                <XAxis dataKey="year" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderRadius: '12px',
                    color: '#0f172a',
                    fontSize: '12px',
                    boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.08)'
                  }}
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Portfolio Value']}
                />
                <Area type="monotone" dataKey="portfolioValue" stroke="#10b981" strokeWidth={2.5} fill="url(#growthGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs font-mono text-slate-700">
            <span>5-Year Target Value:</span>
            <strong className="text-emerald-600 font-extrabold text-sm">
              ${basket.growthProjections[5].portfolioValue.toLocaleString()}
            </strong>
          </div>
        </div>
      </div>

      {/* Stock Basket Table */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Layers size={18} className="text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">Stock Basket Breakdown & Monthly SIP Plan</h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 tracking-wider uppercase">
                <th className="pb-3 px-3">Symbol / Stock</th>
                <th className="pb-3 px-3">Asset Category</th>
                <th className="pb-3 px-3">Basket Split %</th>
                <th className="pb-3 px-3">Monthly SIP ($/mo)</th>
                <th className="pb-3 px-3">Target Upside</th>
                <th className="pb-3 px-3">Investment Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-mono">
              {basket.basketItems.map((item) => {
                const stockObj = stocks.find(s => s.symbol === item.symbol);
                return (
                  <tr key={item.symbol} className="hover:bg-slate-50 transition">
                    <td className="py-4 px-3 font-bold text-slate-900 font-sans">
                      <div
                        onClick={() => stockObj && setSelectedStock(stockObj)}
                        className="cursor-pointer hover:text-blue-600 flex items-center space-x-2"
                      >
                        <span className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center font-bold text-blue-700 text-xs font-mono">
                          {item.symbol}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{item.symbol}</div>
                          <div className="text-[11px] text-slate-500 font-normal">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-slate-600 font-sans">{item.category}</td>
                    <td className="py-4 px-3 text-blue-600 font-bold">{item.allocationPct}%</td>
                    <td className="py-4 px-3 font-bold text-emerald-600">${item.monthlySip.toLocaleString()}/mo</td>
                    <td className="py-4 px-3 text-emerald-600 font-bold">{item.targetUpside}</td>
                    <td className="py-4 px-3 text-slate-600 font-sans text-xs">{item.rationale}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
