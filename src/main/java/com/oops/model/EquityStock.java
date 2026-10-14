package com.oops.model;

/**
 * Subclass: EquityStock
 * Demonstrates INHERITANCE and POLYMORPHISM in OOP by extending Asset.
 */
public class EquityStock extends Asset {
    private double targetPrice;
    private double peRatio;
    private int confidenceScore; // 0 - 100
    private String recommendation; // "Strong Buy", "Buy", "Hold", "Sell"

    public EquityStock(String symbol, String name, double price, double changePercent,
            String riskLevel, double targetPrice, double peRatio,
            int confidenceScore, String recommendation) {
        super(symbol, name, price, changePercent, riskLevel);
        this.targetPrice = targetPrice;
        this.peRatio = peRatio;
        this.confidenceScore = confidenceScore;
        this.recommendation = recommendation;
    }

    public double getUpsidePotential() {
        if (getPrice() == 0)
            return 0;
        return ((targetPrice - getPrice()) / getPrice()) * 100;
    }

    @Override
    public double calculateRiskAdjustedReturn() {
        double upside = getUpsidePotential();
        double riskMultiplier = getRiskLevel().equalsIgnoreCase("High") ? 0.6
                : getRiskLevel().equalsIgnoreCase("Moderate") ? 0.85 : 1.1;
        return upside * (confidenceScore / 100.0) * riskMultiplier;
    }

    @Override
    public String getAssetType() {
        return "Equity Stock";
    }

    // Encapsulated Getters
    public double getTargetPrice() {
        return targetPrice;
    }

    public double getPeRatio() {
        return peRatio;
    }

    public int getConfidenceScore() {
        return confidenceScore;
    }

    public String getRecommendation() {
        return recommendation;
    }
}
