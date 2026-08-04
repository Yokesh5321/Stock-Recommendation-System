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
  PieChart
} from 'lucide-react';

export const FinancialQuestionnaire = () => {
  const { financialProfile, setFinancialProfile, setActiveTab } = useStock();
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
    } else {
      // Save data into global profile
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
      setActiveTab('portfolio-basket');
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950 via-dark-card to-indigo-950 border border-blue-500/30 text-center space-y-2 shadow-2xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-semibold text-cyan-400">
          <Sparkles size={14} />
          <span>GUIDED FINANCIAL QUESTIONNAIRE</span>
        </div>
        <h2 className="text-3xl font-black text-white">Find Your Custom Portfolio Basket</h2>
        <p className="text-xs text-slate-300">
          Answer 5 quick questions to calculate your monthly surplus and generate your tailored multi-stock portfolio basket.
        </p>
      </div>

      {/* Questionnaire Wizard Container */}
      <div className="p-8 rounded-3xl bg-dark-card border border-dark-border shadow-2xl space-y-6 relative">
        {/* Step Progress Indicator */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-dark-muted">Step {step} of 5</span>
            <span className="text-cyan-400 font-bold">{step * 20}% Completed</span>
          </div>
          <div className="w-full bg-dark-bg h-2 rounded-full overflow-hidden border border-dark-border">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${step * 20}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Salary & Dependents */}
        {step === 1 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-100">Step 1: Monthly Income & Earnings</h3>
              <p className="text-xs text-dark-muted">What is your total monthly take-home salary or income after tax?</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Monthly Salary ($)</label>
              <input
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-base text-slate-100 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[5000, 10000, 20000].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setFormData({ ...formData, salary: val })}
                  className="py-2 bg-dark-bg hover:bg-dark-hover border border-dark-border rounded-xl text-xs font-mono text-slate-300"
                >
                  ${val.toLocaleString()}/mo
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Living Expenses & Obligations */}
        {step === 2 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-100">Step 2: Monthly Living Expenses & Debt</h3>
              <p className="text-xs text-dark-muted">Estimate your average monthly expenses (Rent/Mortgage, utilities, food, loans).</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Monthly Expenses ($)</label>
              <input
                type="number"
                value={formData.expenses}
                onChange={(e) => setFormData({ ...formData, expenses: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-base text-slate-100 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="p-4 bg-cyan-950/20 border border-cyan-500/30 rounded-xl text-xs text-cyan-400 font-mono">
              Calculated Monthly Investment Surplus: <strong>${Math.max(0, formData.salary - formData.expenses).toLocaleString()}/mo</strong>
            </div>
          </div>
        )}

        {/* Step 3: Assets & Liquid Savings */}
        {step === 3 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-100">Step 3: Existing Assets & Liquid Savings</h3>
              <p className="text-xs text-dark-muted">How much do you currently hold in bank cash savings & existing assets?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Bank Cash Savings ($)</label>
                <input
                  type="number"
                  value={formData.savings}
                  onChange={(e) => setFormData({ ...formData, savings: Math.max(0, parseFloat(e.target.value) || 0) })}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-sm text-slate-100 font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Real Estate / Property Assets ($)</label>
                <input
                  type="number"
                  value={formData.realEstate}
                  onChange={(e) => setFormData({ ...formData, realEstate: Math.max(0, parseFloat(e.target.value) || 0) })}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-sm text-slate-100 font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Financial Goal */}
        {step === 4 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-100">Step 4: Primary Financial Need & Goal</h3>
              <p className="text-xs text-dark-muted">What is the main objective for your stock portfolio basket?</p>
            </div>

            <div className="space-y-3">
              {[
                { id: 'Wealth Accumulation', title: 'Wealth Accumulation', desc: 'Focus on high capital growth and long-term tech leadership.' },
                { id: 'Passive Dividend Income', title: 'Passive Dividend Cash Flow', desc: 'Focus on quarterly cash dividend income and blue-chip stability.' },
                { id: 'Capital Preservation', title: 'Capital Preservation & Low Risk', desc: 'Focus on protecting principal and low volatility blue-chip stocks.' },
                { id: 'Aggressive Growth', title: 'Aggressive AI Growth', desc: 'Maximize allocation to semiconductor AI & high beta stocks.' }
              ].map((g) => (
                <div
                  key={g.id}
                  onClick={() => setFormData({ ...formData, goal: g.id })}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    formData.goal === g.id
                      ? 'bg-blue-600/20 border-blue-500 text-slate-100'
                      : 'bg-dark-bg border-dark-border text-dark-muted hover:border-slate-600'
                  }`}
                >
                  <div className="font-bold text-sm text-slate-100">{g.title}</div>
                  <div className="text-xs text-dark-muted mt-1">{g.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Time Horizon & Reaction */}
        {step === 5 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-100">Step 5: Investment Timeframe</h3>
              <p className="text-xs text-dark-muted">How long do you plan to stay invested in this stock portfolio basket?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['1 - 3 Years', '5 - 10 Years', '10+ Years'].map((hz) => (
                <button
                  key={hz}
                  type="button"
                  onClick={() => setFormData({ ...formData, horizon: hz })}
                  className={`p-4 rounded-2xl border text-center transition ${
                    formData.horizon === hz
                      ? 'bg-blue-600 text-white font-bold border-blue-500 shadow-md'
                      : 'bg-dark-bg border-dark-border text-dark-muted hover:text-slate-200'
                  }`}
                >
                  <div className="text-sm font-bold">{hz}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-4 border-t border-dark-border">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 1}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition ${
              step === 1
                ? 'opacity-30 cursor-not-allowed text-dark-muted'
                : 'bg-dark-bg hover:bg-dark-hover text-slate-200 border border-dark-border'
            }`}
          >
            <ArrowLeft size={16} />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center space-x-1.5 transition"
          >
            <span>{step === 5 ? 'Generate Portfolio Basket' : 'Next Step'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
