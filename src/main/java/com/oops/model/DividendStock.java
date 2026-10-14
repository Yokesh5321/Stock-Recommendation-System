package com.oops.model;

/**
 * Subclass: DividendStock
 * Demonstrates MULTILEVEL INHERITANCE and METHOD OVERRIDING in OOP.
 */
public class DividendStock extends EquityStock {
    private double dividendYield; // Percentage e.g. 3.5%

    public DividendStock(String symbol, String name, double price, double changePercent,
                         String riskLevel, double targetPrice, double peRatio,
                         int confidenceScore, String recommendation, double dividendYield) {
        super(symbol, name, price, changePercent, riskLevel, targetPrice, peRatio, confidenceScore, recommendation);
        this.dividendYield = dividendYield;
    }

    @Override
    public double calculateRiskAdjustedReturn() {
        // Incorporates passive yield into total return calculation
        return super.calculateRiskAdjustedReturn() + (dividendYield * 1.2);
    }

    @Override
    public String getAssetType() {
        return "Dividend Yielding Stock";
    }

    public double getDividendYield() {
        return dividendYield;
    }
}
