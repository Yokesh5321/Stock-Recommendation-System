package com.oops.strategy;

import com.oops.model.Asset;
import com.oops.model.EquityStock;
import com.oops.model.FinancialProfile;

public class AggressiveGrowthStrategy implements InvestmentStrategy {

    @Override
    public double calculateFitScore(Asset asset, FinancialProfile profile) {
        double score = 50.0;
        
        if (asset instanceof EquityStock stock) {
            score += stock.getConfidenceScore() * 0.4;
            score += Math.min(30.0, stock.getUpsidePotential());
        }

        if (asset.getRiskLevel().equalsIgnoreCase("High")) {
            score += 15.0; // High risk favored for growth strategy
        }

        return Math.min(100.0, Math.max(0.0, score));
    }

    @Override
    public double calculateMonthlyAllocation(Asset asset, FinancialProfile profile) {
        double surplus = profile.getMonthlySurplus();
        return surplus > 0 ? Math.round(surplus * 0.35) : 0;
    }

    @Override
    public String getStrategyName() {
        return "Aggressive Tech & AI Growth Strategy";
    }
}
