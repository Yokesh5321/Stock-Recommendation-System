// Authenticated Real-World Stock Market Data & Multi-Sector Database

export const MARKET_INDICES = [
  { symbol: 'S&P 500', name: 'S&P 500 Index', price: 5864.67, change: 42.15, changePercent: 0.72, isUp: true },
  { symbol: 'NASDAQ', name: 'Nasdaq Composite', price: 18489.55, change: 168.30, changePercent: 0.92, isUp: true },
  { symbol: 'DOW', name: 'Dow Jones Industrial', price: 43239.05, change: -36.20, changePercent: -0.08, isUp: false },
  { symbol: 'RUSSELL 2000', name: 'Russell 2000 Index', price: 2275.40, change: 14.80, changePercent: 0.65, isUp: true },
  { symbol: 'BTC/USD', name: 'Bitcoin / USD', price: 68150.00, change: 1820.00, changePercent: 2.74, isUp: true },
  { symbol: 'GOLD', name: 'Gold Spot / Oz', price: 2721.40, change: 18.90, changePercent: 0.70, isUp: true },
  { symbol: 'CRUDE OIL', name: 'WTI Crude Oil', price: 70.85, change: -1.15, changePercent: -1.60, isUp: false },
];

export const STOCK_DATABASE = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    sector: 'Technology',
    industry: 'Semiconductors',
    price: 138.25,
    change: 4.85,
    changePercent: 3.64,
    isUp: true,
    recommendation: 'Strong Buy',
    confidence: 95,
    targetPrice: 165.00,
    stopLoss: 122.00,
    riskScore: 'Moderate',
    peRatio: 52.4,
    marketCap: '3.39 T',
    dividendYield: 0.03,
    eps: 2.66,
    beta: 1.68,
    rsi: 69.2,
    macd: 'Bullish Crossover',
    aiRationale: 'NVIDIA maintains an unassailable 85%+ market share in AI accelerators. Robust enterprise demand for Blackwell B200 GPUs and multi-gigawatt sovereign AI infrastructure drive revenue acceleration through 2026.',
    pros: [
      'Uncontested leadership in AI training & inference GPUs with CUDA moat',
      'Data center revenue growing in triple digits YoY with 75%+ gross margins',
      'Expanding enterprise AI software and networking ecosystem (Quantum InfiniBand)'
    ],
    cons: [
      'Premium valuation multiple vulnerable to broader market contraction',
      'TSMC advanced packaging (CoWoS) supply constraints'
    ],
    chartData: {
      '1D': [
        { time: '09:30', price: 133.50, volume: 1500000 },
        { time: '11:00', price: 135.20, volume: 2100000 },
        { time: '12:30', price: 136.10, volume: 1800000 },
        { time: '14:00', price: 137.40, volume: 2400000 },
        { time: '15:30', price: 138.25, volume: 3200000 }
      ],
      '1W': [
        { time: 'Mon', price: 131.80 },
        { time: 'Tue', price: 133.40 },
        { time: 'Wed', price: 132.90 },
        { time: 'Thu', price: 135.60 },
        { time: 'Fri', price: 138.25 }
      ],
      '1M': [
        { time: 'Week 1', price: 121.50 },
        { time: 'Week 2', price: 126.80 },
        { time: 'Week 3', price: 131.40 },
        { time: 'Week 4', price: 138.25 }
      ],
      '1Y': [
        { time: 'Q1', price: 62.00 },
        { time: 'Q2', price: 88.50 },
        { time: 'Q3', price: 118.00 },
        { time: 'Q4', price: 138.25 }
      ]
    }
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Technology',
    industry: 'Consumer Electronics',
    price: 231.40,
    change: 2.15,
    changePercent: 0.94,
    isUp: true,
    recommendation: 'Buy',
    confidence: 88,
    targetPrice: 255.00,
    stopLoss: 215.00,
    riskScore: 'Low',
    peRatio: 34.2,
    marketCap: '3.52 T',
    dividendYield: 0.44,
    eps: 6.77,
    beta: 1.01,
    rsi: 59.8,
    macd: 'Bullish',
    aiRationale: 'Apple Intelligence deployment across iOS 18 is stimulating a multi-year iPhone hardware supercycle. High-margin Services segment continues double-digit expansion with unmatched cash generation.',
    pros: [
      'Active installed base surpasses 2.2 billion devices with unmatched loyalty',
      'Services sector generating over $24B per quarter at 74% gross margins',
      'Aggressive shareholder return program with over $100B in annual buybacks'
    ],
    cons: [
      'Antitrust litigation in US and EU regarding App Store fee structure',
      'Cyclical smartphone demand in select emerging regions'
    ],
    chartData: {
      '1D': [
        { time: '09:30', price: 229.10 },
        { time: '11:30', price: 230.25 },
        { time: '13:30', price: 230.80 },
        { time: '15:30', price: 231.40 }
      ],
      '1W': [
        { time: 'Mon', price: 226.40 },
        { time: 'Wed', price: 228.90 },
        { time: 'Fri', price: 231.40 }
      ],
      '1M': [
        { time: 'Week 1', price: 219.00 },
        { time: 'Week 2', price: 223.50 },
        { time: 'Week 3', price: 227.10 },
        { time: 'Week 4', price: 231.40 }
      ],
      '1Y': [
        { time: 'Q1', price: 178.00 },
        { time: 'Q2', price: 195.00 },
        { time: 'Q3', price: 218.00 },
        { time: 'Q4', price: 231.40 }
      ]
    }
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    sector: 'Technology',
    industry: 'Software & Cloud',
    price: 428.15,
    change: 3.45,
    changePercent: 0.81,
    isUp: true,
    recommendation: 'Strong Buy',
    confidence: 92,
    targetPrice: 500.00,
    stopLoss: 395.00,
    riskScore: 'Low',
    peRatio: 35.8,
    marketCap: '3.18 T',
    dividendYield: 0.75,
    eps: 11.96,
    beta: 0.89,
    rsi: 58.4,
    macd: 'Neutral Bullish',
    aiRationale: 'Azure OpenAI commercial integration delivers steady 30%+ cloud expansion. Microsoft Copilot seat expansion across Office 365 enterprise tiers generates reliable, high-margin ARR.',
    pros: [
      'Azure Cloud accelerating market share gains against AWS',
      'Pioneer in commercial generative AI with exclusive OpenAI integrations',
      'AAA credit rated balance sheet with $75B+ operating cash flow'
    ],
    cons: [
      'High capital expenditures for global AI data center buildouts',
      'Enterprise spend consolidation across legacy on-prem software'
    ],
    chartData: {
      '1D': [
        { time: '09:30', price: 424.00 },
        { time: '12:30', price: 426.50 },
        { time: '15:30', price: 428.15 }
      ],
      '1W': [
        { time: 'Mon', price: 420.50 },
        { time: 'Wed', price: 424.00 },
        { time: 'Fri', price: 428.15 }
      ],
      '1M': [
        { time: 'Week 1', price: 412.00 },
        { time: 'Week 2', price: 419.00 },
        { time: 'Week 3', price: 423.50 },
        { time: 'Week 4', price: 428.15 }
      ],
      '1Y': [
        { time: 'Q1', price: 375.00 },
        { time: 'Q2', price: 405.00 },
        { time: 'Q3', price: 420.00 },
        { time: 'Q4', price: 428.15 }
      ]
    }
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    sector: 'Technology',
    industry: 'Internet Content & AI',
    price: 179.80,
    change: 2.90,
    changePercent: 1.64,
    isUp: true,
    recommendation: 'Strong Buy',
    confidence: 90,
    targetPrice: 215.00,
    stopLoss: 160.00,
    riskScore: 'Moderate',
    peRatio: 24.5,
    marketCap: '2.22 T',
    dividendYield: 0.45,
    eps: 7.34,
    beta: 1.05,
    rsi: 62.1,
    macd: 'Bullish Crossover',
    aiRationale: 'Google Cloud is profitable and accelerating. Gemini AI integration across Google Workspace, YouTube monetization, and custom Tensor Processing Units (TPUs) provide cost-efficient full-stack AI superiority.',
    pros: [
      'Search advertising revenue remains highly resilient with 90%+ global share',
      'Lowest forward P/E ratio among the Magnificent Seven tech giants',
      'Custom TPU silicon reduces internal reliance on third-party GPU costs'
    ],
    cons: [
      'US Department of Justice antitrust remedies regarding default search exclusivity',
      'AI search summary format may impact legacy click-through monetization'
    ],
    chartData: {
      '1D': [
        { time: '09:30', price: 176.50 },
        { time: '12:30', price: 178.20 },
        { time: '15:30', price: 179.80 }
      ],
      '1W': [
        { time: 'Mon', price: 173.00 },
        { time: 'Fri', price: 179.80 }
      ],
      '1M': [
        { time: 'Week 1', price: 165.00 },
        { time: 'Week 4', price: 179.80 }
      ],
      '1Y': [
        { time: 'Q1', price: 135.00 },
        { time: 'Q4', price: 179.80 }
      ]
    }
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    sector: 'Consumer Cyclical',
    industry: 'Internet Retail & Cloud',
    price: 188.50,
    change: 3.10,
    changePercent: 1.67,
    isUp: true,
    recommendation: 'Buy',
    confidence: 89,
    targetPrice: 225.00,
    stopLoss: 170.00,
    riskScore: 'Moderate',
    peRatio: 43.1,
    marketCap: '1.97 T',
    dividendYield: 0.00,
    eps: 4.37,
    beta: 1.14,
    rsi: 57.8,
    macd: 'Bullish',
    aiRationale: 'AWS re-acceleration driven by enterprise generative AI migrations. North American retail operating margins continue reaching multi-year highs following regional fulfillment network restructuring.',
    pros: [
      'AWS cloud growth re-accelerating past 19% YoY',
      'High-margin advertising segment growing 20%+ YoY',
      'Fulfillment regionalization delivering record low per-unit delivery costs'
    ],
    cons: [
      'Consumer discretionary spending headwinds during macroeconomic slowdowns',
      'Aggressive cloud competition from Microsoft Azure and Google Cloud'
    ],
    chartData: {
      '1D': [
        { time: '09:30', price: 185.00 },
        { time: '15:30', price: 188.50 }
      ],
      '1W': [
        { time: 'Mon', price: 183.20 },
        { time: 'Fri', price: 188.50 }
      ],
      '1M': [
        { time: 'Week 1', price: 176.00 },
        { time: 'Week 4', price: 188.50 }
      ],
      '1Y': [
        { time: 'Q1', price: 140.00 },
        { time: 'Q4', price: 188.50 }
      ]
    }
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    sector: 'Technology',
    industry: 'Interactive Media',
    price: 588.60,
    change: 8.20,
    changePercent: 1.41,
    isUp: true,
    recommendation: 'Strong Buy',
    confidence: 93,
    targetPrice: 670.00,
    stopLoss: 520.00,
    riskScore: 'Moderate',
    peRatio: 27.8,
    marketCap: '1.49 T',
    dividendYield: 0.34,
    eps: 21.17,
    beta: 1.22,
    rsi: 65.4,
    macd: 'Bullish',
    aiRationale: 'Advantage+ AI advertising recommendation engine delivers superior conversion rates for advertisers. Open-source Llama AI ecosystem cements industry leadership while monetizing WhatsApp and Threads.',
    pros: [
      '3.27 billion daily active people across Meta family of apps',
      'AI-driven content recommendation algorithms driving double-digit engagement gains',
      'Strong free cash flow with initiated dividend and $50B share buyback authorization'
    ],
    cons: [
      'Reality Labs VR/AR division continues $4B+ quarterly operating loss',
      'Regulatory compliance pressures in the European Union'
    ],
    chartData: {
      '1D': [
        { time: '09:30', price: 580.00 },
        { time: '15:30', price: 588.60 }
      ],
      '1W': [
        { time: 'Mon', price: 572.00 },
        { time: 'Fri', price: 588.60 }
      ],
      '1M': [
        { time: 'Week 1', price: 545.00 },
        { time: 'Week 4', price: 588.60 }
      ],
      '1Y': [
        { time: 'Q1', price: 380.00 },
        { time: 'Q4', price: 588.60 }
      ]
    }
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    sector: 'Consumer Cyclical',
    industry: 'Auto Manufacturers',
    price: 219.80,
    change: -4.30,
    changePercent: -1.92,
    isUp: false,
    recommendation: 'Hold',
    confidence: 65,
    targetPrice: 220.00,
    stopLoss: 185.00,
    riskScore: 'High',
    peRatio: 65.4,
    marketCap: '702 B',
    dividendYield: 0.00,
    eps: 3.36,
    beta: 2.38,
    rsi: 44.5,
    macd: 'Neutral Bearish',
    aiRationale: 'Automotive margin compression persists due to price cuts and EV competition from China, but long-term upside remains anchored in Megapack Energy Storage growth, CyberCab autonomous mobility, and Optimus robotics.',
    pros: [
      'Energy storage division growing 125%+ YoY with industry-leading profitability',
      'FSD Supervised autonomous software progress creates software-margin upside',
      'Proprietary Supercharger network is the undisputed standard in North America'
    ],
    cons: [
      'Automotive gross margins under pressure from global EV price competition',
      'High valuation multiple requires autonomous software execution'
    ],
    chartData: {
      '1D': [
        { time: '09:30', price: 224.50 },
        { time: '15:30', price: 219.80 }
      ],
      '1W': [
        { time: 'Mon', price: 228.00 },
        { time: 'Fri', price: 219.80 }
      ],
      '1M': [
        { time: 'Week 1', price: 242.00 },
        { time: 'Week 4', price: 219.80 }
      ],
      '1Y': [
        { time: 'Q1', price: 250.00 },
        { time: 'Q4', price: 219.80 }
      ]
    }
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    sector: 'Financial Services',
    industry: 'Diversified Banking',
    price: 221.50,
    change: 1.80,
    changePercent: 0.82,
    isUp: true,
    recommendation: 'Buy',
    confidence: 86,
    targetPrice: 245.00,
    stopLoss: 200.00,
    riskScore: 'Low',
    peRatio: 12.8,
    marketCap: '632 B',
    dividendYield: 2.15,
    eps: 17.30,
    beta: 1.06,
    rsi: 56.2,
    macd: 'Bullish',
    aiRationale: 'Fortress balance sheet, net interest income resilience, and ongoing investment banking market share gains amidst regional banking consolidation position JPM as the premier global financial institution.',
    pros: [
      'Industry-leading Return on Tangible Common Equity (ROTCE) above 20%',
      'Consistently strong net interest income even through shifting rate cycles',
      'Tier 1 Capital ratio far exceeds regulatory requirements'
    ],
    cons: [
      'Potential deposit cost pressure if benchmark interest rates stay volatile',
      'Normalizing credit provision cycles in credit card and CRE portfolios'
    ],
    chartData: {
      '1D': [
        { time: '09:30', price: 219.50 },
        { time: '15:30', price: 221.50 }
      ],
      '1W': [
        { time: 'Mon', price: 217.00 },
        { time: 'Fri', price: 221.50 }
      ],
      '1M': [
        { time: 'Week 1', price: 209.00 },
        { time: 'Week 4', price: 221.50 }
      ],
      '1Y': [
        { time: 'Q1', price: 165.00 },
        { time: 'Q4', price: 221.50 }
      ]
    }
  },
  {
    symbol: 'LLY',
    name: 'Eli Lilly and Company',
    sector: 'Healthcare',
    industry: 'Pharmaceuticals',
    price: 915.20,
    change: 16.50,
    changePercent: 1.84,
    isUp: true,
    recommendation: 'Strong Buy',
    confidence: 94,
    targetPrice: 1050.00,
    stopLoss: 820.00,
    riskScore: 'Moderate',
    peRatio: 114.2,
    marketCap: '868 B',
    dividendYield: 0.57,
    eps: 8.01,
    beta: 0.63,
    rsi: 70.8,
    macd: 'Strong Bullish',
    aiRationale: 'Global demand for weight-loss and diabetes treatments Zepbound and Mounjaro outstrips supply. Multi-billion dollar manufacturing capacity additions cement dominance in an anti-obesity market forecast to exceed $130B by 2030.',
    pros: [
      'Gold standard GLP-1/GIP tirzepatide molecule with multi-decade patent protection',
      'Breakthrough Alzheimer drug Kisunla (donanemab) approved across major markets',
      'Robust pipeline across oncology, immunology, and cardiovascular medicine'
    ],
    cons: [
      'Elevated valuation multiple demands flawless manufacturing execution',
      'Compounding pharmacies selling unregulated off-label semaglutide versions'
    ],
    chartData: {
      '1D': [
        { time: '09:30', price: 898.00 },
        { time: '15:30', price: 915.20 }
      ],
      '1W': [
        { time: 'Mon', price: 885.00 },
        { time: 'Fri', price: 915.20 }
      ],
      '1M': [
        { time: 'Week 1', price: 840.00 },
        { time: 'Week 4', price: 915.20 }
      ],
      '1Y': [
        { time: 'Q1', price: 620.00 },
        { time: 'Q4', price: 915.20 }
      ]
    }
  },
  {
    symbol: 'BRK.B',
    name: 'Berkshire Hathaway Inc.',
    sector: 'Financial Services',
    industry: 'Insurance & Diversified',
    price: 462.40,
    change: 2.10,
    changePercent: 0.46,
    isUp: true,
    recommendation: 'Buy',
    confidence: 87,
    targetPrice: 495.00,
    stopLoss: 430.00,
    riskScore: 'Low',
    peRatio: 19.8,
    marketCap: '998 B',
    dividendYield: 0.00,
    eps: 23.35,
    beta: 0.82,
    rsi: 54.1,
    macd: 'Neutral',
    aiRationale: 'Record $300B+ cash pile earning risk-free 4.5%+ treasury yields. GEICO auto insurance underwriting margins have surged, offering supreme defensive capital preservation for conservative investors.',
    pros: [
      'Defensive fortress balance sheet with over $300B in short-term T-bills',
      'GEICO underwriting turnaround driving record insurance profit float',
      'Diverse non-cyclical cash-generating subsidiaries (BNSF Rail, Berkshire Energy)'
    ],
    cons: [
      'Enormous cash balance creates challenge in finding high-return capital deployment',
      'Eventual long-term executive succession timeline'
    ],
    chartData: {
      '1D': [
        { time: '09:30', price: 460.00 },
        { time: '15:30', price: 462.40 }
      ],
      '1W': [
        { time: 'Mon', price: 457.00 },
        { time: 'Fri', price: 462.40 }
      ],
      '1M': [
        { time: 'Week 1', price: 448.00 },
        { time: 'Week 4', price: 462.40 }
      ],
      '1Y': [
        { time: 'Q1', price: 380.00 },
        { time: 'Q4', price: 462.40 }
      ]
    }
  },
  {
    symbol: 'V',
    name: 'Visa Inc.',
    sector: 'Financial Services',
    industry: 'Transaction & Payment Processing',
    price: 288.75,
    change: 2.30,
    changePercent: 0.80,
    isUp: true,
    recommendation: 'Buy',
    confidence: 87,
    targetPrice: 320.00,
    stopLoss: 260.00,
    riskScore: 'Low',
    peRatio: 30.5,
    marketCap: '585 B',
    dividendYield: 0.72,
    eps: 9.47,
    beta: 0.94,
    rsi: 58.7,
    macd: 'Bullish',
    aiRationale: 'Global duopoly with Mastercard in cashless transactions. Benefits directly from inflation and cross-border travel volume with operating margins exceeding 65%.',
    pros: [
      'Incredible 66%+ operating profit margins with near-zero credit risk',
      'Cross-border travel and eCommerce payment volume growing double-digits',
      'Consistent annual dividend increases averaging 15%+ per year'
    ],
    cons: [
      'Regulatory scrutiny over debit interchange fees and merchant rules',
      'Rise of account-to-account (A2A) and real-time bank rail payment systems'
    ],
    chartData: {
      '1D': [{ time: '09:30', price: 286.00 }, { time: '15:30', price: 288.75 }],
      '1W': [{ time: 'Mon', price: 283.00 }, { time: 'Fri', price: 288.75 }],
      '1M': [{ time: 'Week 1', price: 275.00 }, { time: 'Week 4', price: 288.75 }],
      '1Y': [{ time: 'Q1', price: 245.00 }, { time: 'Q4', price: 288.75 }]
    }
  },
  {
    symbol: 'JNJ',
    name: 'Johnson & Johnson',
    sector: 'Healthcare',
    industry: 'Pharmaceuticals & MedTech',
    price: 164.20,
    change: 0.90,
    changePercent: 0.55,
    isUp: true,
    recommendation: 'Buy',
    confidence: 82,
    targetPrice: 180.00,
    stopLoss: 148.00,
    riskScore: 'Low',
    peRatio: 16.4,
    marketCap: '395 B',
    dividendYield: 3.02,
    eps: 10.01,
    beta: 0.54,
    rsi: 51.3,
    macd: 'Neutral',
    aiRationale: 'Dividend King with 62 consecutive years of dividend growth. Streamlined focus on high-margin Innovative Medicine and MedTech devices following Kenvue consumer health spin-off.',
    pros: [
      'AAA credit rated balance sheet (higher than the US Government)',
      'Reliable 3.0%+ dividend yield with 62-year unbroken growth track record',
      'Strong surgical MedTech and oncology medication portfolio'
    ],
    cons: [
      'Ongoing resolution and settlement reserves for legacy talc litigation',
      'Stelara immunology patent cliff introducing biosimilar competition'
    ],
    chartData: {
      '1D': [{ time: '09:30', price: 163.20 }, { time: '15:30', price: 164.20 }],
      '1W': [{ time: 'Mon', price: 161.80 }, { time: 'Fri', price: 164.20 }],
      '1M': [{ time: 'Week 1', price: 159.00 }, { time: 'Week 4', price: 164.20 }],
      '1Y': [{ time: 'Q1', price: 152.00 }, { time: 'Q4', price: 164.20 }]
    }
  },
  {
    symbol: 'WMT',
    name: 'Walmart Inc.',
    sector: 'Consumer Defensive',
    industry: 'Discount Stores & Retail',
    price: 81.30,
    change: 0.75,
    changePercent: 0.93,
    isUp: true,
    recommendation: 'Buy',
    confidence: 86,
    targetPrice: 92.00,
    stopLoss: 72.00,
    riskScore: 'Low',
    peRatio: 33.2,
    marketCap: '652 B',
    dividendYield: 1.03,
    eps: 2.45,
    beta: 0.65,
    rsi: 61.2,
    macd: 'Bullish',
    aiRationale: 'E-commerce marketplace growth, automated supply chain robotics, and high-margin Walmart Connect retail advertising are expanding operating margins while capturing upper-income grocery shoppers.',
    pros: [
      'Unmatched retail scale with stores within 10 miles of 90% of US population',
      'High-margin advertising (Walmart Connect) growing 26%+ YoY',
      'Market share gains across grocery from middle and higher-income cohorts'
    ],
    cons: [
      'Valuation multiple at historically elevated levels for grocery retail',
      'Tariff and import supply chain exposure for general merchandise'
    ],
    chartData: {
      '1D': [{ time: '09:30', price: 80.40 }, { time: '15:30', price: 81.30 }],
      '1W': [{ time: 'Mon', price: 79.50 }, { time: 'Fri', price: 81.30 }],
      '1M': [{ time: 'Week 1', price: 76.50 }, { time: 'Week 4', price: 81.30 }],
      '1Y': [{ time: 'Q1', price: 58.00 }, { time: 'Q4', price: 81.30 }]
    }
  },
  {
    symbol: 'PG',
    name: 'The Procter & Gamble Company',
    sector: 'Consumer Defensive',
    industry: 'Household & Personal Products',
    price: 172.50,
    change: 0.60,
    changePercent: 0.35,
    isUp: true,
    recommendation: 'Buy',
    confidence: 83,
    targetPrice: 188.00,
    stopLoss: 158.00,
    riskScore: 'Low',
    peRatio: 27.2,
    marketCap: '405 B',
    dividendYield: 2.34,
    eps: 6.34,
    beta: 0.45,
    rsi: 52.8,
    macd: 'Neutral',
    aiRationale: 'Unmatched brand equity in household essentials (Tide, Pampers, Gillette, Oral-B) delivers consistent organic volume growth and exceptional pricing power across economic downturns.',
    pros: [
      'Ultra-low beta (0.45) provides pristine portfolio volatility dampening',
      '68 consecutive years of dividend increases (Dividend King)',
      'Industry-leading gross margins above 50% in consumer staples'
    ],
    cons: [
      'Growth is steady but capped in the low-to-mid single digits',
      'Price elasticity limits if consumers trade down to private-label store brands'
    ],
    chartData: {
      '1D': [{ time: '09:30', price: 171.80 }, { time: '15:30', price: 172.50 }],
      '1W': [{ time: 'Mon', price: 170.50 }, { time: 'Fri', price: 172.50 }],
      '1M': [{ time: 'Week 1', price: 168.00 }, { time: 'Week 4', price: 172.50 }],
      '1Y': [{ time: 'Q1', price: 155.00 }, { time: 'Q4', price: 172.50 }]
    }
  },
  {
    symbol: 'INTC',
    name: 'Intel Corporation',
    sector: 'Technology',
    industry: 'Semiconductors',
    price: 22.40,
    change: -0.55,
    changePercent: -2.40,
    isUp: false,
    recommendation: 'Sell',
    confidence: 76,
    targetPrice: 18.00,
    stopLoss: 25.00,
    riskScore: 'High',
    peRatio: -19.2,
    marketCap: '96 B',
    dividendYield: 0.00,
    eps: -1.16,
    beta: 1.48,
    rsi: 33.5,
    macd: 'Bearish',
    aiRationale: 'Persistent market share erosion in server CPUs to AMD and custom ARM architectures. Intel Foundry business continues substantial capital burn with multi-billion annual operating losses.',
    pros: [
      'Major recipient of US CHIPS and Science Act direct government grants',
      'Long-term optionality if Intel 18A process node achieves commercial yields'
    ],
    cons: [
      'Dividend suspended and multi-thousand workforce layoffs underway',
      'Severe negative free cash flow during multi-year foundry transition'
    ],
    chartData: {
      '1D': [{ time: '09:30', price: 23.00 }, { time: '15:30', price: 22.40 }],
      '1W': [{ time: 'Mon', price: 23.80 }, { time: 'Fri', price: 22.40 }],
      '1M': [{ time: 'Week 1', price: 21.00 }, { time: 'Week 4', price: 22.40 }],
      '1Y': [{ time: 'Q1', price: 44.00 }, { time: 'Q4', price: 22.40 }]
    }
  }
];

export const AI_NEWS_FEED = [
  {
    id: 1,
    title: 'NVIDIA Expands Blackwell Ultra Production to Meet Surging Sovereign AI Demand',
    source: 'Financial Times',
    time: '25 mins ago',
    sentiment: 'Bullish',
    impactScore: 94,
    relatedTickers: ['NVDA', 'MSFT', 'GOOGL', 'AMZN'],
    summary: 'Global hyperscalers and sovereign nations increase combined AI infrastructure orders past $220B, reinforcing long-term data center revenue growth for leading semiconductor suppliers.'
  },
  {
    id: 2,
    title: 'Federal Reserve Signals Measured Interest Rate Reductions as Core PCE Drops',
    source: 'Bloomberg',
    time: '1 hour ago',
    sentiment: 'Bullish',
    impactScore: 89,
    relatedTickers: ['JPM', 'BRK.B', 'S&P 500'],
    summary: 'FOMC commentary points toward accommodative monetary policy as inflation nears the 2% annualized target, boosting equity valuations and lending volume.'
  },
  {
    id: 3,
    title: 'Eli Lilly Secures Expanded International Approvals for Tirzepatide Portfolio',
    source: 'Reuters',
    time: '3 hours ago',
    sentiment: 'Bullish',
    impactScore: 88,
    relatedTickers: ['LLY'],
    summary: 'Healthcare authorities in Europe and Asia approve Mounjaro and Zepbound for expanded metabolic health indications, substantially broadening total addressable market.'
  },
  {
    id: 4,
    title: 'Apple Intelligence Rollout Drives Accelerated Global iPhone 16 Upgrades',
    source: 'Wall Street Journal',
    time: '5 hours ago',
    sentiment: 'Bullish',
    impactScore: 85,
    relatedTickers: ['AAPL', 'MSFT'],
    summary: 'Supply chain telemetry indicates strong early consumer adoption of on-device AI features, supporting double-digit hardware replacement momentum.'
  },
  {
    id: 5,
    title: 'Walmart Reports Record E-Commerce GMV and Advertising Margin Expansion',
    source: 'CNBC',
    time: '7 hours ago',
    sentiment: 'Bullish',
    impactScore: 81,
    relatedTickers: ['WMT', 'AMZN'],
    summary: 'Retail giant gains grocery market share across middle and upper-income demographics while automated micro-fulfillment centers cut last-mile shipping costs.'
  },
  {
    id: 6,
    title: 'Semiconductor Export Rules Tightened for Advanced AI Computing Clusters',
    source: 'MarketWatch',
    time: '10 hours ago',
    sentiment: 'Neutral',
    impactScore: 72,
    relatedTickers: ['NVDA', 'INTC'],
    summary: 'Commerce Department clarifies interconnect bandwidth limitations, directing chipmakers to configure custom performance-capped models for international distribution.'
  }
];
