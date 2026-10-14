package com.oops.strategy;

import com.oops.model.Asset;
import com.oops.model.DividendStock;
import com.oops.model.FinancialProfile;

public class DividendIncomeStrategy implements InvestmentStrategy {

    @Override
    public double calculateFitScore(Asset asset, FinancialProfile profile) {
        double score = 40.0;

        if (asset instanceof DividendStock dividendStock) {
            score += dividendStock.getDividendYield() * 12.0; // Reward dividend yield
            if (dividendStock.getRiskLevel().equalsIgnoreCase("Low") || dividendStock.getRiskLevel().equalsIgnoreCase("Moderate")) {
                score += 15.0;
            }
        } else {
            score -= 20.0; // Penalty if asset yields no dividends
        }

        return Math.min(100.0, Math.max(0.0, score));
    }

    @Override
    public double calculateMonthlyAllocation(Asset asset, FinancialProfile profile) {
        double surplus = profile.getMonthlySurplus();
        return surplus > 0 ? Math.round(surplus * 0.25) : 0;
    }

    @Override
    public String getStrategyName() {
        return "Passive Dividend Income Strategy";
    }
}
