package com.oops.model;

/**
 * Class: FinancialProfile
 * Demonstrates ENCAPSULATION and DOMAIN COMPUTATIONS in OOP.
 * Encapsulates personal wealth parameters and exposes controlled accessor methods.
 */
public class FinancialProfile {
    private double monthlySalary;
    private double monthlyExpenses;
    private double liquidCash;
    private double realEstateAssets;
    private double otherAssets;
    private double totalLiabilities;
    private String primaryGoal; // "Wealth Accumulation", "Passive Dividend Income", "Capital Preservation", "Aggressive Growth"
    private String riskTolerance; // "Low", "Moderate", "High"

    public FinancialProfile(double monthlySalary, double monthlyExpenses, double liquidCash,
                            double realEstateAssets, double otherAssets, double totalLiabilities,
                            String primaryGoal, String riskTolerance) {
        this.monthlySalary = monthlySalary;
        this.monthlyExpenses = monthlyExpenses;
        this.liquidCash = liquidCash;
        this.realEstateAssets = realEstateAssets;
        this.otherAssets = otherAssets;
        this.totalLiabilities = totalLiabilities;
        this.primaryGoal = primaryGoal;
        this.riskTolerance = riskTolerance;
    }

    // Computed Business Methods (Encapsulating domain calculations)
    public double getMonthlySurplus() {
        return Math.max(0, monthlySalary - monthlyExpenses);
    }

    public double getTotalAssets() {
        return liquidCash + realEstateAssets + otherAssets;
    }

    public double getNetWorth() {
        return getTotalAssets() - totalLiabilities;
    }

    public double getEmergencyBufferMonths() {
        if (monthlyExpenses <= 0) return 0;
        return Math.round((liquidCash / monthlyExpenses) * 10.0) / 10.0;
    }

    // Getters & Setters with data validation logic
    public double getMonthlySalary() { return monthlySalary; }
    public double getMonthlyExpenses() { return monthlyExpenses; }
    public double getLiquidCash() { return liquidCash; }
    public String getPrimaryGoal() { return primaryGoal; }
    public String getRiskTolerance() { return riskTolerance; }

    public void setLiquidCash(double liquidCash) {
        if (liquidCash < 0) {
            throw new IllegalArgumentException("Liquid cash cannot be negative.");
        }
        this.liquidCash = liquidCash;
    }
}
