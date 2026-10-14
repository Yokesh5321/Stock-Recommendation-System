package com.oops.service;

import com.oops.model.Asset;
import java.util.HashMap;
import java.util.Map;

/**
 * Service Class: PortfolioManager
 * Demonstrates COMPOSITION and ENCAPSULATION of trade management.
 */
public class PortfolioManager {
    private double cashBalance;
    private final Map<String, Position> holdings;

    public static class Position {
        private final Asset asset;
        private int shares;
        private double averagePrice;

        public Position(Asset asset, int shares, double averagePrice) {
            this.asset = asset;
            this.shares = shares;
            this.averagePrice = averagePrice;
        }

        public Asset getAsset() { return asset; }
        public int getShares() { return shares; }
        public double getAveragePrice() { return averagePrice; }

        public double getCurrentValue() {
            return shares * asset.getPrice();
        }

        public double getUnrealizedPnL() {
            return (asset.getPrice() - averagePrice) * shares;
        }

        public double getUnrealizedPnLPercent() {
            if (averagePrice == 0) return 0;
            return ((asset.getPrice() - averagePrice) / averagePrice) * 100;
        }
    }

    public PortfolioManager(double initialCash) {
        this.cashBalance = initialCash;
        this.holdings = new HashMap<>();
    }

    public synchronized boolean executeBuy(Asset asset, int shares) {
        double totalCost = asset.getPrice() * shares;
        if (cashBalance < totalCost) {
            System.out.printf("[Order Failed] Insufficient Cash Balance ($%.2f) to buy %d shares of %s at $%.2f (Cost: $%.2f)\n",
                    cashBalance, shares, asset.getSymbol(), asset.getPrice(), totalCost);
            return false;
        }

        cashBalance -= totalCost;
        if (holdings.containsKey(asset.getSymbol())) {
            Position existing = holdings.get(asset.getSymbol());
            int totalShares = existing.getShares() + shares;
            double blendedAvg = ((existing.getShares() * existing.getAveragePrice()) + totalCost) / totalShares;
            holdings.put(asset.getSymbol(), new Position(asset, totalShares, blendedAvg));
        } else {
            holdings.put(asset.getSymbol(), new Position(asset, shares, asset.getPrice()));
        }

        System.out.printf("[Order Executed] BUY %d shares of %s @ $%.2f | Remaining Cash: $%.2f\n",
                shares, asset.getSymbol(), asset.getPrice(), cashBalance);
        return true;
    }

    public double getTotalPortfolioValue() {
        double holdingsValue = holdings.values().stream()
                .mapToDouble(Position::getCurrentValue)
                .sum();
        return holdingsValue + cashBalance;
    }

    public void printPortfolioSummary() {
        System.out.println("=========================================================");
        System.out.println("                   PORTFOLIO SUMMARY                     ");
        System.out.println("=========================================================");
        System.out.printf("Cash Balance: $%.2f\n", cashBalance);
        System.out.printf("Total Account Value: $%.2f\n", getTotalPortfolioValue());
        System.out.println("---------------------------------------------------------");
        System.out.printf("%-8s | %-6s | %-10s | %-10s | %-10s\n", "Symbol", "Shares", "Avg Price", "Cur Price", "P&L ($)");
        System.out.println("---------------------------------------------------------");
        for (Position pos : holdings.values()) {
            System.out.printf("%-8s | %-6d | $%-9.2f | $%-9.2f | %-+10.2f (%.1f%%)\n",
                    pos.getAsset().getSymbol(),
                    pos.getShares(),
                    pos.getAveragePrice(),
                    pos.getAsset().getPrice(),
                    pos.getUnrealizedPnL(),
                    pos.getUnrealizedPnLPercent());
        }
        System.out.println("=========================================================\n");
    }

    public double getCashBalance() {
        return cashBalance;
    }

    public Map<String, Position> getHoldings() {
        return holdings;
    }
}
