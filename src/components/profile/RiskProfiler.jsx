import React, { useState } from 'react';
import { useStock } from '../../context/StockContext';
import { ShieldCheck, ShieldAlert, Zap, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';

export const RiskProfiler = () => {
  const { riskProfile, setRiskProfile, setActiveTab } = useStock();
  const [step, setStep] = useState(0);

  const questions = [
    {
      title: 'What is your primary investment goal?',
      options: [
        { label: 'Capital Preservation & Low Volatility', risk: 'Low', points: 1 },
        { label: 'Balanced Capital Growth & Dividend Income', risk: 'Moderate', points: 2 },
        { label: 'Aggressive Capital Growth & AI Tech Exposure', risk: 'High', points: 3 },
      ]
    },
    {
      title: 'How long do you plan to hold your investments before withdrawing?',
      options: [
        { label: 'Short-term (< 1 year)', risk: 'Low', points: 1 },
        { label: 'Medium-term (1 to 5 years)', risk: 'Moderate', points: 2 },
        { label: 'Long-term (5+ years)', risk: 'High', points: 3 },
      ]
    },
    {
      title: 'How would you react if your portfolio declined by 20% during market correction?',
      options: [
        { label: 'Sell immediately to prevent further losses', risk: 'Low', points: 1 },
        { label: 'Hold steady and wait for market recovery', risk: 'Moderate', points: 2 },
        { label: 'Buy more shares at discounted prices', risk: 'High', points: 3 },
      ]
    },
    {
      title: 'What is your experience level with stock market investing?',
      options: [
        { label: 'Beginner / First-time investor', risk: 'Low', points: 1 },
        { label: 'Intermediate / Active trader', risk: 'Moderate', points: 2 },
        { label: 'Advanced / Institutional quantitative analysis', risk: 'High', points: 3 },
      ]
    }
  ];

  const [answers, setAnswers] = useState([]);

  const handleSelectOption = (points) => {
    const nextAnswers = [...answers, points];
    setAnswers(nextAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate final profile score
      const totalPoints = nextAnswers.reduce((a, b) => a + b, 0);
      let level = 'Moderate';
      if (totalPoints <= 5) level = 'Low';
      else if (totalPoints >= 10) level = 'High';

      setRiskProfile({
        level,
        score: Math.round((totalPoints / 12) * 100),
        answers: nextAnswers
      });
      setStep(questions.length); // Completion screen
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-dark-card to-dark-bg border border-dark-border space-y-1 text-center">
        <ShieldCheck size={36} className="text-cyan-400 mx-auto mb-2" />
        <h2 className="text-2xl font-black text-white">Investor Risk Profiler</h2>
        <p className="text-xs text-dark-muted">
          Our AI algorithm customizes stock recommendation algorithms according to your risk tolerance.
        </p>
      </div>

      {/* Quiz Wizard Container */}
      <div className="p-8 rounded-3xl bg-dark-card border border-dark-border shadow-2xl space-y-6">
        {step < questions.length ? (
          <div className="space-y-6">
            {/* Step Progress Bar */}
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-dark-muted">Question {step + 1} of {questions.length}</span>
              <span className="text-cyan-400 font-bold">{Math.round(((step + 1) / questions.length) * 100)}% Completed</span>
            </div>

            <div className="w-full bg-dark-bg h-2 rounded-full overflow-hidden border border-dark-border">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${((step + 1) / questions.length) * 100}%` }}
              ></div>
            </div>

            {/* Question Title */}
            <h3 className="text-xl font-bold text-slate-100">{questions[step].title}</h3>

            {/* Options list */}
            <div className="space-y-3">
              {questions[step].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.points)}
                  className="w-full text-left p-4 rounded-2xl bg-dark-bg hover:bg-dark-hover border border-dark-border hover:border-blue-500/50 flex items-center justify-between text-sm font-medium text-slate-200 transition group"
                >
                  <span>{opt.label}</span>
                  <ArrowRight size={18} className="text-dark-muted group-hover:text-cyan-400 transition" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Completion Screen */
          <div className="text-center space-y-6 py-4">
            <CheckCircle2 size={56} className="text-emerald-400 mx-auto animate-pulse" />
            
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">Assessment Complete!</h3>
              <p className="text-xs text-dark-muted">Your personalized risk profile has been calculated.</p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-bg border border-dark-border max-w-sm mx-auto space-y-3">
              <div className="text-xs text-dark-muted font-mono">Assigned Profile</div>
              <div className="text-3xl font-black text-cyan-400 uppercase tracking-wide">
                {riskProfile.level} Risk
              </div>
              <div className="text-xs text-slate-300">
                {riskProfile.level === 'Low' && 'Focused on capital preservation, blue-chip dividends, and low beta defensive stocks.'}
                {riskProfile.level === 'Moderate' && 'Balanced exposure to high-growth tech leaders and stable large-cap value stocks.'}
                {riskProfile.level === 'High' && 'Maximum exposure to AI semiconductor growth, mega-cap momentum, and high beta stocks.'}
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={resetQuiz}
                className="px-4 py-2.5 rounded-xl bg-dark-bg hover:bg-dark-hover border border-dark-border text-xs font-bold text-slate-300 flex items-center space-x-1.5 transition"
              >
                <RefreshCw size={14} />
                <span>Retake Quiz</span>
              </button>

              <button
                onClick={() => setActiveTab('recommendations')}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition"
              >
                View Filtered AI Signals →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
