package com.oops.model;

/**
 * Abstract Class: Asset
 * Demonstrates ABSTRACTION in OOP.
 * Serves as a base class for all financial assets (Stocks, Dividends, Crypto, etc.).
 */
public abstract class Asset {
    private String symbol;
    private String name;
    private double price;
    private double changePercent;
    private String riskLevel; // "Low", "Moderate", "High"

    public Asset(String symbol, String name, double price, double changePercent, String riskLevel) {
        this.symbol = symbol;
        this.name = name;
        this.price = price;
        this.changePercent = changePercent;
        this.riskLevel = riskLevel;
    }

    // Abstract method to be implemented by child classes (Abstraction & Polymorphism)
    public abstract double calculateRiskAdjustedReturn();

    // Abstract method to return asset category
    public abstract String getAssetType();

    // Encapsulated Getters & Setters
    public String getSymbol() {
        return symbol;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        if (price < 0) {
            throw new IllegalArgumentException("Price cannot be negative");
        }
        this.price = price;
    }

    public double getChangePercent() {
        return changePercent;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    @Override
    public String toString() {
        return String.format("%s (%s) | Price: $%.2f | Change: %.2f%% | Risk: %s",
                name, symbol, price, changePercent, riskLevel);
    }
}
