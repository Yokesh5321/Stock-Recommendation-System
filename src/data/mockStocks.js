export const MARKET_INDICES = [
  { symbol: 'S&P 500', name: 'S&P 500 Index', price: 5432.18, change: 34.50, changePercent: 0.64, isUp: true },
  { symbol: 'NASDAQ', name: 'Nasdaq Composite', price: 17892.40, change: 182.10, changePercent: 1.03, isUp: true },
  { symbol: 'DOW', name: 'Dow Jones Industrial', price: 39810.25, change: -45.80, changePercent: -0.11, isUp: false },
  { symbol: 'NIFTY 50', name: 'NSE Nifty 50', price: 24580.90, change: 125.40, changePercent: 0.51, isUp: true },
  { symbol: 'BTC/USD', name: 'Bitcoin / USD', price: 67450.00, change: 2150.00, changePercent: 3.29, isUp: true },
  { symbol: 'GOLD', name: 'Gold Spot / Oz', price: 2415.60, change: 12.30, changePercent: 0.51, isUp: true },
  { symbol: 'CRUDE OIL', name: 'WTI Crude Oil', price: 78.40, change: -1.20, changePercent: -1.51, isUp: false },
];

export const STOCK_DATABASE = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    sector: 'Technology',
    industry: 'Semiconductors',
    price: 128.50,
    change: 4.80,
    changePercent: 3.88,
    isUp: true,
    recommendation: 'Strong Buy', // Strong Buy, Buy, Hold, Sell
    confidence: 94,
    targetPrice: 155.00,
    stopLoss: 115.00,
    riskScore: 'Moderate', // Low, Moderate, High
    peRatio: 48.2,
    marketCap: '3.15 T',
    dividendYield: 0.03,
    eps: 2.66,
    beta: 1.68,
    rsi: 68.4,
    macd: 'Bullish Crossover',
    aiRationale: 'NVIDIA maintains an unassailable 85%+ market share in AI training GPUs. Exponential growth in data center revenues and next-gen Blackwell architecture launch position NVDA for robust outperformance over the next 12-18 months.',
    pros: [
      'Dominant market share in AI infrastructure & CUDA ecosystem',
      'Data center revenue surge of +427% YoY',
      'Strong gross margins above 75%'
    ],
    cons: [
      'High valuation relative to historical hardware standards',
      'Geopolitical semiconductor supply chain constraints'
    ],
    chartData: {
      '1D': [
        { time: '09:30', price: 123.70, volume: 1200000 },
        { time: '10:30', price: 125.10, volume: 1800000 },
        { time: '11:30', price: 124.90, volume: 950000 },
        { time: '12:30', price: 126.30, volume: 1400000 },
        { time: '13:30', price: 127.80, volume: 2100000 },
        { time: '14:30', price: 127.40, volume: 1600000 },
        { time: '15:30', price: 128.50, volume: 2900000 },
      ],
      '1W': [
        { time: 'Mon', price: 121.20 },
        { time: 'Tue', price: 123.40 },
        { time: 'Wed', price: 122.80 },
        { time: 'Thu', price: 126.10 },
        { time: 'Fri', price: 128.50 },
      ],
      '1M': [
        { time: 'Week 1', price: 115.00 },
        { time: 'Week 2', price: 118.50 },
        { time: 'Week 3', price: 122.10 },
        { time: 'Week 4', price: 128.50 },
      ],
      '1Y': [
        { time: 'Q1', price: 82.00 },
        { time: 'Q2', price: 98.40 },
        { time: 'Q3', price: 112.90 },
        { time: 'Q4', price: 128.50 },
      ]
    }
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Technology',
    industry: 'Consumer Electronics',
    price: 224.30,
    change: 1.90,
    changePercent: 0.85,
    isUp: true,
    recommendation: 'Buy',
    confidence: 86,
    targetPrice: 245.00,
    stopLoss: 210.00,
    riskScore: 'Low',
    peRatio: 33.1,
    marketCap: '3.44 T',
    dividendYield: 0.45,
    eps: 6.77,
    beta: 1.02,
    rsi: 58.2,
    macd: 'Neutral',
    aiRationale: 'Apple Intelligence rollout is expected to trigger a multi-year iPhone upgrade cycle. High-margin Services segment continues strong 14%+ annual growth trajectory.',
    pros: [
      'Massive installed base of 2.2B active devices',
      'High recurring revenue from Apple Services',
      'Unmatched shareholder return via share buybacks'
    ],
    cons: [
      'Slower growth in hardware sales in Asian markets',
      'Regulatory antitrust scrutiny on App Store fees'
    ],
    chartData: {
      '1D': [
        { time: '09:30', price: 222.40 },
        { time: '11:30', price: 223.10 },
        { time: '13:30', price: 223.80 },
        { time: '15:30', price: 224.30 },
      ],
      '1W': [
        { time: 'Mon', price: 219.50 },
        { time: 'Wed', price: 221.80 },
        { time: 'Fri', price: 224.30 },
      ],
      '1M': [
        { time: 'Week 1', price: 210.00 },
        { time: 'Week 2', price: 215.40 },
        { time: 'Week 3', price: 220.10 },
        { time: 'Week 4', price: 224.30 },
      ],
      '1Y': [
        { time: 'Q1', price: 180.20 },
        { time: 'Q2', price: 192.50 },
        { time: 'Q3', price: 210.00 },
        { time: 'Q4', price: 224.30 },
      ]
    }
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    sector: 'Technology',
    industry: 'Software & Cloud',
    price: 442.10,
    change: 5.60,
    changePercent: 1.28,
    isUp: true,
    recommendation: 'Strong Buy',
    confidence: 91,
    targetPrice: 500.00,
    stopLoss: 415.00,
    riskScore: 'Low',
    peRatio: 36.4,
    marketCap: '3.28 T',
    dividendYield: 0.68,
    eps: 12.14,
    beta: 0.91,
    rsi: 61.5,
    macd: 'Bullish',
    aiRationale: 'Azure OpenAI enterprise adoption accelerates cloud margin expansion. Copilot monetization across Office 365 enterprise subscribers adds immediate high-margin ARR.',
    pros: [
      'Azure revenue growth exceeding 30% YoY',
      'Exclusive OpenAI commercial partnership',
      'A+ credit rating balance sheet with $80B cash reserve'
    ],
    cons: [
      'Heavy AI infrastructure CAPEX expenditure',
      'Enterprise spend moderation in non-cloud IT sectors'
    ],
    chartData: {
      '1D': [
        { time: '09:30', price: 436.50 },
        { time: '12:30', price: 439.20 },
        { time: '15:30', price: 442.10 },
      ],
      '1W': [
        { time: 'Mon', price: 432.00 },
        { time: 'Wed', price: 437.50 },
        { time: 'Fri', price: 442.10 },
      ],
      '1M': [
        { time: 'Week 1', price: 425.00 },
        { time: 'Week 2', price: 430.00 },
        { time: 'Week 3', price: 438.00 },
        { time: 'Week 4', price: 442.10 },
      ],
      '1Y': [
        { time: 'Q1', price: 370.00 },
        { time: 'Q2', price: 405.00 },
        { time: 'Q3', price: 425.00 },
        { time: 'Q4', price: 442.10 },
      ]
    }
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    sector: 'Consumer Cyclical',
    industry: 'Internet Retail & Cloud',
    price: 186.70,
    change: 2.10,
    changePercent: 1.14,
    isUp: true,
    recommendation: 'Buy',
    confidence: 88,
    targetPrice: 220.00,
    stopLoss: 170.00,
    riskScore: 'Moderate',
    peRatio: 42.8,
    marketCap: '1.94 T',
    dividendYield: 0.00,
    eps: 4.36,
    beta: 1.15,
    rsi: 55.4,
    macd: 'Bullish',
    aiRationale: 'AWS acceleration combined with North American retail operating margin expansion driven by regionalized fulfillment network optimization.',
    pros: [
      'AWS re-accelerating cloud growth',
      'High-margin advertising segment growing +24% YoY',
      'Fulfillment cost reductions driving record retail margins'
    ],
    cons: [
      'Consumer discretionary spending sensitivity',
      'Intense cloud competition from Azure and GCP'
    ],
    chartData: {
      '1D': [
        { time: '09:30', price: 184.60 },
        { time: '15:30', price: 186.70 },
      ],
      '1W': [
        { time: 'Mon', price: 181.20 },
        { time: 'Fri', price: 186.70 },
      ],
      '1M': [
        { time: 'Week 1', price: 175.00 },
        { time: 'Week 4', price: 186.70 },
      ],
      '1Y': [
        { time: 'Q1', price: 145.00 },
        { time: 'Q4', price: 186.70 },
      ]
    }
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    sector: 'Consumer Cyclical',
    industry: 'Auto Manufacturers',
    price: 218.40,
    change: -5.20,
    changePercent: -2.33,
    isUp: false,
    recommendation: 'Hold',
    confidence: 62,
    targetPrice: 210.00,
    stopLoss: 185.00,
    riskScore: 'High',
    peRatio: 64.2,
    marketCap: '695 B',
    dividendYield: 0.00,
    eps: 3.40,
    beta: 2.34,
    rsi: 42.1,
    macd: 'Bearish Crossover',
    aiRationale: 'EV margin pressure due to global price competition offset by long-term optionality in Autonomous CyberCab, Energy Storage, and Optimus AI robotics.',
    pros: [
      'Energy storage deployment growing 125%+ YoY',
      'FSD Supervised V12 software monetization upside',
      'Lowest manufacturing cost per EV unit'
    ],
    cons: [
      'Auto gross margin compression due to discounting',
      'Increased EV competition in China and Europe'
    ],
    chartData: {
      '1D': [
        { time: '09:30', price: 223.60 },
        { time: '15:30', price: 218.40 },
      ],
      '1W': [
        { time: 'Mon', price: 230.00 },
        { time: 'Fri', price: 218.40 },
      ],
      '1M': [
        { time: 'Week 1', price: 240.00 },
        { time: 'Week 4', price: 218.40 },
      ],
      '1Y': [
        { time: 'Q1', price: 260.00 },
        { time: 'Q4', price: 218.40 },
      ]
    }
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    sector: 'Financial Services',
    industry: 'Diversified Banking',
    price: 212.80,
    change: 1.45,
    changePercent: 0.69,
    isUp: true,
    recommendation: 'Buy',
    confidence: 84,
    targetPrice: 235.00,
    stopLoss: 195.00,
    riskScore: 'Low',
    peRatio: 12.4,
    marketCap: '608 B',
    dividendYield: 2.16,
    eps: 17.16,
    beta: 1.08,
    rsi: 54.8,
    macd: 'Neutral',
    aiRationale: 'Fortress balance sheet, net interest income strength, and market share gains in investment banking amidst regional bank industry consolidation.',
    pros: [
      'Industry-leading Return on Tangible Common Equity (ROTCE)',
      'Substantial net interest income resilience',
      'Strong regulatory capital buffer above CET1 requirements'
    ],
    cons: [
      'Potential deposit cost escalation if interest rates stay high',
      'Credit loss provisions normalizing back to historical averages'
    ],
    chartData: {
      '1D': [{ time: '09:30', price: 211.35 }, { time: '15:30', price: 212.80 }],
      '1W': [{ time: 'Mon', price: 209.00 }, { time: 'Fri', price: 212.80 }],
      '1M': [{ time: 'Week 1', price: 202.00 }, { time: 'Week 4', price: 212.80 }],
      '1Y': [{ time: 'Q1', price: 170.00 }, { time: 'Q4', price: 212.80 }]
    }
  },
  {
    symbol: 'LLY',
    name: 'Eli Lilly and Company',
    sector: 'Healthcare',
    industry: 'Pharmaceuticals',
    price: 810.50,
    change: 14.20,
    changePercent: 1.78,
    isUp: true,
    recommendation: 'Strong Buy',
    confidence: 93,
    targetPrice: 950.00,
    stopLoss: 740.00,
    riskScore: 'Moderate',
    peRatio: 118.5,
    marketCap: '770 B',
    dividendYield: 0.64,
    eps: 6.84,
    beta: 0.62,
    rsi: 71.2,
    macd: 'Strong Bullish',
    aiRationale: 'Unrivaled demand for weight loss & diabetes drugs Zepbound and Mounjaro. Supply capacity additions position LLY to capture dominant anti-obesity market share estimated at $100B+ by 2030.',
    pros: [
      'Blockbuster GLP-1 drug portfolio with multi-decade patent runway',
      'Alzheimers treatment Donanemab pending global approval',
      'Robust pipeline across oncology and immunology'
    ],
    cons: [
      'High valuation multiple requires faultless execution',
      'Manufacturing bottleneck risks in meeting global demand'
    ],
    chartData: {
      '1D': [{ time: '09:30', price: 796.30 }, { time: '15:30', price: 810.50 }],
      '1W': [{ time: 'Mon', price: 785.00 }, { time: 'Fri', price: 810.50 }],
      '1M': [{ time: 'Week 1', price: 740.00 }, { time: 'Week 4', price: 810.50 }],
      '1Y': [{ time: 'Q1', price: 580.00 }, { time: 'Q4', price: 810.50 }]
    }
  },
  {
    symbol: 'INTC',
    name: 'Intel Corporation',
    sector: 'Technology',
    industry: 'Semiconductors',
    price: 20.10,
    change: -0.65,
    changePercent: -3.13,
    isUp: false,
    recommendation: 'Sell',
    confidence: 78,
    targetPrice: 17.50,
    stopLoss: 23.00,
    riskScore: 'High',
    peRatio: -18.4,
    marketCap: '86 B',
    dividendYield: 0.00,
    eps: -0.92,
    beta: 1.45,
    rsi: 31.8,
    macd: 'Bearish',
    aiRationale: 'Market share loss in PC and data center CPUs to AMD and ARM-based chips. Foundry business remains cash flow negative with multi-billion annual capital burn.',
    pros: [
      'US CHIPS Act government funding recipient',
      'Turnaround potential if 18A node succeeds in 2025'
    ],
    cons: [
      'Suspended dividend and workforce downsizing',
      'Negative free cash flow and continuous market share erosion'
    ],
    chartData: {
      '1D': [{ time: '09:30', price: 20.75 }, { time: '15:30', price: 20.10 }],
      '1W': [{ time: 'Mon', price: 22.00 }, { time: 'Fri', price: 20.10 }],
      '1M': [{ time: 'Week 1', price: 25.50 }, { time: 'Week 4', price: 20.10 }],
      '1Y': [{ time: 'Q1', price: 44.00 }, { time: 'Q4', price: 20.10 }]
    }
  }
];

export const AI_NEWS_FEED = [
  {
    id: 1,
    title: 'NVIDIA Unveils Blackwell Ultra Architecture as Tech Giants Double Down on AI CAPEX',
    source: 'Financial Times',
    time: '20 mins ago',
    sentiment: 'Bullish', // Bullish, Bearish, Neutral
    impactScore: 92,
    relatedTickers: ['NVDA', 'MSFT', 'AMZN'],
    summary: 'Hyperscalers indicate combined AI infrastructure expenditure will exceed $200B in 2025, solidifying demand for high-density semiconductor accelerators.'
  },
  {
    id: 2,
    title: 'Fed Signals Potential 25bps Rate Cut as Inflation Cools to 2.5%',
    source: 'Bloomberg',
    time: '1 hour ago',
    sentiment: 'Bullish',
    impactScore: 88,
    relatedTickers: ['JPM', 'S&P 500', 'AAPL'],
    summary: 'Federal Reserve Chairman hints at easing monetary policy at upcoming FOMC meeting, boosting equities and treasury yields.'
  },
  {
    id: 3,
    title: 'Eli Lilly Receives Positive CHMP Opinion for Donanemab in Europe',
    source: 'Reuters',
    time: '3 hours ago',
    sentiment: 'Bullish',
    impactScore: 85,
    relatedTickers: ['LLY'],
    summary: 'European medicines regulator approves groundbreaking early-stage Alzheimer treatment, expanding addressable global market.'
  },
  {
    id: 4,
    title: 'Semiconductor Export Restrictions Expanded for Advanced AI Chips',
    source: 'Wall Street Journal',
    time: '5 hours ago',
    sentiment: 'Bearish',
    impactScore: 74,
    relatedTickers: ['NVDA', 'INTC'],
    summary: 'New regulatory guidelines tighten bandwidth thresholds for chip shipments, impacting immediate international backlog orders.'
  }
];
