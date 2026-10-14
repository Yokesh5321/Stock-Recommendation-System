package com.oops.strategy;

import com.oops.model.Asset;
import com.oops.model.FinancialProfile;

/**
 * Interface: InvestmentStrategy
 * Demonstrates INTERFACE, POLYMORPHISM, and the STRATEGY DESIGN PATTERN in OOP.
 */
public interface InvestmentStrategy {
    /**
     * Calculates suitability fit score (0-100) for a given asset against the user's financial profile.
     */
    double calculateFitScore(Asset asset, FinancialProfile profile);

    /**
     * Recommends suggested monthly investment allocation amount ($).
     */
    double calculateMonthlyAllocation(Asset asset, FinancialProfile profile);

    /**
     * Returns strategy name.
     */
    String getStrategyName();
}
