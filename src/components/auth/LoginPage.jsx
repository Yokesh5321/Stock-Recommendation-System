import React, { useState } from 'react';
import { useStock } from '../../context/StockContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  CreditCard, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  LogOut,
  Wallet,
  Layers,
  Activity,
  UserPlus
} from 'lucide-react';

export const LoginPage = () => {
  const { 
    currentUser, 
    loginUser, 
    registerUser, 
    logoutUser, 
    setActiveTab, 
    getPortfolioSummary,
    continueAsGuest,
    getRegisteredAccounts
  } = useStock();

  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [dematAccountNo, setDematAccountNo] = useState('');
  const [brokerName, setBrokerName] = useState('Zerodha (CDSL)');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const portfolioSummary = getPortfolioSummary();

  const BROKERS = [
    'Zerodha (CDSL)',
    'Groww (CDSL)',
    'AngelOne (NSDL)',
    'Upstox (CDSL)',
    'HDFC Securities',
    'ICICI Direct',
    'Charles Schwab',
    'Interactive Brokers',
    'Fidelity'
  ];

  const handleGenerateDemat = (e) => {
    e.preventDefault();
    const randomDigits = Math.floor(10000000 + Math.random() * 90000000);
    setDematAccountNo(`DEMAT-${randomDigits}`);
  };

  const registeredAccounts = getRegisteredAccounts ? getRegisteredAccounts() : [];

  const handleSelectAccount = (account) => {
    setEmail(account.email);
    setPassword(account.password || 'DemoPass@2026');
    setFullName(account.fullName || '');
    setDematAccountNo(account.dematAccountNo || '');
    setBrokerName(account.brokerName || 'Zerodha (CDSL)');
    setErrorMsg('');
  };

  const handleInstantDemoLogin = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await loginUser({
        email: 'yokesh.kumar@investor.com',
        password: 'DemoPass@2026'
      });
      if (res.success) {
        setSuccessMsg(`Welcome, ${res.user.fullName}! Demat verified.`);
      } else {
        setErrorMsg(res.error || 'Failed to authenticate demo user.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (e) => {
    e.preventDefault();
    setEmail('yokesh.kumar@investor.com');
    setPassword('DemoPass@2026');
    setFullName('Yokesh Kumar');
    setDematAccountNo('DEMAT-88492049');
    setBrokerName('Zerodha (CDSL)');
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 4) {
      setErrorMsg('Password must be at least 4 characters.');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'login') {
        const result = await loginUser({ email, password });
        if (result.success) {
          setSuccessMsg(`Welcome, ${result.user.fullName}! Demat verified.`);
        } else {
          setErrorMsg(result.error || 'Failed to authenticate user.');
        }
      } else {
        if (!fullName.trim()) {
          setErrorMsg('Please enter your full name.');
          setLoading(false);
          return;
        }

        const finalDemat = dematAccountNo.trim() || `DEMAT-${Math.floor(10000000 + Math.random() * 90000000)}`;

        const result = await registerUser({
          email,
          password,
          fullName,
          dematAccountNo: finalDemat,
          brokerName
        });

        if (result.success) {
          setSuccessMsg(`Account created and linked to ${finalDemat}!`);
        } else {
          setErrorMsg(result.error || 'Registration failed.');
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // If user is already authenticated, show their Demat Profile Management Card
  if (currentUser?.isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-blue-500/20">
                {currentUser.fullName ? currentUser.fullName.slice(0, 2).toUpperCase() : 'YK'}
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">{currentUser.fullName}</h2>
                <p className="text-xs text-slate-500 font-mono">{currentUser.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  logoutUser();
                  setMode('signup');
                }}
                className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 flex items-center space-x-1.5 transition cursor-pointer"
              >
                <UserPlus size={14} />
                <span>+ Create Another Account</span>
              </button>
              <button
                onClick={logoutUser}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs font-bold border border-slate-200 hover:border-rose-200 flex items-center space-x-1.5 transition cursor-pointer"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Active Demat Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs text-slate-500 font-semibold flex items-center space-x-1.5">
                <CreditCard size={14} className="text-blue-600" />
                <span>Linked Demat Account</span>
              </span>
              <div className="text-lg font-mono font-black text-blue-700">
                {currentUser.dematAccountNo}
              </div>
              <div className="text-[11px] text-slate-500">
                Depository Broker: <strong className="text-slate-800">{currentUser.brokerName}</strong>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs text-slate-500 font-semibold flex items-center space-x-1.5">
                <Wallet size={14} className="text-emerald-600" />
                <span>Account Net Worth</span>
              </span>
              <div className="text-lg font-mono font-black text-slate-900">
                ${portfolioSummary.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[11px] text-slate-500">
                Cash Reserve: <strong className="text-slate-800">${portfolioSummary.cashBalance.toLocaleString()}</strong>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs text-slate-500 font-semibold flex items-center space-x-1.5">
                <ShieldCheck size={14} className="text-blue-600" />
                <span>Recommendation Status</span>
              </span>
              <div className="text-lg font-bold text-emerald-600 flex items-center">
                <CheckCircle2 size={18} className="mr-1.5" /> Active & Optimized
              </div>
              <div className="text-[11px] text-slate-500">
                Factor Models: <strong className="text-slate-800">Growth + Dividend</strong>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('recommendations')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center space-x-2 transition"
            >
              <Sparkles size={14} />
              <span>View Recommendations for this Demat</span>
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 flex items-center space-x-2 transition"
            >
              <Layers size={14} />
              <span>View Demat Holdings</span>
            </button>
            <button
              onClick={() => setActiveTab('wealth-profile')}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 flex items-center space-x-2 transition"
            >
              <span>Edit Risk & Salary Profile</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Not signed in: Clean, neat, centered Auth Card
  return (
    <div className="max-w-md mx-auto w-full py-8 px-4">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        {/* Brand & Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
            <Sparkles size={24} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Stock Recommendation System
          </h1>
          <p className="text-xs text-slate-500">
            {mode === 'login' 
              ? 'Sign in to access your Demat stock recommendations' 
              : 'Create an investor account linked to your Demat'}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`py-2 rounded-xl transition ${
              mode === 'login'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`py-2 rounded-xl transition ${
              mode === 'signup'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Open Demat Account
          </button>
        </div>

        {/* Alerts */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center space-x-2 font-medium">
            <CheckCircle2 size={16} className="shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 flex items-center space-x-1.5">
                <User size={13} className="text-slate-400" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Yokesh Kumar"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
              />
            </div>
          )}

          {/* Email Address */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 flex items-center space-x-1.5">
              <Mail size={13} className="text-slate-400" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. yokesh.kumar@investor.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
            />
          </div>

          {/* Broker select for sign up */}
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 flex items-center space-x-1.5">
                <Building2 size={13} className="text-slate-400" />
                <span>Broker / Depository</span>
              </label>
              <select
                value={brokerName}
                onChange={(e) => setBrokerName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
              >
                {BROKERS.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          )}

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 flex items-center space-x-1.5">
              <Lock size={13} className="text-slate-400" />
              <span>Password</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 transition disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In & View Recommendations' : 'Open Demat & Continue'}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Quick Actions & Demo Shortcuts */}
        <div className="pt-2 border-t border-slate-100 space-y-2.5 text-center">
          <button
            type="button"
            onClick={handleInstantDemoLogin}
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 font-bold text-xs flex items-center justify-center space-x-2 transition cursor-pointer"
          >
            <Sparkles size={14} className="text-blue-600" />
            <span>1-Click Demo Login (Yokesh Kumar • DEMAT-88492049)</span>
          </button>

          {continueAsGuest && (
            <div>
              <button
                type="button"
                onClick={continueAsGuest}
                className="text-xs text-slate-400 hover:text-slate-700 font-medium transition cursor-pointer"
              >
                Continue as Guest (Preview Dashboard)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
