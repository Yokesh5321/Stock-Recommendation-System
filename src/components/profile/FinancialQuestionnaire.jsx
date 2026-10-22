import React, { useState } from 'react';
import { useStock } from '../../context/StockContext';
import { 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Wallet, 
  DollarSign, 
  ShieldCheck, 
  Sparkles,
  PieChart,
  Layers,
  TrendingUp,
  Activity,
  RotateCcw
} from 'lucide-react';

export const FinancialQuestionnaire = () => {
  const { 
    financialProfile, 
    setFinancialProfile, 
    setActiveTab,
    stocks,
    getPersonalizedFit,
    adoptPortfolioBasket,
    generatePortfolioBasket,
    setSelectedStock
  } = useStock();
  const [step, setStep] = useState(1);

  // Form local state
  const [formData, setFormData] = useState({
    salary: financialProfile.monthlySalary,
    expenses: financialProfile.monthlyExpenses,
    savings: financialProfile.liquidCash,
    realEstate: financialProfile.realEstateAssets,
    debt: financialProfile.totalLiabilities,
    goal: financialProfile.primaryGoal,
    horizon: financialProfile.investmentHorizon,
    dipTolerance: 'Hold & Buy More'
  });

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else if (step === 5) {
      // Save data into global profile and reveal recommendations
      setFinancialProfile(prev => ({
        ...prev,
        monthlySalary: Number(formData.salary),
        monthlyExpenses: Number(formData.expenses),
        liquidCash: Number(formData.savings),
        realEstateAssets: Number(formData.realEstate),
        totalLiabilities: Number(formData.debt),
        primaryGoal: formData.goal,
        investmentHorizon: formData.horizon
      }));
      setStep(6); // Show recommendations results screen!
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  // Calculate live matched recommendations
  const rankedStocks = stocks.map(s => ({
    ...s,
    fit: getPersonalizedFit(s)
  })).sort((a, b) => b.fit.fitScore - a.fit.fitScore);

  const topRecommendations = rankedStocks.slice(0, 4);
  const calculatedSurplus = Math.max(0, formData.salary - formData.expenses);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-50/90 via-indigo-50/40 to-white border border-blue-200/90 text-center space-y-2 shadow-sm">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-100/70 border border-blue-200 rounded-full text-xs font-bold text-blue-700">
          <Sparkles size={14} className="text-amber-500" />
          <span>PRIMARY ENGINE: STOCK RECOMMENDATION QUIZ</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Find Which Stocks You Need For Your Demat Account
        </h2>
        <p className="text-xs text-slate-600 max-w-lg mx-auto">
          Answer 5 quick questions about your monthly budget, risk appetite, and financial goals. Our multi-factor quantitative engine will instantly recommend your personalized equity basket.
        </p>
      </div>

      {/* Questionnaire Wizard Container */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 relative">
        {/* Step Progress Indicator */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-500 font-medium">
              {step <= 5 ? `Step ${step} of 5: Investor Need Profiling` : 'Step 6: Personalized Recommendations Ready!'}
            </span>
            <span className="text-blue-600 font-bold">
              {step <= 5 ? `${step * 20}% Completed` : '100% Calibrated'}
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                step === 6
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 w-full'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600'
              }`}
              style={{ width: `${Math.min(100, step * 20)}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Salary */}
        {step === 1 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">Step 1: Monthly Income & Stock Purchase Capacity</h3>
              <p className="text-xs text-slate-500">What is your total monthly take-home salary? This dictates how many shares of top equities you can accumulate each month.</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Enter Your Monthly Take-Home Salary ($)</span>
                <span className="text-[11px] font-normal text-slate-400">Numbers only</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-base font-bold text-slate-400 font-mono">$</span>
                <input
                  type="number"
                  min="0"
                  step="100"
                  placeholder="e.g. 12000"
                  value={formData.salary || ''}
                  onChange={(e) => setFormData({ ...formData, salary: Math.max(0, parseFloat(e.target.value) || 0) })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-2xl pl-9 pr-4 py-3.5 text-lg text-slate-900 font-mono font-bold focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                  autoFocus
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Type your monthly salary directly. Our algorithms will calculate your exact investable surplus.
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Living Expenses & Obligations */}
        {step === 2 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">Step 2: Monthly Living Expenses & Net Stock Surplus</h3>
              <p className="text-xs text-slate-500">Estimate your average monthly fixed expenses (Rent, utilities, food, EMI loans) to calculate your safe Demat stock surplus.</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">Monthly Expenses ($)</label>
              <input
                type="number"
                value={formData.expenses}
                onChange={(e) => setFormData({ ...formData, expenses: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between text-xs text-blue-900 font-mono">
              <span>Calculated Monthly Stock Investment Budget:</span>
              <strong className="font-bold text-sm text-blue-700">${calculatedSurplus.toLocaleString()}/mo</strong>
            </div>
          </div>
        )}

        {/* Step 3: Assets & Liquid Savings */}
        {step === 3 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">Step 3: Existing Assets & Cash Reserve Buffer</h3>
              <p className="text-xs text-slate-500">How much do you currently hold in liquid bank cash and other assets? This determines your portfolio volatility tolerance.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700">Bank Cash Savings ($)</label>
                <input
                  type="number"
                  value={formData.savings}
                  onChange={(e) => setFormData({ ...formData, savings: Math.max(0, parseFloat(e.target.value) || 0) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700">Real Estate / Property Assets ($)</label>
                <input
                  type="number"
                  value={formData.realEstate}
                  onChange={(e) => setFormData({ ...formData, realEstate: Math.max(0, parseFloat(e.target.value) || 0) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Financial Goal */}
        {step === 4 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">Step 4: Primary Investment Goal & Stock Selection</h3>
              <p className="text-xs text-slate-500">What is your main investment need? Our engine uses this to select your target equities.</p>
            </div>

            <div className="space-y-3">
              {[
                { 
                  id: 'Wealth Accumulation', 
                  title: 'Wealth Accumulation', 
                  desc: 'Focus on high capital growth and long-term tech leadership.',
                  targetStocks: 'Recommends: NVDA, AAPL, MSFT, GOOGL'
                },
                { 
                  id: 'Passive Dividend Income', 
                  title: 'Passive Dividend Cash Flow', 
                  desc: 'Focus on quarterly cash dividend income and blue-chip stability.',
                  targetStocks: 'Recommends: JNJ, PG, ABBV'
                },
                { 
                  id: 'Capital Preservation', 
                  title: 'Capital Preservation & Low Risk', 
                  desc: 'Focus on protecting principal with low volatility blue-chip stocks.',
                  targetStocks: 'Recommends: BRK.B, JNJ, AAPL'
                },
                { 
                  id: 'Aggressive Growth', 
                  title: 'Aggressive AI Growth', 
                  desc: 'Maximize allocation to semiconductor AI & high-beta growth stocks.',
                  targetStocks: 'Recommends: NVDA, AMD, LLY'
                }
              ].map((g) => (
                <div
                  key={g.id}
                  onClick={() => setFormData({ ...formData, goal: g.id })}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    formData.goal === g.id
                      ? 'bg-blue-50/80 border-blue-500 text-slate-900 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-sm text-slate-900">{g.title}</div>
                    {formData.goal === g.id && (
                      <span className="px-2 py-0.5 bg-blue-600 text-white rounded text-[10px] font-bold">Selected</span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{g.desc}</div>
                  <div className="text-[11px] font-mono text-blue-700 font-semibold mt-2 pt-2 border-t border-slate-100 flex items-center space-x-1.5">
                    <Sparkles size={12} className="text-blue-600" />
                    <span>{g.targetStocks}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Time Horizon */}
        {step === 5 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">Step 5: Investment Time Horizon</h3>
              <p className="text-xs text-slate-500">How long do you plan to hold your recommended stocks for maximum compounding?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: '1 - 3 Years', detail: 'Tactical Medium-Term Swing' },
                { label: '5 - 10 Years', detail: 'Multi-Year Secular Growth' },
                { label: '10+ Years', detail: 'Generational Compounding' }
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setFormData({ ...formData, horizon: item.label })}
                  className={`p-4 rounded-2xl border text-center transition ${
                    formData.horizon === item.label
                      ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-sm font-bold">{item.label}</div>
                  <div className={`text-[11px] mt-1 ${formData.horizon === item.label ? 'text-blue-100' : 'text-slate-400'}`}>
                    {item.detail}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Instant Results & Stock Recommendations Reveal */}
        {step === 6 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={20} className="text-emerald-600" />
                <h3 className="text-lg font-black text-slate-900">Quiz Completed! Here Are Your Recommended Stocks</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Based on your monthly surplus of <strong className="text-slate-900 font-mono">${calculatedSurplus.toLocaleString()}/mo</strong> and your goal of <strong className="text-slate-900">{formData.goal}</strong>, our quantitative algorithm recommends the following high-Sharpe equities for your Demat portfolio:
              </p>
            </div>

            {/* Matched Stock Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topRecommendations.map((stock) => (
                <div
                  key={stock.symbol}
                  onClick={() => setSelectedStock(stock)}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md cursor-pointer transition space-y-3 group shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-sm">
                        {stock.symbol}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition">{stock.name}</div>
                        <div className="text-[11px] text-slate-500">{stock.sector}</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {stock.fit.fitScore}% Match
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 line-clamp-2">
                    {stock.fit.matchReasons[0] || `Strong alignment with your ${formData.goal} objective.`}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">Price: <strong className="text-slate-800">${stock.price.toFixed(2)}</strong></span>
                    <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded">
                      ${stock.fit.suggestedMonthlyAllocation}/mo
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions for Step 6 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="text-xs text-slate-500 font-medium text-center">Next Steps For Your Recommended Stocks:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    adoptPortfolioBasket();
                    setActiveTab('portfolio-basket');
                  }}
                  className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 transition"
                >
                  <Layers size={16} />
                  <span>Adopt Full Demat Basket</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('recommendations')}
                  className="py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs flex items-center justify-center space-x-2 transition"
                >
                  <Sparkles size={16} className="text-blue-600" />
                  <span>Explore Recommendation Feed</span>
                </button>
              </div>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-400 hover:text-slate-700 font-medium inline-flex items-center space-x-1 transition"
                >
                  <RotateCcw size={12} />
                  <span>Retake Recommendation Quiz</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons for steps 1 to 5 */}
        {step <= 5 && (
          <div className="flex justify-between items-center pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={handlePrev}
              disabled={step === 1}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition ${
                step === 1
                  ? 'opacity-30 cursor-not-allowed text-slate-400'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              <ArrowLeft size={16} />
              <span>Previous</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center space-x-2 transition cursor-pointer"
            >
              <span>{step === 5 ? '🎯 Reveal Recommended Stocks' : 'Next Question'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
