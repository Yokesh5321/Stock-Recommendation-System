import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl.startsWith('https://') &&
    supabaseAnonKey.length > 20
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Fetch all stocks from Supabase database
 */
export async function getStocksFromDb() {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase
      .from('stocks')
      .select('*')
      .order('confidence', { ascending: false });

    if (error) {
      console.warn('Supabase getStocks error:', error.message);
      return null;
    }
    // Normalize snake_case to camelCase so UI components work seamlessly
    return data.map(s => ({
      ...s,
      price: Number(s.price),
      change: Number(s.change),
      changePercent: Number(s.change_percent ?? s.changePercent ?? 0),
      isUp: s.is_up ?? s.isUp ?? (s.change >= 0),
      confidence: Number(s.confidence),
      targetPrice: Number(s.target_price ?? s.targetPrice ?? s.price),
      stopLoss: Number(s.stop_loss ?? s.stopLoss ?? 0),
      riskScore: s.risk_score ?? s.riskScore ?? 'Moderate',
      peRatio: Number(s.pe_ratio ?? s.peRatio ?? 0),
      marketCap: s.market_cap ?? s.marketCap ?? '',
      dividendYield: Number(s.dividend_yield ?? s.dividendYield ?? 0),
      eps: Number(s.eps ?? 0),
      beta: Number(s.beta ?? 1),
      rsi: Number(s.rsi ?? 50),
      aiRationale: s.ai_rationale ?? s.aiRationale ?? '',
      pros: s.pros || [],
      cons: s.cons || [],
      chartData: s.chart_data ?? s.chartData ?? {}
    }));
  } catch (err) {
    console.warn('Supabase fetch failed:', err);
    return null;
  }
}

/**
 * Fetch market indices from Supabase
 */
export async function getIndicesFromDb() {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase
      .from('market_indices')
      .select('*');

    if (error) {
      console.warn('Supabase getIndices error:', error.message);
      return null;
    }
    return data.map(i => ({
      ...i,
      price: Number(i.price),
      change: Number(i.change),
      changePercent: Number(i.change_percent ?? i.changePercent ?? 0),
      isUp: i.is_up ?? i.isUp ?? (i.change >= 0)
    }));
  } catch (err) {
    console.warn('Supabase fetch failed:', err);
    return null;
  }
}

/**
 * Fetch market news from Supabase
 */
export async function getNewsFromDb() {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase
      .from('market_news')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.warn('Supabase getNews error:', error.message);
      return null;
    }
    return data.map(n => ({
      ...n,
      impactScore: Number(n.impact_score ?? n.impactScore ?? 50),
      relatedTickers: n.related_tickers ?? n.relatedTickers ?? []
    }));
  } catch (err) {
    console.warn('Supabase fetch failed:', err);
    return null;
  }
}

/**
 * Save user financial profile to Supabase
 */
export async function saveFinancialProfileToDb(profile, userId = 'default_user') {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase
      .from('financial_profiles')
      .upsert({
        user_id: userId,
        monthly_salary: profile.monthlySalary,
        monthly_expenses: profile.monthlyExpenses,
        liquid_cash: profile.liquidCash,
        real_estate_assets: profile.realEstateAssets,
        other_assets: profile.otherAssets,
        total_liabilities: profile.totalLiabilities,
        primary_goal: profile.primaryGoal,
        investment_horizon: profile.investmentHorizon,
        risk_tolerance: profile.riskTolerance,
        dependents: profile.dependents,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });

    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('Supabase save profile failed:', err);
    return null;
  }
}

/**
 * Record a buy or sell trade transaction in Supabase
 */
export async function recordTradeToDb(tradeData, userId = 'default_user') {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase
      .from('trades')
      .insert({
        user_id: userId,
        symbol: tradeData.symbol,
        type: tradeData.type,
        shares: tradeData.shares,
        price: tradeData.price,
        total_amount: tradeData.shares * tradeData.price,
        executed_at: new Date().toISOString()
      });

    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('Supabase record trade failed:', err);
    return null;
  }
}

/**
 * Register a new user with Demat account in Supabase
 */
export async function registerUserAccountInDb({ email, fullName, dematAccountNo, brokerName, password }) {
  if (!isSupabaseConfigured()) return null;
  try {
    // 1. Also attempt Supabase Auth if password provided
    if (password) {
      try {
        await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName, demat_account_no: dematAccountNo, broker_name: brokerName }
          }
        });
      } catch (authErr) {
        console.warn('Supabase auth signup notice:', authErr.message);
      }
    }

    // 2. Insert into user_accounts table
    const { data, error } = await supabase
      .from('user_accounts')
      .upsert({
        email,
        full_name: fullName,
        demat_account_no: dematAccountNo,
        broker_name: brokerName || 'Zerodha (CDSL)',
        password_hash: 'managed_user',
        updated_at: new Date().toISOString()
      }, { onConflict: 'email' })
      .select()
      .single();

    if (error) {
      console.warn('Supabase registerUserAccount error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase register user failed:', err);
    return null;
  }
}

/**
 * Fetch user account & Demat details by email
 */
export async function getUserAccountFromDb(email) {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase
      .from('user_accounts')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) {
      console.warn('Supabase getUserAccount error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase get user failed:', err);
    return null;
  }
}
