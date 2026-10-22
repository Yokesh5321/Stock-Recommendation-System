package com.oops;

import com.oops.model.*;
import com.oops.strategy.*;
import com.oops.service.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Main Class: Execution entry point for the Object Oriented Programming System (OOPS).
 * Demonstrates:
 * 1. Encapsulation (FinancialProfile & Asset models)
 * 2. Abstraction (Asset abstract base class)
 * 3. Inheritance (EquityStock & DividendStock extending Asset)
 * 4. Polymorphism (calculateRiskAdjustedReturn & InvestmentStrategy dynamic dispatch)
 * 5. Interfaces & Strategy Pattern (InvestmentStrategy implementations)
 * 6. Composition (PortfolioManager managing Position and Asset objects)
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("\n*********************************************************");
        System.out.println("  STOCK RECOMMENDATION SYSTEM - JAVA OOPS DEMONSTRATION  ");
        System.out.println("*********************************************************\n");

        // 1. ENCAPSULATION: Creating User Financial Profile
        FinancialProfile userProfile = new FinancialProfile(
                12000.0, // Monthly Salary
                4500.0,  // Monthly Expenses
                35000.0, // Liquid Cash
                200000.0,// Real Estate Assets
                25000.0, // Other Assets
                30000.0, // Total Liabilities
                "Aggressive Growth",
                "High"
        );

        System.out.println("--- 1. ENCAPSULATION & DOMAIN COMPUTATIONS ---");
        System.out.printf("Monthly Surplus Cash Flow : $%.2f\n", userProfile.getMonthlySurplus());
        System.out.printf("Calculated Total Assets   : $%.2f\n", userProfile.getTotalAssets());
        System.out.printf("Calculated Net Worth      : $%.2f\n", userProfile.getNetWorth());
        System.out.printf("Emergency Buffer Reserve  : %.1f Months\n\n", userProfile.getEmergencyBufferMonths());

        // 2. ABSTRACTION & INHERITANCE: Asset Database
        List<Asset> stockDatabase = new ArrayList<>();

        // Polymorphic instantiation (Asset references holding child class objects)
        stockDatabase.add(new EquityStock(
                "NVDA", "NVIDIA Corporation", 138.25, 3.64, "Moderate",
                165.00, 52.4, 95, "Strong Buy"
        ));

        stockDatabase.add(new DividendStock(
                "AAPL", "Apple Inc.", 231.40, 0.94, "Low",
                255.00, 34.2, 88, "Buy", 0.44
        ));

        stockDatabase.add(new DividendStock(
                "MSFT", "Microsoft Corporation", 428.15, 0.81, "Low",
                500.00, 35.8, 92, "Strong Buy", 0.75
        ));

        stockDatabase.add(new EquityStock(
                "TSLA", "Tesla Inc.", 219.80, -1.92, "High",
                220.00, 65.4, 65, "Hold"
        ));

        stockDatabase.add(new DividendStock(
                "JPM", "JPMorgan Chase & Co.", 221.50, 0.82, "Low",
                245.00, 12.8, 86, "Buy", 2.15
        ));

        // 3. POLYMORPHISM & METHOD OVERRIDING
        System.out.println("--- 2. POLYMORPHISM & RISK-ADJUSTED RETURNS ---");
        for (Asset asset : stockDatabase) {
            // Dynamic method dispatch calls overridden method implementation
            System.out.printf("%-12s [%-22s] | Risk-Adjusted Score: %.2f\n",
                    asset.getSymbol(), asset.getAssetType(), asset.calculateRiskAdjustedReturn());
        }
        System.out.println();

        // 4. STRATEGY PATTERN & INTERFACES: Recommending Investments
        InvestmentStrategy activeStrategy = new AggressiveGrowthStrategy();

        System.out.println("--- 3. STRATEGY PATTERN & INTERFACE DISPATCH ---");
        System.out.println("Selected Strategy: " + activeStrategy.getStrategyName());
        System.out.println("---------------------------------------------------------");
        
        for (Asset asset : stockDatabase) {
            double fitScore = activeStrategy.calculateFitScore(asset, userProfile);
            double suggestedAlloc = activeStrategy.calculateMonthlyAllocation(asset, userProfile);
            System.out.printf("Asset: %-6s | Strategy Fit Score: %5.1f/100 | Rec Allocation: $%.2f/mo\n",
                    asset.getSymbol(), fitScore, suggestedAlloc);
        }
        System.out.println();

        // 5. COMPOSITION & PORTFOLIO MANAGEMENT
        System.out.println("--- 4. COMPOSITION & TRADE EXECUTION ---");
        PortfolioManager manager = new PortfolioManager(14500.00);

        // Executing Trades
        manager.executeBuy(stockDatabase.get(0), 25); // NVDA
        manager.executeBuy(stockDatabase.get(1), 15); // AAPL
        manager.executeBuy(stockDatabase.get(2), 10); // MSFT

        // Print Summary Output
        System.out.println();
        manager.printPortfolioSummary();
    }
}
