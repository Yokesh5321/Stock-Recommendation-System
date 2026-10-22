import React, { createContext, useContext, useState, useEffect } from 'react';
import { STOCK_DATABASE, MARKET_INDICES, AI_NEWS_FEED } from '../data/mockStocks';
import { 
  isSupabaseConfigured, 
  getStocksFromDb, 
  getIndicesFromDb, 
  getNewsFromDb, 
  saveFinancialProfileToDb, 
  recordTradeToDb,
  registerUserAccountInDb,
  getUserAccountFromDb
} from '../lib/supabaseClient';

const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [stocks, setStocks] = useState(STOCK_DATABASE);
  const [indices, setIndices] = useState(MARKET_INDICES);
  const [newsFeed, setNewsFeed] = useState(AI_NEWS_FEED);
  const [selectedStock, setSelectedStock] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, questionnaire, wealth-profile, portfolio-basket, recommendations, screener, portfolio, news, login
  const [searchQuery, setSearchQuery] = useState('');
  const [isSupabaseLive, setIsSupabaseLive] = useState(isSupabaseConfigured());

  // Helper to fetch registered accounts from persistent storage
  const getRegisteredAccounts = () => {
    try {
      const saved = localStorage.getItem('registered_demat_accounts');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [
      {
        email: 'yokesh.kumar@investor.com',
        fullName: 'Yokesh Kumar',
        dematAccountNo: 'DEMAT-88492049',
        brokerName: 'Zerodha (CDSL)',
        password: 'DemoPass@2026'
      }
    ];
  };

  // User Demat Account & Auth State (session-based: asks to sign in whenever app is opened fresh)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const activeSession = sessionStorage.getItem('demat_active_session');
      if (activeSession) {
        const parsed = JSON.parse(activeSession);
        if (parsed?.isAuthenticated) return parsed;
      }
    } catch (e) {}
    return {
      email: '',
      fullName: 'Guest Investor',
      dematAccountNo: 'Unlinked',
      brokerName: 'None',
      isAuthenticated: false
    };
  });

  // Guest preview mode if user clicks "Explore as Guest"
  const [isGuestMode, setIsGuestMode] = useState(false);
  
  // Watchlist state
  const [watchlist, setWatchlist] = useState(['NVDA', 'AAPL', 'MSFT', 'GOOGL']);

  // Fetch from Supabase on mount if configured
  useEffect(() => {
    async function initSupabaseData() {
      if (isSupabaseConfigured()) {
        setIsSupabaseLive(true);
        const [dbStocks, dbIndices, dbNews] = await Promise.all([
          getStocksFromDb(),
          getIndicesFromDb(),
          getNewsFromDb()
        ]);

        if (dbStocks && dbStocks.length > 0) {
          // Format fields from database if needed
          setStocks(dbStocks);
        }
        if (dbIndices && dbIndices.length > 0) {
          setIndices(dbIndices);
        }
        if (dbNews && dbNews.length > 0) {
          setNewsFeed(dbNews);
        }
      }
    }
    initSupabaseData();
  }, []);

  // User Personal Financial & Wealth Profile
  const [financialProfile, setFinancialProfile] = useState({
    monthlySalary: 12000,
    monthlyExpenses: 4500,
    liquidCash: 35000,
    realEstateAssets: 200000,
    otherAssets: 25000,
    totalLiabilities: 30000,
    primaryGoal: 'Wealth Accumulation', // 'Wealth Accumulation', 'Passive Dividend Income', 'Capital Preservation', 'Aggressive Growth'
    investmentHorizon: '5-10 Years',
    riskTolerance: 'Moderate', // 'Conservative', 'Moderate', 'Aggressive'
    dependents: 2
  });

  // User Portfolio state
  const [portfolio, setPortfolio] = useState({
    cashBalance: 14500.00,
    holdings: [
      { symbol: 'NVDA', shares: 25, avgPrice: 110.20 },
      { symbol: 'AAPL', shares: 15, avgPrice: 215.00 },
      { symbol: 'LLY', shares: 5, avgPrice: 760.00 },
    ]
  });

  // Computed Financial Metrics
  const getWealthSummary = () => {
    const monthlySurplus = Math.max(0, financialProfile.monthlySalary - financialProfile.monthlyExpenses);
    const totalAssets = financialProfile.liquidCash + financialProfile.realEstateAssets + financialProfile.otherAssets;
    const netWorth = totalAssets - financialProfile.totalLiabilities;
    const emergencyBufferMonths = financialProfile.monthlyExpenses > 0 
      ? +(financialProfile.liquidCash / financialProfile.monthlyExpenses).toFixed(1)
      : 0;

    return {
      monthlySurplus,
      totalAssets,
      netWorth,
      emergencyBufferMonths,
      savingsRate: financialProfile.monthlySalary > 0 
        ? Math.round((monthlySurplus / financialProfile.monthlySalary) * 100)
        : 0
    };
  };

  // Personalized Stock Match Calculator based on Salary, Assets, Expenses & Goal
  const getPersonalizedFit = (stock) => {
    const wealth = getWealthSummary();
    let fitScore = stock.confidence;
    let suggestedMonthlyAllocation = 0;
    let matchReasons = [];

    if (financialProfile.primaryGoal === 'Passive Dividend Income') {
      if (stock.dividendYield > 1.5) {
        fitScore += 8;
        matchReasons.push(`Strong dividend yield of ${stock.dividendYield}% matches your passive income goal.`);
      } else {
        fitScore -= 10;
      }
    } else if (financialProfile.primaryGoal === 'Wealth Accumulation' || financialProfile.primaryGoal === 'Aggressive Growth') {
      if (stock.recommendation === 'Strong Buy' || stock.recommendation === 'Buy') {
        fitScore += 6;
        matchReasons.push(`High upside target of $${stock.targetPrice} accelerates your long-term wealth growth.`);
      }
    } else if (financialProfile.primaryGoal === 'Capital Preservation') {
      if (stock.riskScore === 'Low') {
        fitScore += 10;
        matchReasons.push(`Low volatility rating protects your $${wealth.netWorth.toLocaleString()} net worth.`);
      } else if (stock.riskScore === 'High') {
        fitScore -= 15;
      }
    }

    if (wealth.emergencyBufferMonths < 6 && stock.riskScore === 'High') {
      fitScore -= 12;
      matchReasons.push(`Your liquid emergency buffer (${wealth.emergencyBufferMonths} mo) favors defensive lower-risk stocks.`);
    } else if (wealth.emergencyBufferMonths >= 6) {
      matchReasons.push(`Healthy emergency reserve (${wealth.emergencyBufferMonths} mo) gives you capacity for growth assets.`);
    }

    if (wealth.monthlySurplus > 0) {
      if (stock.recommendation === 'Strong Buy') {
        suggestedMonthlyAllocation = Math.round(wealth.monthlySurplus * 0.25);
      } else if (stock.recommendation === 'Buy') {
        suggestedMonthlyAllocation = Math.round(wealth.monthlySurplus * 0.15);
      } else {
        suggestedMonthlyAllocation = Math.round(wealth.monthlySurplus * 0.05);
      }
    }

    const finalScore = Math.min(98, Math.max(40, fitScore));

    return {
      fitScore: finalScore,
      suggestedMonthlyAllocation,
      matchReasons
    };
  };

  // Generate Complete Multi-Stock Portfolio Basket Recommendation
  const generatePortfolioBasket = () => {
    const wealth = getWealthSummary();
    const goal = financialProfile.primaryGoal;

    let growthPct = 40;
    let dividendPct = 25;
    let defensivePct = 20;
    let cashPct = 15;

    if (goal === 'Passive Dividend Income') {
      growthPct = 20;
      dividendPct = 50;
      defensivePct = 20;
      cashPct = 10;
    } else if (goal === 'Aggressive Growth') {
      growthPct = 60;
      dividendPct = 15;
      defensivePct = 15;
      cashPct = 10;
    } else if (goal === 'Capital Preservation') {
      growthPct = 15;
      dividendPct = 30;
      defensivePct = 35;
      cashPct = 20;
    }

    const surplus = wealth.monthlySurplus;

    const basketItems = [
      {
        symbol: 'NVDA',
        name: 'NVIDIA Corp',
        category: 'AI & High Tech Growth',
        allocationPct: Math.round(growthPct * 0.6),
        monthlySip: Math.round(surplus * (growthPct * 0.6 / 100)),
        targetUpside: '+20.6%',
        rationale: 'Core AI hardware infrastructure leader for long-term growth.'
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft Corp',
        category: 'Enterprise Tech Growth',
        allocationPct: Math.round(growthPct * 0.4),
        monthlySip: Math.round(surplus * (growthPct * 0.4 / 100)),
        targetUpside: '+13.1%',
        rationale: 'Azure cloud + enterprise OpenAI Copilot monetization.'
      },
      {
        symbol: 'JPM',
        name: 'JPMorgan Chase',
        category: 'Passive Dividend Yield',
        allocationPct: Math.round(dividendPct * 0.6),
        monthlySip: Math.round(surplus * (dividendPct * 0.6 / 100)),
        targetUpside: '+10.4%',
        rationale: '2.16% dividend yield with fortress balance sheet.'
      },
      {
        symbol: 'AAPL',
        name: 'Apple Inc',
        category: 'Consumer Dividend & Buyback',
        allocationPct: Math.round(dividendPct * 0.4),
        monthlySip: Math.round(surplus * (dividendPct * 0.4 / 100)),
        targetUpside: '+9.2%',
        rationale: 'Massive cash buybacks and Apple Intelligence upgrade cycle.'
      },
      {
        symbol: 'LLY',
        name: 'Eli Lilly & Co',
        category: 'Defensive Healthcare Growth',
        allocationPct: defensivePct,
        monthlySip: Math.round(surplus * (defensivePct / 100)),
        targetUpside: '+17.2%',
        rationale: 'Blockbuster GLP-1 drug portfolio with defensive market demand.'
      }
    ];

    // Recharts 5-Year Growth Projection Data
    const baseVal = wealth.netWorth > 0 ? wealth.netWorth : 50000;
    const annualSip = surplus * 12;
    const expectedCagr = 0.12; // 12% average annual growth

    const growthProjections = [];
    let currentVal = baseVal;
    for (let yr = 0; yr <= 5; yr++) {
      growthProjections.push({
        year: `Year ${yr}`,
        portfolioValue: Math.round(currentVal),
        totalContributed: Math.round(baseVal + (annualSip * yr))
      });
      currentVal = (currentVal + annualSip) * (1 + expectedCagr);
    }

    return {
      growthPct,
      dividendPct,
      defensivePct,
      cashPct,
      basketItems,
      growthProjections
    };
  };

  // Adopt Basket into Active Portfolio Holdings
  const adoptPortfolioBasket = () => {
    const basket = generatePortfolioBasket();
    const newHoldings = basket.basketItems.map(item => {
      const stock = stocks.find(s => s.symbol === item.symbol);
      const price = stock ? stock.price : 150;
      const shares = Math.max(1, Math.round((item.monthlySip * 3) / price)); // 3 months SIP equivalent
      return {
        symbol: item.symbol,
        shares,
        avgPrice: price
      };
    });

    setPortfolio(prev => ({
      ...prev,
      holdings: newHoldings
    }));
    setActiveTab('portfolio');
    alert('🎉 Customized Portfolio Basket has been adopted into your live portfolio!');
  };

  // Toggle watchlist items
  const toggleWatchlist = (symbol) => {
    setWatchlist(prev => 
      prev.includes(symbol)
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  // Trade simulation logic
  const executeTrade = (symbol, type, shares, price) => {
    const totalCost = shares * price;

    if (type === 'BUY') {
      if (portfolio.cashBalance < totalCost) {
        alert('Insufficient cash balance for this buy order.');
        return false;
      }

      setPortfolio(prev => {
        const existingHolding = prev.holdings.find(h => h.symbol === symbol);
        let updatedHoldings;

        if (existingHolding) {
          const newShares = existingHolding.shares + shares;
          const newAvgPrice = ((existingHolding.shares * existingHolding.avgPrice) + totalCost) / newShares;
          updatedHoldings = prev.holdings.map(h => 
            h.symbol === symbol ? { ...h, shares: newShares, avgPrice: newAvgPrice } : h
          );
        } else {
          updatedHoldings = [...prev.holdings, { symbol, shares, avgPrice: price }];
        }

        return {
          cashBalance: prev.cashBalance - totalCost,
          holdings: updatedHoldings
        };
      });
      return true;
    } else if (type === 'SELL') {
      const existingHolding = portfolio.holdings.find(h => h.symbol === symbol);
      if (!existingHolding || existingHolding.shares < shares) {
        alert('You do not own enough shares to sell this quantity.');
        return false;
      }

      setPortfolio(prev => {
        let updatedHoldings;
        if (existingHolding.shares === shares) {
          updatedHoldings = prev.holdings.filter(h => h.symbol !== symbol);
        } else {
          updatedHoldings = prev.holdings.map(h => 
            h.symbol === symbol ? { ...h, shares: h.shares - shares } : h
          );
        }

        return {
          cashBalance: prev.cashBalance + totalCost,
          holdings: updatedHoldings
        };
      });
      return true;
    }

    // Record trade transaction in Supabase asynchronously
    if (isSupabaseConfigured()) {
      recordTradeToDb({ symbol, type, shares, price }, currentUser?.email || 'default_user');
    }

    return true;
  };

  // User Demat Account Authentication Handlers
  const loginUser = async ({ email, password }) => {
    try {
      let matchedUser = null;
      if (isSupabaseConfigured()) {
        const dbUser = await getUserAccountFromDb(email);
        if (dbUser) {
          matchedUser = {
            email: dbUser.email,
            fullName: dbUser.full_name,
            dematAccountNo: dbUser.demat_account_no,
            brokerName: dbUser.broker_name || 'Zerodha (CDSL)',
            isAuthenticated: true
          };
        }
      }

      if (!matchedUser) {
        // Look up registered accounts from local store
        const accounts = getRegisteredAccounts();
        const found = accounts.find(a => a.email.toLowerCase() === email.toLowerCase());
        if (found) {
          matchedUser = {
            email: found.email,
            fullName: found.fullName,
            dematAccountNo: found.dematAccountNo,
            brokerName: found.brokerName || 'Zerodha (CDSL)',
            isAuthenticated: true
          };
        } else {
          // Fallback demo user generated from email
          matchedUser = {
            email,
            fullName: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            dematAccountNo: 'DEMAT-' + Math.floor(10000000 + Math.random() * 90000000),
            brokerName: 'Zerodha (CDSL)',
            isAuthenticated: true
          };
        }
      }

      setCurrentUser(matchedUser);
      setIsGuestMode(false);
      sessionStorage.setItem('demat_active_session', JSON.stringify(matchedUser));
      setActiveTab('dashboard');
      return { success: true, user: matchedUser };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: err.message };
    }
  };

  const registerUser = async ({ email, fullName, dematAccountNo, brokerName, password }) => {
    try {
      const finalDemat = dematAccountNo?.trim() || ('DEMAT-' + Math.floor(10000000 + Math.random() * 90000000));
      const finalBroker = brokerName?.trim() || 'Zerodha (CDSL)';
      const finalName = fullName?.trim() || email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

      if (isSupabaseConfigured()) {
        await registerUserAccountInDb({
          email,
          fullName: finalName,
          dematAccountNo: finalDemat,
          brokerName: finalBroker,
          password
        });
      }

      const userObj = {
        email,
        fullName: finalName,
        dematAccountNo: finalDemat,
        brokerName: finalBroker,
        password: password || 'DemoPass@2026',
        isAuthenticated: true
      };

      // Persist into registered accounts list so user can easily log back in later
      const existing = getRegisteredAccounts();
      const updated = [userObj, ...existing.filter(a => a.email.toLowerCase() !== email.toLowerCase())];
      localStorage.setItem('registered_demat_accounts', JSON.stringify(updated));

      setCurrentUser(userObj);
      setIsGuestMode(false);
      sessionStorage.setItem('demat_active_session', JSON.stringify(userObj));
      setActiveTab('dashboard');
      return { success: true, user: userObj };
    } catch (err) {
      console.error('Registration error:', err);
      return { success: false, error: err.message };
    }
  };

  const logoutUser = () => {
    const guestUser = {
      email: '',
      fullName: 'Guest Investor',
      dematAccountNo: 'Unlinked',
      brokerName: 'None',
      isAuthenticated: false
    };
    setCurrentUser(guestUser);
    setIsGuestMode(false);
    sessionStorage.removeItem('demat_active_session');
    localStorage.removeItem('aura_demat_user');
    setActiveTab('login');
  };

  const continueAsGuest = () => {
    setIsGuestMode(true);
    setActiveTab('dashboard');
  };

  // Live Price Ticker Simulation Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks => 
        prevStocks.map(stock => {
          const deltaPct = (Math.random() - 0.49) * 0.008;
          const newPrice = +(stock.price * (1 + deltaPct)).toFixed(2);
          const priceDiff = +(newPrice - stock.price).toFixed(2);
          const updatedChange = +(stock.change + priceDiff).toFixed(2);
          const updatedChangePct = +(((updatedChange) / (newPrice - updatedChange)) * 100).toFixed(2);

          return {
            ...stock,
            price: newPrice,
            change: updatedChange,
            changePercent: updatedChangePct,
            isUp: updatedChange >= 0
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Compute total portfolio value
  const getPortfolioSummary = () => {
    let holdingsValue = 0;
    let totalInvested = 0;

    portfolio.holdings.forEach(holding => {
      const stock = stocks.find(s => s.symbol === holding.symbol);
      const currentPrice = stock ? stock.price : holding.avgPrice;
      holdingsValue += holding.shares * currentPrice;
      totalInvested += holding.shares * holding.avgPrice;
    });

    const totalValue = portfolio.cashBalance + holdingsValue;
    const totalPnl = holdingsValue - totalInvested;
    const totalPnlPercent = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;

    return {
      totalValue,
      cashBalance: portfolio.cashBalance,
      holdingsValue,
      totalPnl,
      totalPnlPercent,
      isProfit: totalPnl >= 0
    };
  };

  return (
    <StockContext.Provider value={{
      stocks,
      indices,
      newsFeed,
      selectedStock,
      setSelectedStock,
      activeTab,
      setActiveTab,
      searchQuery,
      setSearchQuery,
      watchlist,
      toggleWatchlist,
      financialProfile,
      setFinancialProfile,
      getWealthSummary,
      getPersonalizedFit,
      generatePortfolioBasket,
      adoptPortfolioBasket,
      portfolio,
      executeTrade,
      getPortfolioSummary,
      isSupabaseLive,
      currentUser,
      isGuestMode,
      continueAsGuest,
      getRegisteredAccounts,
      loginUser,
      registerUser,
      logoutUser
    }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => useContext(StockContext);
