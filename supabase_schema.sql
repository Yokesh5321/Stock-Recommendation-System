-- ==============================================================================
-- STOCK RECOMMENDATION SYSTEM & FINANCIAL INVESTMENT ENGINE - COMPLETE SUPABASE SQL SCHEMA
-- ==============================================================================
-- Run this entire script in your Supabase Dashboard:
-- Go to: Supabase Console -> SQL Editor -> New Query -> Paste & Run
-- ==============================================================================

-- 1. DROP EXISTING TABLES IF RE-INITIALIZING
DROP TABLE IF EXISTS trades CASCADE;
DROP TABLE IF EXISTS portfolio_holdings CASCADE;
DROP TABLE IF EXISTS portfolios CASCADE;
DROP TABLE IF EXISTS financial_profiles CASCADE;
DROP TABLE IF EXISTS user_accounts CASCADE;
DROP TABLE IF EXISTS market_news CASCADE;
DROP TABLE IF EXISTS market_indices CASCADE;
DROP TABLE IF EXISTS stocks CASCADE;

-- 2. CREATE USER ACCOUNTS & DEMAT PROFILES TABLE
CREATE TABLE user_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    demat_account_no TEXT NOT NULL UNIQUE,
    broker_name TEXT NOT NULL DEFAULT 'Zerodha (CDSL)',
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CREATE STOCKS TABLE
CREATE TABLE stocks (
    symbol TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    sector TEXT NOT NULL,
    industry TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    change NUMERIC(10,2) NOT NULL,
    change_percent NUMERIC(6,2) NOT NULL,
    is_up BOOLEAN NOT NULL DEFAULT true,
    recommendation TEXT NOT NULL CHECK (recommendation IN ('Strong Buy', 'Buy', 'Hold', 'Sell')),
    confidence INTEGER NOT NULL CHECK (confidence BETWEEN 0 AND 100),
    target_price NUMERIC(10,2) NOT NULL,
    stop_loss NUMERIC(10,2) NOT NULL,
    risk_score TEXT NOT NULL CHECK (risk_score IN ('Low', 'Moderate', 'High')),
    pe_ratio NUMERIC(8,2),
    market_cap TEXT NOT NULL,
    dividend_yield NUMERIC(6,2) DEFAULT 0.00,
    eps NUMERIC(8,2),
    beta NUMERIC(6,2),
    rsi NUMERIC(6,2),
    macd TEXT,
    ai_rationale TEXT,
    pros JSONB DEFAULT '[]'::jsonb,
    cons JSONB DEFAULT '[]'::jsonb,
    chart_data JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CREATE MARKET INDICES TABLE
CREATE TABLE market_indices (
    symbol TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC(12,2) NOT NULL,
    change NUMERIC(10,2) NOT NULL,
    change_percent NUMERIC(6,2) NOT NULL,
    is_up BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CREATE MARKET NEWS TABLE
CREATE TABLE market_news (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    source TEXT NOT NULL,
    time TEXT NOT NULL,
    sentiment TEXT NOT NULL CHECK (sentiment IN ('Bullish', 'Bearish', 'Neutral')),
    impact_score INTEGER NOT NULL CHECK (impact_score BETWEEN 0 AND 100),
    related_tickers JSONB DEFAULT '[]'::jsonb,
    summary TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CREATE USER FINANCIAL PROFILES TABLE
CREATE TABLE financial_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL UNIQUE,
    monthly_salary NUMERIC(12,2) NOT NULL DEFAULT 12000.00,
    monthly_expenses NUMERIC(12,2) NOT NULL DEFAULT 4500.00,
    liquid_cash NUMERIC(12,2) NOT NULL DEFAULT 35000.00,
    real_estate_assets NUMERIC(12,2) NOT NULL DEFAULT 200000.00,
    other_assets NUMERIC(12,2) NOT NULL DEFAULT 25000.00,
    total_liabilities NUMERIC(12,2) NOT NULL DEFAULT 30000.00,
    primary_goal TEXT NOT NULL DEFAULT 'Wealth Accumulation',
    investment_horizon TEXT NOT NULL DEFAULT '5-10 Years',
    risk_tolerance TEXT NOT NULL DEFAULT 'Moderate',
    dependents INTEGER NOT NULL DEFAULT 2,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. CREATE USER PORTFOLIO BALANCES
CREATE TABLE portfolios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL UNIQUE,
    cash_balance NUMERIC(12,2) NOT NULL DEFAULT 14500.00,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CREATE USER PORTFOLIO HOLDINGS TABLE
CREATE TABLE portfolio_holdings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    symbol TEXT NOT NULL REFERENCES stocks(symbol) ON DELETE CASCADE,
    shares NUMERIC(10,2) NOT NULL CHECK (shares > 0),
    avg_price NUMERIC(10,2) NOT NULL CHECK (avg_price >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, symbol)
);

-- 8. CREATE TRADES AUDIT TABLE
CREATE TABLE trades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    symbol TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('BUY', 'SELL')),
    shares NUMERIC(10,2) NOT NULL CHECK (shares > 0),
    price NUMERIC(10,2) NOT NULL CHECK (price > 0),
    total_amount NUMERIC(12,2) NOT NULL,
    executed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. CREATE INDEXES FOR FAST PERFORMANCE
CREATE INDEX idx_user_accounts_email ON user_accounts(email);
CREATE INDEX idx_user_accounts_demat ON user_accounts(demat_account_no);
CREATE INDEX idx_stocks_sector ON stocks(sector);
CREATE INDEX idx_stocks_recommendation ON stocks(recommendation);
CREATE INDEX idx_portfolio_holdings_user ON portfolio_holdings(user_id);
CREATE INDEX idx_trades_user_date ON trades(user_id, executed_at DESC);

-- 10. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE user_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE stocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_indices ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;

-- Full Access Policies (Permissive for Supabase anon & authenticated users)
CREATE POLICY "Allow All Stocks Access" ON stocks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Market Indices Access" ON market_indices FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All News Access" ON market_news FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All User Accounts Access" ON user_accounts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Profile Access" ON financial_profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Portfolio Access" ON portfolios FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Holdings Access" ON portfolio_holdings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Trades Access" ON trades FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- 11. SEED DATA INSERTION (15 ORIGINAL AUTHENTIC STOCKS)
-- ==============================================================================

INSERT INTO stocks (symbol, name, sector, industry, price, change, change_percent, is_up, recommendation, confidence, target_price, stop_loss, risk_score, pe_ratio, market_cap, dividend_yield, eps, beta, rsi, macd, ai_rationale, pros, cons, chart_data) VALUES
('NVDA', 'NVIDIA Corporation', 'Technology', 'Semiconductors', 138.25, 4.85, 3.64, true, 'Strong Buy', 95, 165.00, 122.00, 'Moderate', 52.4, '3.39 T', 0.03, 2.66, 1.68, 69.2, 'Bullish Crossover', 
 'NVIDIA maintains an unassailable 85%+ market share in AI accelerators. Robust enterprise demand for Blackwell B200 GPUs and multi-gigawatt sovereign AI infrastructure drive revenue acceleration through 2026.',
 '["Uncontested leadership in AI training & inference GPUs with CUDA moat", "Data center revenue growing in triple digits YoY with 75%+ gross margins", "Expanding enterprise AI software and networking ecosystem"]'::jsonb,
 '["Premium valuation multiple vulnerable to broader market contraction", "TSMC advanced packaging supply constraints"]'::jsonb,
 '{"1D":[{"time":"09:30","price":133.5},{"time":"15:30","price":138.25}],"1W":[{"time":"Mon","price":131.8},{"time":"Fri","price":138.25}],"1M":[{"time":"Week 1","price":121.5},{"time":"Week 4","price":138.25}],"1Y":[{"time":"Q1","price":62},{"time":"Q4","price":138.25}]}'::jsonb),

('AAPL', 'Apple Inc.', 'Technology', 'Consumer Electronics', 231.40, 2.15, 0.94, true, 'Buy', 88, 255.00, 215.00, 'Low', 34.2, '3.52 T', 0.44, 6.77, 1.01, 59.8, 'Bullish',
 'Apple Intelligence deployment across iOS 18 is stimulating a multi-year iPhone hardware supercycle. High-margin Services segment continues double-digit expansion with unmatched cash generation.',
 '["Active installed base surpasses 2.2 billion devices with unmatched loyalty", "Services sector generating over $24B per quarter at 74% gross margins", "Aggressive shareholder return program with over $100B in annual buybacks"]'::jsonb,
 '["Antitrust litigation in US and EU regarding App Store fee structure", "Cyclical smartphone demand in select emerging regions"]'::jsonb,
 '{"1D":[{"time":"09:30","price":229.1},{"time":"15:30","price":231.4}],"1W":[{"time":"Mon","price":226.4},{"time":"Fri","price":231.4}],"1M":[{"time":"Week 1","price":219},{"time":"Week 4","price":231.4}],"1Y":[{"time":"Q1","price":178},{"time":"Q4","price":231.4}]}'::jsonb),

('MSFT', 'Microsoft Corporation', 'Technology', 'Software & Cloud', 428.15, 3.45, 0.81, true, 'Strong Buy', 92, 500.00, 395.00, 'Low', 35.8, '3.18 T', 0.75, 11.96, 0.89, 58.4, 'Neutral Bullish',
 'Azure OpenAI commercial integration delivers steady 30%+ cloud expansion. Microsoft Copilot seat expansion across Office 365 enterprise tiers generates reliable, high-margin ARR.',
 '["Azure Cloud accelerating market share gains against AWS", "Pioneer in commercial generative AI with exclusive OpenAI integrations", "AAA credit rated balance sheet with $75B+ operating cash flow"]'::jsonb,
 '["High capital expenditures for global AI data center buildouts", "Enterprise spend consolidation across legacy on-prem software"]'::jsonb,
 '{"1D":[{"time":"09:30","price":424.0},{"time":"15:30","price":428.15}],"1W":[{"time":"Mon","price":420.5},{"time":"Fri","price":428.15}],"1M":[{"time":"Week 1","price":412},{"time":"Week 4","price":428.15}],"1Y":[{"time":"Q1","price":375},{"time":"Q4","price":428.15}]}'::jsonb),

('GOOGL', 'Alphabet Inc.', 'Technology', 'Internet Content & AI', 179.80, 2.90, 1.64, true, 'Strong Buy', 90, 215.00, 160.00, 'Moderate', 24.5, '2.22 T', 0.45, 7.34, 1.05, 62.1, 'Bullish Crossover',
 'Google Cloud is profitable and accelerating. Gemini AI integration across Google Workspace, YouTube monetization, and custom Tensor Processing Units (TPUs) provide cost-efficient full-stack AI superiority.',
 '["Search advertising revenue remains highly resilient with 90%+ global share", "Lowest forward P/E ratio among Magnificent Seven", "Custom TPU silicon reduces reliance on third-party GPU costs"]'::jsonb,
 '["Antitrust remedies regarding default search exclusivity", "AI summary format monetization transition"]'::jsonb,
 '{"1D":[{"time":"09:30","price":176.5},{"time":"15:30","price":179.8}],"1W":[{"time":"Mon","price":173.0},{"time":"Fri","price":179.8}],"1M":[{"time":"Week 1","price":165},{"time":"Week 4","price":179.8}],"1Y":[{"time":"Q1","price":135},{"time":"Q4","price":179.8}]}'::jsonb),

('AMZN', 'Amazon.com Inc.', 'Consumer Cyclical', 'Internet Retail & Cloud', 188.50, 3.10, 1.67, true, 'Buy', 89, 225.00, 170.00, 'Moderate', 43.1, '1.97 T', 0.00, 4.37, 1.14, 57.8, 'Bullish',
 'AWS re-acceleration driven by enterprise generative AI migrations. North American retail operating margins continue reaching multi-year highs following regional fulfillment network restructuring.',
 '["AWS cloud growth re-accelerating past 19% YoY", "High-margin advertising segment growing 20%+ YoY", "Fulfillment regionalization delivering record low per-unit delivery costs"]'::jsonb,
 '["Consumer discretionary spending headwinds", "Aggressive cloud competition from Azure and GCP"]'::jsonb,
 '{"1D":[{"time":"09:30","price":185.0},{"time":"15:30","price":188.5}],"1W":[{"time":"Mon","price":183.2},{"time":"Fri","price":188.5}],"1M":[{"time":"Week 1","price":176},{"time":"Week 4","price":188.5}],"1Y":[{"time":"Q1","price":140},{"time":"Q4","price":188.5}]}'::jsonb),

('META', 'Meta Platforms Inc.', 'Technology', 'Interactive Media', 588.60, 8.20, 1.41, true, 'Strong Buy', 93, 670.00, 520.00, 'Moderate', 27.8, '1.49 T', 0.34, 21.17, 1.22, 65.4, 'Bullish',
 'Advantage+ AI advertising recommendation engine delivers superior conversion rates for advertisers. Open-source Llama AI ecosystem cements industry leadership while monetizing WhatsApp and Threads.',
 '["3.27 billion daily active people across Meta family of apps", "AI content recommendation algorithms driving double-digit engagement gains", "Strong free cash flow with initiated dividend and share buybacks"]'::jsonb,
 '["Reality Labs VR/AR division continues $4B+ quarterly operating loss", "Regulatory compliance pressures in the EU"]'::jsonb,
 '{"1D":[{"time":"09:30","price":580.0},{"time":"15:30","price":588.6}],"1W":[{"time":"Mon","price":572.0},{"time":"Fri","price":588.6}],"1M":[{"time":"Week 1","price":545},{"time":"Week 4","price":588.6}],"1Y":[{"time":"Q1","price":380},{"time":"Q4","price":588.6}]}'::jsonb),

('TSLA', 'Tesla, Inc.', 'Consumer Cyclical', 'Auto Manufacturers', 219.80, -4.30, -1.92, false, 'Hold', 65, 220.00, 185.00, 'High', 65.4, '702 B', 0.00, 3.36, 2.38, 44.5, 'Neutral Bearish',
 'Automotive margin compression persists due to price cuts and EV competition from China, but long-term upside remains anchored in Megapack Energy Storage growth, CyberCab autonomous mobility, and Optimus robotics.',
 '["Energy storage division growing 125%+ YoY with industry-leading profitability", "FSD Supervised autonomous software progress creates software-margin upside", "Proprietary Supercharger network is the undisputed standard"]'::jsonb,
 '["Automotive gross margins under pressure from global EV price competition", "High valuation multiple requires autonomous software execution"]'::jsonb,
 '{"1D":[{"time":"09:30","price":224.5},{"time":"15:30","price":219.8}],"1W":[{"time":"Mon","price":228.0},{"time":"Fri","price":219.8}],"1M":[{"time":"Week 1","price":242},{"time":"Week 4","price":219.8}],"1Y":[{"time":"Q1","price":250},{"time":"Q4","price":219.8}]}'::jsonb),

('JPM', 'JPMorgan Chase & Co.', 'Financial Services', 'Diversified Banking', 221.50, 1.80, 0.82, true, 'Buy', 86, 245.00, 200.00, 'Low', 12.8, '632 B', 2.15, 17.30, 1.06, 56.2, 'Bullish',
 'Fortress balance sheet, net interest income resilience, and ongoing investment banking market share gains amidst regional banking consolidation position JPM as the premier global financial institution.',
 '["Industry-leading Return on Tangible Common Equity above 20%", "Consistently strong net interest income even through shifting rate cycles", "Tier 1 Capital ratio far exceeds regulatory requirements"]'::jsonb,
 '["Deposit cost pressure if benchmark interest rates stay volatile", "Normalizing credit provision cycles in credit cards"]'::jsonb,
 '{"1D":[{"time":"09:30","price":219.5},{"time":"15:30","price":221.5}],"1W":[{"time":"Mon","price":217.0},{"time":"Fri","price":221.5}],"1M":[{"time":"Week 1","price":209},{"time":"Week 4","price":221.5}],"1Y":[{"time":"Q1","price":165},{"time":"Q4","price":221.5}]}'::jsonb),

('LLY', 'Eli Lilly and Company', 'Healthcare', 'Pharmaceuticals', 915.20, 16.50, 1.84, true, 'Strong Buy', 94, 1050.00, 820.00, 'Moderate', 114.2, '868 B', 0.57, 8.01, 0.63, 70.8, 'Strong Bullish',
 'Global demand for weight-loss and diabetes treatments Zepbound and Mounjaro outstrips supply. Multi-billion dollar manufacturing capacity additions cement dominance in an anti-obesity market forecast to exceed $130B by 2030.',
 '["Gold standard GLP-1/GIP tirzepatide molecule with multi-decade patent protection", "Breakthrough Alzheimer drug Kisunla approved across major markets", "Robust pipeline across oncology, immunology, and cardiovascular medicine"]'::jsonb,
 '["Elevated valuation multiple demands flawless manufacturing execution", "Compounding pharmacies selling unregulated off-label versions"]'::jsonb,
 '{"1D":[{"time":"09:30","price":898.0},{"time":"15:30","price":915.2}],"1W":[{"time":"Mon","price":885.0},{"time":"Fri","price":915.2}],"1M":[{"time":"Week 1","price":840},{"time":"Week 4","price":915.2}],"1Y":[{"time":"Q1","price":620},{"time":"Q4","price":915.2}]}'::jsonb),

('BRK.B', 'Berkshire Hathaway Inc.', 'Financial Services', 'Insurance & Diversified', 462.40, 2.10, 0.46, true, 'Buy', 87, 495.00, 430.00, 'Low', 19.8, '998 B', 0.00, 23.35, 0.82, 54.1, 'Neutral',
 'Record $300B+ cash pile earning risk-free 4.5%+ treasury yields. GEICO auto insurance underwriting margins have surged, offering supreme defensive capital preservation for conservative investors.',
 '["Defensive fortress balance sheet with over $300B in short-term T-bills", "GEICO underwriting turnaround driving record insurance profit float", "Diverse non-cyclical cash-generating subsidiaries"]'::jsonb,
 '["Enormous cash balance creates challenge in finding high-return capital deployment", "Eventual long-term executive succession timeline"]'::jsonb,
 '{"1D":[{"time":"09:30","price":460.0},{"time":"15:30","price":462.4}],"1W":[{"time":"Mon","price":457.0},{"time":"Fri","price":462.4}],"1M":[{"time":"Week 1","price":448},{"time":"Week 4","price":462.4}],"1Y":[{"time":"Q1","price":380},{"time":"Q4","price":462.4}]}'::jsonb),

('V', 'Visa Inc.', 'Financial Services', 'Transaction & Payment Processing', 288.75, 2.30, 0.80, true, 'Buy', 87, 320.00, 260.00, 'Low', 30.5, '585 B', 0.72, 9.47, 0.94, 58.7, 'Bullish',
 'Global duopoly with Mastercard in cashless transactions. Benefits directly from inflation and cross-border travel volume with operating margins exceeding 65%.',
 '["Incredible 66%+ operating profit margins with near-zero credit risk", "Cross-border travel and eCommerce payment volume growing double-digits", "Consistent annual dividend increases averaging 15%+ per year"]'::jsonb,
 '["Regulatory scrutiny over debit interchange fees and merchant rules", "Rise of account-to-account real-time bank rails"]'::jsonb,
 '{"1D":[{"time":"09:30","price":286.0},{"time":"15:30","price":288.75}],"1W":[{"time":"Mon","price":283.0},{"time":"Fri","price":288.75}],"1M":[{"time":"Week 1","price":275},{"time":"Week 4","price":288.75}],"1Y":[{"time":"Q1","price":245},{"time":"Q4","price":288.75}]}'::jsonb),

('JNJ', 'Johnson & Johnson', 'Healthcare', 'Pharmaceuticals & MedTech', 164.20, 0.90, 0.55, true, 'Buy', 82, 180.00, 148.00, 'Low', 16.4, '395 B', 3.02, 10.01, 0.54, 51.3, 'Neutral',
 'Dividend King with 62 consecutive years of dividend growth. Streamlined focus on high-margin Innovative Medicine and MedTech devices following Kenvue consumer health spin-off.',
 '["AAA credit rated balance sheet (higher than the US Government)", "Reliable 3.0%+ dividend yield with 62-year unbroken growth track record", "Strong surgical MedTech and oncology medication portfolio"]'::jsonb,
 '["Ongoing resolution and settlement reserves for legacy talc litigation", "Stelara immunology patent cliff introducing biosimilar competition"]'::jsonb,
 '{"1D":[{"time":"09:30","price":163.2},{"time":"15:30","price":164.2}],"1W":[{"time":"Mon","price":161.8},{"time":"Fri","price":164.2}],"1M":[{"time":"Week 1","price":159},{"time":"Week 4","price":164.2}],"1Y":[{"time":"Q1","price":152},{"time":"Q4","price":164.2}]}'::jsonb),

('WMT', 'Walmart Inc.', 'Consumer Defensive', 'Discount Stores & Retail', 81.30, 0.75, 0.93, true, 'Buy', 86, 92.00, 72.00, 'Low', 33.2, '652 B', 1.03, 2.45, 0.65, 61.2, 'Bullish',
 'E-commerce marketplace growth, automated supply chain robotics, and high-margin Walmart Connect retail advertising are expanding operating margins while capturing upper-income grocery shoppers.',
 '["Unmatched retail scale with stores within 10 miles of 90% of US population", "High-margin advertising (Walmart Connect) growing 26%+ YoY", "Market share gains across grocery from middle and higher-income cohorts"]'::jsonb,
 '["Valuation multiple at historically elevated levels for grocery retail", "Tariff and import supply chain exposure for general merchandise"]'::jsonb,
 '{"1D":[{"time":"09:30","price":80.4},{"time":"15:30","price":81.3}],"1W":[{"time":"Mon","price":79.5},{"time":"Fri","price":81.3}],"1M":[{"time":"Week 1","price":76.5},{"time":"Week 4","price":81.3}],"1Y":[{"time":"Q1","price":58},{"time":"Q4","price":81.3}]}'::jsonb),

('PG', 'The Procter & Gamble Company', 'Consumer Defensive', 'Household & Personal Products', 172.50, 0.60, 0.35, true, 'Buy', 83, 188.00, 158.00, 'Low', 27.2, '405 B', 2.34, 6.34, 0.45, 52.8, 'Neutral',
 'Unmatched brand equity in household essentials (Tide, Pampers, Gillette, Oral-B) delivers consistent organic volume growth and exceptional pricing power across economic downturns.',
 '["Ultra-low beta (0.45) provides pristine portfolio volatility dampening", "68 consecutive years of dividend increases (Dividend King)", "Industry-leading gross margins above 50% in consumer staples"]'::jsonb,
 '["Growth is steady but capped in the low-to-mid single digits", "Price elasticity limits if consumers trade down to private-label store brands"]'::jsonb,
 '{"1D":[{"time":"09:30","price":171.8},{"time":"15:30","price":172.5}],"1W":[{"time":"Mon","price":170.5},{"time":"Fri","price":172.5}],"1M":[{"time":"Week 1","price":168},{"time":"Week 4","price":172.5}],"1Y":[{"time":"Q1","price":155},{"time":"Q4","price":172.5}]}'::jsonb),

('INTC', 'Intel Corporation', 'Technology', 'Semiconductors', 22.40, -0.55, -2.40, false, 'Sell', 76, 18.00, 25.00, 'High', -19.2, '96 B', 0.00, -1.16, 1.48, 33.5, 'Bearish',
 'Persistent market share erosion in server CPUs to AMD and custom ARM architectures. Intel Foundry business continues substantial capital burn with multi-billion annual operating losses.',
 '["Major recipient of US CHIPS and Science Act direct government grants", "Long-term optionality if Intel 18A process node achieves commercial yields"]'::jsonb,
 '["Dividend suspended and multi-thousand workforce layoffs underway", "Severe negative free cash flow during multi-year foundry transition"]'::jsonb,
 '{"1D":[{"time":"09:30","price":23.0},{"time":"15:30","price":22.4}],"1W":[{"time":"Mon","price":23.8},{"time":"Fri","price":22.4}],"1M":[{"time":"Week 1","price":21},{"time":"Week 4","price":22.4}],"1Y":[{"time":"Q1","price":44},{"time":"Q4","price":22.4}]}'::jsonb);

-- 12. SEED MARKET INDICES
INSERT INTO market_indices (symbol, name, price, change, change_percent, is_up) VALUES
('S&P 500', 'S&P 500 Index', 5864.67, 42.15, 0.72, true),
('NASDAQ', 'Nasdaq Composite', 18489.55, 168.30, 0.92, true),
('DOW', 'Dow Jones Industrial', 43239.05, -36.20, -0.08, false),
('RUSSELL 2000', 'Russell 2000 Index', 2275.40, 14.80, 0.65, true),
('BTC/USD', 'Bitcoin / USD', 68150.00, 1820.00, 2.74, true),
('GOLD', 'Gold Spot / Oz', 2721.40, 18.90, 0.70, true),
('CRUDE OIL', 'WTI Crude Oil', 70.85, -1.15, -1.60, false);

-- 13. SEED FINANCIAL NEWS FEED
INSERT INTO market_news (title, source, time, sentiment, impact_score, related_tickers, summary) VALUES
('NVIDIA Expands Blackwell Ultra Production to Meet Surging Sovereign AI Demand', 'Financial Times', '25 mins ago', 'Bullish', 94, '["NVDA", "MSFT", "GOOGL", "AMZN"]'::jsonb, 'Global hyperscalers and sovereign nations increase combined AI infrastructure orders past $220B, reinforcing long-term data center revenue growth for leading semiconductor suppliers.'),
('Federal Reserve Signals Measured Interest Rate Reductions as Core PCE Drops', 'Bloomberg', '1 hour ago', 'Bullish', 89, '["JPM", "BRK.B", "S&P 500"]'::jsonb, 'FOMC commentary points toward accommodative monetary policy as inflation nears the 2% annualized target, boosting equity valuations and lending volume.'),
('Eli Lilly Secures Expanded International Approvals for Tirzepatide Portfolio', 'Reuters', '3 hours ago', 'Bullish', 88, '["LLY"]'::jsonb, 'Healthcare authorities in Europe and Asia approve Mounjaro and Zepbound for expanded metabolic health indications, substantially broadening total addressable market.'),
('Apple Intelligence Rollout Drives Accelerated Global iPhone 16 Upgrades', 'Wall Street Journal', '5 hours ago', 'Bullish', 85, '["AAPL", "MSFT"]'::jsonb, 'Supply chain telemetry indicates strong early consumer adoption of on-device AI features, supporting double-digit hardware replacement momentum.'),
('Walmart Reports Record E-Commerce GMV and Advertising Margin Expansion', 'CNBC', '7 hours ago', 'Bullish', 81, '["WMT", "AMZN"]'::jsonb, 'Retail giant gains grocery market share across middle and upper-income demographics while automated micro-fulfillment centers cut last-mile shipping costs.'),
('Semiconductor Export Rules Tightened for Advanced AI Computing Clusters', 'MarketWatch', '10 hours ago', 'Neutral', 72, '["NVDA", "INTC"]'::jsonb, 'Commerce Department clarifies interconnect bandwidth limitations, directing chipmakers to configure custom performance-capped models for international distribution.');

-- 14. SEED INITIAL DEFAULT USER ACCOUNT & DEMAT PROFILE
INSERT INTO user_accounts (email, full_name, demat_account_no, broker_name, password_hash)
VALUES ('yokesh.kumar@investor.com', 'Yokesh Kumar', 'DEMAT-88492049', 'Zerodha (CDSL)', 'demo_pass_hash')
ON CONFLICT (email) DO NOTHING;

INSERT INTO financial_profiles (user_id, monthly_salary, monthly_expenses, liquid_cash, real_estate_assets, other_assets, total_liabilities, primary_goal, investment_horizon, risk_tolerance, dependents)
VALUES ('yokesh.kumar@investor.com', 12000.00, 4500.00, 35000.00, 200000.00, 25000.00, 30000.00, 'Wealth Accumulation', '5-10 Years', 'Moderate', 2)
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO portfolios (user_id, cash_balance)
VALUES ('yokesh.kumar@investor.com', 14500.00)
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO portfolio_holdings (user_id, symbol, shares, avg_price) VALUES
('yokesh.kumar@investor.com', 'NVDA', 25, 110.20),
('yokesh.kumar@investor.com', 'AAPL', 15, 215.00),
('yokesh.kumar@investor.com', 'LLY', 5, 760.00)
ON CONFLICT (user_id, symbol) DO NOTHING;

-- Verification Queries
SELECT count(*) AS total_users FROM user_accounts;
SELECT count(*) AS total_stocks FROM stocks;
SELECT count(*) AS total_indices FROM market_indices;
SELECT count(*) AS total_news FROM market_news;
SELECT email, full_name, demat_account_no, broker_name FROM user_accounts;
